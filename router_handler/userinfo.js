const db = require('../db/index')
const bcrypt = require('bcryptjs')
//获取用户信息的路由处理函数
exports.getUserinfo =  (req,res) => {
  //sql语句获取用户信息
   const sql = 'select id, username, nickname, email, user_pic from ev_users where id = ?'
   db.query(sql, req.auth.id, (err, results) => {
     //sql语句执行失败
     if (err) {
       return res.cc(err)
     }
     //sql执行成功，但查询失败
     if (results.length <= 0) {
       return res.cc('获取用户信息失败!')
     }
     //成功
     res.send({
       status: 0,
       message: '获取用户基本信息成功',
       data: results[0]
     })
   })
}

//修改用户信息处理函数
exports.updateUserinfo = (req, res) => {
 //验证表单数据
 //更新表单数据
 const sql = 'update ev_users set ? where id = ?'
 db.query(sql, [req.body, req.body.id], (err, results) => {
   //sql语句失败
   if (err) {
     return res.cc(err)
   }
   //sql成功，但更新失败
   if (results.affectedRows !== 1) {
     return res.cc('更新用户信息失败！')
   }
   res.cc('修改用户信息成功', 0)
 })
}

//重置密码处理函数
exports.updatepwd = (req, res) => {
  //验证表单数据
  //根据id查询用户是否存在
  const sql = 'select * from ev_users where id = ?'
  db.query(sql, req.auth.id, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length !== 1) {
      return res.cc('用户不存在')
    }
    //判断旧密码是否一致
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) {
      //提交的旧密码与原密码不相同
       return res.cc('原密码错误！')
    }
    //修改密码
    // 加密密码
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    //把加密后的密码更新到数据库
    const sql2 = 'update ev_users set password = ? where id = ?'
    db.query(sql2, [newPwd, req.auth.id], (err, results) => {
      if (err) {
        return res.cc(err)
      }
      if (results.affectedRows !== 1) {
        return res.cc('更改密码失败！')
      }
      res.cc('更新密码成功！', 0)
    })
  })
}

//更换头像处理函数
exports.updataAvatar = (req, res) => {
  //验证表单数据，头像图片base64格式存储
  //更新头像
  const sql = 'update ev_users set user_pic = ? where id = ?'
  db.query(sql, [req.body.avatar, req.auth.id], (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.affectedRows !== 1) {
      return res.cc('修改头像失败')
    }
    res.cc('更新头像成功！', 0)
  })
}