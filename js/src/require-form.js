requirejs.config(
{
	baseUrl: 'src',
	// paths:
	// {
	// 	'jquery': 'jquery-1.11.2.min',
	// 	'parsley': 'parsley-2.0.6.min',
	// },
	// shim:
	// {
	//     'parsley':
	//     {
	// 		deps: ['jquery'],
	//     },
 //    }
});

require(['main'], function() {

	require(['jquery'], function($)
	{
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

	require(['jquery', 'parsley'], function($)
	{
		// console.log('parsley Loaded');

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

	});
});

