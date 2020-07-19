//searchall.js
//search all groups
var express = require('express');
var router = express.Router();
var Group = require('../../models').Group;
var jwt = require('jsonwebtoken');


router.get('/', function(req, res, next) {
  token = req.headers.authorization;
  decoded = null;
  try{
  decoded = jwt.verify(token,private_key)
  }catch(e){
  	res.json({tokenValid:false,payload:null});
  }

  if(decoded){
    Group.findAll()
    .then((groups) => {
      console.log('find all groups');
      res.json({tokenValid:true,payload:groups});
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
  }
});

module.exports = router;
