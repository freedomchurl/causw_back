var express = require('express');
var router = express.Router();
var db = require('../../../models');

/* GET users listing. */
router.post('/', function(req, res, next) {
    db.Locker.update(
        {agree:true}, 
        {where : {floor:req.body.floor, number:req.body.number}
    })
    .then((result)=>{
    console.log('locker agree success');
    res.sendStatus(200);
    })
  .catch((err) => {
    console.error(err);
    next(err);
  });
});

module.exports = router;
