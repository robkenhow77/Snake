var screenRows = 15;
var screenColumns = 30;
var totalPixels = screenRows*screenColumns;
var direction =[1,0]; //[x,y] positive right and down. Top starts on 1. Left starts on 0.
var directionChange = [1,0];
var snakeX = [3,2,1];
var x = 0;
var snakeY = [7,7,7]
var y = 0;
var positions =[[3,7],[2,7],[1,7]];
var snail = 160;
var snake = 100;
var lightning = 40;
var score = 0;
var appleX =   Math.floor(Math.random()*screenColumns);
var appleY =   1+ Math.floor(Math.random()*(screenRows-1));
var apple = [appleX,appleY];
var pause = true;
var gameOver = false;
var speed;



startScreen();

function startScreen(){     //Creates css for home screen


$(".screen").css("display","flex");
$(".screen").css("align-items","center");
$(".screen").css("flex-direction","column");
$(".screen").css("width","400px");

var game = setInterval(dot,speed);
clearInterval(game);

}


function makeGame(){        //Creates css and html for main game screen. Removes home screen css

// Creates the css grid template and html div blocks 
$(".screen").css("display","grid");
$(".screen").css("align-items","");
$(".screen").css("flex-direction","");
$(".screen").css("width","");
$(".screen").css("grid-template-columns","repeat("+screenColumns+", 1fr)");
$(".screen").css("grid-template-rows","repeat("+screenRows+", 1fr)");
$(".screen").children().remove();

for (let i = 0; i <totalPixels;i++){
    $(".screen").append("<div></div>");
}
game = setInterval(dot,speed);

//Apple is randomly spawned in
$(".screen").children().eq(positionFunc(apple[0], apple[1])).html("<img src='apple.svg' alt=''></img>");



}


function positionFunc(column, row){ //function to convert coordinate position to div list position 
    return ((row-1)*screenColumns)+column;
}


function dot(){
   

    if (validDirection()===true){   //prevwnts 180º turns
        direction = directionChange;
    }
    
    x = snakeX[0];      //adds a new position to the array and removes the last position 
    x += direction[0];
    snakeX.unshift(x);
    snakeX.pop();
    

    y = snakeY[0];  //adds a new position to the array and removes the last position 
    y += direction[1];
    snakeY.unshift(y);
    snakeY.pop();
   
    
    positions.unshift([snakeX[0],snakeY[0]]);   //adds a new position to the array 

    
    if (positions[0].toString()===apple.toString()) {   //if the head of the snake lands on an appple then the score is increased, length is increased, and apple spawns in a random place
        $(".screen").children().eq(positionFunc(apple[0], apple[1])).html('');
        appleX = Math.floor(Math.random()*screenColumns);
        appleY = 1 + Math.floor(Math.random()*screenRows);
        apple = [appleX,appleY];
        $(".screen").children().eq(positionFunc(apple[0], apple[1])).html("<img src='apple.svg' alt=''></img>");
        score +=1;
        
    } else {
        positions.pop();
        
    }
    

    //Failures

    if(positions[0][0]>screenColumns ||positions[0][0]<0 || positions[0][1]<0 ||positions[0][1]>screenRows){    //if the snake goes out the boundary
        clearInterval(game);
        end();
    }
    

    for(let i=0;i<positions.length-1;i++){  //if the snake eats itself
        
        if(positions[0].toString() === positions[i+1].toString()){
            clearInterval(game);
            end();
        }
        }

   
    //Color all white
    $(".screen").contents().css("background-color","white");       //each itteration every square is coloured white and then every square is coloured black
    
    //Color snake black
    for (let i=0;i<positions.length;i++){
        let position = positionFunc(positions[i][0],positions[i][1]);
        $(".screen").children().eq(position).css("background-color","black");
        }
        
    
}


function end(){     // changes css for end screen
    $(".screen").children().remove();
    $(".screen").css("grid-template-columns","");
    $(".screen").css("grid-template-rows","");
    $(".screen").css("padding","10px 30px 10px 30px ");
    $(".screen").append("<h1>Score: "+score+"</h1>");
    $(".screen").append("<a href='https://robkenhow77.github.io/Snake'>Retry?</a>");



}


var key = document.addEventListener("keydown",function(event){ //control key event listeners
  
   if (event.key === 'w' && direction[1] !== 1) {
    directionChange = [0,-1];
    
   } else if(event.key === 's' && direction[1] !== -1){
    directionChange = [0,1];
    
   }else if(event.key === 'a' && direction[0] !== 1){
    directionChange = [-1,0];
    
   }else if(event.key === 'd' && direction[0] !== -1){
    directionChange = [1,0];
    
   }

})


var key = document.addEventListener("keydown",function(event){ // pause button 
    if(event.key === 'p' && pause === true){
            clearInterval(game);
        }
        
    
    else if(event.key === 'p' && pause === false){
        clearInterval(game);
        game = setInterval(dot,speed);
    }
    pause = !pause;


})


function validDirection(){      //prevents 180º turns
    if(directionChange[0]===direction[0] || directionChange[1]===direction[1]){
        return false;

    } else return true;
}


$("button").click(function(){   //sets speed/difficulty at the home screen
    if($(this).html() === "Snail"){
        speed = snail;

    } else if($(this).html() === "Snake"){
        speed = snake;
    }
     else if($(this).html() === "Lightning"){
        speed = lightning;
    }
    makeGame();
  
})
