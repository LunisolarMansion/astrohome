const scriptURL = 'https://script.google.com/macros/s/AKfycbzgNIt0QHO0MMfS3-RX1qtPZ68-lN6YQO13h953C8zihnz5o28oEEKLLZVtLgYxQAtv/exec';
const form = document.forms['contact-form'];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Show loading message
  const popup = showPopup('Submitting your form, please wait...');

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(() => {
      updatePopup(popup, 'Thank you! Your form is submitted successfully.');
    })
    .catch((error) => {
      updatePopup(popup, 'Error! Your form could not be submitted.');
      console.error('Error!', error.message);
    });
});

function showPopup(message, type) {
  const popup = document.createElement('div');
  popup.className = `popup ${type}`;
  popup.textContent = message;

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(popup);
  });

  popup.appendChild(closeButton);
  document.body.appendChild(popup);

  return popup;
}

function updatePopup(popup, message, type) {
  popup.className = `popup ${type}`;
  popup.textContent = message;

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(popup);
  });

  popup.appendChild(closeButton);
}

// Use like this in your event listeners:
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const popup = showPopup('Submitting your form, please wait...', 'message');

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(() => {
      updatePopup(popup, 'Thank you! Your form is submitted successfully.', 'success');
    })
    .catch((error) => {
      updatePopup(popup, 'Error! Your form could not be submitted.', 'error');
      console.error('Error!', error.message);
    });
});
