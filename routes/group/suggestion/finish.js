var express = require('express');
var router = express.Router();
const my_module = require('../../my_module/suggestionFinish');


/* GET users listing. */
router.post('/', function (req, res, next) {
    my_module(req, res, 1);
});

module.exports = router;
