const mysql = require('mysql')
const {MYSQL_CONF} = require('../conf/db.js')

const con = mysql.createConnection(MYSQL_CONF)

con.connect()

function exec(sql) {
	let promise = new Promise((reslove, reject) => {
		con.query(sql, (err, res) => {
			if (err) {
				reject(err)
			}
			reslove(res)
		})
	})
	return promise
}

module.exports = {
	exec
}
