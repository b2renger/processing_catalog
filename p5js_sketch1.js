// p5js sketch in instance mode - https://p5js.org/examples/instance-mode-instance-container.html
let sketch = function (p) {
    p.setup = function () {
        p.noCanvas();
        let cnv = p.createCanvas(100, 100);
        cnv.id("test"); // you need to set this because you'll use it in the a-frame component
        cnv.hide();
        // draw things at init
        p.background(255, 255, 0);
    };

    p.draw = function () {
        // draw animations
        p.background(p.random(255), p.random(255), p.random(255));
        for (let i = 0; i < 100; i++) {
            let rad = p.random(5, 25);
            p.fill(p.random(255), 0, 255);
            p.noStroke();
            p.ellipse(p.random(p.width), p.random(p.height), rad, rad);
        }
    };
};
new p5(sketch, "container"); // bind the canvas to a div in the body
 // aframe component
 AFRAME.registerComponent("draw-canvas", {
    init() {
        setTimeout(() => {
            this.el.setAttribute("material", { src: "#test" }); // every element of the scene that has this component will use the canvas ided as "test" for its texture
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