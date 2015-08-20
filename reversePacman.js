goog.require('ReversePacman.Game');


// Starts the game after everything is loaded completely.
window.addEventListener('load', function() {
	var game = new ReversePacman.Game('pacman', 'pellet');
	game.start();
});