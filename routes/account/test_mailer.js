const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

var transport = nodemailer.createTransport(smtpTransport({
	service:'gmail',
	auth:{
		user: 'caucseict@gmail.com',
		pass: '$caucseict1972%'
	},
	host: 'smtp.gmail.com',
	tls : {
		rejectUnauthorized :false
	}
	//port: "587",
	//secure: false,
	//requireTLS :true,
}));

let mailOptions = {
	from : 'caucseict@gmail.com',
	to : 'junsuk0522@cau.ac.kr',
	subject: 'SWNET 회원가입 인증 메일',
	html : '<h1>이메일 인증을 위해 URL을 클릭해주세요.</h1><br>',
};

transport.sendMail(mailOptions,(err,info)=>{
	if(err){
		console.log(err);
	}
	else{
		console.log('Email sent : ' + info.response);
	}
});

