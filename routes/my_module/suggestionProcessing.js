var express = require('express');
var router = express.Router();
var db = require('../../models');
var jwt = require('jsonwebtoken');

/* GET users listing. */
module.exports =  function(req, res, num) {
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
        if(num == 0){
            Suggestion = db.councilSuggestion;
        }else if(num == 1){
            Suggestion = db.groupSuggestion;
        }else if(num == 2){
            Suggestion = db.devSuggestion;
        }

        Suggestion.update(
              {status : 1},
              {where:{id:req.body.suggestionid}
          })
        .then((result) => {
          res.send({tokenValid:true,payload:null});
          console.log('suggestion finish');
        })
      .catch((err) => {
        console.error(err);
      });
    }
}
