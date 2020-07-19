var express = require('express');
var router = express.Router();
var db = require('../../models');
const my_module = require('./deletefile');
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
    var Posting = require('../../models/posting')(db.sequelize, db.Sequelize, database_name);

    db.User.hasMany(Posting);
    Posting.belongsTo(db.User, { foreignKey: 'userId' });

    Posting.findOne({
      where: { id: req.body.id }
    })
    .then((result) => {
      if(result != null && result.file != null){
        my_module(req, res, database_name, result.file, 1);
      }
    })
    .then((result)=>{
      var res = Posting.destroy({
        where: { id: req.body.id }
      })
      return res;
    })
    .then((value) => {
      if (value == 1) {
        res.send({tokenValid:true,payload:{ status: 1 }});
      } else if (value == 0) {
        res.send({tokenValid:true,payload:{ status: 0 }});
      }

    })
    .then((result) => {
      console.log('posting delete success');
    })
    .catch((err) => {
      console.error(err);
    });
  }
}
