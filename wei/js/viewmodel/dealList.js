app.controller('dealList',['$scope','$http','ipCookie',function($scope,$http,ipCookie){
    var timeFunClass =  new timeFun;
    var searchFunClass =  new searchFun;
    var pageObjClass =  new pageObj;
    $scope.beginTime = timeFunClass.beginTime,
    $scope.overTime = timeFunClass.overTime,
    $scope.trueTime = timeFunClass.trueTime,
    $scope.searchValue = searchFunClass.searchValue,
    $scope.searchFocus = searchFunClass.searchFocus,
    $scope.searchBlur = searchFunClass.searchBlur,
    $scope.allCheckValue = [],
    $scope.list = [],
    $scope.header = {
        monday: '一',
        tuesday: '二',
        wednesday: '三',
        thursday: '四',
        friday: '五',
        saturday: '六',
        sunday: '日',
    },
    $scope.data = {
        page : $scope.nowPage,
        line : $scope.usersPerPage,
        type : '',
        goods_id : '',
        search : $scope.searchValue,
        start_time : $scope.beginTime,
        end_time : $scope.overTime
    },
    $scope.url = 'http://www.weixinbx.com/dealList',
    $scope.totalUsers = pageObjClass.totalUsers,
    $scope.usersPerPage = pageObjClass.usersPerPage, //单页数量
    $scope.pagination = pageObjClass.pagination,
    $scope.nowPage = pageObjClass.nowPage,
    $scope.pageChanged = pageObjClass.pageChanged,
    $scope.getResultsPage = pageObjClass.getResultsPage,
    $scope.searchBtn = function(){
        $scope.trueTime($scope);
        $scope.searchValue == '输入UUID/买家旺旺/操作账号' ? $scope.data.search = '' : $scope.data.search = $scope.searchValue;
        if ($scope.beginTime == '开始时间' && $scope.overTime == '结束时间'){
            $scope.data.start_time = '';
            $scope.data.end_time = '';
        }else{
            $scope.data.start_time = $scope.beginTime;
            $scope.data.end_time = $scope.overTime;
        }
        $scope.getResultsPage(ipCookie,$http,$scope);
        if ($scope.beginTime == '' && $scope.overTime == ''){
            $scope.beginTime = '开始时间';
            $scope.overTime = '结束时间';
        }
    }
    if ($scope.list.length == 0) {
        $scope.searchBtn();
    }
    $scope.$emit('selectName',['','','','this']);
}]);