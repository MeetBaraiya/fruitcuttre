var PLAY =  1;
var END = 0;
var gameState = 1;

var sword,swordImage,fruit1G,fruit2G,fruit3G,fruit4G;

var fruit,fruit1,fruit2,fruit3,fruit3,fruitGroup,gameOverImage;

var monster,monsterImage,moving,enemyGroup,sound;

var score;

function preload(){
  swordImage = loadImage ("sword.png");
  fruit1 = loadImage ("fruit1.png");
  fruit2 = loadImage ("fruit2.png");
  fruit3 = loadImage ("fruit3.png");
  fruit4 = loadImage ("fruit4.png");
  
  sound = loadSound ("knifeSwooshSound.mp3")
  monsterImage = loadAnimation ("alien1.png","alien2.png");
  
  gameOverImage = loadImage ("gameover.png");
}
function setup(){
  
  score = 0;
  
  createCanvas(600, 500);
 
  sword = createSprite (40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  fruit1G = new Group ();
  fruit2G = new Group ();  
  fruit3G = new Group ();
  fruit4G = new Group ();
  
  
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
}
function draw(){
background(0,213,255);
 
  
  if (gameState === PLAY){
   
  fruits();
  Enemy();
    
     sword.y = World.mouseY;
  sword.x = World.mouseX;
  if (fruitGroup.isTouching(sword)){
   fruitGroup.destroyEach();
   sound.play();
   score = score + 2;

 }   
 else 
  {//go to end state.
    
  if (enemyGroup.isTouching(sword)){
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    sword.addImage(gameOverImage);
    sword.x=200;
    sword.y=200;
    gameState = END;
    }
  
  }  
  
 }
  
  
  
  
   
 
 
  

   drawSprites();
  text (score,500,50);
  text ("score",465,50);
 
}
  
function fruits(){
  
  if (World.frameCount%80===0 ) {
     fruit = createSprite(400,200,20,20);
     fruit.scale = 0.2; 
    
     r = Math.round(random(1,4));
     if (r == 1) {
       fruit.addImage(fruit1);
     } else if (r == 2){
       fruit.addImage(fruit2);
     }else if ( r == 3 ){
       fruit.addImage(fruit3);
     }else   {
       fruit.addImage(fruit4);
     }
    
    fruit.y = Math.round(random(50,340));
    
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
     }
}


function Enemy (){
  if(World.frameCount%200===0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y = Math.round(round(100,300));
    monster.velocityX = -8;
    monster.setlifetime = 50;
    
    enemyGroup.add(monster);
  }
}