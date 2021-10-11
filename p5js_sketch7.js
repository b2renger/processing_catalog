


// p5js sketch in instance mode - https://p5js.org/examples/instance-mode-instance-container.html
let sketch7 = function (p) {


    var nodes = [];
    var springs = [];
    p.preload = function () {
        img = p.loadImage("23.png")
    }

    p.setup = function () {
        p.noCanvas();
        let cnv = p.createCanvas(250, 250);
        cnv.id("test7"); // you need to set this because you'll use it in the a-frame component
        cnv.hide();

        nodes.push(new Node((p.width/2),(p.height/2),'HOME',true)); // true mean isAnchor (label always displayed)

    };

    p.draw = function () {
        p.background(0)

        for (var i = 0 ; i < springs.length ; i++){
            springs[i].update();
            springs[i].display();
          }
        
          for (var i = 0 ; i < nodes.length ; i++){
            nodes[i].update();
            nodes[i].display();
        
           // nodes[i].over(mouseX,mouseY);
            
            for (var j = 0 ; j < nodes.length ; j++){
              if (i!=j) nodes[i].attract(nodes[j]);
            }
          }

          if (p.frameCount % 100 == 0 && nodes.length < 15){
            nodes.push(new Node(p.random(p.width),p.random(p.height)));

            if (nodes.length < 6) addConnection(0,p.random(25,75));
            else addConnection(p.int( p.random(1, nodes.length)),p.random(10,40));
          }
        

    }

    function addConnection(index,l){
        springs.push( new Spring(nodes[index], nodes[nodes.length-1],l));
      }


    function Spring(fNode, tNode, len) {
        this.fromNode = fNode;
        this.toNode = tNode;

        this.length = len;
        this.stiffness = 0.15;
        this.damping = 0.55;

        this.noiseFx = p.random(500);
        this.noiseFy = p.random(500);
        this.step = 0.0075;

        this.c1XNoise;
        this.c1YNoise;
        this.c2XNoise;
        this.c2YNoise;
    }

    Spring.prototype.update = function () {
        // calculate the target position
        // target = normalize(to - from) * length + from
        var diff = p5.Vector.sub(this.toNode.location, this.fromNode.location);
        diff.normalize();
        diff.mult(this.length);
        var target = p5.Vector.add(this.fromNode.location, diff);

        var force = p5.Vector.sub(target, this.toNode.location);
        force.mult(0.5);
        force.mult(this.stiffness);
        force.mult(1 - this.damping);

        this.toNode.velocity.add(force);
        this.fromNode.velocity.add(p5.Vector.mult(force, -1));
    }

    Spring.prototype.display = function () {
        p.push();
        p.noFill();
        p.stroke(255);
        this.noiseFx += this.step;
        this.noiseFy += this.step;

        this.c1XNoise = p.map(p.noise(this.noiseFx, 10, 20), 0, 1, -150, 150);
        this.c1YNoise = p.map(p.noise(this.noiseFy, 2, 87), 0, 1, -150, 150);
        this.c2XNoise = p.map(p.noise(this.noiseFx, 5, 12), 0, 1, -150, 150);
        this.c2YNoise = p.map(p.noise(this.noiseFy, 15, 30), 0, 1, -150, 150);

        p.curve(this.fromNode.location.x + this.c1XNoise, this.fromNode.location.y + this.c1YNoise,
            this.fromNode.location.x, this.fromNode.location.y,
            this.toNode.location.x, this.toNode.location.y,
            this.toNode.location.x + this.c2XNoise, this.toNode.location.y + this.c2YNoise);
        p.pop();
    }


    function Node(x, y) {
        // ------   properties ------
        // if needed, an ID for the node
    
        this.diameter = 25;

        this.minX = 0;
        this.maxX = p.width;
        this.minY = 0;
        this.maxY = p.height;
        this.minZ = -60000;
        this.maxZ = 60000;

        this.velocity = p.createVector(0, 0, 0);
        this.pVelocity = p.createVector(0, 0, 0);
        this.maxVelocity = 10;

        this.damping = 0.5;
        // radius of impact
        this.radius = 50;
        // strength: positive for attraction, negative for repulsion (default for Nodes)
        this.strength = 15;
        // parameter that influences the form of the function
        this.ramp = 1.0;

        this.location = p.createVector(x, y, 0);

        this.overMe = false;
        this.page; // a csv file to be attached

        this.displayLabel = true;
  
        this.alpha = 50; // used to make the nodes pulse
        this.highlight = false; // activate or desactivate pulse
    }


    Node.prototype.attract = function (theNode) {
        var d = p.dist(this.location.x, this.location.y, theNode.location.x, theNode.location.y);

        if (d > 0 && d < this.radius) {
            var s = p.pow(d / this.radius, 1 / this.ramp);
            var f = s * 9 * this.strength * (1 / (s + 1) + ((s - 3) / 4)) / d;
            var df = p5.Vector.sub(this.location, theNode.location);
            df.mult(f);

            this.velocity.x += df.x;
            this.velocity.y += df.y;
            this.velocity.z += df.z;
        }
    }


    Node.prototype.update = function () {

        this.velocity.limit(this.maxVelocity);

        this.pVelocity.set(this.velocity);

        this.location.x += this.velocity.x;
        this.location.y += this.velocity.y;
        this.location.z += this.velocity.z;


        if (this.location.x < this.minX) {
            this.location.x = this.minX - (this.location.x - this.minX);
            this.velocity.x = -this.velocity.x;
        }
        if (this.location.x > this.maxX) {
            this.location.x = this.maxX - (this.location.x - this.maxX);
            this.velocity.x = -this.velocity.x;
        }

        if (this.location.y < this.minY) {
            this.location.y = this.minY - (this.location.y - this.minY);
            this.velocity.y = -this.velocity.y;
        }
        if (this.location.y > this.maxY) {
            this.location.y = this.maxY - (this.location.y - this.maxY);
            this.velocity.y = -this.velocity.y;
        }
        /*
        if (this.location.z < this.minZ) {
          this.location.z = this.minZ - (this.location.z - this.minZ);
          this.velocity.z = -this.velocity.z;
        }
        if (this.location.z > this.maxZ) {
          this.location.z = this.maxZ - (this.location.z - this.maxZ);
          this.velocity.z = -this.velocity.z;
        } */

        this.velocity.mult(1 - this.damping);

        if (this.highlight == true) {
            this.displayLabel = true;
            //	this.pulse();
        }
        else {
            this.alpha = 50;
        }
    }



    Node.prototype.display = function () {
        p.push();
        p.noStroke();
        p.fill(255);
        p.ellipse(this.location.x, this.location.y, this.diameter / 4, this.diameter / 4);
        p.fill(255, this.alpha);
        p.ellipse(this.location.x, this.location.y, this.diameter, this.diameter);
        p.fill(255);
        p.pop();
    }





};
new p5(sketch7, "container7"); // bind the canvas to a div in the body

// aframe component
AFRAME.registerComponent("draw-canvas7", {
    init() {
        setTimeout(() => {
            this.el.setAttribute("material", { src: "#test7" }); // every element of the scene that has this component will use the canvas ided as "test" for its texture
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