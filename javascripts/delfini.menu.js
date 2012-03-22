/*
Requires jQuery!

Example usage:

<ul class="dropdown">
<li>Option</li>
<li>Option</li>
<li class="selected">Option</li>
<li>A longer option</li>
</ul>
*/

$(document).ready(function() {
	$.fn.delfini.menu = function() {
		var menu = $(this);
		
	//Resize the menu container so that it is automatically sized to the fit the longest menu option
		menu.each(function() {
			var currentMenu = $(this);
			var maxWidth = 0;
			
			currentMenu.children().each(function() {
				var currentWidth = $(this).width();
				
				if (currentWidth > maxWidth) {
					maxWidth = currentWidth;
				}
			});
			
			currentMenu.width(maxWidth);
		});
		
	//Open the menu
		menu.click(function() {
			$(this).addClass('open');
		});
	};
});