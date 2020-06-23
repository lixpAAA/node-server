// app.js
const http = require('http');
const Koa = require('koa');
const WebSocket = require('ws');
const app = new Koa();
const WebSocketApi = require('./utils/ws');//引入封装的ws模块
const server = http.createServer(app.callback())
const wss = new WebSocket.Server({// 同一个端口监听不同的服务
    server
});
WebSocketApi(wss)
server.listen(3000, function () {
    console.log("socket server is running at 3000")
})