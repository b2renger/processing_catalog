


// p5js sketch in instance mode - https://p5js.org/examples/instance-mode-instance-container.html
let sketch5 = function (p) {

  let r = 100;
  let x;
  let y;
  let rs;

  let rmin = 1

  p.setup = function () {
    p.noCanvas();
    let cnv = p.createCanvas(400, 400);
    cnv.id("test5"); // you need to set this because you'll use it in the a-frame component
    cnv.hide();
    p.background(180)
    //p.frameRate(5)
    x = p.random(p.width);
    y = p.height;
    rs = p.random(99999);
  };

  p.draw = function () {
    r -= rmin;
    y -= 3;
    x += p.map(p.noise(p.millis() / 1000, 12, rs), 0, 1, -5, 5);
    p.ellipse(x, y, r, r);

    if (r < 0) {
      x = p.random(p.width);
      y = p.height;
      r = 100;
      rs = p.random(99999);
      rmin = p.random(0.5, 2)
    }
  }

};
new p5(sketch5, "container5"); // bind the canvas to a div in the body

// aframe component
AFRAME.registerComponent("draw-canvas5", {
  init() {
    setTimeout(() => {
      this.el.setAttribute("material", { src: "#test5" }); // every element of the scene that has this component will use the canvas ided as "test" for its texture
    }, 500);
  },
  tick() {
    var el = this.el;
    var material;
    material = el.getObject3D("mesh").material;
    if (!material.map) {
      // console.log("no material")
      return;
    } else {
      // console.log("have material")
    }
    material.map.needsUpdate = true;
  }
});