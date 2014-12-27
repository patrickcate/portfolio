(function ($)
{
	$(document).ready(function()
	{
		// $('#js-header').headroom(
		// {
		// 	// vertical offset in px before element is first unpinned
		// 	offset: 200,
		// 	// or scroll tolerance per direction
		// 	tolerance:
		// 	{
		// 		down: 0,
		// 		up: 0
		// 	},
		// 	// css classes to apply
		// 	// classes:
		// 	// {
		// 	// 	// when element is initialised
		// 	// 	// initial: 'header--is-pinnable',
		// 	// 	// when scrolling up
		// 	// 	pinned: 'header--scrolling-up',
		// 	// 	// when scrolling down
		// 	// 	unpinned: 'header--scrolling-up',
		// 	// 	// when above offset
		// 	// 	top: 'headroom--not-pinned',
		// 	// 	// when below offset
		// 	// 	notTop: 'headroom--is-pinned'
		// 	// },
		// });

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
				// this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
				this.contentContainer.append(this.arrowLeft, this.arrowRight);
			}
		}
	});
});

try {
	$('#js-contact-form').parsley(
	{
		errorsMessagesDisabled: true,
		successClass: 'form__element--is-valid',
		errorClass: 'form__element--is-invalid',
		errorsWrapper: '',
		errorTemplate: '',
	});

	$('#js-contact-form').submit(function()
	{
		$('#js-form__button').text('Sending...');

		$.ajax({
			dataType: 'jsonp',
			url: "http://getsimpleform.com/messages/ajax?form_api_token=921255819e3dc4cdd301cf95526611a8",
			data: $('#js-contact-form').serialize()
		}).done(function()
		{
			// Callback which can be used to show a thank you message and reset the form
			// alert('Thank you, for contacting us');
			$('#js-form__button').addClass('icon--checkmark button--success').removeClass('icon--send').text('Message Sent!');
			$('#js-contact-form #name, #js-contact-form #email, #js-contact-form #message').val('');
		});
		// Stop the form from submitting
		return false;
	});
}
catch(err)
{

}
});

// Add HTML class when viewed as a webapp.
if (window.navigator.standalone === true)
{
	$('html').addClass('webapp');

	$('#js-content__inner').xpull(
	{
	 	pullThreshold: 100, // Pull threshold - amount in  pixels required to pull to enable release callback
	    spinnerTimeout: 2000, // timeout in miliseconds after which the loading indicator stops spinning. If set to 0 - the loading will be indefinite
	    callback:function()
	    {

	    }, // triggers after user pulls the content over pull threshold and releases
	});
}
else
{
	$('html').addClass('no-webapp');
}

// Page refresh button
// $('#js-button--refresh').click(function()
// {
//     location.reload();
// });



}( jQuery ));
