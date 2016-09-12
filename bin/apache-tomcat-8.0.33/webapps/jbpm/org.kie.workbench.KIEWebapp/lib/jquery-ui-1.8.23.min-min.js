/*! jQuery UI - v1.8.23 - 2012-08-15
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.effects.core.js, jquery.effects.blind.js, jquery.effects.bounce.js, jquery.effects.clip.js, jquery.effects.drop.js, jquery.effects.explode.js, jquery.effects.fade.js, jquery.effects.fold.js, jquery.effects.highlight.js, jquery.effects.pulsate.js, jquery.effects.scale.js, jquery.effects.shake.js, jquery.effects.slide.js, jquery.effects.transfer.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.position.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.tabs.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(f,e){function i(a,m){var l=a.nodeName.toLowerCase();
if("area"===l){var k=a.parentNode,j=k.name,d;
return !a.href||!j||k.nodeName.toLowerCase()!=="map"?!1:(d=f("img[usemap=#"+j+"]")[0],!!d&&h(d))
}return(/input|select|textarea|button|object/.test(l)?!a.disabled:"a"==l?a.href||m:m)&&h(a)
}function h(a){return !f(a).parents().andSelf().filter(function(){return f.curCSS(this,"visibility")==="hidden"||f.expr.filters.hidden(this)
}).length
}f.ui=f.ui||{};
if(f.ui.version){return
}f.extend(f.ui,{version:"1.8.23",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),f.fn.extend({propAttr:f.fn.prop||f.fn.attr,_focus:f.fn.focus,focus:function(a,d){return typeof a=="number"?this.each(function(){var b=this;
setTimeout(function(){f(b).focus(),d&&d.call(b)
},a)
}):this._focus.apply(this,arguments)
},scrollParent:function(){var a;
return f.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?a=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(f.curCSS(this,"position",1))&&/(auto|scroll)/.test(f.curCSS(this,"overflow",1)+f.curCSS(this,"overflow-y",1)+f.curCSS(this,"overflow-x",1))
}).eq(0):a=this.parents().filter(function(){return/(auto|scroll)/.test(f.curCSS(this,"overflow",1)+f.curCSS(this,"overflow-y",1)+f.curCSS(this,"overflow-x",1))
}).eq(0),/fixed/.test(this.css("position"))||!a.length?f(document):a
},zIndex:function(k){if(k!==e){return this.css("zIndex",k)
}if(this.length){var j=f(this[0]),b,a;
while(j.length&&j[0]!==document){b=j.css("position");
if(b==="absolute"||b==="relative"||b==="fixed"){a=parseInt(j.css("zIndex"),10);
if(!isNaN(a)&&a!==0){return a
}}j=j.parent()
}}return 0
},disableSelection:function(){return this.bind((f.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(b){b.preventDefault()
})
},enableSelection:function(){return this.unbind(".ui-disableSelection")
}}),f("<a>").outerWidth(1).jquery||f.each(["Width","Height"],function(m,l){function a(n,q,p,o){return f.each(k,function(){q-=parseFloat(f.curCSS(n,"padding"+this,!0))||0,p&&(q-=parseFloat(f.curCSS(n,"border"+this+"Width",!0))||0),o&&(q-=parseFloat(f.curCSS(n,"margin"+this,!0))||0)
}),q
}var k=l==="Width"?["Left","Right"]:["Top","Bottom"],j=l.toLowerCase(),b={innerWidth:f.fn.innerWidth,innerHeight:f.fn.innerHeight,outerWidth:f.fn.outerWidth,outerHeight:f.fn.outerHeight};
f.fn["inner"+l]=function(d){return d===e?b["inner"+l].call(this):this.each(function(){f(this).css(j,a(this,d)+"px")
})
},f.fn["outer"+l]=function(d,n){return typeof d!="number"?b["outer"+l].call(this,d):this.each(function(){f(this).css(j,a(this,d,!0,n)+"px")
})
}
}),f.extend(f.expr[":"],{data:f.expr.createPseudo?f.expr.createPseudo(function(a){return function(b){return !!f.data(b,a)
}
}):function(a,k,j){return !!f.data(a,j[3])
},focusable:function(a){return i(a,!isNaN(f.attr(a,"tabindex")))
},tabbable:function(a){var j=f.attr(a,"tabindex"),c=isNaN(j);
return(c||j>=0)&&i(a,!c)
}}),f(function(){var a=document.body,d=a.appendChild(d=document.createElement("div"));
d.offsetHeight,f.extend(d.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),f.support.minHeight=d.offsetHeight===100,f.support.selectstart="onselectstart" in d,a.removeChild(d).style.display="none"
}),f.curCSS||(f.curCSS=f.css),f.extend(f.ui,{plugin:{add:function(a,m,l){var k=f.ui[a].prototype;
for(var j in l){k.plugins[j]=k.plugins[j]||[],k.plugins[j].push([m,l[j]])
}},call:function(k,j,n){var m=k.plugins[j];
if(!m||!k.element[0].parentNode){return
}for(var l=0;
l<m.length;
l++){k.options[m[l][0]]&&m[l][1].apply(k.element,n)
}}},contains:function(d,c){return document.compareDocumentPosition?d.compareDocumentPosition(c)&16:d!==c&&d.contains(c)
},hasScroll:function(a,l){if(f(a).css("overflow")==="hidden"){return !1
}var k=l&&l==="left"?"scrollLeft":"scrollTop",j=!1;
return a[k]>0?!0:(a[k]=1,j=a[k]>0,a[k]=0,j)
},isOverAxis:function(j,d,k){return j>d&&j<d+k
},isOver:function(a,n,m,l,k,j){return f.ui.isOverAxis(a,m,k)&&f.ui.isOverAxis(n,l,j)
}})
})(jQuery),function(f,e){if(f.cleanData){var i=f.cleanData;
f.cleanData=function(a){for(var k=0,j;
(j=a[k])!=null;
k++){try{f(j).triggerHandler("remove")
}catch(c){}}i(a)
}
}else{var h=f.fn.remove;
f.fn.remove=function(a,d){return this.each(function(){return d||(!a||f.filter(a,[this]).length)&&f("*",this).add([this]).each(function(){try{f(this).triggerHandler("remove")
}catch(c){}}),h.call(f(this),a,d)
})
}
}f.widget=function(a,n,m){var l=a.split(".")[0],k;
a=a.split(".")[1],k=l+"-"+a,m||(m=n,n=f.Widget),f.expr[":"][k]=function(b){return !!f.data(b,a)
},f[l]=f[l]||{},f[l][a]=function(d,c){arguments.length&&this._createWidget(d,c)
};
var j=new n;
j.options=f.extend(!0,{},j.options),f[l][a].prototype=f.extend(!0,j,{namespace:l,widgetName:a,widgetEventPrefix:f[l][a].prototype.widgetEventPrefix||a,widgetBaseClass:k},m),f.widget.bridge(a,f[l][a])
},f.widget.bridge=function(b,a){f.fn[b]=function(k){var j=typeof k=="string",d=Array.prototype.slice.call(arguments,1),c=this;
return k=!j&&d.length?f.extend.apply(null,[!0,k].concat(d)):k,j&&k.charAt(0)==="_"?c:(j?this.each(function(){var m=f.data(this,b),l=m&&f.isFunction(m[k])?m[k].apply(m,d):m;
if(l!==m&&l!==e){return c=l,!1
}}):this.each(function(){var l=f.data(this,b);
l?l.option(k||{})._init():f.data(this,b,new a(k,this))
}),c)
}
},f.Widget=function(d,c){arguments.length&&this._createWidget(d,c)
},f.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(a,k){f.data(k,this.widgetName,this),this.element=f(k),this.options=f.extend(!0,{},this.options,this._getCreateOptions(),a);
var j=this;
this.element.bind("remove."+this.widgetName,function(){j.destroy()
}),this._create(),this._trigger("create"),this._init()
},_getCreateOptions:function(){return f.metadata&&f.metadata.get(this.element[0])[this.widgetName]
},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")
},widget:function(){return this.element
},option:function(j,b){var a=j;
if(arguments.length===0){return f.extend({},this.options)
}if(typeof j=="string"){if(b===e){return this.options[j]
}a={},a[j]=b
}return this._setOptions(a),this
},_setOptions:function(a){var d=this;
return f.each(a,function(j,c){d._setOption(j,c)
}),this
},_setOption:function(d,c){return this.options[d]=c,d==="disabled"&&this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c),this
},enable:function(){return this._setOption("disabled",!1)
},disable:function(){return this._setOption("disabled",!0)
},_trigger:function(a,n,m){var l,k,j=this.options[a];
m=m||{},n=f.Event(n),n.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase(),n.target=this.element[0],k=n.originalEvent;
if(k){for(l in k){l in n||(n[l]=k[l])
}}return this.element.trigger(n,m),!(f.isFunction(j)&&j.call(this.element[0],n,m)===!1||n.isDefaultPrevented())
}}
}(jQuery),function(e,d){var f=!1;
e(document).mouseup(function(b){f=!1
}),e.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var a=this;
this.element.bind("mousedown."+this.widgetName,function(b){return a._mouseDown(b)
}).bind("click."+this.widgetName,function(b){if(!0===e.data(b.target,a.widgetName+".preventClickEvent")){return e.removeData(b.target,a.widgetName+".preventClickEvent"),b.stopImmediatePropagation(),!1
}}),this.started=!1
},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)
},_mouseDown:function(a){if(f){return
}this._mouseStarted&&this._mouseUp(a),this._mouseDownEvent=a;
var i=this,h=a.which==1,c=typeof this.options.cancel=="string"&&a.target.nodeName?e(a.target).closest(this.options.cancel).length:!1;
if(!h||c||!this._mouseCapture(a)){return !0
}this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0
},this.options.delay));
if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=this._mouseStart(a)!==!1;
if(!this._mouseStarted){return a.preventDefault(),!0
}}return !0===e.data(a.target,this.widgetName+".preventClickEvent")&&e.removeData(a.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(b){return i._mouseMove(b)
},this._mouseUpDelegate=function(b){return i._mouseUp(b)
},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),a.preventDefault(),f=!0,!0
},_mouseMove:function(a){return !e.browser.msie||document.documentMode>=9||!!a.button?this._mouseStarted?(this._mouseDrag(a),a.preventDefault()):(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==!1,this._mouseStarted?this._mouseDrag(a):this._mouseUp(a)),!this._mouseStarted):this._mouseUp(a)
},_mouseUp:function(a){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,a.target==this._mouseDownEvent.target&&e.data(a.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(a)),!1
},_mouseDistanceMet:function(b){return Math.max(Math.abs(this._mouseDownEvent.pageX-b.pageX),Math.abs(this._mouseDownEvent.pageY-b.pageY))>=this.options.distance
},_mouseDelayMet:function(b){return this.mouseDelayMet
},_mouseStart:function(b){},_mouseDrag:function(b){},_mouseStop:function(b){},_mouseCapture:function(b){return !0
}})
}(jQuery),function(d,c){d.widget("ui.draggable",d.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()
},destroy:function(){if(!this.element.data("draggable")){return
}return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy(),this
},_mouseCapture:function(a){var e=this.options;
return this.helper||e.disabled||d(a.target).is(".ui-resizable-handle")?!1:(this.handle=this._getHandle(a),this.handle?(e.iframeFix&&d(e.iframeFix===!0?"iframe":e.iframeFix).each(function(){d('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css(d(this).offset()).appendTo("body")
}),!0):!1)
},_mouseStart:function(a){var e=this.options;
return this.helper=this._createHelper(a),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),d.ui.ddmanager&&(d.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},d.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(a),this.originalPageX=a.pageX,this.originalPageY=a.pageY,e.cursorAt&&this._adjustOffsetFromHelper(e.cursorAt),e.containment&&this._setContainment(),this._trigger("start",a)===!1?(this._clear(),!1):(this._cacheHelperProportions(),d.ui.ddmanager&&!e.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a),this._mouseDrag(a,!0),d.ui.ddmanager&&d.ui.ddmanager.dragStart(this,a),!0)
},_mouseDrag:function(a,f){this.position=this._generatePosition(a),this.positionAbs=this._convertPositionTo("absolute");
if(!f){var e=this._uiHash();
if(this._trigger("drag",a,e)===!1){return this._mouseUp({}),!1
}this.position=e.position
}if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}return d.ui.ddmanager&&d.ui.ddmanager.drag(this,a),!1
},_mouseStop:function(a){var k=!1;
d.ui.ddmanager&&!this.options.dropBehaviour&&(k=d.ui.ddmanager.drop(this,a)),this.dropped&&(k=this.dropped,this.dropped=!1);
var j=this.element[0],i=!1;
while(j&&(j=j.parentNode)){j==document&&(i=!0)
}if(!i&&this.options.helper==="original"){return !1
}if(this.options.revert=="invalid"&&!k||this.options.revert=="valid"&&k||this.options.revert===!0||d.isFunction(this.options.revert)&&this.options.revert.call(this.element,k)){var h=this;
d(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){h._trigger("stop",a)!==!1&&h._clear()
})
}else{this._trigger("stop",a)!==!1&&this._clear()
}return !1
},_mouseUp:function(a){return this.options.iframeFix===!0&&d("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)
}),d.ui.ddmanager&&d.ui.ddmanager.dragStop(this,a),d.ui.mouse.prototype._mouseUp.call(this,a)
},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this
},_getHandle:function(a){var e=!this.options.handle||!d(this.options.handle,this.element).length?!0:!1;
return d(this.options.handle,this.element).find("*").andSelf().each(function(){this==a.target&&(e=!0)
}),e
},_createHelper:function(a){var f=this.options,e=d.isFunction(f.helper)?d(f.helper.apply(this.element[0],[a])):f.helper=="clone"?this.element.clone().removeAttr("id"):this.element;
return e.parents("body").length||e.appendTo(f.appendTo=="parent"?this.element[0].parentNode:f.appendTo),e[0]!=this.element[0]&&!/(fixed|absolute)/.test(e.css("position"))&&e.css("position","absolute"),e
},_adjustOffsetFromHelper:function(a){typeof a=="string"&&(a=a.split(" ")),d.isArray(a)&&(a={left:+a[0],top:+a[1]||0}),"left" in a&&(this.offset.click.left=a.left+this.margins.left),"right" in a&&(this.offset.click.left=this.helperProportions.width-a.right+this.margins.left),"top" in a&&(this.offset.click.top=a.top+this.margins.top),"bottom" in a&&(this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top)
},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();
var a=this.offsetParent.offset();
this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(a.left+=this.scrollParent.scrollLeft(),a.top+=this.scrollParent.scrollTop());
if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie){a={top:0,left:0}
}return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var b=this.element.position();
return{top:b.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:b.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}return{top:0,left:0}
},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var a=this.options;
a.containment=="parent"&&(a.containment=this.helper[0].parentNode);
if(a.containment=="document"||a.containment=="window"){this.containment=[a.containment=="document"?0:d(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,a.containment=="document"?0:d(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(a.containment=="document"?0:d(window).scrollLeft())+d(a.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a.containment=="document"?0:d(window).scrollTop())+(d(a.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!/^(document|window|parent)$/.test(a.containment)&&a.containment.constructor!=Array){var k=d(a.containment),j=k[0];
if(!j){return
}var i=k.offset(),h=d(j).css("overflow")!="hidden";
this.containment=[(parseInt(d(j).css("borderLeftWidth"),10)||0)+(parseInt(d(j).css("paddingLeft"),10)||0),(parseInt(d(j).css("borderTopWidth"),10)||0)+(parseInt(d(j).css("paddingTop"),10)||0),(h?Math.max(j.scrollWidth,j.offsetWidth):j.offsetWidth)-(parseInt(d(j).css("borderLeftWidth"),10)||0)-(parseInt(d(j).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(h?Math.max(j.scrollHeight,j.offsetHeight):j.offsetHeight)-(parseInt(d(j).css("borderTopWidth"),10)||0)-(parseInt(d(j).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=k
}else{a.containment.constructor==Array&&(this.containment=a.containment)
}},_convertPositionTo:function(a,l){l||(l=this.position);
var k=a=="absolute"?1:-1,j=this.options,i=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,h=/(html|body)/i.test(i[0].tagName);
return{top:l.top+this.offset.relative.top*k+this.offset.parent.top*k-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():h?0:i.scrollTop())*k),left:l.left+this.offset.relative.left*k+this.offset.parent.left*k-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():h?0:i.scrollLeft())*k)}
},_generatePosition:function(t){var s=this.options,r=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,q=/(html|body)/i.test(r[0].tagName),p=t.pageX,o=t.pageY;
if(this.originalPosition){var n;
if(this.containment){if(this.relative_container){var m=this.relative_container.offset();
n=[this.containment[0]+m.left,this.containment[1]+m.top,this.containment[2]+m.left,this.containment[3]+m.top]
}else{n=this.containment
}t.pageX-this.offset.click.left<n[0]&&(p=n[0]+this.offset.click.left),t.pageY-this.offset.click.top<n[1]&&(o=n[1]+this.offset.click.top),t.pageX-this.offset.click.left>n[2]&&(p=n[2]+this.offset.click.left),t.pageY-this.offset.click.top>n[3]&&(o=n[3]+this.offset.click.top)
}if(s.grid){var l=s.grid[1]?this.originalPageY+Math.round((o-this.originalPageY)/s.grid[1])*s.grid[1]:this.originalPageY;
o=n?l-this.offset.click.top<n[1]||l-this.offset.click.top>n[3]?l-this.offset.click.top<n[1]?l+s.grid[1]:l-s.grid[1]:l:l;
var a=s.grid[0]?this.originalPageX+Math.round((p-this.originalPageX)/s.grid[0])*s.grid[0]:this.originalPageX;
p=n?a-this.offset.click.left<n[0]||a-this.offset.click.left>n[2]?a-this.offset.click.left<n[0]?a+s.grid[0]:a-s.grid[0]:a:a
}}return{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():q?0:r.scrollTop()),left:p-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():q?0:r.scrollLeft())}
},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1
},_trigger:function(a,f,e){return e=e||this._uiHash(),d.ui.plugin.call(this,a,[f,e]),a=="drag"&&(this.positionAbs=this._convertPositionTo("absolute")),d.Widget.prototype._trigger.call(this,a,f,e)
},plugins:{},_uiHash:function(b){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}
}}),d.extend(d.ui.draggable,{version:"1.8.23"}),d.ui.plugin.add("draggable","connectToSortable",{start:function(a,k){var j=d(this).data("draggable"),i=j.options,h=d.extend({},k,{item:j.element});
j.sortables=[],d(i.connectToSortable).each(function(){var b=d.data(this,"sortable");
b&&!b.options.disabled&&(j.sortables.push({instance:b,shouldRevert:b.options.revert}),b.refreshPositions(),b._trigger("activate",a,h))
})
},stop:function(a,i){var h=d(this).data("draggable"),f=d.extend({},i,{item:h.element});
d.each(h.sortables,function(){this.instance.isOver?(this.instance.isOver=0,h.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(a),this.instance.options.helper=this.instance.options._helper,h.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",a,f))
})
},drag:function(a,k){var j=d(this).data("draggable"),i=this,h=function(t){var s=this.offset.click.top,r=this.offset.click.left,q=this.positionAbs.top,p=this.positionAbs.left,o=t.height,n=t.width,m=t.top,l=t.left;
return d.ui.isOver(q+s,p+r,m,l,o,n)
};
d.each(j.sortables,function(b){this.instance.positionAbs=j.positionAbs,this.instance.helperProportions=j.helperProportions,this.instance.offset.click=j.offset.click,this.instance._intersectsWith(this.instance.containerCache)?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=d(i).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return k.helper[0]
},a.target=this.instance.currentItem[0],this.instance._mouseCapture(a,!0),this.instance._mouseStart(a,!0,!0),this.instance.offset.click.top=j.offset.click.top,this.instance.offset.click.left=j.offset.click.left,this.instance.offset.parent.left-=j.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=j.offset.parent.top-this.instance.offset.parent.top,j._trigger("toSortable",a),j.dropped=this.instance.element,j.currentItem=j.element,this.instance.fromOutside=j),this.instance.currentItem&&this.instance._mouseDrag(a)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",a,this.instance._uiHash(this.instance)),this.instance._mouseStop(a,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),j._trigger("fromSortable",a),j.dropped=!1)
})
}}),d.ui.plugin.add("draggable","cursor",{start:function(a,i){var h=d("body"),f=d(this).data("draggable").options;
h.css("cursor")&&(f._cursor=h.css("cursor")),h.css("cursor",f.cursor)
},stop:function(a,f){var e=d(this).data("draggable").options;
e._cursor&&d("body").css("cursor",e._cursor)
}}),d.ui.plugin.add("draggable","opacity",{start:function(a,i){var h=d(i.helper),f=d(this).data("draggable").options;
h.css("opacity")&&(f._opacity=h.css("opacity")),h.css("opacity",f.opacity)
},stop:function(a,f){var e=d(this).data("draggable").options;
e._opacity&&d(f.helper).css("opacity",e._opacity)
}}),d.ui.plugin.add("draggable","scroll",{start:function(a,f){var e=d(this).data("draggable");
e.scrollParent[0]!=document&&e.scrollParent[0].tagName!="HTML"&&(e.overflowOffset=e.scrollParent.offset())
},drag:function(a,k){var j=d(this).data("draggable"),i=j.options,h=!1;
if(j.scrollParent[0]!=document&&j.scrollParent[0].tagName!="HTML"){if(!i.axis||i.axis!="x"){j.overflowOffset.top+j.scrollParent[0].offsetHeight-a.pageY<i.scrollSensitivity?j.scrollParent[0].scrollTop=h=j.scrollParent[0].scrollTop+i.scrollSpeed:a.pageY-j.overflowOffset.top<i.scrollSensitivity&&(j.scrollParent[0].scrollTop=h=j.scrollParent[0].scrollTop-i.scrollSpeed)
}if(!i.axis||i.axis!="y"){j.overflowOffset.left+j.scrollParent[0].offsetWidth-a.pageX<i.scrollSensitivity?j.scrollParent[0].scrollLeft=h=j.scrollParent[0].scrollLeft+i.scrollSpeed:a.pageX-j.overflowOffset.left<i.scrollSensitivity&&(j.scrollParent[0].scrollLeft=h=j.scrollParent[0].scrollLeft-i.scrollSpeed)
}}else{if(!i.axis||i.axis!="x"){a.pageY-d(document).scrollTop()<i.scrollSensitivity?h=d(document).scrollTop(d(document).scrollTop()-i.scrollSpeed):d(window).height()-(a.pageY-d(document).scrollTop())<i.scrollSensitivity&&(h=d(document).scrollTop(d(document).scrollTop()+i.scrollSpeed))
}if(!i.axis||i.axis!="y"){a.pageX-d(document).scrollLeft()<i.scrollSensitivity?h=d(document).scrollLeft(d(document).scrollLeft()-i.scrollSpeed):d(window).width()-(a.pageX-d(document).scrollLeft())<i.scrollSensitivity&&(h=d(document).scrollLeft(d(document).scrollLeft()+i.scrollSpeed))
}}h!==!1&&d.ui.ddmanager&&!i.dropBehaviour&&d.ui.ddmanager.prepareOffsets(j,a)
}}),d.ui.plugin.add("draggable","snap",{start:function(a,i){var h=d(this).data("draggable"),f=h.options;
h.snapElements=[],d(f.snap.constructor!=String?f.snap.items||":data(draggable)":f.snap).each(function(){var e=d(this),j=e.offset();
this!=h.element[0]&&h.snapElements.push({item:this,width:e.outerWidth(),height:e.outerHeight(),top:j.top,left:j.left})
})
},drag:function(L,K){var J=d(this).data("draggable"),I=J.options,H=I.snapTolerance,G=K.offset.left,F=G+J.helperProportions.width,E=K.offset.top,D=E+J.helperProportions.height;
for(var C=J.snapElements.length-1;
C>=0;
C--){var B=J.snapElements[C].left,A=B+J.snapElements[C].width,z=J.snapElements[C].top,y=z+J.snapElements[C].height;
if(!(B-H<G&&G<A+H&&z-H<E&&E<y+H||B-H<G&&G<A+H&&z-H<D&&D<y+H||B-H<F&&F<A+H&&z-H<E&&E<y+H||B-H<F&&F<A+H&&z-H<D&&D<y+H)){J.snapElements[C].snapping&&J.options.snap.release&&J.options.snap.release.call(J.element,L,d.extend(J._uiHash(),{snapItem:J.snapElements[C].item})),J.snapElements[C].snapping=!1;
continue
}if(I.snapMode!="inner"){var x=Math.abs(z-D)<=H,w=Math.abs(y-E)<=H,v=Math.abs(B-F)<=H,u=Math.abs(A-G)<=H;
x&&(K.position.top=J._convertPositionTo("relative",{top:z-J.helperProportions.height,left:0}).top-J.margins.top),w&&(K.position.top=J._convertPositionTo("relative",{top:y,left:0}).top-J.margins.top),v&&(K.position.left=J._convertPositionTo("relative",{top:0,left:B-J.helperProportions.width}).left-J.margins.left),u&&(K.position.left=J._convertPositionTo("relative",{top:0,left:A}).left-J.margins.left)
}var a=x||w||v||u;
if(I.snapMode!="outer"){var x=Math.abs(z-E)<=H,w=Math.abs(y-D)<=H,v=Math.abs(B-G)<=H,u=Math.abs(A-F)<=H;
x&&(K.position.top=J._convertPositionTo("relative",{top:z,left:0}).top-J.margins.top),w&&(K.position.top=J._convertPositionTo("relative",{top:y-J.helperProportions.height,left:0}).top-J.margins.top),v&&(K.position.left=J._convertPositionTo("relative",{top:0,left:B}).left-J.margins.left),u&&(K.position.left=J._convertPositionTo("relative",{top:0,left:A-J.helperProportions.width}).left-J.margins.left)
}!J.snapElements[C].snapping&&(x||w||v||u||a)&&J.options.snap.snap&&J.options.snap.snap.call(J.element,L,d.extend(J._uiHash(),{snapItem:J.snapElements[C].item})),J.snapElements[C].snapping=x||w||v||u||a
}}}),d.ui.plugin.add("draggable","stack",{start:function(a,k){var j=d(this).data("draggable").options,i=d.makeArray(d(j.stack)).sort(function(e,f){return(parseInt(d(e).css("zIndex"),10)||0)-(parseInt(d(f).css("zIndex"),10)||0)
});
if(!i.length){return
}var h=parseInt(i[0].style.zIndex)||0;
d(i).each(function(b){this.style.zIndex=h+b
}),this[0].style.zIndex=h+i.length
}}),d.ui.plugin.add("draggable","zIndex",{start:function(a,i){var h=d(i.helper),f=d(this).data("draggable").options;
h.css("zIndex")&&(f._zIndex=h.css("zIndex")),h.css("zIndex",f.zIndex)
},stop:function(a,f){var e=d(this).data("draggable").options;
e._zIndex&&d(f.helper).css("zIndex",e._zIndex)
}})
}(jQuery),function(d,c){d.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect"},_create:function(){var a=this.options,e=a.accept;
this.isover=0,this.isout=1,this.accept=d.isFunction(e)?e:function(b){return b.is(e)
},this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},d.ui.ddmanager.droppables[a.scope]=d.ui.ddmanager.droppables[a.scope]||[],d.ui.ddmanager.droppables[a.scope].push(this),a.addClasses&&this.element.addClass("ui-droppable")
},destroy:function(){var a=d.ui.ddmanager.droppables[this.options.scope];
for(var e=0;
e<a.length;
e++){a[e]==this&&a.splice(e,1)
}return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"),this
},_setOption:function(a,e){a=="accept"&&(this.accept=d.isFunction(e)?e:function(b){return b.is(e)
}),d.Widget.prototype._setOption.apply(this,arguments)
},_activate:function(a){var e=d.ui.ddmanager.current;
this.options.activeClass&&this.element.addClass(this.options.activeClass),e&&this._trigger("activate",a,this.ui(e))
},_deactivate:function(a){var e=d.ui.ddmanager.current;
this.options.activeClass&&this.element.removeClass(this.options.activeClass),e&&this._trigger("deactivate",a,this.ui(e))
},_over:function(a){var e=d.ui.ddmanager.current;
if(!e||(e.currentItem||e.element)[0]==this.element[0]){return
}this.accept.call(this.element[0],e.currentItem||e.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",a,this.ui(e)))
},_out:function(a){var e=d.ui.ddmanager.current;
if(!e||(e.currentItem||e.element)[0]==this.element[0]){return
}this.accept.call(this.element[0],e.currentItem||e.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",a,this.ui(e)))
},_drop:function(a,i){var h=i||d.ui.ddmanager.current;
if(!h||(h.currentItem||h.element)[0]==this.element[0]){return !1
}var f=!1;
return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var e=d.data(this,"droppable");
if(e.options.greedy&&!e.options.disabled&&e.options.scope==h.options.scope&&e.accept.call(e.element[0],h.currentItem||h.element)&&d.ui.intersect(h,d.extend(e,{offset:e.element.offset()}),e.options.tolerance)){return f=!0,!1
}}),f?!1:this.accept.call(this.element[0],h.currentItem||h.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",a,this.ui(h)),this.element):!1
},ui:function(b){return{draggable:b.currentItem||b.element,helper:b.helper,position:b.position,offset:b.positionAbs}
}}),d.extend(d.ui.droppable,{version:"1.8.23"}),d.ui.intersect=function(B,A,z){if(!A.offset){return !1
}var y=(B.positionAbs||B.position.absolute).left,x=y+B.helperProportions.width,w=(B.positionAbs||B.position.absolute).top,v=w+B.helperProportions.height,u=A.offset.left,t=u+A.proportions.width,s=A.offset.top,r=s+A.proportions.height;
switch(z){case"fit":return u<=y&&x<=t&&s<=w&&v<=r;
case"intersect":return u<y+B.helperProportions.width/2&&x-B.helperProportions.width/2<t&&s<w+B.helperProportions.height/2&&v-B.helperProportions.height/2<r;
case"pointer":var q=(B.positionAbs||B.position.absolute).left+(B.clickOffset||B.offset.click).left,p=(B.positionAbs||B.position.absolute).top+(B.clickOffset||B.offset.click).top,a=d.ui.isOver(p,q,s,u,A.proportions.height,A.proportions.width);
return a;
case"touch":return(w>=s&&w<=r||v>=s&&v<=r||w<s&&v>r)&&(y>=u&&y<=t||x>=u&&x<=t||y<u&&x>t);
default:return !1
}},d.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(a,o){var n=d.ui.ddmanager.droppables[a.options.scope]||[],m=o?o.type:null,l=(a.currentItem||a.element).find(":data(droppable)").andSelf();
g:for(var k=0;
k<n.length;
k++){if(n[k].options.disabled||a&&!n[k].accept.call(n[k].element[0],a.currentItem||a.element)){continue
}for(var j=0;
j<l.length;
j++){if(l[j]==n[k].element[0]){n[k].proportions.height=0;
continue g
}}n[k].visible=n[k].element.css("display")!="none";
if(!n[k].visible){continue
}m=="mousedown"&&n[k]._activate.call(n[k],o),n[k].offset=n[k].element.offset(),n[k].proportions={width:n[k].element[0].offsetWidth,height:n[k].element[0].offsetHeight}
}},drop:function(a,f){var e=!1;
return d.each(d.ui.ddmanager.droppables[a.options.scope]||[],function(){if(!this.options){return
}!this.options.disabled&&this.visible&&d.ui.intersect(a,this,this.options.tolerance)&&(e=this._drop.call(this,f)||e),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],a.currentItem||a.element)&&(this.isout=1,this.isover=0,this._deactivate.call(this,f))
}),e
},dragStart:function(a,e){a.element.parents(":not(body,html)").bind("scroll.droppable",function(){a.options.refreshPositions||d.ui.ddmanager.prepareOffsets(a,e)
})
},drag:function(a,e){a.options.refreshPositions&&d.ui.ddmanager.prepareOffsets(a,e),d.each(d.ui.ddmanager.droppables[a.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible){return
}var j=d.ui.intersect(a,this,this.options.tolerance),i=!j&&this.isover==1?"isout":j&&this.isover==0?"isover":null;
if(!i){return
}var h;
if(this.options.greedy){var b=this.element.parents(":data(droppable):eq(0)");
b.length&&(h=d.data(b[0],"droppable"),h.greedyChild=i=="isover"?1:0)
}h&&i=="isover"&&(h.isover=0,h.isout=1,h._out.call(h,e)),this[i]=1,this[i=="isout"?"isover":"isout"]=0,this[i=="isover"?"_over":"_out"].call(this,e),h&&i=="isout"&&(h.isout=0,h.isover=1,h._over.call(h,e))
})
},dragStop:function(a,e){a.element.parents(":not(body,html)").unbind("scroll.droppable"),a.options.refreshPositions||d.ui.ddmanager.prepareOffsets(a,e)
}}
}(jQuery),function(f,e){f.widget("ui.resizable",f.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1000},_create:function(){var a=this,o=this.options;
this.element.addClass("ui-resizable"),f.extend(this,{_aspectRatio:!!o.aspectRatio,aspectRatio:o.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:o.helper||o.ghost||o.animate?o.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(f('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("resizable",this.element.data("resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=o.handles||(f(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se");
if(this.handles.constructor==String){this.handles=="all"&&(this.handles="n,e,s,w,se,sw,ne,nw");
var n=this.handles.split(",");
this.handles={};
for(var m=0;
m<n.length;
m++){var l=f.trim(n[m]),k="ui-resizable-"+l,j=f('<div class="ui-resizable-handle '+k+'"></div>');
j.css({zIndex:o.zIndex}),"se"==l&&j.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[l]=".ui-resizable-"+l,this.element.append(j)
}}this._renderAxis=function(p){p=p||this.element;
for(var t in this.handles){this.handles[t].constructor==String&&(this.handles[t]=f(this.handles[t],this.element).show());
if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var s=f(this.handles[t],this.element),r=0;
r=/sw|ne|nw|se|n|s/.test(t)?s.outerHeight():s.outerWidth();
var q=["padding",/ne|nw|n/.test(t)?"Top":/se|sw|s/.test(t)?"Bottom":/^e$/.test(t)?"Right":"Left"].join("");
p.css(q,r),this._proportionallyResize()
}if(!f(this.handles[t]).length){continue
}}},this._renderAxis(this.element),this._handles=f(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){if(!a.resizing){if(this.className){var b=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
}a.axis=b&&b[1]?b[1]:"se"
}}),o.autoHide&&(this._handles.hide(),f(this.element).addClass("ui-resizable-autohide").hover(function(){if(o.disabled){return
}f(this).removeClass("ui-resizable-autohide"),a._handles.show()
},function(){if(o.disabled){return
}a.resizing||(f(this).addClass("ui-resizable-autohide"),a._handles.hide())
})),this._mouseInit()
},destroy:function(){this._mouseDestroy();
var a=function(c){f(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
};
if(this.elementIsWrapper){a(this.element);
var d=this.element;
d.after(this.originalElement.css({position:d.css("position"),width:d.outerWidth(),height:d.outerHeight(),top:d.css("top"),left:d.css("left")})).remove()
}return this.originalElement.css("resize",this.originalResizeStyle),a(this.originalElement),this
},_mouseCapture:function(a){var k=!1;
for(var j in this.handles){f(this.handles[j])[0]==a.target&&(k=!0)
}return !this.options.disabled&&k
},_mouseStart:function(a){var n=this.options,m=this.element.position(),l=this.element;
this.resizing=!0,this.documentScroll={top:f(document).scrollTop(),left:f(document).scrollLeft()},(l.is(".ui-draggable")||/absolute/.test(l.css("position")))&&l.css({position:"absolute",top:m.top,left:m.left}),this._renderProxy();
var k=i(this.helper.css("left")),j=i(this.helper.css("top"));
n.containment&&(k+=f(n.containment).scrollLeft()||0,j+=f(n.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:k,top:j},this.size=this._helper?{width:l.outerWidth(),height:l.outerHeight()}:{width:l.width(),height:l.height()},this.originalSize=this._helper?{width:l.outerWidth(),height:l.outerHeight()}:{width:l.width(),height:l.height()},this.originalPosition={left:k,top:j},this.sizeDiff={width:l.outerWidth()-l.width(),height:l.outerHeight()-l.height()},this.originalMousePosition={left:a.pageX,top:a.pageY},this.aspectRatio=typeof n.aspectRatio=="number"?n.aspectRatio:this.originalSize.width/this.originalSize.height||1;
var c=f(".ui-resizable-"+this.axis).css("cursor");
return f("body").css("cursor",c=="auto"?this.axis+"-resize":c),l.addClass("ui-resizable-resizing"),this._propagate("start",a),!0
},_mouseDrag:function(z){var y=this.helper,x=this.options,w={},v=this,u=this.originalMousePosition,t=this.axis,s=z.pageX-u.left||0,r=z.pageY-u.top||0,q=this._change[t];
if(!q){return !1
}var p=q.apply(this,[z,s,r]),o=f.browser.msie&&f.browser.version<7,a=this.sizeDiff;
this._updateVirtualBoundaries(z.shiftKey);
if(this._aspectRatio||z.shiftKey){p=this._updateRatio(p,z)
}return p=this._respectSize(p,z),this._propagate("resize",z),y.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"}),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),this._updateCache(p),this._trigger("resize",z,this.ui()),!1
},_mouseStop:function(t){this.resizing=!1;
var s=this.options,r=this;
if(this._helper){var q=this._proportionallyResizeElements,p=q.length&&/textarea/i.test(q[0].nodeName),o=p&&f.ui.hasScroll(q[0],"left")?0:r.sizeDiff.height,n=p?0:r.sizeDiff.width,m={width:r.helper.width()-n,height:r.helper.height()-o},l=parseInt(r.element.css("left"),10)+(r.position.left-r.originalPosition.left)||null,a=parseInt(r.element.css("top"),10)+(r.position.top-r.originalPosition.top)||null;
s.animate||this.element.css(f.extend(m,{top:a,left:l})),r.helper.height(r.size.height),r.helper.width(r.size.width),this._helper&&!s.animate&&this._proportionallyResize()
}return f("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1
},_updateVirtualBoundaries:function(j){var d=this.options,o,n,m,l,k;
k={minWidth:h(d.minWidth)?d.minWidth:0,maxWidth:h(d.maxWidth)?d.maxWidth:Infinity,minHeight:h(d.minHeight)?d.minHeight:0,maxHeight:h(d.maxHeight)?d.maxHeight:Infinity};
if(this._aspectRatio||j){o=k.minHeight*this.aspectRatio,m=k.minWidth/this.aspectRatio,n=k.maxHeight*this.aspectRatio,l=k.maxWidth/this.aspectRatio,o>k.minWidth&&(k.minWidth=o),m>k.minHeight&&(k.minHeight=m),n<k.maxWidth&&(k.maxWidth=n),l<k.maxHeight&&(k.maxHeight=l)
}this._vBoundaries=k
},_updateCache:function(d){var c=this.options;
this.offset=this.helper.offset(),h(d.left)&&(this.position.left=d.left),h(d.top)&&(this.position.top=d.top),h(d.height)&&(this.size.height=d.height),h(d.width)&&(this.size.width=d.width)
},_updateRatio:function(j,d){var n=this.options,m=this.position,l=this.size,k=this.axis;
return h(j.height)?j.width=j.height*this.aspectRatio:h(j.width)&&(j.height=j.width/this.aspectRatio),k=="sw"&&(j.left=m.left+(l.width-j.width),j.top=null),k=="nw"&&(j.top=m.top+(l.height-j.height),j.left=m.left+(l.width-j.width)),j
},_respectSize:function(D,C){var B=this.helper,A=this._vBoundaries,z=this._aspectRatio||C.shiftKey,y=this.axis,x=h(D.width)&&A.maxWidth&&A.maxWidth<D.width,w=h(D.height)&&A.maxHeight&&A.maxHeight<D.height,v=h(D.width)&&A.minWidth&&A.minWidth>D.width,u=h(D.height)&&A.minHeight&&A.minHeight>D.height;
v&&(D.width=A.minWidth),u&&(D.height=A.minHeight),x&&(D.width=A.maxWidth),w&&(D.height=A.maxHeight);
var t=this.originalPosition.left+this.originalSize.width,s=this.position.top+this.size.height,r=/sw|nw|w/.test(y),q=/nw|ne|n/.test(y);
v&&r&&(D.left=t-A.minWidth),x&&r&&(D.left=t-A.maxWidth),u&&q&&(D.top=s-A.minHeight),w&&q&&(D.top=s-A.maxHeight);
var d=!D.width&&!D.height;
return d&&!D.left&&D.top?D.top=null:d&&!D.top&&D.left&&(D.left=null),D
},_proportionallyResize:function(){var a=this.options;
if(!this._proportionallyResizeElements.length){return
}var n=this.helper||this.element;
for(var m=0;
m<this._proportionallyResizeElements.length;
m++){var l=this._proportionallyResizeElements[m];
if(!this.borderDif){var k=[l.css("borderTopWidth"),l.css("borderRightWidth"),l.css("borderBottomWidth"),l.css("borderLeftWidth")],j=[l.css("paddingTop"),l.css("paddingRight"),l.css("paddingBottom"),l.css("paddingLeft")];
this.borderDif=f.map(k,function(p,o){var r=parseInt(p,10)||0,q=parseInt(j[o],10)||0;
return r+q
})
}if(!f.browser.msie||!f(n).is(":hidden")&&!f(n).parents(":hidden").length){l.css({height:n.height()-this.borderDif[0]-this.borderDif[2]||0,width:n.width()-this.borderDif[1]-this.borderDif[3]||0})
}else{continue
}}},_renderProxy:function(){var a=this.element,m=this.options;
this.elementOffset=a.offset();
if(this._helper){this.helper=this.helper||f('<div style="overflow:hidden;"></div>');
var l=f.browser.msie&&f.browser.version<7,k=l?1:0,j=l?2:-1;
this.helper.addClass(this._helper).css({width:this.element.outerWidth()+j,height:this.element.outerHeight()+j,position:"absolute",left:this.elementOffset.left-k+"px",top:this.elementOffset.top-k+"px",zIndex:++m.zIndex}),this.helper.appendTo("body").disableSelection()
}else{this.helper=this.element
}},_change:{e:function(j,d,k){return{width:this.originalSize.width+d}
},w:function(k,j,o){var n=this.options,m=this.originalSize,l=this.originalPosition;
return{left:l.left+j,width:m.width-j}
},n:function(k,j,o){var n=this.options,m=this.originalSize,l=this.originalPosition;
return{top:l.top+o,height:m.height-o}
},s:function(j,d,k){return{height:this.originalSize.height+k}
},se:function(a,k,j){return f.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[a,k,j]))
},sw:function(a,k,j){return f.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[a,k,j]))
},ne:function(a,k,j){return f.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[a,k,j]))
},nw:function(a,k,j){return f.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[a,k,j]))
}},_propagate:function(a,d){f.ui.plugin.call(this,a,[d,this.ui()]),a!="resize"&&this._trigger(a,d,this.ui())
},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}
}}),f.extend(f.ui.resizable,{version:"1.8.23"}),f.ui.plugin.add("resizable","alsoResize",{start:function(a,m){var l=f(this).data("resizable"),k=l.options,j=function(c){f(c).each(function(){var d=f(this);
d.data("resizable-alsoresize",{width:parseInt(d.width(),10),height:parseInt(d.height(),10),left:parseInt(d.css("left"),10),top:parseInt(d.css("top"),10)})
})
};
typeof k.alsoResize=="object"&&!k.alsoResize.parentNode?k.alsoResize.length?(k.alsoResize=k.alsoResize[0],j(k.alsoResize)):f.each(k.alsoResize,function(b){j(b)
}):j(k.alsoResize)
},resize:function(a,p){var o=f(this).data("resizable"),n=o.options,m=o.originalSize,l=o.originalPosition,k={height:o.size.height-m.height||0,width:o.size.width-m.width||0,top:o.position.top-l.top||0,left:o.position.left-l.left||0},j=function(c,q){f(c).each(function(){var d=f(this),t=f(this).data("resizable-alsoresize"),s={},r=q&&q.length?q:d.parents(p.originalElement[0]).length?["width","height"]:["width","height","top","left"];
f.each(r,function(v,u){var w=(t[u]||0)+(k[u]||0);
w&&w>=0&&(s[u]=w||null)
}),d.css(s)
})
};
typeof n.alsoResize=="object"&&!n.alsoResize.nodeType?f.each(n.alsoResize,function(d,c){j(d,c)
}):j(n.alsoResize)
},stop:function(a,d){f(this).removeData("resizable-alsoresize")
}}),f.ui.plugin.add("resizable","animate",{stop:function(v,u){var t=f(this).data("resizable"),s=t.options,r=t._proportionallyResizeElements,q=r.length&&/textarea/i.test(r[0].nodeName),p=q&&f.ui.hasScroll(r[0],"left")?0:t.sizeDiff.height,o=q?0:t.sizeDiff.width,n={width:t.size.width-o,height:t.size.height-p},m=parseInt(t.element.css("left"),10)+(t.position.left-t.originalPosition.left)||null,a=parseInt(t.element.css("top"),10)+(t.position.top-t.originalPosition.top)||null;
t.element.animate(f.extend(n,a&&m?{top:a,left:m}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var b={width:parseInt(t.element.css("width"),10),height:parseInt(t.element.css("height"),10),top:parseInt(t.element.css("top"),10),left:parseInt(t.element.css("left"),10)};
r&&r.length&&f(r[0]).css({width:b.width,height:b.height}),t._updateCache(b),t._propagate("resize",v)
}})
}}),f.ui.plugin.add("resizable","containment",{start:function(B,A){var z=f(this).data("resizable"),y=z.options,x=z.element,w=y.containment,v=w instanceof f?w.get(0):/parent/.test(w)?x.parent().get(0):w;
if(!v){return
}z.containerElement=f(v);
if(/document/.test(w)||w==document){z.containerOffset={left:0,top:0},z.containerPosition={left:0,top:0},z.parentData={element:f(document),left:0,top:0,width:f(document).width(),height:f(document).height()||document.body.parentNode.scrollHeight}
}else{var u=f(v),t=[];
f(["Top","Right","Left","Bottom"]).each(function(j,d){t[j]=i(u.css("padding"+d))
}),z.containerOffset=u.offset(),z.containerPosition=u.position(),z.containerSize={height:u.innerHeight()-t[3],width:u.innerWidth()-t[1]};
var s=z.containerOffset,r=z.containerSize.height,q=z.containerSize.width,c=f.ui.hasScroll(v,"left")?v.scrollWidth:q,a=f.ui.hasScroll(v)?v.scrollHeight:r;
z.parentData={element:v,left:s.left,top:s.top,width:c,height:a}
}},resize:function(D,C){var B=f(this).data("resizable"),A=B.options,z=B.containerSize,y=B.containerOffset,x=B.size,w=B.position,v=B._aspectRatio||D.shiftKey,u={top:0,left:0},t=B.containerElement;
t[0]!=document&&/static/.test(t.css("position"))&&(u=y),w.left<(B._helper?y.left:0)&&(B.size.width=B.size.width+(B._helper?B.position.left-y.left:B.position.left-u.left),v&&(B.size.height=B.size.width/B.aspectRatio),B.position.left=A.helper?y.left:0),w.top<(B._helper?y.top:0)&&(B.size.height=B.size.height+(B._helper?B.position.top-y.top:B.position.top),v&&(B.size.width=B.size.height*B.aspectRatio),B.position.top=B._helper?y.top:0),B.offset.left=B.parentData.left+B.position.left,B.offset.top=B.parentData.top+B.position.top;
var s=Math.abs((B._helper?B.offset.left-u.left:B.offset.left-u.left)+B.sizeDiff.width),r=Math.abs((B._helper?B.offset.top-u.top:B.offset.top-y.top)+B.sizeDiff.height),q=B.containerElement.get(0)==B.element.parent().get(0),a=/relative|absolute/.test(B.containerElement.css("position"));
q&&a&&(s-=B.parentData.left),s+B.size.width>=B.parentData.width&&(B.size.width=B.parentData.width-s,v&&(B.size.height=B.size.width/B.aspectRatio)),r+B.size.height>=B.parentData.height&&(B.size.height=B.parentData.height-r,v&&(B.size.width=B.size.height*B.aspectRatio))
},stop:function(x,w){var v=f(this).data("resizable"),u=v.options,t=v.position,s=v.containerOffset,r=v.containerPosition,q=v.containerElement,p=f(v.helper),o=p.offset(),n=p.outerWidth()-v.sizeDiff.width,a=p.outerHeight()-v.sizeDiff.height;
v._helper&&!u.animate&&/relative/.test(q.css("position"))&&f(this).css({left:o.left-r.left-s.left,width:n,height:a}),v._helper&&!u.animate&&/static/.test(q.css("position"))&&f(this).css({left:o.left-r.left-s.left,width:n,height:a})
}}),f.ui.plugin.add("resizable","ghost",{start:function(a,m){var l=f(this).data("resizable"),k=l.options,j=l.size;
l.ghost=l.originalElement.clone(),l.ghost.css({opacity:0.25,display:"block",position:"relative",height:j.height,width:j.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof k.ghost=="string"?k.ghost:""),l.ghost.appendTo(l.helper)
},resize:function(a,l){var k=f(this).data("resizable"),j=k.options;
k.ghost&&k.ghost.css({position:"relative",height:k.size.height,width:k.size.width})
},stop:function(a,l){var k=f(this).data("resizable"),j=k.options;
k.ghost&&k.helper&&k.helper.get(0).removeChild(k.ghost.get(0))
}}),f.ui.plugin.add("resizable","grid",{resize:function(v,u){var t=f(this).data("resizable"),s=t.options,r=t.size,q=t.originalSize,p=t.originalPosition,o=t.axis,n=s._aspectRatio||v.shiftKey;
s.grid=typeof s.grid=="number"?[s.grid,s.grid]:s.grid;
var m=Math.round((r.width-q.width)/(s.grid[0]||1))*(s.grid[0]||1),a=Math.round((r.height-q.height)/(s.grid[1]||1))*(s.grid[1]||1);
/^(se|s|e)$/.test(o)?(t.size.width=q.width+m,t.size.height=q.height+a):/^(ne)$/.test(o)?(t.size.width=q.width+m,t.size.height=q.height+a,t.position.top=p.top-a):/^(sw)$/.test(o)?(t.size.width=q.width+m,t.size.height=q.height+a,t.position.left=p.left-m):(t.size.width=q.width+m,t.size.height=q.height+a,t.position.top=p.top-a,t.position.left=p.left-m)
}});
var i=function(b){return parseInt(b,10)||0
},h=function(b){return !isNaN(parseInt(b,10))
}
}(jQuery),function(d,c){d.widget("ui.selectable",d.ui.mouse,{options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch"},_create:function(){var a=this;
this.element.addClass("ui-selectable"),this.dragged=!1;
var e;
this.refresh=function(){e=d(a.options.filter,a.element[0]),e.addClass("ui-selectee"),e.each(function(){var f=d(this),h=f.offset();
d.data(this,"selectable-item",{element:this,$element:f,left:h.left,top:h.top,right:h.left+f.outerWidth(),bottom:h.top+f.outerHeight(),startselected:!1,selected:f.hasClass("ui-selected"),selecting:f.hasClass("ui-selecting"),unselecting:f.hasClass("ui-unselecting")})
})
},this.refresh(),this.selectees=e.addClass("ui-selectee"),this._mouseInit(),this.helper=d("<div class='ui-selectable-helper'></div>")
},destroy:function(){return this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"),this._mouseDestroy(),this
},_mouseStart:function(a){var f=this;
this.opos=[a.pageX,a.pageY];
if(this.options.disabled){return
}var e=this.options;
this.selectees=d(e.filter,this.element[0]),this._trigger("start",a),d(e.appendTo).append(this.helper),this.helper.css({left:a.clientX,top:a.clientY,width:0,height:0}),e.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var b=d.data(this,"selectable-item");
b.startselected=!0,!a.metaKey&&!a.ctrlKey&&(b.$element.removeClass("ui-selected"),b.selected=!1,b.$element.addClass("ui-unselecting"),b.unselecting=!0,f._trigger("unselecting",a,{unselecting:b.element}))
}),d(a.target).parents().andSelf().each(function(){var h=d.data(this,"selectable-item");
if(h){var b=!a.metaKey&&!a.ctrlKey||!h.$element.hasClass("ui-selected");
return h.$element.removeClass(b?"ui-unselecting":"ui-selected").addClass(b?"ui-selecting":"ui-unselecting"),h.unselecting=!b,h.selecting=b,h.selected=b,b?f._trigger("selecting",a,{selecting:h.element}):f._trigger("unselecting",a,{unselecting:h.element}),!1
}})
},_mouseDrag:function(a){var p=this;
this.dragged=!0;
if(this.options.disabled){return
}var o=this.options,n=this.opos[0],m=this.opos[1],l=a.pageX,k=a.pageY;
if(n>l){var j=l;
l=n,n=j
}if(m>k){var j=k;
k=m,m=j
}return this.helper.css({left:n,top:m,width:l-n,height:k-m}),this.selectees.each(function(){var e=d.data(this,"selectable-item");
if(!e||e.element==p.element[0]){return
}var b=!1;
o.tolerance=="touch"?b=!(e.left>l||e.right<n||e.top>k||e.bottom<m):o.tolerance=="fit"&&(b=e.left>n&&e.right<l&&e.top>m&&e.bottom<k),b?(e.selected&&(e.$element.removeClass("ui-selected"),e.selected=!1),e.unselecting&&(e.$element.removeClass("ui-unselecting"),e.unselecting=!1),e.selecting||(e.$element.addClass("ui-selecting"),e.selecting=!0,p._trigger("selecting",a,{selecting:e.element}))):(e.selecting&&((a.metaKey||a.ctrlKey)&&e.startselected?(e.$element.removeClass("ui-selecting"),e.selecting=!1,e.$element.addClass("ui-selected"),e.selected=!0):(e.$element.removeClass("ui-selecting"),e.selecting=!1,e.startselected&&(e.$element.addClass("ui-unselecting"),e.unselecting=!0),p._trigger("unselecting",a,{unselecting:e.element}))),e.selected&&!a.metaKey&&!a.ctrlKey&&!e.startselected&&(e.$element.removeClass("ui-selected"),e.selected=!1,e.$element.addClass("ui-unselecting"),e.unselecting=!0,p._trigger("unselecting",a,{unselecting:e.element})))
}),!1
},_mouseStop:function(a){var f=this;
this.dragged=!1;
var e=this.options;
return d(".ui-unselecting",this.element[0]).each(function(){var b=d.data(this,"selectable-item");
b.$element.removeClass("ui-unselecting"),b.unselecting=!1,b.startselected=!1,f._trigger("unselected",a,{unselected:b.element})
}),d(".ui-selecting",this.element[0]).each(function(){var b=d.data(this,"selectable-item");
b.$element.removeClass("ui-selecting").addClass("ui-selected"),b.selecting=!1,b.selected=!0,b.startselected=!0,f._trigger("selected",a,{selected:b.element})
}),this._trigger("stop",a),this.helper.remove(),!1
}}),d.extend(d.ui.selectable,{version:"1.8.23"})
}(jQuery),function(d,c){d.widget("ui.sortable",d.ui.mouse,{widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000},_create:function(){var b=this.options;
this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?b.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0
},destroy:function(){d.Widget.prototype.destroy.call(this),this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();
for(var a=this.items.length-1;
a>=0;
a--){this.items[a].item.removeData(this.widgetName+"-item")
}return this
},_setOption:function(a,e){a==="disabled"?(this.options[a]=e,this.widget()[e?"addClass":"removeClass"]("ui-sortable-disabled")):d.Widget.prototype._setOption.apply(this,arguments)
},_mouseCapture:function(a,n){var m=this;
if(this.reverting){return !1
}if(this.options.disabled||this.options.type=="static"){return !1
}this._refreshItems(a);
var l=null,k=this,j=d(a.target).parents().each(function(){if(d.data(this,m.widgetName+"-item")==k){return l=d(this),!1
}});
d.data(a.target,m.widgetName+"-item")==k&&(l=d(a.target));
if(!l){return !1
}if(this.options.handle&&!n){var i=!1;
d(this.options.handle,l).find("*").andSelf().each(function(){this==a.target&&(i=!0)
});
if(!i){return !1
}}return this.currentItem=l,this._removeCurrentsFromItems(),!0
},_mouseStart:function(a,l,k){var j=this.options,i=this;
this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(a),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},d.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(a),this.originalPageX=a.pageX,this.originalPageY=a.pageY,j.cursorAt&&this._adjustOffsetFromHelper(j.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!=this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),j.containment&&this._setContainment(),j.cursor&&(d("body").css("cursor")&&(this._storedCursor=d("body").css("cursor")),d("body").css("cursor",j.cursor)),j.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",j.opacity)),j.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",j.zIndex)),this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",a,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions();
if(!k){for(var h=this.containers.length-1;
h>=0;
h--){this.containers[h]._trigger("activate",a,i._uiHash(this))
}}return d.ui.ddmanager&&(d.ui.ddmanager.current=this),d.ui.ddmanager&&!j.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(a),!0
},_mouseDrag:function(a){this.position=this._generatePosition(a),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs);
if(this.options.scroll){var n=this.options,m=!1;
this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-a.pageY<n.scrollSensitivity?this.scrollParent[0].scrollTop=m=this.scrollParent[0].scrollTop+n.scrollSpeed:a.pageY-this.overflowOffset.top<n.scrollSensitivity&&(this.scrollParent[0].scrollTop=m=this.scrollParent[0].scrollTop-n.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-a.pageX<n.scrollSensitivity?this.scrollParent[0].scrollLeft=m=this.scrollParent[0].scrollLeft+n.scrollSpeed:a.pageX-this.overflowOffset.left<n.scrollSensitivity&&(this.scrollParent[0].scrollLeft=m=this.scrollParent[0].scrollLeft-n.scrollSpeed)):(a.pageY-d(document).scrollTop()<n.scrollSensitivity?m=d(document).scrollTop(d(document).scrollTop()-n.scrollSpeed):d(window).height()-(a.pageY-d(document).scrollTop())<n.scrollSensitivity&&(m=d(document).scrollTop(d(document).scrollTop()+n.scrollSpeed)),a.pageX-d(document).scrollLeft()<n.scrollSensitivity?m=d(document).scrollLeft(d(document).scrollLeft()-n.scrollSpeed):d(window).width()-(a.pageX-d(document).scrollLeft())<n.scrollSensitivity&&(m=d(document).scrollLeft(d(document).scrollLeft()+n.scrollSpeed))),m!==!1&&d.ui.ddmanager&&!n.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a)
}this.positionAbs=this._convertPositionTo("absolute");
if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}for(var l=this.items.length-1;
l>=0;
l--){var k=this.items[l],j=k.item[0],i=this._intersectsWithPointer(k);
if(!i){continue
}if(j!=this.currentItem[0]&&this.placeholder[i==1?"next":"prev"]()[0]!=j&&!d.ui.contains(this.placeholder[0],j)&&(this.options.type=="semi-dynamic"?!d.ui.contains(this.element[0],j):!0)){this.direction=i==1?"down":"up";
if(this.options.tolerance=="pointer"||this._intersectsWithSides(k)){this._rearrange(a,k)
}else{break
}this._trigger("change",a,this._uiHash());
break
}}return this._contactContainers(a),d.ui.ddmanager&&d.ui.ddmanager.drag(this,a),this._trigger("sort",a,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1
},_mouseStop:function(a,i){if(!a){return
}d.ui.ddmanager&&!this.options.dropBehaviour&&d.ui.ddmanager.drop(this,a);
if(this.options.revert){var h=this,f=h.placeholder.offset();
h.reverting=!0,d(this.helper).animate({left:f.left-this.offset.parent.left-h.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:f.top-this.offset.parent.top-h.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){h._clear(a)
})
}else{this._clear(a,i)
}return !1
},cancel:function(){var a=this;
if(this.dragging){this._mouseUp({target:null}),this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();
for(var e=this.containers.length-1;
e>=0;
e--){this.containers[e]._trigger("deactivate",null,a._uiHash(this)),this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",null,a._uiHash(this)),this.containers[e].containerCache.over=0)
}}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),d.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?d(this.domPosition.prev).after(this.currentItem):d(this.domPosition.parent).prepend(this.currentItem)),this
},serialize:function(a){var f=this._getItemsAsjQuery(a&&a.connected),e=[];
return a=a||{},d(f).each(function(){var b=(d(a.item||this).attr(a.attribute||"id")||"").match(a.expression||/(.+)[-=_](.+)/);
b&&e.push((a.key||b[1]+"[]")+"="+(a.key&&a.expression?b[1]:b[2]))
}),!e.length&&a.key&&e.push(a.key+"="),e.join("&")
},toArray:function(a){var f=this._getItemsAsjQuery(a&&a.connected),e=[];
return a=a||{},f.each(function(){e.push(d(a.item||this).attr(a.attribute||"id")||"")
}),e
},_intersectsWith:function(x){var w=this.positionAbs.left,v=w+this.helperProportions.width,u=this.positionAbs.top,t=u+this.helperProportions.height,s=x.left,r=s+x.width,q=x.top,p=q+x.height,o=this.offset.click.top,n=this.offset.click.left,m=u+o>q&&u+o<p&&w+n>s&&w+n<r;
return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>x[this.floating?"width":"height"]?m:s<w+this.helperProportions.width/2&&v-this.helperProportions.width/2<r&&q<u+this.helperProportions.height/2&&t-this.helperProportions.height/2<p
},_intersectsWithPointer:function(a){var l=this.options.axis==="x"||d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top,a.height),k=this.options.axis==="y"||d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left,a.width),j=l&&k,i=this._getDragVerticalDirection(),h=this._getDragHorizontalDirection();
return j?this.floating?h&&h=="right"||i=="down"?2:1:i&&(i=="down"?2:1):!1
},_intersectsWithSides:function(a){var k=d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top+a.height/2,a.height),j=d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left+a.width/2,a.width),i=this._getDragVerticalDirection(),h=this._getDragHorizontalDirection();
return this.floating&&h?h=="right"&&j||h=="left"&&!j:i&&(i=="down"&&k||i=="up"&&!k)
},_getDragVerticalDirection:function(){var b=this.positionAbs.top-this.lastPositionAbs.top;
return b!=0&&(b>0?"down":"up")
},_getDragHorizontalDirection:function(){var b=this.positionAbs.left-this.lastPositionAbs.left;
return b!=0&&(b>0?"right":"left")
},refresh:function(b){return this._refreshItems(b),this.refreshPositions(),this
},_connectWith:function(){var b=this.options;
return b.connectWith.constructor==String?[b.connectWith]:b.connectWith
},_getItemsAsjQuery:function(r){var q=this,p=[],o=[],n=this._connectWith();
if(n&&r){for(var m=n.length-1;
m>=0;
m--){var l=d(n[m]);
for(var k=l.length-1;
k>=0;
k--){var a=d.data(l[k],this.widgetName);
a&&a!=this&&!a.options.disabled&&o.push([d.isFunction(a.options.items)?a.options.items.call(a.element):d(a.options.items,a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),a])
}}}o.push([d.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):d(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);
for(var m=o.length-1;
m>=0;
m--){o[m][0].each(function(){p.push(this)
})
}return d(p)
},_removeCurrentsFromItems:function(){var f=this.currentItem.find(":data("+this.widgetName+"-item)");
for(var e=0;
e<this.items.length;
e++){for(var h=0;
h<f.length;
h++){f[h]==this.items[e].item[0]&&this.items.splice(e,1)
}}},_refreshItems:function(z){this.items=[],this.containers=[this];
var y=this.items,x=this,w=[[d.isFunction(this.options.items)?this.options.items.call(this.element[0],z,{item:this.currentItem}):d(this.options.items,this.element),this]],v=this._connectWith();
if(v&&this.ready){for(var u=v.length-1;
u>=0;
u--){var t=d(v[u]);
for(var s=t.length-1;
s>=0;
s--){var r=d.data(t[s],this.widgetName);
r&&r!=this&&!r.options.disabled&&(w.push([d.isFunction(r.options.items)?r.options.items.call(r.element[0],z,{item:this.currentItem}):d(r.options.items,r.element),r]),this.containers.push(r))
}}}for(var u=w.length-1;
u>=0;
u--){var q=w[u][1],p=w[u][0];
for(var s=0,o=p.length;
s<o;
s++){var a=d(p[s]);
a.data(this.widgetName+"-item",q),y.push({item:a,instance:q,width:0,height:0,left:0,top:0})
}}},refreshPositions:function(a){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());
for(var k=this.items.length-1;
k>=0;
k--){var j=this.items[k];
if(j.instance!=this.currentContainer&&this.currentContainer&&j.item[0]!=this.currentItem[0]){continue
}var i=this.options.toleranceElement?d(this.options.toleranceElement,j.item):j.item;
a||(j.width=i.outerWidth(),j.height=i.outerHeight());
var h=i.offset();
j.left=h.left,j.top=h.top
}if(this.options.custom&&this.options.custom.refreshContainers){this.options.custom.refreshContainers.call(this)
}else{for(var k=this.containers.length-1;
k>=0;
k--){var h=this.containers[k].element.offset();
this.containers[k].containerCache.left=h.left,this.containers[k].containerCache.top=h.top,this.containers[k].containerCache.width=this.containers[k].element.outerWidth(),this.containers[k].containerCache.height=this.containers[k].element.outerHeight()
}}return this
},_createPlaceholder:function(a){var i=a||this,h=i.options;
if(!h.placeholder||h.placeholder.constructor==String){var f=h.placeholder;
h.placeholder={element:function(){var e=d(document.createElement(i.currentItem[0].nodeName)).addClass(f||i.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
return f||(e.style.visibility="hidden"),e
},update:function(j,e){if(f&&!h.forcePlaceholderSize){return
}e.height()||e.height(i.currentItem.innerHeight()-parseInt(i.currentItem.css("paddingTop")||0,10)-parseInt(i.currentItem.css("paddingBottom")||0,10)),e.width()||e.width(i.currentItem.innerWidth()-parseInt(i.currentItem.css("paddingLeft")||0,10)-parseInt(i.currentItem.css("paddingRight")||0,10))
}}
}i.placeholder=d(h.placeholder.element.call(i.element,i.currentItem)),i.currentItem.after(i.placeholder),h.placeholder.update(i,i.placeholder)
},_contactContainers:function(r){var q=null,p=null;
for(var o=this.containers.length-1;
o>=0;
o--){if(d.ui.contains(this.currentItem[0],this.containers[o].element[0])){continue
}if(this._intersectsWith(this.containers[o].containerCache)){if(q&&d.ui.contains(this.containers[o].element[0],q.element[0])){continue
}q=this.containers[o],p=o
}else{this.containers[o].containerCache.over&&(this.containers[o]._trigger("out",r,this._uiHash(this)),this.containers[o].containerCache.over=0)
}}if(!q){return
}if(this.containers.length===1){this.containers[p]._trigger("over",r,this._uiHash(this)),this.containers[p].containerCache.over=1
}else{if(this.currentContainer!=this.containers[p]){var n=10000,m=null,l=this.positionAbs[this.containers[p].floating?"left":"top"];
for(var k=this.items.length-1;
k>=0;
k--){if(!d.ui.contains(this.containers[p].element[0],this.items[k].item[0])){continue
}var a=this.containers[p].floating?this.items[k].item.offset().left:this.items[k].item.offset().top;
Math.abs(a-l)<n&&(n=Math.abs(a-l),m=this.items[k],this.direction=a-l>0?"down":"up")
}if(!m&&!this.options.dropOnEmpty){return
}this.currentContainer=this.containers[p],m?this._rearrange(r,m,null,!0):this._rearrange(r,null,this.containers[p].element,!0),this._trigger("change",r,this._uiHash()),this.containers[p]._trigger("change",r,this._uiHash(this)),this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",r,this._uiHash(this)),this.containers[p].containerCache.over=1
}}},_createHelper:function(a){var f=this.options,e=d.isFunction(f.helper)?d(f.helper.apply(this.element[0],[a,this.currentItem])):f.helper=="clone"?this.currentItem.clone():this.currentItem;
return e.parents("body").length||d(f.appendTo!="parent"?f.appendTo:this.currentItem[0].parentNode)[0].appendChild(e[0]),e[0]==this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(e[0].style.width==""||f.forceHelperSize)&&e.width(this.currentItem.width()),(e[0].style.height==""||f.forceHelperSize)&&e.height(this.currentItem.height()),e
},_adjustOffsetFromHelper:function(a){typeof a=="string"&&(a=a.split(" ")),d.isArray(a)&&(a={left:+a[0],top:+a[1]||0}),"left" in a&&(this.offset.click.left=a.left+this.margins.left),"right" in a&&(this.offset.click.left=this.helperProportions.width-a.right+this.margins.left),"top" in a&&(this.offset.click.top=a.top+this.margins.top),"bottom" in a&&(this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top)
},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();
var a=this.offsetParent.offset();
this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(a.left+=this.scrollParent.scrollLeft(),a.top+=this.scrollParent.scrollTop());
if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie){a={top:0,left:0}
}return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var b=this.currentItem.position();
return{top:b.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:b.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}return{top:0,left:0}
},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var a=this.options;
a.containment=="parent"&&(a.containment=this.helper[0].parentNode);
if(a.containment=="document"||a.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,d(a.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(d(a.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!/^(document|window|parent)$/.test(a.containment)){var i=d(a.containment)[0],h=d(a.containment).offset(),f=d(i).css("overflow")!="hidden";
this.containment=[h.left+(parseInt(d(i).css("borderLeftWidth"),10)||0)+(parseInt(d(i).css("paddingLeft"),10)||0)-this.margins.left,h.top+(parseInt(d(i).css("borderTopWidth"),10)||0)+(parseInt(d(i).css("paddingTop"),10)||0)-this.margins.top,h.left+(f?Math.max(i.scrollWidth,i.offsetWidth):i.offsetWidth)-(parseInt(d(i).css("borderLeftWidth"),10)||0)-(parseInt(d(i).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,h.top+(f?Math.max(i.scrollHeight,i.offsetHeight):i.offsetHeight)-(parseInt(d(i).css("borderTopWidth"),10)||0)-(parseInt(d(i).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]
}},_convertPositionTo:function(a,l){l||(l=this.position);
var k=a=="absolute"?1:-1,j=this.options,i=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,h=/(html|body)/i.test(i[0].tagName);
return{top:l.top+this.offset.relative.top*k+this.offset.parent.top*k-(d.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():h?0:i.scrollTop())*k),left:l.left+this.offset.relative.left*k+this.offset.parent.left*k-(d.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():h?0:i.scrollLeft())*k)}
},_generatePosition:function(a){var p=this.options,o=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,n=/(html|body)/i.test(o[0].tagName);
this.cssPosition=="relative"&&(this.scrollParent[0]==document||this.scrollParent[0]==this.offsetParent[0])&&(this.offset.relative=this._getRelativeOffset());
var m=a.pageX,l=a.pageY;
if(this.originalPosition){this.containment&&(a.pageX-this.offset.click.left<this.containment[0]&&(m=this.containment[0]+this.offset.click.left),a.pageY-this.offset.click.top<this.containment[1]&&(l=this.containment[1]+this.offset.click.top),a.pageX-this.offset.click.left>this.containment[2]&&(m=this.containment[2]+this.offset.click.left),a.pageY-this.offset.click.top>this.containment[3]&&(l=this.containment[3]+this.offset.click.top));
if(p.grid){var k=this.originalPageY+Math.round((l-this.originalPageY)/p.grid[1])*p.grid[1];
l=this.containment?k-this.offset.click.top<this.containment[1]||k-this.offset.click.top>this.containment[3]?k-this.offset.click.top<this.containment[1]?k+p.grid[1]:k-p.grid[1]:k:k;
var j=this.originalPageX+Math.round((m-this.originalPageX)/p.grid[0])*p.grid[0];
m=this.containment?j-this.offset.click.left<this.containment[0]||j-this.offset.click.left>this.containment[2]?j-this.offset.click.left<this.containment[0]?j+p.grid[0]:j-p.grid[0]:j:j
}}return{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():n?0:o.scrollTop()),left:m-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():n?0:o.scrollLeft())}
},_rearrange:function(i,h,m,l){m?m[0].appendChild(this.placeholder[0]):h.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?h.item[0]:h.item[0].nextSibling),this.counter=this.counter?++this.counter:1;
var k=this,j=this.counter;
window.setTimeout(function(){j==k.counter&&k.refreshPositions(!l)
},0)
},_clear:function(a,k){this.reverting=!1;
var j=[],i=this;
!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null;
if(this.helper[0]==this.currentItem[0]){for(var h in this._storedCSS){if(this._storedCSS[h]=="auto"||this._storedCSS[h]=="static"){this._storedCSS[h]=""
}}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
}else{this.currentItem.show()
}this.fromOutside&&!k&&j.push(function(b){this._trigger("receive",b,this._uiHash(this.fromOutside))
}),(this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!k&&j.push(function(b){this._trigger("update",b,this._uiHash())
});
if(!d.ui.contains(this.element[0],this.currentItem[0])){k||j.push(function(b){this._trigger("remove",b,this._uiHash())
});
for(var h=this.containers.length-1;
h>=0;
h--){d.ui.contains(this.containers[h].element[0],this.currentItem[0])&&!k&&(j.push(function(b){return function(e){b._trigger("receive",e,this._uiHash(this))
}
}.call(this,this.containers[h])),j.push(function(b){return function(e){b._trigger("update",e,this._uiHash(this))
}
}.call(this,this.containers[h])))
}}for(var h=this.containers.length-1;
h>=0;
h--){k||j.push(function(b){return function(e){b._trigger("deactivate",e,this._uiHash(this))
}
}.call(this,this.containers[h])),this.containers[h].containerCache.over&&(j.push(function(b){return function(e){b._trigger("out",e,this._uiHash(this))
}
}.call(this,this.containers[h])),this.containers[h].containerCache.over=0)
}this._storedCursor&&d("body").css("cursor",this._storedCursor),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex),this.dragging=!1;
if(this.cancelHelperRemoval){if(!k){this._trigger("beforeStop",a,this._uiHash());
for(var h=0;
h<j.length;
h++){j[h].call(this,a)
}this._trigger("stop",a,this._uiHash())
}return this.fromOutside=!1,!1
}k||this._trigger("beforeStop",a,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!=this.currentItem[0]&&this.helper.remove(),this.helper=null;
if(!k){for(var h=0;
h<j.length;
h++){j[h].call(this,a)
}this._trigger("stop",a,this._uiHash())
}return this.fromOutside=!1,!0
},_trigger:function(){d.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()
},_uiHash:function(a){var e=a||this;
return{helper:e.helper,placeholder:e.placeholder||d([]),position:e.position,originalPosition:e.originalPosition,offset:e.positionAbs,item:e.currentItem,sender:a?a.element:null}
}}),d.extend(d.ui.sortable,{version:"1.8.23"})
}(jQuery),jQuery.effects||function(z,y){function x(a){var d;
return a&&a.constructor==Array&&a.length==3?a:(d=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a))?[parseInt(d[1],10),parseInt(d[2],10),parseInt(d[3],10)]:(d=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(a))?[parseFloat(d[1])*2.55,parseFloat(d[2])*2.55,parseFloat(d[3])*2.55]:(d=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a))?[parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16)]:(d=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(a))?[parseInt(d[1]+d[1],16),parseInt(d[2]+d[2],16),parseInt(d[3]+d[3],16)]:(d=/rgba\(0, 0, 0, 0\)/.exec(a))?v.transparent:v[z.trim(a).toLowerCase()]
}function w(a,f){var c;
do{c=(z.curCSS||z.css)(a,f);
if(c!=""&&c!="transparent"||z.nodeName(a,"body")){break
}f="backgroundColor"
}while(a=a.parentNode);
return x(c)
}function s(){var h=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,f={},k,j;
if(h&&h.length&&h[0]&&h[h[0]]){var i=h.length;
while(i--){k=h[i],typeof h[k]=="string"&&(j=k.replace(/\-(\w)/g,function(d,c){return c.toUpperCase()
}),f[j]=h[k])
}}else{for(k in h){typeof h[k]=="string"&&(f[k]=h[k])
}}return f
}function r(a){var f,e;
for(f in a){e=a[f],(e==null||z.isFunction(e)||f in t||/scrollbar/.test(f)||!/color/i.test(f)&&isNaN(parseFloat(e)))&&delete a[f]
}return a
}function q(f,e){var i={_:0},h;
for(h in e){f[h]!=e[h]&&(i[h]=e[h])
}return i
}function p(a,i,h,f){typeof a=="object"&&(f=i,h=null,i=a,a=i.effect),z.isFunction(i)&&(f=i,h=null,i={});
if(typeof i=="number"||z.fx.speeds[i]){f=h,h=i,i={}
}return z.isFunction(h)&&(f=h,h=null),i=i||{},h=h||i.duration,h=z.fx.off?0:typeof h=="number"?h:h in z.fx.speeds?z.fx.speeds[h]:z.fx.speeds._default,f=f||i.complete,[a,i,h,f]
}function o(a){return !a||typeof a=="number"||z.fx.speeds[a]?!0:typeof a=="string"&&!z.effects[a]?!0:!1
}z.effects={},z.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(a,c){z.fx.step[c]=function(b){b.colorInit||(b.start=w(b.elem,c),b.end=x(b.end),b.colorInit=!0),b.elem.style[c]="rgb("+Math.max(Math.min(parseInt(b.pos*(b.end[0]-b.start[0])+b.start[0],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[1]-b.start[1])+b.start[1],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[2]-b.start[2])+b.start[2],10),255),0)+")"
}
});
var v={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},u=["add","remove","toggle"],t={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};
z.effects.animateClass=function(a,i,h,f){return z.isFunction(h)&&(f=h,h=null),this.queue(function(){var e=z(this),d=e.attr("style")||" ",c=r(s.call(this)),b,j=e.attr("class")||"";
z.each(u,function(k,l){a[l]&&e[l+"Class"](a[l])
}),b=r(s.call(this)),e.attr("class",j),e.animate(q(c,b),{queue:!1,duration:i,easing:h,complete:function(){z.each(u,function(k,l){a[l]&&e[l+"Class"](a[l])
}),typeof e.attr("style")=="object"?(e.attr("style").cssText="",e.attr("style").cssText=d):e.attr("style",d),f&&f.apply(this,arguments),z.dequeue(this)
}})
})
},z.fn.extend({_addClass:z.fn.addClass,addClass:function(a,i,h,f){return i?z.effects.animateClass.apply(this,[{add:a},i,h,f]):this._addClass(a)
},_removeClass:z.fn.removeClass,removeClass:function(a,i,h,f){return i?z.effects.animateClass.apply(this,[{remove:a},i,h,f]):this._removeClass(a)
},_toggleClass:z.fn.toggleClass,toggleClass:function(j,i,h,b,a){return typeof i=="boolean"||i===y?h?z.effects.animateClass.apply(this,[i?{add:j}:{remove:j},h,b,a]):this._toggleClass(j,i):z.effects.animateClass.apply(this,[{toggle:j},i,h,b])
},switchClass:function(a,k,j,i,h){return z.effects.animateClass.apply(this,[{add:k,remove:a},j,i,h])
}}),z.extend(z.effects,{version:"1.8.23",save:function(e,d){for(var f=0;
f<d.length;
f++){d[f]!==null&&e.data("ec.storage."+d[f],e[0].style[d[f]])
}},restore:function(e,d){for(var f=0;
f<d.length;
f++){d[f]!==null&&e.css(d[f],e.data("ec.storage."+d[f]))
}},setMode:function(d,c){return c=="toggle"&&(c=d.is(":hidden")?"show":"hide"),c
},getBaseline:function(f,e){var i,h;
switch(f[0]){case"top":i=0;
break;
case"middle":i=0.5;
break;
case"bottom":i=1;
break;
default:i=f[0]/e.height
}switch(f[1]){case"left":h=0;
break;
case"center":h=0.5;
break;
case"right":h=1;
break;
default:h=f[1]/e.width
}return{x:h,y:i}
},createWrapper:function(a){if(a.parent().is(".ui-effects-wrapper")){return a.parent()
}var k={width:a.outerWidth(!0),height:a.outerHeight(!0),"float":a.css("float")},j=z("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),i=document.activeElement;
try{i.id
}catch(h){i=document.body
}return a.wrap(j),(a[0]===i||z.contains(a[0],i))&&z(i).focus(),j=a.parent(),a.css("position")=="static"?(j.css({position:"relative"}),a.css({position:"relative"})):(z.extend(k,{position:a.css("position"),zIndex:a.css("z-index")}),z.each(["top","left","bottom","right"],function(b,c){k[c]=a.css(c),isNaN(parseInt(k[c],10))&&(k[c]="auto")
}),a.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),j.css(k).show()
},removeWrapper:function(a){var f,e=document.activeElement;
return a.parent().is(".ui-effects-wrapper")?(f=a.parent().replaceWith(a),(a[0]===e||z.contains(a[0],e))&&z(e).focus(),f):a
},setTransition:function(a,i,h,f){return f=f||{},z.each(i,function(b,e){var d=a.cssUnit(e);
d[0]>0&&(f[e]=d[0]*h+d[1])
}),f
}}),z.fn.extend({effect:function(a,C,B,A){var m=p.apply(this,arguments),l={options:m[1],duration:m[2],callback:m[3]},k=l.options.mode,j=z.effects[a];
return z.fx.off||!j?k?this[k](l.duration,l.callback):this.each(function(){l.callback&&l.callback.call(this)
}):j.call(this,l)
},_show:z.fn.show,show:function(d){if(o(d)){return this._show.apply(this,arguments)
}var c=p.apply(this,arguments);
return c[1].mode="show",this.effect.apply(this,c)
},_hide:z.fn.hide,hide:function(d){if(o(d)){return this._hide.apply(this,arguments)
}var c=p.apply(this,arguments);
return c[1].mode="hide",this.effect.apply(this,c)
},__toggle:z.fn.toggle,toggle:function(a){if(o(a)||typeof a=="boolean"||z.isFunction(a)){return this.__toggle.apply(this,arguments)
}var d=p.apply(this,arguments);
return d[1].mode="toggle",this.effect.apply(this,d)
},cssUnit:function(a){var f=this.css(a),e=[];
return z.each(["em","px","%","pt"],function(d,c){f.indexOf(c)>0&&(e=[parseFloat(f),c])
}),e
}});
var n={};
z.each(["Quad","Cubic","Quart","Quint","Expo"],function(d,c){n[c]=function(a){return Math.pow(a,d+2)
}
}),z.extend(n,{Sine:function(b){return 1-Math.cos(b*Math.PI/2)
},Circ:function(b){return 1-Math.sqrt(1-b*b)
},Elastic:function(b){return b===0||b===1?b:-Math.pow(2,8*(b-1))*Math.sin(((b-1)*80-7.5)*Math.PI/15)
},Back:function(b){return b*b*(3*b-2)
},Bounce:function(e){var d,f=4;
while(e<((d=Math.pow(2,--f))-1)/11){}return 1/Math.pow(4,3-f)-7.5625*Math.pow((d*3-2)/22-e,2)
}}),z.each(n,function(a,d){z.easing["easeIn"+a]=d,z.easing["easeOut"+a]=function(b){return 1-d(1-b)
},z.easing["easeInOut"+a]=function(b){return b<0.5?d(b*2)/2:d(b*-2+2)/-2+1
}
})
}(jQuery),function(d,c){d.effects.blind=function(a){return this.queue(function(){var q=d(this),p=["position","top","bottom","left","right"],o=d.effects.setMode(q,a.options.mode||"hide"),n=a.options.direction||"vertical";
d.effects.save(q,p),q.show();
var m=d.effects.createWrapper(q).css({overflow:"hidden"}),l=n=="vertical"?"height":"width",k=n=="vertical"?m.height():m.width();
o=="show"&&m.css(l,0);
var b={};
b[l]=o=="show"?k:0,m.animate(b,a.duration,a.options.easing,function(){o=="hide"&&q.hide(),d.effects.restore(q,p),d.effects.removeWrapper(q),a.callback&&a.callback.apply(q[0],arguments),q.dequeue()
})
})
}
}(jQuery),function(d,c){d.effects.bounce=function(a){return this.queue(function(){var A=d(this),z=["position","top","bottom","left","right"],y=d.effects.setMode(A,a.options.mode||"effect"),x=a.options.direction||"up",w=a.options.distance||20,v=a.options.times||5,u=a.duration||250;
/show|hide/.test(y)&&z.push("opacity"),d.effects.save(A,z),A.show(),d.effects.createWrapper(A);
var t=x=="up"||x=="down"?"top":"left",s=x=="up"||x=="left"?"pos":"neg",w=a.options.distance||(t=="top"?A.outerHeight(!0)/3:A.outerWidth(!0)/3);
y=="show"&&A.css("opacity",0).css(t,s=="pos"?-w:w),y=="hide"&&(w=w/(v*2)),y!="hide"&&v--;
if(y=="show"){var r={opacity:1};
r[t]=(s=="pos"?"+=":"-=")+w,A.animate(r,u/2,a.options.easing),w=w/2,v--
}for(var q=0;
q<v;
q++){var o={},b={};
o[t]=(s=="pos"?"-=":"+=")+w,b[t]=(s=="pos"?"+=":"-=")+w,A.animate(o,u/2,a.options.easing).animate(b,u/2,a.options.easing),w=y=="hide"?w*2:w/2
}if(y=="hide"){var r={opacity:0};
r[t]=(s=="pos"?"-=":"+=")+w,A.animate(r,u/2,a.options.easing,function(){A.hide(),d.effects.restore(A,z),d.effects.removeWrapper(A),a.callback&&a.callback.apply(this,arguments)
})
}else{var o={},b={};
o[t]=(s=="pos"?"-=":"+=")+w,b[t]=(s=="pos"?"+=":"-=")+w,A.animate(o,u/2,a.options.easing).animate(b,u/2,a.options.easing,function(){d.effects.restore(A,z),d.effects.removeWrapper(A),a.callback&&a.callback.apply(this,arguments)
})
}A.queue("fx",function(){A.dequeue()
}),A.dequeue()
})
}
}(jQuery),function(d,c){d.effects.clip=function(a){return this.queue(function(){var s=d(this),r=["position","top","bottom","left","right","height","width"],q=d.effects.setMode(s,a.options.mode||"hide"),p=a.options.direction||"vertical";
d.effects.save(s,r),s.show();
var o=d.effects.createWrapper(s).css({overflow:"hidden"}),n=s[0].tagName=="IMG"?o:s,m={size:p=="vertical"?"height":"width",position:p=="vertical"?"top":"left"},l=p=="vertical"?n.height():n.width();
q=="show"&&(n.css(m.size,0),n.css(m.position,l/2));
var b={};
b[m.size]=q=="show"?l:0,b[m.position]=q=="show"?0:l/2,n.animate(b,{queue:!1,duration:a.duration,easing:a.options.easing,complete:function(){q=="hide"&&s.hide(),d.effects.restore(s,r),d.effects.removeWrapper(s),a.callback&&a.callback.apply(s[0],arguments),s.dequeue()
}})
})
}
}(jQuery),function(d,c){d.effects.drop=function(a){return this.queue(function(){var q=d(this),p=["position","top","bottom","left","right","opacity"],o=d.effects.setMode(q,a.options.mode||"hide"),n=a.options.direction||"left";
d.effects.save(q,p),q.show(),d.effects.createWrapper(q);
var m=n=="up"||n=="down"?"top":"left",l=n=="up"||n=="left"?"pos":"neg",k=a.options.distance||(m=="top"?q.outerHeight(!0)/2:q.outerWidth(!0)/2);
o=="show"&&q.css("opacity",0).css(m,l=="pos"?-k:k);
var b={opacity:o=="show"?1:0};
b[m]=(o=="show"?l=="pos"?"+=":"-=":l=="pos"?"-=":"+=")+k,q.animate(b,{queue:!1,duration:a.duration,easing:a.options.easing,complete:function(){o=="hide"&&q.hide(),d.effects.restore(q,p),d.effects.removeWrapper(q),a.callback&&a.callback.apply(this,arguments),q.dequeue()
}})
})
}
}(jQuery),function(d,c){d.effects.explode=function(a){return this.queue(function(){var q=a.options.pieces?Math.round(Math.sqrt(a.options.pieces)):3,p=a.options.pieces?Math.round(Math.sqrt(a.options.pieces)):3;
a.options.mode=a.options.mode=="toggle"?d(this).is(":visible")?"hide":"show":a.options.mode;
var o=d(this).show().css("visibility","hidden"),n=o.offset();
n.top-=parseInt(o.css("marginTop"),10)||0,n.left-=parseInt(o.css("marginLeft"),10)||0;
var m=o.outerWidth(!0),l=o.outerHeight(!0);
for(var k=0;
k<q;
k++){for(var b=0;
b<p;
b++){o.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-b*(m/p),top:-k*(l/q)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:m/p,height:l/q,left:n.left+b*(m/p)+(a.options.mode=="show"?(b-Math.floor(p/2))*(m/p):0),top:n.top+k*(l/q)+(a.options.mode=="show"?(k-Math.floor(q/2))*(l/q):0),opacity:a.options.mode=="show"?0:1}).animate({left:n.left+b*(m/p)+(a.options.mode=="show"?0:(b-Math.floor(p/2))*(m/p)),top:n.top+k*(l/q)+(a.options.mode=="show"?0:(k-Math.floor(q/2))*(l/q)),opacity:a.options.mode=="show"?1:0},a.duration||500)
}}setTimeout(function(){a.options.mode=="show"?o.css({visibility:"visible"}):o.css({visibility:"visible"}).hide(),a.callback&&a.callback.apply(o[0]),o.dequeue(),d("div.ui-effects-explode").remove()
},a.duration||500)
})
}
}(jQuery),function(d,c){d.effects.fade=function(a){return this.queue(function(){var e=d(this),b=d.effects.setMode(e,a.options.mode||"hide");
e.animate({opacity:b},{queue:!1,duration:a.duration,easing:a.options.easing,complete:function(){a.callback&&a.callback.apply(this,arguments),e.dequeue()
}})
})
}
}(jQuery),function(d,c){d.effects.fold=function(a){return this.queue(function(){var A=d(this),z=["position","top","bottom","left","right"],y=d.effects.setMode(A,a.options.mode||"hide"),x=a.options.size||15,w=!!a.options.horizFirst,v=a.duration?a.duration/2:d.fx.speeds._default/2;
d.effects.save(A,z),A.show();
var u=d.effects.createWrapper(A).css({overflow:"hidden"}),t=y=="show"!=w,s=t?["width","height"]:["height","width"],r=t?[u.width(),u.height()]:[u.height(),u.width()],q=/([0-9]+)%/.exec(x);
q&&(x=parseInt(q[1],10)/100*r[y=="hide"?0:1]),y=="show"&&u.css(w?{height:0,width:x}:{height:x,width:0});
var o={},b={};
o[s[0]]=y=="show"?r[0]:x,b[s[1]]=y=="show"?r[1]:0,u.animate(o,v,a.options.easing).animate(b,v,a.options.easing,function(){y=="hide"&&A.hide(),d.effects.restore(A,z),d.effects.removeWrapper(A),a.callback&&a.callback.apply(A[0],arguments),A.dequeue()
})
})
}
}(jQuery),function(d,c){d.effects.highlight=function(a){return this.queue(function(){var j=d(this),i=["backgroundImage","backgroundColor","opacity"],h=d.effects.setMode(j,a.options.mode||"show"),b={backgroundColor:j.css("backgroundColor")};
h=="hide"&&(b.opacity=0),d.effects.save(j,i),j.show().css({backgroundImage:"none",backgroundColor:a.options.color||"#ffff99"}).animate(b,{queue:!1,duration:a.duration,easing:a.options.easing,complete:function(){h=="hide"&&j.hide(),d.effects.restore(j,i),h=="show"&&!d.support.opacity&&this.style.removeAttribute("filter"),a.callback&&a.callback.apply(this,arguments),j.dequeue()
}})
})
}
}(jQuery),function(d,c){d.effects.pulsate=function(a){return this.queue(function(){var o=d(this),n=d.effects.setMode(o,a.options.mode||"show"),m=(a.options.times||5)*2-1,l=a.duration?a.duration/2:d.fx.speeds._default/2,k=o.is(":visible"),j=0;
k||(o.css("opacity",0).show(),j=1),(n=="hide"&&k||n=="show"&&!k)&&m--;
for(var b=0;
b<m;
b++){o.animate({opacity:j},l,a.options.easing),j=(j+1)%2
}o.animate({opacity:j},l,a.options.easing,function(){j==0&&o.hide(),a.callback&&a.callback.apply(this,arguments)
}),o.queue("fx",function(){o.dequeue()
}).dequeue()
})
}
}(jQuery),function(d,c){d.effects.puff=function(a){return this.queue(function(){var k=d(this),j=d.effects.setMode(k,a.options.mode||"hide"),i=parseInt(a.options.percent,10)||150,h=i/100,b={height:k.height(),width:k.width()};
d.extend(a.options,{fade:!0,mode:j,percent:j=="hide"?i:100,from:j=="hide"?b:{height:b.height*h,width:b.width*h}}),k.effect("scale",a.options,a.duration,a.callback),k.dequeue()
})
},d.effects.scale=function(a){return this.queue(function(){var q=d(this),p=d.extend(!0,{},a.options),o=d.effects.setMode(q,a.options.mode||"effect"),n=parseInt(a.options.percent,10)||(parseInt(a.options.percent,10)==0?0:o=="hide"?0:100),m=a.options.direction||"both",l=a.options.origin;
o!="effect"&&(p.origin=l||["middle","center"],p.restore=!0);
var k={height:q.height(),width:q.width()};
q.from=a.options.from||(o=="show"?{height:0,width:0}:k);
var b={y:m!="horizontal"?n/100:1,x:m!="vertical"?n/100:1};
q.to={height:k.height*b.y,width:k.width*b.x},a.options.fade&&(o=="show"&&(q.from.opacity=0,q.to.opacity=1),o=="hide"&&(q.from.opacity=1,q.to.opacity=0)),p.from=q.from,p.to=q.to,p.mode=o,q.effect("size",p,a.duration,a.callback),q.dequeue()
})
},d.effects.size=function(a){return this.queue(function(){var C=d(this),B=["position","top","bottom","left","right","width","height","overflow","opacity"],A=["position","top","bottom","left","right","overflow","opacity"],z=["width","height","overflow"],y=["fontSize"],x=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],w=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],v=d.effects.setMode(C,a.options.mode||"effect"),u=a.options.restore||!1,t=a.options.scale||"both",s=a.options.origin,r={height:C.height(),width:C.width()};
C.from=a.options.from||r,C.to=a.options.to||r;
if(s){var o=d.effects.getBaseline(s,r);
C.from.top=(r.height-C.from.height)*o.y,C.from.left=(r.width-C.from.width)*o.x,C.to.top=(r.height-C.to.height)*o.y,C.to.left=(r.width-C.to.width)*o.x
}var b={from:{y:C.from.height/r.height,x:C.from.width/r.width},to:{y:C.to.height/r.height,x:C.to.width/r.width}};
if(t=="box"||t=="both"){b.from.y!=b.to.y&&(B=B.concat(x),C.from=d.effects.setTransition(C,x,b.from.y,C.from),C.to=d.effects.setTransition(C,x,b.to.y,C.to)),b.from.x!=b.to.x&&(B=B.concat(w),C.from=d.effects.setTransition(C,w,b.from.x,C.from),C.to=d.effects.setTransition(C,w,b.to.x,C.to))
}(t=="content"||t=="both")&&b.from.y!=b.to.y&&(B=B.concat(y),C.from=d.effects.setTransition(C,y,b.from.y,C.from),C.to=d.effects.setTransition(C,y,b.to.y,C.to)),d.effects.save(C,u?B:A),C.show(),d.effects.createWrapper(C),C.css("overflow","hidden").css(C.from);
if(t=="content"||t=="both"){x=x.concat(["marginTop","marginBottom"]).concat(y),w=w.concat(["marginLeft","marginRight"]),z=B.concat(x).concat(w),C.find("*[width]").each(function(){var f=d(this);
u&&d.effects.save(f,z);
var e={height:f.height(),width:f.width()};
f.from={height:e.height*b.from.y,width:e.width*b.from.x},f.to={height:e.height*b.to.y,width:e.width*b.to.x},b.from.y!=b.to.y&&(f.from=d.effects.setTransition(f,x,b.from.y,f.from),f.to=d.effects.setTransition(f,x,b.to.y,f.to)),b.from.x!=b.to.x&&(f.from=d.effects.setTransition(f,w,b.from.x,f.from),f.to=d.effects.setTransition(f,w,b.to.x,f.to)),f.css(f.from),f.animate(f.to,a.duration,a.options.easing,function(){u&&d.effects.restore(f,z)
})
})
}C.animate(C.to,{queue:!1,duration:a.duration,easing:a.options.easing,complete:function(){C.to.opacity===0&&C.css("opacity",C.from.opacity),v=="hide"&&C.hide(),d.effects.restore(C,u?B:A),d.effects.removeWrapper(C),a.callback&&a.callback.apply(this,arguments),C.dequeue()
}})
})
}
}(jQuery),function(d,c){d.effects.shake=function(a){return this.queue(function(){var A=d(this),z=["position","top","bottom","left","right"],y=d.effects.setMode(A,a.options.mode||"effect"),x=a.options.direction||"left",w=a.options.distance||20,v=a.options.times||3,u=a.duration||a.options.duration||140;
d.effects.save(A,z),A.show(),d.effects.createWrapper(A);
var t=x=="up"||x=="down"?"top":"left",s=x=="up"||x=="left"?"pos":"neg",r={},q={},o={};
r[t]=(s=="pos"?"-=":"+=")+w,q[t]=(s=="pos"?"+=":"-=")+w*2,o[t]=(s=="pos"?"-=":"+=")+w*2,A.animate(r,u,a.options.easing);
for(var b=1;
b<v;
b++){A.animate(q,u,a.options.easing).animate(o,u,a.options.easing)
}A.animate(q,u,a.options.easing).animate(r,u/2,a.options.easing,function(){d.effects.restore(A,z),d.effects.removeWrapper(A),a.callback&&a.callback.apply(this,arguments)
}),A.queue("fx",function(){A.dequeue()
}),A.dequeue()
})
}
}(jQuery),function(d,c){d.effects.slide=function(a){return this.queue(function(){var q=d(this),p=["position","top","bottom","left","right"],o=d.effects.setMode(q,a.options.mode||"show"),n=a.options.direction||"left";
d.effects.save(q,p),q.show(),d.effects.createWrapper(q).css({overflow:"hidden"});
var m=n=="up"||n=="down"?"top":"left",l=n=="up"||n=="left"?"pos":"neg",k=a.options.distance||(m=="top"?q.outerHeight(!0):q.outerWidth(!0));
o=="show"&&q.css(m,l=="pos"?isNaN(k)?"-"+k:-k:k);
var b={};
b[m]=(o=="show"?l=="pos"?"+=":"-=":l=="pos"?"-=":"+=")+k,q.animate(b,{queue:!1,duration:a.duration,easing:a.options.easing,complete:function(){o=="hide"&&q.hide(),d.effects.restore(q,p),d.effects.removeWrapper(q),a.callback&&a.callback.apply(this,arguments),q.dequeue()
}})
})
}
}(jQuery),function(d,c){d.effects.transfer=function(a){return this.queue(function(){var m=d(this),l=d(a.options.to),k=l.offset(),j={top:k.top,left:k.left,height:l.innerHeight(),width:l.innerWidth()},i=m.offset(),b=d('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(a.options.className).css({top:i.top,left:i.left,height:m.innerHeight(),width:m.innerWidth(),position:"absolute"}).animate(j,a.duration,a.options.easing,function(){b.remove(),a.callback&&a.callback.apply(m[0],arguments),m.dequeue()
})
})
}
}(jQuery),function(d,c){d.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:!0,clearStyle:!1,collapsible:!1,event:"click",fillSpace:!1,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:!1,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()
}},_create:function(){var a=this,i=a.options;
a.running=0,a.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"),a.headers=a.element.find(i.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){if(i.disabled){return
}d(this).addClass("ui-state-hover")
}).bind("mouseleave.accordion",function(){if(i.disabled){return
}d(this).removeClass("ui-state-hover")
}).bind("focus.accordion",function(){if(i.disabled){return
}d(this).addClass("ui-state-focus")
}).bind("blur.accordion",function(){if(i.disabled){return
}d(this).removeClass("ui-state-focus")
}),a.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
if(i.navigation){var h=a.element.find("a").filter(i.navigationFilter).eq(0);
if(h.length){var f=h.closest(".ui-accordion-header");
f.length?a.active=f:a.active=h.closest(".ui-accordion-content").prev()
}}a.active=a._findActive(a.active||i.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"),a.active.next().addClass("ui-accordion-content-active"),a._createIcons(),a.resize(),a.element.attr("role","tablist"),a.headers.attr("role","tab").bind("keydown.accordion",function(b){return a._keydown(b)
}).next().attr("role","tabpanel"),a.headers.not(a.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide(),a.active.length?a.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}):a.headers.eq(0).attr("tabIndex",0),d.browser.safari||a.headers.find("a").attr("tabIndex",-1),i.event&&a.headers.bind(i.event.split(" ").join(".accordion ")+".accordion",function(b){a._clickHandler.call(a,b,this),b.preventDefault()
})
},_createIcons:function(){var a=this.options;
a.icons&&(d("<span></span>").addClass("ui-icon "+a.icons.header).prependTo(this.headers),this.active.children(".ui-icon").toggleClass(a.icons.header).toggleClass(a.icons.headerSelected),this.element.addClass("ui-accordion-icons"))
},_destroyIcons:function(){this.headers.children(".ui-icon").remove(),this.element.removeClass("ui-accordion-icons")
},destroy:function(){var a=this.options;
this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"),this.headers.find("a").removeAttr("tabIndex"),this._destroyIcons();
var e=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
return(a.autoHeight||a.fillHeight)&&e.css("height",""),d.Widget.prototype.destroy.call(this)
},_setOption:function(a,e){d.Widget.prototype._setOption.apply(this,arguments),a=="active"&&this.activate(e),a=="icons"&&(this._destroyIcons(),e&&this._createIcons()),a=="disabled"&&this.headers.add(this.headers.next())[e?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")
},_keydown:function(a){if(this.options.disabled||a.altKey||a.ctrlKey){return
}var k=d.ui.keyCode,j=this.headers.length,i=this.headers.index(a.target),h=!1;
switch(a.keyCode){case k.RIGHT:case k.DOWN:h=this.headers[(i+1)%j];
break;
case k.LEFT:case k.UP:h=this.headers[(i-1+j)%j];
break;
case k.SPACE:case k.ENTER:this._clickHandler({target:a.target},a.target),a.preventDefault()
}return h?(d(a.target).attr("tabIndex",-1),d(h).attr("tabIndex",0),h.focus(),!1):!0
},resize:function(){var a=this.options,f;
if(a.fillSpace){if(d.browser.msie){var e=this.element.parent().css("overflow");
this.element.parent().css("overflow","hidden")
}f=this.element.parent().height(),d.browser.msie&&this.element.parent().css("overflow",e),this.headers.each(function(){f-=d(this).outerHeight(!0)
}),this.headers.next().each(function(){d(this).height(Math.max(0,f-d(this).innerHeight()+d(this).height()))
}).css("overflow","auto")
}else{a.autoHeight&&(f=0,this.headers.next().each(function(){f=Math.max(f,d(this).height("").height())
}).height(f))
}return this
},activate:function(f){this.options.active=f;
var e=this._findActive(f)[0];
return this._clickHandler({target:e},e),this
},_findActive:function(a){return a?typeof a=="number"?this.headers.filter(":eq("+a+")"):this.headers.not(this.headers.not(a)):a===!1?d([]):this.headers.filter(":eq(0)")
},_clickHandler:function(t,s){var r=this.options;
if(r.disabled){return
}if(!t.target){if(!r.collapsible){return
}this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(r.icons.headerSelected).addClass(r.icons.header),this.active.next().addClass("ui-accordion-content-active");
var q=this.active.next(),p={options:r,newHeader:d([]),oldHeader:r.active,newContent:d([]),oldContent:q},o=this.active=d([]);
this._toggle(o,q,p);
return
}var n=d(t.currentTarget||s),m=n[0]===this.active[0];
r.active=r.collapsible&&m?!1:this.headers.index(n);
if(this.running||!r.collapsible&&m){return
}var l=this.active,o=n.next(),q=this.active.next(),p={options:r,newHeader:m&&r.collapsible?d([]):n,oldHeader:this.active,newContent:m&&r.collapsible?d([]):o,oldContent:q},a=this.headers.index(this.active[0])>this.headers.index(n[0]);
this.active=m?d([]):n,this._toggle(o,q,p,m,a),l.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(r.icons.headerSelected).addClass(r.icons.header),m||(n.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(r.icons.header).addClass(r.icons.headerSelected),n.next().addClass("ui-accordion-content-active"));
return
},_toggle:function(x,w,v,u,t){var s=this,r=s.options;
s.toShow=x,s.toHide=w,s.data=v;
var q=function(){if(!s){return
}return s._completed.apply(s,arguments)
};
s._trigger("changestart",null,s.data),s.running=w.size()===0?x.size():w.size();
if(r.animated){var p={};
r.collapsible&&u?p={toShow:d([]),toHide:w,complete:q,down:t,autoHeight:r.autoHeight||r.fillSpace}:p={toShow:x,toHide:w,complete:q,down:t,autoHeight:r.autoHeight||r.fillSpace},r.proxied||(r.proxied=r.animated),r.proxiedDuration||(r.proxiedDuration=r.duration),r.animated=d.isFunction(r.proxied)?r.proxied(p):r.proxied,r.duration=d.isFunction(r.proxiedDuration)?r.proxiedDuration(p):r.proxiedDuration;
var o=d.ui.accordion.animations,n=r.duration,a=r.animated;
a&&!o[a]&&!d.easing[a]&&(a="slide"),o[a]||(o[a]=function(b){this.slide(b,{easing:a,duration:n||700})
}),o[a](p)
}else{r.collapsible&&u?x.toggle():(w.hide(),x.show()),q(!0)
}w.prev().attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).blur(),x.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()
},_completed:function(b){this.running=b?0:--this.running;
if(this.running){return
}this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""}),this.toHide.removeClass("ui-accordion-content-active"),this.toHide.length&&(this.toHide.parent()[0].className=this.toHide.parent()[0].className),this._trigger("change",null,this.data)
}}),d.extend(d.ui.accordion,{version:"1.8.23",animations:{slide:function(r,q){r=d.extend({easing:"swing",duration:300},r,q);
if(!r.toHide.size()){r.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},r);
return
}if(!r.toShow.size()){r.toHide.animate({height:"hide",paddingTop:"hide",paddingBottom:"hide"},r);
return
}var p=r.toShow.css("overflow"),o=0,n={},m={},l=["height","paddingTop","paddingBottom"],k,a=r.toShow;
k=a[0].style.width,a.width(a.parent().width()-parseFloat(a.css("paddingLeft"))-parseFloat(a.css("paddingRight"))-(parseFloat(a.css("borderLeftWidth"))||0)-(parseFloat(a.css("borderRightWidth"))||0)),d.each(l,function(h,f){m[f]="hide";
var b=(""+d.css(r.toShow[0],f)).match(/^([\d+-.]+)(.*)$/);
n[f]={value:b[1],unit:b[2]||"px"}
}),r.toShow.css({height:0,overflow:"hidden"}).show(),r.toHide.filter(":hidden").each(r.complete).end().filter(":visible").animate(m,{step:function(b,e){e.prop=="height"&&(o=e.end-e.start===0?0:(e.now-e.start)/(e.end-e.start)),r.toShow[0].style[e.prop]=o*n[e.prop].value+n[e.prop].unit
},duration:r.duration,easing:r.easing,complete:function(){r.autoHeight||r.toShow.css("height",""),r.toShow.css({width:k,overflow:p}),r.complete()
}})
},bounceslide:function(b){this.slide(b,{easing:b.down?"easeOutBounce":"swing",duration:b.down?1000:200})
}}})
}(jQuery),function(e,d){var f=0;
e.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var a=this,i=this.element[0].ownerDocument,h;
this.isMultiLine=this.element.is("textarea"),this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(j){if(a.options.disabled||a.element.propAttr("readOnly")){return
}h=!1;
var b=e.ui.keyCode;
switch(j.keyCode){case b.PAGE_UP:a._move("previousPage",j);
break;
case b.PAGE_DOWN:a._move("nextPage",j);
break;
case b.UP:a._keyEvent("previous",j);
break;
case b.DOWN:a._keyEvent("next",j);
break;
case b.ENTER:case b.NUMPAD_ENTER:a.menu.active&&(h=!0,j.preventDefault());
case b.TAB:if(!a.menu.active){return
}a.menu.select(j);
break;
case b.ESCAPE:a.element.val(a.term),a.close(j);
break;
default:clearTimeout(a.searching),a.searching=setTimeout(function(){a.term!=a.element.val()&&(a.selectedItem=null,a.search(null,j))
},a.options.delay)
}}).bind("keypress.autocomplete",function(b){h&&(h=!1,b.preventDefault())
}).bind("focus.autocomplete",function(){if(a.options.disabled){return
}a.selectedItem=null,a.previous=a.element.val()
}).bind("blur.autocomplete",function(b){if(a.options.disabled){return
}clearTimeout(a.searching),a.closing=setTimeout(function(){a.close(b),a._change(b)
},150)
}),this._initSource(),this.menu=e("<ul></ul>").addClass("ui-autocomplete").appendTo(e(this.options.appendTo||"body",i)[0]).mousedown(function(j){var b=a.menu.element[0];
e(j.target).closest(".ui-menu-item").length||setTimeout(function(){e(document).one("mousedown",function(k){k.target!==a.element[0]&&k.target!==b&&!e.ui.contains(b,k.target)&&a.close()
})
},1),setTimeout(function(){clearTimeout(a.closing)
},13)
}).menu({focus:function(b,k){var j=k.item.data("item.autocomplete");
!1!==a._trigger("focus",b,{item:j})&&/^key/.test(b.originalEvent.type)&&a.element.val(j.value)
},selected:function(b,k){var j=k.item.data("item.autocomplete"),c=a.previous;
a.element[0]!==i.activeElement&&(a.element.focus(),a.previous=c,setTimeout(function(){a.previous=c,a.selectedItem=j
},1)),!1!==a._trigger("select",b,{item:j})&&a.element.val(j.value),a.term=a.element.val(),a.close(b),a.selectedItem=j
},blur:function(b,j){a.menu.element.is(":visible")&&a.element.val()!==a.term&&a.element.val(a.term)
}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu"),e.fn.bgiframe&&this.menu.element.bgiframe(),a.beforeunloadHandler=function(){a.element.removeAttr("autocomplete")
},e(window).bind("beforeunload",a.beforeunloadHandler)
},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"),this.menu.element.remove(),e(window).unbind("beforeunload",this.beforeunloadHandler),e.Widget.prototype.destroy.call(this)
},_setOption:function(a,h){e.Widget.prototype._setOption.apply(this,arguments),a==="source"&&this._initSource(),a==="appendTo"&&this.menu.element.appendTo(e(h||"body",this.element[0].ownerDocument)[0]),a==="disabled"&&h&&this.xhr&&this.xhr.abort()
},_initSource:function(){var a=this,i,h;
e.isArray(this.options.source)?(i=this.options.source,this.source=function(c,j){j(e.ui.autocomplete.filter(i,c.term))
}):typeof this.options.source=="string"?(h=this.options.source,this.source=function(j,b){a.xhr&&a.xhr.abort(),a.xhr=e.ajax({url:h,data:j,dataType:"json",success:function(k,c){b(k)
},error:function(){b([])
}})
}):this.source=this.options.source
},search:function(h,c){h=h!=null?h:this.element.val(),this.term=this.element.val();
if(h.length<this.options.minLength){return this.close(c)
}clearTimeout(this.closing);
if(this._trigger("search",c)===!1){return
}return this._search(h)
},_search:function(b){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.source({term:b},this._response())
},_response:function(){var h=this,c=++f;
return function(a){c===f&&h.__response(a),h.pending--,h.pending||h.element.removeClass("ui-autocomplete-loading")
}
},__response:function(b){!this.options.disabled&&b&&b.length?(b=this._normalize(b),this._suggest(b),this._trigger("open")):this.close()
},close:function(b){clearTimeout(this.closing),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.deactivate(),this._trigger("close",b))
},_change:function(b){this.previous!==this.element.val()&&this._trigger("change",b,{item:this.selectedItem})
},_normalize:function(a){return a.length&&a[0].label&&a[0].value?a:e.map(a,function(c){return typeof c=="string"?{label:c,value:c}:e.extend({label:c.label||c.value,value:c.value||c.label},c)
})
},_suggest:function(a){var h=this.menu.element.empty().zIndex(this.element.zIndex()+1);
this._renderMenu(h,a),this.menu.deactivate(),this.menu.refresh(),h.show(),this._resizeMenu(),h.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(new e.Event("mouseover"))
},_resizeMenu:function(){var b=this.menu.element;
b.outerWidth(Math.max(b.width("").outerWidth()+1,this.element.outerWidth()))
},_renderMenu:function(a,i){var h=this;
e.each(i,function(b,j){h._renderItem(a,j)
})
},_renderItem:function(a,h){return e("<li></li>").data("item.autocomplete",h).append(e("<a></a>").text(h.label)).appendTo(a)
},_move:function(h,c){if(!this.menu.element.is(":visible")){this.search(null,c);
return
}if(this.menu.first()&&/^previous/.test(h)||this.menu.last()&&/^next/.test(h)){this.element.val(this.term),this.menu.deactivate();
return
}this.menu[h](c)
},widget:function(){return this.menu.element
},_keyEvent:function(h,c){if(!this.isMultiLine||this.menu.element.is(":visible")){this._move(h,c),c.preventDefault()
}}}),e.extend(e.ui.autocomplete,{escapeRegex:function(b){return b.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")
},filter:function(a,i){var h=new RegExp(e.ui.autocomplete.escapeRegex(i),"i");
return e.grep(a,function(b){return h.test(b.label||b.value||b)
})
}})
}(jQuery),function(b){b.widget("ui.menu",{_create:function(){var a=this;
this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(d){if(!b(d.target).closest(".ui-menu-item a").length){return
}d.preventDefault(),a.select(d)
}),this.refresh()
},refresh:function(){var a=this,d=this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem");
d.children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(e){a.activate(e,b(this).parent())
}).mouseleave(function(){a.deactivate()
})
},activate:function(h,f){this.deactivate();
if(this.hasScroll()){var k=f.offset().top-this.element.offset().top,j=this.element.scrollTop(),i=this.element.height();
k<0?this.element.scrollTop(j+k):k>=i&&this.element.scrollTop(j+k-i+f.height())
}this.active=f.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end(),this._trigger("focus",h,{item:f})
},deactivate:function(){if(!this.active){return
}this.active.children("a").removeClass("ui-state-hover").removeAttr("id"),this._trigger("blur"),this.active=null
},next:function(c){this.move("next",".ui-menu-item:first",c)
},previous:function(c){this.move("prev",".ui-menu-item:last",c)
},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length
},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length
},move:function(f,e,i){if(!this.active){this.activate(i,this.element.children(e));
return
}var h=this.active[f+"All"](".ui-menu-item").eq(0);
h.length?this.activate(i,h):this.activate(i,this.element.children(e))
},nextPage:function(a){if(this.hasScroll()){if(!this.active||this.last()){this.activate(a,this.element.children(".ui-menu-item:first"));
return
}var i=this.active.offset().top,h=this.element.height(),f=this.element.children(".ui-menu-item").filter(function(){var c=b(this).offset().top-i-h+b(this).height();
return c<10&&c>-10
});
f.length||(f=this.element.children(".ui-menu-item:last")),this.activate(a,f)
}else{this.activate(a,this.element.children(".ui-menu-item").filter(!this.active||this.last()?":first":":last"))
}},previousPage:function(a){if(this.hasScroll()){if(!this.active||this.first()){this.activate(a,this.element.children(".ui-menu-item:last"));
return
}var i=this.active.offset().top,h=this.element.height(),f=this.element.children(".ui-menu-item").filter(function(){var c=b(this).offset().top-i+h-b(this).height();
return c<10&&c>-10
});
f.length||(f=this.element.children(".ui-menu-item:first")),this.activate(a,f)
}else{this.activate(a,this.element.children(".ui-menu-item").filter(!this.active||this.first()?":last":":first"))
}},hasScroll:function(){return this.element.height()<this.element[b.fn.prop?"prop":"attr"]("scrollHeight")
},select:function(c){this._trigger("selected",c,{item:this.active})
}})
}(jQuery),function(v,u){var t,s,r,q,p="ui-button ui-widget ui-state-default ui-corner-all",o="ui-state-hover ui-state-active ",n="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",m=function(){var a=v(this).find(":ui-button");
setTimeout(function(){a.button("refresh")
},1)
},l=function(a){var i=a.name,h=a.form,f=v([]);
return i&&(h?f=v(h).find("[name='"+i+"']"):f=v("[name='"+i+"']",a.ownerDocument).filter(function(){return !this.form
})),f
};
v.widget("ui.button",{options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",m),typeof this.options.disabled!="boolean"?this.options.disabled=!!this.element.propAttr("disabled"):this.element.propAttr("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");
var c=this,f=this.options,e=this.type==="checkbox"||this.type==="radio",d="ui-state-hover"+(e?"":" ui-state-active"),a="ui-state-focus";
f.label===null&&(f.label=this.buttonElement.html()),this.buttonElement.addClass(p).attr("role","button").bind("mouseenter.button",function(){if(f.disabled){return
}v(this).addClass("ui-state-hover"),this===t&&v(this).addClass("ui-state-active")
}).bind("mouseleave.button",function(){if(f.disabled){return
}v(this).removeClass(d)
}).bind("click.button",function(b){f.disabled&&(b.preventDefault(),b.stopImmediatePropagation())
}),this.element.bind("focus.button",function(){c.buttonElement.addClass(a)
}).bind("blur.button",function(){c.buttonElement.removeClass(a)
}),e&&(this.element.bind("change.button",function(){if(q){return
}c.refresh()
}),this.buttonElement.bind("mousedown.button",function(b){if(f.disabled){return
}q=!1,s=b.pageX,r=b.pageY
}).bind("mouseup.button",function(b){if(f.disabled){return
}if(s!==b.pageX||r!==b.pageY){q=!0
}})),this.type==="checkbox"?this.buttonElement.bind("click.button",function(){if(f.disabled||q){return !1
}v(this).toggleClass("ui-state-active"),c.buttonElement.attr("aria-pressed",c.element[0].checked)
}):this.type==="radio"?this.buttonElement.bind("click.button",function(){if(f.disabled||q){return !1
}v(this).addClass("ui-state-active"),c.buttonElement.attr("aria-pressed","true");
var b=c.element[0];
l(b).not(b).map(function(){return v(this).button("widget")[0]
}).removeClass("ui-state-active").attr("aria-pressed","false")
}):(this.buttonElement.bind("mousedown.button",function(){if(f.disabled){return !1
}v(this).addClass("ui-state-active"),t=this,v(document).one("mouseup",function(){t=null
})
}).bind("mouseup.button",function(){if(f.disabled){return !1
}v(this).removeClass("ui-state-active")
}).bind("keydown.button",function(h){if(f.disabled){return !1
}(h.keyCode==v.ui.keyCode.SPACE||h.keyCode==v.ui.keyCode.ENTER)&&v(this).addClass("ui-state-active")
}).bind("keyup.button",function(){v(this).removeClass("ui-state-active")
}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(h){h.keyCode===v.ui.keyCode.SPACE&&v(this).click()
})),this._setOption("disabled",f.disabled),this._resetButton()
},_determineButtonType:function(){this.element.is(":checkbox")?this.type="checkbox":this.element.is(":radio")?this.type="radio":this.element.is("input")?this.type="input":this.type="button";
if(this.type==="checkbox"||this.type==="radio"){var e=this.element.parents().filter(":last"),d="label[for='"+this.element.attr("id")+"']";
this.buttonElement=e.find(d),this.buttonElement.length||(e=e.length?e.siblings():this.element.siblings(),this.buttonElement=e.filter(d),this.buttonElement.length||(this.buttonElement=e.find(d))),this.element.addClass("ui-helper-hidden-accessible");
var f=this.element.is(":checked");
f&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.attr("aria-pressed",f)
}else{this.buttonElement=this.element
}},widget:function(){return this.buttonElement
},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(p+" "+o+" "+n).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title"),v.Widget.prototype.destroy.call(this)
},_setOption:function(a,d){v.Widget.prototype._setOption.apply(this,arguments);
if(a==="disabled"){d?this.element.propAttr("disabled",!0):this.element.propAttr("disabled",!1);
return
}this._resetButton()
},refresh:function(){var a=this.element.is(":disabled");
a!==this.options.disabled&&this._setOption("disabled",a),this.type==="radio"?l(this.element[0]).each(function(){v(this).is(":checked")?v(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):v(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")
}):this.type==="checkbox"&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))
},_resetButton:function(){if(this.type==="input"){this.options.label&&this.element.val(this.options.label);
return
}var a=this.buttonElement.removeClass(n),k=v("<span></span>",this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(a.empty()).text(),j=this.options.icons,i=j.primary&&j.secondary,h=[];
j.primary||j.secondary?(this.options.text&&h.push("ui-button-text-icon"+(i?"s":j.primary?"-primary":"-secondary")),j.primary&&a.prepend("<span class='ui-button-icon-primary ui-icon "+j.primary+"'></span>"),j.secondary&&a.append("<span class='ui-button-icon-secondary ui-icon "+j.secondary+"'></span>"),this.options.text||(h.push(i?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||a.attr("title",k))):h.push("ui-button-text-only"),a.addClass(h.join(" "))
}}),v.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")
},_init:function(){this.refresh()
},_setOption:function(a,d){a==="disabled"&&this.buttons.button("option",a,d),v.Widget.prototype._setOption.apply(this,arguments)
},refresh:function(){var a=this.element.css("direction")==="rtl";
this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return v(this).button("widget")[0]
}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(a?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(a?"ui-corner-left":"ui-corner-right").end().end()
},destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return v(this).button("widget")[0]
}).removeClass("ui-corner-left ui-corner-right").end().button("destroy"),v.Widget.prototype.destroy.call(this)
}})
}(jQuery),function($,undefined){function Datepicker(){this.debug=!1,this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},$.extend(this._defaults,this.regional[""]),this.dpDiv=bindHover($('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
}function bindHover(a){var b="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
return a.bind("mouseout",function(a){var c=$(a.target).closest(b);
if(!c.length){return
}c.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
}).bind("mouseover",function(c){var d=$(c.target).closest(b);
if($.datepicker._isDisabledDatepicker(instActive.inline?a.parent()[0]:instActive.input[0])||!d.length){return
}d.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),d.addClass("ui-state-hover"),d.hasClass("ui-datepicker-prev")&&d.addClass("ui-datepicker-prev-hover"),d.hasClass("ui-datepicker-next")&&d.addClass("ui-datepicker-next-hover")
})
}function extendRemove(a,b){$.extend(a,b);
for(var c in b){if(b[c]==null||b[c]==undefined){a[c]=b[c]
}}return a
}function isArray(a){return a&&($.browser.safari&&typeof a=="object"&&a.length||a.constructor&&a.constructor.toString().match(/\Array\(\)/))
}$.extend($.ui,{datepicker:{version:"1.8.23"}});
var PROP_NAME="datepicker",dpuuid=(new Date).getTime(),instActive;
$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){this.debug&&console.log.apply("",arguments)
},_widgetDatepicker:function(){return this.dpDiv
},setDefaults:function(a){return extendRemove(this._defaults,a||{}),this
},_attachDatepicker:function(target,settings){var inlineSettings=null;
for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);
if(attrValue){inlineSettings=inlineSettings||{};
try{inlineSettings[attrName]=eval(attrValue)
}catch(err){inlineSettings[attrName]=attrValue
}}}var nodeName=target.nodeName.toLowerCase(),inline=nodeName=="div"||nodeName=="span";
target.id||(this.uuid+=1,target.id="dp"+this.uuid);
var inst=this._newInst($(target),inline);
inst.settings=$.extend({},settings||{},inlineSettings||{}),nodeName=="input"?this._connectDatepicker(target,inst):inline&&this._inlineDatepicker(target,inst)
},_newInst:function(a,b){var c=a[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");
return{id:c,input:a,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:b,dpDiv:b?bindHover($('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')):this.dpDiv}
},_connectDatepicker:function(a,b){var c=$(a);
b.append=$([]),b.trigger=$([]);
if(c.hasClass(this.markerClassName)){return
}this._attachments(c,b),c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(a,c,d){b.settings[c]=d
}).bind("getData.datepicker",function(a,c){return this._get(b,c)
}),this._autoSize(b),$.data(a,PROP_NAME,b),b.settings.disabled&&this._disableDatepicker(a)
},_attachments:function(a,b){var c=this._get(b,"appendText"),d=this._get(b,"isRTL");
b.append&&b.append.remove(),c&&(b.append=$('<span class="'+this._appendClass+'">'+c+"</span>"),a[d?"before":"after"](b.append)),a.unbind("focus",this._showDatepicker),b.trigger&&b.trigger.remove();
var e=this._get(b,"showOn");
(e=="focus"||e=="both")&&a.focus(this._showDatepicker);
if(e=="button"||e=="both"){var f=this._get(b,"buttonText"),g=this._get(b,"buttonImage");
b.trigger=$(this._get(b,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:g,alt:f,title:f}):$('<button type="button"></button>').addClass(this._triggerClass).html(g==""?f:$("<img/>").attr({src:g,alt:f,title:f}))),a[d?"before":"after"](b.trigger),b.trigger.click(function(){return $.datepicker._datepickerShowing&&$.datepicker._lastInput==a[0]?$.datepicker._hideDatepicker():$.datepicker._datepickerShowing&&$.datepicker._lastInput!=a[0]?($.datepicker._hideDatepicker(),$.datepicker._showDatepicker(a[0])):$.datepicker._showDatepicker(a[0]),!1
})
}},_autoSize:function(a){if(this._get(a,"autoSize")&&!a.inline){var b=new Date(2009,11,20),c=this._get(a,"dateFormat");
if(c.match(/[DM]/)){var d=function(a){var b=0,c=0;
for(var d=0;
d<a.length;
d++){a[d].length>b&&(b=a[d].length,c=d)
}return c
};
b.setMonth(d(this._get(a,c.match(/MM/)?"monthNames":"monthNamesShort"))),b.setDate(d(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay())
}a.input.attr("size",this._formatDate(a,b).length)
}},_inlineDatepicker:function(a,b){var c=$(a);
if(c.hasClass(this.markerClassName)){return
}c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",function(a,c,d){b.settings[c]=d
}).bind("getData.datepicker",function(a,c){return this._get(b,c)
}),$.data(a,PROP_NAME,b),this._setDate(b,this._getDefaultDate(b),!0),this._updateDatepicker(b),this._updateAlternate(b),b.settings.disabled&&this._disableDatepicker(a),b.dpDiv.css("display","block")
},_dialogDatepicker:function(a,b,c,d,e){var f=this._dialogInst;
if(!f){this.uuid+=1;
var g="dp"+this.uuid;
this._dialogInput=$('<input type="text" id="'+g+'" style="position: absolute; top: -100px; width: 0px;"/>'),this._dialogInput.keydown(this._doKeyDown),$("body").append(this._dialogInput),f=this._dialogInst=this._newInst(this._dialogInput,!1),f.settings={},$.data(this._dialogInput[0],PROP_NAME,f)
}extendRemove(f.settings,d||{}),b=b&&b.constructor==Date?this._formatDate(f,b):b,this._dialogInput.val(b),this._pos=e?e.length?e:[e.pageX,e.pageY]:null;
if(!this._pos){var h=document.documentElement.clientWidth,i=document.documentElement.clientHeight,j=document.documentElement.scrollLeft||document.body.scrollLeft,k=document.documentElement.scrollTop||document.body.scrollTop;
this._pos=[h/2-100+j,i/2-150+k]
}return this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),f.settings.onSelect=c,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),$.blockUI&&$.blockUI(this.dpDiv),$.data(this._dialogInput[0],PROP_NAME,f),this
},_destroyDatepicker:function(a){var b=$(a),c=$.data(a,PROP_NAME);
if(!b.hasClass(this.markerClassName)){return
}var d=a.nodeName.toLowerCase();
$.removeData(a,PROP_NAME),d=="input"?(c.append.remove(),c.trigger.remove(),b.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):(d=="div"||d=="span")&&b.removeClass(this.markerClassName).empty()
},_enableDatepicker:function(a){var b=$(a),c=$.data(a,PROP_NAME);
if(!b.hasClass(this.markerClassName)){return
}var d=a.nodeName.toLowerCase();
if(d=="input"){a.disabled=!1,c.trigger.filter("button").each(function(){this.disabled=!1
}).end().filter("img").css({opacity:"1.0",cursor:""})
}else{if(d=="div"||d=="span"){var e=b.children("."+this._inlineClass);
e.children().removeClass("ui-state-disabled"),e.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
}}this._disabledInputs=$.map(this._disabledInputs,function(b){return b==a?null:b
})
},_disableDatepicker:function(a){var b=$(a),c=$.data(a,PROP_NAME);
if(!b.hasClass(this.markerClassName)){return
}var d=a.nodeName.toLowerCase();
if(d=="input"){a.disabled=!0,c.trigger.filter("button").each(function(){this.disabled=!0
}).end().filter("img").css({opacity:"0.5",cursor:"default"})
}else{if(d=="div"||d=="span"){var e=b.children("."+this._inlineClass);
e.children().addClass("ui-state-disabled"),e.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled")
}}this._disabledInputs=$.map(this._disabledInputs,function(b){return b==a?null:b
}),this._disabledInputs[this._disabledInputs.length]=a
},_isDisabledDatepicker:function(a){if(!a){return !1
}for(var b=0;
b<this._disabledInputs.length;
b++){if(this._disabledInputs[b]==a){return !0
}}return !1
},_getInst:function(a){try{return $.data(a,PROP_NAME)
}catch(b){throw"Missing instance data for this datepicker"
}},_optionDatepicker:function(a,b,c){var d=this._getInst(a);
if(arguments.length==2&&typeof b=="string"){return b=="defaults"?$.extend({},$.datepicker._defaults):d?b=="all"?$.extend({},d.settings):this._get(d,b):null
}var e=b||{};
typeof b=="string"&&(e={},e[b]=c);
if(d){this._curInst==d&&this._hideDatepicker();
var f=this._getDateDatepicker(a,!0),g=this._getMinMaxDate(d,"min"),h=this._getMinMaxDate(d,"max");
extendRemove(d.settings,e),g!==null&&e.dateFormat!==undefined&&e.minDate===undefined&&(d.settings.minDate=this._formatDate(d,g)),h!==null&&e.dateFormat!==undefined&&e.maxDate===undefined&&(d.settings.maxDate=this._formatDate(d,h)),this._attachments($(a),d),this._autoSize(d),this._setDate(d,f),this._updateAlternate(d),this._updateDatepicker(d)
}},_changeDatepicker:function(a,b,c){this._optionDatepicker(a,b,c)
},_refreshDatepicker:function(a){var b=this._getInst(a);
b&&this._updateDatepicker(b)
},_setDateDatepicker:function(a,b){var c=this._getInst(a);
c&&(this._setDate(c,b),this._updateDatepicker(c),this._updateAlternate(c))
},_getDateDatepicker:function(a,b){var c=this._getInst(a);
return c&&!c.inline&&this._setDateFromField(c,b),c?this._getDate(c):null
},_doKeyDown:function(a){var b=$.datepicker._getInst(a.target),c=!0,d=b.dpDiv.is(".ui-datepicker-rtl");
b._keyEvent=!0;
if($.datepicker._datepickerShowing){switch(a.keyCode){case 9:$.datepicker._hideDatepicker(),c=!1;
break;
case 13:var e=$("td."+$.datepicker._dayOverClass+":not(."+$.datepicker._currentClass+")",b.dpDiv);
e[0]&&$.datepicker._selectDay(a.target,b.selectedMonth,b.selectedYear,e[0]);
var f=$.datepicker._get(b,"onSelect");
if(f){var g=$.datepicker._formatDate(b);
f.apply(b.input?b.input[0]:null,[g,b])
}else{$.datepicker._hideDatepicker()
}return !1;
case 27:$.datepicker._hideDatepicker();
break;
case 33:$.datepicker._adjustDate(a.target,a.ctrlKey?-$.datepicker._get(b,"stepBigMonths"):-$.datepicker._get(b,"stepMonths"),"M");
break;
case 34:$.datepicker._adjustDate(a.target,a.ctrlKey?+$.datepicker._get(b,"stepBigMonths"):+$.datepicker._get(b,"stepMonths"),"M");
break;
case 35:(a.ctrlKey||a.metaKey)&&$.datepicker._clearDate(a.target),c=a.ctrlKey||a.metaKey;
break;
case 36:(a.ctrlKey||a.metaKey)&&$.datepicker._gotoToday(a.target),c=a.ctrlKey||a.metaKey;
break;
case 37:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,d?1:-1,"D"),c=a.ctrlKey||a.metaKey,a.originalEvent.altKey&&$.datepicker._adjustDate(a.target,a.ctrlKey?-$.datepicker._get(b,"stepBigMonths"):-$.datepicker._get(b,"stepMonths"),"M");
break;
case 38:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,-7,"D"),c=a.ctrlKey||a.metaKey;
break;
case 39:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,d?-1:1,"D"),c=a.ctrlKey||a.metaKey,a.originalEvent.altKey&&$.datepicker._adjustDate(a.target,a.ctrlKey?+$.datepicker._get(b,"stepBigMonths"):+$.datepicker._get(b,"stepMonths"),"M");
break;
case 40:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,7,"D"),c=a.ctrlKey||a.metaKey;
break;
default:c=!1
}}else{a.keyCode==36&&a.ctrlKey?$.datepicker._showDatepicker(this):c=!1
}c&&(a.preventDefault(),a.stopPropagation())
},_doKeyPress:function(a){var b=$.datepicker._getInst(a.target);
if($.datepicker._get(b,"constrainInput")){var c=$.datepicker._possibleChars($.datepicker._get(b,"dateFormat")),d=String.fromCharCode(a.charCode==undefined?a.keyCode:a.charCode);
return a.ctrlKey||a.metaKey||d<" "||!c||c.indexOf(d)>-1
}},_doKeyUp:function(a){var b=$.datepicker._getInst(a.target);
if(b.input.val()!=b.lastVal){try{var c=$.datepicker.parseDate($.datepicker._get(b,"dateFormat"),b.input?b.input.val():null,$.datepicker._getFormatConfig(b));
c&&($.datepicker._setDateFromField(b),$.datepicker._updateAlternate(b),$.datepicker._updateDatepicker(b))
}catch(d){$.datepicker.log(d)
}}return !0
},_showDatepicker:function(a){a=a.target||a,a.nodeName.toLowerCase()!="input"&&(a=$("input",a.parentNode)[0]);
if($.datepicker._isDisabledDatepicker(a)||$.datepicker._lastInput==a){return
}var b=$.datepicker._getInst(a);
$.datepicker._curInst&&$.datepicker._curInst!=b&&($.datepicker._curInst.dpDiv.stop(!0,!0),b&&$.datepicker._datepickerShowing&&$.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
var c=$.datepicker._get(b,"beforeShow"),d=c?c.apply(a,[a,b]):{};
if(d===!1){return
}extendRemove(b.settings,d),b.lastVal=null,$.datepicker._lastInput=a,$.datepicker._setDateFromField(b),$.datepicker._inDialog&&(a.value=""),$.datepicker._pos||($.datepicker._pos=$.datepicker._findPos(a),$.datepicker._pos[1]+=a.offsetHeight);
var e=!1;
$(a).parents().each(function(){return e|=$(this).css("position")=="fixed",!e
}),e&&$.browser.opera&&($.datepicker._pos[0]-=document.documentElement.scrollLeft,$.datepicker._pos[1]-=document.documentElement.scrollTop);
var f={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};
$.datepicker._pos=null,b.dpDiv.empty(),b.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),$.datepicker._updateDatepicker(b),f=$.datepicker._checkOffset(b,f,e),b.dpDiv.css({position:$.datepicker._inDialog&&$.blockUI?"static":e?"fixed":"absolute",display:"none",left:f.left+"px",top:f.top+"px"});
if(!b.inline){var g=$.datepicker._get(b,"showAnim"),h=$.datepicker._get(b,"duration"),i=function(){var a=b.dpDiv.find("iframe.ui-datepicker-cover");
if(!!a.length){var c=$.datepicker._getBorders(b.dpDiv);
a.css({left:-c[0],top:-c[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()})
}};
b.dpDiv.zIndex($(a).zIndex()+1),$.datepicker._datepickerShowing=!0,$.effects&&$.effects[g]?b.dpDiv.show(g,$.datepicker._get(b,"showOptions"),h,i):b.dpDiv[g||"show"](g?h:null,i),(!g||!h)&&i(),b.input.is(":visible")&&!b.input.is(":disabled")&&b.input.focus(),$.datepicker._curInst=b
}},_updateDatepicker:function(a){var b=this;
b.maxRows=4;
var c=$.datepicker._getBorders(a.dpDiv);
instActive=a,a.dpDiv.empty().append(this._generateHTML(a)),this._attachHandlers(a);
var d=a.dpDiv.find("iframe.ui-datepicker-cover");
!d.length||d.css({left:-c[0],top:-c[1],width:a.dpDiv.outerWidth(),height:a.dpDiv.outerHeight()}),a.dpDiv.find("."+this._dayOverClass+" a").mouseover();
var e=this._getNumberOfMonths(a),f=e[1],g=17;
a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),f>1&&a.dpDiv.addClass("ui-datepicker-multi-"+f).css("width",g*f+"em"),a.dpDiv[(e[0]!=1||e[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi"),a.dpDiv[(this._get(a,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),a==$.datepicker._curInst&&$.datepicker._datepickerShowing&&a.input&&a.input.is(":visible")&&!a.input.is(":disabled")&&a.input[0]!=document.activeElement&&a.input.focus();
if(a.yearshtml){var h=a.yearshtml;
setTimeout(function(){h===a.yearshtml&&a.yearshtml&&a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml),h=a.yearshtml=null
},0)
}},_getBorders:function(a){var b=function(a){return{thin:1,medium:2,thick:3}[a]||a
};
return[parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))]
},_checkOffset:function(a,b,c){var d=a.dpDiv.outerWidth(),e=a.dpDiv.outerHeight(),f=a.input?a.input.outerWidth():0,g=a.input?a.input.outerHeight():0,h=document.documentElement.clientWidth+(c?0:$(document).scrollLeft()),i=document.documentElement.clientHeight+(c?0:$(document).scrollTop());
return b.left-=this._get(a,"isRTL")?d-f:0,b.left-=c&&b.left==a.input.offset().left?$(document).scrollLeft():0,b.top-=c&&b.top==a.input.offset().top+g?$(document).scrollTop():0,b.left-=Math.min(b.left,b.left+d>h&&h>d?Math.abs(b.left+d-h):0),b.top-=Math.min(b.top,b.top+e>i&&i>e?Math.abs(e+g):0),b
},_findPos:function(a){var b=this._getInst(a),c=this._get(b,"isRTL");
while(a&&(a.type=="hidden"||a.nodeType!=1||$.expr.filters.hidden(a))){a=a[c?"previousSibling":"nextSibling"]
}var d=$(a).offset();
return[d.left,d.top]
},_hideDatepicker:function(a){var b=this._curInst;
if(!b||a&&b!=$.data(a,PROP_NAME)){return
}if(this._datepickerShowing){var c=this._get(b,"showAnim"),d=this._get(b,"duration"),e=function(){$.datepicker._tidyDialog(b)
};
$.effects&&$.effects[c]?b.dpDiv.hide(c,$.datepicker._get(b,"showOptions"),d,e):b.dpDiv[c=="slideDown"?"slideUp":c=="fadeIn"?"fadeOut":"hide"](c?d:null,e),c||e(),this._datepickerShowing=!1;
var f=this._get(b,"onClose");
f&&f.apply(b.input?b.input[0]:null,[b.input?b.input.val():"",b]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),$.blockUI&&($.unblockUI(),$("body").append(this.dpDiv))),this._inDialog=!1
}},_tidyDialog:function(a){a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
},_checkExternalClick:function(a){if(!$.datepicker._curInst){return
}var b=$(a.target),c=$.datepicker._getInst(b[0]);
(b[0].id!=$.datepicker._mainDivId&&b.parents("#"+$.datepicker._mainDivId).length==0&&!b.hasClass($.datepicker.markerClassName)&&!b.closest("."+$.datepicker._triggerClass).length&&$.datepicker._datepickerShowing&&(!$.datepicker._inDialog||!$.blockUI)||b.hasClass($.datepicker.markerClassName)&&$.datepicker._curInst!=c)&&$.datepicker._hideDatepicker()
},_adjustDate:function(a,b,c){var d=$(a),e=this._getInst(d[0]);
if(this._isDisabledDatepicker(d[0])){return
}this._adjustInstDate(e,b+(c=="M"?this._get(e,"showCurrentAtPos"):0),c),this._updateDatepicker(e)
},_gotoToday:function(a){var b=$(a),c=this._getInst(b[0]);
if(this._get(c,"gotoCurrent")&&c.currentDay){c.selectedDay=c.currentDay,c.drawMonth=c.selectedMonth=c.currentMonth,c.drawYear=c.selectedYear=c.currentYear
}else{var d=new Date;
c.selectedDay=d.getDate(),c.drawMonth=c.selectedMonth=d.getMonth(),c.drawYear=c.selectedYear=d.getFullYear()
}this._notifyChange(c),this._adjustDate(b)
},_selectMonthYear:function(a,b,c){var d=$(a),e=this._getInst(d[0]);
e["selected"+(c=="M"?"Month":"Year")]=e["draw"+(c=="M"?"Month":"Year")]=parseInt(b.options[b.selectedIndex].value,10),this._notifyChange(e),this._adjustDate(d)
},_selectDay:function(a,b,c,d){var e=$(a);
if($(d).hasClass(this._unselectableClass)||this._isDisabledDatepicker(e[0])){return
}var f=this._getInst(e[0]);
f.selectedDay=f.currentDay=$("a",d).html(),f.selectedMonth=f.currentMonth=b,f.selectedYear=f.currentYear=c,this._selectDate(a,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear))
},_clearDate:function(a){var b=$(a),c=this._getInst(b[0]);
this._selectDate(b,"")
},_selectDate:function(a,b){var c=$(a),d=this._getInst(c[0]);
b=b!=null?b:this._formatDate(d),d.input&&d.input.val(b),this._updateAlternate(d);
var e=this._get(d,"onSelect");
e?e.apply(d.input?d.input[0]:null,[b,d]):d.input&&d.input.trigger("change"),d.inline?this._updateDatepicker(d):(this._hideDatepicker(),this._lastInput=d.input[0],typeof d.input[0]!="object"&&d.input.focus(),this._lastInput=null)
},_updateAlternate:function(a){var b=this._get(a,"altField");
if(b){var c=this._get(a,"altFormat")||this._get(a,"dateFormat"),d=this._getDate(a),e=this.formatDate(c,d,this._getFormatConfig(a));
$(b).each(function(){$(this).val(e)
})
}},noWeekends:function(a){var b=a.getDay();
return[b>0&&b<6,""]
},iso8601Week:function(a){var b=new Date(a.getTime());
b.setDate(b.getDate()+4-(b.getDay()||7));
var c=b.getTime();
return b.setMonth(0),b.setDate(1),Math.floor(Math.round((c-b)/86400000)/7)+1
},parseDate:function(a,b,c){if(a==null||b==null){throw"Invalid arguments"
}b=typeof b=="object"?b.toString():b+"";
if(b==""){return null
}var d=(c?c.shortYearCutoff:null)||this._defaults.shortYearCutoff;
d=typeof d!="string"?d:(new Date).getFullYear()%100+parseInt(d,10);
var e=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,f=(c?c.dayNames:null)||this._defaults.dayNames,g=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,h=(c?c.monthNames:null)||this._defaults.monthNames,i=-1,j=-1,k=-1,l=-1,m=!1,n=function(b){var c=s+1<a.length&&a.charAt(s+1)==b;
return c&&s++,c
},o=function(a){var c=n(a),d=a=="@"?14:a=="!"?20:a=="y"&&c?4:a=="o"?3:2,e=new RegExp("^\\d{1,"+d+"}"),f=b.substring(r).match(e);
if(!f){throw"Missing number at position "+r
}return r+=f[0].length,parseInt(f[0],10)
},p=function(a,c,d){var e=$.map(n(a)?d:c,function(a,b){return[[b,a]]
}).sort(function(a,b){return -(a[1].length-b[1].length)
}),f=-1;
$.each(e,function(a,c){var d=c[1];
if(b.substr(r,d.length).toLowerCase()==d.toLowerCase()){return f=c[0],r+=d.length,!1
}});
if(f!=-1){return f+1
}throw"Unknown name at position "+r
},q=function(){if(b.charAt(r)!=a.charAt(s)){throw"Unexpected literal at position "+r
}r++
},r=0;
for(var s=0;
s<a.length;
s++){if(m){a.charAt(s)=="'"&&!n("'")?m=!1:q()
}else{switch(a.charAt(s)){case"d":k=o("d");
break;
case"D":p("D",e,f);
break;
case"o":l=o("o");
break;
case"m":j=o("m");
break;
case"M":j=p("M",g,h);
break;
case"y":i=o("y");
break;
case"@":var t=new Date(o("@"));
i=t.getFullYear(),j=t.getMonth()+1,k=t.getDate();
break;
case"!":var t=new Date((o("!")-this._ticksTo1970)/10000);
i=t.getFullYear(),j=t.getMonth()+1,k=t.getDate();
break;
case"'":n("'")?q():m=!0;
break;
default:q()
}}}if(r<b.length){throw"Extra/unparsed characters found in date: "+b.substring(r)
}i==-1?i=(new Date).getFullYear():i<100&&(i+=(new Date).getFullYear()-(new Date).getFullYear()%100+(i<=d?0:-100));
if(l>-1){j=1,k=l;
do{var u=this._getDaysInMonth(i,j-1);
if(k<=u){break
}j++,k-=u
}while(!0)
}var t=this._daylightSavingAdjust(new Date(i,j-1,k));
if(t.getFullYear()!=i||t.getMonth()+1!=j||t.getDate()!=k){throw"Invalid date"
}return t
},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*10000000,formatDate:function(a,b,c){if(!b){return""
}var d=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,e=(c?c.dayNames:null)||this._defaults.dayNames,f=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,g=(c?c.monthNames:null)||this._defaults.monthNames,h=function(b){var c=m+1<a.length&&a.charAt(m+1)==b;
return c&&m++,c
},i=function(a,b,c){var d=""+b;
if(h(a)){while(d.length<c){d="0"+d
}}return d
},j=function(a,b,c,d){return h(a)?d[b]:c[b]
},k="",l=!1;
if(b){for(var m=0;
m<a.length;
m++){if(l){a.charAt(m)=="'"&&!h("'")?l=!1:k+=a.charAt(m)
}else{switch(a.charAt(m)){case"d":k+=i("d",b.getDate(),2);
break;
case"D":k+=j("D",b.getDay(),d,e);
break;
case"o":k+=i("o",Math.round(((new Date(b.getFullYear(),b.getMonth(),b.getDate())).getTime()-(new Date(b.getFullYear(),0,0)).getTime())/86400000),3);
break;
case"m":k+=i("m",b.getMonth()+1,2);
break;
case"M":k+=j("M",b.getMonth(),f,g);
break;
case"y":k+=h("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;
break;
case"@":k+=b.getTime();
break;
case"!":k+=b.getTime()*10000+this._ticksTo1970;
break;
case"'":h("'")?k+="'":l=!0;
break;
default:k+=a.charAt(m)
}}}}return k
},_possibleChars:function(a){var b="",c=!1,d=function(b){var c=e+1<a.length&&a.charAt(e+1)==b;
return c&&e++,c
};
for(var e=0;
e<a.length;
e++){if(c){a.charAt(e)=="'"&&!d("'")?c=!1:b+=a.charAt(e)
}else{switch(a.charAt(e)){case"d":case"m":case"y":case"@":b+="0123456789";
break;
case"D":case"M":return null;
case"'":d("'")?b+="'":c=!0;
break;
default:b+=a.charAt(e)
}}}return b
},_get:function(a,b){return a.settings[b]!==undefined?a.settings[b]:this._defaults[b]
},_setDateFromField:function(a,b){if(a.input.val()==a.lastVal){return
}var c=this._get(a,"dateFormat"),d=a.lastVal=a.input?a.input.val():null,e,f;
e=f=this._getDefaultDate(a);
var g=this._getFormatConfig(a);
try{e=this.parseDate(c,d,g)||f
}catch(h){this.log(h),d=b?"":d
}a.selectedDay=e.getDate(),a.drawMonth=a.selectedMonth=e.getMonth(),a.drawYear=a.selectedYear=e.getFullYear(),a.currentDay=d?e.getDate():0,a.currentMonth=d?e.getMonth():0,a.currentYear=d?e.getFullYear():0,this._adjustInstDate(a)
},_getDefaultDate:function(a){return this._restrictMinMax(a,this._determineDate(a,this._get(a,"defaultDate"),new Date))
},_determineDate:function(a,b,c){var d=function(a){var b=new Date;
return b.setDate(b.getDate()+a),b
},e=function(b){try{return $.datepicker.parseDate($.datepicker._get(a,"dateFormat"),b,$.datepicker._getFormatConfig(a))
}catch(c){}var d=(b.toLowerCase().match(/^c/)?$.datepicker._getDate(a):null)||new Date,e=d.getFullYear(),f=d.getMonth(),g=d.getDate(),h=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,i=h.exec(b);
while(i){switch(i[2]||"d"){case"d":case"D":g+=parseInt(i[1],10);
break;
case"w":case"W":g+=parseInt(i[1],10)*7;
break;
case"m":case"M":f+=parseInt(i[1],10),g=Math.min(g,$.datepicker._getDaysInMonth(e,f));
break;
case"y":case"Y":e+=parseInt(i[1],10),g=Math.min(g,$.datepicker._getDaysInMonth(e,f))
}i=h.exec(b)
}return new Date(e,f,g)
},f=b==null||b===""?c:typeof b=="string"?e(b):typeof b=="number"?isNaN(b)?c:d(b):new Date(b.getTime());
return f=f&&f.toString()=="Invalid Date"?c:f,f&&(f.setHours(0),f.setMinutes(0),f.setSeconds(0),f.setMilliseconds(0)),this._daylightSavingAdjust(f)
},_daylightSavingAdjust:function(a){return a?(a.setHours(a.getHours()>12?a.getHours()+2:0),a):null
},_setDate:function(a,b,c){var d=!b,e=a.selectedMonth,f=a.selectedYear,g=this._restrictMinMax(a,this._determineDate(a,b,new Date));
a.selectedDay=a.currentDay=g.getDate(),a.drawMonth=a.selectedMonth=a.currentMonth=g.getMonth(),a.drawYear=a.selectedYear=a.currentYear=g.getFullYear(),(e!=a.selectedMonth||f!=a.selectedYear)&&!c&&this._notifyChange(a),this._adjustInstDate(a),a.input&&a.input.val(d?"":this._formatDate(a))
},_getDate:function(a){var b=!a.currentYear||a.input&&a.input.val()==""?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));
return b
},_attachHandlers:function(a){var b=this._get(a,"stepMonths"),c="#"+a.id.replace(/\\\\/g,"\\");
a.dpDiv.find("[data-handler]").map(function(){var a={prev:function(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(c,-b,"M")
},next:function(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(c,+b,"M")
},hide:function(){window["DP_jQuery_"+dpuuid].datepicker._hideDatepicker()
},today:function(){window["DP_jQuery_"+dpuuid].datepicker._gotoToday(c)
},selectDay:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectDay(c,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1
},selectMonth:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(c,this,"M"),!1
},selectYear:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(c,this,"Y"),!1
}};
$(this).bind(this.getAttribute("data-event"),a[this.getAttribute("data-handler")])
})
},_generateHTML:function(a){var b=new Date;
b=this._daylightSavingAdjust(new Date(b.getFullYear(),b.getMonth(),b.getDate()));
var c=this._get(a,"isRTL"),d=this._get(a,"showButtonPanel"),e=this._get(a,"hideIfNoPrevNext"),f=this._get(a,"navigationAsDateFormat"),g=this._getNumberOfMonths(a),h=this._get(a,"showCurrentAtPos"),i=this._get(a,"stepMonths"),j=g[0]!=1||g[1]!=1,k=this._daylightSavingAdjust(a.currentDay?new Date(a.currentYear,a.currentMonth,a.currentDay):new Date(9999,9,9)),l=this._getMinMaxDate(a,"min"),m=this._getMinMaxDate(a,"max"),n=a.drawMonth-h,o=a.drawYear;
n<0&&(n+=12,o--);
if(m){var p=this._daylightSavingAdjust(new Date(m.getFullYear(),m.getMonth()-g[0]*g[1]+1,m.getDate()));
p=l&&p<l?l:p;
while(this._daylightSavingAdjust(new Date(o,n,1))>p){n--,n<0&&(n=11,o--)
}}a.drawMonth=n,a.drawYear=o;
var q=this._get(a,"prevText");
q=f?this.formatDate(q,this._daylightSavingAdjust(new Date(o,n-i,1)),this._getFormatConfig(a)):q;
var r=this._canAdjustMonth(a,-1,o,n)?'<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="'+q+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+q+"</span></a>":e?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+q+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+q+"</span></a>",s=this._get(a,"nextText");
s=f?this.formatDate(s,this._daylightSavingAdjust(new Date(o,n+i,1)),this._getFormatConfig(a)):s;
var t=this._canAdjustMonth(a,1,o,n)?'<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="'+s+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+s+"</span></a>":e?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+s+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+s+"</span></a>",u=this._get(a,"currentText"),v=this._get(a,"gotoCurrent")&&a.currentDay?k:b;
u=f?this.formatDate(u,v,this._getFormatConfig(a)):u;
var w=a.inline?"":'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">'+this._get(a,"closeText")+"</button>",x=d?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(c?w:"")+(this._isInRange(a,v)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">'+u+"</button>":"")+(c?"":w)+"</div>":"",y=parseInt(this._get(a,"firstDay"),10);
y=isNaN(y)?0:y;
var z=this._get(a,"showWeek"),A=this._get(a,"dayNames"),B=this._get(a,"dayNamesShort"),C=this._get(a,"dayNamesMin"),D=this._get(a,"monthNames"),E=this._get(a,"monthNamesShort"),F=this._get(a,"beforeShowDay"),G=this._get(a,"showOtherMonths"),H=this._get(a,"selectOtherMonths"),I=this._get(a,"calculateWeek")||this.iso8601Week,J=this._getDefaultDate(a),K="";
for(var L=0;
L<g[0];
L++){var M="";
this.maxRows=4;
for(var N=0;
N<g[1];
N++){var O=this._daylightSavingAdjust(new Date(o,n,a.selectedDay)),P=" ui-corner-all",Q="";
if(j){Q+='<div class="ui-datepicker-group';
if(g[1]>1){switch(N){case 0:Q+=" ui-datepicker-group-first",P=" ui-corner-"+(c?"right":"left");
break;
case g[1]-1:Q+=" ui-datepicker-group-last",P=" ui-corner-"+(c?"left":"right");
break;
default:Q+=" ui-datepicker-group-middle",P=""
}}Q+='">'
}Q+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+P+'">'+(/all|left/.test(P)&&L==0?c?t:r:"")+(/all|right/.test(P)&&L==0?c?r:t:"")+this._generateMonthYearHeader(a,n,o,l,m,L>0||N>0,D,E)+'</div><table class="ui-datepicker-calendar"><thead><tr>';
var R=z?'<th class="ui-datepicker-week-col">'+this._get(a,"weekHeader")+"</th>":"";
for(var S=0;
S<7;
S++){var T=(S+y)%7;
R+="<th"+((S+y+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+A[T]+'">'+C[T]+"</span></th>"
}Q+=R+"</tr></thead><tbody>";
var U=this._getDaysInMonth(o,n);
o==a.selectedYear&&n==a.selectedMonth&&(a.selectedDay=Math.min(a.selectedDay,U));
var V=(this._getFirstDayOfMonth(o,n)-y+7)%7,W=Math.ceil((V+U)/7),X=j?this.maxRows>W?this.maxRows:W:W;
this.maxRows=X;
var Y=this._daylightSavingAdjust(new Date(o,n,1-V));
for(var Z=0;
Z<X;
Z++){Q+="<tr>";
var _=z?'<td class="ui-datepicker-week-col">'+this._get(a,"calculateWeek")(Y)+"</td>":"";
for(var S=0;
S<7;
S++){var ba=F?F.apply(a.input?a.input[0]:null,[Y]):[!0,""],bb=Y.getMonth()!=n,bc=bb&&!H||!ba[0]||l&&Y<l||m&&Y>m;
_+='<td class="'+((S+y+6)%7>=5?" ui-datepicker-week-end":"")+(bb?" ui-datepicker-other-month":"")+(Y.getTime()==O.getTime()&&n==a.selectedMonth&&a._keyEvent||J.getTime()==Y.getTime()&&J.getTime()==O.getTime()?" "+this._dayOverClass:"")+(bc?" "+this._unselectableClass+" ui-state-disabled":"")+(bb&&!G?"":" "+ba[1]+(Y.getTime()==k.getTime()?" "+this._currentClass:"")+(Y.getTime()==b.getTime()?" ui-datepicker-today":""))+'"'+((!bb||G)&&ba[2]?' title="'+ba[2]+'"':"")+(bc?"":' data-handler="selectDay" data-event="click" data-month="'+Y.getMonth()+'" data-year="'+Y.getFullYear()+'"')+">"+(bb&&!G?"&#xa0;":bc?'<span class="ui-state-default">'+Y.getDate()+"</span>":'<a class="ui-state-default'+(Y.getTime()==b.getTime()?" ui-state-highlight":"")+(Y.getTime()==k.getTime()?" ui-state-active":"")+(bb?" ui-priority-secondary":"")+'" href="#">'+Y.getDate()+"</a>")+"</td>",Y.setDate(Y.getDate()+1),Y=this._daylightSavingAdjust(Y)
}Q+=_+"</tr>"
}n++,n>11&&(n=0,o++),Q+="</tbody></table>"+(j?"</div>"+(g[0]>0&&N==g[1]-1?'<div class="ui-datepicker-row-break"></div>':""):""),M+=Q
}K+=M
}return K+=x+($.browser.msie&&parseInt($.browser.version,10)<7&&!a.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':""),a._keyEvent=!1,K
},_generateMonthYearHeader:function(a,b,c,d,e,f,g,h){var i=this._get(a,"changeMonth"),j=this._get(a,"changeYear"),k=this._get(a,"showMonthAfterYear"),l='<div class="ui-datepicker-title">',m="";
if(f||!i){m+='<span class="ui-datepicker-month">'+g[b]+"</span>"
}else{var n=d&&d.getFullYear()==c,o=e&&e.getFullYear()==c;
m+='<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
for(var p=0;
p<12;
p++){(!n||p>=d.getMonth())&&(!o||p<=e.getMonth())&&(m+='<option value="'+p+'"'+(p==b?' selected="selected"':"")+">"+h[p]+"</option>")
}m+="</select>"
}k||(l+=m+(f||!i||!j?"&#xa0;":""));
if(!a.yearshtml){a.yearshtml="";
if(f||!j){l+='<span class="ui-datepicker-year">'+c+"</span>"
}else{var q=this._get(a,"yearRange").split(":"),r=(new Date).getFullYear(),s=function(a){var b=a.match(/c[+-].*/)?c+parseInt(a.substring(1),10):a.match(/[+-].*/)?r+parseInt(a,10):parseInt(a,10);
return isNaN(b)?r:b
},t=s(q[0]),u=Math.max(t,s(q[1]||""));
t=d?Math.max(t,d.getFullYear()):t,u=e?Math.min(u,e.getFullYear()):u,a.yearshtml+='<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';
for(;
t<=u;
t++){a.yearshtml+='<option value="'+t+'"'+(t==c?' selected="selected"':"")+">"+t+"</option>"
}a.yearshtml+="</select>",l+=a.yearshtml,a.yearshtml=null
}}return l+=this._get(a,"yearSuffix"),k&&(l+=(f||!i||!j?"&#xa0;":"")+m),l+="</div>",l
},_adjustInstDate:function(a,b,c){var d=a.drawYear+(c=="Y"?b:0),e=a.drawMonth+(c=="M"?b:0),f=Math.min(a.selectedDay,this._getDaysInMonth(d,e))+(c=="D"?b:0),g=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(d,e,f)));
a.selectedDay=g.getDate(),a.drawMonth=a.selectedMonth=g.getMonth(),a.drawYear=a.selectedYear=g.getFullYear(),(c=="M"||c=="Y")&&this._notifyChange(a)
},_restrictMinMax:function(a,b){var c=this._getMinMaxDate(a,"min"),d=this._getMinMaxDate(a,"max"),e=c&&b<c?c:b;
return e=d&&e>d?d:e,e
},_notifyChange:function(a){var b=this._get(a,"onChangeMonthYear");
b&&b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a])
},_getNumberOfMonths:function(a){var b=this._get(a,"numberOfMonths");
return b==null?[1,1]:typeof b=="number"?[1,b]:b
},_getMinMaxDate:function(a,b){return this._determineDate(a,this._get(a,b+"Date"),null)
},_getDaysInMonth:function(a,b){return 32-this._daylightSavingAdjust(new Date(a,b,32)).getDate()
},_getFirstDayOfMonth:function(a,b){return(new Date(a,b,1)).getDay()
},_canAdjustMonth:function(a,b,c,d){var e=this._getNumberOfMonths(a),f=this._daylightSavingAdjust(new Date(c,d+(b<0?b:e[0]*e[1]),1));
return b<0&&f.setDate(this._getDaysInMonth(f.getFullYear(),f.getMonth())),this._isInRange(a,f)
},_isInRange:function(a,b){var c=this._getMinMaxDate(a,"min"),d=this._getMinMaxDate(a,"max");
return(!c||b.getTime()>=c.getTime())&&(!d||b.getTime()<=d.getTime())
},_getFormatConfig:function(a){var b=this._get(a,"shortYearCutoff");
return b=typeof b!="string"?b:(new Date).getFullYear()%100+parseInt(b,10),{shortYearCutoff:b,dayNamesShort:this._get(a,"dayNamesShort"),dayNames:this._get(a,"dayNames"),monthNamesShort:this._get(a,"monthNamesShort"),monthNames:this._get(a,"monthNames")}
},_formatDate:function(a,b,c,d){b||(a.currentDay=a.selectedDay,a.currentMonth=a.selectedMonth,a.currentYear=a.selectedYear);
var e=b?typeof b=="object"?b:this._daylightSavingAdjust(new Date(d,c,b)):this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));
return this.formatDate(this._get(a,"dateFormat"),e,this._getFormatConfig(a))
}}),$.fn.datepicker=function(a){if(!this.length){return this
}$.datepicker.initialized||($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv),$.datepicker.initialized=!0);
var b=Array.prototype.slice.call(arguments,1);
return typeof a!="string"||a!="isDisabled"&&a!="getDate"&&a!="widget"?a=="option"&&arguments.length==2&&typeof arguments[1]=="string"?$.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this[0]].concat(b)):this.each(function(){typeof a=="string"?$.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this].concat(b)):$.datepicker._attachDatepicker(this,a)
}):$.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this[0]].concat(b))
},$.datepicker=new Datepicker,$.datepicker.initialized=!1,$.datepicker.uuid=(new Date).getTime(),$.datepicker.version="1.8.23",window["DP_jQuery_"+dpuuid]=$
}(jQuery),function(h,f){var k="ui-dialog ui-widget ui-widget-content ui-corner-all ",j={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},i={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0};
h.widget("ui.dialog",{options:{autoOpen:!0,buttons:{},closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:!1,maxWidth:!1,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",collision:"fit",using:function(a){var d=h(this).css(a).offset().top;
d<0&&h(this).css("top",a.top-d)
}},resizable:!0,show:null,stack:!0,title:"",width:300,zIndex:1000},_create:function(){this.originalTitle=this.element.attr("title"),typeof this.originalTitle!="string"&&(this.originalTitle=""),this.options.title=this.options.title||this.originalTitle;
var t=this,s=t.options,r=s.title||"&#160;",q=h.ui.dialog.getTitleId(t.element),p=(t.uiDialog=h("<div></div>")).appendTo(document.body).hide().addClass(k+s.dialogClass).css({zIndex:s.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(b){s.closeOnEscape&&!b.isDefaultPrevented()&&b.keyCode&&b.keyCode===h.ui.keyCode.ESCAPE&&(t.close(b),b.preventDefault())
}).attr({role:"dialog","aria-labelledby":q}).mousedown(function(b){t.moveToTop(!1,b)
}),o=t.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(p),n=(t.uiDialogTitlebar=h("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(p),m=h('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){m.addClass("ui-state-hover")
},function(){m.removeClass("ui-state-hover")
}).focus(function(){m.addClass("ui-state-focus")
}).blur(function(){m.removeClass("ui-state-focus")
}).click(function(b){return t.close(b),!1
}).appendTo(n),c=(t.uiDialogTitlebarCloseText=h("<span></span>")).addClass("ui-icon ui-icon-closethick").text(s.closeText).appendTo(m),a=h("<span></span>").addClass("ui-dialog-title").attr("id",q).html(r).prependTo(n);
h.isFunction(s.beforeclose)&&!h.isFunction(s.beforeClose)&&(s.beforeClose=s.beforeclose),n.find("*").add(n).disableSelection(),s.draggable&&h.fn.draggable&&t._makeDraggable(),s.resizable&&h.fn.resizable&&t._makeResizable(),t._createButtons(s.buttons),t._isOpen=!1,h.fn.bgiframe&&p.bgiframe()
},_init:function(){this.options.autoOpen&&this.open()
},destroy:function(){var b=this;
return b.overlay&&b.overlay.destroy(),b.uiDialog.hide(),b.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),b.uiDialog.remove(),b.originalTitle&&b.element.attr("title",b.originalTitle),b
},widget:function(){return this.uiDialog
},close:function(a){var n=this,m,l;
if(!1===n._trigger("beforeClose",a)){return
}return n.overlay&&n.overlay.destroy(),n.uiDialog.unbind("keypress.ui-dialog"),n._isOpen=!1,n.options.hide?n.uiDialog.hide(n.options.hide,function(){n._trigger("close",a)
}):(n.uiDialog.hide(),n._trigger("close",a)),h.ui.dialog.overlay.resize(),n.options.modal&&(m=0,h(".ui-dialog").each(function(){this!==n.uiDialog[0]&&(l=h(this).css("z-index"),isNaN(l)||(m=Math.max(m,l)))
}),h.ui.dialog.maxZ=m),n
},isOpen:function(){return this._isOpen
},moveToTop:function(a,o){var n=this,m=n.options,l;
return m.modal&&!a||!m.stack&&!m.modal?n._trigger("focus",o):(m.zIndex>h.ui.dialog.maxZ&&(h.ui.dialog.maxZ=m.zIndex),n.overlay&&(h.ui.dialog.maxZ+=1,n.overlay.$el.css("z-index",h.ui.dialog.overlay.maxZ=h.ui.dialog.maxZ)),l={scrollTop:n.element.scrollTop(),scrollLeft:n.element.scrollLeft()},h.ui.dialog.maxZ+=1,n.uiDialog.css("z-index",h.ui.dialog.maxZ),n.element.attr(l),n._trigger("focus",o),n)
},open:function(){if(this._isOpen){return
}var a=this,l=a.options,e=a.uiDialog;
return a.overlay=l.modal?new h.ui.dialog.overlay(a):null,a._size(),a._position(l.position),e.show(l.show),a.moveToTop(!0),l.modal&&e.bind("keydown.ui-dialog",function(m){if(m.keyCode!==h.ui.keyCode.TAB){return
}var p=h(":tabbable",this),o=p.filter(":first"),n=p.filter(":last");
if(m.target===n[0]&&!m.shiftKey){return o.focus(1),!1
}if(m.target===o[0]&&m.shiftKey){return n.focus(1),!1
}}),h(a.element.find(":tabbable").get().concat(e.find(".ui-dialog-buttonpane :tabbable").get().concat(e.get()))).eq(0).focus(),a._isOpen=!0,a._trigger("open"),a
},_createButtons:function(a){var o=this,n=!1,m=h("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),l=h("<div></div>").addClass("ui-dialog-buttonset").appendTo(m);
o.uiDialog.find(".ui-dialog-buttonpane").remove(),typeof a=="object"&&a!==null&&h.each(a,function(){return !(n=!0)
}),n&&(h.each(a,function(c,q){q=h.isFunction(q)?{click:q,text:c}:q;
var p=h('<button type="button"></button>').click(function(){q.click.apply(o.element[0],arguments)
}).appendTo(l);
h.each(q,function(e,d){if(e==="click"){return
}e in p?p[e](d):p.attr(e,d)
}),h.fn.button&&p.button()
}),m.appendTo(o.uiDialog))
},_makeDraggable:function(){function l(b){return{position:b.position,offset:b.offset}
}var a=this,o=a.options,n=h(document),m;
a.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(c,b){m=o.height==="auto"?"auto":h(this).height(),h(this).height(h(this).height()).addClass("ui-dialog-dragging"),a._trigger("dragStart",c,l(b))
},drag:function(b,d){a._trigger("drag",b,l(d))
},stop:function(c,b){o.position=[b.position.left-n.scrollLeft(),b.position.top-n.scrollTop()],h(this).removeClass("ui-dialog-dragging").height(m),a._trigger("dragStop",c,l(b)),h.ui.dialog.overlay.resize()
}})
},_makeResizable:function(o){function a(c){return{originalPosition:c.originalPosition,originalSize:c.originalSize,position:c.position,size:c.size}
}o=o===f?this.options.resizable:o;
var n=this,m=n.options,l=n.uiDialog.css("position"),b=typeof o=="string"?o:"n,e,s,w,se,sw,ne,nw";
n.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:n.element,maxWidth:m.maxWidth,maxHeight:m.maxHeight,minWidth:m.minWidth,minHeight:n._minHeight(),handles:b,start:function(d,e){h(this).addClass("ui-dialog-resizing"),n._trigger("resizeStart",d,a(e))
},resize:function(d,c){n._trigger("resize",d,a(c))
},stop:function(d,e){h(this).removeClass("ui-dialog-resizing"),m.height=h(this).height(),m.width=h(this).width(),n._trigger("resizeStop",d,a(e)),h.ui.dialog.overlay.resize()
}}).css("position",l).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
},_minHeight:function(){var b=this.options;
return b.height==="auto"?b.minHeight:Math.min(b.minHeight,b.height)
},_position:function(a){var n=[],m=[0,0],l;
if(a){if(typeof a=="string"||typeof a=="object"&&"0" in a){n=a.split?a.split(" "):[a[0],a[1]],n.length===1&&(n[1]=n[0]),h.each(["left","top"],function(d,c){+n[d]===n[d]&&(m[d]=n[d],n[d]=c)
}),a={my:n.join(" "),at:n.join(" "),offset:m.join(" ")}
}a=h.extend({},h.ui.dialog.prototype.options.position,a)
}else{a=h.ui.dialog.prototype.options.position
}l=this.uiDialog.is(":visible"),l||this.uiDialog.show(),this.uiDialog.css({top:0,left:0}).position(h.extend({of:window},a)),l||this.uiDialog.hide()
},_setOptions:function(a){var l=this,e={},d=!1;
h.each(a,function(m,c){l._setOption(m,c),m in j&&(d=!0),m in i&&(e[m]=c)
}),d&&this._size(),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",e)
},_setOption:function(a,o){var n=this,m=n.uiDialog;
switch(a){case"beforeclose":a="beforeClose";
break;
case"buttons":n._createButtons(o);
break;
case"closeText":n.uiDialogTitlebarCloseText.text(""+o);
break;
case"dialogClass":m.removeClass(n.options.dialogClass).addClass(k+o);
break;
case"disabled":o?m.addClass("ui-dialog-disabled"):m.removeClass("ui-dialog-disabled");
break;
case"draggable":var l=m.is(":data(draggable)");
l&&!o&&m.draggable("destroy"),!l&&o&&n._makeDraggable();
break;
case"position":n._position(o);
break;
case"resizable":var c=m.is(":data(resizable)");
c&&!o&&m.resizable("destroy"),c&&typeof o=="string"&&m.resizable("option","handles",o),!c&&o!==!1&&n._makeResizable(o);
break;
case"title":h(".ui-dialog-title",n.uiDialogTitlebar).html(""+(o||"&#160;"))
}h.Widget.prototype._setOption.apply(n,arguments)
},_size:function(){var a=this.options,o,n,m=this.uiDialog.is(":visible");
this.element.show().css({width:"auto",minHeight:0,height:0}),a.minWidth>a.width&&(a.width=a.minWidth),o=this.uiDialog.css({height:"auto",width:a.width}).height(),n=Math.max(0,a.minHeight-o);
if(a.height==="auto"){if(h.support.minHeight){this.element.css({minHeight:n,height:"auto"})
}else{this.uiDialog.show();
var l=this.element.css("height","auto").height();
m||this.uiDialog.hide(),this.element.height(Math.max(l,n))
}}else{this.element.height(Math.max(a.height-o,0))
}this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())
}}),h.extend(h.ui.dialog,{version:"1.8.23",uuid:0,maxZ:0,getTitleId:function(d){var c=d.attr("id");
return c||(this.uuid+=1,c=this.uuid),"ui-dialog-title-"+c
},overlay:function(a){this.$el=h.ui.dialog.overlay.create(a)
}}),h.extend(h.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:h.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(b){return b+".dialog-overlay"
}).join(" "),create:function(a){this.instances.length===0&&(setTimeout(function(){h.ui.dialog.overlay.instances.length&&h(document).bind(h.ui.dialog.overlay.events,function(c){if(h(c.target).zIndex()<h.ui.dialog.overlay.maxZ){return !1
}})
},1),h(document).bind("keydown.dialog-overlay",function(b){a.options.closeOnEscape&&!b.isDefaultPrevented()&&b.keyCode&&b.keyCode===h.ui.keyCode.ESCAPE&&(a.close(b),b.preventDefault())
}),h(window).bind("resize.dialog-overlay",h.ui.dialog.overlay.resize));
var d=(this.oldInstances.pop()||h("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});
return h.fn.bgiframe&&d.bgiframe(),this.instances.push(d),d
},destroy:function(a){var l=h.inArray(a,this.instances);
l!=-1&&this.oldInstances.push(this.instances.splice(l,1)[0]),this.instances.length===0&&h([document,window]).unbind(".dialog-overlay"),a.remove();
var e=0;
h.each(this.instances,function(){e=Math.max(e,this.css("z-index"))
}),this.maxZ=e
},height:function(){var a,d;
return h.browser.msie&&h.browser.version<7?(a=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),d=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight),a<d?h(window).height()+"px":a+"px"):h(document).height()+"px"
},width:function(){var a,d;
return h.browser.msie?(a=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),d=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth),a<d?h(window).width()+"px":a+"px"):h(document).width()+"px"
},resize:function(){var a=h([]);
h.each(h.ui.dialog.overlay.instances,function(){a=a.add(this)
}),a.css({width:0,height:0}).css({width:h.ui.dialog.overlay.width(),height:h.ui.dialog.overlay.height()})
}}),h.extend(h.ui.dialog.overlay.prototype,{destroy:function(){h.ui.dialog.overlay.destroy(this.$el)
}})
}(jQuery),function(j,i){j.ui=j.ui||{};
var p=/left|center|right/,o=/top|center|bottom/,n="center",m={},l=j.fn.position,k=j.fn.offset;
j.fn.position=function(c){if(!c||!c.of){return l.apply(this,arguments)
}c=j.extend({},c);
var r=j(c.of),q=r[0],f=(c.collision||"flip").split(" "),e=c.offset?c.offset.split(" "):[0,0],d,a,s;
return q.nodeType===9?(d=r.width(),a=r.height(),s={top:0,left:0}):q.setTimeout?(d=r.width(),a=r.height(),s={top:r.scrollTop(),left:r.scrollLeft()}):q.preventDefault?(c.at="left top",d=a=0,s={top:c.of.pageY,left:c.of.pageX}):(d=r.outerWidth(),a=r.outerHeight(),s=r.offset()),j.each(["my","at"],function(){var b=(c[this]||"").split(" ");
b.length===1&&(b=p.test(b[0])?b.concat([n]):o.test(b[0])?[n].concat(b):[n,n]),b[0]=p.test(b[0])?b[0]:n,b[1]=o.test(b[1])?b[1]:n,c[this]=b
}),f.length===1&&(f[1]=f[0]),e[0]=parseInt(e[0],10)||0,e.length===1&&(e[1]=e[0]),e[1]=parseInt(e[1],10)||0,c.at[0]==="right"?s.left+=d:c.at[0]===n&&(s.left+=d/2),c.at[1]==="bottom"?s.top+=a:c.at[1]===n&&(s.top+=a/2),s.left+=e[0],s.top+=e[1],this.each(function(){var A=j(this),z=A.outerWidth(),y=A.outerHeight(),x=parseInt(j.curCSS(this,"marginLeft",!0))||0,w=parseInt(j.curCSS(this,"marginTop",!0))||0,v=z+x+(parseInt(j.curCSS(this,"marginRight",!0))||0),u=y+w+(parseInt(j.curCSS(this,"marginBottom",!0))||0),t=j.extend({},s),b;
c.my[0]==="right"?t.left-=z:c.my[0]===n&&(t.left-=z/2),c.my[1]==="bottom"?t.top-=y:c.my[1]===n&&(t.top-=y/2),m.fractions||(t.left=Math.round(t.left),t.top=Math.round(t.top)),b={left:t.left-x,top:t.top-w},j.each(["left","top"],function(B,h){j.ui.position[f[B]]&&j.ui.position[f[B]][h](t,{targetWidth:d,targetHeight:a,elemWidth:z,elemHeight:y,collisionPosition:b,collisionWidth:v,collisionHeight:u,offset:e,my:c.my,at:c.at})
}),j.fn.bgiframe&&A.bgiframe(),A.offset(j.extend(t,{using:c.using}))
})
},j.ui.position={fit:{left:function(a,q){var h=j(window),f=q.collisionPosition.left+q.collisionWidth-h.width()-h.scrollLeft();
a.left=f>0?a.left-f:Math.max(a.left-q.collisionPosition.left,a.left)
},top:function(a,q){var h=j(window),f=q.collisionPosition.top+q.collisionHeight-h.height()-h.scrollTop();
a.top=f>0?a.top-f:Math.max(a.top-q.collisionPosition.top,a.top)
}},flip:{left:function(a,u){if(u.at[0]===n){return
}var t=j(window),s=u.collisionPosition.left+u.collisionWidth-t.width()-t.scrollLeft(),r=u.my[0]==="left"?-u.elemWidth:u.my[0]==="right"?u.elemWidth:0,q=u.at[0]==="left"?u.targetWidth:-u.targetWidth,e=-2*u.offset[0];
a.left+=u.collisionPosition.left<0?r+q+e:s>0?r+q+e:0
},top:function(a,u){if(u.at[1]===n){return
}var t=j(window),s=u.collisionPosition.top+u.collisionHeight-t.height()-t.scrollTop(),r=u.my[1]==="top"?-u.elemHeight:u.my[1]==="bottom"?u.elemHeight:0,q=u.at[1]==="top"?u.targetHeight:-u.targetHeight,e=-2*u.offset[1];
a.top+=u.collisionPosition.top<0?r+q+e:s>0?r+q+e:0
}}},j.offset.setOffset||(j.offset.setOffset=function(a,v){/static/.test(j.curCSS(a,"position"))&&(a.style.position="relative");
var u=j(a),t=u.offset(),s=parseInt(j.curCSS(a,"top",!0),10)||0,r=parseInt(j.curCSS(a,"left",!0),10)||0,q={top:v.top-t.top+s,left:v.left-t.left+r};
"using" in v?v.using.call(a,q):u.css(q)
},j.fn.offset=function(a){var d=this[0];
return !d||!d.ownerDocument?null:a?j.isFunction(a)?this.each(function(b){j(this).offset(a.call(this,b,j(this).offset()))
}):this.each(function(){j.offset.setOffset(this,a)
}):k.call(this)
}),j.curCSS||(j.curCSS=j.css),function(){var a=document.getElementsByTagName("body")[0],v=document.createElement("div"),u,t,s,r,q;
u=document.createElement(a?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},a&&j.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});
for(var f in s){u.style[f]=s[f]
}u.appendChild(v),t=a||document.documentElement,t.insertBefore(u,t.firstChild),v.style.cssText="position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;",r=j(v).offset(function(d,c){return c
}).offset(),u.innerHTML="",t.removeChild(u),q=r.top+r.left+(a?2000:0),m.fractions=q>21&&q<22
}()
}(jQuery),function(d,c){d.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()}),this.valueDiv=d("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this.oldValue=this._value(),this._refreshValue()
},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove(),d.Widget.prototype.destroy.apply(this,arguments)
},value:function(b){return b===c?this._value():(this._setOption("value",b),this)
},_setOption:function(a,e){a==="value"&&(this.options.value=e,this._refreshValue(),this._value()===this.options.max&&this._trigger("complete")),d.Widget.prototype._setOption.apply(this,arguments)
},_value:function(){var b=this.options.value;
return typeof b!="number"&&(b=0),Math.min(this.options.max,Math.max(this.min,b))
},_percentage:function(){return 100*this._value()/this.options.max
},_refreshValue:function(){var f=this.value(),e=this._percentage();
this.oldValue!==f&&(this.oldValue=f,this._trigger("change")),this.valueDiv.toggle(f>this.min).toggleClass("ui-corner-right",f===this.options.max).width(e.toFixed(0)+"%"),this.element.attr("aria-valuenow",f)
}}),d.extend(d.ui.progressbar,{version:"1.8.23"})
}(jQuery),function(e,d){var f=5;
e.widget("ui.slider",e.ui.mouse,{widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null},_create:function(){var a=this,n=this.options,m=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),l="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",k=n.values&&n.values.length||1,j=[];
this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"+(n.disabled?" ui-slider-disabled ui-disabled":"")),this.range=e([]),n.range&&(n.range===!0&&(n.values||(n.values=[this._valueMin(),this._valueMin()]),n.values.length&&n.values.length!==2&&(n.values=[n.values[0],n.values[0]])),this.range=e("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(n.range==="min"||n.range==="max"?" ui-slider-range-"+n.range:"")));
for(var c=m.length;
c<k;
c+=1){j.push(l)
}this.handles=m.add(e(j.join("")).appendTo(a.element)),this.handle=this.handles.eq(0),this.handles.add(this.range).filter("a").click(function(b){b.preventDefault()
}).hover(function(){n.disabled||e(this).addClass("ui-state-hover")
},function(){e(this).removeClass("ui-state-hover")
}).focus(function(){n.disabled?e(this).blur():(e(".ui-slider .ui-state-focus").removeClass("ui-state-focus"),e(this).addClass("ui-state-focus"))
}).blur(function(){e(this).removeClass("ui-state-focus")
}),this.handles.each(function(h){e(this).data("index.ui-slider-handle",h)
}),this.handles.keydown(function(s){var r=e(this).data("index.ui-slider-handle"),q,p,o,b;
if(a.options.disabled){return
}switch(s.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:s.preventDefault();
if(!a._keySliding){a._keySliding=!0,e(this).addClass("ui-state-active"),q=a._start(s,r);
if(q===!1){return
}}}b=a.options.step,a.options.values&&a.options.values.length?p=o=a.values(r):p=o=a.value();
switch(s.keyCode){case e.ui.keyCode.HOME:o=a._valueMin();
break;
case e.ui.keyCode.END:o=a._valueMax();
break;
case e.ui.keyCode.PAGE_UP:o=a._trimAlignValue(p+(a._valueMax()-a._valueMin())/f);
break;
case e.ui.keyCode.PAGE_DOWN:o=a._trimAlignValue(p-(a._valueMax()-a._valueMin())/f);
break;
case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(p===a._valueMax()){return
}o=a._trimAlignValue(p+b);
break;
case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(p===a._valueMin()){return
}o=a._trimAlignValue(p-b)
}a._slide(s,r,o)
}).keyup(function(h){var b=e(this).data("index.ui-slider-handle");
a._keySliding&&(a._keySliding=!1,a._stop(h,b),a._change(h,b),e(this).removeClass("ui-state-active"))
}),this._refreshValue(),this._animateOff=!1
},destroy:function(){return this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"),this._mouseDestroy(),this
},_mouseCapture:function(v){var u=this.options,t,s,r,q,p,o,n,m,a;
return u.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),t={x:v.pageX,y:v.pageY},s=this._normValueFromMouse(t),r=this._valueMax()-this._valueMin()+1,p=this,this.handles.each(function(h){var i=Math.abs(s-p.values(h));
r>i&&(r=i,q=e(this),o=h)
}),u.range===!0&&this.values(1)===u.min&&(o+=1,q=e(this.handles[o])),n=this._start(v,o),n===!1?!1:(this._mouseSliding=!0,p._handleIndex=o,q.addClass("ui-state-active").focus(),m=q.offset(),a=!e(v.target).parents().andSelf().is(".ui-slider-handle"),this._clickOffset=a?{left:0,top:0}:{left:v.pageX-m.left-q.width()/2,top:v.pageY-m.top-q.height()/2-(parseInt(q.css("borderTopWidth"),10)||0)-(parseInt(q.css("borderBottomWidth"),10)||0)+(parseInt(q.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(v,o,s),this._animateOff=!0,!0))
},_mouseStart:function(b){return !0
},_mouseDrag:function(i){var h={x:i.pageX,y:i.pageY},j=this._normValueFromMouse(h);
return this._slide(i,this._handleIndex,j),!1
},_mouseStop:function(b){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(b,this._handleIndex),this._change(b,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1
},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"
},_normValueFromMouse:function(i){var h,m,l,k,j;
return this.orientation==="horizontal"?(h=this.elementSize.width,m=i.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(h=this.elementSize.height,m=i.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),l=m/h,l>1&&(l=1),l<0&&(l=0),this.orientation==="vertical"&&(l=1-l),k=this._valueMax()-this._valueMin(),j=this._valueMin()+l*k,this._trimAlignValue(j)
},_start:function(i,h){var j={handle:this.handles[h],value:this.value()};
return this.options.values&&this.options.values.length&&(j.value=this.values(h),j.values=this.values()),this._trigger("start",i,j)
},_slide:function(i,h,m){var l,k,j;
this.options.values&&this.options.values.length?(l=this.values(h?0:1),this.options.values.length===2&&this.options.range===!0&&(h===0&&m>l||h===1&&m<l)&&(m=l),m!==this.values(h)&&(k=this.values(),k[h]=m,j=this._trigger("slide",i,{handle:this.handles[h],value:m,values:k}),l=this.values(h?0:1),j!==!1&&this.values(h,m,!0))):m!==this.value()&&(j=this._trigger("slide",i,{handle:this.handles[h],value:m}),j!==!1&&this.value(m))
},_stop:function(i,h){var j={handle:this.handles[h],value:this.value()};
this.options.values&&this.options.values.length&&(j.value=this.values(h),j.values=this.values()),this._trigger("stop",i,j)
},_change:function(i,h){if(!this._keySliding&&!this._mouseSliding){var j={handle:this.handles[h],value:this.value()};
this.options.values&&this.options.values.length&&(j.value=this.values(h),j.values=this.values()),this._trigger("change",i,j)
}},value:function(b){if(arguments.length){this.options.value=this._trimAlignValue(b),this._refreshValue(),this._change(null,0);
return
}return this._value()
},values:function(a,k){var j,i,h;
if(arguments.length>1){this.options.values[a]=this._trimAlignValue(k),this._refreshValue(),this._change(null,a);
return
}if(!arguments.length){return this._values()
}if(!e.isArray(arguments[0])){return this.options.values&&this.options.values.length?this._values(a):this.value()
}j=this.options.values,i=arguments[0];
for(h=0;
h<j.length;
h+=1){j[h]=this._trimAlignValue(i[h]),this._change(null,h)
}this._refreshValue()
},_setOption:function(a,j){var i,h=0;
e.isArray(this.options.values)&&(h=this.options.values.length),e.Widget.prototype._setOption.apply(this,arguments);
switch(a){case"disabled":j?(this.handles.filter(".ui-state-focus").blur(),this.handles.removeClass("ui-state-hover"),this.handles.propAttr("disabled",!0),this.element.addClass("ui-disabled")):(this.handles.propAttr("disabled",!1),this.element.removeClass("ui-disabled"));
break;
case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();
break;
case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;
break;
case"values":this._animateOff=!0,this._refreshValue();
for(i=0;
i<h;
i+=1){this._change(null,i)
}this._animateOff=!1
}},_value:function(){var b=this.options.value;
return b=this._trimAlignValue(b),b
},_values:function(i){var h,k,j;
if(arguments.length){return h=this.options.values[i],h=this._trimAlignValue(h),h
}k=this.options.values.slice();
for(j=0;
j<k.length;
j+=1){k[j]=this._trimAlignValue(k[j])
}return k
},_trimAlignValue:function(i){if(i<=this._valueMin()){return this._valueMin()
}if(i>=this._valueMax()){return this._valueMax()
}var h=this.options.step>0?this.options.step:1,k=(i-this._valueMin())%h,j=i-k;
return Math.abs(k)*2>=h&&(j+=k>0?h:-h),parseFloat(j.toFixed(5))
},_valueMin:function(){return this.options.min
},_valueMax:function(){return this.options.max
},_refreshValue:function(){var t=this.options.range,s=this.options,r=this,q=this._animateOff?!1:s.animate,p,o={},n,m,l,a;
this.options.values&&this.options.values.length?this.handles.each(function(c,h){p=(r.values(c)-r._valueMin())/(r._valueMax()-r._valueMin())*100,o[r.orientation==="horizontal"?"left":"bottom"]=p+"%",e(this).stop(1,1)[q?"animate":"css"](o,s.animate),r.options.range===!0&&(r.orientation==="horizontal"?(c===0&&r.range.stop(1,1)[q?"animate":"css"]({left:p+"%"},s.animate),c===1&&r.range[q?"animate":"css"]({width:p-n+"%"},{queue:!1,duration:s.animate})):(c===0&&r.range.stop(1,1)[q?"animate":"css"]({bottom:p+"%"},s.animate),c===1&&r.range[q?"animate":"css"]({height:p-n+"%"},{queue:!1,duration:s.animate}))),n=p
}):(m=this.value(),l=this._valueMin(),a=this._valueMax(),p=a!==l?(m-l)/(a-l)*100:0,o[r.orientation==="horizontal"?"left":"bottom"]=p+"%",this.handle.stop(1,1)[q?"animate":"css"](o,s.animate),t==="min"&&this.orientation==="horizontal"&&this.range.stop(1,1)[q?"animate":"css"]({width:p+"%"},s.animate),t==="max"&&this.orientation==="horizontal"&&this.range[q?"animate":"css"]({width:100-p+"%"},{queue:!1,duration:s.animate}),t==="min"&&this.orientation==="vertical"&&this.range.stop(1,1)[q?"animate":"css"]({height:p+"%"},s.animate),t==="max"&&this.orientation==="vertical"&&this.range[q?"animate":"css"]({height:100-p+"%"},{queue:!1,duration:s.animate}))
}}),e.extend(e.ui.slider,{version:"1.8.23"})
}(jQuery),function(i,h){function k(){return ++m
}function j(){return ++l
}var m=0,l=0;
i.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:!1,cookie:null,collapsible:!1,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(!0)
},_setOption:function(d,c){if(d=="selected"){if(this.options.collapsible&&c==this.options.selected){return
}this.select(c)
}else{this.options[d]=c,this._tabify()
}},_tabId:function(b){return b.title&&b.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+k()
},_sanitizeSelector:function(b){return b.replace(/:/g,"\\:")
},_cookie:function(){var a=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+j());
return i.cookie.apply(null,[a].concat(i.makeArray(arguments)))
},_ui:function(d,c){return{tab:d,panel:c,index:this.anchors.index(d)}
},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var a=i(this);
a.html(a.data("label.tabs")).removeData("label.tabs")
})
},_tabify:function(z){function p(d,e){d.css("display",""),!i.support.opacity&&e.opacity&&d[0].style.removeAttribute("filter")
}var y=this,x=this.options,w=/^#.+/;
this.list=this.element.find("ol,ul").eq(0),this.lis=i(" > li:has(a[href])",this.list),this.anchors=this.lis.map(function(){return i("a",this)[0]
}),this.panels=i([]),this.anchors.each(function(d,B){var A=i(B).attr("href"),o=A.split("#")[0],n;
o&&(o===location.toString().split("#")[0]||(n=i("base")[0])&&o===n.href)&&(A=B.hash,B.href=A);
if(w.test(A)){y.panels=y.panels.add(y.element.find(y._sanitizeSelector(A)))
}else{if(A&&A!=="#"){i.data(B,"href.tabs",A),i.data(B,"load.tabs",A.replace(/#.*$/,""));
var f=y._tabId(B);
B.href="#"+f;
var e=y.element.find("#"+f);
e.length||(e=i(x.panelTemplate).attr("id",f).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(y.panels[d-1]||y.list),e.data("destroy.tabs",!0)),y.panels=y.panels.add(e)
}else{x.disabled.push(d)
}}}),z?(this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"),this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.lis.addClass("ui-state-default ui-corner-top"),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"),x.selected===h?(location.hash&&this.anchors.each(function(d,c){if(c.hash==location.hash){return x.selected=d,!1
}}),typeof x.selected!="number"&&x.cookie&&(x.selected=parseInt(y._cookie(),10)),typeof x.selected!="number"&&this.lis.filter(".ui-tabs-selected").length&&(x.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))),x.selected=x.selected||(this.lis.length?0:-1)):x.selected===null&&(x.selected=-1),x.selected=x.selected>=0&&this.anchors[x.selected]||x.selected<0?x.selected:0,x.disabled=i.unique(x.disabled.concat(i.map(this.lis.filter(".ui-state-disabled"),function(d,c){return y.lis.index(d)
}))).sort(),i.inArray(x.selected,x.disabled)!=-1&&x.disabled.splice(i.inArray(x.selected,x.disabled),1),this.panels.addClass("ui-tabs-hide"),this.lis.removeClass("ui-tabs-selected ui-state-active"),x.selected>=0&&this.anchors.length&&(y.element.find(y._sanitizeSelector(y.anchors[x.selected].hash)).removeClass("ui-tabs-hide"),this.lis.eq(x.selected).addClass("ui-tabs-selected ui-state-active"),y.element.queue("tabs",function(){y._trigger("show",null,y._ui(y.anchors[x.selected],y.element.find(y._sanitizeSelector(y.anchors[x.selected].hash))[0]))
}),this.load(x.selected)),i(window).bind("unload",function(){y.lis.add(y.anchors).unbind(".tabs"),y.lis=y.anchors=y.panels=null
})):x.selected=this.lis.index(this.lis.filter(".ui-tabs-selected")),this.element[x.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible"),x.cookie&&this._cookie(x.selected,x.cookie);
for(var v=0,u;
u=this.lis[v];
v++){i(u)[i.inArray(v,x.disabled)!=-1&&!i(u).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled")
}x.cache===!1&&this.anchors.removeData("cache.tabs"),this.lis.add(this.anchors).unbind(".tabs");
if(x.event!=="mouseover"){var t=function(d,c){c.is(":not(.ui-state-disabled)")&&c.addClass("ui-state-"+d)
},s=function(d,c){c.removeClass("ui-state-"+d)
};
this.lis.bind("mouseover.tabs",function(){t("hover",i(this))
}),this.lis.bind("mouseout.tabs",function(){s("hover",i(this))
}),this.anchors.bind("focus.tabs",function(){t("focus",i(this).closest("li"))
}),this.anchors.bind("blur.tabs",function(){s("focus",i(this).closest("li"))
})
}var r,q;
x.fx&&(i.isArray(x.fx)?(r=x.fx[0],q=x.fx[1]):r=q=x.fx);
var b=q?function(d,e){i(d).closest("li").addClass("ui-tabs-selected ui-state-active"),e.hide().removeClass("ui-tabs-hide").animate(q,q.duration||"normal",function(){p(e,q),y._trigger("show",null,y._ui(d,e[0]))
})
}:function(d,e){i(d).closest("li").addClass("ui-tabs-selected ui-state-active"),e.removeClass("ui-tabs-hide"),y._trigger("show",null,y._ui(d,e[0]))
},a=r?function(d,c){c.animate(r,r.duration||"normal",function(){y.lis.removeClass("ui-tabs-selected ui-state-active"),c.addClass("ui-tabs-hide"),p(c,r),y.element.dequeue("tabs")
})
}:function(e,d,f){y.lis.removeClass("ui-tabs-selected ui-state-active"),d.addClass("ui-tabs-hide"),y.element.dequeue("tabs")
};
this.anchors.bind(x.event+".tabs",function(){var d=this,o=i(d).closest("li"),n=y.panels.filter(":not(.ui-tabs-hide)"),e=y.element.find(y._sanitizeSelector(d.hash));
if(o.hasClass("ui-tabs-selected")&&!x.collapsible||o.hasClass("ui-state-disabled")||o.hasClass("ui-state-processing")||y.panels.filter(":animated").length||y._trigger("select",null,y._ui(this,e[0]))===!1){return this.blur(),!1
}x.selected=y.anchors.index(this),y.abort();
if(x.collapsible){if(o.hasClass("ui-tabs-selected")){return x.selected=-1,x.cookie&&y._cookie(x.selected,x.cookie),y.element.queue("tabs",function(){a(d,n)
}).dequeue("tabs"),this.blur(),!1
}if(!n.length){return x.cookie&&y._cookie(x.selected,x.cookie),y.element.queue("tabs",function(){b(d,e)
}),y.load(y.anchors.index(this)),this.blur(),!1
}}x.cookie&&y._cookie(x.selected,x.cookie);
if(e.length){n.length&&y.element.queue("tabs",function(){a(d,n)
}),y.element.queue("tabs",function(){b(d,e)
}),y.load(y.anchors.index(this))
}else{throw"jQuery UI Tabs: Mismatching fragment identifier."
}i.browser.msie&&this.blur()
}),this.anchors.bind("click.tabs",function(){return !1
})
},_getIndex:function(b){return typeof b=="string"&&(b=this.anchors.index(this.anchors.filter("[href$='"+b+"']"))),b
},destroy:function(){var a=this.options;
return this.abort(),this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"),this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.anchors.each(function(){var d=i.data(this,"href.tabs");
d&&(this.href=d);
var e=i(this).unbind(".tabs");
i.each(["href","load","cache"],function(f,c){e.removeData(c+".tabs")
})
}),this.lis.unbind(".tabs").add(this.panels).each(function(){i.data(this,"destroy.tabs")?i(this).remove():i(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))
}),a.cookie&&this._cookie(null,a.cookie),this
},add:function(s,r,q){q===h&&(q=this.anchors.length);
var p=this,o=this.options,n=i(o.tabTemplate.replace(/#\{href\}/g,s).replace(/#\{label\}/g,r)),b=s.indexOf("#")?this._tabId(i("a",n)[0]):s.replace("#","");
n.addClass("ui-state-default ui-corner-top").data("destroy.tabs",!0);
var a=p.element.find("#"+b);
return a.length||(a=i(o.panelTemplate).attr("id",b).data("destroy.tabs",!0)),a.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"),q>=this.lis.length?(n.appendTo(this.list),a.appendTo(this.list[0].parentNode)):(n.insertBefore(this.lis[q]),a.insertBefore(this.panels[q])),o.disabled=i.map(o.disabled,function(d,c){return d>=q?++d:d
}),this._tabify(),this.anchors.length==1&&(o.selected=0,n.addClass("ui-tabs-selected ui-state-active"),a.removeClass("ui-tabs-hide"),this.element.queue("tabs",function(){p._trigger("show",null,p._ui(p.anchors[0],p.panels[0]))
}),this.load(0)),this._trigger("add",null,this._ui(this.anchors[q],this.panels[q])),this
},remove:function(a){a=this._getIndex(a);
var o=this.options,n=this.lis.eq(a).remove(),f=this.panels.eq(a).remove();
return n.hasClass("ui-tabs-selected")&&this.anchors.length>1&&this.select(a+(a+1<this.anchors.length?1:-1)),o.disabled=i.map(i.grep(o.disabled,function(b,d){return b!=a
}),function(b,d){return b>=a?--b:b
}),this._tabify(),this._trigger("remove",null,this._ui(n.find("a")[0],f[0])),this
},enable:function(a){a=this._getIndex(a);
var d=this.options;
if(i.inArray(a,d.disabled)==-1){return
}return this.lis.eq(a).removeClass("ui-state-disabled"),d.disabled=i.grep(d.disabled,function(b,e){return b!=a
}),this._trigger("enable",null,this._ui(this.anchors[a],this.panels[a])),this
},disable:function(e){e=this._getIndex(e);
var d=this,f=this.options;
return e!=f.selected&&(this.lis.eq(e).addClass("ui-state-disabled"),f.disabled.push(e),f.disabled.sort(),this._trigger("disable",null,this._ui(this.anchors[e],this.panels[e]))),this
},select:function(b){b=this._getIndex(b);
if(b==-1){if(this.options.collapsible&&this.options.selected!=-1){b=this.options.selected
}else{return this
}}return this.anchors.eq(b).trigger(this.options.event+".tabs"),this
},load:function(a){a=this._getIndex(a);
var r=this,q=this.options,p=this.anchors.eq(a)[0],o=i.data(p,"load.tabs");
this.abort();
if(!o||this.element.queue("tabs").length!==0&&i.data(p,"cache.tabs")){this.element.dequeue("tabs");
return
}this.lis.eq(a).addClass("ui-state-processing");
if(q.spinner){var n=i("span",p);
n.data("label.tabs",n.html()).html(q.spinner)
}return this.xhr=i.ajax(i.extend({},q.ajaxOptions,{url:o,success:function(d,c){r.element.find(r._sanitizeSelector(p.hash)).html(d),r._cleanup(),q.cache&&i.data(p,"cache.tabs",!0),r._trigger("load",null,r._ui(r.anchors[a],r.panels[a]));
try{q.ajaxOptions.success(d,c)
}catch(b){}},error:function(b,d,c){r._cleanup(),r._trigger("load",null,r._ui(r.anchors[a],r.panels[a]));
try{q.ajaxOptions.error(b,d,a,p)
}catch(c){}}})),r.element.dequeue("tabs"),this
},abort:function(){return this.element.queue([]),this.panels.stop(!1,!0),this.element.queue("tabs",this.element.queue("tabs").splice(-2,2)),this.xhr&&(this.xhr.abort(),delete this.xhr),this._cleanup(),this
},url:function(d,c){return this.anchors.eq(d).removeData("cache.tabs").data("load.tabs",c),this
},length:function(){return this.anchors.length
}}),i.extend(i.ui.tabs,{version:"1.8.23"}),i.extend(i.ui.tabs.prototype,{rotation:null,rotate:function(o,n){var s=this,r=this.options,q=s._rotate||(s._rotate=function(a){clearTimeout(s.rotation),s.rotation=setTimeout(function(){var b=r.selected;
s.select(++b<s.anchors.length?b:0)
},o),a&&a.stopPropagation()
}),p=s._unrotate||(s._unrotate=n?function(b){q()
}:function(b){b.clientX&&s.rotate(null)
});
return o?(this.element.bind("tabsshow",q),this.anchors.bind(r.event+".tabs",p),q()):(clearTimeout(s.rotation),this.element.unbind("tabsshow",q),this.anchors.unbind(r.event+".tabs",p),delete this._rotate,delete this._unrotate),this
}})
}(jQuery);