'use strict'

const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost/connect-cards');
const CARD_SCHEMA = mongoose.Schema({
	intent: String,
	uuid: String,
	details: {
		firstName: String,
		lastName: String,
		gender: String,
		age: String,
		family: String,
		number: String,
		email: String,
	},
	feedback: {
		service: String,
		likeMost: String,
		likeLeast: String,
		feedback: String
	}
});
const Card = mongoose.model('Card', CARD_SCHEMA);

router.use(bodyParser.json());

router.get('/', (req, res) => {
	return res.send('api');
});

/**
 * Returns all cards
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {Array} cards - array of card objects
 */
router.get('/cards', (req, res) => {
	Card.find((err, cards) => {
		if (err) {
			console.log(err);
			return res.status(500).send();
		}
		
		return res.status(200).send(JSON.stringify(cards));
		
	})
});

/**
 * Deletes an array of cards
 * @param {Array} cards ids
 */
router.delete('/cards', (req, res) => {
	for (var i = 0; i < req.body.length; i++) {
		console.log(req.body[i]);
		Card.findByIdAndRemove(req.body[i], (err, result) => {
			console.log(result);
		});
	}
	return res.status(204).send();
});

/** 
 * returns a single card
 * @param {String} card_id
 * @returns {Object} card - the card object
 */
router.get('/cards/:card_id', (req, res) => {
	Card.findById(req.params.card_id, (err, card) => {
		if (err) {
			console.log(err);
			return res.status(500).send();
		}
		return res.status(200).send(JSON.stringify(card));
	})
});

/**
 * delete a single card
 * @param {String} id - the card id
 * @returns {null}
 */
router.delete('/cards/:card_id', (req, res) => {
	Card.findByIdAndRemove(req.params.card_id, (err, result) => {
		if (err) {
			return res.status(500).send();
		}
		return res.status(204).send();
	});
});

/**
 * create a new card
 * @param {Object} card object
 * @returns {String} card id
 */
router.post('/cards', (req, res) => {
	console.log(req.body);
	const c = new Card(req.body);
	c.save((err, card) => {
		if (err) {
			return res.status(500).send();
		}
		return res.status(201).send(card.id);
	});
});

module.exports = router;
