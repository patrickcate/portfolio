requirejs.config(
{
	baseUrl: 'src',
	paths:
	{
		'modernizr': 'modernizr.min',
		'picturefill': 'picturefill.min',
		'jquery': 'jquery-1.11.3.min',
		'magnific-popup': 'jquery.magnific-popup.min',
		'xpull': 'xpull',
		'webapplinks': 'webapplinks',
		'parsley': 'parsley.min',
		'parse': 'parse-1.4.2.min',
	},
	shim:
	{
        'xpull':
        {
			deps: ['jquery'],
        },
        'webapplinks':
        {
			deps: ['jquery'],
        },
   //      'picturefill':
   //      {
			// // deps: ['jquery'],
   //      },
    }
});


require(['jquery'], function($)
{
	// console.log('jquery loaded...');

	// Add HTML class when viewed as a webapp.
	if (window.navigator.standalone == true)
	{
		$('html').addClass('webapp');
		$('html').removeClass('no-webapp');

		// $('#js-content__inner').xpull(
		// {
		//  	pullThreshold: 100, // Pull threshold - amount in  pixels required to pull to enable release callback
		//     spinnerTimeout: 2000, // timeout in miliseconds after which the loading indicator stops spinning. If set to 0 - the loading will be indefinite
		//     callback:function()
		//     {

		//     }, // triggers after user pulls the content over pull threshold and releases
		// });
	}
	// else
	// {
	// 	$('html').removeClass('webapp');
	// 	$('html').addClass('no-webapp');
	// }

	// console.log('jquery end...');
});


require(['modernizr'], function()
{
    // Do stuff
    // console.log('modernizr loaded...');
});


require(['xpull'], function()
{
    // console.log('xpull loaded...');
    if (window.navigator.standalone == true)
	{
		$('#js-content__inner').xpull(
		{
		 	pullThreshold: 100, // Pull threshold - amount in  pixels required to pull to enable release callback
		    spinnerTimeout: 2000, // timeout in miliseconds after which the loading indicator stops spinning. If set to 0 - the loading will be indefinite
		    callback:function()
		    {

		    }, // triggers after user pulls the content over pull threshold and releases
		});
	}
});


require(['jquery', 'webapplinks'], function($)
{
	// console.log('webapplinks Loaded');
});

