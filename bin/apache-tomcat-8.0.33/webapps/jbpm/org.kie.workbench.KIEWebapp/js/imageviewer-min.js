ImageViewer=Ext.extend(Ext.Window,{initComponent:function(){var a=Ext.id();
ORYX.EDITOR.imagePreviewSVG=this.src;
this.bodyCfg={id:"imageviewerid",layout:"anchor",autoCreate:true,closeAction:"close",title:ORYX.I18N.imageViewer,plain:true,modal:true,collapsible:false,resizeable:true,shadow:true,html:'<iframe id="imageViewFrame" name="imageViewFrame" frameborder="0" scrolling="auto" width="100%" height="400" src="'+ORYX.PATH+"imageview/imageview.html?"+a+'"></iframe>',width:400,height:400,autoScroll:true,fixedcenter:true};
ImageViewer.superclass.initComponent.apply(this,arguments)
},onRender:function(){ImageViewer.superclass.onRender.apply(this,arguments);
this.body.on("load",this.onImageLoad,this,{single:true})
},onImageLoad:function(){},setSrc:function(a){this.body.on("load",this.onImageLoad,this,{single:true});
this.body.dom.src=a
},initEvents:function(){ImageViewer.superclass.initEvents.apply(this,arguments);
if(this.resizer){this.resizer.preserveRatio=true
}}});