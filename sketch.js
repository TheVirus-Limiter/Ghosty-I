var PLAY = 1
var END = 0
var gameState = PLAY;
var tower, towerImg;
var door, doorImg, doorGrp;
var climber, climberImg, climberGrp;
var ghost, ghostImg, invisG, edges, invisB, invisBGrp;




function preload() {

  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png")
  climberImg = loadImage("climber.png")
  ghostImg = loadImage("ghost-standing.png");

}



function setup() {

  createCanvas(600, 600);



  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  doorGrp = new Group();
  climberGrp = new Group();
  invisG = createSprite(200, 250, 50, 10);
  invisG.lifetime = 60;


  ghost = createSprite(200, 200)
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
  invisG.visible = false;
  edges = createEdgeSprites();
  invisBGrp = new Group();
}


function draw() {

  background(0);

  ghost.bounceOff(edges[0]);
  ghost.bounceOff(edges[1]);
  ghost.bounceOff(edges[2]);

  if (gameState === PLAY) {

    if (tower.y > 401) {
      tower.y = 300;
    }
    ghost.collide(invisG);

    if (keyDown("space")) {
      //ghost.y = ghost.y - 5; 
      ghost.velocityY = -5;

    }

    if (keyDown(LEFT_ARROW)) {
      ghost.x = ghost.x - 3;

    }
    if (keyDown(RIGHT_ARROW)) {
      ghost.x = ghost.x + 3;

    }

    ghost.velocityY = ghost.velocityY + 0.8;
    ghost.collide(climberGrp);
    spawnDoors();

    if (climberGrp.isTouching(ghost)) {

      ghost.velocityY = 0;

    }

    if (invisBGrp.isTouching(ghost) || ghost.y > 600) {
      gameState = END;
      ghost.destroy();
      console.log("AAAA");


    }
    drawSprites();
  }

  if (gameState === END) {

    stroke("yellow");
    fill("yellow");
    textSize(40);
    text("You Lost :(", 200, 300);
  }
}


function spawnDoors() {
  if (frameCount % 300 === 0) {
    door = createSprite(200, -10);
    door.x = Math.round(random(150, 400));
    door.addImage("door", doorImg);
    door.velocityY = 1;
    doorGrp.add(door);
    door.lifetime = 700;
    climber = createSprite(200, -10)
    climber.addImage("climber", climberImg);
    climber.x = door.x;
    // climber.y = door.y;
    climber.y = climber.y + 50;
    climber.velocityY = 1;
    climberGrp.add(climber)
    climber.lifetime = door.lifetime;
    climber.depth = door.depth;
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    invisB = createSprite(door.x, climber.y + 10, climber.width, 10);
    invisB.velocityY = 1;
    invisB.lifetime = climber.lifetime;

    invisB.visible = false;
    invisBGrp.add(invisB);

  }

}