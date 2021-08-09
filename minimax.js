 //underscore indicates empty spot



const Board = function (board){ //constructor to initialize board
  this.board = board;
  this.player  = 'O'; //player is the ai
  this.opponent = 'X'; //opponent is the human

}


//function to change the move on the board.
Board.prototype.makeMove = function(cellRow, cellColumn, player){
  if(this.board[cellRow][cellColumn] === '_'){
    this.board[cellRow][cellColumn] = player;
  }else{
    console.log('occupied')
  }
}

//function to see if open spaces left
Board.prototype.isAvailability = function(){
  if(this.board.flat().includes('_')){
    return true;
  }else{
    return false;
  }
}

Board.prototype.checkWin = function( p){
  if(this.board[0][0] === p && this.board[0][1] === p && this.board[0][2] === p){ //row 0
    return true;
  }else if(this.board[1][0] === p && this.board[1][1] === p && this.board[1][2] === p){ //row 1
    return true;
  }else if (this.board[2][0] === p && this.board[2][1] === p && this.board[2][2] === p){ //row 2
    return true;
  }else if(this.board[0][0] === p && this.board[1][0] === p && this.board[2][0] === p){ //column 0
    return true;
  }else if(this.board[0][1] === p && this.board[1][1] === p && this.board[2][1] === p){ //column 1
    return true;
  }else if(this.board[0][2] === p && this.board[1][2] === p && this.board[2][2] === p){ //column 2
    return true;
  }else if(this.board[0][0] === p && this.board[1][1] === p && this.board[2][2] === p){ //diagonal backslash
    return true;
  }else if(this.board[0][2] === p && this.board[1][1] === p && this.board[2][0] === p){ //diagonal forward slash
    return true;
  }else{
    return false;
  }
}

//function to see if gameOver
 Board.prototype.score = function(depth=0){
  if(this.checkWin(this.player)){ //maximizer
    return 100 - depth;
  }else if(this.checkWin(this.opponent)){ //minimizer
    return -100 + depth;
  }else if(!this.isAvailability()){//no availability -- draw
    return 0;
  }else{
    return null;
  }
}

Board.prototype.openSquare = function (square){ //see if we can use the square
  return square === '_';
}

Board.prototype.nextMove = function(){
  let bestScore = -Infinity; //unreachably low score to maximize against
  let address; //will contain the row and column of the best square to select
  //iterate over the empty spots
  for(let i = 0; i < this.board.length; i++){
    for(let j = 0; j < this.board.length; j++){
      if(this.openSquare(this.board[i][j])){
        this.board[i][j] = this.player;
        let score = this.minimax(false, 0) //call the minimax on each empty score for the opponent, who is minimizing
        this.board[i][j] = '_' //reset mutation.  
        if(score > bestScore){
          bestScore = score;
          address = {row: i, column: j, score: score}
          }
        }
      }
    }
    return address;

}
//we need to call minimax on every open square and return the score for that.  if the maximizer, want the max score. if the minimizer, want minin.  recursive call if the open square does not return a terminal case

//return (the move, recursive call)
Board.prototype.minimax = function(isMaximizing, depth=0){
  //terminal case: if a numerical score is returned, then the game is concluded at win/loss/draw
  let score = this.score(depth)
   if(score !== null){ //a null score indicates that the board is not at a terminal state
     return score
   }

   let bestScore = isMaximizing ? -Infinity : Infinity; 
   let currentPlayer = isMaximizing ? this.player : this.opponent;

      for(let i = 0; i < this.board.length; i++){
        for(let j = 0; j < this.board.length; j++){ 
          if(this.openSquare(this.board[i][j])){
            this.board[i][j] = currentPlayer
            let score = this.minimax(!isMaximizing, depth + 1) //pass in opposite of it is maximizing
            this.board[i][j] = '_' //reset the mutation.  
            if(isMaximizing){
              bestScore = Math.max(score, bestScore) //if we are maximizing, we want the maximum score
            }else{
              bestScore = Math.min(score, bestScore) //if we are minimizing, we want the minimum score
            }
          }
        }
      }
      return bestScore;
}


export default Board;








