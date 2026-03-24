const router = require('express').Router();
const { getTripBySlug, updateTripTitle } = require('../controllers/trips.controller');

router.get('/:slug', getTripBySlug);
router.put('/:slug', updateTripTitle);

module.exports = router;
