var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var jwt = require('jsonwebtoken');

var pool = mysql.createPool({
	connectionLimit : 40,
	host : 'localhost',
	user : 'root',
	password : 'Dlcjf2779!', // Password
	database : 'swnet',
	debug : true,
	charset : "utf8"
});

router.use(express.json());

// POST 방식이며, 권한의 위임을 실시해야함. ( 동아리 제외 )
// 전달할 정보는, 내가, 누구에게, 어떤 권한을 줄 것인지.
// 자동적으로 이전 권한자를 취소해야함.
router.get('/',function(req,res){
	//var my_auth = req.body.auth;
	//var login_id = req.body.login_id;
	//var given_auth = req.body.new_auth;
	//var mylogin_id = req.body.mylogin_id;

	// my_auth 는 내 권한
	// login_id 는 권한을 줄 아이디
	// given_auth 는, 그 아이디에게 줄 권한번호
	token = req.headers.authorization;

	decoded = null;
	try{
		decoded = jwt.verify(token,private_key)
	}
	catch(e){
		res.json({tokenValid:false,payload:null});
	}
	if(decoded){
	data = [{key:0,desc:'슈퍼계정'},
		{key:1,desc:'소프트웨어학부 동문회장'},
		{key:2,desc:'소프트웨어학부 학생'},
		{key:44,desc:'제44대 컴퓨터공학부 학생회장'},
		{key:45,desc:'제45대 컴퓨터공학부 학생회장'},
		{key:46,desc:'제46대 컴퓨터공학부 학생회장'},
		{key:47,desc:'제54대 통일공대 및 창의ICT 공과대학 비상대책위원장 및 제47대 소프트웨어학부 학생회장'},
		{key:100,desc:'소프트웨어학부 학생회장'},
		{key:101,desc:'소프트웨어학부 기획부장'},
		{key:102,desc:'소프트웨어학부 문화부장'},
		{key:103,desc:'소프트웨어학부 연대사업부장'},
		{key:104,desc:'소프트웨어학부 선전부장'},
		{key:105,desc:'소프트웨어학부 교육부장'},
		{key:106,desc:'소프트웨어학부 미디어부장'},
		{key:107,desc:'소프트웨어학부 총무팀장'},
		{key:108,desc:'소프트웨어학부 일상사업팀장'},
		{key:109,desc:'소프트웨어학부 대외사업팀장'},
		{key:110,desc:'소프트웨어학부 공무팀장'},
		{key:201,desc:'소프트웨어학부 1학년 대표'},
		{key:202,desc:'소프트웨어학부 2학년 대표'},
		{key:203,desc:'소프트웨어학부 3학년 대표'},
		{key:204,desc:'소프트웨어학부 4학년 대표'}];

	//res.send(data);
	res.json({tokenValid:true,payload:data});

}});

module.exports = router;
//router.poset('/')
