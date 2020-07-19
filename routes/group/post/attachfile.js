var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
const my_module = require('../../my_module/attatchfile');

const upload = multer({
    storage: multer.diskStorage({ // 파일 저장 경로, 파일명.
      destination(req, file, cb) {
        cb(null, 'uploads/group');
      },
      filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },//파일명은 기존 이름에 업로드 날짜 + 기존 확장자를 붙이기로.
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 최대 이미지 파일 용량. 현재 10MB.
  });


/* GET users listing. */
router.post('/', upload.array('fileName'), function (req, res, next) {
    var database_name;
    var page_info = req.body.page_info;
    if(page_info[1] == 0){
        database_name = 'groupnotice';
    } else if(page_info[1] == 1){
        database_name = 'groupfree';
    }else if(page_info[1] == 2){
        database_name = 'grouplibrary';
    } else if(page_info[1] == 3){
       // 건의
    }
    my_module(req, res, database_name,'group');
});

module.exports = router;
