var express = require('express');
var router = express.Router();

var getlastverRouter = require('./getlastver');
var getrequiredverRouter = require('./getrequiredver');
var updateverRouter = require('./updatever');

router.use('/getlastver', getlastverRouter);
router.use('/getrequiredver', getrequiredverRouter);
router.use('/updatever', updateverRouter);

module.exports = router;
