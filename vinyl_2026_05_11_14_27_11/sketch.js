let mic;
let angle = 0;
let albumCovers = []; 
let currentCoverIndex = 0; 

function preload() {
  albumCovers[0] = loadImage('musicproject/Screenshot 2026-04-28 081633.png');
  albumCovers[1] = loadImage('musicproject/tylerthecreator.jpg');
  albumCovers[2] = loadImage('musicproject/octane.png');
  albumCovers[3] = loadImage('musicproject/morelife.jpg');
  albumCovers[4] = loadImage('musicproject/astroworld.jpg');
}

function setup() {
  createCanvas(500, 500);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  imageMode(CENTER);
  
  if (albumCovers.length > 0) {
   
    // 2. Image of album covers width and height
    image(albumCovers[currentCoverIndex], width / 2, height / 2, width, height);
    noTint();
  }

  drawVignette();
  
  let vol = mic.getLevel();
  let speed = map(vol, 0.10, 0.90, 0, 0.3);
  angle += speed;

  // Drawing the record (Size remains completely unchanged)
  push();
    translate(width / 2, height / 2 - 30); 
    fill(0, 100);
    noStroke();
    ellipse(10, 10, 310, 310);
    rotate(angle);
    drawVinyl();
  pop();

  drawSpotifyUI(vol);
}

function mousePressed() {
  userStartAudio();

  // 3. Updated the click hitboxes. Because the UI moved down 100 pixels 
  // (and the canvas is wider), the button X and Y coordinates shifted.
  let buttonYMin = 480; 
  let buttonYMax = 510;

  // Check Skip Left Button (Now centered around X = 210)
  if (mouseX > 190 && mouseX < 230 && mouseY > buttonYMin && mouseY < buttonYMax) {
    currentCoverIndex--; 
    if (currentCoverIndex < 0) {
      currentCoverIndex = albumCovers.length - 1;
    }
  }

  // Check Skip Right Button (Now centered around X = 290)
  if (mouseX > 270 && mouseX < 310 && mouseY > buttonYMin && mouseY < buttonYMax) {
    currentCoverIndex++; 
    if (currentCoverIndex >= albumCovers.length) {
      currentCoverIndex = 0;
    }
  }
}

function drawSpotifyUI(v) {
  push();
  // 4. Moved the UI down to 420 (from 320) so it sits at the bottom of the 500px canvas
  translate(0, 420); 
  
  textAlign(LEFT);
  textFont('sans-serif');
  fill(255);
  textSize(16);
  textStyle(BOLD);
  text("High Frequency", 30, 0);
  
  fill(180);
  textSize(12);
  textStyle(NORMAL);
  text("M&H", 30, 18);

  // Expanded the playback bar to fit the new 500 width
  stroke(80);
  strokeWeight(4);
  line(30, 45, width - 30, 45); 
  
  // Progress Bar
  let progress = map(v, 0.25, 0.75, 150, width - 150); 
  stroke(30, 215, 96); 
  line(30, 45, progress, 45);
  
  fill(255);
  noStroke();
  ellipse(progress, 45, 10, 10);

  // Play/Pause button (Width/2 handles the new center automatically)
  fill(255);
  ellipse(width/2, 75, 35, 35);
  fill(0);
  triangle(width/2 - 5, 70, width/2 - 5, 80, width/2 + 7, 75);
  
  // Skip buttons (Adjusted math to keep them spaced evenly from the center)
  fill(255);
  triangle(width/2 + 40, 70, width/2 + 40, 80, width/2 + 50, 75); // Skip right
  rect(width/2 + 50, 70, 3, 10);
  
  triangle(width/2 - 40, 70, width/2 - 40, 80, width/2 - 50, 75); // Skip left
  rect(width/2 - 53, 70, 3, 10);
  
  pop();
}

function drawVignette() {
  noFill();
  // 5. Increased the vignette radius limit to 500 so it reaches the new corners
  for (let r = 200; r < 500; r++) {
    let alpha = map(r, 200, 500, 0, 150);
    stroke(0, alpha);
    ellipse(width / 2, height / 2, r * 2);
  }
}

function drawVinyl() {
  fill(15);
  noStroke();
  ellipse(0, 0, 300, 300);

  stroke(255, 15); 
  noFill();
  for (let d = 110; d < 300; d += 8) {
    ellipse(0, 0, d, d);
  }

  stroke(255,15);
  strokeWeight(10);
  noFill();
  arc(0, 0, 220, 220, 0, HALF_PI/2); 
  arc(0, 0, 220, 220, PI, PI + QUARTER_PI / 2); 

  fill(0, 120, 255);
  noStroke();
  ellipse(0, 0, 100, 100);

  fill(240);
  ellipse(0, 0, 8, 8);
}