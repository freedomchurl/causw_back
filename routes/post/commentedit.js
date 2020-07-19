var express = require('express');
var router = express.Router();
var db = require('../../models');


/* GET users listing. */
router.post('/', function(req, res, next) {
    db.Comment.update(
      {content:req.body.content }, 
      {where : {id:req.body.id}})
    .then((result) => {
      res.json(result);
    })
    .then((result) => {
      console.log('comment update success');
    })
  .catch((err) => {
    console.error(err);
    next(err);
  });
});

module.exports = router;
