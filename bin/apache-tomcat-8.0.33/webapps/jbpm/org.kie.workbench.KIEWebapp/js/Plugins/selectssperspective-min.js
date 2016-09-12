if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.SelectStencilSetPerspective={facade:undefined,extensions:undefined,perspectives:undefined,construct:function(c){this.facade=c;
var b=ORYX.BASE_FILE_PATH+"stencilsets/extensions/extensions.json";
new Ajax.Request(b,{method:"GET",asynchronous:false,onSuccess:(function(h){try{var d=h.responseText;
var f=d.evalJSON();
this.extensions={};
f.extensions.each(function(e){this.extensions[e.namespace]=e
}.bind(this));
this.perspectives={};
f.perspectives.each(function(e){this.perspectives[e.namespace]=e
}.bind(this));
this.facade.getStencilSets().values().each((function(i){var e=f.perspectives.findAll(function(j){if(j.stencilset==i.namespace()){return true
}else{return false
}});
if(e.size()>0){this.createPerspectivesCombobox(i,e)
}}).bind(this))
}catch(g){ORYX.Log.debug(ORYX.I18N.SSExtensionLoader.failed1);
Ext.Msg.alert("Oryx",ORYX.I18N.SSExtensionLoader.failed1)
}}).bind(this),onFailure:(function(d){Ext.Msg.alert("Oryx",ORYX.I18N.SSExtensionLoader.failed2)
}).bind(this)});
if(ORYX.PRESET_PERSPECTIVE.length>0){if(ORYX.PRESET_PERSPECTIVE=="full"){this._updateStencil(ORYX.FULL_PERSPECTIVE)
}else{if(ORYX.PRESET_PERSPECTIVE=="simple"){this._updateStencil(ORYX.SIMPLE_PERSPECTIVE)
}else{if(ORYX.PRESET_PERSPECTIVE=="ruleflow"){this._updateStencil(ORYX.RULEFLOW_PERSPECTIVE)
}}}}var a=this._readCookie("designerperspective");
if(a!=null){this._updateStencil(a)
}},createPerspectivesCombobox:function(a,f){var e=new Array();
f.each(function(g){e.push([g.namespace,ORYX.I18N.propertyNames[g.title],g.description])
});
var d=new Ext.data.SimpleStore({fields:["namespace","title","tooltip"],data:e});
var c=new Ext.form.ComboBox({store:d,displayField:"title",forceSelection:true,typeAhead:true,mode:"local",width:168,triggerAction:"all",selectOnFocus:true});
c.on("select",this.onSelect,this);
var b=new Ext.Panel({bodyStyle:"background:#eee;font-size:9px;font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;",autoScroll:true,lines:false,items:[new Ext.form.Label({text:ORYX.I18N.SSExtensionLoader.chooseLibrary,style:"font-size:12px;"}),c]});
this.facade.addToRegion("west",b);
b.show();
b.doLayout()
},onSelect:function(b,a){var c=a.json[0];
this._updateStencil(c);
this._createCookie("designerperspective",c,365)
},_updateStencil:function(d){ORYX.CURRENT_PERSPECTIVE=d;
var c=this.facade.getStencilSets();
var b=new Object();
c.values().each(function(f){f.changeTitle(this.perspectives[d].title);
f.extensions().values().each(function(g){if(this.extensions[g.namespace]){b[g.namespace]=g
}}.bind(this))
}.bind(this));
var a=new Array();
if(this.perspectives[d].addExtensions){this.perspectives[d].addExtensions.each(function(f){if(!f.ifIsLoaded){a.push(this.extensions[f]);
return
}if(b[f.ifIsLoaded]&&this.extensions[f.add]){a.push(this.extensions[f.add])
}else{if(f["default"]&&this.extensions[f["default"]]){a.push(this.extensions[f["default"]])
}}}.bind(this))
}if(this.perspectives[d].removeAllExtensions){this._loadExtensions(a,undefined,true);
return
}var e=new Array();
if(this.perspectives[d].removeExtensions){this.perspectives[d].removeExtensions.each(function(f){e.push(this.extensions[f])
}.bind(this))
}this._loadExtensions(a,e,false)
},_loadExtensions:function(a,d,c){var e=this.facade.getStencilSets();
var f=false;
e.values().each(function(g){var h=g.extensions().values().select(function(i){return a[i.namespace]==undefined
});
if(c){h.each(function(i){g.removeExtension(i.namespace);
f=true
})
}else{h.each(function(j){var i=d.find(function(k){return j.namespace===k.namespace
});
if(i){g.removeExtension(j.namespace);
f=true
}})
}});
a.each(function(h){var g=e[h["extends"]];
if(g){g.addExtensionFromDefinition(ORYX.CONFIG.ROOT_PATH+"/stencilset/extensions/"+h.definition);
f=true
}}.bind(this));
if(f){e.values().each(function(g){this.facade.getRules().initializeRules(g)
}.bind(this));
ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_STENCIL_SET_RELOAD});
var b=this.facade.getSelection();
this.facade.setSelection();
this.facade.setSelection(b)
}},_createCookie:function(c,d,e){if(e){var b=new Date();
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
}};
ORYX.Plugins.SelectStencilSetPerspective=Clazz.extend(ORYX.Plugins.SelectStencilSetPerspective);