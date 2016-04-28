function openZoosUrl() {
    window.open("http://dht.zoosnet.net/LR/Chatpre.aspx?id=DHT88027214&lng=cn"); 
}
function kf_time() {
        setTimeout("$('.kf').show()", 13000);
    }
$(document).ready(function(){
    $(".down").click(function(){
        var top = $(window).scrollTop();
        if($(this).prevAll("img.down").hasClass('on')){
            $(this).prevAll("div.hidediv").hide(500);
            $(this).next("div").show(500);
            var height=$(this).prevAll("div.hidediv").height()-$(this).prevAll("img.down").height();
            $(window).scrollTop(top-height);
    		$(".down").removeClass('on');
            $(this).addClass('on');
    		return false;
        }
    	$('.hidediv').hide(500);
        if($(this).next("div").css('display') != "block"){
            $(this).next("div").show(500);
        }
        if($(this).hasClass('on')){
           $(this).removeClass('on');
        }else{
           $(this).addClass('on');
        }
    });
    $("#goTop").click(function () {
        var i = ($(document).scrollTop(), $("html,body"));
        i.animate({
            scrollTop: 0
        })
    });
    
    var lxh, right; 
    lxh = $(".lx").height();
    setTimeout("$('.kf').show()", 11000);
    right = $("body").width() / 2 - $(".kf").width() / 2;
    //$(".kf").css("right", right);
    $(".abso").css("height", lxh);
    $(".swt").height($('.logo').height());
    $(window).scroll(function () {
        var lxh;
        lxh = $(".lx").height();
        $(".abso").css("height", lxh);
    });
    window.onorientationchange = (function () {
        var lxh, right;
        lxh = $(".lx").height();
        right = $("body").width() / 2 - $(".kf").width() / 2;
        //$(".kf").css("right", right);
        $(".abso").css("height", lxh);
        $(".swt").height($('.logo').height());
    });

})