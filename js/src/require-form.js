requirejs.config({
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

require(['main'], function () {
  require(['jquery'], function ($) {
    // Highlight form label on focus
    var form_element = $('#js-input__name, #js-input__email, #js-input__message');

    form_element.focus(function () {
      var self = $(this).siblings('.form__label');

      if (self.not('.is-highlighted')) {
        self.addClass('is-highlighted');
      }
    });

    form_element.blur(function () {
      var self = $(this).siblings('.form__label');

      if (self.hasClass('is-highlighted')) {
        self.removeClass('is-highlighted');
      }
    });

    // $('[autofocus]').focus();
  });

  require(['jquery', 'parsley'], function ($) {
    // console.log('parsley Loaded');

    $('#js-contact-form').parsley({
      errorsMessagesDisabled: true,
      successClass: 'form__element--is-valid',
      errorClass: 'form__element--is-invalid',
      errorsWrapper: '',
      errorTemplate: '',
    });

    // var parseAPPID = "BBcyXjDr1ft8aZU0L7GK56nYfJQh69sbIHv33kHk";
    // var parseJSID = "kUpCj3yD8zUul6YIfhU5BzBOYbKXRTcve88H9P8O";
    //
    // Parse.initialize(parseAPPID, parseJSID);
    //
    $('#js-contact-form').on('submit', function (e) {
      // e.preventDefault();

      $('#js-submit__button').text('Sending...');
      //
      // var emailValue = $('#js-input__email').val();
      // var nameValue = $('#js-input__name').val();
      // var messageValue = $('#js-input__message').val();
      //
      // var emailMessage =
      // {
      //   fromEmail: emailValue,
      //   fromName: nameValue,
      //   text: 'Name: ' + nameValue + '\nE-Mail: ' + emailValue + '\nMessage: ' + messageValue
      // };

      // Parse.Cloud.run('sendEmail', emailMessage,
      // {
      // 	success: function(object)
      // 	{
      // 		var templateMessage =
      // 		{
      // 			toEmail: emailValue,
      // 			toName: nameValue
      // 		};
      //
      // 		Parse.Cloud.run('sendTemplate', templateMessage,
      // 		{
      // 			success: function(object)
      // 			{
      // 				// alert('success');
      // 				$('#js-alert--success').removeClass('is-hidden');
      // 				$('#js-alert--error').addClass('is-hidden');
      // 				$('#js-input__email, #js-input__name, #js-input__message').val('');
      // 				$('#js-submit__button').text('Submit').blur();
      // 			},
      // 			error: function(object, error)
      // 			{
      // 				// alert('failed to send: ' + error)
      // 				$('#js-alert--success').addClass('is-hidden');
      // 				$('#js-alert--error').removeClass('is-hidden');
      // 				$('#js-submit__button').text('Submit').blur();
      // 			}
      // 		});
      // 	},
      // 	error: function(object, error)
      // 	{
      // 		$('#js-alert--success').addClass('is-hidden');
      // 		$('#js-alert--error').removeClass('is-hidden');
      // 		$('#js-submit__button').text('Submit').blur();
      // 	}
      // });

      // $.ajax({
      // 	type: 'POST',
      // 	headers:
      // 	{
      // 		'X-Parse-Application-Id: BBcyXjDr1ft8aZU0L7GK56nYfJQh69sbIHv33kHk',
      // 		'X-Parse-REST-API-Key: rBdsdotKOER8zRuV4HMbNvQAfkTLA2XOkTlh2pMB'
      // 	},
      // 	url: 'https://api.parse.com/1/functions/sendTemplate',
      // 	contentType: 'application/json'
      // });

      $.ajax({
        dataType: 'jsonp',
        url: 'https://getsimpleform.com/messages/ajax?form_api_token=a325ecabd25612a592081a155d6386bd',
        data: $('#js-contact-form').serialize(),
      }).done(function () {
        // Callback which can be used to show a thank you message and reset the form
        // alert('Thank you, for contacting us');
        $('#js-submit__button').addClass('icon--checkmark button--success').removeClass('icon--send').text('Message Sent!');
        $('#js-contact-form #name, #js-contact-form #email, #js-contact-form #message').val('');
        $('#js-alert--error').addClass('is-hidden');
        $('#js-alert--success').removeClass('is-hidden');
      });

      // Stop the form from submitting
      return false;
    });
  });
});
