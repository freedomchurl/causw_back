//updatever.js
//update version
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
    new Promise(function (resolve, reject) {
        var result;
        if (req.body.isRequired == "true") {
            result =
            Promise.all([db.LastVersion.update(
                {verNum : req.body.num, verName : req.body.name},
                {where : {type:req.body.type}
                }), db.RequiredVersion.update(
                    {verNum : req.body.num, verName : req.body.name},
                    {where : {type:req.body.type}
                    })])
        }
        else{
            result =
            db.LastVersion.update(
              {verNum : req.body.num, verName : req.body.name},
              {where : {type:req.body.type}
              })
        }
    resolve(result);
    })
    .then((result)=>{
    console.log('version update success');
    res.send({tokenValid:true,payload:null});
    })
  .catch((err) => {
    console.error(err);
    next(err);
    });
  }
});

module.exports = router;
