const {login} = require('../controller/user.js')
const {SuccessModel, ErrorModel} = require('../model/resModel.js')

const handleUserRouter = (req, res) => {
	/**
	 * 博客登录接口
	 * TODO:测试该给GET和query => POST BODY
	 */
	if (req.method === 'GET' && req.path === '/api/user/login') {
		const {username, password} = req.query
		if (!username || !password) {
			return Promise.resolve(new ErrorModel('用户名或密码不能为空'))
		}

		return login(username, password).then(loginData => {
			if (loginData.username) {
				// 设置cookie
				res.setHeader(
					'Set-Cookie',
					`username=${username}; path=/; httpOnly;expires=${getCookieExpires()}`
				)
				return new SuccessModel(loginData)
			} else {
				return new ErrorModel('用户名或密码错误')
			}
		})
	}
}
// cookie过期时间
const getCookieExpires = () => {
	const d = new Date()
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
	// console.log("d.toGMTstring() is", d.toGMTString());
	return d.toGMTString()
}

module.exports = handleUserRouter
