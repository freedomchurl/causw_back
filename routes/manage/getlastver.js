var express = require('express');
var router = express.Router();
var db = require('../../models');

/* GET users listing. */
router.post('/', function(req, res, next) {
    db.LastVersion.findOne({
        where:{type : req.body.type}
      })
    .then((result)=>{
    console.log('send last version');
    res.send(result);
    })
  .catch((err) => {
    console.error(err);
    next(err);
  });
});

module.exports = router;
