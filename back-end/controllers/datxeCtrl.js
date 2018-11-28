var express = require('express');
var moment = require('moment');

var datxerepo = require('./../repo/datxerepo');

var router = express.Router();

router.get('/', (req, res) => {
    datxerepo.loadcd().then(rows => {
        datxerepo.updatestatecd(rows[0].IDCD, 'đang định vị').then(rows1 => {
            if (rows.length > 0) {
                res.json({
                    request: rows[0],
                    YN: true
                })
            }else{
                res.json({
                    YN:false
                })
            }

        })
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
    })
});
router.get('/pleaseask', (req, res) => {
    datxerepo.loadAll().then(rows => {
        res.json(rows);
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
    })
});
router.post('/', (req, res) => {
    var state = 'chưa nhận';

    var thoigian = moment().unix();
    var kh = {
        TEN: req.body.TENKH,
        SDT: req.body.SDTKH,
        DIEMDI: req.body.DIEMDIKH,
        GHICHU: req.body.GHICHUKH,
        STATECD: state,
        THOIGIANDAT: thoigian

    }
    datxerepo.savekh(kh)
        .then(value => {
            console.log(value);
            res.statusCode = 201;
            res.json(req.body);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console');
        })

});
router.post('/updatetoado', (req, res) => {
    var obj = {
        IDCD: req.body.IDCD,
        TOADON: req.body.TOADON,
        TOADOW: req.body.TOADOW,
        STATECD: req.body.STATEREQUEST,
        REVERGEOCODING: req.body.REVERGEOCODING
    }
    console.log(obj);
    datxerepo.updatetoado(obj).then(value => {
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

module.exports = router;