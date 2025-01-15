let grammar, font;
let texts = [];
let fonts = [];
let images = [];
let mode = "text";

function preload() {
  fonts.push(loadFont("fonts/Porkys.ttf"));
  fonts.push(loadFont("fonts/PPEditorialNew.otf"));
  fonts.push(loadFont("fonts/NeueHaasDisplay.ttf"));
  fonts.push(loadFont("fonts/Bourrasque.ttf"));

  images.push(loadImage("images/mango.png"));
  images.push(loadImage("images/tea.png"));
  images.push(loadImage("images/cabbage.png"));
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);

  canvas.style('z-index', '1');
  canvas.style('position', 'absolute');
  canvas.style('pointer-events', 'none');

  textAlign(CENTER, CENTER);
  textFont(fonts[0], 50);

  grammar = RiTa.grammar(grocery);
}

function draw() {
  clear();

  for (let i = 0; i < texts.length; i++) {
    let t = texts[i];

    if (t.type === "image") {
      image(t.image, t.position.x - 50, t.position.y - 50, 300, 300);
    } else if (t.type === "text") {
      textFont(t.font);
      textSize(60);
      strokeWeight(2);
      stroke(0);
      fill(t.fillColor);
      text(t.text, t.position.x, t.position.y);
    }
  }
}

function mousePressed() {
  if (mode === "image") {
    let randomImage = random(images);

    let newImage = {
      type: "image",
      image: randomImage,
      position: createVector(mouseX, mouseY),
    };

    texts.push(newImage);
  } else if (mode === "text") {
    let phrase = random(grocery.phrase);
    let randomFont = random(fonts);
    const colors = [
      color(255, 42, 134),
      color(0, 155, 75),
      color(103, 238, 255),
      color(255, 233, 0),
      color(233, 29, 24)
    ];
    let fillColor = random(colors);

    let newText = {
      type: "text",
      text: phrase,
      position: createVector(mouseX, mouseY),
      size: random(40, 60),
      font: randomFont,
      fillColor: fillColor,
    };

    texts.push(newText);
  }
}

function keyPressed() {
  if (key === 't' || key === 'T') {
    mode = "text";
    console.log("Text mode activated");
  } else if (key === 'i' || key === 'I') {
    mode = "image";
    console.log("Image mode activated");
  }
}
