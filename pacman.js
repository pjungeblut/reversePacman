goog.provide('ReversePacman.Pacman');

goog.require('ReversePacman.Vector2D');



/**
 * Represents the Pacman in the game.
 *
 * @param {!HTMLCanvasElement} canvas The canvas to draw into.
 * @constructor
 */
ReversePacman.Pacman = function(canvas) {
	// Resizing the canvas.
	canvas.width = 2 * ReversePacman.Pacman.RADIUS + 2;
	canvas.height = 2 * ReversePacman.Pacman.RADIUS + 2;

	/**
	 * @const {!CanvasRenderingContext2D} The canvas context to draw to.
	 */
	this.ctx = /** @type {!CanvasRenderingContext2D} */(canvas.getContext('2d'));

	/**
	 * @type {!ReversePacman.Vector2D} Pacman's position.
	 */
	this.position = ReversePacman.Pacman.INITAL_POSITION;

	/**
	 * @type {number} The speed in pixels per second.
	 */
	this.speed = ReversePacman.Pacman.INITIAL_SPEED;

	/**
	 * @type {number} The angle in which Pacman moves. 0 corresponds to the
	 *     direction of the positive x-axis.
	 */
	this.angle = ReversePacman.Pacman.INITIAL_ANGLE;

	/**
	 * @type {number} The timestamp of the last update.
	 */
	this.lastUpdate;
};

/**
 * @const {!ReversePacman.Vector2D} The initial position of Pacman.
 */
ReversePacman.Pacman.INITAL_POSITION = new ReversePacman.Vector2D(
		window.innerWidth, window.innerHeight);


/**
 * @const {number} The initial speed of Pacman.
 */
ReversePacman.Pacman.INITIAL_SPEED = 50;


/**
 * @const {number} The initial angle of Pacman's movement. Initially to the top
 *     left.
 */
ReversePacman.Pacman.INITIAL_ANGLE = Math.PI * 3 / 4;


/**
 * @const {number} Pacman's radius.
 */
ReversePacman.Pacman.RADIUS = 15.5;


/**
 * Updates Pacman's position.
 *
 * @param {number} timestamp The timestamp of this update.
 */
ReversePacman.Pacman.prototype.updatePosition = function(timestamp) {
	if (typeof this.lastUpdate !== 'undefined') {
		// Have the difference in seconds.
		var diff = (timestamp - this.lastUpdate) / 1000;
		this.position.x += Math.cos(this.angle) * this.speed * diff;
		this.position.y -= Math.sin(this.angle) * this.speed * diff;

		this.position.x =	Math.min(Math.max(0, this.position.x), window.innerWidth);
		this.position.y =
				Math.min(Math.max(0, this.position.y), window.innerHeight);
	}
	this.lastUpdate = timestamp;
};


/**
 * Draws Pacman on the given canvas context.
 */
ReversePacman.Pacman.prototype.draw = function() {
	this.clearCanvas();
	this.drawShape();
	this.drawEye();

	var radius = this.ctx.canvas.width / 2;
	this.ctx.canvas.style.transform = 'translate(' + (this.position.x - radius) +
			'px, ' + (this.position.y - radius) + 'px)';
};


/**
 * @return {boolean} Whether Pacman moves to the left.
 */
ReversePacman.Pacman.prototype.movesLeft = function() {
	return this.angle > Math.PI / 2 && this.angle < 3 * Math.PI / 2;
};


/**
 * Clears the canvas.
 */
ReversePacman.Pacman.prototype.clearCanvas = function() {
	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};


/**
 * Draws Pacman's shape.
 */
ReversePacman.Pacman.prototype.drawShape = function() {
	this.ctx.beginPath();

	var radius = ReversePacman.Pacman.RADIUS;
	var angle = 2.6;
	var now = new Date();
	var milliseconds = Math.abs(now.getMilliseconds() % 500 - 250);
	angle += (Math.PI - angle) * milliseconds / 250;

	var x = radius + 1, y = radius + 1;
	if (this.movesLeft()) {
		this.ctx.arc(x, y, radius, 2 * Math.PI - angle, angle);
		this.ctx.lineTo(y, x);
		this.ctx.lineTo(
				x - Math.cos(Math.PI - angle) * radius,
				y - Math.sin(Math.PI - angle) * radius);
	} else {
		this.ctx.arc(x, y, radius, Math.PI - angle,
				Math.PI + angle);
		this.ctx.lineTo(x, y);
		this.ctx.lineTo(
				x + Math.cos(Math.PI - angle) * radius,
				y + Math.sin(Math.PI - angle) * radius);
	}

	this.ctx.closePath();
	this.ctx.fillStyle = '#DDFF00';
	this.ctx.fill();
	this.ctx.lineWidth = 2;
	this.ctx.miterLimit = 2;
	this.ctx.strokeStyle = '#000000';
	this.ctx.stroke();
};


/**
 * Draws Pacman's eye.
 */
ReversePacman.Pacman.prototype.drawEye = function() {
	var radius = ReversePacman.Pacman.RADIUS;
	var x = radius + 1, y = radius + 1;

	this.ctx.beginPath();
	if (this.movesLeft()) {
		this.ctx.arc(x - 6, y - 8, 2, 0, 2 * Math.PI);
	} else {
		this.ctx.arc(x + 6, y - 8, 2, 0, 2 * Math.PI);
	}
	this.ctx.closePath();
	this.ctx.fillStyle = '#000000';
	this.ctx.fill();
};
