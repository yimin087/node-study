const {exec} = require('../db/mysql.js')
const getList = (author, keywork) => {
	let sql = 'select * from blogs where 1=1 '
	if (author) {
		sql += `and author='${author}' `
	}
	if (keywork) {
		sql += `and title like '%${keywork}%' `
	}
	sql += 'order by createtime desc;'
	return exec(sql)
}

const getDetail = id => {
	let sql = `select * from blogs where id=${id}`

	return exec(sql).then(res => {
		return res[0]
	})
}

const newBlog = (blogData = {}) => {
	let date = Date.now()
	let sql = `insert into blogs (title, content, createtime, author) value ('${
		blogData.title
	}', '${blogData.content}', ${date}, '${blogData.author}');`

	return exec(sql).then(res => {
		return {
			id: res.insertId
		}
	})
}
const updateBlog = (blogData = {}) => {
	return {
		status: 1,
		...blogData
	}
}
const delBlog = id => {
	return {
		status: 1
	}
}

module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
}
