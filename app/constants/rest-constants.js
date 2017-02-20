define([], function() {

	var enroll = "core/enroll/";
	var register = "core/register/";
	var master = "core/master/";
	var role = "core/role/";
	var menu = "core/config/";
	var login = "core/login/"
	var mygv = "https://api.mygov.in/";
	var report = "core/report/";
	var workflow = "workflow/task/";
	var gallery="core/gallery/";
	var activity = "core/activity/";

	app_cached_providers.$provide.constant("RestConstants", {
		"Enrollment" : {
			"Enroll" : enroll + "youthenrollment",
			"YouthList" : enroll + "searchYouthDetails",
			"DeletYouth" : enroll + "deleteYouth",
			"DeactivateYouth" : enroll + "deleteYouthDetails",
			"getSearchDeactive" : enroll + "getSearchDeactive",
			"EditYouth" : enroll + "editYouthDetails",
			"GetYouth" : enroll + "getYouthDetails",
			"ApproveYouthDetails" : enroll + "approveYouthDetails",
			"RejectYouthDetails" : enroll + "rejectYouthDetails",
			"ApproveListing" : enroll + "getApprovedYouthDetails",
			"CheckUserWorkflowOption" : "core/role/checkUserWorkflowOption",
            "getRegisteredYouthGraphData" : enroll + "getRegisteredYouthGraphData",
			"getDistrictYouthCount" : enroll + "getDistrictYouthCount",
			"SelfEnrolledYouthList" : enroll + "getSelfEnroledYouthDetails",
			"activateYouth" : enroll + "activateYouth",
			"YouthListPDF" : enroll + "searchYouthDetailsPDF",
			"PendingYouthCount" : enroll + "getPendingYouthCount",
		},
		"Register" : {
			"UserList" : register + "searchUserRegistration",
			"activateUser" : register + "activateUser",
			"UpdateUser" : register + "updateUserRegistration",
			"RegisterUser" : register + "userRegistration",
			"GetUser" : "core/register/findUserRegistration",
			"DeleteUser" : register + "deleteUserRegistration",
			"getUserDeactiveList" : register + "getUserDeactiveList",
			"GetRole" : "core/role/getRoles",
			"GetOrgnization" : "core/organization/findorganization",
            "getDistrictUserCount" : register + "getDistrictUserCount",
			"getRegisteredUserGraphData" : register + "getRegisteredUserGraphData",
			"UserListPDF" : register + "searchUserRegistrationPDF",
		},
		"Message" : {
			"Search" : "core/config/search",
			"GetEmail" : "core/config/getEmails",
		},
		"Gallery":
		{
		"Create":gallery + "saveGallery",
		"submit":gallery + "submitGallery",
		"addGallery":gallery + "saveGalleryItems",
		"addItem":gallery + "saveSingleItems",
		"saveAsDraft":gallery + "saveAsDraft",
		"saveAsDraftAlbum":gallery + "saveAsDraftAlbum",
		"addAllItem":gallery + "addAllItem",
		"getGalleryList" : gallery + "getGalleryBySearchCriteria",
		"getDeactiveGalleryBySearchCriteria" : gallery + "getDeactiveGalleryBySearchCriteria",
		"getGallery" : gallery + "getGallery",
		"deleteGallery" : gallery + "deleteGallery",
		"deactivateGallery" : gallery + "deactivateGallery",
		"activateGallery" : gallery + "activateGallery",
		"deleteGalleryItem" : gallery + "deleteGalleryItem",
		"editGallery" : gallery + "updateGalleryAlbumById",
		"getGalleryItem" : gallery + "getGalleryItem",
		"editGalleryItem" : gallery + "updateGalleryById",
		"getOrgPhotoGallery" : gallery + "getOrgPhotoGallery",
		"getOrgVideoGallery" : gallery + "getOrgVideoGallery",
		"getFiles" : gallery + "getFiles",
		},
		"Master" : {
			"State" : master + "getStates",
			"District" : master + "getDistricts",
			"addGeography" : master + "saveGeographicArea",
			"AddRole" : role + "addRoles",
			"GetMenu" : master + "getMenu",
			"GetRoleList" : role + "getRolesBySearchCriteria",
			"getDeactiveRoleList" : role + "getDeactiveRoleList",
			"GetRole" : role + "getRoleById",
			"UpdateRole" : role + "updateRole",
			"DeleteRole" : role + "deactivateRole",
			"activateRole" : role + "activateRole",
			"addGeography" : master + "saveGeography",
			"geographyList" : master + "getGeographyBySearchCriteria",
			"getGeographyDeactiveList" : master + "getGeographyDeactiveList",
			"Geography" : master + "getGeographyById",
			"DeleteGeography" : master + "deleteGeographyById",
			"activateGeography" : master + "activateGeographyById",
			"UpdateGeography" : master + "updateGeographyById",

			"addMenu" : master + "saveMenu",
			"ListMenu" : master + "getMenuBySearchCriteria",
			"Menu" : master + "getMenuById",
			"DeleteMenu" : master + "deleteMenuById",
			"ActivateMenu" : master + "activateMenuById",
			"UpdateMenu" : master + "updateMenuById",
			"getParentMenu" : master + "getParentMenu",
			"StateByLevel" : master + "getStatesByLevel",
			"DistrictByLevel" : master + "getDistrictByLevel",
			"FileUploadCkEditor" : menu + "ckeditorUpload",
			"GetMyGovList" : menu + "getMyGovList",

		},
		"MyGov" : {
			"discuss" : mygv + "discuss/",
			"task" : mygv + "task/",
			"submission" : mygv + "submission/",
			"pollquestion" : mygv + "poll/",
			"talk" : mygv + "talk/",
			"group" : mygv + "group/",
			"pollquestiontitle" : mygv + "poll-question/",
		},
		"UpdateContent" : {
			"updateData" : "core/master/updateContent",
			"updateAsDraft" : "core/master/saveDraftContent",
			"getData" : "core/master/getContent",
			
			"saveEventData" : "core/event/saveEventData",
			"getEventData" : "core/event/getEventData",
			"getAllEvent" : "core/event/getAllEvent",
			"getAllDeactiveEvent" : "core/event/getApprovedEvents",
			"deleteEvent" : "core/event/deleteDraftedRecord",
			"deactivateEvent" : "core/event/deactivateApprovedRecord",
			"activateEvent" : "core/event/activateRecord",
			"updateEventData" : "core/event/updateEventData",
            "getAllPublishEvent" : "core/event/getAllPublishEvent",
			
			"saveAchievementData" : "core/achievement/saveAchievementData",
			"getAchievementData" : "core/achievement/getAchievementData",
			"getAllAchievements" : "core/achievement/getAllAchievements",
			"getAllDeactiveAchievements" : "core/achievement/getApprovedAchievements",
			"activateAchievement" : "core/achievement/activateDraftedRecord",
			"deleteAchievement" : "core/achievement/deleteDraftedRecord",
			"deactivateAchievement" : "core/achievement/deactivateApprovedRecord",
			"updateAchievementData" : "core/achievement/updateAchievementData",	
            "getAllPublishAchievements" : "core/achievement/getAllPublishAchievements",
		},
		"cmsContent" : {
			"updateData" : "core/master/updateContent",
			"getData" : "core/master/getContent",
			"getAllActiveFaq" : "core/master/getAllActiveFaq",
			"saveFAQData" : "core/master/saveFAQ",
			"updateFAQData" : "core/master/updateFAQ",
			"deleteFAQ" : "core/master/deactivateFAQ",
			"activateFAQ" : "core/master/activateFAQ",
			"getDeactiveFAQ" : "core/master/getDeactiveFAQ",
			"getAllFAQ" : "core/master/getAllFAQ",
			"getSingleFAQ" : "core/master/getSingleFAQ",
			
			"getAllActiveActivities" : "core/master/getAllActiveActivities",
			"saveActivity" : "core/master/saveActivity",
			"updateActivity" : "core/master/updateActivity",
			"activateActivity" : "core/master/activateActivity",
			"deleteActivity" : "core/master/deactivateActivity",
			"getAllActivity" : "core/master/getAllActivities",
			"getDeactiveActivity" : "core/master/getDeactiveActivities",
			"getSingleActivity" : "core/master/getSingleActivity",	
			
			"getAllActiveHomeLinks" : "core/master/getAllActiveHomeLinks",
			"saveHomeLink" : "core/master/saveHomeLink",
			"updateHomeLink" : "core/master/updateHomeLink",
			"activateHomeLink" : "core/master/activateHomeLink",
			"deactivateHomeLink" : "core/master/deactivateHomeLink",
			"getAllHomeLinks" : "core/master/getAllHomeLinks",
			"getDeactiveHomeLinks" : "core/master/getDeactiveHomeLinks",
			"getSingleHomeLink" : "core/master/getSingleHomeLink",	
			
		},
		"VisitorsCount" : {
			// "updateData": "core/master/putContent",
			"getVisitorsCount" : "core/config/visitorCount",
			"visitorsCountFromDB":"core/config/visitorCount",
		},
		"Login" : {
			"authVerify" : login + "authverification",
		},
		"MisReport" : {
			"UserState" : report + "getStateWiseUser",
			"YouthState" : report + "getStateWiseYouth",
			"UserDistrict" : report + "getDistrictWiseUser",
			"YouthDistrict" : report + "getDistrictWiseYouth",
		},
		"Workflow" : {
			"GetTaskList" : workflow + "getTask",
			"GetHistoryTaskList" : workflow + "getHistoryTask",
			"ApproveTask" : workflow + "updateTask",
			"GetTask" : workflow + "getTaskById",
			"GetEventTaskCount" : workflow + "getTaskCount",
			"GetEventWorflow" : workflow + "getEventWorkflow",
		},
		"Report" : {			
			"AuditReport" : report + "getAuditTrailReport",
			"ExceptionReport" : report + "getExceptionReport",
			"AuditReportPDF" : report + "getAuditTrailReportPDF",
			"ExceptionReportPDF" : report + "getExceptionReportPDF",			
		},
		"smsEmail" : {			
			"getEmailReport" : report + "getEmailReport",
			"getSMSReport" : report + "getSMSReport",
			"getEmailReportPDF" : report + "getEmailReportPDF",
			"getSMSReportPDF" : report + "getSMSReportPDF",			
		},
		"Activity" : {
			"loginLogoutReport" : activity + "getLoginLogoutReport",
			"loginLogoutReportPDF" : activity + "getLoginLogoutReportPDF",
		},
			
		"LogOut": {
				"logOut" : menu + "logout",
		},
		
		"GlobalSearch" : {
			"globalContentSearch" : "core/search/globalContentSearch",	
		},
		
		"Ping" : {
			"ping" : menu + "ping",	
		},
		
	});
});
