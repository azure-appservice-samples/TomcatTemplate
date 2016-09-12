(function(a){if(typeof exports!="undefined"&&typeof require!="undefined"){var d=a.jQuery||a.Zepto||a.ender||require("jquery"),c=a._||require("underscore"),e=a.Backbone||require("backbone")
}else{var d=a.jQuery,c=a._,e=a.Backbone
}var b=function(){return e.View.extend({hasFocus:!1,initialize:function(g){if(!b.templates.form){throw new Error("Templates not loaded")
}this.schema=function(){if(g.schema){return g.schema
}var h=g.model;
if(!h){throw new Error("Could not find schema")
}return c.isFunction(h.schema)?h.schema():h.schema
}(),g=c.extend({template:"form",fieldsetTemplate:"fieldset",fieldTemplate:"field"},g);
if(!g.fieldsets){var f=g.fields||c.keys(this.schema);
g.fieldsets=[{fields:f}]
}this.options=g,this.model=g.model,this.data=g.data,this.fields={}
},render:function(){var h=this,i=this.options,j=b.templates[i.template],g=d(j({fieldsets:'<b class="bbf-tmp"></b>'})),f=d(".bbf-tmp",g);
return c.each(i.fieldsets,function(k){f.append(h.renderFieldset(k))
}),f.children().unwrap(),this.setElement(g),this.hasFocus&&this.trigger("blur",this),this
},renderFieldset:function(f){var g=this,i=b.templates[this.options.fieldsetTemplate],j=this.schema,k=b.helpers.getNested;
c.isArray(f)&&(f={fields:f});
var l=d(i(c.extend({},f,{legend:'<b class="bbf-tmp-legend"></b>',fields:'<b class="bbf-tmp-fields"></b>'})));
f.legend?l.find(".bbf-tmp-legend").replaceWith(f.legend):l.find(".bbf-tmp-legend").parent().remove();
var h=d(".bbf-tmp-fields",l);
return c.each(f.fields,function(m){var n=function(){if(j[m]){return j[m]
}var q=m.replace(/\./g,".subSchema.");
return k(j,q)
}();
if(!n){throw"Field '"+m+"' not found in schema"
}var p=g.fields[m]=g.createField(m,n),o=p.render().el;
p.editor.on("all",function(q){args=c.toArray(arguments),args[0]=m+":"+q,args.splice(1,0,this),this.trigger.apply(this,args)
},g),p.editor.on("change",function(){this.trigger("change",g)
},g),p.editor.on("focus",function(){if(this.hasFocus){return
}this.trigger("focus",this)
},g),p.editor.on("blur",function(){if(!this.hasFocus){return
}var q=this;
setTimeout(function(){if(c.find(q.fields,function(r){return r.editor.hasFocus
})){return
}q.trigger("blur",q)
},0)
},g),n.type!="Hidden"&&h.append(o)
}),h=h.children().unwrap(),l
},createField:function(g,h){h.template=h.template||this.options.fieldTemplate;
var f={form:this,key:g,schema:h,idPrefix:this.options.idPrefix,template:this.options.fieldTemplate};
return this.model?f.model=this.model:this.data?f.value=this.data[g]:f.value=null,new b.Field(f)
},validate:function(){var h=this,f=this.fields,i=this.model,k={};
c.each(f,function(m){var l=m.validate();
l&&(k[m.key]=l)
});
if(i&&i.validate){var g=i.validate(this.getValue());
if(g){var j=c.isObject(g)&&!c.isArray(g);
j||(k._others=k._others||[],k._others.push(g)),j&&c.each(g,function(n,l){if(h.fields[l]&&!k[l]){h.fields[l].setError(n)
}else{k._others=k._others||[];
var m={};
m[l]=n,k._others.push(m)
}})
}}return c.isEmpty(k)?null:k
},commit:function(){var g=this.validate();
if(g){return g
}var f;
this.model.set(this.getValue(),{error:function(h,i){f=i
}});
if(f){return f
}},getValue:function(g){if(g){return this.fields[g].getValue()
}var f={};
return c.each(this.fields,function(h){f[h.key]=h.getValue()
}),f
},setValue:function(g){for(var f in g){this.fields[f].setValue(g[f])
}},focus:function(){if(this.hasFocus){return
}var f=this.options.fieldsets[0];
if(f){var g;
c.isArray(f)?g=f[0]:g=f.fields[0],g&&this.fields[g].editor.focus()
}},blur:function(){if(!this.hasFocus){return
}focusedField=c.find(this.fields,function(f){return f.editor.hasFocus
}),focusedField&&focusedField.editor.blur()
},remove:function(){var f=this.fields;
for(var g in f){f[g].remove()
}e.View.prototype.remove.call(this)
},trigger:function(f){return f=="focus"?this.hasFocus=!0:f=="blur"&&(this.hasFocus=!1),e.View.prototype.trigger.apply(this,arguments)
}})
}();
b.helpers=function(){var f={};
return f.getNested=function(l,k){var h=k.split("."),g=l;
for(var j=0,m=h.length;
j<m;
j++){g=g[h[j]]
}return g
},f.keyToTitle=function(g){return g=g.replace(/([A-Z])/g," $1"),g=g.replace(/^./,function(h){return h.toUpperCase()
}),g
},f.compileTemplate=function(i){var g=c.templateSettings.interpolate;
c.templateSettings.interpolate=/\{\{(.+?)\}\}/g;
var h=c.template(i);
return c.templateSettings.interpolate=g,h
},f.createTemplate=function(i,g){var h=f.compileTemplate(i);
return g?h(g):h
},f.setTemplateCompiler=function(g){f.compileTemplate=g
},f.setTemplates=function(g,i){var h=f.createTemplate;
b.templates=b.templates||{},b.classNames=b.classNames||{},c.each(g,function(l,k,j){c.isString(l)&&(l=h(l)),b.templates[k]=l
}),c.extend(b.classNames,i)
},f.createEditor=function(g,i){var h;
return c.isString(g)?h=b.editors[g]:h=g,new h(i)
},f.triggerCancellableEvent=function(i,l,g,m){if(!i._callbacks||!i._callbacks[l]){return m()
}var k=i._callbacks[l].next;
if(!k){return m()
}var j=k.callback,h=k.context||this;
g.push(m),j.apply(h,g)
},f.getValidator=function(i){var g=b.validators;
if(c.isRegExp(i)){return g.regexp({regexp:i})
}if(c.isString(i)){if(!g[i]){throw new Error('Validator "'+i+'" not found')
}return g[i]()
}if(c.isFunction(i)){return i
}if(c.isObject(i)&&i.type){var h=i;
return g[h.type](h)
}throw new Error("Invalid validator: "+i)
},f
}(),b.validators=function(){var f={};
return f.errMessages={required:"Required",regexp:"Invalid",email:"Invalid email address",url:"Invalid URL",match:'Must match field "{{field}}"'},f.required=function(g){return g=c.extend({type:"required",message:this.errMessages.required},g),function(i){g.value=i;
var h={type:g.type,message:b.helpers.createTemplate(g.message,g)};
if(i===null||i===undefined||i===""){return h
}}
},f.regexp=function(g){if(!g.regexp){throw new Error('Missing required "regexp" option for "regexp" validator')
}return g=c.extend({type:"regexp",message:this.errMessages.regexp},g),function(i){g.value=i;
var h={type:g.type,message:b.helpers.createTemplate(g.message,g)};
if(i===null||i===undefined||i===""){return
}if(!g.regexp.test(i)){return h
}}
},f.email=function(g){return g=c.extend({type:"email",message:this.errMessages.email,regexp:/^[\w\-]{1,}([\w\-\+.]{1,1}[\w\-]{1,}){0,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/},g),f.regexp(g)
},f.url=function(g){return g=c.extend({type:"url",message:this.errMessages.url,regexp:/^(http|https):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i},g),f.regexp(g)
},f.match=function(g){if(!g.field){throw new Error('Missing required "field" options for "match" validator')
}return g=c.extend({type:"match",message:this.errMessages.match},g),function(j,h){g.value=j;
var i={type:g.type,message:b.helpers.createTemplate(g.message,g)};
if(j===null||j===undefined||j===""){return
}if(j!=h[g.field]){return i
}}
},f
}(),b.Field=function(){var g=b.helpers,f=b.templates;
return e.View.extend({initialize:function(h){h=h||{},this.form=h.form,this.key=h.key,this.value=h.value,this.model=h.model,c.isString(h.schema)&&(h.schema={type:h.schema}),this.schema=c.extend({type:"Text",title:g.keyToTitle(this.key),template:"field"},h.schema)
},render:function(){var l=this.schema,i=b.templates,h={form:this.form,key:this.key,schema:l,idPrefix:this.options.idPrefix,id:this.getId()};
this.model?h.model=this.model:h.value=this.value;
var k=this.editor=g.createEditor(l.type,h),j=d(i[l.template]({key:this.key,title:l.title,id:k.id,type:l.type,editor:'<b class="bbf-tmp-editor"></b>',help:'<b class="bbf-tmp-help"></b>'}));
return j.find(".bbf-tmp-editor").replaceWith(k.render().el),this.$help=d(".bbf-tmp-help",j).parent(),this.$help.empty(),this.schema.help&&this.$help.html(this.schema.help),this.schema.fieldClass&&j.addClass(this.schema.fieldClass),this.schema.fieldAttrs&&j.attr(this.schema.fieldAttrs),this.setElement(j),this
},getId:function(){var h=this.options.idPrefix,i=this.key;
return i=i.replace(/\./g,"_"),c.isString(h)||c.isNumber(h)?h+i:c.isNull(h)?i:this.model?this.model.cid+"_"+i:i
},validate:function(){var h=this.editor.validate();
return h?this.setError(h.message):this.clearError(),h
},setError:function(i){if(this.editor.hasNestedForm){return
}var h=b.classNames.error;
this.$el.addClass(h),this.$help&&this.$help.html(i)
},clearError:function(){var i=b.classNames.error;
this.$el.removeClass(i);
if(this.$help){this.$help.empty();
var h=this.schema.help;
h&&this.$help.html(h)
}},commit:function(){return this.editor.commit()
},getValue:function(){return this.editor.getValue()
},setValue:function(h){this.editor.setValue(h)
},focus:function(){this.editor.focus()
},blur:function(){this.editor.blur()
},remove:function(){this.editor.remove(),e.View.prototype.remove.call(this)
}})
}(),b.editors=function(){var g=b.helpers,f={};
return f.Base=e.View.extend({defaultValue:null,hasFocus:!1,initialize:function(h){var h=h||{};
if(h.model){if(!h.key){throw"Missing option: 'key'"
}this.model=h.model,this.value=this.model.get(h.key)
}else{h.value&&(this.value=h.value)
}this.value===undefined&&(this.value=this.defaultValue),this.key=h.key,this.form=h.form,this.schema=h.schema||{},this.validators=h.validators||this.schema.validators,this.$el.attr("name",this.getName()),this.schema.editorClass&&this.$el.addClass(this.schema.editorClass),this.schema.editorAttrs&&this.$el.attr(this.schema.editorAttrs)
},getValue:function(){throw"Not implemented. Extend and override this method."
},setValue:function(){throw"Not implemented. Extend and override this method."
},focus:function(){throw"Not implemented. Extend and override this method."
},blur:function(){throw"Not implemented. Extend and override this method."
},getName:function(){var h=this.key||"";
return h.replace(/\./g,"_")
},commit:function(){var h=this.validate();
if(h){return h
}this.model.set(this.key,this.getValue(),{error:function(i,j){h=j
}});
if(h){return h
}},validate:function(){var k=this.$el,j=null,l=this.getValue(),m=this.form?this.form.getValue():{},i=this.validators,h=b.helpers.getValidator;
return i&&c.every(i,function(n){return j=h(n)(l,m),continueLoop=j?!1:!0
}),j
},trigger:function(h){return h=="focus"?this.hasFocus=!0:h=="blur"&&(this.hasFocus=!1),e.View.prototype.trigger.apply(this,arguments)
}}),f.Text=f.Base.extend({tagName:"input",defaultValue:"",previousValue:"",events:{keyup:"determineChange",keypress:function(i){var h=this;
setTimeout(function(){h.determineChange()
},0)
},select:function(h){this.trigger("select",this)
},focus:function(h){this.trigger("focus",this)
},blur:function(h){this.trigger("blur",this)
}},initialize:function(h){f.Base.prototype.initialize.call(this,h);
var j=this.schema,i="text";
j&&j.editorAttrs&&j.editorAttrs.type&&(i=j.editorAttrs.type),j&&j.dataType&&(i=j.dataType),this.$el.attr("type",i)
},render:function(){return this.setValue(this.value),this
},determineChange:function(i){var h=this.$el.val(),j=h!=this.previousValue;
j&&(this.previousValue=h,this.trigger("change",this))
},getValue:function(){return this.$el.val()
},setValue:function(h){this.$el.val(h)
},focus:function(){if(this.hasFocus){return
}this.$el.focus()
},blur:function(){if(!this.hasFocus){return
}this.$el.blur()
},select:function(){this.$el.select()
}}),f.Number=f.Text.extend({defaultValue:0,events:c.extend({},f.Text.prototype.events,{keypress:"onKeyPress"}),initialize:function(h){f.Text.prototype.initialize.call(this,h),this.$el.attr("type","number")
},onKeyPress:function(k){var h=this,l=function(){setTimeout(function(){h.determineChange()
},0)
};
if(k.charCode==0){l();
return
}var i=this.$el.val()+String.fromCharCode(k.charCode),j=/^[0-9]*\.?[0-9]*?$/.test(i);
j?l():k.preventDefault()
},getValue:function(){var h=this.$el.val();
return h===""?null:parseFloat(h,10)
},setValue:function(h){h=function(){return c.isNumber(h)?h:c.isString(h)&&h!==""?parseFloat(h,10):null
}(),c.isNaN(h)&&(h=null),f.Text.prototype.setValue.call(this,h)
}}),f.Password=f.Text.extend({initialize:function(h){f.Text.prototype.initialize.call(this,h),this.$el.attr("type","password")
}}),f.TextArea=f.Text.extend({tagName:"textarea"}),f.Checkbox=f.Base.extend({defaultValue:!1,tagName:"input",events:{click:function(h){this.trigger("change",this)
},focus:function(h){this.trigger("focus",this)
},blur:function(h){this.trigger("blur",this)
}},initialize:function(h){f.Base.prototype.initialize.call(this,h),this.$el.attr("type","checkbox")
},render:function(){return this.setValue(this.value),this
},getValue:function(){return this.$el.prop("checked")
},setValue:function(h){h&&this.$el.prop("checked",!0)
},focus:function(){if(this.hasFocus){return
}this.$el.focus()
},blur:function(){if(!this.hasFocus){return
}this.$el.blur()
}}),f.Hidden=f.Base.extend({defaultValue:"",initialize:function(h){f.Text.prototype.initialize.call(this,h),this.$el.attr("type","hidden")
},getValue:function(){return this.value
},setValue:function(h){this.value=h
},focus:function(){},blur:function(){}}),f.Select=f.Base.extend({tagName:"select",events:{change:function(h){this.trigger("change",this)
},focus:function(h){this.trigger("focus",this)
},blur:function(h){this.trigger("blur",this)
}},initialize:function(h){f.Base.prototype.initialize.call(this,h);
if(!this.schema||!this.schema.options){throw"Missing required 'schema.options'"
}},render:function(){return this.setOptions(this.schema.options),this
},setOptions:function(i){var h=this;
if(i instanceof e.Collection){var j=i;
j.length>0?this.renderOptions(i):j.fetch({success:function(k){h.renderOptions(i)
}})
}else{c.isFunction(i)?i(function(k){h.renderOptions(k)
}):this.renderOptions(i)
}},renderOptions:function(i){var h=this.$el,j;
c.isString(i)?j=i:c.isArray(i)?j=this._arrayToHtml(i):i instanceof e.Collection&&(j=this._collectionToHtml(i)),h.html(j),this.setValue(this.value)
},getValue:function(){return this.$el.val()
},setValue:function(h){this.$el.val(h)
},focus:function(){if(this.hasFocus){return
}this.$el.focus()
},blur:function(){if(!this.hasFocus){return
}this.$el.blur()
},_collectionToHtml:function(i){var j=[];
i.each(function(k){j.push({val:k.id,label:k.toString()})
});
var h=this._arrayToHtml(j);
return h
},_arrayToHtml:function(i){var h=[];
return c.each(i,function(j){if(c.isObject(j)){var k=j.val?j.val:"";
h.push('<option value="'+k+'">'+j.label+"</option>")
}else{h.push("<option>"+j+"</option>")
}}),h.join("")
}}),f.Radio=f.Select.extend({tagName:"ul",className:"bbf-radio",events:{"click input[type=radio]:not(:checked)":function(){this.trigger("change",this)
},"focus input[type=radio]":function(){if(this.hasFocus){return
}this.trigger("focus",this)
},"blur input[type=radio]":function(){if(!this.hasFocus){return
}var h=this;
setTimeout(function(){if(h.$("input[type=radio]:focus")[0]){return
}h.trigger("blur",h)
},0)
}},getValue:function(){return this.$("input[type=radio]:checked").val()
},setValue:function(h){this.$("input[type=radio]").val([h])
},focus:function(){if(this.hasFocus){return
}var h=this.$("input[type=radio]:checked");
if(h[0]){h.focus();
return
}this.$("input[type=radio]").first().focus()
},blur:function(){if(!this.hasFocus){return
}this.$("input[type=radio]:focus").blur()
},_arrayToHtml:function(j){var i=[],h=this;
return c.each(j,function(l,k){var m="<li>";
if(c.isObject(l)){var n=l.val?l.val:"";
m+='<input type="radio" name="'+h.id+'" value="'+n+'" id="'+h.id+"-"+k+'" />',m+='<label for="'+h.id+"-"+k+'">'+l.label+"</label>"
}else{m+='<input type="radio" name="'+h.id+'" value="'+l+'" id="'+h.id+"-"+k+'" />',m+='<label for="'+h.id+"-"+k+'">'+l+"</label>"
}m+="</li>",i.push(m)
}),i.join("")
}}),f.Checkboxes=f.Select.extend({tagName:"ul",className:"bbf-checkboxes",events:{"click input[type=checkbox]":function(){this.trigger("change",this)
},"focus input[type=checkbox]":function(){if(this.hasFocus){return
}this.trigger("focus",this)
},"blur input[type=checkbox]":function(){if(!this.hasFocus){return
}var h=this;
setTimeout(function(){if(h.$("input[type=checkbox]:focus")[0]){return
}h.trigger("blur",h)
},0)
}},getValue:function(){var h=[];
return this.$("input[type=checkbox]:checked").each(function(){h.push(d(this).val())
}),h
},setValue:function(h){c.isArray(h)||(h=[h]),this.$("input[type=checkbox]").val(h)
},focus:function(){if(this.hasFocus){return
}this.$("input[type=checkbox]").first().focus()
},blur:function(){if(!this.hasFocus){return
}this.$("input[type=checkbox]:focus").blur()
},_arrayToHtml:function(j){var i=[],h=this;
return c.each(j,function(l,k){var m="<li>";
if(c.isObject(l)){var n=l.val?l.val:"";
m+='<input type="checkbox" name="'+h.id+'" value="'+n+'" id="'+h.id+"-"+k+'" />',m+='<label for="'+h.id+"-"+k+'">'+l.label+"</label>"
}else{m+='<input type="checkbox" name="'+h.id+'" value="'+l+'" id="'+h.id+"-"+k+'" />',m+='<label for="'+h.id+"-"+k+'">'+l+"</label>"
}m+="</li>",i.push(m)
}),i.join("")
}}),f.Object=f.Base.extend({hasNestedForm:!0,className:"bbf-object",initialize:function(h){this.value={},f.Base.prototype.initialize.call(this,h);
if(!this.schema.subSchema){throw new Error("Missing required 'schema.subSchema' option for Object editor")
}},render:function(){return this.form=new b({schema:this.schema.subSchema,data:this.value,idPrefix:this.id+"_",fieldTemplate:"nestedField"}),this._observeFormEvents(),this.$el.html(this.form.render().el),this.hasFocus&&this.trigger("blur",this),this
},getValue:function(){return this.form?this.form.getValue():this.value
},setValue:function(h){this.value=h,this.render()
},focus:function(){if(this.hasFocus){return
}this.form.focus()
},blur:function(){if(!this.hasFocus){return
}this.form.blur()
},remove:function(){this.form.remove(),e.View.prototype.remove.call(this)
},validate:function(){return this.form.validate()
},_observeFormEvents:function(){this.form.on("all",function(){args=c.toArray(arguments),args[1]=this,this.trigger.apply(this,args)
},this)
}}),f.NestedModel=f.Object.extend({initialize:function(h){f.Base.prototype.initialize.call(this,h);
if(!h.schema.model){throw'Missing required "schema.model" option for NestedModel editor'
}},render:function(){var k=this.value||{},i=this.key,j=this.schema.model,h=k.constructor==j?k:new j(k);
return this.form=new b({model:h,idPrefix:this.id+"_",fieldTemplate:"nestedField"}),this._observeFormEvents(),this.$el.html(this.form.render().el),this.hasFocus&&this.trigger("blur",this),this
},commit:function(){var h=this.form.commit();
return h?(this.$el.addClass("error"),h):f.Object.prototype.commit.call(this)
}}),f.Date=f.Base.extend({events:{"change select":function(){this.updateHidden(),this.trigger("change",this)
},"focus select":function(){if(this.hasFocus){return
}this.trigger("focus",this)
},"blur select":function(){if(!this.hasFocus){return
}var h=this;
setTimeout(function(){if(h.$("select:focus")[0]){return
}h.trigger("blur",h)
},0)
}},initialize:function(j){j=j||{},f.Base.prototype.initialize.call(this,j);
var k=f.Date,h=new Date;
this.options=c.extend({monthNames:k.monthNames,showMonthNames:k.showMonthNames},j),this.schema=c.extend({yearStart:h.getFullYear()-100,yearEnd:h.getFullYear()},j.schema||{}),this.value&&!c.isDate(this.value)&&(this.value=new Date(this.value));
if(!this.value){var i=new Date;
i.setSeconds(0),i.setMilliseconds(0),this.value=i
}},render:function(){var j=this.options,l=this.schema,i=c.map(c.range(1,32),function(n){return'<option value="'+n+'">'+n+"</option>"
}),m=c.map(c.range(0,12),function(o){var n=j.showMonthNames?j.monthNames[o]:o+1;
return'<option value="'+o+'">'+n+"</option>"
}),h=c.map(c.range(l.yearStart,l.yearEnd+1),function(n){return'<option value="'+n+'">'+n+"</option>"
}),k=d(b.templates.date({dates:i.join(""),months:m.join(""),years:h.join("")}));
return this.$date=k.find('select[data-type="date"]'),this.$month=k.find('select[data-type="month"]'),this.$year=k.find('select[data-type="year"]'),this.$hidden=d('<input type="hidden" name="'+this.key+'" />'),k.append(this.$hidden),this.setValue(this.value),this.setElement(k),this.$el.attr("id",this.id),this.hasFocus&&this.trigger("blur",this),this
},getValue:function(){var i=this.$year.val(),j=this.$month.val(),h=this.$date.val();
return !i||!j||!h?null:new Date(i,j,h)
},setValue:function(h){this.$date.val(h.getDate()),this.$month.val(h.getMonth()),this.$year.val(h.getFullYear()),this.updateHidden()
},focus:function(){if(this.hasFocus){return
}this.$("select").first().focus()
},blur:function(){if(!this.hasFocus){return
}this.$("select:focus").blur()
},updateHidden:function(){var h=this.getValue();
c.isDate(h)&&(h=h.toISOString()),this.$hidden.val(h)
}},{showMonthNames:!0,monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"]}),f.DateTime=f.Base.extend({events:{"change select":function(){this.updateHidden(),this.trigger("change",this)
},"focus select":function(){if(this.hasFocus){return
}this.trigger("focus",this)
},"blur select":function(){if(!this.hasFocus){return
}var h=this;
setTimeout(function(){if(h.$("select:focus")[0]){return
}h.trigger("blur",h)
},0)
}},initialize:function(h){h=h||{},f.Base.prototype.initialize.call(this,h),this.options=c.extend({DateEditor:f.DateTime.DateEditor},h),this.schema=c.extend({minsInterval:15},h.schema||{}),this.dateEditor=new this.options.DateEditor(h),this.value=this.dateEditor.value
},render:function(){function l(m){return m<10?"0"+m:m
}var k=this.schema,i=c.map(c.range(0,24),function(m){return'<option value="'+m+'">'+l(m)+"</option>"
}),h=c.map(c.range(0,60,k.minsInterval),function(m){return'<option value="'+m+'">'+l(m)+"</option>"
}),j=d(b.templates.dateTime({date:'<b class="bbf-tmp"></b>',hours:i.join(),mins:h.join()}));
return j.find(".bbf-tmp").replaceWith(this.dateEditor.render().el),this.$hour=j.find('select[data-type="hour"]'),this.$min=j.find('select[data-type="min"]'),this.$hidden=j.find('input[type="hidden"]'),this.setValue(this.value),this.setElement(j),this.$el.attr("id",this.id),this.hasFocus&&this.trigger("blur",this),this
},getValue:function(){var i=this.dateEditor.getValue(),h=this.$hour.val(),j=this.$min.val();
return !i||!h||!j?null:(i.setHours(h),i.setMinutes(j),i)
},setValue:function(h){c.isDate(h)||(h=new Date(h)),this.dateEditor.setValue(h),this.$hour.val(h.getHours()),this.$min.val(h.getMinutes()),this.updateHidden()
},focus:function(){if(this.hasFocus){return
}this.$("select").first().focus()
},blur:function(){if(!this.hasFocus){return
}this.$("select:focus").blur()
},updateHidden:function(){var h=this.getValue();
c.isDate(h)&&(h=h.toISOString()),this.$hidden.val(h)
},remove:function(){this.dateEditor.remove(),f.Base.prototype.remove.call(this)
}},{DateEditor:f.Date}),f
}(),b.setTemplates=b.helpers.setTemplates,b.setTemplateCompiler=b.helpers.setTemplateCompiler,b.templates={},b.setTemplates({form:'      <form class="bbf-form">{{fieldsets}}</form>    ',fieldset:"      <fieldset>        <legend>{{legend}}</legend>        <ul>{{fields}}</ul>      </fieldset>    ",field:'      <li class="bbf-field field-{{key}}">        <label for="{{id}}">{{title}}</label>        <div class="bbf-editor">{{editor}}</div>        <div class="bbf-help">{{help}}</div>      </li>    ',nestedField:'      <li class="bbf-field bbf-nested-field field-{{key}}" title="{{title}}">        <label for="{{id}}">{{title}}</label>        <div class="bbf-editor">{{editor}}</div>        <div class="bbf-help">{{help}}</div>      </li>    ',list:'      <div class="bbf-list">        <ul>{{items}}</ul>        <div class="bbf-actions"><button type="button" data-action="add">Add</div>      </div>    ',listItem:'      <li>        <button type="button" data-action="remove" class="bbf-remove">&times;</button>        <div class="bbf-editor-container">{{editor}}</div>      </li>    ',date:'      <div class="bbf-date">        <select data-type="date" class="bbf-date">{{dates}}</select>        <select data-type="month" class="bbf-month">{{months}}</select>        <select data-type="year" class="bbf-year">{{years}}</select>      </div>    ',dateTime:'      <div class="bbf-datetime">        <div class="bbf-date-container">{{date}}</div>        <select data-type="hour">{{hours}}</select>        :        <select data-type="min">{{mins}}</select>      </div>    ',"list.Modal":'      <div class="bbf-list-modal">        {{summary}}      </div>    '},{error:"bbf-error"}),b.VERSION="0.10.1",e.Form=b
})(this);