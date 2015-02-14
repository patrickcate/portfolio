requirejs.config(
{
	baseUrl: 'src',
	paths:
	{
		// 'main': 'main',
		'picturefill': '../../js/picturefill.min',
	// 	'jquery': 'jquery-1.11.2.min',
	// 	'magnific-popup': 'jquery.magnific-popup.min',
	},
});

require(['main'], function() {
	require(['picturefill'], function($)
	{
		// console.log('picturefill loaded...');
	});
});

require(['main'], function() {
	require(['jquery', 'magnific-popup'], function($)
	{
		// console.log('magnific loaded...');

		$('.gallery').each(function()
		{
			$(this).magnificPopup({
				type: 'image',
				delegate: 'a',
				mainClass: 'lightbox-popup',
				disableOn: 0,
				closeOnBgClick: true,
				closeOnContentClick: true,
				showCloseBtn: true,
				closeBtnInside: true,
				enableEscapeKey: true,
				modal: false,
				verticalFit: false, // Fits image in area vertically
				preload: [1,3],
				retina:
				{
				    ratio: 2, // Increase this number to enable retina image support.
				    // Image in popup will be scaled down by this number.
				    // Option can also be a function which should return a number (in case you support multiple ratios). For example:
				    // ratio: function() { return window.devicePixelRatio === 1.5 ? 1.5 : 2  }


				    replaceSrc: function(item, ratio) {
				    	// return item.src.replace(/\.\w+$/, function(m) { return '@2x' + m; });
				    	var regex = /\-\-\w+/;
				    	var hdpi = '--huge';
				    	return item.src.replace(regex, hdpi);
				    } // function that changes image source
				},
				gallery:
				{
					enabled: true
				},
				zoom:
				{
					enabled: false,
					duration: 250,
					easing: 'ease-in-out',
					// opener: function(openerElement)
					// {
					//	return openerElement.is('img') ? openerElement : openerElement.find('img');
					// }
				},
				callbacks:
				{
					buildControls: function()
					{
						// console.log(this.currItem);
						// re-appends controls inside the main container
						// this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
						this.contentContainer.append(this.arrowLeft, this.arrowRight);
					}
				}
			});
		});
	});
});
