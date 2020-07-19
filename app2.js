var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());

var accountRoutes = require('./routes/account/account_router.js');
var councilRoutes = require('./routes/council/council_router.js');
var groupRoutes = require('./routes/group/group_router.js');

app.use(express.json());
app.use('/account',accountRoutes);
app.use('/council',councilRoutes);
app.use('/group',groupRoutes);


app.listen(8080,function(){
	console.log('connected');
});
