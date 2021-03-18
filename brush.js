class Brush {
  constructor(img, w, h) {
    this.x = mouseX;
    this.y = mouseY;
    this.img = img;
    this.w = w;
    this.h = h;
  }
  
  draw() {
    push();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.w, this.h);
    pop();
  }
}