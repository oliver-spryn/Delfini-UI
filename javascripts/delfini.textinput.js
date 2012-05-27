/** 
 * Delfini UI - Text Input
 * -------------------------------
 *
 * ForwardFour Innovations: http://forwardfour.com/
 * Delfini UI: http://delfiniui.com/
 * 
 * LICENSE
 * 
 * By viewing, using, or actively developing this framework in any way, you are
 * henceforth bound the license agreement, and all of its changes, set forth by
 * ForwardFour Innovations or the Delfini UI Group. The license can be found,
 * in its entirety, at this address: http://delfiniui.com/license.
 * 
 * Copyright (c) 2012 and Onwards, ForwardFour Innovations & The Delfini UI Group
 * http://delfiniui.com/license [Proprietary]
 *
 *
 *
 * Example usage:
 *
 * <input type="text" />                       Use on a text input
 * <input type="password" />                   Use on a password input
 * <input type="email" />                      Use on an HTML5 email input
*/

$(document).ready(function() {
	var elements = $('input:text, input:password, input[type=email]');
	
//Select all text, password, and email inputs, wrap them in a container for easy reference and apply the appropriate action icon
	elements.wrap('<div class="inputWrapper" />').after(function() {
    	var currentInput = $(this);
		
	//If this is a password input, then add a password peak icon, otherwise add a clear input icon
		if (currentInput.attr('type').toLowerCase() == 'password') {
			return '<span class="passwordPeak" title="Press and hold to view this password" />';
		} else {
			return '<span class="inputClear" title="Click to clear contents" />';
		}
    });
	
//Clear a text input control or show a password
	elements.siblings('span').mousedown(function() {
		var icon = $(this);
		var input = icon.siblings('input');
		
    //We cannot change the password field type, due to browser security policies. We can create a new one, though!
		if (input.attr('type').toLowerCase() == 'password') {
		//Grab the text value
			var text = input.attr('value');
			
		//Hide the password input
			input.hide();
			
		//Create a new element right in place of the old one
			$('<input class="passwordViewer" type="text" />').attr('value', text).insertAfter(icon);
		} else {
			input.val('');
		}
    });
	
//Revert a password viewer back to a password field. Nothing is needed for the text input clearing button
	elements.siblings('span').mouseup(function() {
        var icon = $(this);
		var input = icon.siblings('input');
		
	//Remove the password previewer field created during mousedown
		if (input.attr('type').toLowerCase() == 'password') {
		//Remove the previewer
			icon.siblings('input.passwordViewer').remove();
			
		//Show the password input
			input.show();
		}
    });
});