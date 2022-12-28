const joi = require('joi')

//定义验证规则对象
id = joi.number().integer().min(1).required()
title = joi.string().required()
cate_id = joi.number().integer().min(1).required()
content = joi.string().required().allow('')
state = joi.string().valid('已发布', '草稿').required()
pagenum = joi.number().integer().min(1).required()
pagesize = joi.number().integer().min(1).required()

// 发布文章的验证规则对象
exports.add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state
  }
}

// 获取文章列表的验证规则对象
exports.list_schema = {
  query: {
    pagenum,
    pagesize,
    cate_id,
    state
  }
}

// 根据id删除文章数据的验证规则对象
exports.id_schema = {
  params: {
    id
  }
}

// 修改更新文章的验证规则对象
exports.edit_article_schema = {
  body: {
    id,
    title,
    cate_id,
    content,
    state
  }
}