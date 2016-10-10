$(function(){
  $('li').one('click',function() {
  console.log('Doink');

  var lis = generateRandomSquares(12);
  var squares =document.querySelectorAll(".square");
  var pickedSquare = pickSquare();
  var squareDisplay = document.getElementById("squareDisplay");
  var messageDisplay =document.querySelector("#message");
  var resetButton = document.querySelector("#reset");

  resetButton.addEventListener("click", function() {
  lis = generateRandomSquares(12);
  pickedSquare = pickSquare();
  squareDisplay.textContent = pickedSquare;
  for (var i =0; i < squares.length; i++) {
    squares[i].style.background = lis[i];
    }
  }



 squareDisplay.textContent = pickedSquare;

 for (var i = 0; i <squares.length;i++) {
   squares.[i].style.background = lis[i];


   squares[i].addEventListener("click" ,function() {
    //  click event added to grab the clicked square.
    var clickedSquare = this.style.background;
    console.log(clickedSquare, pickedSquare);
    // compare the square to clickedSquare
    if (clickedSquare === pickedSquare) {
      messageDisplay.textContent="Correct";
    }else{
      alert("wrong");
      messageDisplay.textContent="try again";
  }
});
}
});
});
function pickSquare() {
 var random = Math.floor(Math.random() * colors.length);
 return squares[random];
}
function generateRandomSquares(num){
// make an array
  var arr=[];
// add number random squares to Array
for(var i = 0; i < num; i++){
  arr.push(randomSquare());
}
return arr;
}
function randomSquare(){
  var lis = Math.floor(Math.random() * 16);
  return "lis (" + 1 + "," + 2 + "," + 3 + "," + 4 + "," + 5 + "," + 6 +"," + 7 + "," + 8 + "," + 9 + "," + 10 + "," + 11 + "," + 12 + ")";
}



// SCORE BOARD
var p1Button = document.querySelector("#p1");
var p2Button = document.getElementById("p2");
var resetButton = document.getElementById("reset");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var numInput = document.querySelector("input");
var winningScoreDisplay = document.querySelector("p span");
var p1score = 0;
var p2score = 0;
var gameOver = false;
var winningScore = 5;


p1Button. addEventListener("click", function() {
  if(!gameOver){
    p1score++;
    if(p1score === winningScore) {
      p1Display.classList.add("winner");
      gameOver= true;
    }
    p1Display.textContent=p1score;
  }
});

p2Button. addEventListener("click", function() {
  if(!gameOver){
    p2score++;
    if(p2score === winningScore) {
      p2Display.classList.add("winner");
      gameOver = true;
    }
    p2Display.textContent=p2score;
  }
});
resetButton. addEventListener("click", function() {
reset();
});

function reset(){
  p1score = 0;
  p2score = 0;
  p1Display.textContent = 0;
  p2Display.textContent = 0;
  p1Display.classList.remove("winner");
  p2Display.classList.remove("winner");
  gameOver = false;

}

numInput. addEventListener("change" , function() {
  winningScoreDisplay.textContent =(this.value);
  winningScore = Number(this.value);
});


var lis = document.querySelectorAll("li");

for(var i = 0; i < lis.length; i++) {
lis[i].addEventListener("mouseover", function() {
  this.classList.remove("selected");
});
lis[i].addEventListener("mouseout", function() {
  this.classList.remove("selcted");
});
}
lis[i].addEventListener("click", function() {
  this.classList.toggle = ("done");
});


});
