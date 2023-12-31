const { Server } = require('socket.io')

const messages = []

const realTimeServer = httpServer => {
  const io = new Server(httpServer)

  io.on('connection', socket => {
    console.log(`Se ha conectado ${socket.id}`)

    socket.on('message', data => {
      messages.push(data)

      io.emit('messageLogs', messages)
    })

    socket.on('auth', data => {
      socket.emit('messageLogs', messages)

      socket.broadcast.emit('newUser', data)
    })
  })
}

module.exports = realTimeServer
