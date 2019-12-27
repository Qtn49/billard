// Récupération du canvas

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var responsiveConst = 205;
var a = 500, b = 300;

canvas.width = document.body.clientWidth - innerWidth / responsiveConst;
canvas.height = document.body.clientHeight - innerHeight / responsiveConst;

ctx.fillStyle = "green";

function drawEllipse () {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, canvas.height / 2, a, b, 0, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function drawMyOwnEllipse() {
    for (let x = -a; x < a; x++) {
        y = Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(x, 2) / Math.pow(a, 2)));
        y2 = -Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(x, 2) / Math.pow(a, 2)));
        console.log(y);
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.fillRect(canvas.width / 2 + x, y + canvas.height / 2, 1, 1);
        ctx.fillRect(canvas.width / 2 + x, canvas.height / 2 + y2, 1, 1);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

// equation de l'ellipse : y = +/- sqrt(b²(1-x²/a²))

var xB = canvas.width / 2 - 500 + 30, pos = true, yB = canvas.height / 2;
var deplacement = 4;

function deplacerX() {
    if (xB >= canvas.width / 2 + 500 - 30)
        pos = false;
    if (xB <= canvas.width / 2 - 500 + 30)
        pos = true;
    requestAnimationFrame(deplacerX);
    drawEllipse();
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(xB, yB, 30, -Math.PI, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    if (pos) {
        xB += deplacement;
    }else {
        xB -= deplacement;
    }
}

/*drawEllipse();

 */



drawMyOwnEllipse();
deplacerX();