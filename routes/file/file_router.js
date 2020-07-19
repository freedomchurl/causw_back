var express = require('express');
var router = express.Router();

var getRouter = require('./getfile');
var downloadRouter = require('./downloadfile');

router.use('/getfile', getRouter);
router.use('/downloadfile', downloadRouter);

module.exports = router;
