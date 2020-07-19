var express = require('express');
var router = express.Router();
const my_module = require('../../my_module/commentcreate');


/* GET users listing. */
router.post('/', function (req, res, next) {
    var database_name;
    var page_info = req.body.page_info;
    if (page_info[3] == 0) {
        database_name = 'androidnotice';
    } else if (page_info[3] == 1) {
        database_name = 'iosnotice';
    } 
    my_module(req, res, database_name);
});

module.exports = router;
