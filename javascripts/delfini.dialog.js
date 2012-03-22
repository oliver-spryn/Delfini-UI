/*
Requires jQuery!

Example usage:

<section data-role="dialog" class="errorDatabase">
<h1>This is a title</h1>
<div class="content">This is my content</div>
<div class="buttons">
<button class="button close">Button</button>
</div>
</section>
*/

$(document).ready(function() {
	$.fn.delfini.dialog = function() {
	//Slide the menu from the top of the screen into view
		$(this).animate({
			'top' : '0px'
		});
	};
});