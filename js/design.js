// JavaScript Document
"use strict";
$(document).ready(function() {
	orgBox();
	LatestNews();
	award();
	scrollTop();
	newsAnnouncement();
	
});
/******Organozation Animation********/			
function orgBox() {
    var tabContent = $(".org-desc").hide();
	$(".orgBoxEffect").hover(function(){	
	 var tabId = $(this).attr('data-tab');	
		$("#" + tabId).stop(true,true).slideDown('2000');
		},function(){
			$(tabContent).slideUp(300);
		});
}
	
/******Latest News Animation********/	
	function LatestNews() {	
			var	_Ticker = $("#T1").newsTicker();
				$("#stop-resume").on("click",function(){
					if(!!_Ticker.data("stop")){
						_Ticker.newsTickerResume();
						$(this).addClass('glyphicon-pause');
						$(this).removeClass('glyphicon-play');
						return false;
					}
					_Ticker.newsTickerPause();
					$(this).addClass('glyphicon-play');
					$(this).removeClass('glyphicon-pause');
					return false;
				});
	}
/******Award Animation********/	
function award() {			
    $('.fadein p:gt(0)').hide();
    setInterval(function(){$('.fadein > :first-child').fadeOut().next('p').fadeIn().end().appendTo('.fadein');}, 5000);
}
function newsAnnouncement() {

   $('#example').vTicker('init', {speed: 400, 
    pause: 3000,
    showItems: 2,
    });

}

function scrollTop() {
	
	//Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	
	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},700);
		return false;
	});
	}
	

$('#accordion .panel-title').click(function (e){
  var chevState = $(e.target).siblings("i.indicator").toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
  $("i.indicator").not(chevState).removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
});


	
$(".close").click(function(){
		location.reload();
});
	
	