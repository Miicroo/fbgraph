class Statistics {
	constructor() {
	}

	setNumberOfMessages(numberOfMessages) {
		this.numberOfMsgs = numberOfMsgs;
		return this;
	}

	setMsgsOverTime(msgsOverTime) {
		this.msgsOverTime = msgsOverTime;
		return this;
	}

	setMsgsPerMonth(msgsPerMonth) {
		this.msgsPerMonth = msgsPerMonth;
		return this;
	}

	setMsgsPerWeekday(msgsPerWeekday) {
		this.msgsPerWeekday = msgsPerWeekday;
		return this;
	}

	setMsgsPerTime(msgsPerTime) {
		this.msgsPerTime = msgsPerTime;
		return this;
	}

	setMostCommonWords(mostCommonWords) {
		this.mostCommonWords = mostCommonWords;
		return this;
	}

	setWordCloud(wordCloud) {
		this.wordCloud = wordCloud;
		return this;
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