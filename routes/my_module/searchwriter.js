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

   db.User.findAll({
    where: { name : req.body.name },
  })
  .then((result)=>{
    var user = [];
    for(var i=0; i<result.length; i++){
      user.push(result[i].id);
    }
    var posting = Posting.findAll({
      where : {userId:user,
        page_info : req.body.page_info},
      order:[['id',  'DESC']],
      include : [
        {
          model : db.User,
          attributes : ['name', 'year', 'login_id']
        }
      ]
    })
   return posting;
  })
  .then((result)=> {
    res.send({tokenValid:true,payload:result});
  })
  .catch((err) => {
    console.error(err);
  });
}
}
