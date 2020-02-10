/*
	Strata by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

})(jQuery);

{//console 彩蛋
      console.info(" %c 「マキシマム、広がる世界」 ","color:#902225" );
	  console.info(" %c 「抱きしめる、愛する世界」 ","color:#65C8D7" );
      
	  console.info(" %c 「新しい時代に向かい」 ","color:#902225" );
	  console.info(" %c 「捧げるPlusの願い」 ","color:#65C8D7" );
	  
	  console.info(" %c 「100億の瞳の中で」 ","color:#902225" );
	  console.info(" %c 「4千の年月を越え」 ","color:#65C8D7" );
	
	  console.info(" %c 「今、ワタシ達は立ってる」 ","color:#902225" );
	  console.info(" %c 「仮想とリアルの彼方」 ","color:#65C8D7" );
	  
	  console.info(" %c 「解き放て、二つのレガシー」 ","color:#902225" );
	  console.info(" %c 「現在を越えて、ヒストリー」 ","color:#65C8D7" );
	
	  console.info(" %c 「紡ぎだす、二人のエナジー」 ","color:#902225" );
	  console.info(" %c 「巻き起こすよ、ストリーム」 ","color:#65C8D7" );

}