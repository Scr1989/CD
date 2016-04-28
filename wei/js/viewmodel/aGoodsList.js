app.controller('aGoodsList',['$scope','$http','ipCookie',function($scope,$http,ipCookie){
    var pageObjClass = new pageObj;
    var searchFunClass =  new searchFun;
    $scope.list = [],
    $scope.data = {  search : $scope.searchValue    },
    $scope.url = 'http://www.weixinbx.com/sGoodsList',
    $scope.totalUsers = pageObjClass.totalUsers,
    $scope.usersPerPage = pageObjClass.usersPerPage, //单页数量
    $scope.pagination = pageObjClass.pagination,
    $scope.nowPage = pageObjClass.nowPage,
    $scope.pageChanged = pageObjClass.pageChanged,
    $scope.getResultsPage = pageObjClass.getResultsPage,
    $scope.searchValue = searchFunClass.searchValue,
    $scope.searchFocus = searchFunClass.searchFocus,
    $scope.searchBlur = searchFunClass.searchBlur,
    $scope.searchBtn = function(){
        $scope.searchValue == '输入UUID/买家旺旺/操作账号' ? $scope.data.search = '' : $scope.data.search = $scope.searchValue;
        $scope.getResultsPage(ipCookie,$http,$scope);
        ipCookie('goodsList',$scope.list,{ expires: 7 });
    },
    $scope.upChange = function(changeParams){
        if (changeParams.do == "add" || changeParams.do == "edit") {
            if (!changeParams.goods_name) {
                alert("请输入商品名");
                return false;
            }
            if (!changeParams.cost || isNaN(changeParams.cost)) {
                alert("请输入正确的成本价");
                return false;
            }
        }
        changeParams.password = ipCookie('passwordCookie'),
        changeParams.operator_id = ipCookie('id'),
        changeParams.client = 2;
        $http.get( 'http://www.weixinbx.com/goodsSubmit' ,{ params : changeParams }).then(function(result) {
            if (result.data.status == 1) {
                console.log(result.data.tips);
                $scope.popshow =true;
                $scope.getResultsPage(ipCookie,$http,$scope);
                ipCookie('goodsList',$scope.list,{ expires: 7 });
                location.reload();
            }else{
                alert(result.data.tips);
                location.reload();
            }
        });
    }
    $scope.popshow = true,
    $scope.doWhat = {},
    $scope.addBtnClick = function(doWhat,item){
        switch(doWhat){
            case 'add':
                $scope.doWhat.edit = false;
                $scope.doWhat.delete = false;
                $scope.doWhat.add = true;
                $scope.doWhat.params = {},
                $scope.doWhat.params.do = 'add',
                $scope.doWhat.params.goods_name = '',
                $scope.doWhat.params.cost = '';
            break;
            case 'edit':
                $scope.doWhat.add = false;
                $scope.doWhat.delete = false;
                $scope.doWhat.edit = true;
                $scope.doWhat.params = {},
                $scope.doWhat.params.do = 'edit',
                $scope.doWhat.params.id = item.goodsId,
                $scope.doWhat.params.goods_name = item.goodsName,
                $scope.doWhat.params.cost = item.cost;
            break;
            case 'delete':
                $scope.doWhat.add = false;
                $scope.doWhat.edit = false;
                $scope.doWhat.delete = true;
                $scope.doWhat.params = {},
                $scope.doWhat.params.do = 'delete',
                $scope.doWhat.params.id = item.goodsId;
            break;
        }
        $scope.popshow =false;
        angular.element(document.getElementsByClassName('popbox')).ready(function(){
            angular.element(document.getElementsByClassName('popbox')[0]).css({"margin-top":"-"+document.getElementsByClassName('popbox')[0].offsetHeight/2+"px"});
        });
    }
    if ($scope.list.length == 0) {
        $scope.getResultsPage(ipCookie,$http,$scope);
    }
    $scope.$emit('selectName',['','','this','']);
}]);