var express = require('express');
var multer = require('multer');
var path = require('path');
var router = express.Router();
var db = require('../../models');
var http = require('http');
var fs = require('fs');
var zip = require('express-zip');
var mime = require('mime-types');
var FormData = require('form-data');
var http = require('http');

/* GET home page. */
module.exports = function (req, res) {
  var url = req.body.url;
//console.log(req);
console.log("inside module");
	console.log(req.body);
	console.log(req.body.page);
	console.log(url);
  new Promise((resolve, reject) => {
    res.download('.'+url);
    resolve();
  })
    .then((url) => {
      console.log('send file success');
    });
}
