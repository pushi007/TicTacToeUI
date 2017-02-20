( function($) {
  'use strict';



	/*-------------------------------------------------------------------------------
	  Smooth scroll to anchor
	-------------------------------------------------------------------------------*/
	
// var navbar=$('.js-navbar');
// var navbarAffixHeight=76
// $(document).on("click", ".js-target-scroll", function() {

//    var target = $(this.hash);
//         if (target.length) {
//             $('html,body').animate({
//                 scrollTop: (target.offset().top - navbarAffixHeight + 1)
//             }, 'fast');
//             return false;
//         }
// });
// $('body').scrollspy({
// 		offset:  navbarAffixHeight + 1
// 	});



$(document).on("click", "#searchIcon", function() {
   $(".search-area").slideDown('fast');
});
$(document).on("click", "body", function() {
   $(".search-area").hide();
});

$(document).on("click", ".search-area", function(event) {
   event.stopPropagation();
});

$(document).on("click", ".homelink", function() {
   $("html, body").animate({ scrollTop: 0 }, 0);
});


// Responsive Menu Toggling
$(document).on("click", "#MoyaNavbar a", function() {
    $("html, body").animate({ scrollTop: 0 }, 0);
});

$(document).on("click", "#menu_slide", function() {
  	$('.navbar-collapse').show();
  	$('#menu_slide').hide();
  	$('#menu_close').show();
 })
$(document).on("click", "#menu_close", function() {
  	$('.navbar-collapse').hide();
  	$('#menu_close').hide();
  	$('#menu_slide').show();

 })
 $(window).resize(function () {
        var w = $(window).width();
        if (w > 320) {
            $("#menu_close").removeAttr('style');
             $("#menu_slide").removeAttr('style');
             $(".navbar-collapse").removeAttr('style');
        }
        if (w < 1000) {
           $('#menu_slide').show();
        }
    })


  

	/*-------------------------------------------------------------------------------
	 Navbar collapse
	-------------------------------------------------------------------------------*/



	// $('.navbar-collapse').on('show.bs.collapse', function () {
	//  	navbar.addClass('affix');
 //  		navbar.find('.js-brand-hinge').addClass('animated hinge');
	// });

	// $('.navbar-collapse').on('hide.bs.collapse', function () {
	// 	if (navbar.hasClass('affix-top')){
	// 		navbar.removeClass('affix');
 //  			navbar.find('.js-brand-hinge').removeClass('animated hinge');
	// 	}
	// });

	// $(".navbar-nav > li > a").on('click', function() {
	//     $(".navbar-collapse").collapse('hide');
	// });



	/*-------------------------------------------------------------------------------
	 Scrollspy
	-------------------------------------------------------------------------------*/


	


})(jQuery);
