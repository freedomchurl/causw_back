var express = require('express');
var router = express.Router();

var postRouter = require('./post/post_router');

router.use('/post', postRouter);

module.exports = router;
