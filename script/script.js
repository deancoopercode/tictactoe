
//'player1', 'player2', 'none'
var playersTurn = "player1";


function setUpGame() {
  var $board = $('#board');
  var $square;
  var noOfSquares = boardDepth * boardDepth;

  for(var index = 0;index < noOfSquares;index++) {
      $square = $('<div>', {id:index, class:"square"});
      //var square = { 'position': index, 'occupier': ''}
      $board.append($square);
      arrayMatrix.push('none');
  }

}

// function isSquareOccupied(square) {
//   if (($(square).hasClass( "player1Choice" )) || $(square).hasClass( "player2Choice" )) {
//     return true;
//   }
//   else {
//     return false;
//   }
// }


function displayMessage(message) {
  var $liToChange = $('#messages').text(message);
}


function squareMouseOver(event) {
  //console.log('squareMouseOver (target, id)', event.target, event.id);
  //$(event.target).removeClass();
  $(event.target).addClass( "squareMouseOver" );
}

function squareMouseOut(event) {
  //console.log('squareMouseOut (target, id)', event.target, event.id);
  $(event.target).removeClass("squareMouseOver");
  // $(event.target).addClass( "squareMouseOut" );
}

function squareMouseClick(event) {
  $(event.target).removeClass("squareMouseOver");

  if (isMoveTaken(event.target.id)) {
    displayMessage("Invalid Choice, please try again")
  }
  else {
    logMove(event.target.id, playersTurn);
    if (playersTurn === "player1") {
      $(event.target).addClass("player1Choice");
      playersTurn = "player2";
    }
    else {
      $(event.target).addClass("player2Choice");
      playersTurn = "player1";
    }
  }
  $(event.target).removeClass("squareMouseOver");

  var status = determineGameStatus();
  if (status != -1) {
    console.log(status.winner, status.selections);
    styleWinner(status.winner, status.selections);
  }
}


 function styleWinner(winningPlayer, winningSelections) {
   winningSelections.forEach(function (e) {
   var jquerySelector = 'body section div#' + e;
     $(jquerySelector).css('border', '2px solid black');
   })
   //displayMessage(winningPlayer + ' wins');
 }

setUpGame();


$('.square').on('mouseover', squareMouseOver);
$('.square').on('mouseout', squareMouseOut);
$('.square').on('click', squareMouseClick);
