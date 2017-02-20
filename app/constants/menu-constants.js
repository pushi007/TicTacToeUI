define(
		[],
		function() {

			app_cached_providers.$provide
					.constant(
							'MenuConstants',
							{

								"moyaMenu" : {
									"Home" : {
										"name" : "Home",
										"icon" : "home-menu.png",
										"pageUrl" : "#home",
										"title" : "",
										"menuDesc" : ""
									},
									"MoYAS" : {
										"name" : "MoYAS",
										"icon" : "moyas-menu.png",
										"pageUrl" : "http://yas.nic.in/",
										//"externalLink" : "window.open('http://www.yahoo.com', '_blank')",
										"title" : "Ministry of Youth Affairs and Sports",
										"targetPage" : "_blank",
									},
									"NYKS" : {
										"name" : "NYKS",
										"icon" : "nyks-menu.png",
										//"pageUrl" : "cmsNYKS",
										"title" : "Nehru Yuva Kendra Sangathan",
									},
									"NSS" : {
										"name" : "NSS",
										"icon" : "nss-menu.png",
										//"pageUrl" : "cmsContent?NSS",
										"title" : "National Service Scheme",
									},
									
									"ScoutsGuides" : {
										"name" : "Scouts and Guides",
										"icon" : "bsg-hsg-menu.png",
										//"iconglyph" : "fa fa-users",
										//"display":"displayNone",
										"pageUrl" : "#",
										"title" : "",
										"careticon" : "caret",
										"downarrow":"fa fa-caret-down submenu-arrow-home",
										"menutoggle" : "dropdown",
										"subMenuDto" : [ {
											"subMenuName" : "BSG",
											"icon" : "bsg-menu.png",
											//"pageUrl" : "cmsBSG"
										}, {
											"subMenuName" : "HSG",
											"icon" : "hsg-menu.png",
											//"pageUrl" : "cmsHSG"
										}
										]
									},
									"NCC" : {
										"name" : "NCC",
										"icon" : "ncc-menu.png",
										//"pageUrl" : "cmsNCC",
										"title" : "National Cadet Corps",
									},
									
									
									"IRCS" : {
										"name" : "IRCS",
										"icon" : "ircs-menu.png",
										//"pageUrl" : "cmsIRCS",
										"title" : "India Red Cross Society",
									},
									"Eco-Clubs" : {
										"name" : "Eco-Clubs",
										"icon" : "eco-menu.png",
										//"pageUrl" : "cmsEchoClubs",
										"title" : "Ministry of Environment Forest and Climate Change",
									},
									"Search" : {
										"name" : "Search",
										"searchClass":"search",
										"display":"displayNone",
										"iconglyph" : "fa fa-search",
										"idSearch":"searchIcon",
									},
									
								},
								"myGovMenu" : {
									
									"tasks" : {
										"name" : "Tasks",
										"iconglyph" : "glyphicon glyphicon-ok",
										"pageUrl" : "tasks",
										"title" : "",
										"menuDesc" : "",
										"multicolor" : "green-bg"
									},
									"discussion" : {
										"name" : "Discussion",
										"iconglyph" : "glyphicon glyphicon-list-alt",
										"pageUrl" : "discussion",
										"title" : "",
										"menuDesc" : "",
										"multicolor" : "red-bg"
									},
									"poll" : {
										"name" : "Poll",
										"iconglyph" : "glyphicon glyphicon-stats",
										"pageUrl" : "poll",
										"title" : "",
										"menuDesc" : "",
										"multicolor" : "orange-bg"
									},
									"talk" : {
										"name" : "Talk",
										"iconglyph" : "glyphicon glyphicon-headphones",
										"pageUrl" : "talk",
										"title" : "",
										"menuDesc" : "",
										"multicolor" : "blue-bg"
									},
									"group" : {
										"name" : "Group",
										"iconglyph" : "glyphicon glyphicon-user",
										"pageUrl" : "group",
										"title" : "",
										"menuDesc" : "",
										"multicolor" : "grey-bg"
									},
								},
								"nccMenu" : {
									"Home" : {
										"menuName" : "Home",
										"iconglyph" : "fa fa-home",
										"pageUrl" : "#home",
										"title" : ""
									},
									"About Us" : {
										"menuName" : "About Us",
										"iconglyph" : "fa fa-exclamation-circle",
										"pageUrl" : "#about",
										"title" : ""
									},
									"Enrolment & Benefits" : {
										"iconglyph" : "fa fa-sticky-note",
										"menuName" : "Enrolment & Benefits",
										"pageUrl" : "#Enrolment",
										"title" : ""
									},
									"Activities" : {
										"iconglyph" : "fa fa-users",
										"menuName" : "Activities",
										"pageUrl" : "#Activities",
										"title" : ""
									},
									"Achievements" : {
										"iconglyph" : "fa fa-trophy",										
										"menuName" : "Achievements",
										"pageUrl" : "#achivement",
										"title" : ""
									},
									"Gallery" : {
										"menuName" : "Gallery",
										"iconglyph" : "fa fa-camera",
										"pageUrl" : "#",
										"title" : "",
										"careticon" : "caret",
										"menutoggle" : "dropdown",
										"subMenuDto" : [ {
											"subMenuName" : "Photo Gallery",
											"pageUrl" : "http://nccindia.nic.in/en/photo-gallery",
											"targetPage" : "_blank",
										}, {
											"subMenuName" : "Video Gallery",
											"pageUrl" : "http://nccindia.nic.in/en/video-gallery",
											"targetPage" : "_blank",
										}]
									},
									"FAQ" : {
										"menuName" : "FAQ",
										"iconglyph" : "fa fa-question-circle",
										"pageUrl" : "#faq",
										"title" : ""
									},
									"Contact NCC" : {
										"iconglyph" : "fa fa-map-marker",
										"menuName" : "Contact NCC",
										"pageUrl" : "#contact",
										"title" : ""
									},
									"Visit NCC" : {
										"menuName" : "Visit NCC",
										"iconglyph" : "fa fa-globe",
										"pageUrl" : "http://nccindia.nic.in/",
										"title" : "",
										"targetPage" : "_blank"
									},
									"Search" : {
										"searchClass":"search",
										"display":"displayNone",
										"iconglyph" : "fa fa-search",
										"idSearch":"searchIcon",
										"menuName" : "Search",
										"pageUrl" : "#",
										"title" : ""
									},
								},
								"nssMenu" : {
									"Home" : {
										"menuName" : "Home",
										"iconglyph" : "fa fa-home",
										"pageUrl" : "#home",
										"title" : ""
									},
									"About Us" : {
										"menuName" : "About Us",
										"iconglyph" : "fa fa-exclamation-circle",
										"pageUrl" : "#about",
										"title" : ""
									},
									"Enrolment & Benefits" : {
										"iconglyph" : "fa fa-sticky-note",
										"menuName" : "Enrolment & Benefits",
										"pageUrl" : "#Enrolment",
										"title" : ""
									},
									"Activities" : {
										"iconglyph" : "fa fa-users",
										"menuName" : "Activities",
										"pageUrl" : "#Activities",
										"title" : ""
									},
									"Achievements" : {
										"iconglyph" : "fa fa-trophy",										
										"menuName" : "Achievements",
										"pageUrl" : "#achivement",
										"title" : ""
									},
									"Gallery" : {
										"menuName" : "Gallery",
										"iconglyph" : "fa fa-camera",
										"pageUrl" : "#",
										"title" : "",
										"careticon" : "caret",
										"menutoggle" : "dropdown",
										"subMenuDto" : [ {
											"subMenuName" : "Photo Gallery",
											"pageUrl" : "http://nss.nic.in/gallery.asp",
											"targetPage" : "_blank",
										}, {
											"subMenuName" : "Video Gallery",
											"pageUrl" : "#videoGallery"
										}]
									},
									"FAQ" : {
										"menuName" : "FAQ",
										"iconglyph" : "fa fa-question-circle",
										"pageUrl" : "#faq",
										"title" : ""
									},
									"Contact NSS" : {
										"iconglyph" : "fa fa-map-marker",
										"menuName" : "Contact NSS",
										"pageUrl" : "#contact",
										"title" : ""
									},
									"Visit NSS" : {
										"menuName" : "Visit NSS",
										"iconglyph" : "fa fa-globe",
										"pageUrl" : "http://nss.nic.in/",
										"title" : "",
										"targetPage" : "_blank"
									},
									
									"Search" : {
										"searchClass":"search",
										"display":"displayNone",
										"iconglyph" : "fa fa-search",
										"idSearch":"searchIcon",
										"menuName" : "Search",
										"pageUrl" : "#",
										"title" : ""
									},

								},

								"nyksMenu" : {
									"Home" : {
										"menuName" : "Home",
										"iconglyph" : "fa fa-home",
										"pageUrl" : "#home",
										"title" : ""
									},
									"About Us" : {
										"menuName" : "About Us",
										"iconglyph" : "fa fa-exclamation-circle",
										"pageUrl" : "#about",
										"title" : ""
									},
									"Enrolment & Benefits" : {
										"iconglyph" : "fa fa-sticky-note",
										"menuName" : "Enrolment & Benefits",
										"pageUrl" : "#Enrolment",
										"title" : ""
									},
									"Activities" : {
										"iconglyph" : "fa fa-users",
										"menuName" : "Activities",
										"pageUrl" : "#Activities",
										"title" : ""
									},
									"Achievements" : {
										"iconglyph" : "fa fa-trophy",										
										"menuName" : "Achievements",
										"pageUrl" : "#achivement",
										"title" : ""
									},
									"Gallery" : {
										"menuName" : "Gallery",
										"iconglyph" : "fa fa-camera",
										"pageUrl" : "#",
										"title" : "",
										"careticon" : "caret",
										"menutoggle" : "dropdown",
										"subMenuDto" : [ {
											"subMenuName" : "Photo Gallery",
											"pageUrl" : "http://www.nyks.org/resources/photo-gallery.html",
											"targetPage" : "_blank",
										}, {
											"subMenuName" : "Video Gallery",
											"pageUrl" : "http://www.nyks.org/resources/video-gallery.html",
											"targetPage" : "_blank",
										}]
									},
									"FAQ" : {
										"menuName" : "FAQ",
										"iconglyph" : "fa fa-question-circle",
										"pageUrl" : "#faq",
										"title" : ""
									},
									"Contact NYKS" : {
										"iconglyph" : "fa fa-map-marker",
										"menuName" : "Contact NYKS",
										"pageUrl" : "#contact",
										"title" : ""
									},
									"Visit NYKS" : {
										"menuName" : "Visit NYKS",
										"iconglyph" : "fa fa-globe",
										"pageUrl" : "http://www.nyks.org/",
										"title" : "",
										"targetPage" : "_blank"
									},
									"Search" : {
										"searchClass":"search",
										"display":"displayNone",
										"iconglyph" : "fa fa-search",
										"idSearch":"searchIcon",
										"menuName" : "Search",
										"pageUrl" : "#",
										"title" : ""
									},
								},
								"ircsMenu" : {
									"Home" : {
										"menuName" : "Home",
										"iconglyph" : "fa fa-home",
										"pageUrl" : "#home",
										"title" : ""
									},
									"About Us" : {
										"menuName" : "About Us",
										"iconglyph" : "fa fa-exclamation-circle",
										"pageUrl" : "#about",
										"title" : ""
									},
									"Enrolment & Benefits" : {
										"iconglyph" : "fa fa-sticky-note",
										"menuName" : "Enrolment & Benefits",
										"pageUrl" : "#Enrolment",
										"title" : ""
									},
									"Activities" : {
										"iconglyph" : "fa fa-users",
										"menuName" : "Activities",
										"pageUrl" : "#Activities",
										"title" : ""
									},
									"Achievements" : {
										"iconglyph" : "fa fa-trophy",										
										"menuName" : "Achievements",
										"pageUrl" : "#achivement",
										"title" : ""
									},
									"Gallery" : {
										"menuName" : "Gallery",
										"iconglyph" : "fa fa-camera",
										"pageUrl" : "#",
										"title" : "",
										"careticon" : "caret",
										"menutoggle" : "dropdown",
										"subMenuDto" : [ {
											"subMenuName" : "Photo Gallery",
											"pageUrl" : "http://www.indianredcross.org/gallery.htm",
											"targetPage" : "_blank",
										}, {
											"subMenuName" : "Video Gallery",
											"pageUrl" : "#videoGallery"
										}]
									},
									"FAQ" : {
										"menuName" : "FAQ",
										"iconglyph" : "fa fa-question-circle",
										"pageUrl" : "#faq",
										"title" : ""
									},
									"Contact IRCS" : {
										"iconglyph" : "fa fa-map-marker",
										"menuName" : "Contact IRCS",
										"pageUrl" : "#contact",
										"title" : ""
									},
									"Visit NYKS" : {
										"menuName" : "Visit IRCS",
										"iconglyph" : "fa fa-globe",
										"pageUrl" : "http://www.indianredcross.org/",
										"title" : "",
										"targetPage" : "_blank"
									},
									"Search" : {
										"searchClass":"search",
										"display":"displayNone",
										"iconglyph" : "fa fa-search",
										"idSearch":"searchIcon",
										"menuName" : "Search",
										"pageUrl" : "#",
										"title" : ""
									},
								},
								"EcoClubsMenu" : {
									"Home" : {
										"menuName" : "Home",
										"iconglyph" : "fa fa-home",
										"pageUrl" : "#home",
										"title" : ""
									},
									"About Us" : {
										"menuName" : "About Us",
										"iconglyph" : "fa fa-exclamation-circle",
										"pageUrl" : "#about",
										"title" : ""
									},
									"Enrolment & Benefits" : {
										"iconglyph" : "fa fa-sticky-note",
										"menuName" : "Enrolment & Benefits",
										"pageUrl" : "#Enrolment",
										"title" : ""
									},
									"Activities" : {
										"iconglyph" : "fa fa-users",
										"menuName" : "Activities",
										"pageUrl" : "#Activities",
										"title" : ""
									},
									"Achievements" : {
										"iconglyph" : "fa fa-trophy",										
										"menuName" : "Achievements",
										"pageUrl" : "#achivement",
										"title" : ""
									},
									"Gallery" : {
										"menuName" : "Gallery",
										"iconglyph" : "fa fa-camera",
										"pageUrl" : "#",
										"title" : "",
										"careticon" : "caret",
										"menutoggle" : "dropdown",
										"subMenuDto" : [ {
											"subMenuName" : "Photo Gallery",
											"pageUrl" : "#photoGallery"
										}, {
											"subMenuName" : "Video Gallery",
											"pageUrl" : "#videoGallery"
										}]
									},
									"FAQ" : {
										"menuName" : "FAQ",
										"iconglyph" : "fa fa-question-circle",
										"pageUrl" : "#faq",
										"title" : ""
									},
									"Contact Eco-Clubs" : {
										"iconglyph" : "fa fa-map-marker",
										"menuName" : "Contact Eco-Clubs",
										"pageUrl" : "#contact",
										"title" : ""
									},
									"Visit Eco-Clubs" : {
										"menuName" : "Visit Eco-Clubs",
										"iconglyph" : "fa fa-globe",
										"pageUrl" : "http://envfor.nic.in/",
										"title" : "",
										"targetPage" : "_blank"
									},
									"Search" : {
										"searchClass":"search",
										"display":"displayNone",
										"iconglyph" : "fa fa-search",
										"idSearch":"searchIcon",
										"menuName" : "Search",
										"pageUrl" : "#",
										"title" : ""
									},
								},
								"bsgMenu" : {
									"Home" : {
										"menuName" : "Home",
										"iconglyph" : "fa fa-home",
										"pageUrl" : "#home",
										"title" : ""
									},
									"About Us" : {
										"menuName" : "About Us",
										"iconglyph" : "fa fa-exclamation-circle",
										"pageUrl" : "#about",
										"title" : ""
									},
									"Enrolment & Benefits" : {
										"iconglyph" : "fa fa-sticky-note",
										"menuName" : "Enrolment & Benefits",
										"pageUrl" : "#Enrolment",
										"title" : ""
									},
									"Activities" : {
										"iconglyph" : "fa fa-users",
										"menuName" : "Activities",
										"pageUrl" : "#Activities",
										"title" : ""
									},
									"Achievements" : {
										"iconglyph" : "fa fa-trophy",										
										"menuName" : "Achievements",
										"pageUrl" : "#achivement",
										"title" : ""
									},
									"Gallery" : {
										"menuName" : "Gallery",
										"iconglyph" : "fa fa-camera",
										"pageUrl" : "#",
										"title" : "",
										"careticon" : "caret",
										"menutoggle" : "dropdown",
										"subMenuDto" : [ {
											"subMenuName" : "Photo Gallery",
											"pageUrl" : "http://www.bsgindia.org/Photo%20Gallary/Photographs.html",
											"targetPage" : "_blank",
										}, {
											"subMenuName" : "Video Gallery",
											"pageUrl" : "#videoGallery"
										}]
									},
									"FAQ" : {
										"menuName" : "FAQ",
										"iconglyph" : "fa fa-question-circle",
										"pageUrl" : "#faq",
										"title" : ""
									},
									"Contact BSG" : {
										"iconglyph" : "fa fa-map-marker",
										"menuName" : "Contact BSG",
										"pageUrl" : "#contact",
										"title" : ""
									},
									"Visit BSG" : {
										"menuName" : "Visit BSG",
										"iconglyph" : "fa fa-globe",
										"pageUrl" : "http://www.bsgindia.org/",
										"title" : "",
										"targetPage" : "_blank"
									},
									"Search" : {
										"searchClass":"search",
										"display":"displayNone",
										"iconglyph" : "fa fa-search",
										"idSearch":"searchIcon",
										"menuName" : "Search",
										"pageUrl" : "#",
										"title" : ""
									},
								},
								"hsgMenu" : {
									"Home" : {
										"menuName" : "Home",
										"iconglyph" : "fa fa-home",
										"pageUrl" : "#home",
										"title" : ""
									},
									"About Us" : {
										"menuName" : "About Us",
										"iconglyph" : "fa fa-exclamation-circle",
										"pageUrl" : "#about",
										"title" : ""
									},
									"Enrolment & Benefits" : {
										"iconglyph" : "fa fa-sticky-note",
										"menuName" : "Enrolment & Benefits",
										"pageUrl" : "#Enrolment",
										"title" : ""
									},
									"Activities" : {
										"iconglyph" : "fa fa-users",
										"menuName" : "Activities",
										"pageUrl" : "#Activities",
										"title" : ""
									},
									"Achievements" : {
										"iconglyph" : "fa fa-trophy",										
										"menuName" : "Achievements",
										"pageUrl" : "#achivement",
										"title" : ""
									},
									"Gallery" : {
										"menuName" : "Gallery",
										"iconglyph" : "fa fa-camera",
										"pageUrl" : "#",
										"title" : "",
										"careticon" : "caret",
										"menutoggle" : "dropdown",
										"subMenuDto" : [ {
											"subMenuName" : "Photo Gallery",
											"pageUrl" : "http://hsgindia.com/index.php/hindustan/Gallery",
											"targetPage" : "_blank",
										}, {
											"subMenuName" : "Video Gallery",
											"pageUrl" : "http://hsgindia.com/index.php/hindustan/videogallery","targetPage" : "_blank",
											"targetPage" : "_blank",
										}]
									},
									"FAQ" : {
										"menuName" : "FAQ",
										"iconglyph" : "fa fa-question-circle",
										"pageUrl" : "#faq",
										"title" : ""
									},
									"Contact HSG" : {
										"iconglyph" : "fa fa-map-marker",
										"menuName" : "Contact HSG",
										"pageUrl" : "#contact",
										"title" : ""
									},
									"Visit HSG" : {
										"menuName" : "Visit HSG",
										"iconglyph" : "fa fa-globe",
										"pageUrl" : "http://hsgindia.com/",
										"title" : "",
										"targetPage" : "_blank"
									},
									"Search" : {
										"searchClass":"search",
										"display":"displayNone",
										"iconglyph" : "fa fa-search",
										"idSearch":"searchIcon",
										"menuName" : "Search",
										"pageUrl" : "#",
										"title" : ""
									},
								},

								"adminMenu" : [
									{
										"name" : "Dashboard",
										"pageUrl" : "dashboard.html",
										"title" : ""
									},									
									{
										"name" : "Message Management",
										"pageUrl" : "ManageMessage",
										"title" : ""
									},
									// "User Management":{"name":"User
									// Management","pageUrl":"ManageUser","title":""},

									{
										"menuName" : "User Management",
										"pageUrl" : "ManageUser",
										"title" : "",
										"careticon" : "caret",
										"menutoggle" : "dropdown",
										"viewRight" : "true",
										"editRight" : "true",
										"deleteRight" : "true",
										"subMenuDto" : [{
											"subMenuName" : "Manage User",
											"pageUrl" : "ManageUser",
											"viewRight" : "false",
											"editRight" : "true",
											"deleteRight" : "true"
										}

										]
									},

									{
										"menuName" : "Volunteer",
										"pageUrl" : "Enrollment",
										"title" : "",
										"viewRight" : "true",
										"editRight" : "true",
										"deleteRight" : "false",
										"careticon" : "caret",
										"menutoggle" : "dropdown",
										"subMenuDto" : [ /*{
											"subMenuName" : "Enroll Volunteer",
											"pageUrl" : "EnrollVolunteer",
											"viewRight" : "false",
											"editRight" : "true",
											"deleteRight" : "true"
										},*/ {
											"subMenuName" : "Manage Volunteer",
											"pageUrl" : "ManageVolunteer",
											"viewRight" : "false",
											"editRight" : "false",
											"deleteRight" : "true"
										},
										{
											"subMenuName" : "Approve Listing",
											"pageUrl" : "ApproveVolunteer",
											"viewRight" : "false",
											"editRight" : "true",
											"deleteRight" : "true"
										}

										]
									},
									{
										"name" : "Reports",
										"pageUrl" : "#",
										"title" : ""
									},									
									{
										"name" : "Geography Management",
										"pageUrl" : "ManageGeography",
										"title" : "",
										"careticon" : "caret",
										"menutoggle" : "dropdown",
										"submenu" : [ {
											"name" : "Add Geography",
											"pageUrl" : "AddGeography"
										}, {
											"name" : "Manage Geography",
											"pageUrl" : "ManageGeography"
										}

										]
									},
									{
										"menuName" : "Role Management",
										"pageUrl" : "ManageRole",
										"title" : "",
										"careticon" : "caret",
										"menutoggle" : "dropdown",
										"subMenuDto" : [ {
											"subMenuName" : "Add Role",
											"pageUrl" : "AddRole"
										}, {
											"subMenuName" : "Manage Role",
											"pageUrl" : "ManageRole"
										}

										]
									},
									{
										"menuName" : "Task Management",
										"pageUrl" : "ManageTask",
										"title" : "",
										"careticon" : "caret",
										"menutoggle" : "dropdown"										
									},

								],
									
							});
		});
