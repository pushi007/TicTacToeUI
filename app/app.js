
var app_cached_providers = {};
	(function(){
		'use strict';
	// I. the application
	var MoyaApp = angular.module('app.moya', [
		"ui.router",
		"ngMessages",		
		"base64Module",
		"naif.base64",
		"ngCookies",
		"base64",
		"ngIdle",
		"ui.bootstrap",
	]);

	
	// Keepalive provider for timeout.	
	
	MoyaApp.config(['KeepaliveProvider', 'IdleProvider',  function(KeepaliveProvider, IdleProvider) {
		  debugger;

		  IdleProvider.idle(10);
		  IdleProvider.timeout(10);
		  KeepaliveProvider.interval(1);
		  var token = sessionStorage.getItem("token");            
		  var header = {'Content-Type' : 'application/json', 'X-Auth-Token' : token};		  
		  //KeepaliveProvider.http(null);
		}]);
	
			//I.1 Config for Cache removal

		 MoyaApp.config(['$provide', function($provide) {
	   			 // Set a suffix outside the decorator function
	   			 var cacheBuster = Date.now().toString();
			    //decorator function
			    $provide.decorator('$templateFactory', ['$delegate', function templateFactoryDecorator($delegate) {
			    	var fromUrl = angular.bind($delegate, $delegate.fromUrl);
			    	$delegate.fromUrl = function (url, params) {
			    		if (url !== null && angular.isDefined(url) && angular.isString(url)) {
			    			url += (url.indexOf("?") === -1 ? "?" : "&");
			    			url += "v=" + cacheBuster;
			    		}
			    		return fromUrl(url, params);
			    	};

			    	return $delegate;
			    }]);
			}]);

	// II. cached $controllerProvider

	MoyaApp.config(['$controllerProvider','$provide','$compileProvider','$stateProvider',
		function(controllerProvider,provide,compileProvider,stateProvider) {
			app_cached_providers.$controllerProvider = controllerProvider;  //it's register controller
			app_cached_providers.$provide = provide;                         //it's register factory and services
			app_cached_providers.$stateProvider = stateProvider;              
			app_cached_providers.$compileProvider=compileProvider;           //it's register directive
	   // app_cached_providers.$translateProvider=translateProvide;
	}]);
	/*Loading code modularly using require js and angular js Promise*/
	var loadDependencies = function(dependencyArray) { //services or factories
		return ["$q", function($q) {
			var deferred = $q.defer();
			if(dependencyArray){
				require(dependencyArray, function() {deferred.resolve(); });
			}
			return deferred.promise;
		}];
	};


	MoyaApp.config(['$stateProvider', '$urlRouterProvider','$urlMatcherFactoryProvider','$locationProvider',
	function($stateProvider, $urlRouterProvider,$urlMatcherFactoryProvider,$locationProvider) {
		debugger;

  	//$urlRouterProvider.when('/partner', '/partner/home');
  	var ErrCons="ErrorConstants";
  	var MenuCons="MenuConstants";
    var BannerCons="BannerImageConstants";
  	var RestCons="RestConstants";
  	var MenuNameCons="MenuNameConstants";
  	var facs= "Factory";
  	var Directv= "Directive";
  	var baseViewPath="app/";
  	var sharedPath="app/Shared/";
  	// $rootScope.logOutUrl= $rootScope.HOST_APP+RestConstants.LogOut.logOut;
 	  $locationProvider.html5Mode(true);
  	$urlRouterProvider.otherwise("/");
  	$stateProvider
    .state('index',{
        url: '/',
         
        views: {
            'header':   {
                templateUrl: 'app/HeaderFooter/home-main-header.html',               
                controller: "MainHeaderCtrl",              
                resolve : {  
                loadDeps : loadDependencies([ErrCons,MenuCons,BannerCons,facs,RestCons,"LoginFactory","MainHeaderCtrl"])
                },
            },
            'content': {
              templateUrl: "app/Youth/youthHome.html",
            controller: "LoginCtrl",
            params:{pageName:"home",data:{}},//here data is used to show errors after redirecting to login page
            resolve : {
              loadDeps : loadDependencies([ErrCons,MenuCons,BannerCons,facs,RestCons,"LoginFactory","LoginCtrl","cmsAchievementFactory","HomeLinksFactory","ckEditorFactory"])
            }, 
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/home-main-footer.html',
            }
        }
        
    })

    .state("forgotPassword", {
  		url: "/forgot-password",

      views: {
            'header': {
                templateUrl: 'app/HeaderFooter/main-header.html',
            },
            'content': {
                templateUrl: "app/Authentication/forgotpassword/forgotPassword.html",
                controller: "ForgotPasswordCtrl",                
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
  		params:{pageName:"Forgot Password"},
  		resolve : {
  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"ForgotPasswordFactory","ForgotPasswordCtrl"])
  		}
  	})
  	.state("Message", {
  		url: "/Message",
  		templateUrl: "app/Test/demo.html",
  		controller: "Test.DemoCtrl",
  		params:{pageName:"home",data:{}},//here data is used to show errors after redirecting to login page
  		resolve : {
  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"TestFactory","TestCtrl"])
  		}
  	}).state("EnrollVolunteer", {
  		url: "/EnrollVolunteer",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Enrollment/youthenrollment.html",
                controller: "EnrollCtrl",
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"EnrollFactory","paging_dir","EnrollCtrl","RoleRightFactory"])
          		},
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
  		params:{pageName:"manage",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("ManageVolunteer", {
  		url: "/ManageVolunteer",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Enrollment/youthSearch.html",
                controller: "EnrollCtrl",
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"EnrollFactory","paging_dir","EnrollCtrl","RoleRightFactory"])
          		},
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
  		params:{pageName:"list",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("DeactivedVolunteer", {
  		url: "/DeactivedVolunteer",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
            	 templateUrl: "app/Enrollment/youthSearchDeactive.html",
                 controller: "EnrollCtrl",
                 resolve : {
           			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"EnrollFactory","paging_dir","EnrollCtrl","RoleRightFactory"])
           		},
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
  		params:{pageName:"record",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	})
    .state("ApproveVolunteer", {
      url: "/ApproveVolunteer",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Enrollment/approveListing.html",
                controller: "EnrollCtrl",
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"EnrollFactory","paging_dir","EnrollCtrl","RoleRightFactory"])
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
      params:{pageName:"approveListing",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
     
    }) .state("SelfApproveVolunteer", {
      url: "/SelfApproveVolunteer",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Enrollment/approveListingSelf.html",
                controller: "EnrollCtrl",
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"EnrollFactory","paging_dir","EnrollCtrl","RoleRightFactory"])
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
      params:{pageName:"selfApproveListing",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
     
    })
    .state("ManageUser", {
  		url: "/ManageUser?s_id&p_id",
      views: {
            'header': {
                templateUrl: 'app/HeaderFooter/main-header.html',
                controller: "MainHeaderCtrl",
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
          		},
            },
            'content': {
                templateUrl: "app/Registration/userSearch.html",
                controller: "RegisterCtrl", 
            	resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"RegisterFactory","RegisterCtrl","RoleRightFactory"])
          		},
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
  		params:{pageName:"list",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  	
  	}).state("DeactivedUser", {
  		url: "/DeactivedUser",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Registration/userSearchDeactive.html",
                controller: "RegisterCtrl",
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"RegisterFactory","RegisterCtrl","RoleRightFactory"])
          		}
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
  		params:{pageName:"record",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("RegisterUser", {
  		url: "/RegisterUser",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Registration/userregistration.html",
                controller: "RegisterCtrl",
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"RegisterFactory","RegisterCtrl","RoleRightFactory"])
          		},
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
  		params:{pageName:"add",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("ManageGeography", {
  		url: "/ManageGeography",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Masters/geographySearch.html",
                controller: "GeographyCtrl",
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GeographyFactory","GeographyCtrl","RoleRightFactory"])
          		}
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
  		params:{pageName:"list",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("DeactivedGeography", {
  		url: "/DeactivedGeography",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Masters/geographyDeactiveSearch.html",
                controller: "GeographyCtrl",
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GeographyFactory","GeographyCtrl","RoleRightFactory"])
          		}
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
  		params:{pageName:"record",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("AddGeography", {
  		url: "/AddGeography",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Masters/addGeography.html",
                controller: "GeographyCtrl",
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GeographyFactory","GeographyCtrl","RoleRightFactory"])
          		},
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
  		params:{pageName:"add",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("ManageMessage", {
  		url: "/ManageMessage",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Message/search.html",
                controller: "MessageCtrl",
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"MessageFactory","RegisterFactory","MessageCtrl","RoleRightFactory"])
          		},
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
  		params:{pageName:"Message",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("AddRole", {
  		url: "/AddRole",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Masters/addrole.html",
                controller: "RoleCtrl", 
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,MenuNameCons,facs,RestCons,"RoleFactory","RoleCtrl","RoleRightFactory"])
          		},
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
      },
  		params:{pageName:"add",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("ManageRole", {
  		url: "/ManageRole",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Masters/searchrole.html",
                controller: "RoleCtrl",
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,MenuNameCons,facs,RestCons,"RoleFactory","RoleCtrl","RoleRightFactory"])
          		},
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
      },
  		params:{pageName:"list",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("DeactivedRole", {
  		url: "/DeactivedRole",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Masters/searchroleDeactive.html",
                controller: "RoleCtrl",
                resolve : {
                	loadDeps : loadDependencies([ErrCons,MenuCons,MenuNameCons,facs,RestCons,"RoleFactory","RoleCtrl","RoleRightFactory"])
          		}
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
  		params:{pageName:"record",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("ManageTask", {
  		url: "/ManageTask",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Task/searchTask.html",
                controller: "TaskCtrl",
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"TaskFactory","TaskCtrl","cmsEventFactory"])
          		},
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
      },
  		params:{pageName:"list",taskType:"EVENT",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("ManageTask.viewEvent", {
  		url: "/viewEvent?id&state",
      views: {
            'popupView@ManageTask': {
                templateUrl:"app/cms_event/cmsEventView.html",
                controller: "TaskCtrl", 
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,MenuNameCons,facs,RestCons,"TaskFactory","TaskCtrl","cmsEventFactory"])
          		},
            },   
      },
  		params:{pageName:"view",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("ManageTask.editEvent", {
  		url: "/editEvent?id&state",
      views: {
            'popupView@ManageTask': {
                templateUrl: "app/cms_event/cmsEvent.html",
                controller: "TaskCtrl",
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,MenuNameCons,facs,RestCons,"TaskFactory","AchievementTaskCtrl","cmsAchievementFactory"])
          		},
            },
      },
  		params:{pageName:"edit",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("ManageTask.viewTask", {
  		url: "/viewTask?id&state&status",
        views: {
              'popupView@ManageTask': {
                  templateUrl: "app/Task/viewTask.html",
                  controller: "TaskCtrl",
                  resolve : {
            			loadDeps : loadDependencies([ErrCons,MenuCons,MenuNameCons,facs,RestCons,"TaskFactory","AchievementTaskCtrl","cmsAchievementFactory"])
            		},
              },
        },
    		params:{pageName:"edit",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
    		
    	}).state("ManageAchievementTask", {
  		url: "/ManageAchievementTask",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Task/searchAchievementTask.html",
                controller: "AchievementTaskCtrl",
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"TaskFactory","AchievementTaskCtrl","cmsAchievementFactory"])
          		},
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
      },
  		params:{pageName:"list",taskType:"ACHIEVEMENT",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("ManageAchievementTask.viewAchievement", {
  		url: "/viewAchievement?id&state",
      views: {
            'popupView@ManageAchievementTask': {
                templateUrl: "app/cms_achivement/cmsAchievementView.html",
                controller: "AchievementTaskCtrl", 
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,MenuNameCons,facs,RestCons,"TaskFactory","AchievementTaskCtrl","cmsAchievementFactory"])
          		},
            },   
      },
  		params:{pageName:"view",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("ManageAchievementTask.editAchievement", {
  		url: "/editAchievement?id&state",
      views: {
            'popupView@ManageAchievementTask': {
                templateUrl: "app/cms_achivement/cmsAchievement.html",
                controller: "AchievementTaskCtrl",
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,MenuNameCons,facs,RestCons,"TaskFactory","AchievementTaskCtrl","cmsAchievementFactory"])
          		},
            },
      },
  		params:{pageName:"edit",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("ManageAchievementTask.viewAchievementTask", {
  		url: "/viewAchievementTask?id&state&status",
        views: {
              'popupView@ManageAchievementTask': {
                  templateUrl: "app/Task/viewAchievementTask.html",
                  controller: "AchievementTaskCtrl",
                  resolve : {
            			loadDeps : loadDependencies([ErrCons,MenuCons,MenuNameCons,facs,RestCons,"TaskFactory","AchievementTaskCtrl","cmsAchievementFactory"])
            		},
              },
        },
    	params:{pageName:"edit",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
    		
    }).state("ManagePhotoGalleryTask", {
  		url: "/ManagePhotoGalleryTask",
        views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Task/searchPhotogalleryTask.html",
                controller: "PhotoGalleryTaskCtrl", 
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"TaskFactory","PhotoGalleryTaskCtrl","GalleryFactory"])
          		},
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
      },
  		params:{pageName:"list",taskType:"PHOTOGALLERY",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("ManagePhotoGalleryTask.ViewGallery", {
  		url: "/ViewGallery?id&state",
      views: {
            'popupView@ManagePhotoGalleryTask': {
                templateUrl: "app/Gallery/viewGallery.html",
                controller: "PhotoGalleryTaskCtrl", 
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,MenuNameCons,facs,RestCons,"TaskFactory","PhotoGalleryTaskCtrl","GalleryFactory"])
          		},
            },   
      },
  		params:{pageName:"view",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("ManagePhotoGalleryTask.EditGallery", {
  		url: "/EditGallery?id&state",
      views: {
            'popupView@ManagePhotoGalleryTask': {
                templateUrl: "app/Gallery/createGallery.html",
                controller: "PhotoGalleryTaskCtrl",
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,MenuNameCons,facs,RestCons,"TaskFactory","PhotoGalleryTaskCtrl","GalleryFactory"])
          		},
            },
      },
  		params:{pageName:"edit",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("ManagePhotoGalleryTask.viewPhotogalleryTask", {
  		url: "/viewPhotogalleryTask?id&state&status",
        views: {
              'popupView@ManagePhotoGalleryTask': {
                  templateUrl: "app/Task/viewPhotogalleryTask.html",
                  controller: "PhotoGalleryTaskCtrl",
                  resolve : {
            			loadDeps : loadDependencies([ErrCons,MenuCons,MenuNameCons,facs,RestCons,"TaskFactory","PhotoGalleryTaskCtrl","GalleryFactory"])
            		},
              },
        },
    	params:{pageName:"edit",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
    		
    }).state("ManageVideoGalleryTask", {
  		url: "/ManageVideoGalleryTask",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Task/searchVideogalleryTask.html",
                controller: "VideoGalleryTaskCtrl",  
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"TaskFactory","VideoGalleryTaskCtrl","cmsEventFactory"])
          		},
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
      },
  		params:{pageName:"list",taskType:"VIDEOGALLERY",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("ManageRole.ViewRole", {
  		url: "/ViewRole?id&state",
      views: {
            'popupView@ManageRole': {
                templateUrl: "app/Masters/viewrole.html",
                controller: "RoleCtrl", 
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,MenuNameCons,facs,RestCons,"RoleFactory","RoleCtrl","RoleRightFactory"])
          		},
            },   
      },
  		params:{pageName:"view",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	}).state("ManageRole.EditRole", {
  		url: "/EditRole?id&state",
      views: {
            'popupView@ManageRole': {
                templateUrl: "app/Masters/addrole.html",
                controller: "RoleCtrl",
                resolve : {
          			loadDeps : loadDependencies([ErrCons,MenuCons,MenuNameCons,facs,RestCons,"RoleFactory","RoleCtrl","RoleRightFactory"])
          		},
            },
      },
  		params:{pageName:"edit",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
  		
  	})
   .state("NCC",{
	 	url: "/NCC",
	 	templateUrl: "app/NCC/nav-menu.html",
	 	controller: "OrgCtrl",
	 	params:{pageName:"NCC",entitlement:"NCC"},
	 	resolve : {
	 		loadDeps : loadDependencies([ErrCons,MenuCons,RestCons,facs,Directv,"OrgCtrl"])//,""
	 	}
	 }).state("authverification",{
		 	url: "/authverification",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl", "cmsAchievementFactory"])
        		},
          },
            'content': {
                templateUrl: "app/Enrollment/youthenrollment.html",
                controller: "UserProfileController", 
                resolve : {
    		 		loadDeps : loadDependencies([ErrCons,MenuCons,RestCons,facs,Directv,"UserProfileController","EnrollFactory","LoginFactory"])//,""
    		 	},
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
		 	params:{pageName: "home", entitlement: "DASHBOARD", data: {} },
		 	
	 }).state("discussion",{
      url: "/discussion",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/discussion/discussionList.html",
                controller: "govCtrl",
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,RestCons,facs,Directv,"govFactory","govCtrl"])//,""
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
      params:{pageName: "discussion", entitlement: "DASHBOARD", data: {} },
     
   })
   .state("ViewDiscussion",{
       url: "/ViewDiscussion?id",
      views: {
        'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
              loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
            },
          },
            'content': {
                templateUrl: "app/discussion/discussion.html",
                controller: "govCtrl",
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,RestCons,facs,Directv,"govFactory","govCtrl"])//,""
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
      params:{pageName: "viewdiscussion", entitlement: "DASHBOARD", data: {} },
     
   }).state("tasks",{
      url: "/tasks",
       views: {
    	   'header': {
               templateUrl: 'app/HeaderFooter/main-header.html',
               controller: "MainHeaderCtrl",
               resolve : {
         			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
         		},
           },
            'content': {
                templateUrl: "app/discussion/taskList.html",
                controller: "govTaskCtrl", 
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,RestCons,facs,Directv,"govFactory","govTaskCtrl"])//,""
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
      params:{pageName: "tasks", entitlement: "DASHBOARD", data: {} },
     
   }).state("ViewTask",{
      url: "/ViewTask?id",
       views: {
         'header': {
               templateUrl: 'app/HeaderFooter/main-header.html',
               controller: "MainHeaderCtrl",
               resolve : {
              loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
            },
           },
            'content': {
                templateUrl: "app/discussion/task.html",
                controller: "govTaskCtrl", 
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,RestCons,facs,Directv,"govFactory","govTaskCtrl"])//,""
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
      params:{pageName: "viewtask", entitlement: "DASHBOARD", data: {} },
     
   }).state("talk",{
      url: "/talk",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/discussion/talkList.html",
                controller: "govTalkCtrl",
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,RestCons,facs,Directv,"govFactory","govTalkCtrl"])//,""
                  }
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
      params:{pageName: "talk", entitlement: "DASHBOARD", data: {} },
     
   })
   .state("ViewTalk",{
      url: "/ViewTalk?id",
      views: {
        'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
              loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
            },
          },
            'content': {
                templateUrl: "app/discussion/talk.html",
                controller: "govTalkCtrl",
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,RestCons,facs,Directv,"govFactory","govTalkCtrl"])//,""
                  }
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
      params:{pageName: "viewtalk", entitlement: "DASHBOARD", data: {} },
     
   })

   .state("search",{
      url: "/search",
      views: {
        'header': {
              templateUrl: 'app/HeaderFooter/home-main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
              loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
            },
          },
            'content': {
                templateUrl: "app/HeaderFooter/globalSearch.html",
               // controller: "govPollCtrl",
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,RestCons,facs,Directv,"govFactory","govPollCtrl"])//,""
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
      params:{pageName: "Search", entitlement: "DASHBOARD", data: {} },
     
   })

   .state("poll",{
      url: "/poll",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/discussion/pollList.html",
                controller: "govPollCtrl",
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,RestCons,facs,Directv,"govFactory","govPollCtrl"])//,""
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
      params:{pageName: "poll", entitlement: "DASHBOARD", data: {} },
     
   })
   .state("ViewPoll",{
      url: "/ViewPoll?id",
      views: {
        'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
              loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
            },
          },
            'content': {
                templateUrl: "app/discussion/poll.html",
                controller: "govPollCtrl",
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,RestCons,facs,Directv,"govFactory","govPollCtrl"])//,""
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
      params:{pageName: "viewpoll", entitlement: "DASHBOARD", data: {} },
     
   }).state("group",{
      url: "/group",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/discussion/groupList.html",
                controller: "govGroupCtrl",  
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,RestCons,facs,Directv,"govFactory","govGroupCtrl"])//,""
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
      params:{pageName: "group", entitlement: "DASHBOARD", data: {} },
     
   }).state("ViewGroup",{
      url: "/ViewGroup?id",
      views: {
        'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
              loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
            },
          },
            'content': {
                templateUrl: "app/discussion/group.html",
                controller: "govGroupCtrl",  
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,RestCons,facs,Directv,"govFactory","govGroupCtrl"])//,""
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
      params:{pageName: "viewgroup", entitlement: "DASHBOARD", data: {} },
     
   })



   .state("ckeditor",{
      url: "/ckeditor?id",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/ckEditor/ckeditor.html",
                controller: "ckEditorCtrl",
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,RestCons,facs,Directv,"ckEditorFactory","ckEditorCtrl"])//,""
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
      },
      params:{pageName: "home", entitlement: "DASHBOARD", data: {} },
     
   }).state("cmsTemplate",{
      url: "/cmsTemplate",
      templateUrl: "app/CMS/cmsHome.html",
      controller: "cmsCtrl",
      params:{pageName: "home", entitlement: "DASHBOARD", data: {} },
      resolve : {
        loadDeps : loadDependencies([ErrCons,MenuCons,RestCons,facs,Directv,"cmsFactory","cmsCtrl","cmsAchievementFactory"])//,""
      }
   }).state("dashboard",{
      url: "/dashboard",
      views: {
    	  'header': {
              templateUrl: 'app/HeaderFooter/main-header.html',
              controller: "MainHeaderCtrl",
              resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
          },
            'content': {
                templateUrl: "app/Shared/dashboard.html",
                controller: "DashboardCtrl", 
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"LoginFactory","DashboardCtrl","DashboardFactory", "ReportFactory", "EnrollFactory","govFactory"])//,""
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
      params:{pageName:"dashboard",data:{}},//here data is used to show errors after redirecting to login page
     
   }).state("ManageUser.EditUser",{
	      url: "/EditUser?id&state",
        views: {
            'popupView@ManageUser': {
                templateUrl: "app/Registration/userregistration.html",
                controller: "RegisterCtrl",
                resolve : {
    				loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"RegisterFactory","RegisterCtrl"])
    			},
            },
        },
			params:{pageName:"edit",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
			
	   }).state("ManageUser.ViewUser",{
		      url: "/ViewUser?id&state",
          views: {
            'popupView@ManageUser': {
                templateUrl: "app/Registration/viewUserDetails.html",
                controller: "RegisterCtrl",
            	resolve : {
        					loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"RegisterFactory","RegisterCtrl","RoleRightFactory"])
        				},
              },
            
              },
				params:{pageName:"view",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
			
		   }).state("ManageVolunteer.EditVolunteer",{
			      url: "/EditVolunteer?id$state",
            views: {
            	  'popupView@ManageVolunteer': {
                templateUrl: "app/Enrollment/youthenrollment.html",
                controller: "EnrollCtrl",
                resolve : {
		  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"EnrollFactory","paging_dir","EnrollCtrl","RoleRightFactory"])
		  		},
            },
        },
			  		params:{pageName:"edit",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
			  		
		   }).state("ManageVolunteer.ViewVolunteer",{
				      url: "/ViewVolunteer?id$state",
        views: {
            'popupView@ManageVolunteer': {
                templateUrl: "app/Enrollment/viewYouthDetail.html",
                controller: "EnrollCtrl", 
            	resolve : {
		  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"EnrollFactory","paging_dir","EnrollCtrl","RoleRightFactory"])
		  		},
            },
        },
        params:{pageName:"view",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page        		  	
		}).state("ApproveVolunteer.ViewVolunteer",{
		      url: "/ViewVolunteer?id$state",
		      views: {
		    	  'popupView@ApproveVolunteer': {
		    		  templateUrl: "app/Enrollment/viewYouthDetail.html",
		    		  controller: "EnrollCtrl", 
		    		  resolve : {
		    			  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"EnrollFactory","paging_dir","EnrollCtrl","RoleRightFactory"])
		    		  			},
    		},
		},
			params:{pageName:"view",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page        		  	
	}).state("SelfApproveVolunteer.ViewVolunteer",{
		      url: "/ViewVolunteer?id$state",
		      views: {
		    	  'popupView@SelfApproveVolunteer': {
		    		  templateUrl: "app/Enrollment/viewYouthDetail.html",
		    		  controller: "EnrollCtrl", 
		    		  resolve : {
		    			  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"EnrollFactory","paging_dir","EnrollCtrl","RoleRightFactory"])
		    		  			},
      		},
  		},
  			params:{pageName:"view",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page        		  	
	}).state("SelfApproveVolunteer.EditVolunteer",{
	      url: "/EditVolunteer?id$state",
	      	views: {
	      			'popupView@SelfApproveVolunteer': {
	      				templateUrl: "app/Enrollment/youthenrollment.html",
	      				controller: "EnrollCtrl", 
	      				resolve : {
	      						loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"EnrollFactory","paging_dir","EnrollCtrl","RoleRightFactory"])
	      				},
	      			},
	      		},
	      			params:{pageName:"view",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page        		  	
		}).state("VisitorsCount", {
                url: "/VisitorsCount",
                controller: "LoginCtrl",
                resolve : {
                  loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"LoginFactory","LoginCtrl"])
                }
          }).state("ManageGeography.EditGeography",{
		      url: "/EditGeography?id&state",
          views: {
        	  
            'popupView@ManageGeography': {
                templateUrl: "app/Masters/addGeography.html",
                controller: "GeographyCtrl",
                resolve : {
					loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GeographyFactory","GeographyCtrl"])
				},
            },
           
        },
				params:{pageName:"edit",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
				
		   }).state("ManageGeography.ViewGeography",{
			      url: "/ViewGeography?id&state",
            views: {            	  
            'popupView@ManageGeography': {
                templateUrl: "app/Masters/viewGeography.html",
                controller: "GeographyCtrl", 
                resolve : {
					loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GeographyFactory","GeographyCtrl","RoleRightFactory"])
				},
            },
            
        },
        params:{pageName:"view",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
				
			   }).state("ManageMenu", {
			  		url: "/ManageMenu",			  		
            views: {
            	  'header': {
                      templateUrl: 'app/HeaderFooter/main-header.html',
                      controller: "MainHeaderCtrl",
                      resolve : {
                			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                		},
                  },
            'content': {
                templateUrl: "app/Masters/menuSearch.html",
                controller: "MenuCtrl", 
                resolve : {
		  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"MenuFactory","MenuCtrl","RoleRightFactory"])
		  		},
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
			  		params:{pageName:"list",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
			  		
			  	}).state("AddMenu", {
			  		url: "/AddMenu",			  		
            views: {
            	  'header': {
                      templateUrl: 'app/HeaderFooter/main-header.html',
                      controller: "MainHeaderCtrl",
                      resolve : {
                			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                		},
                  },
            'content': {
                templateUrl: "app/Masters/addMenu.html",
                controller: "MenuCtrl",  
                resolve : {
		  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"MenuFactory","MenuCtrl","RoleRightFactory"])
		  		},
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
        },
			  		params:{pageName:"add",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
			  		
			  	}).state("ManageMenu.EditMenu",{
				      url: "/EditMenu?id&state",
          views: {
        	  
            'popupView@ManageMenu': {
                templateUrl: "app/Masters/addMenu.html",
                controller: "MenuCtrl", 
                resolve : {
					loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"MenuFactory","MenuCtrl"])
				},
            },
           
          },
						params:{pageName:"edit",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
						
				   }).state("ManageMenu.ViewMenu",{
					      url: "/ViewMenu?id&state",
                views: {
                	 
            'popupView@ManageMenu': {
                templateUrl: "app/Masters/viewMenu.html",
                controller: "MenuCtrl",
            	resolve : {
					loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"MenuFactory","MenuCtrl","RoleRightFactory"])
				},
            },
            
          },
							params:{pageName:"view",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
						
					   })

.state("cmsContent",{
         url: "/cmsContent?organizationName",
        views: {
            'header': {
                templateUrl: 'app/HeaderFooter/home-main-header.html',
                controller: "MainHeaderCtrl",
                resolve : {
        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
        		},
            },
            'content': {
                templateUrl: "app/CMS/cmsTemplate.html",
                controller: "cmsCtrl",
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,BannerCons,RestCons,facs,Directv,"cmsFactory","cmsCtrl","cmsAchievementFactory","GalleryFactory","ckEditorFactory"])
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/home-main-footer.html',
            }
        },
        params:{pageName: "CMSContent", entitlement: "DASHBOARD", data: {} },
       })

.state("cmsContent.ckeditornew",{
          url: "/ckeditornew?id&subContent",
          views: {
           'popupView@cmsContent': {
                 templateUrl: "app/ckEditor/ckeditor.html",
                 controller: "cmsCtrl",
              resolve : {
                  loadDeps : loadDependencies([ErrCons,MenuCons,RestCons,facs,Directv,"ckEditorFactory","cmsCtrl","cmsFactory"])//,""
                },
              },
            
              },
       })
    
       .state("cmsNSS.ckeditornew",{
          url: "/ckeditornew?id&subContent",
          views: {
           'popupView@cmsNSS': {
                 templateUrl: "app/ckEditor/ckeditor.html",
                 controller: "cmsCtrl",
              resolve : {
                  loadDeps : loadDependencies([ErrCons,MenuCons,RestCons,facs,Directv,"ckEditorFactory","cmsCtrl","cmsFactory"])//,""
                },
              },
            
              },
        params:{pageName: "home", entitlement: "DASHBOARD", data: {} },
      
       })
       

       .state("ShowEvent",{
			  url: "/ShowEvent",
        views: {
        	  'header': {
                  templateUrl: 'app/HeaderFooter/main-header.html',
                  controller: "MainHeaderCtrl",
                  resolve : {
            			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
            		},
              },
            'content': {
                templateUrl: "app/cms_event/cmd-event.html",
                controller: "cmsEventCtrl",
                resolve : {
  				  loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"cmsEventFactory","cmsEventCtrl"])
  			  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
			  params:{pageName:"view",entitlement:"DASHBOARD",data:{}},
			  
		   }).state("YouthReport",{
              url: "/YouthReport",
              views: {
            	  'header': {
                      templateUrl: 'app/HeaderFooter/main-header.html',
                      controller: "MainHeaderCtrl",
                      resolve : {
                			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                		},
                  },
            'content': {
                templateUrl: "app/MisReport/mis-state-report-youth.html",
                controller: "ReportCtrl",
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"ReportFactory","paging_dir","ReportCtrl"])
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
              params:{pageName:"YouthReport",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
              
           }).state("UserReport",{
              url: "/UserReport",
              views: {
            	  'header': {
                      templateUrl: 'app/HeaderFooter/main-header.html',
                      controller: "MainHeaderCtrl",
                      resolve : {
                			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                		},
                  },
            'content': {
                templateUrl: "app/MisReport/mis-state-report-user.html",
                controller: "ReportCtrl",
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"ReportFactory","paging_dir","ReportCtrl"])
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
              params:{pageName:"UserReport",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
            
           }).state("UserReportDistrict",{
              url: "/UserReportDistrict?id",
               views: {
            	   'header': {
                       templateUrl: 'app/HeaderFooter/main-header.html',
                       controller: "MainHeaderCtrl",
                       resolve : {
                 			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                 		},
                   },
            'content': {
                templateUrl: "app/MisReport/mis-district-report-user.html",
                controller: "ReportCtrl",
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"ReportFactory","paging_dir","ReportCtrl"])
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
              params:{pageName:"UserReportDistrict",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
           
           }).state("YouthReportDistrict",{
              url: "/YouthReportDistrict?id",
              views: {
            	  'header': {
                      templateUrl: 'app/HeaderFooter/main-header.html',
                      controller: "MainHeaderCtrl",
                      resolve : {
                			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                		},
                  },
            'content': {
                templateUrl: "app/MisReport/mis-district-report-youth.html",
                controller: "ReportCtrl", 
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"ReportFactory","paging_dir","ReportCtrl"])
                  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
              params:{pageName:"YouthReportDistrict",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
            
           }).state("YouthReportDistrictResult",{
              url: "/ManageVolunteerReport?id&p_id",
              views: {
            	  'header': {
                      templateUrl: 'app/HeaderFooter/main-header.html',
                      controller: "MainHeaderCtrl",
                      resolve : {
                			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                		},
                  },
            'content': {
                templateUrl: "app/Enrollment/youthSearch.html",
                controller: "EnrollCtrl", 
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"EnrollFactory","paging_dir","EnrollCtrl","RoleRightFactory"])
                    },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
              params:{pageName:"youthReport",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
            
           }).state("UserReportDistrictResult",{
              url: "/ManageUserReport?id&p_id",
              views: {
            	  'header': {
                      templateUrl: 'app/HeaderFooter/main-header.html',
                      controller: "MainHeaderCtrl",
                      resolve : {
                			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                		},
                  },
            'content': {
                templateUrl: "app/Registration/userSearch.html",
                controller: "RegisterCtrl", 
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"RegisterFactory","paging_dir","RegisterCtrl","RoleRightFactory"])
                    },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
              params:{pageName:"userReport",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
            
           }).state("addEvent",{
			  url: "/addEvent?organizationName",

        views: {
        	  'header': {
                  templateUrl: 'app/HeaderFooter/main-header.html',
                  controller: "MainHeaderCtrl",
                  resolve : {
            			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
            		},
              },
            'content': {
                templateUrl: "app/cms_event/cmsEvent.html",
                controller: "cmsEventCtrl",
                resolve : {
  				  loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"cmsEventFactory","cmsEventCtrl"])
  			  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
			  params:{pageName:"add",entitlement:"DASHBOARD",data:{}},
			
		   }).state("cmsEventSearch.editEvent",{
			      url: "/editEvent?id&state",
			        views: {
			            'popupView@cmsEventSearch': {
			                templateUrl: "app/cms_event/cmsEvent.html",
			                controller: "cmsEventCtrl", 
			                resolve : {
			  				  loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"cmsEventFactory","cmsEventCtrl"])
			  			  },
			            },
					},
					 params:{pageName:"edit",entitlement:"DASHBOARD",data:{}},

					})	
			.state("cmsEventSearch.viewEvent",{
					      url: "/viewEvent?id&state",
			          views: {
			            'popupView@cmsEventSearch': {
			                templateUrl: "app/cms_event/cmsEventView.html",
			                controller: "cmsEventCtrl", 
			                resolve : {
			  				  loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"cmsEventFactory","cmsEventCtrl"])
			  			  },
			              },
			            
			              },
							params:{pageName:"view",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
						
					   }).state("DeactivateEvent", {
					  		url: "/DeactivateEvent",

					      views: {
					    	  'header': {
					              templateUrl: 'app/HeaderFooter/main-header.html',
					              controller: "MainHeaderCtrl",
					              resolve : {
					        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
					        		},
					          },
					            'content': {
					            	templateUrl: "app/cms_event/cmsEventDeactiveSearch.html",
					                controller: "cmsEventCtrl",
					                resolve : {
					  				  loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"cmsEventFactory","cmsEventCtrl"])
					  			  },
					            },
					            'footer': {
					                templateUrl: 'app/HeaderFooter/main-footer.html',
					            }
					        },
					  		params:{pageName:"record",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
					  		
					  	}).state("cmsEventSearch",{
			  url: "/cmsEventSearch",

        views: {
        	  'header': {
                  templateUrl: 'app/HeaderFooter/main-header.html',
                  controller: "MainHeaderCtrl",
                  resolve : {
            			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
            		},
              },
            'content': {
                templateUrl: "app/cms_event/cmsEventSearch.html",
                controller: "cmsEventCtrl",
                resolve : {
  				  loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"cmsEventFactory","cmsEventCtrl"])
  			  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
			  params:{pageName:"list",entitlement:"DASHBOARD",data:{}},
			 
		   })
		 .state("addAchievement",{
				  url: "/addAchievement?organizationName",

          views: {
        	  'header': {
                  templateUrl: 'app/HeaderFooter/main-header.html',
                  controller: "MainHeaderCtrl",
                  resolve : {
            			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
            		},
              },
            'content': {
                templateUrl: "app/cms_achivement/cmsAchievement.html",
                controller: "cmsAchievementCtrl",
                resolve : {
					  loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"cmsAchievementFactory","cmsAchievementCtrl"])
				  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
				  params:{pageName:"add",entitlement:"DASHBOARD",data:{}},
				
			   })
		.state("cmsAchievementSearch.editAchievement",{
				      url: "/editAchievement?id&state",
				        views: {
				            'popupView@cmsAchievementSearch': {
				                templateUrl: "app/cms_achivement/cmsAchievement.html",
				                controller: "cmsAchievementCtrl",
				                resolve : {
									  loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"cmsAchievementFactory","cmsAchievementCtrl"])
								  }
				            },
						},
						 params:{pageName:"edit",entitlement:"DASHBOARD",data:{}},

						})	
		.state("cmsAchievementSearch.viewAchievement",{
						      url: "/viewAchievement?id&state",
				          views: {
				            'popupView@cmsAchievementSearch': {
				                templateUrl: "app/cms_achivement/cmsAchievementView.html",
				                controller: "cmsAchievementCtrl",
				                resolve : {
									  loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"cmsAchievementFactory","cmsAchievementCtrl"])
								  },
				              },
				            
				              },
								params:{pageName:"view",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
							
						   })
		.state("cmsAchievementSearch",{
				  url: "/cmsAchievementSearch",

          views: {
        	  'header': {
                  templateUrl: 'app/HeaderFooter/main-header.html',
                  controller: "MainHeaderCtrl",
                  resolve : {
            			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
            		},
              },
            'content': {
                templateUrl: "app/cms_achivement/cmsAchievementSearch.html",
                controller: "cmsAchievementCtrl",
                resolve : {
					  loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"cmsAchievementFactory","cmsAchievementCtrl"])
				  },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
				  params:{pageName:"list",entitlement:"DASHBOARD",data:{}},
				 
			   }).state("DeactivateAchievement", {
			  		url: "/DeactivateAchievement",

			      views: {
			    	  'header': {
			              templateUrl: 'app/HeaderFooter/main-header.html',
			              controller: "MainHeaderCtrl",
			              resolve : {
			        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
			        		},
			          },
			            'content': {
			            	 templateUrl: "app/cms_achivement/cmsAchievementDeactiveSearch.html",
			                 controller: "cmsAchievementCtrl",
			                 resolve : {
			 					  loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"cmsAchievementFactory","cmsAchievementCtrl"])
			 				  },
			            },
			            'footer': {
			                templateUrl: 'app/HeaderFooter/main-footer.html',
			            }
			        },
			  		params:{pageName:"record",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
			  		
			  	}).state("AuditReport",{
              url: "/AuditReport",
              views: {
            	  'header': {
                      templateUrl: 'app/HeaderFooter/main-header.html',
                      controller: "MainHeaderCtrl",
                      resolve : {
                			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                		},
                  },
            'content': {
                templateUrl: "app/AuditTrailReport/audit-trail-report.html",
                controller: "AuditCtrl",
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"AuditFactory","paging_dir","AuditCtrl","RoleRightFactory"])
                    },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
              params:{pageName:"AuditReport",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
             
           }).state("ExceptionReport",{
              url: "/ExceptionReport",
              views: {
            	  'header': {
                      templateUrl: 'app/HeaderFooter/main-header.html',
                      controller: "MainHeaderCtrl",
                      resolve : {
                			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                		},
                  },
            'content': {
                templateUrl: "app/ExceptionReport/exception-report.html",
                controller: "ExceptionCtrl",
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"ExceptionReportFactory","paging_dir","ExceptionCtrl","RoleRightFactory"])
                    },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
              params:{pageName:"ExceptionReport",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
            
           }).state("LoginLogoutReport",{
              url: "/LoginLogoutReport",
              views: {
            	  'header': {
                      templateUrl: 'app/HeaderFooter/main-header.html',
                      controller: "MainHeaderCtrl",
                      resolve : {
                			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                		},
                  },
            'content': {
                templateUrl: "app/LoginLogoutReport/loginlogout-report.html",
                controller: "LoginLogoutCtrl",  
                resolve : {
                    loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"LoginLogoutFactory","LoginLogoutCtrl"])
                    },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
              params:{pageName:"LoginLogoutReport",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
             
           }).state("SMSEmailReport",{
               url: "/SMSEmailReport",
               views: {
             	  'header': {
                       templateUrl: 'app/HeaderFooter/main-header.html',
                       controller: "MainHeaderCtrl",
                       resolve : {
                 			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                 		},
                   },
             'content': {
                 templateUrl: "app/SMSEmailReport/smsEmail-report.html",
                 controller: "SmsEmailCtrl",  
                 resolve : {
                     loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"SmsEmailFactory","SmsEmailCtrl"])
                     },
             },
             'footer': {
                 templateUrl: 'app/HeaderFooter/main-footer.html',
             }
           },
               params:{pageName:"LoginLogoutReport",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
              
            }).state("CreateGallery", {
	  		url: "/CreateGallery",
         views: {
        	  'header': {
                  templateUrl: 'app/HeaderFooter/main-header.html',
                  controller: "MainHeaderCtrl",
                  resolve : {
            			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
            		},
              },
            'content': {
                templateUrl: "app/Gallery/createGallery.html",
                controller: "GalleryCtrl", 
            	resolve : {
    	  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GalleryFactory","GalleryCtrl"])
    	  		},
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
	  		params:{pageName:"add",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
	  	
      }).state("ManageGallery.EditGallery",{
			      url: "/EditGallery?id&state",
          views: {
        	  'popupView@ManageGallery': {
                templateUrl: "app/Gallery/createGallery.html",
                controller: "GalleryCtrl",
                resolve : {
					loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GalleryFactory","GalleryCtrl"])
				},
            },
            
          },

					params:{pageName:"edit",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
					
			   }).state("ManageGallery.ViewGallery",{
				      url: "/ViewGallery?id&state",
              views: {
            'popupView@ManageGallery': {
                templateUrl: "app/Gallery/viewGallery.html",
                controller: "GalleryCtrl",
            	resolve : {
					loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GalleryFactory","GalleryCtrl"])
				},
            },
           
          },
						params:{pageName:"view",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
					
			 }).state("ManageGallery", {
	  		url: "/ManageGallery",
         views: {
        	  'header': {
                  templateUrl: 'app/HeaderFooter/main-header.html',
                  controller: "MainHeaderCtrl",
                  resolve : {
            			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
            		},
              },
            'content': {
                templateUrl: "app/Gallery/gallerySearch.html",
                controller: "GalleryCtrl", 
                resolve : {
    	  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GalleryFactory","GalleryCtrl"])
    	  		
               },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
	  		params:{pageName:"list",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
	  		
			 }).state("DeactivedGallery", {
			  		url: "/DeactivedGallery",
			      views: {
			    	  'header': {
			              templateUrl: 'app/HeaderFooter/main-header.html',
			              controller: "MainHeaderCtrl",
			              resolve : {
			        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
			        		},
			          },
			            'content': {
			                templateUrl: "app/Gallery/galleryDeactiveSearch.html",
			                controller: "GalleryCtrl", 
			                resolve : {
			    	  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GalleryFactory","GalleryCtrl"])
			          		}
			            },
			            'footer': {
			                templateUrl: 'app/HeaderFooter/main-footer.html',
			            }
			        },
			  		params:{pageName:"record",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
			  		
			  	}).state("NCCGallery", {
			  		url: "/NCCGallery",
            views: {
            	  'header': {
                      templateUrl: 'app/HeaderFooter/main-header.html',
                      controller: "MainHeaderCtrl",
                      resolve : {
                			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                		},
                  },
            'content': {
                templateUrl: "app/Gallery/NCCGallery.html",
                controller: "GalleryCtrl",
                resolve : {
		  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GalleryFactory","GalleryCtrl"])
		  		
	           },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
			  		params:{pageName:"NCC",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
			  		
					 })
					 .state("NSSGallery", {
			  		url: "/NSSGallery",
            views: {
            	  'header': {
                      templateUrl: 'app/HeaderFooter/main-header.html',
                      controller: "MainHeaderCtrl",
                      resolve : {
                			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                		},
                  },
            'content': {
                templateUrl: "app/Gallery/NSSGallery.html",
                controller: "GalleryCtrl",
                resolve : {
		  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GalleryFactory","GalleryCtrl"])
		  		
	           },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
			  		params:{pageName:"NSS",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
			  		
					 })
					 .state("NYKSGallery", {
			  		url: "/NYKSGallery",
            views: {
            	  'header': {
                      templateUrl: 'app/HeaderFooter/main-header.html',
                      controller: "MainHeaderCtrl",
                      resolve : {
                			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                		},
                  },
            'content': {
                templateUrl: "app/Gallery/NYKSGallery.html",
                controller: "GalleryCtrl",  
                resolve : {
		  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GalleryFactory","GalleryCtrl"])
		  		
	           },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
			  		params:{pageName:"NYKS",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
			  		
					 })
					 .state("BSGGallery", {
			  		url: "/BSGGallery",
            views: {
            	  'header': {
                      templateUrl: 'app/HeaderFooter/main-header.html',
                      controller: "MainHeaderCtrl",
                      resolve : {
                			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                		},
                  },
            'content': {
                templateUrl: "app/Gallery/BSGGallery.html",
                controller: "GalleryCtrl",
                resolve : {
		  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GalleryFactory","GalleryCtrl"])
		  		
	           },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
			  		params:{pageName:"BSG",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
			  		
					 })
					 .state("EcoClubGallery", {
			  		url: "/EcoClubGallery",
            views: {
            	  'header': {
                      templateUrl: 'app/HeaderFooter/main-header.html',
                      controller: "MainHeaderCtrl",
                      resolve : {
                			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                		},
                  },
            'content': {
                templateUrl: "app/Gallery/EcoClubGallery.html",
                controller: "GalleryCtrl", 
                resolve : {
		  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GalleryFactory","GalleryCtrl"])
		  		
	           },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
			  		params:{pageName:"ECO",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
			  		
					 })
					 .state("IRCSGallery", {
			  		url: "/IRCSGallery",
            views: {
            	  'header': {
                      templateUrl: 'app/HeaderFooter/main-header.html',
                      controller: "MainHeaderCtrl",
                      resolve : {
                			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                		},
                  },
            'content': {
                templateUrl: "app/Gallery/IRCSGallery.html",
                controller: "GalleryCtrl",
                resolve : {
		  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GalleryFactory","GalleryCtrl"])
		  		
	           },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
			  		params:{pageName:"IRCS",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
			  		
					 })
					 .state("HSGGallery", {
			  		url: "/HSGGallery",
            views: {
            	  'header': {
                      templateUrl: 'app/HeaderFooter/main-header.html',
                      controller: "MainHeaderCtrl",
                      resolve : {
                			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                		},
                  },
            'content': {
                templateUrl: "app/Gallery/HSGGallery.html",
                controller: "GalleryCtrl",
                resolve : {
		  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GalleryFactory","GalleryCtrl"])
		  		
	           },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
			  		params:{pageName:"HSG",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
			  		
					 }).state("ViewGalleryNames", {
					  		url: "/ViewGalleryNames",
                views: {
                	  'header': {
                          templateUrl: 'app/HeaderFooter/main-header.html',
                          controller: "MainHeaderCtrl",
                          resolve : {
                    			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
                    		},
                      },
            'content': {
                templateUrl: "app/Gallery/ViewGalleryNames.html",
                controller: "GalleryCtrl",
                resolve : {
		  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"GalleryFactory","GalleryCtrl"])
		  		
	           },
            },
            'footer': {
                templateUrl: 'app/HeaderFooter/main-footer.html',
            }
          },
					  		params:{pageName:"viewg",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
					  		
							 }).state("Error", {
						  		url: "/Error",

				                views: {
				                	  'header': {
				                          templateUrl: 'app/HeaderFooter/main-header.html',
				                          controller: "MainHeaderCtrl",
				                          resolve : {
				                    			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
				                    		},
				                      },
						            'content': {
						                templateUrl: "app/Error/error.html",
						                controller: "ErrorCtrl",  
						                resolve : {
								  			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"LoginFactory","ErrorCtrl"])
								  		
							           },
						            },
						            'footer': {
						                templateUrl: 'app/HeaderFooter/main-footer.html',
						            }
						         },							  		
						  		params:{pageName:"error",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
						  		
					 }).state("DeactivateFAQ", {
					  		url: "/DeactivateFAQ",

					      views: {
					    	  'header': {
					              templateUrl: 'app/HeaderFooter/main-header.html',
					              controller: "MainHeaderCtrl",
					              resolve : {
					        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
					        		},
					          },
					            'content': {
					            	  templateUrl: "app/faq/cmsFaqDeactiveSearch.html",
						    		   controller: "FAQCtrl",
					                 resolve : {
					                	 loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"FAQCtrl","FAQFactory"])
					           		},
					            },
					            'footer': {
					                templateUrl: 'app/HeaderFooter/main-footer.html',
					            }
					        },
					  		params:{pageName:"record",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
					  		
					  	}).state("addFAQ",{
						  url: "/addFAQ?organizationName",										  										  
					      views: {
					    	  'header': {
					              templateUrl: 'app/HeaderFooter/main-header.html',
					              controller: "MainHeaderCtrl",
					              resolve : {
					        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
					        		},
					          },
					    	   'content': {
					    		   templateUrl: "app/faq/cmsFaq.html",
					    		   controller: "FAQCtrl",
					    		   resolve : {
										  loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"FAQCtrl","FAQFactory"])
									  },
					    	   },
					    	   'footer': {
					    		   templateUrl: 'app/HeaderFooter/main-footer.html',
					    	   }
					      },
						  
						  params:{pageName:"add",entitlement:"DASHBOARD",data:{}},
						 
					   }).state("cmsFAQSearch.editFAQ",{
						      url: "/editFAQ?id&state",
						        views: {
						            'popupView@cmsFAQSearch': {
						                templateUrl: "app/faq/cmsFaq.html",
											    		   controller: "FAQCtrl",
											    		   resolve : {
																  loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"FAQCtrl","FAQFactory"])
															  },
						            },
								},
								 params:{pageName:"edit",entitlement:"DASHBOARD",data:{}},

								})	
						.state("cmsFAQSearch.viewFAQ",{
								      url: "/viewFAQ?id&state",
						          views: {
						            'popupView@cmsFAQSearch': {
						                 templateUrl: "app/faq/cmsFaqView.html",
											    		   controller: "FAQCtrl",
											    		   resolve : {
																  loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"FAQCtrl","FAQFactory"])
															  },
						              },
						            
						              },
										params:{pageName:"view",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
									
								   }).state("cmsFAQSearch",{
						  url: "/cmsFAQSearch",										  
						  views: {
							  'header': {
					              templateUrl: 'app/HeaderFooter/main-header.html',
					              controller: "MainHeaderCtrl",
					              resolve : {
					        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
					        		},
					          },
					    	   'content': {
					    		   templateUrl: "app/faq/cmsFaqSearch.html",
					    		   controller: "FAQCtrl",
					    		   resolve : {
										  loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,"FAQCtrl","FAQFactory"])
									  },
					    	   },
					    	   'footer': {
					    		   templateUrl: 'app/HeaderFooter/main-footer.html',
					    	   }
					      },
						  params:{pageName:"list",entitlement:"DASHBOARD",data:{}},
						 
						  }).state("DeactivateActivity", {
					  		  url: "/DeactivateActivity",

						      views: {
						    	   'header': {
						              templateUrl: 'app/HeaderFooter/main-header.html',
						              controller: "MainHeaderCtrl",
						              resolve : {
						        			loadDeps : loadDependencies([ErrCons, MenuCons, facs, RestCons, BannerCons, "LoginFactory", "MainHeaderCtrl"])
						        		},
						             },
						            'content': {
						            	  templateUrl: "app/activities/cmsActivityDeactiveSearch.html",
							    		   controller: "ActivityCtrl",
						                 resolve : {
						                	 loadDeps : loadDependencies([ErrCons, MenuCons, facs, RestCons, "ActivityCtrl", "ActivityFactory"])
						           		},
						             },
						             'footer': {
						                templateUrl: 'app/HeaderFooter/main-footer.html',
						             }
						        },
						  		params:{pageName:"record",entitlement:"DASHBOARD",data:{}},//here data is used to show errors after redirecting to login page
						  		
						  }).state("addActivity",{
							  url: "/addActivity?organizationName",										  										  
						      views: {
						    	  'header': {
						              templateUrl: 'app/HeaderFooter/main-header.html',
						              controller: "MainHeaderCtrl",
						              resolve : {
						        			loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
						        		},
						          },
						    	   'content': {
						    		   templateUrl: "app/activities/cmsActivity.html",
						    		   controller: "ActivityCtrl",
						    		   resolve : {
											  loadDeps : loadDependencies([ErrCons, MenuCons, facs, RestCons, "ActivityCtrl", "ActivityFactory"])
										  },
						    	   },
						    	   'footer': {
						    		   templateUrl: 'app/HeaderFooter/main-footer.html',
						    	   }
						      },
							  
							  params:{pageName:"add",entitlement:"DASHBOARD",data:{}},
							 
						   }).state("cmsActivitySearch.editActivity",{
						      url: "/editActivity?id&state",
						        views: {
						            'popupView@cmsActivitySearch': {
						                templateUrl: "app/activities/cmsActivity.html",
							    		   	controller: "ActivityCtrl",
							    		   	resolve : {
												  loadDeps : loadDependencies([ErrCons, MenuCons, facs, RestCons, "ActivityCtrl", "ActivityFactory"])
											},
						            },
								},
								params:{pageName:"edit",entitlement:"DASHBOARD",data:{}},

							}).state("cmsActivitySearch.viewActivity",{
									  url: "/viewActivity?id&state",
							          views: {
							            'popupView@cmsActivitySearch': {
							                 templateUrl: "app/activities/cmsActivityView.html",
									    		   controller: "ActivityCtrl",
									    		   resolve : {
														  loadDeps : loadDependencies([ErrCons, MenuCons, facs, RestCons, "ActivityCtrl", "ActivityFactory"])
												   },
							              	  },							            
							              },
							              params:{pageName:"view",entitlement:"DASHBOARD",data:{}},
										
							}).state("cmsActivitySearch",{
								 url: "/cmsActivitySearch",										  
								 views: {
									 'header': {
							              templateUrl: 'app/HeaderFooter/main-header.html',
							              controller: "MainHeaderCtrl",
							              resolve : {
							            	  loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
							              },
									 },
						    	   'content': {
						    		   templateUrl: "app/activities/cmsActivitySearch.html",
						    		   controller: "ActivityCtrl",
						    		   resolve : {
											  loadDeps : loadDependencies([ErrCons, MenuCons, facs, RestCons, "ActivityCtrl", "ActivityFactory"])
										  },
						    	   },
						    	   'footer': {
						    		   templateUrl: 'app/HeaderFooter/main-footer.html',
						    	   }
						      },
							  params:{pageName:"list",entitlement:"DASHBOARD",data:{}},							 
						  }).state("cmsHomeLinksSearch",{
								url: "/cmsHomeLinksSearch",										  
								views: {
									'header': {
										templateUrl: 'app/HeaderFooter/main-header.html',
										controller: "MainHeaderCtrl",
										resolve : {
											loadDeps : loadDependencies([ErrCons,MenuCons,facs,RestCons,BannerCons,"LoginFactory","MainHeaderCtrl"])
										},
									},
									'content': {
										templateUrl: "app/home_links/cmsHomeLinksSearch.html",
										controller: "HomeLinksCtrl",
										resolve : {
											loadDeps : loadDependencies([ErrCons, MenuCons, facs, RestCons, "HomeLinksCtrl", "HomeLinksFactory"])
										},
									},	
									'footer': {
										templateUrl: 'app/HeaderFooter/main-footer.html',
									}
								},
								params:{pageName:"list",entitlement:"DASHBOARD",data:{}},
								
							}).state("addHomeLink",{
  								url: "/addHomeLink?organizationName",
								views: {
									'header': {
										templateUrl: 'app/HeaderFooter/main-header.html',
								        controller: "MainHeaderCtrl",
								        resolve : {
								  			loadDeps : loadDependencies([ErrCons, MenuCons, facs, RestCons, BannerCons, "LoginFactory", "MainHeaderCtrl"])
								  		},
								    },
								    'content': {
								    	templateUrl: "app/home_links/cmsHomeLinks.html",
								    	controller: "HomeLinksCtrl",
								    	resolve : {
								    		loadDeps : loadDependencies([ErrCons, MenuCons, facs, RestCons, "HomeLinksCtrl", "HomeLinksFactory"])
										},
								    },
								    'footer': {
								    	templateUrl: 'app/HeaderFooter/main-footer.html',
								    }
								},
								params:{pageName:"add",entitlement:"DASHBOARD",data:{}},
								
  							}).state("cmsHomeLinksSearch.viewHomeLink",{
								url: "/viewHomeLink?id&state",
								views: {
									'popupView@cmsHomeLinksSearch': {
										templateUrl: "app/home_links/cmsHomeLinksView.html",
										controller: "HomeLinksCtrl",
										resolve : {
											loadDeps : loadDependencies([ErrCons, MenuCons, facs, RestCons, "HomeLinksCtrl", "HomeLinksFactory"])
										},
									},							            
								},
								params:{pageName:"view",entitlement:"DASHBOARD",data:{}},
								
							}).state("cmsHomeLinksSearch.editHomeLinks",{
								url: "/editHomeLinks?id&state",
								views: {
									'popupView@cmsHomeLinksSearch': {
										templateUrl: "app/home_links/cmsHomeLinks.html",
										controller: "HomeLinksCtrl",
										resolve : {
											  loadDeps : loadDependencies([ErrCons, MenuCons, facs, RestCons, "HomeLinksCtrl", "HomeLinksFactory"])
										},
									},
								},
								params:{pageName:"edit",entitlement:"DASHBOARD",data:{}},
								
							}).state("deactivateHomeLink",{
								url: "/deactivateHomeLink",										  										  
								views: {
									'header': {
										templateUrl: 'app/HeaderFooter/main-header.html',
										controller: "MainHeaderCtrl",
										resolve : {
											loadDeps : loadDependencies([ErrCons, MenuCons, facs, RestCons, BannerCons, "LoginFactory", "MainHeaderCtrl"])
										},
									},
									'content': {
										templateUrl: "app/home_links/cmsHomeLinksDeactiveSearch.html",
										controller: "HomeLinksCtrl",
										resolve : {
											loadDeps : loadDependencies([ErrCons, MenuCons, facs, RestCons, "HomeLinksCtrl", "HomeLinksFactory"])
										},
									},
									'footer': {
										templateUrl: 'app/HeaderFooter/main-footer.html',
									}
								},				  
								params:{pageName:"record",entitlement:"DASHBOARD",data:{}},	
								
							});
  	
  	
  	
}])

MoyaApp.config(['$stateProvider', '$urlRouterProvider','$urlMatcherFactoryProvider','$locationProvider',
	function($stateProvider, $urlRouterProvider,$urlMatcherFactoryProvider,$locationProvider) {
		debugger;

  	//$urlRouterProvider.when('/partner', '/partner/home');
  	var ErrCons="ErrorConstants";
  	var MenuCons="MenuConstants";
  	var RestCons="RestConstants";
  	var facs= "Factory";
  	var Directv= "Directive";
  	var baseViewPath="app/";
  	var sharedPath="app/Shared/";
  	//$rootScope.logOutUrl= $rootScope.HOST_APP+RestConstants.LogOut.logOut;
 	$locationProvider.html5Mode(true);
  	$urlRouterProvider.otherwise("/");
  	$stateProvider.state("NCCHome", {
  		url: "/NCCHome",
  		templateUrl: "NCC/ncc.html",
  	});
}])
.factory('DataFactory',function(){
	return {
		list : [],
		obj : {},
		session : {userId:"'"}
	};
})
.factory('LoadingFactory',['$rootScope',function($rootScope){
	return {
		showLoading: function(){
			$rootScope.$emit("LOAD");
		},
		hideLoading: function(){
			$rootScope.$emit("UNLOAD");
		}
	};
}])
/**
  *
  *@@SessionFactory
  *
  *is used to to maintain session
  *@createSession creates user object tahat stores access_token,authorities and username
  *@checkLogin checks if user is logged in or not
  *@getSessionObject gets session object i.e "user"
  *@destroySession deletes the sesison
  *@rememberMe stores the session for a long time as long as 1 year even if browser is Closed
  *
  */
  .factory('SessionFactory',['$rootScope','$state',function($rootScope,$state){
  	var session;
  	return{
  		checkLogin:function(){
  			if(!session){
  				return false;
  			}else{
  				return true;
  			}
  		},
  		setSessionObject:function(sessionObj){
				//sets session during login
				session =sessionObj;
			},
			updateSessionToken:function(token){

				if(session){
				//update session with new Token
				session.token=token;
			}
		},
		getSessionObject:function(){
				//getter to receive session

				return session;
			},
			destroySession:function(){
				//deletes session
				session = undefined;
			}
			// rememberMe:function(objectName,object){
			// 	var now = new Date(),
	  //   		// this will set the expiration to 12 months Nyet used
	  //  		 	exp = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
			// 	$cookies.putObject(objectName,object,{
			// 	  expires: exp
			// 	});
			// }
		};
	}])
  .filter("mask",function(){
  	return function(text){
  		var txt="";
			var i=0;
  		if(text && text!=="" && text.length > 4){
  			text = text.substr(text.length - 4);
  			for(i=0;i<13;i++){
  				txt = txt+"#";
  			}
  			txt = txt+text;
  		}
  		else if(text && text!==""){
  			for(i=0;i< 17 -(text.length);i++){
  				txt = txt+"#";
  			}
  			txt = txt+text;
  		}
  		return txt;
  	};
  })
  .filter("findByValue",function(){

  	return function(collection,propertyValue) {
  		var i=0, len=collection.length;
  		for (; i<len; i++) {
  			if (collection[i].val == propertyValue) {
  				return collection[i].name;
  			}
  		}
  		return null;
  	};
  })
  .filter("range",function(){
  	return function(input,frm) {
  		var newInput=[];
  		frm = parseInt(frm);
  		for (var i=frm; i<frm+4; i++) {
  			if(input[i]){
  				newInput.push(input[i]);
  			}
  		}

		   return newInput;
		};
	}).directive('errorDir', function() {
		return {
			restrict: 'E',
			scope: {
				errorArray: '='
			},
			template: " <p  ng-repeat='p in errorArray'> {{p.message}}"
	};
})



.directive('afterRender', function() {
  return {
    scope: {
      //language: '&'
    },
    link: function($scope, element, attrs) {
       var watch = $scope.$watch(function() {

      }, function() {
        // Runs after rendered
        $scope.$evalAsync(function() {
          setLanguage('hi');
          setFont();
        });
      });
    },
  };
})  


.directive('prettyp', function(){
return function(scope, element, attrs){
$("[rel^='prettyPhoto']").prettyPhoto({deeplinking: false, social_tools: false,theme:'facebook'});
}
})


.directive('scrollOnClick', function() {
  return {
   restrict: 'A',
   link: function(scope, $elm, attrs) {
    var navbarAffixHeight=76; 

      $elm.on('click', function() {
        var idToScroll = attrs.scrollid;
        $(".js-target-scroll").parent().removeClass("active");
        debugger;
        var $target;
         if (idToScroll) {
          $target = $(idToScroll);
          $elm.addClass("active");
        }
        else {
          $target = $elm;
        }

        $("body").animate({scrollTop: $target.offset().top - navbarAffixHeight + 1}, "slow");    
         return false;   
      });
      
      // $('body').scrollspy({
      //     offset:  navbarAffixHeight + 1
      //   });

     }
  };
})  

  .directive('ckEditor', function () {
  return {
    require: '?ngModel',
    link: function (scope, elm, attr, ngModel) {
      var ck = CKEDITOR.replace(elm[0]);
      if (!ngModel) return;
      ck.on('instanceReady', function () {
    	  
        ck.setData(ngModel.$viewValue);
        debugger;
    
      });
      
      function updateModel() {
        //scope.$apply(function () {
          ngModel.$setViewValue(ck.getData());
       // });
      }
      ck.on('change', updateModel);
      ck.on('key', updateModel);
      ck.on('focus', updateModel);
      //ck.on('dataReady', updateModel);

      //file upload
      
     
      
      
      ngModel.$render = function (value) {
        ck.setData(ngModel.$viewValue);
      };
    }
  };
})




  .directive('getTranslatedText', function($http,$sce){
  return {
    scope: {commentURI: '@uri',
    apiURL: '@url',   
    },
    link: function(scope, element, attrs) {
      debugger;
      //post
      var header = {"X-Auth-Token":sessionStorage.getItem("token")};
     // var url = $rootScope.HOST_APP+RestConstants.Master.GetMyGovList;
      $http.post(scope.apiURL, {"url" : scope.commentURI + "?"}, header).success(function(data) {
         
            
        scope.fullName = data.full_name;
        scope.commentBody = data.comment_body;
        scope.commentImg = "https://www.mygov.in/avatar/"+ data.u_uid;
      

      });


    },
    template: ' <div class="comment_user"><div class="user-picture"><img ng-src="{{commentImg}}"  alt="" title="" class="image-left"/> </div></div><div class="comment_content"><p class="username" ng-bind="fullName"></p><div class="content"><div class="comment_body" ng-bind="commentBody.und[0].value"> </div></div></div>'
  }
}).directive('getPollQuestionsText', function($http,$sce){
  return {
    scope: {commentURI: '@uri',
    apiURL: '@url',  
    },
    link: function(scope, element, attrs) {
      debugger;
      //post
      var header = {"X-Auth-Token":sessionStorage.getItem("token")};
     // var url = $rootScope.HOST_APP+RestConstants.Master.GetMyGovList;
      $http.post(scope.apiURL, {"url" : scope.commentURI}, header).success(function(data) {
                   
        scope.question_title = data.title;
             
      });


    },
    template: ' <div>{{question_title}}</div>'
  }
}).directive('preventRightClick', [function () {  
    return {  
        restrict: 'A',  
        link: function ($scope, $ele) {  
        $ele.bind("contextmenu", function (e) {  
        e.preventDefault();
     
        });  
        }  
        };  
        }  
 ]).directive('validNumber', function() {
	  return {
		    require: '?ngModel',
		    link: function(scope, element, attrs, ngModelCtrl) {
		      if(!ngModelCtrl) {
		        return; 
		      }

		      ngModelCtrl.$parsers.push(function(val) {
		        if (angular.isUndefined(val)) {
		            var val = '';
		        }
		        var clean = val.replace( /[^0-9]+/g, '');
		        if (val !== clean) {
		          ngModelCtrl.$setViewValue(clean);
		          ngModelCtrl.$render();
		        }
		        return clean;
		      });

		      element.bind('keypress', function(event) {
		        if(event.keyCode === 32) {
		          event.preventDefault();
		        }
		      });
		    }
		  };
		}).directive('alphaNumeric', function() {
			  return {
				    require: '?ngModel',
				    link: function(scope, element, attrs, ngModelCtrl) {
				      if(!ngModelCtrl) {
				        return; 
				      }

				      ngModelCtrl.$parsers.push(function(val) {
				        if (angular.isUndefined(val)) {
				            var val = '';
				        }
				        var clean = val.replace( /[^a-zA-Z0-9]+/g, '');
				        if (val !== clean) {
				          ngModelCtrl.$setViewValue(clean);
				          ngModelCtrl.$render();
				        }
				        return clean;
				      });

				      element.bind('keypress', function(event) {
				        if(event.keyCode === 32) {
				          event.preventDefault();
				        }
				      });
				    }
				  };
				}).directive('humanNames', function() {
					  return {
						    require: '?ngModel',
						    link: function(scope, element, attrs, ngModelCtrl) {
						      if(!ngModelCtrl) {
						        return; 
						      }

						      ngModelCtrl.$parsers.push(function(val) {
						        if (angular.isUndefined(val)) {
						            var val = '';
						        }
						        var clean = val.replace( /[^a-zA-Z0-9 ']+/g, '');
						        if (val !== clean) {
						          ngModelCtrl.$setViewValue(clean);
						          ngModelCtrl.$render();
						        }
						        return clean;
						      });

						    
						    }
						  };
						}).directive('alphabetsOnly', function() {
							  return {
								    require: '?ngModel',
								    link: function(scope, element, attrs, ngModelCtrl) {
								      if(!ngModelCtrl) {
								        return; 
								      }

								      ngModelCtrl.$parsers.push(function(val) {
								        if (angular.isUndefined(val)) {
								            var val = '';
								        }
								        var clean = val.replace( /[^a-zA-Z ]+/g, '');
								        if (val !== clean) {
								          ngModelCtrl.$setViewValue(clean);
								          ngModelCtrl.$render();
								        }
								        return clean;
								      });

								     
								    }
								  };
								}).directive('dobOnly', function() {
									  return {
										    require: '?ngModel',
										    link: function(scope, element, attrs, ngModelCtrl) {
										      if(!ngModelCtrl) {
										        return; 
										      }

										      ngModelCtrl.$parsers.push(function(val) {
										        if (angular.isUndefined(val)) {
										            var val = '';
										        }
										        var clean = val.replace( /[^0-9{2}/0-9{2}/0-9{4}]+/g, '');
										        if (val !== clean) {
										          ngModelCtrl.$setViewValue(clean);
										          ngModelCtrl.$render();
										        }
										        return clean;
										      });

										      element.bind('keypress', function(event) {
										        if(event.keyCode === 32) {
										          event.preventDefault();
										        }
										      });
										    }
										  };
										})
 .directive('psPicker',['$compile','$rootScope',
           function($compile,$rootScope){
        return {
          restrict: 'A',
          require: 'ngModel',
          scope:{
            format:'@',
            mindate :'@',
            maxdate :'@',
            setDefault:'@',
         },
           link: function (scope, element, attributes, ctrl) {
            //console.log("pankaj Singh",ctrl);
             var currYear=new Date().getFullYear();
                element.datetimepicker({
                    format: scope.format,
                    minDate:scope.mindate,
                    maxDate:scope.maxdate,
        //          maxDate:new Date(),
                    widgetPositioning: 
                  {
                    horizontal: 'left', 
                    vertical: 'bottom'
                  }
                });
                var picker = element.data("DateTimePicker");
                if(scope.setDefault){
                  ctrl.$formatters.push(function (value) {
                      var date = moment(value);
                      if (date.isValid()) {
                          return '';//date.format(scope.format);
                      }
                      return '';
                  });
              }

      //           scope.updateModel = function(item)
      // {
      //   ctrl.$setViewValue(item);
      // }
                element.on('blur', function (event) {  
                        ctrl.$setViewValue(element.val());
                });
            }
        };
  }]).filter("range",function(){
	return function(input,frm) {
		var newInput=[];
		frm = parseInt(frm);
		for (var i=frm; i<frm+4; i++) {
			if(input[i]){
				newInput.push(input[i]);
			}
		}
     // console.log(frm);
     return newInput;
 };
}).filter("findByValue",function(){
  
    return function(collection,propertyValue) {
      var i=0, len=collection.length;
      for (; i<len; i++) {
        if (collection[i].geographyCode == propertyValue) {
          return collection[i].geographyName;
        }
      }
      return null;
    }
  }).constant("GlobalConstants",{
	"POST" : "POST",
	"GET" : "GET",
	"PUT":"PUT",
	"DEL":"DELETE",
	"SUCCESS":"SUCCESS",
	"FAILURE":"FAILURE",
	"X_TOKEN":"X-Auth-Token",
	//"GET_ROLES" : "/payvus/org/roles",
	
})
.run(['$rootScope','LoadingFactory','SessionFactory','$state','$timeout','$http','$window','$location','$uibModal',
	function($rootScope,LoadingFactory,SessionFactory,$state,$timeout,$http,$window,$location,$uibModal){
		debugger;
		var host=$location.host();
    $rootScope.progressbarCounter = 10;
		var dotIndex=host.indexOf(".");
		host=host.substr(0,dotIndex);
		if(host===""){
			host="localhost";
		}



		var fileToAccess="app/globals/"+host+".json";
		$http.get(fileToAccess).then(function(response){
			$rootScope.HOST_APP=response.data.HOST;
			$rootScope.brandingHost=response.data.BRANDINGHOST;
			var len=($rootScope.HOST_APP).length;
			if(len>0 && ($rootScope.HOST_APP).lastIndexOf("/")==(len-1)){

				$rootScope.HOST_APP=($rootScope.HOST_APP).substr(0,len-1);
			}
			$rootScope.HOST_APP=$rootScope.HOST_APP + "/" + response.data.APP_CONTEXT;
		},function(err){
			console.log("app.js line 688 / commented hence error. No Fallback : ",err);
    		
    	});

	/* patterns for regex validation */
	$rootScope.naturalNum=/^(0|[1-9][0-9]*)$/;
	$rootScope.wholeNum=/^([0-9]*)$/;
	$rootScope.hashNum=/^([#0-9]*)$/;
	$rootScope.zipOnly=/^([0-9][0-9]*)$/;
	$rootScope.alphanumOnly=/^[a-z0-9]+$/i;
	$rootScope.emailOnly=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;///^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i;
	$rootScope.alphabetsOnly=/^[a-zA-Z ]*$/;
	$rootScope.humanNamesOnly=/^[a-zA-Z0-9 ']*$/;
    $rootScope.sortingOrder="Asc";
    window.innerDocClick=true;

	//$rootScope.alphaNumWithChars=/[A-Za-z]+[0-9]*/i;
	//$rootScope.alphaNumWithCharsNoSpace=/^([a-zA-Z])(?=.*[0-9]*)([a-zA-Z0-9_.!@#$%^&*()_+-]*)$/i;
	//$rootScope.alphaNumCode=/^([a-zA-Z0-9_-])(?=.*[0-9]*)([a-zA-Z0-9_-]*)$/i;
	//$rootScope.passwordOnly=/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/;
	$rootScope.fractionOnly=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
		$rootScope.addressOnly=/^[a-zA-Z0-9_./\n\r\s-,]*$/;
	//$rootScope.advfractionOnly=/^[0-9]*\.{0,1}[0-9]{0,6}$/;
	
  $rootScope.currentYear=new Date().getFullYear();

	$rootScope.$on("LOAD",function(){$rootScope.loading=true;});
	$rootScope.$on("UNLOAD",function(){$rootScope.loading=false;});

	$rootScope.$on("SHOW_ALERT",function(){$rootScope.isAlert=true;});
	$rootScope.$on("HIDE_ALERT",function(){$rootScope.isAlert=false;});

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		LoadingFactory.showLoading();
		debugger;


//	 if (!window.innerDocClick&&((toState.name!="index"&&toState.name!="authverification"&&toState.name!="dashboard"&&fromState!="authverification"&&toState.name!="Error"))) {
//			// Your own in-page mechanism triggered the hash change
//		 $rootScope.isLogin=false;				
//		 $rootScope.menuList=[];
//		 LoadingFactory.hideLoading();
//		 $rootScope.mesagedata="You have been logged out because you clicked browser back button.";			
//		 $state.go("Error");
//	} 
	
//	if(localStorage.getItem("token")!=null&&fromState.name==""&&toState.name!="index"&&toState.name!="authverification"&&toState.name!="Error"){
//		 var tokenStr = localStorage.getItem("token");            
//         var header = {'Content-Type' : 'application/json', 'X-Auth-Token' : tokenStr};
//  		 LoadingFactory.hideLoading();	
//		 $rootScope.isLogin=false;
//		 $rootScope.menuList=[];
//		 $rootScope.mesagedata="You have been logged out because you refreshed the page.";
//	     $state.go("Error");
//				
//	}
	});

//	$rootScope.is_logout_action=false;
	$rootScope.globalCacheBust = Date.now().toString();

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		debugger;
				
	

		 if (!window.innerDocClick&&sessionStorage.getItem("token")!=null) {
			// Your own in-page mechanism triggered the hash change
			
			 LoadingFactory.hideLoading();	
			 if(toState.name=="dashboard" && fromState.name=="authverification"){
				 
			 }else {
			 
			 $rootScope.mesagedata="You have been logged out because you clicked browser back button.";
			 $state.go("Error");
			 }
		
		} 
		
		if(sessionStorage.getItem("token")!=null && fromState.name==""){
			LoadingFactory.hideLoading();
			if(sessionStorage.styleClicked!=null && sessionStorage.styleClicked=="true"){
				sessionStorage.styleClicked= false;
			}else{		 			

			 $rootScope.mesagedata="You have been logged out because you refreshed the page.";
			 $state.go("Error");
			}
				
		}
		


			LoadingFactory.hideLoading();
		});
	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
		console.log(error);
		LoadingFactory.hideLoading();
	});

	
		/*Logout the user*/
		  //logout the idle user.
	
	  $rootScope.$on('IdleStart', function() {
		  debugger;
//		  $rootScope.warning = $uibModal.open({
//	          template: '<div class="modal-header">   <h3>You are Idle. Do Something!</h3>  </div>  <div idle-countdown="countdown" ng-init="countdown=5" class="modal-body">   <uib-progressbar max="5" value="5" animate="false" class="progress-striped active">You will be logged out in {{countdown}} second(s).</uib-progressbar>  </div>',
//	          windowClass: 'modal-danger'
//	        });
		//  showInfoAlert('info-inactive-user');
       // alert("you are inactive for too long!");

       
          var elem = document.getElementById("myBar");   
          var width = 1;
          $rootScope.id = setInterval(frame, 1000);
          function frame() {
            if (width >= 100) {
              clearInterval($rootScope.id);
            } else {
              width = width + 100/$rootScope.progressbarCounter; 
              elem.style.width = width + '%'; 
            }
          }
     
       


       $("#timeoutPopup").modal("show");
       
       $rootScope.timeoutCounter=$rootScope.progressbarCounter;
       
        $rootScope.onTimeout = function(){
        $rootScope.timeoutCounter--;
        mytimeout = $timeout($rootScope.onTimeout,1000);
         if($rootScope.timeoutCounter == 0) {
          $timeout.cancel(mytimeout);
        }
    }
    var mytimeout = $timeout($rootScope.onTimeout,1000);
      });

    

      $rootScope.$on('IdleEnd', function() {
    	  	 debugger;
    	  	 var token = sessionStorage.getItem("token");            
		     var header = {'Content-Type' : 'application/json', 'X-Auth-Token' : token};
    	  $http.get($rootScope.pingURL, header).success(function(data) {
    		  console.log("idleendcalled.");

          $("#timeoutPopup").modal("hide");
          $(".modal-backdrop").hide();
    		 // hideInfoAlert('info-inactive-user');
    	  
    	  });
        clearInterval($rootScope.id);
    	  
      });

      $rootScope.$on('IdleTimeout', function() {
       
        $rootScope.mesagedata="You have been logged out due to inactivity.";			
		    $("#timeoutPopup").modal("hide");
        $(".modal-backdrop").hide();
         clearInterval($rootScope.id);
		    $state.go("Error");
      });



		var cls="";
		var timeProm;
		$rootScope.showAlert=function(msg,type){
			 cls="alertOffset";
			 /*
			 	*@Places the alert message 40px below so that the alert does not covers the header and logo
				*@Rest all css classes are taken from bootstrap for responsiveness
			*/
				var s_top=$window.pageYOffset;
				 if(s_top < 40){
				 	$rootScope.type="alert-"+type+" in "+cls+ " animateAlert";

				 }else{
				 	$rootScope.type="alert-"+type+" in "+cls;
				 }

				/*Puts single alert mesaages in array to work with directive*/

        	if($rootScope.errorarray !==null && $rootScope.errorarray !==undefined){
							 if($rootScope.errorarray.length < 2){
                if(angular.isArray(msg)){
                  $rootScope.errorarray = [{ message: msg[0].message}];
                }else{
                   $rootScope.errorarray = [{ message: msg}];
                   }
								}
					}else{
						$rootScope.errorarray = [{ message: msg}];
					}
				$rootScope.alertMsg=msg;

				/*On triggering showAlert let the application know that alert has been shown*/
				$rootScope.$emit("SHOW_ALERT");

				/*Hide alert after an interval of 6 seconds*/
			/*	timeProm=$timeout(function () {
					$rootScope.$emit("HIDE_ALERT");
					$rootScope.type=""+cls;
				}, 8000);*/

		};

	/*Hide alert Manually on clicking over the alert or (x) on the right top of alert*/
	$rootScope.dismissAlert=function(){
		$rootScope.$emit("HIDE_ALERT");
		$rootScope.typeCss=""+cls;
		$timeout.cancel(timeProm);
	};

	$rootScope.loadCssDynamically=function(path){
		 var linkTag=document.createElement("link");
		 var link=angular.element(linkTag);
		 linkTag.setAttribute("rel","stylesheet");
		 linkTag.setAttribute("type","text/css");
		 linkTag.setAttribute("href",path);
		 var headTag=angular.element(document.getElementsByTagName("head")[0]);
		 headTag.append(link);
	};

}]);
})(); //IFFY closed


