import * as d3 from 'd3'

async function draw () {

  const width = 800
  const height = 500
  const country = "United States"
  const numOfDays = 30

  const dawData = await d3.csv('http://127.0.0.1:8080/owid-covid-data.csv')
  const data = dawData.filter(d => d.location === country).filter((d, i, arr) => i >= arr.length - numOfDays).map(d => ({date: d.date, deaths: +d.new_deaths}))
  console.log(data)

  const svg = d3.select('#chart-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background-color', '#D3D3D3')

  const xScale = d3.scaleBand()
    .domain(data.map(d => d.date))
    .range([0, width])
  
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.deaths)])
    .range([height, 0])
  
  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.date))
    .attr('y', d => yScale(d.deaths))
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - yScale(d.deaths))
    .attr('fill', 'yellow')

}

export default draw