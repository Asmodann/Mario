var Koopa = function (y, x, image) {
  var koopa = this;
  // Koopa hérite de Cell
  Cell.call(this, y, x, image);

  this.direction = 'left';
  this.sprites = 0;
  this.die = function() {
    // koopa met fin à son intervalle d'animations
    // koopa est retiré de la map
    nbKoopa -= 1;
    var index = map.map.indexOf(this);
    delete map.map[index];
    clearInterval(this.interval);
  };
  this.move = function () {
    // koopa se déplace en direction de direction s'il le peut
    // sinon il change de direction
    // si koopa recontre mario, mario meurt
    var posA = {x: this.x, y: this.y};
    if (this.direction === "left") {
      this.x -= 1;
      posA.x += 1;
    } else {
      this.x += 1;
      posA.x -= 1;
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
        if (entity.immortal.state) {
          this.die();
        } else {
          entity.takeDamage();
        }
      }
    }

    this.sprites += 1;
    if (this.sprites > 1) {
      this.sprites = 0;
    }
  };
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
    koopa.fall();
    koopa.move();
    koopa.update();
  }, 200);
}