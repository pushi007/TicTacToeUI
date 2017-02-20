// JavaScript Document

 
//============================Success Alert Start *** Plugin-10 ***==================// 

function showSuccessAlert(id) {
    $("#" + id).fadeIn(500);
    $(".overlay-alert-msg").fadeIn(500);
}
function hideSuccessAlert(id) {
    $("#" + id).fadeOut(500);
    $(".overlay-alert-msg").fadeOut(500);
}
//============================Info Alert Start *** Plugin-11 ***==================// 
function showInfoAlert(id) {
    $("#" + id).fadeIn(500);
    $(".overlay-alert-msg").fadeIn(500);
}
function hideInfoAlert(id) {
    $("#" + id).fadeOut(500);
    $(".overlay-alert-msg").fadeOut(500);
}
//============================Error Alert Start *** Plugin-12 ***==================// 
function showErrorAlert(id) {
    $("#" + id).fadeIn(500);
    $(".overlay-alert-msg").fadeIn(500);
}
function hideErrorAlert(id) {
    $("#" + id).fadeOut(500);
    $(".overlay-alert-msg").fadeOut(500);
}
function showInfoDelete(id) {
	 $("#" + id).fadeIn(500);
	    $(".overlay-alert-msg").fadeIn(500);
}
function hideInfoDelete(id) {
    $("#" + id).fadeOut(500);
    $(".overlay-alert-msg").fadeOut(500);
}

/******Set language Function********/ 
function setLanguage(strlang)
{

    //var $label = $('.languageText');
    //var $mandatory = $label.find('.mandatory'); 
    //$label.html('New Text');
    //$label.append($mandatory);

  lang= GetCookie('language');

  if (lang==null)
  {
    SetCookie('language', 'en', exp);
    lang='en';
  }
  $('.languageText').each(function(i){
          $(this).text(aLangKeys[lang][ $(this).attr('key') ]);
    });
}

/****************************/
$(document).ready(function(){
 $(".fa-search").click(function(){
  alert('hello');
 });


});






   /* $(function() {
         var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
         $("#myNavbar li a").each(function(){
			 alert('menu');
              if($(this).attr("href") == pgurl || $(this).attr("href") == '' )
              $(this).addClass("active");
         })
    });*/












