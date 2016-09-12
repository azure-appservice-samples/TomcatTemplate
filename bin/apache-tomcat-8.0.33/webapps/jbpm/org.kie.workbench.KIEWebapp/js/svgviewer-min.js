SVGViewer=Ext.extend(Ext.Window,{initComponent:function(){var a=Ext.id();
this.bodyCfg={id:"svgviewerid",layout:"anchor",autoCreate:true,closeAction:"close",title:ORYX.I18N.svgViewer,plain:true,modal:true,collapsible:false,resizeable:true,shadow:true,html:'<iframe id="svgViewFrame" name="svgViewFrame" frameborder="0" scrolling="auto" width="100%" height="400" src="'+ORYX.BASE_FILE_PATH+"localhistory/svgview.html?"+a+'"></iframe>',width:400,height:400,autoScroll:true,fixedcenter:true};
SVGViewer.superclass.initComponent.apply(this,arguments)
},onRender:function(){SVGViewer.superclass.onRender.apply(this,arguments);
this.body.on("load",this.onSVGLoad,this,{single:true})
},onSVGLoad:function(){},setSrc:function(a){this.body.on("load",this.onSVGLoad,this,{single:true});
this.body.dom.src=a
},initEvents:function(){SVGViewer.superclass.initEvents.apply(this,arguments);
if(this.resizer){this.resizer.preserveRatio=true
}}});