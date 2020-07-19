var express = require('express');
var router = express.Router();


var mypostingRouter = require('./myposting');
var mycommentRouter = require('./mycomment');

router.use('/myposting', mypostingRouter);
router.use('/mycomment', mycommentRouter);


module.exports = router;
