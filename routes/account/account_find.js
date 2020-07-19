var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var jwt = require('jsonwebtoken');

router.use(express.json());

var pool = mysql.createPool({
	connectionLimit : 40,
	host : 'localhost',
	user : 'root',
	password : 'Dlcjf2779!',
	database : 'swnet',
	debug : true,
	charset : "utf8"
});

router.get('/idsearch',function(req,res){
	var id = req.query.id
	// id를 전달하면, 이름까지 return 해야한다. 
	
	token = req.headers.authorization;
	decoded = null;
	try{
		decoded = jwt.verify(token,private_key)
	}
	catch(e){
		res.json({tokenValid:false,payload:null});
	}
	if(decoded){

	pool.getConnection(function(err,conn){
		if(err){
			if(conn){
				conn.release();
			}
			throw err;
		}

		console.log('Connected Thread ID : ', + conn.threadId);
		// id를 검색하면, id, login_id, name, year 반환 

		var exec = conn.query('select id,login_id,name,year from users where login_id=?',id,function(err,result){
			conn.release();
			
			if(err){
			}
			else{
				if(result.length){
					res.send(result[0]);
				}
				else
				{
					res.sendStatus(404);
				}
			}
		});
	});
}});

router.get('/getallusers',function(req,res){
	
	token = req.headers.authorization;
	decoded = null;
	try{
		decoded = jwt.verify(token,private_key);
	}catch(e){
		res.json({tokenValid:false,payload:null});
	}
	if(decoded){
		/*
	 Check Authorization. 
	 */
	console.log('Print All users');
	pool.getConnection(function(err,conn){
		if(err){
			if(conn){
				conn.release();
			}
			throw err;
		}
		
		var exec = conn.query('select id,login_id,name,year,email,auth from users where verified<>2',function(err,result){
			conn.release();
			if(err){}
			else{
				res.send({tokenValid:true,payload:result});
				
			}
		});
	});
}});

router.get('/getallcouncils',function(req,res){
	
	token = req.headers.authorization;
	decoded = null;
	try{
		decoded = jwt.verify(token,private_key);
	}catch(e){
		res.json({tokenValid:false,payload:null});
	}

	if(decoded){
	console.log('Print All councils');

	pool.getConnection(function(err,conn){
		if(err){
			if(conn){
				conn.release();
			}
			throw err;
		}

		var exec = conn.query('select id,login_id,name,year,email,auth from users where auth>=100 and auth<111',function(err,result){
			conn.release();
			if(err){res.sendStatus(404);}
			else{
				res.send({tokenValid:true,payload:result});
			}
		
		});
	});

}});

router.get('/getallgrades',function(req,res){
	
	token = req.headers.authorization;
	decoded = null;
	try{
		decoded = jwt.verify(token,private_key);
	}catch(e){
		res.json({tokenValid:false,payload:null});
	}
	if(decoded){

	pool.getConnection(function(err,conn){
		if(err){
			if(conn){
				conn.release();
			}
			throw err;
		}

		var exec = conn.query('select id,login_id,name,year,email,auth from users where auth>=200 and auth<300',function(err,result){
			conn.release();
			if(err){res.sendStatus(404);}
			else{
				res.send({tokenValid:true,payload:result});
			}
		
		});
	
	});

}});

router.get('/namesearch',function(req,res){
	var name = req.query.name
	// id를 전달하면, 이름까지 return 해야한다. 
	
	token = req.headers.authorization;
	decoded = null;
	try{
		decoded = jwt.verify(token,private_key);
	}
	catch(e){
		res.json({tokenValid:false,payload:null});
	}
	if(decoded){

	pool.getConnection(function(err,conn){
		if(err){
			if(conn){
				conn.release();
			}
			throw err;
		}

		console.log('Connected Thread ID : ', + conn.threadId);
		// id를 검색하면, id, login_id, name, year 반환 

		var exec = conn.query('select id,login_id,name,year from users where name=?',name,function(err,result){
			conn.release();
			
			if(err){
			}
			else{
				console.log(result.length);
				if(result.length){
					res.send({tokenValid:true,payload:result});
				}
				else
				{
					console.log("Not Name");
					//res.sendStatus(404);
					res.json({tokenValid:true,payload:null});
				}
			}
		});
	});
}});
module.exports = router;
