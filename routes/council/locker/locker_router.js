var express = require('express');
var router = express.Router();



var lockerregisterRouter = require('./lockerregister');
var lockercancelRouter = require('./lockercancel');
var lockerlistRouter = require('./lockerlist');


var lockeragreeRouter = require('./lockeragree');
var lockersearchRouter = require('./lockersearch');
var lockerlistfileRouter = require('./lockerlist_file');


var mylockerRouter = require('./mylocker');


router.use('/lockerregister', lockerregisterRouter);
router.use('/lockercancel', lockercancelRouter);
router.use('/lockerlist', lockerlistRouter);

router.use('/lockeragree', lockeragreeRouter);
router.use('/lockersearch', lockersearchRouter);
router.use('/lockerlist_file', lockerlistfileRouter);


router.use('/mylocker', mylockerRouter);

module.exports = router;
