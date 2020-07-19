var express = require('express');
var router = express.Router();
var UserGroup = require('../../models').UserGroup;
var Group = require('../../models').Group;
var User = require('../../models').User;
var request = require('request');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/', function (req, res, next) {
  token = req.headers.authorization;
	decoded = null;
	try{
	decoded = jwt.verify(token,private_key)
	}catch(e){
		res.json({tokenValid:false,payload:null});
	}

	if(decoded){
   var groupId = null;
    Promise.all([Group.findOne({
      attributes: ['id'],
      where: { name: req.body.group_name },
    }), User.findOne({
      attributes: ['id'],
      where: { login_id: req.body.login_id },
    })])
      .then((value) => {
  	    groupId = value[0].id;
        UserGroup.update(
          { agree: true }, { where: { groupid: value[0].id, userid: value[1].id } })
        res.send({tokenValid:true,payload:null});
      })
      .then((result) => {
  	    request({uri:"http://127.0.0.1:8080/push/pushCommit",
  	    		method: "POST",
  	    		json: true,
  	    		body : {group:groupId, groupName:req.body.group_name,login_id : req.body.login_id}
  	    },function(error,response,body){console.log(body);});
  	    console.log('agree success');
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
    }
});

module.exports = router;
