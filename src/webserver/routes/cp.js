'use strict'

const router = require('express').Router();
const path = require('path')
const views = path.join(__dirname, '../../views-cp/pug/');

router.get('/', (req, res) => {
	return res.render(path.join(views, 'index'));
})

module.exports = router;
