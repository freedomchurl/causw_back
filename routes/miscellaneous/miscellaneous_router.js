var express = require('express');
var router = express.Router();


var incrementRouter = require('./increment');

router.use('/increment', incrementRouter);


module.exports = router;
