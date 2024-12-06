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
  const scrollers = document.querySelectorAll(".scroller");

  scrollers.forEach((scroller) => {
    // Add `data-animated="true"` to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Select the `.testimonial` container
    const scrollerInner = scroller.querySelector(".testimonial");
    const scrollerContent = Array.from(scrollerInner.children);

    // Clone and append items for seamless scrolling
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });

    // Pause animation on hover/touch
    scroller.addEventListener("mouseenter", () => {
      scrollerInner.style.animationPlayState = "paused";
    });

    scroller.addEventListener("mouseleave", () => {
      scrollerInner.style.animationPlayState = "running";
    });

    // Pause animation when user scrolls manually
    let isScrolling;
    scroller.addEventListener("scroll", () => {
      scrollerInner.style.animationPlayState = "paused";

      // Clear timeout if the user is still scrolling
      clearTimeout(isScrolling);

      // Resume animation after the user stops scrolling for 500ms
      isScrolling = setTimeout(() => {
        scrollerInner.style.animationPlayState = "running";
      }, 500);
    });

    // Ensure touch interactions pause/resume smoothly
    scroller.addEventListener("touchstart", () => {
      scrollerInner.style.animationPlayState = "paused";
    });

    scroller.addEventListener("touchend", () => {
      scrollerInner.style.animationPlayState = "running";
    });
  });
}

   
  });

