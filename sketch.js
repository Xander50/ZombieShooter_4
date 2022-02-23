var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImage, zombieGroup
var heart1, heart2,heart3, heart1Image, heart2Image, heart3Image
var bullet, bullets = 70, bulletGroup
var gameState ="fight"
var score=0
var life = 3
var loseSound, winSound,shootingSound

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImage= loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  heart1Image=loadImage("assets/heart_1.png")
  heart2Image=loadImage("assets/heart_2.png")
  heart3Image=loadImage("assets/heart_3.png")
  loseSound=loadSound("assets/lose.mp3")
  winSound=loadSound("assets/win.mp3")
  shootingSound=loadSound("assets/explosion.mp3")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.setCollider("rectangle",0,0,300,300)

heart1 = createSprite(displayWidth-150,40,20,20)
heart1.visible=false
heart1.addImage(heart1Image)
heart1.scale=0.4

heart2 = createSprite(displayWidth-100,40,20,20)
heart2.visible=false
heart2.addImage(heart2Image)
heart2.scale=0.4

heart3 = createSprite(displayWidth-250,40,20,20)
heart3.addImage(heart3Image)
heart3.scale=0.4

   zombieGroup = new Group()
   bulletGroup = new Group()

}

function draw() {
  background(0); 


if(gameState=== "fight"){

  if(life === 3){
    heart3.visible=true
    heart2.visible=false
    heart1.visible=false
  }

  if(life === 2){
    heart3.visible=false
    heart2.visible=true
    heart1.visible=false
  }

  if(life === 1){
    heart3.visible=false
    heart2.visible=false
    heart1.visible=true
  }

  if(life === 0){
    gameState="lost"
    heart1.visible=false
    loseSound.play()
  }

  if(score===80){
    gameState="won"
    winSound.play()
  }

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}



//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet=createSprite(displayWidth-1150, player.y-30,20,10)
  bullet.velocityX=20
  bulletGroup.add(bullet)
  player.depth= bullet.depth
  player.depth= player.depth+2
  player.addImage(shooter_shooting)
  bullets=bullets-1
  shootingSound.play()
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if (bullets === 0){
  gameState="bullet"
  loseSound.play()
}

if(zombieGroup.isTouching(bulletGroup)){
  for(var i = 0;i < zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy()
      bulletGroup.destroyEach()
      score = score+2
    }
  }
}

if(zombieGroup.isTouching(player)){
  for(var i = 0;i < zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy()
      life=life-1
    }
  }
}
zombies()

}
drawSprites();

textSize(20)
fill("yellow")
text("bullets ="+ bullets,displayWidth-210,displayHeight/2-250)
text("score ="+ score,displayWidth-200,displayHeight/2-220)
text("lives ="+ life,displayWidth-200,displayHeight/2-280)

if(gameState==="lost"){
  textSize(100)
  fill("blue")
  text("You lost", 400,400)
  zombieGroup.destroyEach()
  player.destroy()
}

else if(gameState==="won"){
  textSize(100)
  fill("red")
  text("GG bois", 400,400)
  zombieGroup.destroyEach()
  player.destroy()
}

else if(gameState==="bullet"){
  textSize(70)
  fill("yellow")
  text("XDDD you ran out of bullets imagine", 300,410)
  zombieGroup.destroyEach()
  player.destroy()
  bulletGroup.destroyEach()
}

}

function zombies(){
  if(frameCount%50 === 0){
    zombie = createSprite(random(500,1100),random(100,400),40,40)
    zombie.addImage(zombieImage)
    zombie.scale=0.15
    zombie.velocityX= -3
    zombie.setCollider("rectangle",0,0,400,400)
    zombieGroup.add(zombie)
    zombie.lifetime=400
  }

}
