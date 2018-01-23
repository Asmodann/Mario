var Balloon = function(y, x, image) {
  Cell.call(this, y, x, image);

  this.fly = function() {
    var posA = {x: this.x, y: this.y};
    this.y -= 1;

    var entity;
    if (entity = map.checkCollision(this)) {
      if (entity instanceof Cell) {
        this.y = posA.y;
      }
    }
  };
  this.move = function() {
    var posA = {x: this.x, y: this.y};
    this.x -= 1;

    var entity;
    if (entity = map.checkCollision(this)) {
      if (entity instanceof Cell) {
        this.x = posA.x;
      } else if (entity instanceof Mario) {
        entity.hasBalloon = true;
        this.die();
      }
    }
  };

  this.interval = setInterval(function() {
    this.fly();
    this.move();
  }.bind(this), 200);
};