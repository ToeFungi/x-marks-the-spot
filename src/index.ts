import * as express from 'express'
import * as socketIO from 'socket.io'

import { RoomsController } from './RoomsController'

const port = process.env.PORT || 3000

const roomsController = new RoomsController()

const server = express()
  .use(express.static('public', {
    extensions: [
      'html'
    ]
  }))
  .listen(port, () => console.log('Listening on port', { port }))

const io = socketIO(server)

io.on('connection', socket => {
  socket.on('create-room', data => {
    console.log('creating room', { data })
    roomCreatedEvent(socket, data)
  })

  socket.on('update-owner', data => {
    roomsController.updateRoomOwner(parseInt(data.roomId, 10), socket)
  })
  socket.on('update-opponent', data => {
    roomsController.updateRoomOpponent(parseInt(data.roomId, 10), socket)
  })

  socket.on('played', data => {
    roomsController.updateGame(parseInt(data.roomId, 10), data.symbol, data.isOwner, data.position)
  })

  socket.on('join-room', data => {
    console.log('joining existing room', { data })
    joinRoom(socket, data)
  })
})

const roomCreatedEvent = (socket, data) => {
  const { id, owner } = roomsController.createRoom(data.username)
  console.log('room created', { id, owner })
  socket.emit('created-room', { id, owner })
}

const joinRoom = (socket, data) => {
  const { id, opponent } = roomsController.joinRoom(parseInt(data.roomId, 10), data.username)
  console.log('joined room', { id, opponent })
  socket.emit('joined-room', { id, opponent })
}
