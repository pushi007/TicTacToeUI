document.onmouseover = function() {
	// User's mouse is inside the page.
	
	window.innerDocClick = true;
}

document.onmouseleave = function() {
	// User's mouse has left the page.
		window.innerDocClick = false;
}
