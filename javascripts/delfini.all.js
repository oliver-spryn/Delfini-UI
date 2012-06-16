/** 
 * Delfini UI
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
 * Included in this file:
 *  - delfini.dialog
 *  - delfini.menu
 *  - delfini.textinput
*/

(function($) {
	$(document).ready(function() {	
	/**
	 * delfini.dialog
	 * ----------------------------------
	*/
	
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
		
	/**
	 * delfini.menu
	 * ----------------------------------
	*/
		
	/**
	 * Wrap the dropdown menu in a container div so that when it is floated with CSS when
	 * it is opened, the contents around it do not collapse. Also, create a hidden input
	 * element to store the value of the drop down component, using the <ul> "data-name"
	 * attribute to name the hidden input element
	*/
	
		$('ul.dropdown').wrap('<div class="dropdownWrapper" />').after(function() {
			var currentMenu = $(this);
			
		//Tell the application that this element has been modified and is ready to go!
			$(this).trigger('dropdownReady');
			
			if (currentItem.attr('data-value') && currentItem.attr('data-value') != undefined && currentItem.attr('data-value') != '') {
				var value = currentMenu.children('li.selected').attr('data-value');
			} else {
				var value = currentMenu.children('li.selected').text();
			}
			
			return '<input name="' + currentMenu.attr('data-name') + '" type="hidden" value="' + value + '"/>';
		});
		
	//Open the menu
		$('body').delegate('ul.dropdown', 'click', function() {
			var currentMenu = $(this);
			var left = currentMenu.offset().left;
			var top = currentMenu.offset().top;
			var documentHeight = $(document).height();
			
		//Simply add another CSS class and the menu will open
			currentMenu.addClass('open');
			
		/**
		 * It will be necessary to float the menu to avoid pushing around other items
		 * as it opens
		 *
		 * This process takes place after the open class has been applied so that the 
		 * height of the menu can be calculated. The statement below determines whether 
		 * or not the menu will spill over the bottom side of the screen when opened.
		*/
		
			if (top + currentMenu.height() > documentHeight) {
				top -= (top + currentMenu.height() + 20) - documentHeight; //-20 easily makes up for the added height from the shadow and border
			}
			
			currentMenu.css({
				'left' : left + 'px',
				'position' : 'absolute',
				'top' : top + 'px'
			});
			
		//Tell the application that this component has been opened
			currentMenu.trigger('menuOpened');
		});
		
	/**
	 * If something outside of the menu is clicked on, collapse the menu
	 *
	 * Since this event is trigged by clicking anywhere on the webpage,
	 * and not by a specific element like many of the other events that
	 * power this UI component, there is no event that is dispatched 
	 * since we cannot refer to a specific dropdown menu without doing the
	 * following memory intensive process on each mouse click:
	 *  - select all open menus on the page
	 *  - loop through each of these menus
	 *  - check if the clicked element was any one of the open menus
	 *  - if the clicked object was a menu, dispatch a close event and 
	 *    close the menu
	*/
	
		$(document).click(function(e) {
			if (!$(e.target).is('ul.dropdown') && !$(e.target).parents().is('ul.dropdown')) {
			//Close all open menus
				$('ul.dropdown').removeClass('open').removeAttr('style');
			}
		});
		
	//Select an item from the menu
		$('body').delegate('ul.dropdown li', 'click', function(e) {
			var currentItem = $(this);
			var menu = currentItem.parent();
			var itemNew = true;
			
		//Deselect all other list items and select the clicked item
			if (menu.hasClass('open')) {
			//Check and see if the selected item was the same as the previously selected item
				if (currentItem.parent().children('li.selected').is(currentItem)) {
					itemNew = false;
				}
				
				currentItem.addClass('reservedItemCurrentlySelcted').siblings('li.selected').removeClass('selected').siblings('li.reservedItemCurrentlySelcted').removeClass('reservedItemCurrentlySelcted').addClass('selected');
				
			//Close the menu
				menu.removeClass('open').removeAttr('style');
				e.stopPropagation(); //This prevents a click event from immediately reopening the menu
				
			//Update the value of the hidden field
				if (currentItem.attr('data-value') && currentItem.attr('data-value') != undefined && currentItem.attr('data-value') != '') {
					menu.siblings('input').val(currentItem.attr('data-value'));
				} else {
					menu.siblings('input').val(currentItem.text());
				}
				
			//Tell the application that this component has been closed
			//This event will be added whenever it can also be added to the $(document) click handler above
				//currentMenu.trigger('menuClosed');
				
			//Tell the application that an item was selected from this component
				currentMenu.trigger('menuItemSelected');
				
			//Tell the application if a different item was selected
				if (itemNew) {
					currentMenu.trigger('newMenuItemSelected');
				}
			}
		});
		
	/**
	 * delfini.textinput
	 * ----------------------------------
	*/
		
		var elements = $('input:text:not(.noMod), input:password:not(.noMod), input[type=email]:not(.noMod), input[type=search]:not(.noMod)');
		
	//Select all text, password, and email inputs, wrap them in a container for easy reference and apply the appropriate action icon
		elements.wrap('<div class="inputWrapper" />').after(function() {
			var currentInput = $(this);
			
		//Tell the application that this element has been modified and is ready to go!
			currentInput.trigger('textInputReady');
			
		//If this is a password input, then add a password peak icon, otherwise add a clear input icon, if the input doesn't have a "noIcon" class
			if (currentInput.attr('type').toLowerCase() == 'password') {
				return currentInput.hasClass('noIcon') ? '<span />' : '<span class="passwordPeak" title="Press and hold to view this password" />';
			} else {
				return currentInput.hasClass('noIcon') ? '<span />' : '<span class="inputClear" title="Click to clear contents" />';
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
				
			//Tell the application that the user has previewed a password
				input.trigger('passwordVisible');
			} else {
				input.val('');
				
			//Tell the application that the user has cleared a text input control
				input.trigger('inputCleared');
			}
		});
		
	/**
	 * Revert a password viewer back to a password field. Nothing is needed for the text input clearing button
	 * 
	 * The "mouseout" event is also listened for due to a bug in Chrome (and possibly other browsers) where the
	 * "mouseup" event is not fired when the user has the mouse down then hovers out of the icon and then 
	 * releases the mouse
	*/
		elements.siblings('span').bind('mouseup mouseout', function() {
			var icon = $(this);
			var input = icon.siblings('input');
			
		//Remove the password previewer field created during mousedown
			if (input.attr('type').toLowerCase() == 'password') {
			//Remove the previewer
				icon.siblings('input.passwordViewer').remove();
				
			//Show the password input
				input.show();
				
			//Tell the application that the user is no longer previewing a password
				input.trigger('passwordHidden');
			}
		});
	});
})(jQuery);