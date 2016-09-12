if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.CPNToolsSupport=ORYX.Plugins.AbstractPlugin.extend({facade:undefined,stencilSetNamespace:"http://b3mn.org/stencilset/coloredpetrinet#",construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.cpntoolsSupport.exportDescription,functionality:this.exportCPN.bind(this),group:ORYX.I18N.cpntoolsSupport.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/cpn/cpn_export.png",description:ORYX.I18N.cpntoolsSupport.exportDescription,index:0,minShape:0,maxShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.cpntoolsSupport.importDescription,functionality:this.importCPN.bind(this),group:ORYX.I18N.cpntoolsSupport.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/import.png",icon:ORYX.BASE_FILE_PATH+"images/cpn/cpn_import.png",description:ORYX.I18N.cpntoolsSupport.importDescription,index:1,minShape:0,maxShape:0});
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_END,this.resetTokenPosition.bind(this))
},importCPN:function(){this._showImportDialog()
},exportCPN:function(){var a=this.facade.getSerializedJSON();
this._doExportToCPNTools(a)
},resetTokenPosition:function(){var a=this.facade.getSelection().findAll(function(b){return(b.getStencil().id()==="http://b3mn.org/stencilset/coloredpetrinet#Place")
});
if(a.length>0){a.each(function(g){var e=g.absoluteBounds();
var f=e.center();
var b=f.y-e.upperLeft().y;
var d=f.x-e.upperLeft().x;
var j=Math.min(b,d);
var k=j/2;
var n=g.getChildNodes(false).findAll(function(c){return(c.getStencil().id()==="http://b3mn.org/stencilset/coloredpetrinet#Token")
});
if(n.length>0){var h=0;
var m=0;
var l=0;
n.each(function(p){var r=p.absoluteBounds();
var o=r.center();
var i=f.x-o.x;
var c=f.y-o.y;
var q=i*i+c*c;
if(j*j<=q){l=Math.round(Math.sin((Math.PI/6)*h)*k);
m=Math.round(Math.cos((Math.PI/6)*h)*k);
p.bounds.centerMoveTo(g.bounds.width()/2+m,g.bounds.height()/2+l);
p.update();
h=h+1
}})
}})
}this.facade.getCanvas().update()
},_sendRequest:function(b,f,d,e,a){var c=false;
new Ajax.Request(b,{method:f,asynchronous:false,parameters:d,onSuccess:function(g){c=true;
if(e){e(g.responseText)
}}.bind(this),onFailure:function(g){if(a){a()
}else{this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.cpntoolsSupport.serverConnectionFailed);
ORYX.log.warn("Communication failed: "+g.responseText)
}}.bind(this)});
return c
},_doExportToCPNTools:function(a){this._sendRequest(ORYX.CONFIG.CPNTOOLSEXPORTER,"POST",{data:a},function(b){if(b.startsWith("error:")){this._showErrorMessageBox(ORYX.I18N.Oryx.title,b)
}else{this.openDownloadWindow(window.document.title+".cpn",b)
}}.bind(this),function(){this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.cpntoolsSupport.serverConnectionFailed)
}.bind(this))
},_showImportDialog:function(a){var c=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",items:[{text:ORYX.I18N.cpntoolsSupport.importTask,style:"font-size:12px;margin-bottom:10px;display:block;",anchor:"100%",xtype:"label"},{fieldLabel:ORYX.I18N.cpntoolsSupport.File,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;",itemCls:"ext_specific_window_overflow"},{xtype:"textarea",hideLabel:true,name:"msg",anchor:"100% -63"}]});
var b=new Ext.Window({autoCreate:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.cpntoolsSupport.cpn,height:350,width:500,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[c],buttons:[{text:ORYX.I18N.cpntoolsSupport.importLable,handler:function(){var d=new Ext.LoadMask(Ext.getBody(),{msg:ORYX.I18N.jPDLSupport.impProgress});
d.show();
window.setTimeout(function(){var e=c.items.items[2].getValue();
this._getAllPages(e,d)
}.bind(this),100);
b.hide()
}.bind(this)},{text:ORYX.I18N.cpntoolsSupport.close,handler:function(){b.hide()
}.bind(this)}]});
b.on("hide",function(){b.destroy(true);
delete b
});
b.show();
c.items.items[1].getEl().dom.addEventListener("change",function(d){var e=d.target.files[0].getAsText("UTF-8");
c.items.items[2].setValue(e)
},true)
},_getAllPages:function(c,e){var h=new DOMParser();
var g=h.parseFromString(c,"text/xml");
var b=g.getElementsByTagName("page");
if(b.length==0){e.hide();
this._showErrorMessageBox(ORYX.I18N.cpntoolsSupport.title,ORYX.I18N.cpntoolsSupport.wrongCPNFile);
return
}if(b.length==1){pageAttr=b[0].children[0];
a=pageAttr.attributes[0].nodeValue;
this._sendRequest(ORYX.CONFIG.CPNTOOLSIMPORTER,"POST",{pagesToImport:a,data:c},function(i){if(i.startsWith("error:")){this._showErrorMessageBox(ORYX.I18N.Oryx.title,i);
e.hide()
}else{this.facade.importJSON(i);
e.hide()
}}.bind(this),function(){e.hide();
this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.cpntoolsSupport.serverConnectionFailed)
}.bind(this));
return
}var d,a,f=[];
for(d=0;
d<b.length;
d++){pageAttr=b[d].children[0];
a=pageAttr.attributes[0].nodeValue;
f.push([a])
}e.hide();
this.showPageDialog(f,c)
},_showErrorMessageBox:function(b,a){Ext.MessageBox.show({title:b,msg:a,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})
},showPageDialog:function(f,c){var a=new Ext.data.ArrayReader({},[{name:"name"}]);
var g=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
var d=new Ext.grid.GridPanel({store:new Ext.data.Store({reader:a,data:f}),cm:new Ext.grid.ColumnModel([{id:"name",width:200,sortable:true,dataIndex:"name"},g]),sm:g,frame:true,hideHeaders:true,iconCls:"icon-grid",listeners:{render:function(){var h=[];
this.grid.getStore().each(function(i){if(i.data.engaged){h.push(i)
}}.bind(this));
this.suspendEvents();
this.selectRecords(h);
this.resumeEvents()
}.bind(g)}});
var b=new Ext.Panel({items:[{xtype:"label",text:ORYX.I18N.cpntoolsSupport.cpnToolsPage,style:"margin:10px;display:block"},d],frame:true});
var e=new Ext.Window({id:"oryx_new_page_selection",autoWidth:true,title:ORYX.I18N.cpntoolsSupport.title,floating:true,shim:true,modal:true,resizable:true,autoHeight:true,items:[b],buttons:[{text:ORYX.I18N.cpntoolsSupport.importLable,handler:function(){var h="";
g.getSelections().each(function(k){h=k.data.name
}.bind(this));
var j=h.length;
if(h.length==0){alert(ORYX.I18N.cpntoolsSupport.noPageSelection);
return
}var i=new Ext.LoadMask(Ext.getBody(),{msg:ORYX.I18N.cpntoolsSupport.importProgress});
i.show();
e.hide();
pageName=h;
this._sendRequest(ORYX.CONFIG.CPNTOOLSIMPORTER,"POST",{pagesToImport:pageName,data:c},function(k){if(k.startsWith("error:")){this._showErrorMessageBox(ORYX.I18N.Oryx.title,k);
i.hide()
}else{this.facade.importJSON(k);
i.hide()
}}.bind(this),function(){i.hide();
this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.cpntoolsSupport.serverConnectionFailed)
}.bind(this))
}.bind(this)},{text:ORYX.I18N.cpntoolsSupport.close,handler:function(){e.hide()
}.bind(this)}]});
e.show()
}});