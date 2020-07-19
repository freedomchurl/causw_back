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
    var Posting = require('../../models/posting')(db.sequelize, db.Sequelize, database_name);

    db.User.hasMany(Posting);
    Posting.belongsTo(db.User, { foreignKey: 'userId' });

    Posting.count(
        { where: { page_info: req.body.page_info } }
    )
    .then((result) => {
        var resultjson = JSON.parse("{\"num\":"+result+"}");
        res.send({tokenValid:true,payload:resultjson});
    })
    .catch((err) => {
        console.error(err);
    });
  }
}
