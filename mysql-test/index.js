const mysql = require('mysql')

const con = mysql.createConnection({
  host: '0.0.0.0',
  user: 'root',
  password: 'Wx211115',
  port: 3306,
  database: 'myblog'
})

con.connect()

const sql = 'select * from users;'

con.query(sql, (err, res) => {
  if (err) {
    console.log(err)
    return false
  }
  console.log(res)
})

con.end()