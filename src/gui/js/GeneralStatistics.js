class GeneralStatistics extends Statistics {
	constructor() {
	}

	setMsgsPerUser(msgsPerUser) {
		this.msgsPerUser = msgsPerUser;
		return this;
	}

	getMsgsPerUser() {
		return this.msgsPerUser;
	}
}