var express = require('express');
var router = express.Router();
var db = require('../../models');
const Op = db.Sequelize.Op;
var jwt = require('jsonwebtoken');

/* GET users listing. */
module.exports = function(req, res, database_name) {
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

    Posting.findAll({
        where:{
            title : {
                [Op.like]:"%"+req.body.searchWord+"%"
            },
            page_info : req.body.page_info
          },
          include : [{
              model:db.User,
              attributes: ['login_id','name', 'year'],
          }],
          order:[['id',  'DESC']],
    })
    .then((posting) => {
      console.log('show posting success');
      res.json({tokenValid:true,payload:posting});
    })
    .catch((err) => {
      console.error(err);
    });
  }
}
