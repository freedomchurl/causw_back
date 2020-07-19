var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit : 20,
	host : 'localhost',
	user : 'root',
	password : 'Dlcjf2779!',
	database : 'swnet',
	debug : true,
	charset : 'utf8'
});



router.use(express.json());
router.get('/',function(req,res){

	console.log('Email Confirm');

	var key = req.query.key;
	
	pool.getConnection(function(err,conn){
		if(err){
			if(conn){
				conn.release();
			}
			throw err;
		}
		
		var exec = conn.query('update verified_info A inner join users B on A.id = B.id set B.verified = 1 where A.code=?',key,function(err,result){
			conn.release();

			if(err){
				res.sendStatus(404);
			}
			else{
				res.send('인증이 성공적으로 이루어졌습니다.');
			}
		});
	});

});

module.exports = router;
