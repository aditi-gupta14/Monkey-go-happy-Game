var monkey, monkeyA;
var banana, bananaI, bananaY, bananaG;
var jungle, jungleI;
var stone, stoneI, stoneG;
var iGround;
var score, lifeTime;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, restartI, gameOver, gameOverI;

score = 0;
lifeTime = 3;

gameState = PLAY;

function preload(){
  
 monkeyA = loadAnimation("monkey_01.png", "monkey_02.png", "monkey_03.png", "monkey_04.png", "monkey_05.png", "monkey_06.png", "monkey_07.png", "monkey_08.png", "monkey_09.png", "monkey_10.png");
  
 bananaI = loadImage("banana.png"); 
 stoneI = loadImage("stone.png"); 
 jungleI = loadImage("jungle.jpg"); 
 restartI = loadImage("restart.jpg");
 gameOverI = loadImage("gameOver.jpg");
}

function setup() {
  createCanvas(600, 400);
  
   jungle = createSprite(300, 100, 600, 200);
  jungle.addAnimation("jungleImage", jungleI);
  jungle.scale = 1.5;
  jungle.velocityX = -6;
  jungle.x = jungle.width/2;
  
  monkey = createSprite(50, 320, 20, 20);
  monkey.addAnimation("monkeyAni", monkeyA);
  monkey.scale = 0.14;
  //monkey.debug = true;
  
  iGround = createSprite(300, 370, 600, 10)
  iGround.visible = false;

  gameOver = createSprite(300, 100, 20, 20);
  gameOver.addImage(gameOverI);
  gameOver.scale = 0.14;
  
  restart = createSprite(300, 260, 20, 20);
  restart.addImage(restartI);
  restart.scale = 0.15;
  
  bananaG = createGroup();
  stoneG = createGroup();
}

function draw() {
  
  background(255);
  
  if(gameState === PLAY){
    
    gameOver.visible = false;
    restart.visible = false;
    
  if(jungle.x < 0){
     jungle.x = jungle.width/2;
     }
  
  if(keyDown("space") && monkey.y > 295){
     monkey.velocityY = -16;
     }
  
  monkey.velocityY = monkey.velocityY + 0.8;
 
  if(bananaG.isTouching(monkey)){
  score = score + 2;
  bananaG.destroyEach();
  
    var size = Math.round(random(10, 40));

  switch (size){
    case 10: monkey.scale = 0.16;
      break;
        case 20: monkey.scale = 0.17;
      break;
        case 30: monkey.scale = 0.18;
      break;
        case 40: monkey.scale = 0.20;
      break;
  }
  
 }
  
  if(stoneG.isTouching(monkey)){
       monkey.scale = monkey.scale - 0.05;
       stoneG.destroyEach();
       lifeTime = lifeTime - 1; 
       score = score - 1;
  }
      
  spawnBanana();
  spawnObstacle();
  }
  
  if(gameState === END){
     
    
    gameOver.visible = true;
    restart.visible = true;
    
    jungle.destroy();
     monkey.destroy();
     bananaG.destroyEach();
     stoneG.destroyEach();
   }
  
    if(lifeTime === 0){
     gameState = END;
    }
  
  if(mousePressedOver(restart) && gameState === END){
     gameState = PLAY;
     
   jungle = createSprite(300, 100, 600, 200);
  jungle.addAnimation("jungleImage", jungleI);
  jungle.scale = 1.5;
  jungle.velocityX = -7;
  jungle.x = jungle.width/2;
  
  monkey = createSprite(50, 320, 20, 20);
  monkey.addAnimation("monkeyAni", monkeyA);
  monkey.scale = 0.14;

  iGround = createSprite(300, 370, 600, 10)
  iGround.visible = false;

  score = 0;
  lifeTime = 2;
  }
  
  
  monkey.collide(iGround);
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score,400,45);
  text("Lifetime:" + lifeTime,10,45); 
}

function spawnBanana(){
  if(frameCount % 60 === 0){
     
    bananaY = random(100, 280);
    banana = createSprite(600, bananaY, 20, 20);
    banana.addImage(bananaI);
    banana.scale = 0.06;
    banana.velocityX = -10;   
    banana.lifeTime = 60;
    bananaG.add(banana);
  }
}

function spawnObstacle(){
  if(frameCount % 110 === 0){
     
    stone = createSprite(600, 340, 20, 20);
    stone.addImage(stoneI);
    stone.scale = 0.2;
    stone.velocityX = -12;    
    stone.lifeTime = 50;
    stoneG.add(stone);
    //stone.debug = true;
  }
}

