var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var admin = require('firebase-admin');
var request = require('request');

var serviceAccount = require('./key.json');


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
	var comment = req.body.comment;
	var postId =req.body.postId;
	var page_info = req.body.pageInfo;
	var writer_loginId = req.body.login_id;
	//var writerId = req.body.id;
	var targetloginId = req.body.targetloginId;
	var payload = {
		data: {
			title : null, ///"" + commentloginId + ":" + comment, // 추후 추가
			message : "대댓글 알림",
			postId : postId,
			page_info : page_info,
			message_target:"recomment",
			login_id: null// writerloginId
		}
		//priority : 'high'

	};

	//console.log(targetloginId);
	var parseTarget = JSON.parse(targetloginId);

	//console.log(tt);

	pool.getConnection(function(err,conn){
		if(err){
			if(conn){
				conn.relase();
			}
			throw err;
		}
		var exec = conn.query('select name from users where login_id=?',writer_loginId,function(err,result){
			if(err){res.send({status:0});}
			else{
				payload.data.title = result[0].name + " : " + comment;
				
				var targetId = [];
				var targetSet = "(";
				for(var i=0;i<parseTarget.length;i++)
				{
					console.log(parseTarget[i][0]);
					targetId.push(parseTarget[i][0]);
					targetSet = targetSet + parseTarget[i][0];
					if(i!=parseTarget.length-1)
						targetSet = targetSet + ',';
					
				}
				targetSet = targetSet + ')';
				//console.log(targetId);

				
				var exec = conn.query('select token from fcm_tokens where userId in ' + targetSet,function(err,result){
					if(err){res.send({status:0});}
					else{
						//tokenlist = result;

						console.log(result);

						var tokenlist = [];
						for(var i=0;i<result.length;i++)
						{
							tokenlist.push(result[i].token);
						}

						//	}
						//	});
						//	});

						var targetloginId = [];
						for(var i=0;i<parseTarget.length;i++)
						{
							targetloginId.push(parseTarget[i][1]);
						}
						payload.data.login_id = JSON.stringify(targetloginId);

						console.log(payload);

						admin.messaging().sendToDevice(tokenlist,payload).then(function(response){
							console.log('Successfully sent message:',response);
						}).catch(function(error){
							console.log('Error sending message:',error);
						});
					}
				});
			}
		});
	});

});


module.exports = router;
