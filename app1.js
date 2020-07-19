var express = require('express');
var app = express();
var cors = require('cors');

var { sequelize } = require('./models');
sequelize.sync();

let server_config = require('./server_config.json');
global.port = server_config.port;
global.push_port = server_config.push_port;
global.private_key = server_config.private_key;
app.use(cors());

var accountRoutes = require('./routes/account/account_router.js');
var councilRoutes = require('./routes/council/council_router.js');
var groupRoutes = require('./routes/group/group_router.js');
var postRoutes = require('./routes/post/post_router.js');
var alumniRouter = require('./routes/alumni/alumni_router.js');
var mypageRouter = require('./routes/mypage/mypage_router.js');
var devRouter = require('./routes/dev/dev_router.js');
var manageRouter = require('./routes/manage/manage_router');
var fileRouter = require('./routes/file/file_router');
var misRouter = require('./routes/miscellaneous/miscellaneous_router');

var pushRouters = require('./pushroutes/push_router.js');

//var testRouters = require('./testToken.js');

app.use(express.json());
app.use('/account',accountRoutes);
app.use('/council',councilRoutes);
app.use('/group',groupRoutes);
app.use('/post',postRoutes);
app.use('/alumni', alumniRouter);
app.use('/mypage', mypageRouter);
app.use('/dev', devRouter);
app.use('/manage', manageRouter);
app.use('/file', fileRouter);
app.use('/miscellaneous',misRouter);

app.use('/push',pushRouters);

//app.use('/token',testRouters);

app.listen(port,function(){
	console.log('connected');
});
