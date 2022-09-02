// creating revenue grpah constants
const rvg_w = 200;
const rvg_h = 100;
const xPadding = 10;
const yPadding = 5;

const rv_dataset = [
              [ 34,    78 ],
              [ 109,   280 ],
              [ 310,   120 ],
              [ 79,    411 ],
              [ 420,   220 ],
              [ 233,   145 ],
              [ 333,   96 ],
              [ 222,   333 ],
              [ 78,    320 ],
              [ 21,    123 ]
            ];

rv_dataset_sorted = [...rv_dataset].sort((a,b) =>{
	return a[0] - b[0];
})


//creating scales for revenue graph
const rv_xScale = d3.scaleLinear()
rv_xScale.domain([0, d3.max(rv_dataset, (d) => d[0])])
rv_xScale.range([0, rvg_w-xPadding])

const rv_yScale = d3.scaleLinear()
rv_yScale.domain([0, d3.max(rv_dataset, (d) => d[1])])
rv_yScale.range([rvg_h, yPadding])


//creating the revenue graph
const rv_svg = d3.selectAll(".graph")
						.append("svg")
						.attr("width", rvg_w)
						.attr("height", rvg_h)


//creating rv points string
rv_points_string = rv_dataset_sorted.map((d) =>{
    return rv_xScale(d[0]) + " " + rv_yScale(d[1])
}).join(" ")

//drawing the polyline
rv_svg.append("polyline")
		.attr("points", rv_points_string)
		.attr("stroke", "#919DF1")
		.attr("stroke-width", 2)
		.attr("fill", "none")


//creating the line graph and the area under it
rvg_plot = d3.area()
				.x((d) => rv_xScale(d[0]))
				.y((d) => rv_yScale(d[1]))
				.y1(rvg_h)


// plotting the graph
rv_svg.append("path")
		.attr("fill", "#DCDDFD")
		.attr("d", rvg_plot(rv_dataset_sorted))




/********* Cusomter Acquisition graph **********/
const c_acq_data1 = [
  {xpoint: 0, ypoint: 0},
  {xpoint: 25,  ypoint: 25},
  {xpoint: 75,  ypoint: 85},
  {xpoint: 100, ypoint: 115},
  {xpoint: 175, ypoint: 150}];


const caqg_h = 400;
let caqg_w = 200;
padding = 20;


const caq_svg = d3.select("#customer_acq_graph")
					.append("svg")
					.attr("width", caqg_w)
					.attr("height", caqg_h)

//craeting scales
caqg_xScale = d3.scaleLinear()
caqg_xScale.domain([0, d3.max(c_acq_data1, (d) => d.xpoint)])
caqg_xScale.range([padding, caqg_w-padding])

caqg_yScale = d3.scaleLinear()
caqg_yScale.domain([0, d3.max(c_acq_data1, (d) => d.ypoint)])
caqg_yScale.range([caqg_h - padding, padding])

// creating the curved area for the graph
caqg1_area = d3.area()
			.x((d) => caqg_xScale(d.xpoint))
			.y((d) => caqg_yScale(d.ypoint))
			.y1(caqg_h-padding)
			.curve(d3.curveCardinal);


caqg1_curve = d3.line()
				.x((d) => caqg_xScale(d.xpoint))
				.y((d) => caqg_yScale(d.ypoint))
				.curve(d3.curveCardinal)


caq_svg.append("path")
		.attr("d", caqg1_curve(c_acq_data1))
		.attr("stroke", "#F8A0B9")
		.attr("stroke-width", 5)

caq_svg.append("path")
		.attr("d", caqg1_area(c_acq_data1))
		.attr("fill", "#FCC6D7")


const c_acq_data2 = [
  {xpoint: 0, ypoint: 0},
  {xpoint: 40,  ypoint: 80},
  {xpoint: 80,  ypoint: 40},
  {xpoint: 120, ypoint: 80},
  {xpoint: 160, ypoint: 10}];

//craeting scales
// caqg_xScale2 = d3.scaleLinear()
// caqg_xScale2.domain([0, d3.max(c_acq_data2, (d) => d.xpoint)])
// caqg_xScale2.range([padding, caqg_w-padding])

// caqg_yScale2 = d3.scaleLinear()
// caqg_yScale2.domain([0, d3.max(c_acq_data2, (d) => d.ypoint)])
// caqg_yScale2.range([caqg_h - padding, padding])

// creating the curved area for the graph
caqg2_area = d3.area()
			.x((d) => caqg_xScale(d.xpoint))
			.y((d) => caqg_yScale(d.ypoint))
			.y1(caqg_h-padding)
			.curve(d3.curveCardinal);


caqg2_curve = d3.line()
				.x((d) => caqg_xScale(d.xpoint))
				.y((d) => caqg_yScale(d.ypoint))
				.curve(d3.curveCardinal)


caq_svg.append("path")
		.attr("d", caqg2_curve(c_acq_data2))
		.attr("stroke", "#5660ED")
		.attr("stroke-width", 5)

caq_svg.append("path")
		.attr("d", caqg2_area(c_acq_data2))
		.attr("fill", "#CCCFFC")


// creating axes
const xAxis = d3.axisBottom(caqg_xScale)
const yAxis = d3.axisLeft(caqg_yScale)

//adding the scales to the graph

caq_svg.append("g")
		.attr("transform", "translate(0, " + (caqg_h-padding) + ")")
		.call(xAxis)

caq_svg.append("g")
		.attr("transform", "translate(" + padding + ", 0)")
		.call(yAxis)