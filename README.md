Jquery Image Wall
======================

### Demo:
http://ruanyl.github.io/imagewall

### usage:

	<div class="container">
		<img src="path/pic1.jpg" />
		<img src="path/pic2.jpg" />
		<img src="path/pic3.jpg" />
	</div>
	$(".container").imagewall(); //default image height is 240px, width is 'auto'
	
	//or you can specify a number for height
	$(".container").imagewall({height: 300});
	
	//for both
	$(".container").imagewall({height: 300, width:300});
	
	
### TODO:

	specify width with auto height
