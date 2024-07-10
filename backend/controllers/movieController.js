const Movie = require('../models/Movie');
const asyncHandler = require('express-async-handler');

const getMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
});

const addMovie = asyncHandler(async (req, res) => {
    const { name, time, year, image, introduce } = req.body;
    const movie = new Movie({ name, time, year, image, introduce });
    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
});

const updateMovie = asyncHandler(async (req, res) => {
    const { name, time, year, image, introduce } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (movie) {
        movie.name = name;
        movie.time = time;
        movie.year = year;
        movie.image = image;
        movie.introduce = introduce;

        const updatedMovie = await movie.save();
        res.json(updatedMovie);
    } else {
        res.status(404);
        throw new Error('Movie not found');
    }
});

const deleteMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
        await movie.remove();
        res.json({ message: 'Movie removed' });
    } else {
        res.status(404);
        throw new Error('Movie not found');
      }
    });
    
    const searchMovies = asyncHandler(async (req, res) => {
      const keyword = req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          }
        : {};
    
      const movies = await Movie.find({ ...keyword });
      res.json(movies);
    });
    
    const sortMovies = asyncHandler(async (req, res) => {
      const sortOrder = req.query.order === 'desc' ? -1 : 1;
      const movies = await Movie.find().sort({ year: sortOrder });
      res.json(movies);
    });
    
    const uploadImage = asyncHandler(async (req, res) => {
      if (req.file) {
        res.status(201).json({
          imagePath: `/uploads/${req.file.filename}`,
        });
      } else {
        res.status(400);
        throw new Error('Image not uploaded');
      }
    });
    
    module.exports = { getMovies, addMovie, updateMovie, deleteMovie, searchMovies, sortMovies, uploadImage };
    