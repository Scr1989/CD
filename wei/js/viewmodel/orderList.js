app.controller('orderList',['$scope','$http','ipCookie',function($scope,$http,ipCookie){
    var timeFunClass =  new timeFun;
    var searchFunClass =  new searchFun;
    var pageObjClass =  new pageObj;
    $scope.beginTime = timeFunClass.beginTime,
    $scope.overTime = timeFunClass.overTime,
    $scope.trueTime = timeFunClass.trueTime,
    $scope.searchValue = searchFunClass.searchValue,
    $scope.searchFocus = searchFunClass.searchFocus,
    $scope.searchBlur = searchFunClass.searchBlur;
    $scope.goodList = ipCookie("goodsList");
    $scope.goodList = ipCookie("goodsList"),
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
    $scope.url = 'http://www.weixinbx.com/orderList',
    $scope.totalUsers = pageObjClass.totalUsers,
    $scope.usersPerPage = pageObjClass.usersPerPage, //单页数量
    $scope.pagination = pageObjClass.pagination,
    $scope.nowPage = pageObjClass.nowPage,
    $scope.pageChanged = pageObjClass.pageChanged,
    $scope.getResultsPage = pageObjClass.getResultsPage,
    $scope.data = {
        status : '0',
        type : '0',
        search : $scope.searchValue,
        page : $scope.nowPage,
        line : $scope.usersPerPage,
        channel_market : '0',
        export_status : '0',
        begin_time : $scope.beginTime,
        end_time : $scope.overTime,
    },
    $scope.searchBtn = function(){
        $scope.trueTime($scope);
        $scope.searchValue == '输入UUID/买家旺旺/操作账号' ? $scope.data.search = '' : $scope.data.search = $scope.searchValue;
        if ($scope.beginTime == '开始时间' && $scope.overTime == '结束时间'){
            $scope.data.begin_time = '';
            $scope.data.end_time = '';
        }else{
            $scope.data.begin_time = $scope.beginTime;
            $scope.data.end_time = $scope.overTime;
        }
        $scope.getResultsPage(ipCookie,$http,$scope);
        if ($scope.beginTime == '' && $scope.overTime == ''){
            $scope.beginTime = '开始时间';
            $scope.overTime = '结束时间';
        }
    },
    $scope.outThing = function(enterKey){
        var active = angular.element(document.getElementsByClassName("active"));
        var ids = '';
        if (!active[0]) {
            alert("请选择订单");
            return;
        }
        angular.forEach(active,function(value, key){
            ids += angular.element(value).find("input").val();
            if (key != (active.length-1)) {
                ids += '|';
            }
        });
        if (enterKey == 'UDID') {
            var paramsAll = {
                password : ipCookie('passwordCookie'),
                operator_id : ipCookie('id'),
                client : 2 ,
                ids : ids
            }
        }
        if (enterKey == 'wangwang') {
            var paramsAll = {
                password : ipCookie('passwordCookie'),
                operator_id : ipCookie('id'),
                client : 2 ,
                export_wangwang : 1,
                ids : ids
            }

        };
        $http.post( 'http://www.weixinbx.com/batchExport' ,{},{
            params : paramsAll
        }).then(function(result) {
            if (result.status == 200) {
                var newTab=window.open('about:blank');
                newTab.location.href= result.data;
                location.reload();
            }
        });
    },
    $scope.urlBl = false,
    $scope.updownLoad = function(){
        var active = angular.element(document.getElementsByClassName("active"));
        if (!active[0]) {
            alert("请选择订单");
            return;
        }
        $scope.doWhat.add = false;
        $scope.doWhat.edit = false;
        $scope.popshow = false;
        $scope.urlBl  = true;
        angular.element(document.getElementsByClassName('popbox')).ready(function(){
            angular.element(document.getElementsByClassName('popbox')[0]).css({"margin-top":"-"+document.getElementsByClassName('popbox')[0].offsetHeight/2+"px"});
        });
    },
    $scope.setDownLoad = function(url){
        $scope.popshow = true;
        $scope.urlBl  = false;
        var active = angular.element(document.getElementsByClassName("active"));
        var ids = '';
        angular.forEach(active,function(value, key){
            ids += angular.element(value).find("input").val();
            if (key != (active.length-1)) {
                ids += '|';
            }
        });
        $http.post( 'http://www.weixinbx.com/settingsDownloadUrls' ,{
            data : {
                download_urls : url
            }
        },{ 
            params : {
                password : ipCookie('passwordCookie'),
                operator_id : ipCookie('id'),
                client : 2,
                download_urls : url,
                ids : ids
            }
        }).then(function(result) {
            // console.log(result)
            if (result.status == 200) {
                alert(result.data);
                location.reload();
            }
        });
    },
    $scope.upChange = function(changeParams){
        if (!angular.isNumber(changeParams.sum*1)) {
            alert("请输入正确的销售价格")
            return;
        }
        if (changeParams.udid.length != 36 && changeParams.udid.length != 40) {
            alert("请输入正确的UDID")
            return;
        }
        if (!changeParams.wangwang) {
            alert("请输入正确的旺旺名")
            return;
        }
        if (!changeParams.type) {
            alert("请选择正确的商品")
            return;
        }
        if (!changeParams.market_channel) {
            alert("请选择正确的销售途径")
            return;
        }
        changeParams.password = ipCookie('passwordCookie'),
        changeParams.operator_id = ipCookie('id'),
        changeParams.client = 1;
        $http.get( 'http://www.weixinbx.com/orderEditSubmit' ,{ params : changeParams }).then(function(result) {
            if (result.data.status == 1) {
                $scope.popshow =true;
                $scope.getResultsPage(ipCookie,$http,$scope);
            }else{
                alert(result.data.tips);
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
                $scope.doWhat.add = true,
                $scope.doWhat.params = {},
                // $scope.doWhat.params.do = 'add',
                $scope.doWhat.params.doWhat = 'add',
                $scope.doWhat.params.udid = '',
                $scope.doWhat.params.wangwang = '',
                $scope.doWhat.params.sum = '',
                $scope.doWhat.params.type = '',
                $scope.doWhat.params.market_channel = '',
                $scope.doWhat.params.cost = '';
                $scope.doWhat.change = function(x){
                    var index = $scope.goodList.indexOf(x);
                    angular.forEach($scope.goodList,function(value,key){
                        if (value.goodsId == x) {
                            $scope.doWhat.params.cost = value.cost;
                        }
                    });
                }
            break;
            case 'edit':
                $scope.doWhat.add = false;
                $scope.doWhat.edit = true;
                $scope.doWhat.params = {},
                // $scope.doWhat.params.do = 'edit',
                $scope.doWhat.params.doWhat = 'edit',
                $scope.doWhat.params.id = item.id || '',
                $scope.doWhat.params.udid = item.udid || '',
                $scope.doWhat.params.wangwang = item.wangwang || '',
                $scope.doWhat.params.sum = item.sum || '';
                angular.forEach($scope.goodList,function(value,key){
                    if (value.goodsName == item.goodsName) {
                        item.goodsId = value.goodsId;
                    }
                })
                $scope.doWhat.params.type = item.goodsId || '',
                $scope.doWhat.params.status = item.status || '',
                $scope.doWhat.params.cost = item.cost || '',
                $scope.doWhat.params.market_channel = item.marketChannel || '',
                $scope.doWhat.params.export_status = item.exportStatus || '',
                $scope.doWhat.params.download_url = item.downloadUrl || '';
            break;
        }
        angular.element(document.getElementsByClassName('popbox')).ready(function(){
            angular.element(document.getElementsByClassName('popbox')[0]).css({"margin-top":"-"+document.getElementsByClassName('popbox')[0].offsetHeight/2+"px"});
        });
    }
    if ($scope.list.length == 0) {
        $scope.searchBtn();
    }
    $scope.$emit('selectName',['this','','','']);
}]);