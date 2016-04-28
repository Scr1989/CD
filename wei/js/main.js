var app = angular.module('myApp', ['ngRoute','materialDatePicker','angularUtils.directives.dirPagination','ipCookie','angular-md5']);
app.config(function($routeProvider){
    $routeProvider.
    when('/orderList', {
        controller: 'orderList',
        templateUrl: 'view/orderList.html'
    }).
    when('/accountList', {
        controller: 'accountList',
        templateUrl: 'view/accountList.html'
    }).
    when('/aGoodsList', {
        controller: 'aGoodsList',
        templateUrl: 'view/aGoodsList.html'
    }).
    when('/dealList', {
        controller: 'dealList',
        templateUrl: 'view/dealList.html'
    }).otherwise({
        redirectTo: '/'
    });
});
app.controller('myCtrl', ['$scope','$http','$location','ipCookie','md5',function($scope,$http,$location,ipCookie,md5) {
    $scope.userName = ipCookie("usernameCookie"),
    $scope.userType = ipCookie("type"),
    $scope.userQuit = function(){
        if(confirm("是否确认退出")){
            ipCookie.remove("operatorId"),
            ipCookie.remove("balance"),
            ipCookie.remove("goodsCount"),
            ipCookie.remove("openTime"),
            ipCookie.remove("operatorId"),
            ipCookie.remove("qq"),
            ipCookie.remove("remark"),
            ipCookie.remove("status"),
            ipCookie.remove("supperId"),
            ipCookie.remove("supplier"),
            ipCookie.remove("type"),
            ipCookie.remove("updateTime"),
            ipCookie.remove("weixin"),
            ipCookie.remove("goods_count"),
            ipCookie.remove("usernameCookie"),
            ipCookie.remove("passwordCookie"),
            ipCookie.remove("goodsList");
            window.location.href="index.html";
        }
    },
    $scope.userChange = {},
    $scope.userChange.a_password = ipCookie("passwordCookie"),
    $scope.userChange.account = ipCookie("usernameCookie"),
    $scope.userChange.weixin = ipCookie("weixin"),
    $scope.userChange.qq = ipCookie("qq"),
    $scope.selectName = ['','','',''],
    $scope.popshow = false,
    $scope.userUpChange = function(changeParams){
        if (changeParams.a_password != ipCookie("passwordCookie")) {
            changeParams.a_password = md5.createHash(changeParams.a_password+',vs/.1.~' || '');
        }
        changeParams.password = ipCookie("passwordCookie"),
        changeParams.operator_id = ipCookie("id"),
        changeParams.client = 2,
        changeParams.do = "edit",
        changeParams.id = ipCookie("id");
        if (!angular.isNumber(changeParams.qq*1)) {
            alert("请输入正确的QQ号")
            return;
        }
        $http.get( 'http://www.weixinbx.com/accountEditSubmit' ,{ params : changeParams }).then(function(result) {
            if (result.data.status == 1) {
                $scope.popshow =true;
                ipCookie("passwordCookie",changeParams.a_password,{expires:7}),
                ipCookie("weixin",changeParams.weixin,{expires:7}),
                ipCookie("qq",changeParams.qq,{expires:7}),
                location.reload();
            }else{
                alert(result.data.tips);
                location.reload();
            }
        });
    },
    $scope.person = function(){
        $scope.popshow = true;
        angular.element(document.getElementsByClassName('popbox')).ready(function(){
            angular.element(document.getElementsByClassName('popbox')[0]).css({"margin-top":"-"+document.getElementsByClassName('popbox')[0].offsetHeight/2+"px"});
        });
    },
    $scope.$on('selectName', function(event, data) {  
          $scope.selectName = data;  
     });
    $http.get( 'http://www.weixinbx.com/aGoodsList' ,{
            params: {
                password : ipCookie('passwordCookie'),
                operator_id : ipCookie('id'),
                client : '2'
            }
        }).then(function(result) {
            if (result.data.status == 1) {
                var list = result.data.list ? ( angular.isArray(result.data.list) ? result.data.list : [angular.fromJson(result.data.list)] ) : [];
                ipCookie('goodsList', list, { expires: 7 });
            }else{
                console.log(result.data.tips);
            }
    });

}]).run(function(ipCookie){
    if (!ipCookie('operatorId') &&  !ipCookie('usernameCookie') && !ipCookie('passwordCookie')) {
        alert("用户未登录!");
        window.location.href = "index.html";
    }
});
