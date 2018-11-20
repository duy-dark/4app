var express = require('express');

var dangnhapRepo = require('./../repo/dangnhapRepo');
var tokenRepo = require('../repos/tokenRepo');




var router = express.Router();

router.get('/', (req, res) => {

})

router.post('/login', (req, res) => {
    dangnhapRepo.login(user).then(rows => {
        if (rows.length > 0) {
            var userEntity = rows[0];
            var actoken = tokenRepo.generateAccessToken(userEntity);
            var rftoken = tokenRepo.generateRefreshToken();

            tokenRepo.updateRefreshToken(userEntity.ID, rfToken)
                .then(value => {
                    res.json({
                        auth: true,
                        user: userEntity,
                        access_token: acToken,
                        refresh_token: rfToken
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
router.post('/actoken', (req, res) => {
    var rftoken = req.body.rftoken;

    dangnhapRepo.initrftoken(rftoken).then(rows => {
        if (rows.length > 0) {
            dangnhapRepo.loadid(rows[0].ID).then(rows1 => {
                var userEntity = rows[0];
                var actoken = tokenRepo.generateAccessToken(userEntity);
                res.json({
                	auth:true,
                	user: userEntity,
                	access_token:actoken
                })
            })

        }
    })
})
router.get('/')
module.exports = router;