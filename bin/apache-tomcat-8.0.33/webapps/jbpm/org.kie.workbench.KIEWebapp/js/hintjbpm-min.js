(function(){function g(h,k){for(var j=0,l=h.length;
j<l;
++j){k(h[j])
}}function f(h,k){if(!Array.prototype.indexOf){var j=h.length;
while(j--){if(h[j]===k){return true
}}return false
}return h.indexOf(k)!=-1
}function d(m,q,t,w){var k=ORYX.EDITOR.getSerializedJSON();
var z=jsonPath(k.evalJSON(),"$.properties.package");
var r=jsonPath(k.evalJSON(),"$.properties.id");
var s=new XMLHttpRequest;
var n=ORYX.PATH+"calledelement";
var i="action=showdatatypes&profile="+ORYX.PROFILE+"&uuid="+window.btoa(encodeURI(ORYX.UUID))+"&ppackage="+z+"&pid="+r;
s.open("POST",n,false);
s.setRequestHeader("Content-type","application/x-www-form-urlencoded");
s.send(i);
if(s.status==200){if(s.responseText&&s.responseText.length>0){try{var x=s.responseText.evalJSON();
var o="";
for(var A in x){var v=x[A];
o+=v;
o+=","
}if(o.endsWith(",")){o=o.substr(0,o.length-1)
}var l=m.getCursor(),p=w(m,l),u=p;
if(!/^[\w$_]*$/.test(p.string)){p=u={start:l.ch,end:l.ch,string:"",state:p.state,className:p.string=="."?"property":null}
}while(u.className=="property"){u=w(m,{line:l.line,ch:u.start});
if(u.string!="."){return
}u=w(m,{line:l.line,ch:u.start});
if(u.string==")"){var h=1;
do{u=w(m,{line:l.line,ch:u.start});
switch(u.string){case")":h++;
break;
case"(":h--;
break;
default:break
}}while(h>0);
u=w(m,{line:l.line,ch:u.start});
if(u.className=="variable"){u.className="function"
}else{return
}}if(!j){var j=[]
}j.push(u)
}if(t&&t=="form"){return{list:e(p,j,q),from:{line:l.line,ch:p.start},to:{line:l.line,ch:p.end}}
}else{return{list:b(p,j,q,o),from:{line:l.line,ch:p.start},to:{line:l.line,ch:p.end}}
}}catch(y){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error retrieving Data Types info  :\n"+y,title:""})
}}}}CodeMirror.jbpmHint=function(h){return d(h,a,"script",function(i,j){return i.getTokenAt(j)
})
};
CodeMirror.formsHint=function(h){return d(h,[],"form",function(i,j){return i.getTokenAt(j)
})
};
var a=("getProcessInstance() getNodeInstance() getVariable(variableName) setVariable(variableName,value) getKnowledgeRuntime()").split(" ");
var c=("return kcontext").split(" ");
function b(l,j,p,r){var v=[],h=l.string;
function m(w){if(w.indexOf(h)==0&&!f(v,w)){if(w.indexOf(":")>0){var i=w.split(":");
v.push(i[0])
}else{v.push(w)
}}}if(j){var q=j.pop().string;
if(q=="kcontext"){g(a,m)
}}else{g(c,m);
var t=ORYX.EDITOR.getSerializedJSON();
var u=jsonPath(t.evalJSON(),"$.properties.vardefs");
if(u){if(u.toString().length>0){g(u.toString().split(","),m)
}}var k=jsonPath(t.evalJSON(),"$.properties.globals");
if(k){if(k.toString().length>0){g(k.toString().split(","),m)
}}var s="";
var o=jsonPath(t.evalJSON(),"$.childShapes.*");
for(var n=0;
n<o.length;
n++){if(o[n].stencil.id=="DataObject"){s+=o[n].properties.name;
s+=","
}}if(s.endsWith(",")){s=s.substr(0,s.length-1)
}g(s.toString().split(","),m);
g(r.toString().split(","),m)
}return v
}function e(s,l,u){var y=[],p=s.string;
function w(j){if(j.indexOf(p)==0&&!f(y,j)){if(j.indexOf(":")>0){var i=j.split(":");
y.push(i[0])
}else{y.push(j)
}}}var I=ORYX.EDITOR._pluginFacade.getSelection();
if(I&&I.length==1){var h=I.first();
var H=h.resourceId;
var m=ORYX.EDITOR.getSerializedJSON();
var q=jsonPath(m.evalJSON(),"$.childShapes.*");
for(var E=0;
E<q.length;
E++){var C=q[E];
if(C.resourceId==H){var x=C.properties.datainputset;
var v=C.properties.dataoutputset;
var r=x.split(",");
for(var D=0;
D<r.length;
D++){var n=r[D];
if(n.indexOf(":")>0){var A=n.split(":");
w("${"+A[0]+"}")
}else{w("${"+n+"}")
}}var z=v.split(",");
for(var B=0;
B<z.length;
B++){var n=z[B];
if(n.indexOf(":")>0){var A=n.split(":");
w(A[0])
}else{w(n)
}}}}}else{var m=ORYX.EDITOR.getSerializedJSON();
var F=jsonPath(m.evalJSON(),"$.properties.vardefs");
if(F){if(F.toString().length>0){g(F.toString().split(","),w)
}}var G=jsonPath(m.evalJSON(),"$.properties.globals");
if(G){if(G.toString().length>0){g(G.toString().split(","),w)
}}var t="";
var o=jsonPath(m.evalJSON(),"$.childShapes.*");
for(var E=0;
E<o.length;
E++){if(o[E].stencil.id=="DataObject"){t+=o[E].properties.name;
t+=","
}}if(t.endsWith(",")){t=t.substr(0,t.length-1)
}g(t.toString().split(","),w)
}return y
}})();