const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {
	// 设置返回格式
	res.setHeader('content-type', 'application/json; charset=utf-8')
	// 获取 path
	req.path = req.url.split('?')[0]
	// query
	req.query = querystring.parse(req.url.split('?')[1])

	// 解析cookie
	req.cookie = {}
	if (req.headers.cookie) {
		req.headers.cookie.split(';').forEach(item => {
			if (!item) {
				return false
			}
			let arr = item.split('=')
			let key = arr[0].trim()
			let val = arr[1].trim()
			req.cookie[key] = val
		})
	}
	// console.log(req.cookie)
	// 处理post data
	getPostData(req).then(postData => {
		req.body = postData
		const blogResult = handleBlogRouter(req, res)
		if (blogResult) {
			blogResult.then(blogData => {
				res.end(JSON.stringify(blogData))
			})
			return
		}
		// user路由
		const userResult = handleUserRouter(req, res)
		if (userResult) {
			userResult.then(userData => {
				res.end(JSON.stringify(userData))
			})
			return
		}
		// 未匹配
		res.writeHead(404, {'content-type': 'text/plain'})
		res.write('404 Not Found\n')
		res.end()
	})
}

// 获取post 参数
const getPostData = req => {
	const promise = new Promise((resolve, reject) => {
		if (
			req.method !== 'POST' ||
			req.headers['content-type' !== 'aplication/json']
		) {
			resolve({})
			return
		}
		let postData = ''
		req.on('data', chunk => {
			postData += chunk.toString()
		})
		req.on('end', () => {
			if (!postData) {
				resolve({})
				return
			}
			resolve(JSON.parse(postData))
		})
	})
	return promise
}

module.exports = serverHandle
