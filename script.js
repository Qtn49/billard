// Récupération du canvas

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var responsiveConst = 205;
var a = 500, b = 300, r = 5; // a = largeur de l'ellipse, b = hauteur de l'ellipse, r = rayon de la balle

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

var xB, yB, deplacementX, deplacementY, stop = false, lance = false, oldX, oldY;

function lancer() {
    xB = canvas.width / 2 - a + r + r, yB = canvas.height / 2;
    deplacementX = Math.random() * 5 + 3, deplacementY = Math.random() * 10 -5; // Math.random() * 10 - 5
    console.log("deplacement x : " + deplacementX + "\ndeplacement y : " + deplacementY + "\n*****************\n\n")
    stop = false;
    deplacerX();
}

addEventListener('keydown', function (e) {
    if (e.keyCode === 32 && lance) {
        stop = true;
        lance = false;
    }else if (e.keyCode === 32) {
        stop = false;
        lancer();
        lance = true;
    }
});

function deplacerX() {
    if (stop)
        return;
    if (Math.floor(Math.sqrt(Math.pow(b, 2) * (1 -
        Math.pow(xB - (canvas.width / 2 - a) - a + r, 2) /
        Math.pow(a, 2)))) === Math.abs(yB - (canvas.height / 2 - b) - b))
        console.log(xB);

    if (xB >= canvas.width / 2 + a - r && (Math.abs(yB - (canvas.height / 2 - b) - b)) === Math.sqrt(Math.pow(b, 2) * (1 -
     Math.pow(xB - (canvas.width / 2 - a) - a + r, 2) /
     Math.pow(a, 2)))) {
        deplacementX *= -1;
    }

    var z = xB - (canvas.width / 2 - a) - a;
    var k = (yB - (canvas.height / 2 - b) - b) * -1;

    oldX = z - deplacementX;
    oldY = k + deplacementY;

    var m = (oldX - z) / (oldY - k);
    var p = k - m * z;
    var yDebut = Math.abs(Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(z - r, 2) / Math.pow(a, 2))));
    var yFin = Math.abs(Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(z + r, 2) / Math.pow(a, 2))));

    console.log("y de la balle pour le bout de la balle :" + Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(z + r, 2) / Math.pow(a, 2))));
    console.log("y de la balle pour le début de la balle :" + Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(z - r, 2) / Math.pow(a, 2))));
    console.log("y actuel : " + (k + r));
    //console.log(k + r >= Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(z - r, 2) / Math.pow(a, 2))) && k + r <=
    // Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(z + r, 2) / Math.pow(a, 2))));
    if (k > 0) {
        if (z < 0) {
            if (Math.abs(k + r) >= yDebut && k + r <= yFin) {
                stop = true;
            }
        }else {
            if (k + r <= yDebut && k + r >= yFin) {
                stop = true;
            }
        }
    }else {
        if (z < 0) {
            if (k - r <= -yDebut && k - r >= -yFin) {
                stop = true;
            }
        }else {
            if (k - r >= -yDebut && k - r <= -yFin) {
                stop = true;
            }
        }
    }

    if (k > b || k < -b || z > a) {
        alert("Perdu !");
        stop = true;
    }

    //console.log("equation de la droite : y=" + m + "x + " + p);

    requestAnimationFrame(deplacerX);
    drawEllipse();
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(xB, yB, r, -Math.PI, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    xB += deplacementX;
    yB += deplacementY;
}

/*drawEllipse();

 */


drawEllipse();