//myposting.js
//내 글 조회하기
var express = require('express');
var router = express.Router();
var db = require('../../models');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res, next) {
  token = req.headers.authorization;
  	decoded = null;
  	try{
  	decoded = jwt.verify(token,private_key)
  	}catch(e){
  		res.json({tokenValid:false,payload:null});
  	}

  	if(decoded){
      db.User.findOne({
          where: { login_id : req.body.login_id },
        })
    .then((user) => {
      var result = Promise.all([db.APosting.findAll({
          where:{
              userId : user.id,
            },
            include : [{
              model:db.User,
              attributes: ['login_id','name', 'year'],
          }],
        }) , db.BPosting.findAll({
            where:{
                userId : user.id,
              },
              include : [{
                model:db.User,
                attributes: ['login_id','name', 'year'],
            }],
      }) , db.CPosting.findAll({
          where:{
              userId : user.id,
            },
            include : [{
              model:db.User,
              attributes: ['login_id','name', 'year'],
          }],
      }) ,db.DPosting.findAll({
          where:{
              userId : user.id,
            },
            include : [{
              model:db.User,
              attributes: ['login_id','name', 'year'],
          }],
      })  ,db.EPosting.findAll({
          where:{
              userId : user.id,
            },
            include : [{
              model:db.User,
              attributes: ['login_id','name', 'year'],
          }],
      })  ,db.FPosting.findAll({
          where:{
              userId : user.id,
            },
            include : [{
              model:db.User,
              attributes: ['login_id','name', 'year'],
          }],
      })  ,db.GPosting.findAll({
          where:{
              userId : user.id,
            },
            include : [{
              model:db.User,
              attributes: ['login_id','name', 'year'],
          }],
      })  ,db.IPosting.findAll({
          where:{
              userId : user.id,
            },
            include : [{
              model:db.User,
              attributes: ['login_id','name', 'year'],
          }],
      })  ,db.JPosting.findAll({
          where:{
              userId : user.id,
            },
            include : [{
              model:db.User,
              attributes: ['login_id','name', 'year'],
          }],
      })  ,db.KPosting.findAll({
          where:{
              userId : user.id,
            },
            include : [{
              model:db.User,
              attributes: ['login_id','name', 'year'],
          }],
      })  ,db.LPosting.findAll({
          where:{
              userId : user.id,
            },
            include : [{
              model:db.User,
              attributes: ['login_id','name', 'year'],
          }],
      })  ,db.MPosting.findAll({
          where:{
              userId : user.id,
            },
            include : [{
              model:db.User,
              attributes: ['login_id','name', 'year'],
          }],
        }) , db.NPosting.findAll({
            where:{
                userId : user.id,
              },
              include : [{
                model:db.User,
                attributes: ['login_id','name', 'year'],
            }],
          }) , db.OPosting.findAll({
              where:{
                  userId : user.id,
                },
                include : [{
                  model:db.User,
                  attributes: ['login_id','name', 'year'],
              }],
      }) ])
      return result;
    })
    .then((value)=> {
        var result = value[0];
        for(var i=1; i<13; i++){
              var thisResult = result.concat(value[i]);
              result = thisResult;
          }
      var finalresult;
      finalresult = result.sort(function(a,b){
        return a.createdAt>b.createdAt?-1:a.createdAt<b.createdAt?1:0;
      });
      res.send({tokenValid:true,payload:finalresult});
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
  }
});

module.exports = router;
