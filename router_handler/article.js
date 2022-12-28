const path = require('path')
const db = require('../db/index')

// 发布文章路由处理函数
exports.addArticle = (req, res) => {
  // 解析form-data表单数据
  // 验证表单数据
  if (!req.file || req.file.fieldname !== 'cover_img') {
    return res.cc('文章封面是必选参数！')
  }
  // 插入数据
  const articleInfo = {
    ...req.body,
    cover_img: path.join('/uploads', req.file.filename),
    pub_date: new Date(),
    author_id: req.auth.id
  }
  const sql = 'insert into ev_articles set ?'
  db.query(sql, articleInfo, (err, results) => {
    if (err) {
      return res.cc('sql执行失败:' + err)
    }
    if (results.affectedRows !== 1) {
      return res.cc('发布文章失败！')
    }
    res.cc('发布文章成功！', 0)
  })
}

// 获取文章列表处理函数
exports.getList = (req, res) => {
  // 验证参数
  
   const sql =  `
   select ev_articles.id, ev_articles.title, ev_articles.pub_date, ev_articles.state, ev_article_cate.name as cate_name 
   from ev_articles join ev_article_cate on ev_articles.cate_id = ev_article_cate.id 
   where ev_articles.is_delete = 0`
  db.query(sql, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length <= 0) {
      return res.cc('获取文章列表失败!')
    }
    res.send({
      status: 0,
      message: '获取文章列表成功！',
      data: results,
      total: results.length
    })
  })
}

// 根据id删除文章数据处理函数
exports.deleteArticleById = (req, res) => {
  // 验证url参数
  const sql = 'update ev_articles set is_delete = 1 where id = ?'
  db.query(sql, req.params.id, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.affectedRows !== 1) {
      return res.cc('删除文章失败！')
    }
    res.cc('删除成功！', 0)
  })
}

// 根据id获取文章详情处理函数
exports.getArticleDetailsById = (req, res) => {
  // 验证url参数
  const sql = 'select * from ev_articles where id = ? && is_delete = 0'
  db.query(sql, req.params.id, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length !== 1) {
      return res.cc('获取文章详情失败！')
    }
    res.send({
      status: 0,
      message: '获取文章成功！',
      data: results[0]
    })
  })
}

// 根据id更新文章信息
exports.editArticle = (req, res) => {
  // 解析表单数据
  // 验证表单数据
  if (!req.file || req.file.fieldname !== 'cover_img') {
    return res.cc('文章封面是必选参数！')
  }
  // 插入数据
  const articleInfo = {
    ...req.body,
    cover_img: path.join('/uploads', req.file.filename),
    pub_date: new Date(),
    author_id: req.auth.id
  }
  const sql = 'update ev_articles set ? where id = ?'
  db.query(sql, [articleInfo, req.body.id], (err, results) => {
    if (err) {
      return res.cc('sql执行失败:' + err)
    }
    if (results.affectedRows !== 1) {
      return res.cc('修改文章失败！')
    }
    res.cc('修改文章成功！', 0)
  })
}
