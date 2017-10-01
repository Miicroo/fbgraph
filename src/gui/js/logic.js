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

function setTotalNumberOfMsgs() {
	document.getElementById("totalNumMsgs").innerText = backend.getGeneralStatistics().getNumberOfMessages();
}

function setMessagesPerUser() {
	colors = getAllColors(1);
	mainColors = [];
	lightColors = [];
	for(i = 0; i<backend.getUsers().length; i++) {
		mainColors.push(colors[i%colors.length].bgColor);
		lightColors.push(colors[i%colors.length].hoverColor);
	}
	options = {
		'legend' : {'display' : true},
		'title': {'display' : true, 'text': 'Messages per user'}
    };
	const stats = backend.getGeneralStatistics().getMsgsPerUser();
	createChart('horizontalBar', 'msgsPerUserChart', undefined, stats.getLabels(), stats.getData(), mainColors, [], lightColors, [], options);
}

function setTotalMsgsOverTime() {
	const stats = backend.getGeneralStatistics().getMsgsOverTime();
	options = getTimeScale("YYYY-MM-DDTHH:mm", "MMMM Do YYYY");
	createChartFromColors('line', 'totalMsgsOverTimeChart', 'Messages over time', stats.getLabels(), stats.getData(), getAllColors()[0], options);
}

function setTotalMsgsPerMonth() {
	const stats = backend.getGeneralStatistics().getMsgsPerMonth();
	createChartFromColors('bar', 'totalMsgsPerMonthChart', 'Messages per month', stats.getLabels(), stats.getData(), getAllColors()[1], null);
}

function setTotalMsgsPerWeekday() {
	const stats = backend.getGeneralStatistics().getMsgsPerWeekday();
	createChartFromColors('bar', 'totalMsgsPerWeekDayChart', 'Messages per weekday', stats.getLabels(), stats.getData(), getAllColors()[2], null);
}

function setTotalMsgsPerTime() {
	const stats = backend.getGeneralStatistics().getMsgsPerTime();
	createChartFromColors('line', 'totalMsgsPerTimeChart', 'Messages per minute', stats.getLabels(), stats.getData(), getAllColors()[3], getTimeScale("HH:mm", "HH:mm"));
}

function setTotalMostCommonWords() {
	const stats = backend.getGeneralStatistics().getMostCommonWords();
	const numStats = stats.getLabels().length;
	let list = '';
	for(let i = 0; i<numStats; i++) {
		list += `<li>${stats.getLabels()[i]} <i> ${stats.getData()[i]}</i></li>`;
	}

	document.getElementById("mostCommonWords").innerHTML = list;
}

function setTotalWordCloud() {
	const stats = backend.getGeneralStatistics().getWordCloud();
	createChartFromColors('radar', 'wordCloud', 'Wordcloud', stats.getLabels(), stats.getData(), getAllColors()[4], null);
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
	
	options = getTimeScale("YYYY-MM-DDTHH:mm", "MMMM Do YYYY");
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
	var container = document.getElementById(participant.id);
	
	content = "<h3>Total number of messages: </h3><span id=\"user"+participant.id+"_totalNumMsgs\"></span>";
	content += "<h3>Messages over time:</h3><canvas id=\"user"+participant.id+"_totalMsgsOverTimeChart\" width=\"760\" height=\"760\"></canvas>";			
	content += "<h3>Messages per month:</h3><canvas id=\"user"+participant.id+"_totalMsgsPerMonthChart\" width=\"760\" height=\"760\"></canvas>";
	content += "<h3>Messages per weekday:</h3><canvas id=\"user"+participant.id+"_totalMsgsPerWeekDayChart\" width=\"760\" height=\"760\"></canvas>";
	content += "<h3>Messages throughout the day:</h3><canvas id=\"user"+participant.id+"_totalMsgsPerTimeChart\" width=\"760\" height=\"760\"></canvas>";
	content += "<h3>Most common words:</h3><ul id=\"user"+participant.id+"_mostCommonWords\"></ul>";
	content += "<canvas id=\"user"+participant.id+"_wordCloud\" width=\"760\" height=\"760\"></canvas>";
	
	container.innerHTML += content;
}