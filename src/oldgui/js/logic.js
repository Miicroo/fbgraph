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
	document.title = chatStats.chatName + " - Chat stats"
	document.getElementById("chatName").innerText = chatStats.chatName + " stats";
}

function setParticipants() {
	participants = "";
	for(i = 0; i<chatStats.participants.length; i++) {
		participants += "<a href=\"#"+chatStats.participants[i].id+"\">"+chatStats.participants[i].name+"</a></br>";
	}
	document.getElementById("participants").innerHTML = participants;
}

function setTotalNumberOfMsgs() {
	document.getElementById("totalNumMsgs").innerText = chatStats.totalNumMsgs;
}

function setMessagesPerUser() {
	labels = []
	actualData = []
			
	for(i = 0; i<chatStats.msgsPerUser.length; i++) {
		labels.push(chatStats.msgsPerUser[i].user);
		actualData.push(chatStats.msgsPerUser[i].count);
	}
	
	colors = getAllColors(1);
	mainColors = []
	lightColors = []
	for(i = 0; i<chatStats.participants.length; i++) {
		mainColors.push(colors[i].bgColor);
		lightColors.push(colors[i].hoverColor);
	}
	createChart('pie', 'msgsPerUserChart', 'Messages per user', labels, actualData, mainColors, [], lightColors, [], null);
}


function setTotalMsgsOverTime() {
	labels = []
	actualData = []
			
	for(i = 0; i<chatStats.msgsOverTime.length; i++) {
		labels.push(chatStats.msgsOverTime[i].date);
		actualData.push(chatStats.msgsOverTime[i].count);
	}
	
	options = getTimeScale("YYYY-MM-DDTHH:mm", "YYYY-MM-DD");
	createChartFromColors('line', 'totalMsgsOverTimeChart', 'Messages over time', labels, actualData, getAllColors()[0], options);
}

function setTotalMsgsPerMonth() {
	labels = []
	actualData = []
			
	for(i = 0; i<chatStats.msgsPerMonth.length; i++) {
		labels.push(chatStats.msgsPerMonth[i].date);
		actualData.push(chatStats.msgsPerMonth[i].count);
	}
	
	createChartFromColors('bar', 'totalMsgsPerMonthChart', 'Messages per month', labels, actualData, getAllColors()[1], null);
}

function setTotalMsgsPerWeekday() {
	labels = []
	actualData = []
			
	for(i = 0; i<chatStats.msgsPerWeekday.length; i++) {
		labels.push(chatStats.msgsPerWeekday[i].date);
		actualData.push(chatStats.msgsPerWeekday[i].count);
	}
	
	createChartFromColors('bar', 'totalMsgsPerWeekDayChart', 'Messages per weekday', labels, actualData, getAllColors()[2], null);
}

function setTotalMsgsPerTime() {
	labels = []
	actualData = []
			
	for(i = 0; i<chatStats.msgsPerTime.length; i++) {
		labels.push(chatStats.msgsPerTime[i].date);
		actualData.push(chatStats.msgsPerTime[i].count);
	}
	
	createChartFromColors('line', 'totalMsgsPerTimeChart', 'Messages per minute', labels, actualData, getAllColors()[3], getTimeScale("HH:mm", "HH:mm"));
}

function setTotalMostCommonWords() {
	var list = "";
	for(i = 0; i<chatStats.mostCommonWords.length; i++) {
		list += "<li>"+chatStats.mostCommonWords[i].word+" <i>"+chatStats.mostCommonWords[i].count+"</i></li>";
	}
	document.getElementById("mostCommonWords").innerHTML = list;
}

function setTotalWordCloud() {
	labels = []
	actualData = []
			
	for(i = 0; i<chatStats.wordCloud.length; i++) {
		labels.push(chatStats.wordCloud[i][0]);
		actualData.push(chatStats.wordCloud[i][1]);
	}
	createChartFromColors('radar', 'wordCloud', 'Wordcloud', labels, actualData, getAllColors()[4], null);
}

function setNumberOfMsgs(participant) {
	document.getElementById("user"+participant.id+"_totalNumMsgs").innerText = chatStats["user"+participant.id+"_totalNumMsgs"];
}

function setMsgsOverTime(participant) {
	labels = []
	actualData = []
	ds = chatStats["user"+participant.id+"_msgsOverTime"];
			
	for(i = 0; i<ds.length; i++) {
		labels.push(ds[i].date);
		actualData.push(ds[i].count);
	}
	
	options = getTimeScale("YYYY-MM-DDTHH:mm", "YYYY-MM-dd");
	createChartFromColors('line', 'user'+participant.id+'_totalMsgsOverTimeChart', 'Messages over time', labels, actualData, getAllColors()[0], options);
}

function setMsgsPerMonth(participant) {
	labels = []
	actualData = []
	ds = chatStats["user"+participant.id+"_msgsPerMonth"];
			
	for(i = 0; i<ds.length; i++) {
		labels.push(ds[i].date);
		actualData.push(ds[i].count);
	}
	
	createChartFromColors('bar', 'user'+participant.id+'_totalMsgsPerMonthChart', 'Messages per month', labels, actualData, getAllColors()[1], null);
}

function setMsgsPerWeekday(participant) {
	labels = []
	actualData = []
	ds = chatStats["user"+participant.id+"_msgsPerWeekday"];
			
	for(i = 0; i<ds.length; i++) {
		labels.push(ds[i].date);
		actualData.push(ds[i].count);
	}
	
	createChartFromColors('bar', 'user'+participant.id+'_totalMsgsPerWeekDayChart', 'Messages per weekday', labels, actualData, getAllColors()[2], null);
}

function setMsgsPerTime(participant) {
	labels = []
	actualData = []
	ds = chatStats["user"+participant.id+"_msgsPerTime"];
			
	for(i = 0; i<ds.length; i++) {
		labels.push(ds[i].date);
		actualData.push(ds[i].count);
	}
	
	createChartFromColors('line', 'user'+participant.id+'_totalMsgsPerTimeChart', 'Messages per minute', labels, actualData, getAllColors()[3], getTimeScale('HH:mm', 'HH:mm'));
}

function setMostCommonWords(participant) {
	var list = "";
	var ds = chatStats['user'+participant.id+'_mostCommonWords'];
	for(i = 0; i<ds.length; i++) {
		list += "<li>"+ds[i].word+" <i>"+ds[i].count+"</i></li>";
	}
	document.getElementById('user'+participant.id+'_mostCommonWords').innerHTML = list;
}

function setWordCloud(participant) {
	labels = [];
	actualData = [];
	var ds = chatStats['user'+participant.id+'_wordCloud'];
			
	for(i = 0; i<ds.length; i++) {
		labels.push(ds[i][0]);
		actualData.push(ds[i][1]);
	}
	
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