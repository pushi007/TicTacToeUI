define([],function(){

	  app_cached_providers.$provide.factory("DemoFactory",['$rootScope','AjaxFactory','GlobalConstants','RestConstants',
	  				function($rootScope,AjaxFactory,GlobalConstants,RestConstants){
	  		return {
	  			AddProduct:function(body,session){

	  				var url=$rootScope.HOST_APP+RestConstants.Demo.Add;
	  				var header={"X-Auth-Token": session.token,"Content-Type":"application/json"};
	  				return AjaxFactory.request(url,GlobalConstants.POST,body,header);
	  			},
	  			getProduct:function(session,id){
	  				 var header={"X-Auth-Token": session.token,"Content-Type":"application/json"};
	  				 var url=$rootScope.HOST_APP+RestConstants.Demo.Get+id;

	  				return AjaxFactory.request(url,GlobalConstants.GET,null,header);
	  			},
	  			
	  		};//return closed
	  }]);
});
