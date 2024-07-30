const scriptURL = 'https://script.google.com/macros/s/AKfycbzgNIt0QHO0MMfS3-RX1qtPZ68-lN6YQO13h953C8zihnz5o28oEEKLLZVtLgYxQAtv/exec';
const form = document.forms['contact-form'];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(() => {
      showPopup('Thank you! Your form is submitted successfully.');
    })
    .catch((error) => console.error('Error!', error.message));
});

function showPopup(message) {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.textContent = message;

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(popup);
  });

  popup.appendChild(closeButton);
  document.body.appendChild(popup);
}
