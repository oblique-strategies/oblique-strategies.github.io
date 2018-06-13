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

	event.preventDefault();

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

function tirerCarte() {

	// date
	var dernierTirage = new Date();
	//document.cookie = "heure = "+dernierTirage;
	// console.log(dernierTirage);

	setCookie('heure', "TEST" ,1);


	var x = getCookie('heure');
	console.log(x);




	// Déterminer le nombre de phrases
	// var cardNumber = cards.length - 1;

	// définir le moment du tirage
	// dernierTirage = time();

	// Choix de la phrase
	document.getElementById("illustration").src = "img/"+cards[cardNumber][0];
	document.getElementById('phrase').innerHTML =        cards[cardNumber][1];

	if ( cardNumber == cardMaximum ) {

	// reset
		cardNumber = 0;

	} else {

		cardNumber++;

	}

}
