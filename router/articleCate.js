const express = require('express')
const router = express.Router()
const articleCateHandle = require('../router_handler/articleCate')
const expressJoi = require('@escook/express-joi')
const {addCates_schema, deleteCate_schema, updatecate_schema} = require('../schema/articleCate')

// 获取文章分类列表
router.get('/cates', articleCateHandle.cates)
// 新增文章分类
router.post('/addcates', expressJoi(addCates_schema), articleCateHandle.addcates)
// 根据id删除文章分类
router.get('/deletecate/:id', expressJoi(deleteCate_schema), articleCateHandle.deletecate)
// 根据id获取文章分类数据
router.get('/cates/:id', expressJoi(deleteCate_schema), articleCateHandle.getCatesById)
// 根据id更新分章分类数据
router.post('/updatecate', expressJoi(updatecate_schema), articleCateHandle.updatecate)

module.exports  =router