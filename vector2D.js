goog.provide('ReversePacman.Vector2D');



/**
 * Represents a 2D vector in the plane.
 *
 * @param {number} x The x coordinate of the vector.
 * @param {number} y The y coordinate of the vector.
 * @constructor
 */
ReversePacman.Vector2D = function(x, y) {
	/**
	 * @type {number} The x coordinate of the vector.
	 */
	this.x = x;

	/**
	 * @type {number} The y coordinate of the vector.
	 */
	this.y = y;
};


/**
 * Calculates the difference between this vector and another one.
 *
 * @param {!ReversePacman.Vector2D} other The other vector.
 * @return {!ReversePacman.Vector2D} The resulting vector.
 */
ReversePacman.Vector2D.prototype.difference = function(other) {
	return new ReversePacman.Vector2D(other.x - this.x, other.y - this.y);
};


/**
 * Calculates the absolute value of the vector.
 *
 * @return {number} The absolute value.
 */
ReversePacman.Vector2D.prototype.abs = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};
