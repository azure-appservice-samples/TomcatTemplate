if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.AddStencilSet={construct:function(a){this.facade=a;
this.facade.offer({name:"Add Stencil Set",functionality:this.addStencilSet.bind(this),group:"StencilSet",icon:ORYX.BASE_FILE_PATH+"images/add.png",description:"Add a stencil set.",index:1,minShape:0,maxShape:0})
},addStencilSet:function(){var a=Ext.Msg.prompt(ORYX.I18N.Oryx.title,"Enter relative url of the stencil set's JSON file:",(function(c,b){if(c=="ok"&&b){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE,text:"Loading Stencil Set"});
window.setTimeout(function(){this.facade.loadStencilSet(b);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE})
}.bind(this),100)
}}).bind(this))
}};
ORYX.Plugins.AddStencilSet=Clazz.extend(ORYX.Plugins.AddStencilSet);