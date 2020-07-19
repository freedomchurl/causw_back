var express = require('express');
var router = express.Router();
var db = require('../../models');
var request = require('request');
var jwt = require('jsonwebtoken');

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
      var pushData = [];
      var Posting = require('../../models/posting')(db.sequelize, db.Sequelize, database_name);
      var Comment = require('../../models/comment')(db.sequelize, db.Sequelize, database_name+'comment');
      var childcomment = require('../../models/childcomment')(db.sequelize, db.Sequelize, database_name+'childcomment');

      db.User.hasMany(Posting);
      Posting.belongsTo(db.User, { foreignKey: 'userId' });

      db.User.hasMany(Comment);
      Comment.belongsTo(db.User, {foreignKey: 'userId'});

      db.User.hasMany(childcomment);
      childcomment.belongsTo(db.User, {foreignKey: 'userId'});

      Comment.hasMany(childcomment,{foreignKey: 'commentId', sourceKey: 'id'});
      childcomment.belongsTo(Comment,{foreignKey: 'commentId', targetKey: 'id'});

      Posting.hasMany(childcomment,{foreignKey: 'postingId', sourceKey: 'id'});
      childcomment.belongsTo(Posting,{foreignKey: 'postingId', targetKey: 'id'});

      db.User.findOne({
        attributes: ['id'],
        where: { login_id: req.body.login_id },
      })
      .then((value) => {
      var result = childcomment.create({
            commentId: req.body.commentid,
            userId: value.id,
            content: req.body.content,
            page_info: req.body.page_info,
            postingId: req.body.postingid,
        })
        return result;
      })
      .then((result)=>{
        var result = childcomment.findAll({
          where:{commentId:result.commentId}, // 대댓글 쓴 애들.
          attributes:['userId'],
          include:[{model:db.User, attributes:['login_id']}]
        })
        return result;
      })
      .then((result)=>{
        for(var i=0; i<result.length; i++){
          var pos = pushData.length
          pushData[pos] = new Array();
          pushData[pos][0] = result[i].userId;
          pushData[pos][1] = result[i].user.login_id;
        }
        var result = Comment.findAll({
            where:{id:req.body.commentid},
            attributes:['userId'],
            include:[{model:db.User, attributes:['login_id']}]
        })
        return result;
      })
      .then((result)=>{
        // comment push
        for(var i=0; i<result.length; i++){
          var pos = pushData.length
          pushData[pos] = new Array();
          pushData[pos][0] = result[i].userId;
          pushData[pos][1] = result[i].user.login_id;
        }

        // find posting
        var result = Posting.findAll({
          where:{id:req.body.postingid},
          attributes:['userId'],
          include:[{model:db.User, attributes:['login_id']}]
      })
      return result;
      })
      .then((result)=>{
        for(var i=0; i<result.length; i++){
          var pos = pushData.length
          pushData[pos] = new Array();
          pushData[pos][0] = result[i].userId;
          pushData[pos][1] = result[i].user.login_id;
        }
        // posting push
      })
      .then((result)=>{
        // pushData는 이차원 배열
        // [index, login_id] 의 배열.
        // push 할 부분.
  	    var sendingData = {comment:req.body.content, postId:req.body.postingid, pageInfo:req.body.page_info, login_id:req.body.login_id,targetloginId:JSON.stringify(pushData)};

  	    request({uri:"http://127.0.0.1:8080/push/pushRecomment",
  	    	json:true,
  	    	method:"POST",
  	    	body: sendingData},function(err,response,body){
  			console.log(body);
  		} );
      })
      .then((result)=> {
        Posting.update(
          { commentCount : db.sequelize.literal('commentCount + 1') },
          {where : {id:req.body.postingid}})
      })
      .then((result) => {
        res.send({tokenValid:true,payload:null});
        console.log('childcomment create success');
      })
    .catch((err) => {
      console.error(err);
    });
  }
}
