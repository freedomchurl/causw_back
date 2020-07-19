var express = require('express');
var router = express.Router();

var cors = require('cors');

var pushMessage = require('./push_message');

var pushBroad = require('./push_broad');

var pushGroup = require('./push_group');
var pushID = require('./push_id');

var pushComment = require('./push_comment');
var pushRecomment = require('./push_recomment');
var pushEtc = require('./push_etc');
var pushCommit = require('./push_commit');

router.use(express.json());
router.use('/pushMessage',pushMessage);

// /push/pushBroad 
//
router.use('/pushBroad',pushBroad);
router.use('/pushGroup',pushGroup);
router.use('/pushId',pushID);

router.use('/pushCommit',pushCommit);

router.use('/pushComment',pushComment);
router.use('/pushRecomment',pushRecomment);

router.use('/pushEtc',pushEtc);

module.exports = router;
