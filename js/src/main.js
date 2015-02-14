requirejs.config(
{
	baseUrl: 'src',
	paths:
	{
		'modernizr': 'modernizr.min',
		'picturefill': 'picturefill.min',
		'jquery': 'jquery-1.11.2.min',
		'magnific-popup': 'jquery.magnific-popup.min',
		'xpull': 'xpull',
		'webapplinks': 'webapplinks',
		'parsley': 'parsley-2.0.6.min',
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
        'picturefill':
        {
			// deps: ['jquery'],
        },
    }
});


require(['jquery'], function($)
{
	// console.log('jquery loaded...');

	// Add HTML class when viewed as a webapp.
	if (window.navigator.standalone === true)
	{
		$('html').removeClass('no-webapp');
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

	// console.log('jquery end...');
});


require(['modernizr'], function()
{
    // Do stuff
    // console.log('modernizr loaded...');
});


require(['xpull'], function()
{
    // Do stuff
    // console.log('xpull loaded...');
});


require(['jquery', 'webapplinks'], function($)
{
	// console.log('webapplinks Loaded');
});
