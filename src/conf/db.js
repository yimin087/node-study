const env = process.env.NODE_ENV
let MYSQL_CONF
if (env === 'dev') {
	MYSQL_CONF = {
		host: '0.0.0.0',
		user: 'root',
		password: 'Wx211115',
		port: 3306,
		database: 'myblog'
	}
}

if (env === 'production') {
	MYSQL_CONF = {
		host: '0.0.0.0',
		user: 'root',
		password: 'Wx211115',
		port: 3306,
		database: 'myblog'
	}
}

module.exports = {
	MYSQL_CONF
}
