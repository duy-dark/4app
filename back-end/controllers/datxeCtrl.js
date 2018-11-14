var express = require('express');
var moment = require('moment');

var datxerepo = require('./../repo/datxerepo');

var router = express.Router();

router.get('/', (req, res) => {
    datxerepo.loadAll().then(rows => {
        res.json(rows);
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
    })
});
router.post('/', (req, res) => {
    var state = 'chưa được định vị';
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


module.exports = router;