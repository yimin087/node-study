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
	}

	/**
	 * 博客详情接口
	 */
	if (req.method === 'GET' && req.path === '/api/blog/detail') {
		const id = req.query.id
		if (!id) {
			return Promise.resolve(new ErrorModel('id 参数不能为空'))
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
			return Promise.resolve(
				new ErrorModel('title content author 参数不能为空')
			)
		}
		return newBlog(req.body).then(blogData => {
			return new SuccessModel(blogData)
		})
	}
	/**
	 * 博客更新一篇接口
	 */
	if (req.method === 'POST' && req.path === '/api/blog/update') {
		if (!req.body.id || !req.body.title || !req.body.content) {
			return Promise.resolve(new ErrorModel('title content id 参数不能为空'))
		}
		return updateBlog(req.body).then(blogData => {
			return new SuccessModel(blogData)
		})
	}
	/**
	 * 博客删除一篇接口
	 */
	if (req.method === 'POST' && req.path === '/api/blog/del') {
		if (!req.body.id || !req.body.author) {
			return Promise.resolve(new ErrorModel('author id 参数不能为空'))
		}
		return delBlog(req.body).then(blogData => {
			return new SuccessModel(blogData)
		})
	}
}

module.exports = handleBlogRouter
