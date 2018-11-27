var db=require('../fn/mysql-db');

exports.loadAllRequest=()=>{
	var sql=`select * from chuyendi cd right join taixe tx on cd.IDTX=tx.ID`;
	return db.load(sql);
}