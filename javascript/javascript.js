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

var cardNumber = 0;

function getRandom(min , max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(a) {
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
}

shuffle(cards);

function tirerCarte() {
	
	// Déterminer le nombre de phrases
	// var cardNumber = cards.length - 1;

	// définir le moment du tirage
	// dernierTirage = time();


	// Choix de la phrase
	// var randomNumber = getRandom(0,cardNumber);

	document.getElementById('phrase').innerHTML = cards[cardNumber];

	cardNumber++; 

}