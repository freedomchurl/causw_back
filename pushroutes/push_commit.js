var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var admin = require('firebase-admin');

var serviceAccount = require('./key.json');

//admin.initializeApp( {credential: admin.credential.cert(serviceAccount)}  );

var pool = mysql.createPool({
	connectionLimit : 40,
	host : 'localhost',
	user : 'root',
	password : 'Dlcjf2779!',
	database : 'swnet',
	debug : true,
	charset : "utf8"
});

router.use(express.json());

router.post('/',function(req,res){
	//console.log('Test');	

	//var tokens = req.body.tokens; // token 무리를 가져온다.
	//var title = req.body.title;
	//var message = req.body.message;
	//var type = req.body.type;
	// type = 1, 관리자/학생회장 , type = 2 , 소모임장 , type = 3, 학생회 전원
	var groupId = req.body.group;
	var groupName = req.body.groupName;
	var login_id = req.body.login_id;

	var payload = {
		data: {
			title : "[" + groupName + "]에 가입이 완료되었습니다!",
			message : "소모임 가입 승인",
			message_target:"etc",
			login_id:login_id
		}
		//priority : 'high'

	};

	//if(type == 1)
	//	payload.data.login_id = ['100','0'];
	//else if(type==3)
	//	payload.data.login_id = ['101','102','103','104','105','106','107','108','109','110'];
	//else
	{
		pool.getConnection(function(err,conn){
			if(err){
				if(conn){
					conn.relase();
				}
				throw err;
			}
			var thisQuery = '';
			
			thisQuery = 'select a.token,b.login_id from fcm_tokens a inner join users b on a.userId=b.id where b.login_id=?';// + login_id;
		

			var exec = conn.query(thisQuery,login_id,function(err,result){
				if(err){res.send({status:0});}
				else{
					//tokenlist = result;

					console.log(result);

					var tokenlist = [];
					var idlist = [];
					for(var i=0;i<result.length;i++)
					{
						tokenlist.push(result[i].token);
						idlist.push(result[i].login_id);
					}
					console.log(idlist);

					//	}
					//	});
					//	});
					payload.data.login_id = JSON.stringify(idlist);

					if(result.length != 0)
					{
						admin.messaging().sendToDevice(tokenlist,payload).then(function(response){
							console.log('Successfully sent message:',response);
							res.send({status:1});
						}).catch(function(error){
							res.send({status:0});
							console.log('Error sending message:',error);
						});
					}
				}
			});
		});
	}

});


module.exports = router;
