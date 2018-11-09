var db=require('../fn/mysql-db');


exports.savekh = KH => {
	var sql = `insert into chuyendi (HOTENKH,SDT,DIEMDI,DIEMDEN,GHICHU,STATECD)
				values('${KH.TEN}','${KH.SDT}','${KH.DIEMDI}','${KH.DIEMDEN}','${KH.GHICHU}','${KH.STATECD}')`;
	return db.save(sql);
}