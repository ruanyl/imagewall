Jquery Image Wall
======================

### Demo:
http://ruanyl.github.io/imagewall

### usage:

	$(".container").imagewall(); //default image height is 240px, width is 'auto'
	
	//or you can specify a number for height
	$(".container").imagewall({height: 300});
	
	//for both
	$(".container").imagewall({height: 300, width:300});
	
	//but function not implemented if height is auto while width with a specifed number
	
### TODO:

	specify width and height is 'auto'
