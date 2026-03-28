/* =========================================
   TYPING ANIMATION
   ========================================= */
const roles = [
  "full-stack web apps.",
  "clean, scalable code.",
  "mobile experiences.",
  "things that matter."
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typedEl = document.getElementById("typed-text");

function typeEffect() {
  if (!typedEl) return;

  const current = roles[roleIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 45 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 350;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

/* =========================================
   TAB FUNCTIONALITY
   ========================================= */
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (var tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (var tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

/* =========================================
   MOBILE MENU
   ========================================= */
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
  sidemenu.style.right = "0";
}

function closemenu() {
  sidemenu.style.right = "-260px";
}

// Auto-close menu when a nav link is clicked
document.querySelectorAll('#sidemenu li a').forEach(function(link) {
  link.addEventListener('click', closemenu);
});

/* =========================================
   SCROLL REVEAL (Intersection Observer)
   ========================================= */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(function(el) {
  revealObserver.observe(el);
});

/* =========================================
   CONTACT FORM (Google Sheets)
   ========================================= */
const scriptURL = 'https://script.google.com/macros/s/AKfycbyxjsegvoT367zI-zmcaVmnp_t-7o9OZk9PXbtn5l8A9yBJTk6Adl-bTIhkLO7NHd8oVw/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(function(response) {
        msg.innerHTML = "Message sent successfully!";
        setTimeout(function() { msg.innerHTML = ""; }, 5000);
        form.reset();
      })
      .catch(function(error) {
        console.error('Error!', error.message);
      });
  });
}
