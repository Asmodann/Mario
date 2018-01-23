var Mario = function (y, x, image) {
  var mario = this;
  // Mario hérite de Cell
  Cell.call(this, y, x, image);

  this.falling = false;
  this.input = new Input(['ArrowLeft', 'ArrowRight', 'Space']);
  this.jump = {
    power: 0, // hauteur du saut en nombre de cellules
    interval: null // identifiant de l'intervalle de temps entre chaque animations du saut
  };
  this.lifeState = 1;
  this.damageTime = 0;
  this.sprites = {
    stand: 5,
    jump: 4,
    walk: 2
  };
  this.direction = 0;
  this.action = "stand";
  this.hasBalloon = false;
  this.immortal = {
    state: false,
    duration: 100
  }
  this.makeJump = function () {
    // mario monte d'une case s'il le peut et s'il lui reste du power
    // s'il ne le peut pas, il met fin à l'intervalle de temps entre chaque animation du saut
    // mario met à jour le dom à chaque animation de saut
    // si mario saute dans un koopa, il meurt
    var posT = this.y;
    if (this.jump.power > 0) {
      this.y -= 1;
      this.jump.power -= 1;
    }

    var entity;
    if (entity = map.checkCollision(this)) {
      if (entity instanceof Cell || entity instanceof Brick) {
          this.y = posT;
          this.jump.power = 0;
      } 
      if (entity instanceof Brick) {
        entity.replace();
      } else if (entity instanceof Koopa) {
        this.die();
      }
    }
    this.action = "jump";
  };
  this.fall = function () {
    // mario se déplace d'une cellule vers le bas s'il le peut et met falling à true
    // si mario tombe sur un koopa, il meurt
    if (this.jump.power === 0) {
      var entity;
      this.y += 1;
      this.falling = true;
      if (entity = map.checkCollision(this)) {
        if (entity instanceof Cell || entity instanceof Brick) {
          this.y -= 1;
          this.falling = false;
          this.action = "walk";
        } else if (entity instanceof Koopa) {
          this.jump.power = 3;
          entity.die();
        }
      }
    }
  };
  this.die = function () {
    // mario met fin à son intervalle d'animations
    // mario est retiré de la map
    var index = map.map.indexOf(this);
    delete map.map[index];
    clearInterval(this.interval);

    game_state.defeat = true;
  };
  this.move = function () {
    // si l'Input est flèche de gauche, mario se déplace à gauche s'il le peut
    // si l'Input est flèche de droite, mario se déplace à droite s'il le peut
    // si l'Input est espace, mario commence un saut
    // si mario rencontre un koopa après son déplacement, il meurt
    var posA = {x: this.x, y: this.y};

    if (this.input.keys.ArrowLeft) {
      this.sprites.walk++;
      if (this.sprites.walk >= 2) {
        this.sprites.walk = 0;
      }
      this.x -= 1;
      this.direction = 1;
      if (this.action !== "jump") {
        this.action = "walk";
      }
    }
    else if (this.input.keys.ArrowRight) {
      this.sprites.walk++;
      if (this.sprites.walk >= 2) {
        this.sprites.walk = 0;
      }
      this.x += 1;
      this.direction = 0;
      if (this.action !== "jump" && this.action !== "fall") {
        this.action = "walk";
      }
      //requestAnimationFrame(mario.move());
    } else {
      this.action = "stand";
    }
    if (this.input.keys.Space && !this.falling) {
      this.jump.power = 3;
      SONGS.jump.play();
      this.falling = true;
    } else if (this.input.keys.Space && this.hasBalloon) {
      this.falling = true;
      this.jump.power = 2;
    }

    if (this.falling) {
      this.makeJump();
    }

    if (this.immortal.state) {
      this.immortal.duration -= 1;
      if (this.immortal.duration <= 0) {
        this.immortal.state = false;
      }
    }

    var entity;
    if (entity = map.checkCollision(this)) {
      if (entity instanceof Cell) {
          this.x = posA.x;
          this.y = posA.y;
      } else if (entity instanceof Koopa && !this.falling) {
        if (this.immortal.state) {
          entity.die();
        }
        else {
          this.takeDamage();
        }
      } else if (entity instanceof Peach) {
        game_state.victory = true;
      } else if (entity instanceof Mushroom) {
        if (this.lifeState === 1) {
          this.lifeState += 1;
        }
        entity.die();
      } else if (entity instanceof Star) {
        this.immortal.state = true;
        this.immortal.duration = 100;
        entity.die();
      } else if (entity instanceof Balloon) {
        this.hasBalloon = true;
        entity.die();
      }
    }
  };

  this.takeDamage = function() {
    /*
    * Permet à mario de prendre des dégâts
    * Ce système est implémenté pour faciliter la gestion des champignons
    */
    if (this.damageTime < 0) {
      this.lifeState -= 1;
      this.damageTime = 5;
      if (this.lifeState <= 0) {
        this.die();
      }
    }
  };

  this.updateDmgTime = function() {
    /*
    * Ce temps permet à mario d'éviter de prendre x dégâts d'une traite
    */
    this.damageTime -= 1;
  };

  this.interval = setInterval(function () {
    mario.fall();
    mario.move();
    mario.updateDmgTime();
    mario.update();
  }, 100);
};

var Input = function (keys) {
  this.keys = {};
  // Input récupère les touches actives du clavier
  for (var k in keys) {
    var key = keys[k];
    if (key === "ArrowLeft") {
      this.keys.ArrowLeft = false;
    } else if (key === "ArrowRight") {
      this.keys.ArrowRight = false;
    }
  }

  window.addEventListener("keydown", function(evt) {
    var key = evt.which || evt.keycode;
    if (key === 37) {
        evt.preventDefault();
        this.keys.ArrowLeft = true;
    }
    if (key === 39) {
        evt.preventDefault();
        this.keys.ArrowRight = true;
    }
    if (key === 32) {
        evt.preventDefault();
        this.keys.Space = true;
    }
  }.bind(this));
  window.addEventListener("keyup", function(evt) {
    var key = evt.which || evt.keycode;
    if (key === 37) {
        evt.preventDefault();
        this.keys.ArrowLeft = false;
    }
    if (key === 39) {
        evt.preventDefault();
        this.keys.ArrowRight = false;
    }
    if (key === 32) {
        evt.preventDefault();
        this.keys.Space = false;
    }
  }.bind(this));
}