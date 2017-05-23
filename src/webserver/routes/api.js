"use strict"

const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/', (req, res) => {
	return res.send('api');
})

module.exports = router;
