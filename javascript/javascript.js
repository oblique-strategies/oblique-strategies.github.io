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

var startButton = document.getElementById('start');

startButton.addEventListener('click', premiereCarte, false);

function premiereCarte() {

	var canvas = document.getElementById('canvas');
	var intro    = document.getElementById('intro');
	var frame    = document.getElementById('frame');

	// Tirer une première carte

	tirerCarte();

	// Rendre transparente l'animation

	canvas.className += " transparent";

	// Ce qui suit va se produire après un délai de 1000 millisecondes.

	setTimeout(function() {

		intro.style.left = "100vw"; // Fait disparaître l'animation
		intro.style.transition = "left 1s ease-in-out";

		frame.style.right = "0vw"; // Fait apparaître le contenu
		frame.style.transition = "right 1s ease-in-out";

		canvas.parentNode.removeChild(canvas);

	}, 1000);

} // fin de premiereCarte()


/*
 * Tirage des cartes
....................................................................................
*/

var cardNumber = 0;
var cardMaximum = cards.length - 1;

function shuffle(a) {
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
}

shuffle(cards);

var attente = [
	15,
	30,
	60,
 120,
 240,
 480
];

function tirerCarte() {

	var tempsActuel = new Date().getTime();
	var dernierTirage = getCookie('heure');

	if (dernierTirage) {

	    // on compte le nombre de millisecondes 
	    // écoulées depuis le dernier tirage:
	    var tempsEcoule = tempsActuel - dernierTirage;

	    var tempsAttente = attente[cardNumber]*1000;

	    // console.log('tempsAttente: '+tempsAttente);
	    // console.log('TempsEcoule: '+tempsEcoule);

	    if ( tempsEcoule < tempsAttente ) {

	    	document.getElementById('phrase').innerHTML = 'Pas si vite! Prochain tirage possible dans '+ Math.floor((tempsAttente - tempsEcoule)/1000) + 'sec';

	    } else { // le délai est écoulé

	    	nouvelleCarte();

	    }

	} else { // le cookie n'est pas défini

		nouvelleCarte();
	
	}

}

function nouvelleCarte() {

	var tempsActuel = new Date().getTime();

	var illustration = document.getElementById("illustration");
	var phrase       = document.getElementById("phrase");

	// Choix de la phrase
	illustration.src = "img/"+cards[cardNumber][0];
	phrase.innerHTML =        cards[cardNumber][1];

	if ( cardNumber == cardMaximum ) {

	// reset
		cardNumber = 0;

	} else {

		cardNumber++;

	}

	setCookie('heure', tempsActuel, 8);

}
