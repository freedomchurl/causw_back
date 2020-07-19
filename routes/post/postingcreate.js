const request = require('request');
var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {

	var page_info = req.body.page_info;
	var url;
	if (page_info[0] == 1) {
		url = "http://127.0.0.1:"+port+"/council/post/create";
	} else if (page_info[0] == 2) {
		url = "http://127.0.0.1:"+port+"/group/post/create";
	} else if (page_info[0] == 3) {
		url = "http://127.0.0.1:"+port+"/alumni/post/create";
	} else if (page_info[0] == 4) {
		url = "http://127.0.0.1:"+port+"/alumni/post/create";
	} else if (page_info[0] == 5) {
		url = "http://127.0.0.1:"+port+"/dev/post/create";
	}

	let options = {
		uri: url,
		headers:req.headers,
		method: 'POST',
		body: req.body,
		json: true
	};

	request.post(options, function (err, httpResponse, body) { /* ... */res.send(body); })
});

module.exports = router;
