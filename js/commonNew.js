// JavaScript Document
 var aboutLength = 250;

 $(function() {
      var showcase = $("#showcase")

      showcase.Cloud9Carousel( {
        yPos: 42,
        yRadius: 48,
        mirrorOptions: {
          gap: 12,
          height: 0.2
        },
        buttonLeft: $(".nav > .left"),
        buttonRight: $(".nav > .right"),
        autoPlay: true,
        bringToFront: true,
        onRendered: showcaseUpdated,
        onLoaded: function() {
          showcase.css( 'visibility', 'visible' )
          showcase.css( 'display', 'none' )
          showcase.fadeIn( 1500 )
        }
      } )

      function showcaseUpdated( showcase ) {
        var title = $('#item-title').html(
          $(showcase.nearestItem()).attr('alt')
        )

        var c = Math.cos((showcase.floatIndex() % 1) * 2 * Math.PI)
        title.css('opacity', 0.5 + (0.5 * c))
      }

      // Simulate physical button click effect
      $('.nav > button').click( function( e ) {
        var b = $(e.target).addClass( 'down' )
        setTimeout( function() { b.removeClass( 'down' ) }, 80 )
      } )

      $(document).keydown( function( e ) {
        //
        // More codes: http://www.javascripter.net/faq/keycodes.htm
        //
        switch( e.keyCode ) {
          /* left arrow */
          case 37:
            $('.nav > .left').click()
            break

          /* right arrow */
          case 39:
            $('.nav > .right').click()
        }
      } )
    });
	
	$(document).ready(function(){
  
  //$(".dropdown-menu").parent().addClass("down-arrow");   
  $("#searchIcon").parent().addClass("search");
  $(".dropdown-menu").parent().addClass("down-arrow");

	$("#menu_slide").click(function(){
		$("#navbar").slideToggle('normal');
	});

	 $(".search").click(function(e){
	 	e.preventDefault();
	 	$(".search-area").slideToggle();
	 });
	 // $("html").click(function(e){
	 // 	$(".search-area").slideUp();
	 // });
	$(".search-area").click(function(e){
		e.stopPropagation();
	});


	});
	


	$(document).ready(function(){
  $('#navbar > ul > li:has(ul)').addClass("has-sub");
  $('#navbar > ul > li > a').click(function() {
    var checkElement = $(this).next();
    $('#navbar li').removeClass('dropdown');
    $(this).closest('li').addClass('dropdown');	
    if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
      $(this).closest('li').removeClass('dropdown');
      checkElement.slideUp('normal');
    }
    if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
      $('#navbar ul ul:visible').slideUp('normal');
      checkElement.slideDown('normal');
    }
    if (checkElement.is('ul')) {
      return false;
    } else {
      return true;	
    }		
  });
});

$("#navbar").on("click", function(event){
    event.stopPropagation();
});
$(".dropdown-menu").on("click", function(event){
    event.stopPropagation();
});
$(document).on("click", function(event){
    $(".dropdown-menu").slideUp('normal');
});	

$(".navbar-header").on("click", function(event){
    event.stopPropagation();
});
$(document).on("click", function(event){
    $("#navbar").slideUp('normal');
});	
/******Function Load********/	
// $(document).ready(function(){
// 		LatestNews();
// });
/******Latest News Animation********/	
	// function LatestNews() {	

	// 		var	_Ticker = $("#T1").newsTicker();
	// 			$("#stop-resume").on("click",function(){
           
	// 				if(!!_Ticker.data("stop")){
	// 					_Ticker.newsTickerResume();
	// 					$(this).addClass('glyphicon-pause');
	// 					$(this).removeClass('glyphicon-play');
	// 					return false;
	// 				}
	// 				_Ticker.newsTickerPause();
	// 				$(this).addClass('glyphicon-play');
	// 				$(this).removeClass('glyphicon-pause');
	// 				return false;
	// 			});
	// };
/******Set language Function********/ 

// function setLanguage(strlang)
// {
//   alert(strlang)

//   lang= strlang;
//   $('.languageText').each(function(i){
//           $(this).text(aLangKeys[lang][ $(this).attr('key') ]);
//     });
// }