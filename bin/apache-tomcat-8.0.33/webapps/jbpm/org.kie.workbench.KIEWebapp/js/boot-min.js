params=window.location.search.toQueryParams();
if(params.profile===undefined){params.profile="default"
}ORYX={};
ORYX.CONFIG={};
ORYX.UUID=params.uuid;
ORYX.PROFILE=params.profile;
var segments=window.location.pathname.split("/").without("");
ORYX.CONFIG.ROOT_PATH="/"+segments.first()+"/";
ORYX.PATH=ORYX.CONFIG.ROOT_PATH;
if(ORYX.UUID===undefined){ORYX.UUID=segments.pop()
}var addScript=function(b,e,d,c){var a=document.createElement("script");
a.type="text/javascript";
if(e){if(a.readyState){a.onreadystatechange=function(){if(a.readyState=="loaded"||a.readyState=="complete"){a.onreadystatechange=null;
addScriptSequential(e,d,c)
}}.bind(e,d,c)
}else{a.onload=function(){addScriptSequential(e,d,c)
}.bind(e,d,c)
}}a.src=b;
document.head.appendChild(a)
};
var addScriptSequential=function(c,b,a){if(c.size()==0){if(a){a()
}return
}url=c.shift();
addScript(b+url,c,b,a)
};
function loadLanguageFiles(){addScript(ORYX.PATH+"i18n/translation_en_us.js")
}function loadProfile(a){new Ajax.Request(ORYX.PATH+"profile?name="+params.profile,{asynchronous:false,method:"get",contentType:"application/json",onSuccess:function(b){profile=b.responseText.evalJSON();
document.getElementsByTagName("title").item(0).text=profile.title;
ORYX.CONFIG.SSET=profile.stencilset;
ORYX.CONFIG.SSEXTS=profile.ssexts.map(function(d){var c=null;
new Ajax.Request(ORYX.PATH+"stencilset/"+d,{asynchronous:false,method:"get",contentType:"application/json",onSuccess:function(e){c=e.responseText.evalJSON()
},onFailure:function(e){alert("Could not load Process Designer")
}});
return c
});
new Ajax.Request(ORYX.PATH+"plugins",{asynchronous:false,method:"get",contentType:"application/json",onSuccess:function(c){var d={};
c.responseText.evalJSON().each(function(e){d[e.name]=e
}.bind(d));
ORYX.availablePlugins=[];
profile.plugins.each(function(e){ORYX.availablePlugins.push(d[e])
}.bind(d));
addScriptSequential(profile.plugins.map(function(e){return e+".js"
}),ORYX.PATH+"plugin/",a)
},onFailure:function(c){alert("Could not load Process Designer")
}})
},onFailure:function(b){alert("Could not load Process Designer")
}})
}new Ajax.Request(ORYX.PATH+"env",{asynchronous:false,method:"get",contentType:"application/json",onSuccess:function(a){addScriptSequential(a.responseText.evalJSON().files,ORYX.PATH,function(){loadLanguageFiles();
loadProfile(ORYX.load)
})
},onFailure:function(a){alert("Could not load Process Designer")
}});