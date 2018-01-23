var Cell = function (y, x, image) {
 this.x = x;
 this.y = y;
 this.image = image;
 // crée un élément img et l'insère dans le DOM aux coordonnées x et y
 this.update = function () {
    // met à jour la position de la cellule dans le DOM
    if (!game_state.victory && !game_state.defeat) {
      if (this instanceof Mario) {
        if (this.immortal.state) {
          this.image = IMAGES.mario2;
        } else {
          this.image = IMAGES.mario;
        }
        var imgW = this.image.width / 6;
        var imgH = this.image.height / 2;
        var spriteX = this.sprites[this.action];
        ctx.drawImage(this.image, spriteX * imgW, this.direction * imgH + 1, imgW, imgH - 1, this.x * 24, (this.y + 1 - this.lifeState) * 24, 24, (24 * this. lifeState));
        if (this.hasBalloon) {
          ctx.drawImage(IMAGES.balloon, 0, 0, IMAGES.balloon.width, IMAGES.balloon.height, this.x * 24, this.y * 24, 24, 24);
        }
      } else if (this instanceof Koopa) {
        var imgW = this.image.width / (this.image.width / 48 + 1);
        var imgH = this.image.height;
        var spriteX = this.sprites;
        ctx.drawImage(this.image, spriteX * imgW, 0, imgW, imgH, this.x * 24, this.y * 24, 24, 24);
      } else {
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x * 24, this.y * 24, 24, 24);
      }
    } else {
      clearInterval(this.interval);
    }

    if (nbKoopa === 0) {
      game_state.victory = true;
    }
 };
 this.checkCollision = function (cell) {
   // retourne true si la cellule est aux même coordonnées que cell
   return (this.x === cell.x && this.y === cell.y);
 };
 this.die = function () {
   // cell est retiré de la map
   var index = map.map.indexOf(this);
   delete map.map[index];
 };
};