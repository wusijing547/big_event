const express = require('express')
const userRouter = require('./router/user')
const userinfoRouter = require('./router/userinfo')
const articleCateRouter = require('./router/articleCate')
const cors = require('cors')
const app = express()
const joi = require('joi')
const{ expressjwt: expressJwt} = require('express-jwt')
const config = require('./config')

//配置cors跨域
app.use(cors())

//配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({extended: false}))

//优化res.send()
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 解析token后，将用户信息挂载到req.auth（新版7.7.7）
app.use(
  expressJwt({
    secret: config.jwtSecretKey,
    algorithms: ["HS256"],
  }).unless({ path: [/^\/api\//] })
);
//注册路由
app.use('/api', userRouter)
app.use('/my', userinfoRouter)
app.use('/my/article', articleCateRouter)
// 错误处理中间件
app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) {
    return res.cc(err)
  }
  //jwt身份认证错误
  if (err.name === 'UnauthorizedError') {
    return res.cc('身份认证失败!')
  }
  // 未知错误
  res.cc(err)
})

app.listen(3007, () => {
  console.log('server running at http://127.0.0.1:3007')
})