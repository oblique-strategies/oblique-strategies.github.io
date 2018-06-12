/*
 * Animation de l'intro
....................................................................................
*/

/*
 * Pour des détails sur le fonctionnement des animations, voir:
 * https://github.com/oblique-strategies/oblique-strategies.github.io/issues/1
*/

var startButton = document.getElementById('start');

startButton.addEventListener('click', premiereCarte, false);

function premiereCarte() {

	var myCanvas = document.getElementById('myCanvas');
	var intro    = document.getElementById('intro');
	var frame    = document.getElementById('frame');

	// Tirer une première carte

	tirerCarte();

	// Rendre transparente l'animation

	myCanvas.className += " transparent";

	// Ce qui suit va se produire après un délai de 1000 millisecondes.

	setTimeout(function() {

		intro.style.left = "100vw"; // Fait disparaître l'animation

		frame.style.right = "0vw"; // Fait apparaître le contenu

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

	    console.log('tempsAttente: '+tempsAttente);
	    console.log('TempsEcoule: '+tempsEcoule);

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
