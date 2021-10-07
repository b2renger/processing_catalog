// p5js sketch in instance mode - https://p5js.org/examples/instance-mode-instance-container.html
let sketch4 = function (p) {
    let x1 = 100
    let y1 = 100

    let x3 = 100
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
        p.background(0, 2.5)
        p.push()
        p.stroke(255, 0, 0)
        p.strokeWeight(1)

        let x2 = -1
        let y2 = -1

        let angle
        let s1 = 10

        if (x2 < 0 || x2 > p.width || y2 < 0 || y2 > p.height) {
            while (x2 < 0 || x2 > p.width || y2 < 0 || y2 > p.height) {
                angle = p.TWO_PI / 6 * p.int(p.random(1, 7))
                x2 = x1 + s1 * p.cos(angle)
                y2 = y1 + s1 * p.sin(angle)
            }
        } else {
            angle = p.TWO_PI / 6 * p.int(p.random(1, 7))
            x2 = x1 + s1 * p.cos(angle)
            y2 = y1 + s1 * p.sin(angle)
        }


        p.line(x1, y1, x2, y2)
        x1 = x2
        y1 = y2


        p.stroke(255)
        p.strokeWeight(1)

        let y4 = -1
        let x4 = -1
        let s2 = 20
        if (x4 < 0 || x4 > p.width || y4 < 0 || y4 > p.height) {
            while (x4 < 0 || x4 > p.width || y4 < 0 || y4 > p.height) {
                angle = p.TWO_PI / 6 * p.int(p.random(1, 7))
                x4 = x3 + s2 * p.cos(angle)
                y4 = y3 + s2 * p.sin(angle)
            }
        } else {
            angle = p.TWO_PI / 6 * p.int(p.random(1, 7))
            x4 = x3 + s2 * p.cos(angle)
            y4 = y3 + s2 * p.sin(angle)
        }

        p.line(x3, y3, x4, y4)
        x3 = x4
        y3 = y4

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