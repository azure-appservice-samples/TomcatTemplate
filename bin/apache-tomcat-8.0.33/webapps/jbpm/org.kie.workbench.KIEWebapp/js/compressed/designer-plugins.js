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
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.Toolbar=Clazz.extend({facade:undefined,plugs:[],construct:function(b,a){this.facade=b;
this.groupIndex=new Hash();
if(ORYX.CONFIG.MENU_INDEX){this.groupIndex=ORYX.CONFIG.MENU_INDEX
}else{a.properties.each((function(c){if(c.group&&c.index!=undefined){this.groupIndex[c.group]=c.index
}}).bind(this))
}Ext.QuickTips.init();
this.buttons=[];
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_BUTTON_UPDATE,this.onButtonUpdate.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_STENCIL_SET_LOADED,this.onSelectionChanged.bind(this))
},onButtonUpdate:function(b){var a=this.buttons.find(function(c){return c.id===b.id
});
if(b.pressed!==undefined){a.buttonInstance.toggle(b.pressed)
}},registryChanged:function(e){var i=e.sortBy((function(j){return((this.groupIndex[j.group]!=undefined?this.groupIndex[j.group]:"")+j.group+""+j.index).toLowerCase()
}).bind(this));
var f=$A(i).findAll(function(j){if(j.group&&j.group.indexOf("footer")===0){return false
}return !this.plugs.include(j)
}.bind(this));
if(f.length<1){return
}this.buttons=[];
ORYX.Log.trace("Creating a toolbar.");
if(!this.toolbar){this.toolbar=new Ext.ux.SlicedToolbar({height:24});
var g=this.facade.addToRegion("north",this.toolbar,"Toolbar")
}var c=this.plugs.last()?this.plugs.last().group:f[0].group;
var a={};
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){if(("webkitSpeech" in document.createElement("input"))){var d=new Ext.form.TextField({id:"micinput"});
this.toolbar.add(d);
this.toolbar.add("-");
var b={"x-webkit-speech":"true"};
Ext.get("micinput").set(b);
var h=document.getElementById("micinput");
h.onfocus=h.blur;
h.onwebkitspeechchange=function(j){var k=h.value;
ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_VOICE_COMMAND,entry:k});
h.blur;
h.value=""
}
}}f.each((function(l){if(!l.name){return
}this.plugs.push(l);
if(c!=l.group){this.toolbar.add("-");
c=l.group;
a={}
}var k=l.functionality;
l.functionality=function(){if("undefined"!=typeof(pageTracker)&&"function"==typeof(pageTracker._trackEvent)){pageTracker._trackEvent("ToolbarButton",l.name)
}return k.apply(this,arguments)
};
if(l.dropDownGroupIcon){var n=a[l.dropDownGroupIcon];
if(n===undefined){n=a[l.dropDownGroupIcon]=new Ext.Toolbar.SplitButton({iconCls:window.SpriteUtils.toUniqueId(l.dropDownGroupIcon),menu:new Ext.menu.Menu({items:[]}),listeners:{click:function(o,p){if(!o.menu.isVisible()&&!o.ignoreNextClick){o.showMenu()
}else{o.hideMenu()
}}}});
this.toolbar.add(n)
}var m={iconCls:window.SpriteUtils.toUniqueId(l.icon),text:l.name,itemId:l.id,handler:l.toggle?undefined:l.functionality,checkHandler:l.toggle?l.functionality:undefined,listeners:{render:function(o){if(l.description){new Ext.ToolTip({target:o.getEl(),title:l.description})
}}}};
if(l.toggle){var j=new Ext.menu.CheckItem(m)
}else{var j=new Ext.menu.Item(m)
}n.menu.add(j)
}else{var j=new Ext.Toolbar.Button({iconCls:window.SpriteUtils.toUniqueId(l.icon),itemId:l.id,tooltip:l.description,tooltipType:"title",handler:l.toggle?null:l.functionality,enableToggle:l.toggle,toggleHandler:l.toggle?l.functionality:null});
this.toolbar.add(j);
j.getEl().onclick=function(){this.blur()
}
}l.buttonInstance=j;
this.buttons.push(l)
}).bind(this));
this.enableButtons([]);
this.toolbar.calcSlices();
window.addEventListener("resize",function(j){this.toolbar.calcSlices()
}.bind(this),false);
window.addEventListener("onresize",function(j){this.toolbar.calcSlices()
}.bind(this),false)
},onSelectionChanged:function(a){if(!a.elements){this.enableButtons([])
}else{this.enableButtons(a.elements)
}},enableButtons:function(a){this.buttons.each((function(b){b.buttonInstance.enable();
if(b.minShape&&b.minShape>a.length){b.buttonInstance.disable()
}if(b.maxShape&&b.maxShape<a.length){b.buttonInstance.disable()
}if(b.isEnabled&&!b.isEnabled()){b.buttonInstance.disable()
}}).bind(this))
}});
Ext.ns("Ext.ux");
Ext.ux.SlicedToolbar=Ext.extend(Ext.Toolbar,{currentSlice:0,iconStandardWidth:22,seperatorStandardWidth:2,toolbarStandardPadding:2,initComponent:function(){Ext.apply(this,{});
Ext.ux.SlicedToolbar.superclass.initComponent.apply(this,arguments)
},onRender:function(){Ext.ux.SlicedToolbar.superclass.onRender.apply(this,arguments)
},onResize:function(){Ext.ux.SlicedToolbar.superclass.onResize.apply(this,arguments)
},calcSlices:function(){var g=0;
this.sliceMap={};
var f=0;
var b=this.getEl().getWidth();
var c=false;
var a=false;
var e=-1;
this.items.getRange().each(function(i,h){if(i.helperItem){i.destroy();
return
}var j=i.getEl().getWidth();
if(f+j+5*this.iconStandardWidth>b){e=this.items.indexOf(i);
this.insertSlicingButton("next",g,e);
a=true;
if(g!==0){this.insertSlicingButton("prev",g,e);
c=true
}this.insertSlicingSeperator(g,e);
g+=1;
f=0
}this.sliceMap[i.id]=g;
f+=j
}.bind(this));
if(!c){this.insertSlicingButton("prev",g,e)
}if(!a){if(c){this.insertSlicingButton("next",g,e+1)
}else{this.insertSlicingButton("next",g,e)
}}if(g>0){this.insertSlicingSeperator(g,-1);
this.insertSlicingButton("prev",g,-1);
var d=new Ext.Toolbar.Spacer();
this.insertSlicedHelperButton(d,g,-1);
Ext.get(d.id).setWidth(this.iconStandardWidth)
}this.maxSlice=g;
this.setCurrentSlice(this.currentSlice)
},insertSlicedButton:function(b,c,a){if(a==-1){this.addButton(b)
}else{this.insertButton(a,b)
}this.sliceMap[b.id]=c
},insertSlicedHelperButton:function(b,c,a){b.helperItem=true;
this.insertSlicedButton(b,c,a)
},insertSlicingSeperator:function(b,a){this.insertSlicedHelperButton(new Ext.Toolbar.Fill(),b,a)
},insertSlicingButton:function(e,f,b){var d=function(){this.setCurrentSlice(this.currentSlice+1)
}.bind(this);
var a=function(){this.setCurrentSlice(this.currentSlice-1)
}.bind(this);
var c=new Ext.Toolbar.Button({cls:"x-btn-icon",icon:ORYX.BASE_FILE_PATH+"images/toolbar_"+e+".png",handler:(e==="next")?d:a});
this.insertSlicedHelperButton(c,f,b)
},setCurrentSlice:function(a){if(a>this.maxSlice||a<0){return
}this.currentSlice=a;
this.items.getRange().each(function(b){b.setVisible(a===this.sliceMap[b.id])
}.bind(this))
}});
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.ProcessInfo=Clazz.extend({construct:function(a){this.facade=a;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.View.showInfo,functionality:this.showInfo.bind(this),group:ORYX.I18N.View.infogroup,icon:ORYX.BASE_FILE_PATH+"images/information.png",description:ORYX.I18N.View.showInfoDesc,index:1,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)})
}},showInfo:function(){window.alert("jBPM Designer Version: "+ORYX.VERSION)
}});
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.JPDLMigration=Clazz.extend({construct:function(a){this.facade=a;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.View.migratejPDL,functionality:this.migrateJPDL.bind(this),group:"importgroup",icon:ORYX.BASE_FILE_PATH+"images/jpdl_import_icon.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/import.png",description:ORYX.I18N.View.migratejPDLDesc,index:3,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)})
}},migrateJPDL:function(){this._showImportDialog()
},_showImportDialog:function(a){var f=ORYX.Utils.getDialogSize(450,500);
var d=Math.max(50,(f.height-150)/2);
var g=f.width-50;
var e=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",items:[{text:ORYX.I18N.jPDLSupport.selectFile,style:"font-size:12px;margin-bottom:10px;display:block;",xtype:"label"},{fieldLabel:ORYX.I18N.jPDLSupport.file,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;",itemCls:"ext_specific_window_overflow"},{xtype:"textarea",hideLabel:true,name:"msg",grow:false,width:g,height:d}]});
var b=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",items:[{text:ORYX.I18N.jPDLSupport.selectGpdFile,style:"font-size:12px;margin-bottom:10px;display:block;",xtype:"label"},{fieldLabel:ORYX.I18N.jPDLSupport.gpdfile,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;",itemCls:"ext_specific_window_overflow"},{xtype:"textarea",hideLabel:true,name:"msg",grow:false,width:g,height:d}]});
var c=new Ext.Window({autoCreate:true,autoScroll:true,plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.jPDLSupport.impJPDL,height:f.height,width:f.width,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[e,b],buttons:[{text:ORYX.I18N.jPDLSupport.impBtn,handler:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.jPDLSupport.impProgress,title:""});
window.setTimeout(function(){var h=e.items.items[2].getValue();
var i=b.items.items[2].getValue();
this._sendRequest(ORYX.CONFIG.TRANSFORMER_URL(),"POST",{jpdl:h,gpd:i,transformto:"jpdl2bpmn2",profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID))},function(j){this._loadJSON(j);
c.hide()
}.bind(this),function(){c.hide()
}.bind(this))
}.bind(this),100)
}.bind(this)},{text:ORYX.I18N.jPDLSupport.close,handler:function(){c.hide()
}.bind(this)}]});
c.on("hide",function(){c.destroy(true);
delete c
});
c.show();
e.items.items[1].getEl().dom.addEventListener("change",function(i){var h=new FileReader();
h.onload=function(j){e.items.items[2].setValue(j.target.result)
};
h.readAsText(i.target.files[0],"UTF-8")
},true);
b.items.items[1].getEl().dom.addEventListener("change",function(i){var h=new FileReader();
h.onload=function(j){b.items.items[2].setValue(j.target.result)
};
h.readAsText(i.target.files[0],"UTF-8")
},true)
},_loadJSON:function(a){if(a){var b=a.evalJSON();
this.facade.importJSON(a)
}else{this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.jPDLSupport.impFailedJson)
}},_sendRequest:function(b,f,d,e,a){var c=false;
new Ajax.Request(b,{method:f,asynchronous:false,parameters:d,onSuccess:function(g){c=true;
if(e){e(g.responseText)
}}.bind(this),onFailure:function(g){if(a){a()
}else{this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.jPDLSupport.impFailedReq);
ORYX.log.warn("jPDL migration failed: "+g.responseText)
}}.bind(this)});
return c
}});
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.ServiceRepoIntegration=Clazz.extend({repoDialog:undefined,repoContent:undefined,construct:function(a){this.facade=a;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.View.connectServiceRepo,functionality:this.jbpmServiceRepoConnect.bind(this),group:"servicerepogroup",icon:ORYX.BASE_FILE_PATH+"images/repository_rep.gif",description:ORYX.I18N.View.connectServiceRepoDesc,index:4,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)})
}},jbpmServiceRepoConnect:function(){this._showInitialRepoScreen()
},_showInitialRepoScreen:function(){this.repoContent=new Ext.Panel({layout:"table",html:"<br/><br/><br/><br/><center>"+ORYX.I18N.View.noServiceSpecified+"</center>"});
var b=ORYX.Utils.getDialogSize(440,600);
var c=new Ext.Button({text:ORYX.I18N.View.connect,handler:function(){var d="";
var e=this._readCookie("designerservicerepos");
if(e!=null){d=e+","+Ext.getCmp("serviceurlfield").getRawValue()
}else{d=Ext.getCmp("serviceurlfield").getRawValue()
}this._createCookie("designerservicerepos",d,365);
this._updateRepoDialog(Ext.getCmp("serviceurlfield").getRawValue(),b.width);
this.selectedrepourl=Ext.getCmp("serviceurlfield").getRawValue()
}.bind(this)});
var a=b.width/2;
this.repoDialog=new Ext.Window({autoCreate:true,autoScroll:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.View.connectServiceRepoDataTitle,height:b.height,width:b.width,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[this.repoContent],tbar:[this._getRepoCombo(a),c],buttons:[{text:"Install selected item",handler:function(){if(this.mygrid.getSelectionModel().getSelectedCell()!=null){var d=this.mygrid.getSelectionModel().getSelectedCell()[0];
ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.View.installingRepoItem,title:""});
var e=this.mygrid.getStore().getAt(d).get("name");
var f=this.mygrid.getStore().getAt(d).get("category");
Ext.Ajax.request({url:ORYX.PATH+"jbpmservicerepo",method:"POST",success:function(g){try{if(g.responseText=="false"){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.failInstallation,title:""})
}else{ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.View.successInstall,title:""})
}}catch(h){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.failAssetsInstallation+": "+h,title:""})
}}.createDelegate(this),failure:function(){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.failAssetsInstallation+".",title:""})
}.createDelegate(this),params:{action:"install",profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),asset:e,category:f,repourl:this.selectedrepourl}})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.LocalHistory.LocalHistoryView.msg,title:""})
}}.bind(this)},{text:ORYX.I18N.jPDLSupport.close,handler:function(){this.repoDialog.hide();
this.repoDialog.destroy(true);
delete this.repoDialog
}.bind(this)}]});
this.repoDialog.on("hide",function(){if(this.repoDialog){this.repoDialog.destroy(true);
delete this.repoDialog
}});
this.repoDialog.show()
},_getRepoCombo:function(c){var b=new Array();
var g=new Ext.data.SimpleStore({fields:["url","value"],data:[[]]});
var d=this._readCookie("designerservicerepos");
if(d!=null){if(d.startsWith(",")){d=d.substr(1,d.length)
}if(d.endsWith(",")){d=d.substr(0,d.length-1)
}var l=d.split(",");
for(var h=0;
h<l.length;
h++){var e=l[h];
if(e.length>=0){var j=new Array();
j.push(e);
j.push(e);
b.push(j)
}}g.loadData(b);
g.commitChanges()
}else{var a=new Array();
a.push("http://people.redhat.com/tsurdilo/repository");
a.push("http://people.redhat.com/tsurdilo/repository");
b.push(a);
var k=new Array();
k.push("http://people.redhat.com/kverlaen/repository");
k.push("http://people.redhat.com/kverlaen/repository");
b.push(k);
g.loadData(b);
g.commitChanges()
}var f=new Ext.form.ComboBox({id:"serviceurlfield",name:"repourl",forceSelection:false,editable:true,allowBlank:false,displayField:"url",valueField:"value",mode:"local",queryMode:"local",typeAhead:true,value:"",triggerAction:"all",fieldLabel:"Location",width:c,store:g});
return f
},_updateRepoDialog:function(a,b){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.View.connectServiceRepoConnecting,title:""});
Ext.Ajax.request({url:ORYX.PATH+"jbpmservicerepo",method:"POST",success:function(d){try{if((d.responseText=="false")||(d.responseText.startsWith("false||"))){if(this.repoDialog){this.repoDialog.remove(this.repoContent,true)
}this.repoContent=new Ext.Panel({layout:"table",html:"<br/><br/><br/><br/><center>"+ORYX.I18N.View.noServiceSpecified+".</center>"});
this.repoDialog.add(this.repoContent);
this.repoDialog.doLayout();
if(d.responseText.startsWith("false||")){var c=d.responseText.split("||");
ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.failConnectService+" - "+c[1],title:""})
}else{ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.failConnectService,title:""})
}}else{this._showJbpmServiceInfo(d.responseText,a,b)
}}catch(f){if(this.repoDialog){this.repoDialog.remove(this.repoContent,true)
}this.repoContent=new Ext.Panel({layout:"table",html:"<br/><br/><br/><br/><center>"+ORYX.I18N.View.noServiceSpecified+"</center>"});
this.repoDialog.add(this.repoContent);
this.repoDialog.doLayout();
ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.failConnectService+":"+f,title:""})
}}.createDelegate(this),failure:function(){if(this.repoDialog){this.repoDialog.remove(this.repoContent,true)
}this.repoContent=new Ext.Panel({layout:"table",html:"<br/><br/><br/><br/><center>"+ORYX.I18N.View.noServiceSpecified+"</center>"});
this.repoDialog.add(this.repoContent);
this.repoDialog.doLayout();
ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.failConnectService+".",title:""})
},params:{action:"display",profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),repourl:a}})
},_showJbpmServiceInfo:function(f,h,c){var i=f.evalJSON();
var e=[];
var d=0;
for(var g in i){e[d]=i[g];
d++
}this.mystore=new Ext.data.SimpleStore({fields:[{name:"name"},{name:"displayName"},{name:"icon"},{name:"category"},{name:"explanation"},{name:"documentation"},{name:"inputparams"},{name:"results"}],data:e});
var a=c/19;
var b=Ext.id();
this.mygrid=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:this.mystore,id:b,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"icon",header:ORYX.I18N.View.headerIcon,width:a,sortable:true,dataIndex:"icon",renderer:this._renderIcon},{id:"displayName",header:ORYX.I18N.View.headerName,width:a*2,sortable:true,dataIndex:"displayName",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"explanation",header:ORYX.I18N.View.headerExplanation,width:a*2,sortable:true,dataIndex:"explanation",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"documentation",header:ORYX.I18N.View.headerDocumentation,width:a*2,sortable:true,dataIndex:"documentation",renderer:this._renderDocs},{id:"inputparams",header:ORYX.I18N.View.headerInput,width:a*4,sortable:true,dataIndex:"inputparams",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"results",header:ORYX.I18N.View.headerResults,width:a*4,sortable:true,dataIndex:"results",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"category",header:ORYX.I18N.View.headerCategory,width:a*2,sortable:true,dataIndex:"category",editor:new Ext.form.TextField({allowBlank:true,disabled:true})}])});
if(this.repoDialog){this.repoDialog.remove(this.repoContent,true)
}this.repoContent=new Ext.TabPanel({activeTab:0,border:false,width:"100%",height:"100%",tabPosition:"top",layoutOnTabChange:true,deferredRender:false,items:[{title:ORYX.I18N.View.serviceNodes,autoScroll:true,items:[this.mygrid],layout:"fit",margins:"10 10 10 10"}]});
this.repoDialog.add(this.repoContent);
this.repoDialog.doLayout()
},_renderIcon:function(a){return'<img src="'+a+'"/>'
},_renderDocs:function(a){return'<a href="'+a+'" target="_blank">link</a>'
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
}});
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.SavePlugin=Clazz.extend({construct:function(a){this.facade=a;
this.vt;
this.editorLocked=false;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.Save.enableAutosave,functionality:this.enableautosave.bind(this),group:ORYX.I18N.Save.group,icon:ORYX.BASE_FILE_PATH+"images/disk.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/disk.png",description:ORYX.I18N.Save.enableAutosave_desc,index:2,minShape:0,maxShape:0,isEnabled:function(){return !ORYX.AUTOSAVE_ENABLED&&!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.Save.disableAutosave,functionality:this.disableautosave.bind(this),group:ORYX.I18N.Save.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/disk.png",description:ORYX.I18N.Save.disableAutosave_desc,index:3,minShape:0,maxShape:0,isEnabled:function(){return ORYX.AUTOSAVE_ENABLED&&!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)})
}this.facade.registerOnEvent(ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_UNDO_ROLLBACK,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_UNDO_EXECUTE,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDROP_END,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_END,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SHAPE_ADDED,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SHAPE_CREATED,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SHAPE_DELETED,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDOCKER_MOVE_FINISHED,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDOCKER_DOCKED,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DOCKERDRAG,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DOCKER_EVENT,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_UPDATE_TASK_TYPE,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DO_SAVE,this.handleEventDoSave.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DO_CHECKSAVE,this.handleEventDoCheckSave.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_CANCEL_SAVE,this.handleEventCancelSave.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DO_RELOAD,this.handleEventDoRealod.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED,this.handleOpenXMLEditor.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_UPDATE_LOCK,this.handleEventUpdateLock.bind(this));
window.onunload=this.unloadWindow.bind(this)
},handleEventUpdateLock:function(){if(typeof parent.acquireLock==="function"){if(this.editorLocked&&!parent.isLockedByCurrentUser()){this.editorLocked=false
}else{if(!this.editorLocked&&!parent.isLocked()){ORYX.EDITOR.updateViewLockState()
}}}},setUnsaved:function(){ORYX.PROCESS_SAVED=false;
ORYX.EDITOR.updateViewLockState();
if(!this.editorLocked){if(typeof parent.acquireLock==="function"){if(!parent.isLockedByCurrentUser()){parent.acquireLock()
}this.editorLocked=true
}}},saveWithMessage:function(){var a=parent.designersignalassetupdate(ORYX.UUID);
if(a&&a==true){}else{this.save(true)
}},handleEventDoSave:function(){this.setUnsaved();
this.save(true)
},handleEventDoCheckSave:function(a){this.save(true,a.pathuri)
},handleEventCancelSave:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.Save.saveCancelled,title:""})
},handleOpenXMLEditor:function(){if(ORYX.LOADING_ERRORS==true){Ext.MessageBox.confirm("Unable to open Process","Open Process Sources with the XML Editor?",function(a){if(a=="yes"){parent.designeropeninxmleditortab(ORYX.UUID)
}}.bind(this))
}ORYX.LOADING_ERRORS=false
},handleEventDoRealod:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.Save.processReloading,title:""});
new Ajax.Request(ORYX.CONFIG.UUID_URL(),{encoding:"UTF-8",method:"GET",onSuccess:function(b){response=b.responseText;
try{if(response.length!=0){if(response.startsWith("error:")){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.unableReloadContent,title:""})
}else{this.updateProcessOnReload(response.evalJSON())
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.invalidContent,title:""})
}}catch(a){ORYX.LOG.error(a)
}}.createDelegate(this),onFailure:function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.couldNotReload,title:""})
}});
ORYX.PROCESS_SAVED=false
},save:function(c,b){var e=parent.designerIsLatest();
if(!e){ORYX.PROCESS_SAVED=false
}if(!ORYX.PROCESS_SAVED){var a="";
if(b){a=b
}var d="";
if(c&&c==true){d=prompt("Save this item","Check in comment");
if(d==null){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.Save.saveCancelled,title:""});
return
}}Ext.Ajax.request({url:ORYX.PATH+"assetservice",method:"POST",success:function(i){try{if(i.responseText&&i.responseText.length>0){var m=i.responseText.evalJSON();
if(m.errors&&m.errors.length>0){var n=m.errors;
for(var k=0;
k<n.length;
k++){var g=n[k];
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:g.message,title:""})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.Save.saveSuccess,title:"",timeOut:1000,extendedTimeOut:1000});
ORYX.PROCESS_SAVED=true;
if(ORYX.CONFIG.STORESVGONSAVE&&ORYX.CONFIG.STORESVGONSAVE=="true"){var h=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(false));
var o=DataManager.serialize(ORYX.EDITOR.getCanvas().getRootNode().cloneNode(true));
var p=ORYX.EDITOR.getSerializedJSON();
var f=jsonPath(p.evalJSON(),"$.properties.id");
Ext.Ajax.request({url:ORYX.PATH+"transformer",method:"POST",success:function(j){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.Save.saveImageSuccess,title:""})
}.bind(this),failure:function(j,q){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.saveImageFailed,title:""})
}.bind(this),params:{fsvg:Base64.encode(h),rsvg:Base64.encode(o),uuid:window.btoa(encodeURI(ORYX.UUID)),profile:ORYX.PROFILE,transformto:"svg",processid:f}})
}}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.unableToSave+": "+l,title:""})
}}catch(l){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.unableToSave+": "+l,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.unableToSave+".",title:""})
}.bind(this),params:{action:"updateasset",profile:ORYX.PROFILE,assetcontent:window.btoa(encodeURIComponent(ORYX.EDITOR.getSerializedJSON())),pp:ORYX.PREPROCESSING,assetid:window.btoa(encodeURI(ORYX.UUID)),assetcontenttransform:"jsontobpmn2",commitmessage:d,sessionid:ORYX.SESSION_ID,latestpath:a}})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.Save.noChanges,title:""})
}},saveSync:function(){ORYX.EDITOR.updateViewLockState();
if(!ORYX.PROCESS_SAVED&&ORYX.VIEWLOCKED!=true){var k=ORYX.EDITOR.getSerializedJSON();
var a=new XMLHttpRequest;
var b=ORYX.PATH+"assetservice";
var d="action=updateasset&profile="+ORYX.PROFILE+"&pp="+ORYX.PREPROCESSING+"&assetid="+window.btoa(encodeURI(ORYX.UUID))+"&assetcontenttransform=jsontobpmn2&assetcontent="+window.btoa(encodeURIComponent(k));
a.open("POST",b,false);
a.setRequestHeader("Content-type","application/x-www-form-urlencoded");
a.send(d);
if(a.status==200){try{if(a.responseText&&a.responseText.length>0){var h=a.responseText.evalJSON();
if(h.errors&&h.errors.lengt>0){var i=h.errors;
for(var f=0;
f<i.length;
f++){var c=i[f];
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:c.message,title:""})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.Save.saveSuccess,title:"",timeOut:1000,extendedTimeOut:1000});
ORYX.PROCESS_SAVED=true
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.unableToSave+": "+g,title:""})
}}catch(g){alert("error : "+g)
}}}},enableautosave:function(){ORYX.AUTOSAVE_ENABLED=true;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED});
this.vt=window.setInterval((function(){this.save(false)
}).bind(this),30000);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.Save.autosaveEnabled,title:""})
},disableautosave:function(){ORYX.AUTOSAVE_ENABLED=false;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED});
window.clearInterval(this.vt);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.Save.autosaveDisabled,title:""})
},deleteassetnotify:function(){Ext.MessageBox.confirm(ORYX.I18N.Save.deleteConfirm_title,ORYX.I18N.Save.deleteConfirm_msg,function(a){if(a=="yes"){parent.designersignalassetdelete(ORYX.UUID)
}}.bind(this))
},copyassetnotify:function(){Ext.MessageBox.confirm(ORYX.I18N.Save.copyConfirm_title,ORYX.I18N.Save.copyConfirm_msg,function(a){if(a=="yes"){this.save(true);
parent.designersignalassetcopy(ORYX.UUID)
}else{parent.designersignalassetcopy(ORYX.UUID)
}}.bind(this))
},renameassetnotify:function(){if(ORYX.Editor.checkIfSaved()){parent.designersignalassetrename(ORYX.UUID)
}else{Ext.MessageBox.confirm(ORYX.I18N.Save.renameConfirm_title,ORYX.I18N.Save.renameConfirm_msg,function(a){if(a=="yes"){this.save(true);
parent.designersignalassetrename(ORYX.UUID)
}else{parent.designersignalassetrename(ORYX.UUID)
}}.bind(this))
}},unloadWindow:function(){this.saveSync(false)
},clearCanvas:function(){ORYX.EDITOR.getCanvas().nodes.each(function(a){ORYX.EDITOR.deleteShape(a)
}.bind(this));
ORYX.EDITOR.getCanvas().edges.each(function(a){ORYX.EDITOR.deleteShape(a)
}.bind(this))
},updateProcessOnReload:function(a){if(a){try{this.clearCanvas();
this.facade.importJSON(a);
ORYX.PROCESS_SAVED=false;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.Save.reloadSuccess,title:""})
}catch(b){this.facade.importJSON(currentJSON);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.reloadFail,title:""})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.processReloadedInvalid,title:""})
}}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.ShapeMenuPlugin={construct:function(c){this.facade=c;
this.alignGroups=new Hash();
var a=this.facade.getCanvas().getHTMLContainer();
this.shapeMenu=new ORYX.Plugins.ShapeMenu(a);
this.currentShapes=[];
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDROP_START,this.hideShapeMenu.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDROP_END,this.showShapeMenu.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_START,(function(){this.hideShapeMenu();
this.hideMorphMenu()
}).bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_END,this.showShapeMenu.bind(this));
var b=new Ext.dd.DragZone(a.parentNode,{shadow:!Ext.isMac});
b.afterDragDrop=this.afterDragging.bind(this,b);
b.beforeDragOver=this.beforeDragOver.bind(this,b);
this.createdButtons={};
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_STENCIL_SET_LOADED,(function(){this.registryChanged()
}).bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.VOICE_COMMAND_ADD_TASK,this.addNode.bind(this,"Task"));
this.facade.registerOnEvent(ORYX.CONFIG.VOICE_COMMAND_ADD_GATEWAY,this.addNode.bind(this,"Exclusive_Databased_Gateway"));
this.facade.registerOnEvent(ORYX.CONFIG.VOICE_COMMAND_ADD_END_EVENT,this.addNode.bind(this,"EndNoneEvent"));
this.timer=null;
this.resetElements=true
},addNode:function(b){var a={type:"http://b3mn.org/stencilset/bpmn2.0#"+b,namespace:"http://b3mn.org/stencilset/bpmn2.0#",connectingType:true};
this.newShape(a,undefined)
},hideShapeMenu:function(a){window.clearTimeout(this.timer);
this.timer=null;
this.shapeMenu.hide()
},showShapeMenu:function(a){if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){if(!a||this.resetElements){window.clearTimeout(this.timer);
this.timer=window.setTimeout(function(){this.shapeMenu.closeAllButtons();
this.showMorphButton(this.currentShapes);
this.showDictionaryButton();
this.showTaskFormButton();
this.showSourceViewButton();
this.showDataIOEditorButton(this.currentShapes);
this.showStencilButtons(this.currentShapes);
this.shapeMenu.show(this.currentShapes);
this.resetElements=false
}.bind(this),300)
}else{window.clearTimeout(this.timer);
this.timer=null;
this.shapeMenu.show(this.currentShapes)
}}},registryChanged:function(a){if(a){a=a.each(function(d){d.group=d.group?d.group:"unknown"
});
this.pluginsData=a.sortBy(function(d){return(d.group+""+d.index)
})
}this.shapeMenu.removeAllButtons();
this.shapeMenu.setNumberOfButtonsPerLevel(ORYX.CONFIG.SHAPEMENU_RIGHT,2);
this.createdButtons={};
this.createMorphMenu();
if(!this.pluginsData){this.pluginsData=[]
}this.baseMorphStencils=this.facade.getRules().baseMorphs();
var b=this.facade.getRules().containsMorphingRules();
var c=this.facade.getStencilSets();
c.values().each((function(f){var e=f.nodes();
e.each((function(i){if(i.hidden()){return
}var h={type:i.id(),namespace:i.namespace(),connectingType:true};
var g=new ORYX.Plugins.ShapeMenuButton({callback:this.newShape.bind(this,h),icon:i.icon(),align:ORYX.CONFIG.SHAPEMENU_RIGHT,group:0,msg:i.title()+" - "+ORYX.I18N.ShapeMenuPlugin.clickDrag});
this.shapeMenu.addButton(g);
this.createdButtons[i.namespace()+i.type()+i.id()]=g;
Ext.dd.Registry.register(g.node.lastChild,h)
}).bind(this));
var d=f.edges();
d.each((function(i){var h={type:i.id(),namespace:i.namespace()};
var g=new ORYX.Plugins.ShapeMenuButton({callback:this.newShape.bind(this,h),icon:i.icon(),align:ORYX.CONFIG.SHAPEMENU_RIGHT,group:1,msg:(b?ORYX.I18N.Edge:i.title())+" - "+ORYX.I18N.ShapeMenuPlugin.drag});
this.shapeMenu.addButton(g);
this.createdButtons[i.namespace()+i.type()+i.id()]=g;
Ext.dd.Registry.register(g.node.lastChild,h)
}).bind(this))
}).bind(this))
},createMorphMenu:function(){this.morphMenu=new Ext.menu.Menu({id:"Oryx_morph_menu",items:[]});
this.morphMenu.on("mouseover",function(){this.morphMenuHovered=true
},this);
this.morphMenu.on("mouseout",function(){this.morphMenuHovered=false
},this);
var d=new ORYX.Plugins.ShapeMenuButton({hovercallback:(ORYX.CONFIG.ENABLE_MORPHMENU_BY_HOVER?this.showMorphMenu.bind(this):undefined),resetcallback:(ORYX.CONFIG.ENABLE_MORPHMENU_BY_HOVER?this.hideMorphMenu.bind(this):undefined),callback:(ORYX.CONFIG.ENABLE_MORPHMENU_BY_HOVER?undefined:this.toggleMorphMenu.bind(this)),icon:ORYX.BASE_FILE_PATH+"images/wrench_orange.png",align:ORYX.CONFIG.SHAPEMENU_BOTTOM,group:0,msg:ORYX.I18N.ShapeMenuPlugin.morphMsg});
var a=new ORYX.Plugins.ShapeMenuButton({callback:this.addDictionaryItem.bind(this),icon:ORYX.BASE_FILE_PATH+"images/dictionary.png",align:ORYX.CONFIG.SHAPEMENU_TOP,group:0,msg:ORYX.I18N.ShapeMenuPlugin.addTpProcessDic});
var c=new ORYX.Plugins.ShapeMenuButton({callback:this.editTaskForm.bind(this),icon:ORYX.BASE_FILE_PATH+"images/processforms.png",align:ORYX.CONFIG.SHAPEMENU_TOP,group:1,msg:ORYX.I18N.View.editTaskForm});
var e=new ORYX.Plugins.ShapeMenuButton({callback:this.viewNodeSource.bind(this),icon:ORYX.BASE_FILE_PATH+"images/view.png",align:ORYX.CONFIG.SHAPEMENU_TOP,group:2,msg:ORYX.I18N.ShapeMenuPlugin.viewSourceNode});
var b=new ORYX.Plugins.ShapeMenuButton({callback:this.showDataIOEditor.bind(this),icon:ORYX.BASE_FILE_PATH+"images/dataio.png",align:ORYX.CONFIG.SHAPEMENU_TOP,group:3,msg:ORYX.I18N.ShapeMenuPlugin.editDataIO});
this.shapeMenu.setNumberOfButtonsPerLevel(ORYX.CONFIG.SHAPEMENU_BOTTOM,2);
this.shapeMenu.addButton(d);
this.shapeMenu.addButton(a);
this.shapeMenu.addButton(c);
this.shapeMenu.addButton(e);
this.shapeMenu.addButton(b);
this.morphMenu.getEl().appendTo(d.node);
this.morphButton=d;
this.dictionaryButton=a;
this.taskFormButton=c;
this.sourceViewButton=e;
this.dataIOEditorButton=b
},showMorphMenu:function(){this.morphMenu.show(this.morphButton.node);
this._morphMenuShown=true
},hideMorphMenu:function(){this.morphMenu.hide();
this._morphMenuShown=false
},toggleMorphMenu:function(){if(this._morphMenuShown){this.hideMorphMenu()
}else{this.showMorphMenu()
}},addDictionaryItem:function(){var a="";
a=this.currentShapes[0].getLabels()[0].text();
if(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DICTIONARY_ADD,entry:a})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.ShapeMenuPlugin.nameNotSpecified,title:""})
}},editTaskForm:function(){var a=this.currentShapes[0].properties["oryx-taskname"];
if(a&&a.length>0){a=a.replace(/\&/g,"");
a=a.replace(/\s/g,"");
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_TASKFORM_EDIT,tn:a})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failNoTaskName,title:""})
}},viewNodeSource:function(){var a=ORYX.EDITOR.getSerializedJSON();
Ext.Ajax.request({url:ORYX.PATH+"uuidRepository",method:"POST",success:function(f){try{var i=new DOMParser();
var g=i.parseFromString(f.responseText,"text/xml");
var b=g.querySelector("[id="+this.currentShapes[0].resourceId+"]");
if(!b){b=g.querySelector("[id="+this.currentShapes[0].properties["oryx-name"]+"]")
}if(b){var d=new XMLSerializer();
var c=d.serializeToString(b);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NODEXML_SHOW,nodesource:c})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.ShapeMenuPlugin.unableToFindNodeSource,title:""})
}}catch(h){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.convertingToBPMN2Fail+": "+h,title:""})
}Ext.Msg.hide()
}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.convertingToBPMN2Fail+".",title:""})
}.bind(this),params:{action:"toXML",pp:ORYX.PREPROCESSING,profile:ORYX.PROFILE,data:a}})
},showDataIOEditor:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DATAIOEDITOR_SHOW,element:this.currentShapes[0]})
},onSelectionChanged:function(a){var b=a.elements;
this.hideShapeMenu();
this.hideMorphMenu();
if(this.currentShapes.inspect()!==b.inspect()){this.currentShapes=b;
this.resetElements=true;
this.showShapeMenu()
}else{this.showShapeMenu(true)
}},showDictionaryButton:function(){this.dictionaryButton.prepareToShow()
},showTaskFormButton:function(){if(this.currentShapes&&this.currentShapes[0]&&this.currentShapes[0].properties&&this.currentShapes[0].properties["oryx-tasktype"]&&this.currentShapes[0].properties["oryx-tasktype"]=="User"&&ORYX.PRESET_PERSPECTIVE!="ruleflow"){this.taskFormButton.prepareToShow()
}},showSourceViewButton:function(){this.sourceViewButton.group=2;
if(this.currentShapes&&this.currentShapes[0]&&this.currentShapes[0].properties&&this.currentShapes[0].properties["oryx-tasktype"]&&this.currentShapes[0].properties["oryx-tasktype"]=="User"){this.sourceViewButton.prepareToShow()
}else{this.sourceViewButton.group=this.sourceViewButton.group-1;
this.sourceViewButton.prepareToShow()
}},showDataIOEditorButton:function(a){if(a.length!=1){return
}if(!ORYX.DataIOEditorUtils.hasDataIOProperty(a[0])){return
}this.dataIOEditorButton.group=3;
if(this.currentShapes&&this.currentShapes[0]&&this.currentShapes[0].properties&&this.currentShapes[0].properties["oryx-tasktype"]&&this.currentShapes[0].properties["oryx-tasktype"]=="User"){this.dataIOEditorButton.prepareToShow()
}else{this.dataIOEditorButton.group=this.dataIOEditorButton.group-1;
this.dataIOEditorButton.prepareToShow()
}},showMorphButton:function(d){if(d.length!=1){return
}var a=this.facade.getRules().morphStencils({stencil:d[0].getStencil()});
a=a.select(function(e){if(d[0].getStencil().type()==="node"){return this.facade.getRules().canContain({containingShape:d[0].parent,containedStencil:e})
}else{return this.facade.getRules().canConnect({sourceShape:d[0].dockers.first().getDockedShape(),edgeStencil:e,targetShape:d[0].dockers.last().getDockedShape()})
}}.bind(this));
if(a.size()<=1){return
}this.morphMenu.removeAll();
if(d[0].getStencil().id().endsWith("#Task")){var c=ORYX.CALCULATE_CURRENT_PERSPECTIVE()==ORYX.RULEFLOW_PERSPECTIVE;
if(d[0].properties["oryx-tasktype"]!="User"&&!c){var b=new Ext.menu.Item({text:ORYX.I18N.ShapeMenuPlugin.userTask,iconCls:window.SpriteUtils.toUniqueId("stencilsets/bpmn2.0jbpm/icons/activity/list/type.user.png"),disabled:false,disabledClass:ORYX.CONFIG.MORPHITEM_DISABLED,handler:(function(){this.updateTaskType(d[0],"User")
}).bind(this)});
this.morphMenu.add(b)
}if(d[0].properties["oryx-tasktype"]!="Send"&&!c){var b=new Ext.menu.Item({text:ORYX.I18N.ShapeMenuPlugin.sendTask,iconCls:window.SpriteUtils.toUniqueId("stencilsets/bpmn2.0jbpm/icons/activity/list/type.send.png"),disabled:false,disabledClass:ORYX.CONFIG.MORPHITEM_DISABLED,handler:(function(){this.updateTaskType(d[0],"Send")
}).bind(this)});
this.morphMenu.add(b)
}if(d[0].properties["oryx-tasktype"]!="Receive"&&!c){var b=new Ext.menu.Item({text:ORYX.I18N.ShapeMenuPlugin.receiveTask,iconCls:window.SpriteUtils.toUniqueId("stencilsets/bpmn2.0jbpm/icons/activity/list/type.receive.png"),disabled:false,disabledClass:ORYX.CONFIG.MORPHITEM_DISABLED,handler:(function(){this.updateTaskType(d[0],"Receive")
}).bind(this)});
this.morphMenu.add(b)
}if(d[0].properties["oryx-tasktype"]!="Manual"&&!c){var b=new Ext.menu.Item({text:ORYX.I18N.ShapeMenuPlugin.manualTask,iconCls:window.SpriteUtils.toUniqueId("stencilsets/bpmn2.0jbpm/icons/activity/list/type.manual.png"),disabled:false,disabledClass:ORYX.CONFIG.MORPHITEM_DISABLED,handler:(function(){this.updateTaskType(d[0],"Manual")
}).bind(this)});
this.morphMenu.add(b)
}if(d[0].properties["oryx-tasktype"]!="Service"&&!c){var b=new Ext.menu.Item({text:ORYX.I18N.ShapeMenuPlugin.serviceTask,iconCls:window.SpriteUtils.toUniqueId("stencilsets/bpmn2.0jbpm/icons/activity/list/type.service.png"),disabled:false,disabledClass:ORYX.CONFIG.MORPHITEM_DISABLED,handler:(function(){this.updateTaskType(d[0],"Service")
}).bind(this)});
this.morphMenu.add(b)
}if(d[0].properties["oryx-tasktype"]!="Business Rule"){var b=new Ext.menu.Item({text:ORYX.I18N.ShapeMenuPlugin.businessRuleTask,iconCls:window.SpriteUtils.toUniqueId("stencilsets/bpmn2.0jbpm/icons/activity/list/type.business.rule.png"),disabled:false,disabledClass:ORYX.CONFIG.MORPHITEM_DISABLED,handler:(function(){this.updateTaskType(d[0],"Business Rule")
}).bind(this)});
this.morphMenu.add(b)
}if(d[0].properties["oryx-tasktype"]!="Script"){var b=new Ext.menu.Item({text:ORYX.I18N.ShapeMenuPlugin.scriptTask,iconCls:window.SpriteUtils.toUniqueId("stencilsets/bpmn2.0jbpm/icons/activity/list/type.script.png"),disabled:false,disabledClass:ORYX.CONFIG.MORPHITEM_DISABLED,handler:(function(){this.updateTaskType(d[0],"Script")
}).bind(this)});
this.morphMenu.add(b)
}}a=a.sortBy(function(e){return e.position()
});
a.each((function(f){if(!(d[0].properties["oryx-nomorph"]&&d[0].properties["oryx-nomorph"]=="true")){var e=new Ext.menu.Item({text:this.getMorphText(f),iconCls:window.SpriteUtils.toUniqueId("stencilsets/bpmn2.0jbpm/icons/activity/list/type.script.png"),disabled:f.id()==d[0].getStencil().id(),disabledClass:ORYX.CONFIG.MORPHITEM_DISABLED,handler:(function(){this.morphShape(d[0],f)
}).bind(this)});
this.morphMenu.add(e)
}}).bind(this));
this.morphButton.prepareToShow()
},getMorphText:function(a){if(a.id()!==undefined){var b=a.id();
if(b.startsWith(a.namespace())){b=b.substring(a.namespace().length,b.length);
if(ORYX.I18N.ShapeMenuPlugin[b]!==undefined){return ORYX.I18N.ShapeMenuPlugin[b]
}}}return a.title()
},showStencilButtons:function(g){if(g.length!=1){return
}var f=this.facade.getStencilSets()[g[0].getStencil().namespace()];
var c=this.facade.getRules().outgoingEdgeStencils({canvas:this.facade.getCanvas(),sourceShape:g[0]});
var a=new Array();
var d=new Array();
var e=this.facade.getRules().containsMorphingRules();
c.each((function(i){if(e){if(this.baseMorphStencils.include(i)){var j=true
}else{var h=this.facade.getRules().morphStencils({stencil:i});
var j=!h.any((function(k){if(this.baseMorphStencils.include(k)&&c.include(k)){return true
}return d.include(k)
}).bind(this))
}}if(j||!e){if(this.createdButtons[i.namespace()+i.type()+i.id()]){this.createdButtons[i.namespace()+i.type()+i.id()].prepareToShow()
}d.push(i)
}a=a.concat(this.facade.getRules().targetStencils({canvas:this.facade.getCanvas(),sourceShape:g[0],edgeStencil:i}))
}).bind(this));
a.uniq();
var b=new Array();
a.each((function(j){if(e){if(j.type()==="edge"){return
}if(!this.facade.getRules().showInShapeMenu(j)){return
}if(!this.baseMorphStencils.include(j)){var h=this.facade.getRules().morphStencils({stencil:j});
if(h.size()==0){return
}var i=h.any((function(k){if(this.baseMorphStencils.include(k)&&a.include(k)){return true
}return b.include(k)
}).bind(this));
if(i){return
}}}if(this.createdButtons[j.namespace()+j.type()+j.id()]){this.createdButtons[j.namespace()+j.type()+j.id()].prepareToShow()
}b.push(j)
}).bind(this))
},beforeDragOver:function(m,l,b){if(this.shapeMenu.isVisible){this.hideShapeMenu()
}var k=this.facade.eventCoordinates(b.browserEvent);
var r=this.facade.getCanvas().getAbstractShapesAtPosition(k);
if(r.length<=0){return false
}var d=r.last();
if(this._lastOverElement==d){return false
}else{var h=Ext.dd.Registry.getHandle(l.DDM.currentTarget);
if(h.backupOptions){for(key in h.backupOptions){h[key]=h.backupOptions[key]
}delete h.backupOptions
}var n=this.facade.getStencilSets()[h.namespace];
var p=n.stencil(h.type);
var q=r.last();
if(p.type()==="node"){var c=this.facade.getRules().canContain({containingShape:q,containedStencil:p});
if(!c){var o=this.facade.getRules().morphStencils({stencil:p});
for(var g=0;
g<o.size();
g++){c=this.facade.getRules().canContain({containingShape:q,containedStencil:o[g]});
if(c){h.backupOptions=Object.clone(h);
h.type=o[g].id();
h.namespace=o[g].namespace();
break
}}}this._currentReference=c?q:undefined
}else{var j=q,e=q;
var f=false;
while(!f&&j&&!(j instanceof ORYX.Core.Canvas)){q=j;
f=this.facade.getRules().canConnect({sourceShape:this.currentShapes.first(),edgeStencil:p,targetShape:j});
j=j.parent
}if(!f){q=e;
var o=this.facade.getRules().morphStencils({stencil:p});
for(var g=0;
g<o.size();
g++){var j=q;
var f=false;
while(!f&&j&&!(j instanceof ORYX.Core.Canvas)){q=j;
f=this.facade.getRules().canConnect({sourceShape:this.currentShapes.first(),edgeStencil:o[g],targetShape:j});
j=j.parent
}if(f){h.backupOptions=Object.clone(h);
h.type=o[g].id();
h.namespace=o[g].namespace();
break
}else{q=e
}}}this._currentReference=f?q:undefined
}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,highlightId:"shapeMenu",elements:[q],color:this._currentReference?ORYX.CONFIG.SELECTION_VALID_COLOR:ORYX.CONFIG.SELECTION_INVALID_COLOR});
var a=m.getProxy();
a.setStatus(this._currentReference?a.dropAllowed:a.dropNotAllowed);
a.sync()
}this._lastOverElement=d;
return false
},afterDragging:function(i,f,b){if(!(this.currentShapes instanceof Array)||this.currentShapes.length<=0){return
}var e=this.currentShapes;
this._lastOverElement=undefined;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,highlightId:"shapeMenu"});
var h=i.getProxy();
if(h.dropStatus==h.dropNotAllowed){return this.facade.updateSelection()
}if(!this._currentReference){return
}var d=Ext.dd.Registry.getHandle(f.DDM.currentTarget);
d.parent=this._currentReference;
var q=b.getXY();
var j={x:q[0],y:q[1]};
var l=this.facade.getCanvas().node.getScreenCTM();
j.x-=l.e;
j.y-=l.f;
j.x/=l.a;
j.y/=l.d;
j.x-=document.documentElement.scrollLeft;
j.y-=document.documentElement.scrollTop;
var p=this._currentReference.absoluteXY();
j.x-=p.x;
j.y-=p.y;
if(!b.ctrlKey){var k=this.currentShapes[0].bounds.center();
if(20>Math.abs(k.x-j.x)){j.x=k.x
}if(20>Math.abs(k.y-j.y)){j.y=k.y
}}d.position=j;
d.connectedShape=this.currentShapes[0];
if(d.connectingType){var n=this.facade.getStencilSets()[d.namespace];
var m=n.stencil(d.type);
var g={sourceShape:this.currentShapes[0],targetStencil:m};
d.connectingType=this.facade.getRules().connectMorph(g).id()
}if(ORYX.CONFIG.SHAPEMENU_DISABLE_CONNECTED_EDGE===true){delete d.connectingType
}var c=new ORYX.Plugins.ShapeMenuPlugin.CreateCommand(Object.clone(d),this._currentReference,j,this);
var o=this.facade.executeCommands([c]);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SHAPE_ADDED,shape:o});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SHAPE_MENU_CLOSE,source:e,destination:this.currentShapes});
if(d.backupOptions){for(key in d.backupOptions){d[key]=d.backupOptions[key]
}delete d.backupOptions
}this._currentReference=undefined
},newShape:function(f,g){var a=this.facade.getStencilSets()[f.namespace];
var e=a.stencil(f.type);
if(this.facade.getRules().canContain({containingShape:this.currentShapes.first().parent,containedStencil:e})){f.connectedShape=this.currentShapes[0];
f.parent=this.currentShapes.first().parent;
f.containedStencil=e;
var c={sourceShape:this.currentShapes[0],targetStencil:e};
var d=this.facade.getRules().connectMorph(c);
if(!d){return
}f.connectingType=d.id();
if(ORYX.CONFIG.SHAPEMENU_DISABLE_CONNECTED_EDGE===true){delete f.connectingType
}var h=new ORYX.Plugins.ShapeMenuPlugin.CreateCommand(f,undefined,undefined,this);
var b=this.facade.executeCommands([h]);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SHAPE_ADDED,shape:b})
}},updateTaskType:function(a,b){if(a&&b){a.setProperty("oryx-tasktype",b);
a.setProperty("oryx-multipleinstance",false);
a.refresh();
this.facade.setSelection([]);
this.facade.getCanvas().update();
this.facade.updateSelection();
this.facade.setSelection([a]);
this.facade.getCanvas().update();
this.facade.updateSelection();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADED,elements:[a]});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_UPDATE_TASK_TYPE})
}},morphShape:function(a,b){var d=ORYX.Core.Command.extend({construct:function(e,g,f){this.shape=e;
this.stencil=g;
this.facade=f
},execute:function(){var m=this.shape;
var q=this.stencil;
var l=m.resourceId;
var h=m.serialize();
q.properties().each((function(r){if(r.readonly()){h=h.reject(function(s){if(s.prefix==="oryx"&&(s.name==="type"||s.name==="tasktype")){return true
}return s.name==r.id()
})
}}).bind(this));
if(this.newShape){newShape=this.newShape;
this.facade.getCanvas().add(newShape)
}else{newShape=this.facade.createShape({type:q.id(),namespace:q.namespace(),resourceId:l})
}var k=h.find(function(r){return(r.prefix==="oryx"&&r.name==="bounds")
});
var n=null;
if(!this.facade.getRules().preserveBounds(m.getStencil())){var e=k.value.split(",");
if(parseInt(e[0],10)>parseInt(e[2],10)){var i=e[0];
e[0]=e[2];
e[2]=i;
i=e[1];
e[1]=e[3];
e[3]=i
}e[2]=parseInt(e[0],10)+newShape.bounds.width();
e[3]=parseInt(e[1],10)+newShape.bounds.height();
k.value=e.join(",")
}else{var p=m.bounds.height();
var f=m.bounds.width();
if(newShape.minimumSize){if(m.bounds.height()<newShape.minimumSize.height){p=newShape.minimumSize.height
}if(m.bounds.width()<newShape.minimumSize.width){f=newShape.minimumSize.width
}}if(newShape.maximumSize){if(m.bounds.height()>newShape.maximumSize.height){p=newShape.maximumSize.height
}if(m.bounds.width()>newShape.maximumSize.width){f=newShape.maximumSize.width
}}n={a:{x:m.bounds.a.x,y:m.bounds.a.y},b:{x:m.bounds.a.x+f,y:m.bounds.a.y+p}}
}var o=m.bounds.center();
if(n!==null){newShape.bounds.set(n)
}this.setRelatedDockers(m,newShape);
var j=m.node.parentNode;
var g=m.node.nextSibling;
this.facade.deleteShape(m);
newShape.deserialize(h);
if(m.getStencil().property("oryx-bgcolor")&&m.properties["oryx-bgcolor"]&&m.getStencil().property("oryx-bgcolor").value().toUpperCase()==m.properties["oryx-bgcolor"].toUpperCase()){if(newShape.getStencil().property("oryx-bgcolor")){newShape.setProperty("oryx-bgcolor",newShape.getStencil().property("oryx-bgcolor").value())
}}if(n!==null){newShape.bounds.set(n)
}if(newShape.getStencil().type()==="edge"||(newShape.dockers.length==0||!newShape.dockers[0].getDockedShape())){newShape.bounds.centerMoveTo(o)
}if(newShape.getStencil().type()==="node"&&(newShape.dockers.length==0||!newShape.dockers[0].getDockedShape())){this.setRelatedDockers(newShape,newShape)
}if(g){j.insertBefore(newShape.node,g)
}else{j.appendChild(newShape.node)
}this.facade.setSelection([newShape]);
this.facade.getCanvas().update();
this.facade.updateSelection();
this.newShape=newShape
},rollback:function(){if(!this.shape||!this.newShape||!this.newShape.parent){return
}this.newShape.parent.add(this.shape);
this.setRelatedDockers(this.newShape,this.shape);
this.facade.deleteShape(this.newShape);
this.facade.setSelection([this.shape]);
this.facade.getCanvas().update();
this.facade.updateSelection()
},setRelatedDockers:function(e,f){if(e.getStencil().type()==="node"){(e.incoming||[]).concat(e.outgoing||[]).each(function(g){g.dockers.each(function(j){if(j.getDockedShape()==e){var i=Object.clone(j.referencePoint);
var k={x:i.x*f.bounds.width()/e.bounds.width(),y:i.y*f.bounds.height()/e.bounds.height()};
j.setDockedShape(f);
j.setReferencePoint(k);
if(g instanceof ORYX.Core.Edge){j.bounds.centerMoveTo(k)
}else{var h=e.absoluteXY();
j.bounds.centerMoveTo({x:k.x+h.x,y:k.y+h.y})
}}})
});
if(e.dockers.length>0&&e.dockers.first().getDockedShape()){f.dockers.first().setDockedShape(e.dockers.first().getDockedShape());
f.dockers.first().setReferencePoint(Object.clone(e.dockers.first().referencePoint))
}}else{f.dockers.first().setDockedShape(e.dockers.first().getDockedShape());
f.dockers.first().setReferencePoint(e.dockers.first().referencePoint);
f.dockers.last().setDockedShape(e.dockers.last().getDockedShape());
f.dockers.last().setReferencePoint(e.dockers.last().referencePoint)
}}});
var c=new d(a,b,this.facade);
this.facade.executeCommands([c])
}};
ORYX.Plugins.ShapeMenuPlugin=ORYX.Plugins.AbstractPlugin.extend(ORYX.Plugins.ShapeMenuPlugin);
ORYX.Plugins.ShapeMenu={construct:function(a){this.bounds=undefined;
this.shapes=undefined;
this.buttons=[];
this.isVisible=false;
this.node=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",$(a),["div",{id:ORYX.Editor.provideId(),"class":"Oryx_ShapeMenu"}]);
this.alignContainers=new Hash();
this.numberOfButtonsPerLevel=new Hash()
},addButton:function(b){this.buttons.push(b);
if(!this.alignContainers[b.align]){this.alignContainers[b.align]=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",this.node,["div",{"class":b.align}]);
this.node.appendChild(this.alignContainers[b.align]);
var a=false;
this.alignContainers[b.align].addEventListener(ORYX.CONFIG.EVENT_MOUSEOVER,this.hoverAlignContainer.bind(this,b.align),a);
this.alignContainers[b.align].addEventListener(ORYX.CONFIG.EVENT_MOUSEOUT,this.resetAlignContainer.bind(this,b.align),a);
this.alignContainers[b.align].addEventListener(ORYX.CONFIG.EVENT_MOUSEUP,this.hoverAlignContainer.bind(this,b.align),a)
}this.alignContainers[b.align].appendChild(b.node)
},deleteButton:function(a){this.buttons=this.buttons.without(a);
this.node.removeChild(a.node)
},removeAllButtons:function(){var a=this;
this.buttons.each(function(b){if(b.node&&b.node.parentNode){b.node.parentNode.removeChild(b.node)
}});
this.buttons=[]
},closeAllButtons:function(){this.buttons.each(function(a){a.prepareToHide()
});
this.isVisible=false
},show:function(e){if(e.length<=0){return
}this.shapes=e;
var f=undefined;
var h=undefined;
this.shapes.each(function(p){var o=p.node.getScreenCTM();
var q=p.absoluteXY();
o.e=o.a*q.x;
o.f=o.d*q.y;
h=new ORYX.Core.Bounds(o.e,o.f,o.e+o.a*p.bounds.width(),o.f+o.d*p.bounds.height());
if(!f){f=h
}else{f.include(h)
}});
this.bounds=f;
var c=this.bounds;
var k=this.bounds.upperLeft();
var g=0,d=0;
var i=0,j=0;
var b=0,l;
var m=0;
rightButtonGroup=0;
var n=22;
this.getWillShowButtons().sortBy(function(a){return a.group
});
this.getWillShowButtons().each(function(o){var p=this.getNumberOfButtonsPerLevel(o.align);
if(o.align==ORYX.CONFIG.SHAPEMENU_LEFT){if(o.group!=d){g=0;
d=o.group
}var a=Math.floor(g/p);
var q=g%p;
o.setLevel(a);
o.setPosition(k.x-5-(a+1)*n,k.y+p*o.group*n+o.group*0.3*n+q*n);
g++
}else{if(o.align==ORYX.CONFIG.SHAPEMENU_TOP){if(o.group!=j){i=0;
j=o.group
}var a=i%p;
var q=Math.floor(i/p);
o.setLevel(q);
o.setPosition(k.x+p*o.group*n+o.group*0.3*n+a*n,k.y-5-(q+1)*n);
i++
}else{if(o.align==ORYX.CONFIG.SHAPEMENU_BOTTOM){if(o.group!=l){b=0;
l=o.group
}var a=b%p;
var q=Math.floor(b/p);
o.setLevel(q);
o.setPosition(k.x+p*o.group*n+o.group*0.3*n+a*n,k.y+c.height()+5+q*n);
b++
}else{if(o.group!=rightButtonGroup){m=0;
rightButtonGroup=o.group
}var a=Math.floor(m/p);
var q=m%p;
o.setLevel(a);
o.setPosition(k.x+c.width()+5+a*n,k.y+p*o.group*n+o.group*0.3*n+q*n-5);
m++
}}}o.show()
}.bind(this));
this.isVisible=true
},hide:function(){this.buttons.each(function(a){a.hide()
});
this.isVisible=false
},hoverAlignContainer:function(b,a){this.buttons.each(function(c){if(c.align==b){c.showOpaque()
}})
},resetAlignContainer:function(b,a){this.buttons.each(function(c){if(c.align==b){c.showTransparent()
}})
},isHover:function(){return this.buttons.any(function(a){return a.isHover()
})
},getWillShowButtons:function(){return this.buttons.findAll(function(a){return a.willShow
})
},getButtons:function(b,a){return this.getWillShowButtons().findAll(function(c){return c.align==b&&(a===undefined||c.group==a)
})
},setNumberOfButtonsPerLevel:function(b,a){this.numberOfButtonsPerLevel[b]=a
},getNumberOfButtonsPerLevel:function(a){if(this.numberOfButtonsPerLevel[a]){return Math.min(this.getButtons(a,0).length,this.numberOfButtonsPerLevel[a])
}else{return 1
}}};
ORYX.Plugins.ShapeMenu=Clazz.extend(ORYX.Plugins.ShapeMenu);
ORYX.Plugins.ShapeMenuButton={construct:function(b){if(b){this.option=b;
if(!this.option.arguments){this.option.arguments=[]
}}else{}this.parentId=this.option.id?this.option.id:null;
var f=this.option.caption?"Oryx_button_with_caption":"Oryx_button";
this.node=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",$(this.parentId),["div",{"class":f}]);
var c={src:this.option.icon};
if(this.option.msg){c.title=this.option.msg
}if(this.option.icon){if(this.option.icon.startsWith("data")){ORYX.Editor.graft("http://www.w3.org/1999/xhtml",this.node,["img",c])
}else{var e=window.SpriteUtils.toUniqueId(this.option.icon);
ORYX.Editor.graft("http://www.w3.org/1999/xhtml",this.node,["img",{src:ORYX.BASE_FILE_PATH+"lib/ext-2.0.2/resources/images/default/s.gif","class":e,title:this.option.msg}])
}}if(this.option.caption){var d=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",this.node,["span"]);
ORYX.Editor.graft("http://www.w3.org/1999/xhtml",d,this.option.caption)
}var a=false;
this.node.addEventListener(ORYX.CONFIG.EVENT_MOUSEOVER,this.hover.bind(this),a);
this.node.addEventListener(ORYX.CONFIG.EVENT_MOUSEOUT,this.reset.bind(this),a);
this.node.addEventListener(ORYX.CONFIG.EVENT_MOUSEDOWN,this.activate.bind(this),a);
this.node.addEventListener(ORYX.CONFIG.EVENT_MOUSEUP,this.hover.bind(this),a);
this.node.addEventListener("click",this.trigger.bind(this),a);
this.node.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE,this.move.bind(this),a);
this.align=this.option.align?this.option.align:ORYX.CONFIG.SHAPEMENU_RIGHT;
this.group=this.option.group?this.option.group:0;
this.hide();
this.dragStart=false;
this.isVisible=false;
this.willShow=false;
this.resetTimer
},hide:function(){this.node.style.display="none";
this.isVisible=false
},show:function(){this.node.style.display="";
this.node.style.opacity=this.opacity;
this.isVisible=true
},showOpaque:function(){this.node.style.opacity=1
},showTransparent:function(){this.node.style.opacity=this.opacity
},prepareToShow:function(){this.willShow=true
},prepareToHide:function(){this.willShow=false;
this.hide()
},setPosition:function(a,b){this.node.style.left=a+"px";
this.node.style.top=b+"px"
},setLevel:function(a){if(a==0){this.opacity=0.5
}else{if(a==1){this.opacity=0.2
}else{this.opacity=0
}}},setChildWidth:function(a){this.childNode.style.width=a+"px"
},reset:function(a){window.clearTimeout(this.resetTimer);
this.resetTimer=window.setTimeout(this.doReset.bind(this),100);
if(this.option.resetcallback){this.option.arguments.push(a);
var b=this.option.resetcallback.apply(this,this.option.arguments);
this.option.arguments.remove(a)
}},doReset:function(){if(this.node.hasClassName("Oryx_down")){this.node.removeClassName("Oryx_down")
}if(this.node.hasClassName("Oryx_hover")){this.node.removeClassName("Oryx_hover")
}},activate:function(a){this.node.addClassName("Oryx_down");
this.dragStart=true
},isHover:function(){return this.node.hasClassName("Oryx_hover")?true:false
},hover:function(a){window.clearTimeout(this.resetTimer);
this.resetTimer=null;
this.node.addClassName("Oryx_hover");
this.dragStart=false;
if(this.option.hovercallback){this.option.arguments.push(a);
var b=this.option.hovercallback.apply(this,this.option.arguments);
this.option.arguments.remove(a)
}},move:function(a){if(this.dragStart&&this.option.dragcallback){this.option.arguments.push(a);
var b=this.option.dragcallback.apply(this,this.option.arguments);
this.option.arguments.remove(a)
}},trigger:function(a){if(this.option.callback){this.option.arguments.push(a);
var b=this.option.callback.apply(this,this.option.arguments);
this.option.arguments.remove(a)
}this.dragStart=false
},toString:function(){return"HTML-Button "+this.id
}};
ORYX.Plugins.ShapeMenuButton=Clazz.extend(ORYX.Plugins.ShapeMenuButton);
ORYX.Plugins.ShapeMenuPlugin.CreateCommand=ORYX.Core.Command.extend({construct:function(c,b,a,d){this.option=c;
this.currentReference=b;
this.position=a;
this.plugin=d;
this.shape;
this.edge;
this.targetRefPos;
this.sourceRefPos;
this.connectedShape=c.connectedShape;
this.connectingType=c.connectingType;
this.namespace=c.namespace;
this.type=c.type;
this.containedStencil=c.containedStencil;
this.parent=c.parent;
this.currentReference=b;
this.shapeOptions=c.shapeOptions
},execute:function(){var d=false;
if(this.shape){this.shape.properties["oryx-invisid"]=Math.random();
if(this.shape instanceof ORYX.Core.Node){this.parent.add(this.shape);
if(this.edge){this.plugin.facade.getCanvas().add(this.edge);
this.edge.dockers.first().setDockedShape(this.connectedShape);
this.edge.dockers.first().setReferencePoint(this.sourceRefPos);
this.edge.dockers.last().setDockedShape(this.shape);
this.edge.dockers.last().setReferencePoint(this.targetRefPos)
}this.plugin.facade.setSelection([this.shape])
}else{if(this.shape instanceof ORYX.Core.Edge){this.plugin.facade.getCanvas().add(this.shape);
this.shape.dockers.first().setDockedShape(this.connectedShape);
this.shape.dockers.first().setReferencePoint(this.sourceRefPos)
}}d=true
}else{this.shape=this.plugin.facade.createShape(this.option);
this.shape.properties["oryx-invisid"]=Math.random();
this.edge=(!(this.shape instanceof ORYX.Core.Edge))?this.shape.getIncomingShapes().first():undefined
}if(this.currentReference&&this.position){if(this.shape instanceof ORYX.Core.Edge){if(!(this.currentReference instanceof ORYX.Core.Canvas)){this.shape.dockers.last().setDockedShape(this.currentReference);
var g=this.currentReference.absoluteXY();
var e={x:this.position.x-g.x,y:this.position.y-g.y};
this.shape.dockers.last().setReferencePoint(this.currentReference.bounds.midPoint())
}else{this.shape.dockers.last().bounds.centerMoveTo(this.position)
}this.sourceRefPos=this.shape.dockers.first().referencePoint;
this.targetRefPos=this.shape.dockers.last().referencePoint
}else{if(this.edge){this.sourceRefPos=this.edge.dockers.first().referencePoint;
this.targetRefPos=this.edge.dockers.last().referencePoint
}}}else{var c=this.containedStencil;
var a=this.connectedShape;
var f=a.bounds;
var b=this.shape.bounds;
var h=f.center();
if(c.defaultAlign()==="north"){h.y-=(f.height()/2)+ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET+(b.height()/2)
}else{if(c.defaultAlign()==="northeast"){h.x+=(f.width()/2)+ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER+(b.width()/2);
h.y-=(f.height()/2)+ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER+(b.height()/2)
}else{if(c.defaultAlign()==="southeast"){h.x+=(f.width()/2)+ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER+(b.width()/2);
h.y+=(f.height()/2)+ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER+(b.height()/2)
}else{if(c.defaultAlign()==="south"){h.y+=(f.height()/2)+ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET+(b.height()/2)
}else{if(c.defaultAlign()==="southwest"){h.x-=(f.width()/2)+ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER+(b.width()/2);
h.y+=(f.height()/2)+ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER+(b.height()/2)
}else{if(c.defaultAlign()==="west"){h.x-=(f.width()/2)+ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET+(b.width()/2)
}else{if(c.defaultAlign()==="northwest"){h.x-=(f.width()/2)+ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER+(b.width()/2);
h.y-=(f.height()/2)+ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER+(b.height()/2)
}else{h.x+=(f.width()/2)+ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET+(b.width()/2)
}}}}}}}this.shape.bounds.centerMoveTo(h);
if(this.shape instanceof ORYX.Core.Node){(this.shape.dockers||[]).each(function(i){i.bounds.centerMoveTo(h)
})
}this.position=h;
if(this.edge){this.sourceRefPos=this.edge.dockers.first().referencePoint;
this.targetRefPos=this.edge.dockers.last().referencePoint
}}this.plugin.facade.getCanvas().update();
this.plugin.facade.updateSelection();
if(!d){if(this.edge){this.plugin.doLayout(this.edge)
}else{if(this.shape instanceof ORYX.Core.Edge){this.plugin.doLayout(this.shape)
}}}return this.shape
},rollback:function(){this.plugin.facade.deleteShape(this.shape);
if(this.edge){this.plugin.facade.deleteShape(this.edge)
}this.plugin.facade.setSelection(this.plugin.facade.getSelection().without(this.shape,this.edge))
}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.DataIOEditorPlugin={currentElement:undefined,construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DATAIOEDITOR_SHOW,this.showDataIOEditor.bind(this))
},showDataIOEditor:function(a){this.currentElement=a.element;
this.getDataTypesForDataIOEditor(this.currentElement)
},getDataTypesForDataIOEditor:function(b){var a=ORYX.EDITOR.getSerializedJSON();
var c=jsonPath(a.evalJSON(),"$.properties.package");
var d=jsonPath(a.evalJSON(),"$.properties.id");
Ext.Ajax.request({url:ORYX.PATH+"calledelement",method:"POST",success:function(g){try{if(g.responseText.length>=0&&g.responseText!="false"){var f=Ext.decode(g.responseText);
this.doShowDataIOEditor(b,f)
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Unable to find Data Types.",title:""})
}}catch(h){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error retrieving Data Types info  :\n"+h,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error retrieving Data Types info.",title:""})
},params:{profile:ORYX.PROFILE,uuid:ORYX.UUID,ppackage:c,pid:d,action:"showdatatypes"}})
},doShowDataIOEditor:function(a,d){var e="";
var r=new Array();
for(var x in d){var p=d[x];
r.push(p)
}r.sort();
for(var g=0;
g<r.length;
g++){var b=r[g];
var h=b.split(".");
var q=h[h.length-1];
var f=b.substring(0,b.length-(q.length+1));
var k=q+" ["+f+"]:"+b;
e=e+k;
if(g<r.length-1){e=e+","
}}var c="";
var v="String:String, Integer:Integer, Boolean:Boolean, Float:Float, Object:Object, ******:******,"+c+e;
var o=a.getStencil();
var s=undefined;
if(o.property("oryx-name")!==undefined){s=a.properties["oryx-name"]
}var w=undefined;
if(o.property("oryx-datainput")!==undefined){w=a.properties["oryx-datainput"]
}var l=undefined;
if(o.property("oryx-datainputset")!==undefined){l=a.properties["oryx-datainputset"]
}var m=undefined;
if(o.property("oryx-dataoutput")!==undefined){m=a.properties["oryx-dataoutput"]
}var u=undefined;
if(o.property("oryx-dataoutputset")!==undefined){u=a.properties["oryx-dataoutputset"]
}var j=undefined;
if(o.property("oryx-assignments")!==undefined){j=a.properties["oryx-assignments"]
}else{if(o.property("oryx-datainputassociations")!==undefined){j=a.properties["oryx-datainputassociations"]
}else{if(o.property("oryx-dataoutputassociations")!==undefined){j=a.properties["oryx-dataoutputassociations"]
}}}var i=ORYX.DataIOEditorUtils.getProcessVars(a);
var n=ORYX.DataIOEditorUtils.getDisallowedPropertyNames(a);
parent.designersignalshowdataioeditor(s,w,l,m,u,i,j,v,n,function(B){var C=JSON.parse(B);
var y=this.currentElement;
var z=y.getStencil();
var t=new Hash();
var A=new Hash();
if(z.property("oryx-datainput")!==undefined){t["oryx-datainput"]=C.inputVariables;
A["oryx-datainput"]=y.properties["oryx-datainput"]
}if(z.property("oryx-datainputset")!==undefined){t["oryx-datainputset"]=C.inputVariables;
A["oryx-datainputset"]=y.properties["oryx-datainputset"]
}if(z.property("oryx-dataoutput")!==undefined){t["oryx-dataoutput"]=C.outputVariables;
A["oryx-dataoutput"]=y.properties["oryx-dataoutput"]
}if(z.property("oryx-dataoutputset")!==undefined){t["oryx-dataoutputset"]=C.outputVariables;
A["oryx-dataoutputset"]=y.properties["oryx-dataoutputset"]
}if(z.property("oryx-assignments")!==undefined){t["oryx-assignments"]=C.assignments;
A["oryx-assignments"]=y.properties["oryx-assignments"]
}else{if(z.property("oryx-datainputassociations")!==undefined){t["oryx-datainputassociations"]=C.assignments;
A["oryx-datainputassociations"]=y.properties["oryx-datainputassociations"]
}else{if(z.property("oryx-dataoutputassociations")!==undefined){t["oryx-dataoutputassociations"]=C.assignments;
A["oryx-dataoutputassociations"]=y.properties["oryx-dataoutputassociations"]
}}}if(z.property("oryx-assignments")!==undefined){t["oryx-assignmentsview"]=C.variablecountsstring;
A["oryx-assignmentsview"]=y.properties["oryx-assignmentsview"]
}else{if(z.property("oryx-datainputassociations")!==undefined){t["oryx-datainputassociationsview"]=C.variablecountsstring;
A["oryx-datainputassociationsview"]=y.properties["oryx-datainputassociationsview"]
}else{if(z.property("oryx-dataoutputassociations")!==undefined){t["oryx-dataoutputassociationsview"]=C.variablecountsstring;
A["oryx-dataoutputassociationsview"]=y.properties["oryx-dataoutputassociationsview"]
}}}this.setElementProperties(y,t,A)
}.bind(this))
},setElementProperties:function(c,a,e){var d=this.facade;
var b=ORYX.Core.Command.extend({construct:function(){this.newProperties=a;
this.oldProperties=e;
this.selectedElements=[c];
this.facade=d
},execute:function(){this.newProperties.each(function(g){if(!c.getStencil().property(g.key).readonly()){c.setProperty(g.key,g.value)
}}.bind(this));
this.facade.setSelection(this.selectedElements);
this.facade.getCanvas().update();
this.facade.updateSelection()
},rollback:function(){this.oldProperties.each(function(g){if(!c.getStencil().property(g.key).readonly()){c.setProperty(g.key,g.value)
}}.bind(this));
this.facade.setSelection(this.selectedElements);
this.facade.getCanvas().update();
this.facade.updateSelection()
}});
var f=new b();
this.facade.executeCommands([f]);
a.each(function(g){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,elements:[c],key:g.key,value:g.value})
}.bind(this))
}};
ORYX.Plugins.DataIOEditorPlugin=ORYX.Plugins.AbstractPlugin.extend(ORYX.Plugins.DataIOEditorPlugin);
ORYX.DataIOEditorUtils={hasDataIOProperty:function(d){var f=d.getStencil();
var c=["oryx-assignmentsview","oryx-datainputassociationsview","oryx-dataoutputassociationsview","oryx-datainput","oryx-datainputset","oryx-dataoutput","oryx-dataoutputset"];
for(var b=0;
b<c.length;
b++){if(f.property(c[b])!==undefined){var g=f.property(c[b]);
if((g.visible()&&g.visible()==true)&&g.hidden()!=true){var e=d.properties["oryx-tasktype"];
if(g.fortasktypes()&&g.fortasktypes().length>0){var a=g.fortasktypes().split("|");
for(var b=0;
b<a.size();
b++){if(a[b]==e){return true
}}}else{return true
}}}}return false
},getDisallowedPropertyNames:function(a){if(a.properties["oryx-tasktype"]!==undefined&&a.properties["oryx-tasktype"]=="User"){return"GroupId,Skippable,Comment,Description,Priority,Content,TaskName,Locale,CreatedBy,NotCompletedReassign,NotStartedReassign,NotCompletedNotify,NotStartedNotify"
}else{return""
}},getProcessVars:function(c){var e="** "+ORYX.I18N.DataIOEditorPlugin.VariableDefinitions+" **,";
if(c&&c.parent){var d=this.getParentVars(c.parent);
if(d&&d.length>0){e=e+d
}}var a="";
var b=ORYX.EDITOR.getSerializedJSON();
var f=jsonPath(b.evalJSON(),"$.properties.vardefs");
if(f){f.forEach(function(g){if(g.length>0){a=a+g+","
}})
}if(a&&a.length>0){e=e+a
}return e
},getParentVars:function(c){var d="";
if(c){if(c._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#MultipleInstanceSubprocess"||c._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#Subprocess"||c._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#EventSubprocess"||c._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#AdHocSubprocess"){var f=c.properties["oryx-vardefs"];
if(f&&f.length>0){d=d+this.sortVarsString(f)
}if(c._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#MultipleInstanceSubprocess"){var b=c.properties["oryx-multipleinstancedatainput"];
if(b&&b.length>0){d=d+this.sortVarsString(b)
}var a=c.properties["oryx-multipleinstancedataoutput"];
if(a&&a.length>0){d=d+this.sortVarsString(a)
}}}if(c.parent){var e=this.getParentVars(c.parent);
if(e&&e.length>0){d=d+e
}}}return d
},sortVarsString:function(d){if(!d||d.length<1){return""
}var b=d.split(",");
b.sort();
var c="";
for(var a=0;
a<b.length;
a++){c=c+b[a]+","
}return c+","
},setAssignmentsViewProperty:function(f){var i=f.getStencil();
var c=undefined;
if(i.property("oryx-datainput")!==undefined){c=f.properties["oryx-datainput"]
}var d=undefined;
if(i.property("oryx-datainputset")!==undefined){d=f.properties["oryx-datainputset"]
}var j=undefined;
if(i.property("oryx-dataoutput")!==undefined){j=f.properties["oryx-dataoutput"]
}var e=undefined;
if(i.property("oryx-dataoutputset")!==undefined){e=f.properties["oryx-dataoutputset"]
}var a=undefined;
if(i.property("oryx-assignments")!==undefined){a=f.properties["oryx-assignments"]
}else{if(i.property("oryx-datainputassociations")!==undefined){a=f.properties["oryx-datainputassociations"]
}else{if(i.property("oryx-dataoutputassociations")!==undefined){a=f.properties["oryx-dataoutputassociations"]
}}}var h=this.getProcessVars(f);
var g=this.getDisallowedPropertyNames(f);
var b=parent.designersignalgetassignmentsviewproperty(c,d,j,e,h,a,g);
if(b&&b.length>0){if(i.property("oryx-assignmentsview")!==undefined){f.setProperty("oryx-assignmentsview",b)
}else{if(i.property("oryx-datainputassociationsview")!==undefined){f.setProperty("oryx-datainputassociationsview",b)
}else{if(i.property("oryx-dataoutputassociationsview")!==undefined){f.setProperty("oryx-dataoutputassociationsview",b)
}}}}}};
/**
 * Copyright (c) 2006
 * Martin Czuchra, Nicolas Peters, Daniel Polak, Willi Tscheschner
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 **/


if (!ORYX.Plugins) {
	ORYX.Plugins = new Object();
}

ORYX.Plugins.ShapeRepository = {

	facade: undefined,

	construct: function(facade) {
		this.facade = facade;
		this._currentParent;
		this._canContain = undefined;
		this._canAttach  = undefined;
        this._patternData;

        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_STENCIL_SET_LOADED, this.setStencilSets.bind(this));
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_STENCIL_SET_RELOAD, this.setStencilSets.bind(this));

		this.shapeList = new Ext.tree.TreeNode({
			
		});

		var panel = new Ext.tree.TreePanel({
            cls:'shaperepository',
			loader: new Ext.tree.TreeLoader(),
			root: this.shapeList,
			autoScroll:true,
			rootVisible: false,
			lines: false,
			anchors: '0, -30'
		});
		
//		var sorter = new Ext.tree.TreeSorter(panel, {
//		    folderSort: true,
//		    dir: "asc",
//		    sortType: function(node) {
//		        return node.text;
//		    }
//		});
		
		var region = this.facade.addToRegion("west", panel, ORYX.I18N.ShapeRepository.title);

//		Ext.Ajax.request({
//            url: ORYX.PATH + "processinfo",
//            method: 'POST',
//            success: function(request) {
//    	   		try {
//    	   			var infopanel = new Ext.Panel({
//    	   				bodyStyle:'background:#eee;font-size:9px;font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;',
//    	   				autoScroll:true,
//    	   				lines: false,
//    	   				html: request.responseText,
//    	   				title: 'Process Information'
//    	   			});
//    	   			this.facade.addToRegion("west", infopanel);
//    	   		} catch(e) {
//    	   			ORYX.Log.error("Failed to retrieve Process Info :\n" + e);
//    	   		}
//            }.createDelegate(this),
//            failure: function(){
//            	ORYX.Log.error("Failed to retrieve Process Info");
//            },
//            params: {
//            	profile: ORYX.PROFILE,
//            	uuid : ORYX.UUID
//            }
//        });

        Ext.Ajax.request({
            url: ORYX.PATH + "stencilpatterns",
            method: 'POST',
            success: function(response) {
                try {
                    this._patternData = Ext.decode(response.responseText);
                } catch(e) {
                    ORYX.Log.error("Failed to retrieve Stencil Patterns Data :\n" + e);
                }
            }.createDelegate(this),
            failure: function(){
                ORYX.Log.error("Failed to retrieve Stencil Patterns Data");
            },
            params: {
                profile: ORYX.PROFILE,
                uuid :  window.btoa(encodeURI(ORYX.UUID))
            }
        });

		// Create a Drag-Zone for Drag'n'Drop
		var DragZone = new Ext.dd.DragZone(this.shapeList.getUI().getEl(), {shadow: !Ext.isMac});
		DragZone.afterDragDrop = this.drop.bind(this, DragZone);
		DragZone.beforeDragOver = this.beforeDragOver.bind(this, DragZone);
		DragZone.beforeDragEnter = function(){this._lastOverElement = false; return true}.bind(this);
		
		// Load all Stencilssets
		this.setStencilSets();
	},
	
	
	/**
	 * Load all stencilsets in the shaperepository
	 */
	setStencilSets: function() {
		// Remove all childs
		var child = this.shapeList.firstChild;
		while(child) {
			this.shapeList.removeChild(child);
			child = this.shapeList.firstChild;
		}

		// Go thru all Stencilsets and stencils
		this.facade.getStencilSets().values().each((function(sset) {
			
			// For each Stencilset create and add a new Tree-Node
			var stencilSetNode
			
			var typeTitle = ORYX.I18N.propertyNames[sset.title()];
			var extensions = sset.extensions();
//			if (extensions && extensions.size() > 0) {
//				typeTitle += " / " + ORYX.Core.StencilSet.getTranslation(extensions.values()[0], "title");
//			} 

			this.shapeList.appendChild(stencilSetNode = new Ext.tree.TreeNode({
				text:typeTitle, 			// Stencilset Name
				allowDrag:false,
        		allowDrop:false,
				iconCls:'headerShapeRepImg',
	            cls:'headerShapeRep',
				singleClickExpand:true}));
			stencilSetNode.render();
			stencilSetNode.expand();
			// Get Stencils from Stencilset
			var stencils = sset.stencils(this.facade.getCanvas().getStencil(),
										 this.facade.getRules());	
			var treeGroups = new Hash();
			
			// Sort the stencils according to their position and add them to the repository
			stencils = stencils.sortBy(function(value) { return value.position(); } );
			stencils.each((function(value) {
				if (value.hidden()) {
					return;
				}
				
				// Get the groups name
				var groups = value.groups();
				
				// For each Group-Entree
				groups.each((function(group) {
                    var groupText = group;
                    if(ORYX.I18N.propertyNames[group] && ORYX.I18N.propertyNames[group].length > 0) {
                        groupText = ORYX.I18N.propertyNames[group];
                    }
					// If there is a new group
                    if(!treeGroups[group]) {
                        if(Ext.isIE) {
                            // Create a new group
                            treeGroups[group] = new Ext.tree.TreeNode({
                                text: groupText,					// Group-Name
                                allowDrag:false,
                                allowDrop:false,
                                iconCls:'headerShapeRepImg', // Css-Class for Icon
                                cls:'headerShapeRepChild',  // CSS-Class for Stencil-Group
                                singleClickExpand:true,
                                expanded:true});
                            treeGroups[group].expand();
                        } else {
                            // Create a new group
                            treeGroups[group] = new Ext.tree.TreeNode({
                                text: groupText,					// Group-Name
                                allowDrag:false,
                                allowDrop:false,
                                iconCls:'headerShapeRepImg', // Css-Class for Icon
                                cls:'headerShapeRepChild',  // CSS-Class for Stencil-Group
                                singleClickExpand:true});
                        }
						// Add the Group to the ShapeRepository
						stencilSetNode.appendChild(treeGroups[group]);
						treeGroups[group].render();	
					}
					
					// Create the Stencil-Tree-Node
					this.createStencilTreeNode(treeGroups[group], value);	
					
				}).bind(this));
				
				
				
				// If there is no group
				if(groups.length == 0) {
					// Create the Stencil-Tree-Node
					this.createStencilTreeNode(stencilSetNode, value);						
				}

				// sort the groups
				var stencilOrder = ORYX.CONFIG.STENCIL_GROUP_ORDER();
                stencilSetNode.sort(function(a, b) {
                    return stencilOrder[sset.namespace()][a.text] - stencilOrder[sset.namespace()][b.text];
                });

			}).bind(this));
		}).bind(this));
		//if (this.shapeList.firstChild.firstChild) {
		//	this.shapeList.firstChild.firstChild.expand(false, true);
		//}	
	},

	createStencilTreeNode: function(parentTreeNode, stencil) {
        try {
		// Create and add the Stencil to the Group
        var IdParts = stencil.id().split("#");
        var textTitle = ORYX.I18N.propertyNames[IdParts[1]];
        if(!textTitle) {
            textTitle = stencil.title();
        } else {
            if(textTitle.length <= 0) {
                textTitle = stencil.title();
            }
        }
        var newElement;
        // if stencil.icon() is a .png or .gif file, load from image sprite
        if (window.SpriteUtils.isIconFile(stencil.icon())) {
            newElement = new Ext.tree.TreeNode({
                text: textTitle, 		// Text of the stencil
                iconCls: window.SpriteUtils.toUniqueId(stencil.icon()), // set iconCls to sprite css class
                allowDrag: false,					// Don't use the Drag and Drop of Ext-Tree
                allowDrop: false
            });
        }
        else {
            newElement = new Ext.tree.TreeNode({
                text: textTitle, 		// Text of the stencil
                icon:		decodeURIComponent(stencil.icon()),			// Icon of the stencil
                allowDrag: false,					// Don't use the Drag and Drop of Ext-Tree
                allowDrop: false,
                iconCls:	'ShapeRepEntreeImg', 	// CSS-Class for Icon
                cls:		'ShapeRepEntree'		// CSS-Class for the Tree-Entree
            });
        }

        if(parentTreeNode === undefined) {
        } else {
            parentTreeNode.appendChild(newElement);
            newElement.render();
        }

		var ui = newElement.getUI();
		
		// Set the tooltip
		ui.elNode.setAttributeNS(null, "title", stencil.description());
		
		// Register the Stencil on Drag and Drop
		Ext.dd.Registry.register(ui.elNode, {
				node: 		ui.node,
		        handles: 	[ui.elNode, ui.textNode].concat($A(ui.elNode.childNodes)), // Set the Handles
		        isHandle: 	false,
				type:		stencil.id(),			// Set Type of stencil
                title:      stencil.title(),
				namespace:	stencil.namespace()		// Set Namespace of stencil
				});

        }catch(e) {
            // ignore errrors for now
        }
	},
	
	drop: function(dragZone, target, event) {
		this._lastOverElement = undefined;
		
		// Hide the highlighting
		this.facade.raiseEvent({type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE, highlightId:'shapeRepo.added'});
		this.facade.raiseEvent({type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE, highlightId:'shapeRepo.attached'});
		
		// Check if drop is allowed
		var proxy = dragZone.getProxy()
		if(proxy.dropStatus == proxy.dropNotAllowed) { return }
		
		// Check if there is a current Parent
		if(!this._currentParent) { return }
		
		var option = Ext.dd.Registry.getHandle(target.DDM.currentTarget);
		
		var xy = event.getXY();
		var pos = {x: xy[0], y: xy[1]};

		var a = this.facade.getCanvas().node.getScreenCTM();

		// Correcting the UpperLeft-Offset
		pos.x -= a.e; pos.y -= a.f;
		// Correcting the Zoom-Faktor
		pos.x /= a.a; pos.y /= a.d;
		// Correting the ScrollOffset
		pos.x -= document.documentElement.scrollLeft;
		pos.y -= document.documentElement.scrollTop;
		// Correct position of parent
		var parentAbs = this._currentParent.absoluteXY();
		pos.x -= parentAbs.x;
		pos.y -= parentAbs.y;

		// Set position
		option['position'] = pos
		
		// Set parent
		if( this._canAttach &&  this._currentParent instanceof ORYX.Core.Node ){
			option['parent'] = undefined;	
		} else {
			option['parent'] = this._currentParent;
		}
		
		
		var commandClass = ORYX.Core.Command.extend({
			construct: function(option, currentParent, canAttach, position, facade, ttype){
				this.option = option;
				this.currentParent = currentParent;
				this.canAttach = canAttach;
				this.position = position;
				this.facade = facade;
				this.selection = this.facade.getSelection();
				this.shape;
				this.parent;
			},			
			execute: function(){
				if (!this.shape) {
					this.shape 	= this.facade.createShape(option);
					this.parent = this.shape.parent;
				} else {
					this.parent.add(this.shape);
				}
					
				if( this.canAttach &&  this.currentParent instanceof ORYX.Core.Node && this.shape.dockers.length > 0){
					
					var docker = this.shape.dockers[0];
		
					if( this.currentParent.parent instanceof ORYX.Core.Node ) {
						this.currentParent.parent.add( docker.parent );
					}
												
					docker.bounds.centerMoveTo( this.position );
					docker.setDockedShape( this.currentParent );
					//docker.update();	
				}
		
				//this.currentParent.update();
				//this.shape.update();

                if(ttype && ttype.length > 0 && this.shape instanceof ORYX.Core.Node) {
                    this.shape.setProperty("oryx-tasktype", ttype);
                    this.shape.refresh();
                }

				this.facade.setSelection([this.shape]);
				this.facade.getCanvas().update();
				this.facade.updateSelection();
				
				this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DROP_SHAPE, shape:this.shape});
				
			},
			rollback: function(){
				this.facade.deleteShape(this.shape);
				
				//this.currentParent.update();

				this.facade.setSelection(this.selection.without(this.shape));
				this.facade.getCanvas().update();
				this.facade.updateSelection();
				
			}
		});

		var position = this.facade.eventCoordinates( event.browserEvent );
        var typeParts = option.type.split("#");
        var isCustom = false;
        if(ORYX.PREPROCESSING) {
            var customParts = ORYX.PREPROCESSING.split(",");
            for (var i = 0; i < customParts.length; i++) {
                if(customParts[i] == typeParts[1]) {
                    isCustom = true;
                }
            }
        }
        if(typeParts[1].startsWith("wp-") && !isCustom) {
            this.facade.raiseEvent({
                type: ORYX.CONFIG.CREATE_PATTERN,
                pid: typeParts[1],
                pdata: this._patternData,
                pos: position
            });
        } else if(typeParts[1].endsWith("Task") && !isCustom) {
            var ttype = typeParts[1];
            ttype = ttype.substring(0, ttype.length - 4);
            option.type = typeParts[0] + "#Task";

            if(ttype.length < 1) {
                if(option.title == "User" ||
                    option.title == "Send" ||
                    option.title == "Receive" ||
                    option.title == "Manual" ||
                    option.title == "Service" ||
                    option.title == "Business Rule" ||
                    option.title == "Script") {
                    ttype = option.title;
                }
            }

            var command = new commandClass(option, this._currentParent, this._canAttach, position, this.facade, ttype);
            this.facade.executeCommands([command]);
        } else {
           var command = new commandClass(option, this._currentParent, this._canAttach, position, this.facade);
           this.facade.executeCommands([command]);
        }
		this._currentParent = undefined;
	},

	beforeDragOver: function(dragZone, target, event){

		var coord = this.facade.eventCoordinates(event.browserEvent);
		var aShapes = this.facade.getCanvas().getAbstractShapesAtPosition( coord );

		if(aShapes.length <= 0) {
			
				var pr = dragZone.getProxy();
				pr.setStatus(pr.dropNotAllowed);
				pr.sync();
				
				return false;
		}	
		
		var el = aShapes.last();
	
		
		if(aShapes.lenght == 1 && aShapes[0] instanceof ORYX.Core.Canvas) {
			
			return false;
			
		} else {
			// check containment rules
			var option = Ext.dd.Registry.getHandle(target.DDM.currentTarget);

			var stencilSet = this.facade.getStencilSets()[option.namespace];

			var stencil = stencilSet.stencil(option.type);

			if(stencil.type() === "node") {
				
				var parentCandidate = aShapes.reverse().find(function(candidate) {
					return (candidate instanceof ORYX.Core.Canvas 
							|| candidate instanceof ORYX.Core.Node
							|| candidate instanceof ORYX.Core.Edge);
				});
				
				if(  parentCandidate !== this._lastOverElement){
					
					this._canAttach  = undefined;
					this._canContain = undefined;
					
				}
				
				if( parentCandidate ) {
					//check containment rule					
						
					if (!(parentCandidate instanceof ORYX.Core.Canvas) && parentCandidate.isPointOverOffset(coord.x, coord.y) && this._canAttach == undefined) {
					
						this._canAttach = this.facade.getRules().canConnect({
												sourceShape: parentCandidate,
												edgeStencil: stencil,
												targetStencil: stencil
											});
                        if(parentCandidate && parentCandidate.properties['oryx-tasktype'] && parentCandidate.properties['oryx-tasktype'] == "Script") {
                            this._canAttach = false;
                        }
						
						if( this._canAttach ){
							// Show Highlight
							this.facade.raiseEvent({
								type: ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
								highlightId: "shapeRepo.attached",
								elements: [parentCandidate],
								style: ORYX.CONFIG.SELECTION_HIGHLIGHT_STYLE_RECTANGLE,
								color: ORYX.CONFIG.SELECTION_VALID_COLOR
							});
							
							this.facade.raiseEvent({
								type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
								highlightId: "shapeRepo.added"
							});
							
							this._canContain	= undefined;
						} 					
						
					}
					
					if(!(parentCandidate instanceof ORYX.Core.Canvas) && !parentCandidate.isPointOverOffset(coord.x, coord.y)){
						this._canAttach 	= this._canAttach == false ? this._canAttach : undefined;						
					}
					
					if( this._canContain == undefined && !this._canAttach) {
											
						this._canContain = this.facade.getRules().canContain({
															containingShape:parentCandidate, 
															containedStencil:stencil
															});
															
						// Show Highlight
						this.facade.raiseEvent({
															type:		ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW, 
															highlightId:'shapeRepo.added',
															elements:	[parentCandidate],
															color:		this._canContain ? ORYX.CONFIG.SELECTION_VALID_COLOR : ORYX.CONFIG.SELECTION_INVALID_COLOR
														});	
						this.facade.raiseEvent({
															type: 		ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
															highlightId:"shapeRepo.attached"
														});						
					}
						
				
					
					this._currentParent = this._canContain || this._canAttach ? parentCandidate : undefined;
					this._lastOverElement = parentCandidate;
					var pr = dragZone.getProxy();
					pr.setStatus(this._currentParent ? pr.dropAllowed : pr.dropNotAllowed );
					pr.sync();
	
				} 
			} else { //Edge
				this._currentParent = this.facade.getCanvas();
				var pr = dragZone.getProxy();
				pr.setStatus(pr.dropAllowed);
				pr.sync();
			}		
		}
		
		
		return false
	}
}

ORYX.Plugins.ShapeRepository = Clazz.extend(ORYX.Plugins.ShapeRepository);


if(!ORYX.Plugins){ORYX.Plugins=new Object()
}if(!ORYX.FieldEditors){ORYX.FieldEditors={}
}if(!ORYX.AssociationEditors){ORYX.AssociationEditors={}
}if(!ORYX.LabelProviders){ORYX.LabelProviders={}
}Ext.override(Ext.form.ComboBox,{anyMatch:false,caseSensitive:false,doQuery:function(c,b){if(c===undefined||c===null){c=""
}var a={query:c,forceAll:b,combo:this,cancel:false};
if(this.fireEvent("beforequery",a)===false||a.cancel){return false
}c=a.query;
b=a.forceAll;
if(b===true||(c.length>=this.minChars)){if(this.lastQuery!==c){this.lastQuery=c;
if(this.mode=="local"){this.selectedIndex=-1;
if(b){this.store.clearFilter()
}else{this.store.filter(this.displayField,c,this.anyMatch,this.caseSensitive)
}this.onLoad()
}else{this.store.baseParams[this.queryParam]=c;
this.store.load({params:this.getParams(c)});
this.expand()
}}else{this.selectedIndex=-1;
this.onLoad()
}}}});
ORYX.Plugins.PropertyWindow={facade:undefined,construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SHOW_PROPERTYWINDOW,this.init.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED,this.onSelectionChanged.bind(this));
this.init()
},init:function(){this.node=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",null,["div"]);
this.currentDateFormat;
this.popularProperties=[];
this.simulationProperties=[];
this.displayProperties=[];
this.customAssignmentsProperties=[];
this.properties=[];
this.shapeSelection=new Hash();
this.shapeSelection.shapes=new Array();
this.shapeSelection.commonProperties=new Array();
this.shapeSelection.commonPropertiesValues=new Hash();
this.updaterFlag=false;
this.columnModel=new Ext.grid.ColumnModel([{header:ORYX.I18N.PropertyWindow.name,dataIndex:"name",width:90,sortable:true,renderer:this.tooltipRenderer.bind(this),css:"font-weight: bold;"},{header:ORYX.I18N.PropertyWindow.value,dataIndex:"value",id:"propertywindow_column_value",width:110,editor:new Ext.form.TextField({allowBlank:true}),renderer:this.renderer.bind(this)},{header:ORYX.I18N.PropertyWindow.desk,dataIndex:"groupname",hidden:true,sortable:true}]);
this.dataSource=new Ext.data.GroupingStore({proxy:new Ext.data.MemoryProxy(this.properties),reader:new Ext.data.ArrayReader({},[{name:"groupname"},{name:"name"},{name:"value"},{name:"icons"},{name:"gridProperties"}]),sortInfo:{field:"name",direction:"ASC"},groupField:"groupname"});
this.dataSource.load();
this.grid=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,clicksToEdit:1,stripeRows:true,autoExpandColumn:"propertywindow_column_value",width:"auto",colModel:this.columnModel,enableHdMenu:false,view:new Ext.grid.GroupingView({forceFit:false,groupTextTpl:"{[values.rs.first().data.groupname]}"}),store:this.dataSource});
region=this.facade.addToRegion("east",new Ext.Panel({width:400,layout:"anchor",autoScroll:true,autoHeight:true,border:false,items:[this.grid],anchors:"0, -30"}),ORYX.I18N.PropertyWindow.title);
this.grid.on("beforeedit",this.beforeEdit,this,true);
this.grid.on("afteredit",this.afterEdit,this,true);
this.grid.view.on("refresh",this.hideMoreAttrs,this,true);
this.grid.enableColumnMove=false
},selectDiagram:function(){this.shapeSelection.shapes=[this.facade.getCanvas()];
this.setPropertyWindowTitle();
this.identifyCommonProperties();
this.createProperties()
},specialKeyDown:function(b,a){if(b instanceof Ext.form.TextArea&&a.button==ORYX.CONFIG.KEY_Code_enter){return false
}},tooltipRenderer:function(b,c,a){c.cellAttr='title="'+a.data.gridProperties.tooltip+'"';
return b
},renderer:function(b,c,a){this.tooltipRenderer(b,c,a);
if(a.data.gridProperties.labelProvider){return a.data.gridProperties.labelProvider(b)
}if(b instanceof Date){b=b.dateFormat(ORYX.I18N.PropertyWindow.dateFormat)
}else{if(String(b).search("<a href='")<0){b=String(b).gsub("<","&lt;");
b=String(b).gsub(">","&gt;");
b=String(b).gsub("%","&#37;");
b=String(b).gsub("&","&amp;");
if(a.data.gridProperties.type==ORYX.CONFIG.TYPE_COLOR){b="<div class='prop-background-color' style='background-color:"+b+"' />"
}a.data.icons.each(function(d){if(d.name==b){if(d.icon){b="<img src='"+d.icon+"' /> "+b
}}})
}}return b
},beforeEdit:function(c){var d=this.dataSource.getAt(c.row).data.gridProperties.editor;
var a=this.dataSource.getAt(c.row).data.gridProperties.renderer;
if(d){this.facade.disableEvent(ORYX.CONFIG.EVENT_KEYDOWN);
c.grid.getColumnModel().setEditor(1,d);
d.field.row=c.row;
d.render(this.grid);
d.setSize(c.grid.getColumnModel().getColumnWidth(1),d.height)
}else{return false
}var b=this.dataSource.getAt(c.row).data.gridProperties.propId;
this.oldValues=new Hash();
this.shapeSelection.shapes.each(function(e){this.oldValues[e.getId()]=e.properties[b]
}.bind(this))
},afterEdit:function(e){e.grid.getStore().commitChanges();
var c=e.record.data.gridProperties.propId;
var h=this.shapeSelection.shapes;
var b=this.oldValues;
var f=e.value;
var d=this.facade;
var a=ORYX.Core.Command.extend({construct:function(){this.key=c;
this.selectedElements=h;
this.oldValues=b;
this.newValue=f;
this.facade=d
},execute:function(){this.selectedElements.each(function(j){if(!j.getStencil().property(this.key).readonly()){j.setProperty(this.key,this.newValue)
}}.bind(this));
this.facade.setSelection(this.selectedElements);
this.facade.getCanvas().update();
this.facade.updateSelection()
},rollback:function(){this.selectedElements.each(function(j){j.setProperty(this.key,this.oldValues[j.getId()])
}.bind(this));
this.facade.setSelection(this.selectedElements);
this.facade.getCanvas().update();
this.facade.updateSelection()
}});
var g=new a();
this.facade.executeCommands([g]);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,elements:h,key:c,value:e.value})
},editDirectly:function(a,b){this.shapeSelection.shapes.each(function(d){if(!d.getStencil().property(a).readonly()){d.setProperty(a,b)
}}.bind(this));
var c=this.shapeSelection.shapes;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,elements:c,key:a,value:b});
this.facade.getCanvas().update()
},updateAfterInvalid:function(a){this.shapeSelection.shapes.each(function(b){if(!b.getStencil().property(a).readonly()){b.setProperty(a,this.oldValues[b.getId()]);
b.update()
}}.bind(this));
this.facade.getCanvas().update()
},dialogClosed:function(a){var b=this.field?this.field.row:this.row;
this.scope.afterEdit({grid:this.scope.grid,record:this.scope.grid.getStore().getAt(b),value:a});
this.scope.grid.startEditing(b,this.col)
},setPropertyWindowTitle:function(){if(this.shapeSelection.shapes.length==1){var a=this.shapeSelection.shapes.first().getStencil().title();
if(this.shapeSelection.shapes.first()&&this.shapeSelection.shapes.first().properties&&this.shapeSelection.shapes.first().properties["oryx-tasktype"]&&this.shapeSelection.shapes.first().properties["oryx-tasktype"].length>0){a=this.shapeSelection.shapes.first().properties["oryx-tasktype"]
}region.setTitle(ORYX.I18N.PropertyWindow.title+" ("+a+")")
}else{region.setTitle(ORYX.I18N.PropertyWindow.title+" ("+this.shapeSelection.shapes.length+" "+ORYX.I18N.PropertyWindow.selected+")")
}},setCommonPropertiesValues:function(){this.shapeSelection.commonPropertiesValues=new Hash();
this.shapeSelection.commonProperties.each(function(d){var c=d.prefix()+"-"+d.id();
var b=false;
var a=this.shapeSelection.shapes.first();
this.shapeSelection.shapes.each(function(e){if(a.properties[c]!=e.properties[c]){b=true
}}.bind(this));
if(!b){this.shapeSelection.commonPropertiesValues[c]=a.properties[c]
}}.bind(this))
},getStencilSetOfSelection:function(){var a=new Hash();
this.shapeSelection.shapes.each(function(b){a[b.getStencil().id()]=b.getStencil()
});
return a
},identifyCommonProperties:function(){this.shapeSelection.commonProperties.clear();
var d=this.getStencilSetOfSelection();
var c=d.values().first();
var b=d.values().without(c);
if(b.length==0){this.shapeSelection.commonProperties=c.properties()
}else{var a=new Hash();
c.properties().each(function(e){a[e.namespace()+"-"+e.id()+"-"+e.type()]=e
});
b.each(function(e){var f=new Hash();
e.properties().each(function(g){if(a[g.namespace()+"-"+g.id()+"-"+g.type()]){f[g.namespace()+"-"+g.id()+"-"+g.type()]=g
}});
a=f
});
this.shapeSelection.commonProperties=a.values()
}},onSelectionChanged:function(b){this.grid.stopEditing();
this.shapeSelection.shapes=b.elements;
if(b.elements){if(b.elements.length==0){this.shapeSelection.shapes=[this.facade.getCanvas()]
}}else{this.shapeSelection.shapes=[this.facade.getCanvas()]
}if(b.subSelection){this.shapeSelection.shapes=[b.subSelection]
}if(this.shapeSelection.shapes.length==1){if(ORYX.USEOLDDATAASSIGNMENTS==false){var a=this.shapeSelection.shapes[0];
if(ORYX.DataIOEditorUtils.hasDataIOProperty(a)){ORYX.DataIOEditorUtils.setAssignmentsViewProperty(a)
}}}this.setPropertyWindowTitle();
this.identifyCommonProperties();
this.setCommonPropertiesValues();
this.createProperties()
},createProperties:function(){this.properties=[];
this.popularProperties=[];
this.simulationProperties=[];
this.customAssignmentsProperties=[];
this.displayProperties=[];
if(this.shapeSelection.commonProperties){this.shapeSelection.commonProperties.each((function(p,F){var t=p.prefix()+"-"+p.id();
var q=p.title();
var Z=[];
var C=this.shapeSelection.commonPropertiesValues[t];
var N=undefined;
var K=null;
var G=false;
var O=ORYX.FieldEditors[p.type()];
if(O!==undefined){N=O.init.bind(this,t,p,Z,F)();
if(N==null){return
}N.on("beforehide",this.facade.enableEvent.bind(this,ORYX.CONFIG.EVENT_KEYDOWN));
N.on("specialkey",this.specialKeyDown.bind(this))
}else{if(!p.readonly()){switch(p.type()){case ORYX.CONFIG.TYPE_STRING:if(p.wrapLines()){var f=new Ext.form.TextArea({alignment:"tl-tl",allowBlank:p.optional(),msgTarget:"title",maxLength:p.length()});
f.on("keyup",function(k,j){this.editDirectly(t,k.getValue().replace(/\\n/g,"\n"))
}.bind(this));
N=new Ext.Editor(f)
}else{var D=new Ext.form.TextField({allowBlank:p.optional(),msgTarget:"title",maxLength:p.length()});
D.on("keyup",function(j,k){this.editDirectly(t,j.getValue())
}.bind(this));
D.on("blur",function(j){if(!j.isValid(false)){this.updateAfterInvalid(t)
}}.bind(this));
D.on("specialkey",function(j,k){if(!j.isValid(false)){this.updateAfterInvalid(t)
}}.bind(this));
N=new Ext.Editor(D)
}break;
case ORYX.CONFIG.TYPE_BOOLEAN:var n=new Ext.form.Checkbox();
n.on("check",function(k,j){this.editDirectly(t,j)
}.bind(this));
N=new Ext.Editor(n);
break;
case ORYX.CONFIG.TYPE_INTEGER:var z=new Ext.form.NumberField({allowBlank:p.optional(),allowDecimals:false,msgTarget:"title",minValue:p.min(),maxValue:p.max()});
z.on("keyup",function(j,k){this.editDirectly(t,j.getValue())
}.bind(this));
N=new Ext.Editor(z);
break;
case ORYX.CONFIG.TYPE_FLOAT:var z=new Ext.form.NumberField({allowBlank:p.optional(),allowDecimals:true,msgTarget:"title",minValue:p.min(),maxValue:p.max()});
z.on("keyup",function(j,k){this.editDirectly(t,j.getValue())
}.bind(this));
N=new Ext.Editor(z);
break;
case ORYX.CONFIG.TYPE_COLOR:var X=new Ext.ux.ColorField({allowBlank:p.optional(),msgTarget:"title",facade:this.facade});
N=new Ext.Editor(X);
break;
case ORYX.CONFIG.TYPE_CHOICE:var v=p.items();
var y=[];
if(p.id()=="tasktype"&&ORYX.CALCULATE_CURRENT_PERSPECTIVE()==ORYX.RULEFLOW_PERSPECTIVE){v.each(function(j){if(j.value()==C){C=j.title()
}if(j.refToView()[0]){G=true
}if(j.value()=="Business Rule"||j.value()=="Script"||j.value()=="None"){if(ORYX.I18N.propertyNamesTaskType&&ORYX.I18N.propertyNamesTaskType[j.title()]&&ORYX.I18N.propertyNamesTaskType[j.title()].length>0){y.push([j.icon(),ORYX.I18N.propertyNamesTaskType[j.title()],j.value()])
}else{y.push([j.icon(),j.title(),j.value()])
}if(ORYX.I18N.propertyNamesTaskType&&ORYX.I18N.propertyNamesTaskType[j.title()]&&ORYX.I18N.propertyNamesTaskType[j.title()].length>0){Z.push({name:ORYX.I18N.propertyNamesTaskType[j.title()],icon:j.icon()})
}else{Z.push({name:j.title(),icon:j.icon()})
}}})
}else{v.each(function(k){if(k.value()==C){C=k.title()
}if(k.refToView()[0]){G=true
}var j="";
if(ORYX.I18N.propertyNamesValue[k.title()]&&ORYX.I18N.propertyNamesValue[k.title()].length>0){j=ORYX.I18N.propertyNamesValue[k.title()]
}else{j=k.title()
}if(!j){j=k.title()
}y.push([k.icon(),j,k.value()]);
Z.push({name:j,icon:k.icon()})
})
}var b=new Ext.data.SimpleStore({fields:[{name:"icon"},{name:"title"},{name:"value"}],data:y});
var o=new Ext.form.ComboBox({editable:false,tpl:'<tpl for="."><div class="x-combo-list-item">{[(values.icon) ? "<img src=\'" + values.icon + "\' />" : ""]} {title}</div></tpl>',store:b,displayField:"title",valueField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true});
if(p.id()=="tasktype"){o.on("select",function(ad,j,k){this.editDirectly(t,ad.getValue());
var ab=this.facade.getSelection();
var ac=ab.first();
this.facade.setSelection([]);
this.facade.getCanvas().update();
this.facade.updateSelection();
this.facade.setSelection([ac]);
this.facade.getCanvas().update();
this.facade.updateSelection();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADED,elements:[ac]})
}.bind(this))
}else{o.on("select",function(ab,j,k){this.editDirectly(t,ab.getValue())
}.bind(this))
}N=new Ext.Editor(o);
break;
case ORYX.CONFIG.TYPE_DYNAMICCHOICE:var v=p.items();
var y=[];
var aa=false;
var R="";
v.each(function(af){if(af.value()==C){C=af.title()
}if(af.refToView()[0]){G=true
}if(af.needsprop().length>0){aa=true;
R=af.needsprop()
}var ad=ORYX.EDITOR.getSerializedJSON();
var ae=jsonPath(ad.evalJSON(),af.value());
if(ae){if(ae.toString().length>0){for(var ac=0;
ac<ae.length;
ac++){var ag=ae[ac].split(",");
for(var ab=0;
ab<ag.length;
ab++){if(ag[ab].indexOf(":")>0){var k=ag[ab].split(":");
y.push([af.icon(),k[0],k[0]])
}else{if(ag[ab].trim().length>0){y.push([af.icon(),ag[ab],ag[ab]])
}}}}}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.PropertyWindow.noDataAvailableForProp,title:""})
}Z.push({name:af.title(),icon:af.icon()})
});
var b=new Ext.data.SimpleStore({fields:[{name:"icon"},{name:"title"},{name:"value"}],data:y});
var o=new Ext.form.ComboBox({editable:false,tpl:'<tpl for="."><div class="x-combo-list-item">{[(values.icon) ? "<img src=\'" + values.icon + "\' />" : ""]} {title}</div></tpl>',store:b,displayField:"title",valueField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true});
o.on("select",function(af,j,ab){if(aa==true&&R.length>0){var ae=ORYX.EDITOR._pluginFacade.getSelection();
if(ae){var k=ae.first();
var ad="oryx-"+R;
var ac=k.properties[ad];
if(ac!=undefined&&ac.length<1){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"warning",msg:"This property needs the associated property '"+R+"' to be set.",title:""})
}}}this.editDirectly(t,af.getValue())
}.bind(this));
N=new Ext.Editor(o);
break;
case ORYX.CONFIG.TYPE_DYNAMICDATAINPUT:var y=[];
var r=ORYX.EDITOR._pluginFacade.getSelection();
if(r&&r.length==1){var u=r.first();
var s=u.resourceId;
var Y=ORYX.EDITOR.getSerializedJSON();
var P=jsonPath(Y.evalJSON(),"$.childShapes.*");
for(var W=0;
W<P.length;
W++){var h=P[W];
if(h.resourceId==s){var Q=h.properties.datainputset;
if(Q!==undefined){var B=Q.split(",");
for(var V=0;
V<B.length;
V++){var m=B[V];
if(m.indexOf(":")>0){var a=m.split(":");
y.push(["",a[0],a[0]])
}else{y.push(["",m,m])
}}}}}}var b=new Ext.data.SimpleStore({fields:[{name:"icon"},{name:"title"},{name:"value"}],data:y});
var o=new Ext.form.ComboBox({editable:false,tpl:'<tpl for="."><div class="x-combo-list-item">{[(values.icon) ? "<img src=\'" + values.icon + "\' />" : ""]} {title}</div></tpl>',store:b,displayField:"title",valueField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true});
o.on("select",function(ab,j,k){this.editDirectly(t,ab.getValue())
}.bind(this));
N=new Ext.Editor(o);
break;
case ORYX.CONFIG.TYPE_DYNAMICDATAOUTPUT:var y=[];
var r=ORYX.EDITOR._pluginFacade.getSelection();
if(r&&r.length==1){var u=r.first();
var s=u.resourceId;
var Y=ORYX.EDITOR.getSerializedJSON();
var P=jsonPath(Y.evalJSON(),"$.childShapes.*");
for(var W=0;
W<P.length;
W++){var h=P[W];
if(h.resourceId==s){var e=h.properties.dataoutputset;
if(e!==undefined){var g=e.split(",");
for(var S=0;
S<g.length;
S++){var m=g[S];
if(m.indexOf(":")>0){var a=m.split(":");
y.push(["",a[0],a[0]])
}else{if(m.length>0){y.push(["",m,m])
}}}}}}}var b=new Ext.data.SimpleStore({fields:[{name:"icon"},{name:"title"},{name:"value"}],data:y});
var o=new Ext.form.ComboBox({editable:false,tpl:'<tpl for="."><div class="x-combo-list-item">{[(values.icon) ? "<img src=\'" + values.icon + "\' />" : ""]} {title}</div></tpl>',store:b,displayField:"title",valueField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true});
o.on("select",function(ab,j,k){this.editDirectly(t,ab.getValue())
}.bind(this));
N=new Ext.Editor(o);
break;
case ORYX.CONFIG.TYPE_DYNAMICGATEWAYCONNECTIONS:var U=ORYX.Config.FACADE.getSelection();
var y=[];
if(U&&U.length==1){var u=U.first();
var s=u.resourceId;
var Y=ORYX.EDITOR.getSerializedJSON();
var x=new XMLHttpRequest;
var d=ORYX.PATH+"processinfo";
var c="uuid="+window.btoa(encodeURI(ORYX.UUID))+"&ppdata="+ORYX.PREPROCESSING+"&profile="+ORYX.PROFILE+"&gatewayid="+s+"&json="+encodeURIComponent(Y);
x.open("POST",d,false);
x.setRequestHeader("Content-type","application/x-www-form-urlencoded");
x.send(c);
if(x.status==200){var J=x.responseText.evalJSON();
for(var W=0;
W<J.length;
W++){var h=J[W];
y.push(["",h.sequenceflowinfo,h.sequenceflowinfo])
}}else{ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.errorDetOutConnections,title:""})
}}var b=new Ext.data.SimpleStore({fields:[{name:"icon"},{name:"title"},{name:"value"}],data:y});
var o=new Ext.form.ComboBox({editable:false,tpl:'<tpl for="."><div class="x-combo-list-item">{[(values.icon) ? "<img src=\'" + values.icon + "\' />" : ""]} {title}</div></tpl>',store:b,displayField:"title",valueField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true});
o.on("select",function(ab,j,k){this.editDirectly(t,ab.getValue())
}.bind(this));
N=new Ext.Editor(o);
break;
case ORYX.CONFIG.TYPE_DATE:var I=ORYX.I18N.PropertyWindow.dateFormat;
if(!(C instanceof Date)){C=Date.parseDate(C,I)
}N=new Ext.Editor(new Ext.form.DateField({allowBlank:p.optional(),format:I,msgTarget:"title"}));
break;
case ORYX.CONFIG.TYPE_TEXT:var E=new Ext.form.ComplexTextField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_ENCODED_TEXT:var E=new Ext.form.ComplexEncodedTextField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_VARDEF:var E=new Ext.form.ComplexVardefField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_EXPRESSION:var E=new Ext.form.ConditionExpressionEditorField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_CALLEDELEMENT:var E=new Ext.form.ComplexCalledElementField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_RULEFLOW_GROUP:var E=new Ext.form.ComplexRuleflowGroupElementField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_CUSTOM:var E=new Ext.form.ComplexCustomField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade,title:(ORYX.I18N.propertyNames[p.id()]&&ORYX.I18N.propertyNames[p.id()].length>0)?ORYX.I18N.propertyNames[p.id()]:p.title(),attr:C});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_ACTION:var E=new Ext.form.ComplexActionsField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_GLOBAL:var E=new Ext.form.ComplexGlobalsField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_IMPORT:var E=new Ext.form.ComplexImportsField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_REASSIGNMENT:var E=new Ext.form.ComplexReassignmentField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_NOTIFICATIONS:var E=new Ext.form.ComplexNotificationsField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_DATAINPUT:var E=new Ext.form.ComplexDataInputField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_DATAINPUT_SINGLE:var E=new Ext.form.ComplexDataInputFieldSingle({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_DATAOUTPUT:var E=new Ext.form.ComplexDataOutputField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_DATAOUTPUT_SINGLE:var E=new Ext.form.ComplexDataOutputFieldSingle({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_DATAASSIGNMENT:var E=new Ext.form.ComplexDataAssignmenField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade,shapes:this.shapeSelection.shapes});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_VISUALDATAASSIGNMENTS:var E=new Ext.form.ComplexVisualDataAssignmentField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade,shapes:this.shapeSelection.shapes});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_COMPLEX:var E=new Ext.form.ComplexListField({allowBlank:p.optional()},p.complexItems(),t,this.facade);
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case"CPNString":var D=new Ext.form.TextField({allowBlank:p.optional(),msgTarget:"title",maxLength:p.length(),enableKeyEvents:true});
D.on("keyup",function(j,k){this.editDirectly(t,j.getValue())
}.bind(this));
N=new Ext.Editor(D);
break;
default:var D=new Ext.form.TextField({allowBlank:p.optional(),msgTarget:"title",maxLength:p.length(),enableKeyEvents:true});
D.on("keyup",function(j,k){this.editDirectly(t,j.getValue())
}.bind(this));
N=new Ext.Editor(D)
}N.on("beforehide",this.facade.enableEvent.bind(this,ORYX.CONFIG.EVENT_KEYDOWN));
N.on("specialkey",this.specialKeyDown.bind(this))
}else{if(p.type()===ORYX.CONFIG.TYPE_URL||p.type()===ORYX.CONFIG.TYPE_DIAGRAM_LINK){C=String(C).search("http")!==0?("http://"+C):C;
C="<a href='"+C+"' target='_blank'>"+C.split("://")[1]+"</a>"
}}}if((p.visible()&&p.visible()==true)&&p.hidden()!=true&&(p.id()!="origbordercolor"&&p.id()!="origbgcolor"&&p.id()!="isselectable")){var H=true;
if(this.shapeSelection.shapes.length==1){if(p.fortasktypes()&&p.fortasktypes().length>0){var l=false;
var A=p.fortasktypes().split("|");
for(var W=0;
W<A.size();
W++){if(A[W]==this.shapeSelection.shapes.first().properties["oryx-tasktype"]){l=true
}}if(!l){H=false
}}if(p.ifproptrue()&&p.ifproptrue().length>0){var w=false;
var M=p.ifproptrue();
if(this.shapeSelection.shapes.first().properties["oryx-"+M]&&this.shapeSelection.shapes.first().properties["oryx-"+M]=="true"){w=true
}if(!w){H=false
}}if(p.fordistribution()&&p.fordistribution().length>0){var L=false;
var A=p.fordistribution().split("|");
for(var V=0;
V<A.size();
V++){if(A[V]==this.shapeSelection.shapes.first().properties["oryx-distributiontype"]){L=true
}}if(!L){H=false
}}}if(H){if(p.popular()){p.setPopular()
}if(p.simulation()){p.setSimulation()
}if(p.customassignment()){p.setCustomassignment()
}if(p.display()){p.setDisplay()
}if(p.extra()){p.setExtra()
}if(p.customassignment()){var T=(ORYX.I18N.propertyNames[p.id()]&&ORYX.I18N.propertyNames[p.id()].length>0)?ORYX.I18N.propertyNames[p.id()]:q;
this.properties.push(["Assignments",T,C,Z,{editor:N,propId:t,type:p.type(),tooltip:(ORYX.I18N.propertyNames[p.id()+"_desc"]&&ORYX.I18N.propertyNames[p.id()+"_desc"].length>0)?ORYX.I18N.propertyNames[p.id()+"_desc"]:p.description(),renderer:K,labelProvider:this.getLabelProvider(p)}])
}else{if(p.extra()){var T=(ORYX.I18N.propertyNames[p.id()]&&ORYX.I18N.propertyNames[p.id()].length>0)?ORYX.I18N.propertyNames[p.id()]:q;
this.properties.push([ORYX.I18N.PropertyWindow.moreProps,T,C,Z,{editor:N,propId:t,type:p.type(),tooltip:(ORYX.I18N.propertyNames[p.id()+"_desc"]&&ORYX.I18N.propertyNames[p.id()+"_desc"].length>0)?ORYX.I18N.propertyNames[p.id()+"_desc"]:p.description(),renderer:K,labelProvider:this.getLabelProvider(p)}])
}else{if(p.simulation()){var T=(ORYX.I18N.propertyNames[p.id()]&&ORYX.I18N.propertyNames[p.id()].length>0)?ORYX.I18N.propertyNames[p.id()]:q;
this.simulationProperties.push([ORYX.I18N.PropertyWindow.simulationProps,T,C,Z,{editor:N,propId:t,type:p.type(),tooltip:(ORYX.I18N.propertyNames[p.id()+"_desc"]&&ORYX.I18N.propertyNames[p.id()+"_desc"].length>0)?ORYX.I18N.propertyNames[p.id()+"_desc"]:p.description(),renderer:K,labelProvider:this.getLabelProvider(p)}])
}else{if(p.display()){var T=(ORYX.I18N.propertyNames[p.id()]&&ORYX.I18N.propertyNames[p.id()].length>0)?ORYX.I18N.propertyNames[p.id()]:q;
this.displayProperties.push([ORYX.I18N.PropertyWindow.displayProps,T,C,Z,{editor:N,propId:t,type:p.type(),tooltip:(ORYX.I18N.propertyNames[p.id()+"_desc"]&&ORYX.I18N.propertyNames[p.id()+"_desc"].length>0)?ORYX.I18N.propertyNames[p.id()+"_desc"]:p.description(),renderer:K,labelProvider:this.getLabelProvider(p)}])
}else{var T=(ORYX.I18N.propertyNames[p.id()]&&ORYX.I18N.propertyNames[p.id()].length>0)?ORYX.I18N.propertyNames[p.id()]:q;
this.popularProperties.push([ORYX.I18N.PropertyWindow.oftenUsed,T,C,Z,{editor:N,propId:t,type:p.type(),tooltip:(ORYX.I18N.propertyNames[p.id()+"_desc"]&&ORYX.I18N.propertyNames[p.id()+"_desc"].length>0)?ORYX.I18N.propertyNames[p.id()+"_desc"]:p.description(),renderer:K,labelProvider:this.getLabelProvider(p)}])
}}}}}}}).bind(this))
}this.setProperties()
},getLabelProvider:function(a){lp=ORYX.LabelProviders[a.labelProvider()];
if(lp){return lp(a)
}return null
},hideMoreAttrs:function(a){if(this.properties.length<=0){return
}this.grid.view.un("refresh",this.hideMoreAttrs,this)
},setProperties:function(){var d=this.popularProperties.concat(this.properties);
var a=d.concat(this.simulationProperties);
var c=a.concat(this.customAssignmentsProperties);
var b=c.concat(this.displayProperties);
this.dataSource.loadData(b)
}};
ORYX.Plugins.PropertyWindow=Clazz.extend(ORYX.Plugins.PropertyWindow);
Ext.form.ComplexListField=function(b,a,c,d){Ext.form.ComplexListField.superclass.constructor.call(this,b);
this.items=a;
this.key=c;
this.facade=d
};
Ext.extend(Ext.form.ComplexListField,Ext.form.TriggerField,{triggerClass:"x-form-complex-trigger",readOnly:true,emptyText:ORYX.I18N.PropertyWindow.clickIcon,editable:false,readOnly:true,buildValue:function(){var f=this.grid.getStore();
f.commitChanges();
if(f.getCount()==0){return""
}var d="[";
for(var c=0;
c<f.getCount();
c++){var e=f.getAt(c);
d+="{";
for(var a=0;
a<this.items.length;
a++){var b=this.items[a].id();
d+=b+":"+(""+e.get(b)).toJSON();
if(a<(this.items.length-1)){d+=", "
}}d+="}";
if(c<(f.getCount()-1)){d+=", "
}}d+="]";
d="{'totalCount':"+f.getCount().toJSON()+", 'items':"+d+"}";
return Object.toJSON(d.evalJSON())
},getFieldKey:function(){return this.key
},getValue:function(){if(this.grid){return this.buildValue()
}else{if(this.data==undefined){return""
}else{return this.data
}}},setValue:function(a){if(a.length>0){if(this.data==undefined){this.data=a
}}},keydownHandler:function(a){return false
},dialogListeners:{show:function(){this.onFocus();
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_KEYDOWN,this.keydownHandler.bind(this));
this.facade.disableEvent(ORYX.CONFIG.EVENT_KEYDOWN);
return
},hide:function(){var a=this.dialogListeners;
this.dialog.un("show",a.show,this);
this.dialog.un("hide",a.hide,this);
this.dialog.destroy(true);
this.grid.destroy(true);
delete this.grid;
delete this.dialog;
this.facade.unregisterOnEvent(ORYX.CONFIG.EVENT_KEYDOWN,this.keydownHandler.bind(this));
this.facade.enableEvent(ORYX.CONFIG.EVENT_KEYDOWN);
this.fireEvent("dialogClosed",this.data);
Ext.form.ComplexListField.superclass.setValue.call(this,this.data)
}},buildInitial:function(f,a){var b=new Hash();
for(var c=0;
c<a.length;
c++){var e=a[c].id();
b[e]=a[c].value()
}var d=Ext.data.Record.create(f);
return new d(b)
},buildColumnModel:function(n){var k=[];
for(var d=0;
d<this.items.length;
d++){var a=this.items[d].id();
var e=this.items[d].name();
var b=this.items[d].width();
var j=this.items[d].type();
var f;
if(j==ORYX.CONFIG.TYPE_STRING){f=new Ext.form.TextField({allowBlank:this.items[d].optional(),width:b})
}else{if(j==ORYX.CONFIG.TYPE_CHOICE){var h=this.items[d].items();
var m=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",n,["select",{style:"display:none"}]);
var l=new Ext.Template('<option value="{value}">{value}</option>');
h.each(function(o){l.append(m,{value:o.value()})
});
f=new Ext.form.ComboBox({editable:false,typeAhead:true,triggerAction:"all",transform:m,lazyRender:true,msgTarget:"title",width:b})
}else{if(j==ORYX.CONFIG.TYPE_DYNAMICCHOICE){var h=this.items[d].items();
var m=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",n,["select",{style:"display:none"}]);
var l=new Ext.Template('<option value="{value}">{value}</option>');
var g=false;
var c="";
h.each(function(t){if(t.needsprop()&&t.needsprop().length>0){g=true;
c=t.needsprop()
}var r=ORYX.EDITOR.getSerializedJSON();
var s=jsonPath(r.evalJSON(),t.value());
if(s){if(s.toString().length>0){for(var q=0;
q<s.length;
q++){var u=s[q].split(",");
for(var p=0;
p<u.length;
p++){if(u[p].indexOf(":")>0){var o=u[p].split(":");
l.append(m,{value:o[0]})
}else{l.append(m,{value:u[p]})
}}}}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.PropertyWindow.noDataAvailableForProp,title:""})
}});
f=new Ext.form.ComboBox({editable:false,typeAhead:true,triggerAction:"all",transform:m,lazyRender:true,msgTarget:"title",width:b});
f.on("select",function(u,o,q){if(g==true&&c.length>0){var t=ORYX.EDITOR._pluginFacade.getSelection();
if(t&&t.length==1){var p=t.first();
var s="oryx-"+c;
var r=p.properties[s];
if(r&&r.length<1){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"warning",msg:"This property needs the associated property '"+c+"' to be set.",title:""})
}}}}.bind(this))
}else{if(j==ORYX.CONFIG.TYPE_BOOLEAN){f=new Ext.form.Checkbox({width:b})
}else{if(j=="xpath"){f=new Ext.form.TextField({allowBlank:this.items[d].optional(),width:b})
}}}}}k.push({id:a,header:e,dataIndex:a,resizable:true,editor:f,width:b})
}return new Ext.grid.ColumnModel(k)
},afterEdit:function(a){a.grid.getStore().commitChanges()
},beforeEdit:function(h){var a=this.grid.getView().getScrollState();
var b=h.column;
var p=h.row;
var e=this.grid.getColumnModel().config[b].id;
for(var g=0;
g<this.items.length;
g++){var o=this.items[g];
var m=o.disable();
if(m!=undefined){var n=this.grid.getStore().getAt(p).get(o.id());
for(var d=0;
d<m.length;
d++){var f=m[d];
if(f.value==n){for(var c=0;
c<f.items.length;
c++){var l=f.items[c];
if(l==e){this.grid.getColumnModel().getCellEditor(b,p).disable();
return
}}}}}}this.grid.getColumnModel().getCellEditor(b,p).enable()
},onTriggerClick:function(){if(this.disabled){return
}var dialogWidth=0;
var recordType=[];
for(var i=0;
i<this.items.length;
i++){var id=this.items[i].id();
var width=this.items[i].width();
var type=this.items[i].type();
if((type==ORYX.CONFIG.TYPE_CHOICE)||(type==ORYX.CONFIG.TYPE_DYNAMICCHOICE)){type=ORYX.CONFIG.TYPE_STRING
}dialogWidth+=width;
recordType[i]={name:id,type:type}
}if(dialogWidth>800){dialogWidth=800
}dialogWidth+=22;
var data=this.data;
if(data==""){data="{}"
}var ds=new Ext.data.Store({proxy:new Ext.data.MemoryProxy(eval("("+data+")")),reader:new Ext.data.JsonReader({root:"items",totalProperty:"totalCount"},recordType)});
ds.load();
var cm=this.buildColumnModel();
this.grid=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:ds,cm:cm,stripeRows:true,clicksToEdit:1,selModel:new Ext.grid.CellSelectionModel()});
var toolbar=new Ext.Toolbar([{text:ORYX.I18N.PropertyWindow.add,handler:function(){var ds=this.grid.getStore();
var index=ds.getCount();
this.grid.stopEditing();
var p=this.buildInitial(recordType,this.items);
ds.insert(index,p);
ds.commitChanges();
this.grid.startEditing(index,0)
}.bind(this)},{text:ORYX.I18N.PropertyWindow.rem,handler:function(){var ds=this.grid.getStore();
var selection=this.grid.getSelectionModel().getSelectedCell();
if(selection==undefined){return
}this.grid.getSelectionModel().clearSelections();
this.grid.stopEditing();
var record=ds.getAt(selection[0]);
ds.remove(record);
ds.commitChanges()
}.bind(this)}]);
this.dialog=new Ext.Window({autoScroll:true,autoCreate:true,title:ORYX.I18N.PropertyWindow.complex,height:350,width:dialogWidth,modal:true,collapsible:false,fixedcenter:true,shadow:true,proxyDrag:true,keys:[{key:27,fn:function(){this.dialog.hide
}.bind(this)}],items:[toolbar,this.grid],bodyStyle:"background-color:#FFFFFF",buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){this.grid.getView().refresh();
this.grid.stopEditing();
this.data=this.buildValue();
this.dialog.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){this.dialog.destroy()
}.bind(this)}]});
this.dialog.on(Ext.apply({},this.dialogListeners,{scope:this}));
this.dialog.show();
this.grid.on("beforeedit",this.beforeEdit,this,true);
this.grid.on("afteredit",this.afterEdit,this,true);
this.grid.render()
}});
Ext.form.ComplexTextField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}var b=new Ext.form.TextArea({anchor:"100% 100%",value:this.value,listeners:{focus:function(){this.facade.disableEvent(ORYX.CONFIG.EVENT_KEYDOWN)
}.bind(this)}});
var c=ORYX.Utils.getDialogSize(500,500);
var a=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.text,width:c.width,height:c.height,modal:true,collapsible:false,fixedcenter:true,shadow:true,proxyDrag:true,keys:[{key:27,fn:function(){a.hide()
}.bind(this)}],items:[b],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
a.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var d=b.getValue();
this.setValue(d);
this.dataSource.getAt(this.row).set("value",d);
this.dataSource.commitChanges();
a.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){a.destroy()
}.bind(this)}]});
a.show();
b.render();
this.grid.stopEditing();
b.focus(false,100)
}});
Ext.form.ComplexEncodedTextField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}var b=new Ext.form.TextArea({anchor:"100% 100%",value:Ext.util.Format.htmlDecode(this.value),listeners:{focus:function(){this.facade.disableEvent(ORYX.CONFIG.EVENT_KEYDOWN)
}.bind(this)}});
var c=ORYX.Utils.getDialogSize(500,500);
var a=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.text,width:c.width,height:c.height,modal:true,collapsible:false,fixedcenter:true,shadow:true,proxyDrag:true,keys:[{key:27,fn:function(){a.hide()
}.bind(this)}],items:[b],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
a.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var d=Ext.util.Format.htmlEncode(b.getValue());
this.setValue(d);
this.dataSource.getAt(this.row).set("value",d);
this.dataSource.commitChanges();
a.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){a.destroy()
}.bind(this)}]});
a.show();
b.render();
this.grid.stopEditing();
b.focus(false,100)
}});
Ext.form.ComplexCustomField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}Ext.Ajax.request({url:ORYX.PATH+"customeditors",method:"POST",success:function(a){try{if(a.responseText&&a.responseText.length>0){var d=a.responseText.evalJSON();
var c=d.editors;
if(c[this.title]){var g=ORYX.Utils.getDialogSize(300,450);
var b=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.customEditorFor+" "+this.title,height:g.height,width:g.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){b.hide()
}.bind(this)}],items:[{xtype:"component",id:"customeditorswindow",autoEl:{tag:"iframe",src:c[this.title],width:"100%",height:"100%"}}],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
b.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var e=document.getElementById("customeditorswindow").contentWindow.getEditorValue();
this.setValue(e);
this.dataSource.getAt(this.row).set("value",e);
this.dataSource.commitChanges();
b.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){b.destroy()
}.bind(this)}]});
b.show();
this.grid.stopEditing()
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.unableFindCustomEditor+" "+this.title,title:""})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.invalidCustomEditorData,title:""})
}}catch(f){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.errorApplyingCustomEditor+":\n"+f,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.errorApplyingCustomEditor+".",title:""})
},params:{profile:ORYX.PROFILE,uuid:ORYX.UUID}})
}});
Ext.form.ComplexNotificationsField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}var p=Ext.data.Record.create([{name:"type"},{name:"expires"},{name:"from"},{name:"tousers"},{name:"togroups"},{name:"replyto"},{name:"subject"},{name:"body"}]);
var b=new Ext.data.MemoryProxy({root:[]});
var z=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},p),proxy:b,sorters:[{property:"subject",direction:"ASC"},{property:"from",direction:"ASC"},{property:"tousers",direction:"ASC"},{property:"togroups",direction:"ASC"}]});
z.load();
if(this.value.length>0){this.value=this.value.replace(/\[/g,"");
this.value=this.value.replace(/\]/g,"");
var q=this.value.split("^");
for(var x=0;
x<q.length;
x++){var e=q[x];
if(e.indexOf("@")>0){var t=e.split("@");
var s=t[0];
var k=t[1];
var g=t[2];
var A="";
var l="";
var f="";
var m="";
var h="";
var d="";
if(s.indexOf("|")>0){var C=s.split("|");
for(var v=0;
v<C.length;
v++){var c=C[v].split(/:(.+)?/)[0];
var w=C[v].split(/:(.+)?/)[1];
if(c=="from"){A=w
}else{if(c=="tousers"){l=w
}else{if(c=="togroups"){f=w
}else{if(c=="replyTo"){m=w
}else{if(c=="subject"){h=w
}else{if(c=="body"){d=w.replace(/<br\s?\/?>/g,"\n")
}}}}}}}}else{var c=s.split(/:(.+)?/)[0];
var w=s.split(/:(.+)?/)[1];
if(c=="from"){A=w
}else{if(c=="tousers"){l=w
}else{if(c=="togroups"){f=w
}else{if(c=="replyTo"){m=w
}else{if(c=="subject"){h=w
}else{if(c=="body"){d=w.replace(/<br\s?\/?>/g,"\n")
}}}}}}}z.add(new p({type:g==undefined?"":g,expires:k==undefined?"":k,from:A==undefined?"":A,tousers:l==undefined?"":l,togroups:f==undefined?"":f,replyto:m==undefined?"":m,subject:h==undefined?"":h,body:d==undefined?"":d}))
}}}var n=new Array();
var E=new Array();
E.push("not-started");
E.push("not-started");
n.push(E);
var u=new Array();
u.push("not-completed");
u.push("not-completed");
n.push(u);
var B=ORYX.Utils.getDialogSize(350,900);
var D=(B.width-80)/8;
var r=Ext.id();
var o=new Extensive.grid.ItemDeleter();
var a=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:z,id:r,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"type",header:ORYX.I18N.PropertyWindow.type,width:D,dataIndex:"type",editor:new Ext.form.ComboBox({id:"typeCombo",valueField:"name",displayField:"value",labelStyle:"display:none",submitValue:true,typeAhead:false,queryMode:"local",mode:"local",triggerAction:"all",selectOnFocus:true,hideTrigger:false,forceSelection:false,selectOnFocus:true,autoSelect:false,store:new Ext.data.SimpleStore({fields:["name","value"],data:n})})},{id:"expires",header:ORYX.I18N.PropertyWindow.expiresAt,width:D,dataIndex:"expires",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"from",header:ORYX.I18N.PropertyWindow.from,width:D,dataIndex:"from",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_\,]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"tousers",header:ORYX.I18N.PropertyWindow.toUsers,width:D,dataIndex:"tousers",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_\,]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"togroups",header:ORYX.I18N.PropertyWindow.toGroups,width:D,dataIndex:"togroups",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_\,]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"replyto",header:ORYX.I18N.PropertyWindow.replyTo,width:D,dataIndex:"replyto",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_\,]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"subject",header:ORYX.I18N.PropertyWindow.subject,width:D,dataIndex:"subject",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_\,]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"body",header:ORYX.I18N.PropertyWindow.body,width:D,dataIndex:"body",editor:new Ext.form.TextArea({allowBlank:true,disableKeyFilter:true,grow:true}),renderer:Ext.util.Format.htmlEncode},o]),selModel:o,autoHeight:true,tbar:[{text:ORYX.I18N.PropertyWindow.addNotification,handler:function(){z.add(new p({expires:"",from:"",tousers:"",type:"not-started",togroups:"",replyto:"",subject:"",body:""}));
a.fireEvent("cellclick",a,z.getCount()-1,1,null)
}}],clicksToEdit:1,listeners:{beforeedit:function(j){if(j.column!=8){return true
}var F=new Ext.form.TextArea({anchor:"100% 100%",value:j.value});
var G=ORYX.Utils.getDialogSize(300,350);
var H=new Ext.Window({id:"notificationsBodyEditorWindow",layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.addNotificationInstructions,height:G.height,width:G.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,proxyDrag:true,items:[F],buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var I=F.getValue();
j.record.set("body",I);
H.destroy()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){H.destroy()
}.bind(this)}]});
H.show();
return false
}.bind(this)}});
var y=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.editorForNotifications,height:B.height,width:B.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){y.hide()
}.bind(this)}],items:[a],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
y.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var j="";
a.stopEditing();
a.getView().refresh();
z.data.each(function(){if((this.data.tousers.length>0||this.data.togroups.length>0)&&this.data.subject.length>0&&this.data.body.length>0){j+="[from:"+this.data.from+"|tousers:"+this.data.tousers+"|togroups:"+this.data.togroups+"|replyTo:"+this.data.replyto+"|subject:"+this.data.subject+"|body:"+this.data.body.replace(/\r\n|\r|\n/g,"<br />")+"]";
j+="@["+this.data.expires+"]";
j+="@"+this.data.type;
j+="^"
}});
if(j.length>0){j=j.slice(0,-1)
}this.setValue(j);
this.dataSource.getAt(this.row).set("value",j);
this.dataSource.commitChanges();
y.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){y.destroy()
}.bind(this)}]});
y.show();
a.render();
this.grid.stopEditing();
a.focus(false,100)
}});
Ext.form.ComplexReassignmentField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}var c=Ext.data.Record.create([{name:"users"},{name:"groups"},{name:"expires"},{name:"type"}]);
var l=new Ext.data.MemoryProxy({root:[]});
var d=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},c),proxy:l,sorters:[{property:"users",direction:"ASC"},{property:"groups",direction:"ASC"}]});
d.load();
if(this.value.length>0){this.value=this.value.replace(/\[/g,"");
this.value=this.value.replace(/\]/g,"");
var n=this.value.split("^");
for(var t=0;
t<n.length;
t++){var e=n[t];
if(e.indexOf("@")>0){var q=e.split("@");
var p=q[0];
var h=q[1];
var f=q[2];
var g="";
var s="";
if(p.indexOf("|")>0){var x=p.split("|");
var z=x[0];
var m=x[1];
var b=z.split(":");
if(b[0]=="users"){g=b[1]
}else{if(b[0]=="groups"){s=b[1]
}}var u=m.split(":");
if(u[0]=="users"){g=u[1]
}else{if(u[0]=="groups"){s=u[1]
}}}else{var B=p.split(":");
if(B[0]=="users"){g=B[1]
}else{if(B[0]=="groups"){s=B[1]
}}}d.add(new c({users:g,groups:s,expires:h,type:f}))
}}}var j=new Array();
var A=new Array();
A.push("not-started");
A.push("not-started");
j.push(A);
var r=new Array();
r.push("not-completed");
r.push("not-completed");
j.push(r);
var o=Ext.id();
var k=new Extensive.grid.ItemDeleter();
var w=ORYX.Utils.getDialogSize(350,700);
var y=(w.width-80)/4;
var a=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:d,id:o,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"users",header:ORYX.I18N.PropertyWindow.users,width:y,dataIndex:"users",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_\,]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"groups",header:ORYX.I18N.PropertyWindow.groups,width:y,dataIndex:"groups",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_\,]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"expires",header:ORYX.I18N.PropertyWindow.expiresAt,width:y,dataIndex:"expires",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"type",header:ORYX.I18N.PropertyWindow.type,width:y,dataIndex:"type",editor:new Ext.form.ComboBox({id:"typeCombo",valueField:"name",displayField:"value",labelStyle:"display:none",submitValue:true,typeAhead:false,queryMode:"local",mode:"local",triggerAction:"all",selectOnFocus:true,hideTrigger:false,forceSelection:false,selectOnFocus:true,autoSelect:false,store:new Ext.data.SimpleStore({fields:["name","value"],data:j})})},k]),selModel:k,autoHeight:true,tbar:[{text:ORYX.I18N.PropertyWindow.addReassignment,handler:function(){d.add(new c({users:"",groups:"",expires:"",type:"not-started"}));
a.fireEvent("cellclick",a,d.getCount()-1,1,null)
}}],clicksToEdit:1});
var v=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.editorForReassignment,height:w.height,width:w.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){v.hide()
}.bind(this)}],items:[a],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
v.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var C="";
a.stopEditing();
a.getView().refresh();
d.data.each(function(){if((this.data.users.length>0||this.data.groups.length>0)&&this.data.expires.length>0&&this.data.type.length>0){C+="[users:"+this.data.users+"|groups:"+this.data.groups+"]";
C+="@["+this.data.expires+"]";
C+="@"+this.data.type;
C+="^"
}});
if(C.length>0){C=C.slice(0,-1)
}this.setValue(C);
this.dataSource.getAt(this.row).set("value",C);
this.dataSource.commitChanges();
v.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){v.destroy()
}.bind(this)}]});
v.show();
a.render();
this.grid.stopEditing();
a.focus(false,100)
}});
Ext.form.ComplexImportsField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}var a=ORYX.EDITOR.getSerializedJSON();
var b=jsonPath(a.evalJSON(),"$.properties.package");
var c=jsonPath(a.evalJSON(),"$.properties.id");
Ext.Ajax.request({url:ORYX.PATH+"calledelement",method:"POST",success:function(l){try{if(l.responseText.length>=0&&l.responseText!="false"){var x=Ext.decode(l.responseText);
var o=new Array();
var S=new Array();
S.push("String");
S.push("String");
o.push(S);
var k=new Array();
k.push("Integer");
k.push("Integer");
o.push(k);
var G=new Array();
G.push("Boolean");
G.push("Boolean");
o.push(G);
var v=new Array();
v.push("Float");
v.push("Float");
o.push(v);
var C=new Array();
C.push("Object");
C.push("Object");
o.push(C);
var f=new Array();
f.push("**********");
f.push("**********");
o.push(f);
var d=new Array();
for(var u in x){var z=x[u];
d.push(z)
}d.sort();
for(var K=0;
K<d.length;
K++){var M=new Array();
var g=d[K];
var w=g.split(".");
var Q=w[w.length-1];
var E=g.substring(0,g.length-(Q.length+1));
M.push(Q+" ["+E+"]");
M.push(d[K]);
o.push(M)
}var H=Ext.data.Record.create([{name:"type"},{name:"classname"},{name:"customclassname"},{name:"wsdllocation"},{name:"wsdlnamespace"}]);
var P=new Ext.data.MemoryProxy({root:[]});
var n=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},H),proxy:P,sorters:[{property:"type",direction:"ASC"}]});
n.load();
if(this.value.length>0){var r=this.value.split(",");
for(var O=0;
O<r.length;
O++){var T="";
var h,s,I;
var q=r[O];
var j=q.split("|");
if(j[1]=="default"){T="default";
h=j[0];
s="";
I=""
}else{T="wsdl";
h="";
s=j[0];
I=j[1]
}var p=false;
for(var u in x){var z=x[u];
if(z==h){p=true
}}if(p){n.add(new H({type:T,classname:h,customclassname:"",wsdllocation:s,wsdlnamespace:I}))
}else{n.add(new H({type:T,classname:"",customclassname:h,wsdllocation:s,wsdlnamespace:I}))
}}}var m=new Extensive.grid.ItemDeleter();
var D=new Array();
var L=new Array();
L.push("default");
L.push("default");
D.push(L);
var A=new Array();
A.push("wsdl");
A.push("wsdl");
D.push(A);
var y=ORYX.Utils.getDialogSize(400,900);
var B=(y.width-80)/5;
var F=Ext.id();
var J=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:n,id:F,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"imptype",header:ORYX.I18N.PropertyWindow.importType,width:B,dataIndex:"type",editor:new Ext.form.ComboBox({id:"importTypeCombo",typeAhead:true,anyMatch:true,valueField:"name",displayField:"value",labelStyle:"display:none",submitValue:true,typeAhead:false,queryMode:"local",mode:"local",triggerAction:"all",selectOnFocus:true,hideTrigger:false,forceSelection:false,selectOnFocus:true,autoSelect:false,store:new Ext.data.SimpleStore({fields:["name","value"],data:D})})},{id:"classname",header:"Defined Class Name",width:B,dataIndex:"classname",editor:new Ext.form.ComboBox({id:"customTypeCombo",typeAhead:true,anyMatch:true,valueField:"value",displayField:"name",labelStyle:"display:none",submitValue:true,typeAhead:false,queryMode:"local",mode:"local",triggerAction:"all",selectOnFocus:true,hideTrigger:false,forceSelection:false,selectOnFocus:true,autoSelect:false,store:new Ext.data.SimpleStore({fields:["name","value"],data:o})})},{id:"customclassname",header:"Custom Class Name",width:B,dataIndex:"customclassname",editor:new Ext.form.TextField({allowBlank:true})},{id:"wsdllocation",header:ORYX.I18N.PropertyWindow.wsdlLocation,width:B,dataIndex:"wsdllocation",editor:new Ext.form.TextField({allowBlank:true})},{id:"wsdlnamespace",header:ORYX.I18N.PropertyWindow.wsdlNamespace,width:B,dataIndex:"wsdlnamespace",editor:new Ext.form.TextField({allowBlank:true})},m]),selModel:m,autoHeight:true,tbar:[{text:ORYX.I18N.PropertyWindow.addImport,handler:function(){n.add(new H({type:"default",classname:"",customclassname:"",wsdllocation:"",wsdlnamespace:""}));
J.fireEvent("cellclick",J,n.getCount()-1,1,null)
}}],clicksToEdit:1});
var N=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.editorForImports,height:y.height,width:y.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){N.hide()
}.bind(this)}],items:[J],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
N.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var e="";
J.getView().refresh();
J.stopEditing();
n.data.each(function(){if(this.data.type=="default"){if(this.data.classname.length>0){e+=this.data.classname+"|"+this.data.type+","
}else{e+=this.data.customclassname+"|"+this.data.type+","
}}if(this.data.type=="wsdl"){e+=this.data.wsdllocation+"|"+this.data.wsdlnamespace+"|"+this.data.type+","
}});
if(e.length>0){e=e.slice(0,-1)
}this.setValue(e);
this.dataSource.getAt(this.row).set("value",e);
this.dataSource.commitChanges();
N.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){N.destroy()
}.bind(this)}]});
N.show();
J.render();
this.grid.stopEditing();
J.focus(false,100)
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Unable to find Data Types.",title:""})
}}catch(R){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error retrieving Data Types info  :\n"+R,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error retrieving Data Types info.",title:""})
},params:{profile:ORYX.PROFILE,uuid:ORYX.UUID,ppackage:b,pid:c,action:"showdatatypes"}})
}});
Ext.form.ComplexActionsField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}var h=Ext.data.Record.create([{name:"action"}]);
var l=new Ext.data.MemoryProxy({root:[]});
var e=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},h),proxy:l,sorters:[{property:"action",direction:"ASC"}]});
e.load();
if(this.value.length>0){var k=this.value.split("|");
for(var g=0;
g<k.length;
g++){var c=k[g];
e.add(new h({action:c}))
}}var j=new Extensive.grid.ItemDeleter();
var d=Ext.id();
var b=ORYX.Utils.getDialogSize(300,450);
var f=b.width-80;
var a=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:e,id:d,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"action",header:ORYX.I18N.PropertyWindow.action,width:f,dataIndex:"action",editor:new Ext.form.TextField({allowBlank:true})},j]),selModel:j,autoHeight:true,tbar:[{text:ORYX.I18N.PropertyWindow.addAction,handler:function(){e.add(new h({action:""}));
a.fireEvent("cellclick",a,e.getCount()-1,1,null)
}}],clicksToEdit:1});
var m=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.editorForActions,height:b.height,width:b.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){m.hide()
}.bind(this)}],items:[a],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
m.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var n="";
a.getView().refresh();
a.stopEditing();
e.data.each(function(){if(this.data.action.length>0){n+=this.data.action+"|"
}});
if(n.length>0){n=n.slice(0,-1)
}this.setValue(n);
this.dataSource.getAt(this.row).set("value",n);
this.dataSource.commitChanges();
m.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){m.destroy()
}.bind(this)}]});
m.show();
a.render();
this.grid.stopEditing();
a.focus(false,100)
}});
Ext.form.ComplexDataAssignmenField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,addParentVars:function(h,d,m,c,b,l){if(h){if(h._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#MultipleInstanceSubprocess"||h._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#Subprocess"||h._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#AdHocSubprocess"){var j=h.properties["oryx-vardefs"];
if(j&&j.length>0){var o=j.split(",");
for(var f=0;
f<o.length;
f++){var e=o[f];
var g=new Array();
if(e.indexOf(":")>0){var p=e.split(":");
g.push(p[0]);
g.push(p[0]);
b[p[0]]=p[1];
l.push(p[0])
}else{g.push(e);
g.push(e);
b[e]="java.lang.String";
l.push(e)
}m.push(g);
c.push(g)
}}if(h._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#MultipleInstanceSubprocess"){var a=h.properties["oryx-multipleinstancedatainput"];
if(a&&a.length>0){var g=new Array();
g.push(a);
g.push(a);
b[a]="java.lang.String";
l.push(g);
m.push(g);
c.push(g)
}var n=h.properties["oryx-multipleinstancedataoutput"];
if(n&&n.length>0){var g=new Array();
g.push(n);
g.push(n);
b[n]="java.lang.String";
l.push(g);
m.push(g);
c.push(g)
}}}if(h.parent){this.addParentVars(h.parent,d,m,c,b,l)
}}},onTriggerClick:function(){if(this.disabled){return undefined
}if(ORYX.USEOLDDATAASSIGNMENTS==false){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DATAIOEDITOR_SHOW,element:this.shapes[0]});
return
}var c="";
var f=ORYX.EDITOR.getSerializedJSON();
var G=jsonPath(f.evalJSON(),"$.properties.vardefs");
var m=new Array();
var p=new Array();
var d=new Hash();
var j=new Array();
var b=new Array();
var B=new Array();
var l=new Array();
var o=new Array();
var t=new Array();
p.push("");
var z=false;
var J=ORYX.EDITOR._pluginFacade.getSelection();
if(J){var y=J.first();
if(y&&y.parent){if(y.parent._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#MultipleInstanceSubprocess"||y.parent._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#Subprocess"||y.parent._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#AdHocSubprocess"){p.push("** Process/Subprocess Definitions **");
m.push(p);
j.push(p);
z=true
}this.addParentVars(y.parent,p,m,j,d,b)
}}if(!z){p.push("** Variable Definitions **");
m.push(p);
j.push(p)
}if(G){G.forEach(function(O){if(O.length>0){var L=O.split(",");
for(var N=0;
N<L.length;
N++){var M=new Array();
var P=L[N];
if(P.indexOf(":")>0){var K=P.split(":");
M.push(K[0]);
M.push(K[0]);
d[K[0]]=K[1];
b.push(K[0])
}else{M.push(P);
M.push(P);
d[P]="java.lang.String";
b.push(P)
}m.push(M);
j.push(M)
}}})
}var q=new Array();
q.push("");
q.push("** Data Inputs **");
m.push(q);
B.push(q);
Ext.each(this.dataSource.data.items,function(O){if((O.data.gridProperties.propId=="oryx-datainputset")||(O.data.gridProperties.propId=="oryx-datainput")){var L=O.data.value.split(",");
for(var N=0;
N<L.length;
N++){var P=L[N];
var M=new Array();
if(P.indexOf(":")>0){var K=P.split(":");
M.push(K[0]);
M.push(K[0]);
d[K[0]]=K[1];
l.push(K[0])
}else{M.push(P);
M.push(P);
d[P]="java.lang.String";
l.push(P)
}m.push(M);
B.push(M)
}}});
var s=new Array();
s.push("");
s.push("** Data Outputs **");
m.push(s);
o.push(s);
Ext.each(this.dataSource.data.items,function(O){if((O.data.gridProperties.propId=="oryx-dataoutputset")||(O.data.gridProperties.propId=="oryx-dataoutput")){var M=O.data.value.split(",");
for(var K=0;
K<M.length;
K++){var P=M[K];
var N=new Array();
if(P.indexOf(":")>0){var L=P.split(":");
N.push(L[0]);
N.push(L[0]);
d[L[0]]=L[1];
t.push(L[0])
}else{N.push(P);
N.push(P);
d[P]="java.lang.String";
t.push(P)
}m.push(N);
o.push(N)
}}});
var e=Ext.data.Record.create([{name:"atype"},{name:"from"},{name:"type"},{name:"to"},{name:"tostr"},{name:"dataType"},{name:"assignment"}]);
var E=new Ext.data.MemoryProxy({root:[]});
var I=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},e),proxy:E,sorters:[{property:"atype",direction:"ASC"},{property:"from",direction:"ASC"},{property:"to",direction:"ASC"},{property:"tostr",direction:"ASC"}]});
I.load();
if(this.value.length>0){var w=this.value.split(",");
for(var D=0;
D<w.length;
D++){var g=w[D];
if(g.indexOf("=")>0){var A=g.split("=");
if(A[0].startsWith("[din]")){var r=A[0].slice(5,A[0].length);
var C=d[r];
if(!C){C="java.lang.String"
}A.shift();
var h=A.join("=").replace(/\#\#/g,",");
h=h.replace(/\|\|/g,"=");
I.add(new e({atype:"DataInput",from:r,type:"is equal to",to:"",tostr:h,dataType:C,assignment:"false"}))
}else{if(A[0].startsWith("[dout]")){var r=A[0].slice(6,A[0].length);
var C=d[r];
if(!C){C="java.lang.String"
}A.shift();
var h=A.join("=").replace(/\#\#/g,",");
h=h.replace(/\|\|/g,"=");
I.add(new e({atype:"DataOutput",from:r,type:"is equal to",to:"",tostr:h,dataType:C,assignment:"false"}))
}else{var r=A[0];
var C=d[r];
if(!C){C="java.lang.String"
}A.shift();
var h=A.join("=").replace(/\#\#/g,",");
h=h.replace(/\|\|/g,"=");
I.add(new e({atype:"DataInput",from:r,type:"is equal to",to:"",tostr:h,dataType:C,assignment:"false"}))
}}}else{if(g.indexOf("->")>0){var A=g.split("->");
if(A[0].startsWith("[din]")){var r=A[0].slice(5,A[0].length);
var C=d[r];
if(!C){C="java.lang.String"
}var k="DataInput";
I.add(new e({atype:k,from:r,type:"is mapped to",to:A[1],tostr:"",dataType:C,assignment:"true"}))
}else{if(A[0].startsWith("[dout]")){var r=A[0].slice(6,A[0].length);
var C=d[r];
if(!C){C="java.lang.String"
}var k="DataOutput";
I.add(new e({atype:k,from:r,type:"is mapped to",to:A[1],tostr:"",dataType:C,assignment:"true"}))
}}}else{if(A[0].startsWith("[din]")){var r=A[0].slice(5,A[0].length);
var C=d[r];
if(!C){C="java.lang.String"
}I.add(new e({atype:"DataInput",from:r,type:"is equal to",to:"",tostr:"",dataType:C,assignment:"false"}))
}else{if(A[0].startsWith("[dout]")){var r=A[0].slice(5,A[0].length);
var C=d[r];
if(!C){C="java.lang.String"
}I.add(new e({atype:"DataInput",from:r,type:"is equal to",to:"",tostr:"",dataType:C,assignment:"false"}))
}}var C=d[g]
}}}}I.on("update",function(M,K,L){if(L=="edit"){var N=d[K.get("from")];
if(!N){N="java.lang.String"
}K.set("dataType",N)
}});
var H=new Ext.form.ComboBox({name:"fromCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:m})});
var v=new Ext.form.ComboBox({name:"typeCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:[["is mapped to",ORYX.I18N.PropertyWindow.isMappedTo],["is equal to",ORYX.I18N.PropertyWindow.isEqualTo]]})});
var n=new Ext.form.ComboBox({name:"toCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:m})});
var u=new Extensive.grid.ItemDeleter();
var x=Ext.id();
var a=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:I,id:x,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"valueType",header:ORYX.I18N.PropertyWindow.dataType,width:180,dataIndex:"dataType",hidden:"true"},{id:"atype",header:"Assignment Type",width:180,dataIndex:"atype"},{id:"from",header:ORYX.I18N.PropertyWindow.fromObject,width:180,dataIndex:"from",editor:H},{id:"type",header:ORYX.I18N.PropertyWindow.assignmentType,width:100,dataIndex:"type",editor:v},{id:"to",header:ORYX.I18N.PropertyWindow.toObject,width:180,dataIndex:"to",editor:n},{id:"tostr",header:ORYX.I18N.PropertyWindow.toValue,width:180,dataIndex:"tostr",editor:new Ext.form.TextField({name:"tostrTxt",allowBlank:true}),renderer:Ext.util.Format.htmlEncode},u]),selModel:u,autoHeight:true,tbar:[{text:"[ Input Assignment ]",handler:function(){I.add(new e({atype:"DataInput",from:"",type:"",to:"",tostr:"",assignment:"false"}));
c="datainput";
a.fireEvent("cellclick",a,I.getCount()-1,1,null)
}},{text:"[ Input Mapping ]",handler:function(){I.add(new e({atype:"DataInput",from:"",type:"",to:"",tostr:"",assignment:"true"}));
c="datainput";
a.fireEvent("cellclick",a,I.getCount()-1,1,null)
}},{text:"[ Output Mapping ]",handler:function(){I.add(new e({atype:"DataOutput",from:"",type:"",to:"",tostr:"",assignment:"true"}));
c="dataoutput";
a.fireEvent("cellclick",a,I.getCount()-1,1,null)
}}],clicksToEdit:1,listeners:{beforeedit:function(P){if(P.record.data.atype=="DataInput"){var K=P.grid.getColumnModel().getCellEditor(P.column,P.row)||{};
K=K.field||{};
if(K.name=="typeCombo"){K.destroy();
var L;
if(P.record.data.assignment=="true"){L=new Ext.form.ComboBox({name:"typeCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:[["is mapped to",ORYX.I18N.PropertyWindow.isMappedTo]]})})
}else{L=new Ext.form.ComboBox({name:"typeCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:[["is equal to",ORYX.I18N.PropertyWindow.isEqualTo]]})})
}P.grid.getColumnModel().setEditor(P.column,new Ext.grid.GridEditor(L))
}if(K.name=="fromCombo"){K.destroy();
var M;
if(P.record.data.assignment=="true"){M=new Ext.form.ComboBox({name:"fromCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:j})})
}else{M=new Ext.form.ComboBox({name:"fromCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:B})})
}P.grid.getColumnModel().setEditor(P.column,new Ext.grid.GridEditor(M))
}if(K.name=="toCombo"){K.destroy();
var O;
if(P.record.data.assignment=="true"){O=new Ext.form.ComboBox({name:"toCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:B})})
}else{O=new Ext.form.ComboBox({name:"toCombo",disabled:true,valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:B})})
}P.grid.getColumnModel().setEditor(P.column,new Ext.grid.GridEditor(O))
}if(K.name=="tostrTxt"){K.destroy();
var N;
if(P.record.data.assignment=="true"){N=new Ext.form.TextField({name:"tostrTxt",allowBlank:true,disabled:true})
}else{N=new Ext.form.TextField({name:"tostrTxt",allowBlank:true})
}P.grid.getColumnModel().setEditor(P.column,new Ext.grid.GridEditor(N))
}}if(P.record.data.atype=="DataOutput"){var K=P.grid.getColumnModel().getCellEditor(P.column,P.row)||{};
K=K.field||{};
if(K.name=="typeCombo"){K.destroy();
var L;
if(P.record.data.assignment=="true"){L=new Ext.form.ComboBox({name:"typeCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:[["is mapped to",ORYX.I18N.PropertyWindow.isMappedTo]]})})
}else{L=new Ext.form.ComboBox({name:"typeCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:[["is equal to",ORYX.I18N.PropertyWindow.isEqualTo]]})})
}P.grid.getColumnModel().setEditor(P.column,new Ext.grid.GridEditor(L))
}if(K.name=="fromCombo"){K.destroy();
var M;
if(P.record.data.assignment=="true"){M=new Ext.form.ComboBox({name:"fromCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:o})})
}else{M=new Ext.form.ComboBox({name:"fromCombo",disabled:true,valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:o})})
}P.grid.getColumnModel().setEditor(P.column,new Ext.grid.GridEditor(M))
}if(K.name=="toCombo"){K.destroy();
var O;
if(P.record.data.assignment=="true"){O=new Ext.form.ComboBox({name:"toCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:j})})
}else{O=new Ext.form.ComboBox({name:"toCombo",disabled:true,valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:j})})
}P.grid.getColumnModel().setEditor(P.column,new Ext.grid.GridEditor(O))
}if(K.name=="tostrTxt"){K.destroy();
var N;
if(P.record.data.assignment=="true"){N=new Ext.form.TextField({name:"tostrTxt",allowBlank:true,disabled:true})
}else{N=new Ext.form.TextField({name:"tostrTxt",allowBlank:true})
}P.grid.getColumnModel().setEditor(P.column,new Ext.grid.GridEditor(N))
}}}}});
var F=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.editorForDataAssignments,height:350,width:890,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){F.hide()
}.bind(this)}],items:[a],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
F.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var K="";
a.getView().refresh();
a.stopEditing();
I.data.each(function(){if(this.data.from.length>0&&this.data.type.length>0){var L=this.data.atype;
if(this.data.type=="is mapped to"){if(L=="DataInput"){K+="[din]"+this.data.from+"->"+this.data.to+","
}else{if(L=="DataOutput"){K+="[dout]"+this.data.from+"->"+this.data.to+","
}}}else{if(this.data.type=="is equal to"){if(this.data.tostr.length>0){var M=this.data.tostr.replace(/,/g,"##");
M=M.replace(/=/g,"||");
if(L=="DataInput"){K+="[din]"+this.data.from+"="+M+","
}else{if(L=="DataOutput"){K+="[dout]"+this.data.from+"="+M+","
}}}else{if(L=="DataInput"){K+="[din]"+this.data.from+"=,"
}else{if(L=="DataOutput"){K+="[dout]"+this.data.from+"=,"
}}}}}}});
if(K.length>0){K=K.slice(0,-1)
}this.setValue(K);
this.dataSource.getAt(this.row).set("value",K);
this.dataSource.commitChanges();
F.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){F.destroy()
}.bind(this)}]});
F.show();
a.render();
this.grid.stopEditing();
a.focus(false,100);
return a
}});
Ext.form.NameTypeEditor=Ext.extend(Ext.form.TriggerField,{windowTitle:"",addButtonLabel:"",single:false,editable:false,readOnly:true,dtype:"",addCustomKPI:"",onTriggerClick:function(){if(this.disabled){return
}if(ORYX.USEOLDDATAASSIGNMENTS==false){if(this.dtype==ORYX.CONFIG.TYPE_DTYPE_DINPUT||this.dtype==ORYX.CONFIG.TYPE_DTYPE_DOUTPUT){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DATAIOEDITOR_SHOW,element:this.facade.getSelection()[0]});
return
}}var a=ORYX.EDITOR.getSerializedJSON();
var b=jsonPath(a.evalJSON(),"$.properties.package");
var c=jsonPath(a.evalJSON(),"$.properties.id");
Ext.Ajax.request({url:ORYX.PATH+"calledelement",method:"POST",success:function(n){try{if(n.responseText.length>=0&&n.responseText!="false"){var A=Ext.decode(n.responseText);
var O=new Array();
var X=new Array();
X.push("true");
X.push("true");
O.push(X);
var T=new Array();
T.push("false");
T.push("false");
O.push(T);
var q=new Array();
var W=new Array();
W.push("String");
W.push("String");
q.push(W);
var m=new Array();
m.push("Integer");
m.push("Integer");
q.push(m);
var I=new Array();
I.push("Boolean");
I.push("Boolean");
q.push(I);
var y=new Array();
y.push("Float");
y.push("Float");
q.push(y);
var E=new Array();
E.push("Object");
E.push("Object");
q.push(E);
var f=new Array();
f.push("**********");
f.push("**********");
q.push(f);
var d=new Array();
for(var x in A){var D=A[x];
d.push(D)
}d.sort();
for(var M=0;
M<d.length;
M++){var N=new Array();
var g=d[M];
var z=g.split(".");
var U=z[z.length-1];
var G=g.substring(0,g.length-(U.length+1));
N.push(U+" ["+G+"]");
N.push(d[M]);
q.push(N)
}var J=Ext.data.Record.create([{name:"name"},{name:"stype"},{name:"ctype"},{name:"kpi"}]);
var w=new Ext.data.MemoryProxy({root:[]});
var l=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},J),proxy:w,sorters:[{property:"name",direction:"ASC"}]});
l.load();
if(this.value.length>0){var v=this.value.split(",");
for(var S=0;
S<v.length;
S++){var r=v[S];
if(r.indexOf(":")>0){var h=r.split(":");
var s=false;
for(var R=0;
R<q.length;
R++){var u=q[R];
for(var P=0;
P<u.length;
P++){var K=u[P];
if(K==h[1]){s=true;
break
}}}if(s==true){var F="false";
if(h.length==3){F=h[2]
}l.add(new J({name:h[0],stype:h[1],ctype:"",kpi:F}))
}else{var F="false";
if(h[1]=="true"||h[1]=="false"){l.add(new J({name:h[0],stype:"",ctype:"",kpi:h[1]}))
}else{var F="false";
if(h.length==3){F=h[2]
}l.add(new J({name:h[0],stype:"",ctype:h[1],kpi:F}))
}}}else{l.add(new J({name:r,stype:"",ctype:"",kpi:"false"}))
}}}var o=new Extensive.grid.ItemDeleter();
o.setDType(this.dtype);
var C=ORYX.Utils.getDialogSize(300,700);
var p=(C.width-80)/7;
var H=Ext.id();
Ext.form.VTypes.inputNameVal=/^[a-z0-9\-\.\_]*$/i;
Ext.form.VTypes.inputNameText="Invalid name";
Ext.form.VTypes.inputName=function(e){return Ext.form.VTypes.inputNameVal.test(e)
};
var B=this.addCustomKPI;
var L=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:l,id:H,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"name",header:ORYX.I18N.PropertyWindow.name,width:p*2,dataIndex:"name",editor:new Ext.form.TextField({allowBlank:true,vtype:"inputName",regex:/^[a-z0-9\-\.\_]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"stype",header:"Defined Types",width:p*2,dataIndex:"stype",editor:new Ext.form.ComboBox({typeAhead:true,anyMatch:true,id:"customTypeCombo",valueField:"value",displayField:"name",labelStyle:"display:none",submitValue:true,typeAhead:true,queryMode:"local",mode:"local",triggerAction:"all",selectOnFocus:true,hideTrigger:false,forceSelection:false,selectOnFocus:true,autoSelect:false,editable:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:q})})},{id:"ctype",header:ORYX.I18N.PropertyWindow.customType,width:p*2,dataIndex:"ctype",editor:new Ext.form.TextField({allowBlank:true}),renderer:Ext.util.Format.htmlEncode},{id:"kpi",header:"KPI",width:p,dataIndex:"kpi",disabled:(B!="true"),editor:new Ext.form.ComboBox({typeAhead:true,anyMatch:true,id:"kpiConbo",valueField:"value",displayField:"name",labelStyle:"display:none",submitValue:true,typeAhead:true,queryMode:"local",mode:"local",disabled:(B!="true"),triggerAction:"all",selectOnFocus:true,hideTrigger:false,forceSelection:false,selectOnFocus:true,autoSelect:false,editable:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:O})})},o]),selModel:o,autoHeight:true,tbar:[{text:this.addButtonLabel,handler:function(){if(this.single&&l.getCount()>0){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.OnlySingleEntry,title:""})
}else{l.add(new J({name:"",stype:"",ctype:"",kpi:"false"}));
L.fireEvent("cellclick",L,l.getCount()-1,1,null)
}}.bind(this)}],clicksToEdit:1});
var Q=new Ext.Window({layout:"anchor",autoCreate:true,title:this.windowTitle,height:C.height,width:C.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){Q.hide()
}.bind(this)}],items:[L],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
Q.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var e="";
L.stopEditing();
L.getView().refresh();
var j=this.addCustomKPI;
l.data.each(function(){if(this.data.name.length>0){if(this.data.stype.length>0){if(this.data.stype=="Object"&&this.data.ctype.length>0){e+=this.data.name+":"+this.data.ctype;
if(j=="true"){e+=":"+this.data.kpi
}e+=","
}else{e+=this.data.name+":"+this.data.stype;
if(j=="true"){e+=":"+this.data.kpi
}e+=","
}}else{if(this.data.ctype.length>0){e+=this.data.name+":"+this.data.ctype;
if(j=="true"){e+=":"+this.data.kpi
}e+=","
}else{e+=this.data.name;
if(j=="true"){e+=":"+this.data.kpi
}e+=","
}}}});
if(e.length>0){e=e.slice(0,-1)
}this.setValue(e);
this.dataSource.getAt(this.row).set("value",e);
this.dataSource.commitChanges();
Q.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){Q.destroy()
}.bind(this)}]});
Q.show();
L.render();
this.grid.stopEditing();
L.focus(false,100)
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Unable to find Data Types.",title:""})
}}catch(V){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error retrieving Data Types info  :\n"+V,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error retrieving Data Types info.",title:""})
},params:{profile:ORYX.PROFILE,uuid:ORYX.UUID,ppackage:b,pid:c,action:"showdatatypes"}})
}});
Ext.form.ComplexVardefField=Ext.extend(Ext.form.NameTypeEditor,{windowTitle:ORYX.I18N.PropertyWindow.editorForVariableDefinitions,addButtonLabel:ORYX.I18N.PropertyWindow.addVariable,dtype:ORYX.CONFIG.TYPE_DTYPE_VARDEF,addCustomKPI:"true"});
Ext.form.ComplexDataInputField=Ext.extend(Ext.form.NameTypeEditor,{windowTitle:ORYX.I18N.PropertyWindow.editorForDataInput,addButtonLabel:ORYX.I18N.PropertyWindow.addDataInput,dtype:ORYX.CONFIG.TYPE_DTYPE_DINPUT});
Ext.form.ComplexDataOutputField=Ext.extend(Ext.form.NameTypeEditor,{windowTitle:ORYX.I18N.PropertyWindow.editorForDataOutput,addButtonLabel:ORYX.I18N.PropertyWindow.addDataOutput,dtype:ORYX.CONFIG.TYPE_DTYPE_DOUTPUT});
Ext.form.ComplexDataInputFieldSingle=Ext.extend(Ext.form.NameTypeEditor,{windowTitle:ORYX.I18N.PropertyWindow.editorForDataInput,addButtonLabel:ORYX.I18N.PropertyWindow.addDataInput,single:true,dtype:ORYX.CONFIG.TYPE_DTYPE_DINPUT});
Ext.form.ComplexDataOutputFieldSingle=Ext.extend(Ext.form.NameTypeEditor,{windowTitle:ORYX.I18N.PropertyWindow.editorForDataOutput,addButtonLabel:ORYX.I18N.PropertyWindow.addDataOutput,single:true,dtype:ORYX.CONFIG.TYPE_DTYPE_DOUTPUT});
Ext.form.ComplexGlobalsField=Ext.extend(Ext.form.NameTypeEditor,{windowTitle:ORYX.I18N.PropertyWindow.editorForGlobals,addButtonLabel:ORYX.I18N.PropertyWindow.addGlobal,dtype:ORYX.CONFIG.TYPE_DTYPE_GLOBAL});
Ext.form.ConditionExpressionEditorField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}function a(ab){c.setValue(ab);
c.dataSource.getAt(c.row).set("value",ab);
c.dataSource.commitChanges();
S.hide()
}function e(ae){var ab=new String("");
var af="\0";
var ac="\0";
var ad=false;
for(i=0;
i<ae.length;
i++){ac=af;
af=ae.charAt(i);
if(af==="\\"){if(ad){ab=ab+af;
ad=false;
af="\0"
}else{ad=true
}}else{if(ad){if(af==="n"){ab=ab+"\n"
}else{ab=ab+af
}}else{ab=ab+af
}}if(ac==="\\"){if(ad){ad=false
}}}return ab
}var A=false;
Ext.each(this.dataSource.data.items,function(ab){if(ab.data.gridProperties.propId=="oryx-conditionexpressionlanguage"&&ab.data.value=="java"){A=true
}});
var c=this;
var w=true;
var U=true;
var p;
var m=new Ext.form.TextArea({id:Ext.id(),fieldLabel:ORYX.I18N.PropertyWindow.expressionEditor,value:e(this.value),autoScroll:true});
var P;
var n;
if(!A){p=new Ext.Panel({border:false,items:[m]})
}else{var r;
var J=new Ext.Panel({layout:"column",border:false,style:"margin-left:10px;display:block;",items:[new Ext.form.TextField({name:"stringValue"})]});
var f=new Ext.Panel({layout:"column",border:false,style:"margin-left:10px;display:block;",items:[new Ext.form.NumberField({name:"floatValue",allowDecimals:true})]});
var E=new Ext.Panel({layout:"column",border:false,style:"margin-left:10px;display:block;",items:[new Ext.form.NumberField({name:"floatFrom",allowDecimals:true}),new Ext.form.NumberField({name:"floatTo",allowDecimals:true,style:"margin-left:10px;display:block;"})]});
var X=new Ext.Panel({layout:"column",border:false,style:"margin-left:10px;display:block;",items:[new Ext.form.NumberField({name:"intValue",allowDecimals:false})]});
var aa=new Ext.Panel({layout:"column",border:false,style:"margin-left:10px;display:block;",items:[new Ext.form.NumberField({name:"intForm",allowDecimals:false}),new Ext.form.NumberField({name:"intTo",allowDecimals:false,style:"margin-left:10px;display:block;"})]});
var u=[];
u.push(["contains",ORYX.I18N.ConditionExpressionEditorField.contains,J,[0]]);
u.push(["endsWith",ORYX.I18N.ConditionExpressionEditorField.endsWith,J,[0]]);
u.push(["equalsTo",ORYX.I18N.ConditionExpressionEditorField.equalsTo,J,[0]]);
u.push(["isEmpty",ORYX.I18N.ConditionExpressionEditorField.isEmpty,null,null]);
u.push(["isNull",ORYX.I18N.ConditionExpressionEditorField.isNull,null,null]);
u.push(["startsWith",ORYX.I18N.ConditionExpressionEditorField.startsWith,J,[0]]);
var B=new Ext.data.SimpleStore({fields:[{name:"value"},{name:"title"},{name:"panel"},{name:"inputs"}],data:u});
var s=[];
s.push(["between",ORYX.I18N.ConditionExpressionEditorField.between,E,[0,1]]);
s.push(["equalsTo",ORYX.I18N.ConditionExpressionEditorField.equalsTo,f,[0]]);
s.push(["greaterThan",ORYX.I18N.ConditionExpressionEditorField.greaterThan,f,[0]]);
s.push(["greaterOrEqualThan",ORYX.I18N.ConditionExpressionEditorField.greaterThanOrEqual,f,[0]]);
s.push(["isNull",ORYX.I18N.ConditionExpressionEditorField.isNull,null,null]);
s.push(["lessThan",ORYX.I18N.ConditionExpressionEditorField.lessThan,f,[0]]);
s.push(["lessOrEqualThan",ORYX.I18N.ConditionExpressionEditorField.lessThanOrEqual,f,[0]]);
var z=new Ext.data.SimpleStore({fields:[{name:"value"},{name:"title"},{name:"panel"},{name:"inputs"}],data:s});
var x=[];
x.push(["between",ORYX.I18N.ConditionExpressionEditorField.between,aa,[0,1]]);
x.push(["equalsTo",ORYX.I18N.ConditionExpressionEditorField.equalsTo,X,[0]]);
x.push(["greaterThan",ORYX.I18N.ConditionExpressionEditorField.greaterThan,X,[0]]);
x.push(["greaterOrEqualThan",ORYX.I18N.ConditionExpressionEditorField.greaterThanOrEqual,X,[0]]);
x.push(["isNull",ORYX.I18N.ConditionExpressionEditorField.isNull,null,null]);
x.push(["lessThan",ORYX.I18N.ConditionExpressionEditorField.lessThan,X,[0]]);
x.push(["lessOrEqualThan",ORYX.I18N.ConditionExpressionEditorField.lessThanOrEqual,X,[0]]);
var Z=new Ext.data.SimpleStore({fields:[{name:"value"},{name:"title"},{name:"panel"},{name:"inputs"}],data:x});
var Q=[];
Q.push(["isFalse",ORYX.I18N.ConditionExpressionEditorField.isFalse,null,null]);
Q.push(["isNull",ORYX.I18N.ConditionExpressionEditorField.isNull,null,null]);
Q.push(["isTrue",ORYX.I18N.ConditionExpressionEditorField.isTrue,null,null]);
var o=new Ext.data.SimpleStore({fields:[{name:"value"},{name:"title"},{name:"panel"},{name:"inputs"}],data:Q});
var O=[];
O.push(["isNull",ORYX.I18N.ConditionExpressionEditorField.isNull,null,null]);
var q=new Ext.data.SimpleStore({fields:[{name:"value"},{name:"title"},{name:"panel"},{name:"inputs"}],data:O});
J.hide();
f.hide();
E.hide();
X.hide();
aa.hide();
var V=ORYX.EDITOR.getSerializedJSON();
var b=jsonPath(V.evalJSON(),"$.properties.vardefs");
var F=[];
if(b){b.forEach(function(af){if(af.length>0){var ad=af.split(",");
for(var ae=0;
ae<ad.length;
ae++){var ag=ad[ae];
if(ag.indexOf(":")>0){var ac=ag.split(":");
var ah=ac[0].trim();
var ab=ac[1].trim();
switch(ab){case"String":case"java.lang.String":F.push([ah,ab,B]);
break;
case"Integer":case"java.lang.Integer":case"java.math.BigInteger":case"java.lang.Short":case"java.lang.Long":F.push([ah,ab,Z]);
break;
case"Float":case"java.math.BigDecimal":case"java.lang.Float":case"java.lang.Double":F.push([ah,ab,z]);
break;
case"Boolean":case"java.lang.Boolean":F.push([ah,ab,o]);
break;
default:F.push([ah,ab,q])
}}}}})
}var v=new Ext.data.SimpleStore({fields:[{name:"value"},{name:"type"},{name:"store"}],data:F});
var h=new Ext.form.ComboBox({editable:false,displayField:"title",valueField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,listeners:{select:function(ae,ac,ad){M();
r=ac;
var ab=r.get("panel");
if(ab!=null){ab.show()
}}}});
var Y=new Ext.form.ComboBox({editable:false,store:v,displayField:"value",valueField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,listeners:{select:function(ad,ab,ac){h.clearValue();
M();
h.bindStore(ab.get("store"))
}}});
var N=new Ext.form.FormPanel({layout:"table",title:ORYX.I18N.ConditionExpressionEditorField.editorTab,layoutConfig:{columns:3},defaults:{border:false},items:[{colspan:3,items:[{style:"font-size:12px;margin:10px;display:block;",anchor:"100%",xtype:"label",html:ORYX.I18N.ConditionExpressionEditorField.editorDescription}]},{style:"font-size:12px;margin:10px;display:block;",anchor:"100%",xtype:"label",html:ORYX.I18N.ConditionExpressionEditorField.processVariable},{colspan:2,items:[Y]},{style:"font-size:12px;margin:10px;display:block;",anchor:"100%",xtype:"label",html:ORYX.I18N.ConditionExpressionEditorField.condition},h,{items:[J,f,E,X,aa]}]});
var y=new Ext.Panel({title:ORYX.I18N.ConditionExpressionEditorField.scriptTab,layout:"anchor",defaults:{border:false},items:[m]});
function k(ab){var ac=ORYX.I18N.ConditionExpressionEditorField.scriptParseError;
ac=ac.replace("{0}",ab);
Ext.MessageBox.show({msg:ac,icon:Ext.MessageBox.WARNING,buttons:{ok:ORYX.I18N.PropertyWindow.ok,cancel:ORYX.I18N.PropertyWindow.cancel},fn:function(ad){if(ad=="ok"){I(true,true)
}else{D(false,false)
}}})
}function W(ab){var ac=ORYX.I18N.ConditionExpressionEditorField.scriptGenerationError;
ac=ac.replace("{0}",ab);
Ext.MessageBox.show({msg:ac,icon:Ext.MessageBox.WARNING,buttons:{ok:ORYX.I18N.PropertyWindow.ok}})
}var l=function(ah){if(ah.responseText.length>0){var an=Ext.decode(ah.responseText);
if(an.errorMessage){if(!U){k(an.errorMessage);
return
}else{w=false
}}else{var af;
var ag;
var ae=[];
an.conditions.forEach(function(ap){af=ap.condition;
ap.parameters.forEach(function(aq){if(ag==null){ag=aq
}else{ae.push(aq)
}})
});
var al=v.find("value",ag);
if(al==-1){var am=ORYX.I18N.ConditionExpressionEditorField.nonExistingVariable;
am=am.replace("{0}",ag);
k(am);
return
}else{Y.setValue(ag);
var ac=v.getAt(al);
Y.fireEvent("select",Y,ac);
h.setValue(af);
var ad=ac.get("store");
al=ad.find("value",af);
var ai=ad.getAt(al);
h.fireEvent("select",h,ai);
var ab=ai.get("panel");
if(ab!=null){var ak=ai.get("inputs");
if(ak!=null&&ak.length==ae.length){var aj;
for(aj=0;
aj<ak.length;
aj++){var ao=ab.getComponent(ak[aj]).setValue(ae[aj])
}}}w=true
}}}U=false;
if(w){I(true,false)
}else{D(false,false)
}};
var C=function(){D(false,false)
};
function D(ac,ab,ad){if(P){P.toTextArea();
P=null
}if(ab){m.setValue(ad)
}w=ac;
p.setActiveTab(y);
S.setTitle(ORYX.I18N.ConditionExpressionEditorField.sequenceFlowFullTitle);
K()
}function I(ab,ac){if(ac){j()
}w=ab;
p.setActiveTab(N);
S.setTitle(ORYX.I18N.ConditionExpressionEditorField.sequenceFlowTitle)
}p=new Ext.TabPanel({renderTo:Ext.getBody(),activeTab:0,defaults:{border:false},items:[N,y],listeners:{tabchange:function(ad,ae){if(ae.title==ORYX.I18N.ConditionExpressionEditorField.scriptTab){if(w){if(Y.getValue()==""||(Y.getValue()!=""&&h.getValue()=="")){D(false,true,"")
}else{var ac=function(ah){w=true;
if(ah.responseText.length>0){var ag=Ext.decode(ah.responseText);
if(ag.errorMessage){W(ag.errorMessage);
I(true,false)
}else{D(false,true,ag.script)
}}};
var af=function(){I(true,false)
};
var ab=t(ac,af);
if(ab==false){I(true,false)
}}}}else{if(!w){if(P.getValue()==null||P.getValue().trim()==""){I(true,true)
}else{m.setValue(P.getValue());
G({script:P.getValue()})
}}}}}});
function j(){Y.clearValue();
h.clearValue();
M()
}function M(){if(r!=null){var ab=r.get("panel");
if(ab){var ac=r.get("inputs");
if(ac!=null){ac.forEach(function(ad){ab.getComponent(ad).setValue(null)
})
}ab.hide()
}r=null
}}function d(){if(!r){return false
}var ab=r.get("panel");
if(ab==null){return true
}var ad=r.get("inputs");
if(ad!=null){var ac=[];
ad.forEach(function(ae){var af=ab.getComponent(ae).getValue();
if(af===undefined){return false
}ac.push(af)
});
if(ac.length!=ad.length){return false
}if(ac.length==2){return ac[1]>ac[0]
}}return true
}function R(){var af=Y.getValue();
if(!af||!d()){return null
}var ac=[];
ac.push(af);
var ab=r.get("panel");
if(ab!=null){var ae=r.get("inputs");
if(ae!=null){ae.forEach(function(ag){ac.push(ab.getComponent(ag).getValue())
})
}}var ad={operator:"AND",conditions:[{condition:h.getValue(),parameters:ac}]};
return ad
}function g(ae,ac,ab,ad){Ext.Ajax.request({url:ORYX.PATH+"customeditors",method:"POST",params:{expression_editor_command:ae,expression_editor_message:Ext.util.JSON.encode(ac)},success:function(af){ab(af)
}.bind(this),failure:function(){ad()
}})
}function G(ab){g("parseScript",ab,l,C)
}function t(ab,ac){var ad=R();
if(!ad){W(ORYX.I18N.ConditionExpressionEditorField.paramsError);
return false
}g("generateScript",ad,ab,ac);
return true
}var T=function(ac){if(ac.responseText.length>0){var ab=Ext.decode(ac.responseText);
if(ab.errorMessage){W(ab.errorMessage)
}else{a(ab.script)
}}};
var L=function(){W(ORYX.I18N.ConditionExpressionEditorField.saveError)
}
}var H=ORYX.Utils.getDialogSize(430,680);
var S=new Ext.Window({layout:"anchor",autoCreate:true,height:H.height,width:H.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){S.hide()
}.bind(this)}],items:[p],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
S.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){if(A){if(w){t(T,L)
}else{var ab=P.getValue().replace(/\\/g,"\\\\").replace(/\r\n|\r|\n/g,"\\n");
a(ab)
}}else{var ab=P.getValue().replace(/\\/g,"\\\\").replace(/\r\n|\r|\n/g,"\\n");
a(ab)
}}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){S.destroy()
}.bind(this)}]});
function K(){this.foldFunc=CodeMirror.newFoldFunction(CodeMirror.braceRangeFinder);
P=CodeMirror.fromTextArea(document.getElementById(m.getId()),{mode:"text/x-java",lineNumbers:true,lineWrapping:true,matchBrackets:true,onGutterClick:this.foldFunc,extraKeys:{"Ctrl-Z":function(ab){CodeMirror.hint(ab,CodeMirror.jbpmHint,S)
}},onCursorActivity:function(){P.setLineClass(n,null,null);
n=P.setLineClass(P.getCursor().line,null,"activeline")
}.bind(this)});
n=P.setLineClass(0,"activeline")
}if(A){if(this.getValue()!=null&&this.getValue()!=""){G({script:this.getValue()})
}else{I(true,false);
U=false
}}else{S.setTitle(ORYX.I18N.ConditionExpressionEditorField.simpleTitle)
}S.show();
p.setHeight(S.getInnerHeight());
if(!A){K()
}this.grid.stopEditing()
}});
Ext.form.ComplexRuleflowGroupElementField=Ext.extend(Ext.form.TriggerField,{editable:true,readOnly:false,onTriggerClick:function(){if(this.disabled){return
}var b=ORYX.EDITOR.getSerializedJSON();
var d=jsonPath(b.evalJSON(),"$.properties.package");
var f=jsonPath(b.evalJSON(),"$.properties.id");
var a=Ext.data.Record.create([{name:"name"},{name:"rules"},{name:"repo"},{name:"project"},{name:"branch"},{name:"fullpath"}]);
var c=new Ext.data.MemoryProxy({root:[]});
var e=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},a),proxy:c,sorters:[{property:"name",direction:"ASC"}]});
e.load();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:"Loading RuleFlow Groups",title:""});
Ext.Ajax.request({url:ORYX.PATH+"calledelement",method:"POST",success:function(j){try{if(j.responseText.length>0&&j.responseText!="false"){var D=Ext.decode(j.responseText);
for(var J in D){var A=D[J];
var z=new Array();
var s=A.split("||");
var r=s[0];
var m=s[1];
var y=m.split("<<");
var o="";
var u="";
var h="";
for(var B=0;
B<y.length;
B++){var E=y[B].split("^^");
var t=new Array();
t.push(E[0]);
t.push(E[1]);
z.push(t);
var v=y[B];
var l=v.split("^^");
var I=l[1];
var p=I.split("://");
var H=p[1];
var x=H.split("@");
if(h.indexOf(x[0])<0){h+=x[0]+","
}var k=x[1];
if(o.indexOf(k.split("/")[0])<0){o+=k.split("/")[0]+","
}if(u.indexOf(k.split("/")[1])<0){u+=k.split("/")[1]+","
}}if(o.endsWith(",")){o=o.substr(0,o.length-1)
}if(u.endsWith(",")){u=u.substr(0,u.length-1)
}if(h.endsWith(",")){h=h.substr(0,h.length-1)
}e.add(new a({name:r,rules:z,repo:o,project:u,branch:h,fullpath:I}))
}e.commitChanges();
var G=ORYX.Utils.getDialogSize(350,760);
var q=(G.width-80)/7;
var w=Ext.id();
var g=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:e,id:w,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"rfgname",header:"RuleFlow Group Name",width:q*2,sortable:true,dataIndex:"name",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"rfrulenames",header:"Rules",width:q*2,sortable:false,renderer:function(P,L,N,O,S,Q){function K(V,X,U,W){new Ext.form.ComboBox({name:"ruleflowscombo",id:W,valueField:"value",displayField:"name",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:V})}).render(document.getElementById(w),X)
}function R(V,X,U,W){new Ext.Button({text:"view",handler:function(Y,ab){var aa=Ext.getCmp(W).getRawValue();
var Z=Ext.getCmp(W).getValue();
if(aa&&aa.length>0&&Z&&Z.length>0){parent.designeropenintab(aa,Z)
}}}).render(document.getElementById(w),X)
}var M="rulenamescombodiv-"+O;
var T="rncombo-"+O;
K.defer(1,this,[Q.getAt(O).get("rules"),M,N,T]);
R.defer(1,this,[Q.getAt(O).get("rules"),M,N,T]);
return('<div id="'+M+'"></div>')
}},{id:"rfrepository",header:"Repositories",width:q,sortable:true,dataIndex:"repo",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"rfproject",header:"Projects",width:q,sortable:true,dataIndex:"project",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"rfbranch",header:"Branches",width:q,sortable:true,dataIndex:"branch",editor:new Ext.form.TextField({allowBlank:true,disabled:true})}])});
g.on("afterrender",function(M){if(this.value.length>0){var K=0;
var N=this.value;
var L=g;
e.data.each(function(){if(this.data.name==N){L.getSelectionModel().select(K,1)
}K++
})
}}.bind(this));
var n=new Ext.Panel({id:"ruleFlowGroupsPanel",title:'<center><p style="font-size:11px"><i>Select RuleFlow Group Name and click on Save</i></p></center>',layout:"column",items:[g],layoutConfig:{columns:1},defaults:{columnWidth:1}});
var C=new Ext.Window({layout:"anchor",autoCreate:true,title:"Editor for RuleFlow Groups",height:G.height,width:G.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,items:[n],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
C.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.Save.save,handler:function(){if(g.getSelectionModel().getSelectedCell()!=null){var K=g.getSelectionModel().getSelectedCell()[0];
var L=e.getAt(K).data.name;
g.stopEditing();
g.getView().refresh();
this.setValue(L);
this.dataSource.getAt(this.row).set("value",L);
this.dataSource.commitChanges();
C.hide()
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"No data selected.",title:""})
}}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){C.destroy()
}.bind(this)}]});
C.show();
g.render();
g.fireEvent("afterrender");
this.grid.stopEditing();
g.focus(false,100)
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Unable to find RuleFlow Groups.",title:""})
}}catch(F){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error retrieving RuleFlow Groups info  :\n"+F,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error retrieving RuleFlow Groups info.",title:""})
},params:{profile:ORYX.PROFILE,uuid:ORYX.UUID,ppackage:d,pid:f,action:"showruleflowgroups"}});
this.grid.stopEditing()
}});
Ext.form.ComplexCalledElementField=Ext.extend(Ext.form.TriggerField,{editable:true,readOnly:false,onTriggerClick:function(){if(this.disabled){return
}var a=Ext.data.Record.create([{name:"name"},{name:"pkgname"},{name:"imgsrc"}]);
var e=new Ext.data.MemoryProxy({root:[]});
var d=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},a),proxy:e,sorters:[{property:"name",direction:"ASC"}]});
d.load();
var b=ORYX.EDITOR.getSerializedJSON();
var c=jsonPath(b.evalJSON(),"$.properties.package");
var f=jsonPath(b.evalJSON(),"$.properties.id");
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.PropertyWindow.loadingProcessInf,title:""});
Ext.Ajax.request({url:ORYX.PATH+"calledelement",method:"POST",success:function(k){try{if(k.responseText.length>0&&k.responseText!="false"){var o=Ext.decode(k.responseText);
for(var q in o){var r=q.split("|");
d.add(new a({name:r[0],pkgname:r[1],imgsrc:o[q]}))
}d.commitChanges();
var h=ORYX.Utils.getDialogSize(350,690);
var l=(h.width-30)/3;
var j=Ext.id();
var g=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:d,id:j,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"pid",header:ORYX.I18N.PropertyWindow.processId,width:l,dataIndex:"name",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"pkgn",header:ORYX.I18N.PropertyWindow.packageName,width:l,dataIndex:"pkgname",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"pim",header:ORYX.I18N.LocalHistory.headertxt.ProcessImage,width:l,dataIndex:"imgsrc",renderer:function(s){if(s&&s.length>0){return'<center><img src="'+ORYX.PATH+"images/page_white_picture.png\" onclick=\"new ImageViewer({title: 'Process Image', width: '650', height: '450', autoScroll: true, fixedcenter: true, src: '"+s+"',hideAction: 'close'}).show();\" alt=\"Click to view Process Image\"/></center>"
}else{return ORYX.I18N.LocalHistory.headertxt.ProcessImage.NoAvailable
}}}]),autoHeight:true});
g.on("afterrender",function(u){if(this.value.length>0){var s=0;
var v=this.value;
var t=g;
d.data.each(function(){if(this.data.name==v){t.getSelectionModel().select(s,1)
}s++
})
}}.bind(this));
var p=new Ext.Panel({id:"calledElementsPanel",title:"<center>"+ORYX.I18N.PropertyWindow.selectProcessId+"</center>",layout:"column",items:[g],layoutConfig:{columns:1},defaults:{columnWidth:1}});
var n=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.editorForCalledEvents,height:h.height,width:h.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){n.hide()
}.bind(this)}],items:[p],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
n.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.Save.save,handler:function(){if(g.getSelectionModel().getSelectedCell()!=null){var s=g.getSelectionModel().getSelectedCell()[0];
var t=d.getAt(s).data.name;
g.stopEditing();
g.getView().refresh();
this.setValue(t);
this.dataSource.getAt(this.row).set("value",t);
this.dataSource.commitChanges();
n.hide()
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.LocalHistory.LocalHistoryView.msg,title:""})
}}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){n.destroy()
}.bind(this)}]});
n.show();
g.render();
g.fireEvent("afterrender");
this.grid.stopEditing();
g.focus(false,100)
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.unableToFindOtherProcess,title:""})
}}catch(m){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.errorResolvingOtherProcessInfo+" :\n"+m,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.errorResolvingOtherProcessInfo+".",title:""})
},params:{profile:ORYX.PROFILE,uuid:ORYX.UUID,ppackage:c,pid:f}})
}});
Ext.form.ComplexVisualDataAssignmentField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}Ext.each(this.dataSource.data.items,function(h){if((h.data.gridProperties.propId=="oryx-assignments")){}});
var f=ORYX.EDITOR.getSerializedJSON();
var a=jsonPath(f.evalJSON(),"$.properties.vardefs");
if(!a){a=""
}var c=jsonPath(f.evalJSON(),"$.properties.globals");
if(!c){c=""
}var g="";
var b=jsonPath(f.evalJSON(),"$.childShapes.*");
for(var e=0;
e<b.length;
e++){if(b[e].stencil.id=="DataObject"){g+=b[e].properties.name;
g+=","
}}if(g.endsWith(",")){g=g.substr(0,g.length-1)
}var d=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.editorVisualDataAssociations,height:550,width:850,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){d.hide()
}.bind(this)}],items:[{xtype:"component",id:"visualdataassignmentswindow",autoEl:{tag:"iframe",src:ORYX.BASE_FILE_PATH+"customeditors/visualassignmentseditor.jsp?vars="+a+"&globals="+c+"&dobj="+g,width:"100%",height:"100%"}}],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
d.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var h=document.getElementById("visualdataassignmentswindow").contentWindow.getEditorValue();
this.setValue(h);
this.dataSource.getAt(this.row).set("value",h);
this.dataSource.commitChanges();
d.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){d.destroy()
}.bind(this)}]});
d.show();
this.grid.stopEditing()
}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.CanvasResize=Clazz.extend({construct:function(a){this.facade=a;
new ORYX.Plugins.CanvasResizeButton(this.facade.getCanvas(),"N",this.resize.bind(this));
new ORYX.Plugins.CanvasResizeButton(this.facade.getCanvas(),"W",this.resize.bind(this));
new ORYX.Plugins.CanvasResizeButton(this.facade.getCanvas(),"E",this.resize.bind(this));
new ORYX.Plugins.CanvasResizeButton(this.facade.getCanvas(),"S",this.resize.bind(this))
},resize:function(a,c){resizeCanvas=function(j,k,m){var f=m.getCanvas();
var l=f.bounds;
var h=m.getCanvas().getHTMLContainer().parentNode.parentNode;
if(j=="E"||j=="W"){f.setSize({width:(l.width()+k)*f.zoomLevel,height:(l.height())*f.zoomLevel})
}else{if(j=="S"||j=="N"){f.setSize({width:(l.width())*f.zoomLevel,height:(l.height()+k)*f.zoomLevel})
}}if(j=="N"||j=="W"){var g=j=="N"?{x:0,y:k}:{x:k,y:0};
f.getChildNodes(false,function(o){o.bounds.moveBy(g)
});
var i=f.getChildEdges().findAll(function(o){return o.getAllDockedShapes().length>0
});
var n=i.collect(function(o){return o.dockers.findAll(function(p){return !p.getDockedShape()
})
}).flatten();
n.each(function(o){o.bounds.moveBy(g)
})
}else{if(j=="S"){h.scrollTop+=k
}else{if(j=="E"){h.scrollLeft+=k
}}}f.update();
m.updateSelection()
};
var b=ORYX.Core.Command.extend({construct:function(f,h,g){this.position=f;
this.extentionSize=h;
this.facade=g
},execute:function(){resizeCanvas(this.position,this.extentionSize,this.facade)
},rollback:function(){resizeCanvas(this.position,-this.extentionSize,this.facade)
},update:function(){}});
var d=ORYX.CONFIG.CANVAS_RESIZE_INTERVAL;
if(c){d=-d
}var e=new b(a,d,this.facade);
this.facade.executeCommands([e])
}});
ORYX.Plugins.CanvasResizeButton=Clazz.extend({construct:function(c,h,l){this.canvas=c;
var i=c.getHTMLContainer().parentNode.parentNode.parentNode;
window.myParent=i;
var d=i.firstChild;
var b=d.firstChild.firstChild;
var a=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",i,["div",{"class":"canvas_resize_indicator canvas_resize_indicator_grow "+h,title:ORYX.I18N.RESIZE.tipGrow+ORYX.I18N.RESIZE[h]}]);
var e=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",i,["div",{"class":"canvas_resize_indicator canvas_resize_indicator_shrink "+h,title:ORYX.I18N.RESIZE.tipShrink+ORYX.I18N.RESIZE[h]}]);
var f=60;
var k=function(n){if(n.target!=i&&n.target!=d&&n.target!=d.firstChild&&n.target!=b&&n.target!=d){return false
}var q=n.layerX;
var p=n.layerY;
if((q-d.scrollLeft)<0||Ext.isSafari){q+=d.scrollLeft
}if((p-d.scrollTop)<0||Ext.isSafari){p+=d.scrollTop
}if(h=="N"){return p<f+d.firstChild.offsetTop
}else{if(h=="W"){return q<f+d.firstChild.offsetLeft
}else{if(h=="E"){var m=(d.offsetWidth-(d.firstChild.offsetLeft+d.firstChild.offsetWidth));
if(m<0){m=0
}return q>d.scrollWidth-m-f
}else{if(h=="S"){var o=(d.offsetHeight-(d.firstChild.offsetTop+d.firstChild.offsetHeight));
if(o<0){o=0
}return p>d.scrollHeight-o-f
}}}}return false
};
var j=(function(){a.show();
var n,t,m,s;
try{var r=this.canvas.getRootNode().childNodes[1].getBBox();
n=r.x;
t=r.y;
m=r.x+r.width;
s=r.y+r.height
}catch(q){this.canvas.getChildShapes(true).each(function(w){var y=w.absoluteBounds();
var x=y.upperLeft();
var v=y.lowerRight();
if(n==undefined){n=x.x;
t=x.y;
m=v.x;
s=v.y
}else{n=Math.min(n,x.x);
t=Math.min(t,x.y);
m=Math.max(m,v.x);
s=Math.max(s,v.y)
}})
}var u=c.bounds.width();
var p=c.bounds.height();
var o=c.getChildNodes().size()==0;
if(h=="N"&&(t>ORYX.CONFIG.CANVAS_RESIZE_INTERVAL||(o&&p>ORYX.CONFIG.CANVAS_RESIZE_INTERVAL))){e.show()
}else{if(h=="E"&&(u-m)>ORYX.CONFIG.CANVAS_RESIZE_INTERVAL){e.show()
}else{if(h=="S"&&(p-s)>ORYX.CONFIG.CANVAS_RESIZE_INTERVAL){e.show()
}else{if(h=="W"&&(n>ORYX.CONFIG.CANVAS_RESIZE_INTERVAL||(o&&u>ORYX.CONFIG.CANVAS_RESIZE_INTERVAL))){e.show()
}else{e.hide()
}}}}}).bind(this);
var g=function(){a.hide();
e.hide()
};
d.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE,function(m){if(k(m)){j()
}else{g()
}},false);
a.addEventListener(ORYX.CONFIG.EVENT_MOUSEOVER,function(m){j()
},true);
e.addEventListener(ORYX.CONFIG.EVENT_MOUSEOVER,function(m){j()
},true);
i.addEventListener(ORYX.CONFIG.EVENT_MOUSEOUT,function(m){g()
},true);
g();
a.addEventListener("click",function(){l(h);
j()
},true);
e.addEventListener("click",function(){l(h,true);
j()
},true)
}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.View={facade:undefined,diffEditor:undefined,diffDialog:undefined,construct:function(b,a){this.facade=b;
this.facade.registerOnEvent(ORYX.CONFIG.VOICE_COMMAND_GENERATE_IMAGE,this.showAsPNG.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.VOICE_COMMAND_VIEW_SOURCE,this.showProcessBPMN.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDROP_END,this.refreshCanvasForIE.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SHAPE_ADDED,this.refreshCanvasForIE.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDOCKER_MOVE_FINISHED,this.refreshCanvasForIE.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_END,this.refreshCanvasForIE.bind(this));
this.zoomLevel=1;
this.maxFitToScreenLevel=1.5;
this.minZoomLevel=0.4;
this.maxZoomLevel=2;
this.diff=5;
if(a.properties){a.properties.each(function(c){if(c.zoomLevel){this.zoomLevel=Number(1)
}if(c.maxFitToScreenLevel){this.maxFitToScreenLevel=Number(c.maxFitToScreenLevel)
}if(c.minZoomLevel){this.minZoomLevel=Number(c.minZoomLevel)
}if(c.maxZoomLevel){this.maxZoomLevel=Number(c.maxZoomLevel)
}}.bind(this))
}this.facade.offer({name:ORYX.I18N.View.zoomIn,functionality:this.zoom.bind(this,[1+ORYX.CONFIG.ZOOM_OFFSET]),group:ORYX.I18N.View.group,icon:ORYX.BASE_FILE_PATH+"images/magnifier_zoom_in.png",description:ORYX.I18N.View.zoomInDesc,index:1,minShape:0,maxShape:0,isEnabled:function(){return this.zoomLevel<this.maxZoomLevel
}.bind(this)});
this.facade.offer({name:ORYX.I18N.View.zoomOut,functionality:this.zoom.bind(this,[1-ORYX.CONFIG.ZOOM_OFFSET]),group:ORYX.I18N.View.group,icon:ORYX.BASE_FILE_PATH+"images/magnifier_zoom_out.png",description:ORYX.I18N.View.zoomOutDesc,index:2,minShape:0,maxShape:0,isEnabled:function(){return this._checkSize()
}.bind(this)});
this.facade.offer({name:ORYX.I18N.View.zoomStandard,functionality:this.setAFixZoomLevel.bind(this,1),group:ORYX.I18N.View.group,icon:ORYX.BASE_FILE_PATH+"images/zoom_standard.png",cls:"icon-large",description:ORYX.I18N.View.zoomStandardDesc,index:3,minShape:0,maxShape:0,isEnabled:function(){return this.zoomLevel!=1
}.bind(this)});
this.facade.offer({name:ORYX.I18N.View.zoomFitToModel,functionality:this.zoomFitToModel.bind(this),group:ORYX.I18N.View.group,icon:ORYX.BASE_FILE_PATH+"images/image.png",description:ORYX.I18N.View.zoomFitToModelDesc,index:4,minShape:0,maxShape:0});
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.view.showFullScreen,functionality:function(c){var d=parent.document.getElementById(ORYX.EDITORID);
if(d.requestFullScreen){d.requestFullScreen()
}else{if(d.mozRequestFullScreen){d.mozRequestFullScreen()
}else{if(d.webkitRequestFullScreen){d.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
}else{ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.failShowFullScreen,title:""})
}}}}.bind(this),group:"fullscreengroup",icon:ORYX.BASE_FILE_PATH+"images/fullscreen.png",description:ORYX.I18N.view.showFullScreen_desc,index:2,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.view.shareProcessImg,functionality:this.shareProcessImage.bind(this),group:"sharegroup",icon:ORYX.BASE_FILE_PATH+"images/share.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/share.png",description:ORYX.I18N.view.shareProcessImg_desc,index:1,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.view.shareProcessPDF,functionality:this.shareProcessPdf.bind(this),group:"sharegroup",icon:ORYX.BASE_FILE_PATH+"images/share.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/share.png",description:ORYX.I18N.view.shareProcessPDF_desc,index:2,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.view.importFromBPMN2,functionality:this.importFromBPMN2.bind(this),group:"importgroup",icon:ORYX.BASE_FILE_PATH+"images/import.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/import.png",description:ORYX.I18N.view.importFromBPMN2_desc,index:1,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.view.importFromJSON,functionality:this.importFromJSON.bind(this),group:"importgroup",icon:ORYX.BASE_FILE_PATH+"images/import.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/import.png",description:ORYX.I18N.view.importFromJSON_desc,index:2,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.view.downloadProcPDF,functionality:this.showAsPDF.bind(this),group:"sharegroup",icon:ORYX.BASE_FILE_PATH+"images/share.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/share.png",description:ORYX.I18N.view.downloadProcPDF_desc,index:4,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.view.downloadProcPNG,functionality:this.showAsPNG.bind(this),group:"sharegroup",icon:ORYX.BASE_FILE_PATH+"images/share.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/share.png",description:ORYX.I18N.view.downloadProcPNG_desc,index:3,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.view.downloadProcSVG,functionality:this.showAsSVG.bind(this),group:"sharegroup",icon:ORYX.BASE_FILE_PATH+"images/share.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/share.png",description:ORYX.I18N.view.downloadProcSVG_desc,index:5,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.view.viewProcSources,functionality:this.showProcessSources.bind(this),group:"sharegroup",icon:ORYX.BASE_FILE_PATH+"images/share.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/share.png",description:ORYX.I18N.view.viewProcSources_desc,index:6,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)})
}},setAFixZoomLevel:function(a){this.zoomLevel=a;
this._checkZoomLevelRange();
this.zoom(1)
},showInPopout:function(){uuidParamName="uuid";
uuidParamName=uuidParamName.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
regexS="[\\?&]"+uuidParamName+"=([^&#]*)";
regex=new RegExp(regexS);
uuidParams=regex.exec(window.location.href);
uuidParamValue=uuidParams[1];
window.open(ORYX.EXTERNAL_PROTOCOL+"://"+ORYX.EXTERNAL_HOST+"/"+ORYX.EXTERNAL_SUBDOMAIN+"/org.drools.guvnor.Guvnor/standaloneEditorServlet?assetsUUIDs="+uuidParamValue+"&client=oryx","Process Editor","status=0,toolbar=0,menubar=0,resizable=0,location=no,width=1400,height=1000")
},importFromBPMN2:function(a){var c=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",items:[{text:ORYX.I18N.FromBPMN2Support.selectFile,style:"font-size:12px;margin-bottom:10px;display:block;",anchor:"100%",xtype:"label"},{fieldLabel:ORYX.I18N.FromBPMN2Support.file,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;",itemCls:"ext_specific_window_overflow"},{xtype:"textarea",hideLabel:true,name:"msg",anchor:"100% -63"}]});
var d=ORYX.Utils.getDialogSize(350,500);
var b=new Ext.Window({autoCreate:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.FromBPMN2Support.impBPMN2,height:d.height,width:d.width,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[c],buttons:[{text:ORYX.I18N.FromBPMN2Support.impBtn,handler:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.FromBPMN2Support.impProgress,title:""});
var f=c.items.items[1].getValue();
var e=false;
if(f===undefined||f.length<=0){e=true
}else{if(f.endsWith(".bpmn")||f.endsWith(".bpmn2")){e=true
}}if(e){var g=c.items.items[2].getValue();
Ext.Ajax.request({url:ORYX.PATH+"transformer",method:"POST",success:function(h){if(h.responseText.length<1){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.importFromBPMN2Error+ORYX.I18N.view.importFromBPMN2ErrorCheckLogs,title:""});
b.hide()
}else{try{this._loadJSON(h.responseText,"BPMN2")
}catch(i){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.importFromBPMN2Error+"<p>"+i+"</p>",title:""})
}b.hide()
}}.createDelegate(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.importFromBPMN2Error+ORYX.I18N.view.importFromBPMN2ErrorCheckLogs,title:""});
b.hide()
}.createDelegate(this),params:{profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),pp:ORYX.PREPROCESSING,bpmn2:g,transformto:"bpmn2json"}})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Invalid file type. Must be .bpmn or .bpmn2",title:""})
}}.bind(this)},{text:ORYX.I18N.Save.close,handler:function(){b.hide()
}.bind(this)}]});
b.on("hide",function(){b.destroy(true);
delete b
});
b.show();
c.items.items[1].getEl().dom.addEventListener("change",function(f){var e=new FileReader();
e.onload=function(g){c.items.items[2].setValue(g.target.result)
};
e.readAsText(f.target.files[0],"UTF-8")
},true)
},importFromJSON:function(a){var c=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",items:[{text:ORYX.I18N.FromJSONSupport.selectFile,style:"font-size:12px;margin-bottom:10px;display:block;",anchor:"100%",xtype:"label"},{fieldLabel:ORYX.I18N.FromJSONSupport.file,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;",itemCls:"ext_specific_window_overflow"},{xtype:"textarea",hideLabel:true,name:"msg",anchor:"100% -63"}]});
var d=ORYX.Utils.getDialogSize(350,500);
var b=new Ext.Window({autoCreate:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.FromJSONSupport.impBPMN2,height:d.height,width:d.width,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[c],buttons:[{text:ORYX.I18N.FromJSONSupport.impBtn,handler:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.FromJSONSupport.impProgress,title:""});
var g=c.items.items[1].getValue();
var f=false;
if(g===undefined||g.length<=0){f=true
}else{if(g.endsWith(".json")){f=true
}}if(f){var h=c.items.items[2].getValue();
try{this._loadJSON(h,"JSON")
}catch(i){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.importFromJSONError+"\n"+i,title:""})
}b.hide()
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Invalid file type. Must be .json",title:""})
}}.bind(this)},{text:ORYX.I18N.Save.close,handler:function(){b.hide()
}.bind(this)}]});
b.on("hide",function(){b.destroy(true);
delete b
});
b.show();
c.items.items[1].getEl().dom.addEventListener("change",function(f){var e=new FileReader();
e.onload=function(g){c.items.items[2].setValue(g.target.result)
};
e.readAsText(f.target.files[0],"UTF-8")
},true)
},shareEmbeddableProcess:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.view.creatingEmbeddableProc,title:""});
Ext.Ajax.request({url:ORYX.PATH+"transformer",method:"POST",success:function(a){try{var b=new Ext.form.TextArea({id:"sharedEmbeddableArea",fieldLabel:ORYX.I18N.view.enbedableProc,width:400,height:250,value:a.responseText});
var d=new Ext.Window({width:400,id:"sharedEmbeddableURL",height:250,autoScroll:true,title:ORYX.I18N.view.enbedableProc,items:[b]});
d.show()
}catch(c){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.enbedableProcFailCreate+": "+c,title:""})
}}.createDelegate(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.enbedableProcFailCreate+".",title:""})
},params:{profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),respaction:"showembeddable"}})
},shareProcessPdf:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.view.creatingProcPDF,title:""});
var c=ORYX.EDITOR.getCanvas().getSVGRepresentation(true,true);
var d=DataManager.serialize(c);
var a=c.getAttributeNS(null,"height");
var b=c.getAttributeNS(null,"width");
Ext.Ajax.request({url:ORYX.PATH+"transformer",method:"POST",success:function(f){try{var j=ORYX.Utils.getDialogSize(250,400);
var g=new Ext.form.TextArea({id:"sharedPDFArea",fieldLabel:ORYX.I18N.view.processImgPDF,width:j.width,height:j.height,value:f.responseText});
var i=new Ext.Window({width:j.width,id:"sharedPDFURL",height:j.height,autoScroll:true,layout:"fit",title:ORYX.I18N.view.processPDFurl,items:[g]});
i.show()
}catch(h){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.processPDFFail+": "+h,title:""})
}}.createDelegate(this),failure:function(){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.processPDFFail+".",title:""})
},params:{profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),fsvg:Base64.encode(d),svgheight:a,svgwidth:b,transformto:"pdf",respaction:"showurl"}})
},shareProcessImage:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.view.processCreatingImg,title:""});
var c=ORYX.EDITOR.getCanvas().getSVGRepresentation(true,true);
var d=DataManager.serialize(c);
var a=c.getAttributeNS(null,"height");
var b=c.getAttributeNS(null,"width");
Ext.Ajax.request({url:ORYX.PATH+"transformer",method:"POST",success:function(f){try{var j=ORYX.Utils.getDialogSize(250,400);
var g=new Ext.form.TextArea({id:"sharedImageArea",fieldLabel:ORYX.I18N.view.processImgUrl,width:j.width,height:j.height,value:f.responseText});
var i=new Ext.Window({width:j.width,id:"sharedImageURL",height:j.height,layout:"fit",autoScroll:true,title:ORYX.I18N.view.processImgUrl,items:[g]});
i.show()
}catch(h){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.processImgFail+": "+h,title:""})
}}.createDelegate(this),failure:function(){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.processImgFail+".",title:""})
},params:{profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),fsvg:Base64.encode(d),transformto:"png",respaction:"showurl",svgheight:a,svgwidth:b}})
},shareProcess:function(){alert("sharing process")
},diffprocess:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.View.viewDiffLoadingVersions,title:""});
Ext.Ajax.request({url:ORYX.PATH+"processdiff",method:"POST",success:function(a){try{this._showProcessDiffDialog(a.responseText)
}catch(b){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.versionsFail+":\n"+b,title:""})
}}.createDelegate(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.versionsFail+".",title:""})
},params:{action:"versions",profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID))}})
},_showProcessDiffDialog:function(g){var j=g.evalJSON();
var a=[];
var d=0;
for(var h in j){if(j.hasOwnProperty(h)){a.push(parseInt(h));
d++
}}if(d==0){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.versionsNotfound+".",title:"Diff"})
}else{a.sort(function(k,i){return k-i
});
var f=[];
for(var c=0;
c<a.length;
c++){f[c]=[a[c]+""]
}var b=new Ext.data.SimpleStore({fields:["name"],data:f});
var e=new Ext.form.ComboBox({fieldLabel:ORYX.I18N.view.versionsSelect,labelStyle:"width:180px",hiddenName:"version_name",emptyText:ORYX.I18N.view.versionsSelect+"...",store:b,displayField:"name",valueField:"name",mode:"local",typeAhead:true,triggerAction:"all",listeners:{select:{fn:function(l,k){var i=ORYX.EDITOR.getSerializedJSON();
Ext.Ajax.request({url:ORYX.PATH+"uuidRepository",method:"POST",success:function(m){try{var o=m.responseText;
Ext.Ajax.request({url:ORYX.PATH+"processdiff",method:"POST",success:function(q){try{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.view.creatingDiff+"...",title:""});
var u=q.responseText;
var p=new diff_match_patch();
p.Diff_Timeout=0;
var t=p.diff_main(u,o);
p.diff_cleanupSemantic(t);
var r=p.diff_prettyHtml(t);
this.diffDialog.remove(this.diffEditor,true);
this.diffEditor=new Ext.form.HtmlEditor({id:"diffeditor",value:r,enableSourceEdit:false,enableAlignments:false,enableColors:false,enableFont:false,enableFontSize:false,enableFormat:false,enableLinks:false,enableLists:false,autoScroll:true,width:520,height:310});
this.diffDialog.add(this.diffEditor);
this.diffDialog.doLayout()
}catch(s){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.failRetrieveVersionsSource+":"+s,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.failRetrieveVersionsSource+".",title:""})
}.bind(this),params:{action:"getversion",version:l.getValue(),profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID))}})
}catch(n){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.convertingToBPMN2Fail+":"+n,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.convertingToBPMN2Fail+".",title:""})
},params:{action:"toXML",pp:ORYX.PREPROCESSING,profile:ORYX.PROFILE,data:i}})
}.bind(this)}}});
this.diffEditor=new Ext.form.HtmlEditor({id:"diffeditor",value:"",enableSourceEdit:false,enableAlignments:false,enableColors:false,enableFont:false,enableFontSize:false,enableFormat:false,enableLinks:false,enableLists:false,autoScroll:true,width:520,height:310});
this.diffDialog=new Ext.Window({autoCreate:true,autoScroll:false,plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.view.compareBPMN2PReviousVersions,height:410,width:550,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[this.diffEditor],tbar:[e],buttons:[{text:ORYX.I18N.Save.close,handler:function(){this.diffDialog.hide()
}.bind(this)}]});
this.diffDialog.show();
this.diffDialog.doLayout()
}},_loadJSON:function(a,b){if(a){Ext.MessageBox.confirm("Import",ORYX.I18N.view.replaceExistingModel,function(c){if(c=="yes"){this.facade.setSelection(this.facade.getCanvas().getChildShapes(true));
var h=ORYX.EDITOR.getSerializedJSON();
var d=this.facade.getSelection();
var f=new ORYX.Plugins.Edit.ClipBoard();
f.refresh(d,this.getAllShapesToConsider(d,true));
var g=new ORYX.Plugins.Edit.DeleteCommand(f,this.facade);
this.facade.executeCommands([g]);
try{this.facade.importJSON(a);
ORYX.PROCESS_SAVED=false;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.view.importSuccess+" "+b,title:""})
}catch(e){this.facade.importJSON(h);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.unableImportProvided+" "+b,title:""})
}}else{try{this.facade.importJSON(a);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.view.importSuccess+" "+b,title:""})
}catch(e){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.unableImportProvided+" "+b,title:""})
}}}.bind(this))
}else{this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.jPDLSupport.impFailedJson)
}},getAllShapesToConsider:function(b,d){var a=[];
var c=[];
b.each(function(f){isChildShapeOfAnother=b.any(function(i){return i.hasChildShape(f)
});
if(isChildShapeOfAnother){return
}a.push(f);
if(f instanceof ORYX.Core.Node){var h=f.getOutgoingNodes();
h=h.findAll(function(i){return !b.include(i)
});
a=a.concat(h)
}c=c.concat(f.getChildShapes(true));
if(d&&!(f instanceof ORYX.Core.Edge)){var g=f.getIncomingShapes().concat(f.getOutgoingShapes());
g.each(function(i){if(i instanceof ORYX.Core.Edge&&i.properties["oryx-conditionexpression"]&&i.properties["oryx-conditionexpression"]!=""){return
}a.push(i)
}.bind(this))
}}.bind(this));
var e=this.facade.getCanvas().getChildEdges().select(function(f){if(a.include(f)){return false
}if(f.getAllDockedShapes().size()===0){return false
}return f.getAllDockedShapes().all(function(g){return g instanceof ORYX.Core.Edge||c.include(g)
})
});
a=a.concat(e);
return a
},_showErrorMessageBox:function(b,a){Ext.MessageBox.show({title:b,msg:a,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})
},showAsSVG:function(){var m=ORYX.EDITOR.getSerializedJSON();
var d=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(true));
var h=jsonPath(m.evalJSON(),"$.properties.processn");
var k=jsonPath(m.evalJSON(),"$.properties.package");
var i=jsonPath(m.evalJSON(),"$.properties.version");
var g="";
if(k&&k!=""){g+=k
}if(h&&h!=""){if(g!=""){g+="."
}g+=h
}if(i&&i!=""){if(g!=""){g+="."
}g+="v"+i
}if(g==""){g="processsvg"
}var b="post";
var c=document.createElement("form");
c.setAttribute("name","storetofileform");
c.setAttribute("method",b);
c.setAttribute("action",ORYX.PATH+"filestore");
c.setAttribute("target","_blank");
var l=document.createElement("input");
l.setAttribute("type","hidden");
l.setAttribute("name","fname");
l.setAttribute("value",g);
c.appendChild(l);
var e=document.createElement("input");
e.setAttribute("type","hidden");
e.setAttribute("name","fext");
e.setAttribute("value","svg");
c.appendChild(e);
var f=document.createElement("input");
f.setAttribute("type","hidden");
f.setAttribute("name","storeinrepo");
f.setAttribute("value","true");
c.appendChild(f);
var p=document.createElement("input");
p.setAttribute("type","hidden");
p.setAttribute("name","uuid");
p.setAttribute("value",ORYX.UUID);
c.appendChild(p);
var j=document.createElement("input");
j.setAttribute("type","hidden");
j.setAttribute("name","profile");
j.setAttribute("value",ORYX.PROFILE);
c.appendChild(j);
var m=ORYX.EDITOR.getSerializedJSON();
var a=jsonPath(m.evalJSON(),"$.properties.id");
var o=document.createElement("input");
o.setAttribute("type","hidden");
o.setAttribute("name","processid");
o.setAttribute("value",a);
c.appendChild(o);
var n=document.createElement("input");
n.setAttribute("type","hidden");
n.setAttribute("name","data_encoded");
n.setAttribute("value",Base64.encode(d));
c.appendChild(n);
document.body.appendChild(c);
c.submit()
},showAsPDF:function(){var k="pdf";
var d=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(true,true));
var b="post";
var c=document.createElement("form");
c.setAttribute("name","transformerform");
c.setAttribute("method",b);
c.setAttribute("action",ORYX.CONFIG.TRANSFORMER_URL());
c.setAttribute("target","_blank");
var h=document.createElement("input");
h.setAttribute("type","hidden");
h.setAttribute("name","fsvg");
h.setAttribute("value",Base64.encode(d));
c.appendChild(h);
var j=document.createElement("input");
j.setAttribute("type","hidden");
j.setAttribute("name","uuid");
j.setAttribute("value",ORYX.UUID);
c.appendChild(j);
var f=document.createElement("input");
f.setAttribute("type","hidden");
f.setAttribute("name","profile");
f.setAttribute("value",ORYX.PROFILE);
c.appendChild(f);
var e=document.createElement("input");
e.setAttribute("type","hidden");
e.setAttribute("name","transformto");
e.setAttribute("value",k);
c.appendChild(e);
var g=ORYX.EDITOR.getSerializedJSON();
var a=jsonPath(g.evalJSON(),"$.properties.id");
var i=document.createElement("input");
i.setAttribute("type","hidden");
i.setAttribute("name","processid");
i.setAttribute("value",a);
c.appendChild(i);
document.body.appendChild(c);
c.submit()
},showProcessSVG:function(){var d=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(true));
var b=new Ext.form.TextArea({id:"svgSourceTextArea",fieldLabel:ORYX.I18N.view.processSVGSource,value:d,autoScroll:true});
var c=new Ext.Window({width:600,id:"processSVGSource",height:550,layout:"fit",title:ORYX.I18N.view.processSVGSource,items:[b],buttons:[{text:ORYX.I18N.Save.close,handler:function(){c.close();
c=null;
b=null;
a=null
}.bind(this)}]});
c.show();
this.foldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
var a=CodeMirror.fromTextArea(document.getElementById("svgSourceTextArea"),{mode:"application/xml",lineNumbers:true,lineWrapping:true,onGutterClick:this.foldFunc})
},showProcessERDF:function(){var d=ORYX.EDITOR.getERDF();
var b=new Ext.form.TextArea({id:"erdfSourceTextArea",fieldLabel:ORYX.I18N.view.erdfSource,value:d,autoScroll:true,height:"80%"});
var c=new Ext.Window({width:600,id:"processERDFSource",height:550,layout:"fit",title:ORYX.I18N.view.erdfSource,items:[b],buttons:[{text:ORYX.I18N.Save.close,handler:function(){c.close();
c=null;
b=null;
a=null
}.bind(this)}]});
c.show();
this.foldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
var a=CodeMirror.fromTextArea(document.getElementById("erdfSourceTextArea"),{mode:"application/xml",lineNumbers:true,lineWrapping:true,onGutterClick:this.foldFunc})
},showProcessJSON:function(){var b=ORYX.EDITOR.getSerializedJSON();
var c=new Ext.form.TextArea({id:"jsonSourceTextArea",fieldLabel:ORYX.I18N.view.jsonSource,value:b,autoScroll:true});
var d=new Ext.Window({width:600,id:"processJSONSource",height:550,layout:"fit",title:ORYX.I18N.view.jsonSource,items:[c],buttons:[{text:ORYX.I18N.Save.close,handler:function(){d.close();
d=null;
c=null;
a=null
}.bind(this)}]});
d.show();
this.foldFunc=CodeMirror.newFoldFunction(CodeMirror.braceRangeFinder);
var a=CodeMirror.fromTextArea(document.getElementById("jsonSourceTextArea"),{mode:"application/json",lineNumbers:true,lineWrapping:true,onGutterClick:this.foldFunc})
},showProcessBPMN:function(){var a=ORYX.EDITOR.getSerializedJSON();
Ext.Ajax.request({url:ORYX.PATH+"uuidRepository",method:"POST",success:function(c){try{var d=new Ext.form.TextArea({id:"bpmnSourceTextArea",fieldLabel:ORYX.I18N.view.bpmn2Source,value:c.responseText,autoScroll:true});
var g=new Ext.Window({width:600,id:"processBPMNSource",height:550,layout:"fit",title:ORYX.I18N.view.bpmn2Source,items:[d],buttons:[{text:ORYX.I18N.view.saveToFile,handler:function(){var p=ORYX.EDITOR.getSerializedJSON();
var k=jsonPath(p.evalJSON(),"$.properties.processn");
var n=jsonPath(p.evalJSON(),"$.properties.package");
var l=jsonPath(p.evalJSON(),"$.properties.version");
var j="";
if(n&&n!=""){j+=n
}if(k&&k!=""){if(j!=""){j+="."
}j+=k
}if(l&&l!=""){if(j!=""){j+="."
}j+="v"+l
}if(j==""){j="processbpmn2"
}var m=d.getValue();
var e="post";
var h=document.createElement("form");
h.setAttribute("name","storetofileform");
h.setAttribute("method",e);
h.setAttribute("action",ORYX.PATH+"filestore");
h.setAttribute("target","_blank");
var o=document.createElement("input");
o.setAttribute("type","hidden");
o.setAttribute("name","fname");
o.setAttribute("value",j);
h.appendChild(o);
var i=document.createElement("input");
i.setAttribute("type","hidden");
i.setAttribute("name","fext");
i.setAttribute("value","bpmn2");
h.appendChild(i);
var q=document.createElement("input");
q.setAttribute("type","hidden");
q.setAttribute("name","data");
q.setAttribute("value",m);
h.appendChild(q);
document.body.appendChild(h);
h.submit()
}},{text:ORYX.I18N.Save.close,handler:function(){g.close();
g=null;
d=null;
b=null
}.bind(this)}]});
g.show();
this.foldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
var b=CodeMirror.fromTextArea(document.getElementById("bpmnSourceTextArea"),{mode:"application/xml",lineNumbers:true,lineWrapping:true,onGutterClick:this.foldFunc})
}catch(f){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.convertingToBPMN2Fail+":"+f,title:""})
}}.createDelegate(this),failure:function(){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.convertingToBPMN2Fail+".",title:""})
},params:{action:"toXML",pp:ORYX.PREPROCESSING,profile:ORYX.PROFILE,data:a}})
},showProcessSources:function(){var a=ORYX.EDITOR.getSerializedJSON();
var c=ORYX.EDITOR.getERDF();
var b=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(true));
Ext.Ajax.request({url:ORYX.PATH+"uuidRepository",method:"POST",success:function(k){try{var g=new Ext.form.TextArea({id:"bpmnSourceTextArea",fieldLabel:"BPMN2",value:k.responseText,autoScroll:true});
var q=new Ext.Panel({title:"BPMN2",layout:"fit",border:false,items:[g],style:"padding-bottom:20px",listeners:{afterlayout:function(e){this.bpmn2FoldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
var s=CodeMirror.fromTextArea(document.getElementById("bpmnSourceTextArea"),{mode:"application/xml",lineNumbers:true,lineWrapping:true,onGutterClick:this.bpmn2FoldFunc})
}}});
var r=new Ext.form.TextArea({id:"jsonSourceTextArea",fieldLabel:"JSON",value:a,autoScroll:true});
var i=new Ext.Panel({title:"JSON",layout:"fit",border:false,items:[r],style:"padding-bottom:20px",listeners:{afterlayout:function(s){this.jsonFoldFunc=CodeMirror.newFoldFunction(CodeMirror.braceRangeFinder);
var e=CodeMirror.fromTextArea(document.getElementById("jsonSourceTextArea"),{mode:"application/json",lineNumbers:true,lineWrapping:true,onGutterClick:this.jsonFoldFunc})
}}});
var d=new Ext.form.TextArea({id:"erdfSourceTextArea",fieldLabel:"ERDF",value:c,autoScroll:true});
var p=new Ext.Panel({title:"ERDF",layout:"fit",border:false,items:[d],style:"padding-bottom:20px",listeners:{afterlayout:function(s){this.erdfFoldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
var e=CodeMirror.fromTextArea(document.getElementById("erdfSourceTextArea"),{mode:"application/xml",lineNumbers:true,lineWrapping:true,onGutterClick:this.erdfFoldFunc})
}}});
var j=new Ext.form.TextArea({id:"svgSourceTextArea",fieldLabel:"SVG",value:b,autoScroll:true});
var m=new Ext.Panel({title:"SVG",layout:"fit",border:false,items:[j],style:"padding-bottom:10px",listeners:{afterlayout:function(s){this.svgFoldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
var e=CodeMirror.fromTextArea(document.getElementById("svgSourceTextArea"),{mode:"application/xml",lineNumbers:true,lineWrapping:true,onGutterClick:this.svgFoldFunc})
}}});
var h=new Ext.TabPanel({activeTab:0,border:false,width:"100%",height:"100%",tabPosition:"top",layoutOnTabChange:true,deferredRender:false,defaults:{autoHeight:true,autoScroll:true},items:[q,i,m,p]});
var n=new Ext.Button({text:ORYX.I18N.view.downloadBPMN2,handler:function(){var A=ORYX.EDITOR.getSerializedJSON();
var v=jsonPath(A.evalJSON(),"$.properties.processn");
var y=jsonPath(A.evalJSON(),"$.properties.package");
var w=jsonPath(A.evalJSON(),"$.properties.version");
var u="";
if(y&&y!=""){u+=y
}if(v&&v!=""){if(u!=""){u+="."
}u+=v
}if(w&&w!=""){if(u!=""){u+="."
}u+="v"+w
}if(u==""){u="processbpmn2"
}var x=k.responseText;
var e="post";
var s=document.createElement("form");
s.setAttribute("name","storetofileform");
s.setAttribute("method",e);
s.setAttribute("action",ORYX.PATH+"filestore");
s.setAttribute("target","_blank");
var z=document.createElement("input");
z.setAttribute("type","hidden");
z.setAttribute("name","fname");
z.setAttribute("value",u);
s.appendChild(z);
var t=document.createElement("input");
t.setAttribute("type","hidden");
t.setAttribute("name","fext");
t.setAttribute("value","bpmn2");
s.appendChild(t);
var B=document.createElement("input");
B.setAttribute("type","hidden");
B.setAttribute("name","data");
B.setAttribute("value",x);
s.appendChild(B);
document.body.appendChild(s);
s.submit()
}});
var f=ORYX.Utils.getDialogSize(550,600);
if(this.sourcewin!=null&&this.sourcewin!==undefined){this.sourcewin.destroy()
}this.sourcewin=new Ext.Window({id:"processSources",height:f.height,width:f.width,layout:"fit",title:ORYX.I18N.view.processSources,items:[h],tbar:[n],listeners:{hide:function(){this.sourcewin.destroy()
}.bind(this)}});
this.sourcewin.show();
this.bpmn2FoldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
var l=CodeMirror.fromTextArea(document.getElementById("bpmnSourceTextArea"),{mode:"application/xml",lineNumbers:true,lineWrapping:true,onGutterClick:this.bpmn2FoldFunc})
}catch(o){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.convertingToBPMN2Fail+":"+o,title:""})
}}.createDelegate(this),failure:function(){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.convertingToBPMN2Fail+".",title:""})
},params:{action:"toXML",pp:ORYX.PREPROCESSING,profile:ORYX.PROFILE,data:a}})
},showAsPNG:function(){var k="png";
var d=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(true,true));
var b="post";
var c=document.createElement("form");
c.setAttribute("name","transformerform");
c.setAttribute("method",b);
c.setAttribute("action",ORYX.CONFIG.TRANSFORMER_URL());
c.setAttribute("target","_blank");
var h=document.createElement("input");
h.setAttribute("type","hidden");
h.setAttribute("name","fsvg");
h.setAttribute("value",Base64.encode(d));
c.appendChild(h);
var j=document.createElement("input");
j.setAttribute("type","hidden");
j.setAttribute("name","uuid");
j.setAttribute("value",ORYX.UUID);
c.appendChild(j);
var f=document.createElement("input");
f.setAttribute("type","hidden");
f.setAttribute("name","profile");
f.setAttribute("value",ORYX.PROFILE);
c.appendChild(f);
var e=document.createElement("input");
e.setAttribute("type","hidden");
e.setAttribute("name","transformto");
e.setAttribute("value",k);
c.appendChild(e);
var g=ORYX.EDITOR.getSerializedJSON();
var a=jsonPath(g.evalJSON(),"$.properties.id");
var i=document.createElement("input");
i.setAttribute("type","hidden");
i.setAttribute("name","processid");
i.setAttribute("value",a);
c.appendChild(i);
document.body.appendChild(c);
c.submit()
},zoom:function(d){this.zoomLevel*=d;
var h=this.facade.getCanvas().getHTMLContainer().parentNode.parentNode;
var c=this.facade.getCanvas();
var g=c.bounds.width()*this.zoomLevel;
var a=c.bounds.height()*this.zoomLevel;
var f=(c.node.parentNode.parentNode.parentNode.offsetHeight-a)/2;
f=f>20?f-20:0;
c.node.parentNode.parentNode.style.marginTop=f+"px";
f+=5;
c.getHTMLContainer().style.top=f+"px";
var b=h.scrollTop-Math.round((c.getHTMLContainer().parentNode.getHeight()-a)/2)+this.diff;
var e=h.scrollLeft-Math.round((c.getHTMLContainer().parentNode.getWidth()-g)/2)+this.diff;
c.setSize({width:g,height:a},true);
c.node.setAttributeNS(null,"transform","scale("+this.zoomLevel+")");
this.facade.updateSelection();
h.scrollTop=b;
h.scrollLeft=e;
c.zoomLevel=this.zoomLevel
},zoomFitToModel:function(){var h=this.facade.getCanvas().getHTMLContainer().parentNode.parentNode;
var b=h.getHeight()-30;
var d=h.getWidth()-30;
var c=this.facade.getCanvas().getChildShapes();
if(!c||c.length<1){return false
}var g=c[0].absoluteBounds().clone();
c.each(function(i){g.include(i.absoluteBounds().clone())
});
var f=d/g.width();
var a=b/g.height();
var e=a<f?a:f;
if(e>this.maxFitToScreenLevel){e=this.maxFitToScreenLevel
}this.setAFixZoomLevel(e);
h.scrollTop=Math.round(g.upperLeft().y*this.zoomLevel)-5;
h.scrollLeft=Math.round(g.upperLeft().x*this.zoomLevel)-5
},_checkSize:function(){var a=this.facade.getCanvas().getHTMLContainer().parentNode;
var b=Math.min((a.parentNode.getWidth()/a.getWidth()),(a.parentNode.getHeight()/a.getHeight()));
return 0.7>b
},_checkZoomLevelRange:function(){if(this.zoomLevel<this.minZoomLevel){this.zoomLevel=this.minZoomLevel
}if(this.zoomLevel>this.maxZoomLevel){this.zoomLevel=this.maxZoomLevel
}},refreshCanvasForIE:function(b){if((Object.hasOwnProperty.call(window,"ActiveXObject")&&!window.ActiveXObject)||(navigator.appVersion.indexOf("MSIE 10")!==-1)){if(!b.shape){var c=this.facade.getSelection();
if(c&&c.length>0&&c[0] instanceof ORYX.Core.Node){var a=c[0];
a.properties["oryx-invisid"]=Math.random();
b.shape=a
}}var h=ORYX.EDITOR.getSerializedJSON();
this.facade.setSelection(this.facade.getCanvas().getChildShapes(true));
var d=this.facade.getSelection();
var e=new ORYX.Plugins.Edit.ClipBoard();
e.refresh(d,this.getAllShapesToConsider(d,true));
var g=new ORYX.Plugins.Edit.DeleteCommand(e,this.facade);
this.facade.executeCommands([g]);
this.facade.importJSON(h);
var f=false;
f=this.findSelectedShape(b.shape,b);
if(f){this.facade.setSelection([f])
}else{this.facade.setSelection([])
}}},findSelectedShape:function(a,b){var c=false;
if(b&&b.shape){ORYX.EDITOR._canvas.getChildren().each((function(d){if(d instanceof ORYX.Core.Node||d instanceof ORYX.Core.Edge){if(b.shape.properties["oryx-invisid"]==d.properties["oryx-invisid"]){c=d
}}}).bind(this))
}return c
}};
ORYX.Plugins.View=Clazz.extend(ORYX.Plugins.View);
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.DragDropResize=ORYX.Plugins.AbstractPlugin.extend({construct:function(b){this.facade=b;
this.currentShapes=[];
this.toMoveShapes=[];
this.distPoints=[];
this.isResizing=false;
this.dragEnable=false;
this.dragIntialized=false;
this.edgesMovable=true;
this.offSetPosition={x:0,y:0};
this.faktorXY={x:1,y:1};
this.containmentParentNode;
this.isAddingAllowed=false;
this.isAttachingAllowed=false;
this.callbackMouseMove=this.handleMouseMove.bind(this);
this.callbackMouseUp=this.handleMouseUp.bind(this);
var a=this.facade.getCanvas().getSvgContainer();
this.selectedRect=new ORYX.Plugins.SelectedRect(a);
if(ORYX.CONFIG.SHOW_GRIDLINE){this.vLine=new ORYX.Plugins.GridLine(a,ORYX.Plugins.GridLine.DIR_VERTICAL);
this.hLine=new ORYX.Plugins.GridLine(a,ORYX.Plugins.GridLine.DIR_HORIZONTAL)
}a=this.facade.getCanvas().getHTMLContainer();
this.scrollNode=this.facade.getCanvas().rootNode.parentNode.parentNode;
this.resizerSE=new ORYX.Plugins.Resizer(a,"southeast",this.facade);
this.resizerSE.registerOnResize(this.onResize.bind(this));
this.resizerSE.registerOnResizeEnd(this.onResizeEnd.bind(this));
this.resizerSE.registerOnResizeStart(this.onResizeStart.bind(this));
this.resizerNW=new ORYX.Plugins.Resizer(a,"northwest",this.facade);
this.resizerNW.registerOnResize(this.onResize.bind(this));
this.resizerNW.registerOnResizeEnd(this.onResizeEnd.bind(this));
this.resizerNW.registerOnResizeStart(this.onResizeStart.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN,this.handleMouseDown.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_START,this.hideAllLabelsForCurrent.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_END,this.showAllLabelsForCurrent.bind(this))
},handleMouseDown:function(d,c){if(!this.dragBounds||!this.currentShapes.member(c)||!this.toMoveShapes.length){return
}this.dragEnable=true;
this.dragIntialized=true;
this.edgesMovable=true;
var b=this.facade.getCanvas().node.getScreenCTM();
this.faktorXY.x=b.a;
this.faktorXY.y=b.d;
var e=this.dragBounds.upperLeft();
this.offSetPosition={x:Event.pointerX(d)-(e.x*this.faktorXY.x),y:Event.pointerY(d)-(e.y*this.faktorXY.y)};
this.offsetScroll={x:this.scrollNode.scrollLeft,y:this.scrollNode.scrollTop};
document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE,this.callbackMouseMove,false);
document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEUP,this.callbackMouseUp,true);
return
},handleMouseUp:function(d){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,highlightId:"dragdropresize.contain"});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,highlightId:"dragdropresize.attached"});
if(this.dragEnable){if(!this.dragIntialized){this.afterDrag();
if(this.isAttachingAllowed&&this.toMoveShapes.length==1&&this.toMoveShapes[0] instanceof ORYX.Core.Node&&this.toMoveShapes[0].dockers.length>0){var b=this.facade.eventCoordinates(d);
var e=this.toMoveShapes[0].dockers[0];
var c=ORYX.Core.Command.extend({construct:function(i,f,h,g){this.docker=i;
this.newPosition=f;
this.newDockedShape=h;
this.newParent=h.parent||g.getCanvas();
this.oldPosition=i.parent.bounds.center();
this.oldDockedShape=i.getDockedShape();
this.oldParent=i.parent.parent||g.getCanvas();
this.facade=g;
if(this.oldDockedShape){this.oldPosition=i.parent.absoluteBounds().center()
}},execute:function(){this.dock(this.newDockedShape,this.newParent,this.newPosition);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_ARRANGEMENT_TOP,excludeCommand:true})
},rollback:function(){this.dock(this.oldDockedShape,this.oldParent,this.oldPosition)
},dock:function(f,g,h){g.add(this.docker.parent);
this.docker.setDockedShape(undefined);
this.docker.bounds.centerMoveTo(h);
this.docker.setDockedShape(f);
this.facade.setSelection([this.docker.parent]);
this.facade.getCanvas().update();
this.facade.updateSelection()
}});
var a=[new c(e,b,this.containmentParentNode,this.facade)];
this.facade.executeCommands(a)
}else{if(this.isAddingAllowed){this.refreshSelectedShapes()
}}this.facade.updateSelection();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DRAGDROP_END})
}if(this.vLine){this.vLine.hide()
}if(this.hLine){this.hLine.hide()
}}this.dragEnable=false;
document.documentElement.removeEventListener(ORYX.CONFIG.EVENT_MOUSEUP,this.callbackMouseUp,true);
document.documentElement.removeEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE,this.callbackMouseMove,false);
return
},handleMouseMove:function(g){if(!this.dragEnable){return
}if(this.dragIntialized){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DRAGDROP_START});
this.dragIntialized=false;
this.resizerSE.hide();
this.resizerNW.hide();
this._onlyEdges=this.currentShapes.all(function(c){return(c instanceof ORYX.Core.Edge)
});
this.beforeDrag();
this._currentUnderlyingNodes=[]
}var a={x:Event.pointerX(g)-this.offSetPosition.x,y:Event.pointerY(g)-this.offSetPosition.y};
a.x-=this.offsetScroll.x-this.scrollNode.scrollLeft;
a.y-=this.offsetScroll.y-this.scrollNode.scrollTop;
var b=g.shiftKey||g.ctrlKey;
if(ORYX.CONFIG.GRID_ENABLED&&!b){a=this.snapToGrid(a)
}else{if(this.vLine){this.vLine.hide()
}if(this.hLine){this.hLine.hide()
}}a.x/=this.faktorXY.x;
a.y/=this.faktorXY.y;
a.x=Math.max(0,a.x);
a.y=Math.max(0,a.y);
var h=this.facade.getCanvas();
a.x=Math.min(h.bounds.width()-this.dragBounds.width(),a.x);
a.y=Math.min(h.bounds.height()-this.dragBounds.height(),a.y);
offset={x:a.x-this.dragBounds.upperLeft().x,y:a.y-this.dragBounds.upperLeft().y};
this.dragBounds.moveBy(offset);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DRAG_TRACKER_DRAG,shapes:this.currentShapes,bounds:this.dragBounds});
this.resizeRectangle(this.dragBounds);
this.isAttachingAllowed=false;
var d=$A(this.facade.getCanvas().getAbstractShapesAtPosition(this.facade.eventCoordinates(g)));
var f=this.toMoveShapes.length==1&&this.toMoveShapes[0] instanceof ORYX.Core.Node&&this.toMoveShapes[0].dockers.length>0;
f=f&&d.length!=1;
if(!f&&d.length===this._currentUnderlyingNodes.length&&d.all(function(i,c){return this._currentUnderlyingNodes[c]===i
}.bind(this))){return
}else{if(this._onlyEdges){this.isAddingAllowed=true;
this.containmentParentNode=this.facade.getCanvas()
}else{var e={event:g,underlyingNodes:d,checkIfAttachable:f};
this.checkRules(e)
}}this._currentUnderlyingNodes=d.reverse();
if(this.isAttachingAllowed){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,highlightId:"dragdropresize.attached",elements:[this.containmentParentNode],style:ORYX.CONFIG.SELECTION_HIGHLIGHT_STYLE_RECTANGLE,color:ORYX.CONFIG.SELECTION_VALID_COLOR})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,highlightId:"dragdropresize.attached"})
}if(!this.isAttachingAllowed){if(this.isAddingAllowed){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,highlightId:"dragdropresize.contain",elements:[this.containmentParentNode],color:ORYX.CONFIG.SELECTION_VALID_COLOR})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,highlightId:"dragdropresize.contain",elements:[this.containmentParentNode],color:ORYX.CONFIG.SELECTION_INVALID_COLOR})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,highlightId:"dragdropresize.contain"})
}return
},checkRules:function(d){var f=d.event;
var c=d.underlyingNodes;
var e=d.checkIfAttachable;
var b=d.noEdges;
this.containmentParentNode=c.reverse().find((function(g){return(g instanceof ORYX.Core.Canvas)||(((g instanceof ORYX.Core.Node)||((g instanceof ORYX.Core.Edge)&&!b))&&(!(this.currentShapes.member(g)||this.currentShapes.any(function(h){return(h.children.length>0&&h.getChildNodes(true).member(g))
}))))
}).bind(this));
if(e&&this.containmentParentNode){this.isAttachingAllowed=this.facade.getRules().canConnect({sourceShape:this.containmentParentNode,edgeShape:this.toMoveShapes[0],targetShape:this.toMoveShapes[0]});
if(this.containmentParentNode&&this.containmentParentNode.properties["oryx-tasktype"]&&this.containmentParentNode.properties["oryx-tasktype"]=="Script"){this.isAttachingAllowed=false
}if(this.isAttachingAllowed){var a=this.facade.eventCoordinates(f);
this.isAttachingAllowed=this.containmentParentNode.isPointOverOffset(a.x,a.y)
}}if(!this.isAttachingAllowed){this.isAddingAllowed=this.toMoveShapes.all((function(g){if(g instanceof ORYX.Core.Edge||g instanceof ORYX.Core.Controls.Docker||this.containmentParentNode===g.parent){return true
}else{if(this.containmentParentNode!==g){if(!(this.containmentParentNode instanceof ORYX.Core.Edge)||!b){if(this.facade.getRules().canContain({containingShape:this.containmentParentNode,containedShape:g})){return true
}}}}return false
}).bind(this))
}if(!this.isAttachingAllowed&&!this.isAddingAllowed&&(this.containmentParentNode instanceof ORYX.Core.Edge)){d.noEdges=true;
d.underlyingNodes.reverse();
this.checkRules(d)
}},refreshSelectedShapes:function(){if(!this.dragBounds){return
}var d=this.dragBounds.upperLeft();
var b=this.oldDragBounds.upperLeft();
var c={x:d.x-b.x,y:d.y-b.y};
var a=[new ORYX.Core.Command.Move(this.toMoveShapes,c,null,this.containmentParentNode,this.currentShapes,this,true)];
if(this._undockedEdgesCommand instanceof ORYX.Core.Command){a.unshift(this._undockedEdgesCommand)
}this.facade.executeCommands(a);
if(this.dragBounds){this.oldDragBounds=this.dragBounds.clone()
}},onResize:function(a){if(!this.dragBounds){return
}this.dragBounds=a;
this.isResizing=true;
this.resizeRectangle(this.dragBounds)
},onResizeStart:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_RESIZE_START})
},onResizeEnd:function(){if(!(this.currentShapes instanceof Array)||this.currentShapes.length<=0){return
}if(this.isResizing){var a=ORYX.Core.Command.extend({construct:function(f,h,g){this.shape=f;
this.oldBounds=f.bounds.clone();
this.newBounds=h;
this.plugin=g
},execute:function(){this.shape.bounds.set(this.newBounds.a,this.newBounds.b);
this.update(this.getOffset(this.oldBounds,this.newBounds))
},rollback:function(){this.shape.bounds.set(this.oldBounds.a,this.oldBounds.b);
this.update(this.getOffset(this.newBounds,this.oldBounds))
},getOffset:function(g,f){return{x:f.a.x-g.a.x,y:f.a.y-g.a.y,xs:f.width()/g.width(),ys:f.height()/g.height()}
},update:function(g){this.shape.getLabels().each(function(h){h.changed();
h.show()
});
var f=[].concat(this.shape.getIncomingShapes()).concat(this.shape.getOutgoingShapes()).findAll(function(h){return h instanceof ORYX.Core.Edge
}.bind(this));
this.plugin.layoutEdges(this.shape,f,g);
this.plugin.doLayout([this.shape]);
this.plugin.facade.setSelection([this.shape]);
this.plugin.facade.getCanvas().update();
this.plugin.facade.updateSelection()
}});
var c=this.dragBounds.clone();
var b=this.currentShapes[0];
if(b.parent){var e=b.parent.absoluteXY();
c.moveBy(-e.x,-e.y)
}var d=new a(b,c,this);
this.facade.executeCommands([d]);
this.isResizing=false;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_RESIZE_END,shapes:[b]})
}},beforeDrag:function(){var a=ORYX.Core.Command.extend({construct:function(b){this.dockers=b.collect(function(c){return c instanceof ORYX.Core.Controls.Docker?{docker:c,dockedShape:c.getDockedShape(),refPoint:c.referencePoint}:undefined
}).compact()
},execute:function(){this.dockers.each(function(b){b.docker.setDockedShape(undefined)
})
},rollback:function(){this.dockers.each(function(b){b.docker.setDockedShape(b.dockedShape);
b.docker.setReferencePoint(b.refPoint)
})
}});
this._undockedEdgesCommand=new a(this.toMoveShapes);
this._undockedEdgesCommand.execute()
},hideAllLabelsForCurrent:function(){ORYX.EDITOR._canvas.getChildren().each((function(a){this.applyHideLabels(a)
}).bind(this))
},applyHideLabels:function(a){if(a instanceof ORYX.Core.Node||a instanceof ORYX.Core.Edge){a.getLabels().each(function(c){c.hide();
c.update()
})
}if(a.getChildren().size()>0){for(var b=0;
b<a.getChildren().size();
b++){if(a.getChildren()[b] instanceof ORYX.Core.Node||a.getChildren()[b] instanceof ORYX.Core.Edge){this.applyHideLabels(a.getChildren()[b])
}}}},hideAllLabels:function(a){a.getLabels().each(function(b){b.hide()
});
a.getAllDockedShapes().each(function(b){var c=b.getLabels();
if(c.length>0){c.each(function(d){d.hide()
})
}});
a.getChildren().each((function(b){if(b instanceof ORYX.Core.Shape){this.hideAllLabels(b)
}}).bind(this))
},afterDrag:function(){},showAllLabelsForCurrent:function(){document.getSelection().removeAllRanges();
ORYX.EDITOR._canvas.getChildren().each((function(a){this.applyShowLabels(a)
}).bind(this))
},applyShowLabels:function(a){if(a instanceof ORYX.Core.Node||a instanceof ORYX.Core.Edge){a.getLabels().each(function(c){c.show();
c.update()
})
}if(a.getChildren().size()>0){for(var b=0;
b<a.getChildren().size();
b++){if(a.getChildren()[b] instanceof ORYX.Core.Node||a.getChildren()[b] instanceof ORYX.Core.Edge){this.applyShowLabels(a.getChildren()[b])
}}}},showAllLabels:function(a){for(var d=0;
d<a.length;
d++){var b=a[d];
b.show()
}var f=a.getAllDockedShapes();
for(var d=0;
d<f.length;
d++){var c=f[d];
var g=c.getLabels();
if(g.length>0){g.each(function(h){h.show()
})
}}for(var d=0;
d<a.children.length;
d++){var e=a.children[d];
if(e instanceof ORYX.Core.Shape){this.showAllLabels(e)
}}},onSelectionChanged:function(b){this.resizerSE.onSelectionChanged(b);
this.resizerNW.onSelectionChanged(b);
var d=b.elements;
this.dragEnable=false;
this.dragIntialized=false;
this.resizerSE.hide();
this.resizerNW.hide();
if(!d||d.length==0){this.selectedRect.hide();
this.currentShapes=[];
this.toMoveShapes=[];
this.dragBounds=undefined;
this.oldDragBounds=undefined
}else{this.currentShapes=d;
var e=this.facade.getCanvas().getShapesWithSharedParent(d);
this.toMoveShapes=e;
this.toMoveShapes=this.toMoveShapes.findAll(function(f){return f instanceof ORYX.Core.Node&&(f.dockers.length===0||!d.member(f.dockers.first().getDockedShape()))
});
d.each((function(f){if(!(f instanceof ORYX.Core.Edge)){return
}var h=f.getDockers();
var i=d.member(h.first().getDockedShape());
var g=d.member(h.last().getDockedShape());
if(!i&&!g){var j=!h.first().getDockedShape()&&!h.last().getDockedShape();
if(j){this.toMoveShapes=this.toMoveShapes.concat(h)
}}if(f.dockers.length>2&&i&&g){this.toMoveShapes=this.toMoveShapes.concat(h.findAll(function(l,k){return k>0&&k<h.length-1
}))
}}).bind(this));
var c=undefined;
this.toMoveShapes.each(function(g){var f=g;
if(g instanceof ORYX.Core.Controls.Docker){f=g.parent
}if(!c){c=f.absoluteBounds()
}else{c.include(f.absoluteBounds())
}}.bind(this));
if(!c){d.each(function(f){if(!c){c=f.absoluteBounds()
}else{c.include(f.absoluteBounds())
}})
}this.dragBounds=c;
this.oldDragBounds=c.clone();
this.resizeRectangle(c);
this.selectedRect.show();
if(d.length==1&&d[0].isResizable){var a=d[0].getStencil().fixedAspectRatio()?d[0].bounds.width()/d[0].bounds.height():undefined;
this.resizerSE.setBounds(this.dragBounds,d[0].minimumSize,d[0].maximumSize,a);
this.resizerSE.show();
this.resizerNW.setBounds(this.dragBounds,d[0].minimumSize,d[0].maximumSize,a);
this.resizerNW.show()
}else{this.resizerSE.setBounds(undefined);
this.resizerNW.setBounds(undefined)
}if(ORYX.CONFIG.GRID_ENABLED){this.distPoints=[];
if(this.distPointTimeout){window.clearTimeout(this.distPointTimeout)
}this.distPointTimeout=window.setTimeout(function(){var f=this.facade.getCanvas().getChildShapes(true).findAll(function(h){var g=h.parent;
while(g){if(d.member(g)){return false
}g=g.parent
}return true
});
f.each((function(j){if(!(j instanceof ORYX.Core.Edge)){var h=j.absoluteXY();
var i=j.bounds.width();
var g=j.bounds.height();
this.distPoints.push({ul:{x:h.x,y:h.y},c:{x:h.x+(i/2),y:h.y+(g/2)},lr:{x:h.x+i,y:h.y+g}})
}}).bind(this))
}.bind(this),10)
}}},snapToGrid:function(h){var a=this.dragBounds;
var n={};
var m=6;
var k=10;
var o=6;
var b=this.vLine?this.vLine.getScale():1;
var j={x:(h.x/b),y:(h.y/b)};
var l={x:(h.x/b)+(a.width()/2),y:(h.y/b)+(a.height()/2)};
var g={x:(h.x/b)+(a.width()),y:(h.y/b)+(a.height())};
var f,d;
var i,e;
this.distPoints.each(function(q){var c,s,r,p;
if(Math.abs(q.c.x-l.x)<k){c=q.c.x-l.x;
r=q.c.x
}if(Math.abs(q.c.y-l.y)<k){s=q.c.y-l.y;
p=q.c.y
}if(c!==undefined){f=f===undefined?c:(Math.abs(c)<Math.abs(f)?c:f);
if(f===c){i=r
}}if(s!==undefined){d=d===undefined?s:(Math.abs(s)<Math.abs(d)?s:d);
if(d===s){e=p
}}});
if(f!==undefined){j.x+=f;
j.x*=b;
if(this.vLine&&i){this.vLine.update(i)
}}else{j.x=(h.x-(h.x%(ORYX.CONFIG.GRID_DISTANCE/2)));
if(this.vLine){this.vLine.hide()
}}if(d!==undefined){j.y+=d;
j.y*=b;
if(this.hLine&&e){this.hLine.update(e)
}}else{j.y=(h.y-(h.y%(ORYX.CONFIG.GRID_DISTANCE/2)));
if(this.hLine){this.hLine.hide()
}}return j
},showGridLine:function(){},resizeRectangle:function(a){this.selectedRect.resize(a)
}});
ORYX.Plugins.SelectedRect=Clazz.extend({construct:function(a){this.parentId=a;
this.node=ORYX.Editor.graft("http://www.w3.org/2000/svg",$(a),["g"]);
this.dashedArea=ORYX.Editor.graft("http://www.w3.org/2000/svg",this.node,["rect",{x:0,y:0,"stroke-width":1,stroke:"#777777",fill:"none","stroke-dasharray":"2,2","pointer-events":"none"}]);
this.hide()
},hide:function(){this.node.setAttributeNS(null,"display","none")
},show:function(){this.node.setAttributeNS(null,"display","inherit")
},resize:function(a){var c=a.upperLeft();
var b=ORYX.CONFIG.SELECTED_AREA_PADDING;
this.dashedArea.setAttributeNS(null,"width",a.width()+2*b);
this.dashedArea.setAttributeNS(null,"height",a.height()+2*b);
this.node.setAttributeNS(null,"transform","translate("+(c.x-b)+", "+(c.y-b)+")")
}});
ORYX.Plugins.GridLine=Clazz.extend({construct:function(b,a){if(ORYX.Plugins.GridLine.DIR_HORIZONTAL!==a&&ORYX.Plugins.GridLine.DIR_VERTICAL!==a){a=ORYX.Plugins.GridLine.DIR_HORIZONTAL
}this.parent=$(b);
this.direction=a;
this.node=ORYX.Editor.graft("http://www.w3.org/2000/svg",this.parent,["g"]);
this.line=ORYX.Editor.graft("http://www.w3.org/2000/svg",this.node,["path",{"stroke-width":1,stroke:"silver",fill:"none","stroke-dasharray":"5,5","pointer-events":"none"}]);
this.hide()
},hide:function(){this.node.setAttributeNS(null,"display","none")
},show:function(){this.node.setAttributeNS(null,"display","inherit")
},getScale:function(){try{return this.parent.parentNode.transform.baseVal.getItem(0).matrix.a
}catch(a){return 1
}},update:function(e){if(this.direction===ORYX.Plugins.GridLine.DIR_HORIZONTAL){var d=e instanceof Object?e.y:e;
var c=this.parent.parentNode.parentNode.width.baseVal.value/this.getScale();
this.line.setAttributeNS(null,"d","M 0 "+d+" L "+c+" "+d)
}else{var a=e instanceof Object?e.x:e;
var b=this.parent.parentNode.parentNode.height.baseVal.value/this.getScale();
this.line.setAttributeNS(null,"d","M"+a+" 0 L "+a+" "+b)
}this.show()
}});
ORYX.Plugins.GridLine.DIR_HORIZONTAL="hor";
ORYX.Plugins.GridLine.DIR_VERTICAL="ver";
ORYX.Plugins.Resizer=Clazz.extend({construct:function(c,a,b){this.parentId=c;
this.orientation=a;
this.facade=b;
this.node=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",$(this.parentId),["div",{"class":"resizer_"+this.orientation,style:"left:0px; top:0px;"}]);
this.node.addEventListener(ORYX.CONFIG.EVENT_MOUSEDOWN,this.handleMouseDown.bind(this),true);
document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEUP,this.handleMouseUp.bind(this),true);
document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE,this.handleMouseMove.bind(this),false);
this.dragEnable=false;
this.offSetPosition={x:0,y:0};
this.bounds=undefined;
this.canvasNode=this.facade.getCanvas().node;
this.minSize=undefined;
this.maxSize=undefined;
this.aspectRatio=undefined;
this.resizeCallbacks=[];
this.resizeStartCallbacks=[];
this.resizeEndCallbacks=[];
this.hide();
this.scrollNode=this.node.parentNode.parentNode.parentNode
},onSelectionChanged:function(a){var b=a.elements;
if(!b||b.length==0){this.currentShapes=[]
}else{this.currentShapes=b
}},handleMouseDown:function(a){this.dragEnable=true;
this.offsetScroll={x:this.scrollNode.scrollLeft,y:this.scrollNode.scrollTop};
this.offSetPosition={x:Event.pointerX(a)-this.position.x,y:Event.pointerY(a)-this.position.y};
this.resizeStartCallbacks.each((function(b){b(this.bounds)
}).bind(this))
},handleMouseUp:function(a){this.dragEnable=false;
this.containmentParentNode=null;
this.resizeEndCallbacks.each((function(b){b(this.bounds)
}).bind(this))
},handleMouseMove:function(c){if(!this.dragEnable){return
}if(c.shiftKey||c.ctrlKey){this.aspectRatio=this.bounds.width()/this.bounds.height()
}else{this.aspectRatio=undefined
}var b={x:Event.pointerX(c)-this.offSetPosition.x,y:Event.pointerY(c)-this.offSetPosition.y};
b.x-=this.offsetScroll.x-this.scrollNode.scrollLeft;
b.y-=this.offsetScroll.y-this.scrollNode.scrollTop;
b.x=Math.min(b.x,this.facade.getCanvas().bounds.width());
b.y=Math.min(b.y,this.facade.getCanvas().bounds.height());
var d={x:b.x-this.position.x,y:b.y-this.position.y};
if(this.aspectRatio){newAspectRatio=(this.bounds.width()+d.x)/(this.bounds.height()+d.y);
if(newAspectRatio>this.aspectRatio){d.x=this.aspectRatio*(this.bounds.height()+d.y)-this.bounds.width()
}else{if(newAspectRatio<this.aspectRatio){d.y=(this.bounds.width()+d.x)/this.aspectRatio-this.bounds.height()
}}}if(this.orientation==="northwest"){if(this.bounds.width()-d.x>this.maxSize.width){d.x=-(this.maxSize.width-this.bounds.width());
if(this.aspectRatio){d.y=this.aspectRatio*d.x
}}if(this.bounds.width()-d.x<this.minSize.width){d.x=-(this.minSize.width-this.bounds.width());
if(this.aspectRatio){d.y=this.aspectRatio*d.x
}}if(this.bounds.height()-d.y>this.maxSize.height){d.y=-(this.maxSize.height-this.bounds.height());
if(this.aspectRatio){d.x=d.y/this.aspectRatio
}}if(this.bounds.height()-d.y<this.minSize.height){d.y=-(this.minSize.height-this.bounds.height());
if(this.aspectRatio){d.x=d.y/this.aspectRatio
}}}else{if(this.bounds.width()+d.x>this.maxSize.width){d.x=this.maxSize.width-this.bounds.width();
if(this.aspectRatio){d.y=this.aspectRatio*d.x
}}if(this.bounds.width()+d.x<this.minSize.width){d.x=this.minSize.width-this.bounds.width();
if(this.aspectRatio){d.y=this.aspectRatio*d.x
}}if(this.bounds.height()+d.y>this.maxSize.height){d.y=this.maxSize.height-this.bounds.height();
if(this.aspectRatio){d.x=d.y/this.aspectRatio
}}if(this.bounds.height()+d.y<this.minSize.height){d.y=this.minSize.height-this.bounds.height();
if(this.aspectRatio){d.x=d.y/this.aspectRatio
}}}if(this.orientation==="northwest"){var a={x:this.bounds.lowerRight().x,y:this.bounds.lowerRight().y};
this.bounds.extend({x:-d.x,y:-d.y});
this.bounds.moveBy(d)
}else{this.bounds.extend(d)
}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DRAG_TRACKER_RESIZE,shapes:this.currentShapes,bounds:this.bounds});
this.update();
this.resizeCallbacks.each((function(e){e(this.bounds)
}).bind(this));
Event.stop(c)
},registerOnResizeStart:function(a){if(!this.resizeStartCallbacks.member(a)){this.resizeStartCallbacks.push(a)
}},unregisterOnResizeStart:function(a){if(this.resizeStartCallbacks.member(a)){this.resizeStartCallbacks=this.resizeStartCallbacks.without(a)
}},registerOnResizeEnd:function(a){if(!this.resizeEndCallbacks.member(a)){this.resizeEndCallbacks.push(a)
}},unregisterOnResizeEnd:function(a){if(this.resizeEndCallbacks.member(a)){this.resizeEndCallbacks=this.resizeEndCallbacks.without(a)
}},registerOnResize:function(a){if(!this.resizeCallbacks.member(a)){this.resizeCallbacks.push(a)
}},unregisterOnResize:function(a){if(this.resizeCallbacks.member(a)){this.resizeCallbacks=this.resizeCallbacks.without(a)
}},hide:function(){this.node.style.display="none"
},show:function(){if(this.bounds){this.node.style.display=""
}},setBounds:function(d,b,a,c){this.bounds=d;
if(!b){b={width:ORYX.CONFIG.MINIMUM_SIZE,height:ORYX.CONFIG.MINIMUM_SIZE}
}if(!a){a={width:ORYX.CONFIG.MAXIMUM_SIZE,height:ORYX.CONFIG.MAXIMUM_SIZE}
}this.minSize=b;
this.maxSize=a;
this.aspectRatio=c;
this.update()
},update:function(){if(!this.bounds){return
}var c=this.bounds.upperLeft();
if(this.bounds.width()<this.minSize.width){this.bounds.set(c.x,c.y,c.x+this.minSize.width,c.y+this.bounds.height())
}if(this.bounds.height()<this.minSize.height){this.bounds.set(c.x,c.y,c.x+this.bounds.width(),c.y+this.minSize.height)
}if(this.bounds.width()>this.maxSize.width){this.bounds.set(c.x,c.y,c.x+this.maxSize.width,c.y+this.bounds.height())
}if(this.bounds.height()>this.maxSize.height){this.bounds.set(c.x,c.y,c.x+this.bounds.width(),c.y+this.maxSize.height)
}var b=this.canvasNode.getScreenCTM();
c.x*=b.a;
c.y*=b.d;
if(this.orientation==="northwest"){c.x-=19;
c.y-=45
}else{c.x+=(b.a*this.bounds.width())+8;
c.y+=(b.d*this.bounds.height())-9
}this.position=c;
this.node.style.left=this.position.x+"px";
this.node.style.top=this.position.y+"px"
}});
ORYX.Core.Command.Move=ORYX.Core.Command.extend({construct:function(h,c,m,l,o,e,a){this.moveShapes=h;
this.selectedShapes=o;
this.offset=c;
this.newLocation=m;
this.plugin=e;
this.doLayout=a;
this.newParents=[];
var f=true;
var n;
var g;
if(h.length==1){f=false
}else{for(var b=0;
b<h.length;
b++){var j=h[b];
if(b==0){n=l;
g=j.parent
}else{if(!(l===n&&j.parent===g)){f=false
}}}}for(var d=0;
d<h.length;
d++){var j=h[d];
if(j.parent instanceof ORYX.Core.Canvas){this.newParents[d]=l||j.parent
}else{if(j.parent===l){this.newParents[d]=l||j.parent
}else{if(h.length==1){this.newParents[d]=l||j.parent
}else{if(l&&l instanceof ORYX.Core.Canvas){if(j.parent===l){this.newParents[d]=l
}else{if(!(j.parent instanceof ORYX.Core.Canvas)){if(f){this.newParents[d]=l
}else{this.newParents[d]=j.parent
}}else{this.newParents[d]=j.parent
}}}else{if(f){this.newParents[d]=l||j.parent
}else{if(j.parent!==l){this.newParents[d]=j.parent
}else{this.newParents[d]=l||j.parent
}}}}}}}this.oldParents=h.collect(function(i){return i.parent
});
this.dockedNodes=h.findAll(function(i){return i instanceof ORYX.Core.Node&&i.dockers.length==1
}).collect(function(i){return{docker:i.dockers[0],dockedShape:i.dockers[0].getDockedShape(),refPoint:i.dockers[0].referencePoint}
})
},execute:function(){this.dockAllShapes();
this.move(this.offset,this.newLocation,this.doLayout);
this.addShapeToParent(this.newParents);
this.selectCurrentShapes();
if(this.plugin){this.plugin.facade.getCanvas().update();
this.plugin.facade.updateSelection()
}},rollback:function(){var a={x:-this.offset.x,y:-this.offset.y};
this.move(a);
this.addShapeToParent(this.oldParents);
this.dockAllShapes(true);
this.selectCurrentShapes();
if(this.plugin){this.plugin.facade.getCanvas().update();
this.plugin.facade.updateSelection()
}},move:function(d,m,a){if(!this.plugin){return
}for(var g=0;
g<this.moveShapes.length;
g++){var l=this.moveShapes[g];
if(d){l.bounds.moveBy(d)
}else{l.bounds.moveTo(m)
}if(l instanceof ORYX.Core.Node){(l.dockers||[]).each(function(i){if(d){i.bounds.moveBy(d)
}});
var e=[].concat(l.getIncomingShapes()).concat(l.getOutgoingShapes()).findAll(function(i){return i instanceof ORYX.Core.Edge&&!this.moveShapes.any(function(j){return j==i||(j instanceof ORYX.Core.Controls.Docker&&j.parent==i)
})
}.bind(this)).findAll(function(i){return(i.dockers.first().getDockedShape()==l||!this.moveShapes.include(i.dockers.first().getDockedShape()))&&(i.dockers.last().getDockedShape()==l||!this.moveShapes.include(i.dockers.last().getDockedShape()))
}.bind(this));
this.plugin.layoutEdges(l,e,d);
var h=[].concat(l.getIncomingShapes()).concat(l.getOutgoingShapes()).findAll(function(i){return i instanceof ORYX.Core.Edge&&i.dockers.first().isDocked()&&i.dockers.last().isDocked()&&!this.moveShapes.include(i)&&!this.moveShapes.any(function(j){return j==i||(j instanceof ORYX.Core.Controls.Docker&&j.parent==i)
})
}.bind(this)).findAll(function(i){return this.moveShapes.indexOf(i.dockers.first().getDockedShape())>g||this.moveShapes.indexOf(i.dockers.last().getDockedShape())>g
}.bind(this));
for(var f=0;
f<h.length;
f++){for(var b=1;
b<h[f].dockers.length-1;
b++){var c=h[f].dockers[b];
if(!c.getDockedShape()&&!this.moveShapes.include(c)){c.bounds.moveBy(d)
}}}}}if(a){this.plugin.doLayout(this.moveShapes)
}},dockAllShapes:function(a){for(var b=0;
b<this.dockedNodes.length;
b++){var c=this.dockedNodes[b].docker;
c.setDockedShape(a?this.dockedNodes[b].dockedShape:undefined);
if(c.getDockedShape()){c.setReferencePoint(this.dockedNodes[b].refPoint)
}}},addShapeToParent:function(j){for(var a=0;
a<this.moveShapes.length;
a++){var d=this.moveShapes[a];
if(d instanceof ORYX.Core.Node&&d.parent!==j[a]){try{var l=j[a].absoluteXY();
var h=d.absoluteXY();
var k=h.x-l.x;
var f=h.y-l.y;
j[a].add(d);
d.getOutgoingShapes((function(b){if(b instanceof ORYX.Core.Node&&!this.moveShapes.member(b)){j[a].add(b)
}}).bind(this));
if(d instanceof ORYX.Core.Node&&d.dockers.length==1){var g=d.bounds;
k+=g.width()/2;
f+=g.height()/2;
d.dockers.first().bounds.centerMoveTo(k,f)
}else{d.bounds.moveTo(k,f)
}}catch(c){}}}},selectCurrentShapes:function(){if(this.plugin){this.plugin.facade.setSelection(this.selectedShapes)
}}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.RenameShapes=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DBLCLICK,this.actOnDBLClick.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_CLICK,this.actOnClick.bind(this));
this.facade.offer({keyCodes:[{keyCode:113,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN}],functionality:this.renamePerF2.bind(this)})
},renamePerF2:function renamePerF2(){var a=this.facade.getSelection();
this.actOnDBLClick(undefined,a.first())
},getEditableProperties:function getEditableProperties(a){var b=a.getStencil().properties().findAll(function(c){return(c.refToView()&&c.refToView().length>0&&c.directlyEditable())
});
return b.findAll(function(c){return !c.readonly()&&(c.type()==ORYX.CONFIG.TYPE_STRING||c.type()==ORYX.CONFIG.TYPE_TEXT)
})
},getPropertyForLabel:function getPropertyForLabel(c,a,b){return c.find(function(d){return d.refToView().any(function(e){return b.id==a.id+e
})
})
},actOnClick:function actOnClick(a,b){if(!(b instanceof ORYX.Core.Shape)){if(this.shownComboBox){this.hide();
this.destroy()
}}},actOnDBLClick:function actOnDBLClick(h,d){if(!(d instanceof ORYX.Core.Shape)){return
}if((d instanceof ORYX.Core.Node||d instanceof ORYX.Core.Edge)&&d.properties["oryx-isselectable"]=="false"){return
}this.hide();
this.destroy();
var e=this.getEditableProperties(d);
var f=e.collect(function(k){return k.refToView()
}).flatten().compact();
var b=d.getLabels().findAll(function(k){return f.any(function(l){return k.id.endsWith(l)
})
});
if(b.length==0){return
}var c=b.length==1?b[0]:null;
if(!c){c=b.find(function(k){return k.node==h.target||k.node==h.target.parentNode
});
if(!c){var i=this.facade.eventCoordinates(h);
var j=this.facade.getCanvas().rootNode.lastChild.getScreenCTM();
i.x*=j.a;
i.y*=j.d;
if(!d instanceof ORYX.Core.Node){var g=b.collect(function(m){var l=this.getCenterPosition(m.node);
var k=Math.sqrt(Math.pow(l.x-i.x,2)+Math.pow(l.y-i.y,2));
return{diff:k,label:m}
}.bind(this));
g.sort(function(l,k){return l.diff>k.diff
});
c=g[0].label
}else{var g=b.collect(function(m){var l=this.getDifferenceCenterForNode(m.node);
var k=Math.sqrt(Math.pow(l.x-i.x,2)+Math.pow(l.y-i.y,2));
return{diff:k,label:m}
}.bind(this));
g.sort(function(l,k){return l.diff>k.diff
});
c=g[0].label
}}}var a=this.getPropertyForLabel(e,d,c);
this.showTextField(d,a,c)
},showTextField:function showTextField(i,d,j){var h=this.facade.getCanvas().getHTMLContainer().id;
var f;
if(!(i instanceof ORYX.Core.Node)){var a=j.node.getBoundingClientRect();
f=Math.max(150,a.width)
}else{f=i.bounds.width()
}if(!i instanceof ORYX.Core.Node){var b=this.getCenterPosition(j.node);
b.x-=(f/2)
}else{var b=i.absoluteBounds().center();
b.x-=(f/2)
}var e=d.prefix()+"-"+d.id();
this.comboId=Ext.id();
var g={id:this.comboId,renderTo:h,value:i.properties[e],maxLength:d.length(),emptyText:d.title(),listeners:{specialkey:this._specialKeyPressed.bind(this),blur:function(){}.bind(this),change:function(p,o,l){if(this.shownComboBox){var n=i;
var l=n.properties[e];
var o=this.shownComboBox.getRawValue();
var m=this.facade;
if(l!=o){var k=ORYX.Core.Command.extend({construct:function(){this.el=n;
this.propId=e;
this.oldValue=l;
this.newValue=o;
this.facade=m
},execute:function(){this.el.setProperty(this.propId,this.newValue);
this.facade.setSelection([this.el]);
this.facade.getCanvas().update();
this.facade.updateSelection();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,elements:this.el,key:this.propId,value:this.newValue})
},rollback:function(){this.el.setProperty(this.propId,this.oldValue);
this.facade.setSelection([this.el]);
this.facade.getCanvas().update();
this.facade.updateSelection();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,elements:this.el,key:this.propId,value:this.oldValue})
}});
var q=new k();
this.facade.executeCommands([q])
}}}.bind(this)},hideTrigger:true,typeAhead:true,queryMode:"local",minChars:1,labelStyle:"display:none",store:ORYX.Dictionary.Dictionaryitems,displayField:"name",valueField:"name",mode:"local",triggerAction:"all",forceSelection:false,caseSensitive:false,autoSelect:false};
this.shownComboBox=new Ext.form.ComboBox(g);
this.shownComboBox.setPosition((b.x<10)?10:b.x,b.y-16);
this.shownComboBox.setSize(Math.max(100,f),40);
if(("webkitSpeech" in document.createElement("input"))){var c={"x-webkit-speech":"true"};
Ext.get(this.comboId).set(c)
}this.shownComboBox.show();
this.shownComboBox.focus("",40);
this.facade.disableEvent(ORYX.CONFIG.EVENT_KEYDOWN)
},_specialKeyPressed:function _specialKeyPressed(c,b){var a=b.getKey();
if(a==13&&(b.shiftKey||!c.initialConfig.grow)){c.fireEvent("change",null,c.getValue());
this.destroy()
}else{if(a==b.ESC){this.destroy()
}}},getCenterPosition:function(f){var a={x:0,y:0};
var c=f.getTransformToElement(this.facade.getCanvas().rootNode.lastChild);
var h=this.facade.getCanvas().rootNode.lastChild.getScreenCTM();
var b=f.getTransformToElement(f.parentNode);
var d=undefined;
a.x=c.e-b.e;
a.y=c.f-b.f;
try{d=f.getBBox()
}catch(g){}if(d===null||typeof d==="undefined"||d.width==0||d.height==0){d={x:Number(f.getAttribute("x")),y:Number(f.getAttribute("y")),width:0,height:0}
}a.x+=d.x;
a.y+=d.y;
a.x+=d.width/2;
a.y+=d.height/2;
a.x*=h.a;
a.y*=h.d;
return a
},getDifferenceCenterForNode:function getDifferenceCenterForNode(b){var a=this.getCenterPosition(b);
a.x=0;
a.y=a.y+10;
return a
},hide:function(a){if(this.shownComboBox){this.shownComboBox.fireEvent("change");
this.shownComboBox.fireEvent("blur")
}},destroy:function(a){if(this.shownComboBox){this.shownComboBox.hide();
delete this.shownComboBox;
this.facade.enableEvent(ORYX.CONFIG.EVENT_KEYDOWN)
}}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.Undo=Clazz.extend({facade:undefined,undoStack:[],redoStack:[],construct:function(a){this.facade=a;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.Undo.undo,description:ORYX.I18N.Undo.undoDesc,icon:ORYX.BASE_FILE_PATH+"images/arrow_undo.png",keyCodes:[{metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],keyCode:90,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN}],functionality:this.doUndo.bind(this),group:ORYX.I18N.Undo.group,isEnabled:function(){return this.undoStack.length>0
}.bind(this),index:0});
this.facade.offer({name:ORYX.I18N.Undo.redo,description:ORYX.I18N.Undo.redoDesc,icon:ORYX.BASE_FILE_PATH+"images/arrow_redo.png",keyCodes:[{metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],keyCode:89,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN}],functionality:this.doRedo.bind(this),group:ORYX.I18N.Undo.group,isEnabled:function(){return this.redoStack.length>0
}.bind(this),index:1})
}this.facade.registerOnEvent(ORYX.CONFIG.EVENT_EXECUTE_COMMANDS,this.handleExecuteCommands.bind(this))
},handleExecuteCommands:function(a){if(!a.commands){return
}this.undoStack.push(a.commands);
this.redoStack=[]
},doUndo:function(){var a=this.undoStack.pop();
if(a){this.redoStack.push(a);
a.each(function(b){b.rollback()
})
}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_UNDO_ROLLBACK,commands:a})
},doRedo:function(){var a=this.redoStack.pop();
if(a){this.undoStack.push(a);
a.each(function(b){b.execute()
})
}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_UNDO_EXECUTE,commands:a})
}});
Array.prototype.insertFrom=function(e,d){d=Math.max(0,d);
e=Math.min(Math.max(0,e),this.length-1);
var b=this[e];
var a=this.without(b);
var c=a.slice(0,d);
c.push(b);
if(a.length>d){c=c.concat(a.slice(d))
}return c
};
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.Arrangement=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.Arrangement.btf,functionality:this.setZLevel.bind(this,this.setToTop),group:ORYX.I18N.Arrangement.groupZ,icon:ORYX.BASE_FILE_PATH+"images/shape_move_front.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_move_backwards.png",description:ORYX.I18N.Arrangement.btfDesc,index:1,minShape:1});
this.facade.offer({name:ORYX.I18N.Arrangement.btb,functionality:this.setZLevel.bind(this,this.setToBack),group:ORYX.I18N.Arrangement.groupZ,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_move_backwards.png",icon:ORYX.BASE_FILE_PATH+"images/shape_move_back.png",description:ORYX.I18N.Arrangement.btbDesc,index:2,minShape:1});
this.facade.offer({name:ORYX.I18N.Arrangement.bf,functionality:this.setZLevel.bind(this,this.setForward),group:ORYX.I18N.Arrangement.groupZ,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_move_backwards.png",icon:ORYX.BASE_FILE_PATH+"images/shape_move_forwards.png",description:ORYX.I18N.Arrangement.bfDesc,index:3,minShape:1});
this.facade.offer({name:ORYX.I18N.Arrangement.bb,functionality:this.setZLevel.bind(this,this.setBackward),group:ORYX.I18N.Arrangement.groupZ,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_move_backwards.png",icon:ORYX.BASE_FILE_PATH+"images/shape_move_backwards.png",description:ORYX.I18N.Arrangement.bbDesc,index:4,minShape:1});
this.facade.offer({name:ORYX.I18N.Arrangement.ab,functionality:this.alignShapes.bind(this,[ORYX.CONFIG.EDITOR_ALIGN_BOTTOM]),group:ORYX.I18N.Arrangement.groupA,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_align_center.png",icon:ORYX.BASE_FILE_PATH+"images/shape_align_bottom.png",description:ORYX.I18N.Arrangement.abDesc,index:1,minShape:2});
this.facade.offer({name:ORYX.I18N.Arrangement.am,functionality:this.alignShapes.bind(this,[ORYX.CONFIG.EDITOR_ALIGN_MIDDLE]),group:ORYX.I18N.Arrangement.groupA,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_align_center.png",icon:ORYX.BASE_FILE_PATH+"images/shape_align_middle.png",description:ORYX.I18N.Arrangement.amDesc,index:2,minShape:2});
this.facade.offer({name:ORYX.I18N.Arrangement.at,functionality:this.alignShapes.bind(this,[ORYX.CONFIG.EDITOR_ALIGN_TOP]),group:ORYX.I18N.Arrangement.groupA,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_align_center.png",icon:ORYX.BASE_FILE_PATH+"images/shape_align_top.png",description:ORYX.I18N.Arrangement.atDesc,index:3,minShape:2});
this.facade.offer({name:ORYX.I18N.Arrangement.al,functionality:this.alignShapes.bind(this,[ORYX.CONFIG.EDITOR_ALIGN_LEFT]),group:ORYX.I18N.Arrangement.groupA,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_align_center.png",icon:ORYX.BASE_FILE_PATH+"images/shape_align_left.png",description:ORYX.I18N.Arrangement.alDesc,index:4,minShape:2});
this.facade.offer({name:ORYX.I18N.Arrangement.ac,functionality:this.alignShapes.bind(this,[ORYX.CONFIG.EDITOR_ALIGN_CENTER]),group:ORYX.I18N.Arrangement.groupA,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_align_center.png",icon:ORYX.BASE_FILE_PATH+"images/shape_align_center.png",description:ORYX.I18N.Arrangement.acDesc,index:5,minShape:2});
this.facade.offer({name:ORYX.I18N.Arrangement.ar,functionality:this.alignShapes.bind(this,[ORYX.CONFIG.EDITOR_ALIGN_RIGHT]),group:ORYX.I18N.Arrangement.groupA,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_align_center.png",icon:ORYX.BASE_FILE_PATH+"images/shape_align_right.png",description:ORYX.I18N.Arrangement.arDesc,index:6,minShape:2});
this.facade.offer({name:ORYX.I18N.Arrangement.as,functionality:this.alignShapes.bind(this,[ORYX.CONFIG.EDITOR_ALIGN_SIZE]),group:ORYX.I18N.Arrangement.groupA,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_align_center.png",icon:ORYX.BASE_FILE_PATH+"images/shape_align_size.png",description:ORYX.I18N.Arrangement.asDesc,index:7,minShape:2})
}this.facade.registerOnEvent(ORYX.CONFIG.EVENT_ARRANGEMENT_TOP,this.setZLevel.bind(this,this.setToTop));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_ARRANGEMENT_BACK,this.setZLevel.bind(this,this.setToBack));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_ARRANGEMENT_FORWARD,this.setZLevel.bind(this,this.setForward));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_ARRANGEMENT_BACKWARD,this.setZLevel.bind(this,this.setBackward))
},setZLevel:function(d,b){var a=ORYX.Core.Command.extend({construct:function(g,f,e){this.callback=g;
this.elements=f;
this.elAndIndex=f.map(function(h){return{el:h,previous:h.parent.children[h.parent.children.indexOf(h)-1]}
});
this.facade=e
},execute:function(){this.callback(this.elements);
this.facade.setSelection(this.elements)
},rollback:function(){var g=this.elAndIndex.sortBy(function(l){var m=l.el;
var i=$A(m.node.parentNode.childNodes);
return i.indexOf(m.node)
});
for(var f=0;
f<g.length;
f++){var h=g[f].el;
var j=h.parent;
var k=j.children.indexOf(h);
var e=j.children.indexOf(g[f].previous);
e=e||0;
j.children=j.children.insertFrom(k,e);
h.node.parentNode.insertBefore(h.node,h.node.parentNode.childNodes[e+1])
}this.facade.setSelection(this.elements)
}});
var c=new a(d,this.facade.getSelection(),this.facade);
if(b.excludeCommand){c.execute()
}else{this.facade.executeCommands([c])
}},setToTop:function(b){var a=b.sortBy(function(e,c){var d=$A(e.node.parentNode.childNodes);
return d.indexOf(e.node)
});
a.each(function(c){var d=c.parent;
d.children=d.children.without(c);
d.children.push(c);
c.node.parentNode.appendChild(c.node)
})
},setToBack:function(b){var a=b.sortBy(function(e,c){var d=$A(e.node.parentNode.childNodes);
return d.indexOf(e.node)
});
a=a.reverse();
a.each(function(c){var d=c.parent;
d.children=d.children.without(c);
d.children.unshift(c);
c.node.parentNode.insertBefore(c.node,c.node.parentNode.firstChild)
})
},setBackward:function(c){var b=c.sortBy(function(f,d){var e=$A(f.node.parentNode.childNodes);
return e.indexOf(f.node)
});
b=b.reverse();
var a=b.findAll(function(d){return !b.some(function(e){return e.node==d.node.previousSibling
})
});
a.each(function(e){if(e.node.previousSibling===null){return
}var f=e.parent;
var d=f.children.indexOf(e);
f.children=f.children.insertFrom(d,d-1);
e.node.parentNode.insertBefore(e.node,e.node.previousSibling)
})
},setForward:function(c){var b=c.sortBy(function(f,d){var e=$A(f.node.parentNode.childNodes);
return e.indexOf(f.node)
});
var a=b.findAll(function(d){return !b.some(function(e){return e.node==d.node.nextSibling
})
});
a.each(function(f){var d=f.node.nextSibling;
if(d===null){return
}var e=f.parent.children.indexOf(f);
var g=f.parent;
g.children=g.children.insertFrom(e,e+1);
f.node.parentNode.insertBefore(d,f.node)
})
},alignShapes:function(b){var f=this.facade.getSelection();
f=this.facade.getCanvas().getShapesWithSharedParent(f);
f=f.findAll(function(h){return(h instanceof ORYX.Core.Node)
});
f=f.findAll(function(h){var i=h.getIncomingShapes();
return i.length==0||!f.include(i[0])
});
if(f.length<2){return
}var e=f[0].absoluteBounds().clone();
f.each(function(h){e.include(h.absoluteBounds().clone())
});
var d=0;
var c=0;
f.each(function(h){d=Math.max(h.bounds.width(),d);
c=Math.max(h.bounds.height(),c)
});
var a=ORYX.Core.Command.extend({construct:function(m,l,k,j,h,i){this.elements=m;
this.bounds=l;
this.maxHeight=k;
this.maxWidth=j;
this.way=h;
this.facade=i;
this.orgPos=[]
},setBounds:function(h,j){if(!j){j={width:ORYX.CONFIG.MAXIMUM_SIZE,height:ORYX.CONFIG.MAXIMUM_SIZE}
}if(!h.bounds){throw"Bounds not definined."
}var i={a:{x:h.bounds.upperLeft().x-(this.maxWidth-h.bounds.width())/2,y:h.bounds.upperLeft().y-(this.maxHeight-h.bounds.height())/2},b:{x:h.bounds.lowerRight().x+(this.maxWidth-h.bounds.width())/2,y:h.bounds.lowerRight().y+(this.maxHeight-h.bounds.height())/2}};
if(this.maxWidth>j.width){i.a.x=h.bounds.upperLeft().x-(j.width-h.bounds.width())/2;
i.b.x=h.bounds.lowerRight().x+(j.width-h.bounds.width())/2
}if(this.maxHeight>j.height){i.a.y=h.bounds.upperLeft().y-(j.height-h.bounds.height())/2;
i.b.y=h.bounds.lowerRight().y+(j.height-h.bounds.height())/2
}h.bounds.set(i)
},execute:function(){this.elements.each(function(h,i){this.orgPos[i]=h.bounds.upperLeft();
var j=this.bounds.clone();
if(h.parent&&!(h.parent instanceof ORYX.Core.Canvas)){var k=h.parent.absoluteBounds().upperLeft();
j.moveBy(-k.x,-k.y)
}switch(this.way){case ORYX.CONFIG.EDITOR_ALIGN_BOTTOM:h.bounds.moveTo({x:h.bounds.upperLeft().x,y:j.b.y-h.bounds.height()});
break;
case ORYX.CONFIG.EDITOR_ALIGN_MIDDLE:h.bounds.moveTo({x:h.bounds.upperLeft().x,y:(j.a.y+j.b.y-h.bounds.height())/2});
break;
case ORYX.CONFIG.EDITOR_ALIGN_TOP:h.bounds.moveTo({x:h.bounds.upperLeft().x,y:j.a.y});
break;
case ORYX.CONFIG.EDITOR_ALIGN_LEFT:h.bounds.moveTo({x:j.a.x,y:h.bounds.upperLeft().y});
break;
case ORYX.CONFIG.EDITOR_ALIGN_CENTER:h.bounds.moveTo({x:(j.a.x+j.b.x-h.bounds.width())/2,y:h.bounds.upperLeft().y});
break;
case ORYX.CONFIG.EDITOR_ALIGN_RIGHT:h.bounds.moveTo({x:j.b.x-h.bounds.width(),y:h.bounds.upperLeft().y});
break;
case ORYX.CONFIG.EDITOR_ALIGN_SIZE:if(h.isResizable){this.orgPos[i]={a:h.bounds.upperLeft(),b:h.bounds.lowerRight()};
this.setBounds(h,h.maximumSize)
}break
}}.bind(this));
this.facade.getCanvas().update();
this.facade.updateSelection()
},rollback:function(){this.elements.each(function(h,i){if(this.way==ORYX.CONFIG.EDITOR_ALIGN_SIZE){if(h.isResizable){h.bounds.set(this.orgPos[i])
}}else{h.bounds.moveTo(this.orgPos[i])
}}.bind(this));
this.facade.getCanvas().update();
this.facade.updateSelection()
}});
var g=new a(f,e,c,d,parseInt(b),this.facade);
this.facade.executeCommands([g])
}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.Grouping=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.Grouping.group,functionality:this.createGroup.bind(this),group:ORYX.I18N.Grouping.grouping,icon:ORYX.BASE_FILE_PATH+"images/shape_group.png",description:ORYX.I18N.Grouping.groupDesc,index:1,minShape:2,isEnabled:this.isEnabled.bind(this,false)});
this.facade.offer({name:ORYX.I18N.Grouping.ungroup,functionality:this.deleteGroup.bind(this),group:ORYX.I18N.Grouping.grouping,icon:ORYX.BASE_FILE_PATH+"images/shape_ungroup.png",description:ORYX.I18N.Grouping.ungroupDesc,index:2,minShape:2,isEnabled:this.isEnabled.bind(this,true)})
}this.selectedElements=[];
this.groups=[]
},isEnabled:function(a){var b=this.selectedElements;
return a===this.groups.any(function(c){return c.length===b.length&&c.all(function(d){return b.member(d)
})
})
},onSelectionChanged:function(b){var a=b.elements;
this.selectedElements=this.groups.findAll(function(c){return c.any(function(d){return a.member(d)
})
});
this.selectedElements.push(a);
this.selectedElements=this.selectedElements.flatten().uniq();
if(this.selectedElements.length!==a.length){this.facade.setSelection(this.selectedElements)
}},createGroup:function(){var c=this.facade.getSelection();
var a=ORYX.Core.Command.extend({construct:function(g,d,f,e){this.selectedElements=g;
this.groups=d;
this.callback=f;
this.facade=e
},execute:function(){var d=this.groups.findAll(function(e){return !e.any(function(f){return c.member(f)
})
});
d.push(c);
this.callback(d.clone());
this.facade.setSelection(this.selectedElements)
},rollback:function(){this.callback(this.groups.clone());
this.facade.setSelection(this.selectedElements)
}});
var b=new a(c,this.groups.clone(),this.setGroups.bind(this),this.facade);
this.facade.executeCommands([b])
},deleteGroup:function(){var c=this.facade.getSelection();
var a=ORYX.Core.Command.extend({construct:function(g,d,f,e){this.selectedElements=g;
this.groups=d;
this.callback=f;
this.facade=e
},execute:function(){var d=this.groups.partition(function(e){return e.length!==c.length||!e.all(function(f){return c.member(f)
})
});
this.callback(d[0]);
this.facade.setSelection(this.selectedElements)
},rollback:function(){this.callback(this.groups.clone());
this.facade.setSelection(this.selectedElements)
}});
var b=new a(c,this.groups.clone(),this.setGroups.bind(this),this.facade);
this.facade.executeCommands([b])
},setGroups:function(a){this.groups=a
}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.DragDocker=Clazz.extend({construct:function(a){this.facade=a;
this.VALIDCOLOR=ORYX.CONFIG.SELECTION_VALID_COLOR;
this.INVALIDCOLOR=ORYX.CONFIG.SELECTION_INVALID_COLOR;
this.shapeSelection=undefined;
this.docker=undefined;
this.dockerParent=undefined;
this.dockerSource=undefined;
this.dockerTarget=undefined;
this.lastUIObj=undefined;
this.isStartDocker=undefined;
this.isEndDocker=undefined;
this.undockTreshold=10;
this.initialDockerPosition=undefined;
this.outerDockerNotMoved=undefined;
this.isValid=false;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN,this.handleMouseDown.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DOCKERDRAG,this.handleDockerDrag.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEOVER,this.handleMouseOver.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEOUT,this.handleMouseOut.bind(this))
},handleMouseOut:function(b,a){if(!this.docker&&a instanceof ORYX.Core.Controls.Docker){a.hide()
}else{if(!this.docker&&a instanceof ORYX.Core.Edge){a.dockers.each(function(c){c.hide()
})
}}},handleMouseOver:function(b,a){if(!this.docker&&a instanceof ORYX.Core.Controls.Docker){a.show()
}else{if(!this.docker&&a instanceof ORYX.Core.Edge){a.dockers.each(function(c){c.show()
})
}}},handleDockerDrag:function(b,a){this.handleMouseDown(b.uiEvent,a)
},handleMouseDown:function(d,c){if(c instanceof ORYX.Core.Controls.Docker&&c.isMovable){this.shapeSelection=this.facade.getSelection();
this.facade.setSelection();
this.docker=c;
this.initialDockerPosition=this.docker.bounds.center();
this.outerDockerNotMoved=false;
this.dockerParent=c.parent;
this._commandArg={docker:c,dockedShape:c.getDockedShape(),refPoint:c.referencePoint||c.bounds.center()};
this.docker.show();
if(c.parent instanceof ORYX.Core.Edge&&(c.parent.dockers.first()==c||c.parent.dockers.last()==c)){if(c.parent.dockers.first()==c&&c.parent.dockers.last().getDockedShape()){this.dockerTarget=c.parent.dockers.last().getDockedShape()
}else{if(c.parent.dockers.last()==c&&c.parent.dockers.first().getDockedShape()){this.dockerSource=c.parent.dockers.first().getDockedShape()
}}}else{this.dockerSource=undefined;
this.dockerTarget=undefined
}this.isStartDocker=this.docker.parent.dockers.first()===this.docker;
this.isEndDocker=this.docker.parent.dockers.last()===this.docker;
this.facade.getCanvas().add(this.docker.parent);
this.docker.parent.getLabels().each(function(e){e.hide()
});
if((!this.isStartDocker&&!this.isEndDocker)||!this.docker.isDocked()){this.docker.setDockedShape(undefined);
var b=this.facade.eventCoordinates(d);
this.docker.bounds.centerMoveTo(b);
this.dockerParent._update()
}else{this.outerDockerNotMoved=true
}var a={movedCallback:this.dockerMoved.bind(this),upCallback:this.dockerMovedFinished.bind(this)};
ORYX.Core.UIEnableDrag(d,c,a)
}},dockerMoved:function(s){this.outerDockerNotMoved=false;
var j=undefined;
if(this.docker.parent){if(this.isStartDocker||this.isEndDocker){var m=this.facade.eventCoordinates(s);
if(this.docker.isDocked()){var b=ORYX.Core.Math.getDistancePointToPoint(m,this.initialDockerPosition);
if(b<this.undockTreshold){this.outerDockerNotMoved=true;
return
}this.docker.setDockedShape(undefined);
this.dockerParent._update()
}var q=this.facade.getCanvas().getAbstractShapesAtPosition(m);
var o=q.pop();
if(this.docker.parent===o){o=q.pop()
}if(this.lastUIObj==o){}else{if(o instanceof ORYX.Core.Shape){var r=this.docker.parent.getStencil().stencilSet();
if(this.docker.parent instanceof ORYX.Core.Edge){var t=this.getHighestParentBeforeCanvas(o);
if(t instanceof ORYX.Core.Edge&&this.docker.parent===t){this.isValid=false;
this.dockerParent._update();
return
}this.isValid=false;
var a=o,c=o;
while(!this.isValid&&a&&!(a instanceof ORYX.Core.Canvas)){o=a;
this.isValid=this.facade.getRules().canConnect({sourceShape:this.dockerSource?this.dockerSource:(this.isStartDocker?o:undefined),edgeShape:this.docker.parent,targetShape:this.dockerTarget?this.dockerTarget:(this.isEndDocker?o:undefined)});
a=a.parent
}if(!this.isValid){o=c
}}else{this.isValid=this.facade.getRules().canConnect({sourceShape:o,edgeShape:this.docker.parent,targetShape:this.docker.parent})
}if(this.lastUIObj){this.hideMagnets(this.lastUIObj)
}if(this.isValid){this.showMagnets(o)
}this.showHighlight(o,this.isValid?this.VALIDCOLOR:this.INVALIDCOLOR);
this.lastUIObj=o
}else{this.hideHighlight();
this.lastUIObj?this.hideMagnets(this.lastUIObj):null;
this.lastUIObj=undefined;
this.isValid=false
}}if(this.lastUIObj&&this.isValid&&!(s.shiftKey||s.ctrlKey)){j=this.lastUIObj.magnets.find(function(w){return w.absoluteBounds().isIncluded(m)
});
if(j){this.docker.bounds.centerMoveTo(j.absoluteCenterXY())
}}}}if(!(s.shiftKey||s.ctrlKey)&&!j){var l=ORYX.CONFIG.DOCKER_SNAP_OFFSET;
var h=l+1;
var f=l+1;
var v=this.docker.bounds.center();
if(this.docker.parent){this.docker.parent.dockers.each((function(x){if(this.docker==x){return
}var w=x.referencePoint?x.getAbsoluteReferencePoint():x.bounds.center();
h=Math.abs(h)>Math.abs(w.x-v.x)?w.x-v.x:h;
f=Math.abs(f)>Math.abs(w.y-v.y)?w.y-v.y:f
}).bind(this));
if(Math.abs(h)<l||Math.abs(f)<l){h=Math.abs(h)<l?h:0;
f=Math.abs(f)<l?f:0;
this.docker.bounds.centerMoveTo(v.x+h,v.y+f)
}else{var d=this.docker.parent.dockers[Math.max(this.docker.parent.dockers.indexOf(this.docker)-1,0)];
var p=this.docker.parent.dockers[Math.min(this.docker.parent.dockers.indexOf(this.docker)+1,this.docker.parent.dockers.length-1)];
if(d&&p&&d!==this.docker&&p!==this.docker){var e=d.bounds.center();
var g=p.bounds.center();
var n=this.docker.bounds.center();
if(ORYX.Core.Math.isPointInLine(n.x,n.y,e.x,e.y,g.x,g.y,10)){var u=(Number(g.y)-Number(e.y))/(Number(g.x)-Number(e.x));
var k=((e.y-(e.x*u))-(n.y-(n.x*(-Math.pow(u,-1)))))/((-Math.pow(u,-1))-u);
var i=(e.y-(e.x*u))+(u*k);
if(isNaN(k)||isNaN(i)){return
}this.docker.bounds.centerMoveTo(k,i)
}}}}}this.dockerParent._update()
},dockerMovedFinished:function(e){this.facade.setSelection(this.shapeSelection);
this.hideHighlight();
this.dockerParent.getLabels().each(function(g){g.show()
});
if(this.lastUIObj&&(this.isStartDocker||this.isEndDocker)){if(this.isValid){this.docker.setDockedShape(this.lastUIObj);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DRAGDOCKER_DOCKED,docker:this.docker,parent:this.docker.parent,target:this.lastUIObj})
}this.hideMagnets(this.lastUIObj)
}this.docker.hide();
if(this.outerDockerNotMoved){var d=this.facade.eventCoordinates(e);
var a=this.facade.getCanvas().getAbstractShapesAtPosition(d);
var b=a.findAll(function(g){return g instanceof ORYX.Core.Node
});
a=b.length?b:a;
this.facade.setSelection(a)
}else{var c=ORYX.Core.Command.extend({construct:function(l,h,g,k,j,i){this.docker=l;
this.index=l.parent.dockers.indexOf(l);
this.newPosition=h;
this.newDockedShape=k;
this.oldPosition=g;
this.oldDockedShape=j;
this.facade=i;
this.index=l.parent.dockers.indexOf(l);
this.shape=l.parent
},execute:function(){if(!this.docker.parent){this.docker=this.shape.dockers[this.index]
}this.dock(this.newDockedShape,this.newPosition);
this.removedDockers=this.shape.removeUnusedDockers();
this.facade.updateSelection()
},rollback:function(){this.dock(this.oldDockedShape,this.oldPosition);
(this.removedDockers||$H({})).each(function(g){this.shape.add(g.value,Number(g.key));
this.shape._update(true)
}.bind(this));
this.facade.updateSelection()
},dock:function(g,h){this.docker.setDockedShape(undefined);
if(g){this.docker.setDockedShape(g);
this.docker.setReferencePoint(h)
}else{this.docker.bounds.centerMoveTo(h)
}this.facade.getCanvas().update()
}});
if(this.docker.parent){var f=new c(this.docker,this.docker.getDockedShape()?this.docker.referencePoint:this.docker.bounds.center(),this._commandArg.refPoint,this.docker.getDockedShape(),this._commandArg.dockedShape,this.facade);
this.facade.executeCommands([f])
}}this.docker=undefined;
this.dockerParent=undefined;
this.dockerSource=undefined;
this.dockerTarget=undefined;
this.lastUIObj=undefined;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DRAGDOCKER_MOVE_FINISHED})
},hideHighlight:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,highlightId:"validDockedShape"})
},showHighlight:function(b,a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,highlightId:"validDockedShape",elements:[b],color:a})
},showMagnets:function(a){a.magnets.each(function(b){b.show()
})
},hideMagnets:function(a){a.magnets.each(function(b){b.hide()
})
},getHighestParentBeforeCanvas:function(a){if(!(a instanceof ORYX.Core.Shape)){return undefined
}var b=a.parent;
while(b&&!(b.parent instanceof ORYX.Core.Canvas)){b=b.parent
}return b
}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.AddDocker=Clazz.extend({construct:function(a){this.facade=a;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.AddDocker.add,functionality:this.enableAddDocker.bind(this),group:ORYX.I18N.AddDocker.group,icon:ORYX.BASE_FILE_PATH+"images/vector_add.png",description:ORYX.I18N.AddDocker.addDesc,index:1,toggle:true,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.AddDocker.del,functionality:this.enableDeleteDocker.bind(this),group:ORYX.I18N.AddDocker.group,icon:ORYX.BASE_FILE_PATH+"images/vector_delete.png",description:ORYX.I18N.AddDocker.delDesc,index:2,toggle:true,minShape:0,maxShape:0})
}this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN,this.handleMouseDown.bind(this))
},enableAddDocker:function(a,b){this.addDockerButton=a;
if(b&&this.deleteDockerButton){this.deleteDockerButton.toggle(false)
}},enableDeleteDocker:function(a,b){this.deleteDockerButton=a;
if(b&&this.addDockerButton){this.addDockerButton.toggle(false)
}},enabledAdd:function(){return this.addDockerButton?this.addDockerButton.pressed:false
},enabledDelete:function(){return this.deleteDockerButton?this.deleteDockerButton.pressed:false
},handleMouseDown:function(b,a){if(this.enabledAdd()&&a instanceof ORYX.Core.Edge){this.newDockerCommand({edge:a,position:this.facade.eventCoordinates(b)})
}else{if(this.enabledDelete()&&a instanceof ORYX.Core.Controls.Docker&&a.parent instanceof ORYX.Core.Edge){this.newDockerCommand({edge:a.parent,docker:a})
}else{if(this.enabledAdd()){this.addDockerButton.toggle(false)
}else{if(this.enabledDelete()){this.deleteDockerButton.toggle(false)
}}}}},newDockerCommand:function(b){if(!b.edge){return
}var a=ORYX.Core.Command.extend({construct:function(h,f,e,g,i,d){this.addEnabled=h;
this.deleteEnabled=f;
this.edge=e;
this.docker=g;
this.pos=i;
this.facade=d
},execute:function(){if(this.addEnabled){this.docker=this.edge.addDocker(this.pos,this.docker);
this.index=this.edge.dockers.indexOf(this.docker);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DOCKER_EVENT,etype:"created"})
}else{if(this.deleteEnabled){this.index=this.edge.dockers.indexOf(this.docker);
this.pos=this.docker.bounds.center();
this.edge.removeDocker(this.docker);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DOCKER_EVENT,etype:"deleted"})
}}this.facade.getCanvas().update();
this.facade.updateSelection()
},rollback:function(){if(this.addEnabled){if(this.docker instanceof ORYX.Core.Controls.Docker){this.edge.removeDocker(this.docker)
}}else{if(this.deleteEnabled){this.edge.add(this.docker,this.index)
}}this.facade.getCanvas().update();
this.facade.updateSelection()
}});
var c=new a(this.enabledAdd(),this.enabledDelete(),b.edge,b.docker,b.position,this.facade);
this.facade.executeCommands([c])
}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.SelectionFrame=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN,this.handleMouseDown.bind(this));
document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEUP,this.handleMouseUp.bind(this),true);
this.position={x:0,y:0};
this.size={width:0,height:0};
this.offsetPosition={x:0,y:0};
this.moveCallback=undefined;
this.offsetScroll={x:0,y:0};
this.node=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",this.facade.getCanvas().getHTMLContainer(),["div",{"class":"Oryx_SelectionFrame"}]);
this.hide()
},handleMouseDown:function(d,c){if(c instanceof ORYX.Core.Canvas){var e=c.rootNode.parentNode.parentNode;
var b=this.facade.getCanvas().node.getScreenCTM();
this.offsetPosition={x:b.e,y:b.f};
this.setPos({x:Event.pointerX(d)-this.offsetPosition.x,y:Event.pointerY(d)-this.offsetPosition.y});
this.resize({width:0,height:0});
this.moveCallback=this.handleMouseMove.bind(this);
document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE,this.moveCallback,false);
this.offsetScroll={x:e.scrollLeft,y:e.scrollTop};
this.show()
}Event.stop(d)
},handleMouseUp:function(f){if(this.moveCallback){this.hide();
document.documentElement.removeEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE,this.moveCallback,false);
this.moveCallback=undefined;
var e=this.facade.getCanvas().node.getScreenCTM();
var d={x:this.size.width>0?this.position.x:this.position.x+this.size.width,y:this.size.height>0?this.position.y:this.position.y+this.size.height};
var c={x:d.x+Math.abs(this.size.width),y:d.y+Math.abs(this.size.height)};
d.x/=e.a;
d.y/=e.d;
c.x/=e.a;
c.y/=e.d;
var g=this.facade.getCanvas().getChildShapes(true).findAll(function(b){var a=b.absoluteBounds();
var i=a.upperLeft();
var h=a.lowerRight();
if(i.x>d.x&&i.y>d.y&&h.x<c.x&&h.y<c.y){return true
}return false
});
this.facade.setSelection(g)
}},handleMouseMove:function(b){var a={width:Event.pointerX(b)-this.position.x-this.offsetPosition.x,height:Event.pointerY(b)-this.position.y-this.offsetPosition.y};
var c=this.facade.getCanvas().rootNode.parentNode.parentNode;
a.width-=this.offsetScroll.x-c.scrollLeft;
a.height-=this.offsetScroll.y-c.scrollTop;
this.resize(a);
Event.stop(b)
},hide:function(){this.node.style.display="none"
},show:function(){this.node.style.display=""
},setPos:function(a){this.node.style.top=a.y+"px";
this.node.style.left=a.x+"px";
this.position=a
},resize:function(a){this.setPos(this.position);
this.size=Object.clone(a);
if(a.width<0){this.node.style.left=(this.position.x+a.width)+"px";
a.width=-a.width
}if(a.height<0){this.node.style.top=(this.position.y+a.height)+"px";
a.height=-a.height
}this.node.style.width=a.width+"px";
this.node.style.height=a.height+"px"
}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.ShapeHighlighting=Clazz.extend({construct:function(a){this.parentNode=a.getCanvas().getSvgContainer();
this.node=ORYX.Editor.graft("http://www.w3.org/2000/svg",this.parentNode,["g"]);
this.highlightNodes={};
a.registerOnEvent(ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,this.setHighlight.bind(this));
a.registerOnEvent(ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,this.hideHighlight.bind(this))
},setHighlight:function(a){if(a&&a.highlightId){var b=this.highlightNodes[a.highlightId];
if(!b){b=ORYX.Editor.graft("http://www.w3.org/2000/svg",this.node,["path",{"stroke-width":2,fill:"none"}]);
this.highlightNodes[a.highlightId]=b
}if(a.elements&&a.elements.length>0){this.setAttributesByStyle(b,a);
this.show(b)
}else{this.hide(b)
}}},hideHighlight:function(a){if(a&&a.highlightId&&this.highlightNodes[a.highlightId]){this.hide(this.highlightNodes[a.highlightId])
}},hide:function(a){a.setAttributeNS(null,"display","none")
},show:function(a){a.setAttributeNS(null,"display","inherit")
},setAttributesByStyle:function(b,a){if(a.style&&a.style==ORYX.CONFIG.SELECTION_HIGHLIGHT_STYLE_RECTANGLE){var d=a.elements[0].absoluteBounds();
var c=a.strokewidth?a.strokewidth:ORYX.CONFIG.BORDER_OFFSET;
b.setAttributeNS(null,"d",this.getPathRectangle(d.a,d.b,c));
b.setAttributeNS(null,"stroke",a.color?a.color:ORYX.CONFIG.SELECTION_HIGHLIGHT_COLOR);
b.setAttributeNS(null,"stroke-opacity",a.opacity?a.opacity:0.2);
b.setAttributeNS(null,"stroke-width",c)
}else{if(a.elements.length==1&&a.elements[0] instanceof ORYX.Core.Edge&&a.highlightId!="selection"){b.setAttributeNS(null,"d",this.getPathEdge(a.elements[0].dockers));
b.setAttributeNS(null,"stroke",a.color?a.color:ORYX.CONFIG.SELECTION_HIGHLIGHT_COLOR);
b.setAttributeNS(null,"stroke-opacity",a.opacity?a.opacity:0.2);
b.setAttributeNS(null,"stroke-width",ORYX.CONFIG.OFFSET_EDGE_BOUNDS)
}else{b.setAttributeNS(null,"d",this.getPathByElements(a.elements));
b.setAttributeNS(null,"stroke",a.color?a.color:ORYX.CONFIG.SELECTION_HIGHLIGHT_COLOR);
b.setAttributeNS(null,"stroke-opacity",a.opacity?a.opacity:1);
b.setAttributeNS(null,"stroke-width",a.strokewidth?a.strokewidth:2)
}}},getPathByElements:function(a){if(!a||a.length<=0){return undefined
}var c=ORYX.CONFIG.SELECTED_AREA_PADDING;
var b="";
a.each((function(f){if(!f){return
}var g=f.absoluteBounds();
g.widen(c);
var e=g.upperLeft();
var d=g.lowerRight();
b=b+this.getPath(e,d)
}).bind(this));
return b
},getPath:function(d,c){return this.getPathCorners(d,c)
},getPathCorners:function(d,c){var e=ORYX.CONFIG.SELECTION_HIGHLIGHT_SIZE;
var f="";
f=f+"M"+d.x+" "+(d.y+e)+" l0 -"+e+" l"+e+" 0 ";
f=f+"M"+d.x+" "+(c.y-e)+" l0 "+e+" l"+e+" 0 ";
f=f+"M"+c.x+" "+(c.y-e)+" l0 "+e+" l-"+e+" 0 ";
f=f+"M"+c.x+" "+(d.y+e)+" l0 -"+e+" l-"+e+" 0 ";
return f
},getPathRectangle:function(d,c,h){var e=ORYX.CONFIG.SELECTION_HIGHLIGHT_SIZE;
var f="";
var g=h/2;
f=f+"M"+(d.x+g)+" "+(d.y);
f=f+" L"+(d.x+g)+" "+(c.y-g);
f=f+" L"+(c.x-g)+" "+(c.y-g);
f=f+" L"+(c.x-g)+" "+(d.y+g);
f=f+" L"+(d.x+g)+" "+(d.y+g);
return f
},getPathEdge:function(a){var b=a.length;
var c="M"+a[0].bounds.center().x+" "+a[0].bounds.center().y;
for(i=1;
i<b;
i++){var d=a[i].bounds.center();
c=c+" L"+d.x+" "+d.y
}return c
}});
ORYX.Plugins.HighlightingSelectedShapes=Clazz.extend({construct:function(a){this.facade=a;
this.opacityFull=0.9;
this.opacityLow=0.4
},onSelectionChanged:function(a){if(a.elements&&a.elements.length>1){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,highlightId:"selection",elements:a.elements.without(a.subSelection),color:ORYX.CONFIG.SELECTION_HIGHLIGHT_COLOR,opacity:!a.subSelection?this.opacityFull:this.opacityLow});
if(a.subSelection){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,highlightId:"subselection",elements:[a.subSelection],color:ORYX.CONFIG.SELECTION_HIGHLIGHT_COLOR,opacity:this.opacityFull})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,highlightId:"subselection"})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,highlightId:"selection"});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,highlightId:"subselection"})
}}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.Edit=Clazz.extend({construct:function(a){this.facade=a;
this.clipboard=new ORYX.Plugins.Edit.ClipBoard();
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.Edit.cut,description:ORYX.I18N.Edit.cutDesc,icon:ORYX.BASE_FILE_PATH+"images/cut.png",keyCodes:[{metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],keyCode:88,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN}],functionality:this.callEdit.bind(this,this.editCut),group:ORYX.I18N.Edit.group,index:1,minShape:1});
this.facade.offer({name:ORYX.I18N.Edit.copy,description:ORYX.I18N.Edit.copyDesc,icon:ORYX.BASE_FILE_PATH+"images/page_copy.png",keyCodes:[{metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],keyCode:67,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN}],functionality:this.callEdit.bind(this,this.editCopy,[true,false]),group:ORYX.I18N.Edit.group,index:2,minShape:1});
this.facade.offer({name:ORYX.I18N.Edit.paste,description:ORYX.I18N.Edit.pasteDesc,icon:ORYX.BASE_FILE_PATH+"images/page_paste.png",keyCodes:[{metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],keyCode:86,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN}],functionality:this.callEdit.bind(this,this.editPaste),isEnabled:this.clipboard.isOccupied.bind(this.clipboard),group:ORYX.I18N.Edit.group,index:3,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.Edit.del,description:ORYX.I18N.Edit.delDesc,icon:ORYX.BASE_FILE_PATH+"images/cross.png",keyCodes:[{metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],keyCode:8,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN},{keyCode:46,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN}],functionality:this.callEdit.bind(this,this.editDelete),group:ORYX.I18N.Edit.group,index:4,minShape:1})
}this.facade.registerOnEvent(ORYX.CONFIG.EVENT_FACADE_SELECTION_DELETION_REQUEST,this.editDelete.bind(this))
},callEdit:function(b,a){window.setTimeout(function(){b.apply(this,(a instanceof Array?a:[]))
}.bind(this),1)
},handleMouseDown:function(a){if(this._controlPressed){this._controlPressed=false;
this.editCopy();
this.editPaste();
a.forceExecution=true;
this.facade.raiseEvent(a,this.clipboard.shapesAsJson)
}},getAllShapesToConsider:function(b,d){var a=[];
var c=[];
b.each(function(f){isChildShapeOfAnother=b.any(function(i){return i.hasChildShape(f)
});
if(isChildShapeOfAnother){return
}a.push(f);
if(f instanceof ORYX.Core.Node){var h=f.getOutgoingNodes();
h=h.findAll(function(i){return !b.include(i)
});
a=a.concat(h)
}c=c.concat(f.getChildShapes(true));
if(d&&!(f instanceof ORYX.Core.Edge)){var g=f.getIncomingShapes().concat(f.getOutgoingShapes());
g.each(function(i){if(i instanceof ORYX.Core.Edge&&i.properties["oryx-conditionexpression"]&&i.properties["oryx-conditionexpression"]!=""){return
}if(f instanceof ORYX.Core.Node&&i instanceof ORYX.Core.Node){return
}a.push(i)
}.bind(this))
}}.bind(this));
var e=this.facade.getCanvas().getChildEdges().select(function(f){if(a.include(f)){return false
}if(f.getAllDockedShapes().size()===0){return false
}return f.getAllDockedShapes().all(function(g){return g instanceof ORYX.Core.Edge||c.include(g)
})
});
a=a.concat(e);
return a
},editCut:function(){this.editCopy(false,true);
this.editDelete(true);
return false
},editCopy:function(c,a){var b=this.facade.getSelection();
if(b.length==0){return
}this.clipboard.refresh(b,this.getAllShapesToConsider(b),this.facade.getCanvas().getStencil().stencilSet().namespace(),a);
if(c){this.facade.updateSelection()
}},editPaste:function(){var b={childShapes:this.clipboard.shapesAsJson,stencilset:{namespace:this.clipboard.SSnamespace}};
Ext.apply(b,ORYX.Core.AbstractShape.JSONHelper);
var a=b.getChildShapes(true).pluck("resourceId");
var c={};
b.eachChild(function(d,e){d.outgoing=d.outgoing.select(function(f){return a.include(f.resourceId)
});
d.outgoing.each(function(f){if(!c[f.resourceId]){c[f.resourceId]=[]
}c[f.resourceId].push(d)
});
return d
}.bind(this),true,true);
b.eachChild(function(d,e){if(d.target&&!(a.include(d.target.resourceId))){d.target=undefined;
d.targetRemoved=true
}if(d.dockers&&d.dockers.length>=1&&d.dockers[0].getDocker&&((d.dockers[0].getDocker().getDockedShape()&&!a.include(d.dockers[0].getDocker().getDockedShape().resourceId))||!d.getShape().dockers[0].getDockedShape()&&!c[d.resourceId])){d.sourceRemoved=true
}return d
}.bind(this),true,true);
b.eachChild(function(d,e){if(this.clipboard.useOffset){d.bounds={lowerRight:{x:d.bounds.lowerRight.x+ORYX.CONFIG.COPY_MOVE_OFFSET,y:d.bounds.lowerRight.y+ORYX.CONFIG.COPY_MOVE_OFFSET},upperLeft:{x:d.bounds.upperLeft.x+ORYX.CONFIG.COPY_MOVE_OFFSET,y:d.bounds.upperLeft.y+ORYX.CONFIG.COPY_MOVE_OFFSET}}
}if(d.dockers){d.dockers=d.dockers.map(function(g,f){if((d.targetRemoved===true&&f==d.dockers.length-1&&g.getDocker)||(d.sourceRemoved===true&&f==0&&g.getDocker)){g=g.getDocker().bounds.center()
}if((f==0&&g.getDocker instanceof Function&&d.sourceRemoved!==true&&(g.getDocker().getDockedShape()||((c[d.resourceId]||[]).length>0&&(!(d.getShape() instanceof ORYX.Core.Node)||c[d.resourceId][0].getShape() instanceof ORYX.Core.Node))))||(f==d.dockers.length-1&&g.getDocker instanceof Function&&d.targetRemoved!==true&&(g.getDocker().getDockedShape()||d.target))){return{x:g.x,y:g.y,getDocker:g.getDocker}
}else{if(this.clipboard.useOffset){return{x:g.x+ORYX.CONFIG.COPY_MOVE_OFFSET,y:g.y+ORYX.CONFIG.COPY_MOVE_OFFSET,getDocker:g.getDocker}
}else{return{x:g.x,y:g.y,getDocker:g.getDocker}
}}}.bind(this))
}else{if(d.getShape() instanceof ORYX.Core.Node&&d.dockers&&d.dockers.length>0&&(!d.dockers.first().getDocker||d.sourceRemoved===true||!(d.dockers.first().getDocker().getDockedShape()||c[d.resourceId]))){d.dockers=d.dockers.map(function(g,f){if((d.sourceRemoved===true&&f==0&&g.getDocker)){g=g.getDocker().bounds.center()
}if(this.clipboard.useOffset){return{x:g.x+ORYX.CONFIG.COPY_MOVE_OFFSET,y:g.y+ORYX.CONFIG.COPY_MOVE_OFFSET,getDocker:g.getDocker}
}else{return{x:g.x,y:g.y,getDocker:g.getDocker}
}}.bind(this))
}}return d
}.bind(this),false,true);
this.clipboard.useOffset=true;
this.facade.importJSON(b)
},editDelete:function(){var a=this.facade.getSelection();
var b=new ORYX.Plugins.Edit.ClipBoard();
b.refresh(a,this.getAllShapesToConsider(a,true));
var c=new ORYX.Plugins.Edit.DeleteCommand(b,this.facade);
this.facade.executeCommands([c])
}});
ORYX.Plugins.Edit.ClipBoard=Clazz.extend({construct:function(){this.shapesAsJson=[];
this.selection=[];
this.SSnamespace="";
this.useOffset=true
},isOccupied:function(){return this.shapesAsJson.length>0
},refresh:function(d,b,c,a){this.selection=d;
this.SSnamespace=c;
this.outgoings={};
this.parents={};
this.targets={};
this.useOffset=a!==true;
this.shapesAsJson=b.map(function(e){var f=e.toJSON();
f.parent={resourceId:e.getParentShape().resourceId};
f.parentIndex=e.getParentShape().getChildShapes().indexOf(e);
return f
})
}});
ORYX.Plugins.Edit.DeleteCommand=ORYX.Core.Command.extend({construct:function(b,a){this.clipboard=b;
this.shapesAsJson=b.shapesAsJson;
this.facade=a;
this.dockers=this.shapesAsJson.map(function(g){var e=g.getShape();
var f=e.getIncomingShapes().map(function(h){return h.getDockers().last()
});
var d=e.getOutgoingShapes().map(function(h){return h.getDockers().first()
});
var c=e.getDockers().concat(f,d).compact().map(function(h){return{object:h,referencePoint:h.referencePoint,dockedShape:h.getDockedShape()}
});
return c
}).flatten()
},execute:function(){this.shapesAsJson.each(function(a){var b=this.facade.deleteShape(a.getShape())
}.bind(this));
this.facade.setSelection([]);
this.facade.getCanvas().update();
this.facade.updateSelection()
},rollback:function(){this.shapesAsJson.each(function(c){var a=c.getShape();
var b=this.facade.getCanvas().getChildShapeByResourceId(c.parent.resourceId)||this.facade.getCanvas();
b.add(a,a.parentIndex)
}.bind(this));
this.dockers.each(function(a){a.object.setDockedShape(a.dockedShape);
a.object.setReferencePoint(a.referencePoint)
}.bind(this));
this.facade.setSelection(this.selectedShapes);
this.facade.getCanvas().update();
this.facade.updateSelection()
}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.KeysMove=ORYX.Plugins.AbstractPlugin.extend({facade:undefined,construct:function(a){this.facade=a;
this.copyElements=[];
this.facade.offer({keyCodes:[{metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],keyCode:65,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN}],functionality:this.selectAll.bind(this)});
this.facade.offer({keyCodes:[{metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],keyCode:ORYX.CONFIG.KEY_CODE_LEFT,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN}],functionality:this.move.bind(this,ORYX.CONFIG.KEY_CODE_LEFT,false)});
this.facade.offer({keyCodes:[{keyCode:ORYX.CONFIG.KEY_CODE_LEFT,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN}],functionality:this.move.bind(this,ORYX.CONFIG.KEY_CODE_LEFT,true)});
this.facade.offer({keyCodes:[{metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],keyCode:ORYX.CONFIG.KEY_CODE_RIGHT,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN}],functionality:this.move.bind(this,ORYX.CONFIG.KEY_CODE_RIGHT,false)});
this.facade.offer({keyCodes:[{keyCode:ORYX.CONFIG.KEY_CODE_RIGHT,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN}],functionality:this.move.bind(this,ORYX.CONFIG.KEY_CODE_RIGHT,true)});
this.facade.offer({keyCodes:[{metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],keyCode:ORYX.CONFIG.KEY_CODE_UP,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN}],functionality:this.move.bind(this,ORYX.CONFIG.KEY_CODE_UP,false)});
this.facade.offer({keyCodes:[{keyCode:ORYX.CONFIG.KEY_CODE_UP,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN}],functionality:this.move.bind(this,ORYX.CONFIG.KEY_CODE_UP,true)});
this.facade.offer({keyCodes:[{metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],keyCode:ORYX.CONFIG.KEY_CODE_DOWN,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN}],functionality:this.move.bind(this,ORYX.CONFIG.KEY_CODE_DOWN,false)});
this.facade.offer({keyCodes:[{keyCode:ORYX.CONFIG.KEY_CODE_DOWN,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN}],functionality:this.move.bind(this,ORYX.CONFIG.KEY_CODE_DOWN,true)})
},selectAll:function(a){Event.stop(a.event);
this.facade.setSelection(this.facade.getCanvas().getChildShapes(true))
},move:function(l,i,j){Event.stop(j.event);
var b=i?20:5;
var k=this.facade.getSelection();
var g=this.facade.getSelection();
var c={x:0,y:0};
switch(l){case ORYX.CONFIG.KEY_CODE_LEFT:c.x=-1*b;
break;
case ORYX.CONFIG.KEY_CODE_RIGHT:c.x=b;
break;
case ORYX.CONFIG.KEY_CODE_UP:c.y=-1*b;
break;
case ORYX.CONFIG.KEY_CODE_DOWN:c.y=b;
break
}k=k.findAll(function(e){if(e instanceof ORYX.Core.Node&&e.dockers.length==1&&k.include(e.dockers.first().getDockedShape())){return false
}var m=e.parent;
do{if(k.include(m)){return false
}}while(m=m.parent);
return true
});
var f=true;
var h=k.all(function(e){if(e instanceof ORYX.Core.Edge){if(e.isDocked()){f=false
}return true
}return false
});
if(h&&!f){return
}k=k.map(function(m){if(m instanceof ORYX.Core.Node){return m
}else{if(m instanceof ORYX.Core.Edge){var e=m.dockers;
if(k.include(m.dockers.first().getDockedShape())){e=e.without(m.dockers.first())
}if(k.include(m.dockers.last().getDockedShape())){e=e.without(m.dockers.last())
}return e
}else{return null
}}}).flatten().compact();
if(k.size()>0){var a=[this.facade.getCanvas().bounds.lowerRight().x,this.facade.getCanvas().bounds.lowerRight().y,0,0];
k.each(function(e){a[0]=Math.min(a[0],e.bounds.upperLeft().x);
a[1]=Math.min(a[1],e.bounds.upperLeft().y);
a[2]=Math.max(a[2],e.bounds.lowerRight().x);
a[3]=Math.max(a[3],e.bounds.lowerRight().y)
});
if(a[0]+c.x<0){c.x=-a[0]
}if(a[1]+c.y<0){c.y=-a[1]
}if(a[2]+c.x>this.facade.getCanvas().bounds.lowerRight().x){c.x=this.facade.getCanvas().bounds.lowerRight().x-a[2]
}if(a[3]+c.y>this.facade.getCanvas().bounds.lowerRight().y){c.y=this.facade.getCanvas().bounds.lowerRight().y-a[3]
}if(c.x!=0||c.y!=0){var d=[new ORYX.Core.Command.Move(k,c,null,g,this)];
this.facade.executeCommands(d)
}}},getUndockedCommant:function(b){var a=ORYX.Core.Command.extend({construct:function(c){this.dockers=c.collect(function(d){return d instanceof ORYX.Core.Controls.Docker?{docker:d,dockedShape:d.getDockedShape(),refPoint:d.referencePoint}:undefined
}).compact()
},execute:function(){this.dockers.each(function(c){c.docker.setDockedShape(undefined)
})
},rollback:function(){this.dockers.each(function(c){c.docker.setDockedShape(c.dockedShape);
c.docker.setReferencePoint(c.refPoint)
})
}});
command=new a(b);
command.execute();
return command
}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.VisualValidation=ORYX.Plugins.AbstractPlugin.extend({construct:function(a){this.facade=a;
this.vt;
this.allErrors={};
this.errorDisplayView;
ORYX.IS_VALIDATING_PROCESS=false;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.SyntaxChecker.startValidating,functionality:this.enableValidation.bind(this),group:"validationandsimulation",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/visualvalidation.png",description:ORYX.I18N.SyntaxChecker.startValidating_desc,index:1,minShape:0,maxShape:0,isEnabled:function(){return !ORYX.IS_VALIDATING_PROCESS&&!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}});
this.facade.offer({name:ORYX.I18N.SyntaxChecker.stopValidating,functionality:this.disableValidation.bind(this),group:"validationandsimulation",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/visualvalidation.png",description:ORYX.I18N.SyntaxChecker.stopValidating_desc,index:2,minShape:0,maxShape:0,isEnabled:function(){return ORYX.IS_VALIDATING_PROCESS&&!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}});
this.facade.offer({name:ORYX.I18N.SyntaxChecker.viewAllIssues,functionality:this.viewAllValidation.bind(this),group:"validationandsimulation",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/visualvalidation.png",description:ORYX.I18N.SyntaxChecker.viewAllIssues_desc,index:3,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}})
}this.facade.registerOnEvent(ORYX.CONFIG.EVENT_CLICK,this.displayErrorsOnNode.bind(this))
},enableValidation:function(){ORYX.IS_VALIDATING_PROCESS=true;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.SyntaxChecker.startingContinousVal,title:""});
this.vt=window.setInterval((function(){this.startValidate(true)
}).bind(this),3000)
},disableValidation:function(){ORYX.IS_VALIDATING_PROCESS=false;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.SyntaxChecker.stoppingContinousVal,title:""});
window.clearInterval(this.vt);
this.stopValidate()
},viewAllValidation:function(){this.startValidate(false);
this.displayErrorsOnNode();
this.disableValidation()
},startValidate:function(a){var b=ORYX.EDITOR.getSerializedJSON();
new Ajax.Request(ORYX.PATH+"syntaxcheck",{method:"POST",asynchronous:false,parameters:{data:b,profile:ORYX.PROFILE,pp:ORYX.PREPROCESSING,uuid:window.btoa(encodeURI(ORYX.UUID))},onSuccess:function(c){this.allErrors=new Hash();
this.resetBorderColors();
var d=c.responseText.evalJSON();
if(!(d instanceof Hash)){d=new Hash(d)
}this.allErrors=d;
if(a){d.keys().each(function(f){var e=this.facade.getCanvas().getChildShapeByResourceId(f);
if(e){if(e instanceof ORYX.Core.Node||e instanceof ORYX.Core.Edge){e.setProperty("oryx-bordercolor","#FF6600");
e.refresh()
}}}.bind(this))
}}.bind(this),onFailure:function(){this.allErrors=new Hash()
}})
},stopValidate:function(){this.allErrors=new Hash();
this.resetBorderColors()
},resetBorderColors:function(){ORYX.EDITOR.getCanvas().children.each(function(a){this.resetShape(a)
}.bind(this))
},resetShape:function(a){if(a){if(a instanceof ORYX.Core.Node||a instanceof ORYX.Core.Edge){a.setProperty("oryx-bordercolor",a.properties["oryx-origbordercolor"]);
a.refresh()
}if(a.getChildren().size()>0){for(var b=0;
b<a.getChildren().size();
b++){if(a.getChildren()[b] instanceof ORYX.Core.Node||a.getChildren()[b] instanceof ORYX.Core.Edge){this.resetShape(a.getChildren()[b])
}}}}},displayErrorsOnNode:function(i,e){if(this.allErrors instanceof Hash){var d=Ext.data.Record.create([{name:"name",shapeid:"shapeid",type:"type"}]);
var j=new Ext.data.MemoryProxy({root:[]});
var g=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},d),proxy:j,sorters:[{property:"name",direction:"ASC"}]});
g.load();
var h=false;
if(e){this.allErrors.keys().each(function(m){if(m==e.resourceId){h=true;
var l=this.allErrors[m];
for(var k=0;
k<l.length;
k++){g.add(new d({name:l[k].error,shapeid:l[k].id,type:l[k].type}))
}}}.bind(this))
}else{this.allErrors.keys().each(function(m){var l=this.allErrors[m];
for(var k=0;
k<l.length;
k++){g.add(new d({name:l[k].error,shapeid:l[k].id,type:l[k].type}))
}}.bind(this));
h=true
}if(h){var c=ORYX.Utils.getDialogSize(300,700);
var b=(c.width-50)/7;
var a=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:g,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"type",header:ORYX.I18N.SyntaxChecker.header_IssueType,width:b,dataIndex:"type",sortable:true,editor:new Ext.form.TextField({allowBlank:true,vtype:"inputName",regex:/^[a-z0-9 \-\.\_]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"name",header:ORYX.I18N.SyntaxChecker.header_Description,width:b*5,dataIndex:"name",sortable:true,editor:new Ext.form.TextField({allowBlank:true,vtype:"inputName",regex:/^[a-z0-9 \-\.\_]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"shapeid",header:ORYX.I18N.SyntaxChecker.header_ShapeId,width:b,dataIndex:"shapeid",sortable:true,editor:new Ext.form.TextField({allowBlank:true,vtype:"inputName",regex:/^[a-z0-9 \-\.\_]*$/i}),renderer:Ext.util.Format.htmlEncode}]),autoHeight:true,clicksToEdit:1});
var f=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.SyntaxChecker.suggestions,height:c.height,width:c.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){f.hide()
}.bind(this)}],items:[a],listeners:{hide:function(){f.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.Save.close,handler:function(){f.hide()
}.bind(this)}]});
f.show()
}}}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.RegexTextEditor=Clazz.extend({construct:function(a){this.facade=a;
ORYX.FieldEditors.regex=new ORYX.Plugins.RegexTextEditor.EditorFactory()
}});
ORYX.Plugins.RegexTextEditor.EditorFactory=Clazz.extend({construct:function(){},init:function(){var b=arguments[0];
var c=arguments[1];
var a=new Ext.form.TextArea({alignment:"tl-tl",allowBlank:c.optional(),msgTarget:"title",maxLength:c.length(),regex:c._jsonProp.regex,regexText:c._jsonProp.invalidText});
a.on("keyup",function(e,d){if(a.validate()){this.editDirectly(b,e.getValue())
}}.bind(this));
return new Ext.Editor(a)
}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}var guvnorPopupEditor;
ORYX.Plugins.ConstraintExpressionEditor=Clazz.extend({construct:function(b,a){this.facade=b;
ORYX.CONFIG.GUVNOR_USE_FIXED_PACKAGE=false;
ORYX.CONFIG.GUVNOR_FIXED_PACKAGE="mortgages";
ORYX.CONFIG.GUVNOR_CATEGORY="Home Mortgage";
ORYX.CONFIG.GUVNOR_HIDE_RHS=true;
ORYX.CONFIG.GUVNOR_HIDE_ATTRIBUTES=true;
console.log(a);
if(a.properties){a.properties.each(function(c){if(c.useFixedPackage){ORYX.CONFIG.GUVNOR_USE_FIXED_PACKAGE=(c.useFixedPackage=="true")
}if(c.fixedPackage){ORYX.CONFIG.GUVNOR_FIXED_PACKAGE=c.fixedPackage
}if(c.category){ORYX.CONFIG.GUVNOR_CATEGORY=c.category
}if(c.hideRHS){ORYX.CONFIG.GUVNOR_HIDE_RHS=(c.hideRHS=="true")
}if(c.hideAttributes){ORYX.CONFIG.GUVNOR_HIDE_ATTRIBUTES=(c.hideAttributes=="true")
}}.bind(this))
}ORYX.FieldEditors.simpleconstraintexpressioneditor=new ORYX.Plugins.ConstraintExpressionEditor.SimpleConstraintExpressionEditorFactory();
ORYX.FieldEditors.contextawareconstraintexpressioneditor=new ORYX.Plugins.ConstraintExpressionEditor.ContextAwareConstraintExpressionEditorFactory()
}});
ORYX.Plugins.ConstraintExpressionEditor.SimpleConstraintExpressionEditorFactory=Clazz.extend({construct:function(){},init:function(){var b=arguments[0];
var c=arguments[1];
var a=arguments[3];
return new ORYX.Plugins.ConstraintExpressionEditor.BaseConstraintExpressionEditorFactory().createEditor.bind(this)(false,b,c,a)
}});
ORYX.Plugins.ConstraintExpressionEditor.ContextAwareConstraintExpressionEditorFactory=Clazz.extend({construct:function(){},init:function(){var b=arguments[0];
var c=arguments[1];
var a=arguments[3];
return new ORYX.Plugins.ConstraintExpressionEditor.BaseConstraintExpressionEditorFactory().createEditor.bind(this)(true,b,c,a)
}});
ORYX.Plugins.ConstraintExpressionEditor.BaseConstraintExpressionEditorFactory=Clazz.extend({construct:function(){},createEditor:function(h,i,b,d){var f=true;
if(b._jsonProp.showConstraintEditorWhen){var a=b._jsonProp.showConstraintEditorWhen.property;
if(!a){alert(ORYX.I18N.constraintExpr.errorPropertyMissing);
return null
}var g=b._jsonProp.showConstraintEditorWhen.value;
if(!g){alert(ORYX.I18N.constraintExpr.errorValueIsMissing);
return null
}f=this.shapeSelection.shapes[0].properties[b.prefix()+"-"+a]==g
}var c;
if(f){var e=h?this.shapeSelection.shapes[0]:undefined;
c=new Ext.form.GuvnorPopupEditor(e,function(j){this.editDirectly(i,j)
}.bind(this));
guvnorPopupEditor=c
}else{c=new Ext.form.ComplexTextField({allowBlank:b.optional(),dataSource:this.dataSource,grid:this.grid,row:d,facade:this.facade});
c.on("dialogClosed",this.dialogClosed,{scope:this,row:d,col:1,field:c})
}return new Ext.Editor(c)
}});
Ext.form.GuvnorPopupEditor=function(b,g){var f="#-#";
var e="";
var d="";
var c=g;
var a=b;
Ext.form.GuvnorPopupEditor.superclass.constructor.call(this,{defaultAutoCreate:{tag:"textarea",rows:1,style:"height:16px;overflow:hidden;"},onTriggerClick:function(){if(this.disabled){return
}var k=document.body.clientWidth-20;
var l=document.body.clientHeight-20;
var o=ORYX.EXTERNAL_PROTOCOL+"://"+ORYX.EXTERNAL_HOST+"/"+ORYX.EXTERNAL_SUBDOMAIN+"/org.drools.guvnor.Guvnor/standaloneEditorServlet";
var j=[];
j.push({name:"client",value:""});
var v=ORYX.CONFIG.GUVNOR_FIXED_PACKAGE;
if(!ORYX.CONFIG.GUVNOR_USE_FIXED_PACKAGE){var r=ORYX.EDITOR.getJSON();
if(r.properties["package"]&&r.properties["package"]!=""){}else{alert(ORYX.I18N.constraintExpr.configureProcess);
return
}v=r.properties["package"]
}j.push({name:"packageName",value:v});
j.push({name:"categoryName",value:ORYX.CONFIG.GUVNOR_CATEGORY});
j.push({name:"hideRuleRHS",value:""+ORYX.CONFIG.GUVNOR_HIDE_RHS});
j.push({name:"hideRuleAttributes",value:""+ORYX.CONFIG.GUVNOR_HIDE_ATTRIBUTES});
if(e==""){j.push({name:"brlSource",value:"<rule><name>Condition Constraint</name><modelVersion>1.0</modelVersion><attributes></attributes><metadataList/><lhs></lhs><rhs></rhs></rule>"})
}else{j.push({name:"brlSource",value:e})
}if(a){var x=collectNodesInPath(a,new RegExp("ModelEntity"));
x=x.concat(collectNodesInPath(a,new RegExp("Model_")));
if(!x||x.length==0){alert(ORYX.I18N.constraintExpr.defineOneModel);
return
}var u=[];
var q=[];
x.each(function(z){var p=z.properties["oryx-modelentity"];
var w=z.properties["oryx-fieldconstraint"];
var i=z.properties["oryx-constraintvalue"];
if(!p){u.push(ORYX.I18N.constraintExpr.factNameMandatory);
return
}if(!w){u.push(ORYX.I18N.constraintExpr.mustSpecifyField+" '"+p+"' "+ORYX.I18N.constraintExpr.modelEntity);
return
}if(!i){u.push(ORYX.I18N.constraintExpr.mustSpecifyValue+" '"+p+"."+w+"' "+ORYX.I18N.constraintExpr.modelEntity);
return
}q.push("{"+p+"--@--"+w+"--@--"+i+"}")
});
if(u.length>0){this.showErrors(u);
return
}var y="";
new Ajax.Request("/workingSet",{asynchronous:false,method:"POST",parameters:{action:"createWorkingSetWithMandatoryConstraint",config:q},onSuccess:function(i){y=i.responseText
}.bind(this),onFailure:(function(i){u.push("Error getting Working Set Definition: "+i.responseText)
}).bind(this)});
if(u.length>0){this.showErrors(u);
return
}alert(y);
j.push({name:"workingSetXMLDefinitions",value:y})
}if(j.length>0){var m=0;
var n="";
o+="?";
for(m=0;
m<j.length;
m++){var h=j[m];
var s=n+h.name+"="+encodeURIComponent(h.value);
if(n==""){n="&amp;"
}o+=s
}}var t=new Ext.Window({id:"guvnorWindow",layout:"fit",width:k,height:l,closeAction:"close",plain:true,modal:true,title:ORYX.I18N.AMLSupport.title,autoScroll:true,resizable:true,html:'<iframe id="guvnorFrame" name="guvnorFrame" width="'+k+'" height="'+l+'"  onload="attachCallbacksToGuvnor();" src="'+o+'"></iframe>'});
t.show()
},showErrors:function(i){var h="Errors:";
i.each(function(j){h+="\n\t"+j
});
alert(h)
},encodeBRL:function(){var j="";
if(e){var h=e.split("\n");
for(var k=0;
k<h.length;
k++){var l=h[k];
l=encodeURIComponent(l);
l=f+l;
j+=l+"\n"
}}return j
},trimDRL:function(){var k="";
if(d){var h=false;
var m=d.split("\n");
for(var l=0;
l<m.length;
l++){var j=m[l];
j=j.replace(/^\s+/,"").replace(/\s+$/,"");
if(j=="then"){break
}if(h){k+=j+"\n"
}if(j=="when"){h=true
}}}return k
},getValue:function(){var h="";
h+=this.encodeBRL();
h+="\n";
h+=this.trimDRL();
return h
},closeGuvnorWindow:function(){Ext.getCmp("guvnorWindow").close()
},guvnorSaveAndCloseButtonCallback:function(){getGuvnorFrame(top).guvnorEditorObject.getBRL(function(h){this.setBRLValue(h);
getGuvnorFrame(top).guvnorEditorObject.getDRL(function(i){this.setDRLValue(i);
this.closeGuvnorWindow();
if(c){c(this.getValue())
}}.bind(this))
}.bind(this))
},guvnorCancelButtonCallback:function(){this.closeGuvnorWindow()
},setValue:function(l){d="";
e="";
var m=new RegExp("^"+f+".*");
var j=l.split("\n");
for(var k=0;
k<j.length;
k++){var h=j[k];
if(h.match(m)){e+=decodeURIComponent(h.substring(f.length))+"\n"
}else{d+=h+"\n"
}}},getDRLValue:function(){return d
},setDRLValue:function(h){d=h
},getBRLValue:function(){return e
},setBRLValue:function(h){e=h
}})
};
Ext.extend(Ext.form.GuvnorPopupEditor,Ext.form.TriggerField,{});
function attachCallbacksToGuvnor(){if(!getGuvnorFrame(top).guvnorEditorObject){setTimeout("this.attachCallbacksToGuvnor()",1000);
return
}getGuvnorFrame(top).guvnorEditorObject.registerAfterSaveAndCloseButtonCallbackFunction(guvnorPopupEditor.guvnorSaveAndCloseButtonCallback.bind(guvnorPopupEditor));
getGuvnorFrame(top).guvnorEditorObject.registerAfterCancelButtonCallbackFunction(guvnorPopupEditor.guvnorCancelButtonCallback.bind(guvnorPopupEditor))
}function getGuvnorFrame(b){if(b.frames.guvnorFrame){return b.frames.guvnorFrame
}for(var a=0;
a<b.frames.length;
a++){var c=getGuvnorFrame(b.frames[a]);
if(c){return c
}}return null
}function collectNodesInPath(a,c){if(!a.incoming||a.incoming.length==0){return[]
}var b=[];
a.incoming.each(function(d){if(d._stencil._jsonStencil.id.match(c)){b.push(d)
}b=b.concat(collectNodesInPath(d,c))
});
return b
};
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.Overlay=Clazz.extend({facade:undefined,styleNode:undefined,construct:function(a){this.facade=a;
this.changes=[];
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_OVERLAY_SHOW,this.show.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_OVERLAY_HIDE,this.hide.bind(this));
this.styleNode=document.createElement("style");
this.styleNode.setAttributeNS(null,"type","text/css");
document.getElementsByTagName("head")[0].appendChild(this.styleNode)
},show:function(a){if(!a||!a.shapes||!a.shapes instanceof Array||!a.id||!a.id instanceof String||a.id.length==0){return
}if(a.attributes){a.shapes.each(function(d){if(!d instanceof ORYX.Core.Shape){return
}this.setAttributes(d.node,a.attributes)
}.bind(this))
}var c=true;
try{c=a.node&&a.node instanceof SVGElement
}catch(b){}if(a.node&&c){a._temps=[];
a.shapes.each(function(h,g){if(!h instanceof ORYX.Core.Shape){return
}var f={};
f.svg=a.dontCloneNode?a.node:a.node.cloneNode(true);
h.node.firstChild.appendChild(f.svg);
if(h instanceof ORYX.Core.Edge&&!a.nodePosition){a.nodePosition="START"
}if(a.nodePosition){var e=h.bounds;
var i=a.nodePosition.toUpperCase();
if(h instanceof ORYX.Core.Node&&i=="START"){i="NW"
}else{if(h instanceof ORYX.Core.Node&&i=="END"){i="SE"
}else{if(h instanceof ORYX.Core.Edge&&i=="START"){e=h.getDockers().first().bounds
}else{if(h instanceof ORYX.Core.Edge&&i=="END"){e=h.getDockers().last().bounds
}}}}f.callback=function(){var j=0;
var k=0;
if(i=="NW"){}else{if(i=="N"){j=e.width()/2
}else{if(i=="NE"){j=e.width()
}else{if(i=="E"){j=e.width();
k=e.height()/2
}else{if(i=="SE"){j=e.width();
k=e.height()
}else{if(i=="S"){j=e.width()/2;
k=e.height()
}else{if(i=="SW"){k=e.height()
}else{if(i=="W"){k=e.height()/2
}else{if(i=="START"||i=="END"){j=e.width()/2;
k=e.height()/2
}else{if(i=="CANVAS_TITLE_FORM"){j=10;
k=20
}else{if(i=="CANVAS_TITLE"){j=10;
k=20
}else{if(i=="SYNTAX_CHECKS"){j=-25;
k=(e.height()+15/2)-15
}else{if(i=="SIMMODELMAX"){j=(e.width()/2)-10;
k=e.height()
}else{if(i=="SIMMODELMIN"){j=(e.width()/2)-10;
k=e.height()-10
}else{if(i=="SIMMODELAVG"){j=(e.width()/2)-10;
k=e.height()-20
}else{return
}}}}}}}}}}}}}}}if(h instanceof ORYX.Core.Edge){j+=e.upperLeft().x;
k+=e.upperLeft().y
}f.svg.setAttributeNS(null,"transform","translate("+j+", "+k+")")
}.bind(this);
f.element=h;
f.callback();
e.registerCallback(f.callback)
}if(a.ghostPoint){var d={x:0,y:0};
d=a.ghostPoint;
f.callback=function(){var j=0;
var k=0;
j=d.x-7;
k=d.y-7;
f.svg.setAttributeNS(null,"transform","translate("+j+", "+k+")")
}.bind(this);
f.element=h;
f.callback();
e.registerCallback(f.callback)
}if(a.labelPoint){var d={x:0,y:0};
d=a.labelPoint;
f.callback=function(){var j=0;
var k=0;
j=d.x;
k=d.y;
f.svg.setAttributeNS(null,"transform","translate("+j+", "+k+")")
}.bind(this);
f.element=h;
f.callback();
e.registerCallback(f.callback)
}a._temps.push(f)
}.bind(this))
}if(!this.changes[a.id]){this.changes[a.id]=[]
}this.changes[a.id].push(a)
},hide:function(a){if(!a||!a.id||!a.id instanceof String||a.id.length==0||!this.changes[a.id]){return
}this.changes[a.id].each(function(b){b.shapes.each(function(d,c){if(!d instanceof ORYX.Core.Shape){return
}this.deleteAttributes(d.node)
}.bind(this));
if(b._temps){b._temps.each(function(c){if(c.svg&&c.svg.parentNode){c.svg.parentNode.removeChild(c.svg)
}if(c.callback&&c.element){c.element.bounds.unregisterCallback(c.callback)
}}.bind(this))
}}.bind(this));
this.changes[a.id]=null
},setAttributes:function(c,d){var h=this.getAllChilds(c.firstChild.firstChild);
var a=[];
h.each(function(k){a.push($A(k.attributes).findAll(function(l){return l.nodeValue.startsWith("url(#")
}))
});
a=a.flatten().compact();
a=a.collect(function(k){return k.nodeValue
}).uniq();
a=a.collect(function(k){return k.slice(5,k.length-1)
});
a.unshift(c.id+" .me");
var g=$H(d);
var e=g.toJSON().gsub(",",";").gsub('"',"");
var i=d.stroke?e.slice(0,e.length-1)+"; fill:"+d.stroke+";}":e;
var f;
if(d.fill){var b=Object.clone(d);
b.fill="black";
f=$H(b).toJSON().gsub(",",";").gsub('"',"")
}csstags=a.collect(function(l,k){return"#"+l+" * "+(!k?e:i)+""+(f?" #"+l+" text * "+f:"")
});
var j=csstags.join(" ")+"\n";
this.styleNode.appendChild(document.createTextNode(j))
},deleteAttributes:function(b){var a=$A(this.styleNode.childNodes).findAll(function(c){return c.textContent.include("#"+b.id)
});
a.each(function(c){c.parentNode.removeChild(c)
})
},getAllChilds:function(a){var b=$A(a.childNodes);
$A(a.childNodes).each(function(c){b.push(this.getAllChilds(c))
}.bind(this));
return b.flatten()
}});
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Config.Dictionary={};
if(!ORYX.Dictionary){ORYX.Dictionary={}
}ORYX.Dictionary.DictionaryDef=Ext.data.Record.create([{name:"name"},{name:"aliases"},{name:"description"}]);
ORYX.Dictionary.DictionaryProxy=new Ext.data.MemoryProxy({root:[]});
ORYX.Dictionary.Dictionaryitems=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},ORYX.Dictionary.DictionaryDef),proxy:ORYX.Dictionary.DictionaryProxy,sorters:[{property:"name",direction:"ASC"}]});
ORYX.Dictionary.Dictionaryitems.load();
ORYX.Plugins.Dictionary=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DICTIONARY_ADD,this.initAndShowDictionary.bind(this));
this.initDictionary();
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.Dictionary.dictionary,functionality:this.initAndShowDictionary.bind(this),group:ORYX.I18N.View.jbpmgroup,icon:ORYX.BASE_FILE_PATH+"images/dictionary.png",description:ORYX.I18N.Dictionary.processDictionary,index:8,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)})
}},initAndShowDictionary:function(a){this.initDictionary(this.showDictionary,a)
},initDictionary:function(b,a){Ext.Ajax.request({url:ORYX.PATH+"dictionary",method:"POST",success:function(d){try{ORYX.Dictionary.Dictionaryitems.removeAll();
var m=Ext.decode(d.responseText);
if(m.length>0&&m!="false"){for(var g=0;
g<m.length;
g++){var f=m[g];
var l="";
var n="";
var c="";
for(var o in f){var k=o;
var h=f[o];
if(k=="name"){if(h){l=h
}}else{if(k=="aliases"){if(h){n=h
}}else{if(k=="description"){if(h){c=h
}}else{ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Dictionary.errorReadingProcDic+": "+k,title:""})
}}}}ORYX.Dictionary.Dictionaryitems.add(new ORYX.Dictionary.DictionaryDef({name:l,aliases:n,description:c}))
}}if(a&&a.entry){if(a.entry.length>0){ORYX.Dictionary.Dictionaryitems.add(new ORYX.Dictionary.DictionaryDef({name:a.entry,aliases:"",description:""}))
}}ORYX.Dictionary.Dictionaryitems.commitChanges();
if(b){b()
}}catch(j){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Dictionary.errorLoadingProcDic+": "+j,title:""})
}}.bind(this),failure:function(){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Dictionary.errorLoadingProcDic+".",title:""})
},params:{action:"load",profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID))}})
},showDictionary:function(){var t=ORYX.Utils.getDialogSize(400,700);
var p=0.5;
var c=0.5;
var s=t.width*p;
var i=70;
var n=(s-i)/3;
var l=new Extensive.grid.ItemDeleter();
var o=Ext.id();
var a=new Ext.grid.EditorGridPanel({store:ORYX.Dictionary.Dictionaryitems,id:o,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"name",header:ORYX.I18N.Dictionary.header_name,width:n,dataIndex:"name",editor:new Ext.form.TextField({allowBlank:false})},{id:"aliases",header:ORYX.I18N.Dictionary.headerAliases,width:n,dataIndex:"aliases",editor:new Ext.form.TextField({allowBlank:true})},{id:"description",header:ORYX.I18N.Dictionary.headerDesc,width:n,dataIndex:"description",editor:new Ext.form.TextField({allowBlank:true})},l]),selModel:l,autoHeight:true,tbar:[{text:ORYX.I18N.Dictionary.addNewEntry,handler:function(){ORYX.Dictionary.Dictionaryitems.add(new ORYX.Dictionary.DictionaryDef({name:"",aliases:"",description:""}));
a.fireEvent("cellclick",a,ORYX.Dictionary.Dictionaryitems.getCount()-1,1,null)
}}],clicksToEdit:1});
var d=ORYX.EDITOR.getSerializedJSON();
var u=jsonPath(d.evalJSON(),"$.properties.documentation");
var m="";
if(u&&u[0].length>0){m=u[0]
}else{m=ORYX.I18N.Dictionary.noProcDoc
}var r=new Ext.Button({text:ORYX.I18N.Dictionary.procDoc,handler:function(){Ext.getCmp("processdocs").setValue(m)
}});
var b=new Ext.Panel({title:ORYX.I18N.Dictionary.fromDoc,bodyStyle:"padding:5px",autoScroll:false,height:60,items:[r],layoutConfig:{padding:"5",align:"middle"}});
var j=new Ext.Panel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",autoScroll:false,items:[{fieldLabel:ORYX.I18N.Dictionary.select,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;width:150px",itemCls:"ext_specific_window_overflow"}]});
var k=new Ext.Panel({title:ORYX.I18N.Dictionary.fromFile,bodyStyle:"padding:5px",autoScroll:false,height:60,items:[j],layoutConfig:{padding:"5",align:"middle"}});
var e=new Ext.Panel({header:false,width:"100%",layout:"column",border:false,layoutConfig:{columns:2,pack:"center",align:"middle"},items:[{columnWidth:0.5,items:b},{columnWidth:0.5,items:k}]});
var h=new Ext.Panel({title:ORYX.I18N.Dictionary.highlightText,width:"100%",height:350,layout:"column",autoScroll:false,bodyStyle:"padding:5px",items:[{id:"processdocs",xtype:"textarea",hideLabel:true,name:"processtextbox",grow:false,width:"100%",height:280,preventScrollbars:false,style:{overflow:"auto"}}],tbar:[{text:ORYX.I18N.Dictionary.add,handler:function(){var w=document.getElementById("processdocs");
var v=w.value.substring(w.selectionStart,w.selectionEnd);
if(v&&v.length>0){ORYX.Dictionary.Dictionaryitems.add(new ORYX.Dictionary.DictionaryDef({name:v,aliases:"",description:""}))
}}}]});
var f=new Ext.Panel({id:"processdocspanel",title:ORYX.I18N.Dictionary.extractDicEntries,layout:"column",items:[e,h],layoutConfig:{columns:1},defaults:{columnWidth:1}});
var g=new Ext.Panel({header:false,layout:"column",items:[{columnWidth:p,items:a},{columnWidth:c,items:f}]});
var q=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.Dictionary.procDicEditor,height:t.height,width:t.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{fn:function(){q.hide()
}.bind(this)}],items:[g],listeners:{hide:function(){q.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.Dictionary.Save,handler:function(){ORYX.Dictionary.Dictionaryitems.commitChanges();
var w=new Array();
var v="";
var x=ORYX.Dictionary.Dictionaryitems.getRange();
for(var y=0;
y<x.length;
y++){w.push(x[y].data)
}v=Ext.util.JSON.encode(w);
ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.Dictionary.storingDic,title:""});
Ext.Ajax.request({url:ORYX.PATH+"dictionary",method:"POST",success:function(z){try{q.hide()
}catch(A){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Dictionary.errorSavingDic+" :\n"+A,title:""})
}}.createDelegate(this),failure:function(){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Dictionary.errorSavingDic+".",title:""})
},params:{action:"save",profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),dvalue:v}})
}.bind(this)},{text:ORYX.I18N.Dictionary.cancel,handler:function(){q.hide()
}.bind(this)}]});
q.show();
j.items.items[0].getEl().dom.addEventListener("change",function(w){var v=new FileReader();
v.onload=function(x){Ext.getCmp("processdocs").setValue(x.target.result)
};
v.readAsText(w.target.files[0],"UTF-8")
},true)
},_tobr:function(a){return a.replace(/(\r\n|[\r\n])/g,"<br />")
}});
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Config.CanvasTitle={};
ORYX.Config.FACADE={};
ORYX.Plugins.CanvasTitle={facade:undefined,titleNode:undefined,facade:undefined,titleID:undefined,textID:undefined,formID:undefined,construct:function(a){this.facade=a;
ORYX.Config.FACADE=a;
this.titleID="canvasTitleId";
this.titleFormID=" canvasTitleFormId";
this.textID=ORYX.Editor.provideId();
this.formID=ORYX.Editor.provideId();
this.titleNode=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["text",{id:this.textID,style:"stroke-width:1;fill:rgb(177,194,214);font-family:arial;font-weight:bold","font-size":12,onclick:"ORYX.Plugins.CanvasTitle.openTextualAnalysis()",onmouseover:"ORYX.Plugins.CanvasTitle.addToolTip('"+this.textID+"')"}]);
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED,this.showTitle.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,this.updateTitle.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_START,this.hideTitle.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_END,this.showTitle.bind(this))
},hideTitle:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:this.titleID})
},showTitle:function(){this.titleNode.textContent=this._getTitleFromJSON();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:this.titleID,shapes:[this.facade.getCanvas()],node:this.titleNode,nodePosition:"CANVAS_TITLE"})
},updateTitle:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:this.titleID});
this.showTitle()
},_getTitleFromJSON:function(){var a=ORYX.EDITOR.getSerializedJSON();
var b=jsonPath(a.evalJSON(),"$.properties.processn");
var d=jsonPath(a.evalJSON(),"$.properties.package");
var f=jsonPath(a.evalJSON(),"$.properties.id");
var c=jsonPath(a.evalJSON(),"$.properties.version");
var e="";
if(ORYX.VIEWLOCKED&&ORYX.VIEWLOCKED==true){e+="READ ONLY "
}if(b&&b!=""){e+=b[0];
if(c&&c!=""){e+=" v."+c[0]
}if(f&&f!=""&&d&&d!=""){e+=" ("+f[0]+")"
}}return e
}};
ORYX.Plugins.CanvasTitle=Clazz.extend(ORYX.Plugins.CanvasTitle);
ORYX.Plugins.CanvasTitle.openTextualAnalysis=function(){};
ORYX.Plugins.CanvasTitle.editProcessForm=function(){var a=ORYX.EDITOR.getSerializedJSON();
var b=jsonPath(a.evalJSON(),"$.properties.id");
if(b&&b!=""){ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_TASKFORM_EDIT,tn:b})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Process Id not specified.",title:""})
}};
ORYX.Plugins.CanvasTitle.addToolTip=function(a){};
ORYX.Plugins.CanvasTitle.addFormToolTip=function(b){var a=new Ext.ToolTip({target:b,title:"Click to edit Process Form",plain:true,showDelay:50,width:200})
};
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.InlineTaskFormEditor=Clazz.extend({sourceMode:undefined,taskformeditor:undefined,taskformsourceeditor:undefined,taskformcolorsourceeditor:undefined,hlLine:undefined,construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_TASKFORM_EDIT,this.chooseFormEditor.bind(this))
},chooseFormEditor:function(a){Ext.Msg.show({title:ORYX.I18N.inlineTaskFormEditor.formEditor,msg:ORYX.I18N.inlineTaskFormEditor.selectForm,buttons:{yes:ORYX.I18N.inlineTaskFormEditor.graphicalModeler,no:ORYX.I18N.inlineTaskFormEditor.markupEditor,cancel:ORYX.I18N.Dictionary.cancel},icon:Ext.MessageBox.QUESTION,fn:function(b){if(b=="yes"){this.showTaskFormEditor("form",a)
}else{if(b=="no"){this.showTaskFormEditor("ftl",a)
}}}.bind(this)})
},showTaskFormEditor:function(b,a){if(a&&a.tn){Ext.Ajax.request({url:ORYX.PATH+"formwidget",method:"POST",success:function(c){try{var d=c.responseText.evalJSON();
Ext.Ajax.request({url:ORYX.PATH+"taskformseditor",method:"POST",success:function(g){try{if(b=="form"){var i=g.responseText.split("|");
parent.designeropenintab(i[0],encodeURI(i[1]))
}else{this._buildandshow(b,a.tn,g.responseText,d)
}}catch(h){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.errorInitiatingEditor+": "+h,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.errorInitiatingEditor+".",title:""})
},params:{formtype:b,action:"load",taskname:a.tn,profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID))}})
}catch(f){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.errorInitiatingWidgets+": "+f,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.errorInitiatingWidgets+".",title:""})
},params:{action:"getwidgets",profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID))}})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.taskNameNotSpecified,title:""})
}},_buildandshow:function(k,o,h,e){var c="";
if(h&&h!="false"){c=h
}var d=[];
for(var n in e){if(e.hasOwnProperty(n)){d.push(n)
}}d.sort();
var l=[];
for(var g=0;
g<d.length;
g++){l[g]=[d[g]+""]
}var m=new Ext.data.SimpleStore({fields:["name"],data:l});
var b=new Ext.form.ComboBox({fieldLabel:ORYX.I18N.inlineTaskFormEditor.insertFormWidget,labelStyle:"width:240px",hiddenName:"widget_name",emptyText:ORYX.I18N.inlineTaskFormEditor.insertFormWidget+"...",store:m,displayField:"name",valueField:"name",mode:"local",typeAhead:true,triggerAction:"all",listeners:{select:{fn:function(q,i){if(this.taskformcolorsourceeditor){Ext.Ajax.request({url:ORYX.PATH+"formwidget",method:"POST",success:function(r){try{this.taskformcolorsourceeditor.replaceSelection(r.responseText,"end")
}catch(s){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.errorInsertingFormWidget+": "+s,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.errorInsertingFormWidget+".",title:""})
},params:{action:"getwidgetsource",profile:ORYX.PROFILE,widgetname:q.getValue(),uuid:window.btoa(encodeURI(ORYX.UUID))}})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.widgetInsertionSourceMode,title:""})
}}.bind(this)}}});
var j=Ext.id();
this.taskformsourceeditor=new Ext.form.TextArea({id:j,anchor:"100%",autoScroll:true,value:c});
var a=new Ext.Panel({header:false,anchor:"100%",layout:"column",autoScroll:true,border:false,layoutConfig:{columns:2,pack:"center",align:"middle"},items:[{columnWidth:0.5,items:this.taskformsourceeditor},{columnWidth:0.5,items:[{xtype:"component",id:"livepreviewpanel",anchor:"100%",autoScroll:true,autoEl:{tag:"iframe",width:"100%",height:"570",frameborder:"0",scrolling:"auto"}}]}]});
var p=new Ext.Window({id:"maineditorwindow",layout:"fit",autoCreate:true,title:ORYX.I18N.inlineTaskFormEditor.editingForm+o+" - "+ORYX.I18N.inlineTaskFormEditor.completionInst,height:570,width:930,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,keys:[{fn:function(){p.close();
p=null
}.bind(this)}],items:[a],listeners:{hide:function(){p=null
}.bind(this)},buttons:[{text:ORYX.I18N.Dictionary.Save,handler:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.inlineTaskFormEditor.storingForm,title:""});
var i="";
i=this.taskformcolorsourceeditor.getValue();
Ext.Ajax.request({url:ORYX.PATH+"taskformseditor",method:"POST",success:function(q){try{p.close();
p=null
}catch(r){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.errorSavingForm+": "+r,title:""})
}}.createDelegate(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.errorSavingForm+".",title:""})
},params:{formtype:k,action:"save",taskname:o,profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),tfvalue:i}})
}.bind(this)},{text:ORYX.I18N.Dictionary.cancel,handler:function(){p.close();
p=null
}.bind(this)}],tbar:[b]});
p.show();
this.foldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
var f;
this.taskformcolorsourceeditor=CodeMirror.fromTextArea(document.getElementById(j),{mode:"text/html",lineNumbers:true,lineWrapping:true,onGutterClick:this.foldFunc,extraKeys:{"'>'":function(i){i.closeTag(i,">")
},"'/'":function(i){i.closeTag(i,"/")
},"Ctrl-Z":function(i){CodeMirror.hint(i,CodeMirror.formsHint,a)
}},onCursorActivity:function(){this.taskformcolorsourceeditor.setLineClass(this.hlLine,null,null);
this.hlLine=this.taskformcolorsourceeditor.setLineClass(this.taskformcolorsourceeditor.getCursor().line,null,"activeline")
}.bind(this),onChange:function(){clearTimeout(f);
f=setTimeout(this.updatePreview.bind(this),300)
}.bind(this)});
this.hlLine=this.taskformcolorsourceeditor.setLineClass(0,"activeline");
setTimeout(this.updatePreview.bind(this),300)
},updatePreview:function(){var b=document.getElementById("livepreviewpanel");
var a=b.contentDocument||b.contentWindow.document;
a.open();
a.write(this.taskformcolorsourceeditor.getValue());
a.close()
}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.ExtendedDataAssignmentEditor=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
ORYX.FieldEditors.extendeddataassignment=new ORYX.Plugins.ExtendedDataAssignmentEditor.EditorFactory()
}});
ORYX.Plugins.ExtendedDataAssignmentEditor.EditorFactory=Clazz.extend({construct:function(){},init:function(){var c=arguments[0];
var e=arguments[1];
var b=arguments[3];
var a=e._jsonProp.lookupType;
var d=new Ext.form.ExtendedDataAssignmentEditor({allowBlank:e.optional(),dataSource:this.dataSource,grid:this.grid,row:b,facade:this.facade,shapes:this.shapeSelection.shapes});
d.on("dialogClosed",this.dialogClosed,{scope:this,row:b,col:1,field:d});
return new Ext.Editor(d)
}});
Ext.form.ExtendedDataAssignmentEditor=function(b){var a={onTriggerClick:function(){var d=Ext.form.ExtendedDataAssignmentEditor.superclass.onTriggerClick.call(this);
if(!d){return null
}var c=d.getColumnModel().getCellEditor;
d.getColumnModel().getCellEditor=function(g,h){if(g==5){var f=d.getStore().getAt(h);
var e=ORYX.AssociationEditors[f.get("dataType")];
if(e!==undefined){return e.init.bind(this,d,f)()
}}return c.call(d.getColumnModel(),g,h)
}
}};
if(b){Ext.applyIf(b,a)
}else{b=a
}Ext.form.ExtendedDataAssignmentEditor.superclass.constructor.call(this,b)
};
Ext.extend(Ext.form.ExtendedDataAssignmentEditor,Ext.form.ComplexDataAssignmenField,{});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.FieldDataAssignmentEditors=Clazz.extend({facade:undefined,construct:function(e){this.facade=e;
var c=new ORYX.Plugins.FieldDataAssignmentEditors.DateFieldEditorFactory();
ORYX.AssociationEditors["java.util.Date"]=c;
ORYX.AssociationEditors.Date=c;
var b=new ORYX.Plugins.FieldDataAssignmentEditors.IntegerFieldEditorFactory();
ORYX.AssociationEditors["java.lang.Integer"]=b;
ORYX.AssociationEditors.Integer=b;
ORYX.AssociationEditors["int"]=b;
var d=new ORYX.Plugins.FieldDataAssignmentEditors.FloatFieldEditorFactory();
ORYX.AssociationEditors["java.lang.Double"]=d;
ORYX.AssociationEditors["java.lang.Float"]=d;
ORYX.AssociationEditors.Float=d;
ORYX.AssociationEditors.Double=d;
ORYX.AssociationEditors["float"]=d;
ORYX.AssociationEditors["double"]=d;
var a=new ORYX.Plugins.FieldDataAssignmentEditors.BooleanFieldEditorFactory();
ORYX.AssociationEditors["java.lang.Boolean"]=a;
ORYX.AssociationEditors.Boolean=a;
ORYX.AssociationEditors["boolean"]=a
}});
ORYX.Plugins.FieldDataAssignmentEditors.BooleanFieldEditorFactory=Clazz.extend({construct:function(){},init:function(){var b=arguments[0];
var a=arguments[1];
return new Ext.Editor(new Ext.form.Checkbox())
}});
ORYX.Plugins.FieldDataAssignmentEditors.FloatFieldEditorFactory=Clazz.extend({construct:function(){},init:function(){var b=arguments[0];
var a=arguments[1];
return new Ext.Editor(new Ext.form.NumberField({allowDecimals:true}))
}});
ORYX.Plugins.FieldDataAssignmentEditors.IntegerFieldEditorFactory=Clazz.extend({construct:function(){},init:function(){var b=arguments[0];
var a=arguments[1];
return new Ext.Editor(new Ext.form.NumberField({allowDecimals:false}))
}});
ORYX.Plugins.FieldDataAssignmentEditors.DateFieldEditorFactory=Clazz.extend({construct:function(){},init:function(){var b=arguments[0];
var a=arguments[1];
return new Ext.Editor(new Ext.form.DateField())
}});
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.NodeXMLViewer=Clazz.extend({sourceEditor:undefined,construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_NODEXML_SHOW,this.showNodeXML.bind(this));
this.sourceMode=false
},showNodeXML:function(b){if(b&&b.nodesource){this.sourceEditor=undefined;
var a=Ext.id();
var d=new Ext.form.TextArea({id:a,fieldLabel:ORYX.I18N.lockNode.nodeSource,value:b.nodesource,autoScroll:true});
var f=ORYX.Utils.getDialogSize(550,600);
var c=Ext.id();
var e=new Ext.Window({height:f.height,width:f.width,id:c,layout:"fit",title:ORYX.I18N.lockNode.nodeSource,items:[d],buttons:[{text:ORYX.I18N.Save.close,handler:function(){e.destroy();
this.sourceEditor=undefined
}.bind(this)}]});
e.show();
this.foldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
this.sourceEditor=CodeMirror.fromTextArea(document.getElementById(a),{mode:"application/xml",lineNumbers:true,lineWrapping:true,onGutterClick:this.foldFunc})
}else{Ext.Msg.alert(ORYX.I18N.lockNode.nodeSourceNoSpecified)
}}});
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
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.LockNode=Clazz.extend({construct:function(a){this.facade=a;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED,this.checkLocksOnLoad.bind(this));
this.facade.offer({name:ORYX.I18N.lockNode.lock,functionality:this.locknodes.bind(this),group:"lockunlockgroup",icon:ORYX.BASE_FILE_PATH+"images/lock.png",description:ORYX.I18N.lockNode.lock_desc,index:1,minShape:1,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.lockNode.unlock,functionality:this.unlocknodes.bind(this),group:"lockunlockgroup",icon:ORYX.BASE_FILE_PATH+"images/unlock.png",description:ORYX.I18N.lockNode.unlock_desc,index:2,minShape:1,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)})
}},checkLocksOnLoad:function(){ORYX.EDITOR._canvas.getChildren().each((function(a){this.applyLockingToChild(a)
}).bind(this))
},applyLockingToChild:function(b){if(b&&(b instanceof ORYX.Core.Node||b instanceof ORYX.Core.Edge)&&b.properties["oryx-isselectable"]=="false"){b.setSelectable(false);
b.setMovable(false);
if(b instanceof ORYX.Core.Edge){b.dockers.each((function(c){c.setMovable(false);
c.update()
}))
}b.refresh()
}if(b&&b.getChildren().size()>0){for(var a=0;
a<b.getChildren().size();
a++){this.applyLockingToChild(b.getChildren()[a])
}}},locknodes:function(){var a=this.facade.getSelection();
a.each(function(b){this.lockShape(b)
}.bind(this));
this.facade.setSelection([])
},unlocknodes:function(){var a=this.facade.getSelection();
a.each(function(b){this.unlockShape(b)
}.bind(this));
this.facade.setSelection([])
},unlockShape:function(a){if(a){a.setSelectable(true);
a.setMovable(true);
if(a instanceof ORYX.Core.Node||a instanceof ORYX.Core.Edge){a.setProperty("oryx-bordercolor",a.properties["oryx-origbordercolor"]);
a.setProperty("oryx-bgcolor",a.properties["oryx-origbgcolor"])
}a.setProperty("oryx-isselectable","true");
if(a instanceof ORYX.Core.Edge){a.dockers.each((function(c){c.setMovable(true);
c.update()
}))
}a.refresh();
if(a.getChildren().size()>0){for(var b=0;
b<a.getChildren().size();
b++){if(a.getChildren()[b] instanceof ORYX.Core.Node||a.getChildren()[b] instanceof ORYX.Core.Edge){this.unlockShape(a.getChildren()[b])
}}}}},lockShape:function(a){if(a){a.setSelectable(false);
a.setMovable(false);
if(a instanceof ORYX.Core.Node||a instanceof ORYX.Core.Edge){a.setProperty("oryx-bordercolor","#888888");
a.setProperty("oryx-bgcolor","#CCEEFF")
}a.setProperty("oryx-isselectable","false");
if(a instanceof ORYX.Core.Edge){a.dockers.each((function(c){c.setMovable(false);
c.update()
}))
}a.refresh();
if(a.getChildren().size()>0){for(var b=0;
b<a.getChildren().size();
b++){if(a.getChildren()[b] instanceof ORYX.Core.Node||a.getChildren()[b] instanceof ORYX.Core.Edge){this.lockShape(a.getChildren()[b])
}}}}}});
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.Simulation=Clazz.extend({construct:function(a){this.facade=a;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.View.sim.processPathsTitle,functionality:this.findPaths.bind(this),group:"validationandsimulation",icon:ORYX.BASE_FILE_PATH+"images/path.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/simulation.png",description:ORYX.I18N.View.sim.processPaths,index:1,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.View.sim.runSim,functionality:this.runSimulation.bind(this),group:"validationandsimulation",icon:ORYX.BASE_FILE_PATH+"images/control_play.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/simulation.png",description:ORYX.I18N.View.sim.runSim,index:2,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)})
}this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SIMULATION_BUILD_PATH_SVG,this.autoDisplayPath.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SIMULATION_CLEAR_PATH_SVG,this.resetNodeColors.bind(this))
},autoDisplayPath:function(a){if(a&&a.pid){var b=a.pid;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.View.sim.creatingPathImage,title:""});
Ext.Ajax.request({url:ORYX.PATH+"simulation",method:"POST",success:function(d){try{if(d.responseText&&d.responseText.length>0){var j=d.responseText.evalJSON();
var h=j.paths;
for(var f in h){if(f==b){var c=this.getDisplayColor(0);
var i=h[f];
this.setNodeColors(f,c,i)
}}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SIMULATION_PATH_SVG_GENERATED})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.errorInvalidData,title:""})
}}catch(g){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.errorFindingPath+":\n"+g,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.errorFindingPath+".",title:""})
},params:{action:"getpathinfo",profile:ORYX.PROFILE,json:ORYX.EDITOR.getSerializedJSON(),ppdata:ORYX.PREPROCESSING,sel:""}})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.errorUnknownPathId,title:""})
}},findPaths:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.View.sim.calculatingPaths,title:""});
var b=this.facade.getSelection();
var a="";
var c=ORYX.I18N.View.sim.processPathsTitle;
if(b.length==1){b.each(function(d){if(d.getStencil().title()=="Embedded"||d.getStencil().title()=="Event"){a=d.resourceId;
c=ORYX.I18N.View.sim.subProcessPathsTitle
}})
}Ext.Ajax.request({url:ORYX.PATH+"simulation",method:"POST",success:function(m){try{if(m.responseText&&m.responseText.length>0){var t=m.responseText.evalJSON();
var p=t.paths;
var f=Ext.data.Record.create([{name:"display"},{name:"numele"},{name:"pid"}]);
var u=new Ext.data.MemoryProxy({root:[]});
var h=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},f),proxy:u,sorters:[{property:"display",direction:"ASC"}]});
h.load();
var s=0;
for(var r in p){var i=p[r];
var q=i.split("|");
h.add(new f({display:this.getDisplayColor(s),numele:q.length,pid:r}));
s++
}h.commitChanges();
var g=ORYX.Utils.getDialogSize(200,330);
var l=(g.width-80)/5;
var k=Ext.id();
var d=new Ext.grid.EditorGridPanel({store:h,id:k,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"display",header:ORYX.I18N.View.sim.dispColor,width:l*2,dataIndex:"display",renderer:function(e){if(e){return'<center><div width="20px" height="8px" style="width:20px;height:8px;background-color:'+e+'"></div></center>'
}else{return"<center>None</center>"
}}},{id:"numele",header:ORYX.I18N.View.sim.numElements,width:l*3,dataIndex:"numele",renderer:function(e){if(e){return"<center>"+e+"</center>"
}else{return"<center>0</center>"
}}}]),autoHeight:true});
var j=new Ext.Panel({id:"processPathsPanel",title:"<center>"+ORYX.I18N.View.sim.select+c+" "+ORYX.I18N.View.sim.display+"</center>",layout:"column",items:[d],layoutConfig:{columns:1},defaults:{columnWidth:1}});
var o=new Ext.Window({layout:"anchor",autoCreate:true,title:c,height:g.height,width:g.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){o.hide()
}.bind(this)}],items:[j],listeners:{hide:function(){this.resetNodeColors();
o.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.View.sim.showPath,handler:function(){if(d.getSelectionModel().getSelectedCell()!=null){var e=d.getSelectionModel().getSelectedCell()[0];
var v=h.getAt(e).data.pid;
this.setNodeColors(v,this.getDisplayColor(e),p[v])
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.View.sim.selectPath,title:""})
}}.bind(this)},{text:ORYX.I18N.Save.close,handler:function(){this.resetNodeColors();
o.hide()
}.bind(this)}]});
o.show()
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.errorInvalidData,title:""})
}}catch(n){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.errorFindingPath+":\n"+n,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.errorFindingPath+".",title:""})
},params:{action:"getpathinfo",profile:ORYX.PROFILE,json:ORYX.EDITOR.getSerializedJSON(),ppdata:ORYX.PREPROCESSING,sel:a}})
},getDisplayColor:function(b){var a=["#3399FF","#FFCC33","#FF99FF","#6666CC","#CCCCCC","#66FF00","#FFCCFF","#0099CC","#CC66FF","#FFFF00","#993300","#0000CC","#3300FF","#990000","#33CC00"];
return a[b]
},setDefaultColors:function(){ORYX.EDITOR._canvas.getChildren().each((function(a){this.setDefaultValues(a)
}).bind(this))
},setDefaultValues:function(a){if(a instanceof ORYX.Core.Node||a instanceof ORYX.Core.Edge){a.setProperty("oryx-bordercolor",a.properties["oryx-origbordercolor"]);
a.setProperty("oryx-bgcolor",a.properties["oryx-origbgcolor"])
}a.refresh();
if(a.getChildren().size()>0){for(var b=0;
b<a.getChildren().size();
b++){if(a.getChildren()[b] instanceof ORYX.Core.Node||a.getChildren()[b] instanceof ORYX.Core.Edge){this.setDefaultValues(a.getChildren()[b])
}}}},resetNodeColors:function(){ORYX.EDITOR._canvas.getChildren().each((function(a){this.setOriginalValues(a)
}).bind(this))
},setOriginalValues:function(a){if(a instanceof ORYX.Core.Node||a instanceof ORYX.Core.Edge){if(a.savedbordercolor!==undefined){a.setProperty("oryx-bordercolor",a.savedbordercolor);
delete a.savedbordercolor
}if(a.savedbgcolor!==undefined){a.setProperty("oryx-bgcolor",a.savedbgcolor);
delete a.savedbgcolor
}}a.refresh();
if(a.getChildren().size()>0){for(var b=0;
b<a.getChildren().size();
b++){if(a.getChildren()[b] instanceof ORYX.Core.Node||a.getChildren()[b] instanceof ORYX.Core.Edge){this.setOriginalValues(a.getChildren()[b])
}}}},saveNodeColors:function(){ORYX.EDITOR._canvas.getChildren().each((function(a){this.saveOriginalValues(a)
}).bind(this))
},saveOriginalValues:function(a){if(a instanceof ORYX.Core.Node||a instanceof ORYX.Core.Edge){if(a.savedbordercolor===undefined){a.savedbordercolor=a.properties["oryx-bordercolor"]
}if(a.savedbgcolor===undefined){a.savedbgcolor=a.properties["oryx-bgcolor"]
}}if(a.getChildren().size()>0){for(var b=0;
b<a.getChildren().size();
b++){if(a.getChildren()[b] instanceof ORYX.Core.Node||a.getChildren()[b] instanceof ORYX.Core.Edge){this.saveOriginalValues(a.getChildren()[b])
}}}},setNodeColors:function(c,b,a){this.saveNodeColors();
this.setDefaultColors();
ORYX.EDITOR._canvas.getChildren().each((function(d){this.applyPathColors(d,b,a)
}).bind(this))
},applyPathColors:function(b,a,e){var d=e.split("|");
if(b instanceof ORYX.Core.Node||b instanceof ORYX.Core.Edge){for(var c=0;
c<d.length;
c++){var f=d[c];
if(b.resourceId==f){b.setProperty("oryx-bordercolor",a);
b.setProperty("oryx-bgcolor",a)
}}}b.refresh();
if(b.getChildren().size()>0){for(var c=0;
c<b.getChildren().size();
c++){if(b.getChildren()[c] instanceof ORYX.Core.Node||b.getChildren()[c] instanceof ORYX.Core.Edge){this.applyPathColors(b.getChildren()[c],a,e)
}}}},runSimulation:function(){var e=ORYX.Utils.getDialogSize(300,350);
var a=e.width/2;
var d=e.width/3;
var b=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:a,defaultType:"numberfield",items:[{fieldLabel:ORYX.I18N.View.sim.numInstances,name:"instances",allowBlank:false,allowDecimals:false,minValue:1,width:d},{fieldLabel:ORYX.I18N.View.sim.interval,name:"interval",allowBlank:false,allowDecimals:false,minValue:1,width:d},{xtype:"combo",name:"intervalunits",store:new Ext.data.SimpleStore({fields:["units","value"],data:[["millisecond",ORYX.I18N.LocalHistory.unitsMillisecond],["seconds",ORYX.I18N.LocalHistory.unitsSeconds],["minutes",ORYX.I18N.LocalHistory.unitsMinutes],["hours",ORYX.I18N.LocalHistory.unitsHours],["days",ORYX.I18N.LocalHistory.unitsDays]]}),allowBlank:false,displayField:"value",valueField:"units",mode:"local",typeAhead:true,value:"minutes",triggerAction:"all",fieldLabel:ORYX.I18N.View.sim.intervalUnits,width:d}]});
var c=new Ext.Window({autoCreate:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.View.sim.runSim,height:e.height,width:e.width,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[b],buttons:[{text:ORYX.I18N.View.sim.runSim,handler:function(){c.hide();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.View.sim.runningSim,title:""});
var f=b.items.items[0].getValue();
var h=b.items.items[1].getValue();
var g=b.items.items[2].getValue();
Ext.Ajax.request({url:ORYX.PATH+"simulation",method:"POST",success:function(i){try{if(i.responseText&&i.responseText.length>0&&i.status==200){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SIMULATION_SHOW_RESULTS,results:i.responseText})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.simNoResults+i.statusText,title:""})
}}catch(j){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.unableToPerform+j,title:""})
}}.bind(this),failure:function(i){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.unableToPerform+i.responseText,title:""})
}.bind(this),params:{action:"runsimulation",profile:ORYX.PROFILE,json:ORYX.EDITOR.getSerializedJSON(),ppdata:ORYX.PREPROCESSING,numinstances:f,interval:h,intervalunit:g}})
}.bind(this)},{text:ORYX.I18N.Save.close,handler:function(){c.hide()
}.bind(this)}]});
c.on("hide",function(){c.destroy(true);
delete c
});
c.show()
}});
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.SimulationResults=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SIMULATION_SHOW_RESULTS,this.showSimulationResults.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SIMULATION_DISPLAY_GRAPH,this.showGraph.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SIMULATION_PATH_SVG_GENERATED,this.pathSvgGenerated.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SIMULATION_ANNOTATE_PROCESS,this.annotateProcess.bind(this));
this.resultsjson=""
},showSimulationResults:function(a){Ext.getCmp("maintabs").setActiveTab(1);
this.updateSimView(a)
},showGraph:function(b){if(b&&b.value){var e=b.value;
if(e.id.startsWith("pgraph:")){var a=e.id.split(":");
var d=a[1];
if(d=="processaverages"){this.showProcessAveragesGraph(d,this.resultsjson)
}}else{if(e.id.startsWith("htgraph:")){var a=e.id.split(":");
var d=a[1];
this.showHumanTaskAveragesGraph(d,this.resultsjson)
}else{if(e.id.startsWith("tgraph:")){var a=e.id.split(":");
var d=a[1];
this.showTaskAveragesGraph(d,this.resultsjson)
}else{if(e.id.startsWith("pathgraph:")){var a=e.id.split(":");
var c=a[1];
this.showPathGraph(c,this.resultsjson)
}}}}}},_showProcessGraphs:function(a){this.showProcessAveragesGraph(a,this.resultsjson)
},updateSimView:function(a){this.createProcessInfo(a);
this.createGraphsTree(a)
},createProcessInfo:function(c){var a=jsonPath(c.results.evalJSON(),"$.siminfo.*");
var b='<table border="0" width="100%">                           <tr>                          <td><span style="font-size: 10px"><b>'+ORYX.I18N.View.sim.resultsProcessId+'</b></span></td>                           <td><span style="font-size: 10px">'+a[0].id+'</span></td>                           </tr>                           <tr>                           <td><span style="font-size: 10px"><b>'+ORYX.I18N.View.sim.resultsProcessName+'</b></span></td>                           <td><span style="font-size: 10px">'+a[0].name+'</span></td>                           </tr>                           <tr>                           <td><span style="font-size: 10px"><b>'+ORYX.I18N.View.sim.resultsProcessVersion+'</b></span></td>                           <td><span style="font-size: 10px">'+a[0].version+'</span></td>                           </tr>                           <tr>                           <td><span style="font-size: 10px"><b>'+ORYX.I18N.View.sim.resultsSimStartTime+'</b></span></td>                           <td><span style="font-size: 10px">'+a[0].starttime+'</span></td>                           </tr>                           <tr>                           <td><span style="font-size: 10px"><b>'+ORYX.I18N.View.sim.resultsSimEndTime+'</b></span></td>                           <td><span style="font-size: 10px">'+a[0].endtime+'</span></td>                           </tr>                           <tr>                           <td><span style="font-size: 10px"><b>'+ORYX.I18N.View.sim.resultsNumOfExecutions+'</b></span></td>                           <td><span style="font-size: 10px">'+a[0].executions+'</span></td>                           </tr>                           <tr>                           <td><span style="font-size: 10px"><b>'+ORYX.I18N.View.sim.resultsInterval+'</b></span></td>                           <td><span style="font-size: 10px">'+a[0].interval+"</span></td>                           </tr>                           </table>";
if(a){Ext.getCmp("siminfopanel").body.update(b)
}},createGraphsTree:function(r){var q=new Ext.tree.TreeNode({listeners:{beforecollapse:function(s,j,t){return false
}}});
var c;
var d;
var a=[];
this.resultsjson=r.results;
var l=jsonPath(r.results.evalJSON(),"$.processsim.*");
if(l){c=new Ext.tree.TreeNode({text:ORYX.I18N.View.sim.resultsGroupProcess,allowDrag:false,allowDrop:false,expanded:true,isLeaf:false,singleClickExpand:false,listeners:{beforecollapse:function(s,j,t){return false
}}});
d=new Ext.tree.TreeNode({id:"pgraph:processaverages",text:l[0].name+" ("+l[0].id+")",allowDrag:false,allowDrop:false,expanded:true,isLeaf:true,iconCls:"xnd-icon",icon:ORYX.BASE_FILE_PATH+"images/simulation/diagram.png",singleClickExpand:false,listeners:{beforecollapse:function(s,j,t){return false
}}});
c.appendChild(d);
q.appendChild(c);
a.push(d)
}var n=jsonPath(r.results.evalJSON(),"$.htsim.*");
var h=jsonPath(r.results.evalJSON(),"$.tasksim.*");
if(n||h){c=new Ext.tree.TreeNode({text:ORYX.I18N.View.sim.resultsGroupProcessElements,allowDrag:false,allowDrop:false,expanded:true,isLeaf:false,singleClickExpand:true,listeners:{beforecollapse:function(s,j,t){return false
}}});
for(var m=0;
m<n.length;
m++){var p=n[m];
d=new Ext.tree.TreeNode({id:"htgraph:"+p.id,text:p.name+" ("+p.id+")",allowDrag:false,allowDrop:false,expanded:true,isLeaf:true,iconCls:window.SpriteUtils.toUniqueId(ORYX.BASE_FILE_PATH+"images/simulation/activities/User.png"),singleClickExpand:true});
c.appendChild(d);
a.push(d)
}for(var k=0;
k<h.length;
k++){var g=h[k];
this.taskType="None";
this.findTaskType(g.id);
this.taskType=this.taskType.replace(/\s/g,"");
d=new Ext.tree.TreeNode({id:"tgraph:"+g.id,text:g.name+" ("+g.id+")",allowDrag:false,allowDrop:false,expanded:true,isLeaf:true,iconCls:window.SpriteUtils.toUniqueId(ORYX.BASE_FILE_PATH+"images/simulation/activities/"+this.taskType+".png"),singleClickExpand:true});
c.appendChild(d);
a.push(d)
}q.appendChild(c)
}var f=jsonPath(r.results.evalJSON(),"$.pathsim.*");
if(f){c=new Ext.tree.TreeNode({text:ORYX.I18N.View.sim.resultsGroupProcessPaths,allowDrag:false,allowDrop:false,expanded:true,isLeaf:false,singleClickExpand:true,listeners:{beforecollapse:function(s,j,t){return false
}}});
for(var m=0;
m<f.length;
m++){var b=f[m];
d=new Ext.tree.TreeNode({id:"pathgraph:"+b.id,text:"Path "+(m+1)+" ("+b.id+")",allowDrag:false,allowDrop:false,expanded:true,isLeaf:true,iconCls:"xnd-icon",icon:ORYX.BASE_FILE_PATH+"images/simulation/pathicon.png",singleClickExpand:true});
c.appendChild(d);
a.push(d)
}q.appendChild(c)
}Ext.getCmp("simresultscharts").setRootNode(q);
Ext.getCmp("simresultscharts").getRootNode().render();
Ext.getCmp("simresultscharts").el.dom.style.height="100%";
Ext.getCmp("simresultscharts").el.dom.style.overflow="scroll";
Ext.getCmp("simresultscharts").render();
var o=Ext.getCmp("simresultscharts");
var e=o.getNodeById("pgraph:processaverages");
e.select();
this._showProcessGraphs("processaverages");
if((Object.hasOwnProperty.call(window,"ActiveXObject")&&!window.ActiveXObject)||(navigator.appVersion.indexOf("MSIE 10")!==-1)){this.createDragZoneForIE(q,a)
}},createDragZoneForIE:function(e,a){var b=new Ext.dd.DragZone(e.getUI().getEl(),{shadow:!Ext.isMac});
b.onMouseUp=this.onMouseUpInDragZoneForIE.bind(this,b);
for(i=0;
i<a.length;
i++){var c=a[i];
var d=c.getUI();
Ext.dd.Registry.register(d.elNode,{node:d.node,handles:[d.elNode,d.textNode],isHandle:false,id:c.id})
}},onMouseUpInDragZoneForIE:function(b){if(b&&b.dragData&&b.dragData.id){var a={value:{id:b.dragData.id}};
this.showGraph(a)
}},findTaskType:function(a){ORYX.EDITOR._canvas.getChildren().each((function(b){this.isTaskType(b,a)
}).bind(this))
},isTaskType:function(b,a){if(b instanceof ORYX.Core.Node){if(b.resourceId==a&&b.properties["oryx-tasktype"]){this.taskType=b.properties["oryx-tasktype"]
}if(b.getChildren().size()>0){for(var c=0;
c<b.getChildren().size();
c++){if(b.getChildren()[c] instanceof ORYX.Core.Node){this.isTaskType(b.getChildren()[c],a)
}}}}},showProcessAveragesGraph:function(a,d){var o=jsonPath(d.evalJSON(),"$.processsim.*");
var g=jsonPath(d.evalJSON(),"$.timeline");
var k=jsonPath(d.evalJSON(),"$.activityinstances.*");
var m=jsonPath(d.evalJSON(),"$.eventaggregations.*");
var e=[];
var c=jsonPath(d.evalJSON(),"$.htsim.*");
for(var f=0;
f<c.length;
f++){var p=c[f];
e.push(p.costvalues)
}var b=[];
var j=jsonPath(d.evalJSON(),"$.htsim.*");
for(var f=0;
f<j.length;
f++){var p=j[f];
b.push(p.resourcevalues)
}var h={timeline:g[0]};
var l=ORYX.EDITOR.getSerializedJSON();
var n=jsonPath(l.evalJSON(),"$.properties.timeunit");
ORYX.EDITOR.simulationChartTimeUnit=this.getSimTimeUnit(n);
ORYX.EDITOR.simulationChartData=o;
ORYX.EDITOR.simulationEventData=h;
ORYX.EDITOR.simulationEventAggregationData=m;
ORYX.EDITOR.simulationInstancesData=k;
ORYX.EDITOR.simulationHTCostData=e;
ORYX.EDITOR.simulationHTResourceData=b;
ORYX.EDITOR.simulationChartTitle=ORYX.I18N.View.sim.resultsTitlesProcessSimResults;
ORYX.EDITOR.simulationChartId=o[0].id;
ORYX.EDITOR.simulationChartNodeName=o[0].name;
Ext.getDom("simchartframe").src=ORYX.BASE_FILE_PATH+"simulation/processchart.jsp"
},showTaskAveragesGraph:function(h,e){var f=jsonPath(e.evalJSON(),"$.tasksim.*");
for(var b=0;
b<f.length;
b++){var a=f[b];
if(a.id==h){var d=[];
d[0]=a;
var c=ORYX.EDITOR.getSerializedJSON();
var g=jsonPath(c.evalJSON(),"$.properties.timeunit");
ORYX.EDITOR.simulationChartTimeUnit=this.getSimTimeUnit(g);
ORYX.EDITOR.simulationChartData=d;
ORYX.EDITOR.simulationEventData=d[0].timeline;
ORYX.EDITOR.simulationChartTitle=ORYX.I18N.View.sim.resultsTitlesTaskSimResults;
ORYX.EDITOR.simulationChartId=d[0].id;
ORYX.EDITOR.simulationChartNodeName=d[0].name;
Ext.getDom("simchartframe").src=ORYX.BASE_FILE_PATH+"simulation/taskchart.jsp"
}}},showHumanTaskAveragesGraph:function(f,d){var g=jsonPath(d.evalJSON(),"$.htsim.*");
for(var c=0;
c<g.length;
c++){var a=g[c];
if(a.id==f){var b=ORYX.EDITOR.getSerializedJSON();
var e=jsonPath(b.evalJSON(),"$.properties.timeunit");
ORYX.EDITOR.simulationChartTimeUnit=this.getSimTimeUnit(e);
ORYX.EDITOR.simulationChartData=a;
ORYX.EDITOR.simulationEventData=a.timeline;
ORYX.EDITOR.simulationChartTitle=ORYX.I18N.View.sim.resultsTitlesHumanTaskSimResults;
ORYX.EDITOR.simulationChartId=a.id;
ORYX.EDITOR.simulationChartNodeName=a.name;
Ext.getDom("simchartframe").src=ORYX.BASE_FILE_PATH+"simulation/humantaskchart.jsp"
}}},showPathGraph:function(c,b){var e=jsonPath(b.evalJSON(),"$.pathsim.*");
var a=ORYX.EDITOR.getSerializedJSON();
var d=jsonPath(a.evalJSON(),"$.properties.timeunit");
ORYX.EDITOR.simulationChartTimeUnit=this.getSimTimeUnit(d);
ORYX.EDITOR.simulationChartTitle=ORYX.I18N.View.sim.resultsTitlesPathExecutionInfo+" ("+c+")";
ORYX.EDITOR.simulationPathData=e;
ORYX.EDITOR.simulationPathId=c;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SIMULATION_BUILD_PATH_SVG,pid:c})
},pathSvgGenerated:function(){ORYX.EDITOR.simulationPathSVG=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(false));
Ext.getDom("simchartframe").src=ORYX.BASE_FILE_PATH+"simulation/pathschart.jsp";
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SIMULATION_CLEAR_PATH_SVG})
},annotateProcess:function(a){this.resetNodeColors();
this.resetNodeOverlays();
this.annotateNode(a.nodeid,a.eventnum,a.data);
setTimeout(function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SIMULATION_SHOW_ANNOTATED_PROCESS,data:DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(false)),wind:window,docu:document});
this.resetNodeColors();
this.resetNodeOverlays()
}.bind(this),500)
},resetNodeOverlays:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:"simmodelmax"});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:"simmodelmin"});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:"simmodelavg"})
},resetNodeColors:function(){ORYX.EDITOR._canvas.getChildren().each((function(a){this.setOriginalValues(a)
}).bind(this))
},setOriginalValues:function(a){if(a instanceof ORYX.Core.Node||a instanceof ORYX.Core.Edge){a.setProperty("oryx-bordercolor",a.properties["oryx-origbordercolor"]);
a.setProperty("oryx-bgcolor",a.properties["oryx-origbgcolor"])
}a.refresh();
if(a.getChildren().size()>0){for(var b=0;
b<a.getChildren().size();
b++){if(a.getChildren()[b] instanceof ORYX.Core.Node||a.getChildren()[b] instanceof ORYX.Core.Edge){this.setOriginalValues(a.getChildren()[b])
}}}},annotateNode:function(c,a,b){ORYX.EDITOR._canvas.getChildren().each((function(d){this.setNodeAnnotation(d,c,a,b)
}).bind(this))
},setNodeAnnotation:function(h,a,g,f){if(h instanceof ORYX.Core.Node||h instanceof ORYX.Core.Edge){if(h.resourceId==a){var d=this.getDisplayColor(1);
h.setProperty("oryx-bordercolor",d);
h.setProperty("oryx-bgcolor",d);
h.refresh();
var c=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["text",{id:"modelmax",style:"stroke-width:1;fill:red;font-family:arial;font-weight:bold","font-size":10}]);
c.textContent="Max: "+f.values[0].value;
var j=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["text",{id:"modelmin",style:"stroke-width:1;fill:blue;font-family:arial;font-weight:bold","font-size":10}]);
j.textContent="Min: "+f.values[1].value;
var b=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["text",{id:"modelavg",style:"stroke-width:1;fill:green;font-family:arial;font-weight:bold","font-size":10}]);
b.textContent="Avg: "+f.values[2].value;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"simmodelmax",shapes:[h],node:c,nodePosition:"SIMMODELMAX"});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"simmodelmin",shapes:[h],node:j,nodePosition:"SIMMODELMIN"});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"simmodelavg",shapes:[h],node:b,nodePosition:"SIMMODELAVG"})
}}if(h.getChildren().size()>0){for(var e=0;
e<h.getChildren().size();
e++){if(h.getChildren()[e] instanceof ORYX.Core.Node||h.getChildren()[e] instanceof ORYX.Core.Edge){this.setNodeAnnotation(h.getChildren()[e],a,g,f)
}}}},getDisplayColor:function(b){var a=["#3399FF","#FFCC33","#FF99FF","#6666CC","#CCCCCC","#66FF00","#FFCCFF","#0099CC","#CC66FF","#FFFF00","#993300","#0000CC","#3300FF","#990000","#33CC00"];
return a[b]
},getSimTimeUnit:function(a){if(ORYX.I18N.View.sim.chartsTimeUnits[a]!==undefined){return ORYX.I18N.View.sim.chartsTimeUnits[a]
}else{return a
}}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.DockerCreation=Clazz.extend({construct:function(a){this.facade=a;
this.active=false;
this.circle=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["g",{"pointer-events":"none"},["circle",{cx:"8",cy:"8",r:"3",fill:"yellow"}]]);
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN,this.handleMouseDown.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEOVER,this.handleMouseOver.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEOUT,this.handleMouseOut.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEMOVE,this.handleMouseMove.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DBLCLICK,function(){window.clearTimeout(this.timer)
}.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEUP,function(){window.clearTimeout(this.timer)
}.bind(this))
},handleMouseOut:function(b,a){if(this.active){this.hideOverlay();
this.active=false
}},handleMouseOver:function(b,a){if(a instanceof ORYX.Core.Edge&&this.isEdgeDocked(a)){this.showOverlay(a,this.facade.eventCoordinates(b))
}this.active=true
},handleMouseDown:function(b,a){if(b.which==1&&a instanceof ORYX.Core.Edge&&this.isEdgeDocked(a)){if(a.getIsSelectable()){window.clearTimeout(this.timer);
this.timer=window.setTimeout(function(){this.addDockerCommand({edge:a,event:b,position:this.facade.eventCoordinates(b)})
}.bind(this),200)
}this.hideOverlay()
}},handleMouseMove:function(b,a){if(a instanceof ORYX.Core.Edge&&this.isEdgeDocked(a)){if(this.active){this.hideOverlay();
this.showOverlay(a,this.facade.eventCoordinates(b))
}else{this.showOverlay(a,this.facade.eventCoordinates(b))
}}},isEdgeDocked:function(a){return !!(a.incoming.length||a.outgoing.length)
},addDockerCommand:function(b){if(!b.edge){return
}var a=ORYX.Core.Command.extend({construct:function(f,g,h,e,d){this.edge=f;
this.docker=g;
this.pos=h;
this.facade=e;
this.options=d
},execute:function(){this.docker=this.edge.addDocker(this.pos,this.docker);
this.index=this.edge.dockers.indexOf(this.docker);
this.facade.getCanvas().update();
this.facade.updateSelection();
this.options.docker=this.docker
},rollback:function(){if(this.docker instanceof ORYX.Core.Controls.Docker){this.edge.removeDocker(this.docker)
}this.facade.getCanvas().update();
this.facade.updateSelection()
}});
var c=new a(b.edge,b.docker,b.position,this.facade,b);
this.facade.executeCommands([c]);
this.facade.raiseEvent({uiEvent:b.event,type:ORYX.CONFIG.EVENT_DOCKERDRAG},b.docker)
},showOverlay:function(a,j){var e=j;
var f=[0,1];
var b=Infinity;
for(var g=0,d=a.dockers.length;
g<d-1;
g++){var c=ORYX.Core.Math.getPointOfIntersectionPointLine(a.dockers[g].bounds.center(),a.dockers[g+1].bounds.center(),j,true);
if(!c){continue
}var h=ORYX.Core.Math.getDistancePointToPoint(j,c);
if(b>h){b=h;
e=c
}}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"ghostpoint",shapes:[a],node:this.circle,ghostPoint:e,dontCloneNode:true})
},hideOverlay:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:"ghostpoint"})
}});
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.TaskPropertiesUpdater=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,this.handlePropertyChanged.bind(this))
},handlePropertyChanged:function(b){if(b.key=="oryx-tasktype"){var a=b.elements[0];
if(a){this.facade.getCanvas().update()
}}}});
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.VoiceCommand=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_VOICE_COMMAND,this.handleVoiceCommand.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.VOICE_COMMAND_ADD_START_EVENT,this.addNode.bind(this,"StartNoneEvent"));
this.facade.registerOnEvent(ORYX.CONFIG.VOICE_COMMAND_TASK_TYPE_USER,this.updateTask.bind(this,"User"));
this.facade.registerOnEvent(ORYX.CONFIG.VOICE_COMMAND_TASK_TYPE_SCRIPT,this.updateTask.bind(this,"Script"));
this.commands=this._initCommands();
String.prototype.soundex=function(g){var e,d,c,f,g=isNaN(g)?4:g>10?10:g<4?4:g,b={BFPV:1,CGJKQSXZ:2,DT:3,L:4,MN:5,R:6},f=(s=this.toUpperCase().replace(/[^A-Z]/g,"").split("")).splice(0,1);
for(e=-1,c=s.length;
++e<c;
){for(d in b){if(d.indexOf(s[e])+1&&f[f.length-1]!=b[d]&&f.push(b[d])){break
}}}return f.length>g&&(f.length=g),f.join("")+(new Array(g-f.length+1)).join("0")
}
},handleVoiceCommand:function(a){if(a&&a.entry){if(a.entry.length>0){var d=false;
for(var g in this.commands){if(this.commands.hasOwnProperty(g)){var f=g.split(",");
for(var b=0;
b<f.length;
b++){var e=f[b];
if(a.entry.soundex()==e.soundex()){d=true;
this.facade.raiseEvent({type:this.commands[g]});
break
}}if(d){break
}}}if(!d){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.voiceCommand.commandNotFound+": "+a.entry,title:""})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.voiceCommand.invalidcommand,title:""})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.voiceCommand.invalidcommand,title:""})
}},_initCommands:function(){var a={};
a[ORYX.CONFIG.VOICE_ENTRY_GENERATE_FORMS]=ORYX.CONFIG.VOICE_COMMAND_GENERATE_FORMS;
a[ORYX.CONFIG.VOICE_ENTRY_GENERATE_IMAGE]=ORYX.CONFIG.VOICE_COMMAND_GENERATE_IMAGE;
a[ORYX.CONFIG.VOICE_ENTRY_VIEW_SOURCE]=ORYX.CONFIG.VOICE_COMMAND_VIEW_SOURCE;
a[ORYX.CONFIG.VOICE_ENTRY_ADD_TASK]=ORYX.CONFIG.VOICE_COMMAND_ADD_TASK;
a[ORYX.CONFIG.VOICE_ENTRY_ADD_GATEWAY]=ORYX.CONFIG.VOICE_COMMAND_ADD_GATEWAY;
a[ORYX.CONFIG.VOICE_ENTRY_ADD_END_EVENT]=ORYX.CONFIG.VOICE_COMMAND_ADD_END_EVENT;
a[ORYX.CONFIG.VOICE_ENTRY_ADD_START_EVENT]=ORYX.CONFIG.VOICE_COMMAND_ADD_START_EVENT;
a[ORYX.CONFIG.VOICE_ENTRY_TASK_TYPE_USER]=ORYX.CONFIG.VOICE_COMMAND_TASK_TYPE_USER;
a[ORYX.CONFIG.VOICE_ENTRY_TASK_TYPE_SCRIPT]=ORYX.CONFIG.VOICE_COMMAND_TASK_TYPE_SCRIPT;
a[ORYX.CONFIG.VOICE_ENTRY_GATEWAY_TYPE_PARALLEL]=ORYX.CONFIG.VOICE_COMMAND_GATEWAY_TYPE_PARALLEL;
return a
},updateTask:function(b){var c=this.facade.getSelection();
if(c.length==1){var a=c.first();
a.setProperty("oryx-tasktype",b);
a.refresh()
}},addNode:function(e){var b=ORYX.Core.Command.extend({construct:function(i,g,j,f,h){this.option=i;
this.currentParent=g;
this.canAttach=j;
this.position=f;
this.facade=h;
this.selection=this.facade.getSelection();
this.shape;
this.parent
},execute:function(){if(!this.shape){this.shape=this.facade.createShape(c);
this.parent=this.shape.parent
}else{this.parent.add(this.shape)
}if(this.canAttach&&this.currentParent instanceof ORYX.Core.Node&&this.shape.dockers.length>0){var f=this.shape.dockers[0];
if(this.currentParent.parent instanceof ORYX.Core.Node){this.currentParent.parent.add(f.parent)
}f.bounds.centerMoveTo(this.position);
f.setDockedShape(this.currentParent)
}this.facade.setSelection([this.shape]);
this.facade.getCanvas().update();
this.facade.updateSelection()
},rollback:function(){this.facade.deleteShape(this.shape);
this.facade.setSelection(this.selection.without(this.shape));
this.facade.getCanvas().update();
this.facade.updateSelection()
}});
var a={x:178,y:209};
var c={type:"http://b3mn.org/stencilset/bpmn2.0#"+e,namespace:"http://b3mn.org/stencilset/bpmn2.0#",connectingType:true,isHandle:false,position:a,parent:ORYX.EDITOR._canvas};
var d=new b(c,ORYX.EDITOR._canvas,undefined,a,this.facade);
this.facade.executeCommands([d])
}});
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.PatternCreator=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.CREATE_PATTERN,this.handleCreatePattern.bind(this));
this.patternShapes={};
this.patternPositions={};
this.selectedRoots=[];
this.selectedRootsCount;
this.createdElementCount;
this.patternContainer
},handleCreatePattern:function(c){if(c&&c.pid&&c.pdata&&c.pos){this.patternShapes={};
this.patternPositions={};
this.selectedRoots=[];
this.selectedRootsCount=0;
this.createdElementCount=0;
this.patternContainer=undefined;
for(var e=0;
e<c.pdata.length;
e++){var g=c.pdata[e];
if(g.id==c.pid){var f=g.elements;
var h=this.facade.getSelection();
h.each(function(i){if(i instanceof ORYX.Core.Node){this.selectedRoots[this.selectedRootsCount]=i;
this.selectedRootsCount++
}}.bind(this));
var b=this.getPatternRoots(f);
if(this.selectedRoots.length>0&&(this.selectedRoots.length!=b.length)){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.patternCreator.errorAttaching,title:""});
return
}for(var a=0;
a<f.length;
a++){var d=f[a];
if(this.patternShapes[d.id]===undefined){this.createElement(d,c);
this.createElementChildren(d,f,c)
}else{this.createElementChildren(d,f,c)
}}this.updateParentContainer()
}}this.facade.setSelection([]);
this.facade.getCanvas().update();
this.facade.updateSelection()
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.patternCreator.invalidData,title:""})
}},updateParentContainer:function(){if(!(this.patternContainer instanceof ORYX.Core.Canvas)){var b=0;
var a=0;
var c=100;
this.patternContainer.getChildShapes(false,function(f){var e=f.bounds;
b=Math.max(b,e.lowerRight().x+c);
a=Math.max(a,e.lowerRight().y+c)
});
if(this.patternContainer.bounds.width()<b||this.patternContainer.bounds.height()<a){var d=this.patternContainer.bounds.upperLeft();
this.patternContainer.bounds.set(d.x,d.y,d.x+b,d.y+a);
this.patternContainer.update();
this.facade.getCanvas().update()
}}},getPatternRoots:function(e){var a=[];
var d=0;
for(var b=0;
b<e.length;
b++){var c=e[b];
if(c.parent.length==0){a[d]=c;
d++
}}return a
},findChildObject:function(a,d){for(var b=0;
b<d.length;
b++){var c=d[b];
if(c.id==a){return c
}}return undefined
},createElement:function(d,c){var g;
var f=this.facade.getCanvas().getAbstractShapesAtPosition(c.pos);
if(f.length<=0){g=ORYX.EDITOR._canvas
}if(f.lenght==1&&f[0] instanceof ORYX.Core.Canvas){g=ORYX.EDITOR._canvas
}else{var a=f.reverse().find(function(h){return(h instanceof ORYX.Core.Canvas||h instanceof ORYX.Core.Node||h instanceof ORYX.Core.Edge)
});
g=a
}if(!this.patternContainer||this.patternContainer===undefined){this.patternContainer=g
}if(d.parent.length==0&&this.selectedRoots.length>0){this.patternShapes[d.id]=this.selectedRoots[this.createdElementCount];
this.patternPositions[d.id]=this.selectedRoots[this.createdElementCount].absoluteCenterXY();
this.createdElementCount++;
return
}var e={x:0,y:0};
if(this.patternPositions[d.id]===undefined){e.x=c.pos.x;
e.y=c.pos.y
}else{e.x=this.patternPositions[d.id].x;
e.y=this.patternPositions[d.id].y
}e.x+=d.xyOffset[0];
e.y+=d.xyOffset[1];
var b={type:d.nodetype,namespace:d.namespace,connectingType:d.connectingType,position:e,parent:g};
this.patternShapes[d.id]=this.facade.createShape(b);
this.patternPositions[d.id]=e;
this.setElementProperties(d);
this.patternShapes[d.id].refresh();
this.facade.getCanvas().update()
},createElementChildren:function(e,j,n){var m=e.children;
for(var d=0;
d<m.length;
d++){var g=m[d];
if(this.patternShapes[g]===undefined){var f=this.findChildObject(g,j);
if(f){var c={x:0,y:0};
c.x=this.patternPositions[e.id].x;
c.y=this.patternPositions[e.id].y;
c.x+=f.xyOffset[0];
c.y+=f.xyOffset[1];
var b={type:f.nodetype,namespace:f.namespace,connectingType:f.connectingType,connectedShape:this.patternShapes[e.id],position:c,parent:this.patternContainer};
this.patternShapes[f.id]=this.facade.createShape(b);
this.patternPositions[f.id]=c;
this.setElementProperties(f);
this.patternShapes[f.id].refresh();
this.facade.getCanvas().update()
}}else{var a;
var f=this.findChildObject(g,j);
var i=ORYX.Core.StencilSet.stencil(f.connectingType);
a=new ORYX.Core.Edge({eventHandlerCallback:this.facade.raiseEvent},i);
a.dockers.first().setDockedShape(this.patternShapes[e.id]);
var h=this.patternShapes[e.id].getDefaultMagnet();
var l=h?h.bounds.center():this.patternShapes[e.id].bounds.midPoint();
a.dockers.first().setReferencePoint(l);
a.dockers.last().setDockedShape(this.patternShapes[g]);
a.dockers.last().setReferencePoint(this.patternShapes[g].getDefaultMagnet().bounds.center());
this.facade.getCanvas().add(a);
this.facade.getCanvas().update()
}}},createPatternFromSelection:function(){var d=this.facade.getSelection();
if(d&&d.size()>0){var c=this.findParentShapes(d);
if(c&&c.size()>0){var e=new Ext.form.TextField({fieldLabel:ORYX.I18N.patternCreator.patternName,allowBlank:false,id:"patternName",regex:/^[a-z0-9 \-\.\_]*$/i});
var a=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:150,labelAlign:"right",bodyStyle:"padding:15x 15px 15px 15px",defaultType:"textfield",items:[e]});
var b=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.patternCreator.create,height:150,width:400,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){b.hide()
}.bind(this)}],items:[a],listeners:{hide:function(){b.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){b.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){b.hide()
}.bind(this)}]});
b.show()
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.patternCreator.invalidSelect,title:""})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.patternCreator.noNodesSel,title:""})
}},setElementProperties:function(b){if(b.properties){var c=b.properties;
for(var a in c){this.patternShapes[b.id].setProperty("oryx-"+a,c[a])
}}},findParentShapes:function(c){var a=[];
var b=0;
c.each(function(d){if(d.getIncomingShapes()&&d.getIncomingShapes().size()>0){if(!this.isInSelection(c,d.getIncomingShapes())){if(d instanceof ORYX.Core.Node){a[b]=d;
b++
}}}else{a[b]=d;
b++
}}.bind(this));
return a
},isInSelection:function(d,a){var b=false;
if(!a||a.size()==0){return false
}for(var c=0;
c<a.length;
c++){d.each(function(e){if(e.resourceId==a[c].resourceId){b=true
}}.bind(this))
}return b
}});
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
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.NotificationsPlugin=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,this.showNotification.bind(this))
},showNotification:function(a){notifications.options={positionClass:a.position||"notification-top-right",onclick:a.onclick||null,timeOut:a.timeOut||1000,extendedTimeOut:a.extendedTimeOut||4000};
var b=notifications[a.ntype](a.msg,a.title)
}});
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.ActiveNodesHighlighter=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED,this.highlightnodes.bind(this))
},highlightnodes:function(a){ORYX.EDITOR._canvas.getChildren().each((function(b){this.applyHighlightingToChild(b)
}).bind(this))
},applyHighlightingToChild:function(b){if(ORYX.COMPLETEDNODES){for(var a=0;
a<ORYX.COMPLETEDNODES.length;
a++){if(b instanceof ORYX.Core.Node||b instanceof ORYX.Core.Edge){if(ORYX.COMPLETEDNODES[a]==b.resourceId){b.setProperty("oryx-bordercolor","#A8A8A8");
b.setProperty("oryx-bgcolor","#CDCDCD")
}}}}if(ORYX.ACTIVENODES){for(var a=0;
a<ORYX.ACTIVENODES.length;
a++){if(b instanceof ORYX.Core.Node||b instanceof ORYX.Core.Edge){if(ORYX.ACTIVENODES[a]==b.resourceId){b.setProperty("oryx-bordercolor","#FF0000");
b.setProperty("oryx-bgcolor",b.properties["oryx-origbgcolor"])
}}}}if(b instanceof ORYX.Core.Node||b instanceof ORYX.Core.Edge){if(ORYX.READONLY==true||ORYX.VIEWLOCKED==true){b.setSelectable(false);
b.setMovable(false);
b.setProperty("oryx-isselectable","false");
if(b instanceof ORYX.Core.Edge){b.dockers.each((function(c){c.setMovable(false);
c.update()
}))
}}b.refresh()
}if(b&&b.getChildren().size()>0){for(var a=0;
a<b.getChildren().size();
a++){this.applyHighlightingToChild(b.getChildren()[a])
}}}});
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.FormEditing=Clazz.extend({construct:function(a){this.facade=a;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){if(ORYX.PRESET_PERSPECTIVE!="ruleflow"){this.facade.offer({name:ORYX.I18N.View.editProcessForm,functionality:this.editProcessForm.bind(this),group:"editprocessforms",icon:ORYX.BASE_FILE_PATH+"images/processforms.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/processforms.png",description:ORYX.I18N.View.editProcessFormDesc,index:1,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.View.editTaskForm,functionality:this.editTaskForm.bind(this),group:"editprocessforms",icon:ORYX.BASE_FILE_PATH+"images/processforms.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/processforms.png",description:ORYX.I18N.View.editTaskFormDesc,index:2,minShape:1,maxShape:1,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.forms.generateTaskForm,functionality:this.generateTaskForm.bind(this),group:"editprocessforms",icon:ORYX.BASE_FILE_PATH+"images/processforms.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/processforms.png",description:ORYX.I18N.forms.generateTaskForm_desc,index:3,minShape:1,maxShape:1,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.forms.generateAllForms,functionality:this.generateTaskForms.bind(this),group:"editprocessforms",icon:ORYX.BASE_FILE_PATH+"images/processforms.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/processforms.png",description:ORYX.I18N.forms.generateAllForms_desc,index:4,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)})
}}},generateTaskForm:function(){var a=ORYX.Config.FACADE.getSelection();
if(a){if(a.length!=1){ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.invalidNumberNodes,title:""})
}else{var c=a[0].properties["oryx-tasktype"];
if(c&&c=="User"){var b=a[0].properties["oryx-taskname"];
if(b&&b.length>0){b=b.replace(/\&/g,"");
b=b.replace(/\s/g,"");
Ext.Ajax.request({url:ORYX.PATH+"taskforms",method:"POST",success:function(d){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.forms.successGenTask,title:""})
}.createDelegate(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failGenTask,title:""})
}.createDelegate(this),params:{profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),json:ORYX.EDITOR.getSerializedJSON(),ppdata:ORYX.PREPROCESSING,taskid:a[0].resourceId}})
}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failNoTaskName,title:""})
}}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failNoUserTask,title:""})
}}}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failNoTaskSelected,title:""})
}},editTaskForm:function(){var a=ORYX.Config.FACADE.getSelection();
if(a){if(a.length!=1){ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.invalidNumberNodes,title:""})
}else{var c=a[0].properties["oryx-tasktype"];
if(c&&c=="User"){var b=a[0].properties["oryx-taskname"];
if(b&&b.length>0){b=b.replace(/\&/g,"");
b=b.replace(/\s/g,"");
ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_TASKFORM_EDIT,tn:b})
}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failNoTaskName,title:""})
}}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failNoUserTask,title:""})
}}}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failNoTaskSelected,title:""})
}},editProcessForm:function(){var a=ORYX.EDITOR.getSerializedJSON();
var b=jsonPath(a.evalJSON(),"$.properties.id");
if(b&&b!=""){ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_TASKFORM_EDIT,tn:b})
}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failProcIdUndef,title:""})
}},generateTaskForms:function(){Ext.Ajax.request({url:ORYX.PATH+"taskforms",method:"POST",success:function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.forms.successGenProcAndTask,title:""})
}.createDelegate(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failGenProcAndTask,title:""})
}.createDelegate(this),params:{profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),json:ORYX.EDITOR.getSerializedJSON(),ppdata:ORYX.PREPROCESSING}});
ORYX.CONFIG.TASKFORMS_URL=function(b,a){if(b===undefined){b=ORYX.UUID
}if(a===undefined){a=ORYX.PROFILE
}return ORYX.PATH+"taskforms?uuid="+window.btoa(encodeURI(b))+"&profile="+a
}
}});
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.Commands={};
ORYX.Core.AbstractCommand=Clazz.extend({construct:function construct(a,b){this.metadata={};
this.metadata.id=ORYX.Editor.provideId();
this.metadata.name=this.getCommandName();
this.metadata.createdAt=new Date().getTime();
this.metadata.local=true;
this.metadata.putOnStack=true;
this.facade=a;
if(!b){this.execute=function c(d){d();
this.getAffectedShapes().each(function e(f){if(typeof f.metadata==="undefined"){return
}f.metadata.changedAt.push(this.getCreatedAt());
f.metadata.changedBy.push(this.getCreatorId());
f.metadata.commands.push(this.getDisplayName());
f.metadata.isLocal=this.isLocal();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SHAPE_METADATA_CHANGED,shape:f})
}.bind(this))
}.bind(this,this.execute.bind(this));
this.rollback=function c(e){e();
this.getAffectedShapes().each(function d(f){if(typeof f.metadata==="undefined"){return
}f.metadata.changedAt.pop();
f.metadata.changedBy.pop();
f.metadata.commands.pop();
f.metadata.isLocal=this.isLocal();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SHAPE_METADATA_CHANGED,shape:f})
}.bind(this))
}.bind(this,this.rollback.bind(this))
}},getCommandId:function getCommandId(){return this.metadata.id
},getCreatorId:function getCreatorId(){return this.metadata.creatorId
},getCreatedAt:function getCreatedAt(){return this.metadata.createdAt
},createFromCommandData:function createFromCommandData(a,b){throw"AbstractCommand.createFromCommandData() has to be implemented"
},getAffectedShapes:function getAffectedShapes(){throw"AbstractCommand.getAffectedShapes() has to be implemented"
},getCommandData:function getCommandData(){throw"AbstractCommand.getCommandData() has to be implemented"
},getCommandName:function getCommandName(){throw"AbstractCommand.getCommandName() has to be implemented"
},getDisplayName:function getDisplayName(){return this.getCommandName()
},execute:function execute(){throw"AbstractCommand.execute() has to be implemented"
},rollback:function rollback(){throw"AbstractCommand.rollback() has to be implemented!"
},isLocal:function isLocal(){return this.metadata.local
},jsonSerialize:function jsonSerialize(){var b=this.getCommandData();
var a={id:this.getCommandId(),name:this.getCommandName(),creatorId:this.getCreatorId(),createdAt:this.getCreatedAt(),data:b,putOnStack:this.metadata.putOnStack};
return Object.toJSON(a)
},jsonDeserialize:function jsonDeserialize(c,b){var a=b.evalJSON();
var d=ORYX.Core.Commands[a.name].prototype.createFromCommandData(c,a.data);
if(typeof d!=="undefined"){d.setMetadata({id:a.id,name:a.name,creatorId:a.creatorId,createdAt:a.createdAt,putOnStack:a.putOnStack,local:false})
}return d
},setMetadata:function setMetadata(a){this.metadata=Object.clone(a)
}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.Paint=ORYX.Plugins.AbstractPlugin.extend({construct:function construct(a){arguments.callee.$.construct.apply(this,arguments);
ORYX.EDITOR._pluginFacade.offer({name:ORYX.I18N.paint_name,description:ORYX.I18N.paint_desc,icon:ORYX.BASE_FILE_PATH+"images/paint.png",functionality:this._togglePaint.bind(this),group:"paintgroup",toggle:true,index:1,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.showCanvas=false;
ORYX.EDITOR._pluginFacade.registerOnEvent(ORYX.CONFIG.EVENT_PAINT_NEWSHAPE,this._onNewShape.bind(this));
ORYX.EDITOR._pluginFacade.registerOnEvent(ORYX.CONFIG.EVENT_PAINT_REMOVESHAPE,this._onRemoveShape.bind(this));
ORYX.EDITOR._pluginFacade.registerOnEvent(ORYX.CONFIG.EVENT_CANVAS_RESIZED,this._onCanvasResized.bind(this));
ORYX.EDITOR._pluginFacade.registerOnEvent(ORYX.CONFIG.EVENT_CANVAS_RESIZE_SHAPES_MOVED,this._onCanvasResizedShapesMoved.bind(this));
ORYX.EDITOR._pluginFacade.registerOnEvent(ORYX.CONFIG.EVENT_CANVAS_ZOOMED,this._onCanvasZoomed.bind(this))
},onLoaded:function onLoaded(){this.paintCanvas=this._createCanvas();
this._loadBrush(this.paintCanvas);
this.toolbar=this._createToolbar();
this.paintCanvas.hide();
this.paintCanvas.deactivate()
},_activateTool:function _activateTool(a){this.paintCanvas.setTool(a)
},_onCanvasZoomed:function _onCanvasZoomed(a){if(typeof this.paintCanvas==="undefined"){return
}this.paintCanvas.scale(a.zoomLevel);
this._alignCanvasWithOryxCanvas()
},_createCanvas:function _createCanvas(){var b=ORYX.EDITOR._pluginFacade.getCanvas();
var a={canvasId:"freehand-paint",width:b.bounds.width(),height:b.bounds.height(),shapeDrawnCallback:this._onShapeExistenceCommand.bind(this,"Paint.DrawCommand"),shapeDeletedCallback:this._onShapeExistenceCommand.bind(this,"Paint.RemoveCommand")};
var c=new ORYX.Plugins.Paint.PaintCanvas(a);
var d=b.rootNode.parentNode;
d.appendChild(c.getDomElement());
return c
},_loadBrush:function _loadBrush(b){var a=new Image();
a.onload=b.setBrush.bind(b,a,2);
a.src=ORYX.BASE_FILE_PATH+"images/paint/brush.png"
},_createToolbar:function _createToolbar(){var b=this._getBasePath();
var a=new ORYX.Plugins.Paint.Toolbar();
a.addButton(ORYX.BASE_FILE_PATH+"images/paint/line.png",this._activateTool.bind(this,ORYX.Plugins.Paint.PaintCanvas.LineTool));
a.addButton(ORYX.BASE_FILE_PATH+"images/paint/arrow.png",this._activateTool.bind(this,ORYX.Plugins.Paint.PaintCanvas.ArrowTool));
a.addButton(ORYX.BASE_FILE_PATH+"images/paint/box.png",this._activateTool.bind(this,ORYX.Plugins.Paint.PaintCanvas.BoxTool));
a.addButton(ORYX.BASE_FILE_PATH+"images/paint/ellipse.png",this._activateTool.bind(this,ORYX.Plugins.Paint.PaintCanvas.EllipseTool));
a.hide();
return a
},_getBasePath:function _getBasePath(){var a=window.location.href.lastIndexOf("/");
return window.location.href.substring(0,a)
},_togglePaint:function _togglePaint(){this.showCanvas=!this.showCanvas;
if(this.showCanvas){if(typeof this.toolbar!=="undefined"){this.toolbar.show()
}this.paintCanvas.show();
this.paintCanvas.activate();
this._alignCanvasWithOryxCanvas()
}else{if(typeof this.toolbar!=="undefined"){this.toolbar.hide()
}this.paintCanvas.hide();
this.paintCanvas.deactivate()
}},_onNewShape:function _onNewShape(a){this.paintCanvas.addShapeAndDraw(a.shape)
},_onRemoveShape:function _onRemoveShape(a){this.paintCanvas.removeShape(a.shapeId)
},_onShapeExistenceCommand:function _onShapeExistenceCommand(b,a){var c=new ORYX.Core.Commands[b](a,ORYX.EDITOR._pluginFacade);
c.execute()
},_onCanvasResized:function _onCanvasResized(a){this.paintCanvas.resize(a.bounds.width(),a.bounds.height());
this._alignCanvasWithOryxCanvas()
},_onCanvasResizedShapesMoved:function _onCanvasResizedShapesMoved(a){this.paintCanvas.moveShapes(a.offsetX,a.offsetY)
},_onRemoveKeyPressed:function _onRemoveKeyPressed(a){this.paintCanvas.deleteCurrentShape()
},_alignCanvasWithOryxCanvas:function _alignCanvasWithOryxCanvas(){var a=ORYX.EDITOR._pluginFacade.getCanvas().rootNode.parentNode;
var b=jQuery(a).offset();
this.paintCanvas.setOffset(b)
},_onRemoveKey:function _onRemoveKey(a){this.paintCanvas.removeShapesUnderCursor()
}});
ORYX.Plugins.Paint.Toolbar=Clazz.extend({construct:function construct(){var a=$$(".ORYX_Editor")[0].parentNode;
this.toolsList=document.createElement("div");
this.toolsList.id="paint-toolbar";
a.appendChild(this.toolsList);
this.buttonsAdded=false
},show:function show(){this.toolsList.show()
},hide:function hide(){this.toolsList.hide()
},addButton:function addButton(b,d){var a=this._createButton(b);
this.toolsList.appendChild(a);
var c=this._onButtonClicked.bind(this,a,d);
jQuery(a).click(c);
if(!this.buttonsAdded){c();
this.buttonsAdded=true
}},_createButton:function _createButton(b){var c=document.createElement("div");
c.className="paint-toolbar-button";
var a=document.createElement("div");
a.style.backgroundImage="url("+b+")";
c.appendChild(a);
return c
},_onButtonClicked:function _onButtonClicked(a,b){jQuery(this.toolsList).children().removeClass("paint-toolbar-button-pressed");
jQuery(a).addClass("paint-toolbar-button-pressed");
b()
}});
ORYX.Plugins.Paint.CanvasWrapper=Clazz.extend({construct:function construct(a){this.canvas=a;
this.context=a.getContext("2d");
this.scalingFactor=1;
this.color="#000000"
},clear:function clear(){this.canvas.width=this.canvas.width;
this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
this.scale(this.scalingFactor)
},resize:function resize(b,a){this.canvas.style.width=b+"px";
this.canvas.style.height=a+"px";
this.canvas.width=b;
this.canvas.height=a
},scale:function scale(a){this.context.scale(a,a);
this.scalingFactor=a
},setStyle:function setStyle(b,a){this.context.lineJoin="round";
this.context.lineWidth=b;
this.context.strokeStyle=a;
this._setColor(a)
},setBrush:function setBrush(a,b){this.origBrush=a;
this.brush=this._colorBrush(a,this.color);
this.brushDist=b
},drawLine:function drawLine(b,a,d,c){(this.brush?this._brushLine:this._simpleLine).apply(this,arguments)
},drawEllipse:function drawLine(b,a,d,c){(this.brush?this._brushEllipse:this._simpleEllipse).apply(this,arguments)
},drawArrow:function drawArrow(b,l,i,h){this.drawLine.apply(this,arguments);
var e=-Math.atan2(h-l,i-b)+Math.PI/2;
var f=20;
var d=e+3/4*Math.PI;
var k=Math.sin(d)*f;
var j=Math.cos(d)*f;
this.drawLine(i,h,i+k,h+j);
var g=e-3/4*Math.PI;
var c=Math.sin(g)*f;
var a=Math.cos(g)*f;
this.drawLine(i,h,i+c,h+a)
},strokeRect:function strokeRect(b,d,c,a){this.drawLine(b,d,b+c,d);
this.drawLine(b,d+a,b+c,d+a);
this.drawLine(b,d,b,d+a);
this.drawLine(b+c,d,b+c,d+a)
},_setColor:function _setColor(a){if(typeof this.origBrush!=="undefined"){this.brush=this._colorBrush(this.origBrush,a)
}this.color=a
},_simpleLine:function _simpleLine(b,a,d,c){this.context.beginPath();
this.context.moveTo(b,a);
this.context.lineTo(d,c);
this.context.stroke()
},_brushLine:function _brushLine(a,l,h,g){var b=function(i,m){return{x:i,y:m}
};
var e=ORYX.Core.Math.getDistancePointToPoint(b(a,l),b(h,g));
var j=e/this.brushDist;
var f=b(h-a,g-l);
var d=function(i,m){return{x:i.x/m,y:i.y/m}
};
var k=d(f,j);
for(var c=0;
c<j;
c++){this.context.drawImage(this.brush,a+c*k.x-this.brush.width/2,l+c*k.y-this.brush.height/2)
}},_simpleEllipse:function _simpleEllipse(c,e,b,d){var a=this._getEllipseInRectParams.apply(this,arguments);
var f=4*((Math.sqrt(2)-1)/3);
this.context.beginPath();
this.context.moveTo(a.cx,a.cy-a.ry);
this.context.bezierCurveTo(a.cx+(f*a.rx),a.cy-a.ry,a.cx+a.rx,a.cy-(f*a.ry),a.cx+a.rx,a.cy);
this.context.bezierCurveTo(a.cx+a.rx,a.cy+(f*a.ry),a.cx+(f*a.rx),a.cy+a.ry,a.cx,a.cy+a.ry);
this.context.bezierCurveTo(a.cx-(f*a.rx),a.cy+a.ry,a.cx-a.rx,a.cy+(f*a.ry),a.cx-a.rx,a.cy);
this.context.bezierCurveTo(a.cx-a.rx,a.cy-(f*a.ry),a.cx-(f*a.rx),a.cy-a.ry,a.cx,a.cy-a.ry);
this.context.stroke()
},_brushEllipse:function _brushEllipse(b,g,a,f){var e=this._getEllipseInRectParams.apply(this,arguments);
var j=2*Math.PI/Math.max(e.rx,e.ry);
var k=[];
for(var l=0;
l<2*Math.PI;
l+=j){k.push({x:e.cx+Math.cos(l)*e.rx,y:e.cy+Math.sin(l)*e.ry})
}var h,d;
for(var c=0;
c<k.length-1;
c++){h=k[c];
d=k[c+1];
this._brushLine(h.x,h.y,d.x,d.y)
}this._brushLine(k.last().x,k.last().y,k.first().x,k.first().y)
},_getEllipseInRectParams:function _getEllipseInRectParams(b,d,a,c){var f=(a-b)/2;
var e=(c-d)/2;
return{rx:f,ry:e,cx:b+f,cy:d+e}
},_colorBrush:function _colorBrush(b,a){var d=this._createTempCanvas(b.width,b.height);
var c=d.getContext("2d");
c.drawImage(b,0,0);
this._recolorCanvas(c,a,b.width,b.height);
return d
},_createTempCanvas:function _createTempCanvas(b,a){var c=document.createElement("canvas");
c.style.width=b+"px";
c.style.height=a+"px";
c.width=b;
c.height=a;
return c
},_recolorCanvas:function _recolorCanvas(e,b,f,a){var h=e.getImageData(0,0,f,a);
var c=this._getRGB(b);
var g=h.data;
for(var d=0;
d<g.length;
d+=4){g[d]=g[d]/255*c.r;
g[d+1]=g[d+1]/255*c.g;
g[d+2]=g[d+2]/255*c.b
}e.putImageData(h,0,0)
},_getRGB:function _getRGB(a){var b=a.substring(1,7);
return{r:parseInt(b.substring(0,2),16),g:parseInt(b.substring(2,4),16),b:parseInt(b.substring(4,6),16)}
}});
ORYX.Plugins.Paint.PaintCanvas=Clazz.extend({construct:function construct(a){this.container=this._createCanvasContainer(a.canvasId,a.width,a.height);
var b=this._createCanvas("view-canvas");
this.viewCanvas=new ORYX.Plugins.Paint.CanvasWrapper(b);
this.viewCanvas.resize(a.width,a.height);
this.container.appendChild(b);
var c=this._createCanvas("paint-canvas");
this.paintCanvas=new ORYX.Plugins.Paint.CanvasWrapper(c);
this.paintCanvas.resize(a.width,a.height);
this.container.appendChild(c);
this.shapes=[];
this.shapeDrawnCallback=a.shapeDrawnCallback;
this.shapeDeletedCallback=a.shapeDeletedCallback;
this.scalingFactor=1;
this.width=a.width;
this.height=a.height;
this.mouseState=new ORYX.Plugins.Paint.PaintCanvas.MouseState(c,{onMouseDown:this._onMouseDown.bind(this),onMouseUp:this._onMouseUp.bind(this),onMouseMove:this._onMouseMove.bind(this)})
},activate:function activate(){jQuery(this.container).addClass("paint-canvas-container-active")
},deactivate:function deactivate(){jQuery(this.container).removeClass("paint-canvas-container-active");
this.currentAction.mouseUp(this.mouseState.parameters.pos);
this.paintCanvas.clear()
},setTool:function setTool(a){var b=this._getColor();
this.currentAction=new a(b,this.paintCanvas,this._onShapeDone.bind(this))
},setBrush:function setBrush(a,b){this.viewCanvas.setBrush(a,b);
this.paintCanvas.setBrush(a,b);
this._redrawShapes()
},scale:function scale(a){this._setDimensions(this.width*a,this.height*a,a);
this._redrawShapes();
this.scalingFactor=a
},setPosition:function setPosition(b,a){this.container.style.top=b+"px";
this.container.style.left=a+"px"
},getDomElement:function getDomElement(){return this.container
},setOffset:function setOffset(a){jQuery(this.container).offset(a)
},addShapeAndDraw:function addShapeAndDraw(a){this.shapes.push(a);
this._drawShape(this.viewCanvas,a)
},removeShape:function removeShape(a){this.shapes=this.shapes.reject(function(b){return b.id===a
});
this.redraw()
},removeShapesUnderCursor:function removeShapesUnderCursor(){this._getShapesUnderCursor().each(function a(b){this.shapeDeletedCallback(b)
}.bind(this));
this.paintCanvas.clear()
},hide:function hide(){this.container.style.display="none"
},show:function show(){this.container.style.display="block"
},isVisible:function isVisible(){return this.container.style.display!=="none"
},redraw:function redraw(){this.viewCanvas.clear();
this._redrawShapes()
},moveShapes:function moveShapes(a,c){this.shapes.each(function b(d){d.move(a,c)
});
if(typeof this.currentAction!=="undefined"){this.currentAction.move(a,c)
}this.viewCanvas.clear();
this.paintCanvas.clear();
this._redrawShapes()
},resize:function resize(b,a){this.width=b;
this.height=a;
this._setDimensions(b*this.scalingFactor,a*this.scalingFactor,this.scalingFactor);
this._redrawShapes()
},updateColor:function updateColor(){var a=this._getColor();
this.currentAction.setColor(a)
},_onMouseDown:function _onMouseDown(a){if(a.inside){this.currentAction.mouseDown(this._translateMouse(a.pos))
}},_onMouseMove:function _onMouseMove(a){if(!a.inside){return
}if(a.mouseDown){this.currentAction.mouseMove(this._translateMouse(a.pos))
}else{this.paintCanvas.clear();
this._highlightShapesUnderCursor()
}},_onMouseUp:function _onMouseUp(a){this.currentAction.mouseUp(this._translateMouse(a.pos))
},_onShapeDone:function _onShapeDone(a){if(typeof this.shapeDrawnCallback==="function"){this.shapeDrawnCallback(a)
}this.paintCanvas.clear()
},_highlightShapesUnderCursor:function _highlightShapesUnderCursor(){this._getShapesUnderCursor().each(function a(b){this._drawShape(this.paintCanvas,b,3)
}.bind(this))
},_getShapesUnderCursor:function _getShapesUnderCursor(){if(!this.mouseState.parameters.inside){return[]
}return this.shapes.select(function a(b){return b.isUnderCursor(this._translateMouse(this.mouseState.parameters.pos))
}.bind(this))
},_redrawShapes:function _redrawShapes(){for(var a=0;
a<this.shapes.length;
a++){this._drawShape(this.viewCanvas,this.shapes[a])
}if(typeof this.currentAction!=="undefined"){this.currentAction.redraw()
}},_getColor:function _getColor(){return"#000000"
},_setDimensions:function _setDimensions(c,a,b){this._resizeDiv(this.container,c,a);
this.paintCanvas.resize(c,a);
this.paintCanvas.scale(b);
this.viewCanvas.resize(c,a);
this.viewCanvas.scale(b)
},_drawShape:function _drawShape(c,a,d){var b=this._getColor();
a.draw(c,b,d)
},_createCanvasContainer:function _createCanvasContainer(d,c,a){var b=document.createElement("div");
b.className="paint-canvas-container";
b.id=d;
b.style.width=c+"px";
b.style.height=a+"px";
return b
},_createCanvas:function _createCanvas(d,c,a){var b=document.createElement("canvas");
b.className="paint-canvas";
b.id=d;
return b
},_resizeDiv:function _resizeDiv(c,b,a){c.style.width=b+"px";
c.style.height=a+"px"
},_translateMouse:function _translateMouse(a){if(typeof a==="undefined"){return undefined
}return{left:a.left/this.scalingFactor,top:a.top/this.scalingFactor}
}});
ORYX.Plugins.Paint.PaintCanvas.MouseState=Clazz.extend({construct:function construct(a,b){this.element=a;
this.callbacks=b;
this.parameters={inside:undefined,mouseDown:false,pos:undefined};
document.documentElement.addEventListener("mousedown",this._onMouseDown.bind(this),false);
window.addEventListener("mousemove",this._onMouseMove.bind(this),true);
window.addEventListener("mouseup",this._onMouseUp.bind(this),true);
jQuery(a).mouseleave=this._onMouseLeave.bind(this)
},_onMouseDown:function _onMouseDown(a){if(this._isInside(a)){document.onselectstart=function(){return false
};
this.parameters.mouseDown=true
}else{this.parameters.mouseDown=false
}this._rememberPosition(a);
this._callback("onMouseDown")
},_onMouseMove:function _onMouseMove(a){this._rememberPosition(a);
this._callback("onMouseMove")
},_onMouseUp:function _onMouseUp(a){if(this.parameters.mouseDown){document.onselectstart=function(){return true
};
this.parameters.mouseDown=false
}this._rememberPosition(a);
this._callback("onMouseUp")
},_onMouseLeave:function _onMouseLeave(a){this.parameters.mouseDown=false
},_rememberPosition:function _rememberPosition(a){this.parameters.inside=this._isInside(a);
this.parameters.pos=this._isInside(a)?{left:a.layerX,top:a.layerY}:undefined
},_isInside:function _isInside(a){return(a.target===this.element)
},_callback:function _callback(a){if(typeof this.callbacks[a]==="function"){this.callbacks[a](this.parameters)
}}});
ORYX.Plugins.Paint.PaintCanvas.Tool=Clazz.extend({construct:function construct(b,c,a){this.done=a;
this.canvas=c;
this.color=b
},getColor:function getColor(){return this.color
},setColor:function setColor(a){this.color=a
}});
ORYX.Plugins.Paint.PaintCanvas.LineTool=ORYX.Plugins.Paint.PaintCanvas.Tool.extend({construct:function construct(b,c,a){arguments.callee.$.construct.apply(this,arguments);
this._reset()
},mouseDown:function mouseDown(a){this._addPoint(a.left,a.top);
this.prevX=a.left;
this.prevY=a.top
},mouseUp:function mouseUp(b){if(typeof this.prevX!=="undefined"&&typeof this.prevY!=="undefined"){var a=new ORYX.Plugins.Paint.PaintCanvas.Line(this.points);
this.done(a)
}this._reset()
},mouseMove:function mouseMove(a){this._addPoint(a.left,a.top);
if(typeof this.prevX!=="undefined"&&typeof this.prevY!=="undefined"){this._drawLineSegment(this.prevX,this.prevY,a.left,a.top)
}this.prevX=a.left;
this.prevY=a.top
},redraw:function redraw(){var a;
var c,b;
for(a=0;
a<this.points.length-1;
a++){c=this.points[a];
b=this.points[a+1];
this._drawLineSegment(c.x,c.y,b.x,b.y)
}},move:function move(a,c){this.points.each(function b(d){d.x+=a;
d.y+=c
});
this.prevX+=a;
this.prevY+=c
},_drawLineSegment:function _drawLineSegment(b,d,a,c){this.canvas.setStyle(1,this.getColor());
this.canvas.drawLine(b,d,a,c)
},_addPoint:function _addPoint(a,b){this.points.push({x:a,y:b})
},_reset:function _reset(){this.points=[];
this.prevX=undefined;
this.prevY=undefined
}});
ORYX.Plugins.Paint.PaintCanvas.TwoPointTool=ORYX.Plugins.Paint.PaintCanvas.Tool.extend({construct:function construct(b,c,a,d){arguments.callee.$.construct.call(this,b,c,a);
this.shapeClass=d;
this._reset()
},mouseDown:function mouseDown(a){this.start=a
},mouseUp:function mouseUp(c){var a;
var b=c||this.curEnd;
if(typeof this.start!=="undefined"&&typeof b!=="undefined"){a=new this.shapeClass(this.start,b);
this.done(a)
}this._reset()
},mouseMove:function mouseMove(a){if(typeof this.start==="undefined"){return
}this.curEnd=a;
this.canvas.clear();
this.draw(this.canvas,this.start,a)
},redraw:function redraw(){if(typeof this.curEnd!=="undefined"){this.draw(this.canvas,this.start,this.curEnd)
}},move:function move(a,c){var b=function b(d){if(typeof d!=="undefined"){d.left+=a;
d.top+=c
}};
b(this.start);
b(this.curEnd)
},_reset:function _reset(){this.start=undefined;
this.curEnd=undefined
}});
ORYX.Plugins.Paint.PaintCanvas.ArrowTool=ORYX.Plugins.Paint.PaintCanvas.TwoPointTool.extend({construct:function construct(b,c,a){arguments.callee.$.construct.call(this,b,c,a,ORYX.Plugins.Paint.PaintCanvas.Arrow)
},draw:function draw(b,c,a){b.setStyle(1,this.getColor());
b.drawArrow(c.left,c.top,a.left,a.top)
}});
ORYX.Plugins.Paint.PaintCanvas.BoxTool=ORYX.Plugins.Paint.PaintCanvas.TwoPointTool.extend({construct:function construct(b,c,a){arguments.callee.$.construct.call(this,b,c,a,ORYX.Plugins.Paint.PaintCanvas.Box)
},draw:function draw(b,c,a){b.setStyle(1,this.getColor());
b.strokeRect(c.left,c.top,a.left-c.left,a.top-c.top)
}});
ORYX.Plugins.Paint.PaintCanvas.EllipseTool=ORYX.Plugins.Paint.PaintCanvas.TwoPointTool.extend({construct:function construct(b,c,a){arguments.callee.$.construct.call(this,b,c,a,ORYX.Plugins.Paint.PaintCanvas.Ellipse)
},draw:function draw(b,c,a){b.setStyle(1,this.getColor());
b.drawEllipse(c.left,c.top,a.left,a.top)
}});
ORYX.Plugins.Paint.PaintCanvas.Shape=Clazz.extend({construct:function construct(a){this.id=a||ORYX.Editor.provideId()
}});
ORYX.Plugins.Paint.PaintCanvas.Line=ORYX.Plugins.Paint.PaintCanvas.Shape.extend({construct:function construct(a,b){arguments.callee.$.construct.call(this,b);
this.points=a.map(Object.clone)
},draw:function draw(c,b,d){var a=this._getLines(this._smooth(this.points));
c.setStyle(d||1,b);
a.each(function e(f){c.drawLine(f.a.x,f.a.y,f.b.x,f.b.y)
})
},move:function move(a,c){this.points.each(function b(d){d.x+=a;
d.y+=c
})
},isUnderCursor:function isUnderCursor(c){var a=this._getLines(this.points);
return a.any(function b(d){return ORYX.Core.Math.isPointInLine(c.left,c.top,d.a.x,d.a.y,d.b.x,d.b.y,10)
})
},pack:function pack(){return{id:this.id,type:"Line",points:this.points}
},unpack:function unpack(a){return new ORYX.Plugins.Paint.PaintCanvas.Line(a.points,a.id)
},_getLines:function _getLines(c){var a=[];
for(var b=1;
b<c.length;
b++){a.push({a:c[b-1],b:c[b]})
}return a
},_smooth:function _smooth(a){return this._mcMaster(this._fillPoints(a,5))
},_fillPoints:function _fillPoints(n,f){var d=[n[0]];
for(var e=1;
e<n.length;
e++){var l=n[e];
var o=n[e-1];
var m=l.x-o.x;
var j=l.y-o.y;
var h=Math.sqrt(m*m+j*j);
if(h>f){var g=Math.floor(h/f);
var c=m/g;
var b=j/g;
for(var a=0;
a<g;
a++){d.push({x:o.x+a*c,y:o.y+a*b})
}}d.push(l)
}return d
},_mcMaster:function _mcMaster(h){var c=[];
var b=10;
var g=Math.floor(b/2);
if(h.length<b){return h
}for(var e=h.length-1;
e>=0;
e--){if(e>=h.length-g||e<=g){c=[h[e]].concat(c)
}else{var f=0,d=0;
for(var a=-g;
a<-g+b;
a++){f+=h[e+a].x;
d+=h[e+a].y
}c=[{x:f/b,y:d/b}].concat(c)
}}return c
}});
ORYX.Plugins.Paint.PaintCanvas.TwoPointShape=ORYX.Plugins.Paint.PaintCanvas.Shape.extend({construct:function construct(c,a,b){arguments.callee.$.construct.call(this,b);
this.start=c;
this.end=a
},move:function move(a,c){var b=function b(d){d.left+=a;
d.top+=c
};
b(this.start);
b(this.end)
},abstractPack:function abstractPack(a){return{id:this.id,type:a,start:this.start,end:this.end}
},abstractUnpack:function abstractUnpack(b,a){return new b(a.start,a.end,a.id)
}});
ORYX.Plugins.Paint.PaintCanvas.Arrow=ORYX.Plugins.Paint.PaintCanvas.TwoPointShape.extend({construct:function construct(c,a,b){arguments.callee.$.construct.apply(this,arguments)
},draw:function draw(b,a,c){b.setStyle(c||1,a);
b.drawArrow(this.start.left,this.start.top,this.end.left,this.end.top)
},isUnderCursor:function isUnderCursor(a){return ORYX.Core.Math.isPointInLine(a.left,a.top,this.start.left,this.start.top,this.end.left,this.end.top,10)
},pack:function pack(){return this.abstractPack("Arrow")
},unpack:function unpack(a){return this.abstractUnpack(ORYX.Plugins.Paint.PaintCanvas.Arrow,a)
}});
ORYX.Plugins.Paint.PaintCanvas.Box=ORYX.Plugins.Paint.PaintCanvas.TwoPointShape.extend({construct:function construct(c,a,b){arguments.callee.$.construct.apply(this,arguments)
},draw:function draw(b,a,c){b.setStyle(c||1,a);
b.strokeRect(this.start.left,this.start.top,this.end.left-this.start.left,this.end.top-this.start.top)
},isUnderCursor:function isUnderCursor(e){var b=ORYX.Core.Math.isPointInLine(e.left,e.top,this.start.left,this.start.top,this.end.left,this.start.top,10);
var a=ORYX.Core.Math.isPointInLine(e.left,e.top,this.start.left,this.end.top,this.end.left,this.end.top,10);
var d=ORYX.Core.Math.isPointInLine(e.left,e.top,this.start.left,this.start.top,this.start.left,this.end.top,10);
var c=ORYX.Core.Math.isPointInLine(e.left,e.top,this.end.left,this.start.top,this.end.left,this.end.top,10);
return b||a||d||c
},pack:function pack(){return this.abstractPack("Box")
},unpack:function unpack(a){return this.abstractUnpack(ORYX.Plugins.Paint.PaintCanvas.Box,a)
}});
ORYX.Plugins.Paint.PaintCanvas.Ellipse=ORYX.Plugins.Paint.PaintCanvas.TwoPointShape.extend({construct:function construct(c,h,d){var a={left:Math.min(c.left,h.left),top:Math.min(c.top,h.top)};
var j={left:Math.max(c.left,h.left),top:Math.max(c.top,h.top)};
arguments.callee.$.construct.call(this,a,j,d);
var e=(j.left-a.left)/2;
var b=(j.top-a.top)/2;
var i=a.left+e;
var g=a.top+b;
this.isUnderCursor=function f(l){var k=false;
if(e>5&&b>5){k=ORYX.Core.Math.isPointInEllipse(l.left,l.top,i,g,e-5,b-5)
}return !k&&ORYX.Core.Math.isPointInEllipse(l.left,l.top,i,g,e+10,b+10)
}
},draw:function draw(b,a,c){b.setStyle(c||1,a);
b.drawEllipse(this.start.left,this.start.top,this.end.left,this.end.top)
},pack:function pack(){return this.abstractPack("Ellipse")
},unpack:function unpack(a){return this.abstractUnpack(ORYX.Plugins.Paint.PaintCanvas.Ellipse,a)
}});
ORYX.Plugins.Paint.PaintCanvas.ShapeExistenceCommand=ORYX.Core.AbstractCommand.extend({construct:function construct(a,b){arguments.callee.$.construct.call(this,b);
this.metadata.putOnStack=false;
this.shape=a
},getCommandData:function getCommandData(){return{shape:this.shape.pack()}
},abstractCreateFromCommandData:function abstractCreateFromCommandData(c,d,b){var a=ORYX.Plugins.Paint.PaintCanvas[b.shape.type].prototype.unpack(b.shape);
return new ORYX.Core.Commands[c](a,d)
},getAffectedShapes:function getAffectedShapes(){return[]
},createShape:function createShape(){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_PAINT_NEWSHAPE,shape:this.shape})
},deleteShape:function deleteShape(){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_PAINT_REMOVESHAPE,shapeId:this.shape.id})
}});
ORYX.Core.Commands["Paint.DrawCommand"]=ORYX.Plugins.Paint.PaintCanvas.ShapeExistenceCommand.extend({construct:function construct(a,b){arguments.callee.$.construct.apply(this,arguments)
},createFromCommandData:function createFromCommandData(b,a){return this.abstractCreateFromCommandData("Paint.DrawCommand",b,a)
},getCommandName:function getCommandName(){return"Paint.DrawCommand"
},getDisplayName:function getDisplayName(){return"Drew on paint layer"
},execute:function execute(){this.createShape()
},rollback:function rollback(){this.deleteShape()
}});
ORYX.Core.Commands["Paint.RemoveCommand"]=ORYX.Plugins.Paint.PaintCanvas.ShapeExistenceCommand.extend({construct:function construct(a,b){arguments.callee.$.construct.apply(this,arguments)
},createFromCommandData:function createFromCommandData(b,a){return this.abstractCreateFromCommandData("Paint.RemoveCommand",b,a)
},getCommandName:function getCommandName(){return"Paint.RemoveCommand"
},getDisplayName:function getDisplayName(){return"Erased something from paint layer"
},execute:function execute(){this.deleteShape()
},rollback:function rollback(){this.createShape()
}});
if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.DefDeleteManager=Clazz.extend({construct:function(a){this.facade=a
},handledefdeleted:function(a){}});
