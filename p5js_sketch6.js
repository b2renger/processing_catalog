


// p5js sketch in instance mode - https://p5js.org/examples/instance-mode-instance-container.html
let sketch6 = function (p) {

    let img
    let x = 0
    let y = 0

    let xspeed = 2;
    let yspeed = 2;
    let rspeed
    p.preload = function () {
        img = p.loadImage("23.png")
    }

    p.setup = function () {
        p.noCanvas();
        let cnv = p.createCanvas(450, 700);
        cnv.id("test6"); // you need to set this because you'll use it in the a-frame component
        cnv.hide();
        //p.background(180)
        x = p.random(75, p.width - 75)
        y = p.random(75, p.height - 75)
        rspeed = 500
    };

    p.draw = function () {
        //p.background(0)
        p.push()
        p.rectMode(1)
        p.imageMode(1)
        p.noStroke()
        p.fill(255)
        p.translate(x, y)
        p.rotate(p.millis() / rspeed)
        p.rect(-1, -1, 52, 52)
        p.image(img, 0, 0, 50, 50)

        p.pop()
        // p.ellipse(p.width/2, p.height/2, 50, 50)

        x += xspeed;
        y += yspeed;

        if (x < 50 || x > p.width - 50) { 
            xspeed *= -1
            //rspeed = p.random(500, 1500) * (p.random(1)>.5 ? 1 : -1)
         }
        if (y < 50 || y > p.height - 50) { 
            yspeed *= -1
            //rspeed = p.random(500, 1500) * (p.random(1)>.5 ? 1 : -1)
         }
    }

};
new p5(sketch6, "container6"); // bind the canvas to a div in the body

// aframe component
AFRAME.registerComponent("draw-canvas6", {
    init() {
        setTimeout(() => {
            this.el.setAttribute("material", { src: "#test6" }); // every element of the scene that has this component will use the canvas ided as "test" for its texture
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