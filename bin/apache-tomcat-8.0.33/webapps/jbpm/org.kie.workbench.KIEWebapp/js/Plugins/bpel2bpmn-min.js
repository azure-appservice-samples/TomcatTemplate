if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPEL2BPMN=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.BPELSupport.transformBPELToBPMN,functionality:this.transform.bind(this),group:"Export",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/import.png",description:ORYX.I18N.BPELSupport.transformBPELToBPMN_desc,index:1,minShape:0,maxShape:0})
},transform:function(){this.openUploadDialog()
},openUploadDialog:function(){var c=new Ext.form.FormPanel({frame:false,defaultType:"textfield",waitMsgTarget:true,labelAlign:"left",buttonAlign:"right",fileUpload:true,enctype:"multipart/form-data",style:"font-size:12px;",items:[{fieldLabel:ORYX.I18N.BPELSupport.file,inputType:"file",style:"font-size:12px;",allowBlank:false}]});
var b=new Ext.Panel({style:"font-size:12px;",autoScroll:true});
var a;
a=new Ext.Window({autoCreate:true,title:ORYX.I18N.BPELSupport.uploadBPELFile,height:240,width:400,modal:true,collapsible:false,fixedcenter:true,shadow:true,style:"font-size:12px;",proxyDrag:true,resizable:true,items:[new Ext.form.Label({text:ORYX.I18N.BPELSupport.selectBPELFile,style:"font-size:12px;"}),c,b],buttons:[{text:ORYX.I18N.BPELSupport.submit,handler:function(){c.form.submit({clientValidation:false,url:ORYX.PATH+"/bpel2bpmn",waitMsg:ORYX.I18N.BPELSupport.transforming,success:function(i,e){var g=e.response.responseText.replace(/&lt;/g,"<").replace(/&gt;/g,">");
if(g){var k=g.evalJSON();
var h=k.content;
var d=k.successValidation;
var j=k.validationError;
if(d){a.hide()
}else{b.body.dom.innerHTML='<p style="background-color: transparent;">'+ORYX.I18N.BPELSupport.noComply+" <br /> <br />"+ORYX.I18N.BPELSupport.errorMessage+" "+j+"</p>"
}h='<?xml version="1.0" encoding="utf-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:b3mn="http://b3mn.org/2007/b3mn" xmlns:ext="http://b3mn.org/2007/ext" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:atom="http://b3mn.org/2007/atom+xhtml"><head profile="http://purl.org/NET/erdf/profile"><link rel="schema.dc" href="http://purl.org/dc/elements/1.1/" /><link rel="schema.dcTerms" href="http://purl.org/dc/terms/ " /><link rel="schema.b3mn" href="http://b3mn.org" /><link rel="schema.oryx" href="http://oryx-editor.org/" /><link rel="schema.raziel" href="http://raziel.org/" /><base href="http://localhost:8080/backend/poem/new" /></head><body>'+h+"</body></html>";
var l=new DOMParser();
this.facade.importERDF(l.parseFromString(h,"text/xml"))
}else{Ext.MessageBox.show({title:"Error",msg:ORYX.I18N.BPELSupport.errorImporting,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})
}}.bind(this),failure:function(e,d){a.hide();
Ext.MessageBox.show({title:"Error",msg:d.response.responseText.substring(d.response.responseText.indexOf("content:'")+9,d.response.responseText.indexOf("'}")),buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})
}.bind(this)})
}.bind(this)}]});
a.on("hide",function(){a.destroy(true);
delete a
});
a.show()
},});