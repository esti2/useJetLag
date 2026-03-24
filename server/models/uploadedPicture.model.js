const pool = require('../db/pool');

const UploadedPictureModel = {
  async create({ url, dateTaken, latitude, longitude, tripId, weatherTemp, weatherIcon }) {
    const { rows } = await pool.query(
      `INSERT INTO uploaded_pictures (url, date_taken, latitude, longitude, trip_id, weather_temp, weather_icon)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [url, dateTaken, latitude, longitude, tripId, weatherTemp, weatherIcon]
    );
    return rows[0];
  },

  async getAll() {
    const { rows } = await pool.query(
      `SELECT * FROM uploaded_pictures ORDER BY created_at ASC`
    );
    return rows;
  },

  async getByTripId(tripId) {
    const { rows } = await pool.query(
      `SELECT * FROM uploaded_pictures WHERE trip_id = $1 ORDER BY created_at ASC`,
      [tripId]
    );
    return rows;
  }
};

module.exports = UploadedPictureModel;
