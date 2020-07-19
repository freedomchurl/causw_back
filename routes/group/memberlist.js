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
		db.Group.findOne({
			attributes: ['id'],
			where: { name: req.body.group_name },
		})
			.then((result) => {
				console.log('show memberlist');
				var authCode = 3*100 + result.id
				console.log("code : "+authCode)
				var result = db.UserGroup.findAll(
					{
						where:{groupId:result.id, agree:1},
						attributes:{exclude : ['createdAt', 'updatedAt', 'agree']},
						include : [{
							model:db.User,
							attributes: ['login_id','name','year'],
						}]},
				)
				return result;
			})
			.then((result)=>{
				console.log("Member List");
				console.log(result);
				res.send({tokenValid:true,payload:result});
			})
			.catch((err) => {
				console.error(err);
				next(err);
			});
	}
});

module.exports = router;
