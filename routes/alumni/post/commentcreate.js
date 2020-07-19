var express = require('express');
var router = express.Router();
const my_module = require('../../my_module/commentcreate');


/* GET users listing. */
router.post('/', function (req, res, next) {
    var database_name;
    var page_info = req.body.page_info;
    if (page_info[0] == 3) {
        database_name = 'alumnigrade';
    } else {
        if (page_info[3] == 0) {
            database_name = 'alumnifree';
        } else if (page_info[3] == 1) {
            database_name = 'alumnijob';
        } else if (page_info[3] == 2) {
            database_name = 'alumnigraduate';
        } else if (page_info[3] == 3) {
            database_name = 'alumninotice';
        }
    }
    my_module(req, res, database_name);
});

module.exports = router;
