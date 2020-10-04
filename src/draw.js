import * as d3 from 'd3'

async function draw () {

  const country = "United States"
  const numOfDays = 30

  const dawData = await d3.csv('http://127.0.0.1:8080/owid-covid-data.csv')
  const data = dawData.filter(d => d.location === country).filter((d, i, arr) => i >= arr.length - numOfDays).map(d => ({date: d.date, deaths: +d.new_deaths}))
  console.log(data)
}

export default draw