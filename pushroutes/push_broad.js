var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var admin = require('firebase-admin');
var jwt = require('jsonwebtoken');
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
	console.log('Test');	

	//var tokens = req.body.tokens; // token 무리를 가져온다.
	var title = req.body.title;
	var message = req.body.message;
	var postId = req.body.postId;
	var pageinfo = req.body.pageInfo;

	var payload = {
		data: {
			title : title,
			message : message,
			postId : postId,
			page_info : pageinfo,
			message_target:"newpost_broadcast",
			login_id:'null'
		}
		//priority : 'high'

	};

	token = req.headers.authorization;
	decoded = null;
	try{
		decoded = jwt.verify(token,private_key)
	}
	catch(e){
		res.json({tokenValid:false,payload:null})
	}
	if(decoded){

		pool.getConnection(function(err,conn){
			if(err){
				if(conn){
					conn.relase();
				}
				throw err;
			}

			var exec = conn.query('select token from fcm_tokens',function(err,result){
				if(err){res.send({tokenValid:true,payload:{status:0}});}
				else{
					//tokenlist = result;

					console.log(result);

					var tokenlist = [];
					console.log(tokenlist);
					for(var i=0;i<result.length;i++)
					{
						if(result[i].token != null)
							tokenlist.push(result[i].token);
					}

					//	}
					//	});
					//	});


					admin.messaging().sendToDevice(tokenlist,payload).then(function(response){
						console.log('Successfully sent message:',response);
						res.send({tokenValid:true,payload:{status:1}});
					}).catch(function(error){
						console.log('Error sending message:',error);
						res.send({tokenValid:true,payload:{status:0}});
					});
				}
			});
		});

	}});


module.exports = router;
