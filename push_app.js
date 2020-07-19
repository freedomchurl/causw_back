var express = require('express');
var app = express();
var cors = require('cors');

//var { sequelize } = require('./models');
//sequelize.sync();

let server_config = require('./push_server_config.json');
global.port = server_config.port;
app.use(cors());

var pushRoutes = require('./pushroutes/push_router.js');

app.use(express.json());
app.use('/push',pushRoutes);

app.listen(21,function(){
	console.log('connected');
});
