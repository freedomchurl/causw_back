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
    Group.findOne({
        where:{name : req.body.group_name}
    })
    .then((group) => {
      console.log('group find success');
      res.json({tokenValid:true,payload:group});
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
  }
});

module.exports = router;
