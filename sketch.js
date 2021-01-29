var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground, groundImg, invisibleGround;

var obstaclesGroup, obstacle, obstacle1, obstacleImg;

var gameOver, gameOverImg, restart, restartImg;

var girl, girlImg, zombie, zombieImg;

var score = 0;

function preload(){
   gameOverImg = loadImage("code/gameOver.jpg");
   resartImg = loadImage("code/restart.jpeg");
   //zombieImg = loadImage("code/ZombieRunningGIF.gif");
   //girlImg = loadImage("code/GirlRunningGIF.gif");
   groundImg = loadImage("code/groundTwo.jpeg");
   obstacleImg = loadImage("code/obstacle.png");
}

function setup(){
    createCanvas(500, 500);
    
    ground = createSprite(0, 0, 600, 10);
    ground.shapeColor("white");
    ground.addImage(groundImg);
    image(groundImg, 50, 50)
    ground.scale = 1.4;

    girl.createSprite(300, 420, 600, 10);
    //girl.addAnimation(girlImg);
    //girl.addImage();
    girl.scale = 0.2;

    zombie.createSprite(50, 400, 600, 10);
    //zombie.addAnimation(zombieImg);
    //zombie.addImage();
    zombie.scale = 0.2;

    invisibleGround = createSprite(300, 450, 600, 10);
    invisibleGround.visible = false;

    gameOver = createSprite(300, 110);
    gameOver.addImage(gameOverImg);

    restart = createSprite(300, 190);
    restart.addImage(restartImg);

    obstaclesGroup = new Group();

    score = 0;

}

function  draw(){
    background("white");

    girl.velocityY = girl.velocityY + 0.8;
    girl.collide(invisibleGround);

    zombie.velocityY = zombie.velocity + 0.8;
    zombie.collide(invisibleGround);

    if(gameState === PLAY){
        gameOver.visible = false;
        restart.visible = false; 
        score = score + Math.round(getFrameRate()/60);

        spawnObstacles();
        if(obstaclesGroup.isTouching(zombie)){
            zombie.velocityY = -12;
        }
    ground.velocityX = -(4 + 3* score/100);

    if(ground.x < 0){
        ground.x = ground.width/2;
    }

    }

    if((keyDown("UP_ARROW")&& girl.y >= 220)){
        girl.velocity = -12;
    }

    if(girl.isTouching(obstaclesGroup)){
        gameState = END;
    }

    if(gameState === END){
        gameOver.visible = true;
        restart.visible = true;
        ground.velocityX = 0;
        girl.velocityY = 0;
        //girl.changeImage();
        //zombie.changeAnimation();
        zombie.x = girl.x;
        
    }
    
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityEach(0);
    
    if(mousePressedOver(restart)){
        reset();
    }
    
    drawSprites();
    fill("lightpink");
    textSize(20);
    text("Score = "+ score, 500, 50);
}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    //girl.changeAnimation();
    obstaclesGroup.destroyEach();
    score = 0;
    zombie.x = 50;
}

function spawnObstacles(){
    if(frameCount % 60 === 0){
        var obstacle = createSprite(600, 460, 10, 50);
        obstacle.velocityX = -6

        //generate randome obstacle
        var rand = Math.round(random(1, 6));
        obstacle.addImage(obstacleImg);
        obstacle.scale = 0.1;
        obstaclesGroup.add(obstacle);
        obstacle.setCollider("circle", 0, 0, 1);
    }
}
    


