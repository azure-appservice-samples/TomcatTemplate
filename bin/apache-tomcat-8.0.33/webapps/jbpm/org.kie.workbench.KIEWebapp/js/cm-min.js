var CodeMirror=(function(){function r(aI,aF){var bU={},bf=r.defaults;
for(var av in bf){if(bf.hasOwnProperty(av)){bU[av]=(aF&&aF.hasOwnProperty(av)?aF:bf)[av]
}}var az=document.createElement("div");
az.className="CodeMirror"+(bU.lineWrapping?" CodeMirror-wrap":"");
az.innerHTML='<div style="overflow: hidden; position: relative; width: 3px; height: 0px;"><textarea style="position: absolute; padding: 0; width: 1px; height: 1em" wrap="off" autocorrect="off" autocapitalize="off"></textarea></div><div class="CodeMirror-scroll" tabindex="-1"><div style="position: relative"><div style="position: relative"><div class="CodeMirror-gutter"><div class="CodeMirror-gutter-text"></div></div><div class="CodeMirror-lines"><div style="position: relative; z-index: 0"><div style="position: absolute; width: 100%; height: 0; overflow: hidden; visibility: hidden;"></div><pre class="CodeMirror-cursor">&#160;</pre><div style="position: relative; z-index: -1"></div><div></div></div></div></div></div></div>';
if(aI.appendChild){aI.appendChild(az)
}else{aI(az)
}var bQ=az.firstChild,bi=bQ.firstChild,bg=az.lastChild,bG=bg.firstChild,b9=bG.firstChild,aD=b9.firstChild,aU=aD.firstChild,bp=aD.nextSibling.firstChild,aq=bp.firstChild,a8=aq.nextSibling,bc=a8.nextSibling,am=bc.nextSibling;
cw();
if(p){bi.style.width="0px"
}if(!f){bp.draggable=true
}bp.style.outline="none";
if(bU.tabindex!=null){bi.tabIndex=bU.tabindex
}if(!bU.gutter&&!bU.lineNumbers){aD.style.display="none"
}try{cm("x")
}catch(b1){if(b1.message.match(/runtime/i)){b1=new Error("A CodeMirror inside a P-style element does not work in Internet Explorer. (innerHTML bug)")
}throw b1
}var b0=new w(),ar=new w(),cI;
var b4,cr=new h([new ad([new e("")])]),ca,cc;
bM();
var cP={from:{line:0,ch:0},to:{line:0,ch:0},inverted:false};
var cb,bl,aV,bz=0,a7,cg=false,ck=false;
var ci,bZ,ax,cG,aL,bb,aO,ct;
var a9=0,cJ=0,bF=0,bH=0;
var bX;
var bx="",aB;
var al={};
an(function(){aS(bU.value||"");
ci=false
})();
var a4=new j();
o(bg,"mousedown",an(cd));
o(bg,"dblclick",an(bP));
o(bp,"dragstart",aE);
o(bp,"selectstart",P);
if(!J){o(bg,"contextmenu",aX)
}o(bg,"scroll",function(){bz=bg.scrollTop;
b6([]);
if(bU.fixedGutter){aD.style.left=bg.scrollLeft+"px"
}if(bU.onScroll){bU.onScroll(b2)
}});
o(window,"resize",function(){b6(true)
});
o(bi,"keyup",an(ce));
o(bi,"input",aM);
o(bi,"keydown",an(b5));
o(bi,"keypress",an(bj));
o(bi,"focus",cN);
o(bi,"blur",aA);
o(bg,"dragenter",t);
o(bg,"dragover",t);
o(bg,"drop",an(aj));
o(bg,"paste",function(){bu();
aM()
});
o(bi,"paste",aM);
o(bi,"cut",an(function(){if(!bU.readOnly){bn("")
}}));
var cp;
try{cp=(document.activeElement==bi)
}catch(b1){}if(cp){setTimeout(cN,20)
}else{aA()
}function bm(cS){return cS>=0&&cS<cr.size
}var b2=az.CodeMirror={getValue:bV,setValue:an(aS),getSelection:bW,replaceSelection:an(bn),focus:function(){window.focus();
bu();
cN();
aM()
},setOption:function(cT,cU){var cS=bU[cT];
bU[cT]=cU;
if(cT=="mode"||cT=="indentUnit"){bM()
}else{if(cT=="readOnly"&&cU=="nocursor"){aA();
bi.blur()
}else{if(cT=="readOnly"&&!cU){cv(true)
}else{if(cT=="theme"){cw()
}else{if(cT=="lineWrapping"&&cS!=cU){an(cz)()
}else{if(cT=="tabSize"){b6(true)
}}}}}}if(cT=="lineNumbers"||cT=="gutter"||cT=="firstLineNumber"||cT=="theme"){ba();
b6(true)
}},getOption:function(cS){return bU[cS]
},undo:an(cM),redo:an(cC),indentLine:an(function(cT,cS){if(typeof cS!="string"){if(cS==null){cS=bU.smartIndent?"smart":"prev"
}else{cS=cS?"add":"subtract"
}}if(bm(cT)){bt(cT,cS)
}}),indentSelection:an(cu),historySize:function(){return{undo:a4.done.length,redo:a4.undone.length}
},clearHistory:function(){a4=new j()
},matchBrackets:an(function(){b7(true)
}),getTokenAt:an(function(cS){cS=aP(cS);
return cy(cS.line).getTokenAt(b4,cn(cS.line),cS.ch)
}),getStateAfter:function(cS){cS=bS(cS==null?cr.size-1:cS);
return cn(cS+1)
},cursorCoords:function(cT,cS){if(cT==null){cT=cP.inverted
}return this.charCoords(cT?cP.from:cP.to,cS)
},charCoords:function(cT,cS){cT=aP(cT);
if(cS=="local"){return cK(cT,false)
}if(cS=="div"){return cK(cT,true)
}return ak(cT)
},coordsChar:function(cS){var cT=ag(bp);
return bB(cS.x-cT.left,cS.y-cT.top)
},markText:an(by),setBookmark:aQ,setMarker:an(bO),clearMarker:an(ap),setLineClass:an(bh),hideLine:an(function(cS){return cD(cS,true)
}),showLine:an(function(cS){return cD(cS,false)
}),onDeleteLine:function(cS,cT){if(typeof cS=="number"){if(!bm(cS)){return null
}cS=cy(cS)
}(cS.handlers||(cS.handlers=[])).push(cT);
return cS
},lineInfo:aR,addWidget:function(cW,cU,cY,cV,c0){cW=cK(aP(cW));
var cX=cW.yBot,cT=cW.x;
cU.style.position="absolute";
bG.appendChild(cU);
if(cV=="over"){cX=cW.y
}else{if(cV=="near"){var cS=Math.max(bg.offsetHeight,cr.height*bI()),cZ=Math.max(bG.clientWidth,bp.clientWidth)-a1();
if(cW.yBot+cU.offsetHeight>cS&&cW.y>cU.offsetHeight){cX=cW.y-cU.offsetHeight
}if(cT+cU.offsetWidth>cZ){cT=cZ-cU.offsetWidth
}}}cU.style.top=(cX+cl())+"px";
cU.style.left=cU.style.right="";
if(c0=="right"){cT=bG.clientWidth-cU.offsetWidth;
cU.style.right="0px"
}else{if(c0=="left"){cT=0
}else{if(c0=="middle"){cT=(bG.clientWidth-cU.offsetWidth)/2
}}cU.style.left=(cT+a1())+"px"
}if(cY){aw(cT,cX,cT+cU.offsetWidth,cX+cU.offsetHeight)
}},lineCount:function(){return cr.size
},clipPos:aP,getCursor:function(cS){if(cS==null){cS=cP.inverted
}return W(cS?cP.from:cP.to)
},somethingSelected:function(){return !Z(cP.from,cP.to)
},setCursor:an(function(cS,cU,cT){if(cU==null&&typeof cS.line=="number"){a2(cS.line,cS.ch,cT)
}else{a2(cS,cU,cT)
}}),setSelection:an(function(cU,cT,cS){(cS?bs:br)(aP(cU),aP(cT||cU))
}),getLine:function(cS){if(bm(cS)){return cy(cS).text
}},getLineHandle:function(cS){if(bm(cS)){return cy(cS)
}},setLine:an(function(cS,cT){if(bm(cS)){bJ(cT,{line:cS,ch:0},{line:cS,ch:cy(cS).text.length})
}}),removeLine:an(function(cS){if(bm(cS)){bJ("",{line:cS,ch:0},aP({line:cS+1,ch:0}))
}}),replaceRange:an(bJ),getRange:function(cT,cS){return cH(aP(cT),aP(cS))
},triggerOnKeyDown:an(b5),execCommand:function(cS){return H[cS](b2)
},moveH:an(cx),deleteH:an(cf),moveV:an(cq),toggleOverwrite:function(){if(cg){cg=false;
a8.className=a8.className.replace(" CodeMirror-overwrite","")
}else{cg=true;
a8.className+=" CodeMirror-overwrite"
}},posFromIndex:function(cT){var cU=0,cS;
cr.iter(0,cr.size,function(cV){var cW=cV.text.length+1;
if(cW>cT){cS=cT;
return true
}cT-=cW;
++cU
});
return aP({line:cU,ch:cS})
},indexFromPos:function(cT){if(cT.line<0||cT.ch<0){return 0
}var cS=cT.ch;
cr.iter(0,cT.line,function(cU){cS+=cU.text.length+1
});
return cS
},scrollTo:function(cS,cT){if(cS!=null){bg.scrollLeft=cS
}if(cT!=null){bg.scrollTop=cT
}b6([])
},operation:function(cS){return an(cS)()
},refresh:function(){b6(true);
if(bg.scrollHeight>bz){bg.scrollTop=bz
}},getInputField:function(){return bi
},getWrapperElement:function(){return az
},getScrollerElement:function(){return bg
},getGutterElement:function(){return aD
}};
function cy(cS){return z(cr,cS)
}function aZ(cT,cS){aO=true;
var cU=cS-cT.height;
for(var cV=cT;
cV;
cV=cV.parent){cV.height+=cU
}}function aS(cS){var cT={line:0,ch:0};
aK(cT,{line:cr.size-1,ch:cy(cr.size-1).text.length},x(cS),cT,cT);
ci=true
}function bV(cS){var cT=[];
cr.iter(0,cr.size,function(cU){cT.push(cU.text)
});
return cT.join("\n")
}function cd(cZ){a0(v(cZ,"shiftKey"));
for(var cV=i(cZ);
cV!=az;
cV=cV.parentNode){if(cV.parentNode==bG&&cV!=b9){return
}}for(var cV=i(cZ);
cV!=az;
cV=cV.parentNode){if(cV.parentNode==aU){if(bU.onGutterClick){bU.onGutterClick(b2,n(aU.childNodes,cV)+cJ,cZ)
}return P(cZ)
}}var cS=aY(cZ);
switch(u(cZ)){case 3:if(J&&!I){aX(cZ)
}return;
case 2:if(cS){a2(cS.line,cS.ch,true)
}return
}if(!cS){if(i(cZ)==bg){P(cZ)
}return
}if(!cc){cN()
}var cT=+new Date;
if(aV&&aV.time>cT-400&&Z(aV.pos,cS)){P(cZ);
setTimeout(bu,20);
return aG(cS.line)
}else{if(bl&&bl.time>cT-400&&Z(bl.pos,cS)){aV={time:cT,pos:cS};
P(cZ);
return bC(cS)
}else{bl={time:cT,pos:cS}
}}var c1=cS,cU;
if(B&&!bU.readOnly&&!Z(cP.from,cP.to)&&!V(cS,cP.from)&&!V(cP.to,cS)){if(f){bp.draggable=true
}var cY=o(document,"mouseup",an(function(c2){if(f){bp.draggable=false
}a7=false;
cY();
if(Math.abs(cZ.clientX-c2.clientX)+Math.abs(cZ.clientY-c2.clientY)<10){P(c2);
a2(cS.line,cS.ch,true);
bu()
}}),true);
a7=true;
if(bp.dragDrop){bp.dragDrop()
}return
}P(cZ);
a2(cS.line,cS.ch,true);
function c0(c2){var c4=aY(c2,true);
if(c4&&!Z(c4,c1)){if(!cc){cN()
}c1=c4;
bs(cS,c4);
ci=false;
var c3=bv();
if(c4.line>=c3.to||c4.line<c3.from){cU=setTimeout(an(function(){c0(c2)
}),150)
}}}function cX(c2){clearTimeout(cU);
var c3=aY(c2);
if(c3){bs(cS,c3)
}P(c2);
bu();
ci=true;
cW();
cY()
}var cW=o(document,"mousemove",an(function(c2){clearTimeout(cU);
P(c2);
if(!E&&!u(c2)){cX(c2)
}else{c0(c2)
}}),true);
var cY=o(document,"mouseup",an(cX),true)
}function bP(cS){for(var cU=i(cS);
cU!=az;
cU=cU.parentNode){if(cU.parentNode==aU){return P(cS)
}}var cT=aY(cS);
if(!cT){return
}aV={time:+new Date,pos:cT};
P(cS);
bC(cT)
}function aj(cY){cY.preventDefault();
var cZ=aY(cY,true),cS=cY.dataTransfer.files;
if(!cZ||bU.readOnly){return
}if(cS&&cS.length&&window.FileReader&&window.File){function cV(c4,c3){var c2=new FileReader;
c2.onload=function(){c1[c3]=c2.result;
if(++cT==cU){cZ=aP(cZ);
an(function(){var c5=bJ(c1.join(""),cZ,cZ);
bs(cZ,c5)
})()
}};
c2.readAsText(c4)
}var cU=cS.length,c1=Array(cU),cT=0;
for(var cW=0;
cW<cU;
++cW){cV(cS[cW],cW)
}}else{try{var c1=cY.dataTransfer.getData("Text");
if(c1){var c0=cP.from,cX=cP.to;
bs(cZ,cZ);
if(a7){bJ("",c0,cX)
}bn(c1);
bu()
}}catch(cY){}}}function aE(cU){var cS=bW();
cU.dataTransfer.setData("Text",cS);
if(J||ab){var cT=document.createElement("img");
cT.scr="data:image/gif;base64,R0lGODdhAgACAIAAAAAAAP///ywAAAAAAgACAAACAoRRADs=";
cU.dataTransfer.setDragImage(cT,0,0)
}}function be(cU,cS){if(typeof cU=="string"){cU=H[cU];
if(!cU){return false
}}var cT=cb;
try{if(bU.readOnly){ck=true
}if(cS){cb=null
}cU(b2)
}catch(cV){if(cV!=X){throw cV
}return false
}finally{cb=cT;
ck=false
}return true
}function cE(cW){var cS=c(bU.keyMap),cU=cS.auto;
clearTimeout(bw);
if(cU&&!M(cW)){bw=setTimeout(function(){if(c(bU.keyMap)==cS){bU.keyMap=(cU.call?cU.call(null,b2):cU)
}},50)
}var cT=N[v(cW,"keyCode")],cV=false;
if(cT==null||cW.altGraphKey){return false
}if(v(cW,"altKey")){cT="Alt-"+cT
}if(v(cW,"ctrlKey")){cT="Ctrl-"+cT
}if(v(cW,"metaKey")){cT="Cmd-"+cT
}if(v(cW,"shiftKey")){cV=k("Shift-"+cT,bU.extraKeys,bU.keyMap,function(cX){return be(cX,true)
})||k(cT,bU.extraKeys,bU.keyMap,function(cX){if(typeof cX=="string"&&/^go/.test(cX)){return be(cX)
}})
}else{cV=k(cT,bU.extraKeys,bU.keyMap,be)
}if(cV){P(cW);
if(E){cW.oldKeyCode=cW.keyCode;
cW.keyCode=0
}}return cV
}function bR(cU,cS){var cT=k("'"+cS+"'",bU.extraKeys,bU.keyMap,be);
if(cT){P(cU)
}return cT
}var cB=null,bw;
function b5(cU){if(!cc){cN()
}if(E&&cU.keyCode==27){cU.returnValue=false
}if(bo){if(bE()){bo=false
}}if(bU.onKeyEvent&&bU.onKeyEvent(b2,K(cU))){return
}var cS=v(cU,"keyCode");
a0(cS==16||v(cU,"shiftKey"));
var cT=cE(cU);
if(window.opera){cB=cT?cS:null;
if(!cT&&cS==88&&v(cU,I?"metaKey":"ctrlKey")){bn("")
}}}function bj(cV){if(bo){bE()
}if(bU.onKeyEvent&&bU.onKeyEvent(b2,K(cV))){return
}var cU=v(cV,"keyCode"),cS=v(cV,"charCode");
if(window.opera&&cU==cB){cB=null;
P(cV);
return
}if(window.opera&&!cV.which&&cE(cV)){return
}var cT=String.fromCharCode(cS==null?cU:cS);
if(bU.electricChars&&b4.electricChars&&bU.smartIndent&&!bU.readOnly){if(b4.electricChars.indexOf(cT)>-1){setTimeout(an(function(){bt(cP.to.line,"smart")
}),75)
}}if(bR(cV,cT)){return
}aM()
}function ce(cS){if(bU.onKeyEvent&&bU.onKeyEvent(b2,K(cS))){return
}if(v(cS,"keyCode")==16){cb=null
}}function cN(){if(bU.readOnly=="nocursor"){return
}if(!cc){if(bU.onFocus){bU.onFocus(b2)
}cc=true;
if(az.className.search(/\bCodeMirror-focused\b/)==-1){az.className+=" CodeMirror-focused"
}if(!bb){cv(true)
}}ai();
cF()
}function aA(){if(cc){if(bU.onBlur){bU.onBlur(b2)
}cc=false;
if(bX){an(function(){if(bX){bX();
bX=null
}})()
}az.className=az.className.replace(" CodeMirror-focused","")
}clearInterval(cI);
setTimeout(function(){if(!cc){cb=null
}},150)
}function aK(cX,cW,cV,cT,cS){if(ck){return
}if(a4){var cU=[];
cr.iter(cX.line,cW.line+1,function(cY){cU.push(cY.text)
});
a4.addChange(cX.line,cV.length,cU);
while(a4.done.length>bU.undoDepth){a4.done.shift()
}}ao(cX,cW,cV,cT,cS)
}function b3(cX,cY){if(!cX.length){return
}var cZ=cX.pop(),cT=[];
for(var cU=cZ.length-1;
cU>=0;
cU-=1){var cW=cZ[cU];
var c0=[],cS=cW.start+cW.added;
cr.iter(cW.start,cS,function(c1){c0.push(c1.text)
});
cT.push({start:cW.start,added:cW.old.length,old:c0});
var cV=aP({line:cW.start+cW.old.length-1,ch:S(c0[c0.length-1],cW.old[cW.old.length-1])});
ao({line:cW.start,ch:0},{line:cS-1,ch:cy(cS-1).text.length},cW.old,cV,cV)
}ci=true;
cY.push(cT)
}function cM(){b3(a4.done,a4.undone)
}function cC(){b3(a4.undone,a4.done)
}function ao(c7,cW,dd,cS,de){if(ck){return
}var dc=false,cV=bx.length;
if(!bU.lineWrapping){cr.iter(c7.line,cW.line,function(df){if(df.text.length==cV){dc=true;
return true
}})
}if(c7.line!=cW.line||dd.length>1){aO=true
}var c4=cW.line-c7.line,c3=cy(c7.line),cT=cy(cW.line);
if(c7.ch==0&&cW.ch==0&&dd[dd.length-1]==""){var c1=[],c2=null;
if(c7.line){c2=cy(c7.line-1);
c2.fixMarkEnds(cT)
}else{cT.fixMarkStarts()
}for(var c9=0,db=dd.length-1;
c9<db;
++c9){c1.push(e.inheritMarks(dd[c9],c2))
}if(c4){cr.remove(c7.line,c4,ct)
}if(c1.length){cr.insert(c7.line,c1)
}}else{if(c3==cT){if(dd.length==1){c3.replace(c7.ch,cW.ch,dd[0])
}else{cT=c3.split(cW.ch,dd[dd.length-1]);
c3.replace(c7.ch,null,dd[0]);
c3.fixMarkEnds(cT);
var c1=[];
for(var c9=1,db=dd.length-1;
c9<db;
++c9){c1.push(e.inheritMarks(dd[c9],c3))
}c1.push(cT);
cr.insert(c7.line+1,c1)
}}else{if(dd.length==1){c3.replace(c7.ch,null,dd[0]);
cT.replace(null,cW.ch,"");
c3.append(cT);
cr.remove(c7.line+1,c4,ct)
}else{var c1=[];
c3.replace(c7.ch,null,dd[0]);
cT.replace(null,cW.ch,dd[dd.length-1]);
c3.fixMarkEnds(cT);
for(var c9=1,db=dd.length-1;
c9<db;
++c9){c1.push(e.inheritMarks(dd[c9],c3))
}if(c4>1){cr.remove(c7.line+1,c4-1,ct)
}cr.insert(c7.line+1,c1)
}}}if(bU.lineWrapping){var cY=bg.clientWidth/bd()-3;
cr.iter(c7.line,c7.line+dd.length,function(df){if(df.hidden){return
}var dg=Math.ceil(df.text.length/cY)||1;
if(dg!=df.height){aZ(df,dg)
}})
}else{cr.iter(c7.line,c9+dd.length,function(dg){var df=dg.text;
if(df.length>cV){bx=df;
cV=df.length;
aB=null;
dc=false
}});
if(dc){cV=0;
bx="";
aB=null;
cr.iter(0,cr.size,function(dg){var df=dg.text;
if(df.length>cV){cV=df.length;
bx=df
}})
}}var cU=[],c0=dd.length-c4-1;
for(var c9=0,c6=ca.length;
c9<c6;
++c9){var da=ca[c9];
if(da<c7.line){cU.push(da)
}else{if(da>cW.line){cU.push(da+c0)
}}}var c8=c7.line+Math.min(dd.length,500);
cA(c7.line,c8);
cU.push(c8);
ca=cU;
bA(100);
ax.push({from:c7.line,to:cW.line+1,diff:c0});
var cZ={from:c7,to:cW,text:dd};
if(cG){for(var cX=cG;
cX.next;
cX=cX.next){}cX.next=cZ
}else{cG=cZ
}function c5(df){return df<=Math.min(cW.line,cW.line+c0)?df:df+c0
}br(cS,de,c5(cP.from.line),c5(cP.to.line));
if(bg.clientHeight){bG.style.height=(cr.height*bI()+2*cl())+"px"
}}function bJ(cT,cW,cV){cW=aP(cW);
if(!cV){cV=cW
}else{cV=aP(cV)
}cT=x(cT);
function cU(cZ){if(V(cZ,cW)){return cZ
}if(!V(cV,cZ)){return cS
}var cX=cZ.line+cT.length-(cV.line-cW.line)-1;
var cY=cZ.ch;
if(cZ.line==cV.line){cY+=cT[cT.length-1].length-(cV.ch-(cV.line==cW.line?cW.ch:0))
}return{line:cX,ch:cY}
}var cS;
ay(cT,cW,cV,function(cX){cS=cX;
return{from:cU(cP.from),to:cU(cP.to)}
});
return cS
}function bn(cS,cT){ay(x(cS),cP.from,cP.to,function(cU){if(cT=="end"){return{from:cU,to:cU}
}else{if(cT=="start"){return{from:cP.from,to:cP.from}
}else{return{from:cP.from,to:cU}
}}})
}function ay(cV,cX,cW,cS){var cU=cV.length==1?cV[0].length+cX.ch:cV[cV.length-1].length;
var cT=cS({line:cX.line+cV.length-1,ch:cU});
aK(cX,cW,cV,cT.from,cT.to)
}function cH(cW,cV){var cT=cW.line,cS=cV.line;
if(cT==cS){return cy(cT).text.slice(cW.ch,cV.ch)
}var cU=[cy(cT).text.slice(cW.ch)];
cr.iter(cT+1,cS,function(cX){cU.push(cX.text)
});
cU.push(cy(cS).text.slice(0,cV.ch));
return cU.join("\n")
}function bW(){return cH(cP.from,cP.to)
}var bo=false;
function ai(){if(bo){return
}b0.set(bU.pollInterval,function(){aJ();
bE();
if(cc){ai()
}au()
})
}function aM(){var cS=false;
bo=true;
function cT(){aJ();
var cU=bE();
if(!cU&&!cS){cS=true;
b0.set(60,cT)
}else{bo=false;
ai()
}au()
}b0.set(20,cT)
}var a6="";
function bE(){if(bb||!cc||aa(bi)||bU.readOnly){return false
}var cT=bi.value;
if(cT==a6){return false
}cb=null;
var cU=0,cS=Math.min(a6.length,cT.length);
while(cU<cS&&a6[cU]==cT[cU]){++cU
}if(cU<a6.length){cP.from={line:cP.from.line,ch:cP.from.ch-(a6.length-cU)}
}else{if(cg&&Z(cP.from,cP.to)){cP.to={line:cP.to.line,ch:Math.min(cy(cP.to.line).text.length,cP.to.ch+(cT.length-cU))}
}}bn(cT.slice(cU),"end");
a6=cT;
return true
}function cv(cS){if(!Z(cP.from,cP.to)){a6="";
bi.value=bW();
a(bi)
}else{if(cS){a6=bi.value=""
}}}function bu(){if(bU.readOnly!="nocursor"){bi.focus()
}}function cR(){if(!a8.getBoundingClientRect){return
}var cS=a8.getBoundingClientRect();
if(E&&cS.top==cS.bottom){return
}var cT=window.innerHeight||Math.max(document.body.offsetHeight,document.documentElement.offsetHeight);
if(cS.top<0||cS.bottom>cT){a8.scrollIntoView()
}}function b8(){var cT=cK(cP.inverted?cP.from:cP.to);
var cS=bU.lineWrapping?Math.min(cT.x,bp.offsetWidth):cT.x;
return aw(cS,cT.y,cS,cT.yBot)
}function aw(cU,cZ,cS,cY){var cW=a1(),c5=cl(),c1=bI();
cZ+=c5;
cY+=c5;
cU+=cW;
cS+=cW;
var c2=bg.clientHeight,cV=bg.scrollTop,cT=false,c4=true;
if(cZ<cV){bg.scrollTop=Math.max(0,cZ-2*c1);
cT=true
}else{if(cY>cV+c2){bg.scrollTop=cY+c1-c2;
cT=true
}}var c0=bg.clientWidth,c3=bg.scrollLeft;
var cX=bU.fixedGutter?aD.clientWidth:0;
if(cU<c3+cX){if(cU<50){cU=0
}bg.scrollLeft=Math.max(0,cU-10-cX);
cT=true
}else{if(cS>c0+c3-3){bg.scrollLeft=cS+10-c0;
cT=true;
if(cS>bG.clientWidth){c4=false
}}}if(cT&&bU.onScroll){bU.onScroll(b2)
}return c4
}function bv(){var cT=bI(),cV=bg.scrollTop-cl();
var cS=Math.max(0,Math.floor(cV/cT));
var cU=Math.ceil((cV+bg.clientHeight)/cT);
return{from:T(cr,cS),to:T(cr,cU)}
}function b6(c2,cX){if(!bg.clientWidth){cJ=bF=a9=0;
return
}var cV=bv();
if(c2!==true&&c2.length==0&&cV.from>cJ&&cV.to<bF){return
}var c3=Math.max(cV.from-100,0),c4=Math.min(cr.size,cV.to+100);
if(cJ<c3&&c3-cJ<20){c3=cJ
}if(bF>c4&&bF-c4<20){c4=Math.min(cr.size,bF)
}var c5=c2===true?[]:bT([{from:cJ,to:bF,domStart:0}],c2);
var c1=0;
for(var cY=0;
cY<c5.length;
++cY){var cZ=c5[cY];
if(cZ.from<c3){cZ.domStart+=(c3-cZ.from);
cZ.from=c3
}if(cZ.to>c4){cZ.to=c4
}if(cZ.from>=cZ.to){c5.splice(cY--,1)
}else{c1+=cZ.to-cZ.from
}}if(c1==c4-c3){return
}c5.sort(function(c7,c6){return c7.domStart-c6.domStart
});
var cU=bI(),cS=aD.style.display;
am.style.display="none";
aN(c3,c4,c5);
am.style.display=aD.style.display="";
var cT=c3!=cJ||c4!=bF||bH!=bg.clientHeight+cU;
if(cT){bH=bg.clientHeight+cU
}cJ=c3;
bF=c4;
a9=g(cr,c3);
b9.style.top=(a9*cU)+"px";
if(bg.clientHeight){bG.style.height=(cr.height*cU+2*cl())+"px"
}if(am.childNodes.length!=bF-cJ){throw new Error("BAD PATCH! "+JSON.stringify(c5)+" size="+(bF-cJ)+" nodes="+am.childNodes.length)
}if(bU.lineWrapping){aB=bg.clientWidth;
var cW=am.firstChild,c0=false;
cr.iter(cJ,bF,function(c7){if(!c7.hidden){var c6=Math.round(cW.offsetHeight/cU)||1;
if(c7.height!=c6){aZ(c7,c6);
aO=c0=true
}}cW=cW.nextSibling
});
if(c0){bG.style.height=(cr.height*cU+2*cl())+"px"
}}else{if(aB==null){aB=cm(bx)
}if(aB>bg.clientWidth){bp.style.width=aB+"px";
bG.style.width="";
bG.style.width=bg.scrollWidth+"px"
}else{bp.style.width=bG.style.width=""
}}aD.style.display=cS;
if(cT||aO){aH()
}cO();
if(!cX&&bU.onUpdate){bU.onUpdate(b2)
}return true
}function bT(c1,cZ){for(var cW=0,cU=cZ.length||0;
cW<cU;
++cW){var cY=cZ[cW],cS=[],c0=cY.diff||0;
for(var cV=0,cT=c1.length;
cV<cT;
++cV){var cX=c1[cV];
if(cY.to<=cX.from&&cY.diff){cS.push({from:cX.from+c0,to:cX.to+c0,domStart:cX.domStart})
}else{if(cY.to<=cX.from||cY.from>=cX.to){cS.push(cX)
}else{if(cY.from>cX.from){cS.push({from:cX.from,to:cY.from,domStart:cX.domStart})
}if(cY.to<cX.to){cS.push({from:cY.to+c0,to:cX.to+c0,domStart:cX.domStart+(cY.to-cX.from)})
}}}}c1=cS
}return c1
}function aN(c2,c3,c5){if(!c5.length){am.innerHTML=""
}else{function cS(c7){var c6=c7.nextSibling;
c7.parentNode.removeChild(c7);
return c6
}var cX=0,cV=am.firstChild,cT;
for(var cY=0;
cY<c5.length;
++cY){var c4=c5[cY];
while(c4.domStart>cX){cV=cS(cV);
cX++
}for(var cW=0,c0=c4.to-c4.from;
cW<c0;
++cW){cV=cV.nextSibling;
cX++
}}while(cV){cV=cS(cV)
}}var cZ=c5.shift(),cV=am.firstChild,cW=c2;
var c1=document.createElement("div"),cU;
cr.iter(c2,c3,function(c6){if(cZ&&cZ.to==cW){cZ=c5.shift()
}if(!cZ||cZ.from>cW){if(c6.hidden){var c7=c1.innerHTML="<pre></pre>"
}else{var c7="<pre"+(c6.className?' class="'+c6.className+'"':"")+">"+c6.getHTML(a5)+"</pre>";
if(c6.bgClassName){c7='<div style="position: relative"><pre class="'+c6.bgClassName+'" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: -2">&#160;</pre>'+c7+"</div>"
}}c1.innerHTML=c7;
am.insertBefore(c1.firstChild,cV)
}else{cV=cV.nextSibling
}++cW
})
}function aH(){if(!bU.gutter&&!bU.lineNumbers){return
}var cT=b9.offsetHeight,c0=bg.clientHeight;
aD.style.height=(cT-c0<2?c0:cT)+"px";
var cY=[],cX=cJ,cZ;
cr.iter(cJ,Math.max(bF,cJ+1),function(c2){if(c2.hidden){cY.push("<pre></pre>")
}else{var c1=c2.gutterMarker;
var c4=bU.lineNumbers?cX+bU.firstLineNumber:null;
if(c1&&c1.text){c4=c1.text.replace("%N%",c4!=null?c4:"")
}else{if(c4==null){c4="\u00a0"
}}cY.push((c1&&c1.style?'<pre class="'+c1.style+'">':"<pre>"),c4);
for(var c3=1;
c3<c2.height;
++c3){cY.push("<br/>&#160;")
}cY.push("</pre>");
if(!c1){cZ=cX
}}++cX
});
aD.style.display="none";
aU.innerHTML=cY.join("");
if(cZ!=null){var cV=aU.childNodes[cZ-cJ];
var cW=String(cr.size).length,cS=D(cV),cU="";
while(cS.length+cU.length<cW){cU+="\u00a0"
}if(cU){cV.insertBefore(document.createTextNode(cU),cV.firstChild)
}}aD.style.display="";
bp.style.marginLeft=aD.offsetWidth+"px";
aO=false
}function cO(){var cV=Z(cP.from,cP.to);
var c4=cK(cP.from,true);
var c0=cV?c4:cK(cP.to,true);
var cY=cP.inverted?c4:c0,cT=bI();
var cS=ag(az),cU=ag(am);
bQ.style.top=Math.max(0,Math.min(bg.offsetHeight,cY.y+cU.top-cS.top))+"px";
bQ.style.left=Math.max(0,Math.min(bg.offsetWidth,cY.x+cU.left-cS.left))+"px";
if(cV){a8.style.top=cY.y+"px";
a8.style.left=(bU.lineWrapping?Math.min(cY.x,bp.offsetWidth):cY.x)+"px";
a8.style.display="";
bc.style.display="none"
}else{var c2=c4.y==c0.y,cX="";
function c3(c8,c7,c6,c5){cX+='<div class="CodeMirror-selected" style="position: absolute; left: '+c8+"px; top: "+c7+"px; right: "+c6+"px; height: "+c5+'px"></div>'
}if(cP.from.ch&&c4.y>=0){var c1=c2?bp.clientWidth-c0.x:0;
c3(c4.x,c4.y,c1,cT)
}var cW=Math.max(0,c4.y+(cP.from.ch?cT:0));
var cZ=Math.min(c0.y,bp.clientHeight)-cW;
if(cZ>0.2*cT){c3(0,cW,0,cZ)
}if((!c2||!cP.from.ch)&&c0.y<bp.clientHeight-0.5*cT){c3(0,c0.y,bp.clientWidth-c0.x,cT)
}bc.innerHTML=cX;
a8.style.display="none";
bc.style.display=""
}}function a0(cS){if(cS){cb=cb||(cP.inverted?cP.to:cP.from)
}else{cb=null
}}function bs(cU,cT){var cS=cb&&aP(cb);
if(cS){if(V(cS,cU)){cU=cS
}else{if(V(cT,cS)){cT=cS
}}}br(cU,cT);
bZ=true
}function br(cY,cX,cS,cW){co=null;
if(cS==null){cS=cP.from.line;
cW=cP.to.line
}if(Z(cP.from,cY)&&Z(cP.to,cX)){return
}if(V(cX,cY)){var cV=cX;
cX=cY;
cY=cV
}if(cY.line!=cS){cY=bK(cY,cS,cP.from.ch)
}if(cX.line!=cW){cX=bK(cX,cW,cP.to.ch)
}if(Z(cY,cX)){cP.inverted=false
}else{if(Z(cY,cP.to)){cP.inverted=false
}else{if(Z(cX,cP.from)){cP.inverted=true
}}}if(bU.autoClearEmptyLines&&Z(cP.from,cP.to)){var cU=cP.inverted?cY:cX;
if(cU.line!=cP.from.line){var cT=cy(cP.from.line);
if(/^\s+$/.test(cT.text)){setTimeout(an(function(){if(cT.parent&&/^\s+$/.test(cT.text)){var cZ=U(cT);
bJ("",{line:cZ,ch:0},{line:cZ,ch:cT.text.length})
}},10))
}}}cP.from=cY;
cP.to=cX;
aL=true
}function bK(cW,cT,cU){function cV(cZ){var c1=cW.line+cZ,cY=cZ==1?cr.size:-1;
while(c1!=cY){var cX=cy(c1);
if(!cX.hidden){var c0=cW.ch;
if(c0>cU||c0>cX.text.length){c0=cX.text.length
}return{line:c1,ch:c0}
}c1+=cZ
}}var cS=cy(cW.line);
if(!cS.hidden){return cW
}if(cW.line>=cT){return cV(1)||cV(-1)
}else{return cV(-1)||cV(1)
}}function a2(cS,cU,cT){var cV=aP({line:cS,ch:cU||0});
(cT?bs:br)(cV,cV)
}function bS(cS){return Math.max(0,Math.min(cS,cr.size-1))
}function aP(cU){if(cU.line<0){return{line:0,ch:0}
}if(cU.line>=cr.size){return{line:cr.size-1,ch:cy(cr.size-1).text.length}
}var cS=cU.ch,cT=cy(cU.line).text.length;
if(cS==null||cS>cT){return{line:cU.line,ch:cT}
}else{if(cS<0){return{line:cU.line,ch:0}
}else{return cU
}}}function ch(cV,cZ){var cW=cP.inverted?cP.from:cP.to,c0=cW.line,cS=cW.ch;
var cY=cy(c0);
function cT(){for(var c1=c0+cV,c3=cV<0?-1:cr.size;
c1!=c3;
c1+=cV){var c2=cy(c1);
if(!c2.hidden){c0=c1;
cY=c2;
return true
}}}function cX(c1){if(cS==(cV<0?0:cY.text.length)){if(!c1&&cT()){cS=cV<0?cY.text.length:0
}else{return false
}}else{cS+=cV
}return true
}if(cZ=="char"){cX()
}else{if(cZ=="column"){cX(true)
}else{if(cZ=="word"){var cU=false;
for(;
;
){if(cV<0){if(!cX()){break
}}if(ac(cY.text.charAt(cS))){cU=true
}else{if(cU){if(cV<0){cV=1;
cX()
}break
}}if(cV>0){if(!cX()){break
}}}}}}return{line:c0,ch:cS}
}function cx(cS,cT){var cU=cS<0?cP.from:cP.to;
if(cb||Z(cP.from,cP.to)){cU=ch(cS,cT)
}a2(cU.line,cU.ch,true)
}function cf(cS,cT){if(!Z(cP.from,cP.to)){bJ("",cP.from,cP.to)
}else{if(cS<0){bJ("",ch(cS,cT),cP.to)
}else{bJ("",cP.from,ch(cS,cT))
}}bZ=true
}var co=null;
function cq(cS,cT){var cV=0,cW=cK(cP.inverted?cP.from:cP.to,true);
if(co!=null){cW.x=co
}if(cT=="page"){cV=Math.min(bg.clientHeight,window.innerHeight||document.documentElement.clientHeight)
}else{if(cT=="line"){cV=bI()
}}var cU=bB(cW.x,cW.y+cV*cS+2);
a2(cU.line,cU.ch,true);
co=cW.x
}function bC(cV){var cT=cy(cV.line).text;
var cU=cV.ch,cS=cV.ch;
while(cU>0&&ac(cT.charAt(cU-1))){--cU
}while(cS<cT.length&&ac(cT.charAt(cS))){++cS
}bs({line:cV.line,ch:cU},{line:cV.line,ch:cS})
}function aG(cS){bs({line:cS,ch:0},aP({line:cS+1,ch:0}))
}function cu(cU){if(Z(cP.from,cP.to)){return bt(cP.from.line,cU)
}var cT=cP.to.line-(cP.to.ch?0:1);
for(var cS=cP.from.line;
cS<=cT;
++cS){bt(cS,cU)
}}function bt(cU,c1){if(!c1){c1="add"
}if(c1=="smart"){if(!b4.indent){c1="prev"
}else{var cS=cn(cU)
}}var c2=cy(cU),cW=c2.indentation(bU.tabSize),cT=c2.text.match(/^\s*/)[0],cY;
if(c1=="prev"){if(cU){cY=cy(cU-1).indentation(bU.tabSize)
}else{cY=0
}}else{if(c1=="smart"){cY=b4.indent(cS,c2.text.slice(cT.length),c2.text)
}else{if(c1=="add"){cY=cW+bU.indentUnit
}else{if(c1=="subtract"){cY=cW-bU.indentUnit
}}}}cY=Math.max(0,cY);
var c0=cY-cW;
if(!c0){if(cP.from.line!=cU&&cP.to.line!=cU){return
}var cZ=cT
}else{var cZ="",cX=0;
if(bU.indentWithTabs){for(var cV=Math.floor(cY/bU.tabSize);
cV;
--cV){cX+=bU.tabSize;
cZ+="\t"
}}while(cX<cY){++cX;
cZ+=" "
}}bJ(cZ,{line:cU,ch:0},{line:cU,ch:cT.length})
}function bM(){b4=r.getMode(bU,bU.mode);
cr.iter(0,cr.size,function(cS){cS.stateAfter=null
});
ca=[0];
bA()
}function ba(){var cS=bU.gutter||bU.lineNumbers;
aD.style.display=cS?"":"none";
if(cS){aO=true
}else{am.parentNode.style.marginLeft=0
}}function cz(cU,cT){if(bU.lineWrapping){az.className+=" CodeMirror-wrap";
var cS=bg.clientWidth/bd()-3;
cr.iter(0,cr.size,function(cV){if(cV.hidden){return
}var cW=Math.ceil(cV.text.length/cS)||1;
if(cW!=1){aZ(cV,cW)
}});
bp.style.width=bG.style.width=""
}else{az.className=az.className.replace(" CodeMirror-wrap","");
aB=null;
bx="";
cr.iter(0,cr.size,function(cV){if(cV.height!=1&&!cV.hidden){aZ(cV,1)
}if(cV.text.length>bx.length){bx=cV.text
}})
}ax.push({from:0,to:cr.size})
}function a5(cT){var cS=bU.tabSize-cT%bU.tabSize,cV=al[cS];
if(cV){return cV
}for(var cW='<span class="cm-tab">',cU=0;
cU<cS;
++cU){cW+=" "
}return(al[cS]={html:cW+"</span>",width:cS})
}function cw(){bg.className=bg.className.replace(/\s*cm-s-\w+/g,"")+bU.theme.replace(/(^|\s)\s*/g," cm-s-")
}function cQ(){this.set=[]
}cQ.prototype.clear=an(function(){var cX=Infinity,cT=-Infinity;
for(var cW=0,cZ=this.set.length;
cW<cZ;
++cW){var cU=this.set[cW],cS=cU.marked;
if(!cS||!cU.parent){continue
}var cY=U(cU);
cX=Math.min(cX,cY);
cT=Math.max(cT,cY);
for(var cV=0;
cV<cS.length;
++cV){if(cS[cV].set==this.set){cS.splice(cV--,1)
}}}if(cX!=Infinity){ax.push({from:cX,to:cT+1})
}});
cQ.prototype.find=function(){var cX,cY;
for(var cU=0,cW=this.set.length;
cU<cW;
++cU){var c0=this.set[cU],cV=c0.marked;
for(var cT=0;
cT<cV.length;
++cT){var cS=cV[cT];
if(cS.set==this.set){if(cS.from!=null||cS.to!=null){var cZ=U(c0);
if(cZ!=null){if(cS.from!=null){cX={line:cZ,ch:cS.from}
}if(cS.to!=null){cY={line:cZ,ch:cS.to}
}}}}}}return{from:cX,to:cY}
};
function by(cY,cX,cU){cY=aP(cY);
cX=aP(cX);
var cS=new cQ();
if(!V(cY,cX)){return cS
}function cW(cZ,c2,c1,c0){cy(cZ).addMark(new G(c2,c1,c0,cS.set))
}if(cY.line==cX.line){cW(cY.line,cY.ch,cX.ch,cU)
}else{cW(cY.line,cY.ch,null,cU);
for(var cT=cY.line+1,cV=cX.line;
cT<cV;
++cT){cW(cT,null,null,cU)
}cW(cX.line,null,cX.ch,cU)
}ax.push({from:cY.line,to:cX.line+1});
return cS
}function aQ(cT){cT=aP(cT);
var cS=new C(cT.ch);
cy(cT.line).addMark(cS);
return cS
}function bO(cS,cU,cT){if(typeof cS=="number"){cS=cy(bS(cS))
}cS.gutterMarker={text:cU,style:cT};
aO=true;
return cS
}function ap(cS){if(typeof cS=="number"){cS=cy(bS(cS))
}cS.gutterMarker=null;
aO=true
}function aT(cT,cV){var cU=cT,cS=cT;
if(typeof cT=="number"){cS=cy(bS(cT))
}else{cU=U(cT)
}if(cU==null){return null
}if(cV(cS,cU)){ax.push({from:cU,to:cU+1})
}else{return null
}return cS
}function bh(cT,cS,cU){return aT(cT,function(cV){if(cV.className!=cS||cV.bgClassName!=cU){cV.className=cS;
cV.bgClassName=cU;
return true
}})
}function cD(cT,cS){return aT(cT,function(cU,cX){if(cU.hidden!=cS){cU.hidden=cS;
aZ(cU,cS?0:1);
var cW=cP.from.line,cV=cP.to.line;
if(cS&&(cW==cX||cV==cX)){var cZ=cW==cX?bK({line:cW,ch:0},cW,0):cP.from;
var cY=cV==cX?bK({line:cV,ch:0},cV,0):cP.to;
br(cZ,cY)
}return(aO=true)
}})
}function aR(cT){if(typeof cT=="number"){if(!bm(cT)){return null
}var cU=cT;
cT=cy(cT);
if(!cT){return null
}}else{var cU=U(cT);
if(cU==null){return null
}}var cS=cT.gutterMarker;
return{line:cU,handle:cT,text:cT.text,markerText:cS&&cS.text,markerClass:cS&&cS.style,lineClass:cT.className,bgClass:cT.bgClassName}
}function cm(cS){aq.innerHTML="<pre><span>x</span></pre>";
aq.firstChild.firstChild.firstChild.nodeValue=cS;
return aq.firstChild.firstChild.offsetWidth||10
}function aC(c4,cY){if(cY<=0){return 0
}var cV=cy(c4),c1=cV.text;
function c2(c5){aq.innerHTML="<pre><span>"+cV.getHTML(a5,c5)+"</span></pre>";
return aq.firstChild.firstChild.offsetWidth
}var cZ=0,cX=0,c0=c1.length,cW;
var cT=Math.min(c0,Math.ceil(cY/bd()));
for(;
;
){var cU=c2(cT);
if(cU<=cY&&cT<c0){cT=Math.min(c0,Math.ceil(cT*1.2))
}else{cW=cU;
c0=cT;
break
}}if(cY>cW){return c0
}cT=Math.floor(c0*0.8);
cU=c2(cT);
if(cU<cY){cZ=cT;
cX=cU
}for(;
;
){if(c0-cZ<=1){return(cW-cY>cY-cX)?cZ:c0
}var c3=Math.ceil((cZ+c0)/2),cS=c2(c3);
if(cS>cY){c0=c3;
cW=cS
}else{cZ=c3;
cX=cS
}}}var cs=Math.floor(Math.random()*16777215).toString(16);
function bY(cU,cX){if(cX==0){return{top:0,left:0}
}var cS="";
if(bU.lineWrapping){var cT=cU.text.indexOf(" ",cX+6);
cS=L(cU.text.slice(cX+1,cT<0?cU.text.length:cT+(E?5:0)))
}aq.innerHTML="<pre>"+cU.getHTML(a5,cX)+'<span id="CodeMirror-temp-'+cs+'">'+L(cU.text.charAt(cX)||" ")+"</span>"+cS+"</pre>";
var cW=document.getElementById("CodeMirror-temp-"+cs);
var cZ=cW.offsetTop,cY=cW.offsetLeft;
if(E&&cZ==0&&cY==0){var cV=document.createElement("span");
cV.innerHTML="x";
cW.parentNode.insertBefore(cV,cW.nextSibling);
cZ=cV.offsetTop
}return{top:cZ,left:cY}
}function cK(cX,cV){var cS,cT=bI(),cW=cT*(g(cr,cX.line)-(cV?a9:0));
if(cX.ch==0){cS=0
}else{var cU=bY(cy(cX.line),cX.ch);
cS=cU.left;
if(bU.lineWrapping){cW+=Math.max(0,cU.top)
}}return{x:cS,y:cW,yBot:cW+cT}
}function bB(c1,c0){if(c0<0){c0=0
}var cY=bI(),cW=bd(),c7=a9+Math.floor(c0/cY);
var c2=T(cr,c7);
if(c2>=cr.size){return{line:cr.size-1,ch:cy(cr.size-1).text.length}
}var cT=cy(c2),c4=cT.text;
var c9=bU.lineWrapping,cZ=c9?c7-g(cr,c2):0;
if(c1<=0&&cZ==0){return{line:c2,ch:0}
}function c8(db){var dc=bY(cT,db);
if(c9){var dd=Math.round(dc.top/cY);
return Math.max(0,dc.left+(dd-cZ)*bg.clientWidth)
}return dc.left
}var c6=0,c5=0,cU=c4.length,cS;
var c3=Math.min(cU,Math.ceil((c1+cZ*bg.clientWidth*0.9)/cW));
for(;
;
){var cX=c8(c3);
if(cX<=c1&&c3<cU){c3=Math.min(cU,Math.ceil(c3*1.2))
}else{cS=cX;
cU=c3;
break
}}if(c1>cS){return{line:c2,ch:cU}
}c3=Math.floor(cU*0.8);
cX=c8(c3);
if(cX<c1){c6=c3;
c5=cX
}for(;
;
){if(cU-c6<=1){return{line:c2,ch:(cS-c1>c1-c5)?c6:cU}
}var da=Math.ceil((c6+cU)/2),cV=c8(da);
if(cV>c1){cU=da;
cS=cV
}else{c6=da;
c5=cV
}}}function ak(cU){var cS=cK(cU,true),cT=ag(bp);
return{x:cT.left+cS.x,y:cT.top+cS.y,yBot:cT.top+cS.yBot}
}var aW,at,bN;
function bI(){if(bN==null){bN="<pre>";
for(var cT=0;
cT<49;
++cT){bN+="x<br/>"
}bN+="x</pre>"
}var cS=am.clientHeight;
if(cS==at){return aW
}at=cS;
aq.innerHTML=bN;
aW=aq.firstChild.offsetHeight/50||1;
aq.innerHTML="";
return aW
}var cL,bq=0;
function bd(){if(bg.clientWidth==bq){return cL
}bq=bg.clientWidth;
return(cL=cm("x"))
}function cl(){return bp.offsetTop
}function a1(){return bp.offsetLeft
}function aY(cW,cV){var cU=ag(bg,true),cS,cX;
try{cS=cW.clientX;
cX=cW.clientY
}catch(cW){return null
}if(!cV&&(cS-cU.left>bg.clientWidth||cX-cU.top>bg.clientHeight)){return null
}var cT=ag(bp,true);
return bB(cS-cT.left,cX-cT.top)
}function aX(cT){var cY=aY(cT),cX=bg.scrollTop;
if(!cY||window.opera){return
}if(Z(cP.from,cP.to)||V(cY,cP.from)||!V(cY,cP.to)){an(a2)(cY.line,cY.ch)
}var cW=bi.style.cssText;
bQ.style.position="absolute";
bi.style.cssText="position: fixed; width: 30px; height: 30px; top: "+(cT.clientY-5)+"px; left: "+(cT.clientX-5)+"px; z-index: 1000; background: white; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
bb=true;
var cV=bi.value=bW();
bu();
a(bi);
function cS(){var cZ=x(bi.value).join("\n");
if(cZ!=cV){an(bn)(cZ,"end")
}bQ.style.position="relative";
bi.style.cssText=cW;
if(y){bg.scrollTop=cX
}bb=false;
cv(true);
ai()
}if(J){t(cT);
var cU=o(window,"mouseup",function(){cU();
setTimeout(cS,20)
},true)
}else{setTimeout(cS,50)
}}function cF(){clearInterval(cI);
var cS=true;
a8.style.visibility="";
cI=setInterval(function(){a8.style.visibility=(cS=!cS)?"":"hidden"
},650)
}var bk={"(":")>",")":"(<","[":"]>","]":"[<","{":"}>","}":"{<"};
function b7(cY){var cS=cP.inverted?cP.from:cP.to,c0=cy(cS.line),cT=cS.ch-1;
var cX=(cT>=0&&bk[c0.text.charAt(cT)])||bk[c0.text.charAt(++cT)];
if(!cX){return
}var c1=cX.charAt(0),cZ=cX.charAt(1)==">",db=cZ?1:-1,c6=c0.styles;
for(var dc=cT+1,c8=0,da=c6.length;
c8<da;
c8+=2){if((dc-=c6[c8].length)<=0){var c9=c6[c8+1];
break
}}var cV=[c0.text.charAt(cT)],c5=/[(){}[\]]/;
function c3(dp,dj,dk){if(!dp.text){return
}var dn=dp.styles,di=cZ?0:dp.text.length-1,dl;
for(var df=cZ?0:dn.length-2,dh=cZ?dn.length:-2;
df!=dh;
df+=2*db){var dm=dn[df];
if(dn[df+1]!=null&&dn[df+1]!=c9){di+=db*dm.length;
continue
}for(var de=cZ?0:dm.length-1,dd=cZ?dm.length:-1;
de!=dd;
de+=db,di+=db){if(di>=dj&&di<dk&&c5.test(dl=dm.charAt(de))){var dg=bk[dl];
if(dg.charAt(1)==">"==cZ){cV.push(dl)
}else{if(cV.pop()!=dg.charAt(0)){return{pos:di,match:false}
}else{if(!cV.length){return{pos:di,match:true}
}}}}}}}for(var c8=cS.line,da=cZ?Math.min(c8+100,cr.size):Math.max(-1,c8-100);
c8!=da;
c8+=db){var c0=cy(c8),cW=c8==cS.line;
var c2=c3(c0,cW&&cZ?cT+1:0,cW&&!cZ?cT:c0.text.length);
if(c2){break
}}if(!c2){c2={pos:null,match:false}
}var c9=c2.match?"CodeMirror-matchingbracket":"CodeMirror-nonmatchingbracket";
var c7=by({line:cS.line,ch:cT},{line:cS.line,ch:cT+1},c9),cU=c2.pos!=null&&by({line:c8,ch:c2.pos},{line:c8,ch:c2.pos+1},c9);
var c4=an(function(){c7.clear();
cU&&cU.clear()
});
if(cY){setTimeout(c4,800)
}else{bX=c4
}}function a3(cY){var cX,cU;
for(var cT=cY,cV=cY-40;
cT>cV;
--cT){if(cT==0){return 0
}var cS=cy(cT-1);
if(cS.stateAfter){return cT
}var cW=cS.indentation(bU.tabSize);
if(cU==null||cX>cW){cU=cT-1;
cX=cW
}}return cU
}function cn(cU){var cT=a3(cU),cS=cT&&cy(cT-1).stateAfter;
if(!cS){cS=R(b4)
}else{cS=m(b4,cS)
}cr.iter(cT,cU,function(cV){cV.highlight(b4,cS,bU.tabSize);
cV.stateAfter=m(b4,cS)
});
if(cT<cU){ax.push({from:cT,to:cU})
}if(cU<cr.size&&!cy(cU).stateAfter){ca.push(cU)
}return cS
}function cA(cU,cS){var cT=cn(cU);
cr.iter(cU,cS,function(cV){cV.highlight(b4,cT,bU.tabSize);
cV.stateAfter=m(b4,cT)
})
}function bL(){var cY=+new Date+bU.workTime;
var c1=ca.length;
while(ca.length){if(!cy(cJ).stateAfter){var cV=cJ
}else{var cV=ca.pop()
}if(cV>=cr.size){continue
}var cT=a3(cV),cS=cT&&cy(cT-1).stateAfter;
if(cS){cS=m(b4,cS)
}else{cS=R(b4)
}var cX=0,cU=b4.compareStates,c0=false,cZ=cT,cW=false;
cr.iter(cZ,cr.size,function(c2){var c3=c2.stateAfter;
if(+new Date>cY){ca.push(cZ);
bA(bU.workDelay);
if(c0){ax.push({from:cV,to:cZ+1})
}return(cW=true)
}var c4=c2.highlight(b4,cS,bU.tabSize);
if(c4){c0=true
}c2.stateAfter=m(b4,cS);
if(cU){if(c3&&cU(c3,cS)){return true
}}else{if(c4!==false||!c3){cX=0
}else{if(++cX>3&&(!b4.indent||b4.indent(c3,"")==b4.indent(cS,""))){return true
}}}++cZ
});
if(cW){return
}if(c0){ax.push({from:cV,to:cZ+1})
}}if(c1&&bU.onHighlightComplete){bU.onHighlightComplete(b2)
}}function bA(cS){if(!ca.length){return
}ar.set(cS,an(bL))
}function aJ(){ci=bZ=cG=null;
ax=[];
aL=false;
ct=[]
}function au(){var cW=false,cT;
if(aL){cW=!b8()
}if(ax.length){cT=b6(ax,true)
}else{if(aL){cO()
}if(aO){aH()
}}if(cW){b8()
}if(aL){cR();
cF()
}if(cc&&!bb&&(ci===true||(ci!==false&&aL))){cv(bZ)
}if(aL&&bU.matchBrackets){setTimeout(an(function(){if(bX){bX();
bX=null
}if(Z(cP.from,cP.to)){b7(false)
}}),20)
}var cS=cG,cU=ct;
if(aL&&bU.onCursorActivity){bU.onCursorActivity(b2)
}if(cS&&bU.onChange&&b2){bU.onChange(b2,cS)
}for(var cV=0;
cV<cU.length;
++cV){cU[cV](b2)
}if(cT&&bU.onUpdate){bU.onUpdate(b2)
}}var cj=0;
function an(cS){return function(){if(!cj++){aJ()
}try{var cT=cS.apply(this,arguments)
}finally{if(!--cj){au()
}}return cT
}
}for(var bD in Y){if(Y.propertyIsEnumerable(bD)&&!b2.propertyIsEnumerable(bD)){b2[bD]=Y[bD]
}}return b2
}r.defaults={value:"",mode:null,theme:"default",indentUnit:2,indentWithTabs:false,smartIndent:true,tabSize:4,keyMap:"default",extraKeys:null,electricChars:true,autoClearEmptyLines:false,onKeyEvent:null,lineWrapping:false,lineNumbers:false,gutter:false,fixedGutter:false,firstLineNumber:1,readOnly:false,onChange:null,onCursorActivity:null,onGutterClick:null,onHighlightComplete:null,onUpdate:null,onFocus:null,onBlur:null,onScroll:null,matchBrackets:false,workTime:100,workDelay:200,pollInterval:100,undoDepth:40,tabindex:null};
var p=/AppleWebKit/.test(navigator.userAgent)&&/Mobile\/\w+/.test(navigator.userAgent);
var I=p||/Mac/.test(navigator.platform);
var Q=/Win/.test(navigator.platform);
var af={},O={};
r.defineMode=function(ai,aj){if(!r.defaults.mode&&ai!="null"){r.defaults.mode=ai
}af[ai]=aj
};
r.defineMIME=function(aj,ai){O[aj]=ai
};
r.resolveMode=function(ai){if(typeof ai=="string"&&O.hasOwnProperty(ai)){ai=O[ai]
}else{if(typeof ai=="string"&&/^[\w\-]+\/[\w\-]+\+xml$/.test(ai)){return r.resolveMode("application/xml")
}}if(typeof ai=="string"){return{name:ai}
}else{return ai||{name:"null"}
}};
r.getMode=function(aj,ai){var ai=r.resolveMode(ai);
var ak=af[ai.name];
if(!ak){if(window.console){console.warn("No mode "+ai.name+" found, falling back to plain text.")
}return r.getMode(aj,"text/plain")
}return ak(aj,ai)
};
r.listModes=function(){var aj=[];
for(var ai in af){if(af.propertyIsEnumerable(ai)){aj.push(ai)
}}return aj
};
r.listMIMEs=function(){var aj=[];
for(var ai in O){if(O.propertyIsEnumerable(ai)){aj.push({mime:ai,mode:O[ai]})
}}return aj
};
var Y=r.extensions={};
r.defineExtension=function(ai,aj){Y[ai]=aj
};
var H=r.commands={selectAll:function(ai){ai.setSelection({line:0,ch:0},{line:ai.lineCount()-1})
},killLine:function(ai){var al=ai.getCursor(true),ak=ai.getCursor(false),aj=!Z(al,ak);
if(!aj&&ai.getLine(al.line).length==al.ch){ai.replaceRange("",al,{line:al.line+1,ch:0})
}else{ai.replaceRange("",al,aj?ak:{line:al.line})
}},deleteLine:function(ai){var aj=ai.getCursor().line;
ai.replaceRange("",{line:aj,ch:0},{line:aj})
},undo:function(ai){ai.undo()
},redo:function(ai){ai.redo()
},goDocStart:function(ai){ai.setCursor(0,0,true)
},goDocEnd:function(ai){ai.setSelection({line:ai.lineCount()-1},null,true)
},goLineStart:function(ai){ai.setCursor(ai.getCursor().line,0,true)
},goLineStartSmart:function(ai){var al=ai.getCursor();
var ak=ai.getLine(al.line),aj=Math.max(0,ak.search(/\S/));
ai.setCursor(al.line,al.ch<=aj&&al.ch?0:aj,true)
},goLineEnd:function(ai){ai.setSelection({line:ai.getCursor().line},null,true)
},goLineUp:function(ai){ai.moveV(-1,"line")
},goLineDown:function(ai){ai.moveV(1,"line")
},goPageUp:function(ai){ai.moveV(-1,"page")
},goPageDown:function(ai){ai.moveV(1,"page")
},goCharLeft:function(ai){ai.moveH(-1,"char")
},goCharRight:function(ai){ai.moveH(1,"char")
},goColumnLeft:function(ai){ai.moveH(-1,"column")
},goColumnRight:function(ai){ai.moveH(1,"column")
},goWordLeft:function(ai){ai.moveH(-1,"word")
},goWordRight:function(ai){ai.moveH(1,"word")
},delCharLeft:function(ai){ai.deleteH(-1,"char")
},delCharRight:function(ai){ai.deleteH(1,"char")
},delWordLeft:function(ai){ai.deleteH(-1,"word")
},delWordRight:function(ai){ai.deleteH(1,"word")
},indentAuto:function(ai){ai.indentSelection("smart")
},indentMore:function(ai){ai.indentSelection("add")
},indentLess:function(ai){ai.indentSelection("subtract")
},insertTab:function(ai){ai.replaceSelection("\t","end")
},transposeChars:function(ai){var ak=ai.getCursor(),aj=ai.getLine(ak.line);
if(ak.ch>0&&ak.ch<aj.length-1){ai.replaceRange(aj.charAt(ak.ch)+aj.charAt(ak.ch-1),{line:ak.line,ch:ak.ch-1},{line:ak.line,ch:ak.ch+1})
}},newlineAndIndent:function(ai){ai.replaceSelection("\n","end");
ai.indentLine(ai.getCursor().line)
},toggleOverwrite:function(ai){ai.toggleOverwrite()
}};
var s=r.keyMap={};
s.basic={Left:"goCharLeft",Right:"goCharRight",Up:"goLineUp",Down:"goLineDown",End:"goLineEnd",Home:"goLineStartSmart",PageUp:"goPageUp",PageDown:"goPageDown",Delete:"delCharRight",Backspace:"delCharLeft",Tab:"indentMore","Shift-Tab":"indentLess",Enter:"newlineAndIndent",Insert:"toggleOverwrite"};
s.pcDefault={"Ctrl-A":"selectAll","Ctrl-D":"deleteLine","Ctrl-Z":"undo","Shift-Ctrl-Z":"redo","Ctrl-Y":"redo","Ctrl-Home":"goDocStart","Alt-Up":"goDocStart","Ctrl-End":"goDocEnd","Ctrl-Down":"goDocEnd","Ctrl-Left":"goWordLeft","Ctrl-Right":"goWordRight","Alt-Left":"goLineStart","Alt-Right":"goLineEnd","Ctrl-Backspace":"delWordLeft","Ctrl-Delete":"delWordRight","Ctrl-S":"save","Ctrl-F":"find","Ctrl-G":"findNext","Shift-Ctrl-G":"findPrev","Shift-Ctrl-F":"replace","Shift-Ctrl-R":"replaceAll",fallthrough:"basic"};
s.macDefault={"Cmd-A":"selectAll","Cmd-D":"deleteLine","Cmd-Z":"undo","Shift-Cmd-Z":"redo","Cmd-Y":"redo","Cmd-Up":"goDocStart","Cmd-End":"goDocEnd","Cmd-Down":"goDocEnd","Alt-Left":"goWordLeft","Alt-Right":"goWordRight","Cmd-Left":"goLineStart","Cmd-Right":"goLineEnd","Alt-Backspace":"delWordLeft","Ctrl-Alt-Backspace":"delWordRight","Alt-Delete":"delWordRight","Cmd-S":"save","Cmd-F":"find","Cmd-G":"findNext","Shift-Cmd-G":"findPrev","Cmd-Alt-F":"replace","Shift-Cmd-Alt-F":"replaceAll",fallthrough:["basic","emacsy"]};
s["default"]=I?s.macDefault:s.pcDefault;
s.emacsy={"Ctrl-F":"goCharRight","Ctrl-B":"goCharLeft","Ctrl-P":"goLineUp","Ctrl-N":"goLineDown","Alt-F":"goWordRight","Alt-B":"goWordLeft","Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd","Ctrl-V":"goPageUp","Shift-Ctrl-V":"goPageDown","Ctrl-D":"delCharRight","Ctrl-H":"delCharLeft","Alt-D":"delWordRight","Alt-Backspace":"delWordLeft","Ctrl-K":"killLine","Ctrl-T":"transposeChars"};
function c(ai){if(typeof ai=="string"){return s[ai]
}else{return ai
}}function k(aj,ai,am,ak){function al(ar){ar=c(ar);
var ap=ar[aj];
if(ap!=null&&ak(ap)){return true
}if(ar.catchall){return ak(ar.catchall)
}var ao=ar.fallthrough;
if(ao==null){return false
}if(Object.prototype.toString.call(ao)!="[object Array]"){return al(ao)
}for(var an=0,aq=ao.length;
an<aq;
++an){if(al(ao[an])){return true
}}return false
}if(ai&&al(ai)){return true
}return al(am)
}function M(aj){var ai=N[v(aj,"keyCode")];
return ai=="Ctrl"||ai=="Alt"||ai=="Shift"||ai=="Mod"
}r.fromTextArea=function(aj,al){if(!al){al={}
}al.value=aj.value;
if(!al.tabindex&&aj.tabindex){al.tabindex=aj.tabindex
}function an(){aj.value=ai.getValue()
}if(aj.form){var am=o(aj.form,"submit",an,true);
if(typeof aj.form.submit=="function"){var ak=aj.form.submit;
function ao(){an();
aj.form.submit=ak;
aj.form.submit();
aj.form.submit=ao
}aj.form.submit=ao
}}aj.style.display="none";
var ai=r(function(ap){aj.parentNode.insertBefore(ap,aj.nextSibling)
},al);
ai.save=an;
ai.getTextArea=function(){return aj
};
ai.toTextArea=function(){an();
aj.parentNode.removeChild(ai.getWrapperElement());
aj.style.display="";
if(aj.form){am();
if(typeof aj.form.submit=="function"){aj.form.submit=ak
}}};
return ai
};
function m(al,ai){if(ai===true){return ai
}if(al.copyState){return al.copyState(ai)
}var ak={};
for(var am in ai){var aj=ai[am];
if(aj instanceof Array){aj=aj.concat([])
}ak[am]=aj
}return ak
}r.copyState=m;
function R(ak,aj,ai){return ak.startState?ak.startState(aj,ai):true
}r.startState=R;
function b(ai,aj){this.pos=this.start=0;
this.string=ai;
this.tabSize=aj||8
}b.prototype={eol:function(){return this.pos>=this.string.length
},sol:function(){return this.pos==0
},peek:function(){return this.string.charAt(this.pos)
},next:function(){if(this.pos<this.string.length){return this.string.charAt(this.pos++)
}},eat:function(ai){var ak=this.string.charAt(this.pos);
if(typeof ai=="string"){var aj=ak==ai
}else{var aj=ak&&(ai.test?ai.test(ak):ai(ak))
}if(aj){++this.pos;
return ak
}},eatWhile:function(ai){var aj=this.pos;
while(this.eat(ai)){}return this.pos>aj
},eatSpace:function(){var ai=this.pos;
while(/[\s\u00a0]/.test(this.string.charAt(this.pos))){++this.pos
}return this.pos>ai
},skipToEnd:function(){this.pos=this.string.length
},skipTo:function(ai){var aj=this.string.indexOf(ai,this.pos);
if(aj>-1){this.pos=aj;
return true
}},backUp:function(ai){this.pos-=ai
},column:function(){return l(this.string,this.start,this.tabSize)
},indentation:function(){return l(this.string,null,this.tabSize)
},match:function(al,aj,ai){if(typeof al=="string"){function am(an){return ai?an.toLowerCase():an
}if(am(this.string).indexOf(am(al),this.pos)==this.pos){if(aj!==false){this.pos+=al.length
}return true
}}else{var ak=this.string.slice(this.pos).match(al);
if(ak&&aj!==false){this.pos+=ak[0].length
}return ak
}},current:function(){return this.string.slice(this.start,this.pos)
}};
r.StringStream=b;
function G(al,ak,ai,aj){this.from=al;
this.to=ak;
this.style=ai;
this.set=aj
}G.prototype={attach:function(ai){this.set.push(ai)
},detach:function(aj){var ai=n(this.set,aj);
if(ai>-1){this.set.splice(ai,1)
}},split:function(al,ai){if(this.to<=al&&this.to!=null){return null
}var ak=this.from<al||this.from==null?null:this.from-al+ai;
var aj=this.to==null?null:this.to-al+ai;
return new G(ak,aj,this.style,this.set)
},dup:function(){return new G(null,null,this.style,this.set)
},clipTo:function(aj,am,ai,al,ak){if(aj&&al>this.from&&(al<this.to||this.to==null)){this.from=null
}else{if(this.from!=null&&this.from>=am){this.from=Math.max(al,this.from)+ak
}}if(ai&&(am<this.to||this.to==null)&&(am>this.from||this.from==null)){this.to=null
}else{if(this.to!=null&&this.to>am){this.to=al<this.to?this.to+ak:am
}}},isDead:function(){return this.from!=null&&this.to!=null&&this.from>=this.to
},sameSet:function(ai){return this.set==ai.set
}};
function C(ai){this.from=ai;
this.to=ai;
this.line=null
}C.prototype={attach:function(ai){this.line=ai
},detach:function(ai){if(this.line==ai){this.line=null
}},split:function(aj,ai){if(aj<this.from){this.from=this.to=(this.from-aj)+ai;
return this
}},isDead:function(){return this.from>this.to
},clipTo:function(aj,am,ai,al,ak){if((aj||am<this.from)&&(ai||al>this.to)){this.from=0;
this.to=-1
}else{if(this.from>am){this.from=this.to=Math.max(al,this.from)+ak
}}},sameSet:function(ai){return false
},find:function(){if(!this.line||!this.line.parent){return null
}return{line:U(this.line),ch:this.from}
},clear:function(){if(this.line){var ai=n(this.line.marked,this);
if(ai!=-1){this.line.marked.splice(ai,1)
}this.line=null
}}};
function e(aj,ai){this.styles=ai||[aj,null];
this.text=aj;
this.height=1;
this.marked=this.gutterMarker=this.className=this.bgClassName=this.handlers=null;
this.stateAfter=this.parent=this.hidden=null
}e.inheritMarks=function(am,ap){var al=new e(am),ai=ap&&ap.marked;
if(ai){for(var ak=0;
ak<ai.length;
++ak){if(ai[ak].to==null&&ai[ak].style){var aj=al.marked||(al.marked=[]),ao=ai[ak];
var an=ao.dup();
aj.push(an);
an.attach(al)
}}}return al
};
e.prototype={replace:function(am,al,ap){var aq=[],ak=this.marked,an=al==null?this.text.length:al;
ah(0,am,this.styles,aq);
if(ap){aq.push(ap,null)
}ah(an,this.text.length,this.styles,aq);
this.styles=aq;
this.text=this.text.slice(0,am)+ap+this.text.slice(an);
this.stateAfter=null;
if(ak){var ao=ap.length-(an-am);
for(var aj=0;
aj<ak.length;
++aj){var ai=ak[aj];
ai.clipTo(am==null,am||0,al==null,an,ao);
if(ai.isDead()){ai.detach(this);
ak.splice(aj--,1)
}}}},split:function(ap,an){var al=[an,null],aj=this.marked;
ah(ap,this.text.length,this.styles,al);
var ak=new e(an+this.text.slice(ap),al);
if(aj){for(var am=0;
am<aj.length;
++am){var ao=aj[am];
var ai=ao.split(ap,an.length);
if(ai){if(!ak.marked){ak.marked=[]
}ak.marked.push(ai);
ai.attach(ak);
if(ai==ao){aj.splice(am--,1)
}}}}return ak
},append:function(aj){var ao=this.text.length,ai=aj.marked,am=this.marked;
this.text+=aj.text;
ah(0,aj.text.length,aj.styles,this.styles);
if(am){for(var an=0;
an<am.length;
++an){if(am[an].to==null){am[an].to=ao
}}}if(ai&&ai.length){if(!am){this.marked=am=[]
}outer:for(var an=0;
an<ai.length;
++an){var ap=ai[an];
if(!ap.from){for(var al=0;
al<am.length;
++al){var ak=am[al];
if(ak.to==ao&&ak.sameSet(ap)){ak.to=ap.to==null?null:ap.to+ao;
if(ak.isDead()){ak.detach(this);
ai.splice(an--,1)
}continue outer
}}}am.push(ap);
ap.attach(this);
ap.from+=ao;
if(ap.to!=null){ap.to+=ao
}}}},fixMarkEnds:function(aj){var ai=this.marked,am=aj.marked;
if(!ai){return
}for(var al=0;
al<ai.length;
++al){var ao=ai[al],an=ao.to==null;
if(an&&am){for(var ak=0;
ak<am.length;
++ak){if(am[ak].sameSet(ao)){an=false;
break
}}}if(an){ao.to=this.text.length
}}},fixMarkStarts:function(){var ai=this.marked;
if(!ai){return
}for(var aj=0;
aj<ai.length;
++aj){if(ai[aj].from==null){ai[aj].from=0
}}},addMark:function(ai){ai.attach(this);
if(this.marked==null){this.marked=[]
}this.marked.push(ai);
this.marked.sort(function(ak,aj){return(ak.from||0)-(aj.from||0)
})
},highlight:function(an,aj,ao){var ar=new b(this.text,ao),at=this.styles,ap=0;
var am=false,ak=at[0],aq;
if(this.text==""&&an.blankLine){an.blankLine(aj)
}while(!ar.eol()){var ai=an.token(ar,aj);
var al=this.text.slice(ar.start,ar.pos);
ar.start=ar.pos;
if(ap&&at[ap-1]==ai){at[ap-2]+=al
}else{if(al){if(!am&&(at[ap+1]!=ai||(ap&&at[ap-2]!=aq))){am=true
}at[ap++]=al;
at[ap++]=ai;
aq=ak;
ak=at[ap]
}}if(ar.pos>5000){at[ap++]=this.text.slice(ar.pos);
at[ap++]=null;
break
}}if(at.length!=ap){at.length=ap;
am=true
}if(ap&&at[ap-2]!=aq){am=true
}return am||(at.length<5&&this.text.length<10?null:false)
},getTokenAt:function(an,al,ak){var ai=this.text,am=new b(ai);
while(am.pos<ak&&!am.eol()){am.start=am.pos;
var aj=an.token(am,al)
}return{start:am.start,end:am.pos,string:am.current(),className:aj||null,state:al}
},indentation:function(ai){return l(this.text,null,ai)
},getHTML:function(aD,ay){var ap=[],an=true,al=0;
function aC(aP,aN){if(!aP){return
}if(an&&E&&aP.charAt(0)==" "){aP="\u00a0"+aP.slice(1)
}an=false;
if(aP.indexOf("\t")==-1){al+=aP.length;
var aO=L(aP)
}else{var aO="";
for(var aQ=0;
;
){var aL=aP.indexOf("\t",aQ);
if(aL==-1){aO+=L(aP.slice(aQ));
al+=aP.length-aQ;
break
}else{al+=aL-aQ;
var aM=aD(al);
aO+=L(aP.slice(aQ,aL))+aM.html;
al+=aM.width;
aQ=aL+1
}}}if(aN){ap.push('<span class="',aN,'">',aO,"</span>")
}else{ap.push(aO)
}}var aw=this.styles,ao=this.text,au=this.marked;
var aG=ao.length;
if(ay!=null){aG=Math.min(ay,aG)
}function ak(aL){if(!aL){return null
}return"cm-"+aL.replace(/ +/g," cm-")
}if(!ao&&ay==null){aC(" ")
}else{if(!au||!au.length){for(var aE=0,aq=0;
aq<aG;
aE+=2){var ax=aw[aE],aH=aw[aE+1],az=ax.length;
if(aq+az>aG){ax=ax.slice(0,aG-aq)
}aq+=az;
aC(ax,ak(aH))
}}else{var am=0,aE=0,at="",aH,aK=0;
var aJ=au[0].from||0,aB=[],aI=0;
function aF(){var aL;
while(aI<au.length&&((aL=au[aI]).from==am||aL.from==null)){if(aL.style!=null){aB.push(aL)
}++aI
}aJ=aI<au.length?au[aI].from:Infinity;
for(var aM=0;
aM<aB.length;
++aM){var aN=aB[aM].to||Infinity;
if(aN==am){aB.splice(aM--,1)
}else{aJ=Math.min(aN,aJ)
}}}var av=0;
while(am<aG){if(aJ==am){aF()
}var ar=Math.min(aG,aJ);
while(true){if(at){var aj=am+at.length;
var ai=aH;
for(var aA=0;
aA<aB.length;
++aA){ai=(ai?ai+" ":"")+aB[aA].style
}aC(aj>ar?at.slice(0,ar-am):at,ai);
if(aj>=ar){at=at.slice(ar-am);
am=ar;
break
}am=aj
}at=aw[aE++];
aH=ak(aw[aE++])
}}}}return ap.join("")
},cleanUp:function(){this.parent=null;
if(this.marked){for(var ai=0,aj=this.marked.length;
ai<aj;
++ai){this.marked[ai].detach(this)
}}}};
function ah(ao,ap,ai,aq){for(var am=0,an=0,aj=0;
an<ap;
am+=2){var ak=ai[am],al=an+ak.length;
if(aj==0){if(al>ao){aq.push(ak.slice(ao-an,Math.min(ak.length,ap-an)),ai[am+1])
}if(al>=ao){aj=1
}}else{if(aj==1){if(al>ap){aq.push(ak.slice(0,ap-an),ai[am+1])
}else{aq.push(ak,ai[am+1])
}}}an=al
}}function ad(aj){this.lines=aj;
this.parent=null;
for(var ak=0,al=aj.length,ai=0;
ak<al;
++ak){aj[ak].parent=this;
ai+=aj[ak].height
}this.height=ai
}ad.prototype={chunkSize:function(){return this.lines.length
},remove:function(ai,ao,am){for(var al=ai,an=ai+ao;
al<an;
++al){var aj=this.lines[al];
this.height-=aj.height;
aj.cleanUp();
if(aj.handlers){for(var ak=0;
ak<aj.handlers.length;
++ak){am.push(aj.handlers[ak])
}}}this.lines.splice(ai,ao)
},collapse:function(ai){ai.splice.apply(ai,[ai.length,0].concat(this.lines))
},insertHeight:function(aj,ak,ai){this.height+=ai;
this.lines.splice.apply(this.lines,[aj,0].concat(ak));
for(var al=0,am=ak.length;
al<am;
++al){ak[al].parent=this
}},iterN:function(ai,al,ak){for(var aj=ai+al;
ai<aj;
++ai){if(ak(this.lines[ai])){return true
}}}};
function h(al){this.children=al;
var ak=0,ai=0;
for(var aj=0,an=al.length;
aj<an;
++aj){var am=al[aj];
ak+=am.chunkSize();
ai+=am.height;
am.parent=this
}this.size=ak;
this.height=ai;
this.parent=null
}h.prototype={chunkSize:function(){return this.size
},remove:function(ak,aj,an){this.size-=aj;
for(var al=0;
al<this.children.length;
++al){var ai=this.children[al],ao=ai.chunkSize();
if(ak<ao){var am=Math.min(aj,ao-ak),ap=ai.height;
ai.remove(ak,am,an);
this.height-=ap-ai.height;
if(ao==am){this.children.splice(al--,1);
ai.parent=null
}if((aj-=am)==0){break
}ak=0
}else{ak-=ao
}}if(this.size-aj<25){var aq=[];
this.collapse(aq);
this.children=[new ad(aq)];
this.children[0].parent=this
}},collapse:function(ai){for(var aj=0,ak=this.children.length;
aj<ak;
++aj){this.children[aj].collapse(ai)
}},insert:function(aj,ak){var ai=0;
for(var al=0,am=ak.length;
al<am;
++al){ai+=ak[al].height
}this.insertHeight(aj,ak,ai)
},insertHeight:function(aj,aq,ap){this.size+=aq.length;
this.height+=ap;
for(var ak=0,am=this.children.length;
ak<am;
++ak){var ai=this.children[ak],an=ai.chunkSize();
if(aj<=an){ai.insertHeight(aj,aq,ap);
if(ai.lines&&ai.lines.length>50){while(ai.lines.length>50){var al=ai.lines.splice(ai.lines.length-25,25);
var ao=new ad(al);
ai.height-=ao.height;
this.children.splice(ak+1,0,ao);
ao.parent=this
}this.maybeSpill()
}break
}aj-=an
}},maybeSpill:function(){if(this.children.length<=10){return
}var al=this;
do{var aj=al.children.splice(al.children.length-5,5);
var ak=new h(aj);
if(!al.parent){var am=new h(al.children);
am.parent=al;
al.children=[am,ak];
al=am
}else{al.size-=ak.size;
al.height-=ak.height;
var ai=n(al.parent.children,al);
al.parent.children.splice(ai+1,0,ak)
}ak.parent=al.parent
}while(al.children.length>10);
al.parent.maybeSpill()
},iter:function(ak,aj,ai){this.iterN(ak,aj-ak,ai)
},iterN:function(ai,ap,ao){for(var aj=0,am=this.children.length;
aj<am;
++aj){var an=this.children[aj],al=an.chunkSize();
if(ai<al){var ak=Math.min(ap,al-ai);
if(an.iterN(ai,ak,ao)){return true
}if((ap-=ak)==0){break
}ai=0
}else{ai-=al
}}}};
function z(ai,am){while(!ai.lines){for(var aj=0;
;
++aj){var al=ai.children[aj],ak=al.chunkSize();
if(am<ak){ai=al;
break
}am-=ak
}}return ai.lines[am]
}function U(ai){if(ai.parent==null){return null
}var an=ai.parent,am=n(an.lines,ai);
for(var aj=an.parent;
aj;
an=aj,aj=aj.parent){for(var ak=0,al=aj.children.length;
;
++ak){if(aj.children[ak]==an){break
}am+=aj.children[ak].chunkSize()
}}return am
}function T(ao,am){var ak=0;
outer:do{for(var al=0,an=ao.children.length;
al<an;
++al){var aj=ao.children[al],ai=aj.height;
if(am<ai){ao=aj;
continue outer
}am-=ai;
ak+=aj.chunkSize()
}return ak
}while(!ao.lines);
for(var al=0,an=ao.lines.length;
al<an;
++al){var aq=ao.lines[al],ap=aq.height;
if(am<ap){break
}am-=ap
}return ak+al
}function g(ai,ao){var ak=0;
outer:do{for(var aj=0,am=ai.children.length;
aj<am;
++aj){var an=ai.children[aj],al=an.chunkSize();
if(ao<al){ai=an;
continue outer
}ao-=al;
ak+=an.height
}return ak
}while(!ai.lines);
for(var aj=0;
aj<ao;
++aj){ak+=ai.lines[aj].height
}return ak
}function j(){this.time=0;
this.done=[];
this.undone=[]
}j.prototype={addChange:function(ai,ao,aj){this.undone.length=0;
var ak=+new Date,aq=this.done[this.done.length-1],ar=aq&&aq[aq.length-1];
var am=ak-this.time;
if(am>400||!ar){this.done.push([{start:ai,added:ao,old:aj}])
}else{if(ar.start>ai+aj.length||ar.start+ar.added<ai-ar.added+ar.old.length){aq.push({start:ai,added:ao,old:aj})
}else{var ap=0;
if(ai<ar.start){for(var al=ar.start-ai-1;
al>=0;
--al){ar.old.unshift(aj[al])
}ap=Math.min(0,ao-aj.length);
ar.added+=ar.start-ai+ap;
ar.start=ai
}else{if(ar.start<ai){ap=ai-ar.start;
ao+=ap
}}for(var al=ar.added-ap,an=aj.length;
al<an;
++al){ar.old.push(aj[al])
}if(ar.added<ao){ar.added=ao
}}}this.time=ak
}};
function F(){t(this)
}function K(ai){if(!ai.stop){ai.stop=F
}return ai
}function P(ai){if(ai.preventDefault){ai.preventDefault()
}else{ai.returnValue=false
}}function A(ai){if(ai.stopPropagation){ai.stopPropagation()
}else{ai.cancelBubble=true
}}function t(ai){P(ai);
A(ai)
}r.e_stop=t;
r.e_preventDefault=P;
r.e_stopPropagation=A;
function i(ai){return ai.target||ai.srcElement
}function u(ai){if(ai.which){return ai.which
}else{if(ai.button&1){return 1
}else{if(ai.button&2){return 3
}else{if(ai.button&4){return 2
}}}}}function v(aj,ak){var ai=aj.override&&aj.override.hasOwnProperty(ak);
return ai?aj.override[ak]:aj[ak]
}function o(al,ak,aj,ai){if(typeof al.addEventListener=="function"){al.addEventListener(ak,aj,false);
if(ai){return function(){al.removeEventListener(ak,aj,false)
}
}}else{var am=function(an){aj(an||window.event)
};
al.attachEvent("on"+ak,am);
if(ai){return function(){al.detachEvent("on"+ak,am)
}
}}}r.connect=o;
function w(){this.id=null
}w.prototype={set:function(ai,aj){clearTimeout(this.id);
this.id=setTimeout(aj,ai)
}};
var X=r.Pass={toString:function(){return"CodeMirror.Pass"
}};
var J=/gecko\/\d{7}/i.test(navigator.userAgent);
var E=/MSIE \d/.test(navigator.userAgent);
var y=/MSIE [1-8]\b/.test(navigator.userAgent);
var f=/WebKit\//.test(navigator.userAgent);
var ab=/Chrome\//.test(navigator.userAgent);
var B=function(){if(y){return false
}var ai=document.createElement("div");
return"draggable" in ai||"dragDrop" in ai
}();
var d="\n";
(function(){var ai=document.createElement("textarea");
ai.value="foo\nbar";
if(ai.value.indexOf("\r")>-1){d="\r\n"
}}());
function l(aj,ai,al){if(ai==null){ai=aj.search(/[^\s\u00a0]/);
if(ai==-1){ai=aj.length
}}for(var ak=0,am=0;
ak<ai;
++ak){if(aj.charAt(ak)=="\t"){am+=al-(am%al)
}else{++am
}}return am
}function q(ai){if(ai.currentStyle){return ai.currentStyle
}return window.getComputedStyle(ai,null)
}function ag(aj,ar){var al=aj.ownerDocument.body;
var aq=0,ap=0,an=false;
for(var ai=aj;
ai;
ai=ai.offsetParent){var ao=ai.offsetLeft,ak=ai.offsetTop;
if(ai==al){aq+=Math.abs(ao);
ap+=Math.abs(ak)
}else{aq+=ao,ap+=ak
}if(ar&&q(ai).position=="fixed"){an=true
}}var am=ar&&!an?null:al;
for(var ai=aj.parentNode;
ai!=am;
ai=ai.parentNode){if(ai.scrollLeft!=null){aq-=ai.scrollLeft;
ap-=ai.scrollTop
}}return{left:aq,top:ap}
}if(document.documentElement.getBoundingClientRect!=null){ag=function(al,ai){try{var ak=al.getBoundingClientRect();
ak={top:ak.top,left:ak.left}
}catch(am){ak={top:0,left:0}
}if(!ai){if(window.pageYOffset==null){var aj=document.documentElement||document.body.parentNode;
if(aj.scrollTop==null){aj=document.body
}ak.top+=aj.scrollTop;
ak.left+=aj.scrollLeft
}else{ak.top+=window.pageYOffset;
ak.left+=window.pageXOffset
}}return ak
}
}function D(ai){return ai.textContent||ai.innerText||ai.nodeValue||""
}function a(ai){if(p){ai.selectionStart=0;
ai.selectionEnd=ai.value.length
}else{ai.select()
}}function Z(aj,ai){return aj.line==ai.line&&aj.ch==ai.ch
}function V(aj,ai){return aj.line<ai.line||(aj.line==ai.line&&aj.ch<ai.ch)
}function W(ai){return{line:ai.line,ch:ai.ch}
}var ae=document.createElement("pre");
function L(ai){ae.textContent=ai;
return ae.innerHTML
}if(L("a")=="\na"){L=function(ai){ae.textContent=ai;
return ae.innerHTML.slice(1)
}
}else{if(L("\t")!="\t"){L=function(ai){ae.innerHTML="";
ae.appendChild(document.createTextNode(ai));
return ae.innerHTML
}
}}r.htmlEscape=L;
function S(al,ak){if(!ak){return 0
}if(!al){return ak.length
}for(var aj=al.length,ai=ak.length;
aj>=0&&ai>=0;
--aj,--ai){if(al.charAt(aj)!=ak.charAt(ai)){break
}}return ai+1
}function n(al,ai){if(al.indexOf){return al.indexOf(ai)
}for(var aj=0,ak=al.length;
aj<ak;
++aj){if(al[aj]==ai){return aj
}}return -1
}function ac(ai){return/\w/.test(ai)||ai.toUpperCase()!=ai.toLowerCase()
}var x="\n\nb".split(/\n/).length!=3?function(ak){var al=0,aj,ai=[];
while((aj=ak.indexOf("\n",al))>-1){ai.push(ak.slice(al,ak.charAt(aj-1)=="\r"?aj-1:aj));
al=aj+1
}ai.push(ak.slice(al));
return ai
}:function(ai){return ai.split(/\r?\n/)
};
r.splitLines=x;
var aa=window.getSelection?function(aj){try{return aj.selectionStart!=aj.selectionEnd
}catch(ai){return false
}}:function(ak){try{var ai=ak.ownerDocument.selection.createRange()
}catch(aj){}if(!ai||ai.parentElement()!=ak){return false
}return ai.compareEndPoints("StartToEnd",ai)!=0
};
r.defineMode("null",function(){return{token:function(ai){ai.skipToEnd()
}}
});
r.defineMIME("text/plain","null");
var N={3:"Enter",8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"CapsLock",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"PrintScrn",45:"Insert",46:"Delete",59:";",91:"Mod",92:"Mod",93:"Mod",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",63276:"PageUp",63277:"PageDown",63275:"End",63273:"Home",63234:"Left",63232:"Up",63235:"Right",63233:"Down",63302:"Insert",63272:"Delete"};
r.keyNames=N;
(function(){for(var ai=0;
ai<10;
ai++){N[ai+48]=String(ai)
}for(var ai=65;
ai<=90;
ai++){N[ai]=String.fromCharCode(ai)
}for(var ai=1;
ai<=12;
ai++){N[ai+111]=N[ai+63235]="F"+ai
}})();
return r
})();