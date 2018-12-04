var db=require('../fn/mysql-db');

exports.loadAllRequest=()=>{
	var sql=`select cd.IDCD,cd.IDTX,cd.DIEMDI,cd.THOIGIANDAT,cd.TOADON as CDTOADON,cd.TOADOW as CDTOADOW,
				cd.GHICHU,cd.HOTENKH,cd.SDT as SDTKH,cd.STATECD,cd.REVERGEOCOD,cd.TIMEUPDATE,cd.STATEREQUEST as STATEREQUES,
				tx.ID,tx.HOTEN,tx.SDT ,tx.NGAYSINH,tx.CMND,tx.DIACHI,tx.STATE,tx.TOADON,tx.TOADOW
				from chuyendi cd left join taixe tx on cd.IDTX=tx.ID`;
	return db.load(sql);
}

exports.getNew=(lrt)=>{
	var sql=`select cd.IDCD,cd.IDTX,cd.DIEMDI,cd.THOIGIANDAT,cd.TOADON as CDTOADON,cd.TOADOW as CDTOADOW,
				cd.GHICHU,cd.HOTENKH,cd.SDT as SDTKH,cd.STATECD,cd.REVERGEOCOD,cd.TIMEUPDATE,cd.STATEREQUEST as STATEREQUES,
				tx.ID,tx.HOTEN,tx.SDT ,tx.NGAYSINH,tx.CMND,tx.DIACHI,tx.STATE,tx.TOADON,tx.TOADOW
				from chuyendi cd left join taixe tx on cd.IDTX=tx.ID
				  where cd.TIMEUPDATE >${lrt}`;
	return db.load(sql);
}
