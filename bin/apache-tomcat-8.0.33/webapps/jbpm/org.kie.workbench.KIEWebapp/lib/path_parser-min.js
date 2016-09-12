Svg.VERSION=1;
Svg.NAMESPACE="http://www.w3.org/2000/svg";
function Svg(){}PathParser.PARAMCOUNT={A:7,C:6,H:1,L:2,M:2,Q:4,S:4,T:2,V:1,Z:0};
PathParser.METHODNAME={A:"arcAbs",a:"arcRel",C:"curvetoCubicAbs",c:"curvetoCubicRel",H:"linetoHorizontalAbs",h:"linetoHorizontalRel",L:"linetoAbs",l:"linetoRel",M:"movetoAbs",m:"movetoRel",Q:"curvetoQuadraticAbs",q:"curvetoQuadraticRel",S:"curvetoCubicSmoothAbs",s:"curvetoCubicSmoothRel",T:"curvetoQuadraticSmoothAbs",t:"curvetoQuadraticSmoothRel",V:"linetoVerticalAbs",v:"linetoVerticalRel",Z:"closePath",z:"closePath"};
function PathParser(){this._lexer=new PathLexer();
this._handler=null
}PathParser.prototype.parsePath=function(a){if(a==null||a.namespaceURI!=Svg.NAMESPACE||a.localName!="path"){throw new Error("PathParser.parsePath: The first parameter must be an SVG path element")
}this.parseData(a.getAttributeNS(null,"d"))
};
PathParser.prototype.parseData=function(h){if(typeof(h)!="string"){throw new Error("PathParser.parseData: The first parameter must be a string")
}if(this._handler!=null&&this._handler.beginParse!=null){this._handler.beginParse()
}var c=this._lexer;
c.setPathData(h);
var g="BOP";
var d=c.getNextToken();
while(!d.typeis(PathToken.EOD)){var b;
var e=new Array();
switch(d.type){case PathToken.COMMAND:if(g=="BOP"&&d.text!="M"&&d.text!="m"){throw new Error("PathParser.parseData: a path must begin with a moveto command")
}g=d.text;
b=PathParser.PARAMCOUNT[d.text.toUpperCase()];
d=c.getNextToken();
break;
case PathToken.NUMBER:break;
default:throw new Error("PathParser.parseData: unrecognized token type: "+d.type)
}for(var f=0;
f<b;
f++){switch(d.type){case PathToken.COMMAND:throw new Error("PathParser.parseData: parameter must be a number: "+d.text);
case PathToken.NUMBER:e[f]=d.text-0;
break;
default:throw new Errot("PathParser.parseData: unrecognized token type: "+d.type)
}d=c.getNextToken()
}if(this._handler!=null){var j=this._handler;
var a=PathParser.METHODNAME[g];
if(j[a]!=null){j[a].apply(j,e)
}}if(g=="M"){g="L"
}if(g=="m"){g="l"
}}};
PathParser.prototype.setHandler=function(a){this._handler=a
};
PathLexer.VERSION=1;
function PathLexer(a){if(a==null){a=""
}this.setPathData(a)
}PathLexer.prototype.setPathData=function(a){if(typeof(a)!="string"){throw new Error("PathLexer.setPathData: The first parameter must be a string")
}this._pathData=a
};
PathLexer.prototype.getNextToken=function(){var a=null;
var b=this._pathData;
while(a==null){if(b==null||b==""){a=new PathToken(PathToken.EOD,"")
}else{if(b.match(/^([ \t\r\n,]+)/)){b=b.substr(RegExp.$1.length)
}else{if(b.match(/^([AaCcHhLlMmQqSsTtVvZz])/)){a=new PathToken(PathToken.COMMAND,RegExp.$1);
b=b.substr(RegExp.$1.length)
}else{if(b.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)){a=new PathToken(PathToken.NUMBER,parseFloat(RegExp.$1));
b=b.substr(RegExp.$1.length)
}else{throw new Error("PathLexer.getNextToken: unrecognized path data "+b)
}}}}}this._pathData=b;
return a
};
PathToken.UNDEFINED=0;
PathToken.COMMAND=1;
PathToken.NUMBER=2;
PathToken.EOD=3;
function PathToken(a,b){if(arguments.length>0){this.init(a,b)
}}PathToken.prototype.init=function(a,b){this.type=a;
this.text=b
};
PathToken.prototype.typeis=function(a){return this.type==a
};