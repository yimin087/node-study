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
		const listData = getList(author, keyword)

		return new SuccessModel(listData)
	}

	/**
	 * 博客详情接口
	 */
	if (req.method === 'GET' && req.path === '/api/blog/detail') {
		const id = req.query.id
		if (!id) {
			return new ErrorModel('id 参数不能为空')
		}
		const detailData = getDetail(id)
		return new SuccessModel(detailData)
	}
	/**
	 * 博客新建一篇接口
	 */
	if (req.method === 'POST' && req.path === '/api/blog/new') {
		const blogData = newBlog(req.body)
		return new SuccessModel(blogData)
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
