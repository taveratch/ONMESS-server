import express from 'express';
import SocketController from './socket/controller.js';

let app = express();
let http = require('http').Server(app);
const PORT = 3000;
let socketController = new SocketController(http, app)


socketController.startSocket();

http.listen(PORT, () => {
  console.log('listening on port : ' + PORT);
})
