var express = require('express');

var dangnhapRepo = require('./../repo/dangnhapRepo');
var tokenRepo = require('./../repo/tokenRepo');




var router = express.Router();

router.get('/', (req, res) => {

})
router.post('/me', (req, res) => {
    var token = req.body.accesstoken;
    var decoded = tokenRepo.verifytoken(token);
    var user = decoded.user;
    dangnhapRepo.loadid(user.ID).then(rows => {
        if (rows.length > 0) {
            res.statusCode = 201;

        } else {
            res.statusCode = 204;
        }
    })
})
router.post('/login', (req, res) => {
    var user = {
        USERNAME: req.body.USERNAME,
        PASSWORD: req.body.PASSWORD,
        LOAI: req.body.LOAI
    }
    
    if (+req.body.LOAI === 4) {
        dangnhapRepo.logintx(user).then(rows => {
            if (rows.length > 0) {
                var userEntity = rows[0];
                dangnhapRepo.updatestatetx(userEntity.ID);
                var actoken = tokenRepo.generateAccessToken(userEntity);
                var rftoken = tokenRepo.generateRefreshToken();
                tokenRepo.updateRefreshToken(userEntity.ID, rftoken,user.LOAI)
                    .then(value => {
                        res.statusCode = 201;
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
            }else{
                res.json({
                    auth: false
                })
            }
        })
    } else {
        dangnhapRepo.login(user).then(rows => {

            if (rows.length > 0) {
                var userEntity = rows[0];
                dangnhapRepo.updatestatenv(userEntity.ID);
                var actoken = tokenRepo.generateAccessToken(userEntity);
                var rftoken = tokenRepo.generateRefreshToken();
                tokenRepo.updateRefreshToken(userEntity.ID, rftoken,userEntity.LOAI)
                    .then(value => {
                        res.statusCode = 201;
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
    }

})

router.post('/register', (req, res) => {

    var user;
    if (+req.body.LOAI === 3) {
        user = {
            HOTEN: null,
            NGAYSINH: null,
            USERNAME: req.body.USERNAME,
            PASSWORD: req.body.PASSWORD,
            GIOITINH: null,
            DIACHI: null,
            LOAI: req.body.LOAI
        };
    } else {

        user = {
            HOTEN: req.body.HOTEN,
            NGAYSINH: req.body.NGAYSINH,
            USERNAME: req.body.USERNAME,
            PASSWORD: req.body.PASSWORD,
            GIOITINH: req.body.GIOITINH,
            DIACHI: req.body.DIACHI,
            LOAI: req.body.LOAI
        };
    }

    dangnhapRepo.check(user).then(rows => {
        if (rows.length > 0) {
            res.json({ added: false });
        } else {
            dangnhapRepo.add(user).then(value => {
                    res.statusCode = 201;
                    res.json({ added: true });
                })
                .catch(err => {
                    res.statusCode = 500;
                    console.log(err);
                    res.end('View error log on console');
                })
        }
    }).catch(err => {
        res.statusCode = 500;
        console.log(err);
        res.end('View error log on console');
    })

})
router.post('/registertx', (req, res) => {
    var user = {
        USERNAME: req.body.USERNAME,
        PASSWORD: req.body.PASSWORD,
        SDT:req.body.SDT,
        HOTEN: req.body.HOTEN,
        NGAYSINH: null,
        DIACHI: null,
        STATE: 'offline'
    }

    dangnhapRepo.checktx(user).then(rows => {
        if (rows.length > 0) {
            res.json({ added: false });
        } else {
            dangnhapRepo.addtx(user).then(value => {
                    res.statusCode = 201;
                    res.json({ added: true });
                })
                .catch(err => {
                    res.statusCode = 500;
                    console.log(err);
                    res.end('View error log on console');
                })
        }
    }).catch(err => {
        res.statusCode = 500;
        console.log(err);
        res.end('View error log on console');
    })
})
router.post('/actoken', (req, res) => {
    var rftoken = req.body.rftoken;
    var LOAI=req.body.LOAI;

    dangnhapRepo.initrftoken(rftoken,LOAI).then(rows => {
        if (rows.length > 0) {
            if(LOAI===4){
                dangnhapRepo.loadidtx(rows[0].ID).then(rows1 => {
                var userEntity = rows[0];
                var actoken = tokenRepo.generateAccessToken(userEntity);
                res.json({
                    auth: true,
                    user: userEntity,
                    access_token: actoken
                })
            })
            }else{
                dangnhapRepo.loadidnv(rows[0].ID).then(rows1 => {
                var userEntity = rows[0];
                var actoken = tokenRepo.generateAccessToken(userEntity);
                res.json({
                    auth: true,
                    user: userEntity,
                    access_token: actoken
                })
            })
            }
            

        }
    })
})

module.exports = router;