var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
router.use(express.json());
router.post('/',function(req,res){
	console.log(req.headers);	
	console.log(req.headers.authorization);
	
	token = req.headers.authorization;

	let decoded = jwt.verify(token, "20144444");
	
	console.log(decoded);

	res.send({status:4});
	



});

module.exports = router;
