import { Player } from './Player'

export type Game = {
  owner: Player
  opponent: Player
  id: number
  board: string[]
  playCount: number
}
