CodeMirror.defineMode("clike",function(c,e){var g=c.indentUnit,f=e.keywords||{},a=e.blockKeywords||{},h=e.atoms||{},p=e.hooks||{},i=e.multiLineStrings;
var b=/[+\-*&%=<>!?|\/]/;
var m;
function d(u,s){var r=u.next();
if(p[r]){var q=p[r](u,s);
if(q!==false){return q
}}if(r=='"'||r=="'"){s.tokenize=o(r);
return s.tokenize(u,s)
}if(/[\[\]{}\(\),;\:\.]/.test(r)){m=r;
return null
}if(/\d/.test(r)){u.eatWhile(/[\w\.]/);
return"number"
}if(r=="/"){if(u.eat("*")){s.tokenize=k;
return k(u,s)
}if(u.eat("/")){u.skipToEnd();
return"comment"
}}if(b.test(r)){u.eatWhile(b);
return"operator"
}u.eatWhile(/[\w\$_]/);
var t=u.current();
if(f.propertyIsEnumerable(t)){if(a.propertyIsEnumerable(t)){m="newstatement"
}return"keyword"
}if(h.propertyIsEnumerable(t)){return"atom"
}return"word"
}function o(q){return function(v,t){var u=false,s,r=false;
while((s=v.next())!=null){if(s==q&&!u){r=true;
break
}u=!u&&s=="\\"
}if(r||!(u||i)){t.tokenize=null
}return"string"
}
}function k(t,s){var q=false,r;
while(r=t.next()){if(r=="/"&&q){s.tokenize=null;
break
}q=(r=="*")
}return"comment"
}function n(u,r,q,t,s){this.indented=u;
this.column=r;
this.type=q;
this.align=t;
this.prev=s
}function j(s,q,r){return s.context=new n(s.indented,q,r,null,s.context)
}function l(r){var q=r.context.type;
if(q==")"||q=="]"||q=="}"){r.indented=r.context.indented
}return r.context=r.context.prev
}return{startState:function(q){return{tokenize:null,context:new n((q||0)-g,0,"top",false),indented:0,startOfLine:true}
},token:function(t,s){var q=s.context;
if(t.sol()){if(q.align==null){q.align=false
}s.indented=t.indentation();
s.startOfLine=true
}if(t.eatSpace()){return null
}m=null;
var r=(s.tokenize||d)(t,s);
if(r=="comment"||r=="meta"){return r
}if(q.align==null){q.align=true
}if((m==";"||m==":")&&q.type=="statement"){l(s)
}else{if(m=="{"){j(s,t.column(),"}")
}else{if(m=="["){j(s,t.column(),"]")
}else{if(m=="("){j(s,t.column(),")")
}else{if(m=="}"){while(q.type=="statement"){q=l(s)
}if(q.type=="}"){q=l(s)
}while(q.type=="statement"){q=l(s)
}}else{if(m==q.type){l(s)
}else{if(q.type=="}"||q.type=="top"||(q.type=="statement"&&m=="newstatement")){j(s,t.column(),"statement")
}}}}}}}s.startOfLine=false;
return r
},indent:function(u,r){if(u.tokenize!=d&&u.tokenize!=null){return 0
}var q=u.context,t=r&&r.charAt(0);
if(q.type=="statement"&&t=="}"){q=q.prev
}var s=t==q.type;
if(q.type=="statement"){return q.indented+(t=="{"?0:g)
}else{if(q.align){return q.column+(s?0:1)
}else{return q.indented+(s?0:g)
}}},electricChars:"{}"}
});
(function(){function c(h){var f={},g=h.split(" ");
for(var e=0;
e<g.length;
++e){f[g[e]]=true
}return f
}var a="auto if break int case long char register continue return default short do sizeof double static else struct entry switch extern typedef float union for unsigned goto while enum void const signed volatile";
function d(f,e){if(!e.startOfLine){return false
}f.skipToEnd();
return"meta"
}function b(g,f){var e;
while((e=g.next())!=null){if(e=='"'&&!g.eat('"')){f.tokenize=null;
break
}}return"string"
}CodeMirror.defineMIME("text/x-csrc",{name:"clike",keywords:c(a),blockKeywords:c("case do else for if switch while struct"),atoms:c("null"),hooks:{"#":d}});
CodeMirror.defineMIME("text/x-c++src",{name:"clike",keywords:c(a+" asm dynamic_cast namespace reinterpret_cast try bool explicit new static_cast typeid catch operator template typename class friend private this using const_cast inline public throw virtual delete mutable protected wchar_t"),blockKeywords:c("catch class do else finally for if struct switch try while"),atoms:c("true false null"),hooks:{"#":d}});
CodeMirror.defineMIME("text/x-java",{name:"clike",keywords:c("abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while kcontext function global rule when then end declare dialect salience query from accumulate collectinit action reverse result sum max min average count"),blockKeywords:c("catch class do else finally for if switch try while"),atoms:c("true false null"),hooks:{"@":function(f,e){f.eatWhile(/[\w\$_]/);
return"meta"
}}});
CodeMirror.defineMIME("text/x-csharp",{name:"clike",keywords:c("abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long namespace new object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw try typeof uint ulong unchecked unsafe ushort using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),blockKeywords:c("catch class do else finally for foreach if struct switch try while"),atoms:c("true false null"),hooks:{"@":function(f,e){if(f.eat('"')){e.tokenize=b;
return b(f,e)
}f.eatWhile(/[\w\$_]/);
return"meta"
}}})
}());