CodeMirror.defineMode("css",function(e){var d=e.indentUnit,f;
function c(i,j){f=j;
return i
}function h(k,j){var i=k.next();
if(i=="@"){k.eatWhile(/[\w\\\-]/);
return c("meta",k.current())
}else{if(i=="/"&&k.eat("*")){j.tokenize=a;
return a(k,j)
}else{if(i=="<"&&k.eat("!")){j.tokenize=b;
return b(k,j)
}else{if(i=="="){c(null,"compare")
}else{if((i=="~"||i=="|")&&k.eat("=")){return c(null,"compare")
}else{if(i=='"'||i=="'"){j.tokenize=g(i);
return j.tokenize(k,j)
}else{if(i=="#"){k.eatWhile(/[\w\\\-]/);
return c("atom","hash")
}else{if(i=="!"){k.match(/^\s*\w*/);
return c("keyword","important")
}else{if(/\d/.test(i)){k.eatWhile(/[\w.%]/);
return c("number","unit")
}else{if(/[,.+>*\/]/.test(i)){return c(null,"select-op")
}else{if(/[;{}:\[\]]/.test(i)){return c(null,i)
}else{k.eatWhile(/[\w\\\-]/);
return c("variable","variable")
}}}}}}}}}}}}function a(l,k){var i=false,j;
while((j=l.next())!=null){if(i&&j=="/"){k.tokenize=h;
break
}i=(j=="*")
}return c("comment","comment")
}function b(l,k){var j=0,i;
while((i=l.next())!=null){if(j>=2&&i==">"){k.tokenize=h;
break
}j=(i=="-")?j+1:0
}return c("comment","comment")
}function g(i){return function(m,k){var l=false,j;
while((j=m.next())!=null){if(j==i&&!l){break
}l=!l&&j=="\\"
}if(!l){k.tokenize=h
}return c("string","string")
}
}return{startState:function(i){return{tokenize:h,baseIndent:i||0,stack:[]}
},token:function(l,k){if(l.eatSpace()){return null
}var j=k.tokenize(l,k);
var i=k.stack[k.stack.length-1];
if(f=="hash"&&i!="rule"){j="string-2"
}else{if(j=="variable"){if(i=="rule"){j="number"
}else{if(!i||i=="@media{"){j="tag"
}}}}if(i=="rule"&&/^[\{\};]$/.test(f)){k.stack.pop()
}if(f=="{"){if(i=="@media"){k.stack[k.stack.length-1]="@media{"
}else{k.stack.push("{")
}}else{if(f=="}"){k.stack.pop()
}else{if(f=="@media"){k.stack.push("@media")
}else{if(i=="{"&&f!="comment"){k.stack.push("rule")
}}}}return j
},indent:function(j,i){var k=j.stack.length;
if(/^\}/.test(i)){k-=j.stack[j.stack.length-1]=="rule"?2:1
}return j.baseIndent+k*d
},electricChars:"}"}
});
CodeMirror.defineMIME("text/css","css");