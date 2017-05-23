"use strict"

const router = require('express').Router();

router.get('/', (req, res) => {
	return res.send('index');
})

module.exports = router;
