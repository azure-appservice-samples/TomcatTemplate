XMLNS={ATOM:"http://www.w3.org/2005/Atom",XHTML:"http://www.w3.org/1999/xhtml",ERDF:"http://purl.org/NET/erdf/profile",RDFS:"http://www.w3.org/2000/01/rdf-schema#",RDF:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",RAZIEL:"http://b3mn.org/Raziel",SCHEMA:""};
var Kickstart={started:false,callbacks:[],alreadyLoaded:[],PATH:"",load:function(){Kickstart.kick()
},kick:function(){if(!Kickstart.started){Kickstart.started=true;
Kickstart.callbacks.each(function(a){window.setTimeout(a,1)
})
}},register:function(callback){with(Kickstart){if(started){window.setTimeout(callback,1)
}else{Kickstart.callbacks.push(callback)
}}},require:function(a){if(Kickstart.alreadyLoaded.member(a)){return false
}return Kickstart.include(a)
},include:function(a){var b=document.getElementsByTagNameNS(XMLNS.XHTML,"head")[0];
var c=document.createElementNS(XMLNS.XHTML,"script");
c.setAttributeNS(XMLNS.XHTML,"type","text/javascript");
c.src=Kickstart.PATH+a;
b.appendChild(c);
Kickstart.alreadyLoaded.push(a);
return true
}};