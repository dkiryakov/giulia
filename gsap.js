window.addEventListener('load', function() {
    gsap.registerPlugin(ScrollTrigger);

   
    // Set the initial state of the elements
    gsap.set('.fade-up', { opacity: 0, y: 20 });

    ScrollTrigger.batch('.fade-up', {
        onEnter: batch => {
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                stagger: 0.2, // Delay between each element's animation
            });
        },
        start: 'top 80%',
        once: true, // Ensures animation happens only once
    });

    ///newcode

    const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".testimonial");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

   
  });

