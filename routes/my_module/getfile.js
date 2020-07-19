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

  var Path = [];
  Path = req.body.url;

  new Promise((resolve, reject) => {

    let form = new FormData();

    for(var i=0; i<Path.length; i++){
    form.append('files[]', fs.createReadStream("."+Path[i]), {
      contentType: mime.lookup("."+Path[i]),
    });
  }

    res.setHeader('x-Content-Type', 'multipart/form-data;');
    form.pipe(res);
  })
    .then((url) => {
      console.log('send file success');
    });

}
