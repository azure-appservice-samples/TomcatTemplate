if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.SSExtensionLoader={construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.SSExtensionLoader.add,functionality:this.addSSExtension.bind(this),group:ORYX.I18N.SSExtensionLoader.group,icon:ORYX.BASE_FILE_PATH+"images/add.png",description:ORYX.I18N.SSExtensionLoader.addDesc,index:1,minShape:0,maxShape:0})
},addSSExtension:function(facade){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE,text:ORYX.I18N.SSExtensionLoader.loading});
var url=ORYX.BASE_FILE_PATH+"stencilsets/extensions/extensions.json";
new Ajax.Request(url,{method:"GET",asynchronous:false,onSuccess:(function(transport){try{eval("var jsonObject = "+transport.responseText);
var stencilsets=this.facade.getStencilSets();
var validExtensions=jsonObject.extensions.findAll(function(extension){var stencilset=stencilsets[extension["extends"]];
if(stencilset){return true
}else{return false
}});
var loadedExtensions=validExtensions.findAll(function(extension){return stencilsets.values().any(function(ss){if(ss.extensions()[extension.namespace]){return true
}else{return false
}})
});
if(validExtensions.size()==0){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.SSExtensionLoader.noExt,title:""})
}else{this._showPanel(validExtensions,loadedExtensions,this._loadExtensions.bind(this))
}}catch(e){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.SSExtensionLoader.failed1,title:""})
}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE})
}).bind(this),onFailure:(function(transport){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.SSExtensionLoader.failed2,title:""});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE})
}).bind(this)})
},_loadExtensions:function(b){var c=this.facade.getStencilSets();
var d=false;
c.values().each(function(e){var f=e.extensions().values().select(function(g){return b[g.namespace]==undefined
});
f.each(function(g){e.removeExtension(g.namespace);
d=true
})
});
b.each(function(f){var e=c[f["extends"]];
if(e){e.addExtension(ORYX.CONFIG.SS_EXTENSIONS_FOLDER+f.definition);
d=true
}}.bind(this));
if(d){c.values().each(function(e){this.facade.getRules().initializeRules(e)
}.bind(this));
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED,lazyLoaded:true});
var a=this.facade.getSelection();
this.facade.setSelection();
this.facade.setSelection(a)
}},_showPanel:function(h,i,c){var e=[];
h.each(function(j){e.push([j.title,j.definition,j["extends"]])
});
var d=new Ext.grid.CheckboxSelectionModel();
var a=new Ext.grid.GridPanel({deferRowRender:false,id:"oryx_new_stencilset_extention_grid",store:new Ext.data.SimpleStore({fields:["title","definition","extends"]}),cm:new Ext.grid.ColumnModel([d,{header:ORYX.I18N.SSExtensionLoader.panelTitle,width:200,sortable:true,dataIndex:"title"}]),sm:d,frame:true,width:200,height:200,iconCls:"icon-grid",listeners:{render:function(){this.getStore().loadData(e);
g.defer(1)
}}});
function g(){var j=new Array();
a.store.each(function(k){if(i.any(function(l){return l.definition==k.get("definition")
})){j.push(k)
}});
d.selectRecords(j)
}var b=new Ext.Panel({items:[{xtype:"label",text:ORYX.I18N.SSExtensionLoader.panelText,style:"margin:10px;display:block"},a],frame:true,buttons:[{text:ORYX.I18N.SSExtensionLoader.labelImport,handler:function(){var k=Ext.getCmp("oryx_new_stencilset_extention_grid").getSelectionModel();
var j=k.selections.items.collect(function(l){return l.data
});
Ext.getCmp("oryx_new_stencilset_extention_window").close();
c(j)
}.bind(this)},{text:ORYX.I18N.SSExtensionLoader.labelCancel,handler:function(){Ext.getCmp("oryx_new_stencilset_extention_window").close()
}.bind(this)}]});
var f=new Ext.Window({id:"oryx_new_stencilset_extention_window",width:227,title:ORYX.I18N.Oryx.title,floating:true,shim:true,modal:true,resizable:false,autoHeight:true,items:[b]});
f.show()
}};
ORYX.Plugins.SSExtensionLoader=Clazz.extend(ORYX.Plugins.SSExtensionLoader);