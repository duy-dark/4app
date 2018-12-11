var db = require('./../fn/mysql-db');
var sha256 = require('crypto-js/sha256');


exports.login = user => {
    var md5_password = sha256(user.PASSWORD);
    var sql = `select * from nhanvien where USERNAME = '${user.USERNAME}' and PASSWORD = '${md5_password}' and LOAI=${user.LOAI}`;
    return db.load(sql);
}
exports.logintx = user => {
    var md5_password = sha256(user.PASSWORD);
    var sql = `select * from taixe where USERNAME = '${user.USERNAME}' and PASSWORD = '${md5_password}'`;
    return db.load(sql);
}

exports.add = user => {
    var md5_password = sha256(user.PASSWORD);
    var sql = `insert into nhanvien( HOTEN, USERNAME, PASSWORD,NGAYSINH,GIOITINH,DIACHI,LOAI) 
	values('${user.HOTEN}','${user.USERNAME}', '${md5_password}', '${user.NGAYSINH}', '${user.GIOITINH}', '${user.DIACHI}',${user.LOAI} )`;

    return db.save(sql);
}
exports.initrftoken = (refreshtoken, LOAI) => {
    console.log(LOAI);
    var sql;
    if (LOAI === 4) {
        sql = `select tx.* from userrefreshtokenext u, taixe tx where tx.ID=u.ID and u.rfToken='${refreshtoken}'`;
    } else {
        sql = `select nv.* from userrefreshtokenext u, nhanvien nv where nv.ID=u.ID and u.rfToken='${refreshtoken}'`;
    }
    return db.load(sql);
}
exports.loadidnv = userid => {
    var sql = `select * from nhanvien where ID='${userid}'`;
    return db.load(sql);
}
exports.loadidtx = userid => {
    var sql = `select * from taixe where ID='${userid}'`;
    return db.load(sql);
}
exports.updatestatenv = userid => {
    var sql = `update nhanvien set STATED = 'online' where ID = ${userid}`;
    return db.save(sql);
}
exports.check = user => {
    var sql = `select * from nhanvien where USERNAME = '${user.USERNAME}'and LOAI='${user.LOAI}'`;
    return db.load(sql);
}
exports.checktx = user => {
    var sql = `select * from taixe where USERNAME = '${user.USERNAME}'`;
    return db.load(sql);
}
exports.addtx = user => {
    var md5_password = sha256(user.PASSWORD);
    var sql = `insert into taixe( HOTEN, USERNAME, PASSWORD,NGAYSINH,DIACHI,STATE,SDT) 
	values('${user.HOTEN}','${user.USERNAME}', '${md5_password}', '${user.NGAYSINH}', '${user.DIACHI}','${user.STATE}','${user.SDT}' )`;

    return db.save(sql);
}
exports.updatestatetx = userid => {
    var sql = `update taixe set STATE = 'READY' where ID = ${userid}`;
    return db.save(sql);
}