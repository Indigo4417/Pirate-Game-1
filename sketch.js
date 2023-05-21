var bg, bgImg
var bottomGround
var topGround
var captain, captainImg
var enemy, enemyImg, enemy2, enemy2Img, enemyGroup, obstacles
var ship1, ship2
var cannonball, cannonballImg, specialCannonball, specialCannonballImg, fire, fireImg, fire2Img;
var specialProjectilesGroup, obstaclesGroup, fireGroup, cannonballGroup
var shoot = 0

function preload() {
  bgImg = loadImage("assets/Rough sea.jpg");
  captainImg = loadImage("assets/Pirate-Ship-4.png");

  enemyImg = loadImage("assets/Pirate-Ship-2.png");
  enemy2Img = loadImage("assets/Pirate-Ship-5.png");

  cannonballImg = loadImage("assets/Cannonball.png")
  specialCannonballImg = loadImage("assets/Cannonball Special.png");
  cannonballPillImg = loadImage("assets/Cannonball pill.png");
  fireImg = loadImage("assets/Flame.png");
  fire2Img = loadImage("assets/Flame2.png");

  seaRock1Img = loadImage("assets/Sea rock 1.png");
  seaRock2Img = loadImage("assets/Sea rock 2.png");
  seaRock3Img = loadImage("assets/Sea rock 3.png");

}

function setup() {

  createCanvas(windowWidth, windowHeight);
  //background image
  bg = createSprite(width / 2, height / 2, width, height);
  bg.addImage("bg", bgImg);
  bg.scale = 6.2;
  //creating top and bottom grounds 
  captain = createSprite(width / 2, height / 2 + 250, 200, 70);
  captain.addImage("captainPlayer", captainImg);
  captain.scale = 0.8;

  //creating balloon     
  specialProjectilesGroup = new Group();
  cannonballGroup = new Group();
  enemyGroup = new Group();
  obstaclesGroup = new Group();
  fireGroup = new Group();

}

function draw() {

  background("cyan");



  if (keyIsDown(LEFT_ARROW) && captain.x > 100) {
    captain.x -= 5;
  }

  if (keyIsDown(RIGHT_ARROW) && captain.x < width - 100) {
    captain.x += 5;
  }

  shoot -= 1;
  if (keyDown("o") && shoot < 510) {
    cannonballShoot();
  }
  
  shoot -= 1;
  if (keyDown("i") && shoot < 510) {
    specialProjectilesShoot();
  }

  if (keyDown("p")) {
    createFIre();
  }
   
  //create new hot keys
  //change cannonball image
  //create fire function
  //create special fire ball function

  createObstacles();


  drawSprites();
  text("x: " + mouseX + "y: " + mouseY, mouseX, mouseY)

}

function cannonballShoot() {
  cannonball = createSprite(captain.x, captain.y, 20, 20);
  cannonball.velocityY = - 8;
  cannonball.addImage("cannonball", cannonballImg);
  cannonball.scale = 0.1;
  console.log(cannonball.y);
  shoot = cannonball.y;
  cannonballGroup.add(cannonball);
}

function specialProjectilesShoot() {
  specialCannonball = createSprite(captain.x, captain.y, 20, 20);
  specialCannonball.velocityY = - 8;
  specialCannonball.addImage("specialCannonball", specialCannonballImg);
  specialCannonball.scale = 0.07;
  console.log(specialCannonball.y);
  shoot = specialCannonball.y;
  specialProjectilesGroup.add(specialCannonball);
}

function createObstacles() {
  if (frameCount % 150 === 0) {
    var x = Math.round(random(500, width -500));
    obstacles = createSprite(x, -100);
    obstacles.velocityY = 8.5;

    var r = Math.round(random(1, 3));
    switch(r) {
      case 1: obstacles.addImage("seaRock1", seaRock1Img);
      obstacles.scale = 0.09;
      break;
      case 2: obstacles.addImage("seaRock2", seaRock2Img);
      obstacles.scale = 0.28;
      break;
      case 3: obstacles.addImage("seaRock3", seaRock3Img);
      obstacles.scale = 0.09;
      break; 
    }
    obstaclesGroup.add(obstacles);
  }
}

function createFIre() {
  fire = createSprite(captain.x-107, captain.y, 160, 400);
  fire2 = createSprite(captain.x+124, captain.y, 160, 400);
  fire.addImage("fire", fireImg);
  fire2.addImage("fire2", fire2Img);
  fire.scale = 0.3;
  fire2.scale = 0.3;
  fireGroup.add(fire);
  //console.log("Created");
}

function burnCannonball() {
  if (fire.isTouching(cannonball)) {
    cannonball.destroy();
  }
}

function burnObstacles() {
  if (obstacles.isTouching(fire)) {
    obstacles.destroy();
  }
}

//cannonball.destroy()

function mousePressed() {
  console.log(mouseX, mouseY);
}