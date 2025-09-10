function createSketch() {
  const sp = 50;
  const z = [-1, -1, +1, -1, +1, +1, -1, +1];

  new p5((p) => {
    let x, y;
    let offsetX = 0; // starting x position
    const leftDiv = document.getElementById("left");

    let canvasWidth, canvasHeight;

    p.setup = function() {
      canvasWidth = leftDiv.offsetWidth;
      canvasHeight = leftDiv.offsetHeight;

      const cnv = p.createCanvas(canvasWidth, canvasHeight);
      cnv.parent("left");
      cnv.id("p5Canvas");

      p.strokeWeight(2);
      p.stroke("#121212");

      recalcGrid();
      drawState();
    };

    p.windowResized = function() {
      canvasWidth = leftDiv.offsetWidth;
      canvasHeight = leftDiv.offsetHeight;
      p.resizeCanvas(canvasWidth, canvasHeight);

      recalcGrid();
      drawState();
    };

    function recalcGrid() {
      const numCells = Math.ceil(canvasWidth / sp); // round up to cover full width
      const usedWidth = numCells * sp;
      
      // offset so right edge is flush
      offsetX = canvasWidth - usedWidth;

      x = offsetX + sp / 2;
      y = sp / 2;
    }

    function drawState() {
      p.clear();

      if (statecheck === 1) {     
        p.noFill();
        state1();
      } else if (statecheck === 2) {
        p.fill("#121212");
        state2();
      } else {
        console.log("State not ready, retrying...");
        setTimeout(drawState, 100);
      }
    }

    function state1() {
      p.strokeWeight(5);
      p.stroke("#121212");

      x = offsetX + sp / 2;
      y = sp / 2;

      while (y < canvasHeight) {
        if (p.random(100) > 50) {
          arcDraw1(1, x, y);
          arcDraw1(3, x, y);
        } else {
          arcDraw1(0, x, y);
          arcDraw1(2, x, y);
        }

        x += sp;
        if (x > canvasWidth) {
          y += sp;
          x = offsetX + sp / 2;
        }
      }
    }

    function arcDraw1(a, originX, originY) {
      p.arc(
        originX + (z[2 * a] * sp) / 2,
        originY + (z[2 * a + 1] * sp) / 2,
        sp,
        sp,
        (a * p.TAU) / 4,
        ((a + 1) * p.TAU) / 4
      );
    }

    function state2() {
      for (let yy = 0; yy < canvasHeight; yy += sp) {
        for (let xx = offsetX; xx < canvasWidth; xx += sp) {
          let orientation = Math.floor(p.random(4));
          drawTriangleInCell(xx, yy, orientation);
        }
      }
    }

    function drawTriangleInCell(xx, yy, orientation) {
      switch (orientation) {
        case 0: p.triangle(xx, yy, xx + sp, yy, xx, yy + sp); break;
        case 1: p.triangle(xx + sp, yy, xx + sp, yy + sp, xx, yy); break;
        case 2: p.triangle(xx, yy + sp, xx + sp, yy + sp, xx, yy); break;
        case 3: p.triangle(xx + sp, yy + sp, xx + sp, yy, xx, yy + sp); break;
      }
    }
  });
}
