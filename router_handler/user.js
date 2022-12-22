const db = require('../db/index')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config')

// 用户注册路由处理函数
exports.regUser = (req, res) => {
  const userInfo = req.body

  // 根据用户名查询用户
  // sql语句
  const sql = 'select * from ev_users where username = ?'
  db.query(sql, userInfo.username, (err, results) => {
    if (err) {
      return res.cc('sql语句执行失败')
    }
    if (results.length > 0) {
      return res.cc('用户名已被占用!')
    }
     
    //  加密密码
    // 对密码进行加密，返回的是加密后的字符串
   userInfo.password = bcryptjs.hashSync(userInfo.password, 10)

   //插入新用户
   const sqlInsert = 'insert into ev_users set ?'
   db.query(sqlInsert, userInfo, (err, results) => {
    //  sql语句执行失败
     if (err) {
      return res.cc(err)
     }
     if (results.affectedRows !== 1) {
      return res.cc('用户注册失败！')
     }
     res.cc('用户注册成功！', 0)
   })

  })
  

}

//用户登录路由处理函数
exports.login = (req, res) => {
  const userInfo = req.body
  //判断密码是否正确
  const sql = 'select * from ev_users where username = ?'
  db.query(sql, userInfo.username, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length !== 1) {
       return res.cc('用户名不存在')
    }
    // 比较密码，返回布尔值
    const compareResult = bcryptjs.compareSync(userInfo.password, results[0].password)
    if (!compareResult) {
      return res.cc('密码错误！')
    }
    
    //用户名密码正确，生成token
    // 剔除头像密码
    const user = {...results[0], password: '', user_pic: ''}
    // 根据用户信息生成token字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn})
    res.send({
      status: 0,
      message: '登录成功！',
      token: 'Bearer ' + tokenStr
    })
  })

}
