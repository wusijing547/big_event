const express = require('express')
const router = express.Router()
const articleHandle = require('../router_handler/article')
const {add_article_schema, list_schema, id_schema, edit_article_schema} = require('../schema/articles')
const multer = require('multer')
const path = require('path')
const expressJoi = require('@escook/express-joi')
// 创建multer的实例对象， 通过dest属性指定文件的存放路径
const upload = multer({dest: path.join(__dirname, '../uploads')})

// 发布文章路由
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), articleHandle.addArticle)
// 获取文章列表路由
router.get('/list', articleHandle.getList)
// 根据id删除文章数据
router.get('/delete/:id', expressJoi(id_schema), articleHandle.deleteArticleById)
// 根据id获取文章详情
router.get('/:id', expressJoi(id_schema), articleHandle.getArticleDetailsById)
// 根据id更新文章信息
router.post('/edit', upload.single('cover_img'), expressJoi(edit_article_schema), articleHandle.editArticle)

module.exports = router