const GAME_STATES = {
  MainMenu: "MainMenu",
  InGame: "InGame"
};

function GameManager(state) {
  this.state = state || GAME_STATES.MainMenu;
};

GameManager.prototype.write = function() {
  console.log("Game state: " + this.state);
};