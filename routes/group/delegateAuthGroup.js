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
	console.log('Delegate Auth - group');
	console.log(req.body);

	token = req.headers.authorization;
	decoded = null;
	try{
		decoded = jwt.verify(token,private_key);
	}catch(e)
	{
		res.send({tokenValid:false,payload:null});
	}

	if(decoded)
	{

		// It's only for delegate group leader. 
		// It's more easiler than council.
		// group number, lo
		//var my_auth = req.body.auth;
		//var login_id = req.body.login_id;
		//var given_auth = req.body.new_auth;
		//var mylogin_id = req.body.mylogin_id;

		var my_auth = req.body.my_auth;
		var given_auth = req.body.given_auth;
		var my_group = req.body.group;
		var my_id = req.body.mylogin_id;
		var given_id = req.body.givenlogin_id;
		// POST
		// my_auth 는 내 권한
		// login_id 는 권한을 줄 아이디
		// given_auth 는, 그 아이디에게 줄 권한번호
		var available = false;
		if(my_auth==0 || my_auth==100) // super admin인 경우
		{

			//if(given_auth != 0) // 슈퍼 계정에게는 동아리장  위임이 불가능함. 
			available = true; // 처리가능함으로 바꿈.
		}
		else if(my_auth >=300)
		{
			// 300보다 크다면, 동아리장임. 
			if((my_auth%100)==my_group) // 내 권한과 그룹아이디가 같다면,
			{
				available = true;
			}
		}
		//Console.log('dddd');
		// 우선, 내 권한을 가져와야 한다.

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
						conn.release();
					}
					throw err;
				}

				console.log(given_id);
				var exec = conn.query('select * from users where login_id=?',given_id,function(err,result){
					if(err){ res.send({tokenValid:true,payload:{available:true,status:0}}); }
					else{
						if(result.length == 0){res.send({tokenValid:true,payload:{available:true,status:1}});} 
							//내가 100이거나 0이 아니고, 상대방이 2가 아니라면 -> 동아리장이 2가 아닌사람에게 전달
						else if((((my_auth!=0) && (my_auth!=100))&&(result[0].auth !=2)) ){res.send({tokenValid:true,payload:{available:true,status:3}});}
						else if(result[0].auth == 0){res.send({tokenValid:true,payload:{available:true,status:3}});}
						else{ // 정상적으로 위임이 가능하다.
							given_index_id = result[0].id;
							data = [given_index_id,my_group];
							var exec = conn.query('select * from usergroups where userId=? and groupId=?',data,function(err,result){
								if(err){
									res.send({tokenValid:true,payload:{available:true,status:0}});
								}
								else{
									// 만약에 result.length 가 0이라면, 안된다.
									if(result.length == 0)
									{
										res.send({tokenValid:true,payload:{available: true, status:4}});
									}
									else
									{
										// 여긴 그런 컬럼이 있는거야. 그러면 업데이트를 양쪽에 해주면 되는거지
										data = [given_auth,given_id];
										var exec = conn.query('update users set auth=? where login_id=?',data,function(err,result){
											if(err){
												res.send({tokenValid:true,payload:{available:true,status:0}});
											}
											else{
												if((my_auth != 0) && (my_auth != 100)) // 내 권한을 2번으로 돌려야 한다.
												{
													var exec = conn.query('update users set auth=2 where login_id=?',my_id,function(err,result){
														if(err){
															res.send({tokenValid:true,payload:{available:true,status:0}});
														}
														else
														{
															res.send({tokenValid:true,payload:{available:true,status:2}});
														}
													});
												}
												else
												{
													res.send({tokenValid:true,payload:{available:true,status:2}});
												}
											}
										});
									}
								}
							});}}});});}}});

module.exports = router;
//router.poset('/')
