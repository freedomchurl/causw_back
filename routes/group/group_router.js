var express = require('express');
var router = express.Router();


var createRouter = require('./create');
var deleteRouter = require('./delete');
var searchallRouter = require('./searchall');
var searchRouter = require('./search');
var signupRouter = require('./signup');
var mygroupRouter = require('./mygroup');
var agreeRouter = require('./agree');
var signoutRouter = require('./signout');
var agreeinfoRouter = require('./agreeinfo');
var agreecheckRouter = require('./agreecheck');
var memberlistRouter = require('./memberlist');
var editRouter = require('./edit');

var postRouter = require('./post/post_router');
var suggestionRouter = require('./suggestion/suggestion_router');

var delegateRouter = require('./delegateAuthGroup');


router.use('/create', createRouter);
router.use('/delete', deleteRouter);
router.use('/searchall', searchallRouter);
router.use('/search', searchRouter);
router.use('/signup', signupRouter);
router.use('/mygroup', mygroupRouter);
router.use('/agree', agreeRouter);
router.use('/signout', signoutRouter);
router.use('/post', postRouter);
router.use('/agreeinfo', agreeinfoRouter);
router.use('/agreecheck', agreecheckRouter);
router.use('/memberlist', memberlistRouter);
router.use('/edit', editRouter);
router.use('/suggestion', suggestionRouter);
router.use('/delegate',delegateRouter);

module.exports = router;
