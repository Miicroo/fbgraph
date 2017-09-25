class Backend {
	constructor(generalStats, users, userStats) {
		this.generalStats = generalStats;
		this.users = users;
		this.userStats = userStats;
	}

	getGeneralStatistics() {
		return this.generalStats;
	}

	getUsers() {
		this.users;
	}

	getUserStatistics() {
		return this.userStats;
	}
}