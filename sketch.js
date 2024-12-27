let yesButton;
let noButton;
let message = "你愛我嗎？";
let hearts = [];
let textColor;

function setup() {
    createCanvas(400, 200);
    textAlign(CENTER, CENTER);
    textFont('Noto Sans TC');
    
    // 設定漸層文字顏色
    textColor = color('#FF69B4');
    
    // 計算按鈕位置
    let centerY = height/2 + 20;
    let buttonSpacing = 20; // 按鈕之間的間距
    let totalButtonWidth = 160; // 兩個按鈕加間距的總寬度
    let startX = width/2 - totalButtonWidth/2; // 第一個按鈕的起始X位置
    
    // 創建"愛"按鈕
    yesButton = createButton('愛');
    yesButton.position(startX, centerY);
    yesButton.mousePressed(showLoveMessage);
    yesButton.id('yesButton');
    
    // 創建"不愛"按鈕
    noButton = createButton('不愛');
    noButton.position(startX + totalButtonWidth - 60, centerY); // 60是按鈕大約的寬度
    noButton.mouseOver(moveNoButton);
    noButton.id('noButton');
}

function draw() {
    background(255, 255, 255, 220);
    
    // 繪製愛心背景
    for (let i = hearts.length - 1; i >= 0; i--) {
        hearts[i].display();
        hearts[i].update();
        if (hearts[i].isOffscreen()) {
            hearts.splice(i, 1);
        }
    }
    
    // 繪製主要文字
    textSize(32);
    drawTextWithShadow(message, width/2, height/2 - 40); // 稍微上移文字
}

// 添加文字陰影效果的函數
function drawTextWithShadow(txt, x, y) {
    // 陰影效果
    push();
    fill(0, 0, 0, 30);
    text(txt, x + 2, y + 2);
    pop();
    
    // 主要文字
    fill(textColor);
    text(txt, x, y);
}

function moveNoButton() {
    let newX = random(50, width-50);
    let newY = random(50, height-50);
    noButton.position(newX, newY);
}

function showLoveMessage() {
    message = "我就知道你一定愛我～";
    // 改變文字顏色
    textColor = color('#FF1493');
    // 產生愛心特效
    for (let i = 0; i < 15; i++) {
        hearts.push(new Heart());
    }
}

// 愛心類別
class Heart {
    constructor() {
        this.x = random(width);
        this.y = height + 20;
        this.speed = random(1, 3);
        this.size = random(10, 20);
        this.opacity = 255;
    }
    
    update() {
        this.y -= this.speed;
        this.opacity -= 2;
    }
    
    display() {
        push();
        translate(this.x, this.y);
        fill(255, 105, 180, this.opacity);
        noStroke();
        beginShape();
        vertex(0, -this.size/2);
        bezierVertex(this.size/2, -this.size, this.size/2, 0, 0, this.size/2);
        bezierVertex(-this.size/2, 0, -this.size/2, -this.size, 0, -this.size/2);
        endShape(CLOSE);
        pop();
    }
    
    isOffscreen() {
        return this.y < -20 || this.opacity <= 0;
    }
}