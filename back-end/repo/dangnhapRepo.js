var db=require('./../fn/mysql-db');


exports.login = user => {
	var sql = `select * from nhanvien where USERNAME = '${user.USERNAME}' and PASSWORD = '${user.PASSWORD}'`;
	return db.load(sql);
}
exports.add = user => {
	var sql = `insert into khachhang( TEN, USERNAME, PASSWORD,NGAYSINH,GIOITINH,DCHI) 
	values('${user.HOTEN}','${user.USERNAME}', '${user.PASSWORD}', '${user.NGAYSINH}', '${user.GIOITINH}', '${user.DIACHI}' )`;
	
	return db.save(sql);
}
exports.initrftoken = userretoken => {
	var sql = `select * from userrefreshtokenext where rfToken = '${userretoken}'`;
	return db.load(sql);
}
exports.loadid = userid => {
	var sql = `select * from nhanvien where HOTEN='${userid}'`;
	return db.load(sql);
}