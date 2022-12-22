const joi = require('joi')

// 用户名的验证规则
const username = joi.string().alphanum().min(2).max(12).required()
// 密码的验证规则对象
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
//id的验证规则对象
const id = joi.number().integer().min(1).required()
//昵称的验证规则对象
const nickname = joi.string().min(1).required()
//邮箱的验证规则对象
const email = joi.string().email().required()
//旧密码验证规则对象
const oldPwd = password
//新密码验证规则对象
const newPwd = joi.not(joi.ref('oldPwd')).concat(password)
//头像验证规则对象
// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()

// 登录和注册的验证规则对象
exports.reg_login_schema = {
  // 表示需要对body中的数据进行验证
  body: {
    username,
    password
  }
}

//修改用户信息的验证规则对象
exports.userinfo_schema = {
  body: {
    id,
    nickname,
    email
  }
}

// 重置密码验证规则
exports.updatepwd_schema = {
  body: {
    oldPwd,
    newPwd
  }
}

//更换头像验证规则对象
exports.avatar_schema = {
  body: {
    avatar
  }
}