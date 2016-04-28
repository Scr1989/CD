var app = angular.module('myApp', ['angular-md5','ipCookie']);
app.controller('myCtrl', ['$scope','md5','ipCookie','$http',function($scope,md5,ipCookie,$http) {
    $scope.login = function(){
        if ($scope.passname == "") {
            alert("请输入账号");
            return false;
        }
        if ($scope.password == "") {
            alert("请输入密码")
            return false;
        }
        if (ipCookie("password") && ipCookie("username") == $scope.passname) {
            var md5Password = ipCookie("passwordCookie");
        }else{
            var md5Password = md5.createHash($scope.password+',vs/.1.~' || '');
        }
        $scope.param = {
            user_name: $scope.passname,
            password: md5Password,
            client:2
        },
        $scope.url = 'http://www.weixinbx.com/managerLogin',
        $http.get($scope.url,{
            params : $scope.param
        }).then(function(result){
            if (result.data.status == 1) {
                ipCookie.remove("username");
                ipCookie.remove("password");
                if ($scope.nameCheck) {
                    ipCookie("username", $scope.passname, { expires: 30 });
                }

                if ($scope.wordCheck) {
                    $scope.password = $scope.password.replace(/\w{1}/g,"*");
                    ipCookie("username", $scope.passname, { expires: 30 });
                    ipCookie("password", $scope.password, { expires: 30 });
                }
                if (result.data.user_info.status == 2) {
                    alert("该账户已冻结,请联系客服!");
                    return false;
                }
                ipCookie.remove("id"),
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
                ipCookie.remove("passwordCookie");
                // 用户ID
                ipCookie("id",result.data.user_info.id,{expires:7});
                // 用户余额
                ipCookie("balance",result.data.user_info.balance,{expires:7});
                // 商品剩余件数
                ipCookie("goodsCount",result.data.user_info.goodsCount,{expires:7});
                // 开通时间
                ipCookie("openTime",result.data.user_info.openTime,{expires:7});
                // 开通人ID
                ipCookie("operatorId",result.data.user_info.operatorId,{expires:7});
                // qq
                ipCookie("qq",result.data.user_info.qq,{expires:7});
                // 备注
                ipCookie("remark",result.data.user_info.remark,{expires:7});
                // 账号状态 1-开通状态 2-冻结状态 冻结的账号不可以有任何操作
                ipCookie("status",result.data.user_info.status,{expires:7});
                // 上级ID
                ipCookie("supperId",result.data.user_info.supperId,{expires:7});
                // 是否是供货商
                ipCookie("supplier",result.data.user_info.supplier,{expires:7});
                // 账号类型  -2:终级管理员  -1:供货商  1：特级分销商 2：分销商
                ipCookie("type",result.data.user_info.type,{expires:7});
                // 修改时间
                ipCookie("updateTime",result.data.user_info.updateTime,{expires:7});
                // 微信号
                ipCookie("weixin",result.data.user_info.weixin,{expires:7});
                // 该账户下的所有商品总和
                ipCookie("goods_count",result.data.goods_count,{expires:7});
                // 用户账号
                ipCookie("usernameCookie",result.data.user_info.account,{expires:7});
                // 用户密码
                ipCookie("passwordCookie",result.data.user_info.password,{expires:7});
                window.location.href="main.html";
            }else{
                alert(result.data.tips);
                $scope.passname = '';
                $scope.password = '';
            }
        });
    }
    if (ipCookie("username")) {
        $scope.passname = ipCookie("username");
        $scope.nameCheck = true;
    }
    if (ipCookie("password")) {
        $scope.passname = ipCookie("username");
        $scope.password = ipCookie("password");
        $scope.nameCheck = true;
        $scope.wordCheck = true;
    }
}])