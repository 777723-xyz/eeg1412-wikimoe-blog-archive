// JavaScript Document
$(document).ready(function () {
	/*$('.hot_susume_item_list_box_d .hot_susume_item_box:first-child').find('.hot_item_name_price_box').addClass('item_no_border');
	$('.hot_susume_item_list_box_d .hot_susume_item_box:first-child').find('.hot_susume_yellow_line').css('width','239').css('left',-1)*/
	$('.hot_susume_item_list_box_e .hot_susume_item_box:nth-child(5n) ').find('.hot_item_name_price_box').addClass('item_right_border');
	$('.hot_susume_item_list_box_e .hot_susume_item_box:nth-child(5n) ').find('.hot_susume_yellow_line').css('width','237')
	
	$('.hot_susume_item_box').mouseenter(function(){
		$(this).find('.hot_susume_yellow_line').show()
	})
	$('.hot_susume_item_box').mouseleave(function(){
		$(this).find('.hot_susume_yellow_line').hide()
	})	
	
	$('#change_item_list .hot_susume_item_box').hide();
	
	
	function randomIndex(n){
    var i, j, tmp, a = new Array(n);
    a[0] = 0;
    for(i = n-1; i > 0; i--) {
        j = Math.floor(Math.random() * (i+1));
        tmp = a[i] || i;
        a[i] = a[j] || j;
        a[j] = tmp;
    };
    return a;
    }
	
    var hot_item_nums = $('#change_item_list .hot_susume_item_box').length;
    hot_item_arr = randomIndex(hot_item_nums);
	radowm_Show()
	
	function radowm_Show(){
	   var new_hot_item_arr=hot_item_arr.slice(0, 5)
       var hot_max_nums = Math.max.apply(null, new_hot_item_arr);//最大值
       var arrvalue;//用于存放取出的数组的值
        for(var i=0;i<5;i++){
        arrvalue=new_hot_item_arr[i];//数组的索引是从0开始的.
	     $('#change_item_list .hot_susume_item_box').eq(arrvalue).show();
	     if(i==4){
		 $('#change_item_list .hot_susume_item_box').eq(hot_max_nums).addClass('hot_item_last_one')
		 
	     }
         
       }
	}
	
	$('#hot_change').click(function(){
		$('#change_item_list .hot_susume_item_box.hot_item_last_one').removeClass('hot_item_last_one')
		$('#change_item_list .hot_susume_item_box').hide();
		var hot_item_nums = $('#change_item_list .hot_susume_item_box').length;
        hot_item_arr = randomIndex(hot_item_nums);
	    radowm_Show()
	});
});