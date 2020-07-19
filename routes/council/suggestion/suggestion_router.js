var express = require('express');
var router = express.Router();

var sendRouter = require('./send');
var listRouter = require('./list');
var finishRouter = require('./finish');
var processingRouter = require('./processing');
var showRouter = require('./show');
var countRouter = require('./count');

router.use('/send', sendRouter);
router.use('/list', listRouter);
router.use('/finish', finishRouter);
router.use('/processing', processingRouter);
router.use('/show', showRouter);
router.use('/count', countRouter);


module.exports = router;
