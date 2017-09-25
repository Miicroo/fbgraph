class GeneralStatistics extends Statistics {
	constructor(msgsPerUser, numberOfMsgs, msgsOverTime, msgsPerMonth, msgsPerWeekday, msgsPerTime, mostCommonWords, wordCloud) {
		super(numberOfMsgs, msgsOverTime, msgsPerMonth, msgsPerWeekday, msgsPerTime, mostCommonWords, wordCloud);
		this.msgsPerUser = msgsPerUser;
	}

	getMsgsPerUser() {
		return this.msgsPerUser;
	}
}