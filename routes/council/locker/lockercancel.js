var express = require('express');
var router = express.Router();
var db = require('../../../models');
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
    Promise.all([db.User.findOne({
        attributes: ['id'],
        where: { login_id: req.body.login_id },
      }), db.Locker.findOne({
        attributes: ['id'],
        where: { floor: req.body.floor, number:req.body.number },
      })])
  .then((result) => {
      if(result[0].login_id == result[1].userId) {
        db.Locker.update(
        {userId : null, agree:false},
        {where : {id:result[1].id}
        });
      }
    console.log('locker cancel success');
    res.send({tokenValid:true,payload:null});
  })
  .catch((err) => {
    console.error(err);
    next(err);
    });
  }
});

module.exports = router;
