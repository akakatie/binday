function createSketch() {
  const z = [-1, -1, +1, -1, +1, +1, -1, +1];

  new p5((p) => {
    let sp; 
    let x, y;
    let numCells;
    let canvasWidth, canvasHeight;
    const ideal = 50; // ideal cell size
    const min = 45, max = 55; // allowable range for sp

    const leftDiv = document.getElementById("left");

    p.setup = function() {
      canvasWidth = leftDiv.offsetWidth;
      canvasHeight = leftDiv.offsetHeight;

      let cnv = p.createCanvas(canvasWidth, canvasHeight);
      cnv.parent("left");
      cnv.id("p5Canvas");

      p.strokeWeight(2);
      p.stroke("#121212");

      recalcGrid();
      drawState();
    };

    p.windowResized = function() {
      // Update canvas size to match parent
      canvasWidth = leftDiv.offsetWidth;
      canvasHeight = leftDiv.offsetHeight;
      p.resizeCanvas(canvasWidth, canvasHeight);

      recalcGrid();
      drawState();
    };

    function recalcGrid() {
      // Calculate number of cells that fit
      numCells = Math.floor(canvasWidth / ideal);

      // Adjust sp so cells approximately fill width
      sp = canvasWidth / numCells;

      // Clamp to allowable range
      sp = Math.max(min, Math.min(max, sp));

      // Reset starting coordinates
      x = sp / 2;
      y = sp / 2;
    }

    function drawState() {
      p.clear(); // clear previous drawings

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

      // Draw right stripe to fill gap
      const gap = canvasWidth - sp * numCells;
      if (gap > 0) {
        p.noStroke();
        p.fill("#121212");
        p.rect(canvasWidth - gap, 0, gap, canvasHeight);
      }
    }

    function state1() {
      p.strokeWeight(5);
      p.stroke("#121212");
      x = sp / 2;
      y = sp / 2;

      while (y < p.height) {
        if (p.random(100) > 50) {
          arcDraw1(1, x, y);
          arcDraw1(3, x, y);
        } else {
          arcDraw1(0, x, y);
          arcDraw1(2, x, y);
        }

        x += sp;
        if (x > p.width) {
          y += sp;
          x = sp / 2;
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
      for (let yy = 0; yy < p.height; yy += sp) {
        for (let xx = 0; xx < p.width; xx += sp) {
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
