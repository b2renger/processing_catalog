// p5js sketch in instance mode - https://p5js.org/examples/instance-mode-instance-container.html
let sketch3 = function (p) {
    let x1 = 100
    let y1 = 100
    p.setup = function () {
        p.noCanvas();
        let cnv = p.createCanvas(200, 200);
        cnv.id("test3"); // you need to set this because you'll use it in the a-frame component
        cnv.hide();
        p.background(255)
        //p.frameRate(5)
    };

    p.draw = function () {
        p.rectMode(p.CENTER)
        p.background(255)
        p.noStroke();


        for (let i = 0; i < 6; i++) {
            let b = p.map(i, 0, 5, 0, 16)
            let xOffset = p.map(p.noise(p.millis() / 2000., 12, 43), 0, 1, -5*b, 5*b)
            let yOffset = p.map(p.noise(p.millis() / 2000., 11, 87), 0, 1, -5*b, 5*b)
            p.fill(255, p.map(i, 0, 6, 200, 0), p.map(i, 0, 6, 200, 0))
            p.rect(p.width * .5 + xOffset, p.height * .5 + yOffset, 200 - i * 33, 200 - i * 33)
        }

    };
};
new p5(sketch3, "container3"); // bind the canvas to a div in the body

// aframe component
AFRAME.registerComponent("draw-canvas3", {
    init() {
        setTimeout(() => {
            this.el.setAttribute("material", { src: "#test3" }); // every element of the scene that has this component will use the canvas ided as "test" for its texture
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