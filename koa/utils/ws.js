module.exports = wss => {
  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      console.log('received: %s', message.data);
    });
    ws.send('something');
  });

}