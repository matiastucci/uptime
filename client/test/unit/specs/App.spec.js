import Vue from 'vue'
import App from '@/App'

import utils from 'services/utils'
import config from 'services/config'

describe('App.vue', () => {
  it('should add a warning message', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()

    const oneMinuteAgoDate = new Date((new Date()).getTime() - 1000 * 60)
    const stat1 = {
      date: utils.parseDate(oneMinuteAgoDate.toLocaleString()),
      value: config.MAX_AVERAGE + 1
    }

    const stat2 = {
      date: '5/16/2017, 9:41:16 PM',
      value: 1.8017578125
    }

    vm.stats = [stat1, stat2]

    vm.checkIfNewMessage()

    expect(vm.messages.length).to.equal(1)
    expect(vm.messages[0].type).to.equal('warning')
  })

  it('should add a recovered message', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()

    // add a warning message
    vm.messages.push({type: 'warning', text: 'foo'})
    vm.hasCurrentWarning = true

    // add a low value stat, in order to trigger a recover
    const thirtySecondsAgoDate = new Date((new Date()).getTime() - 1000 * 30)
    const stat = {
      value: config.MAX_AVERAGE - 0.5,
      date: utils.parseDate(thirtySecondsAgoDate.toLocaleString())
    }

    vm.stats.length = 0
    vm.stats.push(stat)

    vm.checkIfNewMessage()

    expect(vm.messages.length).to.equal(2)
    expect(vm.messages[0].type).to.equal('recovered')
  })

  it('should not add a new message', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()

    vm.stats = [
      {date: utils.parseDate('5/16/2016, 9:41:16 PM'), 'value': 3.189453125},
      {date: utils.parseDate('5/16/2015, 11:31:1 AM'), 'value': 2.92578125}
    ]

    const thirtySecondsAgoDate = new Date((new Date()).getTime() - 1000 * 30)
    vm.stats.push({
      date: utils.parseDate(thirtySecondsAgoDate.toLocaleString()),
      value: config.MAX_AVERAGE - 0.5
    })

    vm.checkIfNewMessage()

    expect(vm.messages.length).to.equal(0)
  })
})
