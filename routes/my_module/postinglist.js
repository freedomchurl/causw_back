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
//		console.log("token : " + token);
		res.json({tokenValid:false,payload:null});
	}

	if(decoded){
    var Posting = require('../../models/posting')(db.sequelize, db.Sequelize, database_name);

    db.User.hasMany(Posting);
    Posting.belongsTo(db.User, { foreignKey: 'userId' });

    Posting.findAll({
      where : {page_info : req.body.page_info},
      offset:parseInt(req.body.offset),
      limit:parseInt(req.body.limit),
      order:[['id',  'DESC']],
      include : [{
        model:db.User,
        attributes: ['login_id','name', 'year'],
    }]
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
