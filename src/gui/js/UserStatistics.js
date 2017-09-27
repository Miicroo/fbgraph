class UserStatistics extends Statistics {
	constructor() {
		super();
	}

	setUser(user) {
		this.user = user;
		return this;
	}

	getUser() {
		return this.user;
	}
}