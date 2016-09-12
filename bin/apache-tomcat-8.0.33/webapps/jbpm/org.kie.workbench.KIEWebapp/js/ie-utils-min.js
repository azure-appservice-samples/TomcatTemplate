if((typeof Range!=="undefined")&&!Range.prototype.createContextualFragment){Range.prototype.createContextualFragment=function(a){var c=document.createDocumentFragment(),b=document.createElement("div");
c.appendChild(b);
b.outerHTML=a;
return c
}
}if(!window.btoa){window.btoa=function(a){return Base64.encode(a)
}
}if(!window.atob){window.atob=function(a){return Base64.decode(a)
}
};