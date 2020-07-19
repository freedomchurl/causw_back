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
	chrset : 'utf8'
});


router.use(express.json());
router.post('/',function(req,res){
	console.log('Update Token');


	token = req.headers.authorization;
	decoded = null;
	try{
		decoded = jwt.verify(token,private_key)
	}
	catch(e){
		res.json({tokenValid:false,payload:null});
	}
	if(decoded){


		var key = req.body.login_id;
		var token = req.body.token;

		pool.getConnection(function(err,conn){
			if(err){
				if(conn){
					conn.release();
				}
				throw err;
			}

			var exec = conn.query('select * from users where login_id=?',key,function(err,result){
				if(err){res.send({tokenValid:true,payload:{status:0}});} // 실패
				else{
					if(result.length == 0){
						res.send({tokenValid:true,payload:{status:1}});
					}
					else{
						var id = result[0].id;
						var data = [id,token,id,token];
						var exec = conn.query('insert into fcm_tokens (userId,token) values (?,?) ON DUPLICATE KEY UPDATE userId=?, token=?',data,function(err,result){
							if(err){res.send({tokenValid:true,payload:{status:0}});}
							else{
								res.send({tokenValid:true,payload:{status:1}});
							}					
						});
					}

				}



			});


		});
	}});


module.exports = router;
