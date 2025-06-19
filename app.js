const scriptURL = 'https://script.google.com/macros/s/AKfycbyxjsegvoT367zI-zmcaVmnp_t-7o9OZk9PXbtn5l8A9yBJTk6Adl-bTIhkLO7NHd8oVw/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      msg.innerHTML = "Message Sent!";
      setTimeout(() => msg.innerHTML = "", 5000);
      form.reset();
    })
    .catch(error => console.error('Error!', error.message));
}); 