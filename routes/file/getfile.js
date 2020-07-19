var express = require('express');
var router = express.Router();
const my_module = require('../my_module/getfile');


/* GET users listing. */
router.post('/', function (req, res, next) {
    my_module(req, res);
});

module.exports = router;
