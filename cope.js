/*
 * cope v0.1
 * Simple vanilla JS to test
 * bandwidth very coarse
 * Inspired by: http://stackoverflow.com/questions/5529718/how-to-detect-internet-speed-in-javascript
 *
 * @author jrudenstam
 */

define(['../helper-js/helper'], function( h ){
	var cope = {
		defaults: {
			src: 'http://www.tranquilmusic.ca/images/cats/Cat2.JPG' + '?n=' + Math.random(),
			size: 5616998,
			yay: 'yay',
			nay: 'nay',
			speed: 'bps'
		},

		download: new Image(),

		speed: {},

		test: function( settings, callback ){
			// Extend settings
			this.settings = h.create(this.defaults);

			if (settings) {
				for (var setting in settings) {
					this.settings[setting] = settings[setting];
				}
			}

			h.addEvent(this.download, 'load', (function( cope ){
				return function( event ){
					cope.end(callback);
				}
			})(this));

			this.start();
		},

		start: function(){
			this.startTime = (new Date).getTime();
			this.download.src = this.settings.src;
		},

		end: function( callback ){
			this.endTime = (new Date).getTime();
			this.calculate();
			callback(this.determine(), this.speed[this.settings.speed]);
		},

		calculate: function(){
			this.duration = (this.endTime - this.startTime)/1000;
			this.bits = this.settings.size*8;
			this.speed.bps = (this.bits/this.duration).toFixed(2);
			this.speed.kbps = (this.speed.bps/1024).toFixed(2);
			this.speed.mbps = (this.speed.kbps/1024).toFixed(2);
		},

		determine: function(){
			var result = this.settings.nay;

			if (this.speed[this.settings.speed] > this.settings.treshold) {
				result = this.settings.yay;
			}

			return result;
		}
	};

	return cope;
});