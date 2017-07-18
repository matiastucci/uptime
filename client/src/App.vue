<script>
  import moment from 'moment'
  import utils from 'services/utils'
  import config from 'services/config'

  import Graph from './components/Graph.vue'
  import Averages from './components/Averages.vue'
  import MessagesBox from './components/MessagesBox.vue'

  export default {
    name: 'app',

    components: { Graph, Averages, MessagesBox },

    data () {
      return {
        loading: true,
        hasCurrentWarning: false,
        checkMessagesInterval: undefined,
        stats: [],
        messages: []
      }
    },

    sockets: {
      'stats': function (stats) {
        this.stats = stats.map(s => ({
          date: utils.parseDate(s.date),
          value: s.value
        }))
        this.checkIfNewMessage()
        this.loading = false
      },
      'new-stat': function (stat) {
        stat.date = utils.parseDate(stat.date)
        if (this.stats.length === config.MAX_ELEMENTS) {
          this.stats.shift()
        }
        this.stats.push(stat)
      }
    },

    mounted () {
      this.checkMessagesInterval = setInterval(this.checkIfNewMessage, config.MESSAGES_INTERVAL)
    },

    destroyed () {
      clearInterval(this.checkMessagesInterval)
    },

    methods: {
      addMessage (type, value, date) {
        const message = { type }
        date = moment(date).format('MMMM Do YYYY, h:mm:ss a')
        if (type === 'warning') {
          message.text = `High load generated an alert - load = ${value}, triggered at ${date}`
        } else {
          message.text = `High load recovered = ${value}, triggered at ${date}`
        }
        this.messages.unshift(message)
      },

      checkIfNewMessage () {
        const twoMinutesAgo = moment().subtract(2, 'minutes')

        const newWarningMessageAdded = this.stats.some(stat => {
          if (moment(stat.date).isAfter(twoMinutesAgo) && stat.value > config.MAX_AVERAGE) {
            this.hasCurrentWarning = true
            this.addMessage('warning', stat.value, stat.date)
            return true
          }
        })

        if (newWarningMessageAdded) return

        if (this.hasCurrentWarning) {
          this.hasCurrentWarning = false
          const lastStat = this.stats[this.stats.length - 1]
          this.addMessage('recovered', lastStat.value, lastStat.date)
        }
      }
    }
  }
</script>

<template lang="pug">
  #app
    span(v-if='!loading')
      averages(:stats='stats')
      graph(:max-elements='60', :margin='40', :stats='stats')
      messages-box(:messages='messages')
</template>

<style lang="scss">
  @import "styles/main.scss";
</style>
