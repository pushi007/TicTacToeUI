(function() {
	var partner = "app/Youth/";
	var ncc = "app/ncc/";
	var auth = "app/Authentication/";
	var shared = "app/Shared/";
	var enroll = "app/Enrollment/";
	var register = "app/Registration/";
	var message = "app/Message/";
	var authVerification = "app/user_login/";
	var master = "app/Masters/";
	var cont = "";
	var task = "app/Task/";
	var misReport = "app/MisReport";
    var gallery = "app/Gallery/";
	var cons = "app/constants/";
	var dirPath = "app/directives/";
	var menu_dir = "app/HeaderFooter/menu-directive";
    var auditReport = "app/AuditTrailReport";
    var exceptionReport = "app/ExceptionReport";
    var loginlogoutReport = "app/LoginLogoutReport";
    var smsEmailReport = "app/SMSEmailReport";
    var error = "app/Error/";
    var headerFooter="app/HeaderFooter";
	require.config({
		// baseUrl: "js/scripts",
		baseUrl : ".",
		waitSeconds : 30,
		urlArgs : "bust=" + new Date().getTime(), // bursts cache everytime
		// alias libraries paths
		paths : {

			// here we define path to NAMES
			// "name" : "path/dir/file (without js extension)"

			// below are all static files dynamically included

			"raphael" : "static/js/raphael-min",
			// "morris": "static/js/morris",
			"morris-min" : "static/js/morris",
			"morris-data" : "static/js/morris-data",
			"partner-data" : "static/js/partner-data",
			"acq-data" : "static/js/acq-data",
			"tiny-slider" : "static/js/tiny-slider",

			"custom" : "static/js/custom",
			"moment" : "static/js/moment",
			"data-time-picker" : "static/js/bootstrap-datetimepicker",
			"jquery" : "static/js/jquery.min",
			"float" : "static/js/jquery.flot",
			"floatpie" : "static/js/jquery.flot.pie",
			// "reportdir":shared+"MyReports/reports-directive",
			// "revenuecons":shared+"MyReports/revenue-help-text",

			/* Belowe are App related js files */

			"MenuConstants" : cons + "menu-constants",
			"BannerImageConstants" : cons + "content-constants",
			"MenuNameConstants" : cons + "menu-name-constants",
			"ErrorConstants" : cons + "error-constants",
			"RestConstants" : cons + "rest-constants",
			"Factory" : "app/factory",
			"Directive" : dirPath + "directives",
			// "charts_dir" : charts_dir,
			"menu_dir" : menu_dir,

			"LoginCtrl" : auth + "/login-controller",
			"LoginFactory" : auth + "/login-factory",

			"ForgotPasswordFactory" : auth
					+ "forgotpassword/forgot-password-factory",
			"ForgotPasswordCtrl" : auth
					+ "forgotpassword/forgot-password-controller",

			"Partner.HomeCtrl" : partner + "home-controller",

			"EnrollCtrl" : enroll + "youth-enrollment-controller",
			"EnrollFactory" : enroll + "enroll-factory",

			"RegisterCtrl" : register + "register-controller",
			"ViewRegisterCtrl" : register + "view-register-controller",
			"RegisterFactory" : register + "register-factory",

			"GeographyCtrl" : master + "geography-controller",
			"GeographyFactory" : master + "geography-factory",

			"MenuCtrl" : master + "menu-controller",
			"MenuFactory" : master + "menu-factory",

			"GalleryCtrl": gallery +"gallery-controller",
		    "GalleryFactory": gallery+"gallery-factory",
		    
			"RoleCtrl" : master + "role-controller",
			"RoleFactory" : master + "role-factory",
			"RoleRightFactory" : master + "role-rights-factory",

			"TaskCtrl" : task + "task-controller",
			"TaskFactory" : task + "task-factory",
			"AchievementTaskCtrl" : task + "achievement-task-controller",
			"PhotoGalleryTaskCtrl" : task + "photogallery-task-controller",
			"VideoGalleryTaskCtrl" : task + "videogallery-task-controller",
			"MessageCtrl" : message + "message-controller",
			"MessageFactory" : message + "message-factory",
			"UserProfileController" : authVerification
					+ "user-profile-controller",
			"UserProfileFactory" : authVerification + "user-profile-factory",
			"NccCtrl" : ncc + "ncc-controller",
			"govCtrl" : "app/discussion/gov-controller",
			"govTaskCtrl" : "app/discussion/tasks-controller",
			"govTalkCtrl" : "app/discussion/talk-controller",
			"govPollCtrl" : "app/discussion/poll-controller",
			"govGroupCtrl" : "app/discussion/group-controller",
			"govFactory" : "app/discussion/gov-factory",
			"cmsCtrl" : "app/CMS/cms-controller",
			"cmsFactory" : "app/CMS/cms-factory",

			"ckEditorCtrl" : "app/ckEditor/ckeditor-controller",
			"ckEditorFactory" : "app/ckEditor/ckeditor-factory",

			"paging_dir" : "app/Shared/paging-directive",

			// "Ncc":ncc+"ncc-controller";
			// "NccFactory":ncc+"ncc-controller";

			"OrgCtrl" : shared + "org-controller",
			"cmsEventCtrl" : "app/cms_event/cms-event-controller",
			"cmsEventFactory" : "app/cms_event/cms-event-factory",
			"DashboardCtrl" : "app/dashboard/dashboard-controller",
			"DashboardFactory" : "app/dashboard/dashboard-factory",
			"cmsAchievementCtrl": "app/cms_achivement/cms-achievement-controller",
	        "cmsAchievementFactory":"app/cms_achivement/cms-achievement-factory",
            
            //"AuditCtrl" : auditReport + "/audit-report-controller",
            //"AuditFactory" : auditReport + "/audit-factory",

            "ReportCtrl" : misReport + "/mis-controller",
            "ReportFactory" : misReport + "/mis-factory",
            
			"AuditCtrl" : auditReport + "/audit-report-controller",
			"AuditFactory" : auditReport + "/audit-factory",

            "ExceptionCtrl" : exceptionReport + "/exception-report-controller",
            "ExceptionReportFactory" : exceptionReport + "/exception-report-factory",

            "LoginLogoutCtrl" : loginlogoutReport + "/loginlogout-report-controller",
            "LoginLogoutFactory" : loginlogoutReport + "/loginlogout-report-factory",
            
            "SmsEmailCtrl" : smsEmailReport + "/smsEmail-report-controller",
            "SmsEmailFactory" : smsEmailReport + "/smsEmail-report-factory",            
            
            "ErrorCtrl": error +"error-controller",
            
            "FAQCtrl" : "app/faq/faq-controller",
            "FAQFactory" : "app/faq/faq-factory",
            
            "ActivityCtrl" : "app/activities/activity-controller",
            "ActivityFactory" : "app/activities/activity-factory",
            
            "HomeLinksCtrl" : "app/home_links/home-links-controller",
            "HomeLinksFactory" : "app/home_links/home-links-factory",
            
            "MainHeaderCtrl": headerFooter+"/main-header-controller",

		},
		deps : [ 'app/get-app' ]
	});
})();
