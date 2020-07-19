var express = require('express');
var router = express.Router();
var db = require('../../models');
var jwt = require('jsonwebtoken');
var request = require('request');

/* GET users listing. */
module.exports =  function(req, res, database_name) {

  token = req.headers.authorization;
	decoded = null;
	try{
	decoded = jwt.verify(token,private_key)
	}catch(e){
		res.json({tokenValid:false,payload:null});
	}

	if(decoded){
      var Posting = require('../../models/posting')(db.sequelize, db.Sequelize, database_name);
      var Comment = require('../../models/comment')(db.sequelize, db.Sequelize, database_name+'comment');

      db.User.hasMany(Posting);
      Posting.belongsTo(db.User, { foreignKey: 'userId' });

      db.User.hasMany(Comment);
      Comment.belongsTo(db.User, {foreignKey: 'userId'});

      Posting.hasMany(Comment);
      Comment.belongsTo(Posting, {foreignKey: 'postingId'});

      db.User.findOne({
          attributes: ['id'],
          where: { login_id: req.body.login_id },
        })
      .then((value) => {
        var result = Comment.create({
            postingId: req.body.postingid,
            userId: value.id,
            content: req.body.content,
            page_info: req.body.page_info,
        })
        return result;
      })
      .then((result)=> {
        var postingid =result.postingId;
        var result = Posting.findOne({
          attributes:['userId'],
          where:{id:postingid},
          include : [{model:db.User, attributes : ['login_id']}]
        })
        return result;
      })
      .then((result)=>{
     	  var sendingData = {commentloginId:req.body.login_id, comment:req.body.content, postId : req.body.postingid, pageInfo:req.body.page_info,login_id:result.user.login_id,id:result.userId};

  	    request({uri:"http://127.0.0.1:8080/push/pushComment",
  	    method:"POST",
  	    json:true,
  	    body:sendingData},function(error,response,body){
  	    	console.log(body);
  	    });
      })
      .then((result)=> {
        Posting.update(
          { commentCount : db.sequelize.literal('commentCount + 1') },
          {where : {id:req.body.postingid}})
      })
      .then((result) => {
        res.send({tokenValid:true,payload:null});
        console.log('comment create success');
      })
    .catch((err) => {
      console.error(err);
    });
  }
}
