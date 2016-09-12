function printf(){var a=arguments[0];
for(var b=1;
b<arguments.length;
b++){a=a.replace("%"+(b-1),arguments[b])
}return a
}var ORYX_LOGLEVEL_TRACE=5;
var ORYX_LOGLEVEL_DEBUG=4;
var ORYX_LOGLEVEL_INFO=3;
var ORYX_LOGLEVEL_WARN=2;
var ORYX_LOGLEVEL_ERROR=1;
var ORYX_LOGLEVEL_FATAL=0;
if(!ORYX_LOGLEVEL){var ORYX_LOGLEVEL=1
}var ORYX_CONFIGURATION_DELAY=100;
var ORYX_CONFIGURATION_WAIT_ATTEMPTS=10;
if(!ORYX){var ORYX={}
}ORYX=Object.extend(ORYX,{PATH:ORYX.CONFIG.ROOT_PATH,alreadyLoaded:[],configrationRetries:0,availablePlugins:[],Log:{__appenders:[{append:function(a){if(typeof(console)!=="undefined"){console.log(a)
}}}],trace:function(){if(ORYX_LOGLEVEL>=ORYX_LOGLEVEL_TRACE){ORYX.Log.__log("TRACE",arguments)
}},debug:function(){if(ORYX_LOGLEVEL>=ORYX_LOGLEVEL_DEBUG){ORYX.Log.__log("DEBUG",arguments)
}},info:function(){if(ORYX_LOGLEVEL>=ORYX_LOGLEVEL_INFO){ORYX.Log.__log("INFO",arguments)
}},warn:function(){if(ORYX_LOGLEVEL>=ORYX_LOGLEVEL_WARN){ORYX.Log.__log("WARN",arguments)
}},error:function(){if(ORYX_LOGLEVEL>=ORYX_LOGLEVEL_ERROR){ORYX.Log.__log("ERROR",arguments)
}},fatal:function(){if(ORYX_LOGLEVEL>=ORYX_LOGLEVEL_FATAL){ORYX.Log.__log("FATAL",arguments)
}},__log:function(c,a){a[0]=(new Date()).getTime()+" "+c+" "+a[0];
var b=printf.apply(null,a);
ORYX.Log.__appenders.each(function(d){d.append(b)
})
},addAppender:function(a){ORYX.Log.__appenders.push(a)
}},load:function(){var a=new Ext.Window({renderTo:Ext.getBody(),id:"oryx-loading-panel",bodyStyle:"padding: 8px;background:white",title:ORYX.I18N.Oryx.title,width:"auto",height:"auto",modal:true,resizable:false,closable:false,html:'<span style="font-size:11px;">'+ORYX.I18N.Oryx.pleaseWait+"</span>"});
a.show();
ORYX.Log.debug("Oryx begins loading procedure.");
if((typeof Prototype=="undefined")||(typeof Element=="undefined")||(typeof Element.Methods=="undefined")||parseFloat(Prototype.Version.split(".")[0]+"."+Prototype.Version.split(".")[1])<1.5){throw ("Application requires the Prototype JavaScript framework >= 1.5.3")
}ORYX.Log.debug("Prototype > 1.5 found.");
init()
}});
ORYX.Log.debug("Registering Oryx with Kickstart");
Kickstart.register(ORYX.load);