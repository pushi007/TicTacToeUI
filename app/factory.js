define([],function(){
	app_cached_providers.$provide.factory('AjaxFactory',['$http','$q','GlobalConstants','SessionFactory',
																								function($http,$q,GCons,SessionFactory){
  'strict';
	return {
		request:function(url,method,data,headers,reponseType){
			/*Here
			 var session=SessionFactory.getSessionObject();
			 if(session && session.userId != DataFactory.session.userId){
			     DataFactory.session.userId = session.userId;
			     $state.go("home.youthHome")
			     return;
			 }
			 Here*/
			
			 // MYCAL for adding hash to the URL while calling API.
			 
			var hashcode =  SHA1(url);
		    var newurl = url +"?MYCAL="+hashcode;
			
		
			 var deferred = $q.defer(); //create a differed object for returning a promise
			 var req={};
			if(url.indexOf("api.mygov.in")>=0){
			 req.url=url?url:undefined;
			}else{
				 req.url=url?newurl:undefined;
			}
			 req.method=method?method:undefined;
			 req.headers=headers?headers:undefined; //javascript object
			 req.data=data?data:undefined;// the data to be sent			
			 if(reponseType && reponseType!==""){
				 req.reponseType=reponseType;
			 }
			 
			
			 
			 
			 
			 
			 
			 
			 
			 
			 
			 
			 //for PUT and DELETE since headers cannot be directly added as in GET and POST
			 if(headers){
				 $http.defaults.headers.common["X-Auth-Token"] = headers["X-Auth-Token"];
	   		 }

			 if(method === GCons.GET || method === GCons.POST){
					$http(req).then(function successCallback(response) {
						if(response.data && response.data.token){
							var session=SessionFactory.getSessionObject();

							 if(session){
							 	session.token=response.data.token;
								if(session.token){
									SessionFactory.updateSessionToken(session.token);
								}
							 }

						}
						deferred.resolve(response);
					}, function errorCallback(response) {
							console.log("AJAX Fac ",response);
							deferred.reject(response);
					});
					return deferred.promise; //return promise obhect [resolve if success,reject if failure]
			}
			else if(method === GCons.POST)
			{
					$http.put(url,data).success(function(response) {
						if(response.data && response.data.token){
							var session=SessionFactory.getSessionObject();
							session.token=response.data.token;
							SessionFactory.updateSessionToken(session.token);
							console.log("New Token updated in Session");
						}
						deferred.resolve(response);
					}).error(function(err) {
						deferred.reject(err);
					});
					return deferred.promise;
			}
			else if(method === GCons.DELETE)
			{
					$http.delete(url).success(function(response) {
						console.log("Delete ",response);
							if(response.data && response.data.token){
								var session=SessionFactory.getSessionObject();
								session.token=response.data.token;
								SessionFactory.updateSessionToken(session.token);
								console.log("New Token updated in Session");
							}
							deferred.resolve(response);
						}).error(function(err) {
							 deferred.reject(err);
					});
					return deferred.promise;
			}


			 //SHA1 function			 
			 
			 function SHA1 (msg) {
				 
					function rotate_left(n,s) {
						var t4 = ( n<<s ) | (n>>>(32-s));
						return t4;
					};
				 
					function lsb_hex(val) {
						var str="";
						var i;
						var vh;
						var vl;
				 
						for( i=0; i<=6; i+=2 ) {
							vh = (val>>>(i*4+4))&0x0f;
							vl = (val>>>(i*4))&0x0f;
							str += vh.toString(16) + vl.toString(16);
						}
						return str;
					};
				 
					function cvt_hex(val) {
						var str="";
						var i;
						var v;
				 
						for( i=7; i>=0; i-- ) {
							v = (val>>>(i*4))&0x0f;
							str += v.toString(16);
						}
						return str;
					};
				 
				 
					function Utf8Encode(string) {
						string = string.replace(/\r\n/g,"\n");
						var utftext = "";
				 
						for (var n = 0; n < string.length; n++) {
				 
							var c = string.charCodeAt(n);
				 
							if (c < 128) {
								utftext += String.fromCharCode(c);
							}
							else if((c > 127) && (c < 2048)) {
								utftext += String.fromCharCode((c >> 6) | 192);
								utftext += String.fromCharCode((c & 63) | 128);
							}
							else {
								utftext += String.fromCharCode((c >> 12) | 224);
								utftext += String.fromCharCode(((c >> 6) & 63) | 128);
								utftext += String.fromCharCode((c & 63) | 128);
							}
				 
						}
				 
						return utftext;
					};
				 
					var blockstart;
					var i, j;
					var W = new Array(80);
					var H0 = 0x67452301;
					var H1 = 0xEFCDAB89;
					var H2 = 0x98BADCFE;
					var H3 = 0x10325476;
					var H4 = 0xC3D2E1F0;
					var A, B, C, D, E;
					var temp;
				 
					msg = Utf8Encode(msg);
				 
					var msg_len = msg.length;
				 
					var word_array = new Array();
					for( i=0; i<msg_len-3; i+=4 ) {
						j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
						msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
						word_array.push( j );
					}
				 
					switch( msg_len % 4 ) {
						case 0:
							i = 0x080000000;
						break;
						case 1:
							i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
						break;
				 
						case 2:
							i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
						break;
				 
						case 3:
							i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8	| 0x80;
						break;
					}
				 
					word_array.push( i );
				 
					while( (word_array.length % 16) != 14 ) word_array.push( 0 );
				 
					word_array.push( msg_len>>>29 );
					word_array.push( (msg_len<<3)&0x0ffffffff );
				 
				 
					for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
				 
						for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
						for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
				 
						A = H0;
						B = H1;
						C = H2;
						D = H3;
						E = H4;
				 
						for( i= 0; i<=19; i++ ) {
							temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
							E = D;
							D = C;
							C = rotate_left(B,30);
							B = A;
							A = temp;
						}
				 
						for( i=20; i<=39; i++ ) {
							temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
							E = D;
							D = C;
							C = rotate_left(B,30);
							B = A;
							A = temp;
						}
				 
						for( i=40; i<=59; i++ ) {
							temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
							E = D;
							D = C;
							C = rotate_left(B,30);
							B = A;
							A = temp;
						}
				 
						for( i=60; i<=79; i++ ) {
							temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
							E = D;
							D = C;
							C = rotate_left(B,30);
							B = A;
							A = temp;
						}
				 
						H0 = (H0 + A) & 0x0ffffffff;
						H1 = (H1 + B) & 0x0ffffffff;
						H2 = (H2 + C) & 0x0ffffffff;
						H3 = (H3 + D) & 0x0ffffffff;
						H4 = (H4 + E) & 0x0ffffffff;
				 
					}
				 
					var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
				 
					return temp.toLowerCase();
				 
				}
			 
			 
		} //request block closed

	};//return close

}]);

app_cached_providers.$provide.factory('UtilityFactory',['$state','AjaxFactory','MenuConstants','SessionFactory','$rootScope','$filter','ExceptionFactory',
											function($state,AjaxFactory,MenuConstants,SessionFactory,$rootScope,$filter,ExceptionFactory){
	return {
		getBroserObject:function(){},
		updateAddress:function(updated_address,oldAddress){
			if(updated_address){
				 var objKeys=Object.keys(updated_address);
				 angular.forEach(objKeys,function(value,key){
						 oldAddress[value]=updated_address[value];
				 });
				 return oldAddress;//updated old Address
			}
		},
		getValFromArray:function(collection,propertyValue,val,name) {
	        var i=0, len=collection.length;
	           // console.log("-----------------",collection, "========================");
				for (; i<len; i++) {
		            if (collection[i][val] == propertyValue) {
		            	 // console.log(collection[i]["value"]," ",val,"  ",propertyValue, " ",collection[i][val] == propertyValue);
		            	// console.log(collection[i][name]);
		                return collection[i][name];
		            }
		           // console.log("yooo");
		        }
	        return propertyValue+"";
    	},

		generateMenus:function(rolesList,orgType){
			var userMenu={};
			var menuMap={};
			switch(orgType){
     	 		case "A" : menuMap=MenuConstants.ACQUIRER_MAP;break;
     	 		case "I" : menuMap=MenuConstants.ISSUER_MAP;break;
     	 		case "R" : menuMap=MenuConstants.REFPAR_MAP;break;
     	 		case "P" : menuMap=MenuConstants.PARTNER_MAP;break;
					case "M" : menuMap=MenuConstants.MERCHANT_MAP;break;
					case "S" : menuMap=MenuConstants.SUPER_ADMIN_MAP;break;
     		}
     		console.log(orgType);
			angular.copy(menuMap,userMenu);
			var menus="",temp="";
			//console.log(rolesList);
			angular.forEach(rolesList,function(value,key){
		    	value=value.replace("CREATE_","");
		    	value=value.replace("UPDATE_","");
		    	value=value.replace("RETRIEVE_","");
		    	 //console.log("yo ",value," ==> ",temp);
		    	if(userMenu.hasOwnProperty(value) && userMenu.hasOwnProperty(value+"S")){
		    		//console.log("0 :",userMenu.hasOwnProperty("ORG_USERS"));
		    		temp+=userMenu[value]+",";
		    		delete userMenu[value];
		    	}
		    	if(userMenu.hasOwnProperty(value+"S")){
		    		//console.log("1 :",userMenu.hasOwnProperty("ORG_USERS"));
		    		temp+=userMenu[value+"S"]+",";
		    		delete userMenu[value+"S"];
		    	}
		    	//console.log("2 :",userMenu.hasOwnProperty("ORG_USERS"));
		    	if(userMenu.hasOwnProperty(value)){
		    		temp+=userMenu[value]+",";
		    		delete userMenu[value];
		    	}
		    });

			console.log(menuMap);
			var ordList=Object.keys(menuMap);
			// console.log(temp);
		    angular.forEach(ordList,function(value,key){
		    	var val=menuMap[value];
		    	if(temp.indexOf(val)>-1){
		    			menus+=val+",";
		    			// console.log("value : ", value , "  ",key);
		    	}
		    });
		    $rootScope.allowedStates=menus;
			return menus;
		},
		randomString:function(){
			var chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			 var result = '';
			 for (var i = 8; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
			 return result;
		},
		formatDate:function(dateTime){
			 var newDate,date,time;
			 //2016-03-17T17:04+0530
			 if(!dateTime || isNaN(dateTime) || dateTime===""){
			 	return "";
			 }
			 var dataArr=dateTime.split("T");
			 date=dataArr[0].split("-")[2]+ "-" +dataArr[0].split("-")[1]+ "-" +dataArr[0].split("-")[0];
			 time=dataArr[1].split("+")[0];
			 newDate=date+","+time;
			 console.log(newDate);
			 if(dateTime){
			 	date=new Date(dateTime);
			 	console.log("my date",date);
			// 	var day=date.getDate()+"",mnth=(date.getMonth() + 1)+"",year= date.getFullYear()+"";
			// 	var hrs=date.getHours()+"",mins=date.getMinutes()+"";
			// 	//console.log((mnth.length>1),"  ", (day.length>1));
			// 	newDate=(mnth.length>1? mnth : "0" + mnth) + '-' + (day.length>1? day : "0" + day) + '-' + year +","
			// 	+ (hrs.length >1 ? hrs : "0" + hrs)+ ":" + (mins.length >1? mins :"0"+ mins);
			 }
			return newDate;
		},
		getUserName:function(session){
			return session.firstname + " "+session.lastname;
		},
		initialListSort:function(list,predicate,reverse){
            var orderBy = $filter('orderBy');
             return orderBy(list,predicate, reverse);
        },
		sorting:function(predicat,list,rev){
			  var orderBy = $filter('orderBy');
              var reverse = !rev;
              var predicate = predicat;
              //var newList=orderBy(list, predicate.toString(), reverse);
              var newList=orderBy(list, predicate, reverse);
              return {rev :reverse,list:newList};

		},
		applyHash:function(accNumber){
			if((accNumber+"").length>4) {
				var newNum=accNumber+"";
				var num=newNum.substr((accNumber+"").length-4,4);
				return "#############"+num;
			}
			else{
				return "#############"+accNumber;
			}
		},
		getUserPrefix:function(name){

   			var sessionObj=SessionFactory.getSessionObject();
   			//console.log("type is : ",sessionObj);
		    if(sessionObj){
		        if(name){
					     if(sessionObj.orgtype  == "P"){
					      return "Partner";
					     }else if(sessionObj.orgtype == "A"){
					      return "Acquirer";
					     }else if(sessionObj.orgtype == "I"){
					      return "Issuer";
					     }else if(sessionObj.orgtype == "R"){
					      return "Referrer Partner";
							}else if(sessionObj.orgtype == "S"){
							 return "Super Admin";
						 }else if(sessionObj.orgtype == "M"){
					      return "Merchant";
					     }
		     }
		     else{
				     if(sessionObj.orgtype  == "P"){
				      return "partner";
				     }else if(sessionObj.orgtype == "A"){
				      return "acquirer";
				     }else if(sessionObj.orgtype == "I"){
				      return "issuer";
				     }else if(sessionObj.orgtype == "R"){
				      return "refPartner";
						}else if(sessionObj.orgtype == "S"){
						 return "superAdmin";
					  }else if(sessionObj.orgtype == "M"){
				      return "merchant";
				     }
		   	}

   }else{
           ExceptionFactory.showMsg("Your session has expired","danger");
           $state.go("index")
      }
   },
		 getPermissionJSON:function(functionsList){
		 	var permissions={};
		 	if(functionsList && functionsList.length>0){
		 		angular.forEach(functionsList,function(value,key){
		 			//console.log(value);
		 			permissions[value]=true;
		 		});
		 	}
		 	return permissions;
		 },
		 calcPagination:function(currPos,bankList){
		 	var pageList=[];
	        // vm.UI.from=((vm.UI.currentPos-1)*4);
	        var buttons=Math.floor(bankList.length/4);
	        buttons=bankList.length%4>0?buttons+1:buttons;
	        // console.log("buttons: ",buttons);
	        for(var i=0;i<buttons;i++){
	            pageList.push(i+1);
	        }
	        return pageList;
     	 },
     	 getNumberRange:function(frm,to){
     	 	var rangeList=[];
     	 	for(var i=frm;i<=to;i++){
     	 		rangeList.push(i);
     	 	}
     	 	return rangeList;
     	 },
     	 redirectIfNotAllowed:function(orgType){
     	 	debugger;
     	//  	var stateInitial=($state.current.name).charAt(0).toUpperCase();
     	//  	if(orgType!=stateInitial){
     	//  		debugger;
	     // 	 	switch(orgType){
	     // 	 		case "A" : $state.go("acquirer.Home");break;
	     // 	 		case "I" : $state.go("issuer.Home");break;
	     // 	 		case "R" : $state.go("refPartner.Home");break;
	     // 	 		case "P" : $state.go("partner.Home");break;
						// case "S" : $state.go("superAdmin.ManageUser");break;
	     // 	 	}
	     // 	}
     	 },
     	sortByKey : function(array, key) {
		    return array.sort(function(a, b) {
		        var x = a[key]; var y = b[key];
		        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        	});
		}
	};//end return
	}]);

  app_cached_providers.$provide.factory('ExceptionFactory',['$rootScope','$state','LoadingFactory',"SessionFactory",function($rootScope,$state,LoadingFactory,SessionFactory){
	return {
			getErrorMsg: function(err){


				  try{
					console.log("My Error ",err.data);
					var statusCode=err.status;
					if(statusCode === 0 || statusCode === 503){
						//if server is not running or down
						$rootScope.dismissAlert();
						LoadingFactory.hideLoading();
						$rootScope.showAlert("The Server may be down or Please check internet connection.","danger");
						return;
					}
					if([404,403,402].indexOf(statusCode)>-1){
						LoadingFactory.hideLoading();
						var msg="The resource you are trying to access is not available or not supported";
						$rootScope.showAlert(msg,"danger");
					}
					var statusText=err.statusText;
					var errors=err.data?(err.data.errorMessage ? [{"message":err.data.errorMessage,"code": err.data.errorCode || "NA"}]: err.data.messages) : err.messages;

					var newToken=errors[0].token;
					if(newToken){
						SessionFactory.updateSessionToken(newToken);
					}
					if(errors && errors.length > 0){
						console.log(errors);
						errors=sortByKey(errors,"message");
						var errMessage="";
						var errCode=errors[0].code || errorCode;
						errMessage= errors[0].message + "\n";

						$rootScope.errorarray =errors;
						var dataErrorMsg;
						if(errCode == "GENSEC000"){
							$rootScope.dismissAlert();
							LoadingFactory.hideLoading();
							$rootScope.showAlert("Username or password is incorrect.","danger");
						}

						if(errCode == "GENSEC006") //token expired
						{
							$rootScope.dismissAlert();
							dataErrorMsg={"code":errCode,"msg":"Your session has expired. Please login again."};
							$state.go("login",{
								data:dataErrorMsg
							});
							LoadingFactory.hideLoading();
							SessionFactory.destroySession();

						}

							if(errCode == "GENSEC001"){
								$rootScope.dismissAlert();
								$rootScope.showAlert(errMessage,"danger");
							}else{
								$rootScope.dismissAlert();
								$rootScope.showAlert(errors,"danger",true);
								console.log("this block");
							}
					}
					LoadingFactory.hideLoading();
				 }catch(ex){
				 	LoadingFactory.hideLoading();
				 	console.log(ex);
				 }//catch
			},//getErrEnd
			showMsg: function(msg,type,isNotToDismiss){

      	$rootScope.isNotToDismiss=isNotToDismiss?isNotToDismiss:false;
				LoadingFactory.hideLoading();
				$rootScope.dismissAlert();
				$rootScope.showAlert(msg,type);
			}
		};//RETURN closed

				function sortByKey(array, key) {
				    return array.sort(function(a, b) {
				        var x = a[key]; var y = b[key];
				        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
				    });
				}
	  }]);
	});
