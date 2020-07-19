var express = require('express');
var router = express.Router();
const my_module = require('../../my_module/postingcount');


/* GET users listing. */
router.post('/', function (req, res, next) {
    var database_name;
    var page_info = req.body.page_info;
    if(page_info[1] == 0){
        database_name = 'groupnotice';
    } else if(page_info[1] == 1){
        database_name = 'groupfree';
    }else if(page_info[1] == 2){
        database_name = 'grouplibrary';
    } else if(page_info[1] == 3){
       // 건의
    }
    my_module(req, res, database_name);
});

module.exports = router;
