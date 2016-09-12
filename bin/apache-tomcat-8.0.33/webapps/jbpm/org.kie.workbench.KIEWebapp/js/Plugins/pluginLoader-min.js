if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.PluginLoader=Clazz.extend({facade:undefined,mask:undefined,processURI:undefined,construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.PluginLoad.AddPluginButtonName,functionality:this.showManageDialog.bind(this),group:ORYX.I18N.SSExtensionLoader.group,icon:ORYX.BASE_FILE_PATH+"images/labs/script_add.png",description:ORYX.I18N.PluginLoad.AddPluginButtonDesc,index:8,minShape:0,maxShape:0})
},showManageDialog:function(){this.mask=new Ext.LoadMask(Ext.getBody(),{msg:ORYX.I18N.Oryx.pleaseWait});
this.mask.show();
var f=[];
var c=[];
var e=this.facade.getStencilSets().keys();
this.facade.getAvailablePlugins().each(function(h){if((!h.requires||!h.requires.namespaces||h.requires.namespaces.any(function(i){return e.indexOf(i)>=0
}))&&(!h.notUsesIn||!h.notUsesIn.namespaces||!h.notUsesIn.namespaces.any(function(i){return e.indexOf(i)>=0
}))){c.push(h)
}});
c.each(function(h){f.push([h.name,h.engaged===true])
});
if(f.length==0){return
}var b=new Ext.data.ArrayReader({},[{name:"name"},{name:"engaged"}]);
var g=new Ext.grid.CheckboxSelectionModel({listeners:{beforerowselect:function(k,h,i,j){this.mask=new Ext.LoadMask(Ext.getBody(),{msg:ORYX.I18N.Oryx.pleaseWait});
this.mask.show();
this.facade.activatePluginByName(j.data.name,function(l,m){this.mask.hide();
if(!!l){k.suspendEvents();
k.selectRow(h,true);
k.resumeEvents()
}else{Ext.Msg.show({title:ORYX.I18N.PluginLoad.loadErrorTitle,msg:ORYX.I18N.PluginLoad.loadErrorDesc+ORYX.I18N.PluginLoad[m],buttons:Ext.MessageBox.OK})
}}.bind(this));
return false
}.bind(this),rowdeselect:function(j,h,i){j.suspendEvents();
j.selectRow(h,true);
j.resumeEvents()
}}});
var d=new Ext.grid.GridPanel({store:new Ext.data.Store({reader:b,data:f}),cm:new Ext.grid.ColumnModel([{id:"name",width:390,sortable:true,dataIndex:"name"},g]),sm:g,width:450,height:250,frame:true,hideHeaders:true,iconCls:"icon-grid",listeners:{render:function(){var h=[];
this.grid.getStore().each(function(i){if(i.data.engaged){h.push(i)
}}.bind(this));
this.suspendEvents();
this.selectRecords(h);
this.resumeEvents()
}.bind(g)}});
var a=new Ext.Window({title:ORYX.I18N.PluginLoad.WindowTitle,width:"auto",height:"auto",modal:true});
a.add(d);
a.show();
this.mask.hide()
}});