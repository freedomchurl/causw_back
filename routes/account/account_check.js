var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//var verified_info = require('../verified_info');


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


// /account 로 들어오는 Routing을 처리함.
router.use(express.json());
router.get('/emailcheck',function(req,res){
	console.log('emailcheck');
	/*
	여기서, insert를 실시해야함.
	*/
	//수들을 받아온다.

	var email = req.query.email; // email 을받아 온다.
	console.log('Input Email = ' + email);

	pool.getConnection(function(err,conn){
		if(err){
			if(conn){
				conn.release(); // 예외시에 처리해야함.
		}
			throw err;
		}
		console.log('Connected Thread ID : ', + conn.threadId);

		//var data = {login_id:login_id, name:name, pwd:pwd, email:email, year:year, grade:grade};

		var exec = conn.query('select * from users where email=?',email,function(err,result){
			conn.release();
			console.log('Exec SQL : ' + exec.sql);

			if(err){
				conn.release();
				console.log('SQL Exec Error');
				console.dir(err); // Error Print.
				res.sendStatus(404);
				//               throw err;
				if(!result)
					console.log('Error occur');
			}
			else{ // Query Finished.
				console.log('Result : ' + result);
				if(result.length!=0){
					res.send({status : 0});
					//res.sendStatus(200);
				}
				else if(result.length==0){
					res.send({status: 1});
					//res.sendStatus(404);
				}
			}
		});
	});

	//res.sendStatus(200); // OK.
});

router.get('/idcheck',function(req,res){
	console.log('idcheck');
	/*
	여기서, insert를 실시해야함.
	*/
	//수들을 받아온다.

	var id = req.query.id; // email 을받아 온다.
	console.log('Input ID = ' + id);

	pool.getConnection(function(err,conn){
		if(err){
			if(conn){
				conn.release(); // 예외시에 처리해야함.
		}
			throw err;
		}
		console.log('Connected Thread ID : ', + conn.threadId);

		//var data = {login_id:login_id, name:name, pwd:pwd, email:email, year:year, grade:grade};

		var exec = conn.query('select * from users where login_id=?',id,function(err,result){
			conn.release();
			console.log('Exec SQL : ' + exec.sql);

			if(err){
				conn.release();
				console.log('SQL Exec Error');
				console.dir(err); // Error Print.
				res.sendStatus(404);
				//               throw err;
				if(!result)
					console.log('Error occur');
			}
			else{ // Query Finished.
				console.log('Result : ' + result);
				console.log('Result length : ' + result.length);
				console.dir(result.length);
				if(result.length>0){
					var status_result = {
						status : 0
					};
					res.send(status_result);
					//res.sendStatus(200);
				}
				else if(result.length==0){
					
					var status_result = {
						status : 1
					};
					res.send(status_result);
					//res.sendStatus(404);
				}
			}
		});
	});

	//res.sendStatus(200); // OK.
});


module.exports = router; // module export.
