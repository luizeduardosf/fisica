/*=============== DUPLICATE CARD CAROUSEL ===============*/
// Duplicate images to make the animation work
const tracks = document.querySelectorAll('.carousel__content')

tracks.forEach(track => {
   const cards = [...track.children] // spread to make a static copy

   // Duplicate cards only once
   for (const card of cards) {
      track.appendChild(card.cloneNode(true))
   }
})

document.addEventListener('DOMContentLoaded', () => {
  const ease = "power4.inOut";

  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const href = link.getAttribute("href");

      if (href && !href.startsWith("#") && href !== window.location.pathname) {

        animatetransition().then(() => {
          window.location.href = href;
        }); 
      }
    });
});

  revealtransition().then(() => {
    gsap.set(".block", {visibility: "hidden"});
  
  });

  function revealtransition() {
    return new Promise((resolve) => {
      gsap.set(".block", {scaleY: 1 });
    gsap.to(".block", {
      scaleY: 0,
      duration: 1,
      stagger:{
        each : 0.1,
        from: "start",
        grid: "auto",
        axis: "x",
      },
      ease: ease,
      onComplete: resolve,
    });
    });
  }

  function animatetransition() {
    return new Promise((resolve, reject) => {
      gsap.set(".block", {scaleY: 0, visibility: "visible" });
      gsap.to(".block", {
      scaleY: 1,
      duration: 1,
      stagger:{
        each : 0.1,
        from: "start",
        grid: [2,5],
        axis: "x",
      },
      ease: ease,
      onComplete: resolve,
    });
  });
  
  }

});


function atualizarHoraBrasilia() {
    // Cria objeto de data usando o fuso de Brasília (America/Sao_Paulo)
    const agora = new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit"
    });

    document.getElementById("hora-brasilia").textContent = `BRT ${agora}`;
}

// Atualiza a hora imediatamente e depois a cada segundo
atualizarHoraBrasilia();
setInterval(atualizarHoraBrasilia, 1000);