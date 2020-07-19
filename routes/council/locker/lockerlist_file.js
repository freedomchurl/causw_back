var express = require('express');
var router = express.Router();
var db = require('../../../models');
var fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("locker.csv");

/* GET users listing. */
router.post('/', function(req, res, next) {
    db.Locker.findAll({
        raw:true,
      })
  .then((result) => { 
      console.log(result);
      console.dir(result);
    fastcsv.write(result, {headers:true}).on("finish",function() { console.log("finish");})
    .pipe(ws);
    console.log('create success');
    res.status(201).json(result);
  })
  .catch((err) => {
    console.error(err);
    next(err);
  });
});

module.exports = router;
