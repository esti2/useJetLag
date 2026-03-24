require('dotenv').config({ path: './.env' });
const pool = require('./db/pool');
pool.query('SELECT id, date_taken, latitude, longitude, weather_temp, weather_icon FROM uploaded_pictures ORDER BY created_at DESC LIMIT 5')
  .then(res => {
    console.log(res.rows);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
