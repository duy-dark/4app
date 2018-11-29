var db=require('./../fn/mysql-db');
var sha256 = require('crypto-js/sha256');


exports.login = user => {
	console.log(user);
	var md5_password=sha256(user.PASSWORD);
	var sql = `select * from nhanvien where USERNAME = '${user.USERNAME}' and PASSWORD = '${md5_password}' and LOAI='${user.LOAI}';`
	return db.load(sql);
}

exports.add = user => {
	var md5_password=sha256(user.PASSWORD);
	var sql = `insert into nhanvien( HOTEN, USERNAME, PASSWORD,NGAYSINH,GIOITINH,DIACHI,LOAI) 
	values('${user.HOTEN}','${user.USERNAME}', '${md5_password}', '${user.NGAYSINH}', '${user.GIOITINH}', '${user.DIACHI}',${user.LOAI} )`;
	
	return db.save(sql);
}
exports.initrftoken = refreshtoken => {
	var sql = `select nv.* from userrefreshtokenext u, nhanvien nv where nv.ID=u.ID and u.rfToken='${refreshtoken}'`;
    return db.load(sql);
}
exports.loadid = userid => {
	var sql = `select * from nhanvien where ID='${userid}'`;
	return db.load(sql);
}
exports.updatestatenv = userid => {
	var sql =  `update nhanvien set STATED = 'online' where ID = ${userid}`;
	return db.save(sql);
}
exports.check=user=>{
	var sql = `select * from nhanvien where USERNAME = '${user.USERNAME}'and LOAI='${user.LOAI}';`
	return db.load(sql);
}