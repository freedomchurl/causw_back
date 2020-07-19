var express = require('express');
var router = express.Router();
var db = require('../../models');
var jwt = require('jsonwebtoken');

/* GET users listing. */
module.exports = function (req, res, database_name){
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

    db.User.hasMany(Comment);
    Comment.belongsTo(db.User, {foreignKey: 'userId'});

    Posting.hasMany(Comment,{foreignKey: 'postingId', sourceKey: 'id'});
    Comment.belongsTo(Posting,{foreignKey: 'postingId', targetKey: 'id'});

    db.User.hasMany(childcomment);
    childcomment.belongsTo(db.User, {foreignKey: 'userId'});

    Comment.hasMany(childcomment,{foreignKey: 'commentId', sourceKey: 'id', as : 'childcomment'});
    childcomment.belongsTo(Comment,{foreignKey: 'commentId', targetKey: 'id'});

    Comment.findAll({
            where: {
                postingId: req.body.postingid
             },
             order:[['id',  'ASC']],
            include : [{
                model:db.User,
                attributes: ['login_id', 'name', 'year'],
            }, {
                model:childcomment,
                as:'childcomment',
                include:[{
                    model:db.User,
                attributes: ['login_id', 'name', 'year'],
                order:[['id',  'ASC']],
                }]
            }],
        })
        .then((result)=>{
            res.json({tokenValid:true,payload:result});
        })
        .catch((err) => {
            console.error(err);
        });
      }
}
