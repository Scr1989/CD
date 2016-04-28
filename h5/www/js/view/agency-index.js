require(["ionic.bundle"],function(ionic) {
	var app= angular.module('ionicApp', ['ionic']);
	/*app.run(function($ionicPlatform) {
	  $ionicPlatform.ready(function() {
	    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	    // for form inputs)
	    if(window.cordova && window.cordova.plugins.Keyboard) {
	      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	    }
	    if(window.StatusBar) {
	      StatusBar.styleDefault();
	    }
	  });
	});*/
	app.controller( 'agency-index',['$scope','$ionicPopup','$ionicActionSheet','$timeout','$http','$ionicLoading','$location',function($scope,$ionicPopup,$ionicActionSheet,$timeout,$http,$ionicLoading,$location){
		var urlParams = $location.search();
		console.log(urlParams.age);
		$scope.data = {};
		$ionicLoading.show({
		  content: 'Loading',
		  animation: 'fade-in',
		  showBackdrop: true,
		  maxWidth: 200,
		  showDelay: 0
		})
		$timeout(function () {
			$http({
				url:'../js/view/ceshi.json',
				method:'GET'
			}).success(function(data,header,config,status){
				$ionicLoading.hide();
				$scope.data = data;
			}).error(function(data,header,config,status){
				alert("测试错误");
			});
		}, 2000);
		$scope.logo ="https://gd1.alicdn.com/bao/uploaded/i1/28472109/TB2jBkzlpXXXXX8XXXXXXXXXXXX_!!28472109.jpg_400x400.jpg_.webp",
		$scope.name ="零度摄影",
		$scope.location ="深圳",
		$scope.popular ="99999",
		$scope.sales ="99999",
		$scope.star ="",
		$scope.selectName_1 = "",
		$scope.selectName_2 = "select",
		// 分类
		$scope.serviceName = "服务分类",
		$scope.classList = ["模拍","静拍","摄影师","其他","全部服务"],
		// 产品列表
		$scope.list = [],
		// 机构详情
		$scope.setUpTime = "2013年9月",
		$scope.address = "深圳龙岗区龙翔大道西荷光路5号A栋208室",
		$scope.introduction = "本公司是一家资深的广告摄影机构,一直专注于时装摄影、广告摄影，拥有强大的摄影团队，凭籍在广告影领域出类拔萃的创作实力，赢得了众多知名品牌及淘宝商家的广泛信赖，在业内享有较高的知名度和美誉度",
		$scope.serviceProject = ["淘宝摄影","服装拍摄","定时拍摄"],
		$scope.honoraryCertificate = {},
		$scope.siteConfiguration = {},
		$scope.merchants = {},
		// 判断参数
		$scope.honorToggle = true,
		$scope.siteToggle = true,
		$scope.cooperationToggle = true,
		$scope.serviceHide = false,
		$scope.institutionsHide = true,
		$scope.serviceList = true,
		$scope.ion = ["","",""],
		// 底部滑动框信息
		$scope.bookmark = "1",
		/*$scope.logo = $scope.data.logo || "",
		$scope.name = $scope.data.name || "",
		$scope.location = $scope.data.location || "",
		$scope.popular = $scope.data.popular || "",
		$scope.sales = $scope.data.sales || "",
		$scope.star = $scope.data.star || "",
		$scope.selectName_1 = $scope.data.selectName_1 || "",
		$scope.selectName_2 = $scope.data.selectName_2 || "",
		// 分类
		$scope.serviceName = $scope.data.serviceName || "",
		$scope.classList = $scope.data.classList || [],
		// 产品列表
		$scope.list = $scope.data.list || [],
		// 机构详情
		$scope.setUpTime = $scope.data.setUpTime || "",
		$scope.address = $scope.data.address || "",
		$scope.introduction = $scope.data.introduction || "",
		$scope.serviceProject = $scope.data.serviceProject || [],
		$scope.honoraryCertificate = $scope.data.honoraryCertificate || {},
		$scope.siteConfiguration = $scope.data.siteConfiguration || {},
		$scope.merchants = $scope.data.merchants || {},
		// 判断参数
		$scope.honorToggle = true,
		$scope.siteToggle = true,
		$scope.cooperationToggle = true,
		$scope.serviceHide = false,
		$scope.institutionsHide = true,
		$scope.serviceList = true,
		$scope.ion = ["","",""],
		// 底部滑动框信息
		$scope.bookmark = "1",*/
		// 函数设定
		$scope.service = function(){
			$scope.serviceHide = false;
			$scope.institutionsHide = true;
			$scope.selectName_1 = "";
			$scope.selectName_2 = "select";
			$scope.serviceList ? $scope.serviceList = false : $scope.serviceList = true;
		},
		$scope.institutions = function(){
			$scope.serviceHide = true;
			$scope.institutionsHide = false;
			$scope.serviceList = true;
			$scope.selectName_1 = "select";
			$scope.selectName_2 = "";
		},
		$scope.itemListFun = function(name){
			$scope.serviceName = name || "服务分类";
			$scope.serviceList = true;
		},
		$scope.honorToggleFun = function(){
			$scope.honorToggle ? $scope.honorToggle = false : $scope.honorToggle = true
			$scope.ion[0] == "" ? $scope.ion[0] = "ionAni" : $scope.ion[0] = "";
		},
		$scope.siteToggleFun = function(){
			$scope.siteToggle ? $scope.siteToggle = false : $scope.siteToggle = true;
			$scope.ion[1] == "" ? $scope.ion[1] = "ionAni" : $scope.ion[1] = "";
		},
		$scope.cooperationToggleFun = function(){
			$scope.cooperationToggle ? $scope.cooperationToggle = false : $scope.cooperationToggle = true;
			$scope.ion[2] == "" ? $scope.ion[2] = "ionAni" : $scope.ion[2] = "";
		},
		$scope.loadMore = function(){
			/*每次加载管后台要数据,按条数.*/
			for (var i = 0; i < 8; i++) {
				$scope.list.push({
					pic : "https://gd1.alicdn.com/bao/uploaded/i1/28472109/TB2jBkzlpXXXXX8XXXXXXXXXXXX_!!28472109.jpg_400x400.jpg_.webp",
					title : "韩国模特",
					need : "1件起拍",
					price : "120/件",
					cm : true,
					href : 123
				});
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		},
		$scope.scrollTop = function(){
			$scope.scrollTop();
		},
	    $scope.consultingShow = function() {
	        var hideSheet = $ionicActionSheet.show({
	        	cssClass:'consult',
	        	buttons : [
		        	{text: '拨打电话'},
		        	{text: '在线咨询'}
	        	],
	            cancelText: '取消',
	            /*cancel: function() {
	                 // add cancel code..
	               },*/
	            buttonClicked: function(index) {
	              switch(index){
	              	case 0:
	              	$scope.loginPrompt();
	              	break;
	              	case 1:
	              	$scope.loginPrompt();
	              	break;
	              	default:
	              	break;
	              }
	              return true;
	            }
	        });
	        /*$timeout(function() {
	            hideSheet();
	        }, 2000);*/
	    },
	    $scope.loginPrompt = function(){
	    	var confirmPopup = $ionicPopup.confirm({
               template:'您还没有登陆哦，是否登陆查看？',
               cssClass:'loginPrompt',
               buttons: [
	              { text: '留在此页' },
	              {
	                text: '现在登陆',
	                // type: 'button-positive',
	                onTap: function() {
	                	window.location.href = "http://baidu.com";
	                }
	              }
	            ]
             });

             // confirmPopup.then(function(res) {
             //   if(res) {
             //     console.log('You are sure');
             //   } else {
             //     console.log('You are not sure');
             //   }
             // });
	    },
	    $scope.markPopup = function(){
	    	if ($scope.bookmark) {
	    		var title = "收藏成功";
	    		$scope.bookmark = 0;
	    	}else{
	    		var title = "已取消收藏";
	    		$scope.bookmark = 1;
	    	}
	    	var myPopup = $ionicPopup.show({
        	  title: title,
        	  cssClass:'bookmark',
        	});

        	$timeout(function() {
        	   myPopup.close(); // 2秒后关闭弹窗
        	}, 2000);
	    },
	    $scope.backGo = function(){
	    	window.history.back();	
	    },
	    $scope.share = function(){
	    	var hideSheet = $ionicActionSheet.show({
	        	buttons : [
		        	{text: '<i class="ion-cloud"></i>微博'},
		        	{text: '<i class="ion-cloud"></i>微信好友'},
		        	{text: '<i class="ion-cloud"></i>朋友圈'}
	        	],
	        	cssClass : 'sharePop',
	            cancelText: '取消',
	            /*cancel: function() {
	                 // add cancel code..
	               },*/
	            buttonClicked: function(index) {
	              switch(index){
	              	case 0:
	              	console.log("微博");
	              	break;
	              	case 1:
	              	console.log("微信好友");
	              	break;
	              	case 2:
	              	console.log("朋友圈");
	              	break;
	              	default:
	              	break;
	              }
	            }
	        })
	    }

	}])
})