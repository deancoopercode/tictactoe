var arrayMatrix = [];
// 0 1 2
// 3 4 5
// 6 7 8
var boardDepth = 3;
var winning = [];
var selectionsToWin = 3; //same as board depth

//computer - NEED TO BLOCK WHEREVER PLAYER HAS 2 ALREADY.....

function initValues() {
  winning.push([0,1,2]);
  winning.push([3,4,5]);
  winning.push([6,7,8]);
  winning.push([0,3,6]);
  winning.push([1,4,7]);
  winning.push([2,5,8]);
  winning.push([0,4,8]);
  winning.push([2,4,6]);
}

function isPlayerWinner(selections) {
//return a complex object here....
  // 0 1 2
  // 3 4 5
  // 6 7 8
  //build up winning combinations array
  // var winning = []
  // console.log('selections', selections);
  // console.log('winning',winning);
  //initialise choice matrix to 0.
  var choiceMatrix = []
  //push empty counter elements to match the winning positions.
  for(var index2 = 0;index2 < winning.length;index2++) {
    // console.log('isPlayerWinner pushing empty');
    choiceMatrix.push(0);
  }
  //iterate over the list of winning combinations and store
  //the number of 'hits'
  for(var index = 0;index < selections.length;index++) {
    //iterate over each set of winning combinations
    for(var index2 = 0;index2 < winning.length;index2++) {
      //this set of winning numbers
      if (winning[index2].indexOf(selections[index]) !== -1) {
        //console.log('found a match');
        choiceMatrix[index2]++;
        // console.log('isPlayerWinner choiceMatrix adding ',index2);
      }
    }
  }

///analyse choce matrix to see if we have the number needed to win
for (var index3 = 0;index3 < choiceMatrix.length;index3++) {
  if (choiceMatrix[index3] === selectionsToWin) {
    // console.log('isPlayerWinner returning winning index 3');
    return winning[index3];
  }
  //console.log('choiceMatrix',choiceMatrix[index3]);
}

return -1

}


function buildChoiceMatrix(playerSelections) {

  var choiceMatrix = [];
  for(var index2 = 0;index2 < winning.length;index2++) {
    choiceMatrix.push(0);
  }
  for(var index = 0;index < playerSelections.length;index++) {
    for(var index2 = 0;index2 < winning.length;index2++) {
      if (winning[index2].indexOf(playerSelections[index]) !== -1) {
        choiceMatrix[index2]++;
      }
    }
  }
  return choiceMatrix;
}


function findThirdSpot(choiceMatrix,playerSelections) {
  console.log('findThirdSpot START');

  for (var index3 = 0;index3 < choiceMatrix.length;index3++) {
    if (choiceMatrix[index3] === 2) {
      //find out the spot which is FREE....
      console.log(choiceMatrix[index3]);
      console.log('winning ', winning[index3]);

      //cross check the near winning selections to find the missing one
      for (var index4 = 0;index4 < winning[index3].length;index4++) {
        if (playerSelections.indexOf(winning[index3][index4]) === -1)
        {
          console.log('findThirdSpot winning[index3][index4]',winning[index3][index4]);
          //take this spot if its free, keep looking if we have blucked it already
          //we have blocked it already - this makes it more difficult, i had this//check outsude
          //meahing it will skip other '2' choices present..
          if (!isMoveTaken(winning[index3][index4]))
          {
            return winning[index3][index4];
          }
        }
      }
    }
    //console.log('choiceMatrix',choiceMatrix[index3]);
  }
  console.log('findThirdSpot END', -1);
  return -1;
}

function decideMove() {

  console.log('decide move start');
  var choiceMatrix;

  //1. work out where i have 2 spots and add another
  console.log('1. check for my 2 squares');
  var player2Selections = toPlayerChoiceArray("player2");
  choiceMatrix = buildChoiceMatrix(player2Selections)

  var optionOne = findThirdSpot(choiceMatrix, player2Selections);

  //call isMoveTaken as they might have already blocked that spot
  if ((optionOne != -1) && (!isMoveTaken(optionOne))) {
    return optionOne;
  }

  //2. give me all the positions where player 1 has 2 spots.
  var playerSelections = toPlayerChoiceArray("player1");

  console.log('playerSelections',playerSelections);
  choiceMatrix = buildChoiceMatrix(playerSelections)

  console.log('2. check for player 1 2 squares');

  var optionTwo = findThirdSpot(choiceMatrix, playerSelections);
  //call isMoveTaken as I might have already blocked that spot
  if ((optionTwo != -1) && (!isMoveTaken(optionTwo))) {
    return optionTwo;
  }

//need to go where we hav 1 selesction......



  //3. take the middle spot if it isnt taken.
  console.log('3. check for middle square');
  if (!isMoveTaken(4)) {
    console.log("retruning 4");
    return 4;
  }
console.log('4. take next avail');
  //3. take next available square..
  for (var index5=0;index5<10;index5++) {
    if (!isMoveTaken(index5)) {
console.log('4. ',index5);
      return index5;
    }
  }

    // for (var index3 = 0;index3 < choiceMatrix.length;index3++) {
    //   if (choiceMatrix[index3] === 2) {
    //     //find out the spot which is FREE....
    //     console.log(choiceMatrix[index3]);
    //     console.log('winning ', winning[index3]);
    //
    //     //cross check the near winning selections to find the missing one
    //     for (var index4 = 0;index4 < winning[index3].length;index4++) {
    //       if (playerSelections.indexOf(winning[index3][index4]) === -1)
    //       {
    //         console.log('winning[index3][index4]',winning[index3][index4]);
    //         //take this spot
    //         return winning[index3][index4];
    //       }
    //     }
    //   }
    //   //console.log('choiceMatrix',choiceMatrix[index3]);
    // }


}


function toPlayerChoiceArray(player) {
  console.log('arrayMatrix',arrayMatrix);
  var playerArray = [];
  for(var index = 0;index < arrayMatrix.length;index++) {
    //console.log(index, arrayMatrix[index]);
    if (arrayMatrix[index] === player) {
      playerArray.push(index);
    }
  }
  console.log(playerArray);
  return playerArray;
}


///refactor to use the toPlayerChoiceArray one.
function determineGameStatus() {
  var player1 = [];
  var player2 = [];

  for(var index = 0;index < arrayMatrix.length;index++) {
    //console.log(index, arrayMatrix[index]);
    if (arrayMatrix[index] === "player1") {
      player1.push(index);
    }
    if (arrayMatrix[index] === "player2") {
      player2.push(index);
    }
  }
  ///console.log("player1",player1);
  //console.log("player2",player2);
  // console.log('arraymatrix',arrayMatrix);
  // console.log('player1',player1);
  // console.log('player2',player2);

  var isWinner = isPlayerWinner(player1);
  if (isWinner !== -1) {
    //we have a winner...
    return {winner:"player1", selections:isWinner}
  }
  else {
    isWinner = isPlayerWinner(player2);
    if (isWinner !== -1){
      return {winner:"player2", selections:isWinner}
    }
    else {
      return -1;
    }
  }
    //console.log(isWinner);
}


function isMoveTaken(position){
  if (arrayMatrix[position] === "none") {
    return false;
  }
  else {
    return true;
  }
}

function logMove(position, player) {
  arrayMatrix[position] = player;
  boardMoves++;
}

//3 * 3 array
//0,1,2
