/*
 * Animation de l'intro
....................................................................................
*/

function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}

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
	//circle.style.transform = 'translateX('+getRandom(0, 100)+'vw)';
  document.getElementById("canvas").appendChild(circle);
};

/*
 * Pour des détails sur le fonctionnement des animations, voir:
 * https://github.com/oblique-strategies/oblique-strategies.github.io/issues/1
*/



/*
 * Tirage de la première carte
....................................................................................
*/

var startButton = document.getElementById('start');

startButton.addEventListener('click', premiereCarte, false);

function premiereCarte(e) {

	e.preventDefault();

	var canvas = document.getElementById('canvas');
	var intro    = document.getElementById('intro');
	var frame    = document.getElementById('frame');

	// Rendre transparente l'animation

	canvas.className += " transparent";
	
	cacherIntro();
	
	// Tirer une première carte
	
		tirerCarte();
	
} // fin de premiereCarte()



function cacherIntro() {

	// Ce qui suit va se produire après un délai de 1000 millisecondes.
	
		setTimeout(function() {
	
			intro.style.left = "100vw"; // Fait disparaître l'animation
			intro.style.transition = "left 1s ease-in-out";
	
			frame.style.right = "0vw"; // Fait apparaître le contenu
			frame.style.transition = "right 1s ease-in-out";
	
			canvas.parentNode.removeChild(canvas);
	
		}, 1000);
		
}


/*
 * Tirage des cartes
....................................................................................
*/

var cardNumber = 0;
var cardMaximum = cards.length - 1;

// Délai d'attente après chaque tirage
// Sera multiplié pour obtenir des secondes / minutes
var attente = [
	15,
	30,
	60,
 120,
 240,
 480
];

function tirerCarte() {

	var tempsActuel = new Date().getTime(); // on relève le temps actuel
	var dernierTirage = getCookie('heure'); // on vérifie l'heure du dernier tirage

	if (dernierTirage) {

	    // on détermine le nombre de millisecondes 
	    // écoulées depuis le dernier tirage:

	    var tempsEcoule = tempsActuel - dernierTirage;

	    // on vérifie le temps d'attente imposé,
	    // en fonction du nombre de cartes déjà tirées:

	    var tempsAttente = attente[cardNumber]*1000;

	    if ( tempsEcoule < tempsAttente ) {

	    	document.getElementById('phrase').innerHTML = 'Pas si vite! Prochain tirage possible dans '+ Math.floor((tempsAttente - tempsEcoule)/1000) + 'sec';

	    } else { // le délai est écoulé, on peut tirer une carte

	    	nouvelleCarte();

	    }

	} else { // le cookie n'est pas défini, c'est le premier tirage

		nouvelleCarte();
	
	}

}

function nouvelleCarte() {

	var tempsActuel = new Date().getTime();

	var illustration = document.getElementById("illustration");
	var phrase       = document.getElementById("phrase");

	// on affiche la phrase:

	illustration.src = "img/"+cards[cardNumber][0];
	phrase.innerHTML =        cards[cardNumber][1];

	if ( cardNumber == cardMaximum ) {
	
		cardNumber = 0; // on a atteint la dernière carte - reset

	} else {

		cardNumber++; // on incrémente de 1

	}

	setCookie('heure', tempsActuel, 8); // on enregistre l'heure du tirage

}


/*
 * Chargement Informations
....................................................................................
*/

var aboutButton = document.getElementById('infos');

aboutButton.addEventListener('click', showAbout, false);

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
			
			// var requestContent = resp.querySelector('#about');
	    // document.querySelector('#div').innerHTML = resp;
			
			// console.log(remainder);
			
			intro.innerHTML = remainder;
			
			intro.className += " about-text";
			
			intro.style.left = "0px";
			intro.style.overflowY = "auto";
			
			frame.style.right = "100vw";
			
	  }
	};
	
	request.send();
			
	// on remet à l'écran la page #intro
	

	
}

