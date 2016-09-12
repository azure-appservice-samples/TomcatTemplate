CodeMirror.defineMode("htmlmixed",function(b,d){var a=CodeMirror.getMode(b,{name:"xml",htmlMode:true});
var c=CodeMirror.getMode(b,"javascript");
var i=CodeMirror.getMode(b,"css");
function e(l,k){var j=a.token(l,k.htmlState);
if(j=="tag"&&l.current()==">"&&k.htmlState.context){if(/^script$/i.test(k.htmlState.context.tagName)){k.token=h;
k.localState=c.startState(a.indent(k.htmlState,""));
k.mode="javascript"
}else{if(/^style$/i.test(k.htmlState.context.tagName)){k.token=f;
k.localState=i.startState(a.indent(k.htmlState,""));
k.mode="css"
}}}return j
}function g(n,j,k){var m=n.current();
var l=m.search(j);
if(l>-1){n.backUp(m.length-l)
}return k
}function h(k,j){if(k.match(/^<\/\s*script\s*>/i,false)){j.token=e;
j.localState=null;
j.mode="html";
return e(k,j)
}return g(k,/<\/\s*script\s*>/,c.token(k,j.localState))
}function f(k,j){if(k.match(/^<\/\s*style\s*>/i,false)){j.token=e;
j.localState=null;
j.mode="html";
return e(k,j)
}return g(k,/<\/\s*style\s*>/,i.token(k,j.localState))
}return{startState:function(){var j=a.startState();
return{token:e,localState:null,mode:"html",htmlState:j}
},copyState:function(k){if(k.localState){var j=CodeMirror.copyState(k.token==f?i:c,k.localState)
}return{token:k.token,localState:j,mode:k.mode,htmlState:CodeMirror.copyState(a,k.htmlState)}
},token:function(k,j){return j.token(k,j)
},indent:function(k,j){if(k.token==e||/^\s*<\//.test(j)){return a.indent(k.htmlState,j)
}else{if(k.token==h){return c.indent(k.localState,j)
}else{return i.indent(k.localState,j)
}}},compareStates:function(k,j){return a.compareStates(k.htmlState,j.htmlState)
},electricChars:"/{}:"}
});
CodeMirror.defineMIME("text/html","htmlmixed");