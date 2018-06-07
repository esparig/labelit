$(function() {

	// categories container
	var $rgCategories			= $('#rg-categories');

	Categories				= (function() {

		init = function() {
			//
		},

		addCategory	= function( $new ) {
			$rgCategories.find('div.btn-group').append( $new )
		};

		return {
			init 		: init,
			addCategory	: addCategory
		};

	})();

});

$(document).on('click', '.btn-group .category-btn', function() {
	$(this).blur();
	category = $( this )[0].id
	imgpath = $('.rg-image img').attr('src');
	imgname = imgpath.replace(/^.*[\\\/]/, '');

	//update value
	mydict[imgname] = category;
	// save JSON
	fs.writeFile(path.join(folder, 'labels.json'), JSON.stringify(mydict), (err) => {
		if (err) throw err;
	});
	// update description in Gallery and change to next image
	Gallery.updateItem(categories.categories[category-1]);
});

// Execute a function when the user releases a key on the keyboard
document.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
	k = event.keyCode;
	numcats = categories.categories.length;
  if ( k > 48 && k < 49+numcats) {
    // Trigger the button element with a click
    document.getElementById(k-48).click();
  }
});
