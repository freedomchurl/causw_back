var express = require('express');
var request = require('request');
var router = express.Router();
var db = require('../../models');
var jwt = require('jsonwebtoken');

/* GET users listing. */
module.exports = function (req, res, num) {
  // num = 0 council
  // num = 1 group
  // num = 2 dev
  token = req.headers.authorization;
	decoded = null;
	try{
	decoded = jwt.verify(token,private_key)
	}catch(e){
		res.json({tokenValid:false,payload:null});
	}

	if(decoded){
    var Suggestion;
    if (num == 0) {
      Suggestion = db.councilSuggestion;
    } else if (num == 1) {
      Suggestion = db.groupSuggestion;
    } else if (num == 2) {
      Suggestion = db.devSuggestion;
    }
    new Promise(function (resolve, reject) {
      var result;
      if (num == 1) {
        result = Suggestion.create({
          title: req.body.title,
          content: req.body.content,
          groupId : req.body.groupid,
        })
    }
  else{
    result = Suggestion.create({
      title: req.body.title,
      content: req.body.content
    })
  }
  resolve(result);
  })
  .then((result) => {
  	var myBody = {title:req.body.title, message:req.body.content,type:null,
  		group:null};

  	if(num==0)
  		myBody.type = 3;
  	else if(num==1){
  		myBody.type = 2;
  		myBody.group = req.body.groupid;
  	}
  	else if(num == 2)
  		myBody.type = 1;

  	request({uri:"http://127.0.0.1:8080/push/pushEtc"
  		,method:"POST",
  		body:myBody,
  		json:true}, function(err,response,body){
  			console.log(body);
  		});
    	res.send({tokenValid:true,payload:null});
    	console.log('send suggestion success');
  })
    .catch((err) => {
      console.error(err);
    });
  }
}
