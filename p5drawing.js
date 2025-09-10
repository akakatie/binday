let sp = 50;
let y = 0;
let x = 0;

z = [-1, -1, +1, -1, +1, +1, -1, +1];

function setup() {
  const leftDiv = document.getElementById("left");
  let w = floor(leftDiv.offsetWidth / sp) * sp;

  // create canvas directly
  let cnv = createCanvas(w, leftDiv.offsetHeight);
  cnv.parent("left");
    cnv.id("p5Canvas");               // give it an ID 

  clear();
  x = sp / 2;
  y = sp / 2;

  strokeWeight(2);
  stroke("#121212");

  if (statecheck == 1) {
    noFill();
    state1();
  } else {
    fill("#121212");
    state2();
  }
}


function state1() {
      strokeWeight(5);
  stroke("#121212");
  while (y < height) {
    if (random(100) > 50) {
      arcDraw1(1, x, y, sp);
      arcDraw1(3, x, y, sp);
    } else {
      arcDraw1(0, x, y, sp);
      arcDraw1(2, x, y, sp);
    }
    
    x += sp;
    
    if (x > width) {
      y += sp;
      x = sp / 2;
    }
  }
}

function arcDraw1(a, originX, originY, sp) {
  arc(
    originX + (z[2 * a] * sp) / 2,
    originY + (z[2 * a + 1] * sp) / 2,
    sp,
    sp,
    (a * TAU) / 4,
    ((a + 1) * TAU) / 4
  );
}


function state2() {
  for (let y = 0; y < height; y += sp) {
    for (let x = 0; x < width; x += sp) {
      // pick random orientation 0,1,2,3
      let orientation = floor(random(4));
      drawTriangleInCell(x, y, sp, orientation);
    }
  }
}

// Draw one triangle in a square cell
function drawTriangleInCell(x, y, sp, orientation) {
  switch (orientation) {
    case 0: // top-left
      triangle(x, y, x + sp, y, x, y + sp);
      break;
    case 1: // top-right
      triangle(x + sp, y, x + sp, y + sp, x, y);
      break;
    case 2: // bottom-left
      triangle(x, y + sp, x + sp, y + sp, x, y);
      break;
    case 3: // bottom-right
      triangle(x + sp, y + sp, x + sp, y, x, y + sp);
      break;
  }
}