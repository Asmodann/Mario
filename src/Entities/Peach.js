var Peach = function(y, x, image) {
  Cell.call(this, y, x, image);

  this.fall = function () {
    // koopa se déplace d'une cellule vers le bas s'il le peut
    var entity;
    this.y += 1;
    if (entity = map.checkCollision(this)) {
      if (entity instanceof Cell) {
        this.y -= 1;
      }
    }
  };

  this.interval = setInterval(function () {
    this.fall();
    this.update();
  }.bind(this), 200);
};