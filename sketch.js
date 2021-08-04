var astronaut, astronaut_Running, astronautCollided;

var moon, moon_Image, invis;

var score = 0;

var rock,rockImg,rockImage;

var rockGroup;

var PLAY = 1;
var END = 0;

var gameState = PLAY;

function preload(){
  
  astronaut_Running = loadAnimation("astro-0.png","astro-1.png","astro-2.png","astro-3.png","astro-4.png","astro-0.png");
  
  astronautCollided = loadImage("astro-10.png");
  
  moon_Image = loadImage("moon2.png");
  
  rockImg = loadImage("c3.png");
  rockImage = loadImage("c4.png");
  
}

function setup() {
 createCanvas(displayWidth/2,displayHeight/2);
  
  astronaut = createSprite(75,displayHeight - 700,20,20);
  astronaut.addAnimation("astronaut",astronaut_Running);
  astronaut.scale = .5;
  astronaut.setCollider("circle",0,0,200);
  //astronaut.debug = true;
  
  moon = createSprite(1000,150);
  moon.addImage("moon",moon_Image);
  moon.scale = .4;
  moon.velocityX = -(6 + 3*score/100);

  invis = createSprite(300,displayHeight - 650,600,10);
  invis.visible = false;
  
  rockGroup = new Group();
}

function draw() {
 background(255);
  text("score: "+ score,20,displayHeight - 1000);
  
  astronaut.depth = moon.depth + 1;
  
  infinite();
  
  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
    
    if(keyDown("space") && astronaut.y>displayHeight-800){
      astronaut.velocityY = -12;
    }
    
    astronaut.velocityY = astronaut.velocityY+.8;
    
    astronaut.collide(invis);
    
    moon.velocityX = -(6 + 3*score/100);

    spawnrocks();
    
  }
  
  else if(gameState === END){
    moon.velocityX = 0;
    astronaut.velocityY = 0;
    astronaut.changeAnimation("astronaut",astronautCollided);
    rockGroup.setVelocityXEach(0);
    rockGroup.destroyEach();
    
    text("Press 'r' to restart",250,50);
  }
  
  if(astronaut.isTouching(rockGroup)){
     gameState = END;
    }
  
  if(gameState === END && keyDown("r")){
    gameState = PLAY;
  }
  
  camera.position.x = astronaut.x;
  camera.position.y = astronaut.y;

 drawSprites();
}

function infinite(){
  if(moon.x<145){
    moon.x = 290;
  }
}

function spawnrocks(){
  
  if(frameCount % 60 === 0){
    var rock = createSprite(600,displayHeight-665,10,40);
    
    rock.velocityX = -(6+3*score/100);
    
    var rand = Math.round(random(1,2));
      switch(rand){
        case 1: rock.addImage("rock",rockImg);
          rock.scale = .03;
            break;
        case 2: rock.addImage("rock2",rockImage);
          rock.scale = .2;
            break;
        default: break;
    }
    rock.lifetime = 300;
    rockGroup.add(rock);
  }

}

function reset (){

}