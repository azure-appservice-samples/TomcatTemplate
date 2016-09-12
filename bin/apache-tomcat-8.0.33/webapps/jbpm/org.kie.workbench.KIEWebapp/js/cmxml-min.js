CodeMirror.defineMode("xml",function(x,k){var q=x.indentUnit;
var w=k.htmlMode?{autoSelfClosers:{br:true,img:true,hr:true,link:true,input:true,meta:true,col:true,frame:true,base:true,area:true},doNotIndent:{pre:true},allowUnquoted:true,allowMissing:false}:{autoSelfClosers:{},doNotIndent:{},allowUnquoted:false,allowMissing:false};
var a=k.alignCDATA;
var f,g;
function o(D,C){function A(F){C.tokenize=F;
return F(D,C)
}var B=D.next();
if(B=="<"){if(D.eat("!")){if(D.eat("[")){if(D.match("CDATA[")){return A(v("atom","]]>"))
}else{return null
}}else{if(D.match("--")){return A(v("comment","-->"))
}else{if(D.match("DOCTYPE",true,true)){D.eatWhile(/[\w\._\-]/);
return A(y(1))
}else{return null
}}}}else{if(D.eat("?")){D.eatWhile(/[\w\._\-]/);
C.tokenize=v("meta","?>");
return"meta"
}else{g=D.eat("/")?"closeTag":"openTag";
D.eatSpace();
f="";
var E;
while((E=D.eat(/[^\s\u00a0=<>\"\'\/?]/))){f+=E
}C.tokenize=n;
return"tag"
}}}else{if(B=="&"){var z;
if(D.eat("#")){if(D.eat("x")){z=D.eatWhile(/[a-fA-F\d]/)&&D.eat(";")
}else{z=D.eatWhile(/[\d]/)&&D.eat(";")
}}else{z=D.eatWhile(/[\w\.\-:]/)&&D.eat(";")
}return z?"atom":"error"
}else{D.eatWhile(/[^&<]/);
return null
}}}function n(B,A){var z=B.next();
if(z==">"||(z=="/"&&B.eat(">"))){A.tokenize=o;
g=z==">"?"endTag":"selfcloseTag";
return"tag"
}else{if(z=="="){g="equals";
return null
}else{if(/[\'\"]/.test(z)){A.tokenize=j(z);
return A.tokenize(B,A)
}else{B.eatWhile(/[^\s\u00a0=<>\"\'\/?]/);
return"word"
}}}}function j(z){return function(B,A){while(!B.eol()){if(B.next()==z){A.tokenize=n;
break
}}return"string"
}
}function v(A,z){return function(C,B){while(!C.eol()){if(C.match(z)){B.tokenize=o;
break
}C.next()
}return A
}
}function y(z){return function(C,B){var A;
while((A=C.next())!=null){if(A=="<"){B.tokenize=y(z+1);
return B.tokenize(C,B)
}else{if(A==">"){if(z==1){B.tokenize=o;
break
}else{B.tokenize=y(z-1);
return B.tokenize(C,B)
}}}}return"meta"
}
}var l,h;
function b(){for(var z=arguments.length-1;
z>=0;
z--){l.cc.push(arguments[z])
}}function e(){b.apply(null,arguments);
return true
}function i(z,B){var A=w.doNotIndent.hasOwnProperty(z)||(l.context&&l.context.noIndent);
l.context={prev:l.context,tagName:z,indent:l.indented,startOfLine:B,noIndent:A}
}function t(){if(l.context){l.context=l.context.prev
}}function d(z){if(z=="openTag"){l.tagName=f;
return e(m,c(l.startOfLine))
}else{if(z=="closeTag"){var A=false;
if(l.context){A=l.context.tagName!=f
}else{A=true
}if(A){h="error"
}return e(r(A))
}}return e()
}function c(z){return function(A){if(A=="selfcloseTag"||(A=="endTag"&&w.autoSelfClosers.hasOwnProperty(l.tagName.toLowerCase()))){return e()
}if(A=="endTag"){i(l.tagName,z);
return e()
}return e()
}
}function r(z){return function(A){if(z){h="error"
}if(A=="endTag"){t();
return e()
}h="error";
return e(arguments.callee)
}
}function m(z){if(z=="word"){h="attribute";
return e(p,m)
}if(z=="endTag"||z=="selfcloseTag"){return b()
}h="error";
return e(m)
}function p(z){if(z=="equals"){return e(u,m)
}if(!w.allowMissing){h="error"
}return(z=="endTag"||z=="selfcloseTag")?b():e()
}function u(z){if(z=="string"){return e(s)
}if(z=="word"&&w.allowUnquoted){h="string";
return e()
}h="error";
return(z=="endTag"||z=="selfCloseTag")?b():e()
}function s(z){if(z=="string"){return e(s)
}else{return b()
}}return{startState:function(){return{tokenize:o,cc:[],indented:0,startOfLine:true,tagName:null,context:null}
},token:function(C,B){if(C.sol()){B.startOfLine=true;
B.indented=C.indentation()
}if(C.eatSpace()){return null
}h=g=f=null;
var A=B.tokenize(C,B);
B.type=g;
if((A||g)&&A!="comment"){l=B;
while(true){var z=B.cc.pop()||d;
if(z(g||A)){break
}}}B.startOfLine=false;
return h||A
},indent:function(C,z,B){var A=C.context;
if((C.tokenize!=n&&C.tokenize!=o)||A&&A.noIndent){return B?B.match(/^(\s*)/)[0].length:0
}if(a&&/<!\[CDATA\[/.test(z)){return 0
}if(A&&/^<\//.test(z)){A=A.prev
}while(A&&!A.startOfLine){A=A.prev
}if(A){return A.indent+q
}else{return 0
}},compareStates:function(C,A){if(C.indented!=A.indented||C.tokenize!=A.tokenize){return false
}for(var B=C.context,z=A.context;
;
B=B.prev,z=z.prev){if(!B||!z){return B==z
}if(B.tagName!=z.tagName){return false
}}},electricChars:"/"}
});
CodeMirror.defineMIME("application/xml","xml");
CodeMirror.defineMIME("text/html",{name:"xml",htmlMode:true});