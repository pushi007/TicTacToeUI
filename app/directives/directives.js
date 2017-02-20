define([],function(){

	app_cached_providers.$compileProvider.directive('psDatetimePicker',['$compile','$rootScope',
           function($compile,$rootScope){
        return {
          restrict: 'A',
          require: 'ngModel',
          scope:{
	          format:'@',
	          mindate :'@',
	          maxdate :'@',
	          setDefault:'@',
						oldDate:'@'
	       },
           link: function (scope, element, attributes, ctrl) {
           	//console.log("Max date time value=====",scope.mindate);
           	//console.log("Min date time value=====",scope.mindate);
             var currYear=new Date().getFullYear();
                element.datetimepicker({
                    format: scope.format,
                    minDate:scope.mindate,
                    maxDate:scope.maxdate,
                    widgetPositioning:
              		  {
	                		horizontal: 'left',
	                		vertical: 'bottom'
              		  }
                });
                var picker = element.data("DateTimePicker");
								element.focus(function(){
									 if(element.val()==="" && scope.oldDate){
										 element.val(scope.oldDate);
									 }
								});
								element.on("dp.change", function (e) {

								});
                 if(scope.setDefault){
	                ctrl.$formatters.push(function (value) {
	                	//console.log("date time value=====",value);
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
												console.log(element.val());
                        ctrl.$setViewValue(element.val());
                });
            }
        };
 	}]);
});
