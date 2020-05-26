import { Player } from './types/Player'

class PlayersController {
  private playerList: Player[] = []

  public addPlayer(socketId: string, name: string): Player {
    const player: Player = {
      name,
      id: socketId
    }

    this.playerList.push(player)
    return player
  }

  public removePlayer(socketId: string): void {
    const index = this.playerList.findIndex((player: Player) => player.id === socketId)
    this.playerList.splice(index, 1)
  }
}

export { PlayersController }
