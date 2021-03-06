/*
 * Delfini UI - Dialog
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
 * <section data-role="dialog" class="errorDatabase">
 * <h1>This is a title</h1>
 * <div class="content">This is my content</div>
 * <div class="buttons">
 * <button class="button close">Button</button>
 * </div>
 * </section>
 *
 *
 *
 * Events dispatched:
 *  - dialogOpened                             The user has opened the dialog
 *  - dialogClosed                             The user has closed the dialog
*/

(function($) {
	$(document).ready(function() {	
	//Define the dialog component
		$.fn.delfini_dialog = function(options) {
			var dialog = $(this);
			
		//Check the possible values that could be passed in as the options
			if (options && options == 'close') {
			//Slide the menu from the top of the screen into view
				dialog.animate({
					'top' : '-900px'
				}, function() {
					dialog.remove();
				});
				
			//Tell the application that the dialog has been closed
				dialog.trigger('dialogClosed');
				
				return true; //Stop executing the function
			}
			
		//Slide the menu from the top of the screen into view
			dialog.animate({
				'top' : '0px'
			}, function() {
			//Tell the application that the dialog has been opened
				dialog.trigger('dialogOpened');
			});
		};
	});
})(jQuery);