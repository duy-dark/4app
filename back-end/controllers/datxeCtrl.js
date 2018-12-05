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
    thoigian = moment(thoigian * 1000).format('YYYY-MM-DD HH:mm:ss');
    var t = +moment().valueOf();
    console.log('time:' + t);
    var kh = {
        TEN: req.body.TENKH,
        SDT: req.body.SDTKH,
        DIEMDI: req.body.DIEMDIKH,
        GHICHU: req.body.GHICHUKH,
        STATECD: state,
        THOIGIANDAT: thoigian,
        TIMEUPDATE: t

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
router.get('/getcd', (req, res) => {
    datxerepo.loadcdapp4().then(rows => {
        if (rows.length > 0) {
            datxerepo.updatestate(rows[0].IDCD).then(rows1 => {
                res.json(rows[0]);
            })
        }
    })
})
router.post('/getcd', (req, res) => {
    var user = {
        IDCD: req.body.IDCD,
        IDTX: req.body.IDTX,
        TIMEUPDATE: moment().unix()
    }
    datxerepo.updatecd(user).then(rows => {
        res.statusCode = 201;
    })
})
router.post('/getcdtc', (req, res) => {
    console.log(req.body.IDCD);
    datxerepo.updatestate1(req.body.IDCD).then(rows => {
        res.statusCode = 201;
        res.json({
            msg: 'thanh cong'
        });
    });
})

router.post('/getNewRequest', (req, res) => {
    datxerepo.getNewRequest().then(rows => {
        res.json({ data: rows[0] });
        var state = 'đang định vị';
        datxerepo.updateStateRequest(rows[0], state).then(values => {
            console.log("updated state request");
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
    });
})
module.exports = router;