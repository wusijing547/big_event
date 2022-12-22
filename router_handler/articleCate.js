const db = require('../db/index')
const router = require('../router/articleCate')

// 获取文章分类列表处理函数
exports.cates = (req, res) => {
  //获取未被删除的数据
  const sql = 'select * from ev_article_cate where is_delete = 0 order by id asc'
  db.query(sql, (err, results) => {
    if (err) {
      return res.cc(err)
    }

    res.send({
      status: 0,
      message: '获取文章分类列表成功！',
      data: results
    })
  })
}

// 新增文章分类处理函数
exports.addcates = (req, res) => {
    //1.验证表单数据
    //2.判断是否有重名
      // 2.1判断名称是否重复
   const sql = 'select * from ev_article_cate where name = ? '
   db.query(sql, [req.body.name], (err, results) => {
    if (err) {
      return res.cc(err)
     }
     if (results.length > 0) {
      return res.cc('名称已被占用')
     }
      //2.2判断别名是否重复
     const sql2 = 'select * from ev_article_cate where alias = ?'
     db.query(sql2, [req.body.alias], (err, results) => {
      if (err) {
        return res.cc(err)
       }
       if (results.length > 0) {
        return res.cc('别名已被占用')
       }
        //3.向数据库插入数据
       const sql3 = 'insert into ev_article_cate set ?'
       db.query(sql3, req.body, (err, results) => {
          if (err) {
            return res.cc(err)
           }
           if (results.affectedRows !== 1) {
            return res.cc('新增分类失败！')
           }
           res.cc('新增文章分类成功！', 0)
         })
     })
   })
}

// 根据id删除文章分类处理函数
exports.deletecate = (req, res) => {
  // 验证url参数
  console.log(req.params)
  const sql = 'update ev_article_cate set is_delete = 1 where id = ?'
  db.query(sql, req.params.id, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.affectedRows !== 1) {
      res.cc('删除文章分类失败！')
    }
    res.cc('删除文章分类成功！', 0)
  })
}

// 根据id获取文章分类数据处理函数
exports.getCatesById = (req, res) => {
  // 验证url参数
  const sql = 'select * from ev_article_cate where id = ? && is_delete = 0'
  db.query(sql, req.params.id, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length <= 0) {
      return res.cc('获取文章分类数据失败！')
    }
    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: results
    })
  })
}

// 根据id更新分章分类数据处理函数
exports.updatecate = (req, res) => {
  // 验证表单数据
  // 判断名称是否重复
  const sql = 'select * from ev_article_cate where id <> ? and (name = ? || alias = ?)'
  db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length === 2) {
      res.cc('分类名称和别名均被占用！')
    }
     if (results.length ===1 && results[0].name === req.body.name) {
      return res.cc('分类名称被占用！')
    }
    if (results.length ===1 && results[0].alias === req.body.alias) {
      return res.cc('分类别名被占用！')
    }
    //更新分类名称
    const sql2 = 'update ev_article_cate set ? where id = ?'
    db.query(sql2, [req.body, req.body.id], (err, results) => {
      if (err){
        return res.cc(err)
      }
      if (results.affectedRows !== 1) {
        return res.cc('更新分类信息失败！')
      }
      res.cc('更新分类信息成功', 0)

    })
  })
}