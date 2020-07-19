var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
router.use(express.json());
router.get('/',function(req,res){
	console.log(req.headers);	
	//console.log(req.headers.authorization);
	console.log('ssss');
	token = req.headers.refreshtoken; //authorization;
	console.log(token)
	console.log("Refresh용으로 요청한 RefreshToken --------");

	decoded = null;
	try
	{
	decoded = jwt.verify(token, "20144444");
	}
	catch(e)
	{
		res.json({tokenValid:false,payload:null});
	}
	//console.log(decoded);

	if(decoded)
	{
		let token = jwt.sign({
			id : decoded.id,
			login_id : decoded.login_id,
			name : decoded.name,
			email : decoded.email,
			year : decoded.year,
			auth : decoded.auth,
			verified : decoded.verified
		},"20144444",{expiresIn : '3h'});

		let refreshToken = jwt.sign({
			id :decoded.id,
			login_id : decoded.login_id,
			name : decoded.name,
			email :decoded.email,
			year : decoded.year,
			auth : decoded.auth,
			verified : decoded.verified
		},"20144444",{expiresIn : '3d'});

		res.header("Access-Control-Allow-Headers","Authorization");
		res.header("Access-Control-Expose-Headers","*");
		res.header("Authorization",token);
		res.header("RefreshToken",refreshToken);
		
		res.json({tokenValid:true});
	}
	else
	{
		console.log("Refresh Token invalid");
		//res.json({tokenValid:false});
	}

	//res.send({status:4});
	
});

module.exports = router;
