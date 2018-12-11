var express = require('express');

var tripRepo = require('./../repo/tripRepo');



var router = express.Router();

router.get('/', (req, res) => {
    tripRepo.loadtrip().then(rows=>{
        res.json({
            chuyendi:rows
        })
    })
});

router.post('/', (req, res) => {
    var trips=req.body;
    tripRepo.updatetrip(trips).then(value => {
            console.log(value);
            res.statusCode = 201;
            res.json(req.body);
    });
});

router.post('/updateStateTaixe', (req, res) => {
    var state=req.body.state;
    var username=req.body.username;
    tripRepo.updateStateTaixe(state,username).then(value => {
            res.statusCode = 201;
            res.json({updated:true});
    }).catch(err=>{
        console.log(err);
    })

})
module.exports = router;