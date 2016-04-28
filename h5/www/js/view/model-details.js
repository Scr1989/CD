require(["ionic.bundle"],function(ionic) {
	var app= angular.module('ionicApp', ['ionic']);
	app.controller( 'model-details',['$scope','$ionicPopup','$ionicActionSheet','$timeout','$http','$ionicLoading','$location',function($scope,$ionicPopup,$ionicActionSheet,$timeout,$http,$ionicLoading,$location){
		var urlParams = $location.search();
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
		}, 2000)
		// 判断参数
		$scope.serviceHide = false,
		$scope.institutionsHide = true,
		$scope.selectName_1 = "select";
		$scope.selectName_2 = "";
		// 底部滑动框信息
		$scope.bookmark = "1",
		// 函数设定
		$scope.sample = function(){
			$scope.serviceHide = false;
			$scope.institutionsHide = true;
			$scope.selectName_1 = "select";
			$scope.selectName_2 = "";
		},
		$scope.service = function(){
			$scope.serviceHide = true;
			$scope.institutionsHide = false;
			$scope.selectName_1 = "";
			$scope.selectName_2 = "select";
		},




		$scope.loadMore = function(){
			/*每次加载管后台要数据,按条数.*/
			/*for (var i = 0; i < 8; i++) {
				$scope.list.push({
					pic : "https://gd1.alicdn.com/bao/uploaded/i1/28472109/TB2jBkzlpXXXXX8XXXXXXXXXXXX_!!28472109.jpg_400x400.jpg_.webp",
					title : "韩国模特",
					need : "1件起拍",
					price : "120/件",
					cm : true,
					href : 123
				});
			}*/
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
	    },
	    $scope.loginPrompt = function(){
	    	var confirmPopup = $ionicPopup.confirm({
               template:'您还没有登陆哦，是否登陆查看？',
               cssClass:'loginPrompt',
               buttons: [
	              { text: '留在此页' },
	              {
	                text: '现在登陆',
	                onTap: function() {
	                	window.location.href = "http://baidu.com";
	                }
	              }
	            ]
             });
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
	    	console.log("后退");
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