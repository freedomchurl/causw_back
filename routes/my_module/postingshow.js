var express = require('express');
var router = express.Router();
var db = require('../../models');
var jwt = require('jsonwebtoken');

/* GET users listing. */
module.exports = function (req, res, database_name) {
  	console.log("call");
	token = req.headers.authorization;
	decoded = null;
	try{
	decoded = jwt.verify(token,private_key)
	}catch(e){
		res.json({tokenValid:false,payload:null});
	}

	if(decoded){
		
		console.log("Call2");
    var Posting = require('../../models/posting')(db.sequelize, db.Sequelize, database_name);

    db.User.hasMany(Posting);
    Posting.belongsTo(db.User, { foreignKey: 'userId' });

    Posting.update(
      {viewCount: db.sequelize.literal('viewCount + 1')},
        {where : {id:req.body.id}, returning : true})
  .then((result)=>{
      var result = Posting.findOne({
          where:{id : req.body.id},
          include : [{
            model:db.User,
            attributes: ['login_id','name', 'year'],
        }],
        raw : true,
      })
      return result;
  })
  .then((result)=> {
  	var resultStr = JSON.stringify(result);
    if(result == null){
	    var finResult = JSON.parse("{\"status\":0, \"posting\":"+resultStr+"}");
      res.send({tokenValid:true,payload:finResult});
    }else{
	    var finResult = JSON.parse("{\"status\":1, \"posting\":"+resultStr+"}");
      res.send({tokenValid:true,payload:finResult});
    }
    console.log('show posting success');
  })
  .catch((err) => {
    console.error(err);
  });
}
}
