(function ($)
{
	$(document).ready(function()
	{
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
				retina:
				{
				    ratio: 1.5, // Increase this number to enable retina image support.
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

try
{
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
			url: "http://getsimpleform.com/messages/ajax?form_api_token=a325ecabd25612a592081a155d6386bd",
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

		// Highlight form label on focus
		var form_element = $('#js-contact-form #name, #js-contact-form #email, #js-contact-form #message');
		form_element.focus(function()
		{
			var self = $(this).siblings('.form__label');

			if (self.not('.is-highlighted'))
			{
				self.addClass('is-highlighted');
			}
		});

		form_element.blur(function()
		{
			var self = $(this).siblings('.form__label');

			if (self.hasClass('is-highlighted'))
			{
				self.removeClass('is-highlighted');
			}
		});

		$('[autofocus]').focus();

	});

}( jQuery ));
