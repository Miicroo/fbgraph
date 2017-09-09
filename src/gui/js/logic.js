/* Extremly coupled to index.html (hard-coded id's etc), but it looks cleaner to put all functions in a separate file */

function createChart(chartType, chartCanvasId, chartLabel, xAxisLabels, actualData, bgColor, borderColor, bgHoverColor, hoverBorderColor, options) {
	var ctx = document.getElementById(chartCanvasId).getContext("2d");			
	var data = {
		labels: xAxisLabels,
		datasets: [
			{
				label: chartLabel,

				backgroundColor: bgColor,
				borderColor: borderColor,
				borderWidth: 1,
				hoverBackgroundColor: bgHoverColor,
				hoverBorderColor: hoverBorderColor,
				pointBorderWidth: 0,
				pointHoverRadius: 0,
				data: actualData,
			}
		]
	}
	
	var newChart = new Chart(ctx, {
		type: chartType,
		data: data,
		options: options
	});
}

function createChartFromColors(chartType, chartCanvasId, chartLabel, xAxisLabels, actualData, cObj, options) {
	createChart(chartType, chartCanvasId, chartLabel, xAxisLabels, actualData, cObj.bgColor, cObj.borderColor, cObj.hoverColor, cObj.hoverBorderColor, options); 
}

function getTimeScale(format, toolTipFormat) {
	return {
		scales: {
			xAxes: [{
					position: "bottom",
					type: "time",
					display: true,
					time: {
						parser: format,
						//round: 'day',
						tooltipFormat: toolTipFormat,
					},
					scaleLabel: {
						display: true,
						labelString: ''
					},
			}]
		},
		elements: {
			point: {
				radius: 0
			},
		},
	};
}

// Minimum num of colors = 5
function getAllColors(bgA=0.8) {
	colors = [];
	colors.push({"bgColor": "rgba(211,63,106,"+bgA+")", "borderColor": "rgba(224,123,125,1)", "hoverColor": "rgba(224,123,125,1)", "hoverBorderColor": "rgba(230,175,185,1)"});
	colors.push({"bgColor": "rgba(74,111,227,"+bgA+")", "borderColor": "rgba(133,149,225,1)", "hoverColor":"rgba(133,149,225,1)", "hoverBorderColor": "rgba(181,187,227,1)"});
	colors.push({"bgColor": "rgba(17,198,56,"+bgA+")", "borderColor": "rgba(141,213,147,1)", "hoverColor": "rgba(141,213,147,1)", "hoverBorderColor": "rgba(198,222,199,1)"});
	colors.push({"bgColor": "rgba(239,151,8,"+bgA+")", "borderColor": "rgba(240,185,141,1)", "hoverColor": "rgba(240,185,141,1)", "hoverBorderColor": "rgba(234,211,198,1)"});
	colors.push({"bgColor": "rgba(168,74,227,"+bgA+")", "borderColor": "rgba(185,135,222,1)", "hoverColor": "rgba(185,135,222,1)", "hoverBorderColor": "rgba(210,181,227,1)"});
	return colors;
}


function setChatName() {
	document.title = backend.getChatName() + " - Chat stats"
	document.getElementById("chatName").innerText = backend.getChatName() + " stats";
}

function setParticipants() {
	participants = "";
	backend.getUsers().forEach(user => participants += "<a href=\"#"+user.id+"\">"+user.name+"</a></br>");
	document.getElementById("participants").innerHTML = participants;
}

function setTotalNumberOfMsgs() {
	document.getElementById("totalNumMsgs").innerText = backend.getTotalNumberOfMessages();
}

function setMessagesPerUser() {
	labels = []
	actualData = []
			
	backend.getMessagesPerUser().forEach(data => {
		labels.push(data.name);
		actualData.push(data.count);
	});
	
	colors = getAllColors(1);
	mainColors = [];
	lightColors = [];
	for(i = 0; i<backend.getUsers().length; i++) {
		mainColors.push(colors[i%colors.length].bgColor);
		lightColors.push(colors[i%colors.length].hoverColor);
	}
	createChart('pie', 'msgsPerUserChart', 'Messages per user', labels, actualData, mainColors, [], lightColors, [], null);
}


function setTotalMsgsOverTime() {
	labels = []
	actualData = []
			
	backend.getMessagesOverTime().forEach(msgsOverTime => {
		labels.push(msgsOverTime.date);
		actualData.push(msgsOverTime.count);
	});
	
	options = getTimeScale("YYYY-MM-DDTHH:mm", "YYYY-MM-DD");
	createChartFromColors('line', 'totalMsgsOverTimeChart', 'Messages over time', labels, actualData, getAllColors()[0], options);
}

function setTotalMsgsPerMonth() {
	labels = []
	actualData = []
		
	backend.getMessagesPerMonth().forEach(msgsPerMonth => {
		labels.push(msgsPerMonth.date);
		actualData.push(msgsPerMonth.count);
	});
	
	createChartFromColors('bar', 'totalMsgsPerMonthChart', 'Messages per month', labels, actualData, getAllColors()[1], null);
}

function setTotalMsgsPerWeekday() {
	labels = []
	actualData = []
	
	backend.getMessagesPerWeekday().forEach(msgsPerWeekday => {
		labels.push(msgsPerWeekday.date);
		actualData.push(msgsPerWeekday.count);
	});
	
	createChartFromColors('bar', 'totalMsgsPerWeekDayChart', 'Messages per weekday', labels, actualData, getAllColors()[2], null);
}

function setTotalMsgsPerTime() {
	labels = []
	actualData = []
			
	backend.getMessagesPerTime().sort((a, b) => a.date.localeCompare(b.date)).forEach(msgsPerTime => {
		labels.push(msgsPerTime.date);
		actualData.push(msgsPerTime.count);
	});
	
	createChartFromColors('line', 'totalMsgsPerTimeChart', 'Messages per minute', labels, actualData, getAllColors()[3], getTimeScale("HH:mm", "HH:mm"));
}

function setTotalMostCommonWords() {
	var list = "";
	backend.getMostCommonWords().forEach(wordCount => {
		list += "<li>"+wordCount.word+" <i>"+wordCount.count+"</i></li>";
	});

	document.getElementById("mostCommonWords").innerHTML = list;
}

function setTotalWordCloud() {
	labels = []
	actualData = []
	
	backend.getWordCloud().forEach(wc => {
		labels.push(wc.word);
		actualData.push(wc.count);
	});

	createChartFromColors('radar', 'wordCloud', 'Wordcloud', labels, actualData, getAllColors()[4], null);
}

function setNumberOfMsgs(participant) {
	document.getElementById("user"+participant.id+"_totalNumMsgs").innerText = backend.getTotalNumberOfMessagesForUser(participant.id);
}

function setMsgsOverTime(participant) {
	labels = []
	actualData = []
	
	backend.getMessagesOverTimeForUser(participant.id).forEach(data => {
		labels.push(data.date);
		actualData.push(data.count);
	});
	
	options = getTimeScale("YYYY-MM-DDTHH:mm", "YYYY-MM-dd");
	createChartFromColors('line', 'user'+participant.id+'_totalMsgsOverTimeChart', 'Messages over time', labels, actualData, getAllColors()[0], options);
}

function setMsgsPerMonth(participant) {
	labels = []
	actualData = []
	
	backend.getMessagesPerMonthForUser(participant.id).forEach(data => {
		labels.push(data.date);
		actualData.push(data.count);
	});
	
	createChartFromColors('bar', 'user'+participant.id+'_totalMsgsPerMonthChart', 'Messages per month', labels, actualData, getAllColors()[1], null);
}

function setMsgsPerWeekday(participant) {
	labels = []
	actualData = []
	
	backend.getMessagesPerWeekdayForUser(participant.id).forEach(data => {
		labels.push(data.date);
		actualData.push(data.count);
	});	
	
	createChartFromColors('bar', 'user'+participant.id+'_totalMsgsPerWeekDayChart', 'Messages per weekday', labels, actualData, getAllColors()[2], null);
}

function setMsgsPerTime(participant) {
	labels = []
	actualData = []
	
	backend.getMessagesPerTimeForUser(participant.id).sort((a, b) => a.date.localeCompare(b.date)).forEach(data => {
		labels.push(data.date);
		actualData.push(data.count);
	});
	
	createChartFromColors('line', 'user'+participant.id+'_totalMsgsPerTimeChart', 'Messages per minute', labels, actualData, getAllColors()[3], getTimeScale('HH:mm', 'HH:mm'));
}

function setMostCommonWords(participant) {
	var list = "";

	backend.getMostCommonWordsForUser(participant.id).forEach(data => {
		list += "<li>"+data.word+" <i>"+data.count+"</i></li>";
	});
	
	document.getElementById('user'+participant.id+'_mostCommonWords').innerHTML = list;
}

function setWordCloud(participant) {
	labels = []
	actualData = []
	
	backend.getWordCloudForUser(participant.id).forEach(data => {
		labels.push(data.word);
		actualData.push(data.count);
	});
		
	createChartFromColors('radar', 'user'+participant.id+'_wordCloud', 'Wordcloud', labels, actualData, getAllColors()[4], null);
}

function initParticipant(participant) {
	var container = document.getElementById("participantDiv");
	
	var content = "<h2 id=\""+participant.id+"\">"+participant.name+"</h2>";
	content += "<p><strong>Total number of messages: </strong><span id=\"user"+participant.id+"_totalNumMsgs\"></span></p>";
	content += "<h3>Messages over time:</h3><canvas id=\"user"+participant.id+"_totalMsgsOverTimeChart\" width=\"400\" height=\"400\"></canvas>";			
	content += "<h3>Messages per month:</h3><canvas id=\"user"+participant.id+"_totalMsgsPerMonthChart\" width=\"400\" height=\"400\"></canvas>";
	content += "<h3>Messages per weekday:</h3><canvas id=\"user"+participant.id+"_totalMsgsPerWeekDayChart\" width=\"400\" height=\"400\"></canvas>";
	content += "<h3>Messages throughout the day:</h3><canvas id=\"user"+participant.id+"_totalMsgsPerTimeChart\" width=\"400\" height=\"400\"></canvas>";
	content += "<h3>Most common words:</h3><ul id=\"user"+participant.id+"_mostCommonWords\"></ul>";
	content += "<canvas id=\"user"+participant.id+"_wordCloud\" width=\"400\" height=\"400\"></canvas>";
	
	container.innerHTML += content;
}