var totalMsgsPerTimeOptions = {
	target: '#totalMsgsPerTimeChart',
	width: 700,
	height: 400,
	xAxis: {
		transformer: function(d) {var parse = d3.timeParse("%H:%M"); return parse(d.date);},
		text: 'Time',
		scale: d3.scaleTime(),
		tickFormat: function(x) {return (x.getHours()<10?'0':'')+x.getHours()+':'+(x.getMinutes()<10?'0':'')+x.getMinutes();}
	},
	yAxis: {
		transformer: function(d) {return d.count},
		text: 'Number of messages',
		scale: d3.scaleLinear(),
		tickFormat: function(x) {return (x == Math.floor(x)) ? x : "";}
	},
	graph: {
		style: {
			color: chartCreator.colors[0]
		},
		interpolation: d3.curveStepBefore
	}
};

var totalMsgsOverTimeOptions = {
	target: '#totalMsgsOverTimeChart',
	width: 700,
	height: 400,
	xAxis: {
		transformer: function(d) {var parse = d3.timeParse("%Y-%m-%d %H:%M"); return parse(d.date);},
		text: 'Time',
		scale: d3.scaleTime(),
		tickFormat: function(x) {return x.getFullYear()+'-'+((x.getMonth()+1)<10?'0':'')+(x.getMonth()+1)+'-'+(x.getDay()<10?'0':'')+x.getDay();}
	},
	yAxis: {
		transformer: function(d) {return d.count},
		text: 'Total number of messages',
		scale: d3.scaleLinear(),
		tickFormat: function(x) {return (x == Math.floor(x)) ? x : "";}
	},
	graph: {
		style: {
			color: chartCreator.colors[0]
		},
		interpolation: d3.curveStepBefore
	}
};

var totalMsgsPerMonthOptions = {
	target: '#totalMsgsPerMonthChart',
	width: 700,
	height: 400,
	xAxis: {
		transformer: function(d) {return d.date},
		scale: d3.scaleOrdinal(),
		tickFormat: function(x) {return x;}
	},
	yAxis: {
		transformer: function(d) {return d.count},
		text: '',
		scale: d3.scaleLinear(),
		tickFormat: function(x) {return x;}
	},
	graph: {
		style: {
			color: chartCreator.colors[3],
			strokewidth: '1.5px'
		}
	},
};

var pieChartOptions = {
	width: 500,
	height: 300,
	radius: 150,
	legend: true,
	legendOptions: {
		margins: {left: 10, right: 10, top: 0, bottom: 10},
		keyHeight: 25,
		padding: 5
	},
	valueField: "count",
	textField: "name",
	target: "#msgsPerUserChart"
};

				