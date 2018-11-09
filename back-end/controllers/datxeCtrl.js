var express=require('express');

var datxerepo=require('./../repo/datxerepo');

var router=express.Router();

router.get('/',(req,res)=>{

});
router.post('/',(req,res)=>{
	var state='chưa nhận';
	var kh={
		TEN: req.body.TENKH,
		SDT: req.body.SDTKH,
		DIEMDI: req.body.DIEMDIKH,
		DIEMDEN: req.body.DIEMDENKH,
		GHICHU: req.body.GHICHUKH,
		STATECD: state
	}
	console.log(kh);	
	datxerepo.savekh(kh);

});


module.exports=router;