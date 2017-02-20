define([], function() {

	app_cached_providers.$controllerProvider.register('MainHeaderCtrl', [
			'$scope',
			'$state',
			'$rootScope',
			'SessionFactory',
			'LoadingFactory',
			'ExceptionFactory',
			'LoginFactory',
			'$timeout',
			'GlobalConstants',
			'MenuConstants',
			'BannerImageConstants',
			'$sce',
			'$location',
			'Idle',
			'Keepalive',
			'$uibModal',
			function(vm, $state, $rootScope, SessionFactory, LoadingFactory,
					ExceptionFactory, LoginFactory, $timeout, GlobalConstants,
					MenuConstants, BannerImageConstants, $sce,$location,Idle,Keepalive,$uibModal) {
				 debugger;
				 var orgName = $location.search().organizationName;
				// Set the home rotating banner images
				vm.setMenuOnLoad = function(menuName){				
		
				     $rootScope.isMenu=false;
				     			    
				      switch (menuName){

					        case 'MyGov':
					            $rootScope.isMenu=true;
					            $rootScope.menuList=MenuConstants.myGovMenu;					           
					            break;    
					        case 'NCC':
					            $rootScope.menuList=MenuConstants.nccMenu;
					           // $state.go("cmsContent",{organizationName: 'NCC'});
					            break;
					            
					        case 'NSS':
					            $rootScope.menuList=MenuConstants.nssMenu;
								//$state.go("cmsContent",{organizationName: 'NSS'});
					            break;
									 
							case 'NYKS':
					            $rootScope.menuList=MenuConstants.nyksMenu;
								//$state.go("cmsContent",{organizationName: 'NYKS'});
					            break;
							case 'IRCS':
					            $rootScope.menuList=MenuConstants.ircsMenu;
								//$state.go("cmsContent",{organizationName: 'IRCS'});
					            break;
							case 'Eco-Clubs':
					            $rootScope.menuList=MenuConstants.EcoClubsMenu;
					           // $state.go("cmsContent",{organizationName: 'ECO-CLUBS'});
					            break;
							case 'BSG':
					            $rootScope.menuList=MenuConstants.bsgMenu;
								//$state.go("cmsContent",{organizationName: 'BSG'});
					            break;
							case 'HSG':
					            $rootScope.menuList=MenuConstants.hsgMenu;
								//$state.go("cmsContent",{organizationName: 'HSG'});
					            break;
					        default:
//								$rootScope.isMenu=true;
//					        	$rootScope.menuList=MenuConstants.moyaMenu;
//					        	vm.bannerList=BannerImageConstants.HomeBannerImages;
//					        	vm.setHomeBannerImages();
//					        	vm.searchEvent();

				      }


				}
				var session = SessionFactory.getSessionObject();
				debugger;
				if(session!=null){
					if($state.params.pageName!='Search'){
					$rootScope.isLogin = true;
					$rootScope.userNameData = session.userName;
					$rootScope.isMenu = false;
					$rootScope.menuList = session.menuListDb;
					}
					if(orgName!=null && $state.params.pageName=='CMSContent'){
						vm.setMenuOnLoad(orgName);
					}else{
						var orgName =$state.params.pageName;
						if(orgName=='discussion'||orgName=='group'||orgName=='tasks'||orgName=='talk'||orgName=='poll'){
							vm.setMenuOnLoad("MyGov");
						}
					}	
					
					}else{	
				
						if(orgName!=null && $state.params.pageName=='CMSContent'){
							vm.setMenuOnLoad(orgName);
						}else{
							var orgName =$state.params.pageName;
							if(orgName=='discussion'||orgName=='group'||orgName=='tasks'||orgName=='talk'||orgName=='poll'){
								vm.setMenuOnLoad("MyGov");
							}
						}			
				
					}	
				
				
				vm.setHomeBannerImages = function() {
					debugger;
					vm.bannerItemImageUrl1 = vm.bannerList.Image1;
					vm.bannerItemImageUrl2 = vm.bannerList.Image2;
					vm.bannerItemImageUrl3 = vm.bannerList.Image3;
					vm.bannerItemImageUrl4 = vm.bannerList.Image4;
					vm.bannerItemImageUrl5 = vm.bannerList.Image5;
					vm.bannerItemImageUrl6 = vm.bannerList.Image6;
					vm.bannerItemImageUrl7 = vm.bannerList.Image7;

				};

				var lang= GetCookie('language');

				if(lang=='hi'){
					$rootScope.hindiDiv = true;
				}else{
					$rootScope.hindiDiv = false;
				}

 

				vm.bannerList = BannerImageConstants.HomeBannerImages;


				$rootScope.logOutTest = function() {
					debugger;
					
					
					 var tokenStr = sessionStorage.getItem("token");            
			           var headerStr = {'Content-Type' : 'application/json', 'X-Auth-Token' : tokenStr};
					  LoginFactory.logOut(headerStr).then(function(response){
			            debugger;
			            Idle.unwatch();
			           },function(error){
			               
			           });
					  
					SessionFactory.destroySession();
					$rootScope.isLogin = false;
					sessionStorage.clear();
					$rootScope.menuList = MenuConstants.moyaMenu;
					vm.bannerList = BannerImageConstants.HomeBannerImages;
					vm.setHomeBannerImages();
				};
				
				vm.getGlobalContent= function(){	
					debugger;									
						
					LoginFactory.getGlobalContent(vm.searchcriteriya.content).then(function(response){
						debugger;						
						//console.log("Object:: "+JSON.stringify(response.data.searchResults));				
						$rootScope.searchResults = response.data.searchResults;	
						$rootScope.searchResults.forEach(function(item){
							if(item.description !=null){
				   			item.newPublishedValue= $sce.trustAsHtml(item.description);
				   			item.newShortValue=$sce.trustAsHtml(item.description.substring(0,aboutLength));
							}
			   			});
			   			$rootScope.isMenu=true;
        				$rootScope.menuList=MenuConstants.moyaMenu;
			   			$location.url('search');
																				  
					},function(error){				
						$rootScope.mesagedata=error.data.additionalStatusMessage;					
						$rootScope.iserrorMsg=true;
					});				
				}
			    
			    //vm.getGlobalContent();
				
				
				$rootScope.redirectToHome = function(){
					$("#logoutPopup").modal("hide");
					$(".modal-backdrop").hide();
					$state.go("index");

				};
				 $rootScope.goToDashboard=function(){				 
					  $state.go("dashboard");
				  };

				  $rootScope.showHindi = function(){
    				$rootScope.hindiDiv = true;
				};
				 $rootScope.showEnglish = function(){
    				$rootScope.hindiDiv = false;
				};
				
				$rootScope.goToHomePage=function(){
					debugger;
					$rootScope.visitorCountCall=true;
					$state.go("index");
				};


//Event Data
		// vm.searchEvent=function(){
		// 	debugger;	
		// 	vm.eventDt={};
		// 	vm.eventDt.organizationName="MINISTRY";
		// 	cmsAchievementFactory.getAllPublishEvent(vm.eventDt).then(function(response){
		// 	debugger;
		// 		vm.eventList=response.data.searchResults;								
		// 	},function(error){				
		// 		showErrorAlert('error-alert')
		// 	});			
		// }
		// vm.searchEvent();

			} ]);
});
