//mycomment.js
//내 댓글 조회하기
var express = require('express');
var router = express.Router();
var db = require('../../models');
var jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {
  token = req.headers.authorization;
	decoded = null;
	try{
	decoded = jwt.verify(token,private_key)
	}catch(e){
		res.json({tokenValid:false,payload:null});
	}

	if(decoded){
    db.User.findOne({
      where: { login_id: req.body.login_id },
    })
      .then((user) => {
        var result = Promise.all([db.APosting.findAll({
          include: [{
            model: db.Acomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.BPosting.findAll({
          include: [{
            model: db.Bcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.CPosting.findAll({
          include: [{
            model: db.Ccomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]
        }), db.DPosting.findAll({
          include: [{
            model: db.Dcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.EPosting.findAll({
          include: [{
            model: db.Ecomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.FPosting.findAll({
          include: [{
            model: db.Fcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.GPosting.findAll({
          include: [{
            model: db.Gcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.IPosting.findAll({
          include: [{
            model: db.Icomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.JPosting.findAll({
          include: [{
            model: db.Jcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.KPosting.findAll({
          include: [{
            model: db.Kcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.LPosting.findAll({
          include: [{
            model: db.Lcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.MPosting.findAll({
          include: [{
            model: db.Mcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.NPosting.findAll({
          include: [{
            model: db.Ncomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.OPosting.findAll({
          include: [{
            model: db.Ocomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.APosting.findAll({
          include: [{
            model: db.Achildcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.BPosting.findAll({
          include: [{
            model: db.Bchildcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.CPosting.findAll({
          include: [{
            model: db.Cchildcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.DPosting.findAll({
          include: [{
            model: db.Dchildcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.EPosting.findAll({
          include: [{
            model: db.Echildcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.FPosting.findAll({
          include: [{
            model: db.Fchildcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.GPosting.findAll({
          include: [{
            model: db.Gchildcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.IPosting.findAll({
          include: [{
            model: db.Ichildcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.JPosting.findAll({
          include: [{
            model: db.Jchildcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.KPosting.findAll({
          include: [{
            model: db.Kchildcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.LPosting.findAll({
          include: [{
            model: db.Lchildcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.MPosting.findAll({
          include: [{
            model: db.Mchildcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.NPosting.findAll({
          include: [{
            model: db.Nchildcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]

        }), db.OPosting.findAll({
          include: [{
            model: db.Ochildcomment,
            where: {
              userId: user.id
            },
            attributes: []
          }, {
            model: db.User,
          }]
        }),
        ])
        return result;
      })
      .then((value) => {
        var result = value[0];
        for (var i = 1; i < 28; i++) {
          var thisResult = result.concat(value[i]);
          result = thisResult;
        }

        var finalresult;
        finalresult = result.sort(function (a, b) {
          return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0;
        });

        var finalresult2 = [];
        finalresult2.push(finalresult[0]);
        for (var i = 0; i < finalresult.length - 1; i++) {
          if (finalresult[i + 1].id != finalresult[i].id || finalresult[i + 1].page_info != finalresult[i].page_info) {
            finalresult2.push(finalresult[i + 1]);
          }
        }
        res.send({tokenValid:true,payload:finalresult2});
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
    }
});

module.exports = router;
