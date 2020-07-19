var mysql = require('mysql');
var settingOption = require('./DBreset.json');

var fs = require('fs');


var pool = mysql.createPool({
	connectionLimit : 40,
	host : 'localhost',
	user : 'root',
	password : 'Dlcjf2779!',
	database : 'swnet',
	debug : true,
	charset : "utf8"
});


var dropSelection = [];

for(var i=0;i<settingOption.length;i++)
{
	if(settingOption[i].drop == 1) // 삭제하기로 한 Table
	{
		dropSelection.push('drop table ' + settingOption[i].table + ';');
	}
}
var querySet = '';
for(var j=0;j<dropSelection.length;j++)
{
	querySet = querySet + dropSelection[j];
}

pool.getConnection(function(err,conn){
	var exec = conn.query(querySet,function(err,result){
		console.log(result);
		conn.release();
	});
});

/*pool.getConnection(function(err,conn){
	var exec = conn.query('show tables',function(err,result){

		console.log(result.length + ' 길이 ');

		var jsonData = [];
		for(var i=0;i<result.length;i++)
		{
			var thisRow = {table:result[i].Tables_in_swnet, drop:0};
			jsonData.push(thisRow);
		}

		var _jsonString = JSON.stringify(jsonData,null,2);
		fs.writeFileSync('DBreset.json',_jsonString);
		conn.release();	
	});
});*/




//module.exports = router;
