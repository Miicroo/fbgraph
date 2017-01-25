/*
 * Module for creating charts with d3.
 * Supported charts: pie, line, and bar. For options, see default options per method.
 * 
 * Colors stored in colors-array.
 * Legend options are available.
 */
var chartCreator = (function() {

	var self = {};
	
	self.colors = d3.schemeCategory20;
	
	function createLegend(svg, svgOptions) {
		var defaultOptions = {
			margins: {left:10, right: 10, top: 0, bottom:10},
			keyHeight: 25,
			padding:5
		};
		
		var legendOptions = merge(defaultOptions, svgOptions.legendOptions);

		legendOptions.width = (svgOptions.width-svgOptions.radius*2) - (legendOptions.margins.left+legendOptions.margins.right);
		legendOptions.x = (svgOptions.radius*2) + legendOptions.margins.left;
		legendOptions.y = legendOptions.margins.top;
		legendOptions.height = legendOptions.keyHeight*svgOptions.data.text.length + legendOptions.padding*2;

		var legend = svg.append('rect')
			.classed('legend', true)
			.attr('x', legendOptions.x)
			.attr('y', legendOptions.y)
			.attr('width', legendOptions.width)
			.attr('height', legendOptions.height);


		var legendKeys = svg.selectAll('.keys')
			.data(svgOptions.data.text).enter()
			.append('g')
		
		legendKeys.append('rect')
			.attr('x', legendOptions.x +legendOptions.padding)
			.attr('y', function (d, i) {return i*legendOptions.keyHeight + legendOptions.padding;})
			.attr('width', legendOptions.keyHeight*(3/5))
			.attr('height', legendOptions.keyHeight*(3/5))
			.attr('fill', function (d, i) {return self.colors[i];});

		legendKeys.append('text')
			.classed('legendText', true)
			.attr('text-anchor', 'left')
			.attr('x', 335)
			.attr('y', function (d, i) {return i*legendOptions.keyHeight + legendOptions.padding + legendOptions.keyHeight/2 + 2;})
			.attr('width', 120)
			.attr('height', 30)
			.text(function (d) {return d;});
	};
	

	self.createPieChart = function(data, options) {
		var parseData = function(inputArray, textField, valueField) {
			var separatedData = {};
			separatedData.text = inputArray.map(function(d) {
				return d[textField];
			});
			separatedData.values = inputArray.map(function(d) {
				return d[valueField];
			});
			return separatedData;
		}

		var makePieChart = function(data, options) {
			//convert data into a format the pie layout can work with ie arrays of values only;
			options.data = parseData(data, options.textField, options.valueField);

			var outerRadius = options.radius;
			var innerRadius = 0;

			var arc = d3.arc()
				.innerRadius(innerRadius)
				.outerRadius(outerRadius);

			var pie = d3.pie();

			var svg = d3.select(options.target)
				.append('svg')
				.attr('width', options.width)
				.attr('height', options.height);

			var arcs = svg.selectAll('g.arc')
				.data(pie(options.data.values, function(d){return d.value;}))
				.enter()
				.append('g')
				.attr('class', 'arc')
				.attr('transform', 'translate(' + outerRadius +',' + outerRadius+ ')');

			arcs.append('path')
				.attr('fill',function(d,i) { return self.colors[i]})
				.attr('d', arc);

			arcs.append('text')
				.attr('transform',function(d){return 'translate('+arc.centroid(d)+')'})
				.attr('text-anchor', 'middle')
				.text(function(d, i){return d.value;});

			if (options.legend) {
				createLegend(svg, options);
			}
		};
		
		makePieChart(data, options);
	};
	
	self.createLineChart = function(lineData, options) {
		var defaultOptions = {
			target: 'body',
			width: 400,
			height: 400,
			xAxis: {
				domain: function(data) {return d3.extent(data, function(d) { return d.key; });},
				transformer: function(d) {return d},
				text: '',
				scale: d3.scaleLinear(),
				tickFormat: function(x) {return x;}
			},
			yAxis: {
				domain: function(data) {return d3.extent(data, function(d) { return d.value; });},
				transformer: function(d) {return d},
				text: '',
				scale: d3.scaleLinear(),
				tickFormat: function(x) {return x;}
			},
			graph: {
				style: {
					color: 'steelblue',
					strokewidth: '1.5px'
				},
				interpolation: d3.curveLinear
			},
			margin: {
				top: 20,
				right: 20,
				bottom: 30,
				left: 50
			}
		};
		
		options = merge(defaultOptions, options);
		var svg = d3.select(options.target)
					.append('svg')
					.attr('width', options.width)
					.attr('height', options.height);
		var width = +options.width - options.margin.left - options.margin.right;
		var height = +options.height - options.margin.top - options.margin.bottom;
		
		var g = svg.append('g')
				   .attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')');

		var x = options.xAxis.scale.rangeRound([0, width]);
		var y = options.yAxis.scale.rangeRound([height, 0]);

		var line = d3.line()
			.curve(options.graph.interpolation)
			.x(function(d) { return x(d.key); })
			.y(function(d) { return y(d.value); });

		function transform(d) {
			var newObj = {}
			newObj.key = options.xAxis.transformer(d);
			newObj.value = +options.yAxis.transformer(d);
			return newObj;
		};
		
		var data = [];
		for(var i = 0; i<lineData.length; i++) {
			data[i] = transform(lineData[i]);
		}
		
		data = data.sort(function(a, b) { 
			return a.key-b.key;
		});
		
		x.domain(options.xAxis.domain(data));
		y.domain(options.yAxis.domain(data));

		var tip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function(d) {
				return '<strong>Frequency:</strong> <span style="color:red">' + 'hej' + '</span>';
			});
		svg.call(tip);
		
		var xAxis = d3.axisBottom(x);		
		xAxis.tickFormat(options.xAxis.tickFormat);
		
		g.append('g')
			.attr('class', 'axis axis--x')
			.attr('transform', 'translate(0,' + height + ')')
			.call(xAxis)
			.append('text')
			.text(options.xAxis.text);

		var yAxis = d3.axisLeft(y);
		yAxis.tickFormat(options.yAxis.tickFormat);
			
		g.append('g')
			.attr('class', 'axis axis--y')
			.call(yAxis)
			.append('text')
			.attr('fill', '#000')
			.attr('transform', 'rotate(-90)')
			.attr('y', 6)
			.attr('dy', '0.71em')
			.style('text-anchor', 'end')
			.text(options.yAxis.text);

		g.append('path')
			.datum(data)
			.attr('fill', 'none')
			.attr('stroke-width', options.graph.style.strokewidth)
			.attr('stroke', options.graph.style.color)
			.attr('d', line)
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);
	};
	
	self.createBarChart = function(input, options) {
		var defaultOptions = {
			target: 'body',
			width: 400,
			height: 400,
			xAxis: {
				transformer: function(d) {return d},
				scale: d3.scaleLinear(),
				tickFormat: function(x) {return x;}
			},
			yAxis: {
				transformer: function(d) {return d},
				text: '',
				scale: d3.scaleLinear(),
				tickFormat: function(x) {return x;}
			},
			graph: {
				style: {
					color: 'steelblue',
					strokewidth: '1.5px'
				}
			},
			margin: {
				top: 20,
				right: 20,
				bottom: 30,
				left: 50
			}
		};
		
		options = merge(defaultOptions, defaultOptions);
		
		var svg = d3.select(options.target)
					.append('svg')
					.attr('width', options.width)
					.attr('height', options.height);
					
		var width = options.width - options.margin.left - options.margin.right;
		var height = options.height - options.margin.top - options.margin.bottom;

		var x = options.xAxis.scale.rangeRoundBands([0, width], 0.1);
		var y = options.yAxis.scale.rangeRound([height, 0]);

		var g = svg.append('g')
				   .attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')');

		function transform(d) {
			var newObj = {}
			newObj.key = options.xAxis.transformer(d);
			newObj.value = +options.yAxis.transformer(d);
			return newObj;
		};
		
		var data = [];
		for(var i = 0; i<input.length; i++) {
			data[i] = transform(input[i]);
		}
		
		x.domain(data.map(function(d) { return d.key; }));
		y.domain([0, d3.max(data, function(d) { return d.value; })]);

		var xAxis = d3.axisBottom(x);		
		xAxis.tickFormat(options.xAxis.tickFormat);
		
		g.append('g')
			.attr('class', 'axis axis--x')
			.attr('transform', 'translate(0,' + height + ')')
			.call(xAxis);

		var yAxis = d3.axisLeft(y);
		yAxis.tickFormat(options.yAxis.tickFormat);

		g.append('g')
			.attr('class', 'axis axis--y')
			.call(yAxis)
			.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('y', 6)
			.attr('dy', '0.71em')
			.attr('text-anchor', 'end')
			.text(options.yAxis.text);

		g.selectAll('.bar')
			.data(data)
			.enter().append('rect')
			.attr('fill', options.graph.style.color)
			.attr('x', function(d) { return x(d.key); })
			.attr('y', function(d) { return y(d.value); })
			.attr('width', x.band())
			.attr('height', function(d) { return height - y(d.value); });
	};
	
	return self;

}());