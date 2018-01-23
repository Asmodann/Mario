var nbKoopa = 0;

var Map = function (model) {
  this.map = [];
  this.generateMap = function () {
    // instancie les classes correspondants au schema
    // avec :
    // w => Cell
    // k => Koopa
    // m => Mario
    for (var y = 0; y < model.length; y++)
    {
      for (var x = 0; x < model[y].length; x++)
      {
        var char = model[y][x];
        var tmp = {x: x, y: y - 1};
        switch (char) {
          case "w":
            this.map.push(new Cell(tmp.y, tmp.x, IMAGES.wall));
            break;
          case "W":
            this.map.push(new Cell(tmp.y, tmp.x, IMAGES.wall2));
            break;
          case "b":
            this.map.push(new Cell(tmp.y, tmp.x, IMAGES.brick));
            break;
          case "S":
            this.map.push(new Brick(tmp.y, tmp.x, IMAGES.brick, "Star"));
            break;
          case "R":
            this.map.push(new Brick(tmp.y, tmp.x, IMAGES.brick, "Mushroom"));
            break;
          case "B":
            this.map.push(new Brick(tmp.y, tmp.x, IMAGES.brick, "Balloon"));
            break;
          case "m":
            this.map.push(new Mario(tmp.y, tmp.x, IMAGES.mario));
            break;
          case "p":
            this.map.push(new Peach(tmp.y, tmp.x, IMAGES.peach));
            break;
          case "k":
            this.map.push(new Koopa(tmp.y, tmp.x, IMAGES.koopa));
            nbKoopa += 1;
            break;
          default:
            // Nothing
            break;
        }
      }
    }
  };
  this.checkCollision = function (cell) {
    // parcourt la map et renvoie la cellule aux mêmes coordonnées que cell
    for (var k in this.map) {
      var item = this.map[k];
      if (item === cell) {
        continue;
      }
      if (cell.checkCollision(item)) {
        return item;
      }
    }
  };
  this.delete = function (cell) {
    // retire la cell de map
    // retire la cell du dom
    // delete la cell
    var index = this.map.indexOf(cell);
    delete this.map[index];
  };
};
var schema = [
  'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
  'w                                      w',
  'w                                 k    w',
  'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww    w',
  'w                                      w',
  'w                                      w',
  'w                                      w',
  'w                                      w',
  'w                                     pw',
  'w        k      w                      w',
  'wwwwwwwwwwwwwwwww                      w',
  'w                   w          k       w',
  'w            wwwww  wwwwwwwwwwwwwwwwwwww',
  'w            w                         w',
  'w           ww                         w',
  'w          www                         w',
  'w         wwww                         w',
  'wm       wwwww k    w      k           w',
  'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
];

var schema2 = [
  'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
  'w                                      w',
  'w                                      w',
  'wp         wk    w           k         w',
  'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww    w',
  'w                                      w',
  'w                                      w',
  'w w         ww  wwwwwwwwwwwwwwwwwwwwwwww',
  'w   bSbbb  ww                          w',
  'w               w               bBbb   w',
  'wk    k         ww                     w',
  'wwwwwwwwwwwwwwwww                      w',
  'w                   w          k       w',
  'w            wwwww  wwwwwwwwwwwwwwwwwwww',
  'w            w                         w',
  'w           Ww                         w',
  'w          WWw    w         bbRW       w',
  'w         WWWw                         w',
  'wm       WWWWw k    w      k           w',
  'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
  'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
];

var map = new Map(schema2);
map.generateMap();