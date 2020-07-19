var express = require('express');
var router = express.Router();
var db = require('../../models');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/', function(req, res, next) {
  token = req.headers.authorization;
	decoded = null;
	try{
	decoded = jwt.verify(token,private_key)
	}catch(e){
		res.json({tokenValid:false,payload:null});
	}

	if(decoded){
    db.Group.findOne({where:{name:req.body.group_name}})
    .then((group) => {
      return db.UserGroup.findAll(
        { where:{groupId:group.id, agree:false},
          attributes:{exclude : ['createdAt', 'updatedAt']},
          include : [{
              model:db.User,
              attributes: ['login_id','name', 'year'],
          }]
         },
      )
    })
    .then((users)=>{
        res.send({tokenValid:true,payload:users});
      })
    .catch((err) => {
      console.error(err);
      next(err);
    });
  }
});

module.exports = router;
