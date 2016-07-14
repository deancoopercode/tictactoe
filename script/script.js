

var playersTurn = "player1";
var sideSectionContent = $('#sideSectionContent');

var gameIsOver = false;
var $board = $('#board');

var bunnyImgLoc = "images/bunny.png";
var foxImgLoc = "images/fox-new.png";

//possible snake display divs.
var $snakeAwaitingTurn = $('#snakeAwaitingTurn');
var $snakePlayerSelection = $('#snakePlayerSelection');
var $snakeGameOver = $('#snakeGameOver');
var $snakeSquareTaken = $('#snakeSquareTaken');
var $snakeTieGame = $('#snakeTieGame');

var $game1PlayerButton = $('#game1PlayerButton');
var $game2PlayerButton = $('#game2PlayerButton');

var $sideScoreP1 = $('#sideScoreP1');
var $sideScoreP2 = $('#sideScoreP2');


var boardMoves = 0;

function moveIsTaken() {
  console.log('moveIsTaken');
  $snakeAwaitingTurn.hide();

  $snakeSquareTaken
  .find('.snakeText')
  .text((playersTurn == "player1" ? "Player 1 " : " Player 2 ") + " , try another square");

  $snakeSquareTaken.show();
}

function switchPlayer() {
  console.log('switchPlayer');
  $snakeAwaitingTurn
  .find('.snakeText')
  .text((playersTurn == "player1" ? "Player 1 " : " Player 2 ") + " , Its your go!");

  $snakeAwaitingTurn
  .find('#snakeAwaitingTurnImg img')
  .attr('src', playersTurn == "player1" ? bunnyImgLoc : foxImgLoc);

  $snakeSquareTaken.hide();
  $snakeAwaitingTurn.show();
}

function setUpGame() {
  var $square;
  arrayMatrix = [];
  playersTurn = "player1";
  boardMoves = 0;

  //Hide all snake display divs.
  $snakeTieGame.hide();
  $snakePlayerSelection.hide();
  $snakeGameOver.hide();
  $snakeSquareTaken.hide();
  switchPlayer();

  var noOfSquares = boardDepth * boardDepth;
  $board.empty();
  gameIsOver = false;

  for(var index = 0;index < noOfSquares;index++) {
      $square = $('<div>', {id:index, class:"square"});
      $board.append($square);
      arrayMatrix.push('none');
  }
  $square = $('<div style="clear:left;">');
  $board.append($square);
  $('.square').on('click', squareMouseClick);
}

function squareMouseClick(event) {

  //is the game aleady over? if so just ignore the clicks!!
  if (($snakeGameOver.is(":visible") === true) ||
  ($snakeTieGame.is(":visible") === true)){
      console.log('game is already over. ');
      return;
    }

  if (isMoveTaken(event.target.id)) {
    moveIsTaken();
    return;
  }
  else {
    logMove(event.target.id, playersTurn);
    console.log('boardMoves',boardMoves);

    if (playersTurn === "player1") {
      $(event.target).addClass("player1Choice");
      playersTurn = "player2";
    }
    else {
      $(event.target).addClass("player2Choice");
      playersTurn = "player1";
    }
  }

  console.log('running determineGameStatus');
  var status = determineGameStatus();
  if (status != -1) {
    styleWinner(status.winner, status.selections);
  }
  else {
    if (boardMoves === 9) {
      $snakeTieGame.show();
      $snakePlayerSelection.hide();
      $snakeSquareTaken.hide();
      $snakeAwaitingTurn.hide();
      return;
    }
    switchPlayer();
  }
}

 function styleWinner(winningPlayer, winningSelections) {
   console.log('styleWinner');

   winningSelections.forEach(function (e) {
   var jquerySelector = 'body section div#' + e;
     $(jquerySelector).css('border', '5px solid black');
   })

   $snakePlayerSelection.hide();
   $snakeSquareTaken.hide();
   $snakeAwaitingTurn.hide();

   $snakeGameOver
   .show()
   .find('.snakeText')
   .text((winningPlayer == "player1" ? "Player 1 " : " Player 2 ") + " , you WON!");

   if (winningPlayer == "player1") {
      $sideScoreP1.html( function(i, oldval) {
      return ++oldval;
      });
   }
   else {
      $sideScoreP2.html( function(i, oldval) {
      return ++oldval;
      });
   }
 }

function newGameClick() {
  console.log('new gamee');
  setUpGame();
}

setUpGame();



$('.playAgainButton').on('click', newGameClick);
$('#newGameButton').on('click', newGameClick);
