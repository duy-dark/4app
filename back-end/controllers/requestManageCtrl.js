var express = require('express');
var requestManageRepo=require('../repo/requestManageRepo');
var router = express.Router();
var moment = require('moment');
router.get('/',(req,res)=>{
	requestManageRepo.loadAllRequest().then(rows=>{
		res.json({
			data:rows
		});
	}).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
    });
});

router.post('/getNew',(req,res)=>{
	
	var lrt=+req.body.lastReadTime;
	requestManageRepo.getNew(lrt).then(rows=>{
		res.json({data:rows});
		
	}).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
    });
});

module.exports = router;