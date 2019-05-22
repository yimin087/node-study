const {login} = require('../controller/user.js')
const {SuccessModel, ErrorModel} = require('../model/resModel.js')

const handleUserRouter = (req, res) => {
	/**
	 * 博客登录接口
	 */
	if (req.method === 'POST' && req.path === '/api/user/login') {
		const {username, password} = req.body
		if (!username || !password) {
			return new ErrorModel('用户名或密码不能为空')
		}
		const loginStatus = login(username, password)
		if (loginStatus) {
			return new SuccessModel(loginData)
		} else {
			return new ErrorModel('用户名或密码错误')
		}
	}
}

module.exports = handleUserRouter
