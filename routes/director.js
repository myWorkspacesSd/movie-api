const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Models
const Director = require('../models/Director');

//add a new director
router.post('/', (req, res, next) => {
    const director = new Director(req.body);
    const promise = director.save();

    promise.then((director) => {
        res.json(director);
    }).catch((err) => {
        res.json(err);
    });
});

//get all directors
// router.get('/', (req, res, next) => {
//     const promise = Director.find({});

//     promise.then((directors) => {
//         res.json(directors);
//     }).catch((err) => {
//         res.json(err);
//     });
// });

//get detail of a director
router.get('/:directorId', (req, res) => {
	const promise = Director.aggregate([
		{
			$match: {
				'_id': mongoose.Types.ObjectId(req.params.directorId)
			}
		},
		{
			$lookup: {
				from: 'movies',
				localField: '_id',
				foreignField: 'directorId',
				as: 'movies'
			}
		},
		{
			$unwind: {
				path: '$movies',
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$group: {
				_id: {
					_id: '$_id',
					name: '$name',
					surname: '$surname',
					bio: '$bio'
				},
				movies: {
					$push: '$movies'
				}
			}
		},
		{
			$project: {
				_id: '$_id._id',
				name: '$_id.name',
				surname: '$_id.surname',
				movies: '$movies'
			}
		}
	]);

	promise.then((data) => {
		res.json(data);
	}).catch((err) => {
		res.json(err);
	});
});

//get directors with movies
router.get('/', (req, res) => {
	const promise = Director.aggregate([
		{
			$lookup: {
				from: 'movies',
				localField: '_id',
				foreignField: 'directorId',
				as: 'movies'
			}
		},
		{
			$unwind: {
				path: '$movies',
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$group: {
				_id: {
					_id: '$_id',
					name: '$name',
					surname: '$surname',
					bio: '$bio'
				},
				movies: {
					$push: '$movies'
				}
			}
		},
		{
			$project: {
				_id: '$_id._id',
				name: '$_id.name',
				surname: '$_id.surname',
				movies: '$movies'
			}
		}
	]);

	promise.then((data) => {
		res.json(data);
	}).catch((err) => {
		res.json(err);
	});
});

//update a director
router.put('/:directorId', (req, res, next) => {
    const promise = Director.findByIdAndUpdate(req.params.directorId, req.body, {new: true});

    promise.then((director) => {
        res.json(director);
    }).catch((err) => {
        res.json(err);
    });
});

//delete a director
router.delete('/:directorId', (req, res, next) => {
    const promise = Director.findByIdAndRemove(req.params.directorId);

    promise.then((director) => {
        res.json(director);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;