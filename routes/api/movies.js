const express = require('express');
const router = express.Router();
const { getAllMovies, getMovie, getAllMoviesWithRatings, updateMovie, deleteMovie } = require('../../models/movie');



// handle all the routes
const sendJSONresp = (req, res) => res.json(res.rows);

// get all movies
router.route('/')
	.get(getAllMovies, sendJSONresp)
	.put()
	.delete();


// // Get movies withrating BONUS
// router.route('/ratings')
// 	.get(getAllMoviesWithRatings, sendJSONresp)
// 	.put()
// 	.delete();


// Get single movie
router.route('/:id')
	.get(getMovie, sendJSONresp)
	.put(updateMovie)
	.delete(deleteMovie);


module.exports = router;
