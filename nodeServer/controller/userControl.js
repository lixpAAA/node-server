const app = require('../expresConfig')
const conn = require('../databaseConfig.js/index')
require('./userControlcopy') //  引入其他control
const utils = require('../ustils/index')
const jwt = require('jsonwebtoken')


const SECRET = 'lixp_secret'


// 每次请求鉴权
const auth = (authorization, conn) => {
  return new Promise((resolve, reject) => {
    let flag = false
    jwt.verify(authorization, SECRET, (err, data) => {
      if (data) {
        console.log(data)
        let { id } = data
        let sql = `select * from user where id=${id}`
        conn.query(sql).then(data => {
          flag = data.length > 0 ? true : false
          resolve(flag)
        })
      } else {
        resolve(flag)
      }

    })
  })

}

app.get('/users', (req, resp) => {
  // console.log("req:", req.headers.authorization)
  // console.log('name:', name)
  auth(req.headers.authorization.split(' ').pop(), conn).then(flag => {
    if (flag) {
      let sql = `select * from user`
      conn.query(sql).then(data => {
        resp.send(utils.stringfyResp(200, data))
      })
    } else {
      resp.send(utils.stringfyResp(200, { message: '你的请求未经授权' }))
    }
  })

})
app.post('/user/login', (req, resp) => {
  let { name, password } = req.body
  // console.log('name:', name)
  let sql = `select * from user where name= '${name}'  and password='${password}'`
  conn.query(sql).then(data => {
    // console.log(resp)
    let { id } = data[0]
    let token = jwt.sign({ id: id, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, SECRET)
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzMxMjA4MjYsImlhdCI6MTU3MzExNzIyNn0.NjjCeKjMUNdb3thr94WU0DWceYGAHvin2-925aBil-0
    resp.send(utils.stringfyResp(200, { message: '登陆成功', token }))
  }).catch(err => {
    console.log(err)
  });

})

app.post('/user/register', (req, resp) => {
  let { name, password } = req.body
  // console.log('name:', name)
  let sql = `select name from user where name= '${name}'`
  conn.query(sql).then(data => {
    // console.log(data.length)
    if (data.length > 0) {
      data = { message: '此用户名已被注册' }
      resp.send(utils.stringfyResp(200, data))
      return Promise.reject('此用户名已被注册')
    } else {
      return Promise.resolve(true)
    }
  }).then(rs => {
    let sql = `insert into user(name,password) values('${name}','${password}')`
    conn.query(sql).then(data => {
      resp.send(utils.stringfyResp(200, { message: '用户注册成功' }))
    })
  }).catch(err => {
    console.log(err)
  });

})
module.exports = app