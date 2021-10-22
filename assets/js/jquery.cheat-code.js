/**
* Cheat Code: a jQuery Plugin
* @author: Trevor Morris (trovster)
* @url: http://www.trovster.com/lab/code/plugins/jquery.cheat-code.js
* @documentation: http://www.trovster.com/lab/plugins/cheat-code/
* @published: 10/05/2009
* @updated: 10/05/2009
*/
if(typeof jQuery != 'undefined') {
	jQuery(function($) {
		$.fn.extend({
			cheatCode: function(options) {
				var $$	= $(this),
					s	= $.extend({}, $.fn.cheatCode.defaults, options),
					o 	= $.metadata ? $.extend({}, s, $$.metadata()) : s,
					k	= [];
				
				return this.each(
					function() {
						$$.bind('keydown.cheatCode' + o.code.toString(), function(e){
							k.push(e.keyCode);
							if(k.toString().indexOf(o.code) >= 0){
								k = [];
								o.activated.call(this, o);
								unbind.call(this, o);
							}
						});
					}
				);
			}
		});
		
		complete = function(o){
			var $overlay = $('<div class="overlay"></div>')
				$message = $('<div class="modal"></div>');
			
			$message.text(o.message).appendTo('body');
			$overlay.appendTo('body');
			setTimeout(function(){
				$message.fadeOut(500, function(){
					$(this).remove();
					$overlay.fadeOut(500, function(){
						$(this).remove();
					});
				});
			}, 1000);
		};
		
		unbind = function(o){
			if(o.unbind===true) {
				$(this).unbind('keydown.cheatCode' + o.code.toString());
			}
		};
		
		$.fn.cheatCode.defaults = {
			'code' 		: '38,38,40,40,37,39,37,39,66,65',
			'unbind'	: true,
			'activated'	: complete,
			'message'	: 'Mijiu'
		};
	});
}
