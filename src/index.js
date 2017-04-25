import express from 'express';
import cors from 'cors';
import SocketController from './socket/socketController.js';
import ChannelController from './socket/channelController.js';

let app = express();
let http = require('http').Server(app);
const PORT = 7000;

let socketController = new SocketController(http, app);
let channelController = new ChannelController(http);

app.use(cors());
socketController.startSocket();

app.post('/channel', (req, res) => {
	let channel = channelController.create();
	res.send(channel);
});

/*
  Check whether channel is exist or not.
*/
app.get('/channel/:id', (req, res) => {
	let channelName = req.params.id;
	let isExist = channelController.isExist(channelName);
	res.send(isExist);
});

http.listen(PORT, () => {
	console.log('listening on port : ' + PORT);
});
