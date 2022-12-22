const joi = require('joi')

const name = joi.string().min(1).max(12).required()
const alias = joi.string().alphanum().min(1).max(12).required()
const id = joi.number().integer().min(1).required()

//验证添加文字分类的规则对象
exports.addCates_schema = {
  body: {
    name,
    alias
  }
}

// 验证根据id删除文章分类的规则对象
exports.deleteCate_schema = {
  params: {
    id
  }
}

// 根据id跟新分章分类数据验证规则对象
exports.updatecate_schema = {
  body: {
    id,
    name,
    alias
  }
}