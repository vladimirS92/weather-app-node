const weatherMsg = document.getElementById('message');
const weatherImg = document.getElementById('image');
const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');

//init state
weatherImg.src = '../img/favicon.png';
weatherMsg.textContent = 'Type location';

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
        weatherImg.src = data.image;
        weatherMsg.textContent = data.location + '. ' + data.forcast;
      }
    });
});
