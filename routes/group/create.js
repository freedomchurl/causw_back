var express = require('express');
var router = express.Router();
var Group = require('../../models').Group;
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
    Group.create({
      name : req.body.group_name,
      description : req.body.description,
    })
    .then((result) => {
      console.log('group create success');
      res.send({tokenValid:true,payload:null});
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
  }
});

module.exports = router;
