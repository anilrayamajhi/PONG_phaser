
// Create our 'main' state that will contain the game
var mainState = {
  preload: function() {
  // Load the ball sprite
  game.load.image('ball', 'assets/ball.png');
  game.load.image('boardR', 'assets/boardR.png');
  game.load.image('boardL', 'assets/boardL.png');
},

create: function() {
  // Change the background color of the game to blue
  game.stage.backgroundColor = '#ff0000';

  // Set the physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Display the ball at the position x=100 and y=245
  this.ball = game.add.sprite(100, 245, 'ball');
  this.boardL = game.add.sprite(0, 200, 'boardL');
  this.boardR = game.add.sprite(683, 200, 'boardR');
  // Add physics to the ball
  // Needed for: movements, gravity, collisions, etc.
  game.physics.arcade.enable(this.ball);
  game.physics.arcade.enable(this.boardR);
  game.physics.arcade.enable(this.boardL);

  // Add gravity to the ball to make it fall
  this.ball.body.velocity.x = 200;
  this.ball.body.velocity.y = 200;
  // Call the 'jump' function when the spacekey is hit
  this.keyUp = game.input.keyboard.addKey(Phaser.Keyboard.UP);
  this.keyDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

  this.upw = game.input.keyboard.addKey(Phaser.Keyboard.W);
  this.downs = game.input.keyboard.addKey(Phaser.Keyboard.S);
},

update: function() {
  // If the ball is out of the screen (too high or too low)
  // Call the 'restartGame' function
  if (this.ball.x < 0 || this.ball.x > 700){this.restartGame();}


// BOARD RIGHT
if(this.keyUp.isDown){
    this.boardR.body.velocity.y = -150;
}
else if (this.keyDown.isDown){
    this.boardR.body.velocity.y = 150;
    }
  else {
  this.boardR.body.velocity.y = 0;
  }


if(this.boardR.y < 0) {
   this.boardR.y = 1;
  }
else if(this.boardR.y > 360){
  this.boardR.y = 359;
}

if(this.ball.y < 7) {
  this.ball.body.velocity.y = 200;
}

else if (this.ball.y > 493) {
  this.ball.body.velocity.y = -200;
}


// BOARD LEFT
if(this.upw.isDown){
    this.boardL.body.velocity.y = -150;
}
else if (this.downs.isDown){
    this.boardL.body.velocity.y = 150;
    }


if(this.boardL.y < 0) {
   this.boardL.y = 1;
  }
else if(this.boardL.y >360){
  this.boardL.y = 359;
}



// COLLISION DETECTION
game.physics.arcade.overlap(
        this.ball, this.boardR, this.moveL, null, this);

game.physics.arcade.overlap(
                this.ball, this.boardL, this.moveR, null, this);

},


moveL: function () {
  this.ball.body.velocity.x = -200;
},

moveR: function () {
  this.ball.body.velocity.x = 200;
},

// Restart the game
restartGame: function() {
    // Start the 'main' state, which restarts the game
    game.state.start('main');
},
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(700, 500);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');
