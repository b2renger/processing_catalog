// p5js sketch in instance mode - https://p5js.org/examples/instance-mode-instance-container.html
let sketch4 = function (p) {
    let x1 =100
    let y1 = 100

    let x3 =100
    let y3 = 100
    p.setup = function () {
        p.noCanvas();
        let cnv = p.createCanvas(200, 200);
        cnv.id("test4"); // you need to set this because you'll use it in the a-frame component
        cnv.hide();
        p.background(0)
        //p.frameRate(5)
    };

    p.draw = function () {
        //p.clear()
        p.background(0, 1)
        p.push()
        p.stroke(255,0, 0)
        p.strokeWeight(1)

        let x2 = x1 + p.cos((p.TWO_PI / 6) * p.round(p.random(1,7))) * 10
        let y2 = y1 + p.sin((p.TWO_PI / 6) * p.round(p.random(1,7))) * 10
        p.line(x1,y1,x2, y2)
        x1 = x2
        y1 = y2
        if (x2 > p.width) x1 = 0
        if (x2 < 0) x1 = p.width
        if (y2 > p.height) y1 = 0
        if (y2 < 0) y1 = p.height

        
        p.stroke(255)
        p.strokeWeight(1)
        let x4 = x3 + p.cos((p.TWO_PI / 6) * p.round(p.random(1,7))) * 10
        let y4 = y3 + p.sin((p.TWO_PI / 6) * p.round(p.random(1,7))) * 10
        p.line(x3,y3,x4, y4)
        x3 = x4
        y3 = y4
        if (x4 > p.width) x3 = 0
        if (x4 < 0) x3 = p.width
        if (y4 > p.height) y3 = 0
        if (y4 < 0) y3 = p.height
        p.pop()
    };
};
new p5(sketch4, "container4"); // bind the canvas to a div in the body

// aframe component
AFRAME.registerComponent("draw-canvas4", {
    init() {
        setTimeout(() => {
            this.el.setAttribute("material", { src: "#test4" }); // every element of the scene that has this component will use the canvas ided as "test" for its texture
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