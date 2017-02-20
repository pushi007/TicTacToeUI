define([],function(){
	app_cached_providers.$compileProvider.directive('menus',['MenuConstants','$rootScope','$compile','$timeout','$window','$anchorScroll',
											function(MenuConstants,$rootScope,$compile,$timeout,$window,$anchorScroll){
												
		return {
 			restrict : 'EA',
 			replace :true,
 			scope:false,
 			template:"<ul class='nav' id='side-menu'></ul>",
 			link: function(scope,e,a){
 				//////console.log("within directives and menuItems are : ",scope.menuItems);

				try {
					
						var names=scope.menuItems.split(",");
		 				var menuName=scope.menuFor;//e.attr("menu-name")+"";
		 				var menu=MenuConstants[menuName];
		 				var innerHTML="",name,icon,link;

		 				for(var i=0;i<names.length;i++){
							if(menu.hasOwnProperty(names[i])){
		 				  	name=menu[names[i]+''].name;
		 				  	icon=menu[names[i]+''].icon;
		 				  	link=menu[names[i]+''].link;
								icon=icon+(link.indexOf(".Home")>-1?" fa-lg":" fa-fw");
								console.log(icon);
								var isSSO=menu[names[i]+''].isClick;
								/*this creates menus*/
								if(!isSSO){
			 				  		innerHTML+="<li>"+
									 						"<a id=menu-"+link.replace(".","-")+" data-ui-sref-active='active' data-ui-sref='"+link+"' class='inactive'> "+
									 							"<i class='fa "+ icon +"'></i> "+name+
									  						"</a>"+
									 							"</li>";
								}else{
										innerHTML+="<li>"+
																"<a style='cursor:pointer;' data-ng-click='ssoAuth()' id=menu-"+link.replace(".","-")+" class='inactive'> "+
																	"<i class='fa "+ icon +"'></i> "+name+
																	"</a>"+
																"</li><a href='#' id='ssoAuthElem' target='_blank' style='visibility:hidden;height:1px;'></a>";
								}
								icon="";
							}//if closed
						}// for closed
		 				e.html(innerHTML);
		 				e.on('click',function(){
		 						var elem=angular.element(document.getElementById("myNaveBar"));
		 						if(window.innerWidth<768){
			 						elem.removeClass("collapse");
			 						elem.addClass("collapsing");
			 						$anchorScroll();
				 					$timeout(function(){
				 						elem.removeClass("collapsing in");
				 						elem.addClass("collapse");
				 					},500);
			 					}
		 				});
		 				$compile(e.contents())(scope);
 				}catch (ex) {
 					 
				console.error("Exp: Menu not found");
				}
			}
 		}; //return closed
	}]);
});
