Ext.ux.PanelCollapsedTitlePlugin=function(){var a="x-panel-header-rotated";
var c=!!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1");
var b=function(){var h=((this.region=="east")||(this.region=="west"));
var i="overflow: visible; padding: 0; border: none; background: none;";
if(h&&c){this.collapsedHeader=this.ownerCt.layout[this.region].getCollapsedEl().createChild({tag:"div",style:"height: 100%; overflow: hidden;"});
var g="http://www.w3.org/2000/svg";
var f=document.createElementNS(g,"svg");
this.collapsedHeader.dom.appendChild(f);
f.setAttribute("width","100%");
f.setAttribute("height","100%");
var j=document.createElementNS(g,"text");
if(this.region=="west"){j.setAttribute("x",12);
j.setAttribute("y",100);
j.setAttribute("transform","rotate(270 12 100)")
}else{j.setAttribute("x",6);
j.setAttribute("y",1);
j.setAttribute("transform","rotate(90 6 1)")
}j.setAttribute("class","x-panel-header "+a);
f.appendChild(j);
this.collapsedHeaderText=document.createTextNode(this.title);
j.appendChild(this.collapsedHeaderText);
var e=Ext.fly(j).getStyle("color");
j.setAttribute("style",i+";fill: "+e+";")
}else{var d="position: relative;";
if(h){d+="white-space: nowrap; writing-mode: tb-rl; top: 1px; left: 3px;"
}else{d+="top: 2px;";
i+="padding-left: 4px; margin-right: 18px;"
}this.collapsedHeader=this.ownerCt.layout[this.region].getCollapsedEl().createChild({tag:"div",style:i,cls:"x-panel-header "+a,html:'<span style="'+d+'">'+this.title+"</span>"});
this.collapsedHeaderText=this.collapsedHeader.first()
}if(this.collapsedIconCls){this.setCollapsedIconClass(this.collapsedIconCls)
}};
this.init=function(e){if(e.collapsible){var d=((e.region=="east")||(e.region=="west"));
e.setTitle=Ext.Panel.prototype.setTitle.createSequence(function(f){if(this.rendered&&this.collapsedHeaderText){if(this.collapsedHeaderText.dom){this.collapsedHeaderText.dom.innerHTML=f
}else{if(this.collapsedHeaderText.replaceData){this.collapsedHeaderText.nodeValue=f
}}}});
e.setCollapsedIconClass=function(g){var f=this.collapsedIconCls;
this.collapsedIconCls=g;
if(this.rendered&&this.collapsedHeader){var i=this.collapsedHeader,h=i.child("img.x-panel-inline-icon");
if(h){if(this.collapsedIconCls){Ext.fly(h).replaceClass(f,this.collapsedIconCls)
}else{Ext.fly(h).remove()
}}else{if(this.collapsedIconCls){Ext.DomHelper.insertBefore(i.dom.firstChild,{tag:"img",src:Ext.BLANK_IMAGE_URL,cls:"x-panel-inline-icon "+this.collapsedIconCls,style:d?"display: block; margin: 1px 2px;":"margin-top: 2px; margin-right: 4px"})
}}}};
e.on("render",function(){if(this.ownerCt.rendered&&this.ownerCt.layout.hasLayout){b.call(e)
}else{this.ownerCt.on("afterlayout",b,e,{single:true})
}},e)
}};
return this
};