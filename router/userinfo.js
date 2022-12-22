const express = require('express')
const router = express.Router()
const userinfoHandler = require('../router_handler/userinfo')
const expressJoi = require('@escook/express-joi')
const {userinfo_schema, updatepwd_schema, avatar_schema} = require('../schema/user')

//获取用户基本信息
router.get('/userinfo', userinfoHandler.getUserinfo)
//修改用户基本信息
router.post('/userinfo', expressJoi(userinfo_schema), userinfoHandler.updateUserinfo)
//重置密码
router.post('/updatepwd', expressJoi(updatepwd_schema), userinfoHandler.updatepwd)
//更换头像
router.post('/update/avatar', expressJoi(avatar_schema), userinfoHandler.updataAvatar)

module.exports = router
