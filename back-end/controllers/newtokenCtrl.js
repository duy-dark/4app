var express = require('express');
var db = require('../fn/mysql-db');

var router = express.Router();
var tokenRepo = require('../repo/tokenRepo');
var dangnhapRepo = require('../repo/dangnhapRepo');


router.post('/createtoken', (req, res) => {
    console.log(req.body.refeshToken);
    dangnhapRepo.initrftoken(req.body.refeshToken).then(rows => {
        if (rows.length > 0) {
            var userEntity=rows[0];
            var acToken = tokenRepo.generateAccessToken(userEntity);
            console.log('àgjasgfkjasf');
            res.json({
                auth: true,
                user: userEntity,
                access_token: acToken,
                refresh_token: req.body.refeshToken
            })
        }
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
    })
})
module.exports = router;