var express = require('express');
var router = express.Router();
var db = require('../../models');
var jwt = require('jsonwebtoken');

/* GET users listing. */
module.exports = function (req, res, database_name) {
  token = req.headers.authorization;
	decoded = null;
	try{
	decoded = jwt.verify(token,private_key)
	}catch(e){
		res.json({tokenValid:false,payload:null});
	}

	if(decoded){
    var thisDB;
    if(req.body.type == 0){ // comment edit
      thisDB = require('../../models/comment')(db.sequelize, db.Sequelize, database_name + 'comment');
    } else if (req.body.type == 1){ // childcomment edit
      thisDB = require('../../models/childcomment')(db.sequelize, db.Sequelize, database_name + 'childcomment');
    }

    thisDB.update(
      {content:req.body.content },
      {where : {id:req.body.commentid}})
      .then((result) => {
        console.log("comment update success");
        res.send({tokenValid:true,payload:null});
        })
    .catch((err) => {
      console.error(err);
    });
  }
}
