var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var admin = require('firebase-admin');

var serviceAccount = require('./key.json');

admin.initializeApp( {credential: admin.credential.cert(serviceAccount)}  );

//var fcm_token = [ 'dlk4y8ML-7c:APA91bHl7ak2-EbUpWWbZR_s2D0uXD3MPdYvKBtu4V85s3Ppic9lMe48ByHK3e_AoHLZnaq8PGRTXEuUkNbvkpT54Md8_MVSXgaBeaUs9v8ZlOvO2Yt2_MszNTK5Scgb1ffQQGq8II-O','eEObWlfMi8l:APA91bHifK0g_3lW4zltwFwRX54rOspilrEjJqZ8JuPqfx30XbxhW7331SetOnDgoyulCDN0dnipq6lqGR7tBBmRuL9lhMV2ZOo4BT_d7Snp9-LyK60pOEdZ19yGRHCthDYJYH51aHac' ];


//var fcm_token = ['eEObWlfMi8l:APA91bHifK0g_3lW4zltwFwRX54rOspilrEjJqZ8JuPqfx30XbxhW7331SetOnDgoyulCDN0dnipq6lqGR7tBBmRuL9lhMV2ZOo4BT_d7Snp9-LyK60pOEdZ19yGRHCthDYJYH51aHac'];

//var fcm_token = ['dlk4y8ML-7c:APA91bHl7ak2-EbUpWWbZR_s2D0uXD3MPdYvKBtu4V85s3Ppic9lMe48ByHK3e_AoHLZnaq8PGRTXEuUkNbvkpT54Md8_MVSXgaBeaUs9v8ZlOvO2Yt2_MszNTK5Scgb1ffQQGq8II-O' ];

//var fcm_token = ['AAAA7HSDwNo:APA91bGRPqIoPW0aWWQKLDOBZ5hgrfD5qLKr2MJy1TWcwrljzEnQGkeCqtJEwVeS7vmYfC8wHhwcLZ_-WV3Nxtzdujx4JPHdYkDrpjzF-GoVZuGkybkREIg3bpA0a3344nv0rJEzaJem'];

//var fcm_token = ['dlk4y8ML-7c:APA91bHl7ak2-EbUpWWbZR_s2D0uXD3MPdYvKBtu4V85s3Ppic9lMe48ByHK3e_AoHLZnaq8PGRTXEuUkNbvkpT54Md8_MVSXgaBeaUs9v8ZlOvO2Yt2_MszNTK5Scgb1ffQQGq8II-O','dlk4y8ML-7c:APA91bHl7ak2-EbUpWWbZR_s2D0uXD3MPdYvKBtu4V85s3Ppic9lMe48ByHK3e_AoHLZnaq8PGRTXEuUkNbvkpT54Md8_MVSXgaBeaUs9v8ZlOvO2Yt2_MszNTK5Scgb1ffQQGq8II-O'];

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

	var tokens = req.body.tokens; // token 무리를 가져온다.
	var title = req.body.title;

	var payload = {
		data: {
			title : "장건희 토큰 타이핑 오바였다",
			message : "아이랑 엘이 구분이 안되",
			postId : "1111",
			page_info : "2222",
			message_target:"newpost_broadcast",
			login_id:'null'
		}
		//priority : 'high'

	};

	pool.getConnection(function(err,conn){
		if(err){
			if(conn){
				conn.relase();
			}
			throw err;
		}

		var exec = conn.query('select token from fcm_tokens',function(err,result){
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


				admin.messaging().sendToDevice(tokenlist,payload).then(function(response){
					console.log('Successfully sent message:',response);
				}).catch(function(error){
					console.log('Error sending message:',error);
				});
			}
		});
	});

});


module.exports = router;
