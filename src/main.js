var game_state = {
  victory: false,
  defeat: false
};

var ctx;

window.addEventListener("load", function() {

  var delta = {
    FRAMES: 1000 / 30
  };

  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = window.outerWidth;
  canvas.height = window.outerHeight;
  ctx.font = "64px Arial";
  ctx.fillStyle = "white";

  setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (game_state.victory) {
      canvas.style.backgroundColor = "#000";
      ctx.textAlign = "center";
      ctx.fillText("VICTOIRE !!!", canvas.width / 2,canvas.height / 2);
    } else if (game_state.defeat) {
      canvas.style.backgroundColor = "#000";
      ctx.textAlign = "center";
      ctx.fillText("DEFAITE !!!", canvas.width / 2,canvas.height / 2);
    } else {
      ctx.drawImage(IMAGES.background, 0, 0, IMAGES.background.width, IMAGES.background.height, 0, 0, canvas.width, canvas.height);
      for (var k in map.map) {
        var item = map.map[k];
        item.update();
      }
    }
  }, delta.FRAMES);

});