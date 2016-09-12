if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.QueryEvaluator=ORYX.Plugins.AbstractPlugin.extend({facade:undefined,construct:function(a){this.facade=a;
this.active=false;
this.raisedEventIds=[];
this.facade.offer({name:ORYX.I18N.QueryEvaluator.name,functionality:this.showOverlay.bind(this),group:ORYX.I18N.QueryEvaluator.group,icon:ORYX.BASE_FILE_PATH+"images/xforms_export.png",description:ORYX.I18N.QueryEvaluator.desc,index:0,toggle:true,minShape:0,maxShape:0})
},showOverlay:function(c,f){if(!f){this.raisedEventIds=[];
this.active=!this.active;
return
}var b={command:"undef"};
var e=new Ext.Window({layout:"fit",width:500,height:350,closable:true,plain:true,modal:true,id:"optionsPopup",buttons:[{text:ORYX.I18N.BPELSupport.submit,handler:function(){b=a.getForm().getValues(false);
e.close();
this.issueQuery(b)
}.bind(this)},{text:ORYX.I18N.QueryEvaluator.abort,handler:function(){e.close()
}.bind(this)}]});
var g=new Ext.form.TextField({fieldLabel:ORYX.I18N.QueryEvaluator.modelId,name:"modelID",grow:true});
g.hide();
var d=function(n,k){if(!this.fieldStates){this.fieldStates=[]
}var m=false;
var j=false;
var h,l;
for(h=0;
h<this.fieldStates.length;
h++){l=this.fieldStates[h];
if(l.field===n){m=true;
l.checked=k
}j=j||l.checked
}if(!m){this.fieldStates.push({field:n,checked:k});
j=true
}if(j){g.show()
}else{g.hide()
}};
var a=new Ext.form.FormPanel({frame:true,title:ORYX.I18N.QueryEvaluator.queryOpts,bodyStyle:"padding:0 10px 0;",items:[{xtype:"fieldset",autoHeight:true,columns:1,allowBlank:false,defaultType:"radio",items:[{boxLabel:ORYX.I18N.QueryEvaluator.processQuery,fieldLabel:ORYX.I18N.QueryEvaluator.queryType,name:"command",inputValue:"processQuery",checked:true},{boxLabel:ORYX.I18N.QueryEvaluator.processComplianceQuery,labelSeparator:"",name:"command",inputValue:"processComplianceQuery"},{boxLabel:ORYX.I18N.QueryEvaluator.runQueryAgainstModel,labelSeparator:"",name:"command",inputValue:"runQueryAgainstModel",listeners:{check:d.bind(this)}},{boxLabel:ORYX.I18N.QueryEvaluator.runComplianceAgainstModel,labelSeparator:"",name:"command",inputValue:"runComplianceQueryAgainstModel",listeners:{check:d.bind(this)}},{xtype:"checkbox",fieldLabel:ORYX.I18N.QueryEvaluator.stop,name:"stopAtFirstMatch",checked:true,}]}]});
a.add(g);
e.add(a);
e.show();
c.toggle()
},issueQuery:function(b){try{var c=this.getRDFFromDOM();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE,text:ORYX.I18N.QueryEvaluator.processingQuery});
new Ajax.Request(ORYX.CONFIG.QUERYEVAL_URL,{method:"POST",asynchronous:true,parameters:{resource:location.href,command:b.command,modelID:b.modelID,stopAtFirstMatch:b.stopAtFirstMatch,data:c},onSuccess:function(d){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
var f=d.responseXML;
var i=f.firstChild;
var k=new Array();
var j,l;
var h=i.getElementsByTagName("ProcessGraph");
for(j=0;
j<h.length;
j++){l=h.item(j);
var e=l.getAttributeNode("modelID").nodeValue;
k.push({id:e,elements:this.processResultGraph(l),metadata:"",description:this.processMatchDescription(l)})
}try{this.processProcessList(k)
}catch(g){Ext.Msg.alert(ORYX.I18N.Oryx.title,g)
}}.bind(this),onFailure:function(d){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.QueryEvaluator.serverError+" ("+d.statusText+").\n"+d.responseText)
}.bind(this)})
}catch(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,a)
}},processResultGraph:function(b){var d=new Array();
for(var a=0;
a<b.childNodes.length;
a++){var c=b.childNodes.item(a);
if(!(c instanceof Text)){if(c.hasAttribute("id")){d.push({nodeType:c.nodeName,nodeId:c.getAttributeNode("id").nodeValue})
}else{if((c.hasAttribute("from"))&&c.hasAttribute("to")){d.push({edgeType:c.nodeName,from:c.getAttributeNode("from").nodeValue,to:c.getAttributeNode("to").nodeValue})
}}}}return d
},processMatchDescription:function(c){var b=new Array();
for(var a=0;
a<c.childNodes.length;
a++){var d=c.childNodes.item(a);
if((d.nodeName==="diagnosis")){b.push({diagnosis:d.textContent})
}else{if((d.nodeName==="match")){b.push({match:d.textContent})
}}}return b
},processProcessList:function(e){if(e.length==0){Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.QueryEvaluator.noMatch);
return
}this.isRendering=true;
e.each(this.getModelMetaData.bind(this));
var c=[];
e.each(function(f){c.push([f.id,f.metadata.thumbnailUri+"?"+Math.random(),unescape(f.metadata.title),f.metadata.type,f.metadata.author,f.elements,f.description])
}.bind(this));
var a=new Ext.Window({layout:"fit",width:500,height:300,closable:true,plain:true,modal:true,autoScroll:true,title:ORYX.I18N.QueryEvaluator.queryResults,id:"procResPopup",buttons:[{text:ORYX.I18N.Save.close,handler:function(){a.close()
}.bind(this)}]});
var d=new Ext.data.SimpleStore({fields:[{name:"id"},{name:"icon"},{name:"title"},{name:"type"},{name:"author"},{name:"elements"},{name:"description"},],data:c});
var b=new Ext.Panel({border:false,autoScroll:true,items:new this.dataGridPanel({store:d,listeners:{dblclick:this._onDblClick.bind(this)}})});
this.setPanelStyle();
a.add(b);
this.isRendering=false;
a.show()
},getModelMetaData:function(b){var a=b.id.replace(/\/rdf$/,"/meta");
new Ajax.Request(a,{method:"get",asynchronous:false,onSuccess:function(c){b.metadata=c.responseText.evalJSON()
}.bind(this),onFailure:function(){Ext.MessageBox.alert(ORYX.I18N.Oryx.title,ORYX.I18N.QueryEvaluator.errorLoading)
}.bind(this)})
},_onDblClick:function(a,k,c,l){a.selectRange(k,k);
var n=a.getRecord(c).data.id;
var d=a.getRecord(c).data.elements;
var o=a.getRecord(c).data.description;
var i=Ext.encode(d);
var h=Ext.encode(o);
var g=encodeURIComponent(i);
var m=encodeURIComponent(h);
var f=n.lastIndexOf("/");
var b=n.substr(0,f)+"/self?matches="+g+"&description="+m;
var j=window.open(b);
window.setTimeout(function(){if(!j||!j.opener||j.closed){Ext.MessageBox.alert(ORYX.I18N.Oryx.title,ORYX.I18N.Oryx.editorOpenTimeout).setIcon(Ext.MessageBox.QUESTION)
}},5000)
},dataGridPanel:Ext.extend(Ext.DataView,{multiSelect:true,cls:"iconview",itemSelector:"dd",overClass:"over",selectedClass:"selected",tpl:new Ext.XTemplate("<div>",'<dl class="repository_iconview">','<tpl for=".">',"<dd >",'<div class="image">','<img src="{icon}" title="{title}" /></div>','<div><span class="title" title="{[ values.title.length + (values.type.length*0.8) > 30 ? values.title : "" ]}" >{[ values.title.truncate(30 - (values.type.length*0.8)) ]}</span><span class="author" unselectable="on">({type})</span></div>','<div><span class="type">{author}</span></div>',"</dd>","</tpl>","</dl>","</div>")}),setPanelStyle:function(){var a=".repository_iconview dd{	width		: 200px;	height		: 105px;	padding		: 10px;	border		: 1px solid #EEEEEE;	font-family	: tahoma,arial,sans-serif;	font-size	: 9px;	display		: block;	margin		: 5px;	text-align	: left;	float		: left;}.repository_iconview dl {	width		: 100%;	max-width	: 1000px;}.repository_iconview dd.over{	background-color	: #fff5e1;}.repository_iconview dd.selected{	border-color: #FC8B03;}.repository_iconview dd img{	max-width	: 190px;	max-height	: 70px;}.repository_iconview dd .image{	width	: 200px;	height	: 80px;	padding-bottom	: 10px;	text-align		: center;	vertical-align	: middle;	display	:table-cell;}.repository_iconview dd .title{	font-weight	: bold;	font-size	: 11px;	color		: #555555;}.repository_iconview dd .author{	margin-left	: 5px;}";
Ext.util.CSS.createStyleSheet(a,"queryResultStyle")
},});