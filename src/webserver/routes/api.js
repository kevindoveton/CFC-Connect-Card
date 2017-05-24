'use strict'

const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost/connect-cards');
const CARD_SCHEMA = mongoose.Schema({
	intent: String,
	firstName: String,
	lastName: String
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

router.post('/cards', (req, res) => {
	console.log(req.body);
	const c = new Card({intent: req.body.intent});
	c.save((err, card) => {
		if (err) {
			return res.status(500).send();
		}
		return res.status(201).send();
	});
});

module.exports = router;
