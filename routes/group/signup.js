var express = require('express');
var router = express.Router();
var UserGroup = require('../../models').UserGroup;
var Group = require('../../models').Group;
var User = require('../../models').User;
var jwt = require('jsonwebtoken');

var current_studentId;
var current_groupId;

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
		if(decoded.auth == 0)
		{
			res.send({tokenValid:true,payload:-1});
		}
		else
		{
			Promise.all([Group.findOne({
				attributes: ['id'],
				where: { name: req.body.group_name },
			}), User.findOne({
				attributes: ['id'],
				where: { login_id: req.body.login_id },
			})])
				.then((values) => {
					UserGroup.create(
						{userId:values[1].id, groupId:values[0].id},
					)
					console.log('sign up success');
					res.send({tokenValid:true,payload:null});
				})
				.catch((err) => {
					console.error(err);
					next(err);
				});
		}
	}
});

module.exports = router;
