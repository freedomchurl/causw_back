var express = require('express');
var multer = require('multer');
var path = require('path');
var router = express.Router();
var db = require('../../models');
var jwt = require('jsonwebtoken');
//var utf8 = require('utf-8');
//var Iconv = require('iconv-lite');

/* GET home page. */
module.exports = function ( req, res, database_name, foldername) {
	//console.log(req.body.filename)
	token = req.headers.authorization;
	decoded = null;
	try{
		decoded = jwt.verify(token,private_key)
	}catch(e){
		res.json({tokenValid:false,payload:null});
	}

	if(decoded){

		//	if(true){
		var Posting = require('../../models/posting')(db.sequelize, db.Sequelize, database_name);

		db.User.hasMany(Posting);
		Posting.belongsTo(db.User, { foreignKey: 'userId' });

		console.log(req);
		console.log("Inside module");
		//		console.log(req);
		//console.log(files[0].filename);
		var fileNum = req.files.length;
		var files = req.files;
		var url = [];
		var currentUrl=[];

		Posting.findOne({
			where:{id : req.body.postingid}
		})
			.then((posting) => {
				console.log("id okay");
				if(posting.file == null){
					currentUrl = [];
				}else{
					currentUrl = posting.file;
				}

				for(var i=0; i<fileNum; i++) {
					var curUrl = '' + `/uploads/${foldername}/${files[i].filename}`;

					console.log(files[i].filename);
					//var buf = new Buffer(files[i].filename);
					//		  
					//	  var re = buf.toString('ascii');

					//	 var se = re.toString('utf-8');
					//	  console.log(se);
					//var encode = new Iconv('ascii','utf-8');

					//		  var thi = Iconv.decode(files[i].filename, 'ASCII');

					//			  console.log(thi.toString('utf-8'));
					//	  console.log(utf8.decode(files[i].filename));

					currentUrl.push(curUrl);
					console.log(curUrl);
				}

				console.log('upload file success');
				res.send({tokenValid:true,payload:null});
				Posting.update(
					{file: currentUrl},
					{where : {id:posting.id}})
			})
			.catch((err) => {
				console.error(err);
			});
	}
}
