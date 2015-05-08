//
// Links JS HERE
// Make iOS web app open likes in same window
//
// (function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(chref=d.href).replace(e.href,"").indexOf("#")&&(!/^[a-z\+\.\-]+:/i.test(chref)||chref.indexOf(e.protocol+"//"+e.host)===0)&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone");

	// Make iOS web app links open in web app view.
	(function ($)
	{

	// 	if (window.navigator.standalone == true)
	// 	{
	// 		// var local = document.domain;
	// 		$('#js-header a').click(function()
	// 		{
	// 			// var a = $(this).attr('href');
	// // 			if ( a.match('http://' + local) || a.match('http://www.' + local) )
	// // 			{
	// 				event.preventDefault();
	// 				document.location.href = $(this).attr('href');;
	// // 			}
	// 		});

	// 		$('a.lightbox-popup').click(function()
	// 		{
	// 			// var a = $(this).attr('href');
	// // 			if ( a.match('http://' + local) || a.match('http://www.' + local) )
	// // 			{
	// 				event.stopPropagation();
	// 				// document.location.href = $(this).attr('href');;
	// // 			}
	// 		});
	// 	}

if (window.navigator.standalone) {
	var local = document.domain;
	$('a').click(function() {
		var a = $(this).attr('href');
		if ( a.match('http://' + local) || a.match('http://www.' + local) ){
			event.preventDefault();
			document.location.href = a;
		}
	});
}

	}( jQuery ));
