const getList = (author, keywork) => {
	return [
		{
			id: 1,
			title: '标题A',
			content: '内容A',
			author: 'zhangsan',
			createTime: 1558422104196
		},
		{
			id: 2,
			title: '标题B',
			content: '内容B',
			author: 'lisi',
			createTime: 1558422131202
		}
	]
}

const getDetail = id => {
	return {
		id: 1,
		title: '标题A',
		content: '内容A',
		author: 'zhangsan',
		createTime: 1558422104196
	}
}

const newBlog = (blogData = {}) => {
	return {
		id: 3,
		...blogData
	}
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
