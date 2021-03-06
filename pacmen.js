//Start the position off at zero//
var pos = 0;

//Set the values for the screen height and width
const screenHeight = window.innerHeight;
const screenWidth = window.innerWidth;

//Store the images of the Pacmen in an array//
const pacArray = [
  ["PacMan1.png", "PacMan2.png"],
  ["PacMan3.png", "PacMan4.png"],
];

// this variable defines what directions should PacMan go into:
// 0 = (left to right) & (top to bottom)
// 1 = (right to left) & (bottom to top)
let directionX = true;
let directionY = true;

//This array will hold all the Pacmen for each time one is added//
const pacMen = []; // This array holds all the pacmen

//This function generates a random number for the x and y properties of this object//
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

//This function is a Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  // Velocity & Position are set to random values
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById("game"); //This sets element variable 'game' = to the <div /> tag
  let newimg = document.createElement("img"); //This creates the <img /> tag

  // This sets up the styling of the new <img /> tag (Position, src image, and the width)
  newimg.style.position = "absolute";
  newimg.src = "PacMan1.png";
  newimg.width = 100;

  // set position here from the position object x (left) and y (top)
  newimg.style.left = position.x;
  newimg.style.top = position.y;

  // add new Child image to game
  game.appendChild(newimg);

  // return details in an object

  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  //For each item in the pacMen array (Check the Collisions with the side walls)
  pacMen.forEach((item) => {
    //Call the function to check the sidewall collision
    checkCollisions(item);
    //This increases the x,y position values by adding the items current
    //position to the items velocity value (x & y)
    //This is based off of whether the direction is 1 or 0

    item.position.x += item.velocity.x;

    item.position.y += item.velocity.y;

    //This sets the style property for left and top to the new increased
    //value for the x,y positions (aka: moving the image from one spot to another)
    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  //This reruns the update function every .002 seconds
  setTimeout(update, 20);
}

function checkCollisions(item) {
  //This will run once for each item in the pacMan Array
  if (
    item.position.x + item.velocity.x + item.newimg.width > screenWidth ||
    item.position.x + item.velocity.x < 0
  )
    item.velocity.x = -item.velocity.x;

  if (
    item.position.y + item.velocity.y + item.newimg.height > screenHeight ||
    item.position.y + item.velocity.y < 0
  )
    item.velocity.y = -item.velocity.y;
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}
