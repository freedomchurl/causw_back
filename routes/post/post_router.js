var express = require('express');
var router = express.Router();

var postinglistRouter = require('./postinglist');
var postingcreateRouter = require('./postingcreate');
var postingeditRouter = require('./postingedit');
var postingdeleteRouter = require('./postingdelete');
var postingshowRouter = require('./postingshow');
var postingcountRouter = require('./postingcount');

//var picturetestRouter = require('./picturetest');
//var picturedeleteRouter = require('./picturedelete');

//var commentlistRouter = require('./commentlist');
//var commentcreateRouter = require('./commentcreate');
var commenteditRouter = require('./commentedit');
//var commentdeleteRouter = require('./commentdelete');


//var searchcontentRouter = require('./searchcontent');
//var searchwriterRouter = require('./searchwriter');

router.use('/postingcreate', postingcreateRouter);
router.use('/postingedit', postingeditRouter);
router.use('/postingdelete', postingdeleteRouter);
router.use('/list_info', postinglistRouter);
router.use('/postingshow', postingshowRouter);
router.use('/request_number', postingcountRouter);

//router.use('/picturetest', picturetestRouter);
//router.use('/picturedelete', picturedeleteRouter);

//router.use('/commentcreate', commentcreateRouter);
router.use('/commentedit', commenteditRouter);
//router.use('/commentdelete', commentdeleteRouter);
//router.use('/commentlist', commentlistRouter);

//router.use('/searchcontent', searchcontentRouter);
//router.use('/searchwriter', searchwriterRouter);


module.exports = router;



