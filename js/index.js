
import Board from './minimax.js'
const emptyBoard = [['_','_','_'], ['_','_','_'], ['_','_','_']]
let board = new Board(emptyBoard)
console.log(board);

let $winner = $('#winner');
//declare variables as jquery variables by ID
let $one = $('#one');
let $two = $('#two');
let $three = $('#three');
let $four = $('#four');
let $five = $('#five');
let $six = $('#six');
let $seven = $('#seven');
let $eight = $('#eight');
let $nine = $('#nine');
//declare varaibles as jquery variables by class
let $box = $('.box'); 
let $openBox = $('.available');

let $reset = $('#reset');

//object lookup //for linear to nested
const lookup = {
  one: {i: 0, j: 0},
  two: {i: 0, j: 1},
  three: {i: 0, j: 2},
  four: {i: 1, j: 0},
  five: {i: 1, j: 1},
  six: {i: 1, j: 2},
  seven: {i: 2, j: 0},
  eight: {i: 2, j: 1},
  nine: {i: 2, j: 2}
}

const linearLookup = { //lookup jquery variable, for nested to linear array
  1: $one,
  2: $two,
  3: $three,
  4: $four,
  5: $five,
  6: $six,
  7: $seven,
  8: $eight,
  9: $nine

}



//array of available moves
let movesArray = [$one, $two, $three, $four, $five, $six, $seven, $eight, $nine];


//select so hovering mouse turns it color of player
$box.on('mouseenter', function(event){
    if($(event.currentTarget).hasClass('available')==true){
        $(event.currentTarget).addClass('player1');
    }
    else{
        $(event.currentTarget).addClass('unavailable');
    }
})
//event handler so it returns to what it should be on mouseout     
$box.on('mouseleave', function(event){
    $(event.currentTarget).removeClass('player1 unavailable');
    
})

//select so clicking will put an X
//fix it so only available clicks

$box.on('click', function(event){
    if($(event.currentTarget).hasClass('available') == true){
    $(event.currentTarget).html('X');
    $(event.currentTarget).addClass('player1clicked');
    $(event.currentTarget).removeClass('available');  //removes class available
        if (isWin('player1clicked')  === true){
        $winner.css('visibility', 'visible')
        $winner.html('You win');
        $box.removeClass('available');
        console.log('you win')
        return;
    }  
    //push a value into the board in the vanilla js 
    
    

    let currentId = event.currentTarget.id
    let vanillaAddress = lookup[currentId];

    board.makeMove(vanillaAddress.i, vanillaAddress.j, 'X')
    //check if win here

    if(!board.isAvailability()){
      $winner.css('visibility', 'visible')
      $winner.html('Draw');
      console.log('DRAW')
    }


    const nextAIMove = board.nextMove();
    board.makeMove(nextAIMove.row, nextAIMove.column, 'O')
    //translate this ai move into the value in a linear array
    //3*i + j + 1 == linear corresponding 
    const linearVal = 3*nextAIMove.row + nextAIMove.column + 1;
    let $nextClick = linearLookup[linearVal]
    
    //let $nextClick = nextPlay(movesArray);

    setTimeout(()=>{

        $nextClick.html('O')
    }, 500);
    $nextClick.addClass('player2clicked');
    $nextClick.removeClass('available'); 
    }
    //add something more interesting here to stop game when win
   
    if (isWin('player2clicked') === true){
        $winner.css('visibility', 'visible')
        $winner.html('Computer wins');
        $box.removeClass('available');
        
        
    }
   
})



//function to find unclicked options 
const optionsLeft = (array) => {
    //use filter to filter out unavailable options.  use hasClass(class)
   let availableArr =  array.filter(square => square.hasClass('available'));
    return availableArr;
}

//function to determine next move computer will play- randomized
const nextPlay = (arr) => {
    //computer make next move
    let movesAvailable = optionsLeft(arr);
    let x = movesAvailable.length; //number of moves left
    let rand = Math.floor( Math.random() * x); //randomly choose index for next move
    let move = movesAvailable[rand];
    console.log(move);
    return move; //this will return $whichever
}

//make the jquery function here connecting to vanilla JS file to summon the nextPlay from over there


//this function determines if win, parameter is class 'player1clicked' or 'player2clicked' depending on which player
const isWin = (clicked) => {
    if( $one.hasClass(clicked) === true && $two.hasClass(clicked) === true && $three.hasClass(clicked) === true) {
        return true;
    }
    else if( $one.hasClass(clicked) === true && $four.hasClass(clicked) === true && $seven.hasClass(clicked) === true) {
        return true;
    }
     else if( $one.hasClass(clicked) === true && $five.hasClass(clicked) === true && $nine.hasClass(clicked) === true) {
        return true;
    }
    else if( $four.hasClass(clicked) === true && $five.hasClass(clicked) === true && $six.hasClass(clicked) === true) {
        return true;
    }
    else if( $two.hasClass(clicked) === true && $five.hasClass(clicked) === true && $eight.hasClass(clicked) === true) {
        return true;
    }
    else if( $seven.hasClass(clicked) === true && $eight.hasClass(clicked) === true && $nine.hasClass(clicked) === true) {
        return true;
    }
    else if( $three.hasClass(clicked) === true && $six.hasClass(clicked) === true && $nine.hasClass(clicked) === true) {
        return true;
    }
    else if( $three.hasClass(clicked) === true && $five.hasClass(clicked) === true && $seven.hasClass(clicked) === true) {
        return true;
    } else {
        return false; 
    }
}

//function for reset button... for class box remove player1clicked player2clicked unavailable and put back class available
const resetButton = () => {
    $('.box').removeClass('player1clicked player2clicked unavailable');
    $('.box').addClass('available');
    $('.box').html('');
    $winner.html('');
    $winner.css('visibility', 'hidden');
    console.log(board)
    board.board = [['_','_','_'], ['_','_','_'], ['_','_','_']];
    console.log(board)
}

//event handlre to put function resetButton on clicking the #reset
$reset.on('click', function (){
    resetButton();
});










