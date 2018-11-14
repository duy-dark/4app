var db=require('../fn/mysql-db');


exports.savekh = KH => {
	var sql = `insert into chuyendi (HOTENKH,SDT,DIEMDI,GHICHU,STATECD,THOIGIANDAT)
				values('${KH.TEN}','${KH.SDT}','${KH.DIEMDI}','${KH.GHICHU}','${KH.STATECD}',${KH.THOIGIANDAT})`;
	return db.save(sql);
}
exports.loadAll = () => {
	var sql = 'select * from chuyendi';
	return db.load(sql);
}
exports.updatetoado = obj => {
	var sql =  `update chuyendi set TOADON = '${obj.TOADON}', TOADOW = '${obj.TOADOW}'where IDCD = ${obj.IDCD}`;
	return db.save(sql);
}