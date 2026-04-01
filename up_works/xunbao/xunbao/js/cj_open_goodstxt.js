// JavaScript Document
function open_goodstxt(){
	$('.weui-popup__container').popup();
	if(typeof(loading)!=="undefined"){
		if(!loading){
			loading = true;
		}
	}
}
function close_goodstext(){
	if(typeof(loading)!=="undefined"){
		if(loading){
			loading = false;
		}
	}
}