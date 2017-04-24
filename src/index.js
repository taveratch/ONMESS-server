import express from 'express';
import SocketController from './socket/socketController.js';
import ChannelController from './socket/channelController.js';

let app = express();
let http = require('http').Server(app);
const PORT = 3000;

let socketController = new SocketController(http, app);
let channelController = new ChannelController(http);

socketController.startSocket();

app.post('/channel', (req, res) => {
	let channel = channelController.create();
	res.send(channel);
});

http.listen(PORT, () => {
	console.log('listening on port : ' + PORT);
});
