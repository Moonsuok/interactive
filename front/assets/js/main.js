const front = {
  init() {
    gsap.set(container, { autoAlpha: 1 });
    window.addEventListener("resize", front.debounce(front.setVh, 100));
    front.setVh();
  },

  setVh() {
    document.documentElement.style.setProperty("--vh", `${window.innerHeight}px`);
    document.documentElement.style.setProperty("--vw", `${window.innerWidth}px`);
  },

  debounce(callback, time = 500) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback.apply(this, args);
      }, time);
    };
  },

  splitText(el) {
    const texts = el.textContent.split('');
    // console.log('splitText', texts);
    let HTML = ``;
    texts.forEach((a, i)=>{ HTML += `<div class="chars char-${a.toLocaleLowerCase()}" data-chars="${i}">${a}</div>` });
    el.textContent = ``;
    el.insertAdjacentHTML("afterbegin", HTML);

    return el.querySelectorAll(`.chars`);
  },
};



function heroAnimation() {
  
  const DOM = {
      area: document.querySelector('.no-main-area'),
      video: document.querySelector('.no-main-vis__video'),
      overlay: document.querySelector('.no-main-vis__overlay'),
      title: gsap.utils.toArray('.no-main-vis__intro-title > div'),
      // desc: document.querySelectorAll('.no-main-vis__intro-desc .line'),
      desc: gsap.utils.toArray('.no-main-vis__intro-desc > div'),
  };

  // const videoTitle = new SplitType(DOM.title);
  // const videoTitle = DOM.title;
  let videoTitle = DOM.title;
  // DOM.title.forEach( el => videoTitle.push(front.splitText(el)) );
  // const videoDesc = new SplitType(DOM.desc);
  let videoDesc = [];
  DOM.desc.forEach( el => videoDesc.push(front.splitText(el)) );

  let tl;
  gsap.set(videoTitle, { overflow: 'hidden' });
  gsap.set(videoDesc, { overflow: 'hidden' });
  gsap.set(videoTitle, { y: '100%', opacity: 0 });
  // gsap.set(videoDesc.chars, { y: '100%' });
  gsap.set(videoDesc, { y: '100%', opacity: 0 });

  ScrollTrigger.create({
      id: 'main-vis',
      trigger: DOM.area,
      start: 'top top',   // fin start
      end: '+=300%',      // fin end
      pin: true,          // fin
      pinSpacing: false,  // fin관련 옵션
      invalidateOnRefresh: true,
      anticipatePin: 1,
      // markers: true,
  });

  ScrollTrigger.matchMedia({
      '(min-width: 769px)': function () {
          tl = gsap
              .timeline({
                  scrollTrigger: {
                      trigger: DOM.area,
                      start: '20% bottom',
                      end: '100% bottom',
                      scrub: 1,
                      id: 'main-ani',
                      // markers: true,
                  },
              })
              .to(DOM.video, {
                  clipPath: 'circle(10% at 50% 50%)',
                  duration: 1,
              })
              .to(DOM.video, {
                  clipPath: 'circle(100% at 50% 50%)',
                  duration: 1.5,
              });
      },
      '(max-width: 768px)': function () {
          tl = gsap
              .timeline({
                  scrollTrigger: {
                      trigger: DOM.area,
                      start: '20% bottom',
                      end: '100% bottom',
                      scrub: 1,
                      id: 'main-ani',
                      // markers: true,
                  },
              })
              .to(DOM.video, {
                  clipPath: 'circle(20% at 50% 50%)',
                  duration: 1,
              })
              .to(DOM.video, {
                  clipPath: 'circle(100% at 50% 50%)',
                  duration: 1.5,
              });
      },
  });

  tl.to(
      DOM.overlay,
      {
          opacity: 0,
      },
      '<'
  )
      // .to(
      //     videoTitle,
      //     {
      //         opacity: 1,
      //         duration: 0.5,
      //     },
      //     '-=1'
      // )
      .to(
          videoTitle,
          {
              y: '0%',
              opacity: 1,
              duration: 0.8,
              stagger: 0.08,
          },
          '-=1'
      )
      .to(
          '.no-main-vis__intro-desc',
          {
              opacity: 1,
          },
          '-=0.5'
      )
      .to(
          videoDesc,
          {
              y: '0%',
              opacity: 1,
              stagger: 0.05,
              duration: 0.8,
          },
          '<'
      );
}


document.addEventListener("DOMContentLoaded", ()=>{
  front.init();
  heroAnimation();
});