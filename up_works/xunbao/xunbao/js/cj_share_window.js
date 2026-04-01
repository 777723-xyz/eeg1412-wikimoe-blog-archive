// JavaScript Document
function go_share(){
	var html = '<div class="cj_wx_share_body" id="cj_wx_share" onclick="remove_share();"><div class="cj_wx_share_box"><div class="cj_wx_share_text"></div></div></div>'
	$('body').append(html);
	$('#cj_wx_share').show();
}
function remove_share(){
	$('#cj_wx_share').remove();
}