import socketIO from 'socket.io';

class SocketController {
	constructor(http, app) {
		this.io = socketIO(http);
		this.app = app;
	}

	startSocket() {
		this.io.on('connection', (socket) => {
			console.log('a user connected');
		});
	}
}

export default SocketController;
