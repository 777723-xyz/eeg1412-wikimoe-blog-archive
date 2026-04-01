$(".more").click(function(){
			   	  if($('.pull_page').css('display') == 'none'){
			   	  	$(this).find('.pull_page').show();
			   	  }else{
			   	  	$(this).find('.pull_page').hide();
			   	  }
			   })
			   
			   $('.pull_page').click(function(e){
			   	   
			   })

$(document).click(function(e){
  var _con = $('.more');   // 设置目标区域
  if(!_con.is(e.target) && _con.has(e.target).length === 0){
       $('.pull_page').hide();
  }
});
