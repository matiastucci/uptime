const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const os = require('os')
const config = require('./config')
const port = process.env.PORT || config.PORT

let socket
const stats = []

io.on('connection', (s) => {
  socket = s
  socket.emit('stats', stats)
})

const generateStats = function () {
  if (stats.length === (config.TIME_TO_KEEP / config.INTERVAL)) {
    stats.shift(1)
  }
  let date = new Date()
  date = date.toLocaleString()
  const newItem = {date, value: os.loadavg()[0]}
  stats.push(newItem)
  if (socket) {
    socket.emit('new-stat', newItem)
  }
}

setInterval(() => {
  generateStats()
}, config.INTERVAL)

generateStats()

// Middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
  res.header('Access-Control-Allow-Methods', 'GET')
  next()
})

// Routes
app.get('/stats', (req, res) => res.json(stats))
app.get('/', (req, res) => res.json({status: 'ok'}))

server.listen(port)
