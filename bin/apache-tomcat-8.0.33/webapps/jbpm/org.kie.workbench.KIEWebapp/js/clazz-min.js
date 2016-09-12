var Clazz=function(){};
Clazz.prototype.construct=function(){};
Clazz.extend=function(e){var a=function(){if(arguments[0]!==Clazz){this.construct.apply(this,arguments)
}};
var d=new this(Clazz);
var b=this.prototype;
for(var f in e){var c=e[f];
if(c instanceof Function){c.$=b
}d[f]=c
}a.prototype=d;
a.extend=this.extend;
return a
};