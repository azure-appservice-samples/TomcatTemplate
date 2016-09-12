if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.Theme=Clazz.extend({construct:function(e){this.facade=e;
var b=new XMLHttpRequest;
var c=ORYX.PATH+"themes";
var f="action=getThemeNames&profile="+ORYX.PROFILE+"&uuid="+window.btoa(encodeURI(ORYX.UUID));
b.open("POST",c,false);
b.setRequestHeader("Content-type","application/x-www-form-urlencoded");
b.send(f);
if(b.status==200){var a=b.responseText.split(",");
for(var d=0;
d<a.length;
d++){if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:a[d],functionality:this.applyTheme.bind(this,a[d]),group:"colorpickergroup",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/colorpicker.gif",icon:ORYX.BASE_FILE_PATH+"images/colorize.png",description:ORYX.I18N.theme.Apply+" "+a[d]+" "+ORYX.I18N.theme.ColorTheme,index:10,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)})
}}}},applyTheme:function(a){this._createCookie("designercolortheme",a,365);
Ext.Ajax.request({url:ORYX.PATH+"themes",method:"POST",success:function(c){try{if(c.responseText&&c.responseText.length>0){var b=c.responseText.evalJSON();
var d=b.themes;
var g=d[a];
ORYX.EDITOR._canvas.getChildNodes().each((function(e){this.applyThemeToNodes(e,g)
}).bind(this))
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.theme.invalidColorTheme,title:""})
}}catch(f){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.theme.errorApplying+": "+f,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.theme.errorApplying+". ",title:""})
},params:{action:"getThemeJSON",profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID))}})
},applyThemeToNodes:function(f,a){var e=f.getStencil().groups()[0];
var c=a[e];
if(c&&f.properties["oryx-isselectable"]!="false"){var d=c.split("|");
if(f.properties["oryx-bgcolor"]!=undefined){f.setProperty("oryx-bgcolor",d[0])
}if(f.properties["oryx-bordercolor"]!=undefined){f.setProperty("oryx-bordercolor",d[1])
}if(f.properties["oryx-fontcolor"]!=undefined){f.setProperty("oryx-fontcolor",d[2])
}f.refresh()
}if(f.getChildNodes().size()>0){for(var b=0;
b<f.getChildNodes().size();
b++){this.applyThemeToNodes(f.getChildNodes()[b],a)
}}},_createCookie:function(c,d,e){if(e){var b=new Date();
b.setTime(b.getTime()+(e*24*60*60*1000));
var a="; expires="+b.toGMTString()
}else{var a=""
}document.cookie=c+"="+d+a+"; path=/"
},_readCookie:function(b){var e=b+"=";
var a=document.cookie.split(";");
for(var d=0;
d<a.length;
d++){var f=a[d];
while(f.charAt(0)==" "){f=f.substring(1,f.length)
}if(f.indexOf(e)==0){return f.substring(e.length,f.length)
}}return null
}});