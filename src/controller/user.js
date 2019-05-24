const {exec} = require('../db/mysql.js')
/**
 * 登录接口
 * @param {*} username 
 * @param {*} password 
 */
const login = (username, password) => {
	let sql = `select username, realname, id from users where username='${username}' and password='${password}';`
	return exec(sql).then(res => {
		console.log(res)
		return res[0] || {}
	}).catch(err => {
		console.log(err)
	})
}

module.exports = {
	login
}
