class Backend {
	constructor(generalStats, userStatsList) {
		this.generalStats = generalStats;
		this.userStats = userStatsList;
	}

	getGeneralStatistics() {
		return this.generalStats;
	}

	getUsers() {
		return this.userStats.map(stats => stats.getUser());
	}

	getUserStatistics() {
		return this.userStats;
	}
}