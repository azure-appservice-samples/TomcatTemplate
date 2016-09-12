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