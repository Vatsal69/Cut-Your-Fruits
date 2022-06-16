//Game States
var PLAY=1;
var END=0;
var WIN=4;
var WELCOME=2;
var RULES=3;
var gameState=2;

var lifes=5;
var heart;

var wall;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage,youWinPic,heart1,heart2,heart3,heart4,heart5;
var gameOverSound ,knifeSwoosh,youWin,die;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  youWinPic = loadImage("pngtree-neon-you-win-game-png-image_2966654-removebg-preview.png");
 heart1 = loadImage("1.png");
 heart2 = loadImage("2.png");
 heart3 = loadImage("3.png");
 heart4 = loadImage("4.png");
 heart5 = loadImage("5.png");

  gameOverSound = loadSound("mixkit-sad-game-over-trombone-471.mp3");
  knifeSwooshSound = loadSound("Knife-sound-effect.mp3");
die = loadSound("die.mp3");
  youWin = loadSound("mixkit-medieval-show-fanfare-announcement-226.wav");
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,100,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7

   heart=createSprite(4,4,400,40);
   heart.addImage(heart5);

    wall=createSprite(595,300,10,600);
wall.visible=false;

  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");

 

  if(gameState===WELCOME){
    textSize(30);    
    text("Welcome To Cut Your Fruit Game",75,200);
    
text("Only For Pc/Laptop",75,300);

text("Press Space To Continue",75,400);

    textSize(15);
    text("By Vasu",500,550);

    if (keyDown("Space")){
      gameState=RULES;
         }
  }

  if (gameState===RULES){
    textSize(25);
    text("Rules",250,50);

    textSize(15);
    text("1 You Have To Cut Fruits From Given Knife (Can Be Move From Your Mouse)",50,150); 
    text("2 All Fruits Will Give You 2 Points ",50,175);
    text("3 You Have 5 Lives",50,200);
    text("4 Lives Will Be Reduce When A Fruit Will Touch The Wall",50,225);
    text("5 Monsters Will Be Spawn After Few Seconds",50,250);
    text ("6 If Knife Touch The Monster, The game End",50,275);
    text("7 Game Also End When Lifes Is Equals To 0",50,300);
    text("8 You Win When You Score 50 Points",50,325);
    text("9 When You Win Or Lose, To Play Game Again,Press Ctrl+R Or Refresh Your Broswer",20,350);

    textSize(35);
    text("Press Enter To Continue",100,500);
    text("Good Luck!",200,550)

    textSize(20);
text("You Can Give FeedBack To",300,400); 
text("vasupanpalia@gmail.com",305,425);

    if (keyDown("Enter")){
      gameState=PLAY;
    }
  }
  
if(gameState===WIN){

  knife.addImage(youWinPic);
  knife.scale=1.5 
    knife.x=300;
  knife.y=200 ;

  textSize(20);
text("You Can Give FeedBack To",150,400); 
text("vasupanpalia@gmail.com",155,425);

}


  if(gameState===PLAY){

if(lifes===4){
  heart.changeImage(heart4);
}

if(lifes===3){
  heart.changeImage(heart3);
}

if(lifes===2){
  heart.changeImage(heart2);
}

if(lifes===1){
  heart.changeImage(heart1);
}

       //Display score
  textSize(25);
  text("Score : "+ score,50,50);
  text("Lifes : "+ lifes,400,50);

    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      
       knifeSwooshSound.play();
    
       score=score+2;

    }
    if (fruitGroup.isTouching(wall)){
      fruitGroup.destroyEach();
    
      die.play()
      lifes=lifes-1;
     }


    if (score===50){
        gameState=WIN;

        youWin.play();
    } 
     else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)||lifes===0){
;
        gameState=END;
        //gameover sound
        gameOverSound.play();

      }
        if(gameState===END){        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;

        
      }
    
    }
  }
  
  
  drawSprites();
 
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
    
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.x = 0    
  //Increase the velocity of fruit after score 4 

       fruit.velocityX= (7+(score/4));
           
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    fruit.x=50;

    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}