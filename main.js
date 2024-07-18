const form = document.querySelector('form');
const firstName = document.getElementById('first__name');
const lastName = document.getElementById('last__name');
const email = document.getElementById('email');
const queryType = document.getElementsByName('query__type');
const message = document.getElementById('message');
const consent = document.getElementById('consent');
const successMessage = document.querySelector('.success__message');

const errorMessages = document.querySelectorAll('.error__msg');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  clearErrors();

  let isValid = true;

  if (!firstName.value.trim()) {
    displayError(firstName);
    isValid = false;
  }

  if (!lastName.value.trim()) {
    displayError(lastName);
    isValid = false;
  }

  if (!validateEmail(email.value)) {
    displayError(email);
    isValid = false;
  }

  if (![...queryType].some((radio) => radio.checked)) {
    displayError(document.querySelector('fieldset'));
    isValid = false;
  }

  if (!message.value.trim()) {
    displayError(message);
    isValid = false;
  }

  if (!consent.checked) {
    displayError(consent);
    isValid = false;
  }

  if (isValid) {
    successMessage.classList.remove('hidden');
  }
});

function displayError(element) {
  let errorElement;

  // RADIO
  if (element.type === 'fieldset') {
    errorElement = element.querySelector('.error__msg');
  } else if (element.type === 'checkbox') {
    // CHECKBOX
    errorElement = element.parentElement.querySelector('.error__msg');
  } else {
    // OTHER
    errorElement = element.nextElementSibling;
  }

  if (errorElement && errorElement.classList.contains('error__msg')) {
    errorElement.style.display = 'block';
  }
}

function clearErrors() {
  const errorMessages = document.querySelectorAll('.error__msg');
  errorMessages.forEach((msg) => (msg.style.display = 'none'));
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
