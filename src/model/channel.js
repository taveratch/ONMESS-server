import _ from 'lodash';

class Channel {
	constructor(name) {
		this.name = name;
		this.members = [];
	}

	addMember(member) {
		this.members.push(member);
	}

	removeMember(member) {
		let removedMember = _.remove(this.members, (item) => item === member.getName());
		return removedMember.length !== 0;
	}

	getMembers() {
		return this.members;
	}
}

export default Channel;
