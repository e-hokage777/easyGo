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
