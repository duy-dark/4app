var db=require('../fn/mysql-db');


exports.savekh = KH => {
	var sql = `insert into chuyendi (HOTENKH,SDT,DIEMDI,GHICHU,STATECD,THOIGIANDAT)
				values('${KH.TEN}','${KH.SDT}','${KH.DIEMDI}','${KH.GHICHU}','${KH.STATECD}',${KH.THOIGIANDAT})`;
	return db.save(sql);
}