/*!
 * jQuery UI 1.8.13
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(e,d){function b(f,c){var g=f.nodeName.toLowerCase();
if("area"===g){c=f.parentNode;
g=c.name;
if(!f.href||!g||c.nodeName.toLowerCase()!=="map"){return false
}f=e("img[usemap=#"+g+"]")[0];
return !!f&&a(f)
}return(/input|select|textarea|button|object/.test(g)?!f.disabled:"a"==g?f.href||c:c)&&a(f)
}function a(c){return !e(c).parents().andSelf().filter(function(){return e.curCSS(this,"visibility")==="hidden"||e.expr.filters.hidden(this)
}).length
}e.ui=e.ui||{};
if(!e.ui.version){e.extend(e.ui,{version:"1.8.13",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});
e.fn.extend({_focus:e.fn.focus,focus:function(f,c){return typeof f==="number"?this.each(function(){var g=this;
setTimeout(function(){e(g).focus();
c&&c.call(g)
},f)
}):this._focus.apply(this,arguments)
},scrollParent:function(){var c;
c=e.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.curCSS(this,"position",1))&&/(auto|scroll)/.test(e.curCSS(this,"overflow",1)+e.curCSS(this,"overflow-y",1)+e.curCSS(this,"overflow-x",1))
}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.curCSS(this,"overflow",1)+e.curCSS(this,"overflow-y",1)+e.curCSS(this,"overflow-x",1))
}).eq(0);
return/fixed/.test(this.css("position"))||!c.length?e(document):c
},zIndex:function(f){if(f!==d){return this.css("zIndex",f)
}if(this.length){f=e(this[0]);
for(var c;
f.length&&f[0]!==document;
){c=f.css("position");
if(c==="absolute"||c==="relative"||c==="fixed"){c=parseInt(f.css("zIndex"),10);
if(!isNaN(c)&&c!==0){return c
}}f=f.parent()
}}return 0
},disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(c){c.preventDefault()
})
},enableSelection:function(){return this.unbind(".ui-disableSelection")
}});
e.each(["Width","Height"],function(f,c){function l(o,i,h,p){e.each(k,function(){i-=parseFloat(e.curCSS(o,"padding"+this,true))||0;
if(h){i-=parseFloat(e.curCSS(o,"border"+this+"Width",true))||0
}if(p){i-=parseFloat(e.curCSS(o,"margin"+this,true))||0
}});
return i
}var k=c==="Width"?["Left","Right"]:["Top","Bottom"],j=c.toLowerCase(),g={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};
e.fn["inner"+c]=function(h){if(h===d){return g["inner"+c].call(this)
}return this.each(function(){e(this).css(j,l(this,h)+"px")
})
};
e.fn["outer"+c]=function(i,h){if(typeof i!=="number"){return g["outer"+c].call(this,i)
}return this.each(function(){e(this).css(j,l(this,i,true,h)+"px")
})
}
});
e.extend(e.expr[":"],{data:function(f,c,g){return !!e.data(f,g[3])
},focusable:function(c){return b(c,!isNaN(e.attr(c,"tabindex")))
},tabbable:function(f){var c=e.attr(f,"tabindex"),g=isNaN(c);
return(g||c>=0)&&b(f,!g)
}});
e(function(){var f=document.body,c=f.appendChild(c=document.createElement("div"));
e.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});
e.support.minHeight=c.offsetHeight===100;
e.support.selectstart="onselectstart" in c;
f.removeChild(c).style.display="none"
});
e.extend(e.ui,{plugin:{add:function(f,c,h){f=e.ui[f].prototype;
for(var g in h){f.plugins[g]=f.plugins[g]||[];
f.plugins[g].push([c,h[g]])
}},call:function(f,c,h){if((c=f.plugins[c])&&f.element[0].parentNode){for(var g=0;
g<c.length;
g++){f.options[c[g][0]]&&c[g][1].apply(f.element,h)
}}}},contains:function(f,c){return document.compareDocumentPosition?f.compareDocumentPosition(c)&16:f!==c&&f.contains(c)
},hasScroll:function(f,c){if(e(f).css("overflow")==="hidden"){return false
}c=c&&c==="left"?"scrollLeft":"scrollTop";
var g=false;
if(f[c]>0){return true
}f[c]=1;
g=f[c]>0;
f[c]=0;
return g
},isOverAxis:function(f,c,g){return f>c&&f<c+g
},isOver:function(f,c,l,k,j,g){return e.ui.isOverAxis(f,l,j)&&e.ui.isOverAxis(c,k,g)
}})
}})(jQuery);
/*!
 * jQuery UI Widget 1.8.13
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(a,e){if(a.cleanData){var d=a.cleanData;
a.cleanData=function(b){for(var g=0,f;
(f=b[g])!=null;
g++){a(f).triggerHandler("remove")
}d(b)
}
}else{var c=a.fn.remove;
a.fn.remove=function(b,f){return this.each(function(){if(!f){if(!b||a.filter(b,[this]).length){a("*",this).add([this]).each(function(){a(this).triggerHandler("remove")
})
}}return c.call(a(this),b,f)
})
}
}a.widget=function(b,j,i){var h=b.split(".")[0],g;
b=b.split(".")[1];
g=h+"-"+b;
if(!i){i=j;
j=a.Widget
}a.expr[":"][g]=function(f){return !!a.data(f,b)
};
a[h]=a[h]||{};
a[h][b]=function(f,k){arguments.length&&this._createWidget(f,k)
};
j=new j;
j.options=a.extend(true,{},j.options);
a[h][b].prototype=a.extend(true,j,{namespace:h,widgetName:b,widgetEventPrefix:a[h][b].prototype.widgetEventPrefix||b,widgetBaseClass:g},i);
a.widget.bridge(b,a[h][b])
};
a.widget.bridge=function(b,f){a.fn[b]=function(k){var j=typeof k==="string",i=Array.prototype.slice.call(arguments,1),g=this;
k=!j&&i.length?a.extend.apply(null,[true,k].concat(i)):k;
if(j&&k.charAt(0)==="_"){return g
}j?this.each(function(){var l=a.data(this,b),h=l&&a.isFunction(l[k])?l[k].apply(l,i):l;
if(h!==l&&h!==e){g=h;
return false
}}):this.each(function(){var h=a.data(this,b);
h?h.option(k||{})._init():a.data(this,b,new f(k,this))
});
return g
}
};
a.Widget=function(b,f){arguments.length&&this._createWidget(b,f)
};
a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(b,g){a.data(g,this.widgetName,this);
this.element=a(g);
this.options=a.extend(true,{},this.options,this._getCreateOptions(),b);
var f=this;
this.element.bind("remove."+this.widgetName,function(){f.destroy()
});
this._create();
this._trigger("create");
this._init()
},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]
},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);
this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")
},widget:function(){return this.element
},option:function(b,g){var f=b;
if(arguments.length===0){return a.extend({},this.options)
}if(typeof b==="string"){if(g===e){return this.options[b]
}f={};
f[b]=g
}this._setOptions(f);
return this
},_setOptions:function(b){var f=this;
a.each(b,function(h,g){f._setOption(h,g)
});
return this
},_setOption:function(b,f){this.options[b]=f;
if(b==="disabled"){this.widget()[f?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",f)
}return this
},enable:function(){return this._setOption("disabled",false)
},disable:function(){return this._setOption("disabled",true)
},_trigger:function(b,j,i){var h=this.options[b];
j=a.Event(j);
j.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase();
i=i||{};
if(j.originalEvent){b=a.event.props.length;
for(var g;
b;
){g=a.event.props[--b];
j[g]=j.originalEvent[g]
}}this.element.trigger(j,i);
return !(a.isFunction(h)&&h.call(this.element[0],j,i)===false||j.isDefaultPrevented())
}}
})(jQuery);
/*!
 * jQuery UI Mouse 1.8.13
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(a){var c=false;
a(document).mousedown(function(){c=false
});
a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var b=this;
this.element.bind("mousedown."+this.widgetName,function(d){return b._mouseDown(d)
}).bind("click."+this.widgetName,function(d){if(true===a.data(d.target,b.widgetName+".preventClickEvent")){a.removeData(d.target,b.widgetName+".preventClickEvent");
d.stopImmediatePropagation();
return false
}});
this.started=false
},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)
},_mouseDown:function(b){if(!c){this._mouseStarted&&this._mouseUp(b);
this._mouseDownEvent=b;
var h=this,e=b.which==1,d=typeof this.options.cancel=="string"?a(b.target).parents().add(b.target).filter(this.options.cancel).length:false;
if(!e||d||!this._mouseCapture(b)){return true
}this.mouseDelayMet=!this.options.delay;
if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){h.mouseDelayMet=true
},this.options.delay)
}if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){this._mouseStarted=this._mouseStart(b)!==false;
if(!this._mouseStarted){b.preventDefault();
return true
}}true===a.data(b.target,this.widgetName+".preventClickEvent")&&a.removeData(b.target,this.widgetName+".preventClickEvent");
this._mouseMoveDelegate=function(f){return h._mouseMove(f)
};
this._mouseUpDelegate=function(f){return h._mouseUp(f)
};
a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);
b.preventDefault();
return c=true
}},_mouseMove:function(b){if(a.browser.msie&&!(document.documentMode>=9)&&!b.button){return this._mouseUp(b)
}if(this._mouseStarted){this._mouseDrag(b);
return b.preventDefault()
}if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==false)?this._mouseDrag(b):this._mouseUp(b)
}return !this._mouseStarted
},_mouseUp:function(b){a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){this._mouseStarted=false;
b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",true);
this._mouseStop(b)
}return false
},_mouseDistanceMet:function(b){return Math.max(Math.abs(this._mouseDownEvent.pageX-b.pageX),Math.abs(this._mouseDownEvent.pageY-b.pageY))>=this.options.distance
},_mouseDelayMet:function(){return this.mouseDelayMet
},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true
}})
})(jQuery);
(function(f){f.ui=f.ui||{};
var e=/left|center|right/,d=/top|center|bottom/,b=f.fn.position,a=f.fn.offset;
f.fn.position=function(c){if(!c||!c.of){return b.apply(this,arguments)
}c=f.extend({},c);
var i=f(c.of),q=i[0],o=(c.collision||"flip").split(" "),p=c.offset?c.offset.split(" "):[0,0],n,l,m;
if(q.nodeType===9){n=i.width();
l=i.height();
m={top:0,left:0}
}else{if(q.setTimeout){n=i.width();
l=i.height();
m={top:i.scrollTop(),left:i.scrollLeft()}
}else{if(q.preventDefault){c.at="left top";
n=l=0;
m={top:c.of.pageY,left:c.of.pageX}
}else{n=i.outerWidth();
l=i.outerHeight();
m=i.offset()
}}}f.each(["my","at"],function(){var g=(c[this]||"").split(" ");
if(g.length===1){g=e.test(g[0])?g.concat(["center"]):d.test(g[0])?["center"].concat(g):["center","center"]
}g[0]=e.test(g[0])?g[0]:"center";
g[1]=d.test(g[1])?g[1]:"center";
c[this]=g
});
if(o.length===1){o[1]=o[0]
}p[0]=parseInt(p[0],10)||0;
if(p.length===1){p[1]=p[0]
}p[1]=parseInt(p[1],10)||0;
if(c.at[0]==="right"){m.left+=n
}else{if(c.at[0]==="center"){m.left+=n/2
}}if(c.at[1]==="bottom"){m.top+=l
}else{if(c.at[1]==="center"){m.top+=l/2
}}m.left+=p[0];
m.top+=p[1];
return this.each(function(){var x=f(this),s=x.outerWidth(),k=x.outerHeight(),j=parseInt(f.curCSS(this,"marginLeft",true))||0,h=parseInt(f.curCSS(this,"marginTop",true))||0,z=s+j+(parseInt(f.curCSS(this,"marginRight",true))||0),y=k+h+(parseInt(f.curCSS(this,"marginBottom",true))||0),u=f.extend({},m),g;
if(c.my[0]==="right"){u.left-=s
}else{if(c.my[0]==="center"){u.left-=s/2
}}if(c.my[1]==="bottom"){u.top-=k
}else{if(c.my[1]==="center"){u.top-=k/2
}}u.left=Math.round(u.left);
u.top=Math.round(u.top);
g={left:u.left-j,top:u.top-h};
f.each(["left","top"],function(v,r){f.ui.position[o[v]]&&f.ui.position[o[v]][r](u,{targetWidth:n,targetHeight:l,elemWidth:s,elemHeight:k,collisionPosition:g,collisionWidth:z,collisionHeight:y,offset:p,my:c.my,at:c.at})
});
f.fn.bgiframe&&x.bgiframe();
x.offset(f.extend(u,{using:c.using}))
})
};
f.ui.position={fit:{left:function(c,g){var h=f(window);
h=g.collisionPosition.left+g.collisionWidth-h.width()-h.scrollLeft();
c.left=h>0?c.left-h:Math.max(c.left-g.collisionPosition.left,c.left)
},top:function(c,g){var h=f(window);
h=g.collisionPosition.top+g.collisionHeight-h.height()-h.scrollTop();
c.top=h>0?c.top-h:Math.max(c.top-g.collisionPosition.top,c.top)
}},flip:{left:function(c,i){if(i.at[0]!=="center"){var m=f(window);
m=i.collisionPosition.left+i.collisionWidth-m.width()-m.scrollLeft();
var k=i.my[0]==="left"?-i.elemWidth:i.my[0]==="right"?i.elemWidth:0,l=i.at[0]==="left"?i.targetWidth:-i.targetWidth,j=-2*i.offset[0];
c.left+=i.collisionPosition.left<0?k+l+j:m>0?k+l+j:0
}},top:function(c,i){if(i.at[1]!=="center"){var m=f(window);
m=i.collisionPosition.top+i.collisionHeight-m.height()-m.scrollTop();
var k=i.my[1]==="top"?-i.elemHeight:i.my[1]==="bottom"?i.elemHeight:0,l=i.at[1]==="top"?i.targetHeight:-i.targetHeight,j=-2*i.offset[1];
c.top+=i.collisionPosition.top<0?k+l+j:m>0?k+l+j:0
}}}};
if(!f.offset.setOffset){f.offset.setOffset=function(c,i){if(/static/.test(f.curCSS(c,"position"))){c.style.position="relative"
}var m=f(c),k=m.offset(),l=parseInt(f.curCSS(c,"top",true),10)||0,j=parseInt(f.curCSS(c,"left",true),10)||0;
k={top:i.top-k.top+l,left:i.left-k.left+j};
"using" in i?i.using.call(c,k):m.css(k)
};
f.fn.offset=function(c){var g=this[0];
if(!g||!g.ownerDocument){return null
}if(c){return this.each(function(){f.offset.setOffset(this,c)
})
}return a.call(this)
}
}})(jQuery);
(function(a){a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))){this.element[0].style.position="relative"
}this.options.addClasses&&this.element.addClass("ui-draggable");
this.options.disabled&&this.element.addClass("ui-draggable-disabled");
this._mouseInit()
},destroy:function(){if(this.element.data("draggable")){this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
this._mouseDestroy();
return this
}},_mouseCapture:function(d){var c=this.options;
if(this.helper||c.disabled||a(d.target).is(".ui-resizable-handle")){return false
}this.handle=this._getHandle(d);
if(!this.handle){return false
}a(c.iframeFix===true?"iframe":c.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css(a(this).offset()).appendTo("body")
});
return true
},_mouseStart:function(d){var c=this.options;
this.helper=this._createHelper(d);
this._cacheHelperProportions();
if(a.ui.ddmanager){a.ui.ddmanager.current=this
}this._cacheMargins();
this.cssPosition=this.helper.css("position");
this.scrollParent=this.helper.scrollParent();
this.offset=this.positionAbs=this.element.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
a.extend(this.offset,{click:{left:d.pageX-this.offset.left,top:d.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this.position=this._generatePosition(d);
this.originalPageX=d.pageX;
this.originalPageY=d.pageY;
c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt);
c.containment&&this._setContainment();
if(this._trigger("start",d)===false){this._clear();
return false
}this._cacheHelperProportions();
a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,d);
this.helper.addClass("ui-draggable-dragging");
this._mouseDrag(d,true);
return true
},_mouseDrag:function(d,c){this.position=this._generatePosition(d);
this.positionAbs=this._convertPositionTo("absolute");
if(!c){c=this._uiHash();
if(this._trigger("drag",d,c)===false){this._mouseUp({});
return false
}this.position=c.position
}if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}a.ui.ddmanager&&a.ui.ddmanager.drag(this,d);
return false
},_mouseStop:function(e){var d=false;
if(a.ui.ddmanager&&!this.options.dropBehaviour){d=a.ui.ddmanager.drop(this,e)
}if(this.dropped){d=this.dropped;
this.dropped=false
}if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original"){return false
}if(this.options.revert=="invalid"&&!d||this.options.revert=="valid"&&d||this.options.revert===true||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,d)){var f=this;
a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){f._trigger("stop",e)!==false&&f._clear()
})
}else{this._trigger("stop",e)!==false&&this._clear()
}return false
},_mouseUp:function(b){this.options.iframeFix===true&&a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)
});
return a.ui.mouse.prototype._mouseUp.call(this,b)
},cancel:function(){this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();
return this
},_getHandle:function(d){var c=!this.options.handle||!a(this.options.handle,this.element).length?true:false;
a(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==d.target){c=true
}});
return c
},_createHelper:function(d){var c=this.options;
d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[d])):c.helper=="clone"?this.element.clone().removeAttr("id"):this.element;
d.parents("body").length||d.appendTo(c.appendTo=="parent"?this.element[0].parentNode:c.appendTo);
d[0]!=this.element[0]&&!/(fixed|absolute)/.test(d.css("position"))&&d.css("position","absolute");
return d
},_adjustOffsetFromHelper:function(b){if(typeof b=="string"){b=b.split(" ")
}if(a.isArray(b)){b={left:+b[0],top:+b[1]||0}
}if("left" in b){this.offset.click.left=b.left+this.margins.left
}if("right" in b){this.offset.click.left=this.helperProportions.width-b.right+this.margins.left
}if("top" in b){this.offset.click.top=b.top+this.margins.top
}if("bottom" in b){this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top
}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();
var b=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])){b.left+=this.scrollParent.scrollLeft();
b.top+=this.scrollParent.scrollTop()
}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie){b={top:0,left:0}
}return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var b=this.element.position();
return{top:b.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:b.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}
}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var e=this.options;
if(e.containment=="parent"){e.containment=this.helper[0].parentNode
}if(e.containment=="document"||e.containment=="window"){this.containment=[(e.containment=="document"?0:a(window).scrollLeft())-this.offset.relative.left-this.offset.parent.left,(e.containment=="document"?0:a(window).scrollTop())-this.offset.relative.top-this.offset.parent.top,(e.containment=="document"?0:a(window).scrollLeft())+a(e.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(e.containment=="document"?0:a(window).scrollTop())+(a(e.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!/^(document|window|parent)$/.test(e.containment)&&e.containment.constructor!=Array){e=a(e.containment);
var d=e[0];
if(d){e.offset();
var f=a(d).css("overflow")!="hidden";
this.containment=[(parseInt(a(d).css("borderLeftWidth"),10)||0)+(parseInt(a(d).css("paddingLeft"),10)||0),(parseInt(a(d).css("borderTopWidth"),10)||0)+(parseInt(a(d).css("paddingTop"),10)||0),(f?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(a(d).css("borderLeftWidth"),10)||0)-(parseInt(a(d).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(f?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(a(d).css("borderTopWidth"),10)||0)-(parseInt(a(d).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom];
this.relative_container=e
}}else{if(e.containment.constructor==Array){this.containment=e.containment
}}},_convertPositionTo:function(e,d){if(!d){d=this.position
}e=e=="absolute"?1:-1;
var h=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(h[0].tagName);
return{top:d.top+this.offset.relative.top*e+this.offset.parent.top*e-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:h.scrollTop())*e),left:d.left+this.offset.relative.left*e+this.offset.parent.left*e-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:h.scrollLeft())*e)}
},_generatePosition:function(i){var d=this.options,n=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,l=/(html|body)/i.test(n[0].tagName),m=i.pageX,j=i.pageY;
if(this.originalPosition){var k;
if(this.containment){if(this.relative_container){k=this.relative_container.offset();
k=[this.containment[0]+k.left,this.containment[1]+k.top,this.containment[2]+k.left,this.containment[3]+k.top]
}else{k=this.containment
}if(i.pageX-this.offset.click.left<k[0]){m=k[0]+this.offset.click.left
}if(i.pageY-this.offset.click.top<k[1]){j=k[1]+this.offset.click.top
}if(i.pageX-this.offset.click.left>k[2]){m=k[2]+this.offset.click.left
}if(i.pageY-this.offset.click.top>k[3]){j=k[3]+this.offset.click.top
}}if(d.grid){j=this.originalPageY+Math.round((j-this.originalPageY)/d.grid[1])*d.grid[1];
j=k?!(j-this.offset.click.top<k[1]||j-this.offset.click.top>k[3])?j:!(j-this.offset.click.top<k[1])?j-d.grid[1]:j+d.grid[1]:j;
m=this.originalPageX+Math.round((m-this.originalPageX)/d.grid[0])*d.grid[0];
m=k?!(m-this.offset.click.left<k[0]||m-this.offset.click.left>k[2])?m:!(m-this.offset.click.left<k[0])?m-d.grid[0]:m+d.grid[0]:m
}}return{top:j-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():l?0:n.scrollTop()),left:m-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():l?0:n.scrollLeft())}
},_clear:function(){this.helper.removeClass("ui-draggable-dragging");
this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove();
this.helper=null;
this.cancelHelperRemoval=false
},_trigger:function(e,d,f){f=f||this._uiHash();
a.ui.plugin.call(this,e,[d,f]);
if(e=="drag"){this.positionAbs=this._convertPositionTo("absolute")
}return a.Widget.prototype._trigger.call(this,e,d,f)
},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}
}});
a.extend(a.ui.draggable,{version:"1.8.13"});
a.ui.plugin.add("draggable","connectToSortable",{start:function(g,d){var j=a(this).data("draggable"),h=j.options,i=a.extend({},d,{item:j.element});
j.sortables=[];
a(h.connectToSortable).each(function(){var b=a.data(this,"sortable");
if(b&&!b.options.disabled){j.sortables.push({instance:b,shouldRevert:b.options.revert});
b.refreshPositions();
b._trigger("activate",g,i)
}})
},stop:function(e,d){var h=a(this).data("draggable"),g=a.extend({},d,{item:h.element});
a.each(h.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;
h.cancelHelperRemoval=true;
this.instance.cancelHelperRemoval=false;
if(this.shouldRevert){this.instance.options.revert=true
}this.instance._mouseStop(e);
this.instance.options.helper=this.instance.options._helper;
h.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})
}else{this.instance.cancelHelperRemoval=false;
this.instance._trigger("deactivate",e,g)
}})
},drag:function(e,d){var h=a(this).data("draggable"),g=this;
a.each(h.sortables,function(){this.instance.positionAbs=h.positionAbs;
this.instance.helperProportions=h.helperProportions;
this.instance.offset.click=h.offset.click;
if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;
this.instance.currentItem=a(g).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",true);
this.instance.options._helper=this.instance.options.helper;
this.instance.options.helper=function(){return d.helper[0]
};
e.target=this.instance.currentItem[0];
this.instance._mouseCapture(e,true);
this.instance._mouseStart(e,true,true);
this.instance.offset.click.top=h.offset.click.top;
this.instance.offset.click.left=h.offset.click.left;
this.instance.offset.parent.left-=h.offset.parent.left-this.instance.offset.parent.left;
this.instance.offset.parent.top-=h.offset.parent.top-this.instance.offset.parent.top;
h._trigger("toSortable",e);
h.dropped=this.instance.element;
h.currentItem=h.element;
this.instance.fromOutside=h
}this.instance.currentItem&&this.instance._mouseDrag(e)
}else{if(this.instance.isOver){this.instance.isOver=0;
this.instance.cancelHelperRemoval=true;
this.instance.options.revert=false;
this.instance._trigger("out",e,this.instance._uiHash(this.instance));
this.instance._mouseStop(e,true);
this.instance.options.helper=this.instance.options._helper;
this.instance.currentItem.remove();
this.instance.placeholder&&this.instance.placeholder.remove();
h._trigger("fromSortable",e);
h.dropped=false
}}})
}});
a.ui.plugin.add("draggable","cursor",{start:function(){var d=a("body"),c=a(this).data("draggable").options;
if(d.css("cursor")){c._cursor=d.css("cursor")
}d.css("cursor",c.cursor)
},stop:function(){var b=a(this).data("draggable").options;
b._cursor&&a("body").css("cursor",b._cursor)
}});
a.ui.plugin.add("draggable","opacity",{start:function(d,c){d=a(c.helper);
c=a(this).data("draggable").options;
if(d.css("opacity")){c._opacity=d.css("opacity")
}d.css("opacity",c.opacity)
},stop:function(d,c){d=a(this).data("draggable").options;
d._opacity&&a(c.helper).css("opacity",d._opacity)
}});
a.ui.plugin.add("draggable","scroll",{start:function(){var b=a(this).data("draggable");
if(b.scrollParent[0]!=document&&b.scrollParent[0].tagName!="HTML"){b.overflowOffset=b.scrollParent.offset()
}},drag:function(e){var d=a(this).data("draggable"),h=d.options,g=false;
if(d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"){if(!h.axis||h.axis!="x"){if(d.overflowOffset.top+d.scrollParent[0].offsetHeight-e.pageY<h.scrollSensitivity){d.scrollParent[0].scrollTop=g=d.scrollParent[0].scrollTop+h.scrollSpeed
}else{if(e.pageY-d.overflowOffset.top<h.scrollSensitivity){d.scrollParent[0].scrollTop=g=d.scrollParent[0].scrollTop-h.scrollSpeed
}}}if(!h.axis||h.axis!="y"){if(d.overflowOffset.left+d.scrollParent[0].offsetWidth-e.pageX<h.scrollSensitivity){d.scrollParent[0].scrollLeft=g=d.scrollParent[0].scrollLeft+h.scrollSpeed
}else{if(e.pageX-d.overflowOffset.left<h.scrollSensitivity){d.scrollParent[0].scrollLeft=g=d.scrollParent[0].scrollLeft-h.scrollSpeed
}}}}else{if(!h.axis||h.axis!="x"){if(e.pageY-a(document).scrollTop()<h.scrollSensitivity){g=a(document).scrollTop(a(document).scrollTop()-h.scrollSpeed)
}else{if(a(window).height()-(e.pageY-a(document).scrollTop())<h.scrollSensitivity){g=a(document).scrollTop(a(document).scrollTop()+h.scrollSpeed)
}}}if(!h.axis||h.axis!="y"){if(e.pageX-a(document).scrollLeft()<h.scrollSensitivity){g=a(document).scrollLeft(a(document).scrollLeft()-h.scrollSpeed)
}else{if(a(window).width()-(e.pageX-a(document).scrollLeft())<h.scrollSensitivity){g=a(document).scrollLeft(a(document).scrollLeft()+h.scrollSpeed)
}}}}g!==false&&a.ui.ddmanager&&!h.dropBehaviour&&a.ui.ddmanager.prepareOffsets(d,e)
}});
a.ui.plugin.add("draggable","snap",{start:function(){var d=a(this).data("draggable"),c=d.options;
d.snapElements=[];
a(c.snap.constructor!=String?c.snap.items||":data(draggable)":c.snap).each(function(){var e=a(this),b=e.offset();
this!=d.element[0]&&d.snapElements.push({item:this,width:e.outerWidth(),height:e.outerHeight(),top:b.top,left:b.left})
})
},drag:function(L,K){for(var J=a(this).data("draggable"),H=J.options,I=H.snapTolerance,F=K.offset.left,G=F+J.helperProportions.width,z=K.offset.top,y=z+J.helperProportions.height,E=J.snapElements.length-1;
E>=0;
E--){var D=J.snapElements[E].left,B=D+J.snapElements[E].width,C=J.snapElements[E].top,A=C+J.snapElements[E].height;
if(D-I<F&&F<B+I&&C-I<z&&z<A+I||D-I<F&&F<B+I&&C-I<y&&y<A+I||D-I<G&&G<B+I&&C-I<z&&z<A+I||D-I<G&&G<B+I&&C-I<y&&y<A+I){if(H.snapMode!="inner"){var x=Math.abs(C-y)<=I,w=Math.abs(A-z)<=I,v=Math.abs(D-G)<=I,u=Math.abs(B-F)<=I;
if(x){K.position.top=J._convertPositionTo("relative",{top:C-J.helperProportions.height,left:0}).top-J.margins.top
}if(w){K.position.top=J._convertPositionTo("relative",{top:A,left:0}).top-J.margins.top
}if(v){K.position.left=J._convertPositionTo("relative",{top:0,left:D-J.helperProportions.width}).left-J.margins.left
}if(u){K.position.left=J._convertPositionTo("relative",{top:0,left:B}).left-J.margins.left
}}var d=x||w||v||u;
if(H.snapMode!="outer"){x=Math.abs(C-z)<=I;
w=Math.abs(A-y)<=I;
v=Math.abs(D-F)<=I;
u=Math.abs(B-G)<=I;
if(x){K.position.top=J._convertPositionTo("relative",{top:C,left:0}).top-J.margins.top
}if(w){K.position.top=J._convertPositionTo("relative",{top:A-J.helperProportions.height,left:0}).top-J.margins.top
}if(v){K.position.left=J._convertPositionTo("relative",{top:0,left:D}).left-J.margins.left
}if(u){K.position.left=J._convertPositionTo("relative",{top:0,left:B-J.helperProportions.width}).left-J.margins.left
}}if(!J.snapElements[E].snapping&&(x||w||v||u||d)){J.options.snap.snap&&J.options.snap.snap.call(J.element,L,a.extend(J._uiHash(),{snapItem:J.snapElements[E].item}))
}J.snapElements[E].snapping=x||w||v||u||d
}else{J.snapElements[E].snapping&&J.options.snap.release&&J.options.snap.release.call(J.element,L,a.extend(J._uiHash(),{snapItem:J.snapElements[E].item}));
J.snapElements[E].snapping=false
}}}});
a.ui.plugin.add("draggable","stack",{start:function(){var d=a(this).data("draggable").options;
d=a.makeArray(a(d.stack)).sort(function(e,b){return(parseInt(a(e).css("zIndex"),10)||0)-(parseInt(a(b).css("zIndex"),10)||0)
});
if(d.length){var c=parseInt(d[0].style.zIndex)||0;
a(d).each(function(b){this.style.zIndex=c+b
});
this[0].style.zIndex=c+d.length
}}});
a.ui.plugin.add("draggable","zIndex",{start:function(d,c){d=a(c.helper);
c=a(this).data("draggable").options;
if(d.css("zIndex")){c._zIndex=d.css("zIndex")
}d.css("zIndex",c.zIndex)
},stop:function(d,c){d=a(this).data("draggable").options;
d._zIndex&&a(c.helper).css("zIndex",d._zIndex)
}})
})(jQuery);
(function(a){a.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"},_create:function(){var d=this.options,c=d.accept;
this.isover=0;
this.isout=1;
this.accept=a.isFunction(c)?c:function(b){return b.is(c)
};
this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};
a.ui.ddmanager.droppables[d.scope]=a.ui.ddmanager.droppables[d.scope]||[];
a.ui.ddmanager.droppables[d.scope].push(this);
d.addClasses&&this.element.addClass("ui-droppable")
},destroy:function(){for(var d=a.ui.ddmanager.droppables[this.options.scope],c=0;
c<d.length;
c++){d[c]==this&&d.splice(c,1)
}this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
return this
},_setOption:function(d,c){if(d=="accept"){this.accept=a.isFunction(c)?c:function(b){return b.is(c)
}
}a.Widget.prototype._setOption.apply(this,arguments)
},_activate:function(d){var c=a.ui.ddmanager.current;
this.options.activeClass&&this.element.addClass(this.options.activeClass);
c&&this._trigger("activate",d,this.ui(c))
},_deactivate:function(d){var c=a.ui.ddmanager.current;
this.options.activeClass&&this.element.removeClass(this.options.activeClass);
c&&this._trigger("deactivate",d,this.ui(c))
},_over:function(d){var c=a.ui.ddmanager.current;
if(!(!c||(c.currentItem||c.element)[0]==this.element[0])){if(this.accept.call(this.element[0],c.currentItem||c.element)){this.options.hoverClass&&this.element.addClass(this.options.hoverClass);
this._trigger("over",d,this.ui(c))
}}},_out:function(d){var c=a.ui.ddmanager.current;
if(!(!c||(c.currentItem||c.element)[0]==this.element[0])){if(this.accept.call(this.element[0],c.currentItem||c.element)){this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);
this._trigger("out",d,this.ui(c))
}}},_drop:function(f,d){var h=d||a.ui.ddmanager.current;
if(!h||(h.currentItem||h.element)[0]==this.element[0]){return false
}var g=false;
this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var b=a.data(this,"droppable");
if(b.options.greedy&&!b.options.disabled&&b.options.scope==h.options.scope&&b.accept.call(b.element[0],h.currentItem||h.element)&&a.ui.intersect(h,a.extend(b,{offset:b.element.offset()}),b.options.tolerance)){g=true;
return false
}});
if(g){return false
}if(this.accept.call(this.element[0],h.currentItem||h.element)){this.options.activeClass&&this.element.removeClass(this.options.activeClass);
this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);
this._trigger("drop",f,this.ui(h));
return this.element
}return false
},ui:function(b){return{draggable:b.currentItem||b.element,helper:b.helper,position:b.position,offset:b.positionAbs}
}});
a.extend(a.ui.droppable,{version:"1.8.13"});
a.ui.intersect=function(w,v,u){if(!v.offset){return false
}var s=(w.positionAbs||w.position.absolute).left,q=s+w.helperProportions.width,r=(w.positionAbs||w.position.absolute).top,p=r+w.helperProportions.height,o=v.offset.left,m=o+v.proportions.width,n=v.offset.top,d=n+v.proportions.height;
switch(u){case"fit":return o<=s&&q<=m&&n<=r&&p<=d;
case"intersect":return o<s+w.helperProportions.width/2&&q-w.helperProportions.width/2<m&&n<r+w.helperProportions.height/2&&p-w.helperProportions.height/2<d;
case"pointer":return a.ui.isOver((w.positionAbs||w.position.absolute).top+(w.clickOffset||w.offset.click).top,(w.positionAbs||w.position.absolute).left+(w.clickOffset||w.offset.click).left,n,o,v.proportions.height,v.proportions.width);
case"touch":return(r>=n&&r<=d||p>=n&&p<=d||r<n&&p>d)&&(s>=o&&s<=m||q>=o&&q<=m||s<o&&q>m);
default:return false
}};
a.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(i,d){var n=a.ui.ddmanager.droppables[i.options.scope]||[],m=d?d.type:null,k=(i.currentItem||i.element).find(":data(droppable)").andSelf(),l=0;
i:for(;
l<n.length;
l++){if(!(n[l].options.disabled||i&&!n[l].accept.call(n[l].element[0],i.currentItem||i.element))){for(var j=0;
j<k.length;
j++){if(k[j]==n[l].element[0]){n[l].proportions.height=0;
continue i
}}n[l].visible=n[l].element.css("display")!="none";
if(n[l].visible){m=="mousedown"&&n[l]._activate.call(n[l],d);
n[l].offset=n[l].element.offset();
n[l].proportions={width:n[l].element[0].offsetWidth,height:n[l].element[0].offsetHeight}
}}}},drop:function(e,d){var f=false;
a.each(a.ui.ddmanager.droppables[e.options.scope]||[],function(){if(this.options){if(!this.options.disabled&&this.visible&&a.ui.intersect(e,this,this.options.tolerance)){f=f||this._drop.call(this,d)
}if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],e.currentItem||e.element)){this.isout=1;
this.isover=0;
this._deactivate.call(this,d)
}}});
return f
},drag:function(d,c){d.options.refreshPositions&&a.ui.ddmanager.prepareOffsets(d,c);
a.each(a.ui.ddmanager.droppables[d.options.scope]||[],function(){if(!(this.options.disabled||this.greedyChild||!this.visible)){var h=a.ui.intersect(d,this,this.options.tolerance);
if(h=!h&&this.isover==1?"isout":h&&this.isover==0?"isover":null){var f;
if(this.options.greedy){var b=this.element.parents(":data(droppable):eq(0)");
if(b.length){f=a.data(b[0],"droppable");
f.greedyChild=h=="isover"?1:0
}}if(f&&h=="isover"){f.isover=0;
f.isout=1;
f._out.call(f,c)
}this[h]=1;
this[h=="isout"?"isover":"isout"]=0;
this[h=="isover"?"_over":"_out"].call(this,c);
if(f&&h=="isout"){f.isout=0;
f.isover=1;
f._over.call(f,c)
}}}})
}}
})(jQuery);
(function(c){c.widget("ui.resizable",c.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1000},_create:function(){var e=this,h=this.options;
this.element.addClass("ui-resizable");
c.extend(this,{_aspectRatio:!!h.aspectRatio,aspectRatio:h.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:h.helper||h.ghost||h.animate?h.helper||"ui-resizable-helper":null});
if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){/relative/.test(this.element.css("position"))&&c.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"});
this.element.wrap(c('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));
this.element=this.element.parent().data("resizable",this.element.data("resizable"));
this.elementIsWrapper=true;
this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});
this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});
this.originalResizeStyle=this.originalElement.css("resize");
this.originalElement.css("resize","none");
this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));
this.originalElement.css({margin:this.originalElement.css("margin")});
this._proportionallyResize()
}this.handles=h.handles||(!c(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});
if(this.handles.constructor==String){if(this.handles=="all"){this.handles="n,e,s,w,se,sw,ne,nw"
}var l=this.handles.split(",");
this.handles={};
for(var k=0;
k<l.length;
k++){var j=c.trim(l[k]),i=c('<div class="ui-resizable-handle '+("ui-resizable-"+j)+'"></div>');
/sw|se|ne|nw/.test(j)&&i.css({zIndex:++h.zIndex});
"se"==j&&i.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
this.handles[j]=".ui-resizable-"+j;
this.element.append(i)
}}this._renderAxis=function(m){m=m||this.element;
for(var g in this.handles){if(this.handles[g].constructor==String){this.handles[g]=c(this.handles[g],this.element).show()
}if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var f=c(this.handles[g],this.element),d=0;
d=/sw|ne|nw|se|n|s/.test(g)?f.outerHeight():f.outerWidth();
f=["padding",/ne|nw|n/.test(g)?"Top":/se|sw|s/.test(g)?"Bottom":/^e$/.test(g)?"Right":"Left"].join("");
m.css(f,d);
this._proportionallyResize()
}c(this.handles[g])
}};
this._renderAxis(this.element);
this._handles=c(".ui-resizable-handle",this.element).disableSelection();
this._handles.mouseover(function(){if(!e.resizing){if(this.className){var d=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
}e.axis=d&&d[1]?d[1]:"se"
}});
if(h.autoHide){this._handles.hide();
c(this.element).addClass("ui-resizable-autohide").hover(function(){if(!h.disabled){c(this).removeClass("ui-resizable-autohide");
e._handles.show()
}},function(){if(!h.disabled){if(!e.resizing){c(this).addClass("ui-resizable-autohide");
e._handles.hide()
}}})
}this._mouseInit()
},destroy:function(){this._mouseDestroy();
var d=function(f){c(f).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
};
if(this.elementIsWrapper){d(this.element);
var e=this.element;
e.after(this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")})).remove()
}this.originalElement.css("resize",this.originalResizeStyle);
d(this.originalElement);
return this
},_mouseCapture:function(d){var e=false;
for(var f in this.handles){if(c(this.handles[f])[0]==d.target){e=true
}}return !this.options.disabled&&e
},_mouseStart:function(e){var g=this.options,j=this.element.position(),i=this.element;
this.resizing=true;
this.documentScroll={top:c(document).scrollTop(),left:c(document).scrollLeft()};
if(i.is(".ui-draggable")||/absolute/.test(i.css("position"))){i.css({position:"absolute",top:j.top,left:j.left})
}c.browser.opera&&/relative/.test(i.css("position"))&&i.css({position:"relative",top:"auto",left:"auto"});
this._renderProxy();
j=a(this.helper.css("left"));
var h=a(this.helper.css("top"));
if(g.containment){j+=c(g.containment).scrollLeft()||0;
h+=c(g.containment).scrollTop()||0
}this.offset=this.helper.offset();
this.position={left:j,top:h};
this.size=this._helper?{width:i.outerWidth(),height:i.outerHeight()}:{width:i.width(),height:i.height()};
this.originalSize=this._helper?{width:i.outerWidth(),height:i.outerHeight()}:{width:i.width(),height:i.height()};
this.originalPosition={left:j,top:h};
this.sizeDiff={width:i.outerWidth()-i.width(),height:i.outerHeight()-i.height()};
this.originalMousePosition={left:e.pageX,top:e.pageY};
this.aspectRatio=typeof g.aspectRatio=="number"?g.aspectRatio:this.originalSize.width/this.originalSize.height||1;
g=c(".ui-resizable-"+this.axis).css("cursor");
c("body").css("cursor",g=="auto"?this.axis+"-resize":g);
i.addClass("ui-resizable-resizing");
this._propagate("start",e);
return true
},_mouseDrag:function(e){var f=this.helper,h=this.originalMousePosition,g=this._change[this.axis];
if(!g){return false
}h=g.apply(this,[e,e.pageX-h.left||0,e.pageY-h.top||0]);
if(this._aspectRatio||e.shiftKey){h=this._updateRatio(h,e)
}h=this._respectSize(h,e);
this._propagate("resize",e);
f.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});
!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize();
this._updateCache(h);
this._trigger("resize",e,this.ui());
return false
},_mouseStop:function(e){this.resizing=false;
var h=this.options,l=this;
if(this._helper){var k=this._proportionallyResizeElements,j=k.length&&/textarea/i.test(k[0].nodeName);
k=j&&c.ui.hasScroll(k[0],"left")?0:l.sizeDiff.height;
j=j?0:l.sizeDiff.width;
j={width:l.helper.width()-j,height:l.helper.height()-k};
k=parseInt(l.element.css("left"),10)+(l.position.left-l.originalPosition.left)||null;
var i=parseInt(l.element.css("top"),10)+(l.position.top-l.originalPosition.top)||null;
h.animate||this.element.css(c.extend(j,{top:i,left:k}));
l.helper.height(l.size.height);
l.helper.width(l.size.width);
this._helper&&!h.animate&&this._proportionallyResize()
}c("body").css("cursor","auto");
this.element.removeClass("ui-resizable-resizing");
this._propagate("stop",e);
this._helper&&this.helper.remove();
return false
},_updateCache:function(d){this.offset=this.helper.offset();
if(b(d.left)){this.position.left=d.left
}if(b(d.top)){this.position.top=d.top
}if(b(d.height)){this.size.height=d.height
}if(b(d.width)){this.size.width=d.width
}},_updateRatio:function(e){var f=this.position,h=this.size,g=this.axis;
if(e.height){e.width=h.height*this.aspectRatio
}else{if(e.width){e.height=h.width/this.aspectRatio
}}if(g=="sw"){e.left=f.left+(h.width-e.width);
e.top=null
}if(g=="nw"){e.top=f.top+(h.height-e.height);
e.left=f.left+(h.width-e.width)
}return e
},_respectSize:function(s){var u=this.options,r=this.axis,q=b(s.width)&&u.maxWidth&&u.maxWidth<s.width,p=b(s.height)&&u.maxHeight&&u.maxHeight<s.height,o=b(s.width)&&u.minWidth&&u.minWidth>s.width,n=b(s.height)&&u.minHeight&&u.minHeight>s.height;
if(o){s.width=u.minWidth
}if(n){s.height=u.minHeight
}if(q){s.width=u.maxWidth
}if(p){s.height=u.maxHeight
}var m=this.originalPosition.left+this.originalSize.width,l=this.position.top+this.size.height,e=/sw|nw|w/.test(r);
r=/nw|ne|n/.test(r);
if(o&&e){s.left=m-u.minWidth
}if(q&&e){s.left=m-u.maxWidth
}if(n&&r){s.top=l-u.minHeight
}if(p&&r){s.top=l-u.maxHeight
}if((u=!s.width&&!s.height)&&!s.left&&s.top){s.top=null
}else{if(u&&!s.top&&s.left){s.left=null
}}return s
},_proportionallyResize:function(){if(this._proportionallyResizeElements.length){for(var e=this.helper||this.element,g=0;
g<this._proportionallyResizeElements.length;
g++){var j=this._proportionallyResizeElements[g];
if(!this.borderDif){var i=[j.css("borderTopWidth"),j.css("borderRightWidth"),j.css("borderBottomWidth"),j.css("borderLeftWidth")],h=[j.css("paddingTop"),j.css("paddingRight"),j.css("paddingBottom"),j.css("paddingLeft")];
this.borderDif=c.map(i,function(f,d){f=parseInt(f,10)||0;
d=parseInt(h[d],10)||0;
return f+d
})
}c.browser.msie&&(c(e).is(":hidden")||c(e).parents(":hidden").length)||j.css({height:e.height()-this.borderDif[0]-this.borderDif[2]||0,width:e.width()-this.borderDif[1]-this.borderDif[3]||0})
}}},_renderProxy:function(){var d=this.options;
this.elementOffset=this.element.offset();
if(this._helper){this.helper=this.helper||c('<div style="overflow:hidden;"></div>');
var e=c.browser.msie&&c.browser.version<7,f=e?1:0;
e=e?2:-1;
this.helper.addClass(this._helper).css({width:this.element.outerWidth()+e,height:this.element.outerHeight()+e,position:"absolute",left:this.elementOffset.left-f+"px",top:this.elementOffset.top-f+"px",zIndex:++d.zIndex});
this.helper.appendTo("body").disableSelection()
}else{this.helper=this.element
}},_change:{e:function(d,e){return{width:this.originalSize.width+e}
},w:function(d,e){return{left:this.originalPosition.left+e,width:this.originalSize.width-e}
},n:function(d,e,f){return{top:this.originalPosition.top+f,height:this.originalSize.height-f}
},s:function(d,e,f){return{height:this.originalSize.height+f}
},se:function(d,e,f){return c.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[d,e,f]))
},sw:function(d,e,f){return c.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[d,e,f]))
},ne:function(d,e,f){return c.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[d,e,f]))
},nw:function(d,e,f){return c.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[d,e,f]))
}},_propagate:function(d,e){c.ui.plugin.call(this,d,[e,this.ui()]);
d!="resize"&&this._trigger(d,e,this.ui())
},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}
}});
c.extend(c.ui.resizable,{version:"1.8.13"});
c.ui.plugin.add("resizable","alsoResize",{start:function(){var d=c(this).data("resizable").options,e=function(f){c(f).each(function(){var g=c(this);
g.data("resizable-alsoresize",{width:parseInt(g.width(),10),height:parseInt(g.height(),10),left:parseInt(g.css("left"),10),top:parseInt(g.css("top"),10),position:g.css("position")})
})
};
if(typeof d.alsoResize=="object"&&!d.alsoResize.parentNode){if(d.alsoResize.length){d.alsoResize=d.alsoResize[0];
e(d.alsoResize)
}else{c.each(d.alsoResize,function(f){e(f)
})
}}else{e(d.alsoResize)
}},resize:function(e,i){var n=c(this).data("resizable");
e=n.options;
var m=n.originalSize,l=n.originalPosition,k={height:n.size.height-m.height||0,width:n.size.width-m.width||0,top:n.position.top-l.top||0,left:n.position.left-l.left||0},j=function(f,d){c(f).each(function(){var g=c(this),o=c(this).data("resizable-alsoresize"),s={},h=d&&d.length?d:g.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];
c.each(h,function(q,p){if((q=(o[p]||0)+(k[p]||0))&&q>=0){s[p]=q||null
}});
if(c.browser.opera&&/relative/.test(g.css("position"))){n._revertToRelativePosition=true;
g.css({position:"absolute",top:"auto",left:"auto"})
}g.css(s)
})
};
typeof e.alsoResize=="object"&&!e.alsoResize.nodeType?c.each(e.alsoResize,function(f,d){j(f,d)
}):j(e.alsoResize)
},stop:function(){var d=c(this).data("resizable"),e=d.options,f=function(g){c(g).each(function(){var h=c(this);
h.css({position:h.data("resizable-alsoresize").position})
})
};
if(d._revertToRelativePosition){d._revertToRelativePosition=false;
typeof e.alsoResize=="object"&&!e.alsoResize.nodeType?c.each(e.alsoResize,function(g){f(g)
}):f(e.alsoResize)
}c(this).removeData("resizable-alsoresize")
}});
c.ui.plugin.add("resizable","animate",{stop:function(e){var i=c(this).data("resizable"),n=i.options,m=i._proportionallyResizeElements,l=m.length&&/textarea/i.test(m[0].nodeName),k=l&&c.ui.hasScroll(m[0],"left")?0:i.sizeDiff.height;
l={width:i.size.width-(l?0:i.sizeDiff.width),height:i.size.height-k};
k=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null;
var j=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;
i.element.animate(c.extend(l,j&&k?{top:j,left:k}:{}),{duration:n.animateDuration,easing:n.animateEasing,step:function(){var d={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};
m&&m.length&&c(m[0]).css({width:d.width,height:d.height});
i._updateCache(d);
i._propagate("resize",e)
}})
}});
c.ui.plugin.add("resizable","containment",{start:function(){var e=c(this).data("resizable"),i=e.element,n=e.options.containment;
if(i=n instanceof c?n.get(0):/parent/.test(n)?i.parent().get(0):n){e.containerElement=c(i);
if(/document/.test(n)||n==document){e.containerOffset={left:0,top:0};
e.containerPosition={left:0,top:0};
e.parentData={element:c(document),left:0,top:0,width:c(document).width(),height:c(document).height()||document.body.parentNode.scrollHeight}
}else{var m=c(i),l=[];
c(["Top","Right","Left","Bottom"]).each(function(f,d){l[f]=a(m.css("padding"+d))
});
e.containerOffset=m.offset();
e.containerPosition=m.position();
e.containerSize={height:m.innerHeight()-l[3],width:m.innerWidth()-l[1]};
n=e.containerOffset;
var k=e.containerSize.height,j=e.containerSize.width;
j=c.ui.hasScroll(i,"left")?i.scrollWidth:j;
k=c.ui.hasScroll(i)?i.scrollHeight:k;
e.parentData={element:i,left:n.left,top:n.top,width:j,height:k}
}}},resize:function(e){var i=c(this).data("resizable"),n=i.options,m=i.containerOffset,l=i.position;
e=i._aspectRatio||e.shiftKey;
var k={top:0,left:0},j=i.containerElement;
if(j[0]!=document&&/static/.test(j.css("position"))){k=m
}if(l.left<(i._helper?m.left:0)){i.size.width+=i._helper?i.position.left-m.left:i.position.left-k.left;
if(e){i.size.height=i.size.width/n.aspectRatio
}i.position.left=n.helper?m.left:0
}if(l.top<(i._helper?m.top:0)){i.size.height+=i._helper?i.position.top-m.top:i.position.top;
if(e){i.size.width=i.size.height*n.aspectRatio
}i.position.top=i._helper?m.top:0
}i.offset.left=i.parentData.left+i.position.left;
i.offset.top=i.parentData.top+i.position.top;
n=Math.abs((i._helper?i.offset.left-k.left:i.offset.left-k.left)+i.sizeDiff.width);
m=Math.abs((i._helper?i.offset.top-k.top:i.offset.top-m.top)+i.sizeDiff.height);
l=i.containerElement.get(0)==i.element.parent().get(0);
k=/relative|absolute/.test(i.containerElement.css("position"));
if(l&&k){n-=i.parentData.left
}if(n+i.size.width>=i.parentData.width){i.size.width=i.parentData.width-n;
if(e){i.size.height=i.size.width/i.aspectRatio
}}if(m+i.size.height>=i.parentData.height){i.size.height=i.parentData.height-m;
if(e){i.size.width=i.size.height*i.aspectRatio
}}},stop:function(){var e=c(this).data("resizable"),j=e.options,p=e.containerOffset,o=e.containerPosition,n=e.containerElement,m=c(e.helper),l=m.offset(),k=m.outerWidth()-e.sizeDiff.width;
m=m.outerHeight()-e.sizeDiff.height;
e._helper&&!j.animate&&/relative/.test(n.css("position"))&&c(this).css({left:l.left-o.left-p.left,width:k,height:m});
e._helper&&!j.animate&&/static/.test(n.css("position"))&&c(this).css({left:l.left-o.left-p.left,width:k,height:m})
}});
c.ui.plugin.add("resizable","ghost",{start:function(){var d=c(this).data("resizable"),e=d.options,f=d.size;
d.ghost=d.originalElement.clone();
d.ghost.css({opacity:0.25,display:"block",position:"relative",height:f.height,width:f.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof e.ghost=="string"?e.ghost:"");
d.ghost.appendTo(d.helper)
},resize:function(){var d=c(this).data("resizable");
d.ghost&&d.ghost.css({position:"relative",height:d.size.height,width:d.size.width})
},stop:function(){var d=c(this).data("resizable");
d.ghost&&d.helper&&d.helper.get(0).removeChild(d.ghost.get(0))
}});
c.ui.plugin.add("resizable","grid",{resize:function(){var e=c(this).data("resizable"),i=e.options,n=e.size,m=e.originalSize,l=e.originalPosition,k=e.axis;
i.grid=typeof i.grid=="number"?[i.grid,i.grid]:i.grid;
var j=Math.round((n.width-m.width)/(i.grid[0]||1))*(i.grid[0]||1);
i=Math.round((n.height-m.height)/(i.grid[1]||1))*(i.grid[1]||1);
if(/^(se|s|e)$/.test(k)){e.size.width=m.width+j;
e.size.height=m.height+i
}else{if(/^(ne)$/.test(k)){e.size.width=m.width+j;
e.size.height=m.height+i;
e.position.top=l.top-i
}else{if(/^(sw)$/.test(k)){e.size.width=m.width+j;
e.size.height=m.height+i
}else{e.size.width=m.width+j;
e.size.height=m.height+i;
e.position.top=l.top-i
}e.position.left=l.left-j
}}}});
var a=function(d){return parseInt(d,10)||0
},b=function(d){return !isNaN(parseInt(d,10))
}
})(jQuery);
(function(a){a.widget("ui.selectable",a.ui.mouse,{options:{appendTo:"body",autoRefresh:true,distance:0,filter:"*",tolerance:"touch"},_create:function(){var d=this;
this.element.addClass("ui-selectable");
this.dragged=false;
var b;
this.refresh=function(){b=a(d.options.filter,d.element[0]);
b.each(function(){var e=a(this),c=e.offset();
a.data(this,"selectable-item",{element:this,$element:e,left:c.left,top:c.top,right:c.left+e.outerWidth(),bottom:c.top+e.outerHeight(),startselected:false,selected:e.hasClass("ui-selected"),selecting:e.hasClass("ui-selecting"),unselecting:e.hasClass("ui-unselecting")})
})
};
this.refresh();
this.selectees=b.addClass("ui-selectee");
this._mouseInit();
this.helper=a("<div class='ui-selectable-helper'></div>")
},destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item");
this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
this._mouseDestroy();
return this
},_mouseStart:function(g){var b=this;
this.opos=[g.pageX,g.pageY];
if(!this.options.disabled){var e=this.options;
this.selectees=a(e.filter,this.element[0]);
this._trigger("start",g);
a(e.appendTo).append(this.helper);
this.helper.css({left:g.clientX,top:g.clientY,width:0,height:0});
e.autoRefresh&&this.refresh();
this.selectees.filter(".ui-selected").each(function(){var c=a.data(this,"selectable-item");
c.startselected=true;
if(!g.metaKey){c.$element.removeClass("ui-selected");
c.selected=false;
c.$element.addClass("ui-unselecting");
c.unselecting=true;
b._trigger("unselecting",g,{unselecting:c.element})
}});
a(g.target).parents().andSelf().each(function(){var c=a.data(this,"selectable-item");
if(c){var d=!g.metaKey||!c.$element.hasClass("ui-selected");
c.$element.removeClass(d?"ui-unselecting":"ui-selected").addClass(d?"ui-selecting":"ui-unselecting");
c.unselecting=!d;
c.selecting=d;
(c.selected=d)?b._trigger("selecting",g,{selecting:c.element}):b._trigger("unselecting",g,{unselecting:c.element});
return false
}})
}},_mouseDrag:function(q){var o=this;
this.dragged=true;
if(!this.options.disabled){var p=this.options,e=this.opos[0],n=this.opos[1],m=q.pageX,l=q.pageY;
if(e>m){var k=m;
m=e;
e=k
}if(n>l){k=l;
l=n;
n=k
}this.helper.css({left:e,top:n,width:m-e,height:l-n});
this.selectees.each(function(){var b=a.data(this,"selectable-item");
if(!(!b||b.element==o.element[0])){var c=false;
if(p.tolerance=="touch"){c=!(b.left>m||b.right<e||b.top>l||b.bottom<n)
}else{if(p.tolerance=="fit"){c=b.left>e&&b.right<m&&b.top>n&&b.bottom<l
}}if(c){if(b.selected){b.$element.removeClass("ui-selected");
b.selected=false
}if(b.unselecting){b.$element.removeClass("ui-unselecting");
b.unselecting=false
}if(!b.selecting){b.$element.addClass("ui-selecting");
b.selecting=true;
o._trigger("selecting",q,{selecting:b.element})
}}else{if(b.selecting){if(q.metaKey&&b.startselected){b.$element.removeClass("ui-selecting");
b.selecting=false;
b.$element.addClass("ui-selected");
b.selected=true
}else{b.$element.removeClass("ui-selecting");
b.selecting=false;
if(b.startselected){b.$element.addClass("ui-unselecting");
b.unselecting=true
}o._trigger("unselecting",q,{unselecting:b.element})
}}if(b.selected){if(!q.metaKey&&!b.startselected){b.$element.removeClass("ui-selected");
b.selected=false;
b.$element.addClass("ui-unselecting");
b.unselecting=true;
o._trigger("unselecting",q,{unselecting:b.element})
}}}}});
return false
}},_mouseStop:function(d){var b=this;
this.dragged=false;
a(".ui-unselecting",this.element[0]).each(function(){var c=a.data(this,"selectable-item");
c.$element.removeClass("ui-unselecting");
c.unselecting=false;
c.startselected=false;
b._trigger("unselected",d,{unselected:c.element})
});
a(".ui-selecting",this.element[0]).each(function(){var c=a.data(this,"selectable-item");
c.$element.removeClass("ui-selecting").addClass("ui-selected");
c.selecting=false;
c.selected=true;
c.startselected=true;
b._trigger("selected",d,{selected:c.element})
});
this._trigger("stop",d);
this.helper.remove();
return false
}});
a.extend(a.ui.selectable,{version:"1.8.13"})
})(jQuery);
(function(a){a.widget("ui.sortable",a.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000},_create:function(){var b=this.options;
this.containerCache={};
this.element.addClass("ui-sortable");
this.refresh();
this.floating=this.items.length?b.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):false;
this.offset=this.element.offset();
this._mouseInit()
},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
this._mouseDestroy();
for(var b=this.items.length-1;
b>=0;
b--){this.items[b].item.removeData("sortable-item")
}return this
},_setOption:function(d,c){if(d==="disabled"){this.options[d]=c;
this.widget()[c?"addClass":"removeClass"]("ui-sortable-disabled")
}else{a.Widget.prototype._setOption.apply(this,arguments)
}},_mouseCapture:function(g,d){if(this.reverting){return false
}if(this.options.disabled||this.options.type=="static"){return false
}this._refreshItems(g);
var j=null,i=this;
a(g.target).parents().each(function(){if(a.data(this,"sortable-item")==i){j=a(this);
return false
}});
if(a.data(g.target,"sortable-item")==i){j=a(g.target)
}if(!j){return false
}if(this.options.handle&&!d){var h=false;
a(this.options.handle,j).find("*").andSelf().each(function(){if(this==g.target){h=true
}});
if(!h){return false
}}this.currentItem=j;
this._removeCurrentsFromItems();
return true
},_mouseStart:function(f,d,h){d=this.options;
var g=this;
this.currentContainer=this;
this.refreshPositions();
this.helper=this._createHelper(f);
this._cacheHelperProportions();
this._cacheMargins();
this.scrollParent=this.helper.scrollParent();
this.offset=this.currentItem.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
this.helper.css("position","absolute");
this.cssPosition=this.helper.css("position");
a.extend(this.offset,{click:{left:f.pageX-this.offset.left,top:f.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this._generatePosition(f);
this.originalPageX=f.pageX;
this.originalPageY=f.pageY;
d.cursorAt&&this._adjustOffsetFromHelper(d.cursorAt);
this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};
this.helper[0]!=this.currentItem[0]&&this.currentItem.hide();
this._createPlaceholder();
d.containment&&this._setContainment();
if(d.cursor){if(a("body").css("cursor")){this._storedCursor=a("body").css("cursor")
}a("body").css("cursor",d.cursor)
}if(d.opacity){if(this.helper.css("opacity")){this._storedOpacity=this.helper.css("opacity")
}this.helper.css("opacity",d.opacity)
}if(d.zIndex){if(this.helper.css("zIndex")){this._storedZIndex=this.helper.css("zIndex")
}this.helper.css("zIndex",d.zIndex)
}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){this.overflowOffset=this.scrollParent.offset()
}this._trigger("start",f,this._uiHash());
this._preserveHelperProportions||this._cacheHelperProportions();
if(!h){for(h=this.containers.length-1;
h>=0;
h--){this.containers[h]._trigger("activate",f,g._uiHash(this))
}}if(a.ui.ddmanager){a.ui.ddmanager.current=this
}a.ui.ddmanager&&!d.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,f);
this.dragging=true;
this.helper.addClass("ui-sortable-helper");
this._mouseDrag(f);
return true
},_mouseDrag:function(g){this.position=this._generatePosition(g);
this.positionAbs=this._convertPositionTo("absolute");
if(!this.lastPositionAbs){this.lastPositionAbs=this.positionAbs
}if(this.options.scroll){var d=this.options,j=false;
if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if(this.overflowOffset.top+this.scrollParent[0].offsetHeight-g.pageY<d.scrollSensitivity){this.scrollParent[0].scrollTop=j=this.scrollParent[0].scrollTop+d.scrollSpeed
}else{if(g.pageY-this.overflowOffset.top<d.scrollSensitivity){this.scrollParent[0].scrollTop=j=this.scrollParent[0].scrollTop-d.scrollSpeed
}}if(this.overflowOffset.left+this.scrollParent[0].offsetWidth-g.pageX<d.scrollSensitivity){this.scrollParent[0].scrollLeft=j=this.scrollParent[0].scrollLeft+d.scrollSpeed
}else{if(g.pageX-this.overflowOffset.left<d.scrollSensitivity){this.scrollParent[0].scrollLeft=j=this.scrollParent[0].scrollLeft-d.scrollSpeed
}}}else{if(g.pageY-a(document).scrollTop()<d.scrollSensitivity){j=a(document).scrollTop(a(document).scrollTop()-d.scrollSpeed)
}else{if(a(window).height()-(g.pageY-a(document).scrollTop())<d.scrollSensitivity){j=a(document).scrollTop(a(document).scrollTop()+d.scrollSpeed)
}}if(g.pageX-a(document).scrollLeft()<d.scrollSensitivity){j=a(document).scrollLeft(a(document).scrollLeft()-d.scrollSpeed)
}else{if(a(window).width()-(g.pageX-a(document).scrollLeft())<d.scrollSensitivity){j=a(document).scrollLeft(a(document).scrollLeft()+d.scrollSpeed)
}}}j!==false&&a.ui.ddmanager&&!d.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,g)
}this.positionAbs=this._convertPositionTo("absolute");
if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}for(d=this.items.length-1;
d>=0;
d--){j=this.items[d];
var i=j.item[0],h=this._intersectsWithPointer(j);
if(h){if(i!=this.currentItem[0]&&this.placeholder[h==1?"next":"prev"]()[0]!=i&&!a.ui.contains(this.placeholder[0],i)&&(this.options.type=="semi-dynamic"?!a.ui.contains(this.element[0],i):true)){this.direction=h==1?"down":"up";
if(this.options.tolerance=="pointer"||this._intersectsWithSides(j)){this._rearrange(g,j)
}else{break
}this._trigger("change",g,this._uiHash());
break
}}}this._contactContainers(g);
a.ui.ddmanager&&a.ui.ddmanager.drag(this,g);
this._trigger("sort",g,this._uiHash());
this.lastPositionAbs=this.positionAbs;
return false
},_mouseStop:function(e,d){if(e){a.ui.ddmanager&&!this.options.dropBehaviour&&a.ui.ddmanager.drop(this,e);
if(this.options.revert){var f=this;
d=f.placeholder.offset();
f.reverting=true;
a(this.helper).animate({left:d.left-this.offset.parent.left-f.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:d.top-this.offset.parent.top-f.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){f._clear(e)
})
}else{this._clear(e,d)
}return false
}},cancel:function(){var d=this;
if(this.dragging){this._mouseUp({target:null});
this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();
for(var c=this.containers.length-1;
c>=0;
c--){this.containers[c]._trigger("deactivate",null,d._uiHash(this));
if(this.containers[c].containerCache.over){this.containers[c]._trigger("out",null,d._uiHash(this));
this.containers[c].containerCache.over=0
}}}if(this.placeholder){this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove();
a.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});
this.domPosition.prev?a(this.domPosition.prev).after(this.currentItem):a(this.domPosition.parent).prepend(this.currentItem)
}return this
},serialize:function(e){var d=this._getItemsAsjQuery(e&&e.connected),f=[];
e=e||{};
a(d).each(function(){var b=(a(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[-=_](.+)/);
if(b){f.push((e.key||b[1]+"[]")+"="+(e.key&&e.expression?b[1]:b[2]))
}});
!f.length&&e.key&&f.push(e.key+"=");
return f.join("&")
},toArray:function(e){var d=this._getItemsAsjQuery(e&&e.connected),f=[];
e=e||{};
d.each(function(){f.push(a(e.item||this).attr(e.attribute||"id")||"")
});
return f
},_intersectsWith:function(w){var v=this.positionAbs.left,u=v+this.helperProportions.width,s=this.positionAbs.top,r=s+this.helperProportions.height,q=w.left,p=q+w.width,o=w.top,m=o+w.height,n=this.offset.click.top,d=this.offset.click.left;
n=s+n>o&&s+n<m&&v+d>q&&v+d<p;
return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>w[this.floating?"width":"height"]?n:q<v+this.helperProportions.width/2&&u-this.helperProportions.width/2<p&&o<s+this.helperProportions.height/2&&r-this.helperProportions.height/2<m
},_intersectsWithPointer:function(e){var d=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,e.top,e.height);
e=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,e.left,e.width);
d=d&&e;
e=this._getDragVerticalDirection();
var f=this._getDragHorizontalDirection();
if(!d){return false
}return this.floating?f&&f=="right"||e=="down"?2:1:e&&(e=="down"?2:1)
},_intersectsWithSides:function(f){var d=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,f.top+f.height/2,f.height);
f=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,f.left+f.width/2,f.width);
var h=this._getDragVerticalDirection(),g=this._getDragHorizontalDirection();
return this.floating&&g?g=="right"&&f||g=="left"&&!f:h&&(h=="down"&&d||h=="up"&&!d)
},_getDragVerticalDirection:function(){var b=this.positionAbs.top-this.lastPositionAbs.top;
return b!=0&&(b>0?"down":"up")
},_getDragHorizontalDirection:function(){var b=this.positionAbs.left-this.lastPositionAbs.left;
return b!=0&&(b>0?"right":"left")
},refresh:function(b){this._refreshItems(b);
this.refreshPositions();
return this
},_connectWith:function(){var b=this.options;
return b.connectWith.constructor==String?[b.connectWith]:b.connectWith
},_getItemsAsjQuery:function(i){var d=[],n=[],m=this._connectWith();
if(m&&i){for(i=m.length-1;
i>=0;
i--){for(var l=a(m[i]),k=l.length-1;
k>=0;
k--){var j=a.data(l[k],"sortable");
if(j&&j!=this&&!j.options.disabled){n.push([a.isFunction(j.options.items)?j.options.items.call(j.element):a(j.options.items,j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),j])
}}}}n.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);
for(i=n.length-1;
i>=0;
i--){n[i][0].each(function(){d.push(this)
})
}return a(d)
},_removeCurrentsFromItems:function(){for(var e=this.currentItem.find(":data(sortable-item)"),d=0;
d<this.items.length;
d++){for(var f=0;
f<e.length;
f++){e[f]==this.items[d].item[0]&&this.items.splice(d,1)
}}},_refreshItems:function(j){this.items=[];
this.containers=[this];
var d=this.items,p=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],j,{item:this.currentItem}):a(this.options.items,this.element),this]],o=this._connectWith();
if(o){for(var n=o.length-1;
n>=0;
n--){for(var m=a(o[n]),l=m.length-1;
l>=0;
l--){var k=a.data(m[l],"sortable");
if(k&&k!=this&&!k.options.disabled){p.push([a.isFunction(k.options.items)?k.options.items.call(k.element[0],j,{item:this.currentItem}):a(k.options.items,k.element),k]);
this.containers.push(k)
}}}}for(n=p.length-1;
n>=0;
n--){j=p[n][1];
o=p[n][0];
l=0;
for(m=o.length;
l<m;
l++){k=a(o[l]);
k.data("sortable-item",j);
d.push({item:k,instance:j,width:0,height:0,left:0,top:0})
}}},refreshPositions:function(f){if(this.offsetParent&&this.helper){this.offset.parent=this._getParentOffset()
}for(var d=this.items.length-1;
d>=0;
d--){var h=this.items[d];
if(!(h.instance!=this.currentContainer&&this.currentContainer&&h.item[0]!=this.currentItem[0])){var g=this.options.toleranceElement?a(this.options.toleranceElement,h.item):h.item;
if(!f){h.width=g.outerWidth();
h.height=g.outerHeight()
}g=g.offset();
h.left=g.left;
h.top=g.top
}}if(this.options.custom&&this.options.custom.refreshContainers){this.options.custom.refreshContainers.call(this)
}else{for(d=this.containers.length-1;
d>=0;
d--){g=this.containers[d].element.offset();
this.containers[d].containerCache.left=g.left;
this.containers[d].containerCache.top=g.top;
this.containers[d].containerCache.width=this.containers[d].element.outerWidth();
this.containers[d].containerCache.height=this.containers[d].element.outerHeight()
}}return this
},_createPlaceholder:function(f){var d=f||this,h=d.options;
if(!h.placeholder||h.placeholder.constructor==String){var g=h.placeholder;
h.placeholder={element:function(){var b=a(document.createElement(d.currentItem[0].nodeName)).addClass(g||d.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
if(!g){b.style.visibility="hidden"
}return b
},update:function(c,b){if(!(g&&!h.forcePlaceholderSize)){b.height()||b.height(d.currentItem.innerHeight()-parseInt(d.currentItem.css("paddingTop")||0,10)-parseInt(d.currentItem.css("paddingBottom")||0,10));
b.width()||b.width(d.currentItem.innerWidth()-parseInt(d.currentItem.css("paddingLeft")||0,10)-parseInt(d.currentItem.css("paddingRight")||0,10))
}}}
}d.placeholder=a(h.placeholder.element.call(d.element,d.currentItem));
d.currentItem.after(d.placeholder);
h.placeholder.update(d,d.placeholder)
},_contactContainers:function(i){for(var d=null,n=null,m=this.containers.length-1;
m>=0;
m--){if(!a.ui.contains(this.currentItem[0],this.containers[m].element[0])){if(this._intersectsWith(this.containers[m].containerCache)){if(!(d&&a.ui.contains(this.containers[m].element[0],d.element[0]))){d=this.containers[m];
n=m
}}else{if(this.containers[m].containerCache.over){this.containers[m]._trigger("out",i,this._uiHash(this));
this.containers[m].containerCache.over=0
}}}}if(d){if(this.containers.length===1){this.containers[n]._trigger("over",i,this._uiHash(this));
this.containers[n].containerCache.over=1
}else{if(this.currentContainer!=this.containers[n]){d=10000;
m=null;
for(var l=this.positionAbs[this.containers[n].floating?"left":"top"],k=this.items.length-1;
k>=0;
k--){if(a.ui.contains(this.containers[n].element[0],this.items[k].item[0])){var j=this.items[k][this.containers[n].floating?"left":"top"];
if(Math.abs(j-l)<d){d=Math.abs(j-l);
m=this.items[k]
}}}if(m||this.options.dropOnEmpty){this.currentContainer=this.containers[n];
m?this._rearrange(i,m,null,true):this._rearrange(i,null,this.containers[n].element,true);
this._trigger("change",i,this._uiHash());
this.containers[n]._trigger("change",i,this._uiHash(this));
this.options.placeholder.update(this.currentContainer,this.placeholder);
this.containers[n]._trigger("over",i,this._uiHash(this));
this.containers[n].containerCache.over=1
}}}}},_createHelper:function(d){var c=this.options;
d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[d,this.currentItem])):c.helper=="clone"?this.currentItem.clone():this.currentItem;
d.parents("body").length||a(c.appendTo!="parent"?c.appendTo:this.currentItem[0].parentNode)[0].appendChild(d[0]);
if(d[0]==this.currentItem[0]){this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}
}if(d[0].style.width==""||c.forceHelperSize){d.width(this.currentItem.width())
}if(d[0].style.height==""||c.forceHelperSize){d.height(this.currentItem.height())
}return d
},_adjustOffsetFromHelper:function(b){if(typeof b=="string"){b=b.split(" ")
}if(a.isArray(b)){b={left:+b[0],top:+b[1]||0}
}if("left" in b){this.offset.click.left=b.left+this.margins.left
}if("right" in b){this.offset.click.left=this.helperProportions.width-b.right+this.margins.left
}if("top" in b){this.offset.click.top=b.top+this.margins.top
}if("bottom" in b){this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top
}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();
var b=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])){b.left+=this.scrollParent.scrollLeft();
b.top+=this.scrollParent.scrollTop()
}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie){b={top:0,left:0}
}return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var b=this.currentItem.position();
return{top:b.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:b.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}
}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var e=this.options;
if(e.containment=="parent"){e.containment=this.helper[0].parentNode
}if(e.containment=="document"||e.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(e.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(e.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!/^(document|window|parent)$/.test(e.containment)){var d=a(e.containment)[0];
e=a(e.containment).offset();
var f=a(d).css("overflow")!="hidden";
this.containment=[e.left+(parseInt(a(d).css("borderLeftWidth"),10)||0)+(parseInt(a(d).css("paddingLeft"),10)||0)-this.margins.left,e.top+(parseInt(a(d).css("borderTopWidth"),10)||0)+(parseInt(a(d).css("paddingTop"),10)||0)-this.margins.top,e.left+(f?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(a(d).css("borderLeftWidth"),10)||0)-(parseInt(a(d).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,e.top+(f?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(a(d).css("borderTopWidth"),10)||0)-(parseInt(a(d).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]
}},_convertPositionTo:function(f,d){if(!d){d=this.position
}f=f=="absolute"?1:-1;
var h=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(h[0].tagName);
return{top:d.top+this.offset.relative.top*f+this.offset.parent.top*f-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:h.scrollTop())*f),left:d.left+this.offset.relative.left*f+this.offset.parent.left*f-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:h.scrollLeft())*f)}
},_generatePosition:function(h){var d=this.options,l=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,k=/(html|body)/i.test(l[0].tagName);
if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()
}var j=h.pageX,i=h.pageY;
if(this.originalPosition){if(this.containment){if(h.pageX-this.offset.click.left<this.containment[0]){j=this.containment[0]+this.offset.click.left
}if(h.pageY-this.offset.click.top<this.containment[1]){i=this.containment[1]+this.offset.click.top
}if(h.pageX-this.offset.click.left>this.containment[2]){j=this.containment[2]+this.offset.click.left
}if(h.pageY-this.offset.click.top>this.containment[3]){i=this.containment[3]+this.offset.click.top
}}if(d.grid){i=this.originalPageY+Math.round((i-this.originalPageY)/d.grid[1])*d.grid[1];
i=this.containment?!(i-this.offset.click.top<this.containment[1]||i-this.offset.click.top>this.containment[3])?i:!(i-this.offset.click.top<this.containment[1])?i-d.grid[1]:i+d.grid[1]:i;
j=this.originalPageX+Math.round((j-this.originalPageX)/d.grid[0])*d.grid[0];
j=this.containment?!(j-this.offset.click.left<this.containment[0]||j-this.offset.click.left>this.containment[2])?j:!(j-this.offset.click.left<this.containment[0])?j-d.grid[0]:j+d.grid[0]:j
}}return{top:i-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():k?0:l.scrollTop()),left:j-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():k?0:l.scrollLeft())}
},_rearrange:function(h,d,l,k){l?l[0].appendChild(this.placeholder[0]):d.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?d.item[0]:d.item[0].nextSibling);
this.counter=this.counter?++this.counter:1;
var j=this,i=this.counter;
window.setTimeout(function(){i==j.counter&&j.refreshPositions(!k)
},0)
},_clear:function(f,d){this.reverting=false;
var h=[];
!this._noFinalSort&&this.currentItem[0].parentNode&&this.placeholder.before(this.currentItem);
this._noFinalSort=null;
if(this.helper[0]==this.currentItem[0]){for(var g in this._storedCSS){if(this._storedCSS[g]=="auto"||this._storedCSS[g]=="static"){this._storedCSS[g]=""
}}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
}else{this.currentItem.show()
}this.fromOutside&&!d&&h.push(function(b){this._trigger("receive",b,this._uiHash(this.fromOutside))
});
if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!d){h.push(function(b){this._trigger("update",b,this._uiHash())
})
}if(!a.ui.contains(this.element[0],this.currentItem[0])){d||h.push(function(b){this._trigger("remove",b,this._uiHash())
});
for(g=this.containers.length-1;
g>=0;
g--){if(a.ui.contains(this.containers[g].element[0],this.currentItem[0])&&!d){h.push(function(b){return function(c){b._trigger("receive",c,this._uiHash(this))
}
}.call(this,this.containers[g]));
h.push(function(b){return function(c){b._trigger("update",c,this._uiHash(this))
}
}.call(this,this.containers[g]))
}}}for(g=this.containers.length-1;
g>=0;
g--){d||h.push(function(b){return function(c){b._trigger("deactivate",c,this._uiHash(this))
}
}.call(this,this.containers[g]));
if(this.containers[g].containerCache.over){h.push(function(b){return function(c){b._trigger("out",c,this._uiHash(this))
}
}.call(this,this.containers[g]));
this.containers[g].containerCache.over=0
}}this._storedCursor&&a("body").css("cursor",this._storedCursor);
this._storedOpacity&&this.helper.css("opacity",this._storedOpacity);
if(this._storedZIndex){this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex)
}this.dragging=false;
if(this.cancelHelperRemoval){if(!d){this._trigger("beforeStop",f,this._uiHash());
for(g=0;
g<h.length;
g++){h[g].call(this,f)
}this._trigger("stop",f,this._uiHash())
}return false
}d||this._trigger("beforeStop",f,this._uiHash());
this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
this.helper[0]!=this.currentItem[0]&&this.helper.remove();
this.helper=null;
if(!d){for(g=0;
g<h.length;
g++){h[g].call(this,f)
}this._trigger("stop",f,this._uiHash())
}this.fromOutside=false;
return true
},_trigger:function(){a.Widget.prototype._trigger.apply(this,arguments)===false&&this.cancel()
},_uiHash:function(d){var c=d||this;
return{helper:c.helper,placeholder:c.placeholder||a([]),position:c.position,originalPosition:c.originalPosition,offset:c.positionAbs,item:c.currentItem,sender:d?d.element:null}
}});
a.extend(a.ui.sortable,{version:"1.8.13"})
})(jQuery);
(function(a){a.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()
}},_create:function(){var e=this,c=e.options;
e.running=0;
e.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
e.headers=e.element.find(c.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){c.disabled||a(this).addClass("ui-state-hover")
}).bind("mouseleave.accordion",function(){c.disabled||a(this).removeClass("ui-state-hover")
}).bind("focus.accordion",function(){c.disabled||a(this).addClass("ui-state-focus")
}).bind("blur.accordion",function(){c.disabled||a(this).removeClass("ui-state-focus")
});
e.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
if(c.navigation){var g=e.element.find("a").filter(c.navigationFilter).eq(0);
if(g.length){var f=g.closest(".ui-accordion-header");
e.active=f.length?f:g.closest(".ui-accordion-content").prev()
}}e.active=e._findActive(e.active||c.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
e.active.next().addClass("ui-accordion-content-active");
e._createIcons();
e.resize();
e.element.attr("role","tablist");
e.headers.attr("role","tab").bind("keydown.accordion",function(b){return e._keydown(b)
}).next().attr("role","tabpanel");
e.headers.not(e.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide();
e.active.length?e.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}):e.headers.eq(0).attr("tabIndex",0);
a.browser.safari||e.headers.find("a").attr("tabIndex",-1);
c.event&&e.headers.bind(c.event.split(" ").join(".accordion ")+".accordion",function(b){e._clickHandler.call(e,b,this);
b.preventDefault()
})
},_createIcons:function(){var b=this.options;
if(b.icons){a("<span></span>").addClass("ui-icon "+b.icons.header).prependTo(this.headers);
this.active.children(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected);
this.element.addClass("ui-accordion-icons")
}},_destroyIcons:function(){this.headers.children(".ui-icon").remove();
this.element.removeClass("ui-accordion-icons")
},destroy:function(){var d=this.options;
this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");
this.headers.find("a").removeAttr("tabIndex");
this._destroyIcons();
var c=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
if(d.autoHeight||d.fillHeight){c.css("height","")
}return a.Widget.prototype.destroy.call(this)
},_setOption:function(d,c){a.Widget.prototype._setOption.apply(this,arguments);
d=="active"&&this.activate(c);
if(d=="icons"){this._destroyIcons();
c&&this._createIcons()
}if(d=="disabled"){this.headers.add(this.headers.next())[c?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")
}},_keydown:function(e){if(!(this.options.disabled||e.altKey||e.ctrlKey)){var c=a.ui.keyCode,j=this.headers.length,g=this.headers.index(e.target),i=false;
switch(e.keyCode){case c.RIGHT:case c.DOWN:i=this.headers[(g+1)%j];
break;
case c.LEFT:case c.UP:i=this.headers[(g-1+j)%j];
break;
case c.SPACE:case c.ENTER:this._clickHandler({target:e.target},e.target);
e.preventDefault()
}if(i){a(e.target).attr("tabIndex",-1);
a(i).attr("tabIndex",0);
i.focus();
return false
}return true
}},resize:function(){var e=this.options,c;
if(e.fillSpace){if(a.browser.msie){var f=this.element.parent().css("overflow");
this.element.parent().css("overflow","hidden")
}c=this.element.parent().height();
a.browser.msie&&this.element.parent().css("overflow",f);
this.headers.each(function(){c-=a(this).outerHeight(true)
});
this.headers.next().each(function(){a(this).height(Math.max(0,c-a(this).innerHeight()+a(this).height()))
}).css("overflow","auto")
}else{if(e.autoHeight){c=0;
this.headers.next().each(function(){c=Math.max(c,a(this).height("").height())
}).height(c)
}}return this
},activate:function(b){this.options.active=b;
b=this._findActive(b)[0];
this._clickHandler({target:b},b);
return this
},_findActive:function(b){return b?typeof b==="number"?this.headers.filter(":eq("+b+")"):this.headers.not(this.headers.not(b)):b===false?a([]):this.headers.filter(":eq(0)")
},_clickHandler:function(i,c){var p=this.options;
if(!p.disabled){if(i.target){i=a(i.currentTarget||c);
c=i[0]===this.active[0];
p.active=p.collapsible&&c?false:this.headers.index(i);
if(!(this.running||!p.collapsible&&c)){var l=this.active;
k=i.next();
m=this.active.next();
o={options:p,newHeader:c&&p.collapsible?a([]):i,oldHeader:this.active,newContent:c&&p.collapsible?a([]):k,oldContent:m};
var n=this.headers.index(this.active[0])>this.headers.index(i[0]);
this.active=c?a([]):i;
this._toggle(k,m,o,c,n);
l.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(p.icons.headerSelected).addClass(p.icons.header);
if(!c){i.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(p.icons.header).addClass(p.icons.headerSelected);
i.next().addClass("ui-accordion-content-active")
}}}else{if(p.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(p.icons.headerSelected).addClass(p.icons.header);
this.active.next().addClass("ui-accordion-content-active");
var m=this.active.next(),o={options:p,newHeader:a([]),oldHeader:p.active,newContent:a([]),oldContent:m},k=this.active=a([]);
this._toggle(k,m,o)
}}}},_toggle:function(u,s,r,n,p){var o=this,q=o.options;
o.toShow=u;
o.toHide=s;
o.data=r;
var l=function(){if(o){return o._completed.apply(o,arguments)
}};
o._trigger("changestart",null,o.data);
o.running=s.size()===0?u.size():s.size();
if(q.animated){r={};
r=q.collapsible&&n?{toShow:a([]),toHide:s,complete:l,down:p,autoHeight:q.autoHeight||q.fillSpace}:{toShow:u,toHide:s,complete:l,down:p,autoHeight:q.autoHeight||q.fillSpace};
if(!q.proxied){q.proxied=q.animated
}if(!q.proxiedDuration){q.proxiedDuration=q.duration
}q.animated=a.isFunction(q.proxied)?q.proxied(r):q.proxied;
q.duration=a.isFunction(q.proxiedDuration)?q.proxiedDuration(r):q.proxiedDuration;
n=a.ui.accordion.animations;
var m=q.duration,c=q.animated;
if(c&&!n[c]&&!a.easing[c]){c="slide"
}n[c]||(n[c]=function(b){this.slide(b,{easing:c,duration:m||700})
});
n[c](r)
}else{if(q.collapsible&&n){u.toggle()
}else{s.hide();
u.show()
}l(true)
}s.prev().attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).blur();
u.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()
},_completed:function(b){this.running=b?0:--this.running;
if(!this.running){this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""});
this.toHide.removeClass("ui-accordion-content-active");
if(this.toHide.length){this.toHide.parent()[0].className=this.toHide.parent()[0].className
}this._trigger("change",null,this.data)
}}});
a.extend(a.ui.accordion,{version:"1.8.13",animations:{slide:function(i,c){i=a.extend({easing:"swing",duration:300},i,c);
if(i.toHide.size()){if(i.toShow.size()){var n=i.toShow.css("overflow"),j=0,l={},k={},m;
c=i.toShow;
m=c[0].style.width;
c.width(parseInt(c.parent().width(),10)-parseInt(c.css("paddingLeft"),10)-parseInt(c.css("paddingRight"),10)-(parseInt(c.css("borderLeftWidth"),10)||0)-(parseInt(c.css("borderRightWidth"),10)||0));
a.each(["height","paddingTop","paddingBottom"],function(b,d){k[d]="hide";
b=(""+a.css(i.toShow[0],d)).match(/^([\d+-.]+)(.*)$/);
l[d]={value:b[1],unit:b[2]||"px"}
});
i.toShow.css({height:0,overflow:"hidden"}).show();
i.toHide.filter(":hidden").each(i.complete).end().filter(":visible").animate(k,{step:function(b,d){if(d.prop=="height"){j=d.end-d.start===0?0:(d.now-d.start)/(d.end-d.start)
}i.toShow[0].style[d.prop]=j*l[d.prop].value+l[d.prop].unit
},duration:i.duration,easing:i.easing,complete:function(){i.autoHeight||i.toShow.css("height","");
i.toShow.css({width:m,overflow:n});
i.complete()
}})
}else{i.toHide.animate({height:"hide",paddingTop:"hide",paddingBottom:"hide"},i)
}}else{i.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},i)
}},bounceslide:function(b){this.slide(b,{easing:b.down?"easeOutBounce":"swing",duration:b.down?1000:200})
}}})
})(jQuery);
(function(b){var a=0;
b.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:false,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var d=this,c=this.element[0].ownerDocument,e;
this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(h){if(!(d.options.disabled||d.element.attr("readonly"))){e=false;
var g=b.ui.keyCode;
switch(h.keyCode){case g.PAGE_UP:d._move("previousPage",h);
break;
case g.PAGE_DOWN:d._move("nextPage",h);
break;
case g.UP:d._move("previous",h);
h.preventDefault();
break;
case g.DOWN:d._move("next",h);
h.preventDefault();
break;
case g.ENTER:case g.NUMPAD_ENTER:if(d.menu.active){e=true;
h.preventDefault()
}case g.TAB:if(!d.menu.active){return
}d.menu.select(h);
break;
case g.ESCAPE:d.element.val(d.term);
d.close(h);
break;
default:clearTimeout(d.searching);
d.searching=setTimeout(function(){if(d.term!=d.element.val()){d.selectedItem=null;
d.search(null,h)
}},d.options.delay);
break
}}}).bind("keypress.autocomplete",function(f){if(e){e=false;
f.preventDefault()
}}).bind("focus.autocomplete",function(){if(!d.options.disabled){d.selectedItem=null;
d.previous=d.element.val()
}}).bind("blur.autocomplete",function(f){if(!d.options.disabled){clearTimeout(d.searching);
d.closing=setTimeout(function(){d.close(f);
d._change(f)
},150)
}});
this._initSource();
this.response=function(){return d._response.apply(d,arguments)
};
this.menu=b("<ul></ul>").addClass("ui-autocomplete").appendTo(b(this.options.appendTo||"body",c)[0]).mousedown(function(h){var g=d.menu.element[0];
b(h.target).closest(".ui-menu-item").length||setTimeout(function(){b(document).one("mousedown",function(f){f.target!==d.element[0]&&f.target!==g&&!b.ui.contains(g,f.target)&&d.close()
})
},1);
setTimeout(function(){clearTimeout(d.closing)
},13)
}).menu({focus:function(h,g){g=g.item.data("item.autocomplete");
false!==d._trigger("focus",h,{item:g})&&/^key/.test(h.originalEvent.type)&&d.element.val(g.value)
},selected:function(l,k){var j=k.item.data("item.autocomplete"),g=d.previous;
if(d.element[0]!==c.activeElement){d.element.focus();
d.previous=g;
setTimeout(function(){d.previous=g;
d.selectedItem=j
},1)
}false!==d._trigger("select",l,{item:j})&&d.element.val(j.value);
d.term=d.element.val();
d.close(l);
d.selectedItem=j
},blur:function(){d.menu.element.is(":visible")&&d.element.val()!==d.term&&d.element.val(d.term)
}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu");
b.fn.bgiframe&&this.menu.element.bgiframe()
},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
this.menu.element.remove();
b.Widget.prototype.destroy.call(this)
},_setOption:function(d,c){b.Widget.prototype._setOption.apply(this,arguments);
d==="source"&&this._initSource();
if(d==="appendTo"){this.menu.element.appendTo(b(c||"body",this.element[0].ownerDocument)[0])
}d==="disabled"&&c&&this.xhr&&this.xhr.abort()
},_initSource:function(){var d=this,c,e;
if(b.isArray(this.options.source)){c=this.options.source;
this.source=function(h,g){g(b.ui.autocomplete.filter(c,h.term))
}
}else{if(typeof this.options.source==="string"){e=this.options.source;
this.source=function(h,g){d.xhr&&d.xhr.abort();
d.xhr=b.ajax({url:e,data:h,dataType:"json",autocompleteRequest:++a,success:function(f){this.autocompleteRequest===a&&g(f)
},error:function(){this.autocompleteRequest===a&&g([])
}})
}
}else{this.source=this.options.source
}}},search:function(d,c){d=d!=null?d:this.element.val();
this.term=this.element.val();
if(d.length<this.options.minLength){return this.close(c)
}clearTimeout(this.closing);
if(this._trigger("search",c)!==false){return this._search(d)
}},_search:function(c){this.pending++;
this.element.addClass("ui-autocomplete-loading");
this.source({term:c},this.response)
},_response:function(c){if(!this.options.disabled&&c&&c.length){c=this._normalize(c);
this._suggest(c);
this._trigger("open")
}else{this.close()
}this.pending--;
this.pending||this.element.removeClass("ui-autocomplete-loading")
},close:function(c){clearTimeout(this.closing);
if(this.menu.element.is(":visible")){this.menu.element.hide();
this.menu.deactivate();
this._trigger("close",c)
}},_change:function(c){this.previous!==this.element.val()&&this._trigger("change",c,{item:this.selectedItem})
},_normalize:function(c){if(c.length&&c[0].label&&c[0].value){return c
}return b.map(c,function(d){if(typeof d==="string"){return{label:d,value:d}
}return b.extend({label:d.label||d.value,value:d.value||d.label},d)
})
},_suggest:function(d){var c=this.menu.element.empty().zIndex(this.element.zIndex()+1);
this._renderMenu(c,d);
this.menu.deactivate();
this.menu.refresh();
c.show();
this._resizeMenu();
c.position(b.extend({of:this.element},this.options.position));
this.options.autoFocus&&this.menu.next(new b.Event("mouseover"))
},_resizeMenu:function(){var c=this.menu.element;
c.outerWidth(Math.max(c.width("").outerWidth(),this.element.outerWidth()))
},_renderMenu:function(d,c){var e=this;
b.each(c,function(h,g){e._renderItem(d,g)
})
},_renderItem:function(d,c){return b("<li></li>").data("item.autocomplete",c).append(b("<a></a>").text(c.label)).appendTo(d)
},_move:function(d,c){if(this.menu.element.is(":visible")){if(this.menu.first()&&/^previous/.test(d)||this.menu.last()&&/^next/.test(d)){this.element.val(this.term);
this.menu.deactivate()
}else{this.menu[d](c)
}}else{this.search(null,c)
}},widget:function(){return this.menu.element
}});
b.extend(b.ui.autocomplete,{escapeRegex:function(c){return c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")
},filter:function(d,c){var e=new RegExp(b.ui.autocomplete.escapeRegex(c),"i");
return b.grep(d,function(f){return e.test(f.label||f.value||f)
})
}})
})(jQuery);
(function(a){a.widget("ui.menu",{_create:function(){var b=this;
this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(c){if(a(c.target).closest(".ui-menu-item a").length){c.preventDefault();
b.select(c)
}});
this.refresh()
},refresh:function(){var b=this;
this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem").children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(c){b.activate(c,a(this).parent())
}).mouseleave(function(){b.deactivate()
})
},activate:function(i,f){this.deactivate();
if(this.hasScroll()){var d=f.offset().top-this.element.offset().top,h=this.element.scrollTop(),j=this.element.height();
if(d<0){this.element.scrollTop(h+d)
}else{d>=j&&this.element.scrollTop(h+d-j+f.height())
}}this.active=f.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end();
this._trigger("focus",i,{item:f})
},deactivate:function(){if(this.active){this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
this._trigger("blur");
this.active=null
}},next:function(b){this.move("next",".ui-menu-item:first",b)
},previous:function(b){this.move("prev",".ui-menu-item:last",b)
},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length
},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length
},move:function(f,d,c){if(this.active){f=this.active[f+"All"](".ui-menu-item").eq(0);
f.length?this.activate(c,f):this.activate(c,this.element.children(d))
}else{this.activate(c,this.element.children(d))
}},nextPage:function(h){if(this.hasScroll()){if(!this.active||this.last()){this.activate(h,this.element.children(".ui-menu-item:first"))
}else{var d=this.active.offset().top,c=this.element.height(),f=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-d-c+a(this).height();
return b<10&&b>-10
});
f.length||(f=this.element.children(".ui-menu-item:last"));
this.activate(h,f)
}}else{this.activate(h,this.element.children(".ui-menu-item").filter(!this.active||this.last()?":first":":last"))
}},previousPage:function(f){if(this.hasScroll()){if(!this.active||this.first()){this.activate(f,this.element.children(".ui-menu-item:last"))
}else{var d=this.active.offset().top,c=this.element.height();
result=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-d+c-a(this).height();
return b<10&&b>-10
});
result.length||(result=this.element.children(".ui-menu-item:first"));
this.activate(f,result)
}}else{this.activate(f,this.element.children(".ui-menu-item").filter(!this.active||this.first()?":last":":first"))
}},hasScroll:function(){return this.element.height()<this.element[a.fn.prop?"prop":"attr"]("scrollHeight")
},select:function(b){this._trigger("selected",b,{item:this.active})
}})
})(jQuery);
(function(b){var e,c=function(a){b(":ui-button",a.target.form).each(function(){var f=b(this).data("button");
setTimeout(function(){f.refresh()
},1)
})
},d=function(a){var i=a.name,h=a.form,g=b([]);
if(i){g=h?b(h).find("[name='"+i+"']"):b("[name='"+i+"']",a.ownerDocument).filter(function(){return !this.form
})
}return g
};
b.widget("ui.button",{options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",c);
if(typeof this.options.disabled!=="boolean"){this.options.disabled=this.element.attr("disabled")
}this._determineButtonType();
this.hasTitle=!!this.buttonElement.attr("title");
var a=this,i=this.options,h=this.type==="checkbox"||this.type==="radio",g="ui-state-hover"+(!h?" ui-state-active":"");
if(i.label===null){i.label=this.buttonElement.html()
}if(this.element.is(":disabled")){i.disabled=true
}this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role","button").bind("mouseenter.button",function(){if(!i.disabled){b(this).addClass("ui-state-hover");
this===e&&b(this).addClass("ui-state-active")
}}).bind("mouseleave.button",function(){i.disabled||b(this).removeClass(g)
}).bind("focus.button",function(){b(this).addClass("ui-state-focus")
}).bind("blur.button",function(){b(this).removeClass("ui-state-focus")
}).bind("click.button",function(f){i.disabled&&f.stopImmediatePropagation()
});
h&&this.element.bind("change.button",function(){a.refresh()
});
if(this.type==="checkbox"){this.buttonElement.bind("click.button",function(){if(i.disabled){return false
}b(this).toggleClass("ui-state-active");
a.buttonElement.attr("aria-pressed",a.element[0].checked)
})
}else{if(this.type==="radio"){this.buttonElement.bind("click.button",function(){if(i.disabled){return false
}b(this).addClass("ui-state-active");
a.buttonElement.attr("aria-pressed",true);
var f=a.element[0];
d(f).not(f).map(function(){return b(this).button("widget")[0]
}).removeClass("ui-state-active").attr("aria-pressed",false)
})
}else{this.buttonElement.bind("mousedown.button",function(){if(i.disabled){return false
}b(this).addClass("ui-state-active");
e=this;
b(document).one("mouseup",function(){e=null
})
}).bind("mouseup.button",function(){if(i.disabled){return false
}b(this).removeClass("ui-state-active")
}).bind("keydown.button",function(f){if(i.disabled){return false
}if(f.keyCode==b.ui.keyCode.SPACE||f.keyCode==b.ui.keyCode.ENTER){b(this).addClass("ui-state-active")
}}).bind("keyup.button",function(){b(this).removeClass("ui-state-active")
});
this.buttonElement.is("a")&&this.buttonElement.keyup(function(f){f.keyCode===b.ui.keyCode.SPACE&&b(this).click()
})
}}this._setOption("disabled",i.disabled)
},_determineButtonType:function(){this.type=this.element.is(":checkbox")?"checkbox":this.element.is(":radio")?"radio":this.element.is("input")?"input":"button";
if(this.type==="checkbox"||this.type==="radio"){var a=this.element.parents().filter(":last"),f="label[for="+this.element.attr("id")+"]";
this.buttonElement=a.find(f);
if(!this.buttonElement.length){a=a.length?a.siblings():this.element.siblings();
this.buttonElement=a.filter(f);
if(!this.buttonElement.length){this.buttonElement=a.find(f)
}}this.element.addClass("ui-helper-hidden-accessible");
(a=this.element.is(":checked"))&&this.buttonElement.addClass("ui-state-active");
this.buttonElement.attr("aria-pressed",a)
}else{this.buttonElement=this.element
}},widget:function(){return this.buttonElement
},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");
this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
this.hasTitle||this.buttonElement.removeAttr("title");
b.Widget.prototype.destroy.call(this)
},_setOption:function(a,f){b.Widget.prototype._setOption.apply(this,arguments);
if(a==="disabled"){f?this.element.attr("disabled",true):this.element.removeAttr("disabled")
}this._resetButton()
},refresh:function(){var a=this.element.is(":disabled");
a!==this.options.disabled&&this._setOption("disabled",a);
if(this.type==="radio"){d(this.element[0]).each(function(){b(this).is(":checked")?b(this).button("widget").addClass("ui-state-active").attr("aria-pressed",true):b(this).button("widget").removeClass("ui-state-active").attr("aria-pressed",false)
})
}else{if(this.type==="checkbox"){this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed",true):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed",false)
}}},_resetButton:function(){if(this.type==="input"){this.options.label&&this.element.val(this.options.label)
}else{var a=this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),j=b("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(a.empty()).text(),i=this.options.icons,g=i.primary&&i.secondary,h=[];
if(i.primary||i.secondary){if(this.options.text){h.push("ui-button-text-icon"+(g?"s":i.primary?"-primary":"-secondary"))
}i.primary&&a.prepend("<span class='ui-button-icon-primary ui-icon "+i.primary+"'></span>");
i.secondary&&a.append("<span class='ui-button-icon-secondary ui-icon "+i.secondary+"'></span>");
if(!this.options.text){h.push(g?"ui-button-icons-only":"ui-button-icon-only");
this.hasTitle||a.attr("title",j)
}}else{h.push("ui-button-text-only")
}a.addClass(h.join(" "))
}}});
b.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")
},_init:function(){this.refresh()
},_setOption:function(a,f){a==="disabled"&&this.buttons.button("option",a,f);
b.Widget.prototype._setOption.apply(this,arguments)
},refresh:function(){this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return b(this).button("widget")[0]
}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()
},destroy:function(){this.element.removeClass("ui-buttonset");
this.buttons.map(function(){return b(this).button("widget")[0]
}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
b.Widget.prototype.destroy.call(this)
}})
})(jQuery);
(function(f,b){var a={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},e={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true},d=f.attrFn||{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true,click:true};
f.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",collision:"fit",using:function(g){var c=f(this).css(g).offset().top;
c<0&&f(this).css("top",g.top-c)
}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000},_create:function(){this.originalTitle=this.element.attr("title");
if(typeof this.originalTitle!=="string"){this.originalTitle=""
}this.options.title=this.options.title||this.originalTitle;
var i=this,c=i.options,n=c.title||"&#160;",m=f.ui.dialog.getTitleId(i.element),k=(i.uiDialog=f("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+c.dialogClass).css({zIndex:c.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(g){if(c.closeOnEscape&&g.keyCode&&g.keyCode===f.ui.keyCode.ESCAPE){i.close(g);
g.preventDefault()
}}).attr({role:"dialog","aria-labelledby":m}).mousedown(function(g){i.moveToTop(false,g)
});
i.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(k);
var l=(i.uiDialogTitlebar=f("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(k),j=f('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){j.addClass("ui-state-hover")
},function(){j.removeClass("ui-state-hover")
}).focus(function(){j.addClass("ui-state-focus")
}).blur(function(){j.removeClass("ui-state-focus")
}).click(function(g){i.close(g);
return false
}).appendTo(l);
(i.uiDialogTitlebarCloseText=f("<span></span>")).addClass("ui-icon ui-icon-closethick").text(c.closeText).appendTo(j);
f("<span></span>").addClass("ui-dialog-title").attr("id",m).html(n).prependTo(l);
if(f.isFunction(c.beforeclose)&&!f.isFunction(c.beforeClose)){c.beforeClose=c.beforeclose
}l.find("*").add(l).disableSelection();
c.draggable&&f.fn.draggable&&i._makeDraggable();
c.resizable&&f.fn.resizable&&i._makeResizable();
i._createButtons(c.buttons);
i._isOpen=false;
f.fn.bgiframe&&k.bgiframe()
},_init:function(){this.options.autoOpen&&this.open()
},destroy:function(){var c=this;
c.overlay&&c.overlay.destroy();
c.uiDialog.hide();
c.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
c.uiDialog.remove();
c.originalTitle&&c.element.attr("title",c.originalTitle);
return c
},widget:function(){return this.uiDialog
},close:function(g){var c=this,i,h;
if(false!==c._trigger("beforeClose",g)){c.overlay&&c.overlay.destroy();
c.uiDialog.unbind("keypress.ui-dialog");
c._isOpen=false;
if(c.options.hide){c.uiDialog.hide(c.options.hide,function(){c._trigger("close",g)
})
}else{c.uiDialog.hide();
c._trigger("close",g)
}f.ui.dialog.overlay.resize();
if(c.options.modal){i=0;
f(".ui-dialog").each(function(){if(this!==c.uiDialog[0]){h=f(this).css("z-index");
isNaN(h)||(i=Math.max(i,h))
}});
f.ui.dialog.maxZ=i
}return c
}},isOpen:function(){return this._isOpen
},moveToTop:function(g,c){var i=this,h=i.options;
if(h.modal&&!g||!h.stack&&!h.modal){return i._trigger("focus",c)
}if(h.zIndex>f.ui.dialog.maxZ){f.ui.dialog.maxZ=h.zIndex
}if(i.overlay){f.ui.dialog.maxZ+=1;
i.overlay.$el.css("z-index",f.ui.dialog.overlay.maxZ=f.ui.dialog.maxZ)
}g={scrollTop:i.element.attr("scrollTop"),scrollLeft:i.element.attr("scrollLeft")};
f.ui.dialog.maxZ+=1;
i.uiDialog.css("z-index",f.ui.dialog.maxZ);
i.element.attr(g);
i._trigger("focus",c);
return i
},open:function(){if(!this._isOpen){var g=this,c=g.options,h=g.uiDialog;
g.overlay=c.modal?new f.ui.dialog.overlay(g):null;
g._size();
g._position(c.position);
h.show(c.show);
g.moveToTop(true);
c.modal&&h.bind("keypress.ui-dialog",function(k){if(k.keyCode===f.ui.keyCode.TAB){var i=f(":tabbable",this),j=i.filter(":first");
i=i.filter(":last");
if(k.target===i[0]&&!k.shiftKey){j.focus(1);
return false
}else{if(k.target===j[0]&&k.shiftKey){i.focus(1);
return false
}}}});
f(g.element.find(":tabbable").get().concat(h.find(".ui-dialog-buttonpane :tabbable").get().concat(h.get()))).eq(0).focus();
g._isOpen=true;
g._trigger("open");
return g
}},_createButtons:function(h){var c=this,k=false,j=f("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),i=f("<div></div>").addClass("ui-dialog-buttonset").appendTo(j);
c.uiDialog.find(".ui-dialog-buttonpane").remove();
typeof h==="object"&&h!==null&&f.each(h,function(){return !(k=true)
});
if(k){f.each(h,function(m,l){l=f.isFunction(l)?{click:l,text:m}:l;
var g=f('<button type="button"></button>').click(function(){l.click.apply(c.element[0],arguments)
}).appendTo(i);
f.each(l,function(o,n){if(o!=="click"){o in d?g[o](n):g.attr(o,n)
}});
f.fn.button&&g.button()
});
j.appendTo(c.uiDialog)
}},_makeDraggable:function(){function h(g){return{position:g.position,offset:g.offset}
}var c=this,k=c.options,j=f(document),i;
c.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(l,g){i=k.height==="auto"?"auto":f(this).height();
f(this).height(f(this).height()).addClass("ui-dialog-dragging");
c._trigger("dragStart",l,h(g))
},drag:function(l,g){c._trigger("drag",l,h(g))
},stop:function(l,g){k.position=[g.position.left-j.scrollLeft(),g.position.top-j.scrollTop()];
f(this).removeClass("ui-dialog-dragging").height(i);
c._trigger("dragStop",l,h(g));
f.ui.dialog.overlay.resize()
}})
},_makeResizable:function(h){function c(g){return{originalPosition:g.originalPosition,originalSize:g.originalSize,position:g.position,size:g.size}
}h=h===b?this.options.resizable:h;
var k=this,j=k.options,i=k.uiDialog.css("position");
h=typeof h==="string"?h:"n,e,s,w,se,sw,ne,nw";
k.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:k.element,maxWidth:j.maxWidth,maxHeight:j.maxHeight,minWidth:j.minWidth,minHeight:k._minHeight(),handles:h,start:function(l,g){f(this).addClass("ui-dialog-resizing");
k._trigger("resizeStart",l,c(g))
},resize:function(l,g){k._trigger("resize",l,c(g))
},stop:function(l,g){f(this).removeClass("ui-dialog-resizing");
j.height=f(this).height();
j.width=f(this).width();
k._trigger("resizeStop",l,c(g));
f.ui.dialog.overlay.resize()
}}).css("position",i).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
},_minHeight:function(){var c=this.options;
return c.height==="auto"?c.minHeight:Math.min(c.minHeight,c.height)
},_position:function(g){var c=[],i=[0,0],h;
if(g){if(typeof g==="string"||typeof g==="object"&&"0" in g){c=g.split?g.split(" "):[g[0],g[1]];
if(c.length===1){c[1]=c[0]
}f.each(["left","top"],function(j,k){if(+c[j]===c[j]){i[j]=c[j];
c[j]=k
}});
g={my:c.join(" "),at:c.join(" "),offset:i.join(" ")}
}g=f.extend({},f.ui.dialog.prototype.options.position,g)
}else{g=f.ui.dialog.prototype.options.position
}(h=this.uiDialog.is(":visible"))||this.uiDialog.show();
this.uiDialog.css({top:0,left:0}).position(f.extend({of:window},g));
h||this.uiDialog.hide()
},_setOptions:function(g){var c=this,i={},h=false;
f.each(g,function(j,k){c._setOption(j,k);
if(j in a){h=true
}if(j in e){i[j]=k
}});
h&&this._size();
this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",i)
},_setOption:function(h,c){var k=this,j=k.uiDialog;
switch(h){case"beforeclose":h="beforeClose";
break;
case"buttons":k._createButtons(c);
break;
case"closeText":k.uiDialogTitlebarCloseText.text(""+c);
break;
case"dialogClass":j.removeClass(k.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+c);
break;
case"disabled":c?j.addClass("ui-dialog-disabled"):j.removeClass("ui-dialog-disabled");
break;
case"draggable":var i=j.is(":data(draggable)");
i&&!c&&j.draggable("destroy");
!i&&c&&k._makeDraggable();
break;
case"position":k._position(c);
break;
case"resizable":(i=j.is(":data(resizable)"))&&!c&&j.resizable("destroy");
i&&typeof c==="string"&&j.resizable("option","handles",c);
!i&&c!==false&&k._makeResizable(c);
break;
case"title":f(".ui-dialog-title",k.uiDialogTitlebar).html(""+(c||"&#160;"));
break
}f.Widget.prototype._setOption.apply(k,arguments)
},_size:function(){var g=this.options,c,i,h=this.uiDialog.is(":visible");
this.element.show().css({width:"auto",minHeight:0,height:0});
if(g.minWidth>g.width){g.width=g.minWidth
}c=this.uiDialog.css({height:"auto",width:g.width}).height();
i=Math.max(0,g.minHeight-c);
if(g.height==="auto"){if(f.support.minHeight){this.element.css({minHeight:i,height:"auto"})
}else{this.uiDialog.show();
g=this.element.css("height","auto").height();
h||this.uiDialog.hide();
this.element.height(Math.max(g,i))
}}else{this.element.height(Math.max(g.height-c,0))
}this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())
}});
f.extend(f.ui.dialog,{version:"1.8.13",uuid:0,maxZ:0,getTitleId:function(c){c=c.attr("id");
if(!c){this.uuid+=1;
c=this.uuid
}return"ui-dialog-title-"+c
},overlay:function(c){this.$el=f.ui.dialog.overlay.create(c)
}});
f.extend(f.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:f.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(c){return c+".dialog-overlay"
}).join(" "),create:function(g){if(this.instances.length===0){setTimeout(function(){f.ui.dialog.overlay.instances.length&&f(document).bind(f.ui.dialog.overlay.events,function(h){if(f(h.target).zIndex()<f.ui.dialog.overlay.maxZ){return false
}})
},1);
f(document).bind("keydown.dialog-overlay",function(h){if(g.options.closeOnEscape&&h.keyCode&&h.keyCode===f.ui.keyCode.ESCAPE){g.close(h);
h.preventDefault()
}});
f(window).bind("resize.dialog-overlay",f.ui.dialog.overlay.resize)
}var c=(this.oldInstances.pop()||f("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});
f.fn.bgiframe&&c.bgiframe();
this.instances.push(c);
return c
},destroy:function(g){var c=f.inArray(g,this.instances);
c!=-1&&this.oldInstances.push(this.instances.splice(c,1)[0]);
this.instances.length===0&&f([document,window]).unbind(".dialog-overlay");
g.remove();
var h=0;
f.each(this.instances,function(){h=Math.max(h,this.css("z-index"))
});
this.maxZ=h
},height:function(){var g,c;
if(f.browser.msie&&f.browser.version<7){g=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
c=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);
return g<c?f(window).height()+"px":g+"px"
}else{return f(document).height()+"px"
}},width:function(){var g,c;
if(f.browser.msie&&f.browser.version<7){g=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);
c=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);
return g<c?f(window).width()+"px":g+"px"
}else{return f(document).width()+"px"
}},resize:function(){var c=f([]);
f.each(f.ui.dialog.overlay.instances,function(){c=c.add(this)
});
c.css({width:0,height:0}).css({width:f.ui.dialog.overlay.width(),height:f.ui.dialog.overlay.height()})
}});
f.extend(f.ui.dialog.overlay.prototype,{destroy:function(){f.ui.dialog.overlay.destroy(this.$el)
}})
})(jQuery);
(function(a){a.widget("ui.slider",a.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var d=this,g=this.options,l=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),i=g.values&&g.values.length||1,k=[];
this._mouseSliding=this._keySliding=false;
this._animateOff=true;
this._handleIndex=null;
this._detectOrientation();
this._mouseInit();
this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"+(g.disabled?" ui-slider-disabled ui-disabled":""));
this.range=a([]);
if(g.range){if(g.range===true){if(!g.values){g.values=[this._valueMin(),this._valueMin()]
}if(g.values.length&&g.values.length!==2){g.values=[g.values[0],g.values[0]]
}}this.range=a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(g.range==="min"||g.range==="max"?" ui-slider-range-"+g.range:""))
}for(var h=l.length;
h<i;
h+=1){k.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>")
}this.handles=l.add(a(k.join("")).appendTo(d.element));
this.handle=this.handles.eq(0);
this.handles.add(this.range).filter("a").click(function(b){b.preventDefault()
}).hover(function(){g.disabled||a(this).addClass("ui-state-hover")
},function(){a(this).removeClass("ui-state-hover")
}).focus(function(){if(g.disabled){a(this).blur()
}else{a(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
a(this).addClass("ui-state-focus")
}}).blur(function(){a(this).removeClass("ui-state-focus")
});
this.handles.each(function(b){a(this).data("index.ui-slider-handle",b)
});
this.handles.keydown(function(n){var e=true,c=a(this).data("index.ui-slider-handle"),f,j,b;
if(!d.options.disabled){switch(n.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.PAGE_UP:case a.ui.keyCode.PAGE_DOWN:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:e=false;
if(!d._keySliding){d._keySliding=true;
a(this).addClass("ui-state-active");
f=d._start(n,c);
if(f===false){return
}}break
}b=d.options.step;
f=d.options.values&&d.options.values.length?(j=d.values(c)):(j=d.value());
switch(n.keyCode){case a.ui.keyCode.HOME:j=d._valueMin();
break;
case a.ui.keyCode.END:j=d._valueMax();
break;
case a.ui.keyCode.PAGE_UP:j=d._trimAlignValue(f+(d._valueMax()-d._valueMin())/5);
break;
case a.ui.keyCode.PAGE_DOWN:j=d._trimAlignValue(f-(d._valueMax()-d._valueMin())/5);
break;
case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(f===d._valueMax()){return
}j=d._trimAlignValue(f+b);
break;
case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(f===d._valueMin()){return
}j=d._trimAlignValue(f-b);
break
}d._slide(n,c,j);
return e
}}).keyup(function(c){var b=a(this).data("index.ui-slider-handle");
if(d._keySliding){d._keySliding=false;
d._stop(c,b);
d._change(c,b);
a(this).removeClass("ui-state-active")
}});
this._refreshValue();
this._animateOff=false
},destroy:function(){this.handles.remove();
this.range.remove();
this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
this._mouseDestroy();
return this
},_mouseCapture:function(d){var h=this.options,n,l,m,i,k;
if(h.disabled){return false
}this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};
this.elementOffset=this.element.offset();
n=this._normValueFromMouse({x:d.pageX,y:d.pageY});
l=this._valueMax()-this._valueMin()+1;
i=this;
this.handles.each(function(c){var b=Math.abs(n-i.values(c));
if(l>b){l=b;
m=a(this);
k=c
}});
if(h.range===true&&this.values(1)===h.min){k+=1;
m=a(this.handles[k])
}if(this._start(d,k)===false){return false
}this._mouseSliding=true;
i._handleIndex=k;
m.addClass("ui-state-active").focus();
h=m.offset();
this._clickOffset=!a(d.target).parents().andSelf().is(".ui-slider-handle")?{left:0,top:0}:{left:d.pageX-h.left-m.width()/2,top:d.pageY-h.top-m.height()/2-(parseInt(m.css("borderTopWidth"),10)||0)-(parseInt(m.css("borderBottomWidth"),10)||0)+(parseInt(m.css("marginTop"),10)||0)};
this.handles.hasClass("ui-state-hover")||this._slide(d,k,n);
return this._animateOff=true
},_mouseStart:function(){return true
},_mouseDrag:function(c){var d=this._normValueFromMouse({x:c.pageX,y:c.pageY});
this._slide(c,this._handleIndex,d);
return false
},_mouseStop:function(c){this.handles.removeClass("ui-state-active");
this._mouseSliding=false;
this._stop(c,this._handleIndex);
this._change(c,this._handleIndex);
this._clickOffset=this._handleIndex=null;
return this._animateOff=false
},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"
},_normValueFromMouse:function(c){var d;
if(this.orientation==="horizontal"){d=this.elementSize.width;
c=c.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)
}else{d=this.elementSize.height;
c=c.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)
}d=c/d;
if(d>1){d=1
}if(d<0){d=0
}if(this.orientation==="vertical"){d=1-d
}c=this._valueMax()-this._valueMin();
return this._trimAlignValue(this._valueMin()+d*c)
},_start:function(d,e){var f={handle:this.handles[e],value:this.value()};
if(this.options.values&&this.options.values.length){f.value=this.values(e);
f.values=this.values()
}return this._trigger("start",d,f)
},_slide:function(d,e,h){var g;
if(this.options.values&&this.options.values.length){g=this.values(e?0:1);
if(this.options.values.length===2&&this.options.range===true&&(e===0&&h>g||e===1&&h<g)){h=g
}if(h!==this.values(e)){g=this.values();
g[e]=h;
d=this._trigger("slide",d,{handle:this.handles[e],value:h,values:g});
this.values(e?0:1);
d!==false&&this.values(e,h,true)
}}else{if(h!==this.value()){d=this._trigger("slide",d,{handle:this.handles[e],value:h});
d!==false&&this.value(h)
}}},_stop:function(d,e){var f={handle:this.handles[e],value:this.value()};
if(this.options.values&&this.options.values.length){f.value=this.values(e);
f.values=this.values()
}this._trigger("stop",d,f)
},_change:function(d,e){if(!this._keySliding&&!this._mouseSliding){var f={handle:this.handles[e],value:this.value()};
if(this.options.values&&this.options.values.length){f.value=this.values(e);
f.values=this.values()
}this._trigger("change",d,f)
}},value:function(c){if(arguments.length){this.options.value=this._trimAlignValue(c);
this._refreshValue();
this._change(null,0)
}else{return this._value()
}},values:function(d,g){var j,h,i;
if(arguments.length>1){this.options.values[d]=this._trimAlignValue(g);
this._refreshValue();
this._change(null,d)
}else{if(arguments.length){if(a.isArray(arguments[0])){j=this.options.values;
h=arguments[0];
for(i=0;
i<j.length;
i+=1){j[i]=this._trimAlignValue(h[i]);
this._change(null,i)
}this._refreshValue()
}else{return this.options.values&&this.options.values.length?this._values(d):this.value()
}}else{return this._values()
}}},_setOption:function(d,e){var h,g=0;
if(a.isArray(this.options.values)){g=this.options.values.length
}a.Widget.prototype._setOption.apply(this,arguments);
switch(d){case"disabled":if(e){this.handles.filter(".ui-state-focus").blur();
this.handles.removeClass("ui-state-hover");
this.handles.attr("disabled","disabled");
this.element.addClass("ui-disabled")
}else{this.handles.removeAttr("disabled");
this.element.removeClass("ui-disabled")
}break;
case"orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);
this._refreshValue();
break;
case"value":this._animateOff=true;
this._refreshValue();
this._change(null,0);
this._animateOff=false;
break;
case"values":this._animateOff=true;
this._refreshValue();
for(h=0;
h<g;
h+=1){this._change(null,h)
}this._animateOff=false;
break
}},_value:function(){var c=this.options.value;
return c=this._trimAlignValue(c)
},_values:function(d){var e,f;
if(arguments.length){e=this.options.values[d];
return e=this._trimAlignValue(e)
}else{e=this.options.values.slice();
for(f=0;
f<e.length;
f+=1){e[f]=this._trimAlignValue(e[f])
}return e
}},_trimAlignValue:function(d){if(d<=this._valueMin()){return this._valueMin()
}if(d>=this._valueMax()){return this._valueMax()
}var e=this.options.step>0?this.options.step:1,f=(d-this._valueMin())%e;
alignValue=d-f;
if(Math.abs(f)*2>=e){alignValue+=f>0?e:-e
}return parseFloat(alignValue.toFixed(5))
},_valueMin:function(){return this.options.min
},_valueMax:function(){return this.options.max
},_refreshValue:function(){var s=this.options.range,u=this.options,r=this,p=!this._animateOff?u.animate:false,q,m={},o,h,d,n;
if(this.options.values&&this.options.values.length){this.handles.each(function(b){q=(r.values(b)-r._valueMin())/(r._valueMax()-r._valueMin())*100;
m[r.orientation==="horizontal"?"left":"bottom"]=q+"%";
a(this).stop(1,1)[p?"animate":"css"](m,u.animate);
if(r.options.range===true){if(r.orientation==="horizontal"){if(b===0){r.range.stop(1,1)[p?"animate":"css"]({left:q+"%"},u.animate)
}if(b===1){r.range[p?"animate":"css"]({width:q-o+"%"},{queue:false,duration:u.animate})
}}else{if(b===0){r.range.stop(1,1)[p?"animate":"css"]({bottom:q+"%"},u.animate)
}if(b===1){r.range[p?"animate":"css"]({height:q-o+"%"},{queue:false,duration:u.animate})
}}}o=q
})
}else{h=this.value();
d=this._valueMin();
n=this._valueMax();
q=n!==d?(h-d)/(n-d)*100:0;
m[r.orientation==="horizontal"?"left":"bottom"]=q+"%";
this.handle.stop(1,1)[p?"animate":"css"](m,u.animate);
if(s==="min"&&this.orientation==="horizontal"){this.range.stop(1,1)[p?"animate":"css"]({width:q+"%"},u.animate)
}if(s==="max"&&this.orientation==="horizontal"){this.range[p?"animate":"css"]({width:100-q+"%"},{queue:false,duration:u.animate})
}if(s==="min"&&this.orientation==="vertical"){this.range.stop(1,1)[p?"animate":"css"]({height:q+"%"},u.animate)
}if(s==="max"&&this.orientation==="vertical"){this.range[p?"animate":"css"]({height:100-q+"%"},{queue:false,duration:u.animate})
}}}});
a.extend(a.ui.slider,{version:"1.8.13"})
})(jQuery);
(function(g,f){function e(){return ++c
}function b(){return ++a
}var c=0,a=0;
g.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(true)
},_setOption:function(d,h){if(d=="selected"){this.options.collapsible&&h==this.options.selected||this.select(h)
}else{this.options[d]=h;
this._tabify()
}},_tabId:function(d){return d.title&&d.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+e()
},_sanitizeSelector:function(d){return d.replace(/:/g,"\\:")
},_cookie:function(){var d=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+b());
return g.cookie.apply(null,[d].concat(g.makeArray(arguments)))
},_ui:function(d,h){return{tab:d,panel:h,index:this.anchors.index(d)}
},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var d=g(this);
d.html(d.data("label.tabs")).removeData("label.tabs")
})
},_tabify:function(y){function w(h,j){h.css("display","");
!g.support.opacity&&j.opacity&&h[0].style.removeAttribute("filter")
}var z=this,x=this.options,v=/^#.+/;
this.list=this.element.find("ol,ul").eq(0);
this.lis=g(" > li:has(a[href])",this.list);
this.anchors=this.lis.map(function(){return g("a",this)[0]
});
this.panels=g([]);
this.anchors.each(function(k,n){var j=g(n).attr("href"),h=j.split("#")[0],m;
if(h&&(h===location.toString().split("#")[0]||(m=g("base")[0])&&h===m.href)){j=n.hash;
n.href=j
}if(v.test(j)){z.panels=z.panels.add(z.element.find(z._sanitizeSelector(j)))
}else{if(j&&j!=="#"){g.data(n,"href.tabs",j);
g.data(n,"load.tabs",j.replace(/#.*$/,""));
j=z._tabId(n);
n.href="#"+j;
n=z.element.find("#"+j);
if(!n.length){n=g(x.panelTemplate).attr("id",j).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(z.panels[k-1]||z.list);
n.data("destroy.tabs",true)
}z.panels=z.panels.add(n)
}else{x.disabled.push(k)
}}});
if(y){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.lis.addClass("ui-state-default ui-corner-top");
this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
if(x.selected===f){location.hash&&this.anchors.each(function(h,j){if(j.hash==location.hash){x.selected=h;
return false
}});
if(typeof x.selected!=="number"&&x.cookie){x.selected=parseInt(z._cookie(),10)
}if(typeof x.selected!=="number"&&this.lis.filter(".ui-tabs-selected").length){x.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))
}x.selected=x.selected||(this.lis.length?0:-1)
}else{if(x.selected===null){x.selected=-1
}}x.selected=x.selected>=0&&this.anchors[x.selected]||x.selected<0?x.selected:0;
x.disabled=g.unique(x.disabled.concat(g.map(this.lis.filter(".ui-state-disabled"),function(h){return z.lis.index(h)
}))).sort();
g.inArray(x.selected,x.disabled)!=-1&&x.disabled.splice(g.inArray(x.selected,x.disabled),1);
this.panels.addClass("ui-tabs-hide");
this.lis.removeClass("ui-tabs-selected ui-state-active");
if(x.selected>=0&&this.anchors.length){z.element.find(z._sanitizeSelector(z.anchors[x.selected].hash)).removeClass("ui-tabs-hide");
this.lis.eq(x.selected).addClass("ui-tabs-selected ui-state-active");
z.element.queue("tabs",function(){z._trigger("show",null,z._ui(z.anchors[x.selected],z.element.find(z._sanitizeSelector(z.anchors[x.selected].hash))[0]))
});
this.load(x.selected)
}g(window).bind("unload",function(){z.lis.add(z.anchors).unbind(".tabs");
z.lis=z.anchors=z.panels=null
})
}else{x.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))
}this.element[x.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");
x.cookie&&this._cookie(x.selected,x.cookie);
y=0;
for(var u;
u=this.lis[y];
y++){g(u)[g.inArray(y,x.disabled)!=-1&&!g(u).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled")
}x.cache===false&&this.anchors.removeData("cache.tabs");
this.lis.add(this.anchors).unbind(".tabs");
if(x.event!=="mouseover"){var q=function(h,j){j.is(":not(.ui-state-disabled)")&&j.addClass("ui-state-"+h)
},l=function(h,j){j.removeClass("ui-state-"+h)
};
this.lis.bind("mouseover.tabs",function(){q("hover",g(this))
});
this.lis.bind("mouseout.tabs",function(){l("hover",g(this))
});
this.anchors.bind("focus.tabs",function(){q("focus",g(this).closest("li"))
});
this.anchors.bind("blur.tabs",function(){l("focus",g(this).closest("li"))
})
}var p,i;
if(x.fx){if(g.isArray(x.fx)){p=x.fx[0];
i=x.fx[1]
}else{p=i=x.fx
}}var d=i?function(h,j){g(h).closest("li").addClass("ui-tabs-selected ui-state-active");
j.hide().removeClass("ui-tabs-hide").animate(i,i.duration||"normal",function(){w(j,i);
z._trigger("show",null,z._ui(h,j[0]))
})
}:function(h,j){g(h).closest("li").addClass("ui-tabs-selected ui-state-active");
j.removeClass("ui-tabs-hide");
z._trigger("show",null,z._ui(h,j[0]))
},A=p?function(h,j){j.animate(p,p.duration||"normal",function(){z.lis.removeClass("ui-tabs-selected ui-state-active");
j.addClass("ui-tabs-hide");
w(j,p);
z.element.dequeue("tabs")
})
}:function(h,j){z.lis.removeClass("ui-tabs-selected ui-state-active");
j.addClass("ui-tabs-hide");
z.element.dequeue("tabs")
};
this.anchors.bind(x.event+".tabs",function(){var k=this,m=g(k).closest("li"),j=z.panels.filter(":not(.ui-tabs-hide)"),h=z.element.find(z._sanitizeSelector(k.hash));
if(m.hasClass("ui-tabs-selected")&&!x.collapsible||m.hasClass("ui-state-disabled")||m.hasClass("ui-state-processing")||z.panels.filter(":animated").length||z._trigger("select",null,z._ui(this,h[0]))===false){this.blur();
return false
}x.selected=z.anchors.index(this);
z.abort();
if(x.collapsible){if(m.hasClass("ui-tabs-selected")){x.selected=-1;
x.cookie&&z._cookie(x.selected,x.cookie);
z.element.queue("tabs",function(){A(k,j)
}).dequeue("tabs");
this.blur();
return false
}else{if(!j.length){x.cookie&&z._cookie(x.selected,x.cookie);
z.element.queue("tabs",function(){d(k,h)
});
z.load(z.anchors.index(this));
this.blur();
return false
}}}x.cookie&&z._cookie(x.selected,x.cookie);
if(h.length){j.length&&z.element.queue("tabs",function(){A(k,j)
});
z.element.queue("tabs",function(){d(k,h)
});
z.load(z.anchors.index(this))
}else{throw"jQuery UI Tabs: Mismatching fragment identifier."
}g.browser.msie&&this.blur()
});
this.anchors.bind("click.tabs",function(){return false
})
},_getIndex:function(d){if(typeof d=="string"){d=this.anchors.index(this.anchors.filter("[href$="+d+"]"))
}return d
},destroy:function(){var d=this.options;
this.abort();
this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.anchors.each(function(){var i=g.data(this,"href.tabs");
if(i){this.href=i
}var h=g(this).unbind(".tabs");
g.each(["href","load","cache"],function(k,j){h.removeData(j+".tabs")
})
});
this.lis.unbind(".tabs").add(this.panels).each(function(){g.data(this,"destroy.tabs")?g(this).remove():g(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")
});
d.cookie&&this._cookie(null,d.cookie);
return this
},add:function(d,m,i){if(i===f){i=this.anchors.length
}var n=this,l=this.options;
m=g(l.tabTemplate.replace(/#\{href\}/g,d).replace(/#\{label\}/g,m));
d=!d.indexOf("#")?d.replace("#",""):this._tabId(g("a",m)[0]);
m.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);
var k=n.element.find("#"+d);
k.length||(k=g(l.panelTemplate).attr("id",d).data("destroy.tabs",true));
k.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
if(i>=this.lis.length){m.appendTo(this.list);
k.appendTo(this.list[0].parentNode)
}else{m.insertBefore(this.lis[i]);
k.insertBefore(this.panels[i])
}l.disabled=g.map(l.disabled,function(h){return h>=i?++h:h
});
this._tabify();
if(this.anchors.length==1){l.selected=0;
m.addClass("ui-tabs-selected ui-state-active");
k.removeClass("ui-tabs-hide");
this.element.queue("tabs",function(){n._trigger("show",null,n._ui(n.anchors[0],n.panels[0]))
});
this.load(0)
}this._trigger("add",null,this._ui(this.anchors[i],this.panels[i]));
return this
},remove:function(d){d=this._getIndex(d);
var i=this.options,h=this.lis.eq(d).remove(),j=this.panels.eq(d).remove();
if(h.hasClass("ui-tabs-selected")&&this.anchors.length>1){this.select(d+(d+1<this.anchors.length?1:-1))
}i.disabled=g.map(g.grep(i.disabled,function(k){return k!=d
}),function(k){return k>=d?--k:k
});
this._tabify();
this._trigger("remove",null,this._ui(h.find("a")[0],j[0]));
return this
},enable:function(d){d=this._getIndex(d);
var h=this.options;
if(g.inArray(d,h.disabled)!=-1){this.lis.eq(d).removeClass("ui-state-disabled");
h.disabled=g.grep(h.disabled,function(i){return i!=d
});
this._trigger("enable",null,this._ui(this.anchors[d],this.panels[d]));
return this
}},disable:function(d){d=this._getIndex(d);
var h=this.options;
if(d!=h.selected){this.lis.eq(d).addClass("ui-state-disabled");
h.disabled.push(d);
h.disabled.sort();
this._trigger("disable",null,this._ui(this.anchors[d],this.panels[d]))
}return this
},select:function(d){d=this._getIndex(d);
if(d==-1){if(this.options.collapsible&&this.options.selected!=-1){d=this.options.selected
}else{return this
}}this.anchors.eq(d).trigger(this.options.event+".tabs");
return this
},load:function(d){d=this._getIndex(d);
var m=this,i=this.options,n=this.anchors.eq(d)[0],l=g.data(n,"load.tabs");
this.abort();
if(!l||this.element.queue("tabs").length!==0&&g.data(n,"cache.tabs")){this.element.dequeue("tabs")
}else{this.lis.eq(d).addClass("ui-state-processing");
if(i.spinner){var k=g("span",n);
k.data("label.tabs",k.html()).html(i.spinner)
}this.xhr=g.ajax(g.extend({},i.ajaxOptions,{url:l,success:function(j,o){m.element.find(m._sanitizeSelector(n.hash)).html(j);
m._cleanup();
i.cache&&g.data(n,"cache.tabs",true);
m._trigger("load",null,m._ui(m.anchors[d],m.panels[d]));
try{i.ajaxOptions.success(j,o)
}catch(h){}},error:function(j,o){m._cleanup();
m._trigger("load",null,m._ui(m.anchors[d],m.panels[d]));
try{i.ajaxOptions.error(j,o,d,n)
}catch(h){}}}));
m.element.dequeue("tabs");
return this
}},abort:function(){this.element.queue([]);
this.panels.stop(false,true);
this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));
if(this.xhr){this.xhr.abort();
delete this.xhr
}this._cleanup();
return this
},url:function(d,h){this.anchors.eq(d).removeData("cache.tabs").data("load.tabs",h);
return this
},length:function(){return this.anchors.length
}});
g.extend(g.ui.tabs,{version:"1.8.13"});
g.extend(g.ui.tabs.prototype,{rotation:null,rotate:function(d,k){var i=this,l=this.options,j=i._rotate||(i._rotate=function(h){clearTimeout(i.rotation);
i.rotation=setTimeout(function(){var m=l.selected;
i.select(++m<i.anchors.length?m:0)
},d);
h&&h.stopPropagation()
});
k=i._unrotate||(i._unrotate=!k?function(h){h.clientX&&i.rotate(null)
}:function(){t=l.selected;
j()
});
if(d){this.element.bind("tabsshow",j);
this.anchors.bind(l.event+".tabs",k);
j()
}else{clearTimeout(i.rotation);
this.element.unbind("tabsshow",j);
this.anchors.unbind(l.event+".tabs",k);
delete this._rotate;
delete this._unrotate
}return this
}})
})(jQuery);
(function(d,B){function M(){this.debug=false;
this._curInst=null;
this._keyEvent=false;
this._disabledInputs=[];
this._inDialog=this._datepickerShowing=false;
this._mainDivId="ui-datepicker-div";
this._inlineClass="ui-datepicker-inline";
this._appendClass="ui-datepicker-append";
this._triggerClass="ui-datepicker-trigger";
this._dialogClass="ui-datepicker-dialog";
this._disableClass="ui-datepicker-disabled";
this._unselectableClass="ui-datepicker-unselectable";
this._currentClass="ui-datepicker-current-day";
this._dayOverClass="ui-datepicker-days-cell-over";
this.regional=[];
this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};
this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false};
d.extend(this._defaults,this.regional[""]);
this.dpDiv=N(d('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
}function N(a){return a.delegate("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a","mouseout",function(){d(this).removeClass("ui-state-hover");
this.className.indexOf("ui-datepicker-prev")!=-1&&d(this).removeClass("ui-datepicker-prev-hover");
this.className.indexOf("ui-datepicker-next")!=-1&&d(this).removeClass("ui-datepicker-next-hover")
}).delegate("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a","mouseover",function(){if(!d.datepicker._isDisabledDatepicker(J.inline?a.parent()[0]:J.input[0])){d(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
d(this).addClass("ui-state-hover");
this.className.indexOf("ui-datepicker-prev")!=-1&&d(this).addClass("ui-datepicker-prev-hover");
this.className.indexOf("ui-datepicker-next")!=-1&&d(this).addClass("ui-datepicker-next-hover")
}})
}function H(a,b){d.extend(a,b);
for(var c in b){if(b[c]==null||b[c]==B){a[c]=b[c]
}}return a
}d.extend(d.ui,{datepicker:{version:"1.8.13"}});
var z=(new Date).getTime(),J;
d.extend(M.prototype,{markerClassName:"hasDatepicker",log:function(){this.debug&&console.log.apply("",arguments)
},_widgetDatepicker:function(){return this.dpDiv
},setDefaults:function(a){H(this._defaults,a||{});
return this
},_attachDatepicker:function(a,b){var c=null;
for(var e in this._defaults){var f=a.getAttribute("date:"+e);
if(f){c=c||{};
try{c[e]=eval(f)
}catch(h){c[e]=f
}}}e=a.nodeName.toLowerCase();
f=e=="div"||e=="span";
if(!a.id){this.uuid+=1;
a.id="dp"+this.uuid
}var i=this._newInst(d(a),f);
i.settings=d.extend({},b||{},c||{});
if(e=="input"){this._connectDatepicker(a,i)
}else{f&&this._inlineDatepicker(a,i)
}},_newInst:function(a,b){return{id:a[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1"),input:a,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:b,dpDiv:!b?this.dpDiv:N(d('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}
},_connectDatepicker:function(a,b){var c=d(a);
b.append=d([]);
b.trigger=d([]);
if(!c.hasClass(this.markerClassName)){this._attachments(c,b);
c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(e,f,h){b.settings[f]=h
}).bind("getData.datepicker",function(e,f){return this._get(b,f)
});
this._autoSize(b);
d.data(a,"datepicker",b)
}},_attachments:function(a,b){var c=this._get(b,"appendText"),e=this._get(b,"isRTL");
b.append&&b.append.remove();
if(c){b.append=d('<span class="'+this._appendClass+'">'+c+"</span>");
a[e?"before":"after"](b.append)
}a.unbind("focus",this._showDatepicker);
b.trigger&&b.trigger.remove();
c=this._get(b,"showOn");
if(c=="focus"||c=="both"){a.focus(this._showDatepicker)
}if(c=="button"||c=="both"){c=this._get(b,"buttonText");
var f=this._get(b,"buttonImage");
b.trigger=d(this._get(b,"buttonImageOnly")?d("<img/>").addClass(this._triggerClass).attr({src:f,alt:c,title:c}):d('<button type="button"></button>').addClass(this._triggerClass).html(f==""?c:d("<img/>").attr({src:f,alt:c,title:c})));
a[e?"before":"after"](b.trigger);
b.trigger.click(function(){d.datepicker._datepickerShowing&&d.datepicker._lastInput==a[0]?d.datepicker._hideDatepicker():d.datepicker._showDatepicker(a[0]);
return false
})
}},_autoSize:function(a){if(this._get(a,"autoSize")&&!a.inline){var b=new Date(2009,11,20),c=this._get(a,"dateFormat");
if(c.match(/[DM]/)){var e=function(f){for(var h=0,i=0,g=0;
g<f.length;
g++){if(f[g].length>h){h=f[g].length;
i=g
}}return i
};
b.setMonth(e(this._get(a,c.match(/MM/)?"monthNames":"monthNamesShort")));
b.setDate(e(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay())
}a.input.attr("size",this._formatDate(a,b).length)
}},_inlineDatepicker:function(a,b){var c=d(a);
if(!c.hasClass(this.markerClassName)){c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",function(e,f,h){b.settings[f]=h
}).bind("getData.datepicker",function(e,f){return this._get(b,f)
});
d.data(a,"datepicker",b);
this._setDate(b,this._getDefaultDate(b),true);
this._updateDatepicker(b);
this._updateAlternate(b);
b.dpDiv.show()
}},_dialogDatepicker:function(a,b,c,e,f){a=this._dialogInst;
if(!a){this.uuid+=1;
this._dialogInput=d('<input type="text" id="'+("dp"+this.uuid)+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
this._dialogInput.keydown(this._doKeyDown);
d("body").append(this._dialogInput);
a=this._dialogInst=this._newInst(this._dialogInput,false);
a.settings={};
d.data(this._dialogInput[0],"datepicker",a)
}H(a.settings,e||{});
b=b&&b.constructor==Date?this._formatDate(a,b):b;
this._dialogInput.val(b);
this._pos=f?f.length?f:[f.pageX,f.pageY]:null;
if(!this._pos){this._pos=[document.documentElement.clientWidth/2-100+(document.documentElement.scrollLeft||document.body.scrollLeft),document.documentElement.clientHeight/2-150+(document.documentElement.scrollTop||document.body.scrollTop)]
}this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px");
a.settings.onSelect=c;
this._inDialog=true;
this.dpDiv.addClass(this._dialogClass);
this._showDatepicker(this._dialogInput[0]);
d.blockUI&&d.blockUI(this.dpDiv);
d.data(this._dialogInput[0],"datepicker",a);
return this
},_destroyDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");
if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();
d.removeData(a,"datepicker");
if(e=="input"){c.append.remove();
c.trigger.remove();
b.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)
}else{if(e=="div"||e=="span"){b.removeClass(this.markerClassName).empty()
}}}},_enableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");
if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();
if(e=="input"){a.disabled=false;
c.trigger.filter("button").each(function(){this.disabled=false
}).end().filter("img").css({opacity:"1.0",cursor:""})
}else{if(e=="div"||e=="span"){b=b.children("."+this._inlineClass);
b.children().removeClass("ui-state-disabled");
b.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
}}this._disabledInputs=d.map(this._disabledInputs,function(f){return f==a?null:f
})
}},_disableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");
if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();
if(e=="input"){a.disabled=true;
c.trigger.filter("button").each(function(){this.disabled=true
}).end().filter("img").css({opacity:"0.5",cursor:"default"})
}else{if(e=="div"||e=="span"){b=b.children("."+this._inlineClass);
b.children().addClass("ui-state-disabled");
b.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled")
}}this._disabledInputs=d.map(this._disabledInputs,function(f){return f==a?null:f
});
this._disabledInputs[this._disabledInputs.length]=a
}},_isDisabledDatepicker:function(a){if(!a){return false
}for(var b=0;
b<this._disabledInputs.length;
b++){if(this._disabledInputs[b]==a){return true
}}return false
},_getInst:function(a){try{return d.data(a,"datepicker")
}catch(b){throw"Missing instance data for this datepicker"
}},_optionDatepicker:function(a,b,c){var e=this._getInst(a);
if(arguments.length==2&&typeof b=="string"){return b=="defaults"?d.extend({},d.datepicker._defaults):e?b=="all"?d.extend({},e.settings):this._get(e,b):null
}var f=b||{};
if(typeof b=="string"){f={};
f[b]=c
}if(e){this._curInst==e&&this._hideDatepicker();
var h=this._getDateDatepicker(a,true),i=this._getMinMaxDate(e,"min"),g=this._getMinMaxDate(e,"max");
H(e.settings,f);
if(i!==null&&f.dateFormat!==B&&f.minDate===B){e.settings.minDate=this._formatDate(e,i)
}if(g!==null&&f.dateFormat!==B&&f.maxDate===B){e.settings.maxDate=this._formatDate(e,g)
}this._attachments(d(a),e);
this._autoSize(e);
this._setDate(e,h);
this._updateAlternate(e);
this._updateDatepicker(e)
}},_changeDatepicker:function(a,b,c){this._optionDatepicker(a,b,c)
},_refreshDatepicker:function(a){(a=this._getInst(a))&&this._updateDatepicker(a)
},_setDateDatepicker:function(a,b){if(a=this._getInst(a)){this._setDate(a,b);
this._updateDatepicker(a);
this._updateAlternate(a)
}},_getDateDatepicker:function(a,b){(a=this._getInst(a))&&!a.inline&&this._setDateFromField(a,b);
return a?this._getDate(a):null
},_doKeyDown:function(a){var b=d.datepicker._getInst(a.target),c=true,e=b.dpDiv.is(".ui-datepicker-rtl");
b._keyEvent=true;
if(d.datepicker._datepickerShowing){switch(a.keyCode){case 9:d.datepicker._hideDatepicker();
c=false;
break;
case 13:c=d("td."+d.datepicker._dayOverClass+":not(."+d.datepicker._currentClass+")",b.dpDiv);
c[0]?d.datepicker._selectDay(a.target,b.selectedMonth,b.selectedYear,c[0]):d.datepicker._hideDatepicker();
return false;
case 27:d.datepicker._hideDatepicker();
break;
case 33:d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");
break;
case 34:d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");
break;
case 35:if(a.ctrlKey||a.metaKey){d.datepicker._clearDate(a.target)
}c=a.ctrlKey||a.metaKey;
break;
case 36:if(a.ctrlKey||a.metaKey){d.datepicker._gotoToday(a.target)
}c=a.ctrlKey||a.metaKey;
break;
case 37:if(a.ctrlKey||a.metaKey){d.datepicker._adjustDate(a.target,e?+1:-1,"D")
}c=a.ctrlKey||a.metaKey;
if(a.originalEvent.altKey){d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M")
}break;
case 38:if(a.ctrlKey||a.metaKey){d.datepicker._adjustDate(a.target,-7,"D")
}c=a.ctrlKey||a.metaKey;
break;
case 39:if(a.ctrlKey||a.metaKey){d.datepicker._adjustDate(a.target,e?-1:+1,"D")
}c=a.ctrlKey||a.metaKey;
if(a.originalEvent.altKey){d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M")
}break;
case 40:if(a.ctrlKey||a.metaKey){d.datepicker._adjustDate(a.target,+7,"D")
}c=a.ctrlKey||a.metaKey;
break;
default:c=false
}}else{if(a.keyCode==36&&a.ctrlKey){d.datepicker._showDatepicker(this)
}else{c=false
}}if(c){a.preventDefault();
a.stopPropagation()
}},_doKeyPress:function(a){var b=d.datepicker._getInst(a.target);
if(d.datepicker._get(b,"constrainInput")){b=d.datepicker._possibleChars(d.datepicker._get(b,"dateFormat"));
var c=String.fromCharCode(a.charCode==B?a.keyCode:a.charCode);
return a.ctrlKey||a.metaKey||c<" "||!b||b.indexOf(c)>-1
}},_doKeyUp:function(a){a=d.datepicker._getInst(a.target);
if(a.input.val()!=a.lastVal){try{if(d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),a.input?a.input.val():null,d.datepicker._getFormatConfig(a))){d.datepicker._setDateFromField(a);
d.datepicker._updateAlternate(a);
d.datepicker._updateDatepicker(a)
}}catch(b){d.datepicker.log(b)
}}return true
},_showDatepicker:function(a){a=a.target||a;
if(a.nodeName.toLowerCase()!="input"){a=d("input",a.parentNode)[0]
}if(!(d.datepicker._isDisabledDatepicker(a)||d.datepicker._lastInput==a)){var b=d.datepicker._getInst(a);
d.datepicker._curInst&&d.datepicker._curInst!=b&&d.datepicker._curInst.dpDiv.stop(true,true);
var c=d.datepicker._get(b,"beforeShow");
H(b.settings,c?c.apply(a,[a,b]):{});
b.lastVal=null;
d.datepicker._lastInput=a;
d.datepicker._setDateFromField(b);
if(d.datepicker._inDialog){a.value=""
}if(!d.datepicker._pos){d.datepicker._pos=d.datepicker._findPos(a);
d.datepicker._pos[1]+=a.offsetHeight
}var e=false;
d(a).parents().each(function(){e|=d(this).css("position")=="fixed";
return !e
});
if(e&&d.browser.opera){d.datepicker._pos[0]-=document.documentElement.scrollLeft;
d.datepicker._pos[1]-=document.documentElement.scrollTop
}c={left:d.datepicker._pos[0],top:d.datepicker._pos[1]};
d.datepicker._pos=null;
b.dpDiv.empty();
b.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});
d.datepicker._updateDatepicker(b);
c=d.datepicker._checkOffset(b,c,e);
b.dpDiv.css({position:d.datepicker._inDialog&&d.blockUI?"static":e?"fixed":"absolute",display:"none",left:c.left+"px",top:c.top+"px"});
if(!b.inline){c=d.datepicker._get(b,"showAnim");
var f=d.datepicker._get(b,"duration"),h=function(){var i=b.dpDiv.find("iframe.ui-datepicker-cover");
if(i.length){var g=d.datepicker._getBorders(b.dpDiv);
i.css({left:-g[0],top:-g[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()})
}};
b.dpDiv.zIndex(d(a).zIndex()+1);
d.datepicker._datepickerShowing=true;
d.effects&&d.effects[c]?b.dpDiv.show(c,d.datepicker._get(b,"showOptions"),f,h):b.dpDiv[c||"show"](c?f:null,h);
if(!c||!f){h()
}b.input.is(":visible")&&!b.input.is(":disabled")&&b.input.focus();
d.datepicker._curInst=b
}}},_updateDatepicker:function(a){var b=d.datepicker._getBorders(a.dpDiv);
J=a;
a.dpDiv.empty().append(this._generateHTML(a));
var c=a.dpDiv.find("iframe.ui-datepicker-cover");
c.length&&c.css({left:-b[0],top:-b[1],width:a.dpDiv.outerWidth(),height:a.dpDiv.outerHeight()});
a.dpDiv.find("."+this._dayOverClass+" a").mouseover();
b=this._getNumberOfMonths(a);
c=b[1];
a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
c>1&&a.dpDiv.addClass("ui-datepicker-multi-"+c).css("width",17*c+"em");
a.dpDiv[(b[0]!=1||b[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");
a.dpDiv[(this._get(a,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");
a==d.datepicker._curInst&&d.datepicker._datepickerShowing&&a.input&&a.input.is(":visible")&&!a.input.is(":disabled")&&a.input[0]!=document.activeElement&&a.input.focus();
if(a.yearshtml){var e=a.yearshtml;
setTimeout(function(){e===a.yearshtml&&a.yearshtml&&a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml);
e=a.yearshtml=null
},0)
}},_getBorders:function(a){var b=function(c){return{thin:1,medium:2,thick:3}[c]||c
};
return[parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))]
},_checkOffset:function(a,b,c){var e=a.dpDiv.outerWidth(),f=a.dpDiv.outerHeight(),h=a.input?a.input.outerWidth():0,i=a.input?a.input.outerHeight():0,g=document.documentElement.clientWidth+d(document).scrollLeft(),j=document.documentElement.clientHeight+d(document).scrollTop();
b.left-=this._get(a,"isRTL")?e-h:0;
b.left-=c&&b.left==a.input.offset().left?d(document).scrollLeft():0;
b.top-=c&&b.top==a.input.offset().top+i?d(document).scrollTop():0;
b.left-=Math.min(b.left,b.left+e>g&&g>e?Math.abs(b.left+e-g):0);
b.top-=Math.min(b.top,b.top+f>j&&j>f?Math.abs(f+i):0);
return b
},_findPos:function(a){for(var b=this._get(this._getInst(a),"isRTL");
a&&(a.type=="hidden"||a.nodeType!=1||d.expr.filters.hidden(a));
){a=a[b?"previousSibling":"nextSibling"]
}a=d(a).offset();
return[a.left,a.top]
},_hideDatepicker:function(a){var b=this._curInst;
if(!(!b||a&&b!=d.data(a,"datepicker"))){if(this._datepickerShowing){a=this._get(b,"showAnim");
var c=this._get(b,"duration"),e=function(){d.datepicker._tidyDialog(b);
this._curInst=null
};
d.effects&&d.effects[a]?b.dpDiv.hide(a,d.datepicker._get(b,"showOptions"),c,e):b.dpDiv[a=="slideDown"?"slideUp":a=="fadeIn"?"fadeOut":"hide"](a?c:null,e);
a||e();
if(a=this._get(b,"onClose")){a.apply(b.input?b.input[0]:null,[b.input?b.input.val():"",b])
}this._datepickerShowing=false;
this._lastInput=null;
if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});
if(d.blockUI){d.unblockUI();
d("body").append(this.dpDiv)
}}this._inDialog=false
}}},_tidyDialog:function(a){a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
},_checkExternalClick:function(a){if(d.datepicker._curInst){a=d(a.target);
a[0].id!=d.datepicker._mainDivId&&a.parents("#"+d.datepicker._mainDivId).length==0&&!a.hasClass(d.datepicker.markerClassName)&&!a.hasClass(d.datepicker._triggerClass)&&d.datepicker._datepickerShowing&&!(d.datepicker._inDialog&&d.blockUI)&&d.datepicker._hideDatepicker()
}},_adjustDate:function(a,b,c){a=d(a);
var e=this._getInst(a[0]);
if(!this._isDisabledDatepicker(a[0])){this._adjustInstDate(e,b+(c=="M"?this._get(e,"showCurrentAtPos"):0),c);
this._updateDatepicker(e)
}},_gotoToday:function(a){a=d(a);
var b=this._getInst(a[0]);
if(this._get(b,"gotoCurrent")&&b.currentDay){b.selectedDay=b.currentDay;
b.drawMonth=b.selectedMonth=b.currentMonth;
b.drawYear=b.selectedYear=b.currentYear
}else{var c=new Date;
b.selectedDay=c.getDate();
b.drawMonth=b.selectedMonth=c.getMonth();
b.drawYear=b.selectedYear=c.getFullYear()
}this._notifyChange(b);
this._adjustDate(a)
},_selectMonthYear:function(a,b,c){a=d(a);
var e=this._getInst(a[0]);
e._selectingMonthYear=false;
e["selected"+(c=="M"?"Month":"Year")]=e["draw"+(c=="M"?"Month":"Year")]=parseInt(b.options[b.selectedIndex].value,10);
this._notifyChange(e);
this._adjustDate(a)
},_clickMonthYear:function(a){var b=this._getInst(d(a)[0]);
b.input&&b._selectingMonthYear&&setTimeout(function(){b.input.focus()
},0);
b._selectingMonthYear=!b._selectingMonthYear
},_selectDay:function(a,b,c,e){var f=d(a);
if(!(d(e).hasClass(this._unselectableClass)||this._isDisabledDatepicker(f[0]))){f=this._getInst(f[0]);
f.selectedDay=f.currentDay=d("a",e).html();
f.selectedMonth=f.currentMonth=b;
f.selectedYear=f.currentYear=c;
this._selectDate(a,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear))
}},_clearDate:function(a){a=d(a);
this._getInst(a[0]);
this._selectDate(a,"")
},_selectDate:function(a,b){a=this._getInst(d(a)[0]);
b=b!=null?b:this._formatDate(a);
a.input&&a.input.val(b);
this._updateAlternate(a);
var c=this._get(a,"onSelect");
if(c){c.apply(a.input?a.input[0]:null,[b,a])
}else{a.input&&a.input.trigger("change")
}if(a.inline){this._updateDatepicker(a)
}else{this._hideDatepicker();
this._lastInput=a.input[0];
typeof a.input[0]!="object"&&a.input.focus();
this._lastInput=null
}},_updateAlternate:function(a){var b=this._get(a,"altField");
if(b){var c=this._get(a,"altFormat")||this._get(a,"dateFormat"),e=this._getDate(a),f=this.formatDate(c,e,this._getFormatConfig(a));
d(b).each(function(){d(this).val(f)
})
}},noWeekends:function(a){a=a.getDay();
return[a>0&&a<6,""]
},iso8601Week:function(a){a=new Date(a.getTime());
a.setDate(a.getDate()+4-(a.getDay()||7));
var b=a.getTime();
a.setMonth(0);
a.setDate(1);
return Math.floor(Math.round((b-a)/86400000)/7)+1
},parseDate:function(a,b,c){if(a==null||b==null){throw"Invalid arguments"
}b=typeof b=="object"?b.toString():b+"";
if(b==""){return null
}var e=(c?c.shortYearCutoff:null)||this._defaults.shortYearCutoff;
e=typeof e!="string"?e:(new Date).getFullYear()%100+parseInt(e,10);
for(var f=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,h=(c?c.dayNames:null)||this._defaults.dayNames,i=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,g=(c?c.monthNames:null)||this._defaults.monthNames,j=c=-1,l=-1,u=-1,k=false,o=function(p){(p=A+1<a.length&&a.charAt(A+1)==p)&&A++;
return p
},m=function(p){var C=o(p);
p=new RegExp("^\\d{1,"+(p=="@"?14:p=="!"?20:p=="y"&&C?4:p=="o"?3:2)+"}");
p=b.substring(s).match(p);
if(!p){throw"Missing number at position "+s
}s+=p[0].length;
return parseInt(p[0],10)
},n=function(p,C,K){p=d.map(o(p)?K:C,function(w,x){return[[x,w]]
}).sort(function(w,x){return -(w[1].length-x[1].length)
});
var E=-1;
d.each(p,function(w,x){w=x[1];
if(b.substr(s,w.length).toLowerCase()==w.toLowerCase()){E=x[0];
s+=w.length;
return false
}});
if(E!=-1){return E+1
}else{throw"Unknown name at position "+s
}},r=function(){if(b.charAt(s)!=a.charAt(A)){throw"Unexpected literal at position "+s
}s++
},s=0,A=0;
A<a.length;
A++){if(k){if(a.charAt(A)=="'"&&!o("'")){k=false
}else{r()
}}else{switch(a.charAt(A)){case"d":l=m("d");
break;
case"D":n("D",f,h);
break;
case"o":u=m("o");
break;
case"m":j=m("m");
break;
case"M":j=n("M",i,g);
break;
case"y":c=m("y");
break;
case"@":var v=new Date(m("@"));
c=v.getFullYear();
j=v.getMonth()+1;
l=v.getDate();
break;
case"!":v=new Date((m("!")-this._ticksTo1970)/10000);
c=v.getFullYear();
j=v.getMonth()+1;
l=v.getDate();
break;
case"'":if(o("'")){r()
}else{k=true
}break;
default:r()
}}}if(c==-1){c=(new Date).getFullYear()
}else{if(c<100){c+=(new Date).getFullYear()-(new Date).getFullYear()%100+(c<=e?0:-100)
}}if(u>-1){j=1;
l=u;
do{e=this._getDaysInMonth(c,j-1);
if(l<=e){break
}j++;
l-=e
}while(1)
}v=this._daylightSavingAdjust(new Date(c,j-1,l));
if(v.getFullYear()!=c||v.getMonth()+1!=j||v.getDate()!=l){throw"Invalid date"
}return v
},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*10000000,formatDate:function(a,b,c){if(!b){return""
}var e=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,f=(c?c.dayNames:null)||this._defaults.dayNames,h=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort;
c=(c?c.monthNames:null)||this._defaults.monthNames;
var i=function(o){(o=k+1<a.length&&a.charAt(k+1)==o)&&k++;
return o
},g=function(o,m,n){m=""+m;
if(i(o)){for(;
m.length<n;
){m="0"+m
}}return m
},j=function(o,m,n,r){return i(o)?r[m]:n[m]
},l="",u=false;
if(b){for(var k=0;
k<a.length;
k++){if(u){if(a.charAt(k)=="'"&&!i("'")){u=false
}else{l+=a.charAt(k)
}}else{switch(a.charAt(k)){case"d":l+=g("d",b.getDate(),2);
break;
case"D":l+=j("D",b.getDay(),e,f);
break;
case"o":l+=g("o",(b.getTime()-(new Date(b.getFullYear(),0,0)).getTime())/86400000,3);
break;
case"m":l+=g("m",b.getMonth()+1,2);
break;
case"M":l+=j("M",b.getMonth(),h,c);
break;
case"y":l+=i("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;
break;
case"@":l+=b.getTime();
break;
case"!":l+=b.getTime()*10000+this._ticksTo1970;
break;
case"'":if(i("'")){l+="'"
}else{u=true
}break;
default:l+=a.charAt(k)
}}}}return l
},_possibleChars:function(a){for(var b="",c=false,e=function(h){(h=f+1<a.length&&a.charAt(f+1)==h)&&f++;
return h
},f=0;
f<a.length;
f++){if(c){if(a.charAt(f)=="'"&&!e("'")){c=false
}else{b+=a.charAt(f)
}}else{switch(a.charAt(f)){case"d":case"m":case"y":case"@":b+="0123456789";
break;
case"D":case"M":return null;
case"'":if(e("'")){b+="'"
}else{c=true
}break;
default:b+=a.charAt(f)
}}}return b
},_get:function(a,b){return a.settings[b]!==B?a.settings[b]:this._defaults[b]
},_setDateFromField:function(a,b){if(a.input.val()!=a.lastVal){var c=this._get(a,"dateFormat"),e=a.lastVal=a.input?a.input.val():null,f,h;
f=h=this._getDefaultDate(a);
var i=this._getFormatConfig(a);
try{f=this.parseDate(c,e,i)||h
}catch(g){this.log(g);
e=b?"":e
}a.selectedDay=f.getDate();
a.drawMonth=a.selectedMonth=f.getMonth();
a.drawYear=a.selectedYear=f.getFullYear();
a.currentDay=e?f.getDate():0;
a.currentMonth=e?f.getMonth():0;
a.currentYear=e?f.getFullYear():0;
this._adjustInstDate(a)
}},_getDefaultDate:function(a){return this._restrictMinMax(a,this._determineDate(a,this._get(a,"defaultDate"),new Date))
},_determineDate:function(a,b,c){var e=function(h){var i=new Date;
i.setDate(i.getDate()+h);
return i
},f=function(h){try{return d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),h,d.datepicker._getFormatConfig(a))
}catch(i){}var g=(h.toLowerCase().match(/^c/)?d.datepicker._getDate(a):null)||new Date,j=g.getFullYear(),l=g.getMonth();
g=g.getDate();
for(var u=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,k=u.exec(h);
k;
){switch(k[2]||"d"){case"d":case"D":g+=parseInt(k[1],10);
break;
case"w":case"W":g+=parseInt(k[1],10)*7;
break;
case"m":case"M":l+=parseInt(k[1],10);
g=Math.min(g,d.datepicker._getDaysInMonth(j,l));
break;
case"y":case"Y":j+=parseInt(k[1],10);
g=Math.min(g,d.datepicker._getDaysInMonth(j,l));
break
}k=u.exec(h)
}return new Date(j,l,g)
};
if(b=(b=b==null||b===""?c:typeof b=="string"?f(b):typeof b=="number"?isNaN(b)?c:e(b):new Date(b.getTime()))&&b.toString()=="Invalid Date"?c:b){b.setHours(0);
b.setMinutes(0);
b.setSeconds(0);
b.setMilliseconds(0)
}return this._daylightSavingAdjust(b)
},_daylightSavingAdjust:function(a){if(!a){return null
}a.setHours(a.getHours()>12?a.getHours()+2:0);
return a
},_setDate:function(a,b,c){var e=!b,f=a.selectedMonth,h=a.selectedYear;
b=this._restrictMinMax(a,this._determineDate(a,b,new Date));
a.selectedDay=a.currentDay=b.getDate();
a.drawMonth=a.selectedMonth=a.currentMonth=b.getMonth();
a.drawYear=a.selectedYear=a.currentYear=b.getFullYear();
if((f!=a.selectedMonth||h!=a.selectedYear)&&!c){this._notifyChange(a)
}this._adjustInstDate(a);
if(a.input){a.input.val(e?"":this._formatDate(a))
}},_getDate:function(a){return !a.currentYear||a.input&&a.input.val()==""?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay))
},_generateHTML:function(a){var b=new Date;
b=this._daylightSavingAdjust(new Date(b.getFullYear(),b.getMonth(),b.getDate()));
var c=this._get(a,"isRTL"),e=this._get(a,"showButtonPanel"),f=this._get(a,"hideIfNoPrevNext"),h=this._get(a,"navigationAsDateFormat"),i=this._getNumberOfMonths(a),g=this._get(a,"showCurrentAtPos"),j=this._get(a,"stepMonths"),l=i[0]!=1||i[1]!=1,u=this._daylightSavingAdjust(!a.currentDay?new Date(9999,9,9):new Date(a.currentYear,a.currentMonth,a.currentDay)),k=this._getMinMaxDate(a,"min"),o=this._getMinMaxDate(a,"max");
g=a.drawMonth-g;
var m=a.drawYear;
if(g<0){g+=12;
m--
}if(o){var n=this._daylightSavingAdjust(new Date(o.getFullYear(),o.getMonth()-i[0]*i[1]+1,o.getDate()));
for(n=k&&n<k?k:n;
this._daylightSavingAdjust(new Date(m,g,1))>n;
){g--;
if(g<0){g=11;
m--
}}}a.drawMonth=g;
a.drawYear=m;
n=this._get(a,"prevText");
n=!h?n:this.formatDate(n,this._daylightSavingAdjust(new Date(m,g-j,1)),this._getFormatConfig(a));
n=this._canAdjustMonth(a,-1,m,g)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+z+".datepicker._adjustDate('#"+a.id+"', -"+j+", 'M');\" title=\""+n+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+n+"</span></a>":f?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+n+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+n+"</span></a>";
var r=this._get(a,"nextText");
r=!h?r:this.formatDate(r,this._daylightSavingAdjust(new Date(m,g+j,1)),this._getFormatConfig(a));
f=this._canAdjustMonth(a,+1,m,g)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+z+".datepicker._adjustDate('#"+a.id+"', +"+j+", 'M');\" title=\""+r+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+r+"</span></a>":f?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+r+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+r+"</span></a>";
j=this._get(a,"currentText");
r=this._get(a,"gotoCurrent")&&a.currentDay?u:b;
j=!h?j:this.formatDate(j,r,this._getFormatConfig(a));
h=!a.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+z+'.datepicker._hideDatepicker();">'+this._get(a,"closeText")+"</button>":"";
e=e?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(c?h:"")+(this._isInRange(a,r)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+z+".datepicker._gotoToday('#"+a.id+"');\">"+j+"</button>":"")+(c?"":h)+"</div>":"";
h=parseInt(this._get(a,"firstDay"),10);
h=isNaN(h)?0:h;
j=this._get(a,"showWeek");
r=this._get(a,"dayNames");
this._get(a,"dayNamesShort");
var s=this._get(a,"dayNamesMin"),A=this._get(a,"monthNames"),v=this._get(a,"monthNamesShort"),p=this._get(a,"beforeShowDay"),C=this._get(a,"showOtherMonths"),K=this._get(a,"selectOtherMonths");
this._get(a,"calculateWeek");
for(var E=this._getDefaultDate(a),w="",x=0;
x<i[0];
x++){for(var O="",G=0;
G<i[1];
G++){var P=this._daylightSavingAdjust(new Date(m,g,a.selectedDay)),t=" ui-corner-all",y="";
if(l){y+='<div class="ui-datepicker-group';
if(i[1]>1){switch(G){case 0:y+=" ui-datepicker-group-first";
t=" ui-corner-"+(c?"right":"left");
break;
case i[1]-1:y+=" ui-datepicker-group-last";
t=" ui-corner-"+(c?"left":"right");
break;
default:y+=" ui-datepicker-group-middle";
t="";
break
}}y+='">'
}y+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+t+'">'+(/all|left/.test(t)&&x==0?c?f:n:"")+(/all|right/.test(t)&&x==0?c?n:f:"")+this._generateMonthYearHeader(a,g,m,k,o,x>0||G>0,A,v)+'</div><table class="ui-datepicker-calendar"><thead><tr>';
var D=j?'<th class="ui-datepicker-week-col">'+this._get(a,"weekHeader")+"</th>":"";
for(t=0;
t<7;
t++){var q=(t+h)%7;
D+="<th"+((t+h+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+r[q]+'">'+s[q]+"</span></th>"
}y+=D+"</tr></thead><tbody>";
D=this._getDaysInMonth(m,g);
if(m==a.selectedYear&&g==a.selectedMonth){a.selectedDay=Math.min(a.selectedDay,D)
}t=(this._getFirstDayOfMonth(m,g)-h+7)%7;
D=l?6:Math.ceil((t+D)/7);
q=this._daylightSavingAdjust(new Date(m,g,1-t));
for(var Q=0;
Q<D;
Q++){y+="<tr>";
var R=!j?"":'<td class="ui-datepicker-week-col">'+this._get(a,"calculateWeek")(q)+"</td>";
for(t=0;
t<7;
t++){var I=p?p.apply(a.input?a.input[0]:null,[q]):[true,""],F=q.getMonth()!=g,L=F&&!K||!I[0]||k&&q<k||o&&q>o;
R+='<td class="'+((t+h+6)%7>=5?" ui-datepicker-week-end":"")+(F?" ui-datepicker-other-month":"")+(q.getTime()==P.getTime()&&g==a.selectedMonth&&a._keyEvent||E.getTime()==q.getTime()&&E.getTime()==P.getTime()?" "+this._dayOverClass:"")+(L?" "+this._unselectableClass+" ui-state-disabled":"")+(F&&!C?"":" "+I[1]+(q.getTime()==u.getTime()?" "+this._currentClass:"")+(q.getTime()==b.getTime()?" ui-datepicker-today":""))+'"'+((!F||C)&&I[2]?' title="'+I[2]+'"':"")+(L?"":' onclick="DP_jQuery_'+z+".datepicker._selectDay('#"+a.id+"',"+q.getMonth()+","+q.getFullYear()+', this);return false;"')+">"+(F&&!C?"&#xa0;":L?'<span class="ui-state-default">'+q.getDate()+"</span>":'<a class="ui-state-default'+(q.getTime()==b.getTime()?" ui-state-highlight":"")+(q.getTime()==u.getTime()?" ui-state-active":"")+(F?" ui-priority-secondary":"")+'" href="#">'+q.getDate()+"</a>")+"</td>";
q.setDate(q.getDate()+1);
q=this._daylightSavingAdjust(q)
}y+=R+"</tr>"
}g++;
if(g>11){g=0;
m++
}y+="</tbody></table>"+(l?"</div>"+(i[0]>0&&G==i[1]-1?'<div class="ui-datepicker-row-break"></div>':""):"");
O+=y
}w+=O
}w+=e+(d.browser.msie&&parseInt(d.browser.version,10)<7&&!a.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");
a._keyEvent=false;
return w
},_generateMonthYearHeader:function(a,b,c,e,f,h,i,g){var j=this._get(a,"changeMonth"),l=this._get(a,"changeYear"),u=this._get(a,"showMonthAfterYear"),k='<div class="ui-datepicker-title">',o="";
if(h||!j){o+='<span class="ui-datepicker-month">'+i[b]+"</span>"
}else{i=e&&e.getFullYear()==c;
var m=f&&f.getFullYear()==c;
o+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+z+".datepicker._selectMonthYear('#"+a.id+"', this, 'M');\" onclick=\"DP_jQuery_"+z+".datepicker._clickMonthYear('#"+a.id+"');\">";
for(var n=0;
n<12;
n++){if((!i||n>=e.getMonth())&&(!m||n<=f.getMonth())){o+='<option value="'+n+'"'+(n==b?' selected="selected"':"")+">"+g[n]+"</option>"
}}o+="</select>"
}u||(k+=o+(h||!(j&&l)?"&#xa0;":""));
if(!a.yearshtml){a.yearshtml="";
if(h||!l){k+='<span class="ui-datepicker-year">'+c+"</span>"
}else{g=this._get(a,"yearRange").split(":");
var r=(new Date).getFullYear();
i=function(s){s=s.match(/c[+-].*/)?c+parseInt(s.substring(1),10):s.match(/[+-].*/)?r+parseInt(s,10):parseInt(s,10);
return isNaN(s)?r:s
};
b=i(g[0]);
g=Math.max(b,i(g[1]||""));
b=e?Math.max(b,e.getFullYear()):b;
g=f?Math.min(g,f.getFullYear()):g;
for(a.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+z+".datepicker._selectMonthYear('#"+a.id+"', this, 'Y');\" onclick=\"DP_jQuery_"+z+".datepicker._clickMonthYear('#"+a.id+"');\">";
b<=g;
b++){a.yearshtml+='<option value="'+b+'"'+(b==c?' selected="selected"':"")+">"+b+"</option>"
}a.yearshtml+="</select>";
k+=a.yearshtml;
a.yearshtml=null
}}k+=this._get(a,"yearSuffix");
if(u){k+=(h||!(j&&l)?"&#xa0;":"")+o
}k+="</div>";
return k
},_adjustInstDate:function(a,b,c){var e=a.drawYear+(c=="Y"?b:0),f=a.drawMonth+(c=="M"?b:0);
b=Math.min(a.selectedDay,this._getDaysInMonth(e,f))+(c=="D"?b:0);
e=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(e,f,b)));
a.selectedDay=e.getDate();
a.drawMonth=a.selectedMonth=e.getMonth();
a.drawYear=a.selectedYear=e.getFullYear();
if(c=="M"||c=="Y"){this._notifyChange(a)
}},_restrictMinMax:function(a,b){var c=this._getMinMaxDate(a,"min");
a=this._getMinMaxDate(a,"max");
b=c&&b<c?c:b;
return b=a&&b>a?a:b
},_notifyChange:function(a){var b=this._get(a,"onChangeMonthYear");
if(b){b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a])
}},_getNumberOfMonths:function(a){a=this._get(a,"numberOfMonths");
return a==null?[1,1]:typeof a=="number"?[1,a]:a
},_getMinMaxDate:function(a,b){return this._determineDate(a,this._get(a,b+"Date"),null)
},_getDaysInMonth:function(a,b){return 32-this._daylightSavingAdjust(new Date(a,b,32)).getDate()
},_getFirstDayOfMonth:function(a,b){return(new Date(a,b,1)).getDay()
},_canAdjustMonth:function(a,b,c,e){var f=this._getNumberOfMonths(a);
c=this._daylightSavingAdjust(new Date(c,e+(b<0?b:f[0]*f[1]),1));
b<0&&c.setDate(this._getDaysInMonth(c.getFullYear(),c.getMonth()));
return this._isInRange(a,c)
},_isInRange:function(a,b){var c=this._getMinMaxDate(a,"min");
a=this._getMinMaxDate(a,"max");
return(!c||b.getTime()>=c.getTime())&&(!a||b.getTime()<=a.getTime())
},_getFormatConfig:function(a){var b=this._get(a,"shortYearCutoff");
b=typeof b!="string"?b:(new Date).getFullYear()%100+parseInt(b,10);
return{shortYearCutoff:b,dayNamesShort:this._get(a,"dayNamesShort"),dayNames:this._get(a,"dayNames"),monthNamesShort:this._get(a,"monthNamesShort"),monthNames:this._get(a,"monthNames")}
},_formatDate:function(a,b,c,e){if(!b){a.currentDay=a.selectedDay;
a.currentMonth=a.selectedMonth;
a.currentYear=a.selectedYear
}b=b?typeof b=="object"?b:this._daylightSavingAdjust(new Date(e,c,b)):this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));
return this.formatDate(this._get(a,"dateFormat"),b,this._getFormatConfig(a))
}});
d.fn.datepicker=function(a){if(!this.length){return this
}if(!d.datepicker.initialized){d(document).mousedown(d.datepicker._checkExternalClick).find("body").append(d.datepicker.dpDiv);
d.datepicker.initialized=true
}var b=Array.prototype.slice.call(arguments,1);
if(typeof a=="string"&&(a=="isDisabled"||a=="getDate"||a=="widget")){return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this[0]].concat(b))
}if(a=="option"&&arguments.length==2&&typeof arguments[1]=="string"){return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this[0]].concat(b))
}return this.each(function(){typeof a=="string"?d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this].concat(b)):d.datepicker._attachDatepicker(this,a)
})
};
d.datepicker=new M;
d.datepicker.initialized=false;
d.datepicker.uuid=(new Date).getTime();
d.datepicker.version="1.8.13";
window["DP_jQuery_"+z]=d
})(jQuery);
(function(a,c){a.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()});
this.valueDiv=a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
this.oldValue=this._value();
this._refreshValue()
},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
this.valueDiv.remove();
a.Widget.prototype.destroy.apply(this,arguments)
},value:function(b){if(b===c){return this._value()
}this._setOption("value",b);
return this
},_setOption:function(b,d){if(b==="value"){this.options.value=d;
this._refreshValue();
this._value()===this.options.max&&this._trigger("complete")
}a.Widget.prototype._setOption.apply(this,arguments)
},_value:function(){var b=this.options.value;
if(typeof b!=="number"){b=0
}return Math.min(this.options.max,Math.max(this.min,b))
},_percentage:function(){return 100*this._value()/this.options.max
},_refreshValue:function(){var b=this.value(),d=this._percentage();
if(this.oldValue!==b){this.oldValue=b;
this._trigger("change")
}this.valueDiv.toggle(b>this.min).toggleClass("ui-corner-right",b===this.options.max).width(d.toFixed(0)+"%");
this.element.attr("aria-valuenow",b)
}});
a.extend(a.ui.progressbar,{version:"1.8.13"})
})(jQuery);
jQuery.effects||function(r,i){function e(j){var f;
if(j&&j.constructor==Array&&j.length==3){return j
}if(f=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(j)){return[parseInt(f[1],10),parseInt(f[2],10),parseInt(f[3],10)]
}if(f=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(j)){return[parseFloat(f[1])*2.55,parseFloat(f[2])*2.55,parseFloat(f[3])*2.55]
}if(f=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(j)){return[parseInt(f[1],16),parseInt(f[2],16),parseInt(f[3],16)]
}if(f=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(j)){return[parseInt(f[1]+f[1],16),parseInt(f[2]+f[2],16),parseInt(f[3]+f[3],16)]
}if(/rgba\(0, 0, 0, 0\)/.exec(j)){return d.transparent
}return d[r.trim(j).toLowerCase()]
}function x(k,j){var f;
do{f=r.curCSS(k,j);
if(f!=""&&f!="transparent"||r.nodeName(k,"body")){break
}j="backgroundColor"
}while(k=k.parentNode);
return e(f)
}function c(){var m=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,j={},f,l;
if(m&&m.length&&m[0]&&m[m[0]]){for(var k=m.length;
k--;
){f=m[k];
if(typeof m[f]=="string"){l=f.replace(/\-(\w)/g,function(o,n){return n.toUpperCase()
});
j[l]=m[f]
}}}else{for(f in m){if(typeof m[f]==="string"){j[f]=m[f]
}}}return j
}function b(k){var j,f;
for(j in k){f=k[j];
if(f==null||r.isFunction(f)||j in w||/scrollbar/.test(j)||!/color/i.test(j)&&isNaN(parseFloat(f))){delete k[j]
}}return k
}function v(l,j){var f={_:0},k;
for(k in j){if(l[k]!=j[k]){f[k]=j[k]
}}return f
}function h(l,j,f,k){if(typeof l=="object"){k=j;
f=null;
j=l;
l=j.effect
}if(r.isFunction(j)){k=j;
f=null;
j={}
}if(typeof j=="number"||r.fx.speeds[j]){k=f;
f=j;
j={}
}if(r.isFunction(f)){k=f;
f=null
}j=j||{};
f=f||j.duration;
f=r.fx.off?0:typeof f=="number"?f:f in r.fx.speeds?r.fx.speeds[f]:r.fx.speeds._default;
k=k||j.complete;
return[l,j,f,k]
}function g(f){if(!f||typeof f==="number"||r.fx.speeds[f]){return true
}if(typeof f==="string"&&!r.effects[f]){return true
}return false
}r.effects={};
r.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(j,f){r.fx.step[f]=function(k){if(!k.colorInit){k.start=x(k.elem,f);
k.end=e(k.end);
k.colorInit=true
}k.elem.style[f]="rgb("+Math.max(Math.min(parseInt(k.pos*(k.end[0]-k.start[0])+k.start[0],10),255),0)+","+Math.max(Math.min(parseInt(k.pos*(k.end[1]-k.start[1])+k.start[1],10),255),0)+","+Math.max(Math.min(parseInt(k.pos*(k.end[2]-k.start[2])+k.start[2],10),255),0)+")"
}
});
var d={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},a=["add","remove","toggle"],w={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};
r.effects.animateClass=function(l,j,f,k){if(r.isFunction(f)){k=f;
f=null
}return this.queue(function(){var q=r(this),p=q.attr("style")||" ",n=b(c.call(this)),o,m=q.attr("class");
r.each(a,function(s,u){l[u]&&q[u+"Class"](l[u])
});
o=b(c.call(this));
q.attr("class",m);
q.animate(v(n,o),{queue:false,duration:j,easding:f,complete:function(){r.each(a,function(s,u){l[u]&&q[u+"Class"](l[u])
});
if(typeof q.attr("style")=="object"){q.attr("style").cssText="";
q.attr("style").cssText=p
}else{q.attr("style",p)
}k&&k.apply(this,arguments);
r.dequeue(this)
}})
})
};
r.fn.extend({_addClass:r.fn.addClass,addClass:function(l,j,f,k){return j?r.effects.animateClass.apply(this,[{add:l},j,f,k]):this._addClass(l)
},_removeClass:r.fn.removeClass,removeClass:function(l,j,f,k){return j?r.effects.animateClass.apply(this,[{remove:l},j,f,k]):this._removeClass(l)
},_toggleClass:r.fn.toggleClass,toggleClass:function(m,j,f,l,k){return typeof j=="boolean"||j===i?f?r.effects.animateClass.apply(this,[j?{add:m}:{remove:m},f,l,k]):this._toggleClass(m,j):r.effects.animateClass.apply(this,[{toggle:m},j,f,l])
},switchClass:function(m,j,f,l,k){return r.effects.animateClass.apply(this,[{add:j,remove:m},f,l,k])
}});
r.extend(r.effects,{version:"1.8.13",save:function(k,j){for(var f=0;
f<j.length;
f++){j[f]!==null&&k.data("ec.storage."+j[f],k[0].style[j[f]])
}},restore:function(k,j){for(var f=0;
f<j.length;
f++){j[f]!==null&&k.css(j[f],k.data("ec.storage."+j[f]))
}},setMode:function(j,f){if(f=="toggle"){f=j.is(":hidden")?"show":"hide"
}return f
},getBaseline:function(k,j){var f;
switch(k[0]){case"top":f=0;
break;
case"middle":f=0.5;
break;
case"bottom":f=1;
break;
default:f=k[0]/j.height
}switch(k[1]){case"left":k=0;
break;
case"center":k=0.5;
break;
case"right":k=1;
break;
default:k=k[1]/j.width
}return{x:k,y:f}
},createWrapper:function(k){if(k.parent().is(".ui-effects-wrapper")){return k.parent()
}var j={width:k.outerWidth(true),height:k.outerHeight(true),"float":k.css("float")},f=r("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});
k.wrap(f);
f=k.parent();
if(k.css("position")=="static"){f.css({position:"relative"});
k.css({position:"relative"})
}else{r.extend(j,{position:k.css("position"),zIndex:k.css("z-index")});
r.each(["top","left","bottom","right"],function(m,l){j[l]=k.css(l);
if(isNaN(parseInt(j[l],10))){j[l]="auto"
}});
k.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})
}return f.css(j).show()
},removeWrapper:function(f){if(f.parent().is(".ui-effects-wrapper")){return f.parent().replaceWith(f)
}return f
},setTransition:function(l,j,f,k){k=k||{};
r.each(j,function(n,m){unit=l.cssUnit(m);
if(unit[0]>0){k[m]=unit[0]*f+unit[1]
}});
return k
}});
r.fn.extend({effect:function(l){var j=h.apply(this,arguments),f={options:j[1],duration:j[2],callback:j[3]};
j=f.options.mode;
var k=r.effects[l];
if(r.fx.off||!k){return j?this[j](f.duration,f.callback):this.each(function(){f.callback&&f.callback.call(this)
})
}return k.call(this,f)
},_show:r.fn.show,show:function(j){if(g(j)){return this._show.apply(this,arguments)
}else{var f=h.apply(this,arguments);
f[1].mode="show";
return this.effect.apply(this,f)
}},_hide:r.fn.hide,hide:function(j){if(g(j)){return this._hide.apply(this,arguments)
}else{var f=h.apply(this,arguments);
f[1].mode="hide";
return this.effect.apply(this,f)
}},__toggle:r.fn.toggle,toggle:function(j){if(g(j)||typeof j==="boolean"||r.isFunction(j)){return this.__toggle.apply(this,arguments)
}else{var f=h.apply(this,arguments);
f[1].mode="toggle";
return this.effect.apply(this,f)
}},cssUnit:function(k){var j=this.css(k),f=[];
r.each(["em","px","%","pt"],function(m,l){if(j.indexOf(l)>0){f=[parseFloat(j),l]
}});
return f
}});
r.easing.jswing=r.easing.swing;
r.extend(r.easing,{def:"easeOutQuad",swing:function(m,j,f,l,k){return r.easing[r.easing.def](m,j,f,l,k)
},easeInQuad:function(m,j,f,l,k){return l*(j/=k)*j+f
},easeOutQuad:function(m,j,f,l,k){return -l*(j/=k)*(j-2)+f
},easeInOutQuad:function(m,j,f,l,k){if((j/=k/2)<1){return l/2*j*j+f
}return -l/2*(--j*(j-2)-1)+f
},easeInCubic:function(m,j,f,l,k){return l*(j/=k)*j*j+f
},easeOutCubic:function(m,j,f,l,k){return l*((j=j/k-1)*j*j+1)+f
},easeInOutCubic:function(m,j,f,l,k){if((j/=k/2)<1){return l/2*j*j*j+f
}return l/2*((j-=2)*j*j+2)+f
},easeInQuart:function(m,j,f,l,k){return l*(j/=k)*j*j*j+f
},easeOutQuart:function(m,j,f,l,k){return -l*((j=j/k-1)*j*j*j-1)+f
},easeInOutQuart:function(m,j,f,l,k){if((j/=k/2)<1){return l/2*j*j*j*j+f
}return -l/2*((j-=2)*j*j*j-2)+f
},easeInQuint:function(m,j,f,l,k){return l*(j/=k)*j*j*j*j+f
},easeOutQuint:function(m,j,f,l,k){return l*((j=j/k-1)*j*j*j*j+1)+f
},easeInOutQuint:function(m,j,f,l,k){if((j/=k/2)<1){return l/2*j*j*j*j*j+f
}return l/2*((j-=2)*j*j*j*j+2)+f
},easeInSine:function(m,j,f,l,k){return -l*Math.cos(j/k*(Math.PI/2))+l+f
},easeOutSine:function(m,j,f,l,k){return l*Math.sin(j/k*(Math.PI/2))+f
},easeInOutSine:function(m,j,f,l,k){return -l/2*(Math.cos(Math.PI*j/k)-1)+f
},easeInExpo:function(m,j,f,l,k){return j==0?f:l*Math.pow(2,10*(j/k-1))+f
},easeOutExpo:function(m,j,f,l,k){return j==k?f+l:l*(-Math.pow(2,-10*j/k)+1)+f
},easeInOutExpo:function(m,j,f,l,k){if(j==0){return f
}if(j==k){return f+l
}if((j/=k/2)<1){return l/2*Math.pow(2,10*(j-1))+f
}return l/2*(-Math.pow(2,-10*--j)+2)+f
},easeInCirc:function(m,j,f,l,k){return -l*(Math.sqrt(1-(j/=k)*j)-1)+f
},easeOutCirc:function(m,j,f,l,k){return l*Math.sqrt(1-(j=j/k-1)*j)+f
},easeInOutCirc:function(m,j,f,l,k){if((j/=k/2)<1){return -l/2*(Math.sqrt(1-j*j)-1)+f
}return l/2*(Math.sqrt(1-(j-=2)*j)+1)+f
},easeInElastic:function(o,j,f,n,m){o=1.70158;
var l=0,k=n;
if(j==0){return f
}if((j/=m)==1){return f+n
}l||(l=m*0.3);
if(k<Math.abs(n)){k=n;
o=l/4
}else{o=l/(2*Math.PI)*Math.asin(n/k)
}return -(k*Math.pow(2,10*(j-=1))*Math.sin((j*m-o)*2*Math.PI/l))+f
},easeOutElastic:function(o,j,f,n,m){o=1.70158;
var l=0,k=n;
if(j==0){return f
}if((j/=m)==1){return f+n
}l||(l=m*0.3);
if(k<Math.abs(n)){k=n;
o=l/4
}else{o=l/(2*Math.PI)*Math.asin(n/k)
}return k*Math.pow(2,-10*j)*Math.sin((j*m-o)*2*Math.PI/l)+n+f
},easeInOutElastic:function(o,j,f,n,m){o=1.70158;
var l=0,k=n;
if(j==0){return f
}if((j/=m/2)==2){return f+n
}l||(l=m*0.3*1.5);
if(k<Math.abs(n)){k=n;
o=l/4
}else{o=l/(2*Math.PI)*Math.asin(n/k)
}if(j<1){return -0.5*k*Math.pow(2,10*(j-=1))*Math.sin((j*m-o)*2*Math.PI/l)+f
}return k*Math.pow(2,-10*(j-=1))*Math.sin((j*m-o)*2*Math.PI/l)*0.5+n+f
},easeInBack:function(n,j,f,m,l,k){if(k==i){k=1.70158
}return m*(j/=l)*j*((k+1)*j-k)+f
},easeOutBack:function(n,j,f,m,l,k){if(k==i){k=1.70158
}return m*((j=j/l-1)*j*((k+1)*j+k)+1)+f
},easeInOutBack:function(n,j,f,m,l,k){if(k==i){k=1.70158
}if((j/=l/2)<1){return m/2*j*j*(((k*=1.525)+1)*j-k)+f
}return m/2*((j-=2)*j*(((k*=1.525)+1)*j+k)+2)+f
},easeInBounce:function(m,j,f,l,k){return l-r.easing.easeOutBounce(m,k-j,0,l,k)+f
},easeOutBounce:function(m,j,f,l,k){return(j/=k)<1/2.75?l*7.5625*j*j+f:j<2/2.75?l*(7.5625*(j-=1.5/2.75)*j+0.75)+f:j<2.5/2.75?l*(7.5625*(j-=2.25/2.75)*j+0.9375)+f:l*(7.5625*(j-=2.625/2.75)*j+0.984375)+f
},easeInOutBounce:function(m,j,f,l,k){if(j<k/2){return r.easing.easeInBounce(m,j*2,0,l,k)*0.5+f
}return r.easing.easeOutBounce(m,j*2-k,0,l,k)*0.5+l*0.5+f
}})
}(jQuery);
(function(a){a.effects.blind=function(b){return this.queue(function(){var c=a(this),l=["position","top","bottom","left","right"],m=a.effects.setMode(c,b.options.mode||"hide"),o=b.options.direction||"vertical";
a.effects.save(c,l);
c.show();
var n=a.effects.createWrapper(c).css({overflow:"hidden"}),k=o=="vertical"?"height":"width";
o=o=="vertical"?n.height():n.width();
m=="show"&&n.css(k,0);
var j={};
j[k]=m=="show"?o:0;
n.animate(j,b.duration,b.options.easing,function(){m=="hide"&&c.hide();
a.effects.restore(c,l);
a.effects.removeWrapper(c);
b.callback&&b.callback.apply(c[0],arguments);
c.dequeue()
})
})
}
})(jQuery);
(function(a){a.effects.bounce=function(c){return this.queue(function(){var w=a(this),e=["position","top","bottom","left","right"],q=a.effects.setMode(w,c.options.mode||"effect"),u=c.options.direction||"up",v=c.options.distance||20,b=c.options.times||5,p=c.duration||250;
/show|hide/.test(q)&&e.push("opacity");
a.effects.save(w,e);
w.show();
a.effects.createWrapper(w);
var s=u=="up"||u=="down"?"top":"left";
u=u=="up"||u=="left"?"pos":"neg";
v=c.options.distance||(s=="top"?w.outerHeight({margin:true})/3:w.outerWidth({margin:true})/3);
if(q=="show"){w.css("opacity",0).css(s,u=="pos"?-v:v)
}if(q=="hide"){v/=b*2
}q!="hide"&&b--;
if(q=="show"){var r={opacity:1};
r[s]=(u=="pos"?"+=":"-=")+v;
w.animate(r,p/2,c.options.easing);
v/=2;
b--
}for(r=0;
r<b;
r++){var o={},n={};
o[s]=(u=="pos"?"-=":"+=")+v;
n[s]=(u=="pos"?"+=":"-=")+v;
w.animate(o,p/2,c.options.easing).animate(n,p/2,c.options.easing);
v=q=="hide"?v*2:v/2
}if(q=="hide"){r={opacity:0};
r[s]=(u=="pos"?"-=":"+=")+v;
w.animate(r,p/2,c.options.easing,function(){w.hide();
a.effects.restore(w,e);
a.effects.removeWrapper(w);
c.callback&&c.callback.apply(this,arguments)
})
}else{o={};
n={};
o[s]=(u=="pos"?"-=":"+=")+v;
n[s]=(u=="pos"?"+=":"-=")+v;
w.animate(o,p/2,c.options.easing).animate(n,p/2,c.options.easing,function(){a.effects.restore(w,e);
a.effects.removeWrapper(w);
c.callback&&c.callback.apply(this,arguments)
})
}w.queue("fx",function(){w.dequeue()
});
w.dequeue()
})
}
})(jQuery);
(function(a){a.effects.clip=function(b){return this.queue(function(){var e=a(this),j=["position","top","bottom","left","right","height","width"],m=a.effects.setMode(e,b.options.mode||"hide"),o=b.options.direction||"vertical";
a.effects.save(e,j);
e.show();
var n=a.effects.createWrapper(e).css({overflow:"hidden"});
n=e[0].tagName=="IMG"?n:e;
var l={size:o=="vertical"?"height":"width",position:o=="vertical"?"top":"left"};
o=o=="vertical"?n.height():n.width();
if(m=="show"){n.css(l.size,0);
n.css(l.position,o/2)
}var k={};
k[l.size]=m=="show"?o:0;
k[l.position]=m=="show"?0:o/2;
n.animate(k,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){m=="hide"&&e.hide();
a.effects.restore(e,j);
a.effects.removeWrapper(e);
b.callback&&b.callback.apply(e[0],arguments);
e.dequeue()
}})
})
}
})(jQuery);
(function(a){a.effects.drop=function(b){return this.queue(function(){var d=a(this),k=["position","top","bottom","left","right","opacity"],n=a.effects.setMode(d,b.options.mode||"hide"),c=b.options.direction||"left";
a.effects.save(d,k);
d.show();
a.effects.createWrapper(d);
var m=c=="up"||c=="down"?"top":"left";
c=c=="up"||c=="left"?"pos":"neg";
var l=b.options.distance||(m=="top"?d.outerHeight({margin:true})/2:d.outerWidth({margin:true})/2);
if(n=="show"){d.css("opacity",0).css(m,c=="pos"?-l:l)
}var j={opacity:n=="show"?1:0};
j[m]=(n=="show"?c=="pos"?"+=":"-=":c=="pos"?"-=":"+=")+l;
d.animate(j,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){n=="hide"&&d.hide();
a.effects.restore(d,k);
a.effects.removeWrapper(d);
b.callback&&b.callback.apply(this,arguments);
d.dequeue()
}})
})
}
})(jQuery);
(function(a){a.effects.explode=function(b){return this.queue(function(){var q=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3,p=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3;
b.options.mode=b.options.mode=="toggle"?a(this).is(":visible")?"hide":"show":b.options.mode;
var j=a(this).show().css("visibility","hidden"),m=j.offset();
m.top-=parseInt(j.css("marginTop"),10)||0;
m.left-=parseInt(j.css("marginLeft"),10)||0;
for(var l=j.outerWidth(true),k=j.outerHeight(true),o=0;
o<q;
o++){for(var n=0;
n<p;
n++){j.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-n*(l/p),top:-o*(k/q)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:l/p,height:k/q,left:m.left+n*(l/p)+(b.options.mode=="show"?(n-Math.floor(p/2))*(l/p):0),top:m.top+o*(k/q)+(b.options.mode=="show"?(o-Math.floor(q/2))*(k/q):0),opacity:b.options.mode=="show"?0:1}).animate({left:m.left+n*(l/p)+(b.options.mode=="show"?0:(n-Math.floor(p/2))*(l/p)),top:m.top+o*(k/q)+(b.options.mode=="show"?0:(o-Math.floor(q/2))*(k/q)),opacity:b.options.mode=="show"?1:0},b.duration||500)
}}setTimeout(function(){b.options.mode=="show"?j.css({visibility:"visible"}):j.css({visibility:"visible"}).hide();
b.callback&&b.callback.apply(j[0]);
j.dequeue();
a("div.ui-effects-explode").remove()
},b.duration||500)
})
}
})(jQuery);
(function(a){a.effects.fade=function(b){return this.queue(function(){var f=a(this),e=a.effects.setMode(f,b.options.mode||"hide");
f.animate({opacity:e},{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){b.callback&&b.callback.apply(this,arguments);
f.dequeue()
}})
})
}
})(jQuery);
(function(a){a.effects.fold=function(b){return this.queue(function(){var v=a(this),n=["position","top","bottom","left","right"],u=a.effects.setMode(v,b.options.mode||"hide"),q=b.options.size||15,p=!!b.options.horizFirst,m=b.duration?b.duration/2:a.fx.speeds._default/2;
a.effects.save(v,n);
v.show();
var s=a.effects.createWrapper(v).css({overflow:"hidden"}),r=u=="show"!=p,c=r?["width","height"]:["height","width"];
r=r?[s.width(),s.height()]:[s.height(),s.width()];
var o=/([0-9]+)%/.exec(q);
if(o){q=parseInt(o[1],10)/100*r[u=="hide"?0:1]
}if(u=="show"){s.css(p?{height:0,width:q}:{height:q,width:0})
}p={};
o={};
p[c[0]]=u=="show"?r[0]:q;
o[c[1]]=u=="show"?r[1]:0;
s.animate(p,m,b.options.easing).animate(o,m,b.options.easing,function(){u=="hide"&&v.hide();
a.effects.restore(v,n);
a.effects.removeWrapper(v);
b.callback&&b.callback.apply(v[0],arguments);
v.dequeue()
})
})
}
})(jQuery);
(function(a){a.effects.highlight=function(b){return this.queue(function(){var c=a(this),h=["backgroundImage","backgroundColor","opacity"],i=a.effects.setMode(c,b.options.mode||"show"),g={backgroundColor:c.css("backgroundColor")};
if(i=="hide"){g.opacity=0
}a.effects.save(c,h);
c.show().css({backgroundImage:"none",backgroundColor:b.options.color||"#ffff99"}).animate(g,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){i=="hide"&&c.hide();
a.effects.restore(c,h);
i=="show"&&!a.support.opacity&&this.style.removeAttribute("filter");
b.callback&&b.callback.apply(this,arguments);
c.dequeue()
}})
})
}
})(jQuery);
(function(a){a.effects.pulsate=function(b){return this.queue(function(){var d=a(this),e=a.effects.setMode(d,b.options.mode||"show");
times=(b.options.times||5)*2-1;
duration=b.duration?b.duration/2:a.fx.speeds._default/2;
isVisible=d.is(":visible");
animateTo=0;
if(!isVisible){d.css("opacity",0).show();
animateTo=1
}if(e=="hide"&&isVisible||e=="show"&&!isVisible){times--
}for(e=0;
e<times;
e++){d.animate({opacity:animateTo},duration,b.options.easing);
animateTo=(animateTo+1)%2
}d.animate({opacity:animateTo},duration,b.options.easing,function(){animateTo==0&&d.hide();
b.callback&&b.callback.apply(this,arguments)
});
d.queue("fx",function(){d.dequeue()
}).dequeue()
})
}
})(jQuery);
(function(a){a.effects.puff=function(c){return this.queue(function(){var b=a(this),k=a.effects.setMode(b,c.options.mode||"hide"),j=parseInt(c.options.percent,10)||150,f=j/100,d={height:b.height(),width:b.width()};
a.extend(c.options,{fade:true,mode:k,percent:k=="hide"?j:100,from:k=="hide"?d:{height:d.height*f,width:d.width*f}});
b.effect("scale",c.options,c.duration,c.callback);
b.dequeue()
})
};
a.effects.scale=function(c){return this.queue(function(){var b=a(this),m=a.extend(true,{},c.options),k=a.effects.setMode(b,c.options.mode||"effect"),j=parseInt(c.options.percent,10)||(parseInt(c.options.percent,10)==0?0:k=="hide"?0:100),d=c.options.direction||"both",l=c.options.origin;
if(k!="effect"){m.origin=l||["middle","center"];
m.restore=true
}l={height:b.height(),width:b.width()};
b.from=c.options.from||(k=="show"?{height:0,width:0}:l);
j={y:d!="horizontal"?j/100:1,x:d!="vertical"?j/100:1};
b.to={height:l.height*j.y,width:l.width*j.x};
if(c.options.fade){if(k=="show"){b.from.opacity=0;
b.to.opacity=1
}if(k=="hide"){b.from.opacity=1;
b.to.opacity=0
}}m.from=b.from;
m.to=b.to;
m.mode=k;
b.effect("size",m,c.duration,c.callback);
b.dequeue()
})
};
a.effects.size=function(c){return this.queue(function(){var B=a(this),z=["position","top","bottom","left","right","width","height","overflow","opacity"],x=["position","top","bottom","left","right","overflow","opacity"],w=["width","height","overflow"],v=["fontSize"],y=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],s=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],b=a.effects.setMode(B,c.options.mode||"effect"),o=c.options.restore||false,q=c.options.scale||"both",r=c.options.origin,u={height:B.height(),width:B.width()};
B.from=c.options.from||u;
B.to=c.options.to||u;
if(r){r=a.effects.getBaseline(r,u);
B.from.top=(u.height-B.from.height)*r.y;
B.from.left=(u.width-B.from.width)*r.x;
B.to.top=(u.height-B.to.height)*r.y;
B.to.left=(u.width-B.to.width)*r.x
}var A={from:{y:B.from.height/u.height,x:B.from.width/u.width},to:{y:B.to.height/u.height,x:B.to.width/u.width}};
if(q=="box"||q=="both"){if(A.from.y!=A.to.y){z=z.concat(y);
B.from=a.effects.setTransition(B,y,A.from.y,B.from);
B.to=a.effects.setTransition(B,y,A.to.y,B.to)
}if(A.from.x!=A.to.x){z=z.concat(s);
B.from=a.effects.setTransition(B,s,A.from.x,B.from);
B.to=a.effects.setTransition(B,s,A.to.x,B.to)
}}if(q=="content"||q=="both"){if(A.from.y!=A.to.y){z=z.concat(v);
B.from=a.effects.setTransition(B,v,A.from.y,B.from);
B.to=a.effects.setTransition(B,v,A.to.y,B.to)
}}a.effects.save(B,o?z:x);
B.show();
a.effects.createWrapper(B);
B.css("overflow","hidden").css(B.from);
if(q=="content"||q=="both"){y=y.concat(["marginTop","marginBottom"]).concat(v);
s=s.concat(["marginLeft","marginRight"]);
w=z.concat(y).concat(s);
B.find("*[width]").each(function(){child=a(this);
o&&a.effects.save(child,w);
var d={height:child.height(),width:child.width()};
child.from={height:d.height*A.from.y,width:d.width*A.from.x};
child.to={height:d.height*A.to.y,width:d.width*A.to.x};
if(A.from.y!=A.to.y){child.from=a.effects.setTransition(child,y,A.from.y,child.from);
child.to=a.effects.setTransition(child,y,A.to.y,child.to)
}if(A.from.x!=A.to.x){child.from=a.effects.setTransition(child,s,A.from.x,child.from);
child.to=a.effects.setTransition(child,s,A.to.x,child.to)
}child.css(child.from);
child.animate(child.to,c.duration,c.options.easing,function(){o&&a.effects.restore(child,w)
})
})
}B.animate(B.to,{queue:false,duration:c.duration,easing:c.options.easing,complete:function(){B.to.opacity===0&&B.css("opacity",B.from.opacity);
b=="hide"&&B.hide();
a.effects.restore(B,o?z:x);
a.effects.removeWrapper(B);
c.callback&&c.callback.apply(this,arguments);
B.dequeue()
}})
})
}
})(jQuery);
(function(a){a.effects.shake=function(b){return this.queue(function(){var v=a(this),n=["position","top","bottom","left","right"];
a.effects.setMode(v,b.options.mode||"effect");
var u=b.options.direction||"left",s=b.options.distance||20,d=b.options.times||3,r=b.duration||b.options.duration||140;
a.effects.save(v,n);
v.show();
a.effects.createWrapper(v);
var q=u=="up"||u=="down"?"top":"left",p=u=="up"||u=="left"?"pos":"neg";
u={};
var o={},m={};
u[q]=(p=="pos"?"-=":"+=")+s;
o[q]=(p=="pos"?"+=":"-=")+s*2;
m[q]=(p=="pos"?"-=":"+=")+s*2;
v.animate(u,r,b.options.easing);
for(s=1;
s<d;
s++){v.animate(o,r,b.options.easing).animate(m,r,b.options.easing)
}v.animate(o,r,b.options.easing).animate(u,r/2,b.options.easing,function(){a.effects.restore(v,n);
a.effects.removeWrapper(v);
b.callback&&b.callback.apply(this,arguments)
});
v.queue("fx",function(){v.dequeue()
});
v.dequeue()
})
}
})(jQuery);
(function(a){a.effects.slide=function(b){return this.queue(function(){var d=a(this),k=["position","top","bottom","left","right"],m=a.effects.setMode(d,b.options.mode||"show"),c=b.options.direction||"left";
a.effects.save(d,k);
d.show();
a.effects.createWrapper(d).css({overflow:"hidden"});
var l=c=="up"||c=="down"?"top":"left";
c=c=="up"||c=="left"?"pos":"neg";
var n=b.options.distance||(l=="top"?d.outerHeight({margin:true}):d.outerWidth({margin:true}));
if(m=="show"){d.css(l,c=="pos"?isNaN(n)?"-"+n:-n:n)
}var j={};
j[l]=(m=="show"?c=="pos"?"+=":"-=":c=="pos"?"-=":"+=")+n;
d.animate(j,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){m=="hide"&&d.hide();
a.effects.restore(d,k);
a.effects.removeWrapper(d);
b.callback&&b.callback.apply(this,arguments);
d.dequeue()
}})
})
}
})(jQuery);
(function(a){a.effects.transfer=function(b){return this.queue(function(){var e=a(this),i=a(b.options.to),h=i.offset();
i={top:h.top,left:h.left,height:i.innerHeight(),width:i.innerWidth()};
h=e.offset();
var g=a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css({top:h.top,left:h.left,height:e.innerHeight(),width:e.innerWidth(),position:"absolute"}).animate(i,b.duration,b.options.easing,function(){g.remove();
b.callback&&b.callback.apply(e[0],arguments);
e.dequeue()
})
})
}
})(jQuery);