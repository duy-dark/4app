var express = require('express');
var moment = require('moment');

var datxerepo = require('./../repo/datxerepo');

var router = express.Router();

router.get('/', (req, res) => {
    var loop = 0;
    var fn = () => {
        datxerepo.loadcd().then(rows => {
            if (rows.length > 0) {
                datxerepo.updatestatecd(rows[0].IDCD, 'đang định vị').then(rows1 => {
                    res.statusCode = 201;
                    res.json(rows[0])
                })
            } else {
                 loop++;
                console.log(`loop: ${loop}`);
                if (loop < 4) {
                    setTimeout(fn, 2500);
                } else {
                    res.statusCode = 204;
                    res.end('no data');
                }
            }
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console');
        })
    };
    fn();
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
    thoigian=moment(thoigian*1000).format('YYYY-MM-DD HH:mm:ss');
    console.log(typeof(thoigian));
    console.log(thoigian);
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
        STATEREQUEST: req.body.STATEREQUEST,
        REVERGEOCODING: req.body.REVERGEOCODING
    }
    datxerepo.updatetoado(obj).then(value => {

            res.statusCode = 201;
            res.json(req.body);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console');
        });
})

module.exports = router;