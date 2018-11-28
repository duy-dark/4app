var express = require('express');
var requestManageRepo=require('../repo/requestManageRepo');
var router = express.Router();

router.get('/',(req,res)=>{
	requestManageRepo.loadAllRequest().then(rows=>{
		console.log(rows);
		res.json({
			data:rows
		});
	}).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
    })
})
module.exports = router;