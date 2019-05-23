const {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
} = require('../controller/blog.js')
const {SuccessModel, ErrorModel} = require('../model/resModel.js')

const handleBlogRouter = (req, res) => {
	/**
	 * 博客列表接口
	 */
	if (req.method === 'GET' && req.path === '/api/blog/list') {
		const author = req.query.author || ''
		const keyword = req.query.keyword || ''
		return getList(author, keyword).then(res => {
			return new SuccessModel(res)
		})
		// console.log()

		// return new SuccessModel(listData)
	}

	/**
	 * 博客详情接口
	 */
	if (req.method === 'GET' && req.path === '/api/blog/detail') {
		const id = req.query.id
		if (!id) {
			return new Promise((resolve, reject) => {
				resolve(new ErrorModel('id 参数不能为空'))
			})
		}
		return getDetail(id).then(detailData => {
			return new SuccessModel(detailData)
		})
	}
	/**
	 * 博客新建一篇接口
	 */
	if (req.method === 'POST' && req.path === '/api/blog/new') {
		if (!req.body.title || !req.body.content || !req.body.author) {
			return new Promise((resolve, reject) => {
				resolve(new ErrorModel('title content author 参数不能为空'))
			})
		}
		return newBlog(req.body).then(blogData => {
			return new SuccessModel(blogData)
		})
	}
	/**
	 * 博客更新一篇接口
	 */
	if (req.method === 'POST' && req.path === '/api/blog/update') {
		if (!req.body.id) {
			return new ErrorModel('id 参数不能为空')
		}
		const data = updateBlog(req.body)
		return new SuccessModel(data)
	}
	/**
	 * 博客删除一篇接口
	 */
	if (req.method === 'POST' && req.path === '/api/blog/del') {
		let id = req.body.id
		if (!id) {
			return new ErrorModel('id 参数不能为空')
		}
		const data = delBlog(id)
		return new SuccessModel(data)
	}
}

module.exports = handleBlogRouter
