function makeFormEditable() {
	
	$("#isspersonalInfoModify-btn").click(function(){ 
		var btnText = 	$("#isspersonalInfoModify-btn").text()	;
		//alert(btnText);
		if (btnText == "Modify"){
			$("#issMobileNumber").attr("readonly", false).removeClass("noborder");
			$("#isspersonalInfoModify-btn").text("Save");
		} 
		else if (btnText == "Save"){			
			$("#issMobileNumber").attr("readonly", true).addClass("noborder");
			$("#isspersonalInfoModify-btn").text("Modify");
			$(".isspersonalInfoMsg").text("Changes saved successfully.").fadeIn(500).delay(1000).fadeOut(500);
        	
		} 		
		return false;
	});
	
	$("#isscontactInfoModify-btn").click(function(){ 
		var btnText = 	$("#isscontactInfoModify-btn").text()	;
		//alert(btnText);
		if (btnText == "Modify"){
			$("#issStreet1, #issStreet2, #issCity, #issState, #issZipcode").attr("readonly", false).removeClass("noborder");
			$("#isscontactInfoModify-btn").text("Save");
		} 
		else if (btnText == "Save"){			
			$("#issStreet1, #issStreet2, #issCity, #issState, #issZipcode").attr("readonly", true).addClass("noborder");
			$("#isscontactInfoModify-btn").text("Modify");
			$(".isscontactInfoMsg").text("Changes saved successfully.").fadeIn(500).delay(1000).fadeOut(500);
		} 		
		return false;
	});
	
	$("#issftpConfigInfoModify-btn").click(function(){ 
		var btnText = 	$("#issftpConfigInfoModify-btn").text()	;
		//alert(btnText);
		if (btnText == "Modify"){
			$("#issDomain, #issUserName,#issPassword, #issFolderName").attr("readonly", false).removeClass("noborder");
			$("#issftpConfigInfoModify-btn").text("Save");
		} 
		else if (btnText == "Save"){			
			$("#issDomain, #issUserName,#issPassword, #issFolderName").attr("readonly", true).addClass("noborder");
			$("#issftpConfigInfoModify-btn").text("Modify");
			$(".issftpConfigInfoMsg").text("Changes saved successfully.").fadeIn(500).delay(1000).fadeOut(500);
		} 		
		return false;
	});
}
function modifyRoles() {
	
	$("#issRoleEdit-btn").click(function(){ 
										  
		var btnText = 	$("#issRoleEdit-btn").text()	;
		//alert(btnText);
		if (btnText == "Modify"){
			$("#issRole, #issRoleDesc").attr("readonly", false).removeClass("noborder");
			$("#issRoleEdit-btn").text("Save");
			$('input.checkbox').removeAttr("disabled");
			 
		} 
		else if (btnText == "Save"){			
			$("#issRole, #issRoleDesc").attr("readonly", true).addClass("noborder");
			$("#issRoleEdit-btn").text("Modify");
			$('input.checkbox').attr('disabled', true);
			$(".roleMsg").text("Changes saved successfully.").fadeIn(500).delay(1000).fadeOut(500);
        	
		} 		
		return false;
	});
}

function modifyBankDetails() {
	
	$("#issBankDetailsEdit-btn").click(function(){ 
				 				  
		var btnText = 	$("#issBankDetailsEdit-btn").text()	;
		//alert(btnText);
		if (btnText == "Modify"){
			$("#issAccNickName1,#issRouteNum").attr("readonly", false).removeClass("noborder");
			$("input#issBankName").css('display','None');
			$("#issBankNameSel").css('display','Block');
			$("#issBankDetailsEdit-btn").text("Save");
		}
		else if (btnText == "Save"){			
			$("#issAccNickName1,#issRouteNum").attr("readonly", true).addClass("noborder");			
			$("input#issBankName").css('display','Block').val($('#issBankNameSel').val());
			$("#issBankNameSel").css('display','None');
			$("#issBankDetailsEdit-btn").text("Modify");
			$(".SaveMsg").text("Changes saved successfully.").fadeIn(500).delay(1000).fadeOut(500);
        	
		} 	
		
		return false;
	});	
	
}

function viewBankDetails() {

	$('.collapse').on('show.bs.collapse', function () {
    	$('.collapse.in').collapse('hide');
	});
}


function modifyUserDetails() {
	
	$("#issUserEdit-btn").click(function(){ 
										  
		var btnText = 	$("#issUserEdit-btn").text()	;
		//alert(btnText);
		if (btnText == "Modify"){
			$("#issUserFirstName, #issUserLastName,  #issUserName, #issPhoneNumber").attr("readonly", false).removeClass("noborder");
			$("input#issRole").css('display','None');
			$("#issRoleSel").css('display','Block');
			$("#issUserEdit-btn").text("Save");
			 
		} 
		else if (btnText == "Save"){			
			$("#issUserFirstName, #issUserLastName,  #issUserName, #issPhoneNumber").attr("readonly", true).addClass("noborder");
			$("input#issRole").css('display','Block').val($('#issRoleSel').val());
			$("#issRoleSel").css('display','None');
			$("#issUserEdit-btn").text("Modify");
			 
			$(".Msg").text("Changes saved successfully.").fadeIn(500).delay(1000).fadeOut(500);
        	
		} 		
		return false;
	});
}
/* Branding 
-----------------------------------*/
function loadLogoCSS(){
 
$("#issBrandLogoFile").on('change', function () {

        if (typeof (FileReader) != "undefined") {

            var image_holder = $("#image-holder");
            image_holder.empty();

            var reader = new FileReader();
            reader.onload = function (e) {
                $("<img />", {
                    "src": e.target.result,
				
                    "class": "thumb-image"
                }).appendTo(image_holder);

            }
            image_holder.show();
            reader.readAsDataURL($(this)[0].files[0]);
        } else {
            alert("This browser does not support FileReader.");
        }
    }); 
 
 	$("#issBrandLogoCSSModify-btn").click(function(){ 
									  
	$(".issBrandLogoCSSMsg").text("Changes saved successfully.").fadeIn(500).delay(1000).fadeOut(500);

	return false;
	});
	
}

/* Show  Report
 ----------------------------------------------*/
  function showReport() {
	  $('select[name=repNameSel]').change(function() {
	  	var repNameSelVal =  $('select[name=repNameSel]').val();
	  	//alert(repNameSelVal);
	  	if (repNameSelVal == "Revenue&Fees"){			
			$('.repText').addClass("hide");			
			$('#RF').removeClass('hide').addClass('show');		  
		}
		else {
			$('#RF').removeClass('show').addClass('hide');	
		}
		if (repNameSelVal == "MerchantDenied"){			
			$('.repText').addClass("hide");
				 
			$('#MD').removeClass('hide').addClass('show');		  
		}
		else {
			$('#MD').removeClass('show').addClass('hide');
		}
		if (repNameSelVal == "MerchantApproved"){			
			$('.repText').addClass("hide");	
			 
			$('#MA').removeClass('hide').addClass('show');		  
		}
		else {
			$('#MA').removeClass('show').addClass('hide');
		}
		if (repNameSelVal == "MerchantEnrollmentStatus"){			
			$('.repText').addClass("hide");	
			
			$('#MES').removeClass('hide').addClass('show');		  
		}
		else {
			$('#MES').removeClass('show').addClass('hide');
		}
		if(repNameSelVal == ""){			
			$('.repText').addClass("show");			 
		 	  
		}
		
	 }); 
  }
  
   /* Panel Expand Collapse
 ----------------------------------------------*/
 function panelExpandCollapse() {
	 
	
	 
	 $('.panel-heading span.clickable').click(function (){
         
		 var $this = $(this);
		 
	if(!$this.hasClass('panel-collapsed')) {
		$this.parents('.panel').find('.panel-body').slideUp();
		$this.addClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
		$this.parents('.panel').css('min-height','0px');
	} else {
		$this.parents('.panel').find('.panel-body').slideDown();
		$this.removeClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
		$this.parents('.panel').css('min-height','470px');
	}
		return false;
    });
	 
 }