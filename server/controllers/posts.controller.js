const PostModel            = require('../models/post.model');
const postView             = require('../views/post.view');
const { generateStory }     = require('../services/gemini.service');
const { getWeather }       = require('../services/weather.service');
const { reverseGeocode }   = require('../services/geocoding.service');

async function getAllPosts(req, res, next) {
  try {
    const posts = await PostModel.getAll(req.query);
    postView.list(res, posts);
  } catch (err) { next(err); }
}

async function getMyPosts(req, res, next) {
  try {
    const posts = await PostModel.getByUser(req.user.id);
    postView.list(res, posts);
  } catch (err) { next(err); }
}

async function getPostById(req, res, next) {
  try {
    const post = await PostModel.getById(req.params.id);
    if (!post) return postView.notFound(res);
    postView.single(res, post);
  } catch (err) { next(err); }
}

async function generatePost(req, res, next) {
  try {
    const { imageUrls, exifData = [] } = req.body;

    // 1. Reverse Geocode all images to get city/country/poi
    const locations = await Promise.all(exifData.map((e) => reverseGeocode(e.lat, e.lng)));
    const first     = exifData[0] || {};
    const weather   = await getWeather(first.lat, first.lng);

    // 2. Prepare standardized picture objects for the Gemini Service
    const pictures = imageUrls.map((url, index) => {
      const exif = exifData[index] || {};
      const loc  = locations[index] || { city: null, country: null, poi: null };
      
      return {
        url,
        id:           exif.id || `img_${index}`,
        city:         loc.city,
        country:      loc.country,
        poi:          loc.poi,
        date_taken:   exif.date || null,
        weather_temp: weather ? weather.temp : null
      };
    });

    // 3. Invoke Gemini for the full travel story
    const geminiResult = await generateStory(pictures);

    // 4. Return the structured story data
    postView.generated(res, {
      title:              geminiResult.catchy_title,
      captionAi:          geminiResult.full_narrative_summary,
      photos:             geminiResult.photos,
      points_of_interest: geminiResult.points_of_interest,
      locationName:       locations.find(l => l?.city)?.city || locations.find(Boolean)?.country || null,
      lat:                first.lat  || null,
      lng:                first.lng  || null,
      dateTaken:          exifData[0]?.date || null,
      weather,
    });
  } catch (err) { next(err); }
}

async function createPost(req, res, next) {
  try {
    const post = await PostModel.create({ userId: req.user.id, ...req.body });
    postView.created(res, post);
  } catch (err) { next(err); }
}

async function updatePost(req, res, next) {
  try {
    const post = await PostModel.update(req.params.id, req.user.id, req.body);
    if (!post) return postView.notFound(res);
    postView.single(res, post);
  } catch (err) { next(err); }
}

async function deleteMyPost(req, res, next) {
  try {
    const post = await PostModel.getById(req.params.id);
    if (!post) return postView.notFound(res);
    if (post.user_id !== req.user.id) return postView.forbidden(res);
    await PostModel.delete(req.params.id);
    postView.deleted(res);
  } catch (err) { next(err); }
}

module.exports = { getAllPosts, getMyPosts, getPostById, generatePost, createPost, updatePost, deleteMyPost };
