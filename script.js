// Récupération du canvas

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var responsiveConst = 205;

canvas.width = document.body.clientWidth - innerWidth / responsiveConst;
canvas.height = document.body.clientHeight - innerHeight / responsiveConst;

ctx.fillStyle = "green";

function drawEllipse () {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, canvas.height / 2, 300, 500, Math.PI / 2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
}

var x = canvas.width / 2 - 500 + 30, pos = true;
var deplacement = 10;

function deplacerX() {
    if (x >= canvas.width / 2 + 500 - 30)
        pos = false;
    if (x <= canvas.width / 2 - 500 + 30)
        pos = true;
    drawEllipse();
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(x - 2, canvas.height / 2, 30, -Math.PI, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
    if (pos) {
        x += deplacement;
    }else {
        x -= deplacement;
    }
}

for (let x = canvas.width / 2 - 500 + 30; x < canvas.width / 2 + 500 - 30; x++) {

}


drawEllipse();
setInterval(deplacerX, 22);
