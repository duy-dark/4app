var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');

var datxeCtrl = require('./controllers/datxeCtrl');
var dangnhapCtrl=require('./controllers/dangnhapCtrl');
var tripCtrl=require('./controllers/tripCtrl');
var requestManageCtrl=require('./controllers/requestManageCtrl')

var verifyAccessToken = require('./repo/tokenRepo').verifyAccessToken;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        msg: 'hello from nodejs express api'
    })
});

app.use('/datxe/', datxeCtrl);
app.use('/account',dangnhapCtrl);
app.use('/verifytrip',verifyAccessToken,tripCtrl);
app.use('/requestManage',verifyAccessToken,requestManageCtrl);


var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`QLBH API is running on port ${port}`);
})