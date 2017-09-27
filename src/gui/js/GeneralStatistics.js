class GeneralStatistics extends Statistics {
	constructor() {
		super();
	}

	setMsgsPerUser(msgsPerUser) {
		this.msgsPerUser = msgsPerUser;
		return this;
	}

	getMsgsPerUser() {
		return this.msgsPerUser;
	}
}