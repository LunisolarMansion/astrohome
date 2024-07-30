const scriptURL = 'https://script.google.com/macros/s/AKfycbzgNIt0QHO0MMfS3-RX1qtPZ68-lN6YQO13h953C8zihnz5o28oEEKLLZVtLgYxQAtv/exec';
const form = document.forms['contact-form'];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Show loading message
  const popup = showPopup('Submitting your form, please wait...', false);

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(() => {
      updatePopup(popup, 'Thank you! Your form is submitted successfully.', true);
    })
    .catch((error) => {
      updatePopup(popup, 'Error! Your form could not be submitted.', false);
      console.error('Error!', error.message);
    });
});

function showPopup(message, isSuccess) {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.textContent = message;
  if (isSuccess) {
    popup.classList.add('success');
  }

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(popup);
  });

  popup.appendChild(closeButton);
  document.body.appendChild(popup);

  return popup;
}

function updatePopup(popup, message, isSuccess) {
  popup.textContent = message;
  popup.classList.toggle('success', isSuccess);

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(popup);
  });

  popup.appendChild(closeButton);
}
