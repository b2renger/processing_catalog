// p5js sketch in instance mode - https://p5js.org/examples/instance-mode-instance-container.html
let sketch = function (p) {
    let seed = p.random(9999)
    p.setup = function () {
        p.noCanvas();
        let cnv = p.createCanvas(200, 200);
        cnv.id("test"); // you need to set this because you'll use it in the a-frame component
        cnv.hide();
        // draw things at init
        //p.background(255, 255, 0);

    };

    p.draw = function () {
        p.randomSeed(seed)
        let step = 20
        p.clear()
        p.stroke(255, 0, 0)
        p.strokeWeight(5)
        for (let i = 0 ; i < p.width ; i += step){
            for(let j = 0 ; j < p.height ; j +=step){

                if (p.random(1)> 0.5){
                    p.line (i,j, i+step, j +step)
                }
                else{
                    p.line(i, j+step, i +step, j)
                }
            }
        }
       
    };
};
new p5(sketch, "container"); // bind the canvas to a div in the body
 // aframe component
 AFRAME.registerComponent("draw-canvas1", {
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