var express = require('express');
var router = express.Router();
var db = require('../../models');
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
      var Comment = require('../../models/comment')(db.sequelize, db.Sequelize, database_name+'comment');
      var childcomment = require('../../models/childcomment')(db.sequelize, db.Sequelize, database_name+'childcomment');

      db.User.hasMany(childcomment);
      childcomment.belongsTo(db.User, {foreignKey: 'userId'});

      Comment.hasMany(childcomment,{foreignKey: 'commentId', sourceKey: 'id'});
      childcomment.belongsTo(Comment,{foreignKey: 'commentId', targetKey: 'id'});

      Posting.hasMany(childcomment,{foreignKey: 'postingId', sourceKey: 'id'});
      childcomment.belongsTo(Posting,{foreignKey: 'postingId', targetKey: 'id'});

      Promise.all([Comment.findOne({
          where:{id:req.body.commentid}
        }), childcomment.findAndCountAll(
          {where : {commentId:req.body.commentid}}
        )])
      .then((result)=>{
        if(result[1].count == 1 && result[0].status == 0){ // 마지막 대댓글일때 원댓글 확인 필요
          Comment.destroy({
            where:{id:req.body.commentid}
          })
        }
        childcomment.destroy({where : {id:req.body.childcommentid}});
      })
      .then((result)=> {
          Posting.update(
            { commentCount : db.sequelize.literal('commentCount - 1') },
            {where : {id:req.body.postingid}})
        })
        .then((result) => {
          res.send({tokenValid:true,payload:null});
        })
        .then((result) => {
          console.log('childcomment delete success');
        })
      .catch((err) => {
        console.error(err);
      });
  }
}
