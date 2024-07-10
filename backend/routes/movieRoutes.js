const express = require('express');
const {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
  sortMovies,
  uploadImage,
} = require('../controllers/movieController');
const upload = require('../middleware/upload');
const router = express.Router();

router.route('/').get(getMovies).post(addMovie);
router.route('/:id').put(updateMovie).delete(deleteMovie);
router.get('/search', searchMovies);
router.get('/sort', sortMovies);
router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;
