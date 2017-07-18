<script>
  export default {
    name: 'Averages',

    props: {
      stats: {
        type: Array,
        required: true
      }
    },

    data () {
      return {
        min: undefined,
        avg: undefined,
        max: undefined
      }
    },

    watch: {
      stats: function () {
        this.setValues()
      }
    },

    mounted () {
      this.setValues()
    },

    methods: {
      setValues () {
        const stats = this.stats
        let max = stats[0].value
        let min = stats[0].value
        let sum = stats[0].value
        for (let i = 1; i < stats.length; i++) {
          if (stats[i].value > max) {
            max = stats[i].value
          }
          if (stats[i].value < min) {
            min = stats[i].value
          }
          sum = sum + stats[i].value
        }
        this.min = min
        this.max = max
        this.avg = sum / stats.length
      }
    }
  }
</script>

<template lang="pug">
  #averages
    p
      b Min: &nbsp
      | {{ min }}
    p
      b Avg: &nbsp
      | {{ avg }}
    p
      b Max: &nbsp
      | {{ max }}
</template>

<style lang="scss">
  @import "../styles/variables.scss";

  #averages {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5vh;
    color: white;
    background-color: $primary;
    box-shadow: 0px -3px 10px 5px rgba(0, 0, 0, 0.5);
    z-index: 1;

    .logo {
      height: 4vh;
      position: absolute;
      left: 15px;
    }

    p {
      margin: 0 1em;
      font-size: 1.5em;
    }

    @media screen and (max-width: 400px) {
      .logo {
        display: none;
      }

      p {
        font-size: 1em;
      }
    }
  }
</style>
