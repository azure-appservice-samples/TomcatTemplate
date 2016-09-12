var USE_ASYNCHRONOUS_REQUESTS=true;
var DISCARD_UNUSED_TRIPLES=true;
var PREFER_SPANS_OVER_DIVS=true;
var PREFER_TITLE_OVER_TEXTNODE=false;
var RESOURCE_ID_PREFIX="resource";
var SHOW_DEBUG_ALERTS_WHEN_SAVING=false;
var SHOW_EXTENDED_DEBUG_INFORMATION=false;
var USE_ARESS_WORKAROUNDS=true;
var RESOURCE_CREATED=1;
var RESOURCE_REMOVED=2;
var RESOURCE_SAVED=4;
var RESOURCE_RELOADED=8;
var RESOURCE_SYNCHRONIZED=16;
var TRIPLE_REMOVE=1;
var TRIPLE_ADD=2;
var TRIPLE_RELOAD=4;
var TRIPLE_SAVE=8;
var PROCESSDATA_REF="processdata";
var DataManager={init:function(){ERDF.init(DataManager._registerTriple);
DataManager.__synclocal()
},_triples:[],_registerTriple:function(a){DataManager._triples.push(a)
},__synclocal:function(){DataManager._triples=[];
ERDF.run()
},__synchronizeShape:function(a){var c=ResourceManager.getResource(a.resourceId);
var b=a.serialize();
b.each(function(d){var f=(d.type=="resource");
var e=new ERDF.Triple(new ERDF.Resource(a.resourceId),{prefix:d.prefix,name:d.name},f?new ERDF.Resource(d.value):new ERDF.Literal(d.value));
DataManager.setObject(e)
});
return c
},__storeShape:function(a){var b=DataManager.__synchronizeShape(a);
b.save()
},__forceExistance:function(a){if(!$(a.resourceId)){if(!$$("."+PROCESSDATA_REF)[0]){DataManager.graft(XMLNS.XHTML,document.getElementsByTagNameNS(XMLNS.XHTML,"body").item(0),["div",{"class":PROCESSDATA_REF,style:"display:none;"}])
}DataManager.graft(XMLNS.XHTML,$$("."+PROCESSDATA_REF)[0],["div",{id:a.resourceId,"class":(a instanceof ORYX.Core.Canvas)?"-oryx-canvas":undefined}])
}else{var c=$(a.resourceId);
var b=$A(c.childNodes);
b.each(function(d){c.removeChild(d)
})
}},__persistShape:function(b){var d=b.serialize();
var a=[];
var c=new ERDF.Resource(b.resourceId);
DataManager.removeTriples(DataManager.query(c,undefined,undefined));
d.each(function(f){var e=(f.type=="resource")?new ERDF.Resource(f.value):new ERDF.Literal(f.value);
DataManager.addTriple(new ERDF.Triple(c,{prefix:f.prefix,name:f.name},e))
})
},__persistDOM:function(d){var c=d.getCanvas();
var b=c.getChildShapes(true);
var a="";
b.each(function(e){DataManager.__forceExistance(e)
});
DataManager.__renderCanvas(d);
a+=DataManager.serialize($(ERDF.__stripHashes(d.getCanvas().resourceId)),true);
b.each(function(e){DataManager.__persistShape(e);
a+=DataManager.serialize($(ERDF.__stripHashes(e.resourceId)),true)
});
return a
},__renderCanvas:function(e){var b=e.getCanvas();
var d=e.getStencilSets();
var a=b.getChildShapes(true);
DataManager.__forceExistance(b);
DataManager.__persistShape(b);
var c=new ERDF.Resource(b.resourceId);
DataManager.removeTriples(DataManager.query(c,undefined,undefined));
DataManager.addTriple(new ERDF.Triple(c,{prefix:"oryx",name:"mode"},new ERDF.Literal("writable")));
DataManager.addTriple(new ERDF.Triple(c,{prefix:"oryx",name:"mode"},new ERDF.Literal("fullscreen")));
d.values().each(function(f){DataManager.addTriple(new ERDF.Triple(c,{prefix:"oryx",name:"stencilset"},new ERDF.Resource(f.source().replace(/&/g,"%26"))));
DataManager.addTriple(new ERDF.Triple(c,{prefix:"oryx",name:"ssnamespace"},new ERDF.Resource(f.namespace())));
f.extensions().keys().each(function(g){DataManager.addTriple(new ERDF.Triple(c,{prefix:"oryx",name:"ssextension"},new ERDF.Literal(g)))
})
});
a.each(function(f){DataManager.addTriple(new ERDF.Triple(c,{prefix:"oryx",name:"render"},new ERDF.Resource("#"+f.resourceId)))
})
},__counter:0,__provideId:function(){while($(RESOURCE_ID_PREFIX+DataManager.__counter)){DataManager.__counter++
}return RESOURCE_ID_PREFIX+DataManager.__counter
},serializeDOM:function(a){return DataManager.__persistDOM(a)
},syncGlobal:function(a){return DataManager.__syncglobal(a)
},__syncglobal:function(c){var b=c.getCanvas();
var a=b.getChildShapes(true);
a.select(function(d){return !($(d.resourceId))
}).each(function(d){if(USE_ARESS_WORKAROUNDS){var e=d.properties["raziel-type"];
var g='<div xmlns="http://www.w3.org/1999/xhtml"><span class="raziel-type">'+e+"</span></div>";
var f=ResourceManager.__createResource(g);
d.resourceId=f.id()
}else{var f=ResourceManager.__createResource();
d.resourceId=f.id()
}});
a.each(function(d){DataManager.__storeShape(d)
})
},serialize:function(f,b){if(f.nodeType==f.ELEMENT_NODE){var e=$A(f.childNodes);
var c=$A(f.attributes);
var d=new String(f.getAttribute("class"));
var g=d.split(" ").member("transient");
if(g){return""
}var a="<"+f.nodeName;
if(!b){a+=' xmlns="'+(f.namespaceURI?f.namespaceURI:XMLNS.XHTML)+'" xmlns:oryx="http://oryx-editor.org"'
}c.each(function(h){var i=h.nodeValue;
if(i.indexOf("&")!==-1||i.indexOf(">")!==-1||i.indexOf("<")!==-1||i.indexOf('"')!==-1){i=Ext.util.Format.htmlEncode(i)
}a+=" "+h.nodeName+'="'+i+'"'
});
if(e.length==0){a+="/>"
}else{a+=">";
e.each(function(h){a+=DataManager.serialize(h,true)
});
a+="</"+f.nodeName+">"
}return a
}else{if(f.nodeType==f.TEXT_NODE){return f.nodeValue
}}},addTriple:function(c){if(!c.subject.type==ERDF.LITERAL){throw"Cannot add the triple "+c.toString()+" because the subject is not a resource."
}var a=ERDF.__stripHashes(c.subject.value);
var b=$(a);
if(!b){throw"Cannot add the triple "+c.toString()+' because the subject "'+a+'" is not in the document.'
}if(c.object.type==ERDF.LITERAL){DataManager.graft(XMLNS.XHTML,b,["span",{"class":(c.predicate.prefix+"-"+c.predicate.name)},c.object.value.escapeHTML()])
}else{DataManager.graft(XMLNS.XHTML,b,["a",{rel:(c.predicate.prefix+"-"+c.predicate.name),href:c.object.value}])
}return true
},removeTriples:function(b){var a=b.select(function(c){return DataManager.__removeTriple(c)
});
return a
},removeTriple:function(b){var a=DataManager.__removeTriple(b);
return a
},__removeTriple:function(d){if(!d.subject.type==ERDF.LITERAL){throw"Cannot remove the triple "+d.toString()+" because the subject is not a resource."
}var b=ERDF.__stripHashes(d.subject.value);
var c=$(b);
if(!c){throw"Cannot remove the triple "+d.toString()+" because the subject is not in the document."
}if(d.object.type==ERDF.LITERAL){var a=DataManager.__removeTripleRecursively(d,c);
return a
}},__removeTripleRecursively:function(e,d){if(d.nodeType!=d.ELEMENT_NODE){return false
}var b=new String(d.getAttribute("class"));
var a=$A(d.childNodes);
if(b.include(e.predicate.prefix+"-"+e.predicate.name)){var c=d.textContent;
if((e.object.type==ERDF.LITERAL)&&(e.object.value==c)){d.parentNode.removeChild(d)
}return true
}else{a.each(function(f){DataManager.__removeTripleRecursively(e,f)
});
return false
}},graft:function(g,f,d,j){j=(j||(f&&f.ownerDocument)||document);
var h;
if(d===undefined){echo("Can't graft an undefined value")
}else{if(d.constructor==String){h=j.createTextNode(d)
}else{for(var c=0;
c<d.length;
c++){if(c===0&&d[c].constructor==String){var a=d[c].match(/^([a-z][a-z0-9]*)\.([^\s\.]+)$/i);
if(a){h=j.createElementNS(g,a[1]);
h.setAttributeNS(null,"class",a[2]);
continue
}a=d[c].match(/^([a-z][a-z0-9]*)$/i);
if(a){h=j.createElementNS(g,a[1]);
continue
}h=j.createElementNS(g,"span");
h.setAttribute(null,"class","namelessFromLOL")
}if(d[c]===undefined){echo("Can't graft an undefined value in a list!")
}else{if(d[c].constructor==String||d[c].constructor==Array){this.graft(g,h,d[c],j)
}else{if(d[c].constructor==Number){this.graft(g,h,d[c].toString(),j)
}else{if(d[c].constructor==Object){for(var b in d[c]){h.setAttributeNS(null,b,d[c][b])
}}else{if(d[c].constructor==Boolean){this.graft(g,h,d[c]?"true":"false",j)
}else{throw"Object "+d[c]+" is inscrutable as an graft arglet."
}}}}}}}}if(f){f.appendChild(h)
}return Element.extend(h)
},setObject:function(a){var b=DataManager.query(a.subject,a.predicate,undefined);
DataManager.removeTriples(b);
DataManager.addTriple(a);
return true
},query:function(c,a,b){return DataManager._triples.select(function(e){var d=((c)?(e.subject.type==c.type)&&(e.subject.value==c.value):true);
if(a){d=d&&((a.prefix)?(e.predicate.prefix==a.prefix):true);
d=d&&((a.name)?(e.predicate.name==a.name):true)
}d=d&&((b)?(e.object.type==b.type)&&(e.object.value==b.value):true);
return d
})
}};
Kickstart.register(DataManager.init);
function assert(b,a){if(!b){throw a
}}function DMCommand(a,b){this.action=a;
this.triple=b;
this.toString=function(){return"Command("+a+", "+b+")"
}
}function DMCommandHandler(a){this.__setNext=function(c){var b=this.__next;
this.__next=a;
return b?b:true
};
this.__setNext(a);
this.__invokeNext=function(b){return this.__next?this.__next.handle(b):false
};
this.handle=function(b){return this.process(b)?true:this.__invokeNext(b)
};
this.process=function(b){return false
}
}function MetaTagHandler(next){DMCommandHandler.apply(this,[next]);
this.process=function(command){with(command.triple){if(!((subject instanceof ERDF.Resource)&&(subject.isCurrentDocument())&&(object instanceof ERDF.Literal))){return false
}}}
}var chain=new MetaTagHandler();
var command=new DMCommand(TRIPLE_ADD,new ERDF.Triple(new ERDF.Resource(""),"rdf:tool",new ERDF.Literal("")));
ResourceManager={__corrupt:false,__latelyCreatedResource:undefined,__listeners:$H(),__token:1,addListener:function(d,b){if(!(d instanceof Function)){throw"Resource event listener is not a function!"
}if(!(b)){throw"Invalid mask for resource event listener registration."
}var a={listener:d,mask:b};
var c=ResourceManager.__token++;
ResourceManager.__listeners[c]=a;
return c
},removeListener:function(a){return ResourceManager.__listners.remove(a)
},__Event:function(a,b){this.action=a;
this.resourceId=b
},__dispatchEvent:function(a){ResourceManager.__listeners.values().each(function(b){if(a.action&b.mask){return b.listener(a)
}})
},getResource:function(c){c=ERDF.__stripHashes(c);
var b=DataManager.query(new ERDF.Resource("#"+c),{prefix:"raziel",name:"entry"},undefined);
if((b.length==1)&&(b[0].object.isResource())){var a=b[0].object.value;
return new ResourceManager.__Resource(c,a)
}throw ("Resource with id "+c+" not recognized as such. "+((b.length>1)?" There is more than one raziel:entry URL.":" There is no raziel:entry URL."));
return false
},__createResource:function(e){var d=DataManager.query(new ERDF.Resource(""),{prefix:"raziel",name:"collection"},undefined);
if((d.length==1)&&(d[0].object.isResource())){var b=d[0].object.value;
var c=undefined;
var a=e?e:'<div xmlns="http://www.w3.org/1999/xhtml"></div>';
ResourceManager.__request("POST",b,a,function(){var f=(this.responseXML);
var h=f.childNodes[0];
var g=h.getAttribute("id");
if(!$$("."+PROCESSDATA_REF)[0]){DataManager.graft(XMLNS.XHTML,document.getElementsByTagNameNS(XMLNS.XHTML,"body").item(0),["div",{"class":PROCESSDATA_REF,style:"display:none;"}])
}$$("."+PROCESSDATA_REF)[0].appendChild(h.cloneNode(true));
DataManager.__synclocal();
c=new ResourceManager.getResource(g);
ResourceManager.__resourceActionSucceeded(this,RESOURCE_CREATED,undefined)
},function(){ResourceManager.__resourceActionFailed(this,RESOURCE_CREATED,undefined)
},false);
return c
}throw"Could not create resource! raziel:collection URL is missing!";
return false
},__Resource:function(b,a){this.__id=b;
this.__url=a;
this.id=function(){return this.__id
};
this.url=function(){return this.__url
};
this.reload=function(){var d=this.__url;
var c=this.__id;
ResourceManager.__request("GET",d,null,function(){ResourceManager.__resourceActionSucceeded(this,RESOURCE_RELOADED,c)
},function(){ResourceManager.__resourceActionFailed(this,RESURCE_RELOADED,c)
},USE_ASYNCHRONOUS_REQUESTS)
};
this.save=function(e){var d=this.__url;
var c=this.__id;
data=DataManager.serialize($(c));
ResourceManager.__request("PUT",d,data,function(){ResourceManager.__resourceActionSucceeded(this,e?RESOURCE_SAVED|RESOURCE_SYNCHRONIZED:RESOURCE_SAVED,c)
},function(){ResourceManager.__resourceActionFailed(this,e?RESOURCE_SAVED|RESOURCE_SYNCHRONIZED:RESOURCE.SAVED,c)
},USE_ASYNCHRONOUS_REQUESTS)
};
this.remove=function(){var d=this.__url;
var c=this.__id;
ResourceManager.__request("DELETE",d,null,function(){ResourceManager.__resourceActionSucceeded(this,RESOURCE_REMOVED,c)
},function(){ResourceManager.__resourceActionFailed(this,RESOURCE_REMOVED,c)
},USE_ASYNCHRONOUS_REQUESTS)
}
},request:function(c,a){var b={method:"get",asynchronous:true,parameters:{}};
Object.extend(b,a||{});
var d=Hash.toQueryString(b.parameters);
if(d){c+=(c.include("?")?"&":"?")+d
}return ResourceManager.__request(b.method,c,b.data,(b.onSuccess instanceof Function?function(){b.onSuccess(this)
}:undefined),(b.onFailure instanceof Function?function(){b.onFailure(this)
}:undefined),b.asynchronous&&USE_ASYNCHRONOUS_REQUESTS,b.headers)
},__request:function(a,b,f,l,k,d,c){var g=Try.these(function(){return new XMLHttpRequest()
},function(){return new ActiveXObject("Msxml2.XMLHTTP")
},function(){return new ActiveXObject("Microsoft.XMLHTTP")
});
if(!g){if(!this.__corrupt){throw"This browser does not provide any AJAX functionality. You will not be able to use the software provided with the page you are viewing. Please consider installing appropriate extensions."
}this.__corrupt=true;
return false
}if(l instanceof Function){g.onload=l
}if(k instanceof Function){g.onerror=k
}var i=$H(c);
i.keys().each(function(e){g.setRequestHeader(e,i[e])
});
try{if(SHOW_DEBUG_ALERTS_WHEN_SAVING){alert(a+" "+b+"\n"+SHOW_EXTENDED_DEBUG_INFORMATION?f:"")
}g.open(a,b,!d?false:true);
g.send(f)
}catch(j){return false
}return true
},__resourceActionSucceeded:function(g,c,f){var a=g.status;
var b=g.responseText;
if(SHOW_DEBUG_ALERTS_WHEN_SAVING){alert(a+" "+url+"\n"+SHOW_EXTENDED_DEBUG_INFORMATION?data:"")
}if(a>=300){throw"The server responded with an error: "+a+"\n"+(SHOW_EXTENDED_DEBUG_INFORMATION?+data:"If you need additional information here, including the data sent by the server, consider setting SHOW_EXTENDED_DEBUG_INFORMATION to true.")
}switch(c){case RESOURCE_REMOVED:var b=(g.responseXML);
var e=b.childNodes[0];
var f=e.getAttribute("id");
var d=document.getElementById(f);
d.parentNode.removeChild(d);
break;
case RESOURCE_CREATED:break;
case RESOURCE_SAVED|RESOURCE_SYNCHRONIZED:DataManager.__synclocal();
case RESOURCE_SAVED:break;
case RESOURCE_RELOADED:var b=(g.responseXML);
var e=b.childNodes[0];
var f=e.getAttribute("id");
var d=document.getElementById(f);
d.parentNode.removeChild(d);
if(!$$(PROCESSDATA_REF)[0]){DataManager.graft(XMLNS.XHTML,document.getElementsByTagNameNS(XMLNS.XHTML,"body").item(0),["div",{"class":PROCESSDATA_REF,style:"display:none;"}])
}$$(PROCESSDATA_REF)[0].appendChild(e.cloneNode(true));
DataManager.__synclocal();
break;
default:DataManager.__synclocal()
}ResourceManager.__dispatchEvent(new ResourceManager.__Event(c,f))
},__resourceActionFailed:function(c,a,b){throw"Fatal: Resource action failed. There is something horribly wrong with either the server, the transport protocol or your online status. Sure you're online?"
}};