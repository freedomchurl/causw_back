var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto');
var nodemail_send = require('./nodemailer_send');


// /account 로 들어오는 Routing을 처리함.
module.exports = function(login_id,res){
	console.log('Verified Code');
	/*
	여기서, insert를 실시해야함.
	*/
	// key 값을 가져온다. 
	//
	var pool = mysql.createPool({
		connectionLimit : 20,
		host : 'localhost',
		user : 'root',
		password : 'Dlcjf2779!', // Password
		database : 'swnet',
		debug : true,
		charset : 'utf8'
	});
	// Create Pool 을 통해서 Pool 을 통해서 관리하고 있음.


	pool.getConnection(function(err,conn){
		if(err){
			if(conn){
				conn.release(); // 예외시에 처리해야함.
			}
			throw err;
		}
		console.log('Connected Thread ID : ', + conn.threadId);


		var key_one=crypto.randomBytes(256).toString('hex').substr(100, 5);
		var key_two=crypto.randomBytes(256).toString('base64').substr(50, 5);
		var key_for_verify=key_one+key_two;

		//var data = {login_id:login_id, name:name, pwd:_crypt_pwd, email:email, year:year, salt:_salt};
		
		var exec = conn.query('select id,email from users where login_id=?',login_id,function(err,result){
			//conn.release();
	//		console.log('Exec SQL : ' + exec.sql);

			if(err){
				//conn.release();
				console.log('SQL Exec Error');
				console.dir(err); // Error Print.
				conn.release();
				//               throw err;
				if(!result)
					console.log('Error occur');
				res.sendStatus(404);
			}
			else{ // Query Finished.
				console.log('Result : ' + result);
				//res.sendStatus(200)			
				var id = result[0].id; // id를 가져오고.
				var email_get = result[0].email;			
				var data = {id:id,code:key_for_verify};
				var exec = conn.query('insert into verified_info set ?',data,function(err,result){
					conn.release();
					if(err){
						conn.release();
						res.sendStatus(404);
					}
					else{
						if(result){
							//node mailer
							var url = 'http://165.194.104.253:8080/account/confirmEmail?key=' + key_for_verify;
							nodemail_send(url,email_get);
							res.send({status:2});
						}
						else
						{
							res.sendStatus(404);
						}

					}
				});
			}
		});
	});

	//res.sendStatus(200); // OK.
};

