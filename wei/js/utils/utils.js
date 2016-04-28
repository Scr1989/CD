var timeFun = function () {
    return {
        beginTime : '开始时间',
        overTime : '结束时间',
        trueTime : function($scope){
            // 时间提交验证
            var trueText = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
            if ($scope.beginTime == '开始时间' && $scope.overTime == '结束时间'){
                $scope.beginTime = '';
                $scope.overTime = '';
                return false;
            }
            if ($scope.beginTime == '开始时间' || !$scope.beginTime.match(trueText)) {
                alert("请输入正确的时间");
                return false;
            }
            if ($scope.overTime == '结束时间' ||!$scope.overTime.match(trueText)) {
                alert("请输入正确的时间");
                return false;
            }
            
            var b = new Date($scope.beginTime);
            var o = new Date($scope.overTime);
            b = b.getTime();
            o = o.getTime();
            if (b > o) {
                alert("结束时间不能小于开始时间");
            }
        }
    };
}
var searchFun = function(){
   return {
        searchValue : '输入UUID/买家旺旺/操作账号',
        searchFocus : function(){
            if (this.searchValue == '输入UUID/买家旺旺/操作账号') {
                this.searchValue = '';
            }
        },
        searchBlur : function(){
            if (this.searchValue == '') {
                this.searchValue = '输入UUID/买家旺旺/操作账号';
            }
        }
    };
}
var pageObj = function(){
    return {
        totalUsers : 0,
        usersPerPage : 100,
        pagination : {current:1},
        nowPage : 1,
        pageChanged : function(newPage){
            this.nowPage = newPage;
            this.getResultsPage();
        },
        getResultsPage : function(ipCookie,$http,$scope) {
            $scope.data.password = ipCookie('passwordCookie'),
            $scope.data.operator_id = ipCookie('id'),
            $scope.data.client = '2';
            // 获取列表
            $http.get( $scope.url ,{
                    params: $scope.data
                }).then(function(result) {
                    if (result.data.status == 1) {
                        $scope.list = result.data.list ? ( angular.isArray(result.data.list) ? result.data.list : [angular.fromJson(result.data.list)] ) : [];
                        $scope.totalUsers = result.data.count || 0;
                    }else{
                        alert(result.data.tips);
                    }
            });
        }
    }
}
var getGoodsList = function($http,ipCookie){
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
}