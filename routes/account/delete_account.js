var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var jwt = require('jsonwebtoken');

var pool = mysql.createPool({
	connectionLimit : 20,
	host : 'localhost',
	user : 'root',
	password : 'Dlcjf2779!',
	database : 'swnet',
	debug : true,
	charset : 'utf8'
});



router.use(express.json());
router.get('/',function(req,res){

	console.log('Delete Account');

	var key = req.query.loginId;

	token = req.headers.authorization;
	decoded = null;

	//console.log("Delete Account');
	console.log(token);
	try
	{
		decoded = jwt.verify(token,private_key);
	}catch(e){
		res.json({tokenValid:false,payload:null});
	}

	if(decoded){

		if(decoded.login_id == key || decoded.auth == 100 || decoded.auth == 0) // id가 같을때, 학생회장일때, 슈퍼유저일때
		{
			pool.getConnection(function(err,conn){
				if(err){
					if(conn){
						conn.release();
					}
					throw err;
				}

				var exec = conn.query('update users set verified = 2 where login_id=?',key,function(err,result){
					conn.release();

					if(err){
						res.sendStatus({tokenValid:true,payload:false});
					}else{
						res.send({tokenValid:true,payload:true});

					}
				});
				/*var exec = conn.query('update verified_info A inner join users B on A.id = B.id set B.verified = 1 where A.code=?',key,function(err,result){
			conn.release();

			if(err){
				res.sendStatus(404);
			}
			else{
				res.send('인증이 성공적으로 이루어졌습니다.');
			}
		});*/
			});
		}
	}

});

module.exports = router;
