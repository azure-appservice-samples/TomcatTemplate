(function(a,b){a.notifications=(function(){var h={tapToDismiss:true,notificationClass:"notification",containerId:"notification-container",debug:false,fadeIn:300,fadeOut:1000,extendedTimeOut:1000,iconClasses:{error:"notification-error",info:"notification-info",success:"notification-success",warning:"notification-warning"},iconClass:"notification-info",positionClass:"notification-top-right",timeOut:5000,titleClass:"notification-title",messageClass:"notification-message"},c=function(k,l){return d({iconClass:e().iconClasses.error,message:k,title:l})
},j=function(k){var l=b("#"+k.containerId);
if(l.length){return l
}l=b("<div/>").attr("id",k.containerId).addClass(k.positionClass);
l.appendTo(b("body"));
return l
},e=function(){return b.extend({},h,notifications.options)
},g=function(k,l){return d({iconClass:e().iconClasses.info,message:k,title:l})
},d=function(l){var v=e(),s=l.iconClass||v.iconClass,t=null,u=j(v),r=b("<div/>"),q=b("<div/>"),k=b("<div/>"),p={options:v,map:l};
if(l.iconClass){r.addClass(v.notificationClass).addClass(s)
}if(l.title){q.append(l.title).addClass(v.titleClass);
r.append(q)
}if(l.message){k.append(l.message).addClass(v.messageClass);
r.append(k)
}var n=function(){if(b(":focus",r).length>0){return
}var w=function(){return r.fadeOut(v.fadeOut)
};
b.when(w()).done(function(){if(r.is(":visible")){return
}r.remove();
if(u.children().length===0){u.remove()
}})
};
var o=function(){if(v.timeOut>0||v.extendedTimeOut>0){t=setTimeout(n,v.extendedTimeOut)
}};
var m=function(){clearTimeout(t);
r.stop(true,true).fadeIn(v.fadeIn)
};
r.hide();
u.prepend(r);
r.fadeIn(v.fadeIn);
if(v.timeOut>0){t=setTimeout(n,v.timeOut)
}r.hover(m,o);
if(v.tapToDismiss){r.click(n)
}if(v.debug){console.log(p)
}return r
},i=function(k,l){return d({iconClass:e().iconClasses.success,message:k,title:l})
},f=function(k,l){return d({iconClass:e().iconClasses.warning,message:k,title:l})
};
return{error:c,info:g,options:{},success:i,warning:f}
})()
}(window,jQuery));