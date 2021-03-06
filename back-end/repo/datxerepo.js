var db=require('../fn/mysql-db');


exports.savekh = KH => {
	var sql = `insert into chuyendi (HOTENKH,SDT,DIEMDI,GHICHU,STATECD,THOIGIANDAT,STATEREQUEST,TIMEUPDATE)
				values('${KH.TEN}','${KH.SDT}','${KH.DIEMDI}','${KH.GHICHU}','${KH.STATECD}','${KH.THOIGIANDAT}','chưa định vị',${KH.TIMEUPDATE})`;
	return db.save(sql);
}
exports.loadcd = () => {
	var sql = `select * from chuyendi where STATEREQUEST='chưa định vị'`;
	return db.load(sql);
}
exports.updatetoado = obj => {
	var sql =  `update chuyendi set TOADON = '${obj.TOADON}', TOADOW = '${obj.TOADOW}', STATEREQUEST = '${obj.STATEREQUEST}', REVERGEOCODING='${obj.REVERGEOCODING}',TIMEUPDATE=${obj.TIMEUPDATE} where IDCD = ${obj.IDCD}`;
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

exports.loadcdapp4 = () => {
	var sql = `select * from chuyendi where STATECD='chưa nhận'`;
	return db.load(sql);
}
exports.updatestate = IDCD => {
	var sql = `update chuyendi set STATECD='đã nhận' where IDCD = ${IDCD}`;
	return db.save(sql);
}
exports.updatecd = user => {
	var sql = `update chuyendi set IDTX='${user.IDTX}',STATECD='đã nhận',TIMEUPDATE='${user.TIMEUPDATE}' where IDCD = ${user.IDCD}`;
	return db.save(sql);
}
exports.updatecdend = user => {
	var sql = `update chuyendi set STATECD='đã xong',TIMEUPDATE='${user.TIMEUPDATE}' where IDCD = ${user.IDCD}`;
	return db.save(sql);
}
exports.updatecdtxend = user => {
	var sql = `update taixe set STATE='READY' where IDCD = ${user.IDTX}`;
	return db.save(sql);
}
exports.updatetxst = user => {
	var sql = `update taixe set STATE='OFFLINE' where IDCD = ${user.IDTX}`;
	return db.save(sql);
}
exports.updatestate1 = IDCD => {
	var sql = `update chuyendi set STATECD='chưa nhận' where IDCD = ${IDCD}`;
	return db.save(sql);
}
exports.getNewRequest=()=>{
	var sql = `select * from chuyendi where STATEREQUEST='chưa định vị'`;
	return db.load(sql);
}
exports.updateStateRequest=(row,state)=>{
	var sql = `update chuyendi set STATEREQUEST='${state}' where IDCD=${row.IDCD}`;
	return db.save(sql);
}
exports.getRejectRequest=(user)=>{
	var sql = `select * from rejectrequest where USERNAMETX='${user}'`;
	return db.load(sql);
}
exports.getRequest=()=>{
	var sql = `select * from chuyendi where STATECD="chưa nhận" or STATECD="không có xe" and STATEREQUEST="đã định vị"`;
	return db.load(sql);
}
exports.getTX=()=>{
	var sql = `select * from taixe where STATE="READY" `;
	return db.load(sql);
}

