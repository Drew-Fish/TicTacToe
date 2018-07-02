var oScore = 0;
var xScore = 0;
var currentPlayer = "X";
var nextPlayer = "O";

var playerXSelections = new Array();
var playerOSelections = new Array();

const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

handleClick = function (event) {
    var cell = event.target;
    if(cell.innerHTML != ""){
        alert("Click on an empty box!!!!!");
        return;
    }
    cell.innerHTML = currentPlayer;

    if (currentPlayer === "X") {
        playerSelections = playerXSelections;
        nextPlayer = "O";
    } else {
        playerSelections = playerOSelections;
        nextPlayer = "X";
    }
    playerSelections.push(parseInt(cell.id));
    console.log(cell.innerHTML);

    let check = checkWinner();
    if (check === true) {
        alert("Player "+currentPlayer+" has won!");
        if(currentPlayer=="X"){
            xScore++;
            xScoreLabel.textContent = xScore;
        }else if(currentPlayer == "O"){
            oScore++;
            oScoreLabel.textContent = oScore;
        }
        resetGame();

    }else if(check === false){
        if(playerOSelections.length>=5 || playerXSelections.length>=5){
            alert("Draw");
            resetGame();
        }
    }

    // Swap players
    currentPlayer = nextPlayer;

}

var cells = document.querySelectorAll("td");

for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', handleClick);
}

function checkWinner() {
    for (let combo of winningCombinations) {
        var matches = 0;
        for (let item of playerSelections) {
            if (combo.includes(item)) {
                matches++;
            }
        }
        if (matches == 3) {
            return (true);
        }
    }
    return (false);
}

function resetGame() {
    playerXSelections = new Array();
    playerOSelections = new Array();
    currentPlayer = "O";
    nextPlayer = "X"
    for(var i = 0; i < cells.length; i++) {
      cells[i].innerHTML = ""
    }
}