var express = require('express');
var router = express.Router();
const my_module = require('../my_module/downloadfile');


/* GET users listing. */
router.post('/', function (req, res, next) {
//	console.log(req.body);
	my_module(req, res);
});

module.exports = router;
