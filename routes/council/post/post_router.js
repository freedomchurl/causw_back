var express = require('express');
var router = express.Router();

var createRouter = require('./create');
var deleteRouter = require('./delete');
var editRouter = require('./edit');
var showRouter = require('./show');
var listRouter = require('./list');
var countRouter = require('./count');
var attachfileRouter = require('./attachfile');
var deletefileRouter = require('./deletefile');
var commentcreateRouter = require('./commentcreate');
var commentdeleteRouter = require('./commentdelete');
var commentlistRouter = require('./commentlist');
var childcommentcreateRouter = require('./childcommentcreate');
var childcommentdeleteRouter = require('./childcommentdelete');
var searchcontentRouter = require('./searchcontent');
var searchwriterRouter = require('./searchwriter');
var searchtitleRouter = require('./searchtitle');
var commenteditRouter = require('./commentedit');



router.use('/create', createRouter);
router.use('/delete', deleteRouter);
router.use('/edit', editRouter);
router.use('/show', showRouter);
router.use('/count', countRouter);
router.use('/list', listRouter);
router.use('/attachfile', attachfileRouter);
router.use('/deletefile', deletefileRouter);
router.use('/commentcreate', commentcreateRouter);
router.use('/commentdelete', commentdeleteRouter);
router.use('/commentlist', commentlistRouter);
router.use('/childcommentcreate', childcommentcreateRouter);
router.use('/childcommentdelete', childcommentdeleteRouter);
router.use('/searchcontent', searchcontentRouter);
router.use('/searchwriter', searchwriterRouter);
router.use('/searchtitle', searchtitleRouter);
router.use('/commentedit', commenteditRouter);

module.exports = router;
