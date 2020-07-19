var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto');
var verified_info = require('./verified_info');
var confirmEmail = require('./confirm_email');
var checkRouter = require('./account_check');
var jwt = require('jsonwebtoken');
var account_find = require('./account_find');

var account_reset = require('./account_reset');
var delegateAuth = require('./delegateAuth');

var tokenTest = require('./tokentest');

var refToken = require('./tokenRefresh');

var account_authlist = require('./account_authlist');

var fcm_token_set = require('./fcmTokenset');

var delete_account = require('./delete_account');

var cors = require('cors');

var pool = mysql.createPool({
	connectionLimit : 40,
	host : 'localhost',
	user : 'root',
	password : 'Dlcjf2779!', // Password
	database : 'swnet',
	debug : true,
	charset : 'utf8'
});
// Create Pool 을 통해서 Pool 을 통해서 관리하고 있음.


// /account 로 들어오는 Routing을 처리함.
router.use(express.json());
router.use('/check',checkRouter);
router.use('/confirmEmail',confirmEmail);
router.use('/findUser',account_find);
router.use('/find',account_reset);

router.use('/deleteAccount',delete_account); // 회원삭제 기능
router.use('/authlist',account_authlist);

router.use('/setauth',delegateAuth);

router.use('/fcmTokenset',fcm_token_set);

router.use('/tokenTest',tokenTest);
router.use('/refreshToken',refToken);

const corsOpt = function(req,callback){
	callback(null,{origin:true});
};

router.options('/login',cors(corsOpt));

router.post('/signup',function(req,res){
	console.log('Sign Up');
	/*
	여기서, insert를 실시해야함.
	*/
	console.log(req.body);
	var login_id = req.body["login_id"];
	var name = req.body["name"];
	var pwd = req.body["pwd"];
	var email = req.body["email"];
	var year = req.body["year"];
	//var grade = req.body["grade"];
	// 변수들을 받아온다.

	var _salt;
	var _crypt_pwd;

	crypto.randomBytes(64, (err, buf) => {
		_salt = buf.toString('base64');
		crypto.pbkdf2(pwd, buf.toString('base64'), 105289, 64, 'sha512', (err, key) => {
			//console.log(key.toString('base64')); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='
			_crypt_pwd = key.toString('base64');


			pool.getConnection(function(err,conn){
				if(err){
					if(conn){
						conn.release(); // 예외시에 처리해야함.
					}
					throw err;
				}
				console.log('Connected Thread ID : ', + conn.threadId);

				var data = {login_id:login_id, name:name, pwd:_crypt_pwd, email:email, year:year, salt:_salt};

				var exec = conn.query('insert into users set ?',data,function(err,result){
					//conn.release();
					console.log('Exec SQL : ' + exec.sql);

					if(err){
						console.log('SQL Exec Error');
						console.dir(err); // Error Print.

						var exec2 = conn.query('select * from users where login_id=?',login_id,function(err,result){
							if(result.length)
							{
								res.send({status:0});
							}
							else{

								var exec3 = conn.query('select * from users where email=?',email,function(err,result){
									if(result.length)
									{
										res.send({status:1});
									}
								});


							}
						});

						//res.sendStatus(404);
						conn.release();
					}
					else{
						console.log('Result : ' + result);
						verified_info(login_id,res);
					}

				});
			});
			//res.sendStatus(200); // OK.
		});
	});
});

var secretObj = require('./jwt');

router.post('/login',function(req,res){
	/*여기서 만약에 로그인을 실시하였는데, 아직 verified가 안되어있으면
    안되어있다고 반환해야 함. 이것 또한 JSON으로 담아야 함.
    */
	var pool = mysql.createPool({
		connectionLimit : 20,
		host : 'localhost',
		user : 'root',
		password : 'Dlcjf2779!',
		database : 'swnet',
		debug : true,
		charset : 'utf8'
	});

	console.log('Login');
	console.log(req.body);
	var login_id = req.body["login_id"];
	var pwd = req.body["pwd"];

	pool.getConnection(function(err,conn){
		if(err){
			if(conn){
				conn.release();
			}
			throw err;
		}
		console.log('COnnected Thread ID : ', + conn.threadId);

		var exec = conn.query('select pwd,salt from users where login_id=?',login_id,function(err,result){
			console.log('Exec log : ',exec.sql);

			if(err)
			{
				conn.release();
				res.sendStatus(404);
			}
			else{
				console.log('Result : ',result);
				// 여기서 만약에 결과가 있으면, OK
				if(result.length){
					db_pwd = result[0].pwd;
					db_salt = result[0].salt;

					crypto.randomBytes(64, (err, buf) => {
						crypto.pbkdf2(pwd, db_salt, 105289, 64, 'sha512', (err, key) => {
							console.log('PWD = ' + key.toString('base64'));
							if(db_pwd == key.toString('base64')){
								var exec = conn.query('select id,login_id,name,email,year,auth,verified from users where login_id=?',login_id,function(err,result){
									conn.release();

									if(err)
									{
										res.sendStatus(404);
									}
									else{
										if(result[0].verified == 2) // 탈퇴유저
										{
											res.json({status:-1}); // 탈퇴 코드
										}
										else
										{
										let token = jwt.sign({
											id : result[0].id,
											login_id : result[0].login_id,
											name : result[0].name,
											email : result[0].email,
											year : result[0].year,
											auth : result[0].auth,
											verified: result[0].verified
										},secretObj.secret,{expiresIn : '3h'});
										
										let refreshToken = jwt.sign({
											id : result[0].id,
											login_id : result[0].login_id,
											name : result[0].name,
											email : result[0].email,
											year : result[0].year,
											auth : result[0].auth,
											verified : result[0].verified
										},secretObj.secret,{expiresIn :'3d'});
										
										res.header("Access-Control-Allow-Headers","Authorization");
										res.header("Access-Control-Expose-Headers","*");
										console.log(token);
										console.log(refreshToken);
										res.header("Authorization",token);
										res.header("RefreshToken",refreshToken);
										if(result[0].verified == 1)
											res.json({status:2});
										else if(result[0].verified == 0)
											res.json({status:3});
										}

									}

								});
							}
							else
							{
								res.send({status:1});
							}
							//console.log(key.toString('base64')); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='
						});
					});
				}
				else
				{
					// 이 아이디로 존재하는 결과가 없음.
					res.send({status:0});
				}
			}

		});
	});
});

/*
회원가입의 경우, POST 방식으로
num, id, name, pwd, email, year, grade, auth, verified
(auto, primary
    id, varchar, 
    name, 한글
    pwd, varchar,
    email, varchar,
    year, 학번 2014,
    grade, 현재 학년,
    auth, 권한,
    verified, 이메일 인증 완료)
    */




module.exports = router; // module export.
