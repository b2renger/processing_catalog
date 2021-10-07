// p5js sketch in instance mode - https://p5js.org/examples/instance-mode-instance-container.html
let sketch2 = function (p) {
    let incr = 0
    let state = 0
    p.setup = function () {
        p.noCanvas();
        let cnv = p.createCanvas(200, 200);
        cnv.id("test2"); // you need to set this because you'll use it in the a-frame component
        cnv.hide();
        //p.background(0)
    };

    p.draw = function () {
        p.background(0,25)
        incr += 2

        p.noStroke();
        p.noFill();
        p.strokeWeight(5)
        if (state == 0) p.stroke(255)
        if (state == 1) p.stroke(255, 0, 0)
        for (let i = 0; i < 5; i++) {


            if(i%2 ==0){
                p.stroke(255) 
            }
            else {
                p.stroke(255, 0, 0)
            }
            let r = p.constrain( incr - 50 * i, 0, 300)
            p.ellipse(p.width * .5, p.height * .5, r, r)
        }


        if (incr > 500) {
            if (state == 0) { state = 1 }
            else if (state == 1) { state = 0 }
    
            incr = 0
        }


    };
};
new p5(sketch2, "container2"); // bind the canvas to a div in the body

// aframe component
AFRAME.registerComponent("draw-canvas2", {
    init() {
        setTimeout(() => {
            this.el.setAttribute("material", { src: "#test2" }); // every element of the scene that has this component will use the canvas ided as "test" for its texture
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