if(!window.SpriteUtils){window.SpriteUtils={designerContextPath:"org.jbpm.designer.jBPMDesigner",stencilsetsFolder:"stencilsets",baseName:function(b){if(b){var a=new String(b).substring(b.lastIndexOf("/")+1);
if(a.lastIndexOf(".")!=-1){a=a.substring(0,a.lastIndexOf("."))
}return a
}return undefined
},toUniqueId:function(d){if(d){var c=new String(d);
var a=d.indexOf(this.designerContextPath);
if(a!=-1){c=c.substring(a+this.designerContextPath.length+1,c.length)
}else{var b=d.lastIndexOf(this.stencilsetsFolder);
if(b!=-1){c=c.substring(b,c.length)
}}var e=c.lastIndexOf(".");
if(e!=-1){c=c.substring(0,e)
}c=c.replace(/\//g,"_").replace(/\./g,"_");
return c
}return undefined
},isIconFile:function(a){if(typeof a!=="string"){return false
}else{if(a.endsWith(".png")||a.endsWith(".gif")){return true
}else{return false
}}}}
};