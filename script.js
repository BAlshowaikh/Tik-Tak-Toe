////////////////////////////////
// Global Variables Here

// Retrieve all necessary variables
const boardCell = document.querySelectorAll(".cell")
const board = document.querySelector("#board")
const turnA = document.querySelector("#turnA")
const turnB = document.querySelector("#turnB")
const restartBtn = document.querySelector("#restartBtn")
const messageOverlay = document.querySelector("#message-overlay")
const messageText = document.querySelector("#message-text")

// Global vars
let currentPlayer = "X" // Default will be X
let gameActive = true
// Check the board status (will be updated)
let boardState = ["", "", "", "", "", "", "", "", ""]

////////////////////////////////
// Functions For Game Logic Here

// Function to handle the cell click
// Things to check when the cell is clicked:
// * Is the game still running? no winner?
// * Is the cell empty?
// * Who's turn is?

const handleCellClick = (clickedCell, clickedCellIndex) => {
  if (!gameActive || boardState[clickedCellIndex] !== "") {
    return
  }
  clickedCell.textContent = currentPlayer
  boardState[clickedCellIndex] = currentPlayer
  // Add the hover effect for the clicked cell
  clickedCell.classList.add("cell-fill")
  // Check if the game is over (win or draw)
  const gameOver = checkWin()

  // Only switch players if the game is NOT over
  if (!gameOver) {
    switchPlayer()
  }
}

// Function to check if there is a win or a draw
const checkWin = () => {
  const winningProps = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  // Loop through the winning props
  for (const prop of winningProps) {
    // Use the destructure concept
    // So instead of having the first array of the winning prop as one array, go and put each array element in a variables
    const [a, b, c] = prop

    // Check if the cells are not empty and if they share the same player
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      gameActive = false // A winning condition found, stop
      displayMessage(`${currentPlayer} wins!`)
      clearBoard()
      return true // Return true to indicate a winner was found
    }
  }
  // Check if there is a draw
  // Note to me: every() function iterates through the entire boardState array and returns true only if every single cell has a non-empty value. If even one cell is empty, it returns false
  if (boardState.every((cell) => cell !== "")) {
    gameActive = false // The board is full, stop the game
    // console.log("It's a draw!")
    displayMessage("It's a draw!")
    clearBoard()
    return true
  }
  return false // If no winner was found, continue the game
}

// Function to switch the player
const switchPlayer = () => {
  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X"
  }

  // Change the active class
  if (currentPlayer === "X") {
    turnA.classList.add("active")
    turnB.classList.remove("active")
  } else {
    turnA.classList.remove("active")
    turnB.classList.add("active")
  }
}

// Function to clear the board
const restartGame = () => {
  //Reset the game state variables
  currentPlayer = "X"
  gameActive = true

  //Reset the boardState array
  boardState = ["", "", "", "", "", "", "", "", ""]

  // Clear the visual content and classes of the cells
  boardCell.forEach((cell) => {
    cell.textContent = ""
    cell.classList.remove("cell-fill")
  })

  // Reset the turn display to the starting player (Player A)
  turnA.classList.add("active")
  turnB.classList.remove("active")
}

// Function to display a message (win/lose/darw) to user
const displayMessage = (message) => {
  messageOverlay.classList.remove("hidden")
  messageText.textContent = message

  // Show only for 20 seconds
  // Retrieved from Gemini
  setTimeout(() => {
    messageOverlay.classList.add("hidden")
    restartGame()
  }, 3000)
}

// Function to pause the game
const pauseGame = () => {
  messageOverlay.classList.remove("hidden")
}

////////////////////////////////
// Event Listeners Here
boardCell.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    handleCellClick(cell, index)
  })
})

// Add event listener to restart button
restartBtn.addEventListener("click", () => {
  restartGame()
})
