'use strict'

const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost/connect-cards');
const CARD_SCHEMA = mongoose.Schema({
	intent: String,
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

router.get('/cards', (req, res) => {
	Card.find((err, cards) => {
		if (err) {
			console.log(err);
			return res.status(500).send();
		}
		return res.status(200).send(JSON.stringify(cards));
	})
});

router.delete('/cards', (req, res) => {
	for (var i = 0; i < req.body.length; i++) {
		console.log(req.body[i]);
		Card.findByIdAndRemove(req.body[i], (err, result) => {
			console.log(result);
		});
	}
	return res.status(204).send();
});

router.get('/cards/:card_id', (req, res) => {
	Card.findById(req.params.card_id, (err, card) => {
		if (err) {
			console.log(err);
			return res.status(500).send();
		}
		return res.status(200).send(JSON.stringify(card));
	})
});

router.delete('/cards/:card_id', (req, res) => {
	Card.findByIdAndRemove(req.params.card_id, (err, result) => {
		if (err) {
			return res.status(500).send();
		}
		return res.status(204).send();
	});
});

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
