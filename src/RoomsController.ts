import { Room } from './types/Room'
import { Socket } from 'socket.io'

class RoomsController {
  private rooms: Room[] = []

  public createRoom(owner: string) {
    const room = {
      owner,
      id: this.rooms.length
    } as Room

    this.rooms.push(room)
    return room
  }

  public updateRoomOwner(roomId: number, socket: Socket) {
    const index = this.rooms.findIndex(room => room.id === roomId)
    this.rooms[index].ownerSocket = socket
  }

  public updateRoomOpponent(roomId: number, socket: Socket) {
    const index = this.rooms.findIndex(room => room.id === roomId)
    this.rooms[index].opponentSocket = socket
  }

  public joinRoom(roomId: number, opponent: string) {
    const index = this.rooms.findIndex(room => room.id === roomId)
    console.log('index of room', { index })

    this.rooms[index].opponent = opponent

    this.beginGame(roomId)
    return this.rooms[index]
  }

  public beginGame(roomId: number) {
    const index = this.rooms.findIndex(room => room.id === roomId)
    const room = this.rooms[index]

    const ownerSocket = room.ownerSocket

    console.log('triggering game begin sequence', { roomId })
    ownerSocket.emit('begin-game')
  }

  public updateGame(roomId: number, symbol: string, isOwner: boolean, position: number) {
    const index = this.rooms.findIndex(room => room.id === roomId)
    const room = this.rooms[index]

    console.log('Updating game for room', { index, roomId, symbol, isOwner, position })
    const socket = isOwner ? room.opponentSocket : room.ownerSocket
    socket.emit('next-turn', { position, symbol })
  }
}

export { RoomsController }
