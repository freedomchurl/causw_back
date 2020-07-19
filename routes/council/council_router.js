var express = require('express');
var router = express.Router();



var lockerRouter = require('./locker/locker_router');
var postRouter = require('./post/post_router');
var suggestionRouter = require('./suggestion/suggestion_router');

router.use('/locker', lockerRouter);
router.use('/post', postRouter);
router.use('/suggestion', suggestionRouter);

module.exports = router;
