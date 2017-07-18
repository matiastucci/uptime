<script>
  import * as d3 from 'd3'
  import utils from 'services/utils'

  export default {
    name: 'Graph',

    props: {
      maxElements: {
        type: Number,
        default: 100
      },

      margin: {
        type: Number,
        default: 10
      },

      stats: {
        type: Array,
        default: () => []
      }
    },

    data () {
      return {
        x: undefined,
        y: undefined,
        valueline: undefined,
        xAxis: undefined,
        yAxis: undefined,
        data: undefined
      }
    },

    mounted () {
      const width = parseInt(d3.select('#graph').style('width')) - this.margin * 2
      const height = parseInt(d3.select('#graph').style('height')) - this.margin * 2 - utils.vhToPx(26)

      this.x = d3.time.scale().range([0, width])
      this.y = d3.scale.linear().range([height, 0])

      this.xAxis = d3.svg.axis().scale(this.x).orient('bottom').ticks(5)
      this.yAxis = d3.svg.axis().scale(this.y).orient('left').ticks(5)

      this.valueline = d3.svg.line().x((d) => this.x(d.date)).y((d) => this.y(d.value))

      const svg = d3.select('#graph')
          .attr('width', width + this.margin * 2)
          .attr('height', height + this.margin * 2 - utils.vhToPx(26))
          .append('g')
              .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')')

      this.x.domain(d3.extent(this.stats, d => d.date))
      this.y.domain([0, d3.max(this.stats, d => d.value)])

      svg.append('path')
          .attr('class', 'line')
          .attr('d', this.valueline(this.stats))

      svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(this.xAxis)

      svg.append('g').attr('class', 'y axis').call(this.yAxis)
    },

    watch: {
      stats: function () {
        this.updateData()
      }
    },

    methods: {
      updateData () {
        this.x.domain(d3.extent(this.stats, d => d.date))
        this.y.domain([0, d3.max(this.stats, d => d.value)])

        const svg = d3.select('#graph').transition()

        svg.select('.line')
            .duration(550)
            .attr('d', this.valueline(this.stats))
        svg.select('.x.axis')
            .duration(550)
            .call(this.xAxis)
        svg.select('.y.axis')
            .duration(550)
            .call(this.yAxis)
      }
    }
  }
</script>

<template lang="pug">
  svg#graph
</template>

<style lang="scss">
  @import "../styles/variables.scss";

  #graph {
    width: 100%;
    height: 100%;
    position: absolute;
    margin-top: 5vh;

    .axis path,
    .axis line {
      fill: none;
      stroke: $secondary;
      shape-rendering: crispEdges;
    }

    .axis text {
      fill: $secondary;
    }

    .line {
      fill: none;
      stroke: $primary;
      stroke-width: 1.5px;
    }
  }
</style>
