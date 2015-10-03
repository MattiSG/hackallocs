function formatMilliSeconds(ms) {
	return d3.time.format('%Mm')(new Date(2012, 0, 1, 0, 0, 0, ms));
}

function drawHistogram(id) {
	d3.json(id + '.json', function(values) {
		var margin = { top: 10, right: 30, bottom: 30, left: 30 },
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		var x = d3.scale.linear()
			.domain([ 0, Math.max(...values) ])
			.range([ 0, width ]);

		var data = d3.layout.histogram()
			.bins(x.ticks(50))
			(values);

		var y = d3.scale.linear()
			.domain([ 0, values.length / 3 ])
			.range([ height, 0 ]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient('bottom')
			.tickFormat(formatMilliSeconds);

		var svg = d3.select('#' + id).append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		var bar = svg.selectAll('.bar')
			.data(data)
			.enter().append('g')
			.attr('class', 'bar')
			.attr('transform', function(d) { return 'translate(' + x(d.x) + ',' + y(d.y) + ')'; });

		bar.append('rect')
			.attr('x', 1)
			.attr('width', x(data[0].dx) - 1)
			.attr('height', function(d) { return height - y(d.y); });

		svg.append('g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + height + ')')
			.call(xAxis);
	});
}
