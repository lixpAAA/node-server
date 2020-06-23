// mysql数据库操作
const mysql = require('mysql')
//  对mysql的操作进行异步封装
const coMysql = require('co-mysql')

let db = mysql.createPool({
  connectionLimit: 10,
  connectTimeout: 5000,
  host: 'localhost',
  user: 'root',
  password: 'Lixp',
  database: 'user'
})

let conn = coMysql(db)


module.exports = conn
