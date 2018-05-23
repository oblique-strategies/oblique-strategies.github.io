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


//array = liste d'éléments
var cards = [
	"Demain",
	"Sirop de framboise",
	"La réponse se trouve au plafond",
	"Inspire toi de la météo",
	"Noir et blanc"
];

function getRandom(min , max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function tirerCarte() {
	
	// Déterminer le nombre de phrases
	var cardNumber = cards.length - 1;

	// Choix de la phrase
	var randomNumber = getRandom(0,cardNumber);
	document.getElementById('phrase').innerHTML = cards[randomNumber];
}