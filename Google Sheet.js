const scriptURL = 'https://script.google.com/macros/s/AKfycbwMNF9AR67yj1XfFSz4kt-a3pz21IMNGw1yQX10UTQRU3JNUkNcshex5N5twOFHmGpU/exec';
const form = document.forms['contact-form'];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Show loading message
  const popup = showPopup('Submitting your form, please wait...', 'message');

  fetch(scriptURL, {
    method: 'POST',
    body: new FormData(form)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.text();
  })
  .then(() => {
    updatePopup(popup, 'Thank you! Your form is submitted successfully.', 'success');
  })
  .catch((error) => {
    updatePopup(popup, 'Error! Your form could not be submitted.', 'error');
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
