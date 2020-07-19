//mygroup.js
//find my group
var express = require('express');
var router = express.Router();
var db = require('../../models');

router.get('/', function(req, res, next) {
	console.log("!!!");
	console.log(req.query.login_id);
    db.User.findOne({where:{login_id:req.query.login_id}})
    .then((user) => {
      return db.UserGroup.findAll(
        { where:{userId:user.id},
          attributes:{exclude : ['createdAt', 'updatedAt']},
          include : [{
            model:db.Group,
            attributes: ['name'],
        }]},
      )
    })
    .then((result)=>{
      var resultStr = JSON.stringify(result);
      if(resultStr == '[]'){
        var finalResult = JSON.parse("{\"status\" : 0 , \"group\" : " + resultStr +"}");
        res.send(finalResult);
      }else{
        var finalResult = JSON.parse("{\"status\" : 1 , \"group\" : " + resultStr +"}");
        res.send(finalResult);
      }
      console.log('show my group success');
      })
    .catch((err) => {
      console.error(err);
      next(err);
    });

});

module.exports = router;
