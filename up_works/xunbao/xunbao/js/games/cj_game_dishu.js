// JavaScript Document
    var canvas = document.getElementsByTagName("canvas")[0];
    canvas.width = 1000;
    canvas.height = 1000;
    var cubes = 3;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffd073";

    var areaSize = 1000/cubes;
    var cubeSize = areaSize*0.96;
    ctx.translate(areaSize*0.02,areaSize*0.02);
    var rats = [];
    var points;
    var hp;
    var interval;
    var t,t2;

    window.onload = function(){
        drawPannel();//游戏中的方格是用canvas画的
        initGame();//初始化游戏
    };

    function initGame(){
        points = 0;
        hp = 3;
        interval = 100;
        document.getElementById('point').innerHTML = "得分:"+points;
        document.getElementById('life').innerHTML = "剩余机会:"+hp;
        t = setInterval(function(){
            generateRats();//产生地鼠的方法
            maintanceRats();//维护地鼠的方法
        },interval);
    }
    function drawPannel(){//画出方格，每个方格放一个地鼠并且隐藏
        for(var i=0;i<cubes;i++){
            for(var j=0;j<cubes;j++){
                ctx.fillRect(i*areaSize,j*areaSize,cubeSize,cubeSize);//画一个方格
                var img = new Image();
                img.src = "images/games/dishu/dishu.png";
				img.setAttribute ('data-active' , '');
                img.style.left = i*33.33 + "%";
                img.style.top = j*0.3333*canvas.clientHeight + "px";
                img.addEventListener("mousedown",clicked);//两种事件是为了适配不同的移动设备
                img.addEventListener('touchstart', touched);
                document.getElementById('dishu_ico').appendChild(img);//每个方格放地鼠
                rats.push(img);//地鼠放入队列中，用于后面维护
            }
        }
    }
    function touched(){//触摸中了
        chosen(this);
        //var touch = event.touches[0];
        //var rect = canvas.getBoundingClientRect();
        //checkArea(touch.pageX - rect.left,touch.pageY - rect.top);
    }
    function clicked(){//点击中了
        chosen(this);
        //var rect = canvas.getBoundingClientRect();
        //checkArea(event.clientX - rect.left,event.clientY - rect.top);
    }
    function chosen(rat){
		if(rat.classList.contains('is_boom')&&rat.classList.contains('active')){
			rat.src = "images/games/dishu/dishu_boom_active.png";
			hp --;//掉血
			rat.classList.remove("is_boom");//去炸弹
			rat.classList.remove("active");//隐藏
			dishu_anime_end(rat);//延时，地鼠还原原
            document.getElementById('life').innerHTML = "剩余机会:"+hp;//更新血量显示
            if(hp == 0){
               lose();
            }
		}
        if(rat.className == "active"){//如果地鼠显示出来了
		    rat.src = "images/games/dishu/dishu_down.png";
			dishu_anime_end(rat);//延时，地鼠还原
            rat.classList.remove("active");//隐藏
            points ++;//加分
            document.getElementById('point').innerHTML = "得分:"+points;//更新分数显示
            interval -= interval*0.03>2?interval*0.03:interval*0.015;//增加游戏难度
        }
    }
    function generateRats(){//产生地鼠的方法
        if(parseInt(Math.random()*100)%parseInt(((interval/12)>2?(interval/12):2))==0){//产生的几率越来越大
            var ID = Math.ceil(Math.random()*8);
            if(rats[ID].className == ""&&rats[ID].getAttribute ('data-active')==""){//如果没有出现
			    var boom_rate = Math.random();
                
				    if(boom_rate<=0.1){
					    rats[ID].src = "images/games/dishu/dishu_boom.png";
					    rats[ID].classList.add("is_boom");
				    }
				    rats[ID].classList.add("active");
					rats[ID].setAttribute ('data-active' , 'active');
                    rats[ID].id = interval/4;//用id表示地鼠自动消失的时间，和游戏难度相关
                
            }
        }
    }
    function maintanceRats(){//维护地鼠的方法
        var activeRats = document.getElementsByClassName("active");//获取所有出现的地鼠
        for(var i=0;i<activeRats.length;i++){//用id表示剩余时间
		    var activenow = activeRats[i];
            activeRats[i].id --;
            if(activeRats[i].id<0){//如果到时间了
                if(!activenow.classList.contains('is_boom')){//判断是不是炸弹
					hp --;//掉血
                    interval *= 1.08;//回退一点游戏难度
					activenow.classList.remove("active");//当前地鼠隐藏
					dishu_anime_end(activenow);//延时，地鼠还原//延时，地鼠还原
                    document.getElementById('life').innerHTML = "剩余机会:"+hp;//更新血量显示
                    if(hp == 0){
                        lose();
                    }
				}else{
					activenow.classList.remove("is_boom");
					activenow.classList.remove("active");//当前地鼠隐藏
					dishu_anime_end(activenow);//延时，地鼠还原
					interval -= interval*0.03>2?interval*0.03:interval*0.015;//增加游戏难度   
				} 
            }
        }
    }
	function dishu_anime_end(eml){
		setTimeout(function(){
			eml.src = "images/games/dishu/dishu.png";
			eml.setAttribute ('data-active' , '');
		},400);//延时，地鼠还原
	}
    function lose(){//如果输了
        clearInterval(t);//停止计时器，等待游戏重新开始
        clearTimeout(t2);

        setTimeout(function(){//延时一点
		    if(points<=10){
			   alert("您一共打了"+points+"只地鼠，请再接再厉！")
			}else{
               alert("哇，您一共打了"+points+"只地鼠。");
			}
            for(var i=0;i<rats.length;i++){
                rats[i].classList.remove("active");//全部地鼠隐藏
            }
            setTimeout(function(){
				if(points<=10){
			       initGame();
			    }else{
				   $('#dishu_game_body').hide();
                   show_gg_window();
			    }
                //重新开始游戏
            },500);//延时，等待地鼠隐藏的动画效果结束
        },10);
    }