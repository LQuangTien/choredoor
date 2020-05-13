var door1 = document.getElementById("door1");
var door2 = document.getElementById("door2");
var door3 = document.getElementById("door3");
var robot = "./images/robot.svg";
var beach = "./images/beach.svg";
var space = "./images/space.svg";
var close = "./images/closed_door.svg";
var randomDoor1, randomDoor2, randomDoor3;
var numberOfClick = 3; 
var startButton = document.getElementById("start");
var isPlaying = true;
var currentScore = document.getElementById("score");
var highestScore = document.getElementById("highestScore");
var score = 0;
var highest = 0;


door1.onclick = function(){
  // door1.src = "http://127.0.0.1:8080/images/closed_door"
  // cant use to compare with other image path
  // url will solve it
  let url = new URL(door1.src);
  // url.pathname = /images/closed_door
  url = "." + url.pathname;
  if(!isClicked(url) && isPlaying){
    door1.src = randomDoor1;
    let url2 = new URL(door1.src);
    url2 = "." + url2.pathname;
    click(url2);
  }
}
door2.onclick = function(){
  let url = new URL(door2.src);
  url = "." + url.pathname;
  if(!isClicked(url) && isPlaying){
    door2.src = randomDoor2;
    let url2 = new URL(door2.src);
    url2 = "." + url2.pathname;
    click(url2);
  }
}
door3.onclick = function(){
  let url = new URL(door3.src);
  url = "." + url.pathname;
  if(!isClicked(url) && isPlaying){
    door3.src = randomDoor3;
    let url2 = new URL(door3.src);
    url2 = "." + url2.pathname;
    click(url2);
  }
}

isClicked = function(url){
  if(url === close){
    return false;
  }
  return true;
}
click = function(url){
  numberOfClick--;

  //win and lose condition
  if(numberOfClick === 0){
    endGame('win');
  } else if (isRobot(url)){
    endGame('lose');
  }
}
isRobot = function(url){
  if(url === robot){
    return true;
  }
  return false;
}
endGame = function(status){
  isPlaying = false;
  if(status === 'win') {
    startButton.textContent = 'Win !!!!! Play again ?';

    score++;
    currentScore.textContent = score;
    if(score > highest){
      highest++;
      highestScore.textContent = highest;
    }
  } else {
    startButton.textContent = 'Oh no, bad luck !!!!! Play again ?';
    score = 0;
    currentScore.textContent = score;
  }
}
startButton.onclick = function(){
  if(!isPlaying){
    gameStart();
  }
}
gameStart = function(){
  makeDoorRandom();
  isPlaying = true;
  numberOfClick = 3;
  door1.src = close;
  door2.src = close;
  door3.src = close;
  startButton.textContent = 'Have fun';
}
makeDoorRandom = function(){
  let randomNumber = Math.round(Math.random()*5);
  const randomTypes = {
    0: [robot, beach, space],
    1: [robot, space, beach],
    2: [beach, robot, space],
    3: [beach, space, robot],
    4: [space, robot, beach],
    5: [space, beach, robot],
  }

  let type = randomTypes[randomNumber];

  randomDoor1 = type[0];
  randomDoor2 = type[1];
  randomDoor3 = type[2];
}
gameStart();
