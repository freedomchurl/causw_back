var express = require('express');
var router = express.Router();
const my_module = require('../../my_module/commentedit');


/* GET users listing. */
router.post('/', function (req, res, next) {
    var database_name;
    var page_info = req.body.page_info;
    if(page_info==1000){
        database_name='councilnotice';
    } else if(page_info==1003){
        database_name = 'archive';
    } else if(page_info[2]==1){
        database_name='councilgradenotice';
    } else if(page_info[2]==2){
        database_name='councilgradefree';
    }
    my_module(req, res, database_name);
});

module.exports = router;
