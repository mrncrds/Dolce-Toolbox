
let canvas;
let windowH = 860;
let counter;
let arrayVideos = ["assets/video1.mp4", "assets/video2.mp4", "assets/video3.mp4"];
let arrayLocation = ["McAllen-Hidalgo Bridge, Texas, United States", "Camera2 Location", "Camera3 Location"];
let arrowRight, arrowLeft;
let cameraLocation;
let borderVideo;
let slider;
let spray, smudge, sprayTool, smudgeTool;
let smudgeIsClicked = false;
let tool;
let numStickers = 12
let sticker = [];
let stickerList = [];
let brushes = [];
let newBrush;
let imageX, imageY;

function preload() {
  sprayTool = loadImage("assets/brushes/spray.svg");

  for (let i = 0; i < numStickers; i++) {
    // load sticker images
    stickerList[i] = loadImage("assets/brushes/dolce-stil-criollo-brush" + (i+1) + ".svg");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowH);
}

function setup() {
  canvas = createCanvas(windowWidth, windowH);
  canvas.position(0, 0);

  counter = 0;
  borderVideo = select("#border-video"); // get html video tag
  cameraLocation = select("#camera-location"); // camera location description

  // change video with toolbox arrows
  arrowRight = select("#arrow-right");
  arrowRight.mouseClicked(function() {
    counter++;
    // restart when hits the last video from array
    if (counter == arrayVideos.length) {
      counter = 0;
    }
    borderVideo.attribute("src", arrayVideos[counter]);
    cameraLocation.html(arrayLocation[counter]);
    // console.log(counter);
  });

  arrowLeft = select("#arrow-left");
  arrowLeft.mouseClicked(function() {
    counter--;
    // restart when hits the first video from array
    if (counter < 0) {
      counter = arrayVideos.length - 1;
    }
    borderVideo.attribute("src", arrayVideos[counter]);
    cameraLocation.html(arrayLocation[counter]);
    // console.log(counter);
  });

  tool = sprayTool; // start with spray tool
  slider = select("#myRange"); // range slider

  // spray tool
  spray = select("#spray");
  spray.mouseClicked(function() {
    console.log("Spray selected!");
    smudgeIsClicked = false;
    tool = sprayTool;
  });

  // smudge tool
  smudge = select("#smudge");
  smudge.mouseClicked(function() {
    console.log("Smudge selected!");
    smudgeIsClicked = true;
  });

  // stickers
  for (let i = 0; i < numStickers; i++) {
    sticker[i] = select("#sticker-" + (i+1));
    sticker[i].mouseClicked(function() {
      console.log("Sticker selected!");
      smudgeIsClicked = false;
      tool = stickerList[i];
    })
  }
  
  imageX = 0;
  imageY = 0;
  saveImage(); // button to save image
}

function mousePressed() {
  // for smudge tool
  imageX = mouseX;
  imageY = mouseY;
}

function draw() {
  cursor(CROSS); // not working
  image(borderVideo, 0, 0, windowWidth, windowH); // draw video on canvas

  smudgeTool = get(imageX, imageY, slider.value(), slider.value()); // get image location for smudge tool

  for (let i = 0; i < brushes.length; i++) {
    brushes[i].draw();
  }

  if (mouseIsPressed) {
    if (smudgeIsClicked) {
      newBrush = new Brush(smudgeTool, slider.value(), slider.value());
    } else {
      newBrush = new Brush(tool, slider.value(), slider.value());
    }
  brushes.push(newBrush);
  }
}

function saveImage() {
  button = select("#save-button")
  button.mousePressed(function () {
    save('Border-Theatrics.png');
  });
}