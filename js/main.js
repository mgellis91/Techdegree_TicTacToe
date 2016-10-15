(function () {

  var startGameButton = document.getElementById("start").querySelector("a"),
      boxes = document.getElementsByClassName("boxes")[0].children,
      player1Box = document.getElementById("player1");
      player2Box = document.getElementById("player2");
      playerOneGoes = true,
      playerColors = {player1 : "#FFA000", player2 : "#3688C3"};
      gameOver = false;

  player1Box.classList.add("active");

  player1Box.addEventListener("click",function(){
      player2Box.classList.remove("active");
      this.classList.add("active");
  });

  player2Box.addEventListener("click",function(){
    player1Box.classList.remove("active");
    this.classList.add("active");
  });

  //remove start screen when start game button is clicked;
  startGameButton.addEventListener("click",function(){
    document.getElementById("start").style.display = "none";
  });

  //add symbol of current turn on hover
  for(var i = 0; i < boxes.length; i++){
    boxes[i].addEventListener("mouseenter",function(){
      if(!this.classList.contains("box-filled-1") && !this.classList.contains("box-filled-2")){
        if(playerOneGoes){
          this.classList.add("clear-o");
        }else{
          this.classList.add("clear-x");
        }
      }
    });
  }

  //remove symbol after the mouse leaves the box
  for(var i = 0; i < boxes.length; i++){
    boxes[i].addEventListener("mouseleave",function(){
      this.classList.remove("clear-o");
      this.classList.remove("clear-x");
    });
  }

  //handle human player turn
  for(var i = 0; i < boxes.length; i++){
    boxes[i].addEventListener("click",function(){
      if(!this.classList.contains("box-filled-1") && !this.classList.contains("box-filled-2")){
        if(playerOneGoes){
          player1Box.classList.remove("active");
          player2Box.classList.add("active");
          this.classList.add("box-filled-1");

          if(checkForWinner("box-filled-1")){
            document.getElementById("board").style.display = "none";
            showEndScreen("one");
          }

          if(!gameOver){
            handleGameEnd();
          }

          playerOneGoes = false;
          setTimeout(takeComputerTurn,500);

        }
      }
    });
  }

  function getPlayerColor(){
    if(playerOneGoes){
      return playerColors.player1;
    }
    return playerColors.player2;
  }

function takeComputerTurn(){
  //temp computer ai - choose random free cell to select
  //TODO: improve ai decision making using the min max algorithm

  //generate random number between 0 and 8 inclusive for deciding what cell to select
  var randomCell = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
  while((boxes[randomCell].classList.contains("box-filled-1") || boxes[randomCell].classList.contains("box-filled-2")) && checkNumberOfAvailableBoxes() >= 1){
    randomCell = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
  }
  boxes[randomCell].classList.add("box-filled-2");
  player2Box.classList.remove("active");
  player1Box.classList.add("active");

  if(!gameOver){
    handleGameEnd();
  }

  playerOneGoes = true;
}

//returns the number of unselected boxes still left
function checkNumberOfAvailableBoxes(){
  var availableBoxes = 0;
  for(var i = 0; i < boxes.length; i++){
    if(!boxes[i].classList.contains("box-filled-1") && !boxes[i].classList.contains("box-filled-2")){
      availableBoxes++;
    }
  }
  return availableBoxes;
}

function checkForWinner(symbol){
   //check rows for three of the same symbol
   if((boxes[0].classList.contains(symbol) && boxes[1].classList.contains(symbol) && boxes[2].classList.contains(symbol)) ||
      (boxes[3].classList.contains(symbol) && boxes[4].classList.contains(symbol) && boxes[5].classList.contains(symbol)) ||
      (boxes[6].classList.contains(symbol) && boxes[7].classList.contains(symbol) && boxes[8].classList.contains(symbol))){
     return true;
   }
   //check cols for three of the same symbol
   else if((boxes[0].classList.contains(symbol) && boxes[3].classList.contains(symbol) && boxes[6].classList.contains(symbol)) ||
      (boxes[1].classList.contains(symbol) && boxes[4].classList.contains(symbol) && boxes[7].classList.contains(symbol)) ||
      (boxes[2].classList.contains(symbol) && boxes[5].classList.contains(symbol) && boxes[8].classList.contains(symbol))){
     return true;
   }
   //check diagonals for three of the same symbol
   else if((boxes[0].classList.contains(symbol) && boxes[4].classList.contains(symbol) && boxes[8].classList.contains(symbol)) ||
      (boxes[2].classList.contains(symbol) && boxes[4].classList.contains(symbol) && boxes[6].classList.contains(symbol))){
      return true;
   }

   return false;
}

//create html for end screen based on the outcome and append it to the body
function showEndScreen(winner){
  gameOver = true;
  var message = (winner === "tie") ? "It's a draw" : "Winner";
  var svg = "";
  var endScreenHTML = "";

  if(winner === "one"){
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="142" height="142" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg>';
  }else if(winner === "two"){
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="142" height="142" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg>';
  }
  endScreenHTML += '<div class="screen screen-win-'+winner+'" id="finish"><header><h1>Tic Tac Toe</h1>';
  if(svg){
    endScreenHTML += svg;
  }
  endScreenHTML += '<p class="message">'+message+'</p><a href="index.html" class="button">New game</a></header></div>';
  document.body.innerHTML += endScreenHTML;

}

//hide game board and show the appropriate end screen when the game has ended
function handleGameEnd(){
  if(checkForWinner("box-filled-1")){
    document.getElementById("board").style.display = "none";
    showEndScreen("one");
  }else if(checkForWinner("box-filled-2")){
    document.getElementById("board").style.display = "none";
    showEndScreen("two");
  }else{
    if(checkNumberOfAvailableBoxes() === 0){
      document.getElementById("board").style.display = "none";
      showEndScreen("tie");
    }
  }
}

})();
