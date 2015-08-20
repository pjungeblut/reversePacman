goog.provide('ReversePacman.Game');

goog.require('ReversePacman.Vector2D');



/**
 * Main class of the game.
 *
 * @param {string} canvasId The id of the canvas in the DOM to use.
 * @param {string} pelletId The id of the pellet div.
 * @constructor
 */
ReversePacman.Game = function(canvasId, pelletId) {
	/**
	 * @type {!ReversePacman.Vector2D} The mouse position.
	 */
	this.mousePosition = new ReversePacman.Vector2D(0, 0);

	/**
	 * @const {!HTMLCanvasElement} The canvas to draw Pacman in.
	 */
	this.canvas = /** @type {!HTMLCanvasElement} */ (
			document.getElementById(canvasId));

	/**
	 * @const {!ReversePacman.Pacman} Pacman.
	 */
	this.pacman = new ReversePacman.Pacman(this.canvas);

	/**
	 * @const {!HTMLDivElement} The pellet div.
	 */
	this.pellet = /** @type {!HTMLDivElement} */ (
			document.getElementById(pelletId));
};


/**
 * Starts the game by showing the start screen and setting the event handlers
 * for mousemove and touchmove events.
 */
ReversePacman.Game.prototype.start = function() {
	window.addEventListener('mousemove', this.handleMouseMove.bind(this));
	window.addEventListener('touchmove', this.handleTouchMove.bind(this));
};


/**
 * Eventhanlder for mousemove events.
 *
 * @param {!Event} e The mousemove event.
 */
ReversePacman.Game.prototype.handleMouseMove = function(e) {
	this.mousePosition.x = e.clientX;
	this.mousePosition.y = e.clientY;
	requestAnimationFrame(this.showFrame.bind(this));
};


/**
 * Eventhandler for touchmove events.
 *
 * @param {!Event} e The touchmove event.
 */
ReversePacman.Game.prototype.handleTouchMove = function(e) {
	this.mousePosition.x = e.touches[0].clientX;
	this.mousePosition.y = e.touches[0].clientY;
	e.preventDefault();
	requestAnimationFrame(this.showFrame.bind(this));
};


/**
 * The callback for the requestAnimationFrame loop. Organizes the rendering of
 * one frame.
 *
 * @param {number} timestamp The timestamp of this update.
 */
ReversePacman.Game.prototype.showFrame = function(timestamp) {
	var diff = this.mousePosition.difference(this.pacman.position);
	if (diff.abs() < 2) {
		window.removeEventListener('mousemove', this.handleMouseMove);
		window.removeEventListener('touchmove', this.handleTouchMove);

		location.href = 'http://google.com/#q=why+am+i+such+a+loser';
		return;
	}

	// Draw the pellet.
	this.pellet.style.transform = 'translate(' + (this.mousePosition.x - 8) +
			'px, ' + (this.mousePosition.y - 8) + 'px)';

	// Draw Pacman.
	this.pacman.angle = Math.atan2(-diff.y, diff.x) + Math.PI;
	this.pacman.updatePosition(timestamp);
	this.pacman.draw();

	requestAnimationFrame(this.showFrame.bind(this));
};
