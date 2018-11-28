var db=require('../fn/mysql-db');


exports.savekh = KH => {
	var sql = `insert into chuyendi (HOTENKH,SDT,DIEMDI,GHICHU,STATECD,THOIGIANDAT,STATEREQUEST)
				values('${KH.TEN}','${KH.SDT}','${KH.DIEMDI}','${KH.GHICHU}','${KH.STATECD}',${KH.THOIGIANDAT},'chưa định vị')`;
	return db.save(sql);
}
exports.loadcd = () => {
	var sql = `select * from chuyendi where STATEREQUEST='chưa định vị'`;
	return db.load(sql);
}
exports.updatetoado = obj => {
	var sql =  `update chuyendi set TOADON = '${obj.TOADON}', TOADOW = '${obj.TOADOW}', STATEREQUEST = '${obj.STATEREQUEST}', REVERGEOCODING='${obj.REVERGEOCODING}' where IDCD = ${obj.IDCD}`;
	return db.save(sql);
}
exports.updatestatecd = (userid,state) => {
	var sql =  `update chuyendi set STATEREQUEST = '${state}'where IDCD = ${userid}`;
	return db.save(sql);
}
exports.loadid = IDCD => {
	var sql = `select * from chuyendi where IDCD=${IDCD}`;
	return db.load(sql);
}