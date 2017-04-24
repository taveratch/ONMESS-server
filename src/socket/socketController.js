import socketIO from 'socket.io';

let instance = null;

/**
* Singleton class
**/
class SocketController {

	constructor(http, app) {
		if(!instance) {
			instance = this;
			this.io = socketIO(http);
			this.app = app;
		}
		return instance;
	}

	startSocket() {
		this.io.on('connection', (socket) => {
			console.log('a user connected');
		});
	}

	create(channel) {
		let socketChannel = this.io.of(`/${channel.name}`);
		console.log('Created channel, waiting for connections');
		socketChannel.on('connection', (socket) => {
			console.log(`someone connected to ${channel.name}`);
			this.listening(socket, this.broadcast(socketChannel));
			socketChannel.clients((err, clients) => {
				console.log(clients);
			});
		});
	}

	listening(socket, broadcastFunction) {
		socket.on('message', (msg) => {
			broadcastFunction(msg);
		});
	}

	broadcast(socketChannel) {
		return (msg) => {
			socketChannel.emit('message', msg);
		};
	}
}

export default SocketController;
