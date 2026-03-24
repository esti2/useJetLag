require('dotenv').config({ path: './.env' });
const apiKey = process.env.OPENWEATHER_API_KEY;
console.log('Using Key:', apiKey);

// Historical Test
fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=51.769&lon=-1.261&dt=1528490788&appid=${apiKey}&units=metric&lang=en`)
  .then(res => res.text())
  .then(text => console.log('Historical Response:', text))
  .catch(console.error);

// Current Fallback Test
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=51.769&lon=-1.261&appid=${apiKey}&units=metric&lang=en`)
  .then(res => res.text())
  .then(text => console.log('Current Fallback Response:', text))
  .catch(console.error);
