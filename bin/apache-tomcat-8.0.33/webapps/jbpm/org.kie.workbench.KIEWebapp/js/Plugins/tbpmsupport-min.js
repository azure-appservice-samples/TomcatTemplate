if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.TBPMSupport=ORYX.Plugins.AbstractPlugin.extend({facade:undefined,tbpmImportServletURL:ORYX.CONFIG.TBPMIMPORT,canvasId:"ext-gen56",TMP_FOLDER:ORYX.PATH+"/tmp/",construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.facade.offer({name:ORYX.I18N.TBPMSupport.imp.name,functionality:this.showImportDialog.bind(this),group:ORYX.I18N.TBPMSupport.imp.group,toolbarGroup:ORYX.I18N.TBPMSupport.toolbarGroup,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/import.png",icon:ORYX.BASE_FILE_PATH+"images/page_white_picture.png",description:ORYX.I18N.TBPMSupport.imp.desc,index:3,minShape:0,maxShape:0})
},showImportDialog:function(a){this.form=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",fileUpload:true,enctype:"multipart/form-data",items:[{text:ORYX.I18N.TBPMSupport.imp.selectFile,style:"font-size:12px;margin-bottom:10px;display:block;",anchor:"100%",xtype:"label"},{fieldLabel:ORYX.I18N.TBPMSupport.imp.file,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;width:95%",itemCls:"ext_specific_window_overflow"}]});
this.dialog=new Ext.Window({autoCreate:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.TBPMSupport.imp.name,height:150,width:500,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[this.form],buttons:[{text:ORYX.I18N.TBPMSupport.imp.btnImp,handler:this.uploadImage.bind(this)},{text:ORYX.I18N.TBPMSupport.imp.btnClose,handler:function(){this.dialog.close()
}.bind(this)}]});
this.dialog.on("hide",function(){this.dialog.destroy(true);
delete this.dialog
}.bind(this));
this.dialog.show()
},uploadImage:function(a,d){var c=this.form.items.items[1].getValue().replace("png","jpg");
var b=new Ext.LoadMask(Ext.getBody(),{msg:ORYX.I18N.TBPMSupport.imp.progress});
b.show();
this.form.form.submit({url:this.tbpmImportServletURL,clientValidation:true,waitMsg:"Saving Data...",method:"POST",success:function(e,f){obj=Ext.util.JSON.decode(f.response.responseText);
alert(object);
this.dialog.hide();
this.showConfirmDialog(c);
b.hide()
}.bind(this),failure:function(e,f){this.dialog.hide();
this.showConfirmDialog(c,f.response.responseText);
b.hide()
}.bind(this)})
},showConfirmDialog:function(b,a){var c=new Ext.Window({autoCreate:true,layout:"fit",width:600,height:500,bodyStyle:"padding:5px;",autoScroll:true,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,title:ORYX.I18N.TBPMSupport.imp.confirm,html:'<div style="width:100%;"><img src="'+this.TMP_FOLDER+b+'" style="width:550px;"></img></div>',buttons:[{text:ORYX.I18N.TBPMSupport.imp.btnImp,handler:function(){c.close();
this.processImport(b,a)
}.bind(this)},{text:ORYX.I18N.TBPMSupport.imp.btnClose,handler:function(){c.close()
}.bind(this)}]});
c.show()
},processImport:function(b,a){this.addImageLayer(b);
this.importShapes(a);
this.facade.getCanvas().update()
},addImageLayer:function(a){$(this.canvasId).style.background="url("+this.TMP_FOLDER+a+") no-repeat scroll center center"
},importShapes:function(a){this.facade.importJSON(a,true)
}});