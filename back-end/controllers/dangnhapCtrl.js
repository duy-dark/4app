var express = require('express');

var dangnhapRepo = require('./../repo/dangnhapRepo');
var tokenRepo = require('./../repo/tokenRepo');




var router = express.Router();

router.get('/', (req, res) => {

})
router.get('/me', (req, res) => {
    res.statusCode = 201;
    res.json({
        msg: 'sfaj'
    })
})
router.post('/login', (req, res) => {
    var user={
        USERNAME: req.body.USERNAME,
        PASSWORD: req.body.PASSWORD
    }
    
    dangnhapRepo.login(user).then(rows => {
        
        if (rows.length > 0) {
            var userEntity = rows[0];
            console.log(userEntity);
            var actoken = tokenRepo.generateAccessToken(userEntity);
            var rftoken = tokenRepo.generateRefreshToken();

            tokenRepo.updateRefreshToken(userEntity.ID, rftoken)
                .then(value => {
                    res.json({
                        auth: true,
                        user: userEntity,
                        access_token: actoken,
                        refresh_token: rftoken
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.statusCode = 500;
                    res.end('View error log on console');
                })
        } else {
            res.json({
                auth: false
            })
        }
    })
})
router.post('/register', (req, res) => {
    var user = {
        HOTEN: req.body.HOTEN,
        NGAYSINH: req.body.NGAYSINH,
        USERNAME: req.body.USERNAME,
        PASSWORD: req.body.PASSWORD,
        GIOITINH: req.body.GIOITINH,
        DIACHI: req.body.DIACHI
    }
    dangnhapRepo.add(user).then(value => {
            console.log(value);
            res.statusCode = 201;
            res.json(req.body);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console');
        })
})
router.post('/actoken', (req, res) => {
    var rftoken = req.body.rftoken;

    dangnhapRepo.initrftoken(rftoken).then(rows => {
        if (rows.length > 0) {
            dangnhapRepo.loadid(rows[0].ID).then(rows1 => {
                var userEntity = rows[0];
                var actoken = tokenRepo.generateAccessToken(userEntity);
                res.json({
                    auth: true,
                    user: userEntity,
                    access_token: actoken
                })
            })

        }
    })
})
router.get('/')
module.exports = router;