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

function opentab(event, tabname) {
  for (var tablink of tablinks) {
    tablink.classList.remove("active-link");
    tablink.setAttribute("aria-selected", "false");
  }
  for (var tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  event.currentTarget.setAttribute("aria-selected", "true");
  document.getElementById(tabname).classList.add("active-tab");
}

/* =========================================
   MOBILE MENU
   ========================================= */
var sidemenu = document.getElementById("sidemenu");
var menuOpenBtn = document.querySelector(".menu-open-btn");

function openmenu() {
  sidemenu.style.right = "0";
  if (menuOpenBtn) menuOpenBtn.setAttribute("aria-expanded", "true");
}

function closemenu() {
  sidemenu.style.right = "-260px";
  if (menuOpenBtn) menuOpenBtn.setAttribute("aria-expanded", "false");
}

// Auto-close menu when a nav link is clicked
document.querySelectorAll('#sidemenu li a').forEach(function(link) {
  link.addEventListener('click', closemenu);
});

// Escape closes the mobile menu and hands focus back to the toggle, so
// keyboard users aren't stranded in a closed menu.
document.addEventListener('keydown', function(e) {
  if (e.key === "Escape" && sidemenu.style.right === "0px") {
    closemenu();
    if (menuOpenBtn) menuOpenBtn.focus();
  }
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

function showMessage(text, isError) {
  msg.textContent = text;
  msg.style.color = isError ? "#f85149" : "var(--color-success)";
  setTimeout(function() { msg.textContent = ""; }, 5000);
}

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Honeypot: real users never see or fill this field (see index.html).
    // Silently no-op instead of telling a bot exactly which check caught it.
    if (form.elements['company'] && form.elements['company'].value) {
      form.reset();
      return;
    }

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(function(response) {
        if (!response.ok) throw new Error('Request failed with status ' + response.status);
        showMessage("Message sent successfully!", false);
        form.reset();
      })
      .catch(function(error) {
        console.error('Error!', error.message);
        showMessage("Something went wrong sending your message. Please try again or email me directly.", true);
      });
  });
}
