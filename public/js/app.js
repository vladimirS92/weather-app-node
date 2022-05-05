const weatherMsg = document.querySelector('#message');
const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const location = searchInput.value;

  weatherMsg.textContent = 'Loading...';

  fetch('/weather?address=' + location, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        weatherMsg.textContent = data.error;
      } else {
        weatherMsg.textContent = data.location + '. ' + data.forcast;
      }
    });
});
