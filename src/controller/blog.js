const {exec} = require('../db/mysql.js')

/**
 * 获取博客列表
 * @param {*} author
 * @param {*} keywork
 */
const getList = (author, keywork) => {
	let sql = 'select * from blogs where status=1 '
	if (author) {
		sql += `and author='${author}' `
	}
	if (keywork) {
		sql += `and title like '%${keywork}%' `
	}
	sql += 'order by createtime desc;'
	return exec(sql).catch(err => {
		console.log(err)
	})
}
/**
 * 获取一篇博客的详情
 * @param {id} id
 */
const getDetail = id => {
	let sql = `select * from blogs where id=${id}`

	return exec(sql)
		.then(res => {
			return res[0]
		})
		.catch(err => {
			console.log(err)
		})
}

/**
 *新建一篇博客
 * @param {title, content, createtime, author} blogData
 */
const newBlog = (blogData = {}) => {
	let date = Date.now()
	let sql = `insert into blogs (title, content, createtime, author) value ('${
		blogData.title
	}', '${blogData.content}', ${date}, '${blogData.author}');`

	return exec(sql)
		.then(res => {
			return {
				id: res.insertId
			}
		})
		.catch(err => {
			console.log(err)
		})
}
/**
 * 更新一篇博客
 * @param {id, title, content} blogData
 * @status  1:更新成功  0:更新失败
 *
 */
const updateBlog = (blogData = {}) => {
	let date = Date.now()
	let sql = `update blogs set title='${blogData.title}',content='${
		blogData.content
	}',createtime=${date} where id=${blogData.id}`
	return exec(sql)
		.then(res => {
			if (res.affectedRows > 0) {
				return {
					status: 1
				}
			} else {
				return {
					status: 0
				}
			}
		})
		.catch(err => {
			console.log(err)
			return {
				status: 0
			}
		})
}
/**
 * 删除一篇博客
 * @param {id, author} blogData
 * @status 1:删除成功  0:删除失败
 */
const delBlog = blogData => {
	let date = Date.now()
	let sql = `update blogs set status=0,createtime=${date} where id=${
		blogData.id
	} and author='${blogData.author}';`
	return exec(sql)
		.then(res => {
			if (res.affectedRows > 0) {
				return {
					status: 1
				}
			} else {
				return {
					status: 0
				}
			}
		})
		.catch(err => {
			console.log(err)
			return {
				status: 0
			}
		})
}

module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
}
