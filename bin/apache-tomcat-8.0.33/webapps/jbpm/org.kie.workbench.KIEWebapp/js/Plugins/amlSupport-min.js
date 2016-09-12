if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.AMLSupport=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.AMLSupport.imp,functionality:this.importAML.bind(this),group:ORYX.I18N.AMLSupport.group,icon:ORYX.BASE_FILE_PATH+"images/aris_import_icon.png",description:ORYX.I18N.AMLSupport.impDesc,index:3,minShape:0,maxShape:0});
this.AMLServletURL="/amlsupport"
},importAML:function(){this._showUploadDialog(this.loadDiagrams.bind(this))
},loadDiagrams:function(d){if(!d.startsWith("<")){Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.AMLSupport.failed+d);
ORYX.Log.warn("Import AML failed: "+d);
return
}var c;
try{c=this.parseToDoc(d);
var a=$A(c.firstChild.childNodes).collect(function(e){return{title:this.getChildNodesByClassName(e.firstChild,"oryx-title")[0].textContent,data:e}
}.bind(this));
a.sort(function(f,e){return f.title>e.title
});
this._showPanel(a,function(e){if(e.length>1){var i=true;
var h=[];
e.each(function(m){var j="/backend/poem"+ORYX.CONFIG.ORYX_NEW_URL+"?stencilset=/stencilsets/epc/epc.json";
var l='<div class="processdata"><div class="-oryx-canvas" id="oryx-canvas123" style="display: none; width:1200px; height:600px;"><a href="/stencilsets/epc/epc.json" rel="oryx-stencilset"></a><span class="oryx-mode">writeable</span><span class="oryx-mode">fullscreen</span></div></div>';
var k="<svg/>";
var n={data:l,svg:k,title:m.name,summary:"",type:"http://b3mn.org/stencilset/epc#"};
i=this.sendRequest(j,n,function(q){var o=q.getResponseHeader("location");
var p=this.getNodesByClassName(m.data,"div","-oryx-canvas")[0].getAttribute("id");
h.push({name:m.name,data:m.data,url:o,id:p})
}.bind(this));
if(!i){throw $break
}}.bind(this));
if(!i){return
}var g=h.collect(function(j){return $A(this.getNodesByClassName(j.data,"span","oryx-refuri"))
}.bind(this)).flatten();
g.each(function(j){if(j.textContent.length==0){return
}var k=h.find(function(l){return j.textContent==l.id
});
j.textContent=k?k.url:""
});
h.each(function(l){var j=l.url;
var k="<svg/>";
var m=DataManager.serialize(l.data);
m="<div "+m.slice(m.search("class"));
var n={data:m,svg:k};
i=this.sendRequest(j,n);
if(!i){throw $break
}}.bind(this));
if(!i){return
}this._showResultPanel(h.collect(function(j){return{name:j.name,url:j.url}
}))
}else{var f=e[0].data;
$A(this.getNodesByClassName(f,"span","oryx-refuri")).each(function(j){j.textContent=""
});
this.facade.importERDF(f)
}}.bind(this))
}catch(b){Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.AMLSupport.failed2+b);
ORYX.Log.warn("Import AML failed: "+b)
}},sendRequest:function(a,c,d){var b=false;
new Ajax.Request(a,{method:"POST",asynchronous:false,parameters:c,onSuccess:function(e){b=true;
if(d){d(e)
}}.bind(this),onFailure:function(e){Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.AMLSupport.failed2);
ORYX.Log.warn("Import AML failed: "+e.responseText)
}.bind(this),on403:function(e){Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.AMLSupport.noRights);
ORYX.Log.warn("Import AML failed: "+e.responseText)
}.bind(this)});
return b
},getChildNodesByClassName:function(a,b){return $A(a.childNodes).findAll(function(c){return $A(c.attributes).any(function(d){return d.nodeName=="class"&&d.nodeValue==b
})
})
},getNodesByClassName:function(c,a,b){return $A(c.getElementsByTagName(a)).findAll(function(d){return $A(d.attributes).any(function(e){return e.nodeName=="class"&&e.nodeValue==b
})
})
},parseToDoc:function(a){a=a.startsWith("<?xml")?a:'<?xml version="1.0" encoding="utf-8"?>'+a+"";
var b=new DOMParser();
return b.parseFromString(a,"text/xml")
},_showUploadDialog:function(a){var c=new Ext.form.FormPanel({frame:true,bodyStyle:"padding:5px;",defaultType:"textfield",labelAlign:"left",buttonAlign:"right",fileUpload:true,enctype:"multipart/form-data",items:[{text:ORYX.I18N.AMLSupport.panelText,style:"font-size:12px;margin-bottom:10px;display:block;",xtype:"label"},{fieldLabel:ORYX.I18N.AMLSupport.file,inputType:"file",labelStyle:"width:50px;",itemCls:"ext_specific_window_overflow"}]});
var b=new Ext.Window({autoCreate:true,title:ORYX.I18N.AMLSupport.importBtn,height:"auto",width:420,modal:true,collapsible:false,fixedcenter:true,shadow:true,proxyDrag:true,resizable:false,items:[c],buttons:[{text:ORYX.I18N.AMLSupport.impText,handler:function(){var d=new Ext.LoadMask(Ext.getBody(),{msg:ORYX.I18N.AMLSupport.get});
d.show();
c.form.submit({url:ORYX.PATH+this.AMLServletURL,success:function(g,e){d.hide();
b.hide();
a(e.result)
}.bind(this),failure:function(g,e){d.hide();
b.hide();
Ext.MessageBox.show({title:"Error",msg:e.response.responseText.substring(e.response.responseText.indexOf("content:'")+9,e.response.responseText.indexOf("'}")),buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})
}})
}.bind(this)},{text:ORYX.I18N.AMLSupport.close,handler:function(){b.hide()
}.bind(this)}]});
b.on("hide",function(){b.destroy(true);
delete b
});
b.show()
},_showPanel:function(c,a){var e=[];
c.each(function(h){e.push([h.title,h.data])
});
var g=new Ext.grid.CheckboxSelectionModel({header:"",});
var d=new Ext.grid.GridPanel({store:new Ext.data.SimpleStore({data:e,fields:["title"]}),cm:new Ext.grid.ColumnModel([g,{header:ORYX.I18N.AMLSupport.title,width:260,sortable:true,dataIndex:"title"},]),sm:g,frame:true,width:300,height:300,iconCls:"icon-grid",});
var b=new Ext.Panel({items:[{xtype:"label",html:ORYX.I18N.AMLSupport.selectDiagrams,style:"margin:5px;display:block"},d],height:"auto",frame:true});
var f=new Ext.Window({width:327,height:"auto",title:ORYX.I18N.Oryx.title,floating:true,shim:true,modal:true,resizable:false,autoHeight:true,items:[b],buttons:[{text:ORYX.I18N.AMLSupport.impText,handler:function(){var j=new Ext.LoadMask(Ext.getBody(),{msg:ORYX.I18N.AMLSupport.impProgress});
j.show();
var i=d.getSelectionModel();
var h=i.selections.items.collect(function(k){return{name:k.json[0],data:k.json[1]}
});
f.close();
window.setTimeout(function(){a(h);
j.hide()
}.bind(this),100)
}.bind(this)},{text:ORYX.I18N.AMLSupport.cancel,handler:function(){f.close()
}.bind(this)}]});
f.show()
},_showResultPanel:function(b){var e=[];
b.each(function(f){e.push([f.name,'<a href="'+f.url+'" target="_blank">'+f.url+"</a>"])
});
var c=new Ext.grid.GridPanel({store:new Ext.data.SimpleStore({data:e,fields:["name","url"]}),cm:new Ext.grid.ColumnModel([{header:ORYX.I18N.AMLSupport.name,width:260,sortable:true,dataIndex:"name"},{header:"URL",width:300,sortable:true,dataIndex:"url"}]),frame:true,width:500,height:300,iconCls:"icon-grid"});
var a=new Ext.Panel({items:[{xtype:"label",text:ORYX.I18N.AMLSupport.allImported,style:"margin:5px;display:block"},c],height:"auto",frame:true});
var d=new Ext.Window({width:"auto",title:ORYX.I18N.Oryx.title,floating:true,shim:true,modal:true,resizable:false,autoHeight:true,items:[a],buttons:[{text:ORYX.I18N.AMLSupport.ok,handler:function(){d.close()
}.bind(this)}]});
d.show()
},throwErrorMessage:function(a){Ext.Msg.alert(ORYX.I18N.Oryx.title,a)
},});