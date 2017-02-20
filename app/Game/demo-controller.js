define([], function () {

    // the Content Controller
    // is added into the 'app' module
    // lazily, and only once

    app_cached_providers.$controllerProvider
    .register('Partner.DemoCtrl',['$scope','SessionFactory','$state','LoadingFactory','ExceptionFactory','UtilityFactory','DemoFactory',
                            function(vm,SessionFactory,$state,LoadingFactory,ExceptionFactory,UtilityFactory,DemoFactory){
    // NOTE : vm is $scope;  vm stands for view model
    alert(1);
        if(!SessionFactory.checkLogin()){
            ExceptionFactory.showMsg("Your session has Expired. Please Login.","danger");
            $state.go("home.youthHome")
            return;
        }
        var session=SessionFactory.getSessionObject();
        vm.product={
            Name:'',
            Price:''
        }

        vm.productList=[{'Name':'Samsung','Price':10000},{'Name':'Microsoft','Price':20000},{'Name':'IBM','Price':30000},{'Name':'Gateway','Price':40000},{'Name':'Toshiba','Price':50000},{'Name':'Sony','Price':60000},{'Name':'Lenovo','Price':70000},{'Name':'Asus','Price':80000},{'Name':'Dell','Price':90000},{'Name':'Apple','Price':100000}];

        var data={};
        vm.addProduct=function(){
          DemoFactory.AddProduct(data,session).then(function(){

          });
         //vm.productList.push(vm.product);   
          ExceptionFactory.showMsg("Product added successfully","success");
        }


      // Paging
       vm.UI={
               currentPos:1, //current page selected
               pageList:[]
            }
      vm.UI.pageList=UtilityFactory.calcPagination(vm.UI.currentPos,vm.productList);
      vm.UI.from=(getAccuateIndex());
      /*action can be left,right,index*/
        vm.paginate=function(action,index){
          var buttons=Math.floor(vm.productList.length/4);
          buttons=vm.productList.length%4>0?buttons+1:buttons;
          if(action=="left"){
             if(vm.UI.currentPos>1){
              vm.UI.currentPos--;
            }
          }else if(action=="right"){
              if(vm.UI.currentPos<buttons){
                  vm.UI.currentPos++;
              }
          }else {
              vm.UI.currentPos=index;
          }
          vm.UI.from=(getAccuateIndex());
          vm.UI.pageList=UtilityFactory.calcPagination(vm.UI.currentPos,vm.productList);
          //console.log("Cur Pos: ",vm.UI.currentPos);
        };

         function getAccuateIndex(){
      return (vm.UI.currentPos-1)*4;
    }

      //Sorting

       var reverse = false;
          vm.order = function(predicat) {
            var obj = UtilityFactory.sorting(predicat, vm.productList,reverse);
            vm.productList=obj.list;
            reverse=obj.rev;
          };

        //find below method in custom.js
         resizePageWrapper(); //jquery code used to resize page-wrapper div id="page-wrapper"
        }]);
});
