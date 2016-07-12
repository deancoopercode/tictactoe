var arrayMatrix = [];
// 0 1 2
// 3 4 5
// 6 7 8
var boardDepth = 3;


//computer - NEED TO BLOCK WHEREVER PLAYER HAS 2 ALREADY.....

// if c[0] == n and c[1] == n and c[2] == n: return 1
//   if c[3] == n and c[4] == n and c[5] == n: return 1
//   if c[6] == n and c[7] == n and c[8] == n: return 1
//
//   if c[0] == n and c[3] == n and c[6] == n: return 1
//   if c[1] == n and c[4] == n and c[7] == n: return 1
//   if c[2] == n and c[5] == n and c[8] == n: return 1
//
//   if c[0] == n and c[4] == n and c[8] == n: return 1
//   if c[2] == n and c[4] == n and c[6] == n: return 1


function isPlayerWinner(selections) {
//return a complex object here....

  var selectionsToWin = 3; //same as board depth

  // 0 1 2
  // 3 4 5
  // 6 7 8
  //build up winning combinations array
  var winning = []
  winning.push([0,1,2]);
  winning.push([3,4,5]);
  winning.push([6,7,8]);
  winning.push([0,3,6]);
  winning.push([1,4,7]);
  winning.push([2,5,8]);
  winning.push([0,4,8]);
  winning.push([2,4,6]);
  //initialise choice matrix to 0.
  var choiceMatrix = []
  //push empty counter elements to match the winning positions.
  for(var index2 = 0;index2 < winning.length;index2++) {
    choiceMatrix.push(0);
  }
  //iterate over the list of winning combinations and store
  //the number of 'hits'
  for(var index = 0;index < selections.length;index++) {
    //iterate over each set of winning combinations
    for(var index2 = 0;index2 < winning.length;index2++) {
      //this set of winning numbers
      //console.log('0,1,2 (sel) (match)',winning[index2], selections[index],winning[index2].indexOf(selections[index]));

      if (winning[index2].indexOf(selections[index]) !== -1) {
        //console.log('found a match');
        choiceMatrix[index2]++;
      }
      else {
        //console.log('no match');
      }

      //console.log(winning[index2].indexOf(selections[index]));
    }
    //console.log('choiceMatrix',choiceMatrix);
  }
  //test from 0
  //console.log(selections);

///analyse choce matrix to see if we have the number needed to winning
for (var index3 = 0;index3 < choiceMatrix.length;index3++) {
  if (choiceMatrix[index3] === selectionsToWin) {
    return winning[index3];
  }
  //console.log('choiceMatrix',choiceMatrix[index3]);
}

return -1

}



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



function isMoveTaken(position)
{
  if (arrayMatrix[position] === "none") {
    return false;
  }
  else {
    return true;
  }
}

function logMove(position, player) {
  arrayMatrix[position] = player;
}

//3 * 3 array
//0,1,2
