
//'Player1', 'Player2'
var playersTurn = "player1";




function isSquareOccupied(square) {
  if (($(square).hasClass( "player1Choice" )) || $(square).hasClass( "player2Choice" )) {
    return true;
  }
  else {
    return false;
  }
}


function displayMessage(message) {
  var $liToChange = $('#messages').text(message);
}


function squareMouseOver(event) {
  console.log('squareMouseOver (target, id)', event.target, event.id);
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

  if (isSquareOccupied(event.target)) {
    displayMessage("Invalid Chose, please try again")
  }
  else {
    if (playersTurn === "player1") {
      console.log('player 1 chose');
      $(event.target).addClass("player1Choice");
      playersTurn = "player2";
    }
    else {
      console.log('player 2 chose');
      $(event.target).addClass("player2Choice");
      playersTurn = "player1";
    }
  }
  $(event.target).removeClass("squareMouseOver");
  // $(event.target).addClass( "squareMouseOut" );
}






$('.square').on('mouseover', squareMouseOver);
$('.square').on('mouseout', squareMouseOut);
$('.square').on('click', squareMouseClick);
