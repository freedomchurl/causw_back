'use strict';

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, {host:'127.0.0.1',
    dialect: 'mysql',
    dialectOptions: { 
        typeCast: function (field, next) {
            if (field.type == 'DATETIME' || field.type == 'TIMESTAMP') {
                return new Date(field.string() + 'Z');
            }
            return next();
        }
    },
	timezone:"+09:00",
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Group = require('./group')(sequelize, Sequelize);
db.UserGroup = require('./usergroup')(sequelize, Sequelize);
//db.Comment = require('./comment')(sequelize, Sequelize);
//db.Question = require('./suggestion')(sequelize, Sequelize);
db.Locker = require('./locker')(sequelize, Sequelize);
db.LockerTime = require('./lockertime')(sequelize, Sequelize);

//db.Posting = require('./posting')(sequelize, Sequelize, 'posting');

// Version
db.LastVersion = require('./version')(sequelize, Sequelize, 'lastVersion');
db.RequiredVersion = require('./version')(sequelize, Sequelize, 'requiredVersion');

// Easter Egg for ghj
db.Egg = require('./egg')(sequelize, Sequelize);

// Posting
db.APosting = require('./posting')(sequelize, Sequelize, 'councilnotice');
db.BPosting = require('./posting')(sequelize, Sequelize, 'archive');
db.CPosting = require('./posting')(sequelize, Sequelize, 'councilgradenotice');
db.DPosting = require('./posting')(sequelize, Sequelize, 'councilgradefree');

db.EPosting = require('./posting')(sequelize, Sequelize, 'groupnotice');
db.FPosting = require('./posting')(sequelize, Sequelize, 'groupfree');
db.GPosting = require('./posting')(sequelize, Sequelize, 'grouplibrary');
//db.HPosting = require('./posting')(sequelize, Sequelize, 'groupquestion');

db.IPosting = require('./posting')(sequelize, Sequelize, 'alumnigrade');
db.JPosting = require('./posting')(sequelize, Sequelize, 'alumnifree');
db.KPosting = require('./posting')(sequelize, Sequelize, 'alumnijob');
db.LPosting = require('./posting')(sequelize, Sequelize, 'alumnigraduate');
db.MPosting = require('./posting')(sequelize, Sequelize, 'alumninotice');

// Comment
db.Acomment = require('./comment')(sequelize, Sequelize, 'councilnoticecomment');
db.Bcomment = require('./comment')(sequelize, Sequelize, 'archivecomment');
db.Ccomment = require('./comment')(sequelize, Sequelize, 'councilgradenoticecomment');
db.Dcomment = require('./comment')(sequelize, Sequelize, 'councilgradefreecomment');

db.Ecomment = require('./comment')(sequelize, Sequelize, 'groupnoticecomment');
db.Fcomment = require('./comment')(sequelize, Sequelize, 'groupfreecomment');
db.Gcomment = require('./comment')(sequelize, Sequelize, 'grouplibrarycomment');
//db.Hcomment = require('./comment')(sequelize, Sequelize, 'groupquestionComment');

db.Icomment = require('./comment')(sequelize, Sequelize, 'alumnigradecomment');
db.Jcomment = require('./comment')(sequelize, Sequelize, 'alumnifreecomment');
db.Kcomment = require('./comment')(sequelize, Sequelize, 'alumnijobcomment');
db.Lcomment = require('./comment')(sequelize, Sequelize, 'alumnigraduatecomment');
db.Mcomment = require('./comment')(sequelize, Sequelize, 'alumninoticecomment');

// childComment

db.Achildcomment = require('./childcomment')(sequelize, Sequelize, 'councilnoticechildcomment');
db.Bchildcomment = require('./childcomment')(sequelize, Sequelize, 'archivechildcomment');
db.Cchildcomment = require('./childcomment')(sequelize, Sequelize, 'councilgradenoticechildcomment');
db.Dchildcomment = require('./childcomment')(sequelize, Sequelize, 'councilgradefreechildcomment');

db.Echildcomment = require('./childcomment')(sequelize, Sequelize, 'groupnoticechildcomment');
db.Fchildcomment = require('./childcomment')(sequelize, Sequelize, 'groupfreechildcomment');
db.Gchildcomment = require('./childcomment')(sequelize, Sequelize, 'grouplibrarychildcomment');
//db.Hchildcomment = require('./childcomment')(sequelize, Sequelize, 'groupquestionchildcomment');

db.Ichildcomment = require('./childcomment')(sequelize, Sequelize, 'alumnigradechildcomment');
db.Jchildcomment = require('./childcomment')(sequelize, Sequelize, 'alumnifreechildcomment');
db.Kchildcomment = require('./childcomment')(sequelize, Sequelize, 'alumnijobchildcomment');
db.Lchildcomment = require('./childcomment')(sequelize, Sequelize, 'alumnigraduatechildcomment');
db.Mchildcomment = require('./childcomment')(sequelize, Sequelize, 'alumninoticechildcomment');


// suggestion
db.groupSuggestion = require('./suggestion')(sequelize, Sequelize, 'groupSuggestion');
db.councilSuggestion = require('./suggestion')(sequelize, Sequelize, 'councilSuggestion');
db.devSuggestion = require('./suggestion')(sequelize, Sequelize, 'devSuggestion');

// dev notice
db.NPosting = require('./posting')(sequelize, Sequelize, 'androidnotice');
db.OPosting = require('./posting')(sequelize, Sequelize, 'iosnotice');


db.Ncomment = require('./comment')(sequelize, Sequelize, 'androidnoticecomment');
db.Ocomment = require('./comment')(sequelize, Sequelize, 'iosnoticecomment');

db.Nchildcomment = require('./childcomment')(sequelize, Sequelize, 'androidnoticechildcomment');
db.Ochildcomment = require('./childcomment')(sequelize, Sequelize, 'iosnoticechildcomment');


db.User.hasMany(db.NPosting);
db.NPosting.belongsTo(db.User, {foreignKey: 'userId'});

db.User.hasMany(db.Ncomment);
db.Ncomment.belongsTo(db.User, {foreignKey: 'userId'});

db.NPosting.hasMany(db.Ncomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Ncomment.belongsTo(db.NPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Nchildcomment);
db.Nchildcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.Ncomment.hasMany(db.Nchildcomment,{foreignKey: 'commentId', sourceKey: 'id'});
db.Nchildcomment.belongsTo(db.Ncomment,{foreignKey: 'commentId', targetKey: 'id'});

db.NPosting.hasMany(db.Nchildcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Nchildcomment.belongsTo(db.NPosting,{foreignKey: 'postingId', targetKey: 'id'});

////

db.User.hasMany(db.OPosting);
db.OPosting.belongsTo(db.User, {foreignKey: 'userId'});

db.User.hasMany(db.Ocomment);
db.Ocomment.belongsTo(db.User, {foreignKey: 'userId'});

db.OPosting.hasMany(db.Ocomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Ocomment.belongsTo(db.OPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Ochildcomment);
db.Ochildcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.Ocomment.hasMany(db.Ochildcomment,{foreignKey: 'commentId', sourceKey: 'id'});
db.Ochildcomment.belongsTo(db.Ocomment,{foreignKey: 'commentId', targetKey: 'id'});

db.OPosting.hasMany(db.Ochildcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Ochildcomment.belongsTo(db.OPosting,{foreignKey: 'postingId', targetKey: 'id'});

/////////////
db.Group.hasMany(db.groupSuggestion);
db.groupSuggestion.belongsTo(db.Group, {foreignKey: 'groupId'});

//db.User.hasMany(db.Posting);
//db.Posting.belongsTo(db.User, {foreignKey: 'userId'});

//db.Group.hasMany(db.Posting);
//db.Posting.belongsTo(db.Group, {foreignKey: 'groupId'});


db.Group.hasMany(db.UserGroup);
db.UserGroup.belongsTo(db.Group, {foreignKey: 'groupId'});

db.User.hasMany(db.UserGroup);
db.UserGroup.belongsTo(db.User, {foreignKey: 'userId'});

/*
db.User.hasMany(db.Comment);
db.Comment.belongsTo(db.User, {foreignKey: 'userId'});

db.Posting.hasMany(db.Comment);
db.Comment.belongsTo(db.Posting, {foreignKey: 'postingId'});
*/

db.User.hasMany(db.Locker);
db.Locker.belongsTo(db.User);

db.LockerTime.belongsTo(db.User);

// Posting Relationship

db.User.hasMany(db.APosting);
db.APosting.belongsTo(db.User, {foreignKey: 'userId'});

db.User.hasMany(db.BPosting);
db.BPosting.belongsTo(db.User, {foreignKey: 'userId'});

db.User.hasMany(db.CPosting);
db.CPosting.belongsTo(db.User, {foreignKey: 'userId'});

db.User.hasMany(db.DPosting);
db.DPosting.belongsTo(db.User, {foreignKey: 'userId'});

db.User.hasMany(db.EPosting);
db.EPosting.belongsTo(db.User, {foreignKey: 'userId'});

db.User.hasMany(db.FPosting);
db.FPosting.belongsTo(db.User, {foreignKey: 'userId'});

db.User.hasMany(db.GPosting);
db.GPosting.belongsTo(db.User, {foreignKey: 'userId'});
/*
db.User.hasMany(db.HPosting);
db.HPosting.belongsTo(db.User, {foreignKey: 'userId'});
*/
db.User.hasMany(db.IPosting);
db.IPosting.belongsTo(db.User, {foreignKey: 'userId'});

db.User.hasMany(db.JPosting);
db.JPosting.belongsTo(db.User, {foreignKey: 'userId'});


db.User.hasMany(db.KPosting);
db.KPosting.belongsTo(db.User, {foreignKey: 'userId'});

db.User.hasMany(db.LPosting);
db.LPosting.belongsTo(db.User, {foreignKey: 'userId'});

db.User.hasMany(db.MPosting);
db.MPosting.belongsTo(db.User, {foreignKey: 'userId'});

// Comment Relationship

db.User.hasMany(db.Acomment);
db.Acomment.belongsTo(db.User, {foreignKey: 'userId'});

db.APosting.hasMany(db.Acomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Acomment.belongsTo(db.APosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Bcomment);
db.Bcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.BPosting.hasMany(db.Bcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Bcomment.belongsTo(db.BPosting,{foreignKey: 'postingId', targetKey: 'id'});


db.User.hasMany(db.Ccomment);
db.Ccomment.belongsTo(db.User, {foreignKey: 'userId'});

db.CPosting.hasMany(db.Ccomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Ccomment.belongsTo(db.CPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Dcomment);
db.Dcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.DPosting.hasMany(db.Dcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Dcomment.belongsTo(db.DPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Ecomment);
db.Ecomment.belongsTo(db.User, {foreignKey: 'userId'});

db.EPosting.hasMany(db.Ecomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Ecomment.belongsTo(db.EPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Fcomment);
db.Fcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.FPosting.hasMany(db.Fcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Fcomment.belongsTo(db.FPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Gcomment);
db.Gcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.GPosting.hasMany(db.Gcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Gcomment.belongsTo(db.GPosting,{foreignKey: 'postingId', targetKey: 'id'});
/*
db.User.hasMany(db.Hcomment);
db.Hcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.HPosting.hasMany(db.Hcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Hcomment.belongsTo(db.HPosting,{foreignKey: 'postingId', targetKey: 'id'});
*/
db.User.hasMany(db.Icomment);
db.Icomment.belongsTo(db.User, {foreignKey: 'userId'});

db.IPosting.hasMany(db.Icomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Icomment.belongsTo(db.IPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Jcomment);
db.Jcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.JPosting.hasMany(db.Jcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Jcomment.belongsTo(db.JPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Kcomment);
db.Kcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.KPosting.hasMany(db.Kcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Kcomment.belongsTo(db.KPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Lcomment);
db.Lcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.LPosting.hasMany(db.Lcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Lcomment.belongsTo(db.LPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Mcomment);
db.Mcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.MPosting.hasMany(db.Mcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Mcomment.belongsTo(db.MPosting,{foreignKey: 'postingId', targetKey: 'id'});

// childComment Relationship

db.User.hasMany(db.Achildcomment);
db.Achildcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.Acomment.hasMany(db.Achildcomment,{foreignKey: 'commentId', sourceKey: 'id'});
db.Achildcomment.belongsTo(db.Acomment,{foreignKey: 'commentId', targetKey: 'id'});

db.APosting.hasMany(db.Achildcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Achildcomment.belongsTo(db.APosting,{foreignKey: 'postingId', targetKey: 'id'});


db.User.hasMany(db.Bchildcomment);
db.Bchildcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.Bcomment.hasMany(db.Bchildcomment,{foreignKey: 'commentId', sourceKey: 'id'});
db.Bchildcomment.belongsTo(db.Bcomment,{foreignKey: 'commentId', targetKey: 'id'});

db.BPosting.hasMany(db.Bchildcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Bchildcomment.belongsTo(db.BPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Cchildcomment);
db.Cchildcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.Ccomment.hasMany(db.Cchildcomment,{foreignKey: 'commentId', sourceKey: 'id'});
db.Cchildcomment.belongsTo(db.Ccomment,{foreignKey: 'commentId', targetKey: 'id'});

db.CPosting.hasMany(db.Cchildcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Cchildcomment.belongsTo(db.CPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Dchildcomment);
db.Dchildcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.Dcomment.hasMany(db.Dchildcomment,{foreignKey: 'commentId', sourceKey: 'id'});
db.Dchildcomment.belongsTo(db.Dcomment,{foreignKey: 'commentId', targetKey: 'id'});

db.DPosting.hasMany(db.Dchildcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Dchildcomment.belongsTo(db.DPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Echildcomment);
db.Echildcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.Ecomment.hasMany(db.Echildcomment,{foreignKey: 'commentId', sourceKey: 'id'});
db.Echildcomment.belongsTo(db.Ecomment,{foreignKey: 'commentId', targetKey: 'id'});

db.EPosting.hasMany(db.Echildcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Echildcomment.belongsTo(db.EPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Fchildcomment);
db.Fchildcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.Fcomment.hasMany(db.Fchildcomment,{foreignKey: 'commentId', sourceKey: 'id'});
db.Fchildcomment.belongsTo(db.Fcomment,{foreignKey: 'commentId', targetKey: 'id'});

db.FPosting.hasMany(db.Fchildcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Fchildcomment.belongsTo(db.FPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Gchildcomment);
db.Gchildcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.Gcomment.hasMany(db.Gchildcomment,{foreignKey: 'commentId', sourceKey: 'id'});
db.Gchildcomment.belongsTo(db.Gcomment,{foreignKey: 'commentId', targetKey: 'id'});

db.GPosting.hasMany(db.Gchildcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Gchildcomment.belongsTo(db.GPosting,{foreignKey: 'postingId', targetKey: 'id'});

/*
db.User.hasMany(db.Hchildcomment);
db.Hchildcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.Hcomment.hasMany(db.Hchildcomment,{foreignKey: 'commentId', sourceKey: 'id'});
db.Hchildcomment.belongsTo(db.Hcomment,{foreignKey: 'commentId', targetKey: 'id'});
*/
db.User.hasMany(db.Ichildcomment);
db.Ichildcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.Icomment.hasMany(db.Ichildcomment,{foreignKey: 'commentId', sourceKey: 'id'});
db.Ichildcomment.belongsTo(db.Icomment,{foreignKey: 'commentId', targetKey: 'id'});

db.IPosting.hasMany(db.Ichildcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Ichildcomment.belongsTo(db.IPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Jchildcomment);
db.Jchildcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.Jcomment.hasMany(db.Jchildcomment,{foreignKey: 'commentId', sourceKey: 'id'});
db.Jchildcomment.belongsTo(db.Jcomment,{foreignKey: 'commentId', targetKey: 'id'});

db.JPosting.hasMany(db.Jchildcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Jchildcomment.belongsTo(db.JPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Kchildcomment);
db.Kchildcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.Kcomment.hasMany(db.Kchildcomment,{foreignKey: 'commentId', sourceKey: 'id'});
db.Kchildcomment.belongsTo(db.Kcomment,{foreignKey: 'commentId', targetKey: 'id'});

db.KPosting.hasMany(db.Kchildcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Kchildcomment.belongsTo(db.KPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Lchildcomment);
db.Lchildcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.Lcomment.hasMany(db.Lchildcomment,{foreignKey: 'commentId', sourceKey: 'id'});
db.Lchildcomment.belongsTo(db.Lcomment,{foreignKey: 'commentId', targetKey: 'id'});

db.LPosting.hasMany(db.Lchildcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Lchildcomment.belongsTo(db.LPosting,{foreignKey: 'postingId', targetKey: 'id'});

db.User.hasMany(db.Mchildcomment);
db.Mchildcomment.belongsTo(db.User, {foreignKey: 'userId'});

db.Mcomment.hasMany(db.Mchildcomment,{foreignKey: 'commentId', sourceKey: 'id'});
db.Mchildcomment.belongsTo(db.Mcomment,{foreignKey: 'commentId', targetKey: 'id'});

db.MPosting.hasMany(db.Mchildcomment,{foreignKey: 'postingId', sourceKey: 'id'});
db.Mchildcomment.belongsTo(db.MPosting,{foreignKey: 'postingId', targetKey: 'id'});

module.exports = db;
