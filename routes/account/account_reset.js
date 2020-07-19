var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto');

var jwt = require('jsonwebtoken');

router.use(express.json());

var pool = mysql.createPool({
	connectionLimit : 40,
	host : 'localhost',
	user : 'root',
	password : 'Dlcjf2779!',
	database : 'swnet',
	debug : true,
	charset : "utf8"
});

router.get('/id',function(req,res){
	var email = req.query.email
	// email을 전달하면, id를 반환해주어야 한다. 
	var name = req.query.name

	pool.getConnection(function(err,conn){
		if(err){
			if(conn){
				conn.release();
			}
			throw err;
		}

		console.log('Connected Thread ID : ', + conn.threadId);
		// id를 검색하면, id, login_id, name, year 반환 

		var data = [email,name];
		var exec = conn.query('select login_id from users where email=? and name=?',data,function(err,result){
			conn.release();
			
			if(err){
			}
			else{
				if(result.length){
					res.send({status:1,login_id:result[0].login_id});
				}
				else
				{
					res.send({status:0});
				}
			}
		});
	});
});


router.post('/pwd',function(req,res){
	var login_id = req.body.login_id;
	var email = req.body.email;
	// login_id랑 email을 받아서, 둘다 맞으면, 이메일로 비밀번호 변경 가능 링크를 제공해야함. 이건 추후, 프론트랑 재 구성되어야 함.
	pool.getConnection(function(err,conn){
		if(err){
			if(conn){
				conn.release();
			}
			throw err;
		}

		console.log('Connected Thread ID : ', + conn.threadId);
		// id를 검색하면, id, login_id, name, year 반환 
		data = [ login_id, email];
		var exec = conn.query('select id from users where login_id=? and email=?',data,function(err,result){
			conn.release();
			
			if(err){
			}
			else{
				if(result.length){ // 이게 있으면, 재 설정 가능한 경우
					res.send({status:0});
				}
				else
				{
					res.send({status:1}); // 재설정 불가능
				}
			}
		});
	});
});

router.post('/resetpwd',function(req,res){
	var login_id = req.body.login_id;
	var email = req.body.email;
	var new_pwd = req.body.pwd;
	
	token = req.headers.authorization;

	decoded = null;
	try{
		decoded = jwt.verify(token,private_key);
	}
	catch(e){
		res.json({tokenValid:false,payload:null});
	}

	if(decoded){


	pool.getConnection(function(err,conn){
		if(err){
			if(conn){
				conn.release();
			}
			throw err;
		}

		console.log('Connected Thread ID : ', + conn.threadId);
		data = [login_id,email];
		var exec = conn.query('select salt from users where login_id=? and email=?',data,function(err,result){
			if(err){
				conn.release();
				res.sendStatus(404);
			}
			else{
				console.log('Result : ',result);
				// salt 값을 가져옴.
				if(result.length){
					var _salt = result[0].salt;
					var _cryp_new_pwd;

					crypto.pbkdf2(new_pwd,_salt,105289,64,'sha512',(err,key)=>{
						_cryp_new_pwd = key.toString('base64'); // 새로운 비밀번호를 base64로 바꾸고.

						inputdata = [_cryp_new_pwd, login_id];
						var exec = conn.query('update users set pwd = ? where login_id = ?',inputdata,function(err,result){
							conn.release();

							if(err)
							{
								res.sendStatus(404); 
							}
							else{
								res.send({tokenValid:true,payload:{status:1}}); // 1을 반환한다. 
							}
						});
					});
				}
				else{
					res.send({tokenValid:true,payload:{status:0}}); // status:0 이면, 해당하는 아이디가 없음. 
				}
			}
		});

	});
}});
module.exports = router;
