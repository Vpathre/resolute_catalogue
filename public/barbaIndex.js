function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

function pageTransition() {
  var tl = gsap.timeline();
  tl.to("ul.transition li", {
    duration: 0.5,
    scaleY: 1,
    transformOrigin: "bottom left",
    stagger: 0.2,
  });
  tl.to("ul.transition li", {
    duration: 0.5,
    scaleY: 0,
    transformOrigin: "bottom left",
    stagger: 0.1,
  });
}

function contentAnimation() {
  var tl = gsap.timeline();
  tl.from(".logo", {
    duration: 0.5,
    translateY: 20,
    opacity: 0,
    stagger: 0.4,
    delay: 0.2,
  });

  tl.from(".intro-text", {
    duration: 0.5,
    translateY: 20,
    opacity: 0,
    stagger: 0.4,
    delay: 0.2,
  });

  tl.from(".intro-button", {
    duration: 0.5,
    translateY: 20,
    opacity: 0,
    stagger: 0.4,
    delay: 0.2,
  });
}

barba.init({
  sync: true,
  transitions: [
    {
      async leave(data) {
        const done = this.async();

        pageTransition();
        await delay(1500);
        done();
      },

      async enter(data) {
        contentAnimation();
      },

      async once(data) {
        contentAnimation();
      },
    },
  ],
});
