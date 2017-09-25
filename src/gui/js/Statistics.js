class Statistics {
	constructor(numberOfMsgs, msgsOverTime, msgsPerMonth, msgsPerWeekday, msgsPerTime, mostCommonWords, wordCloud) {
		this.numberOfMsgs = numberOfMsgs;
		this.msgsOverTime = msgsOverTime;
		this.msgsPerMonth = msgsPerMonth;
		this.msgsPerWeekday = msgsPerWeekday;
		this.msgsPerTime = msgsPerTime;
		this.mostCommonWords = mostCommonWords;
		this.wordCloud = wordCloud;
	}

	getNumberOfMsgs() {
		return this.numberOfMsgs;
	}

	getMsgsOverTime() {
		return this.msgsOverTime;
	}

	getMsgsPerMonth() {
		return this.msgsPerMonth;
	}

	getMsgsPerWeekday() {
		return this.msgsPerWeekday;
	}

	getMsgsPerTime() {
		return this.msgsPerTime;
	}

	getMostCommonWords() {
		return this.mostCommonWords;
	}

	getWordCloud() {
		return this.wordCloud;
	}
}