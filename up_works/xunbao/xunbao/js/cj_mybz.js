// JavaScript Document
var loading = false;  //状态标记
$(document.body).infinite().on("infinite", function() {
  if(loading) return;
  $('.weui-loadmore').show();
  loading = true;
  setTimeout(function() {
	var html_s = $(".cj_my_bz_list_box").first().prop('outerHTML');
    $("#cj_mybz_page").append(html_s);
    loading = false;
	$('.weui-loadmore').hide();
  }, 1000);   //模拟延迟
});