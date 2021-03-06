var express = require('express');
var moment = require('moment');

var datxerepo = require('./../repo/datxerepo');

var router = express.Router();


var toRad=function(i) {
    return i * 3.14 / 180;
}

var hvs2=function(latA, longA, latB, longB) {
    var dLat = toRad(latA - latB);
    var dLon = toRad(longA - longB);
    var dLatDiv2 = dLat / 2;
    var dLonDiv2 = dLon / 2;
    var latBRad = toRad(latB);
    var latBRadCos = Math.cos(latBRad);
    var dLatDiv2Sin = Math.sin(dLatDiv2);
    var dLonDiv2Sin = Math.sin(dLonDiv2);
    var a = dLatDiv2Sin * dLatDiv2Sin + latBRadCos * latBRadCos * dLonDiv2Sin * dLonDiv2Sin;
    return parseInt(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1000);
}


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
    var t = +moment().valueOf();
    var obj = {
        IDCD: req.body.IDCD,
        TOADON: req.body.TOADON,
        TOADOW: req.body.TOADOW,
        STATEREQUEST: req.body.STATEREQUEST,
        REVERGEOCODING: req.body.REVERGEOCODING,
        TIMEUPDATE: t
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
router.post('/getcd12', (req, res) => {

    datxerepo.getRejectRequest(req.body.username).then(rows=>{
            datxerepo.getRequest().then(rows2=>{
                var req=[];
                for(var i1=0;i1<rows2.length;i1++){
                    var check=true;
                    for(var i2=0;i2<rows.length;i2++){
                            if(rows2[i1].IDCD==rows[i2].IDCD){
                                check=false;
                            }
                    }
                    if(check==true){
                        req.push(rows2[i1]);
                    }
                }
                if(req.length==0){
                     res.statusCode=500;
                    res.end();
                }else{
                    datxerepo.updateStateRequest(req[0],"đang chờ").then(value=>{
                        res.json({data:req[0]});
                    }).catch(err3=>{
                        console.log(err3);
                    })
 
                }

            }).catch(err2=>{
                console.log(err2);
            });

    }).catch(err=>{
        console.log(err);
    });
 
   

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
router.post('/endcd', (req, res) => {
    var user = {
        IDCD: req.body.IDCD,
        IDTX: req.body.IDTX
    }
    var p1=datxerepo.updatecdtxend(user);
    var p2=datxerepo.updatecdend(user);
    Promise.all([p1, p2]).then(([rows, rows1]) => {
        res.statusCode=201;
    })
    
})
router.post('/logout', (req, res) => {
    var user = {
        IDCD: req.body.IDCD,
        IDTX: req.body.IDTX
    }
   datxerepo.updatetxst(user).then(rows => {
        res.statusCode = 201;
    })
    
})
router.post('/getcdtc', (req, res) => {
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
        if (rows.length > 0) {
            var state = 'đang định vị';
            datxerepo.updateStateRequest(rows[0], state).then(values => {
                console.log("updated state request");
            }).catch(err => {
                console.log(err);
            });
        }

    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
    });
})
router.post('/updateposition', (req, res) => {
    datxerepo.updateposition(req.body.lat, req.body.lng, req.body.IDTX).then(rows => {
        res.statusCode == 201;
        res.json({
            TOADON: req.body.lat,
            TOADOW: req.body.lng
        })
    }).catch(err => {
        statusCode = 504;
    })
})
module.exports = router;