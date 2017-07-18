import * as d3 from 'd3'

const utils = {}

utils.parseDate = d => d3.time.format('%m/%d/%Y, %I:%M:%S %p').parse(d)

utils.vhToPx = vh => document.documentElement.clientHeight * (vh / 100)

export default utils
