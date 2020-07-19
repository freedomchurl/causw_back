var express = require('express');
var router = express.Router();

var postRouter = require('./post/post_router');
var devsuggestionRouter = require('./devsuggestion/devsuggestion_router');

router.use('/post', postRouter);
router.use('/devsuggestion', devsuggestionRouter);

module.exports = router;
