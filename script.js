playSpace();

// initialise gameboard object
var gameboard = {positions: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']};

// winning position combinations
var wins = {
    winningPos: 
    [[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]]
}

var winArray = {win: [' ',' ',' ']};

// creates symbols for playerOne and playerTwo
var mySymbol = {
    playerOne: "X",
    playerTwo: "O",
}
let player = mySymbol.playerOne;

// changes the player symbol
function changePlayer(player){
    if (player == mySymbol.playerOne){
        player = mySymbol.playerTwo;
    }else{
        player = mySymbol.playerOne;
    }
    return player;
}

function generateRefreshButton(){
    let container = document.querySelector(".gameBoard");
    let button = document.createElement('button');
    button.classList.add('buttons');
    button.textContent = "REFRESH"
    container.appendChild(button);
    button.addEventListener('click', () =>{
        for (let i = 0; i < 9 ; i++){
        document.getElementsByClassName(`${i}`)[0].innerHTML = ' ';
        }
        let container = document.querySelector(".gameBoard");
        let para = document.querySelector('p');
        container.removeChild(para);
        winArray.win = [' ',' ', ' ']
        gameboard.positions = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
        console.log(winArray);
        container.removeChild(button);
    })
}
let container = document.querySelector(".gameBoard");
function generateXWins(){
    let container = document.querySelector(".gameBoard");
    let para = document.createElement('p');
    para.classList.add("para");
    para.textContent = "X WINS!!!";
    container.appendChild(para);
}

function generateOWins(){
    let container = document.querySelector(".gameBoard");
    let para = document.createElement('p');
    para.classList.add("para");
    para.textContent = "O WINS!!!";
    container.appendChild(para);
}

function generateDraw(){
    let container = document.querySelector(".gameBoard");
    let para = document.createElement('p');
    para.classList.add("para");
    para.textContent = "It's a draw";
    container.appendChild(para);
}

// check for win
function checkForWin(){  
    for (i = 0; i < wins.winningPos.length; i++){
        winArray.win = [' ', ' ', ' '];
        for (j = 0; j < wins.winningPos[i].length; j++){
            winArray.win[j] = gameboard.positions[wins.winningPos[i][j]];
            //console.log(winArray);
            // if all of array is X or all of array is O, that player wins
            if (winArray.win[0] == "X"){
                if (winArray.win[1] == "X"){
                    if (winArray.win[2] == "X"){
                        // print win status to DOM
                        generateXWins();
                        generateRefreshButton();
                        return true;
                    }
                }
            }
            if (winArray.win[0] == "O"){
                if (winArray.win[1] == "O"){
                    if (winArray.win[2] == "O"){
                        // print win status to DOM
                        generateOWins();
                        generateRefreshButton();
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
// check for draw
function checkForDraw(){
    for (let i = 0; i < gameboard.positions.length; i++){
        if (gameboard.positions[i] == ' '){
            return false;
        }
    }
    // prints out IT's A Dr4W to the screen if there's a draw
    generateDraw();
    generateRefreshButton();
    return true;
}

function playSpace(){
    var option = document.querySelectorAll('td');
    option.forEach(option => {
        option.addEventListener('click', (e) =>{
            choice = e.target.className;
            if (gameboard.positions[choice] == ' '){
                gameboard.positions[choice] = player;
                document.getElementsByClassName(choice)[0].innerHTML = player;
                player = changePlayer(player);   
            }
            checkForWin();
            checkForDraw();
        })
    })
}

