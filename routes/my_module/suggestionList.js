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

      new Promise(function (resolve, reject) {
        var result;
        if (num == 1) {
          result = Suggestion.findAll({
            where:{groupId:req.body.groupid},
            offset:parseInt(req.body.offset),
            limit:parseInt(req.body.limit),
            order:[['id',  'DESC']],
          })
      }
    else{
      result = Suggestion.findAll({
        offset:parseInt(req.body.offset),
        limit:parseInt(req.body.limit),
        order:[['id',  'DESC']],
      })
    }
    resolve(result);
    })
      .then((group) => {
        console.log('find success');
        res.json({tokenValid:true,payload:group});
      })
      .catch((err) => {
        console.error(err);
      });
    }
}
