var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var jwt = require('jsonwebtoken');

var pool = mysql.createPool({
	connectionLimit : 40,
	host : 'localhost',
	user : 'root',
	password : 'Dlcjf2779!', // Password
	database : 'swnet',
	debug : true,
	charset : "utf8"
});

router.use(express.json());

// POST 방식이며, 권한의 위임을 실시해야함. ( 동아리 제외 )
// 전달할 정보는, 내가, 누구에게, 어떤 권한을 줄 것인지.
// 자동적으로 이전 권한자를 취소해야함.
router.post('/',function(req,res){
	console.log('Delegate Auth');
	console.log(req.body);

	token = req.headers.authorization;
	decoded = null;
	try
	{
		decoded = jwt.verify(token,private_key);
	}catch(e){
		res.json({tokenValid:false,payload:null});
	}

	if(decoded){

	var my_auth = req.body.auth;
	var login_id = req.body.login_id;
	var given_auth = req.body.new_auth;
	var mylogin_id = req.body.mylogin_id;

	// my_auth 는 내 권한
	// login_id 는 권한을 줄 아이디
	// given_auth 는, 그 아이디에게 줄 권한번호
	var available = false;
	if(my_auth==0) // super admin인 경우
	{

		if(given_auth != 0) // 슈퍼 계정응ㄴ 위임이 불가능함. 
			available = true; // 처리가능함으로 바꿈.
	}
	else if(my_auth < 300)
	{
		var checkauth = 0;
		if(my_auth == 100 || ((my_auth >= 44) && (my_auth <= 47))) // 학생회장
			available = true; // 학생회장도 자기포함 모든 권한 수정 가능
		else
		{
			// 아닌 경우,
			if(my_auth == given_auth) // 이 경우는, 부여하고 싶은 권한이 같은 경우만 가능.
			{
				available = true;
			}
		}
	}
	// 검사 완료 후에	
	//
	if(available == false) // 전송이 불가능할 경우
	{
		res.send({tokenValid:true,payload:{available : false, status: 0}});
	}
	else
	{
		// 전송이 가능한 경우


		pool.getConnection(function(err,conn){
			if(err){
				if(conn){
					conn.release(); // 예외 처리
				}
				throw err;
			}
			console.log('Connected Thread ID : ' + conn.threadId);

			var exec = conn.query('update users set auth=? where login_id=?',given_auth,login_id,function(err,result){
				if(err){
					// query 가 실행이 안되는 경우
					res.send({tokenValid:true,payload:{available : true, status : 0}});
				}
				else{
					// update 완료

					if(my_auth != 0) // Super 계정이 아닌 경우에만, 내 권한이 일반으로 초기화 된다.
					{
						var exec = conn.query('update users set auth=2 where login_id=?',mylogin_id,function(err,result){
							if(err){
								res.send({tokenValid:true,payload:{available:true,status:0}});
							}
							else
							{
								res.send({tokenValid:true,payload:{available:true, status:1}});
							}

						});
					}

				}
			});
		});
	}
}});

module.exports = router;
//router.poset('/')
