(function(){var a=Backbone.Form,b=a.editors;
b.List=b.Base.extend({events:{'click [data-action="add"]':function(c){c.preventDefault(),this.addItem()
}},initialize:function(c){b.Base.prototype.initialize.call(this,c);
var d=this.schema;
if(!d){throw"Missing required option 'schema'"
}this.schema=_.extend({listTemplate:"list"},d),this.Editor=function(){var e=d.itemType;
return e?b.List[e]?b.List[e]:b[e]:b.Text
}(),this.items=[]
},render:function(){var c=this,e=this.value||[],d=$(a.templates[this.schema.listTemplate]({items:'<b class="bbf-tmp"></b>'}));
return this.$list=d.find(".bbf-tmp").parent().empty(),e.length?_.each(e,function(f){c.addItem(f)
}):this.Editor.isAsync||this.addItem(),this.setElement(d),this.$el.attr("id",this.id),this.$el.attr("name",this.key),this.hasFocus&&this.trigger("blur",this),this
},addItem:function(f,g){var c=this,e=(new b.List.Item({list:this,schema:this.schema,value:f,Editor:this.Editor,key:this.key})).render(),d=function(){c.items.push(e),c.$list.append(e.el),e.editor.on("all",function(h){if(h=="change"){return
}args=_.toArray(arguments),args[0]="item:"+h,args.splice(1,0,c),b.List.prototype.trigger.apply(this,args)
},c),e.editor.on("change",function(){e.addEventTriggered||(e.addEventTriggered=!0,this.trigger("add",this,e.editor)),this.trigger("item:change",this,e.editor),this.trigger("change",this)
},c),e.editor.on("focus",function(){if(this.hasFocus){return
}this.trigger("focus",this)
},c),e.editor.on("blur",function(){if(!this.hasFocus){return
}var h=this;
setTimeout(function(){if(_.find(h.items,function(i){return i.editor.hasFocus
})){return
}h.trigger("blur",h)
},0)
},c);
if(g||f){e.addEventTriggered=!0
}g&&(c.trigger("add",c,e.editor),c.trigger("change",c))
};
return this.Editor.isAsync?e.editor.on("readyToAdd",d,this):d(),e
},removeItem:function(e){var d=this.schema.confirmDelete;
if(d&&!confirm(d)){return
}var c=_.indexOf(this.items,e);
this.items[c].remove(),this.items.splice(c,1),e.addEventTriggered&&(this.trigger("remove",this,e.editor),this.trigger("change",this)),!this.items.length&&!this.Editor.isAsync&&this.addItem()
},getValue:function(){var c=_.map(this.items,function(d){return d.getValue()
});
return _.without(c,undefined,"")
},setValue:function(c){this.value=c,this.render()
},focus:function(){if(this.hasFocus){return
}this.items[0]&&this.items[0].editor.focus()
},blur:function(){if(!this.hasFocus){return
}focusedItem=_.find(this.items,function(c){return c.editor.hasFocus
}),focusedItem&&focusedItem.editor.blur()
},remove:function(){_.invoke(this.items,"remove"),b.Base.prototype.remove.call(this)
},validate:function(){if(!this.validators){return null
}var e=_.map(this.items,function(f){return f.validate()
}),d=_.compact(e).length?!0:!1;
if(!d){return null
}var c={type:"list",message:"Some of the items in the list failed validation",errors:e};
return c
}}),b.List.Item=Backbone.View.extend({events:{'click [data-action="remove"]':function(c){c.preventDefault(),this.list.removeItem(this)
},"keydown input[type=text]":function(c){if(c.keyCode!=13){return
}c.preventDefault(),this.list.addItem(),this.list.$list.find("> li:last input").focus()
}},initialize:function(c){this.list=c.list,this.schema=c.schema||this.list.schema,this.value=c.value,this.Editor=c.Editor||b.Text,this.key=c.key
},render:function(){this.editor=(new this.Editor({key:this.key,schema:this.schema,value:this.value,list:this.list,item:this})).render();
var c=$(a.templates.listItem({editor:'<b class="bbf-tmp"></b>'}));
return c.find(".bbf-tmp").replaceWith(this.editor.el),this.setElement(c),this
},getValue:function(){return this.editor.getValue()
},setValue:function(c){this.editor.setValue(c)
},focus:function(){this.editor.focus()
},blur:function(){this.editor.blur()
},remove:function(){this.editor.remove(),Backbone.View.prototype.remove.call(this)
},validate:function(){var f=this.getValue(),g=this.list.form?this.list.form.getValue():{},d=this.schema.validators,c=a.helpers.getValidator;
if(!d){return null
}var e=null;
return _.every(d,function(h){return e=c(h)(f,g),continueLoop=e?!1:!0
}),e?this.setError(e):this.clearError(),e?e:null
},setError:function(c){this.$el.addClass(a.classNames.error),this.$el.attr("title",c.message)
},clearError:function(){this.$el.removeClass(a.classNames.error),this.$el.attr("title",null)
}}),b.List.Modal=b.List.Object=b.List.NestedModel=b.Base.extend({events:{click:"openEditor"},initialize:function(c){b.Base.prototype.initialize.call(this,c);
var d=this.schema;
if(!b.List.Modal.ModalAdapter){throw"A ModalAdapter is required"
}if(d.itemType=="Object"){if(!d.subSchema){throw'Missing required option "schema.subSchema"'
}this.nestedSchema=d.subSchema
}if(d.itemType=="NestedModel"){if(!d.model){throw'Missing required option "schema.model"'
}this.nestedSchema=d.model.prototype.schema,_.isFunction(this.nestedSchema)&&(this.nestedSchema=this.nestedSchema())
}},render:function(){var c=this;
return _.isEmpty(this.value)?this.openEditor():(this.renderSummary(),setTimeout(function(){c.trigger("readyToAdd")
},0)),this.hasFocus&&this.trigger("blur",this),this
},renderSummary:function(){var c=a.templates["list.Modal"];
this.$el.html(c({summary:this.getStringValue()}))
},itemToString:function(c){c=c||{};
var d=[];
return _.each(this.nestedSchema,function(f,e){var h=f.title?f.title:a.helpers.keyToTitle(e),g=c[e];
if(_.isUndefined(g)||_.isNull(g)){g=""
}d.push(h+": "+g)
}),d.join("<br />")
},getStringValue:function(){var c=this.schema,d=this.getValue();
return _.isEmpty(d)?"[Empty]":c.itemToString?c.itemToString(d):c.itemType=="NestedModel"?(new c.model(d)).toString():this.itemToString(d)
},openEditor:function(){var c=this,e=new a({schema:this.nestedSchema,data:this.value}),d=this.modal=(new Backbone.BootstrapModal({content:e,animate:!0})).open();
this.trigger("open",this),this.trigger("focus",this),d.on("cancel",function(){this.modal=null,this.trigger("close",this),this.trigger("blur",this)
},this),d.on("ok",_.bind(this.onModalSubmitted,this,e,d))
},onModalSubmitted:function(f,e){var c=!this.value,d=f.validate();
if(d){return e.preventClose()
}this.modal=null,this.value=f.getValue(),this.renderSummary(),c&&this.trigger("readyToAdd"),this.trigger("change",this),this.trigger("close",this),this.trigger("blur",this)
},getValue:function(){return this.value
},setValue:function(c){this.value=c
},focus:function(){if(this.hasFocus){return
}this.openEditor()
},blur:function(){if(!this.hasFocus){return
}this.modal&&(this.modal.trigger("cancel"),this.modal.close())
}},{ModalAdapter:Backbone.BootstrapModal,isAsync:!0})
})();