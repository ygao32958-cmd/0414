// 使用 p5.js 實例模式
let sketch = (p) => {
  // 貝殼類別 - 使用 vertex 指令繪製
  class Shell {
    constructor(x, y, size, shellType) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.shellType = shellType;
      this.rotation = p.random(p.TWO_PI);
      this.pearls = [];
      this.generatePearls();
    }

    generatePearls() {
      let pearlCount = p.random(2, 5);
      for (let i = 0; i < pearlCount; i++) {
        let angle = (p.TWO_PI / pearlCount) * i + p.random(-0.3, 0.3);
        let distance = this.size * 0.3;
        let px = this.x + p.cos(angle) * distance;
        let py = this.y + p.sin(angle) * distance;
        let pearlSize = p.random(6, 12);
        this.pearls.push(new Pearl(px, py, pearlSize, i));
      }
    }

    display() {
      p.push();
      p.translate(this.x, this.y);
      p.rotate(this.rotation);

      if (this.shellType === 0) {
        this.drawSpiralShell();
      } else if (this.shellType === 1) {
        this.drawFanShell();
      } else {
        this.drawConchShell();
      }

      p.pop();

      for (let pearl of this.pearls) {
        pearl.display();
      }
    }

    drawSpiralShell() {
      // 上半部貝殼（紫色系）
      p.fill(180, 130, 180);
      p.stroke(120, 80, 140);
      p.strokeWeight(2);

      p.beginShape();
      for (let i = 0; i <= 20; i++) {
        let angle = (i / 20) * p.PI;
        let dist = this.size * (1 - i / 40);
        let waveAmount = p.sin(angle * 3) * (this.size * 0.15);
        let vx = p.cos(angle) * dist + waveAmount;
        let vy = -p.sin(angle) * dist - this.size * 0.2;
        p.vertex(vx, vy);
      }
      p.endShape();

      // 貝殼內部漸層 - 淺紫
      p.fill(220, 180, 220, 180);
      p.beginShape();
      for (let i = 0; i <= 20; i++) {
        let angle = (i / 20) * p.PI;
        let dist = this.size * 0.9 * (1 - i / 40);
        let waveAmount = p.sin(angle * 3) * (this.size * 0.12);
        let vx = p.cos(angle) * dist + waveAmount;
        let vy = -p.sin(angle) * dist * 0.8 - this.size * 0.15;
        p.vertex(vx, vy);
      }
      p.endShape();

      // 下半部貝殼（更深的紫色）
      p.fill(160, 110, 170);
      p.stroke(100, 60, 130);
      p.strokeWeight(2);

      p.beginShape();
      for (let i = 0; i <= 20; i++) {
        let angle = (i / 20) * p.PI;
        let dist = this.size * (1 - i / 40);
        let waveAmount = p.sin(angle * 3) * (this.size * 0.15);
        let vx = p.cos(angle) * dist + waveAmount;
        let vy = p.sin(angle) * dist + this.size * 0.2;
        p.vertex(vx, vy);
      }
      p.endShape();

      // 貝殼外邊框 - 深色邊線
      p.stroke(80, 40, 100);
      p.strokeWeight(3);
      p.noFill();
      p.beginShape();
      for (let i = 0; i <= 20; i++) {
        let angle = (i / 20) * p.PI;
        let dist = this.size * (1 - i / 40);
        let waveAmount = p.sin(angle * 3) * (this.size * 0.15);
        let vx = p.cos(angle) * dist + waveAmount;
        let vy = -p.sin(angle) * dist - this.size * 0.2;
        p.vertex(vx, vy);
      }
      for (let i = 20; i >= 0; i--) {
        let angle = (i / 20) * p.PI;
        let dist = this.size * (1 - i / 40);
        let waveAmount = p.sin(angle * 3) * (this.size * 0.15);
        let vx = p.cos(angle) * dist + waveAmount;
        let vy = p.sin(angle) * dist + this.size * 0.2;
        p.vertex(vx, vy);
      }
      p.endShape(p.CLOSE);
    }

    drawFanShell() {
      // 上半部
      p.fill(170, 120, 190);
      p.stroke(120, 70, 150);
      p.strokeWeight(2);

      p.beginShape();
      // 底部耳狀結構 (Left ear) - 真實扇貝的特徵
      p.vertex(-this.size * 0.25, 0);
      p.vertex(-this.size * 0.25, -this.size * 0.2);
      p.vertex(-this.size * 0.1, -this.size * 0.2);

      // 扇形主體邊緣 (Scalloped Edge)
      for (let i = 0; i <= 30; i++) {
        let angle = p.map(i, 0, 30, -p.PI * 0.8, -p.PI * 0.2);
        // 使用 abs(sin) 產生更尖銳且真實的稜角感
        let ridge = p.abs(p.sin(i * 0.8)) * (this.size * 0.08);
        let r = this.size + ridge;
        let vx = p.cos(angle) * r;
        let vy = p.sin(angle) * r * 0.8 + this.size * 0.4;
        p.vertex(vx, vy);
      }
      
      // 右側耳狀結構 (Right ear)
      p.vertex(this.size * 0.1, -this.size * 0.2);
      p.vertex(this.size * 0.25, -this.size * 0.2);
      p.vertex(this.size * 0.25, 0);
      p.endShape(p.CLOSE);

      // 下半部
      p.fill(150, 100, 170);
      p.stroke(100, 50, 140);
      p.strokeWeight(2);

      p.beginShape();
      p.vertex(-this.size * 0.25, 0);
      p.vertex(-this.size * 0.25, this.size * 0.2);
      p.vertex(-this.size * 0.1, this.size * 0.2);
      for (let i = 0; i <= 30; i++) {
        let angle = p.map(i, 0, 30, p.PI * 0.8, p.PI * 0.2);
        let ridge = p.abs(p.sin(i * 0.8)) * (this.size * 0.08);
        let r = this.size + ridge;
        let vx = p.cos(angle) * r;
        let vy = p.sin(angle) * r * 0.8 - this.size * 0.4;
        p.vertex(vx, vy);
      }
      p.vertex(this.size * 0.1, this.size * 0.2);
      p.vertex(this.size * 0.25, this.size * 0.2);
      p.vertex(this.size * 0.25, 0);
      p.endShape(p.CLOSE);

      // 內部紋路
      p.stroke(200, 150, 210, 100);
      p.strokeWeight(1);
      for (let i = 1; i < 7; i++) {
        let angle = p.map(i, 0, 7, -p.PI * 0.7, -p.PI * 0.3);
        p.push();
        // 紋路從關節處(0,0)發散到邊緣
        p.line(0, 0, p.cos(angle) * this.size, p.sin(angle) * this.size * 0.8 + this.size * 0.4);
        p.line(0, 0, p.cos(-angle) * this.size, p.sin(-angle) * this.size * 0.8 - this.size * 0.4);
        p.pop();
      }
    }

    drawConchShell() {
      // 外殼 - 深紫
      p.fill(140, 90, 160);
      p.stroke(100, 50, 130);
      p.strokeWeight(2);

      p.beginShape();
      for (let i = 0; i <= 30; i++) {
        let angle = (i / 30) * p.PI * 1.5 - p.PI * 0.75;
        let dist = (i / 30) * this.size * 1.1;
        let waveAmount = p.sin(i * 0.3) * (this.size * 0.12);
        let vx = p.cos(angle) * (dist + waveAmount) - this.size * 0.15;
        let vy = p.sin(angle) * dist * 0.95;
        p.vertex(vx, vy);
      }
      for (let i = 30; i >= 0; i--) {
        let angle = (i / 30) * p.PI * 1.5 - p.PI * 0.75;
        let dist = (i / 30) * this.size * 0.8;
        let waveAmount = p.sin(i * 0.3) * (this.size * 0.08);
        let vx = p.cos(angle) * (dist + waveAmount) - this.size * 0.1;
        let vy = p.sin(angle) * dist * 0.9;
        p.vertex(vx, vy);
      }
      p.endShape(p.CLOSE);

      // 內部高光 - 淺紫
      p.fill(200, 150, 220, 150);
      p.beginShape();
      for (let i = 0; i <= 25; i++) {
        let angle = (i / 25) * p.PI * 1.2 - p.PI * 0.6;
        let dist = (i / 25) * this.size * 0.7;
        let vx = p.cos(angle) * dist - this.size * 0.1;
        let vy = p.sin(angle) * dist * 0.8;
        p.vertex(vx, vy);
      }
      p.endShape();
    }

    checkClick(mx, my) {
      for (let i = 0; i < this.pearls.length; i++) {
        if (this.pearls[i].checkClick(mx, my)) {
          return i;
        }
      }
      return -1;
    }
  }

  // 珍珠類別
  class Pearl {
    constructor(x, y, size, id) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.id = id;
      this.isHovered = false;
      this.glowAmount = 0;
    }

    display() {
      if (this.isHovered) {
        this.glowAmount += 0.1;
      } else {
        this.glowAmount -= 0.05;
      }
      this.glowAmount = p.constrain(this.glowAmount, 0, 1);

      // 繪製外部光暈 - 金黃色
      if (this.glowAmount > 0) {
        p.fill(255, 220, 100, this.glowAmount * 80);
        p.noStroke();
        p.ellipse(this.x, this.y, this.size * (1 + this.glowAmount * 0.8) * 2.5);
      }

      // 繪製珍珠 - 亮白色
      p.fill(255, 245, 220);
      p.stroke(230, 210, 180);
      p.strokeWeight(1.5);
      p.ellipse(this.x, this.y, this.size * 2);

      // 珍珠上的高光 - 強烈光澤
      p.fill(255, 255, 240, 220);
      p.noStroke();
      p.ellipse(this.x - this.size * 0.6, this.y - this.size * 0.6, this.size * 0.9);

      // 珍珠第二層高光
      p.fill(255, 255, 255, 150);
      p.ellipse(this.x - this.size * 0.4, this.y - this.size * 0.4, this.size * 0.4);

      // 珍珠陰影
      p.fill(200, 180, 150, 100);
      p.ellipse(this.x + this.size * 0.4, this.y + this.size * 0.4, this.size * 0.6);
    }

    checkClick(mx, my) {
      let d = p.dist(mx, my, this.x, this.y);
      return d < this.size * 1.5;
    }

    checkHover(mx, my) {
      let d = p.dist(mx, my, this.x, this.y);
      this.isHovered = d < this.size * 1.5;
    }
  }

  let shells = [];

  p.setup = function() {
    let container = document.getElementById('p5-container');
    p.createCanvas(container.offsetWidth, p.windowHeight);
    
    // 使用 for 迴圈初始化貝殼陣列
    for (let i = 0; i < 12; i++) {
      let x = p.random(100, p.width - 100);
      let y = p.random(150, p.height - 100);
      let size = p.random(40, 80);
      let shellType = i % 3;
      shells.push(new Shell(x, y, size, shellType));
    }
  };

  p.draw = function() {
    // 海底漸層背景
    for (let i = 0; i < p.height; i++) {
      let inter = p.map(i, 0, p.height, 0, 1);
      let c = p.lerpColor(p.color(100, 150, 200), p.color(20, 60, 100), inter);
      p.stroke(c);
      p.line(0, i, p.width, i);
    }

    // 繪製海底氣泡（裝飾性）
    drawBubbles();

    // 繪製所有貝殼
    for (let shell of shells) {
      shell.display();
    }

    // 檢查珍珠懸停狀態
    for (let shell of shells) {
      for (let pearl of shell.pearls) {
        pearl.checkHover(p.mouseX, p.mouseY);
      }
    }

    // 繪製提示文字
    p.fill(255);
    p.textAlign(p.CENTER);
    p.textSize(14);
    p.text("點擊珍珠探索作品", p.width / 2, 30);
  };

  function drawBubbles() {
    p.fill(255, 255, 255, 20);
    p.noStroke();
    for (let i = 0; i < 5; i++) {
      let x = p.random(p.width);
      let y = p.random(p.height);
      let size = p.random(3, 15);
      p.ellipse(x, y, size);
    }
  }

  p.mousePressed = function() {
    // 檢查是否點擊到珍珠
    for (let i = 0; i < shells.length; i++) {
      let pearlIndex = shells[i].checkClick(p.mouseX, p.mouseY);
      if (pearlIndex !== -1) {
        // 計算作品索引
        let workIndex = (i * 3 + pearlIndex) % 4;
        // 調用 HTML 中的 showPortfolio 函數
        if (typeof showPortfolio !== 'undefined') {
          showPortfolio(workIndex);
        }
        return false;
      }
    }
  };

  p.windowResized = function() {
    if (document.getElementById('p5-container')) {
      let container = document.getElementById('p5-container');
      p.resizeCanvas(container.offsetWidth, p.windowHeight);
    }
  };
};

// 創建 p5 實例，指定容器
new p5(sketch, 'p5-container');
// 貝殼類別 - 使用 vertex 指令繪製
class Shell {
  constructor(x, y, size, shellType) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.shellType = shellType; // 不同的殼形狀
    this.rotation = random(TWO_PI);
    this.pearls = []; // 珍珠陣列
    this.generatePearls();
  }

  // 使用 for 迴圈和陣列生成珍珠
  generatePearls() {
    let pearlCount = random(2, 5);
    for (let i = 0; i < pearlCount; i++) {
      let angle = (TWO_PI / pearlCount) * i + random(-0.3, 0.3);
      let distance = this.size * 0.3;
      let px = this.x + cos(angle) * distance;
      let py = this.y + sin(angle) * distance;
      let pearlSize = random(6, 12);
      this.pearls.push(new Pearl(px, py, pearlSize, i));
    }
  }

  // 使用 vertex 指令繪製貝殼
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);

    // 根據類型繪製不同的貝殼
    if (this.shellType === 0) {
      this.drawSpiralShell();
    } else if (this.shellType === 1) {
      this.drawFanShell();
    } else {
      this.drawConchShell();
    }

    pop();

    // 繪製珍珠
    for (let pearl of this.pearls) {
      pearl.display();
    }
  }

  // 打開的貝殼 - 上半部
  drawSpiralShell() {
    // 上半部貝殼（紫色系）
    fill(180, 130, 180);
    stroke(120, 80, 140);
    strokeWeight(2);

    beginShape();
    for (let i = 0; i <= 20; i++) {
      let angle = (i / 20) * PI;
      let dist = this.size * (1 - i / 40); // 逐漸縮小
      let waveAmount = sin(angle * 3) * (this.size * 0.15);
      let vx = cos(angle) * dist + waveAmount;
      let vy = -sin(angle) * dist - this.size * 0.2;
      vertex(vx, vy);
    }
    endShape();

    // 貝殼內部漸層 - 淺紫
    fill(220, 180, 220, 180);
    beginShape();
    for (let i = 0; i <= 20; i++) {
      let angle = (i / 20) * PI;
      let dist = this.size * 0.9 * (1 - i / 40);
      let waveAmount = sin(angle * 3) * (this.size * 0.12);
      let vx = cos(angle) * dist + waveAmount;
      let vy = -sin(angle) * dist * 0.8 - this.size * 0.15;
      vertex(vx, vy);
    }
    endShape();

    // 下半部貝殼（更深的紫色）
    fill(160, 110, 170);
    stroke(100, 60, 130);
    strokeWeight(2);

    beginShape();
    for (let i = 0; i <= 20; i++) {
      let angle = (i / 20) * PI;
      let dist = this.size * (1 - i / 40);
      let waveAmount = sin(angle * 3) * (this.size * 0.15);
      let vx = cos(angle) * dist + waveAmount;
      let vy = sin(angle) * dist + this.size * 0.2;
      vertex(vx, vy);
    }
    endShape();

    // 貝殼外邊框 - 深色邊線
    stroke(80, 40, 100);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let i = 0; i <= 20; i++) {
      let angle = (i / 20) * PI;
      let dist = this.size * (1 - i / 40);
      let waveAmount = sin(angle * 3) * (this.size * 0.15);
      let vx = cos(angle) * dist + waveAmount;
      let vy = -sin(angle) * dist - this.size * 0.2;
      vertex(vx, vy);
    }
    for (let i = 20; i >= 0; i--) {
      let angle = (i / 20) * PI;
      let dist = this.size * (1 - i / 40);
      let waveAmount = sin(angle * 3) * (this.size * 0.15);
      let vx = cos(angle) * dist + waveAmount;
      let vy = sin(angle) * dist + this.size * 0.2;
      vertex(vx, vy);
    }
    endShape(CLOSE);
  }

  // 扇形貝殼 - 打開式設計
  drawFanShell() {
    // 上半部
    fill(170, 120, 190);
    stroke(120, 70, 150);
    strokeWeight(2);

    beginShape();
    // 底部耳狀結構
    vertex(-this.size * 0.25, 0);
    vertex(-this.size * 0.25, -this.size * 0.2);
    vertex(-this.size * 0.1, -this.size * 0.2);

    for (let i = 0; i <= 30; i++) {
      let angle = map(i, 0, 30, -PI * 0.8, -PI * 0.2);
      let ridge = abs(sin(i * 0.8)) * (this.size * 0.08);
      let r = this.size + ridge;
      let vx = cos(angle) * r;
      let vy = sin(angle) * r * 0.8 + this.size * 0.4;
      vertex(vx, vy);
    }
    
    vertex(this.size * 0.1, -this.size * 0.2);
    vertex(this.size * 0.25, -this.size * 0.2);
    vertex(this.size * 0.25, 0);
    endShape(CLOSE);

    // 下半部
    fill(150, 100, 170);
    stroke(100, 50, 140);
    strokeWeight(2);

    beginShape();
    vertex(-this.size * 0.25, 0);
    vertex(-this.size * 0.25, this.size * 0.2);
    vertex(-this.size * 0.1, this.size * 0.2);
    for (let i = 0; i <= 30; i++) {
      let angle = map(i, 0, 30, PI * 0.8, PI * 0.2);
      let ridge = abs(sin(i * 0.8)) * (this.size * 0.08);
      let r = this.size + ridge;
      let vx = cos(angle) * r;
      let vy = sin(angle) * r * 0.8 - this.size * 0.4;
      vertex(vx, vy);
    }
    vertex(this.size * 0.1, this.size * 0.2);
    vertex(this.size * 0.25, this.size * 0.2);
    vertex(this.size * 0.25, 0);
    endShape(CLOSE);

    // 內部紋路
    stroke(200, 150, 210, 100);
    strokeWeight(1);
    for (let i = 1; i < 7; i++) {
      let angle = map(i, 0, 7, -PI * 0.7, -PI * 0.3);
      push();
      line(0, 0, cos(angle) * this.size, sin(angle) * this.size * 0.8 + this.size * 0.4);
      line(0, 0, cos(-angle) * this.size, sin(-angle) * this.size * 0.8 - this.size * 0.4);
      pop();
    }
  }

  // 螺形貝殼 - 打開式
  drawConchShell() {
    // 外殼 - 深紫
    fill(140, 90, 160);
    stroke(100, 50, 130);
    strokeWeight(2);

    beginShape();
    for (let i = 0; i <= 30; i++) {
      let angle = (i / 30) * PI * 1.5 - PI * 0.75;
      let dist = (i / 30) * this.size * 1.1;
      let waveAmount = sin(i * 0.3) * (this.size * 0.12);
      let vx = cos(angle) * (dist + waveAmount) - this.size * 0.15;
      let vy = sin(angle) * dist * 0.95;
      vertex(vx, vy);
    }
    for (let i = 30; i >= 0; i--) {
      let angle = (i / 30) * PI * 1.5 - PI * 0.75;
      let dist = (i / 30) * this.size * 0.8;
      let waveAmount = sin(i * 0.3) * (this.size * 0.08);
      let vx = cos(angle) * (dist + waveAmount) - this.size * 0.1;
      let vy = sin(angle) * dist * 0.9;
      vertex(vx, vy);
    }
    endShape(CLOSE);

    // 內部高光 - 淺紫
    fill(200, 150, 220, 150);
    beginShape();
    for (let i = 0; i <= 25; i++) {
      let angle = (i / 25) * PI * 1.2 - PI * 0.6;
      let dist = (i / 25) * this.size * 0.7;
      let vx = cos(angle) * dist - this.size * 0.1;
      let vy = sin(angle) * dist * 0.8;
      vertex(vx, vy);
    }
    endShape();
  }

  // 檢查點擊
  checkClick(mx, my) {
    for (let i = 0; i < this.pearls.length; i++) {
      if (this.pearls[i].checkClick(mx, my)) {
        return i; // 回傳點擊的珍珠索引
      }
    }
    return -1;
  }
}

// 珍珠類別
class Pearl {
  constructor(x, y, size, id) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.id = id;
    this.isHovered = false;
    this.glowAmount = 0;
  }

  display() {
    // 計算發光效果
    if (this.isHovered) {
      this.glowAmount += 0.1;
    } else {
      this.glowAmount -= 0.05;
    }
    this.glowAmount = constrain(this.glowAmount, 0, 1);

    // 繪製外部光暈 - 金黃色
    if (this.glowAmount > 0) {
      fill(255, 220, 100, this.glowAmount * 80);
      noStroke();
      ellipse(this.x, this.y, this.size * (1 + this.glowAmount * 0.8) * 2.5);
    }

    // 繪製珍珠 - 亮白色
    fill(255, 245, 220);
    stroke(230, 210, 180);
    strokeWeight(1.5);
    ellipse(this.x, this.y, this.size * 2);

    // 珍珠上的高光 - 強烈光澤
    fill(255, 255, 240, 220);
    noStroke();
    ellipse(this.x - this.size * 0.6, this.y - this.size * 0.6, this.size * 0.9);

    // 珍珠第二層高光
    fill(255, 255, 255, 150);
    ellipse(this.x - this.size * 0.4, this.y - this.size * 0.4, this.size * 0.4);

    // 珍珠陰影
    fill(200, 180, 150, 100);
    ellipse(this.x + this.size * 0.4, this.y + this.size * 0.4, this.size * 0.6);
  }

  checkClick(mx, my) {
    let d = dist(mx, my, this.x, this.y);
    return d < this.size * 1.5;
  }

  checkHover(mx, my) {
    let d = dist(mx, my, this.x, this.y);
    this.isHovered = d < this.size * 1.5;
  }
}

// 技術點：Class 物件導向 - 海草類別
class Seaweed {
  constructor(x, y, segments, segmentHeight, w) {
    this.x = x;
    this.y = y;
    this.segments = segments; // 分段數，決定海草的細緻度
    this.segmentHeight = segmentHeight; // 每段的高度
    this.w = w; // 底部寬度
    this.offset = random(1000); // 隨機相位偏移，讓每根海草飄動不同步
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(40, 120, 60, 180); // 深綠色，帶點透明度增加層次感
    noStroke();
    
    // 技術點：Vertex 指令繪製複雜有機形狀
    beginShape();
    // 左側邊緣頂點：由底向上
    for (let i = 0; i <= this.segments; i++) {
      let py = -i * this.segmentHeight;
      // 使用 sin 函數隨時間(frameCount)產生波浪，i 越高晃動幅度越大
      let xOff = sin(frameCount * 0.03 + i * 0.3 + this.offset) * (i * 1.5);
      let currentW = map(i, 0, this.segments, this.w, 1);
      vertex(xOff - currentW, py);
    }
    // 右側邊緣頂點：由頂向下回到基底
    for (let i = this.segments; i >= 0; i--) {
      let py = -i * this.segmentHeight;
      let xOff = sin(frameCount * 0.03 + i * 0.3 + this.offset) * (i * 1.5);
      let currentW = map(i, 0, this.segments, this.w, 1);
      vertex(xOff + currentW, py);
    }
    endShape(CLOSE);
    pop();
  }
}

// 全局變數
let shells = [];
let seaweeds = [];
let seaColor;

function setup() {
  createCanvas(800, 600);
  
  // 初始化海洋顏色漸層
  seaColor = color(30, 80, 120);

  // 使用 for 迴圈初始化貝殼陣列
  for (let i = 0; i < 12; i++) {
    let x = random(100, width - 100);
    let y = random(150, height - 100);
    let size = random(40, 80);
    let shellType = i % 3;
    shells.push(new Shell(x, y, size, shellType));
  }

  // 技術點：For 迴圈與陣列 - 初始化海草
  for (let i = 0; i < 12; i++) {
    let x = random(width);
    let y = height; // 從畫面底部生長
    let segments = random(10, 18);
    let segH = random(12, 22);
    let w = random(10, 20);
    seaweeds.push(new Seaweed(x, y, segments, segH, w));
  }
}

function draw() {
  // 海底漸層背景
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(100, 150, 200), color(20, 60, 100), inter);
    stroke(c);
    line(0, i, width, i);
  }

  // 繪製海草 (在貝殼之前繪製，作為背景裝飾)
  for (let sw of seaweeds) {
    sw.display();
  }

  // 繪製海底氣泡（裝飾性）
  drawBubbles();

  // 繪製所有貝殼
  for (let shell of shells) {
    shell.display();
  }

  // 檢查珍珠懸停狀態
  for (let shell of shells) {
    for (let pearl of shell.pearls) {
      pearl.checkHover(mouseX, mouseY);
    }
  }

  // 繪製提示文字
  fill(255);
  textAlign(CENTER);
  textSize(14);
  text("點擊珍珠探索作品", width / 2, 30);
}

// 繪製氣泡
function drawBubbles() {
  fill(255, 255, 255, 20);
  noStroke();
  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(3, 15);
    ellipse(x, y, size);
  }
}

function mousePressed() {
  // 檢查是否點擊到珍珠
  for (let i = 0; i < shells.length; i++) {
    let pearlIndex = shells[i].checkClick(mouseX, mouseY);
    if (pearlIndex !== -1) {
      // 計算作品索引
      let workIndex = (i * 3 + pearlIndex) % 4;
      // 調用 HTML 中的 showPortfolio 函數
      if (typeof showPortfolio !== 'undefined') {
        showPortfolio(workIndex);
      }
      return false;
    }
  }
}

function keyPressed() {
  if (key === 'Escape' || key === 'Esc') {
    // ESC 鍵由 HTML 中的 JavaScript 處理
  }
}
