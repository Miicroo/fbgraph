class UserStatistics extends Statistics {
	constructor() {
	}

	setUser(user) {
		this.user = user;
		return this;
	}

	getUser() {
		return this.user;
	}
}