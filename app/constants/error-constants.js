define([],function(){

	  app_cached_providers.$provide.constant("ErrorConstants",{

		"BVEXXX001" : "Name {0} already exists!",
		"BVEXXX002" : "Role {0} already exists!",
		"BVEXXX003" : "Username {0} already exists!",
		"BVEXXX004" : "Duplicate account nickname(s) {0}!",
		"BVEXXX005" : "At-least one Bank Account detail needed!",
		"BVEXXX006" : "No record found, please check the identifier!",
		"BVEXXX007" : "Username cannot be modified!",
		"BVEXXX008" : "Question {0} already exists!",
		"BVEXXX009" : "Bank Account type not supported!",
		"BVEXXX0010" : "Email {0} already exists!",
		"BVEXXX010" : "Invalid question!",

		"PVSGEN001" : "Invalid activation token!",
		"PVSGEN002" : "Activation token expired!",
		"PVSGEN003" : "Required parameter(s) must not be empty!",

		"SYSCNF001" : "Unable to value for configuration key {0}!",

		"PVSDVE001" : "Unable to find role with given identifier!",
		"PVSDVE002" : "Unable to find user with given identifier!",

		"PVSINT001" : "Invalid parameter value!",

		// Error code for generic failures
		"SYSERR001" : "Unable to process request now!",
		// Error code for db failures
		"SYSERR002" : "Unable to process request now!",
		//General Error messages
		"GENDNF000" : "No record found, please check the id!",

		"GENSEC000" : "Invalid Credentials!",
		"GENSEC001" : "Please contact administrator!",

		"GENPWD000" : "Password must not be null or empty!",
		"GENPWD001" : "Password & Confirm Password does not match!",
		"GENPWD002" : "Password should match following criteria - bla bla bla!",
		"GENPWD004" : "Password should not be from last {0} passwords! ",

		"GENSEC004" : "Incorrect Security Answer!",
		"GENSEC005" : "Invalid Access",

		// General Ledger
		"GL001" : "{0} Missing or null Parameter: {1}"
	});
});