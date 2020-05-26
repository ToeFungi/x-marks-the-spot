import { Socket } from 'socket.io'

interface Room {
  id: number
  owner: string
  ownerSocket: Socket
  opponent?: string
  opponentSocket?: Socket
}

export { Room }
