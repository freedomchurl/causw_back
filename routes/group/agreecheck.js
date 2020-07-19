var express = require('express');
var router = express.Router();
var db = require('../../models');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/', function(req, res, next) {
  token = req.headers.authorization;
	decoded = null;
	try{
	decoded = jwt.verify(token,private_key)
	}catch(e){
		res.json({tokenValid:false,payload:null});
	}

	if(decoded){
    Promise.all([db.Group.findOne({
        attributes: ['id'],
        where: { name: req.body.group_name },
      }), db.User.findOne({
        attributes: ['id'],
        where: { login_id: req.body.login_id },
      })])
  .then((values) => {
    console.log('agree check success');
    var result = db.UserGroup.findOne({
        attributes: ['agree'],
        where : {groupId:values[0].id, userId:values[1].id}
    })
    return result;
})
    .then((result)=> {
    if(result == null){
        res.send({tokenValid:true,payload:{status:0}});
    }else if(result.agree == 0){
        res.send({tokenValid:true,payload:{status:1}});
    }else if(result.agree == 1){
        res.send({tokenValid:true,payload:{status:2}});
    }
  })
  .catch((err) => {
    console.error(err);
    next(err);
  });
}
});

module.exports = router;
