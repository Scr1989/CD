app.controller('accountList',['$scope','$http','ipCookie','md5',function($scope,$http,ipCookie,md5){
    $scope.userType = ipCookie("type");
    var searchFunClass =  new searchFun;
    var pageObjClass =  new pageObj;
    // var timeFunClass = new timeFun;
    $scope.searchValue = searchFunClass.searchValue,
    $scope.searchFocus = searchFunClass.searchFocus,
    $scope.searchBlur = searchFunClass.searchBlur,
    // $scope.beginTime = timeFunClass.beginTime,
    // $scope.overTime = timeFunClass.overTime,
    // $scope.trueTime = timeFunClass.trueTime,
    $scope.goodList = ipCookie("goodsList"),
    $scope.allCheckValue = [],
    $scope.list = [],
    // $scope.header = {
    //     monday: '一',
    //     tuesday: '二',
    //     wednesday: '三',
    //     thursday: '四',
    //     friday: '五',
    //     saturday: '六',
    //     sunday: '日',
    // },
    $scope.data = {
        page : $scope.nowPage,
        line : $scope.usersPerPage,
        status : '0',
        search : $scope.searchValue
    },
    $scope.url = 'http://www.weixinbx.com/accountList',
    $scope.totalUsers = pageObjClass.totalUsers,
    $scope.usersPerPage = pageObjClass.usersPerPage, //单页数量
    $scope.pagination = pageObjClass.pagination,
    $scope.nowPage = pageObjClass.nowPage,
    $scope.pageChanged = pageObjClass.pageChanged,
    $scope.getResultsPage = pageObjClass.getResultsPage,
    $scope.upChange = function(changeParams){
        var reg = /(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}/;
        if (changeParams.account.match(reg) == null) {
            alert("请输入正确的手机账号");
            return false;
        }
        if (!changeParams.account) {
            alert("请输入账号用户名");
            return false;
        }
        if (!changeParams.a_password) {
            alert("请输入账号密码");
            return false;
        }
        if (!changeParams.status) {
            alert("请选择账号状态");
            return false;
        }
        if (changeParams.do == 'add') {
            if (!changeParams.type) {
                alert("请选择账号类型");
                return false;
            }
        }
        if (isNaN(changeParams.qq)) {
            alert("请输入正确的QQ")
            return false;
        }
        
        var goods_ids = '';
        var costs = '';
        var costsBool = {
            add : true,
            edit : true
        };
        angular.forEach($scope.goodList,function(value,key){
            if (changeParams.do == 'add') {
                if (!changeParams.costs[key] || isNaN(changeParams.costs[key])) {
                    costsBool.add = false;
                }
            }
            if (changeParams.do == 'edit') {
                if (changeParams.costs[key]) {
                    if (isNaN(changeParams.costs[key])) {
                        costsBool.edit = false;
                    }
                }
            }
            
            if (changeParams.costs[key] && key < ($scope.goodList.length-1)) {
                goods_ids += value.goodsId + '|';
                costs += changeParams.costs[key] + '|';
            }else if(changeParams.costs[key]){
                goods_ids += value.goodsId;
                costs += changeParams.costs[key];
            }
        });
        if (!costsBool.add) {
            alert("请输入正确的商品价格");
            return false;
        }
        if (!costsBool.edit) {
            alert("请输入正确的商品价格");
            return false;
        }
        if (changeParams.a_password != changeParams.b_password) {
            changeParams.a_password = md5.createHash(changeParams.a_password+',vs/.1.~' || '');
        }else{
            changeParams.a_password = '';
        }
        changeParams.password = ipCookie('passwordCookie'),
        changeParams.operator_id = ipCookie('id'),
        changeParams.client = 2;
        changeParams.goods_ids = goods_ids;
        changeParams.costs = costs;
        $http.get( 'http://www.weixinbx.com/accountEditSubmit' ,{ params : changeParams }).then(function(result) {
            if (result.data.status == 1) {
                $scope.popshow =true;
                $scope.getResultsPage(ipCookie,$http,$scope);
                location.reload();
            }else{
                alert(result.data.tips);
                location.reload();
            }
        });
    }
    $scope.transferUpChange = function(changeParams){
        changeParams.password = ipCookie('passwordCookie'),
        changeParams.operator_id = ipCookie('id'),
        changeParams.client = 2;
        var a_goods_ids = '';
        var counts = '';
        var countsbool = true;
        angular.forEach($scope.goodList,function(value,key){
            if (changeParams.counts[key] && isNaN(changeParams.counts[key])) {
                
                countsbool = false;
            }
            if (changeParams.counts[key] && key < ($scope.goodList.length-1)) {
                a_goods_ids += value.goodsId + ',';
                counts += changeParams.counts[key] + ',';
            }else if(changeParams.counts[key]){
                a_goods_ids += value.goodsId;
                counts += changeParams.counts[key];
            }
        });
        if (!countsbool) {
            alert("请输入正确的价格");
            return false;
        }
        if (!counts) {
            alert("请输入正确的商品转让个数");
            location.reload();
            return;
        }
        if(confirm("是否转让给"+changeParams.account) == false){
            location.reload();
            return;
        }
        
        changeParams.a_goods_ids = a_goods_ids;
        changeParams.counts = counts;
        $http.get( 'http://www.weixinbx.com/transfer' ,{ params : changeParams }).then(function(result) {
            if (result.data.status == 1) {
                $scope.popshow =true;
                $scope.getResultsPage(ipCookie,$http,$scope);
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
        $scope.popshow =false;
        switch(doWhat){
            case 'add':
                $scope.doWhat.edit = false,
                $scope.doWhat.transfer = false,
                $scope.doWhat.add = true,
                $scope.doWhat.params = {},
                $scope.doWhat.params.do = 'add',
                $scope.doWhat.params.type = '',
                $scope.doWhat.params.account = '',
                $scope.doWhat.params.a_password = '',
                $scope.doWhat.params.status = '',
                $scope.doWhat.params.remark = '',
                $scope.doWhat.params.weixin = '',
                $scope.doWhat.params.qq = '';
                // $scope.doWhat.params.goods_ids = '',
                $scope.doWhat.params.costs = [];
                angular.forEach($scope.goodList,function(value,key){
                    if (value.cost) {
                        $scope.doWhat.params.costs[key] = value.cost;
                    }
                });
            break;
            case 'edit':
                $scope.doWhat.add = false,
                $scope.doWhat.transfer = false,
                $scope.doWhat.edit = true,
                $scope.doWhat.params = {},
                $scope.doWhat.params.do = 'edit',
                $scope.doWhat.params.id = item.id || '',
                $scope.doWhat.params.account = item.account || '',
                $scope.doWhat.params.a_password = item.password || '',
                $scope.doWhat.params.b_password = item.password || '',
                $scope.doWhat.params.status = item.status || '',
                $scope.doWhat.params.remark = item.remark || '',
                $scope.doWhat.params.weixin = item.weixin || '',
                $scope.doWhat.params.qq = item.qq || '';
                // $scope.doWhat.params.goods_ids = '',
                $scope.doWhat.params.costs = [];
                /*angular.forEach($scope.goodList,function(value,key){
                    if (value.cost) {
                        $scope.doWhat.params.costs[key] = value.cost;
                    }
                });*/
            break;
            case 'transfer':
                $scope.doWhat.add = false,
                $scope.doWhat.edit = false,
                $scope.doWhat.transfer = true,
                $scope.doWhat.params = {},
                $scope.doWhat.params.account = item.account || '',
                $scope.doWhat.params.transfer_id = item.id || '';
                $scope.doWhat.params.counts = [];
            break;
        }
        angular.element(document.getElementsByClassName('popbox')).ready(function(){
            angular.element(document.getElementsByClassName('popbox')[0]).css({"margin-top":"-"+document.getElementsByClassName('popbox')[0].offsetHeight/2+"px"});
        });
    },
    $scope.searchBtn = function(){
        // $scope.trueTime();
        $scope.searchValue == '输入UUID/买家旺旺/操作账号' ? $scope.data.search = '' : $scope.data.search = $scope.searchValue;
        // if ($scope.beginTime == '开始时间' && $scope.overTime == '结束时间'){
        //     $scope.data.beginTime = '';
        //     $scope.data.overTime = '';
        // }else{
        //     $scope.data.beginTime = $scope.beginTime;
        //     $scope.data.overTime = $scope.overTime;
        // }
        $scope.getResultsPage(ipCookie,$http,$scope);

    }
    if ($scope.list.length == 0) {
        $scope.searchBtn();
    }
    $scope.$emit('selectName',['','this','','']);

}]);