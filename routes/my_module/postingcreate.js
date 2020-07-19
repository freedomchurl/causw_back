var express = require('express');
var router = express.Router();
var db = require('../../models');
const request = require('request');
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

    db.User.findOne({
      attributes: ['id'],
      where: { login_id: req.body.login_id },
    })
      .then((value) => {
        result = Posting.create({
          title: req.body.title,
          content: req.body.content,
          userId: value.id,
          page_info: req.body.page_info,
        })
        return result;
      })
      .then((result) => {
        res.json({tokenValid:true,payload:{postingid : result.id}});
        console.log('posting create success');
      })
      .catch((err) => {
        console.error(err);
      });
    }
}
