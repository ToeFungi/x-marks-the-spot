import { Game } from './types/Game'

class GameController {
  private games: Game[] = []

  public createGame(owner, opponent): Game {
    const game: Game = {
      owner,
      opponent,
      playCount: 0,
      id: this.games.length + 1,
      board: new Array(9)
    }

    this.games.push(game)
    return game
  }

  public checkWin(gameId: number) {
    const { board, playCount } = this.games.find(item => item.id === gameId)

    const hasWon = this.winnerCheck(1, 2, 3, board)
      || this.winnerCheck(4, 5, 6, board)
      || this.winnerCheck(7, 8, 9, board)
      || this.winnerCheck(1, 4, 7, board)
      || this.winnerCheck(2, 5, 8, board)
      || this.winnerCheck(3, 6, 9, board)
      || this.winnerCheck(1, 5, 9, board)
      || this.winnerCheck(3, 5, 7, board)

    if (!hasWon && playCount === 8) {
      this.endGame(0)
    }
  }

  private endGame(winner: number) {

  }

  private winnerCheck(indexA: number, indexB: number, indexC: number, board: string[]) {
    return board[indexA] === board[indexB]
      && board[indexA] === board[indexC]
      && board[indexA] !== undefined
  }
}

export { GameController }
