var db=require('./../fn/mysql-db');

exports.countloadalluser = () => {
	var sql = `select count(*) from nhanvien where STATED = 'online' `;
	return db.load(sql);
}
exports.countloadalluser = () => {
	var sql = `select count(*) from chuyendi where STATEREQUEST = 'chưa định vị' `;
	return db.load(sql);
}
exports.loadtrip = () => {
	var sql = `select * from chuyendi where STATEREQUEST = 'chưa định vị' limit ${config.requestdefault} offset ${config.offset}`;
	return db.load(sql);
}
exports.updatetrip = trips => {
	var sql = `UPDATE chuyendi SET TOADON ='${trips.TOADON}',TOADOW ='${trips.TOADOW}',STATECD ='${trips.STATECD}',REVERGEOCODING ='${trips.REVERGEOCODING}' `;
	return db.save(sql);
}
