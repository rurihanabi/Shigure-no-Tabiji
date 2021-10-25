if(typeof jQuery != 'undefined') {
	jQuery(function($) {
		$.fn.extend({
			sankagari: function(choose) {
				var $$	= $(this),
					s	= $.extend({}, $.fn.sankagari.defaults, choose),
					o 	= $.metadata ? $.extend({}, s, $$.metadata()) : s,
					k	= [];
				
				return this.each(
					function() {
						$$.bind('keydown.sankagari' + o.code.toString(), function(e){
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
				$(this).unbind('keydown.sankagari' + o.code.toString());
			}
		};
		
		$.fn.sankagari.defaults = {
			'code' 		: '20,85,90,85,77,69',
			'unbind'	: true,
			'activated'	: true,
			'message'	: 'Uzume'
			
		};
	});
}
