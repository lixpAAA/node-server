const app = require('../expresConfig')
const conn = require('../databaseConfig.js/index')

app.post('/user1', (req, resp) => {
  let { name, password } = req.body
  console.log('name:', name)

  let sql = `select name from user where name= '${name}'`
  conn.query(sql).then(data => {
    resp.send(JSON.stringify({ code: 201, data: data }))
  }).catch(err => {
    console.log(err)
  });

})
module.exports = app