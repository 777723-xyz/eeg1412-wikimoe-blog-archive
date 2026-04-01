// JavaScript Document
function setcountdown(ele){
ele.find('[data-countdown]').each(function() {
  var $this = $(this), finalDate = $(this).data('countdown');
  $this.countdown(finalDate, function(event) {
    $this.html(event.strftime('%D天%H小时%M分%S秒'));
  });
});
}
$(document).ready(function() {
	var ele = $('#cj_my_coll_page').find('.cj_my_coll_goodslist_body').eq(0);
    setcountdown(ele);
});
var loading = false;  //状态标记
$(document.body).infinite().on("infinite", function() {
  if(loading) return;
  $('.weui-loadmore').show();
  loading = true;
  setTimeout(function() {
	var html_s = $(".cj_my_coll_goodslist_body").first().prop('outerHTML');
    $("#cj_my_coll_page").append(html_s);
	var ele = $('#cj_my_coll_page').find('.cj_my_coll_goodslist_body').last();
    setcountdown(ele);
    loading = false;
	$('.weui-loadmore').hide();
  }, 1000);   //模拟延迟
});