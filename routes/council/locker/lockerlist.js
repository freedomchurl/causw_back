// lockerlist
// show list of locker
var express = require('express');
var router = express.Router();
var db = require('../../../models');
var jwt = require('jsonwebtoken');

//router.use(express.json());
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
		db.Locker.findAll({
			attributes : {exclude : ['agree']},
			order:[['id',  'ASC']],
			include : [{
				model:db.User,
				attributes: ['login_id','name', 'year'],
			}]
		})
			.then((locker) => {
				console.log('locker list find success');
				res.json({tokenValid:true,payload:locker});
			})
			.catch((err) => {
				console.error(err);
				next(err);
			});
		}
});

module.exports = router;
