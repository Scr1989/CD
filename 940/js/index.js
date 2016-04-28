function bbb() {
	$('#dialogDiv').show();
}
function kz_time() {
    setTimeout("bbb()", 11000);
}
$(function() {
	 var unslider = $('.banner').unslider({
		speed: 500,               
		delay: 3000,              
		complete: function() {},  
		keys: false,               
		dots: true,               
		fluid: false              
	});
	$('.unslider-arrow').click(function() {
        var fn = this.className.split(' ')[1];
        unslider.data('unslider')[fn]();
    });
	$(".headtop .left a:eq(0)").click(function(){
		var ctrl=(navigator.userAgent.toLowerCase()).indexOf('mac')!=-1?'Command/Cmd': 'CTRL';
		  if(document.all){
		  	window.external.addFavorite('http://www.940.com', '940电商学院');
		  }else if(window.sidebar){
		   window.sidebar.addPanel(' 940电商学院 ', 'http://www.940.com', "");
		  }else{ 
		  alert('您可以通过快捷键' + ctrl + ' + D 加入到收藏夹');
		}
	});
	// 返回顶部
	$(".bottom_guanbi").click(function () {
		$('.bottombar').hide("slow",function(){
			$(".hui_top").animate({"bottom":"0px"});
		});
	})
	$(".hui_top").click(function () {
		var i = ($(document).scrollTop(), $("html,body"));
		i.animate({
			scrollTop: 0
		})
	})
	// 标签三组
	$(".ownstrength .slidebox .nav li").hover(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".ownstrength .slidebox .box li").stop(true).eq($(this).index()).fadeIn('fast').siblings().stop(true).fadeOut('fast');
	})
	var lecturerFirst = true;
	$(".lecturer .slidebox .nav li").hover(function(event){
		$(this).addClass("active").siblings().removeClass("active");
		if (lecturerFirst) {
			lecturerFirst = false;
			$(".boxbefore").fadeOut('fast').hide();
			$(".lecturer .slidebox .box").fadeIn('fast').show();
		}
		$(".lecturer .slidebox .box li").eq($(this).index()).stop(true).fadeIn('fast').siblings().stop(true).fadeOut('fast');
	})
	$(".family .content .nav li").hover(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".family .content .cont li").eq($(this).index()).show().siblings().hide();
	})
	function GetRandomNum(Min,Max){   
		var Range = Max - Min;   
		var Rand = Math.random();   
		return(Min + Math.round(Rand * Range));   
	}
	var trueName = ['赵','钱','孙','李','周','吴','郑','王','冯','陈','褚','卫','蒋','沈','韩','杨','朱','秦','尤','许','何','吕','施','张','孔','曹','严','华','金','魏','陶','姜','戚','谢','邹','喻','柏','水','窦','章','云','苏','潘','葛','奚','范','彭','郎','鲁','韦','昌','马','苗','凤','花','方','俞','任','袁','柳','酆','鲍','史','唐','费','廉','岑','薛','雷','贺','倪','汤','滕','殷','罗','毕','郝','邬','安','常','乐','于','时','傅','皮','卞','齐','康','伍','余','元','卜','顾','孟','平','黄','和','穆','萧','尹','姚','邵','湛','汪','祁','毛','禹','狄','米','贝','明','臧','计','伏','成','戴','谈','宋','茅','庞','熊','纪','舒','屈','项','祝','董','梁','杜','阮','蓝','闵','席','季','麻','强','贾','路','娄','危','江','童','颜','郭','梅','盛','林','刁','钟','徐','邱','骆','高','夏','蔡','田','樊','胡','凌','霍','虞','万','支','柯','昝','管','卢','莫','经','房','裘','缪','干','解','应','宗','丁','宣','贲','邓','郁','单','杭','洪','包','诸','左','石','崔','吉','钮','龚','程','嵇','邢','滑','裴','陆','荣','翁','荀','羊','于','惠','甄','曲','家','封','芮','羿','储','靳','汲','邴','糜','松','井','段','富','巫','乌','焦','巴','弓','牧','隗','山','谷','车','侯','宓','蓬','全','郗','班','仰','秋','仲','伊','宫','宁','仇','栾','暴','甘','钭','厉','戎','祖','武','符','刘','景','詹','束','龙','叶','幸','司','韶','郜','黎','蓟','溥','印','宿','白','怀','蒲','邰','从','鄂','索','咸','籍','赖','卓','蔺','屠','蒙','池','乔','阴','郁','胥','能','苍','双','闻','莘','党','翟','谭','贡','劳','逄','姬','申','扶','堵','冉','宰','郦','雍','却','璩','桑','桂','濮','牛','寿','通','边','扈','燕','冀','浦','尚','农','温','别','庄','晏','柴','瞿','阎','充','慕','连','茹','习','宦','艾','鱼','容','向','古','易','慎','戈','廖','庾','终','暨','居','衡','步','都','耿','满','弘','匡','国','文','寇','广','禄','阙','东','欧','殳','沃','利','蔚','越','夔','隆','师','巩','厍','聂','晁','勾','敖','融','冷','訾','辛','阚','那','简','饶','空','曾','毋','沙','乜','养','鞠','须','丰','巢','关','蒯','相','查','后','荆','红','游','郏','竺','权','逯','盖','益','桓','公','仉','督','岳','帅','缑','亢','况','郈','有','琴','归','海','晋','楚','闫','法','汝','鄢','涂','钦','商','牟','佘','佴','伯','赏','墨','哈','谯','篁','年','爱','阳','佟','言','福','南','火','铁','迟','漆','官','冼','真','展','繁','檀','祭','密','敬','揭','舜','楼','疏','冒','浑','挚','胶','随','高','皋','原','种','练','弥','仓','眭','蹇','覃','阿','门','恽','来','綦','召','仪','风','介','巨','木','京','狐','郇','虎','枚','抗','达','杞','苌','折','麦','庆','过','竹','端','鲜','皇','亓','老','是','秘','畅','邝','还','宾','闾','辜','纵','侴'];
	var cityArray = new Array(); //定义 城市 数据数组
	cityArray[0] = new Array("北京","东城|西城|崇文|宣武|朝阳|丰台|石景山|海淀|门头沟|房山|通州|顺义|昌平|大兴|平谷|怀柔|密云|延庆");
	cityArray[1] = new Array("上海","黄浦|卢湾|徐汇|长宁|静安|普陀|闸北|虹口|杨浦|闵行|宝山|嘉定|浦东|金山|松江|青浦|南汇|奉贤|崇明");
	cityArray[2] = new Array("天津","和平|东丽|河东|西青|河西|津南|南开|北辰|河北|武清|红挢|塘沽|汉沽|大港|宁河|静海|宝坻|蓟县");
	cityArray[3] = new Array("重庆","万州|涪陵|渝中|大渡口|江北|沙坪坝|九龙坡|南岸|北碚|万盛|双挢|渝北|巴南|黔江|长寿|綦江|潼南|铜梁 |大足|荣昌|壁山|梁平|城口|丰都|垫江|武隆|忠县|开县|云阳|奉节|巫山|巫溪|石柱|秀山|酉阳|彭水|江津|合川|永川|南川");
	cityArray[4] = new Array("河北","石家庄|邯郸|邢台|保定|张家口|承德|廊坊|唐山|秦皇岛|沧州|衡水");
	cityArray[5] = new Array("山西","太原|大同|阳泉|长治|晋城|朔州|吕梁|忻州|晋中|临汾|运城");
	cityArray[6] = new Array("江苏","南京|镇江|苏州|南通|扬州|盐城|徐州|连云港|常州|无锡|宿迁|泰州|淮安");
	cityArray[7] = new Array("浙江","杭州|宁波|温州|嘉兴|湖州|绍兴|金华|衢州|舟山|台州|丽水");
	cityArray[8] = new Array("安徽","合肥|芜湖|蚌埠|马鞍山|淮北|铜陵|安庆|黄山|滁州|宿州|池州|淮南|巢湖|阜阳|六安|宣城|亳州");
	cityArray[9] = new Array("福建","福州|厦门|莆田|三明|泉州|漳州|南平|龙岩|宁德");
	cityArray[10] = new Array("江西","南昌市|景德镇|九江|鹰潭|萍乡|新馀|赣州|吉安|宜春|抚州|上饶");
	cityArray[11] = new Array("山东","济南|青岛|淄博|枣庄|东营|烟台|潍坊|济宁|泰安|威海|日照|莱芜|临沂|德州|聊城|滨州|菏泽");
	cityArray[12] = new Array("河南","郑州|开封|洛阳|平顶山|安阳|鹤壁|新乡|焦作|濮阳|许昌|漯河|三门峡|南阳|商丘|信阳|周口|驻马店|济源");
	cityArray[13] = new Array("湖北","武汉|宜昌|荆州|襄樊|黄石|荆门|黄冈|十堰|恩施|潜江|天门|仙桃|随州|咸宁|孝感|鄂州");
	cityArray[14] = new Array("湖南","长沙|常德|株洲|湘潭|衡阳|岳阳|邵阳|益阳|娄底|怀化|郴州|永州|湘西|张家界");
	cityArray[15] = new Array("广东","广州|深圳|珠海|汕头|东莞|中山|佛山|韶关|江门|湛江|茂名|肇庆|惠州|梅州|汕尾|河源|阳江|清远|潮州|揭阳|云浮");
	cityArray[16] = new Array("海南","海口|三亚");
	cityArray[17] = new Array("四川","成都|绵阳|德阳|自贡|攀枝花|广元|内江|乐山|南充|宜宾|广安|达川|雅安|眉山|甘孜|凉山|泸州");
	cityArray[18] = new Array("贵州","贵阳|六盘水|遵义|安顺|铜仁|黔西南|毕节|黔东南|黔南");
	cityArray[19] = new Array("云南","昆明|大理|曲靖|玉溪|昭通|楚雄|红河|文山|思茅|西双版纳|保山|德宏|丽江|怒江|迪庆|临沧");
	cityArray[20] = new Array("陕西","西安|宝鸡|咸阳|铜川|渭南|延安|榆林|汉中|安康|商洛");
	cityArray[21] = new Array("甘肃","兰州|嘉峪关|金昌|白银|天水|酒泉|张掖|武威|定西|陇南|平凉|庆阳|临夏|甘南");
	var cjHtml = '';
	var selltime = GetRandomNum(5,15);    
	for (var i = 0; i < 30; i++) {
		var firstNum = GetRandomNum(0,95);
		var SecNum = GetRandomNum(95,516);
		var cityNum = GetRandomNum(0,21);
		var city = cityArray[cityNum][1].split("|");

		var sellstr = selltime < 60 ? selltime+'秒前' : (selltime/60).toFixed(0)+'分钟前';
		cjHtml += '<li><div class="gund_md"><div style="color:#ff0000;display:inline;">['+cityArray[cityNum][0]+city[GetRandomNum(0,city.length-1)]+']</div>'+ sellstr +'，<div style="color:#ffbb00; display:inline;">'+trueName[firstNum]+'*'+trueName[SecNum]+'</div> 开店成功！</div></li>';
		selltime += GetRandomNum(30,60);
	};
	$("#aas1 ul").html(cjHtml);
	$("#aas2 ul").html(cjHtml);
	//右边下条
	$(".right_kefu ").mouseout(function () {
	    $(".right_kefu").hide();
	    $(".right_kb").show();
	});
	$(".right_kefu ").mouseover(function () {
	    $(".right_kefu").show();
	    $(".right_kb").hide();
	});
	$(".right_kb").mouseover(function () {
	    $(".right_kb").hide();
	    $(".right_kefu").show();
	});
	/*右侧滚动*/
	function boxmove(d1, d2, d3, e, obj) {
	    var speed = 40;
	    var demo = document.getElementById(d1);
	    var demo1 = document.getElementById(d2);
	    var demo2 = document.getElementById(d3);
	    demo2.innerHTML = demo1.innerHTML;
	    function boxTop() {
	        if (demo2.offsetTop - demo.scrollTop <= 0) {
	            demo.scrollTop -= demo1.offsetHeight
	        }
	        else {
	            demo.scrollTop++
	        }
	    }
	    function boxRight() {
	        if (demo.scrollLeft <= 0) {
	            demo.scrollLeft += demo2.offsetWidth
	        }
	        else {
	            demo.scrollLeft--
	        }
	    }
	    function boxBottom() {
	        if (demo1.offsetTop - demo.scrollTop >= 0) {
	            demo.scrollTop += demo2.offsetHeight
	        }
	        else {
	            demo.scrollTop--
	        }
	    }
	    function boxLeft() {
	        if (demo2.offsetWidth - demo.scrollLeft <= 0) {
	            demo.scrollLeft -= demo1.offsetWidth
	        }
	        else {
	            demo.scrollLeft++
	        }
	    }
	    if (e == 1) {
	        var MoveTop = setInterval(boxTop, speed);
	        demo.onmouseover = function () {
	            clearInterval(MoveTop);
	        }
	        demo.onmouseout = function () {
	            MoveTop = setInterval(boxTop, speed)
	        }
	    }
	    if (e == 2) {
	        var MoveTop = setInterval(boxTop, speed);
	        demo.onmouseover = function () {
	            clearInterval(MoveTop);
	        }
	        demo.onmouseout = function () {
	            MoveTop = setInterval(boxTop, speed)
	        }
	    }

	    if (e == "top") {
	        MoveTop = setInterval(boxTop, speed)
	        obj.onmouseout = function () {
	            clearInterval(MoveTop);
	        }
	    }
	}
	boxmove("aas", "aas1", "aas2", 1);
	setTimeout("bbb()", 13000);
});