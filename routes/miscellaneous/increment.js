var express = require('express');
var router = express.Router();
var db = require('../../models');

router.get('/', function(req, res, next) {
 console.log("Inside Egg");
	db.Egg.update(
      {count :db.sequelize.literal('count + 1')},
      {where:{id:1}}
)
  .then((result) => {
      var count = db.Egg.findOne(
    {where:{id:1}}
)

console.log('egg update success');
return count;
  })
  .then((result)=>{
    var resultStr = {count : result.count};
    res.json(resultStr);
  })
  .catch((err) => {
    console.error(err);
    next(err);
  });
});

module.exports = router;
