var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test'); // 기본 설정에 따라 포트가 상이 할 수 있습니다.
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongo db connection OK.");
});

const app = express();
const port = 3050;


app.use('/', express.static(__dirname + "/../public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//text/plain 처리
app.use(function(req, res, next){
    if (req.is('text/*')) {
      req.text = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk){ req.text += chunk });
      req.on('end', next);
    } else {
      next();
    }
  });


//1. 스키마 생성
var attrSchema = mongoose.Schema({
    uniq : String,
    attr : String
});


//2. 모델 정의
var PromoModel = mongoose.model("PromoAttr", attrSchema);

//module.exports = mongoose.model('PromoAttr', attrSchema);

app.get('/onload', (req, res) =>{
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin");
    console.log('[GET:ONLOAD START]');
    PromoModel.find({'uniq' : 'banner'},function(err,Result){
        if(err){
            throw err;
        }else{
            if(Result.length <= 0){
                console.log("[onLoad] : 일치하는 데이터가 없어서 Null Str Response");
                res.header('Access-Control-Allow-Origin','*');
                res.json('');
            }else{
                console.log("[onLoad] : 일치하는 데이터 Response");
                res.header('Access-Control-Allow-Origin','*');
                sendData(res,Result[0].attr);
            }
        }
    })
});


app.post('/setting', (req, res) =>{
    console.log('[POST:SETTING START]');
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Content-Type,application/json");
    res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
    //res.header("Access-Control-Allow-Headers", "Content-Type");

    var jsonData = JSON.parse(req.text);
    PromoModel.find({'uniq' : jsonData.uniq},function(err,Result){
        if(err){
            throw err;
        }else{
            if(Result.length <= 0){
                console.log("[setting] : 해당 id 가 존재하지 않아서 생성");
                //3. 도큐먼트 생성
                var attrIns = new PromoModel({uniq:jsonData.uniq, attr : jsonData.attr});
                attrIns.save(function(err,testIns2){
                    if(err) return console.error(err);
                    sendData(res,jsonData.attr);
                });
            }else{
                console.log("[setting] : 해당 id가 존재하여 업데이트");
                PromoModel.update({uniq:jsonData.uniq},{$set:{ attr : jsonData.attr}},function(error){
                    if(err){
                        throw err;
                    }else{
                        console.log("[setting] : 업데이트 성공!! : " + jsonData.attr);
                        sendData(res,jsonData.attr);
                    }
                });
            }
        }
    })
});

//class 구분을 위해 공백을 추가하여 전송
var sendData = (res,data) =>{
    if(data != null && data.length>0){
        res.json(' '+data);
    }else{
        res.json('')
    }
}


const server = app.listen(port, () => {
	console.log('Express listening on port', port);
});