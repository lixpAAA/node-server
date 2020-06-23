const Koa = require('koa');
const Router = require('koa-router');
const Ejs = require('koa-ejs');
const Convert = require('koa-convert');
const BetterBody = require('koa-better-body');
const Static = require('koa-static')
const path = require('path')

let app = new Koa();
const port = 3000;
app.listen(port);
console.log('server is running at ', port)


Ejs(app, {
    root: path.resolve(__dirname, 'template'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
})


let router = new Router();
// router注册
router.get('/', ctx => {
    ctx.body = '首页'
})

router.use('/admin', require('./router/admin'))
//  使用router
app.use(router.routes())
