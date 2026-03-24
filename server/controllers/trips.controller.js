const TripModel = require('../models/trip.model');
const UploadedPictureModel = require('../models/uploadedPicture.model');

async function getTripBySlug(req, res, next) {
  try {
    const trip = await TripModel.getBySlug(req.params.slug);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });

    const pictures = await UploadedPictureModel.getByTripId(trip.id);
    res.status(200).json({ success: true, trip, pictures });
  } catch (err) {
    next(err);
  }
}

async function updateTripTitle(req, res, next) {
  try {
    const trip = await TripModel.getBySlug(req.params.slug);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });

    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const newSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const updatedTrip = await TripModel.update(trip.id, { title, slug: newSlug });

    res.status(200).json({ success: true, trip: updatedTrip });
  } catch (err) {
    next(err);
  }
}

module.exports = { getTripBySlug, updateTripTitle };
