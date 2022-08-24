var express = require('express');
var router = express.Router();

//Models
const Movie = require('../models/Movie');

//add a new movie
router.post('/', (req, res, next) => {
	// const { title, imdb_score, category, country, year } = req.body;

	const movie = new Movie(req.body);
	const promise = movie.save();

	promise.then((data) => {
		res.json(data);
	}).catch((err) => {
		res.json(err);
	});
});

//get all movies
router.get('/', (req, res, next) => {
  const promise = Movie.find({});

  promise.then((movies)=>{
    res.json(movies);
  }).catch((err)=>{
    res.json(err);
  });
});

//get top 10 movies
router.get('/top10', (req, res, next) => {
  const promise = Movie.find({}).limit(10).sort({imdb_score: -1});

  promise.then((movies)=>{
    res.json(movies);
  }).catch((err)=>{
    res.json(err);
  });
});

//get detail of a movie
router.get('/:movieId', (req, res, next) => {
  const promise = Movie.findById(req.params.movieId);

  promise.then((movie) => {
    if(!movie)
    next({ message: 'The movie was not found.', code: 99 });

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });  
});

//update a movie
router.put('/:movieId', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movieId, req.body, {new: true});

  promise.then((movie) => {
    if(!movie)
    next({ message: 'The movie was not found.', code: 99 });

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });  
});

//delete a movie
router.delete('/:movieId', (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movieId);

  promise.then((movie) => {
    if(!movie)
    next({ message: 'The movie was not found.', code: 99 });

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });  
});

//between
router.get('/between/:startYear/:endYear', (req, res, next) => {
  const {startYear, endYear} = req.params;
  const promise = Movie.find({
    year : { '$gte': startYear, '$lte': endYear}
  });

  promise.then((movies)=>{
    res.json(movies);
  }).catch((err)=>{
    res.json(err);
  });
});

module.exports = router;
