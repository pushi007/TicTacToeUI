function loginValidation (){
	$('#btn-login').click(function() {					   
		$('#loginform').validate({
			rules:{
				Email:
					{	
						required:true,
						email:true
					},
				password:
					{
						required:true,
						minlength:5,
						maxlength:10
					}
			},
			
			highlight: function(element) {					
            	$(element).closest('.input-group').addClass('error');
        	},
        	unhighlight: function(element) {
            	$(element).closest('.input-group').removeClass('error');
        	},				
        	errorElement: 'span',
        	errorClass: 'help-inline',
        	errorPlacement: function(error, element) {
            	if(element.parent('.input-group').length) {
                	error.insertAfter(element.parent());
            	} else {
                	error.insertAfter(element);
            	}
			},
			submitHandler: function(form) {
				var emailVal = $('#Email').val();
				//alert(emailVal);
				if (emailVal == 'partner@aw.com') { // this is what the plugin does automatically when it evaluates the rules
					window.location = "Partner/partnerLanding.html"; // this is already the 'action' part of your '<form>'
				}
				if (emailVal == 'acquirer@aw.com') { // this is what the plugin does automatically when it evaluates the rules
					window.location = "Acquirer/acquirerLanding.html"; // this is already the 'action' part of your '<form>'
				}
				if (emailVal == 'issuer@aw.com') { // this is what the plugin does automatically when it evaluates the rules
					window.location = "Issuer/issuerLanding.html"; // this is already the 'action' part of your '<form>'
				}
				if (emailVal == "refPartner@aw.com") {
					window.location  = "Referral Partner/refPartnerLanding.html";
				}
				if (emailVal == "superAdmin@aw.com") {
					window.location  = "Super Admin/ManageUser.html";
				}
				
			}
			
		})	
		
	 
	});
	
}
function forgetPasswordValidation(){
	$('#btn-back').click(function() {	
		window.location.href = 'login.html'							
	});
	$('#btn-Submit').click(function() {					   
		$('#forgotPasswordForm').validate({
			rules:{
				Email:
					{	
						required:true,
						email:true
					},				
			},
			highlight: function(element) {					
            	$(element).closest('.input-group').addClass('error');
        	},
        	unhighlight: function(element) {
            	$(element).closest('.input-group').removeClass('error');
        	},				
        	errorElement: 'span',
        	errorClass: 'help-inline',
        	errorPlacement: function(error, element) {
            	if(element.parent('.input-group').length) {
                	error.insertAfter(element.parent());
            	} else {
                	error.insertAfter(element);
            	}
			},			
			submitHandler: function(form) {				
				displayConfirmationMsg();				
			}
		})	 
	});
}

function displayConfirmationMsg(){	
	
	$("#forgotPasswordForm").css('display','None');
	$("#forgotPassword-alert").css('display','Block');
	$("#forgotPassword-alert").text("Your Password has been sent on your email address.").fadeIn(500).delay(3000).fadeOut(500);	
	 setTimeout(function() {
       window.location.href = "login.html"
      }, 3000);	
}