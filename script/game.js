/**
 * File game.js
 * implemented by Adelino Lobão
 * 14/01/2012
 */

/**
 * Draw the window game
 */
var drawWindow = function() {
 	context.fillStyle = '#000';
	context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
	context.beginPath();
	context.rect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
	context.closePath();
	context.fill();
}

/**
 * Create an horde of enemies, the horde is divided in columns and rows
 * @param numRows - indicate the number of rows
 * @param numCols - indicate the number of columns
 */
var createEnemies = function(numRows, numCols) {
	//reference position xx
	var refPosX = (WINDOW_WIDTH / 2); 
	//reference position yy
	var refPosY = (WINDOW_HEIGHT / 4);
	//add enemies horde
	for(var x = 0;  x < numRows; ++x) {
		for(var y = 0; y < numCols; ++y) {
			//position xx
			var posX = refPosX + (40 * x);
			//position yy
			var posY = refPosY + (40 * y);
			//add an enemy to the array
			enemies[enemies.length] = new Enemy(posX, posY);
		}
	}
}

/**
 * Animate elements
 */
var animate = function() {
	//iterate through all the lasers
	for(index in lasers) {
		//draw laser
		lasers[index].draw();
		//simulate one step
		if(lasers[index].step()){
			lasers.splice(index, 1);
		}
	}
	//iterate through all the enemies
	for(index in enemies) {
		//draw enemy
		enemies[index].draw();
	}
}

/**
 * Run the game
 */
var runGame = function() {
 	//draw the window game
 	drawWindow();
 	//draw the player
	player.draw();
	//animate all the elements
	animate();

	console.log(lasers.length);

	//set timeout function
	gameLoop = setTimeout(runGame, intervalTime);
}

//window width
const WINDOW_WIDTH = 600;
//window height
const WINDOW_HEIGHT = 800;
//frame rate
const FRAME_RATE = 50;

//game loop
var gameLoop;
//interval time
var intervalTime = 1000 / FRAME_RATE;

//get frame window
var frameWindow = document.getElementById("content");
//frame window width
frameWindow.width = WINDOW_WIDTH;
//frame window height
frameWindow.height = WINDOW_HEIGHT;
//get context
var context = frameWindow.getContext("2d");

//keyhandler object
var keyHandler = new KeyHandler();
//player object
var player = new Player();
//array that store the lasers
var lasers = new Array();
//array that store the enemies
var enemies = new Array();

//add enemies
createEnemies(6, 4);

//handle events when the a key is pressed
document.onkeypress = function(e){
	keyHandler.keyPress(e);	
}

//run the game
runGame();