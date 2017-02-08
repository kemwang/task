/**
 * Created by Administrator on 2016/7/05.
 */
//绑定与解除事件函数 兼容浏览器的差异
    function addEvent (element,type,fn){
        if(element.addEventListener){
            element.addEventListener(type,fn,false);
        }
        else if(element.attachEvent){
            element.attachEvent("on"+type,fn);
        }
        else{
            element["on"+type] = fn;
        }
    }
    function removeEvent (element,type,fn){
        if(element.removeEventListener()) {
            element.removeEventListener(type, fn, false);
        }
        else if(element.detachEvent){
            element.detachEvent("on"+type,fn);
        }
        else{
            element["on"+type] = null;
        }
    }
var num = document.getElementById('num-in');
var itemList = document.getElementById('item-list');
//
var queDom = {
    headIN:function(num){
        itemList.insertBefore((document.createElement('span')),itemList.firstChild);
        itemList.firstElementChild.innerHTML=num;
    },
    headOut:function(){
        alert(itemList.firstElementChild.innerHTML);
        itemList.removeChild(itemList.firstElementChild);
    },
    lastIn:function(num){

        itemList.appendChild((document.createElement('span')));
        itemList.lastElementChild.innerHTML=num;
    },
    lastOut:function(){
        alert(itemList.lastElementChild.innerHTML);
        itemList.removeChild(itemList.lastElementChild);
    }
}

//定义队列对象
var queue ={
     str:[],
     leftIn: function () {
         if((/^\d{1,2}$/).test(num.value)){
             this.str.unshift(num.value);
             queDom.headIN(num.value);
             num.value="";
         }
         else{
             alert('请输入两位整数');
         }
     },
     leftOut: function () {
        if(!this.isEmpty()){
            this.str.shift();
            queDom.headOut();
        }
         else{
            alert('队列为空');
        }
     },
     rightIn: function(){
        if((/^\d{1,2}$/).test(num.value)){
            this.str.push(num.value);
            queDom.lastIn(num.value);
            num.value="";
        }
         else{
            alert('请输入两位的整数');
        }
     },
     rightOut: function () {
         if(!this.isEmpty()){
             this.str.pop();
             queDom.lastOut();
         }
         else{
             alert('队列为空');
         }

     },
    isEmpty: function () {
        return(this.str.length == 0);
    },
    clear: function(){
      this.str.length = 0;
    }
}

//检查输入合法
/*function numTest(num){
    if((/^\d{1,2}$/).test(num)){
        return true;
    }
    else{
        alert("请输入两位以内的整数")
    }
}*/
/*function createSpanList(){
    var spanList;
    return function(){
        if(!spanList)
            (document.body.appendChild(document.createElement('div')))
    }
}*/
addEvent(document.getElementById('left-in'),"click",function(){queue.leftIn()});
addEvent(document.getElementById('right-in'),"click",function(){queue.rightIn()});
addEvent(document.getElementById('left-out'),"click",function(){queue.leftOut()});
addEvent(document.getElementById('right-out'),"click",function(){queue.rightOut()});
