//Create variables here
var foodStock
var happyDog, dog, foodS, database, dogSad
var happyDogSprite, sadDogSprite, dogSprite
foodS = 20

function preload()
{

  happyDog = loadImage('images/dogImg1.png')
  dogSad = loadImage('images/doggo.jpg')
  dog = loadImage('images/dogImg.png')
 
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database()
  dogSprite = createSprite(250, 250, 1, 1)

  dogSprite.addImage(dog)
  foodStock = database.ref('food')
  foodStock.on('value', readStock, showError)
}


function draw() {  

  background(46, 139, 87)

  if(keyWentDown(UP_ARROW)){

    writeStockNegative(foodS)
    dogSprite.addImage(happyDog)

  }
  if(keyWentDown(32)){

    writeStockPositive(foodS)
    dogSprite.addImage(happyDog)

  }

  if(foodS === 0){

    dogSprite.addImage(dogSad)

  }
  drawSprites();
  //add styles here

}

function writeStockNegative(x){

  if(x<=0){
    //nothing
  }
  else{
    x -= 1
  }
    database.ref('/').set({

      food: x
    })
  
}

function writeStockPositive(x){

  x += 1
  
  database.ref('/').set({

    food: x
  })
  
}

function readStock(data){

  foodS = data.val()

}

//if we get errors but i won't get none cuz i am master programmer 
function showError(){

  console.log('error in writing the value in database')
}