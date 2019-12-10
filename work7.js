window.onload = function(){
		var box=document.getElementById('box');
		var oNavlist=document.getElementById('nav').children;
		var slider=document.getElementById('slider');
		var left=document.getElementById('left');
		var right=document.getElementById('right');
		var index = 1;
		var timer;
		var isMoving = false;

		var kuai1 = document.getElementById("kuai1");
			setInterval(function(){
				var now = parseInt(getStyle(kuai1,"left"));
				if(now == -850){
					kuai1.style.left = '600px';
			}
				else
					kuai1.style.left=now - 10 + "px";
			},100);
		//鼠标划入清空定时器
		box.onmouseover=function(){
			animate(left,{opacity:50})
			animate(right,{opacity:50})
			clearInterval(timer)
		}
		//鼠标划出开定时器
		box.onmouseout=function(){
			animate(left,{opacity:0})
			animate(right,{opacity:0})
			timer = setInterval(next,3000);
		}
		right.onclick = next;//左箭头点击事件
		left.onclick = prev;//右箭头点击事件
		function next(){//后一张图片
			if(isMoving){
				return;
			}
			isMoving = true;
			index ++;
			navmove();
			animate(slider,{left:-1200*index},function(){
				if(index == 6){
					slider.style.left = '-1200px';
					index = 1;
				}
				isMoving = false;
			});
		}
		function prev(){//前一张图片
			if(isMoving){
				return ;
			}
			isMoving = true ;
			index --;
			navmove();
			animate(slider,{left:-1200*index},function(){
				if(index == 0){
					slider.style.left = '-6000px';
					index = 5;
				}
				isMoving = false;
			});
		}
		for(var i = 0;i < oNavlist.length;i++){//点击按钮
			oNavlist[i].idx=i;
			oNavlist[i].onclick=function(){
				index = this.idx + 1;
				navmove();
				animate(slider,{left: -1200 * index});
			}
		}
		oNavlist[0].style.color = 'white';
		function navmove(){//点击下边的按钮换颜色
			for(var i = 0;i<oNavlist.length;i++){
				oNavlist[i].className="";
				if(i == 0)
					oNavlist[i].style.color = 'red';
				else
					oNavlist[i].style.color = 'black';
			}
			if(index === 6){
				oNavlist[0].className="active";
				oNavlist[0].style.color = 'white';
			}else if(index <= 0){
				oNavlist[4].className="active";
				oNavlist[4].style.color = 'white';
			}else{
				oNavlist[index - 1].className="active";
				oNavlist[index-1].style.color = 'white';
			}
		}
		timer = setInterval(next,3000);
		function getStyle(obj,style) {  
			if(obj.currentStyle) 
			{  
			    return obj.currentStyle[style];  
			} 
			else 
			{  
			    return getComputedStyle(obj)[style];  
			}  
		}
		function getStyle(obj, attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj, null)[attr];
		}
	}
	function animate(obj,json,callback){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var isStop = true;
			for(var attr in json){
				var now = 0;
				if(attr == 'opacity'){
					now = parseInt(getStyle(obj,attr)*100);
				}else{
					now = parseInt(getStyle(obj,attr));
				}
				var speed = (json[attr] - now) / 8;
				speed = speed>0?Math.ceil(speed):Math.floor(speed);
				var cur = now + speed;
				if(attr == 'opacity'){
					obj.style[attr] = cur / 100;
				}else{
					obj.style[attr] = cur + 'px';
				}
				if(json[attr] !== cur){
					isStop = false;
				}
			}
			if(isStop){
				clearInterval(obj.timer);
				callback&&callback();
			}
		}, 30)
	}
}
