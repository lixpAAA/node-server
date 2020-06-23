const express = require('express')

const server = express()
// const bodyParser = require('body-parser')

// app.use(bodyParser.urlencoded({
//   extended: true
// }))
// app.use(bodyParser.json())

server.post('/post', (req, resq) => {
  // console.log('req:', req)
  console.log('resq:', resq.setHeader('Etag', 123456))
  resq.send(null)
}
)

server.listen(3000)