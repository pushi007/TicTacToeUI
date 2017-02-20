define([], function (app) {

    // the Content Controller
    // is added into the 'app' module
    // lazily, and only once

    app_cached_providers.$controllerProvider
    .register('Partner.HomeCtrl',['$scope','SessionFactory','$state','ExceptionFactory',function(vm,SessionFactory,$state,ExceptionFactory,$rootScope){
       alert(1);
		if(!SessionFactory.checkLogin()){
            ExceptionFactory.showMsg("Your session has Expired. Please Login.","danger");
            $state.go("home.youthHome")
            return;
    	}
      if($state.params && $state.params.data && $state.params.data.msg){
         var msg=$state.params.data.msg;
         ExceptionFactory.showMsg(msg,"danger");
         $state.params.data={};
      }

        var session=SessionFactory.getSessionObject();
        vm.UI={
            alert : (session.isSecretQSet)?true:false,
            alertFor: "partner"
         };

         resizePageWrapper();
	}]); //controller registered
});
