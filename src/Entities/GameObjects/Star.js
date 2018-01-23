var Star = function(y, x, image) {
  Cell.call(this, y, x, image);
  this.direction = 'right';

  this.move = function() {
    var posA = {x: this.x, y: this.y};
    if (this.direction === "left") {
      this.x -= 1;
    } else {
      this.x += 1;
    }

    var entity;
    if (entity = map.checkCollision(this)) {
      if (entity instanceof Cell) {
        if (this.direction === "left") {
          this.direction = "right";
        } else {
          this.direction = "left";
        }
        this.x = posA.x;
      } else if (entity instanceof Mario) {
        entity.immortal.state = true;
        entity.immortal.duration = 100;
        this.die();
      }
    }
  };

  this.fall = function () {
    // L'étoile se déplace d'une cellule vers le bas s'il le peut
    var entity;
    this.y += 1;
    if (entity = map.checkCollision(this)) {
      if (entity instanceof Cell) {
        this.y -= 1;
      }
    }
  };

  this.die = function() {
    // L'étoile met fin à son intervalle d'animations
    // L'étoile est retiré de la map
    var index = map.map.indexOf(this);
    delete map.map[index];
    clearInterval(this.interval);
  };

  this.interval = setInterval(function() {
    this.fall();
    this.move();
    this.update();
  }.bind(this), 200);
};