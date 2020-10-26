var dog,dogimage, happyDog;
var foodS, foodStock;
var database; 

function preload()
{
  dogimage = loadImage("dog.png");
  happyDog = loadImage("happyDog.png");
}

function setup() 
{
  database = firebase.database();
  
  createCanvas(500,500);
 
  
  dog = createSprite(225,225,10,10);
  dog.addImage(dogimage);
  dog.scale=0.2;
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
}

function draw() 
{  
  background(46, 139, 87);
 if(keyWentDown(UP_ARROW))
 {
    writeStock(foodS);
    dog.addImage(happyDog);
 }
  
  drawSprites();
  textSize(11);
  fill("black");
  //stroke(2);
  text("NOTE : Press UP_ARROW to feed the dog milk!",150,20);
  text("Food Count: "+foodS,200,140);
  
}

function readStock(data)
{
  foodS=data.val();
}

function writeStock(x)
{if(x<=0)
  {
    x=0
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}
