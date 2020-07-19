// lockerregister.js
// locker register function
// 24시간 동안 한 번만 신청 가능

var express = require('express');
var router = express.Router();
var db = require('../../../models');
var jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {
  token = req.headers.authorization;
	decoded = null;
	try{
	decoded = jwt.verify(token,private_key)
	}catch(e){
		res.json({tokenValid:false,payload:null});
	}

	if(decoded){
    var currentTime = new Date();
    var thisId;
    db.User.findOne({
      attributes: ['id'],
      where: { login_id: req.body.login_id },
    })
      .then((result) => {
        thisId = result.id;
        var result = db.LockerTime.findOne({
          where: { userId: result.id },
        });
        return result;
      })
      .then((result) => {

        if (result == null || (result != null && (currentTime.getTime() - result.time.getTime()+(1*9*60*60*1000)) > 86400000)) {
          //사물함을 처음 등록하거나
          //시간 차이가 24시간 이상일 때
          var currentLocker = db.Locker.findOne({
            where: { floor: req.body.floor, number: req.body.number },
          });
          return currentLocker;
        }
        else {
          //24시간이 안지났으면, 남은 시간을 return 후 종료
          var leftTime;
          var myTime = result.time;
  	      myTime.setHours(myTime.getHours());
		console.log("내 시간 " + result.time.getTime());
		console.log("현재 시간" + currentTime.getTime());
  	      leftTime =  (currentTime.getTime() - result.time.getTime() + (1*9*60*60*1000));
  	      leftTime = parseInt((leftTime) / 1000);
		console.log(leftTime);
          res.send({tokenValid:true,payload:{ status: 2 , leftTime : leftTime}});
          throw new Error('finish');
        }
      })
      //처음 등록 혹은 24시간이 지난 경우
      .then((currentLocker)=>{
          if (currentLocker.userId == null) {
            // 빈락커면 등록
            return currentLocker;
          } else {
            // 락커가 차 있으면 return 후 종료
            res.send({tokenValid:true,payload:{status: 1}});
            throw new Error('finish');
          }
      })
      .then((currentLocker)=>{
        // 사물함 등록
        db.Locker.update(
          { userId: thisId },
          {
            where: { floor: req.body.floor, number: req.body.number }
          });
        var result = db.LockerTime.findOne(
          {
            where : {userId : thisId}},
        );
        return result;
      })
      .then((result)=>{
        // 사물함 등록 시간 기록
        if(result == null){
          // 처음 등록
          db.LockerTime.create(
            {userId:thisId, time:currentTime}
          );
          res.send({tokenValid:true,payload:{status: 0}});
        }
        else{
          // 지난 번 등록 기록이 있는 경우
          db.LockerTime.update({
            time:currentTime},{
            where:{userId:thisId},
          })
          res.send({tokenValid:true,payload:{status: 0}});
        }
      })
      .catch((err) => {
        if(err.message == 'finish'){
          // 예외 상황으로 중간에 return 한 경우 종료
        }else{
          console.error(err);
          next(err);
        }
      });
    }
});

module.exports = router;
