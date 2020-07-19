//mylocker.js
var express = require('express');
var router = express.Router();
var db = require('../../../models');
var jwt = require('jsonwebtoken');


/* GET users listing. */
router.get('/', function(req, res, next) {
  token = req.headers.authorization;
  decoded = null;
  try{
  decoded = jwt.verify(token,private_key)
  }catch(e){
    res.json({tokenValid:false,payload:null});
  }

  if(decoded){
    db.User.findOne({where:{login_id:req.query.login_id}})
    .then((result)=>{
    var result = db.Locker.findAll(
      {where : {userId:result.id},
      include : [{
          model:db.User,
          attributes: ['login_id','name', 'year'],
      }],
      order:[['id',  'ASC']],
      raw:true,
    })
    return result;
  })
    .then((result) => {
      var resultStr = JSON.stringify(result);
      if(resultStr == '[]'){
        var finalResult = JSON.parse("{\"status\" : 0 , \"locker\" : " + resultStr +"}");
        res.send({tokenValid:true,payload:finalResult});
      }else{
        var finalResult = JSON.parse("{\"status\" : 1 , \"locker\" : " + resultStr +"}");
        res.send({tokenValid:true,payload:finalResult});
      }
      console.log('show my locker success');
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
  }
});

module.exports = router;
