var scene;
var man;
var timer;
var monster;

function Scene() {
  this.width = 1024;
  this.height = 600;
  this.position = "absolute";
  this.color = "#ffffff";
  this._map = null; //save dom

  this.show = function() {
    this._map = document.createElement("div");
    this._map.style.width = this.width + "px";
    this._map.style.height = this.height + "px";
    this._map.style.position = "absolute";
    this._map.style.backgroundColor = this.color;
    this._map.style.border = "5px solid #F00";
    //ADD to body of html
    document.getElementsByTagName("body")[0].appendChild(this._map);
  };
}

function man() {
  this.width = 20;
  this.height = 20;
  this.direct = "absolute";
  this.imgsrc = "man.jpg";
  this.position = "absolute";
  this.body = [1, 1, "black", null];
  this.setDirect = function(code) {
    switch (code) {
      case 37:
        this.direct = "left";
        break;
      case 39:
        this.direct = "right";
        break;
    }
  };
  this.show = function() {
    if (this.body[3] == null) {
      this.body[3] = document.createElement("img");
      this.body[3].src = this.imgsrc;
      this.body[3].style.position = this.position;
      scene._map.appendChild(this.body[3]);
    }
    this.body[3].style.left = this.body[0] * this.width + "px";
    this.body[3].style.top =
      scene.width - this.body[1] * this.height * 25 + "px";
  };
  this.move = function() {
    switch (this.direct) {
      case "right":
        this.body[0] = this.body[0] + 1;
        if (parseInt(this.body[0]) == Math.floor(scene.width / this.width)) {
          this.body[0] = 0;
        }
        break;
      case "left":
        this.body[0] = this.body[0] - 1;
        if (parseInt(this.body[0]) == 0) {
          this.body[0] = Math.floor(scene.width / this.width);
        }
        break;
      default:
        return;
    }
    this.show();
  };
}

function Monster() {
  this.width = 40;
  this.height = 40;
  this.position = "absolute";
  this.color = "#aaaaaa";
  this._aim = null;
  this.x = 0;
  this.y = 0;

  this.show = function() {
    if (this._aim == null) {
      this._aim = document.createElement("img");
      this._aim.src = "smile.jpg";
      this._aim.style.position = this.position;

      scene._map.appendChild(this._aim);
    }
    //reset the place
    this.x = Math.floor(Math.random() * (scene.width / this.width));
    this.y = Math.floor(Math.random() * 0.5 * (scene.height / this.height));
    this._aim.style.left = this.x * this.width + "px";
    this._aim.style.top = this.y * this.height + "px";
  };
}

window.onload = function() {
  scene = new Scene();
  scene.show();

  monster = new Monster();
  monster.show();

  man = new man();
  man.show();
  timer = setInterval("man.move()", 50);

  document.onkeydown = function() {
    var code;
    if (window.event) {
      code = window.event.keyCode;
    } else {
      code = event.keyCode;
    }
    if (code === 38) {
      //shoot
    } else {
      man.setDirect(code);
    }
  };
};
