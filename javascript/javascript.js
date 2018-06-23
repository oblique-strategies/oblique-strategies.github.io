/*
 * Définition de variables
....................................................................................
*/

var canvas = document.getElementById('canvas');
var intro  = document.getElementById('intro');
var frame  = document.getElementById('frame');

var illustration = document.getElementById("illustration");
var phrase       = document.getElementById("phrase");
var timeout      = document.getElementById('timeout');

var cardNumber = 0;
var cardMaximum = cards.length - 1;

/*
 * Tester variable URL
....................................................................................

 // On teste si le mode démo est activé

*/

var modeDemo = window.location.hash;

if ( modeDemo == "#demo" ) {

	eraseCookie('heure');
	eraseCookie('phrase');
	eraseCookie('illustration');
	eraseCookie('compteur');

} else {

	var lastNumber = getCookie('compteur');

	if ( lastNumber ) {

		var cardNumber = lastNumber;

	}

}

/*
 * Evenements
....................................................................................
*/

var startButton = document.getElementById('start');
var reloadButton = document.getElementById('retirer');
var aboutButton = document.getElementById('infos');

if (startButton) {
	startButton.addEventListener('click', premiereCarte, false);
}
if (reloadButton) {
	reloadButton.addEventListener('click', tirerCarte, false);
}
if (aboutButton) {
	aboutButton.addEventListener('click', showAbout, false);
}

// Délai d'attente après chaque tirage
// Sera multiplié pour obtenir des secondes / minutes
var attente = [
  0,
  16,
  31,
  61,
 121,
 241,
 481
];


/*
 * Animation de l'intro
....................................................................................
*/

function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}

if (canvas) {

	var i;
	for (i = 0; i < 30; i++) {
	  var circle = document.createElement('div');
	  circle.className = "circle";
	  circle.id = 'circle'+i;

	  var size = getRandom(2,10)+'vmax'
	  circle.style.width = size;
	  circle.style.height = size;

		circle.style.top = getRandom(0, 100)+'vh';
		circle.style.animationDelay = getRandom(0, 15)+'s';

	  canvas.appendChild(circle);
	};

}

/*
 * Pour des détails sur le fonctionnement des animations, voir:
 * https://github.com/oblique-strategies/oblique-strategies.github.io/issues/1
*/


function cacherIntro(delay) {

	// Ce qui suit va se produire après un délai de 1000 millisecondes.

		setTimeout(function() {

			intro.style.left = "100vw"; // Fait disparaître l'animation
			intro.style.transition = "left 1s ease-in-out";

			frame.style.right = "0vw"; // Fait apparaître le contenu
			frame.style.transition = "right 1s ease-in-out";

			intro.classList.remove("about-text");

		}, delay);

}


/*
 * Tirage des cartes
....................................................................................
*/


/*
 * Tirage de la première carte
....................................................................................
*/

function premiereCarte(e) {

	e.preventDefault();

	canvas.classList.add("transparent"); // Rendre transparente l'animation

	cacherIntro(1000);

	setTimeout(function() {
		// On supprime #canvas, pour être certain 
		// que l'animation ne consomme pas de puissance de calcul.
		canvas.parentNode.removeChild(canvas);
	}, 1000);

	// Vérifier si la dernière carte est encore en mémoire.

	var derniereCarte = getCookie('phrase');

	if (derniereCarte) {

		illustration.src = getCookie('illustration');
		phrase.innerHTML = derniereCarte;

		setTimeout(function() {
			afficherPhrase();
		}, 2000);

	} else {

		nouvelleCarte();

	}

} // fin de premiereCarte()

/*
 * Tirage de nouvelle carte
....................................................................................
*/

function tirerCarte(e) {

	e.preventDefault();

	var tempsActuel = new Date().getTime(); // on relève le temps actuel
	var dernierTirage = getCookie('heure'); // on vérifie l'heure du dernier tirage

	if (dernierTirage) {

	    // on détermine le nombre de millisecondes
	    // écoulées depuis le dernier tirage:

	    var tempsEcoule = tempsActuel - dernierTirage;

	    // on vérifie le temps d'attente imposé,
	    // en fonction du nombre de cartes déjà tirées:

	    var tempsAttente = attente[cardNumber]*1000*60;

	    if ( tempsEcoule < tempsAttente ) {

	    	var tempsDiff = tempsAttente - tempsEcoule;

	    	var tempsMessage = Math.floor(tempsDiff/60000) + ' minutes';

	    	if ( tempsDiff < ( 120000 ) ) {
	    		var tempsMessage = 'une minute';
	    	}

	    	if ( tempsDiff < ( 60*000 ) ) {
	    		var tempsMessage = 'quelques secondes';
	    	}

				timeout.innerHTML = '<p>Le compte-à-rebours n’est pas écoulé. Prochain tirage possible dans '+ tempsMessage + '.</p>';
				timeout.style.transitionDuration = "0s";
				timeout.style.opacity = "1";
				

				setTimeout(function() {
					timeout.style.transitionDuration = "0.5s";
					timeout.style.opacity="0";
				}, 5000);

	    } else { // le délai est écoulé, on peut tirer une carte

	    	// D'abord, on masque la phrase
	    	illustration.style.opacity = "0";
	    	phrase.style.opacity = "0";
	    	phrase.style.transform = "scale(0.8)";

	    	setTimeout(function() {
					nouvelleCarte();
				}, 1000);

	    }

	} else { // le cookie n'est pas défini, c'est le premier tirage

		nouvelleCarte();

	}

}

function nouvelleCarte() {

	var tempsActuel = new Date().getTime();

	// on affiche la phrase:

	illustration.src = "img/"+cards[cardNumber][0];
	phrase.innerHTML =        cards[cardNumber][1];

	afficherPhrase();
 	
	if ( cardNumber == cardMaximum ) {

		cardNumber = 0; // on a atteint la dernière carte - reset

	} else {

		cardNumber++; // on incrémente de 1

	}

	// Enregistrement des cookies

	if ( modeDemo != "#demo" ) {

		setCookie('heure', tempsActuel, 8); // l'heure du tirage
		setCookie('compteur', cardNumber, 8);
		setCookie('illustration', illustration.src, 8);
		setCookie('phrase', phrase.innerHTML, 8);

	}

}

function afficherPhrase() {

	phrase.style.opacity = "1";
 	phrase.style.transform = "scale(1)";

 	illustration.style.opacity = "1";
 	illustration.style.transform = "scale(1)";

}


/*
 * Chargement Informations
....................................................................................
*/


function showAbout(e) {

	e.preventDefault();

	// Charger le contenu...

	var request = new XMLHttpRequest();

	// request.open('GET', '/somepage', true);
	request.open('Get', 'about/');

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {

	    var resp = request.responseText;

			var parser = new DOMParser();
			doc = parser.parseFromString(resp, "text/html");
			var remainder = doc.getElementById("about").innerHTML;

			intro.innerHTML = remainder;

			intro.classList.add("about-text");

			intro.style.left = "0px";
			intro.style.overflowY = "auto";

			frame.style.right = "100vw";

	  }
	};

	request.send();

}
