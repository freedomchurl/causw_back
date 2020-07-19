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
	var title = req.body.title;
	var message = req.body.message;
	var type = req.body.type;
	// type = 1, 관리자/학생회장 , type = 2 , 소모임장 , type = 3, 학생회 전원
	var groupId = null;
	
	console.log(type + " = !!!");
	if(type == 2){
		groupId = req.body.group;
	}

	var payload = {
		data: {
			title : title,
			message : "새 건의사항 알림",
			message_target:"suggest",
			login_id:"null",
			page_info:"null",
			groupid:"null"
		}
		//priority : 'high'

	};

	if(type == 1)
	{
		payload.data.page_info = "app";
	}
	else if(type==3)
	{
		payload.data.page_info = "council";
	}
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

			if(type==2)
			{
				payload.data.groupid = groupId;
				payload.data.page_info = "group";
				var auth = '3' + Math.floor(groupId/10) + '' + (groupId%10);
				thisQuery = 'select a.token,b.login_id from fcm_tokens a inner join users b on a.userId=b.id where b.auth=' + auth;
			}
			else if(type == 1)
			{
				thisQuery = 'select a.token,b.login_id from fcm_tokens a inner join users b on a.userId=b.id where b.auth=100 or b.auth=0';
			}
			else if(type==3)
			{
				thisQuery = 'select a.token,b.login_id from fcm_tokens a inner join users b on a.userId=b.id where b.auth>=100 and b.auth<=110';
			}


			var exec = conn.query(thisQuery,function(err,result){
				if(err){res.send({status:0});}
				else{
					//tokenlist = result;

					console.log(result);

					var tokenlist = [];
					var idlist = [];
					for(var i=0;i<result.length;i++)
					{
						if(result[i].token != null){
							tokenlist.push(result[i].token);
							idlist.push(result[i].login_id);
						}
					}
					console.log(idlist);

					//	}
					//	});
					//	});
					payload.data.login_id = JSON.stringify(idlist);

					console.log(payload.data.page_info + " !!!");
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
