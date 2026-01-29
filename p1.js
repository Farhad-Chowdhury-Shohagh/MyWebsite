var tablinks =document.getElementsByClassName("tab-links");
var tabcontents =document.getElementsByClassName("tab-contents");

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}



const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#sidemenu a");
const navHeight = document.getElementById("navbar").offsetHeight;

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 5;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});



// Mobile menu toggle – fixed & production-ready
document.addEventListener('DOMContentLoaded', () => {
  const debug = false; // set true if you want logs

  const sidemenu = document.getElementById('sidemenu');
  const navToggle = document.querySelector('.nav-toggle');

  if (!sidemenu || !navToggle) {
    if (debug) console.error('[menu] Missing sidemenu or nav-toggle');
    return;
  }

  // Initial ARIA state
  navToggle.setAttribute('aria-expanded', 'false');
  sidemenu.setAttribute('aria-hidden', 'true');

  function setMenuOpen(open) {
    sidemenu.classList.toggle('open', open);
    sidemenu.setAttribute('aria-hidden', String(!open));
    navToggle.setAttribute('aria-expanded', String(open));

    if (debug) console.log('[menu] open =', open);
  }

  function toggleMenu() {
    setMenuOpen(!sidemenu.classList.contains('open'));
  }

  // Toggle button click
  navToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation(); // 🔑 prevents instant close
    toggleMenu();
  });

  // Close when clicking a link
  sidemenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuOpen(false);
  });

  // Click outside to close
  document.addEventListener('click', (e) => {
    if (!sidemenu.classList.contains('open')) return;
    if (sidemenu.contains(e.target) || navToggle.contains(e.target)) return;
    setMenuOpen(false);
  });
});
