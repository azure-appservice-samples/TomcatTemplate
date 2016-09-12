if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.LocalHistory=Clazz.extend({construct:function(a){this.facade=a;
this.historyEntry;
this.historyProxy;
this.historyStore;
this.storage;
this.fail;
this.uid;
this.historyInterval;
this.mygrid;
if(this.haveSupportForLocalHistory()){this.setupAndLoadHistoryData();
this.enableLocalHistory()
}if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.LocalHistory.display,functionality:this.displayLocalHistory.bind(this),group:"localstorage",icon:ORYX.BASE_FILE_PATH+"images/view.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/localhistory.png",description:ORYX.I18N.LocalHistory.display_desc,index:1,minShape:0,maxShape:0,isEnabled:function(){return ORYX.LOCAL_HISTORY_ENABLED&&!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.LocalHistory.clear,functionality:this.clearLocalHistory.bind(this),group:"localstorage",icon:ORYX.BASE_FILE_PATH+"images/clear.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/localhistory.png",description:ORYX.I18N.LocalHistory.clear_desc,index:2,minShape:0,maxShape:0,isEnabled:function(){return ORYX.LOCAL_HISTORY_ENABLED&&!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.LocalHistory.config,functionality:this.configureSnapshotInterval.bind(this),group:"localstorage",icon:ORYX.BASE_FILE_PATH+"images/clock.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/localhistory.png",description:ORYX.I18N.LocalHistory.config_desc,index:3,minShape:0,maxShape:0,isEnabled:function(){return ORYX.LOCAL_HISTORY_ENABLED&&!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.LocalHistory.enable,functionality:this.enableLocalHistory.bind(this),group:"localstorage",icon:ORYX.BASE_FILE_PATH+"images/enable.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/localhistory.png",description:ORYX.I18N.LocalHistory.enable_desc,index:3,minShape:0,maxShape:0,isEnabled:function(){return !ORYX.LOCAL_HISTORY_ENABLED&&!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.LocalHistory.disable,functionality:this.disableLocalHistory.bind(this),group:"localstorage",icon:ORYX.BASE_FILE_PATH+"images/disable.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/localhistory.png",description:ORYX.I18N.LocalHistory.disable_desc,index:4,minShape:0,maxShape:0,isEnabled:function(){return ORYX.LOCAL_HISTORY_ENABLED&&!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)})
}window.onbeforeunload=function(){this.stopStoring()
}.bind(this)
},displayLocalHistory:function(){var a=Ext.id();
this.mygrid=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:this.historyStore,id:a,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"pid",header:ORYX.I18N.LocalHistory.headertxt.id,width:100,dataIndex:"processid",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"pname",header:ORYX.I18N.LocalHistory.headertxt.name,width:100,dataIndex:"processname",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"ppkg",header:ORYX.I18N.LocalHistory.headertxt.Package,width:100,dataIndex:"processpkg",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"pver",header:ORYX.I18N.LocalHistory.headertxt.Version,width:100,dataIndex:"processversion",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"tms",header:ORYX.I18N.LocalHistory.headertxt.TimeStamp,width:200,dataIndex:"timestamp",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"pim",header:ORYX.I18N.LocalHistory.headertxt.ProcessImage,width:150,dataIndex:"svg",renderer:function(d){if(d&&d.length>0){return'<center><img src="'+ORYX.BASE_FILE_PATH+'images/page_white_picture.png" onclick="resetSVGView(\''+d+"');new SVGViewer({title: 'Local History Process Image', width: '650', height: '450', autoScroll: true, fixedcenter: true, src: '',hideAction: 'close'}).show();\" alt=\"Click to view Process Image\"/></center>"
}else{return ORYX.I18N.LocalHistory.headertxt.ProcessImage_NoAvailable
}return""
}}])});
var c=new Ext.Panel({id:"localHistoryPanel",title:ORYX.I18N.LocalHistory.localHistoryPanel.title,layout:"column",items:[this.mygrid],layoutConfig:{columns:1},defaults:{columnWidth:1}});
var b=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.LocalHistory.LocalHistoryView.title,height:350,width:780,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){b.hide()
}.bind(this)}],items:[c],listeners:{hide:function(){b.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.LocalHistory.LocalHistoryView.restore,handler:function(){if(this.mygrid.getSelectionModel().getSelectedCell()!=null){var d=this.mygrid.getSelectionModel().getSelectedCell()[0];
var e=this.historyStore.getAt(d).data.json;
if(e&&e.length>0){e=Base64.decode(e);
this.clearCanvas();
var f=e.evalJSON();
this.facade.importJSON(f)
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.LocalHistory.LocalHistoryView.invalidProcessInfo,title:""})
}b.hide()
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.LocalHistory.LocalHistoryView.msg,title:""})
}}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){b.hide()
}.bind(this)}]});
b.show();
this.mygrid.render();
this.mygrid.focus(false,100)
},setupAndLoadHistoryData:function(){this.historyEntry=Ext.data.Record.create([{name:"processid"},{name:"processname"},{name:"processpkg"},{name:"processversion"},{name:"timestamp"},{name:"json"},{name:"svg"}]);
this.historyProxy=new Ext.data.MemoryProxy({root:[]});
this.historyStore=new Ext.data.Store({autoDestroy:false,reader:new Ext.data.JsonReader({root:"root"},this.historyEntry),proxy:this.historyProxy});
this.historyStore.load();
if(this.storage){var c=ORYX.EDITOR.getSerializedJSON();
var g=jsonPath(c.evalJSON(),"$.properties.id");
var f=jsonPath(c.evalJSON(),"$.properties.package");
var b=this.storage.getItem(f+"_"+g);
if(b){var e=b.evalJSON();
for(var a=0;
a<e.length;
a++){var d=e[a];
this.addToStore(d)
}}}},addToStore:function(a){if(this.historyStore.data.length>0){if(this.historyStore.getAt(0).data.json!=a.json){this.historyStore.insert(0,new this.historyEntry({processid:a.processid,processname:a.processname,processpkg:a.processpkg,processversion:a.processversion,timestamp:new Date(a.timestamp).format("d.m.Y H:i:s"),json:a.json,svg:a.svg}));
this.historyStore.commitChanges();
if(this.mygrid){this.mygrid.getView().refresh(false)
}}}else{this.historyStore.insert(0,new this.historyEntry({processid:a.processid,processname:a.processname,processpkg:a.processpkg,processversion:a.processversion,timestamp:new Date(a.timestamp).format("d.m.Y H:i:s"),json:a.json,svg:a.svg}));
this.historyStore.commitChanges()
}},clearLocalHistory:function(){this.historyStore.removeAll();
this.historyStore.commitChanges();
var a=ORYX.EDITOR.getSerializedJSON();
var c=jsonPath(a.evalJSON(),"$.properties.id");
var b=jsonPath(a.evalJSON(),"$.properties.package");
this.storage.removeItem(b+"_"+c);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.LocalHistory.clearLocalHistory.msg,title:""})
},enableLocalHistory:function(){this.setupAndLoadHistoryData()
},haveSupportForLocalHistory:function(){try{this.uid=new Date;
(this.storage=window.localStorage).setItem(this.uid,this.uid);
this.fail=this.storage.getItem(this.uid)!=this.uid;
this.storage.removeItem(this.uid);
this.fail&&(this.storage=false)
}catch(b){}var a=this._readCookie("designerlocalhistory");
var c=false;
if(a!=null&&a=="true"){c=true;
return this.storage&&c
}return this.storage&&ORYX.LOCAL_HISTORY_ENABLED
},addToHistory:function(){var processJSON=ORYX.EDITOR.getSerializedJSON();
var formattedSvgDOM=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(false));
var processName=jsonPath(processJSON.evalJSON(),"$.properties.processn");
var processPackage=jsonPath(processJSON.evalJSON(),"$.properties.package");
var processId=jsonPath(processJSON.evalJSON(),"$.properties.id");
var processVersion=jsonPath(processJSON.evalJSON(),"$.properties.version");
var item={processid:processId,processname:processName,processpkg:processPackage,processversion:processVersion,timestamp:new Date().getTime(),json:Base64.encode(processJSON),svg:Base64.encode(formattedSvgDOM)};
try{var processHistory=this.storage.getItem(processPackage+"_"+processId);
if(processHistory){var pobject=processHistory.evalJSON();
pobject.push(item);
this.storage.setItem(processPackage+"_"+processId,eval(JSON.stringify(pobject)))
}else{var addArray=new Array();
addArray.push(item);
this.storage.setItem(processPackage+"_"+processId,eval(JSON.stringify(addArray)))
}this.addToStore(item)
}catch(e){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.LocalHistory.addQuotaexceed,title:""});
this.clearLocalHistory()
}},clearCanvas:function(){ORYX.EDITOR.getCanvas().nodes.each(function(a){ORYX.EDITOR.deleteShape(a)
}.bind(this));
ORYX.EDITOR.getCanvas().edges.each(function(a){ORYX.EDITOR.deleteShape(a)
}.bind(this))
},disableLocalHistory:function(){ORYX.LOCAL_HISTORY_ENABLED=false;
this._createCookie("designerlocalhistory","false",365);
this.stopStoring();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.LocalHistory.historyDisabled,title:""})
},enableLocalHistory:function(){ORYX.LOCAL_HISTORY_ENABLED=true;
this._createCookie("designerlocalhistory","true",365);
this.setupAndLoadHistoryData();
this.startStoring();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.LocalHistory.historyEnabled,title:""})
},startStoring:function(){this.historyInterval=setInterval(this.addToHistory.bind(this),ORYX.LOCAL_HISTORY_TIMEOUT)
},stopStoring:function(){clearInterval(this.historyInterval)
},_createCookie:function(c,d,e){if(e){var b=new Date();
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
},configureSnapshotInterval:function(){var b=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:150,defaultType:"numberfield",items:[{fieldLabel:ORYX.I18N.View.sim.interval,name:"interval",allowBlank:false,allowDecimals:false,minValue:1,width:120},{xtype:"combo",name:"intervalunits",store:new Ext.data.SimpleStore({fields:["units","value"],data:[["millisecond",ORYX.I18N.LocalHistory.unitsMillisecond],["seconds",ORYX.I18N.LocalHistory.unitsSeconds],["minutes",ORYX.I18N.LocalHistory.unitsMinutes],["hours",ORYX.I18N.LocalHistory.unitsHours],["days",ORYX.I18N.LocalHistory.unitsDays]]}),allowBlank:false,displayField:"value",valueField:"units",mode:"local",typeAhead:true,value:"minutes",triggerAction:"all",fieldLabel:ORYX.I18N.LocalHistory.intervalUnits,width:120}]});
var a=new Ext.Window({autoCreate:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.LocalHistory.ConfigureSnapshotInterval,height:300,width:350,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[b],buttons:[{text:ORYX.I18N.LocalHistory.set,handler:function(){a.hide();
var d=b.items.items[0].getValue();
var c=b.items.items[1].getValue();
if(d&&c&&d>0){if(c=="seconds"){d=d*1000
}else{if(c=="minutes"){d=d*1000*60
}else{if(c=="hours"){d=d*1000*60*60
}else{if(c=="days"){d=d*1000*60*60*24
}else{}}}}this.stopStoring();
ORYX.LOCAL_HISTORY_TIMEOUT=d;
this.startStoring();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.LocalHistory.UpdatedSnapshotInterval,title:""})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.LocalHistory.InvalidInput,title:""})
}}.bind(this)},{text:ORYX.I18N.Save.close,handler:function(){a.hide()
}.bind(this)}]});
a.on("hide",function(){a.destroy(true);
delete a
});
a.show()
}});
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(c){var a="";
var k,h,f,j,g,e,d;
var b=0;
c=Base64._utf8_encode(c);
while(b<c.length){k=c.charCodeAt(b++);
h=c.charCodeAt(b++);
f=c.charCodeAt(b++);
j=k>>2;
g=((k&3)<<4)|(h>>4);
e=((h&15)<<2)|(f>>6);
d=f&63;
if(isNaN(h)){e=d=64
}else{if(isNaN(f)){d=64
}}a=a+this._keyStr.charAt(j)+this._keyStr.charAt(g)+this._keyStr.charAt(e)+this._keyStr.charAt(d)
}return a
},decode:function(c){var a="";
var k,h,f;
var j,g,e,d;
var b=0;
c=c.replace(/[^A-Za-z0-9\+\/\=]/g,"");
while(b<c.length){j=this._keyStr.indexOf(c.charAt(b++));
g=this._keyStr.indexOf(c.charAt(b++));
e=this._keyStr.indexOf(c.charAt(b++));
d=this._keyStr.indexOf(c.charAt(b++));
k=(j<<2)|(g>>4);
h=((g&15)<<4)|(e>>2);
f=((e&3)<<6)|d;
a=a+String.fromCharCode(k);
if(e!=64){a=a+String.fromCharCode(h)
}if(d!=64){a=a+String.fromCharCode(f)
}}a=Base64._utf8_decode(a);
return a
},_utf8_encode:function(b){b=b.replace(/\r\n/g,"\n");
var a="";
for(var e=0;
e<b.length;
e++){var d=b.charCodeAt(e);
if(d<128){a+=String.fromCharCode(d)
}else{if((d>127)&&(d<2048)){a+=String.fromCharCode((d>>6)|192);
a+=String.fromCharCode((d&63)|128)
}else{a+=String.fromCharCode((d>>12)|224);
a+=String.fromCharCode(((d>>6)&63)|128);
a+=String.fromCharCode((d&63)|128)
}}}return a
},_utf8_decode:function(a){var b="";
var d=0;
var e=c1=c2=0;
while(d<a.length){e=a.charCodeAt(d);
if(e<128){b+=String.fromCharCode(e);
d++
}else{if((e>191)&&(e<224)){c2=a.charCodeAt(d+1);
b+=String.fromCharCode(((e&31)<<6)|(c2&63));
d+=2
}else{c2=a.charCodeAt(d+1);
c3=a.charCodeAt(d+2);
b+=String.fromCharCode(((e&15)<<12)|((c2&63)<<6)|(c3&63));
d+=3
}}}return b
}};
function resetSVGView(a){ORYX.EDITOR.localStorageSVG=Base64.decode(a)
};