(function(){CodeMirror.hint=function(g,j,h,o){if(g.somethingSelected()){return
}var p=j(g);
if(!p||!p.list.length){return
}var l=p.list;
function m(i){g.replaceRange(i,p.from,p.to)
}if(l.length==1){m(l[0]);
return true
}var b=document.createElement("div");
b.className="CodeMirror-completions";
var c=b.appendChild(document.createElement("select"));
if(!window.opera){c.multiple=true
}for(var e=0;
e<l.length;
++e){var a=c.appendChild(document.createElement("option"));
a.appendChild(document.createTextNode(l[e]))
}c.firstChild.selected=true;
c.size=Math.min(10,l.length);
var k=g.cursorCoords();
b.style.left=k.x+"px";
b.style.top=k.yBot+"px";
b.style.position="fixed";
h.body.appendChild(b);
if(l.length<=10){b.style.width=(c.clientWidth-1)+"px"
}var d=false;
function n(){if(d){return
}d=true;
b.parentNode.removeChild(b)
}function f(){m(l[c.selectedIndex]);
n();
setTimeout(function(){g.focus()
},50)
}CodeMirror.connect(c,"blur",n);
CodeMirror.connect(c,"keydown",function(q){var i=q.keyCode;
if(i==13){CodeMirror.e_stop(q);
f()
}else{if(i==27){CodeMirror.e_stop(q);
n();
g.focus()
}else{if(i!=38&&i!=40){n();
g.focus();
g.triggerOnKeyDown(q);
setTimeout(function(){CodeMirror.hint(g,j)
},50)
}}}});
CodeMirror.connect(c,"dblclick",f);
c.focus();
if(window.opera){setTimeout(function(){if(!d){c.focus()
}},100)
}return true
}
})();