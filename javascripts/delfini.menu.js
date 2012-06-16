/*
 * Delfini UI - Drop Down Menu
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
 * <ul class="dropdown" data-name="menu">      The "dropdown" class will activate this UI widget for a given
 * <li>Option</li>                             unordered list
 * <li>Option</li>                             The "data-name" attribute will be the name of the HTML element
 * <li class="selected">Option</li>            when the data is submitted in a <form>
 * <li>A longer option</li>                    The "selected" class shows the currently selected option
 * <li data-value="long">Long</li>             The "data-value" attribute will be used whenever a given value
 * </ul>                                       is selected, otherwise the value of the <li> is used
 *
 *
 *
 * Events dispatched:
 *  - dropdownReady                            The unordered list has been properly modified and is ready for use
 *  - menuOpened                               The user has opened the menu
 *  - menuClosed [FORTH COMING]                The user has closed the menu
 *  - menuItemSelected                         A menu item has been selected
 *  - newMenuItemSelected                      A different menu item than the previously selected item was chosen
*/

(function($) {
	$(document).ready(function() {
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
			
			if (currentMenu.children('li.selected').attr('data-value') && currentMenu.children('li.selected').attr('data-value') != undefined && currentMenu.children('li.selected').attr('data-value') != '') {
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
	});
})(jQuery);