var express = require('express');
var router = express.Router();
var db = require('../../../models');

/* GET users listing. */
router.post('/', function(req, res, next) {
  db.Locker.findOne(
    {where : {floor:req.body.floor, number:req.body.number},
    include : [{
        model:db.User,
        attributes: ['login_id','name', 'year'],
    }]
  }) 
  .then((locker) => {
    console.log('show locker success');
    res.json(locker);
  })
  .catch((err) => {
    console.error(err);
    next(err);
  });
});

module.exports = router;
