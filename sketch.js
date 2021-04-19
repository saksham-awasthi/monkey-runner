var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstaclesImage;
var bananaGroup, obstaclesGroup;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaclesImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  monkey = createSprite(75,322,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.08;
  
  ground = createSprite(400,350,900,10);
  
  
  
  
  bananaGroup = createGroup();
  obstaclesGroup = createGroup();
  
  survivalTime = 0;

  
}


function draw() {
  background("lightBlue");
  textSize(20);
  fill("black");
  text("Survival time:" + survivalTime,100,50);
  
  if(gameState === PLAY){
    
    ground.velocityX = -(4 + 2* survivalTime/10);
    survivalTime = Math.ceil(frameCount/frameRate());
    
    if(ground.x < 0){
    ground.x = ground.width/2;
  }
    if(keyDown("space")){
      monkey.velocityY = -15;
    }
    
    ground.x = ground.width/2;
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(monkey.isTouching(obstaclesGroup)){
      gameState = END;
    }
    
    spawnObstacles();
    spawnBanana();
  }
  else if(gameState === END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    if(keyDown("space")){
      reset();
    }
    textSize(40);
    fill("red");
    text("GAMEOVER",80,120);
    textSize(20);
    text("Press ''space'' to restart" ,95,140);
  }
  
    
  monkey.collide(ground);
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  survivalTime = 0;
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
}

function spawnObstacles(){
  if(frameCount % 120 === 0){
    obstacle = createSprite(400,328,20,20);
    obstacle.addImage("obstacle",obstaclesImage);
    obstacle.velocityX = -(3 + survivalTime/20);
    obstacle.scale = 0.15;
    obstacle.lifetime = 100;
    obstaclesGroup.add(obstacle);
  }
}

function spawnBanana(){
  if(frameCount % 80 === 0){
    banana = createSprite(380,200,20,20);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(3 + survivalTime/20);
    banana.lifetime = 100;
    bananaGroup.add(banana);
    
  }
}




