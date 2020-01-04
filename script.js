// Récupération du canvas
var responsiveConst = 150;
var a = 500, b = 300, r = 30; // a = largeur de l'ellipse, b = hauteur de l'ellipse, r = rayon de la balle
var svg = document.getElementById("svg");
var ball = document.getElementById("ball");
var ellipse = document.getElementById("ellipse");
var xB, yB, deplacementX, deplacementY, stop = false, lance = false, oldX, oldY;
//var m = Math.random() * 10 - 5;

svg.setAttribute("width", innerWidth - innerWidth / responsiveConst);
svg.setAttribute("height", innerHeight - innerHeight / responsiveConst);

ellipse.setAttribute("cx", svg.getAttribute("width") / 2);
ellipse.setAttribute("cy", svg.getAttribute("height") / 2);
ellipse.setAttribute("rx", a);
ellipse.setAttribute("ry", b);

ball.setAttribute("cx", svg.getAttribute("width") / 2);
ball.setAttribute("cy", svg.getAttribute("height") / 2);

// equation de l'ellipse : y = +/- sqrt(b²(1-x²/a²))

function lancer() {
    xB = parseFloat(ball.getAttribute("cx"));
    yB = parseFloat(ball.getAttribute("cy"));
    /*xB = svg.getAttribute("width") / 2;
    yB = svg.getAttribute("height") / 2;*/
    deplacementX = Math.random() * 10 - 5;
    deplacementY = Math.random() * 10 - 5; // Math.random() * 10 - 5
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
        Math.pow(xB - (svg.getAttribute("width") / 2 - a) - a + r, 2) /
        Math.pow(a, 2)))) === Math.abs(yB - (svg.getAttribute("height") / 2 - b) - b))
        console.log(xB);

    if (xB >= svg.getAttribute("width") / 2 + a - r && (Math.abs(yB - (svg.getAttribute("height") / 2 - b) - b)) === Math.sqrt(Math.pow(b, 2) * (1 -
     Math.pow(xB - (svg.getAttribute("width") / 2 - a) - a + r, 2) /
     Math.pow(a, 2)))) {
        deplacementX *= -1;
    }

    var z = xB - svg.getAttribute("width") / 2;
    var k = (1/2) * (svg.getAttribute("height") - 2 * yB);

    oldX = z - deplacementX;
    oldY = k + deplacementY;

    var m = (oldY - k) / (oldX - z);
    var p = k - m * z;
    var yDebut = Math.abs(Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(z - r, 2) / Math.pow(a, 2))));
    var yFin = Math.abs(Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(z + r, 2) / Math.pow(a, 2))));

    //console.log("y de la balle pour le bout de la balle :" + Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(z + r, 2) /
    // Math.pow(a, 2))));
    //console.log("y de la balle pour le début de la balle :" + Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(z - r, 2) /
    // Math.pow(a, 2))));
    //console.log("y actuel : " + (k + r));
    //console.log(k + r >= Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(z - r, 2) / Math.pow(a, 2))) && k + r <=
    // Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(z + r, 2) / Math.pow(a, 2))));

    //console.log("oldX : " + oldX + "\nz : " + z + "\noldY : " + oldY + "\nk : " + k);
    //console.log("equation de la droite : y=" + m + "x + " + p);

    var equA = Math.pow(b, 2) + Math.pow(a, 2) * Math.pow(m, 2);
    var equB = 2 * Math.pow(a, 2) * m * p;
    var equC = Math.pow(a, 2) * Math.pow(p, 2) - Math.pow(a, 2) * Math.pow(b, 2);
    var equDelta = Math.pow(equB, 2) - 4 * equA * equC;
    var angle = 30, vitesse = 5;
    var x1 = (-equB + Math.sqrt(equDelta)) / (2 * equA);
    var x2 = (-equB - Math.sqrt(equDelta)) / (2 * equA);
    var xIntersect, yIntersect;

    if (deplacementX > 0) {
        xIntersect = (x1 > x2) ? x1 : x2;
        if (m > 0)
            yIntersect = Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(xIntersect, 2) / Math.pow(a, 2)));
        else
            yIntersect = -Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(xIntersect, 2) / Math.pow(a, 2)));
    } else {
        xIntersect = (x1 > x2) ? x2 : x1;
        if (m < 0)
            yIntersect = Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(xIntersect, 2) / Math.pow(a, 2)));
        else
            yIntersect = -Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(xIntersect, 2) / Math.pow(a, 2)));
    }

    /*console.log("La balle se dirige vers le point de coordonnée x : " + xIntersect);
    console.log("Et y vaut : " + yIntersect);

     */

    angle = angle / 180 * Math.PI;
    //console.log("equA : " + equA + "\nequaB : " + equB + "\nequC : " + equC + "\nequDelta : " + equDelta);
    //console.log("premier point : " + (-equB + Math.sqrt(equDelta)) / (2 * equA));
    //console.log("deuxième point : " + (-equB - Math.sqrt(equDelta)) / (2 * equA));

    var n = 10, angle, xC, yC;

    for (let i = 0; i <= n; i++) {
        angle = ((2 * Math.PI) / n) * i;
        xC = (z + r * Math.cos(angle));
        yC = (k + r * Math.sin(angle));
        if ((Math.pow(xC, 2) / Math.pow(a, 2) + Math.pow(yC, 2) / Math.pow(b, 2)) >= 1) {
            stop = true;
            //console.log("Le point d'intersection a pour coordonnées \nx : " + (xC / 100) + "\ny : " + (yC / 100));
            var mT = (-Math.pow(b, 2) * xC) / (Math.pow(a, 2) * Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(xC, 2) / Math.pow(a, 2))));
            var pT;
            if (yC > 0) {
                pT = -xC * mT + Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(xC, 2) / Math.pow(a, 2)));
            }else {
                mT = -mT;
                pT = -xC * mT - Math.sqrt(Math.pow(b, 2) * (1 - Math.pow(xC, 2) / Math.pow(a, 2)));
            }
            var mP = -1/mT;
            var pP = yC - mP * xC;
            var xS, yS, mS, pS;
            xS = (pP - p) / (m - mP);
            yS = m * xS + p;
            mS = Math.tan(2 * Math.atan(mP) - Math.atan(m));
            pS = yS - mS * xS;
            console.log("La droite de la direction de la balle est définie par : y=" + m + "x+" + (p / 100));
            console.log("La tangeante est défini par : y=" + mT + "x+" + (pT/100));
            console.log("La perpendiculaire à la tangente est définie par : y=" + mP + "x+" + (pP / 100));
            console.log("La droite symétrique à la trajectoire de la balle par rapport à la perpendiculaire est" +
                " définie par : y=" + mS + "x+" + (pS / 100));


            m = mS;
            p = pS;
            return;
        }
    }
    requestAnimationFrame(deplacerX);
    ball.setAttribute("cx", xB);
    ball.setAttribute("cy", yB);

    xB += deplacementX;
    yB += deplacementY;
}

var selectedElement, offset;

ball.addEventListener('mousedown', function (e) {
    selectedElement = e.target;
    offset = getMousePosition(e);
    offset.x -= parseFloat(selectedElement.getAttributeNS(null, "x"));
    offset.y -= parseFloat(selectedElement.getAttributeNS(null, "y"));
});

ball.addEventListener('mousemove', function (e) {
    if (selectedElement) {
        e.preventDefault();
        var coord = getMousePosition(e);
        selectedElement.setAttribute("cx", coord.x);
        selectedElement.setAttribute("cy", coord.y);
    }
});

ball.addEventListener('mouseup', function (e) {
    selectedElement = null;
    lance = false;
    stop = false;
});

function getMousePosition(evt) {
    var CTM = svg.getScreenCTM();
    return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
    };
}
