var express = require('express');
var router = express.Router();
var UserGroup = require('../../models').UserGroup;
var Group = require('../../models').Group;
var User = require('../../models').User;
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/', function (req, res, next) {
  token = req.headers.authorization;
	decoded = null;
	try{
	decoded = jwt.verify(token,private_key)
	}catch(e){
		res.json({tokenValid:false,payload:null});
	}

	if(decoded){
    Promise.all([Group.findOne({
      attributes: ['id'],
      where: { name: req.body.group_name },
    }), User.findOne({
      attributes: ['id'],
      where: { login_id: req.body.login_id },
    })])
      .then((value) => {
        UserGroup.destroy({
          where: { groupid: value[0].id, userid: value[1].id }
        })
        res.send({tokenValid:true,payload:null});
      })
      .then((result) => {
        console.log('sign out success');
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
    }
});

module.exports = router;
