Ext.ns("Extensive.grid");
Extensive.grid.ItemDeleter=Ext.extend(Ext.grid.RowSelectionModel,{width:30,sortable:false,dataIndex:0,menuDisabled:true,fixed:true,id:"deleter",dtype:"",setDType:function(a){if(a&&a.length>0){this.dtype=a
}},initEvents:function(){Extensive.grid.ItemDeleter.superclass.initEvents.call(this);
this.grid.on("cellclick",function(b,f,c,d){if(c==b.getColumnModel().getIndexById("deleter")){var a=b.getStore().getAt(f);
ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_DEF_DELETED,dtype:this.dtype,rcd:a});
b.getStore().remove(a);
b.getView().refresh()
}}.bind(this))
},renderer:function(b,c,a,d){return'<div class="extensive-remove" style="width: 15px; height: 16px;"></div>'
}});