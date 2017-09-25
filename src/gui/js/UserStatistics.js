class UserStatistics extends Statistics {
	constructor(user, numberOfMsgs, msgsOverTime, msgsPerMonth, msgsPerWeekday, msgsPerTime, mostCommonWords, wordCloud) {
		super(numberOfMsgs, msgsOverTime, msgsPerMonth, msgsPerWeekday, msgsPerTime, mostCommonWords, wordCloud);
		this.user = user;
	}

	getUser() {
		return this.user;
	}
}