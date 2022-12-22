const express = require('express')
const router = express.Router()
const userHandler = require('../router_handler/user')
const {reg_login_schema} = require('../schema/user')
const expressJoi = require('@escook/express-joi')
//用户注册路由映射
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)

//用户登录路由映射
router.post('/login', expressJoi(reg_login_schema), userHandler.login)



module.exports = router