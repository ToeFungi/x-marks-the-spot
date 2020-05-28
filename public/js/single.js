// https://codepen.io/emilygoldfein/pen/LybZWN
const modal = document.getElementById('myModal')

const urlParams = new URLSearchParams(window.location.search)

let canPlay = false
const isOwner = urlParams.get('type') === 'owner'
const symbol = isOwner ? 'X' : 'O'
const roomId = urlParams.get('id')

let grid = new Array(9)

let player = 1
let gameWon = 0
let playCount = 0

function makeMove(evt) {
  const { position } = evt.dataset
  const isPlayerOne = player === 1
  const symbol = isPlayerOne ? 'X' : 'O'

  if (!isLegalMove(position)) {
    return false
  }

  $(`#${evt.id}_text`).html(symbol)
  grid[position] = symbol

  if (checkWin()) {
    endgame(player)
  }

  playCount++
  player = isPlayerOne ? 2 : 1
}

function checkWin() {
  const hasWon = winnerCheck(1, 2, 3) || winnerCheck(4, 5, 6) || winnerCheck(7, 8, 9)
    || winnerCheck(1, 4, 7) || winnerCheck(2, 5, 8) || winnerCheck(3, 6, 9)
    || winnerCheck(1, 5, 9) || winnerCheck(3, 5, 7)

  if (!hasWon && playCount === 8) {
    endgame(0)
  } else if (hasWon) {
    endgame(player)
  }
}

function winnerCheck(a, b, c) {
  return grid[a] === grid[b] && grid[a] === grid[c] && grid[a] !== undefined
}

function isLegalMove(position) {
  return grid[position] === undefined
}

function endgame(num) {
  if (num === 0) {
    $(".modal_text").html("Tie game!")
    $("#myModal").css("display", "block")
  }
  if (num === 1) {
    $(".modal_text").html("Player 1 Wins!")
    $("#myModal").css("display", "block")
  }
  if (num === 2) {
    $(".modal_text").html("Player 2 Wins!")
    $("#myModal").css("display", "block")
  }
}

$("#restartBtn").click(function () {
  grid = new Array(9)

  player = 1
  gameWon = 0
  playCount = 0

  $("#square_one_text").html("")
  $("#square_two_text").html("")
  $("#square_three_text").html("")
  $("#square_four_text").html("")
  $("#square_five_text").html("")
  $("#square_six_text").html("")
  $("#square_seven_text").html("")
  $("#square_eight_text").html("")
  $("#square_nine_text").html("")

  modal.style.display = "none"
})
