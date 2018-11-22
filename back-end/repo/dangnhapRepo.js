var db=require('./../fn/mysql-db');
var sha256 = require('crypto-js/sha256');


exports.login = user => {
	console.log(user);
	var md5_password=sha256(user.PASSWORD);
	var sql = `select * from nhanvien where USERNAME = '${user.USERNAME}' and PASSWORD = '${md5_password}';`
	return db.load(sql);
}

exports.add = user => {
	var md5_password=sha256(user.PASSWORD);
	var sql = `insert into nhanvien( HOTEN, USERNAME, PASSWORD,NGAYSINH,GIOITINH,DIACHI) 
	values('${user.HOTEN}','${user.USERNAME}', '${md5_password}', '${user.NGAYSINH}', '${user.GIOITINH}', '${user.DIACHI}' )`;
	
	return db.save(sql);
}
exports.initrftoken = userretoken => {
	var sql = `select * from userrefreshtokenext where rfToken = '${userretoken}'`;
	return db.load(sql);
}
exports.loadid = userid => {
	var sql = `select * from nhanvien where ID='${userid}'`;
	return db.load(sql);
}