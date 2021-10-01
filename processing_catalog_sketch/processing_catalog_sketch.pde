ArrayList<Mover> movers;
float pixelRatio = 300/72.;
void settings() {
  int W = int(2250 * pixelRatio);
  int H = int(3000 * pixelRatio);

  size(W, H);
}

void setup() {


  movers = new ArrayList();


  int scaleF = 5;
  movers.add(new Mover(loadImage("7.png"), scaleF));
  movers.add(new Mover(loadImage("0.png"), scaleF));
  movers.add(new Mover(loadImage("42.png"), scaleF));
  movers.add(new Mover(loadImage("51.png"), scaleF));
  movers.add(new Mover(loadImage("35.png"), scaleF));
  movers.add(new Mover(loadImage("44.png"), scaleF));
  movers.add(new Mover(loadImage("9.png"), scaleF));
  movers.add(new Mover(loadImage("16.png"), scaleF));
  movers.add(new Mover(loadImage("13.png"), scaleF));
  movers.add(new Mover(loadImage("63.png"), scaleF));
  movers.add(new Mover(loadImage("qr-code.png"), 2, false));

  background(255);
}

void draw() {
  //background(255);

  for (int i = 0; i < movers.size(); i++) {
    Mover m = movers.get(i);
    m.update();
    m.draw();
  }

  if (frameCount > 700 && frameCount % 10 == 0)  saveFrame("######.png");
}

void keyReleased() {
  saveFrame("######.png");
}


class Mover {

  float xpos;
  float ypos;
  float xspeed;
  float yspeed;
  float rotation;
  float rotationSpeed;
  PImage image;
  float scale;
  boolean border = true;


  Mover(PImage image, float scale) {
    this.xpos = random(image.width, width-image.width);
    this.ypos = random(image.height, height-image.height);
    this.rotation = random(TWO_PI);
    this.image = image;
    this.xspeed = random(2, 10)*(random(1)>0.5 ? 1 : -1)*pixelRatio;
    this.yspeed = random(2, 10)*(random(1)>0.5 ? 1 : -1)*pixelRatio;
    this.rotationSpeed = random(PI*0.01, PI*0.1);
    this.scale = scale;
  }

  Mover(PImage image, float scale, boolean border) {
    this.xpos = random(image.width, width-image.width);
    this.ypos = random(image.height, height- image.height);
    this.rotation = random(TWO_PI);
    this.image = image;
    this.xspeed = random(2, 10)*(random(1)>0.5 ? 1 : -1)*pixelRatio;
    this.yspeed = random(2, 10)*(random(1)>0.5 ? 1 : -1)*pixelRatio;
    this.rotationSpeed = random(PI*0.01, PI*0.1);
    this.scale = scale;
    this.border = border;
  }

  void update() {
    xpos += xspeed;
    ypos += yspeed;

    rotation += rotationSpeed;

    if (xpos < scale * image.width || xpos > width -scale * image.width) xspeed *= -1;
    if (ypos < scale * image.height || ypos > height - scale * image.height) yspeed *=-1;
  }


  void draw() {
    pushMatrix();
    imageMode(CENTER);
    rectMode(CENTER);
    strokeWeight(25);
    stroke(255);
    translate(xpos, ypos);
    rotate(rotation);
    if (border) rect(0, 0, image.width*scale, image.height*scale);

    if (!border) {
      strokeWeight(25);
      stroke(0);
      rect(0, 0, image.width*scale, image.height*scale);
    }
    image(image, 0, 0, image.width*scale, image.height*scale);
    //rect(0,0,image.width*scale, image.height*scale);
    popMatrix();
  }
}
