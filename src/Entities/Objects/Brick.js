var Brick = function(y, x, image, gift) {
  Cell.call(this, y, x, image);

  this.gift = gift;

  this.replace = function() {
    // Fait apparaitre le cadeau au dessus
    // Remplace l'objet par une Cell
    if (this.gift === "Star") {
      map.map.push(new Star(this.y - 1, this.x, IMAGES.star));
    } else if (this.gift === "Mushroom") {
      map.map.push(new Mushroom(this.y - 1, this.x, IMAGES.mushroom));
    }
    else if (this.gift === "Balloon") {
      map.map.push(new Balloon(this.y - 1, this.x, IMAGES.balloon));
    }
    map.map.push(new Cell(this.y, this.x, IMAGES.wall2));
    var index = map.map.indexOf(this);
    delete map.map[index];
  };
};