var ERDF={LITERAL:1,RESOURCE:2,DELIMITERS:[".","-"],HASH:"#",HYPHEN:"-",schemas:[],callback:undefined,log:undefined,init:function(a){ERDF.callback=a;
ERDF.registerSchema("schema",XMLNS.SCHEMA);
ERDF.registerSchema("rdfs",XMLNS.RDFS)
},run:function(){return ERDF._checkProfile()&&ERDF.parse()
},parse:function(){ERDF.__startTime=new Date();
var b=document.getElementsByTagNameNS(XMLNS.XHTML,"body");
var c={type:ERDF.RESOURCE,value:""};
var a=ERDF._parseDocumentMetadata()&&ERDF._parseFromTag(b[0],c);
ERDF.__stopTime=new Date();
var d=(ERDF.__stopTime-ERDF.__startTime)/1000;
return a
},_parseDocumentMetadata:function(){var b=document.getElementsByTagNameNS(XMLNS.XHTML,"head");
var a=b[0].getElementsByTagNameNS(XMLNS.XHTML,"link");
var c=b[0].getElementsByTagNameNS(XMLNS.XHTML,"meta");
$A(a).each(function(e){var d=e.getAttribute("rel");
var g=e.getAttribute("rev");
var f=e.getAttribute("href");
ERDF._parseTriplesFrom(ERDF.RESOURCE,"",d,ERDF.RESOURCE,f);
ERDF._parseTriplesFrom(ERDF.RESOURCE,f,g,ERDF.RESOURCE,"")
});
$A(c).each(function(f){var e=f.getAttribute("name");
var d=f.getAttribute("content");
ERDF._parseTriplesFrom(ERDF.RESOURCE,"",e,ERDF.LITERAL,d)
});
return true
},_parseFromTag:function(c,i,d){if(c.namespaceURI!=XMLNS.XHTML){return
}if(!d){d=0
}var a=c.getAttribute("id");
if(c.nodeName.endsWith(":a")||c.nodeName=="a"){var h=c.getAttribute("rel");
var e=c.getAttribute("rev");
var l=c.getAttribute("href");
var k=c.getAttribute("title");
var g=c.textContent;
ERDF._parseTriplesFrom(i.type,i.value,h,ERDF.RESOURCE,l,function(n){var m=k?k:g;
ERDF._parseTriplesFrom(n.object.type,n.object.value,"rdfs.label",ERDF.LITERAL,m)
});
ERDF._parseTriplesFrom(i.type,i.value,e,ERDF.RESOURCE,"");
ERDF._parseTypeTriplesFrom(i.type,i.value,h)
}else{if(c.nodeName.endsWith(":img")||c.nodeName=="img"){var h=c.getAttribute("class");
var l=c.getAttribute("src");
var f=c.getAttribute("alt");
ERDF._parseTriplesFrom(i.type,i.value,h,ERDF.RESOURCE,l,function(n){var m=f;
ERDF._parseTriplesFrom(n.object.type,n.object.value,"rdfs.label",ERDF.LITERAL,m)
})
}}var h=c.getAttribute("class");
var k=c.getAttribute("title");
var g=c.textContent;
var j=k?k:g;
ERDF._parseTriplesFrom(i.type,i.value,h,ERDF.LITERAL,j);
if(a){i={type:ERDF.RESOURCE,value:ERDF.HASH+a}
}ERDF._parseTypeTriplesFrom(i.type,i.value,h);
var b=c.childNodes;
if(b){$A(b).each(function(m){if(m.nodeType==m.ELEMENT_NODE){ERDF._parseFromTag(m,i,d+1)
}})
}},_parseTriplesFrom:function(c,e,d,a,b,f){if(!d){return
}d.toLowerCase().split(" ").each(function(h){var g=ERDF.schemas.find(function(j){return false||ERDF.DELIMITERS.find(function(k){return h.startsWith(j.prefix+k)
})
});
if(g&&b){h=h.substring(g.prefix.length+1,h.length);
var i=ERDF.registerTriple(new ERDF.Resource(e),{prefix:g.prefix,name:h},(a==ERDF.RESOURCE)?new ERDF.Resource(b):new ERDF.Literal(b));
if(f){f(i)
}}})
},_parseTypeTriplesFrom:function(a,c,b,d){if(!b){return
}b.toLowerCase().split(" ").each(function(f){var e=ERDF.schemas.find(function(h){return false||ERDF.DELIMITERS.find(function(i){return f.startsWith(ERDF.HYPHEN+h.prefix+i)
})
});
if(e&&c){f=f.substring(e.prefix.length+2,f.length);
var g=ERDF.registerTriple((a==ERDF.RESOURCE)?new ERDF.Resource(c):new ERDF.Literal(c),{prefix:"rdf",name:"type"},new ERDF.Resource(e.namespace+f));
if(d){d(g)
}}})
},_checkProfile:function(){var b=document.getElementsByTagNameNS(XMLNS.XHTML,"head");
var a=b[0].getAttribute("profile");
var c=false;
if(a&&a.split(" ").member(XMLNS.ERDF)){return true
}else{return false
}},__stripHashes:function(a){return(a&&a.substring(0,1)=="#")?a.substring(1,a.length):a
},registerSchema:function(b,a){ERDF.schemas.push({prefix:b,namespace:a})
},registerTriple:function(c,a,b){if(a.prefix.toLowerCase()=="schema"){this.registerSchema(a.name,b.value)
}var d=new ERDF.Triple(c,a,b);
ERDF.callback(d);
return d
},__enhanceObject:function(){this.isResource=function(){return this.type==ERDF.RESOURCE
};
this.isLocal=function(){return this.isResource()&&this.value.startsWith("#")
};
this.isCurrentDocument=function(){return this.isResource()&&(this.value=="")
};
this.getId=function(){return this.isLocal()?ERDF.__stripHashes(this.value):false
};
this.isLiteral=function(){return this.type==ERDF.LIITERAL
}
},serialize:function(a){if(!a){return""
}else{if(a.constructor==String){return a
}else{if(a.constructor==Boolean){return a?"true":"false"
}else{return a.toString()
}}}}};
ERDF.Triple=function(c,a,b){this.subject=c;
this.predicate=a;
this.object=b;
this.toString=function(){return"[ERDF.Triple] "+this.subject.toString()+" "+this.predicate.prefix+":"+this.predicate.name+" "+this.object.toString()
}
};
ERDF.Resource=function(a){this.type=ERDF.RESOURCE;
this.value=a;
ERDF.__enhanceObject.apply(this);
this.toString=function(){return"&lt;"+this.value+"&gt;"
}
};
ERDF.Literal=function(a){this.type=ERDF.LITERAL;
this.value=ERDF.serialize(a);
ERDF.__enhanceObject.apply(this);
this.toString=function(){return'"'+this.value+'"'
}
};