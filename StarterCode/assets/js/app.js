//Set window layout
var svgWidth = window.innerWidth;
var svgHeight = window.innerHeight;

//set margin for svg
var margin = {
    top: 60,
    bottom: 100,
    right: 40,
    left: 100
};

//subtract margins from window layout
var chartWidth = svgWidth - margin.left -margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

//create svg
var svg = d3
        .select('#scatter')
        .append('svg')
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append('g')

//append svg element
var chart = svg.append('g').attr("transform", `translate(${margin.left}, ${margin.top})`);

// select body, append to div, assign class to tooltip
d3.select('body')
        .append('div')
        .attr('class','tooltip')

//import data
d3.csv("assets/data/Data.csv")
    .then(csvData=>{
        csvData.forEach(data=>{
            data.age = +data.obesity;
            data.smokes = +data.poverty;
        });
    
    //scale graph

    var x = d3.scaleLinear()
            .domain([18,d3.max(csvData, data => data.obesity)])
            .range([0,chartWidth]);
    var y = d3.scaleLinear()
            .domain([0, 23])
            .range([chartHeight,0]);
    
    var bottomAxis = d3.axisBottom(x);
    var leftAxis = d3.axisLeft(y);

    //create circles
    chart.selectAll('circle')
                .data(csvData)
                .enter()
                .append('circle')
                .attr('cx', data=>x(data.obesity))
                .attr('cy', data =>y(data.poverty))
                .attr('r','7')
                .attr('fill', 'Maroon')
                .style('opacity','0.7')
                .on('click', function(data) {
                    toolTip.show(data);
                });

    //create x-axis and y axis
    chart.append('g')
                .attr('transform', `translate(0, ${chartHeight})`)
                .call(bottomAxis);
    chart.append('g')
                .call(leftAxis);

//Create Y axis label
    chart.append('text')
            .attr("transform", 'rotate(-90)')
            .attr('y', 0 - margin.left + 40)
            .attr('x', 0 - (chartHeight) + 90)
            .attr('dy', "1em")
            .attr('class', 'axisText')
            .style('text-anchor', 'marginTop')
            .text("Poverty Rate")
    //add circle labels
    chart.selectAll("tspan")
        .data(csvData)
        .enter()
        .append("text")
        .attr("x", data => x(data.obesity))
        .attr("y", data => y(data.poverty))
        .style("font-size",8)
        .attr("fill","white")
        .style("text-anchor", "middle")
        .text(data => data.abbr);      
            });