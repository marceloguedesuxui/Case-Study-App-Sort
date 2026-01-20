document.addEventListener("DOMContentLoaded", () => {
  const scrollProgress = document.querySelector(".scroll-progress");

  window.addEventListener("scroll", () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrolled + "%";

    const heroImg = document.querySelector(".hero-img");
    if (heroImg) {
      heroImg.style.transform = `rotateX(${10 - scrolled * 0.1}deg) scale(${0.95 + scrolled * 0.0005})`;
    }
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        if (entry.target.classList.contains("process-steps")) {
          const steps = entry.target.querySelectorAll(".step");
          steps.forEach((step, index) => {
            setTimeout(() => {
              step.classList.add("visible");
            }, index * 200);
          });
        }

        if (entry.target.classList.contains("progress-fill")) {
          const targetWidth = entry.target.getAttribute("data-target");
          entry.target.style.width = targetWidth;
        }

        if (entry.target.classList.contains("wireframes-grid")) {
             const frames = entry.target.querySelectorAll(".wireframe");
             frames.forEach((frame, index) => {
                 setTimeout(() => {
                     frame.classList.add("visible");
                 }, index * 150);
             });
        }

        if (entry.target.classList.contains("mockup-showcase")) {
             const mockups = entry.target.querySelectorAll(".screen-mockup");
             mockups.forEach((mockup, index) => {
                 setTimeout(() => {
                     mockup.classList.add("visible");
                 }, index * 200);
             });
        }

      } else {
        if (entry.target.classList.contains("feature-card")) {
          entry.target.classList.remove("visible");
        }
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(
      ".step, .card, .glass-card, .comp-card, .wf-screen, .stat-card, .progress-fill, .result-card, .feature-card, .wireframes-grid, .mockup-showcase",
    )
    .forEach((el) => {
      if (!el.classList.contains("progress-fill") && !el.classList.contains("feature-card")) {
        el.style.opacity = "0";
        
        if (el.classList.contains("slide-in-left")) {
             el.style.transform = "translateX(-200px)";
        } else if (el.classList.contains("slide-in-right")) {
             el.style.transform = "translateX(200px)";
        } else if (el.classList.contains("wireframe") || el.classList.contains("screen-mockup")) {
             el.style.transform = "translateY(20px)";
        } else {
             el.style.transform = "translateY(20px)";
        }
        
        el.style.transition = "opacity 1.2s ease, transform 1.2s ease";
      }
      observer.observe(el);
    });

  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
        .visible:not(.feature-card) {
            opacity: 1 !important;
            transform: translate(0, 0) !important;
        }
    `;
  document.head.appendChild(styleSheet);

  const menuIcon = document.querySelector(".menu-icon");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (menuIcon && navLinks) {
    menuIcon.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      const icon = menuIcon.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.classList.remove("ph-list");
        icon.classList.add("ph-x");
      } else {
        icon.classList.remove("ph-x");
        icon.classList.add("ph-list");
      }
    });

    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = menuIcon.querySelector("i");
        icon.classList.remove("ph-x");
        icon.classList.add("ph-list");
      });
    });
  }
  function setupTypewriter(element, repeat = true) {
    if (!element) return;

    let textToType = element.getAttribute("data-original-text");

    if (!textToType) {
        if (element.querySelector('br')) {
             const clone = element.cloneNode(true);
             const brs = clone.querySelectorAll('br');
             brs.forEach(br => {
                 br.replaceWith("\n");
             });
             textToType = clone.textContent.trim();
             element.style.whiteSpace = "pre-line"; 
        } else {
             textToType = element.textContent.trim();
        }
        element.setAttribute("data-original-text", textToType);
    }
    
    element.textContent = ""; 
    let charIndex = 0;
    let typeInterval;
    let hasTyped = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!repeat && hasTyped) return;

                element.textContent = "";
                charIndex = 0;
                clearInterval(typeInterval);
                hasTyped = true;
                
                typeInterval = setInterval(() => {
                    if (charIndex < textToType.length) {
                        element.textContent += textToType.charAt(charIndex);
                        charIndex++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 100);

                if (!repeat) {
                    observer.unobserve(element);
                }
            } else {
                if (repeat) {
                    clearInterval(typeInterval);
                    element.textContent = ""; 
                }
            }
        });
    }, { threshold: 0.1 });

    observer.observe(element);
  }

  function setupCharacterAnimation(element, repeat = true) {
      if (!element) return;
      
      let text = "";    
      if (element.querySelector('br')) {
           const clone = element.cloneNode(true);
           const brs = clone.querySelectorAll('br');
           brs.forEach(br => {
               br.replaceWith("\n");
           });
           text = clone.textContent.trim();
           element.style.whiteSpace = "pre-line"; 
      } else {
           text = element.textContent.trim();
      }

      element.innerHTML = '';
      
      [...text].forEach(char => {
          if (char === '\n') {
              const br = document.createElement('br');
              element.appendChild(br);
              return;
          }
          
          const span = document.createElement('span');
          span.textContent = char;
          span.classList.add('char');
          if (char === ' ') span.style.width = '0.3em'; 
          element.appendChild(span);
      });

      const chars = element.querySelectorAll('.char');
      let hasAnimated = false;
      
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                   if (!repeat && hasAnimated) return;
                   
                   hasAnimated = true;
                   
                  chars.forEach((char, index) => {
                       char.classList.remove('visible');
                       
                      setTimeout(() => {
                          char.classList.add('visible');
                      }, index * 60); 
                  });
                  
                  if (!repeat) observer.unobserve(element);
              } else {
                  if (repeat) {
                      chars.forEach(char => {
                          char.classList.remove('visible');
                      });
                  }
              }
          });
      }, { threshold: 0.1 });

      observer.observe(element);
  }

  const tagElement = document.querySelector(".hero-content .tag");
  setupCharacterAnimation(tagElement, true);

  document.querySelectorAll(".section-title").forEach(title => {
      setupCharacterAnimation(title, false);
  });

});
