var express = require('express');
var multer = require('multer');
var path = require('path');
var router = express.Router();
var db = require('../../models');
var http = require('http');
var fs = require('fs');
var jwt = require('jsonwebtoken');

/* GET home page. */
module.exports = function ( req, res, database_name, url, status) {
  token = req.headers.authorization;
	decoded = null;
	try{
	decoded = jwt.verify(token,private_key)
	}catch(e){
		res.json({tokenValid:false,payload:null});
	}

	if(decoded){
    var Posting = require('../../models/posting')(db.sequelize, db.Sequelize, database_name);

    db.User.hasMany(Posting);
    Posting.belongsTo(db.User, { foreignKey: 'userId' });

    var Path = [];
    Path = url;

     new Promise(function (resolve, reject) {
      for(var i=0; i<Path.length; i++){
        fs.unlink('.'+Path[i], function(err) {
          if (err) throw err;
        });
      }
      var result = 200;
      if(status == 0){
        result = Posting.findOne({
          where:{id : req.body.postingid
          }
    })
  }
    resolve(result);
  })
    .then((posting) => {
      console.log('file deleted');

      if(status == 0){ // only file delete
        var currentUrl = posting.file;
        var updateUrl = [];
        var check = false;

        for(var i=0; i<currentUrl.length; i++){
          check = false;
        for(var j=0; j<Path.length; j++){
          if(currentUrl[i] == Path[j]){
            check = true;
          }
        }
        if(check == false){
            updateUrl.push(currentUrl[i]);
        }
      }
      var updateUrlJson = JSON.stringify(updateUrl);
      Posting.update(
          {file: updateUrl},
          {where : {id:posting.id}})

      res.send({tokenValid:true,payload:null});
      }else if(status == 1){
        // posting delete
      }
    })
      .catch((err) => {
        console.error(err);
      });
    }
}
