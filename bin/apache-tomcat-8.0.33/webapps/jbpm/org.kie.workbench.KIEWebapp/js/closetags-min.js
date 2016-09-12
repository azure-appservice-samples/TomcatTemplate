(function(){CodeMirror.defaults.closeTagEnabled=true;
CodeMirror.defaults.closeTagIndent=["applet","blockquote","body","button","div","dl","fieldset","form","frameset","h1","h2","h3","h4","h5","h6","head","html","iframe","layer","legend","object","ol","p","select","table","ul"];
CodeMirror.defineExtension("closeTag",function(l,e,h){if(!l.getOption("closeTagEnabled")){throw CodeMirror.Pass
}var i=l.getOption("mode");
if(i=="text/html"){var k=l.getCursor();
var m=l.getTokenAt(k);
var f=m.state;
if(f.mode&&f.mode!="html"){throw CodeMirror.Pass
}if(e==">"){var j=f.htmlState?f.htmlState.type:f.type;
if(m.className=="tag"&&j=="closeTag"){throw CodeMirror.Pass
}l.replaceSelection(">");
k={line:k.line,ch:k.ch+1};
l.setCursor(k);
m=l.getTokenAt(l.getCursor());
f=m.state;
j=f.htmlState?f.htmlState.type:f.type;
if(m.className=="tag"&&j!="selfcloseTag"){var g=f.htmlState?f.htmlState.context.tagName:f.tagName;
if(g.length>0){a(l,h,k,g)
}return
}l.setSelection({line:k.line,ch:k.ch-1},k);
l.replaceSelection("")
}else{if(e=="/"){if(m.className=="tag"&&m.string=="<"){var g=f.htmlState?(f.htmlState.context?f.htmlState.context.tagName:""):f.context.tagName;
if(g.length>0){b(l,k,g);
return
}}}}}else{if(i=="xmlpure"){var k=l.getCursor();
var m=l.getTokenAt(k);
var g=m.state.context.tagName;
if(e==">"){if(m.string==g){l.replaceSelection(">");
k={line:k.line,ch:k.ch+1};
l.setCursor(k);
a(l,h,k,g);
return
}}else{if(e=="/"){if(m.string=="<"){b(l,k,g);
return
}}}}}throw CodeMirror.Pass
});
function a(f,e,h,g){if(c(f,e,g)){f.replaceSelection("\n\n</"+g+">","end");
f.indentLine(h.line+1);
f.indentLine(h.line+2);
f.setCursor({line:h.line+1,ch:f.getLine(h.line+1).length})
}else{f.replaceSelection("</"+g+">");
f.setCursor(h)
}}function c(f,e,g){if(typeof e=="undefined"||e==null||e==true){e=f.getOption("closeTagIndent")
}if(!e){e=[]
}return d(e,g.toLowerCase())!=-1
}function d(j,f){if(j.indexOf){return j.indexOf(f)
}for(var g=0,h=j.length;
g<h;
++g){if(j[g]==f){return g
}}return -1
}function b(e,g,f){e.replaceSelection("/"+f+">");
e.setCursor({line:g.line,ch:g.ch+f.length+2})
}})();