(function ($)
{
	$(document).ready(function()
	{
		$('#js-header').headroom(
		{
			// vertical offset in px before element is first unpinned
			offset: 0,
			// or scroll tolerance per direction
			tolerance:
			{
				down: 0,
				up: 0
			},
			// css classes to apply
			// classes:
			// {
			// 	// when element is initialised
			// 	// initial: 'header--is-pinnable',
			// 	// when scrolling up
			// 	pinned: 'header--scrolling-up',
			// 	// when scrolling down
			// 	unpinned: 'header--scrolling-up',
			// 	// when above offset
			// 	top: 'headroom--not-pinned',
			// 	// when below offset
			// 	notTop: 'headroom--is-pinned'
			// },
		});

		// $('.js-initially-hidden').onScreen(
		// {
		// 	container: window,
		// 	direction: 'vertical',
		// 	doIn: function()
		// 	{
		// 		$(this).addClass('is-onscreen');
		// 	},
		// 	doOut: function()
		// 	{

		// 	},
		// 	tolerance: 0,
		// 	throttle: 0,
		// 	toggleClass: false,
		// 	lazyAttr: null,
		// 	lazyPlaceholder: 'someImage.jpg',
		// 	debug: false
		// });

		$('.gallery').each(function()
		{
			$(this).magnificPopup({
				type: 'image',
				delegate: 'a',
				mainClass: 'lightbox-popup',
				// disableOn: 400,
				closeOnBgClick: true,
				closeOnContentClick: true,
				showCloseBtn: true,
				closeBtnInside: true,
				enableEscapeKey: true,
				modal: false,
				preload: [1,3],
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
						this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
					}
				}

			});
		});

		// $('#js-nav .nav__link').mPageScroll2id(
		// {
		// 	layout: 'vertical',
		// 	offset: '150',
		// 	scrollSpeed: 750,
		// 	autoScrollSpeed: true,
		// 	pageEndSmoothScroll: true,
		// 	forceSingleHighlight: false,
		// 	// disablePluginBelow: 770,
		// 	keepHighlightUntilNext: true,
		// 	scrollEasing: 'easeInOutExpo',
		// 	scrollingEasing: 'easeInOutExpo',
		// 	clickedClass: 'nav__link--is-active',
		// 	highlightClass: 'nav__link--is-active',
		// });



		// $(window).resize(function()
		// {
		// 	var to = $('.mPS2id-target').attr("id");

		// 	$.mPageScroll2id('scrollTo', to);
		// });

// $(document).load(function()
// {
// 	console.log('This worked');

// 	var myScroll = new IScroll('#l-page',
// 	{
// 		mouseWheel: true,
// 		scrollbars: true,
// 		bounce: true,
// 		bounceEasing: 'elastic',
// 		bounceTime: 1200,
// 	});

// 	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
// });

});

}( jQuery ));


// // console.log('This worked');
// var myScroll = new IScroll('#js-content',
// {
// 	mouseWheel: true,
// 	scrollbars: false,
// 	bounce: true,
// 	bounceEasing: 'elastic',
// 	bounceTime: 1200,
// });

// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
// );