import rs from 'randomstring';
import io from 'socket.io';
import Channel from '../model/channel.js';
import SocketController from './socketController.js';

class ChannelController {
	constructor(http) {
		this.channels = {};
		this.io = io();
		this.socketController = new SocketController(http);
	}

	create() {
    //Check if channel name is already exist
		let channelName = rs.generate(8);
		while(this.isExist(channelName)){
			channelName = rs.generate(8);
		}

		let channel = new Channel(channelName);
		this.channels[channelName] = channel;

		this.socketController.create(channel);

		return channel;
	}

	destroy(name) {
		if(this.isExist(name)){
			// this.socketController.destroy(name);
			this.channels[name] = null;
		}
	}

	isExist(name) {
		return typeof this.channels[name] !== 'undefined';
	}
}

export default ChannelController;
