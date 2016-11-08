const db = require('../lib/dbConnect');

// Your middleware MUST allow limit and offset to be sent
// via query parameters to the db for filtering

// default limit
const limit = 10;
// default offset
const offset = 0;

function getAllMovies(req, res, next) {
// implement get all movies
	db.any(`SELECT * FROM movies ORDER BY id LIMIT ${limit} OFFSET ${offset};`)
	.then((movies) => {
		res.rows= movies;
		next();
	})
	.catch(err => next(err));
}

function getMovie(req, res, next) {
// implement get single movie
	const movieID = parseInt(req.params.id);
	db.one(`SELECT * FROM movies WHERE id = $1`, movieID)
	.then ((oneMovie) => {
		res.rows = oneMovie;
		next();
	})
	.catch(err => next(err));
}

function updateMovie(req, res, next) {
// implement update
	req.body.ID = Number.parseInt(req.params.id);
	db.none(`UPDATE movies 
		SET title=$2 
		WHERE id=$1;`, 
		[req.body.ID, req.body.title])
	.then(function () {
		res.status(200)
		.json({
			status: 'success',
			message: 'update'
		});
	})
	.catch(err => next(err));
}

function deleteMovie(req, res, next) {
// implement delete
// 	deleteID = Number.parseInt(req.params.id);
// 	db.none(`DELETE FROM movies WHERE id=$1`, [deleteID])
// 	.then (function() {
// 		res.status(200)
// 		.json({
// 			status: 'success',
// 			message: 'update'
// 		});
// 	})
// 	.catch(err => next(err));
// }
	const dID = parseInt(req.params.id);
	db.result(`DELETE FROM movies WHERE id=$1`, [dID])
	.then (function (result){
		res.status(200)
		.json({
			status: 'success',
			message: 'deleted'
		});
	})
	.catch(err => next(err));
}

// // BONUS
// function getAllMoviesWithRatings(req, res, next) {

// }

module.exports = {
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  // getAllMoviesWithRatings
};
