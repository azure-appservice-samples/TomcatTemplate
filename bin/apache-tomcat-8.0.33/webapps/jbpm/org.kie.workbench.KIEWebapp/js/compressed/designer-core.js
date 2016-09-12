XMLNS={ATOM:"http://www.w3.org/2005/Atom",XHTML:"http://www.w3.org/1999/xhtml",ERDF:"http://purl.org/NET/erdf/profile",RDFS:"http://www.w3.org/2000/01/rdf-schema#",RDF:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",RAZIEL:"http://b3mn.org/Raziel",SCHEMA:""};
var Kickstart={started:false,callbacks:[],alreadyLoaded:[],PATH:"",load:function(){Kickstart.kick()
},kick:function(){if(!Kickstart.started){Kickstart.started=true;
Kickstart.callbacks.each(function(a){window.setTimeout(a,1)
})
}},register:function(callback){with(Kickstart){if(started){window.setTimeout(callback,1)
}else{Kickstart.callbacks.push(callback)
}}},require:function(a){if(Kickstart.alreadyLoaded.member(a)){return false
}return Kickstart.include(a)
},include:function(a){var b=document.getElementsByTagNameNS(XMLNS.XHTML,"head")[0];
var c=document.createElementNS(XMLNS.XHTML,"script");
c.setAttributeNS(XMLNS.XHTML,"type","text/javascript");
c.src=Kickstart.PATH+a;
b.appendChild(c);
Kickstart.alreadyLoaded.push(a);
return true
}};
if(!ORYX){var ORYX={}
}if(!ORYX.CONFIG){ORYX.CONFIG={}
}ORYX.CONFIG.WEB_URL="org.jbpm.designer.jBPMDesigner";
ORYX.CONFIG.MENU_INDEX={File:1,Edit:2,Undo:3,localstorage:4,"Z-Order":5,Alignment:6,Grouping:7,lockunlockgroup:8,Docker:9,colorpickergroup:"AAA",editprocessforms:"BBB",sharegroup:"CCC",importgroup:"DDD",validationandsimulation:"EEE",servicerepogroup:"FFF",paintgroup:"GGG",fullscreengroup:"HHH",Help:"ZZZZZZ"};
ORYX.CONFIG.UUID_URL=function(b,a){if(b===undefined){b=ORYX.UUID
}if(a===undefined){a=ORYX.PROFILE
}if(ORYX.PATH===undefined){ORYX.PATH="designer/"
}return ORYX.PATH+"uuidRepository?uuid="+Base64.encode(encodeURI(b))+"&profile="+a+"&pp="+ORYX.PREPROCESSING+"&ts="+new Date().getTime()
};
ORYX.FULL_PERSPECTIVE="http://b3mn.org/stencilset/bpmn2.0#";
ORYX.SIMPLE_PERSPECTIVE="http://b3mn.org/stencilset/bpmn2.0simple#";
ORYX.RULEFLOW_PERSPECTIVE="http://b3mn.org/stencilset/bpmn2.0ruleflow#";
ORYX.CURRENT_PERSPECTIVE;
ORYX.CALCULATE_CURRENT_PERSPECTIVE=function(){if(!ORYX.CURRENT_PERSPECTIVE){var a=document.cookie.split(";");
for(var b=0;
b<a.length&&!ORYX.CURRENT_PERSPECTIVE;
b++){var d=a[b];
while(d.charAt(0)==" "){d=d.substring(1,d.length)
}if(d.indexOf("designerperspective=")==0){ORYX.CURRENT_PERSPECTIVE=d.substring("designerperspective=".length,d.length)
}}if(!ORYX.CURRENT_PERSPECTIVE){ORYX.CURRENT_PERSPECTIVE=ORYX.FULL_PERSPECTIVE
}}return ORYX.CURRENT_PERSPECTIVE
};
ORYX.CONFIG.TRANSFORMER_URL=function(b,a){if(b===undefined){b=ORYX.UUID
}if(a===undefined){a=ORYX.PROFILE
}return ORYX.PATH+"transformer?uuid="+window.btoa(encodeURI(b))+"&profile="+a
};
ORYX.CONFIG.TASKFORMS_URL=function(b,a){if(b===undefined){b=ORYX.UUID
}if(a===undefined){a=ORYX.PROFILE
}return ORYX.PATH+"taskforms?uuid="+window.btoa(encodeURI(b))+"&profile="+a
};
ORYX.CONFIG.UUID_AUTOSAVE_INTERVAL=120000;
ORYX.CONFIG.UUID_AUTOSAVE_DEFAULT=false;
ORYX.CONFIG.VERSION_URL=ORYX.CONFIG.ROOT_PATH+"VERSION";
ORYX.CONFIG.LICENSE_URL=ORYX.CONFIG.ROOT_PATH+"LICENSE";
ORYX.CONFIG.SERVER_HANDLER_ROOT="";
ORYX.CONFIG.STENCILSET_HANDLER=ORYX.CONFIG.SERVER_HANDLER_ROOT+"";
ORYX.CONFIG.MODE_READONLY="readonly";
ORYX.CONFIG.MODE_FULLSCREEN="fullscreen";
ORYX.CONFIG.SHOW_GRIDLINE=true;
ORYX.CONFIG.DISABLE_GRADIENT=false;
ORYX.CONFIG.PLUGINS_ENABLED=true;
ORYX.CONFIG.PLUGINS_CONFIG=ORYX.CONFIG.ROOT_PATH+"plugins";
ORYX.CONFIG.PROFILE_PATH=ORYX.CONFIG.ROOT_PATH+"profiles/";
ORYX.CONFIG.PLUGINS_FOLDER="Plugins/";
ORYX.CONFIG.PDF_EXPORT_URL=ORYX.CONFIG.ROOT_PATH+"pdf";
ORYX.CONFIG.PNML_EXPORT_URL=ORYX.CONFIG.ROOT_PATH+"pnml";
ORYX.CONFIG.SIMPLE_PNML_EXPORT_URL=ORYX.CONFIG.ROOT_PATH+"simplepnmlexporter";
ORYX.CONFIG.DESYNCHRONIZABILITY_URL=ORYX.CONFIG.ROOT_PATH+"desynchronizability";
ORYX.CONFIG.IBPMN2BPMN_URL=ORYX.CONFIG.ROOT_PATH+"ibpmn2bpmn";
ORYX.CONFIG.BPMN2YAWL_URL=ORYX.CONFIG.ROOT_PATH+"bpmn2yawl";
ORYX.CONFIG.QUERYEVAL_URL=ORYX.CONFIG.ROOT_PATH+"query";
ORYX.CONFIG.SYNTAXCHECKER_URL=ORYX.CONFIG.ROOT_PATH+"syntaxchecker";
ORYX.CONFIG.VALIDATOR_URL=ORYX.CONFIG.ROOT_PATH+"validator";
ORYX.CONFIG.AUTO_LAYOUTER_URL=ORYX.CONFIG.ROOT_PATH+"layouter";
ORYX.CONFIG.SS_EXTENSIONS_FOLDER=ORYX.CONFIG.ROOT_PATH+"stencilsets/extensions/";
ORYX.CONFIG.SS_EXTENSIONS_CONFIG=ORYX.CONFIG.ROOT_PATH+"stencilsets/extensions/extensions.json";
ORYX.CONFIG.ORYX_NEW_URL="/new";
ORYX.CONFIG.STEP_THROUGH=ORYX.CONFIG.ROOT_PATH+"stepthrough";
ORYX.CONFIG.STEP_THROUGH_CHECKER=ORYX.CONFIG.ROOT_PATH+"stepthroughchecker";
ORYX.CONFIG.XFORMS_EXPORT_URL=ORYX.CONFIG.ROOT_PATH+"xformsexport";
ORYX.CONFIG.XFORMS_EXPORT_ORBEON_URL=ORYX.CONFIG.ROOT_PATH+"xformsexport-orbeon";
ORYX.CONFIG.XFORMS_IMPORT_URL=ORYX.CONFIG.ROOT_PATH+"xformsimport";
ORYX.CONFIG.BPEL_EXPORT_URL=ORYX.CONFIG.ROOT_PATH+"bpelexporter";
ORYX.CONFIG.BPEL4CHOR_EXPORT_URL=ORYX.CONFIG.ROOT_PATH+"bpel4chorexporter";
ORYX.CONFIG.BPEL4CHOR2BPEL_EXPORT_URL=ORYX.CONFIG.ROOT_PATH+"bpel4chor2bpelexporter";
ORYX.CONFIG.TREEGRAPH_SUPPORT=ORYX.CONFIG.ROOT_PATH+"treegraphsupport";
ORYX.CONFIG.XPDL4CHOR2BPEL4CHOR_TRANSFORMATION_URL=ORYX.CONFIG.ROOT_PATH+"xpdl4chor2bpel4chor";
ORYX.CONFIG.RESOURCE_LIST=ORYX.CONFIG.ROOT_PATH+"resourceList";
ORYX.CONFIG.BPMN_LAYOUTER=ORYX.CONFIG.ROOT_PATH+"bpmnlayouter";
ORYX.CONFIG.EPC_LAYOUTER=ORYX.CONFIG.ROOT_PATH+"epclayouter";
ORYX.CONFIG.BPMN2MIGRATION=ORYX.CONFIG.ROOT_PATH+"bpmn2migration";
ORYX.CONFIG.BPMN20_SCHEMA_VALIDATION_ON=true;
ORYX.CONFIG.JPDLIMPORTURL=ORYX.CONFIG.ROOT_PATH+"jpdlimporter";
ORYX.CONFIG.JPDLEXPORTURL=ORYX.CONFIG.ROOT_PATH+"jpdlexporter";
ORYX.CONFIG.CPNTOOLSEXPORTER=ORYX.CONFIG.ROOT_PATH+"cpntoolsexporter";
ORYX.CONFIG.CPNTOOLSIMPORTER=ORYX.CONFIG.ROOT_PATH+"cpntoolsimporter";
ORYX.CONFIG.BPMN2XPDLPATH=ORYX.CONFIG.ROOT_PATH+"bpmn2xpdl";
ORYX.CONFIG.TBPMIMPORT=ORYX.CONFIG.ROOT_PATH+"tbpmimport";
ORYX.CONFIG.NAMESPACE_ORYX="http://www.b3mn.org/oryx";
ORYX.CONFIG.NAMESPACE_SVG="http://www.w3.org/2000/svg";
ORYX.CONFIG.CANVAS_WIDTH=3000;
ORYX.CONFIG.CANVAS_HEIGHT=2000;
ORYX.CONFIG.CANVAS_RESIZE_INTERVAL=300;
ORYX.CONFIG.SELECTED_AREA_PADDING=4;
ORYX.CONFIG.CANVAS_BACKGROUND_COLOR="none";
ORYX.CONFIG.GRID_DISTANCE=30;
ORYX.CONFIG.GRID_ENABLED=true;
ORYX.CONFIG.ZOOM_OFFSET=0.1;
ORYX.CONFIG.DEFAULT_SHAPE_MARGIN=60;
ORYX.CONFIG.SCALERS_SIZE=7;
ORYX.CONFIG.MINIMUM_SIZE=20;
ORYX.CONFIG.MAXIMUM_SIZE=30000;
ORYX.CONFIG.OFFSET_MAGNET=15;
ORYX.CONFIG.OFFSET_EDGE_LABEL_TOP=14;
ORYX.CONFIG.OFFSET_EDGE_LABEL_BOTTOM=12;
ORYX.CONFIG.OFFSET_EDGE_BOUNDS=5;
ORYX.CONFIG.COPY_MOVE_OFFSET=30;
ORYX.CONFIG.SHOW_GRIDLINE=true;
ORYX.CONFIG.BORDER_OFFSET=14;
ORYX.CONFIG.MAX_NUM_SHAPES_NO_GROUP=5;
ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER=30;
ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET=45;
ORYX.CONFIG.SHAPEMENU_RIGHT="Oryx_Right";
ORYX.CONFIG.SHAPEMENU_BOTTOM="Oryx_Bottom";
ORYX.CONFIG.SHAPEMENU_LEFT="Oryx_Left";
ORYX.CONFIG.SHAPEMENU_TOP="Oryx_Top";
ORYX.CONFIG.MORPHITEM_DISABLED="Oryx_MorphItem_disabled";
ORYX.CONFIG.TYPE_STRING="string";
ORYX.CONFIG.TYPE_BOOLEAN="boolean";
ORYX.CONFIG.TYPE_INTEGER="integer";
ORYX.CONFIG.TYPE_FLOAT="float";
ORYX.CONFIG.TYPE_COLOR="color";
ORYX.CONFIG.TYPE_DATE="date";
ORYX.CONFIG.TYPE_CHOICE="choice";
ORYX.CONFIG.TYPE_DYNAMICCHOICE="dynamicchoice";
ORYX.CONFIG.TYPE_DYNAMICDATAINPUT="dynamicdatainput";
ORYX.CONFIG.TYPE_DYNAMICDATAOUTPUT="dynamicdatoutput";
ORYX.CONFIG.TYPE_DYNAMICGATEWAYCONNECTIONS="dynamicgatewayconnections";
ORYX.CONFIG.TYPE_URL="url";
ORYX.CONFIG.TYPE_DIAGRAM_LINK="diagramlink";
ORYX.CONFIG.TYPE_COMPLEX="complex";
ORYX.CONFIG.TYPE_TEXT="text";
ORYX.CONFIG.TYPE_ENCODED_TEXT="encodedtext";
ORYX.CONFIG.TYPE_VARDEF="vardef";
ORYX.CONFIG.TYPE_EXPRESSION="expression";
ORYX.CONFIG.TYPE_ACTION="action";
ORYX.CONFIG.TYPE_GLOBAL="global";
ORYX.CONFIG.TYPE_IMPORT="import";
ORYX.CONFIG.TYPE_DATAINPUT="datainput";
ORYX.CONFIG.TYPE_DATAOUTPUT="dataoutput";
ORYX.CONFIG.TYPE_DATAINPUT_SINGLE="datainputsingle";
ORYX.CONFIG.TYPE_DATAOUTPUT_SINGLE="dataoutputsingle";
ORYX.CONFIG.TYPE_DATAASSIGNMENT="dataassignment";
ORYX.CONFIG.TYPE_VISUALDATAASSIGNMENTS="visualdataassignment";
ORYX.CONFIG.TYPE_CALLEDELEMENT="calledelement";
ORYX.CONFIG.TYPE_CUSTOM="custom";
ORYX.CONFIG.TYPE_REASSIGNMENT="reassignment";
ORYX.CONFIG.TYPE_NOTIFICATIONS="notifications";
ORYX.CONFIG.TYPE_DTYPE_VARDEF="vardef";
ORYX.CONFIG.TYPE_DTYPE_DINPUT="dinput";
ORYX.CONFIG.TYPE_DTYPE_DOUTPUT="doutput";
ORYX.CONFIG.TYPE_DTYPE_GLOBAL="global";
ORYX.CONFIG.TYPE_RULEFLOW_GROUP="ruleflowgroup";
ORYX.CONFIG.LABEL_LINE_DISTANCE=2;
ORYX.CONFIG.LABEL_DEFAULT_LINE_HEIGHT=12;
ORYX.CONFIG.ENABLE_MORPHMENU_BY_HOVER=true;
ORYX.CONFIG.EDITOR_ALIGN_BOTTOM=1;
ORYX.CONFIG.EDITOR_ALIGN_MIDDLE=2;
ORYX.CONFIG.EDITOR_ALIGN_TOP=4;
ORYX.CONFIG.EDITOR_ALIGN_LEFT=8;
ORYX.CONFIG.EDITOR_ALIGN_CENTER=16;
ORYX.CONFIG.EDITOR_ALIGN_RIGHT=32;
ORYX.CONFIG.EDITOR_ALIGN_SIZE=48;
ORYX.CONFIG.EVENT_MOUSEDOWN="mousedown";
ORYX.CONFIG.EVENT_MOUSEUP="mouseup";
ORYX.CONFIG.EVENT_MOUSEOVER="mouseover";
ORYX.CONFIG.EVENT_MOUSEOUT="mouseout";
ORYX.CONFIG.EVENT_MOUSEMOVE="mousemove";
ORYX.CONFIG.EVENT_DBLCLICK="dblclick";
ORYX.CONFIG.EVENT_CLICK="click";
ORYX.CONFIG.EVENT_KEYDOWN="keydown";
ORYX.CONFIG.EVENT_KEYUP="keyup";
ORYX.CONFIG.EVENT_LOADED="editorloaded";
ORYX.CONFIG.EVENT_EXECUTE_COMMANDS="executeCommands";
ORYX.CONFIG.EVENT_STENCIL_SET_LOADED="stencilSetLoaded";
ORYX.CONFIG.EVENT_STENCIL_SET_RELOAD="stencilSetReLoad";
ORYX.CONFIG.EVENT_SELECTION_CHANGED="selectionchanged";
ORYX.CONFIG.EVENT_SHAPEADDED="shapeadded";
ORYX.CONFIG.EVENT_PROPERTY_CHANGED="propertyChanged";
ORYX.CONFIG.EVENT_DRAGDROP_START="dragdrop.start";
ORYX.CONFIG.EVENT_SHAPE_MENU_CLOSE="shape.menu.close";
ORYX.CONFIG.EVENT_DRAGDROP_END="dragdrop.end";
ORYX.CONFIG.EVENT_RESIZE_START="resize.start";
ORYX.CONFIG.EVENT_RESIZE_END="resize.end";
ORYX.CONFIG.EVENT_DRAGDOCKER_DOCKED="dragDocker.docked";
ORYX.CONFIG.EVENT_DRAGDOCKER_MOVE_FINISHED="dragDocker.move.finished";
ORYX.CONFIG.EVENT_DOCKER_EVENT="docker.event";
ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW="highlight.showHighlight";
ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE="highlight.hideHighlight";
ORYX.CONFIG.EVENT_LOADING_ENABLE="loading.enable";
ORYX.CONFIG.EVENT_LOADING_DISABLE="loading.disable";
ORYX.CONFIG.EVENT_LOADING_STATUS="loading.status";
ORYX.CONFIG.EVENT_OVERLAY_SHOW="overlay.show";
ORYX.CONFIG.EVENT_OVERLAY_HIDE="overlay.hide";
ORYX.CONFIG.EVENT_DICTIONARY_ADD="dictionary.add";
ORYX.CONFIG.EVENT_TASKFORM_EDIT="taskform.edit";
ORYX.CONFIG.EVENT_ARRANGEMENT_TOP="arrangement.setToTop";
ORYX.CONFIG.EVENT_ARRANGEMENT_BACK="arrangement.setToBack";
ORYX.CONFIG.EVENT_ARRANGEMENT_FORWARD="arrangement.setForward";
ORYX.CONFIG.EVENT_ARRANGEMENT_BACKWARD="arrangement.setBackward";
ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED="propertyWindow.propertyChanged";
ORYX.CONFIG.EVENT_LAYOUT_ROWS="layout.rows";
ORYX.CONFIG.EVENT_LAYOUT_BPEL="layout.BPEL";
ORYX.CONFIG.EVENT_LAYOUT_BPEL_VERTICAL="layout.BPEL.vertical";
ORYX.CONFIG.EVENT_LAYOUT_BPEL_HORIZONTAL="layout.BPEL.horizontal";
ORYX.CONFIG.EVENT_LAYOUT_BPEL_SINGLECHILD="layout.BPEL.singlechild";
ORYX.CONFIG.EVENT_LAYOUT_BPEL_AUTORESIZE="layout.BPEL.autoresize";
ORYX.CONFIG.EVENT_AUTOLAYOUT_LAYOUT="autolayout.layout";
ORYX.CONFIG.EVENT_UNDO_EXECUTE="undo.execute";
ORYX.CONFIG.EVENT_UNDO_ROLLBACK="undo.rollback";
ORYX.CONFIG.EVENT_BUTTON_UPDATE="toolbar.button.update";
ORYX.CONFIG.EVENT_LAYOUT="layout.dolayout";
ORYX.CONFIG.EVENT_COLOR_CHANGE="color.change";
ORYX.CONFIG.EVENT_DOCKERDRAG="dragTheDocker";
ORYX.CONFIG.EVENT_SHOW_PROPERTYWINDOW="propertywindow.show";
ORYX.CONFIG.EVENT_DRAG_TRACKER_DRAG="dragTracker.drag";
ORYX.CONFIG.EVENT_DRAG_TRACKER_RESIZE="dragTracker.resize";
ORYX.CONFIG.EVENT_DROP_SHAPE="drop.shape";
ORYX.CONFIG.EVENT_SHAPE_DELETED="shape.deleted";
ORYX.CONFIG.EVENT_SHAPE_CREATED="shape.created";
ORYX.CONFIG.EVENT_SHAPE_ADDED="shape.added";
ORYX.CONFIG.EVENT_FACADE_SELECTION_DELETION_REQUEST="facade_selection.deletion.request";
ORYX.CONFIG.EVENT_NODEXML_SHOW="nodexml.show";
ORYX.CONFIG.EVENT_DATAIOEDITOR_SHOW="dataioeditor.show";
ORYX.CONFIG.EVENT_VOICE_COMMAND="voice.command";
ORYX.CONFIG.EVENT_SIMULATION_SHOW_RESULTS="simulation.showresults";
ORYX.CONFIG.EVENT_SIMULATION_DISPLAY_GRAPH="simulation.displaygraph";
ORYX.CONFIG.EVENT_SIMULATION_BUILD_PATH_SVG="simulation.buildpathsvg";
ORYX.CONFIG.EVENT_SIMULATION_CLEAR_PATH_SVG="simulation.clearpathsvg";
ORYX.CONFIG.EVENT_SIMULATION_PATH_SVG_GENERATED="simulation.pathsvggenerated";
ORYX.CONFIG.EVENT_SIMULATION_ANNOTATE_PROCESS="simulation.annotateprocess";
ORYX.CONFIG.EVENT_SIMULATION_SHOW_ANNOTATED_PROCESS="simulation.showannotatedprocess";
ORYX.CONFIG.EVENT_NOTIFICATION_SHOW="notification.show";
ORYX.CONFIG.EVENT_DEF_DELETED="notification.def.deleted";
ORYX.CONFIG.EVENT_UPDATE_TASK_TYPE="updatetaskevent";
ORYX.CONFIG.EVENT_PAINT_NEWSHAPE="paint.newshape";
ORYX.CONFIG.EVENT_PAINT_REMOVESHAPE="paint.removeshape";
ORYX.CONFIG.EVENT_CANVAS_RESIZED="canvas.resized";
ORYX.CONFIG.EVENT_CANVAS_RESIZE_SHAPES_MOVED="canvas.resizeshapemoved";
ORYX.CONFIG.EVENT_CANVAS_ZOOMED="canvas.zoomed";
ORYX.CONFIG.EVENT_MODE_CHANGED="mode.changed";
ORYX.CONFIG.EVENT_PAINT_CANVAS_TOGGLED="canvas.toggled";
ORYX.CONFIG.EVENT_DO_SAVE="designereventdosave";
ORYX.CONFIG.EVENT_DO_CHECKSAVE="designereventdochecksave";
ORYX.CONFIG.EVENT_CANCEL_SAVE="designereventcancelsave";
ORYX.CONFIG.EVENT_DO_RELOAD="designereventreloads";
ORYX.CONFIG.EVENT_UPDATE_LOCK="designerupdatelock";
ORYX.CONFIG.EVENT_OPEN_XML_EDITOR="designeropeninxmleditor";
ORYX.CONFIG.VOICE_COMMAND_GENERATE_FORMS="voice.command.generate.forms";
ORYX.CONFIG.VOICE_COMMAND_VALIDATE="voice.command.validate";
ORYX.CONFIG.VOICE_COMMAND_GENERATE_IMAGE="voice.command.generate.image";
ORYX.CONFIG.VOICE_COMMAND_VIEW_SOURCE="voice.command.view.source";
ORYX.CONFIG.VOICE_COMMAND_ADD_TASK="voice.command.add.task";
ORYX.CONFIG.VOICE_COMMAND_ADD_GATEWAY="voice.command.add.gateway";
ORYX.CONFIG.VOICE_COMMAND_ADD_START_EVENT="voice.command.add.start.event";
ORYX.CONFIG.VOICE_COMMAND_ADD_END_EVENT="voice.command.add.end.event";
ORYX.CONFIG.VOICE_COMMAND_TASK_TYPE_USER="voice.command.task.type.user";
ORYX.CONFIG.VOICE_COMMAND_TASK_TYPE_SCRIPT="voice.command.task.type.script";
ORYX.CONFIG.VOICE_COMMAND_GATEWAY_TYPE_PARALLEL="voice.command.gateway.type.parallel";
ORYX.CONFIG.VOICE_ENTRY_GENERATE_FORMS="create forms";
ORYX.CONFIG.VOICE_ENTRY_VALIDATE="validate";
ORYX.CONFIG.VOICE_ENTRY_GENERATE_IMAGE="create image";
ORYX.CONFIG.VOICE_ENTRY_VIEW_SOURCE="show bpmn";
ORYX.CONFIG.VOICE_ENTRY_ADD_TASK="task,test,text,that,map,10,chat,pet";
ORYX.CONFIG.VOICE_ENTRY_ADD_GATEWAY="gateway";
ORYX.CONFIG.VOICE_ENTRY_ADD_START_EVENT="start,bart,dark";
ORYX.CONFIG.VOICE_ENTRY_ADD_END_EVENT="end,and";
ORYX.CONFIG.VOICE_ENTRY_TASK_TYPE_USER="user,used";
ORYX.CONFIG.VOICE_ENTRY_TASK_TYPE_SCRIPT="script,strip,red";
ORYX.CONFIG.VOICE_ENTRY_GATEWAY_TYPE_PARALLEL="parallel";
ORYX.CONFIG.CREATE_PATTERN="create.pattern";
ORYX.CONFIG.SELECTION_HIGHLIGHT_SIZE=5;
ORYX.CONFIG.SELECTION_HIGHLIGHT_COLOR="#4444FF";
ORYX.CONFIG.SELECTION_HIGHLIGHT_COLOR2="#9999FF";
ORYX.CONFIG.SELECTION_HIGHLIGHT_STYLE_CORNER="corner";
ORYX.CONFIG.SELECTION_HIGHLIGHT_STYLE_RECTANGLE="rectangle";
ORYX.CONFIG.SELECTION_VALID_COLOR="#00FF00";
ORYX.CONFIG.SELECTION_INVALID_COLOR="#FF0000";
ORYX.CONFIG.DOCKER_DOCKED_COLOR="#00FF00";
ORYX.CONFIG.DOCKER_UNDOCKED_COLOR="#FF0000";
ORYX.CONFIG.DOCKER_SNAP_OFFSET=10;
ORYX.CONFIG.EDIT_OFFSET_PASTE=10;
ORYX.CONFIG.KEY_CODE_X=88;
ORYX.CONFIG.KEY_CODE_C=67;
ORYX.CONFIG.KEY_CODE_V=86;
ORYX.CONFIG.KEY_CODE_DELETE=46;
ORYX.CONFIG.KEY_CODE_META=224;
ORYX.CONFIG.KEY_CODE_BACKSPACE=8;
ORYX.CONFIG.KEY_CODE_LEFT=37;
ORYX.CONFIG.KEY_CODE_RIGHT=39;
ORYX.CONFIG.KEY_CODE_UP=38;
ORYX.CONFIG.KEY_CODE_DOWN=40;
ORYX.CONFIG.KEY_Code_enter=12;
ORYX.CONFIG.KEY_Code_left=37;
ORYX.CONFIG.KEY_Code_right=39;
ORYX.CONFIG.KEY_Code_top=38;
ORYX.CONFIG.KEY_Code_bottom=40;
ORYX.CONFIG.META_KEY_META_CTRL="metactrl";
ORYX.CONFIG.META_KEY_ALT="alt";
ORYX.CONFIG.META_KEY_SHIFT="shift";
ORYX.CONFIG.KEY_ACTION_DOWN="down";
ORYX.CONFIG.KEY_ACTION_UP="up";
ORYX.CONFIG.PANEL_RIGHT_COLLAPSED=true;
ORYX.CONFIG.PANEL_LEFT_COLLAPSED=true;
ORYX.CONFIG.STENCIL_MAX_ORDER=999;
ORYX.CONFIG.STENCIL_GROUP_ORDER=function(){var a={"http://b3mn.org/stencilset/bpmn2.0#":{Tasks:1,"Start Events":3,"Catching Intermediate Events":5,"Throwing Intermediate Events":6,"End Events":4,Gateways:7,Subprocesses:2,"Service Tasks":8,"Connecting Objects":9,"Data Objects":10,Swimlanes:11,Artifacts:12,"Workflow Patterns":13}};
return a
};
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(c){var a="";
var k,h,f,j,g,e,d;
var b=0;
c=Base64._utf8_encode(c);
while(b<c.length){k=c.charCodeAt(b++);
h=c.charCodeAt(b++);
f=c.charCodeAt(b++);
j=k>>2;
g=((k&3)<<4)|(h>>4);
e=((h&15)<<2)|(f>>6);
d=f&63;
if(isNaN(h)){e=d=64
}else{if(isNaN(f)){d=64
}}a=a+this._keyStr.charAt(j)+this._keyStr.charAt(g)+this._keyStr.charAt(e)+this._keyStr.charAt(d)
}return a
},decode:function(c){var a="";
var k,h,f;
var j,g,e,d;
var b=0;
c=c.replace(/[^A-Za-z0-9\+\/\=]/g,"");
while(b<c.length){j=this._keyStr.indexOf(c.charAt(b++));
g=this._keyStr.indexOf(c.charAt(b++));
e=this._keyStr.indexOf(c.charAt(b++));
d=this._keyStr.indexOf(c.charAt(b++));
k=(j<<2)|(g>>4);
h=((g&15)<<4)|(e>>2);
f=((e&3)<<6)|d;
a=a+String.fromCharCode(k);
if(e!=64){a=a+String.fromCharCode(h)
}if(d!=64){a=a+String.fromCharCode(f)
}}a=Base64._utf8_decode(a);
return a
},_utf8_encode:function(b){b=b.replace(/\r\n/g,"\n");
var a="";
for(var e=0;
e<b.length;
e++){var d=b.charCodeAt(e);
if(d<128){a+=String.fromCharCode(d)
}else{if((d>127)&&(d<2048)){a+=String.fromCharCode((d>>6)|192);
a+=String.fromCharCode((d&63)|128)
}else{a+=String.fromCharCode((d>>12)|224);
a+=String.fromCharCode(((d>>6)&63)|128);
a+=String.fromCharCode((d&63)|128)
}}}return a
},_utf8_decode:function(a){var b="";
var d=0;
var e=c1=c2=0;
while(d<a.length){e=a.charCodeAt(d);
if(e<128){b+=String.fromCharCode(e);
d++
}else{if((e>191)&&(e<224)){c2=a.charCodeAt(d+1);
b+=String.fromCharCode(((e&31)<<6)|(c2&63));
d+=2
}else{c2=a.charCodeAt(d+1);
c3=a.charCodeAt(d+2);
b+=String.fromCharCode(((e&15)<<12)|((c2&63)<<6)|(c3&63));
d+=3
}}}return b
}};
function printf(){var a=arguments[0];
for(var b=1;
b<arguments.length;
b++){a=a.replace("%"+(b-1),arguments[b])
}return a
}var ORYX_LOGLEVEL_TRACE=5;
var ORYX_LOGLEVEL_DEBUG=4;
var ORYX_LOGLEVEL_INFO=3;
var ORYX_LOGLEVEL_WARN=2;
var ORYX_LOGLEVEL_ERROR=1;
var ORYX_LOGLEVEL_FATAL=0;
if(!ORYX_LOGLEVEL){var ORYX_LOGLEVEL=1
}var ORYX_CONFIGURATION_DELAY=100;
var ORYX_CONFIGURATION_WAIT_ATTEMPTS=10;
if(!ORYX){var ORYX={}
}ORYX=Object.extend(ORYX,{PATH:ORYX.CONFIG.ROOT_PATH,alreadyLoaded:[],configrationRetries:0,availablePlugins:[],Log:{__appenders:[{append:function(a){if(typeof(console)!=="undefined"){console.log(a)
}}}],trace:function(){if(ORYX_LOGLEVEL>=ORYX_LOGLEVEL_TRACE){ORYX.Log.__log("TRACE",arguments)
}},debug:function(){if(ORYX_LOGLEVEL>=ORYX_LOGLEVEL_DEBUG){ORYX.Log.__log("DEBUG",arguments)
}},info:function(){if(ORYX_LOGLEVEL>=ORYX_LOGLEVEL_INFO){ORYX.Log.__log("INFO",arguments)
}},warn:function(){if(ORYX_LOGLEVEL>=ORYX_LOGLEVEL_WARN){ORYX.Log.__log("WARN",arguments)
}},error:function(){if(ORYX_LOGLEVEL>=ORYX_LOGLEVEL_ERROR){ORYX.Log.__log("ERROR",arguments)
}},fatal:function(){if(ORYX_LOGLEVEL>=ORYX_LOGLEVEL_FATAL){ORYX.Log.__log("FATAL",arguments)
}},__log:function(c,a){a[0]=(new Date()).getTime()+" "+c+" "+a[0];
var b=printf.apply(null,a);
ORYX.Log.__appenders.each(function(d){d.append(b)
})
},addAppender:function(a){ORYX.Log.__appenders.push(a)
}},load:function(){var a=new Ext.Window({renderTo:Ext.getBody(),id:"oryx-loading-panel",bodyStyle:"padding: 8px;background:white",title:ORYX.I18N.Oryx.title,width:"auto",height:"auto",modal:true,resizable:false,closable:false,html:'<span style="font-size:11px;">'+ORYX.I18N.Oryx.pleaseWait+"</span>"});
a.show();
ORYX.Log.debug("Oryx begins loading procedure.");
if((typeof Prototype=="undefined")||(typeof Element=="undefined")||(typeof Element.Methods=="undefined")||parseFloat(Prototype.Version.split(".")[0]+"."+Prototype.Version.split(".")[1])<1.5){throw ("Application requires the Prototype JavaScript framework >= 1.5.3")
}ORYX.Log.debug("Prototype > 1.5 found.");
init()
}});
ORYX.Log.debug("Registering Oryx with Kickstart");
Kickstart.register(ORYX.load);
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
var idCounter=0;
var ID_PREFIX="resource";
function init(){Ext.BLANK_IMAGE_URL=ORYX.BASE_FILE_PATH+"lib/ext-2.0.2/resources/images/default/s.gif";
ORYX.Log.debug("Querying editor instances");
ORYX.Editor.setMissingClasses()
}if(!ORYX){var ORYX={}
}ORYX.Editor={DOMEventListeners:new Hash(),selection:[],zoomLevel:1,construct:function(d){this._eventsQueue=[];
this.loadedPlugins=[];
this.pluginsData=[];
this.simulationChartTimeUnit="";
this.simulationChartData="";
this.simulationEventData="";
this.simulationEventAggregationData="";
this.simulationInstancesData="";
this.simulationHTCostData="";
this.simulationHTResourceData="";
this.simulationChartTitle="";
this.simulationChartId="";
this.simulationChartNodeName="";
this.simulationPathData="";
this.simulationPathId="";
this.simulationPathSVG="";
this.localStorageSVG="";
this.imagePreviewSVG="";
this.modelMetaData=d;
var c=d;
if(d.model){c=d.model
}this.updateViewLockState();
if(d.error){Ext.Msg.show({title:"Unable to open Process",msg:"Process will be opened with XML Editor",buttons:Ext.MessageBox.OK,fn:function(h,g){parent.designeropeninxmleditortab(ORYX.UUID)
}})
}this.id=c.resourceId;
if(!this.id){this.id=c.id;
if(!this.id){this.id=ORYX.Editor.provideId()
}}this.fullscreen=c.fullscreen||true;
this._initEventListener();
if(ORYX.CONFIG.BACKEND_SWITCH){var b=(c.stencilset.namespace||c.stencilset.url).replace("#","%23");
ORYX.Core.StencilSet.loadStencilSet(ORYX.CONFIG.STENCILSET_HANDLER+b,this.id)
}else{var b=c.stencilset.url;
ORYX.Core.StencilSet.loadStencilSet(b,this.id)
}if(!!ORYX.CONFIG.SSEXTS){ORYX.CONFIG.SSEXTS.each(function(g){this.loadSSExtension(g)
}.bind(this))
}this._createCanvas(c.stencil?c.stencil.id:null,c.properties);
this._generateGUI(d);
var f=false;
var e=false;
var a=function(){if(!f||!e){return
}this._finishedLoading()
}.bind(this);
ORYX.Editor.makeExtModalWindowKeysave(this._getPluginFacade());
window.setTimeout(function(){this.loadPlugins();
f=true;
a()
}.bind(this),100);
window.setTimeout(function(){this.loadSerialized(c);
this.getCanvas().update();
e=true;
a()
}.bind(this),200)
},updateViewLockState:function(){if(ORYX.INSTANCE_VIEW_MODE!=true){if((typeof parent.isLocked==="function")&&(typeof parent.isLockedByCurrentUser==="function")){var a=parent.isLocked();
var b=parent.isLockedByCurrentUser();
var c=(ORYX.READONLY==true)||(ORYX.VIEWLOCKED==true);
if(!a){ORYX.VIEWLOCKED=false
}else{if(a&&!b){ORYX.VIEWLOCKED=true
}else{if(a&&b){ORYX.VIEWLOCKED=false
}}}if(c&&!ORYX.VIEWLOCKED){if(typeof parent.reload==="function"){ORYX.PROCESS_SAVED=true;
parent.reload()
}}}}},_finishedLoading:function(){if(Ext.getCmp("oryx-loading-panel")){Ext.getCmp("oryx-loading-panel").hide()
}this.layout.doLayout();
new Ext.dd.DropTarget(this.getCanvas().rootNode.parentNode);
if(ORYX.CONFIG.PANEL_RIGHT_COLLAPSED===true){this.layout_regions.east.collapse()
}if(ORYX.CONFIG.PANEL_LEFT_COLLAPSED===true){this.layout_regions.west.collapse()
}this.handleEvents({type:ORYX.CONFIG.EVENT_LOADED})
},_initEventListener:function(){document.documentElement.addEventListener(ORYX.CONFIG.EVENT_KEYDOWN,this.catchKeyDownEvents.bind(this),true);
document.documentElement.addEventListener(ORYX.CONFIG.EVENT_KEYUP,this.catchKeyUpEvents.bind(this),true);
this._keydownEnabled=true;
this._keyupEnabled=true;
this.DOMEventListeners[ORYX.CONFIG.EVENT_MOUSEDOWN]=[];
this.DOMEventListeners[ORYX.CONFIG.EVENT_MOUSEUP]=[];
this.DOMEventListeners[ORYX.CONFIG.EVENT_MOUSEOVER]=[];
this.DOMEventListeners[ORYX.CONFIG.EVENT_MOUSEOUT]=[];
this.DOMEventListeners[ORYX.CONFIG.EVENT_SELECTION_CHANGED]=[];
this.DOMEventListeners[ORYX.CONFIG.EVENT_MOUSEMOVE]=[]
},_chartSelected:function(b,a){this._getPluginFacade().raiseEvent({type:ORYX.CONFIG.EVENT_SIMULATION_DISPLAY_GRAPH,value:b})
},_generateGUI:function(b){var c=660;
var f=this.getCanvas().rootNode.parentNode;
this.centerContentPanel=new Ext.Panel({autoScroll:true,cmargins:{left:0,right:0},border:false,items:{layout:"fit",autoHeight:true,el:f}});
this.resultsChartPanel=new Ext.Panel({border:false,id:"simchart",html:"<svg></svg>"});
this.simResultsContentPanel=new Ext.Panel({id:"simresultscontent",autoScroll:true,autoheight:true,border:false,items:[{xtype:"component",id:"simchartframe",anchor:"100%",autoScroll:true,autoEl:{tag:"iframe",src:ORYX.BASE_FILE_PATH+"simulation/default.jsp",width:"100%",height:"500",frameborder:"0",scrolling:"auto"}}]});
this.simInfoPanel=new Ext.Panel({bodyStyle:"background:#ffff;font-size:9px;font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;padding-left:5px;",id:"siminfopanel",title:ORYX.I18N.View.sim.resultsInfo,autoScroll:true,autoheight:false,height:300,border:false,html:""});
this.simResultsTree=new Ext.tree.TreePanel({id:"simresultscharts",title:ORYX.I18N.View.sim.resultsGraphs,animate:true,loader:new Ext.tree.TreeLoader(),rootVisible:false,scroll:true,autoScroll:true,autoheight:true,viewConfig:{style:{overflow:"scroll",overflowY:"scroll",overflowX:"scroll"}},lines:true,listeners:{click:{fn:this._chartSelected.bind(this)}}});
var a=new Ext.tree.TreeNode({draggable:false,id:"simcharts"});
this.simResultsTree.setRootNode(a);
this.simResultsContentPanelLayout=new Ext.Panel({width:"100%",autoscroll:true,layout:"border",items:[{xtype:"panel",region:"east",margins:"5 0 0 5",layout:"fit",anchor:"100%",width:300,border:false,collapsible:true,autoscroll:true,split:false,cmargins:"5 5 0 5",bodyCfg:{style:{overflow:"auto"}},autoScroll:true,items:[this.simResultsTree,this.simInfoPanel]},{xtype:"panel",region:"center",layout:"fit",anchor:"100%",border:false,autoscroll:true,autoheight:true,margins:"5 5 0 0",items:[this.simResultsContentPanel]}]});
this.processDocContentPanel=new Ext.Panel({id:"processdoccontent",autoScroll:true,autoheight:true,border:false,items:[{xtype:"component",id:"processdocframe",anchor:"100%",autoScroll:true,autoEl:{tag:"iframe",src:ORYX.BASE_FILE_PATH+"processdoc/default.jsp",width:"100%",height:"500",frameborder:"0",scrolling:"auto"}}]});
this.processDocPanelLayout=new Ext.Panel({width:"100%",autoscroll:true,layout:"border",items:[{xtype:"panel",region:"center",layout:"fit",anchor:"100%",border:false,autoscroll:true,autoheight:true,margins:"5 5 0 0",items:[this.processDocContentPanel]}]});
var g={id:"maintabs",region:"center",cls:"x-panel-editor-center",autoScroll:false,cmargins:{left:0,right:0},activeTab:0,border:false,tabPosition:"top",anchor:"100%",deferredRender:false,listeners:{tabchange:function(h,i){if(i.id=="processdoctab"){document.getElementById("processdocframe").contentWindow.showProcessDocs()
}this.centerContentTabPannel.doLayout();
this.simResultsContentPanelLayout.doLayout();
this.processDocPanelLayout.doLayout();
h.doLayout()
}.bind(this)},items:[{layout:"fit",title:ORYX.I18N.View.tabs.modelling,id:"processmodellingtab",items:[this.centerContentPanel]},{layout:"fit",title:ORYX.I18N.View.tabs.simResults,id:"simulationtab",autoScroll:false,items:[this.simResultsContentPanelLayout]},{layout:"fit",title:ORYX.I18N.View.tabs.processDoc,id:"processdoctab",autoScroll:false,items:[this.processDocPanelLayout]}]};
this.centerContentTabPannel=new Ext.TabPanel(g);
if(ORYX.READONLY==true){Ext.getCmp("maintabs").remove("simulationtab");
Ext.getCmp("maintabs").remove("processdoctab")
}if(ORYX.VIEWLOCKED==true){Ext.getCmp("maintabs").remove("simulationtab");
Ext.getCmp("maintabs").remove("processdoctab")
}var e=ORYX.CONFIG.PANEL_LEFT_WIDTH||400;
if(ORYX.READONLY==true){e=10
}if(ORYX.VIEWLOCKED==true){e=10
}this.layout_regions={north:new Ext.Panel({region:"north",cls:"x-panel-editor-north",autoEl:"div",border:false}),east:new Ext.Panel({region:"east",layout:"anchor",autoEl:"div",border:false,cls:"x-panel-editor-east",width:e,autoScroll:true,split:false,animate:true,collapsible:true,titleCollapse:true,title:"Properties",plugins:new Ext.ux.PanelCollapsedTitlePlugin()}),south:new Ext.Panel({region:"south",cls:"x-panel-editor-south",autoEl:"div",border:false}),west:new Ext.Panel({region:"west",layout:"anchor",autoEl:"div",border:false,cls:"x-panel-editor-west",width:ORYX.CONFIG.PANEL_LEFT_WIDTH||200,autoScroll:true,split:false,animate:true,collapsible:true,titleCollapse:true,title:ORYX.I18N.main.shapeRepo,plugins:new Ext.ux.PanelCollapsedTitlePlugin()}),center:this.centerContentTabPannel};
for(region in this.layout_regions){if((region!="center"&&region!="north")&&(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.layout_regions[region].setVisible(false)
}}var d={layout:"border",items:[this.layout_regions.north,this.layout_regions.east,this.layout_regions.south,this.layout_regions.west,this.layout_regions.center]};
this.contentviewport=new Ext.Viewport(d);
if(this.fullscreen){this.layout=new Ext.Viewport(d)
}else{d.renderTo=this.id;
d.height=c;
this.layout=new Ext.Panel(d)
}f.parentNode.setAttributeNS(null,"align","center");
f.setAttributeNS(null,"align","left");
this.getCanvas().setSize({width:ORYX.CONFIG.CANVAS_WIDTH,height:ORYX.CONFIG.CANVAS_HEIGHT})
},addToRegion:function(d,a,e){if(d.toLowerCase&&this.layout_regions[d.toLowerCase()]){var b=this.layout_regions[d.toLowerCase()];
b.add(a);
ORYX.Log.debug("original dimensions of region %0: %1 x %2",b.region,b.width,b.height);
if(!b.width&&a.initialConfig&&a.initialConfig.width){ORYX.Log.debug("resizing width of region %0: %1",b.region,a.initialConfig.width);
b.setWidth(a.initialConfig.width)
}if(a.initialConfig&&a.initialConfig.height){ORYX.Log.debug("resizing height of region %0: %1",b.region,a.initialConfig.height);
var c=b.height||0;
b.height=a.initialConfig.height+c;
b.setHeight(a.initialConfig.height+c)
}if(typeof e=="string"){b.setTitle(e)
}b.ownerCt.doLayout();
if((ORYX.VIEWLOCKED==true||ORYX.READONLY==true)&&b.region!="center"){}else{b.show()
}if(Ext.isMac){ORYX.Editor.resizeFix()
}return b
}return null
},getAvailablePlugins:function(){var a=ORYX.availablePlugins.clone();
a.each(function(b){if(this.loadedPlugins.find(function(c){return c.type==this.name
}.bind(b))){b.engaged=true
}else{b.engaged=false
}}.bind(this));
return a
},loadScript:function(b,c){var a=document.createElement("script");
a.type="text/javascript";
if(a.readyState){a.onreadystatechange=function(){if(a.readyState=="loaded"||a.readyState=="complete"){a.onreadystatechange=null;
c()
}}
}else{a.onload=function(){c()
}
}a.src=b;
document.getElementsByTagName("head")[0].appendChild(a)
},activatePluginByName:function(name,callback,loadTry){var match=this.getAvailablePlugins().find(function(value){return value.name==name
});
if(match&&(!match.engaged||(match.engaged==="false"))){var loadedStencilSetsNamespaces=this.getStencilSets().keys();
var facade=this._getPluginFacade();
var newPlugin;
var me=this;
ORYX.Log.debug("Initializing plugin '%0'",match.name);
if(!match.requires||!match.requires.namespaces||match.requires.namespaces.any(function(req){return loadedStencilSetsNamespaces.indexOf(req)>=0
})){if(!match.notUsesIn||!match.notUsesIn.namespaces||!match.notUsesIn.namespaces.any(function(req){return loadedStencilSetsNamespaces.indexOf(req)>=0
})){try{var className=eval(match.name);
var newPlugin=new className(facade,match);
newPlugin.type=match.name;
if(newPlugin.registryChanged){newPlugin.registryChanged(me.pluginsData)
}if(newPlugin.onSelectionChanged){me.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED,newPlugin.onSelectionChanged.bind(newPlugin))
}this.loadedPlugins.push(newPlugin);
this.loadedPlugins.each(function(loaded){if(loaded.registryChanged){loaded.registryChanged(this.pluginsData)
}}.bind(me));
callback(true)
}catch(e){ORYX.Log.warn("Plugin %0 is not available",match.name);
if(!!loadTry){callback(false,"INITFAILED");
return
}this.loadScript("plugins/scripts/"+match.source,this.activatePluginByName.bind(this,match.name,callback,true))
}}else{callback(false,"NOTUSEINSTENCILSET");
ORYX.Log.info("Plugin need a stencilset which is not loaded'",match.name)
}}else{callback(false,"REQUIRESTENCILSET");
ORYX.Log.info("Plugin need a stencilset which is not loaded'",match.name)
}}else{callback(false,match?"NOTFOUND":"YETACTIVATED")
}},loadPlugins:function(){var me=this;
var newPlugins=[];
var loadedStencilSetsNamespaces=this.getStencilSets().keys();
var facade=this._getPluginFacade();
if(ORYX.MashupAPI&&ORYX.MashupAPI.loadablePlugins&&ORYX.MashupAPI.loadablePlugins instanceof Array){ORYX.availablePlugins=$A(ORYX.availablePlugins).findAll(function(value){return ORYX.MashupAPI.loadablePlugins.include(value.name)
});
ORYX.MashupAPI.loadablePlugins.each(function(className){if(!(ORYX.availablePlugins.find(function(val){return val.name==className
}))){ORYX.availablePlugins.push({name:className})
}})
}ORYX.availablePlugins.each(function(value){ORYX.Log.debug("Initializing plugin '%0'",value.name);
if((!value.requires||!value.requires.namespaces||value.requires.namespaces.any(function(req){return loadedStencilSetsNamespaces.indexOf(req)>=0
}))&&(!value.notUsesIn||!value.notUsesIn.namespaces||!value.notUsesIn.namespaces.any(function(req){return loadedStencilSetsNamespaces.indexOf(req)>=0
}))&&(value.engaged||(value.engaged===undefined))){try{var className=eval(value.name);
if(className){var plugin=new className(facade,value);
plugin.type=value.name;
newPlugins.push(plugin);
plugin.engaged=true
}}catch(e){ORYX.Log.warn("Plugin %0 is not available",value.name)
}}else{ORYX.Log.info("Plugin need a stencilset which is not loaded'",value.name)
}});
newPlugins.each(function(value){if(value.registryChanged){value.registryChanged(me.pluginsData)
}if(value.onSelectionChanged){me.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED,value.onSelectionChanged.bind(value))
}});
this.loadedPlugins=newPlugins;
if(Ext.isMac){ORYX.Editor.resizeFix()
}this.registerPluginsOnKeyEvents();
this.setSelection()
},_createCanvas:function(c,d){if(c){if(c.search(/^http/)===-1){c=this.getStencilSets().values()[0].namespace()+c
}}else{c=this.getStencilSets().values()[0].findRootStencilName()
}var a=ORYX.Core.StencilSet.stencil(c);
if(!a){ORYX.Log.fatal("Initialisation failed, because the stencil with the type %0 is not part of one of the loaded stencil sets.",c)
}var e=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",null,["div"]);
e.addClassName("ORYX_Editor");
this._canvas=new ORYX.Core.Canvas({width:ORYX.CONFIG.CANVAS_WIDTH,height:ORYX.CONFIG.CANVAS_HEIGHT,eventHandlerCallback:this.handleEvents.bind(this),id:this.id,parentNode:e},a);
if(d){var b=[];
for(field in d){b.push({prefix:"oryx",name:field,value:d[field]})
}this._canvas.deserialize(b)
}},_getPluginFacade:function(){if(!(this._pluginFacade)){this._pluginFacade={activatePluginByName:this.activatePluginByName.bind(this),getAvailablePlugins:this.getAvailablePlugins.bind(this),offer:this.offer.bind(this),getStencilSets:this.getStencilSets.bind(this),getRules:this.getRules.bind(this),loadStencilSet:this.loadStencilSet.bind(this),createShape:this.createShape.bind(this),deleteShape:this.deleteShape.bind(this),getSelection:this.getSelection.bind(this),setSelection:this.setSelection.bind(this),updateSelection:this.updateSelection.bind(this),getCanvas:this.getCanvas.bind(this),importJSON:this.importJSON.bind(this),importERDF:this.importERDF.bind(this),getERDF:this.getERDF.bind(this),getJSON:this.getJSON.bind(this),getSerializedJSON:this.getSerializedJSON.bind(this),checkParsingErrors:this.checkParsingErrors.bind(this),showParsingErrors:this.showParsingErrors.bind(this),executeCommands:this.executeCommands.bind(this),registerOnEvent:this.registerOnEvent.bind(this),unregisterOnEvent:this.unregisterOnEvent.bind(this),raiseEvent:this.handleEvents.bind(this),enableEvent:this.enableEvent.bind(this),disableEvent:this.disableEvent.bind(this),eventCoordinates:this.eventCoordinates.bind(this),addToRegion:this.addToRegion.bind(this),getModelMetaData:this.getModelMetaData.bind(this)}
}return this._pluginFacade
},executeCommands:function(a){if(a instanceof Array&&a.length>0&&a.all(function(c){return c instanceof ORYX.Core.Command
})){this.handleEvents({type:ORYX.CONFIG.EVENT_EXECUTE_COMMANDS,commands:a});
var b;
a.each(function(c){b=c.execute()
});
return b
}},getJSON:function(){var a=this.getCanvas().toJSON();
a.ssextensions=this.getStencilSets().values()[0].extensions().keys();
return a
},getSerializedJSON:function(){return Ext.encode(this.getJSON())
},checkParsingErrors:function(){var c=ORYX.EDITOR.getSerializedJSON();
var a=new XMLHttpRequest;
var b=ORYX.PATH+"uuidRepository";
var g="action=checkErrors&pp="+ORYX.PREPROCESSING+"&profile="+ORYX.PROFILE+"&data="+encodeURIComponent(c);
a.open("POST",b,false);
a.setRequestHeader("Content-type","application/x-www-form-urlencoded");
a.send(g);
if(a.status==200){if(a.responseText=="true"){return"true"
}else{var f=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(false));
var d=DataManager.serialize(ORYX.EDITOR.getCanvas().getRootNode().cloneNode(true));
var c=ORYX.EDITOR.getSerializedJSON();
var e=jsonPath(c.evalJSON(),"$.properties.id");
Ext.Ajax.request({url:ORYX.PATH+"transformer",method:"POST",success:function(h){},failure:function(){Ext.Msg.minWidth=400;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.main.failSave,title:""})
},params:{fsvg:f,rsvg:d,uuid:ORYX.UUID,profile:ORYX.PROFILE,transformto:"svg",processid:e}});
return"false"
}}else{return"true"
}},showParsingErrors:function(){Ext.Msg.minWidth=360;
Ext.MessageBox.alert(ORYX.I18N.main.unableUserAction)
},getERDF:function(){var a=DataManager.serializeDOM(this._getPluginFacade());
a='<?xml version="1.0" encoding="utf-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:b3mn="http://b3mn.org/2007/b3mn" xmlns:ext="http://b3mn.org/2007/ext" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:atom="http://b3mn.org/2007/atom+xhtml"><head profile="http://purl.org/NET/erdf/profile"><link rel="schema.dc" href="http://purl.org/dc/elements/1.1/" /><link rel="schema.dcTerms" href="http://purl.org/dc/terms/ " /><link rel="schema.b3mn" href="http://b3mn.org" /><link rel="schema.oryx" href="http://oryx-editor.org/" /><link rel="schema.raziel" href="http://raziel.org/" /><base href="'+location.href.split("?")[0]+'" /></head><body>'+a+"</body></html>";
return a
},importJSON:function(d,c){try{d=this.renewResourceIds(d)
}catch(b){throw b
}if(!d.stencilset){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.JSONImport.invalidJSON,title:ORYX.I18N.JSONImport.title});
return null
}if(d.stencilset.namespace&&d.stencilset.namespace!==this.getCanvas().getStencil().stencilSet().namespace()){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:String.format(ORYX.I18N.JSONImport.wrongSS,d.stencilset.namespace,this.getCanvas().getStencil().stencilSet().namespace()),title:ORYX.I18N.JSONImport.title});
return null
}else{var a=ORYX.Core.Command.extend({construct:function(g,i,f,h){this.jsonObject=g;
this.noSelection=f;
this.facade=h;
this.shapes;
this.connections=[];
this.parents=new Hash();
this.selection=this.facade.getSelection();
this.loadSerialized=i
},execute:function(){if(!this.shapes){this.shapes=this.loadSerialized(this.jsonObject);
this.shapes.each(function(g){if(g.getDockers){var f=g.getDockers();
if(f){if(f.length>0){this.connections.push([f.first(),f.first().getDockedShape(),f.first().referencePoint])
}if(f.length>1){this.connections.push([f.last(),f.last().getDockedShape(),f.last().referencePoint])
}}}this.parents[g.id]=g.parent
}.bind(this))
}else{this.shapes.each(function(f){this.parents[f.id].add(f)
}.bind(this));
this.connections.each(function(f){f[0].setDockedShape(f[1]);
f[0].setReferencePoint(f[2])
})
}this.facade.getCanvas().update();
if(!this.noSelection){this.facade.setSelection(this.shapes)
}else{this.facade.updateSelection()
}},rollback:function(){var f=this.facade.getSelection();
this.shapes.each(function(g){f=f.without(g);
this.facade.deleteShape(g)
}.bind(this));
this.facade.getCanvas().update();
this.facade.setSelection(f)
}});
var e=new a(d,this.loadSerialized.bind(this),c,this._getPluginFacade());
this.executeCommands([e]);
return e.shapes.clone()
}},renewResourceIds:function(b){if(Ext.type(b)==="string"){try{var d=b;
b=Ext.decode(b)
}catch(a){throw new SyntaxError(a.message)
}}else{var d=Ext.encode(b)
}var e=function(f){if(!f){return[]
}return f.map(function(g){return e(g.childShapes).concat(g.resourceId)
}).flatten()
};
var c=e(b.childShapes);
c.each(function(f){var g=ORYX.Editor.provideId();
d=d.gsub('"'+f+'"','"'+g+'"')
});
return Ext.decode(d)
},importERDF:function(a){var b=this.parseToSerializeObjects(a);
if(b){return this.importJSON(b,true)
}},parseToSerializeObjects:function(c){if(c.normalize){c.normalize()
}try{var d="";
var a=ORYX.PATH+"lib/extract-rdf.xsl";
new Ajax.Request(a,{asynchronous:false,method:"get",onSuccess:function(e){d=e.responseText
}.bind(this),onFailure:(function(e){ORYX.Log.error("XSL load failed"+e)
}).bind(this)});
var k=new DOMParser();
var g=c;
var f=k.parseFromString(d,"text/xml");
var h=new XSLTProcessor();
var l=document.implementation.createDocument("","",null);
h.importStylesheet(f);
var m=h.transformToFragment(g,document);
var b=(new XMLSerializer()).serializeToString(m)
}catch(i){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.BPELSupport.error+": "+i,title:""});
var b=""
}b=!b.startsWith("<?xml")?'<?xml version="1.0" encoding="UTF-8"?>'+b:b;
var j=new Ajax.Request(ORYX.CONFIG.ROOT_PATH+"rdf2json",{method:"POST",asynchronous:false,onSuccess:function(e){Ext.decode(e.responseText)
},parameters:{rdf:b}});
return Ext.decode(j.transport.responseText)
},loadSerialized:function(c){var b=this.getCanvas();
this.loadSSExtensions(c.ssextensions);
var a=this.getCanvas().addShapeObjects(c.childShapes,this.handleEvents.bind(this));
if(c.properties){for(key in c.properties){var d=c.properties[key];
if(!(typeof d==="string")){d=Ext.encode(d)
}this.getCanvas().setProperty("oryx-"+key,d)
}}this.getCanvas().updateSize();
return a
},loadSSExtensions:function(a){if(!a){return
}a.each(function(b){this.loadSSExtension(b)
}.bind(this))
},loadSSExtension:function(b){if(!b){return
}var a=this.getStencilSets()[b["extends"]];
if(!a){return
}a.addExtension(b);
this.getRules().initializeRules(a);
this._getPluginFacade().raiseEvent({type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED})
},disableEvent:function(a){if(a==ORYX.CONFIG.EVENT_KEYDOWN){this._keydownEnabled=false
}if(a==ORYX.CONFIG.EVENT_KEYUP){this._keyupEnabled=false
}if(this.DOMEventListeners.keys().member(a)){var b=this.DOMEventListeners.remove(a);
this.DOMEventListeners["disable_"+a]=b
}},enableEvent:function(a){if(a==ORYX.CONFIG.EVENT_KEYDOWN){this._keydownEnabled=true
}if(a==ORYX.CONFIG.EVENT_KEYUP){this._keyupEnabled=true
}if(this.DOMEventListeners.keys().member("disable_"+a)){var b=this.DOMEventListeners.remove("disable_"+a);
this.DOMEventListeners[a]=b
}},registerOnEvent:function(a,b){if(!(this.DOMEventListeners.keys().member(a))){this.DOMEventListeners[a]=[]
}this.DOMEventListeners[a].push(b)
},unregisterOnEvent:function(a,b){if(this.DOMEventListeners.keys().member(a)){this.DOMEventListeners[a]=this.DOMEventListeners[a].without(b)
}else{}},getSelection:function(){return this.selection
},getStencilSets:function(){return ORYX.Core.StencilSet.stencilSets(this.id)
},getRules:function(){return ORYX.Core.StencilSet.rules(this.id)
},loadStencilSet:function(a){try{ORYX.Core.StencilSet.loadStencilSet(a,this.id);
this.handleEvents({type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED})
}catch(b){ORYX.Log.warn("Requesting stencil set file failed. ("+b+")")
}},offer:function(a){if(!this.pluginsData.member(a)){this.pluginsData.push(a)
}},registerPluginsOnKeyEvents:function(){this.pluginsData.each(function(a){if(a.keyCodes){a.keyCodes.each(function(c){var b="key.event";
b+="."+c.keyAction;
if(c.metaKeys){if(c.metaKeys.indexOf(ORYX.CONFIG.META_KEY_META_CTRL)>-1){b+="."+ORYX.CONFIG.META_KEY_META_CTRL
}if(c.metaKeys.indexOf(ORYX.CONFIG.META_KEY_ALT)>-1){b+="."+ORYX.CONFIG.META_KEY_ALT
}if(c.metaKeys.indexOf(ORYX.CONFIG.META_KEY_SHIFT)>-1){b+="."+ORYX.CONFIG.META_KEY_SHIFT
}}if(c.keyCode){b+="."+c.keyCode
}ORYX.Log.debug("Register Plugin on Key Event: %0",b);
this.registerOnEvent(b,a.functionality)
}.bind(this))
}}.bind(this))
},setSelection:function(c,a,b){if(!c){c=[]
}c=c.compact().findAll(function(d){return d instanceof ORYX.Core.Shape
});
if(c.first() instanceof ORYX.Core.Canvas){c=[]
}if(!b&&c.length===this.selection.length&&this.selection.all(function(d){return c.include(d)
})){return
}this.selection=c;
this._subSelection=a;
this.handleEvents({type:ORYX.CONFIG.EVENT_SELECTION_CHANGED,elements:c,subSelection:a})
},updateSelection:function(){this.setSelection(this.selection,this._subSelection,true)
},getCanvas:function(){return this._canvas
},createShape:function(f){if(f&&f.serialize&&f.serialize instanceof Array){var i=f.serialize.find(function(b){return(b.prefix+"-"+b.name)=="oryx-type"
});
var n=ORYX.Core.StencilSet.stencil(i.value);
if(n.type()=="node"){var h=new ORYX.Core.Node({eventHandlerCallback:this.handleEvents.bind(this)},n)
}else{var h=new ORYX.Core.Edge({eventHandlerCallback:this.handleEvents.bind(this)},n)
}this.getCanvas().add(h);
h.deserialize(f.serialize);
return h
}if(!f||!f.type||!f.namespace){throw"To create a new shape you have to give an argument with type and namespace"
}var e=this.getCanvas();
var h;
var a=f.type;
var k=ORYX.Core.StencilSet.stencilSet(f.namespace);
if(k.stencil(a).type()=="node"){h=new ORYX.Core.Node({eventHandlerCallback:this.handleEvents.bind(this)},k.stencil(a))
}else{h=new ORYX.Core.Edge({eventHandlerCallback:this.handleEvents.bind(this)},k.stencil(a))
}if(f.template){h._jsonStencil.properties=f.template._jsonStencil.properties;
h.postProcessProperties()
}if(f.parent&&h instanceof ORYX.Core.Node){f.parent.add(h)
}else{e.add(h)
}var l=f.position?f.position:{x:100,y:200};
var c;
if(f.connectingType&&f.connectedShape&&!(h instanceof ORYX.Core.Edge)){c=new ORYX.Core.Edge({eventHandlerCallback:this.handleEvents.bind(this)},k.stencil(f.connectingType));
c.dockers.first().setDockedShape(f.connectedShape);
var m=f.connectedShape.getDefaultMagnet();
var o=m?m.bounds.center():f.connectedShape.bounds.midPoint();
c.dockers.first().setReferencePoint(o);
c.dockers.last().setDockedShape(h);
c.dockers.last().setReferencePoint(h.getDefaultMagnet().bounds.center());
e.add(c)
}if(h instanceof ORYX.Core.Edge&&f.connectedShape){h.dockers.first().setDockedShape(f.connectedShape);
if(f.connectedShape instanceof ORYX.Core.Node){h.dockers.first().setReferencePoint(f.connectedShape.getDefaultMagnet().bounds.center());
h.dockers.last().bounds.centerMoveTo(l)
}else{h.dockers.first().setReferencePoint(f.connectedShape.bounds.midPoint())
}}else{var j=h.bounds;
if(h instanceof ORYX.Core.Node&&h.dockers.length==1){j=h.dockers.first().bounds
}j.centerMoveTo(l);
var d=j.upperLeft();
j.moveBy(-Math.min(d.x,0),-Math.min(d.y,0));
var g=j.lowerRight();
j.moveBy(-Math.max(g.x-e.bounds.width(),0),-Math.max(g.y-e.bounds.height(),0))
}if(h instanceof ORYX.Core.Edge){h._update(false)
}if(!(h instanceof ORYX.Core.Edge)){this.setSelection([h])
}if(c&&c.alignDockers){c.alignDockers()
}if(h.alignDockers){h.alignDockers()
}this._getPluginFacade().raiseEvent({type:ORYX.CONFIG.EVENT_SHAPE_CREATED,value:h});
return h
},deleteShape:function(a){if(!a||!a.parent){return
}a.parent.remove(a);
a.getOutgoingShapes().each(function(c){var b=c.getDockers().first();
if(b&&b.getDockedShape()==a){b.setDockedShape(undefined)
}}.bind(this));
a.getIncomingShapes().each(function(b){var c=b.getDockers().last();
if(c&&c.getDockedShape()==a){c.setDockedShape(undefined)
}}.bind(this));
a.getDockers().each(function(b){b.setDockedShape(undefined)
});
this._getPluginFacade().raiseEvent({type:ORYX.CONFIG.EVENT_SHAPE_DELETED,value:a})
},getModelMetaData:function(){return this.modelMetaData
},_executeEventImmediately:function(a){if(this.DOMEventListeners.keys().member(a.event.type)){this.DOMEventListeners[a.event.type].each((function(b){b(a.event,a.arg)
}).bind(this))
}},_executeEvents:function(){this._queueRunning=true;
while(this._eventsQueue.length>0){var a=this._eventsQueue.shift();
this._executeEventImmediately(a)
}this._queueRunning=false
},handleEvents:function(b,a){ORYX.Log.trace("Dispatching event type %0 on %1",b.type,a);
switch(b.type){case ORYX.CONFIG.EVENT_MOUSEDOWN:this._handleMouseDown(b,a);
break;
case ORYX.CONFIG.EVENT_MOUSEMOVE:this._handleMouseMove(b,a);
break;
case ORYX.CONFIG.EVENT_MOUSEUP:this._handleMouseUp(b,a);
break;
case ORYX.CONFIG.EVENT_MOUSEOVER:this._handleMouseHover(b,a);
break;
case ORYX.CONFIG.EVENT_MOUSEOUT:this._handleMouseOut(b,a);
break
}if(b.forceExecution){this._executeEventImmediately({event:b,arg:a})
}else{this._eventsQueue.push({event:b,arg:a})
}if(!this._queueRunning){this._executeEvents()
}return false
},catchKeyUpEvents:function(b){if(!this._keyupEnabled){return
}if(!b){b=window.event
}if(["INPUT","TEXTAREA"].include(b.target.tagName.toUpperCase())){return
}var a=this.createKeyCombEvent(b,ORYX.CONFIG.KEY_ACTION_UP);
ORYX.Log.debug("Key Event to handle: %0",a);
this.handleEvents({type:a,event:b})
},catchKeyDownEvents:function(b){if(!this._keydownEnabled){return
}if(!b){b=window.event
}if(["INPUT","TEXTAREA"].include(b.target.tagName.toUpperCase())){return
}var a=this.createKeyCombEvent(b,ORYX.CONFIG.KEY_ACTION_DOWN);
ORYX.Log.debug("Key Event to handle: %0",a);
this.handleEvents({type:a,event:b})
},createKeyCombEvent:function(c,b){var d=c.which||c.keyCode;
var a="key.event";
if(b){a+="."+b
}if(c.ctrlKey||c.metaKey){a+="."+ORYX.CONFIG.META_KEY_META_CTRL
}if(c.altKey){a+="."+ORYX.CONFIG.META_KEY_ALT
}if(c.shiftKey){a+="."+ORYX.CONFIG.META_KEY_SHIFT
}return a+"."+d
},_handleMouseDown:function(a,j){var b=this.getCanvas();
b.focus();
var d=a.currentTarget;
var c=j;
var g=(c!==null)&&(c!==undefined)&&(c.isSelectable);
var k=(c!==null)&&(c!==undefined)&&(c.isMovable);
var i=a.shiftKey||a.ctrlKey;
var h=this.selection.length===0;
var e=this.selection.member(c);
if(g&&h){this.setSelection([c]);
ORYX.Log.trace("Rule #1 applied for mouse down on %0",d.id)
}else{if(g&&!h&&!i&&!e){this.setSelection([c]);
ORYX.Log.trace("Rule #3 applied for mouse down on %0",d.id)
}else{if(g&&i&&!e){var f=this.selection.clone();
f.push(c);
this.setSelection(f);
ORYX.Log.trace("Rule #4 applied for mouse down on %0",d.id)
}else{if(g&&e&&i){var f=this.selection.clone();
this.setSelection(f.without(c));
ORYX.Log.trace("Rule #6 applied for mouse down on %0",c.id)
}else{if(!g&&!k){this.setSelection([]);
ORYX.Log.trace("Rule #2 applied for mouse down on %0",d.id);
return
}else{if(!g&&k&&!(c instanceof ORYX.Core.Controls.Docker)){ORYX.Log.trace("Rule #7 applied for mouse down on %0",d.id)
}else{if(g&&e&&!i){this._subSelection=this._subSelection!=c?c:undefined;
this.setSelection(this.selection,this._subSelection);
ORYX.Log.trace("Rule #8 applied for mouse down on %0",d.id)
}}}}}}}return
},_handleMouseMove:function(b,a){return
},_handleMouseUp:function(d,c){var a=this.getCanvas();
var e=c;
var b=this.eventCoordinates(d)
},_handleMouseHover:function(b,a){return
},_handleMouseOut:function(b,a){return
},eventCoordinates:function(c){var b=this.getCanvas();
var d=b.node.ownerSVGElement.createSVGPoint();
d.x=c.clientX;
d.y=c.clientY;
var a=b.node.getScreenCTM();
return d.matrixTransform(a.inverse())
}};
ORYX.Editor=Clazz.extend(ORYX.Editor);
ORYX.Editor.createByUrl=function(b,a){if(!a){a={}
}new Ajax.Request(b,{method:"GET",onSuccess:function(d){var c=Ext.decode(d.responseText);
c=Ext.applyIf(c,a);
new ORYX.Editor(c);
if("function"==typeof(a.onSuccess)){a.onSuccess(d)
}}.bind(this),onFailure:function(c){if("function"==typeof(a.onFailure)){a.onFailure(c)
}}.bind(this)})
};
ORYX.Editor.graft=function(g,f,d,j){j=(j||(f&&f.ownerDocument)||document);
var h;
if(d===undefined){throw"Can't graft an undefined value"
}else{if(d.constructor==String){h=j.createTextNode(d)
}else{for(var c=0;
c<d.length;
c++){if(c===0&&d[c].constructor==String){var a;
a=d[c].match(/^([a-z][a-z0-9]*)\.([^\s\.]+)$/i);
if(a){h=j.createElementNS(g,a[1]);
h.setAttributeNS(null,"class",a[2]);
continue
}a=d[c].match(/^([a-z][a-z0-9]*)$/i);
if(a){h=j.createElementNS(g,a[1]);
continue
}h=j.createElementNS(g,"span");
h.setAttribute(null,"class","namelessFromLOL")
}if(d[c]===undefined){throw"Can't graft an undefined value in a list!"
}else{if(d[c].constructor==String||d[c].constructor==Array){this.graft(g,h,d[c],j)
}else{if(d[c].constructor==Number){this.graft(g,h,d[c].toString(),j)
}else{if(d[c].constructor==Object){for(var b in d[c]){h.setAttributeNS(null,b,d[c][b])
}}else{}}}}}}}if(f){f.appendChild(h)
}else{}return h
};
ORYX.Editor.provideId=function(){var b=[],c="0123456789ABCDEF";
for(var a=0;
a<36;
a++){b[a]=Math.floor(Math.random()*16)
}b[14]=4;
b[19]=(b[19]&3)|8;
for(var a=0;
a<36;
a++){b[a]=c[b[a]]
}b[8]=b[13]=b[18]=b[23]="-";
return"_"+b.join("")
};
ORYX.Editor.resizeFix=function(){if(!ORYX.Editor._resizeFixTimeout){ORYX.Editor._resizeFixTimeout=window.setTimeout(function(){window.resizeBy(1,1);
window.resizeBy(-1,-1);
ORYX.Editor._resizefixTimeout=null
},100)
}};
ORYX.Editor.Cookie={callbacks:[],onChange:function(b,a){this.callbacks.push(b);
this.start(a)
},start:function(a){if(this.pe){return
}var b=document.cookie;
this.pe=new PeriodicalExecuter(function(){if(b!=document.cookie){b=document.cookie;
this.callbacks.each(function(c){c(this.getParams())
}.bind(this))
}}.bind(this),(a||10000)/1000)
},stop:function(){if(this.pe){this.pe.stop();
this.pe=null
}},getParams:function(){var a={};
var b=document.cookie;
b.split("; ").each(function(c){a[c.split("=")[0]]=c.split("=")[1]
});
return a
},toString:function(){return document.cookie
}};
ORYX.Editor.SVGClassElementsAreAvailable=true;
ORYX.Editor.setMissingClasses=function(){try{SVGElement
}catch(a){ORYX.Editor.SVGClassElementsAreAvailable=false;
SVGSVGElement=document.createElementNS("http://www.w3.org/2000/svg","svg").toString();
SVGGElement=document.createElementNS("http://www.w3.org/2000/svg","g").toString();
SVGPathElement=document.createElementNS("http://www.w3.org/2000/svg","path").toString();
SVGTextElement=document.createElementNS("http://www.w3.org/2000/svg","text").toString();
SVGRectElement=document.createElementNS("http://www.w3.org/2000/svg","rect").toString();
SVGImageElement=document.createElementNS("http://www.w3.org/2000/svg","image").toString();
SVGCircleElement=document.createElementNS("http://www.w3.org/2000/svg","circle").toString();
SVGEllipseElement=document.createElementNS("http://www.w3.org/2000/svg","ellipse").toString();
SVGLineElement=document.createElementNS("http://www.w3.org/2000/svg","line").toString();
SVGPolylineElement=document.createElementNS("http://www.w3.org/2000/svg","polyline").toString();
SVGPolygonElement=document.createElementNS("http://www.w3.org/2000/svg","polygon").toString()
}};
ORYX.Editor.checkIfSaved=function(){if(ORYX.READONLY==true||ORYX.VIEWLOCKED==true){return true
}else{return ORYX.PROCESS_SAVED
}};
ORYX.Editor.checkClassType=function(b,a){if(ORYX.Editor.SVGClassElementsAreAvailable){return b instanceof a
}else{return b==a
}};
ORYX.Editor.makeExtModalWindowKeysave=function(a){Ext.override(Ext.Window,{beforeShow:function(){delete this.el.lastXY;
delete this.el.lastLT;
if(this.x===undefined||this.y===undefined){var b=this.el.getAlignToXY(this.container,"c-c");
var c=this.el.translatePoints(b[0],b[1]);
this.x=this.x===undefined?c.left:this.x;
this.y=this.y===undefined?c.top:this.y
}this.el.setLeftTop(this.x,this.y);
if(this.expandOnShow){this.expand(false)
}if(this.modal){a.disableEvent(ORYX.CONFIG.EVENT_KEYDOWN);
Ext.getBody().addClass("x-body-masked");
this.mask.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true));
this.mask.show()
}},afterHide:function(){this.proxy.hide();
if(this.monitorResize||this.modal||this.constrain||this.constrainHeader){Ext.EventManager.removeResizeListener(this.onWindowResize,this)
}if(this.modal){this.mask.hide();
a.enableEvent(ORYX.CONFIG.EVENT_KEYDOWN);
Ext.getBody().removeClass("x-body-masked")
}if(this.keyMap){this.keyMap.disable()
}this.fireEvent("hide",this)
},beforeDestroy:function(){if(this.modal){a.enableEvent(ORYX.CONFIG.EVENT_KEYDOWN)
}Ext.destroy(this.resizer,this.dd,this.proxy,this.mask);
Ext.Window.superclass.beforeDestroy.call(this)
}})
};
ORYX.Utils={getParamFromUrl:function(b){b=b.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
var a="[\\?&]"+b+"=([^&#]*)";
var d=new RegExp(a);
var c=d.exec(window.location.href);
if(c==null){return null
}else{return c[1]
}},adjustGradient:function(c,a){if(ORYX.CONFIG.DISABLE_GRADIENT&&c){var b=a.getAttributeNS(null,"stop-color")||"#ffffff";
$A(c.getElementsByTagName("stop")).each(function(d){if(d==a){return
}d.setAttributeNS(null,"stop-color",b)
})
}},getDialogSize:function(f,g){var c=document.documentElement.clientHeight;
var d=document.documentElement.clientWidth;
var b=Math.min(f,c*2/3);
var a=Math.min(g,d*2/3);
var e={height:b,width:a};
return e
}};
var ERDF={LITERAL:1,RESOURCE:2,DELIMITERS:[".","-"],HASH:"#",HYPHEN:"-",schemas:[],callback:undefined,log:undefined,init:function(a){ERDF.callback=a;
ERDF.registerSchema("schema",XMLNS.SCHEMA);
ERDF.registerSchema("rdfs",XMLNS.RDFS)
},run:function(){return ERDF._checkProfile()&&ERDF.parse()
},parse:function(){ERDF.__startTime=new Date();
var b=document.getElementsByTagNameNS(XMLNS.XHTML,"body");
var c={type:ERDF.RESOURCE,value:""};
var a=ERDF._parseDocumentMetadata()&&ERDF._parseFromTag(b[0],c);
ERDF.__stopTime=new Date();
var d=(ERDF.__stopTime-ERDF.__startTime)/1000;
return a
},_parseDocumentMetadata:function(){var b=document.getElementsByTagNameNS(XMLNS.XHTML,"head");
var a=b[0].getElementsByTagNameNS(XMLNS.XHTML,"link");
var c=b[0].getElementsByTagNameNS(XMLNS.XHTML,"meta");
$A(a).each(function(e){var d=e.getAttribute("rel");
var g=e.getAttribute("rev");
var f=e.getAttribute("href");
ERDF._parseTriplesFrom(ERDF.RESOURCE,"",d,ERDF.RESOURCE,f);
ERDF._parseTriplesFrom(ERDF.RESOURCE,f,g,ERDF.RESOURCE,"")
});
$A(c).each(function(f){var e=f.getAttribute("name");
var d=f.getAttribute("content");
ERDF._parseTriplesFrom(ERDF.RESOURCE,"",e,ERDF.LITERAL,d)
});
return true
},_parseFromTag:function(c,i,d){if(c.namespaceURI!=XMLNS.XHTML){return
}if(!d){d=0
}var a=c.getAttribute("id");
if(c.nodeName.endsWith(":a")||c.nodeName=="a"){var h=c.getAttribute("rel");
var e=c.getAttribute("rev");
var l=c.getAttribute("href");
var k=c.getAttribute("title");
var g=c.textContent;
ERDF._parseTriplesFrom(i.type,i.value,h,ERDF.RESOURCE,l,function(n){var m=k?k:g;
ERDF._parseTriplesFrom(n.object.type,n.object.value,"rdfs.label",ERDF.LITERAL,m)
});
ERDF._parseTriplesFrom(i.type,i.value,e,ERDF.RESOURCE,"");
ERDF._parseTypeTriplesFrom(i.type,i.value,h)
}else{if(c.nodeName.endsWith(":img")||c.nodeName=="img"){var h=c.getAttribute("class");
var l=c.getAttribute("src");
var f=c.getAttribute("alt");
ERDF._parseTriplesFrom(i.type,i.value,h,ERDF.RESOURCE,l,function(n){var m=f;
ERDF._parseTriplesFrom(n.object.type,n.object.value,"rdfs.label",ERDF.LITERAL,m)
})
}}var h=c.getAttribute("class");
var k=c.getAttribute("title");
var g=c.textContent;
var j=k?k:g;
ERDF._parseTriplesFrom(i.type,i.value,h,ERDF.LITERAL,j);
if(a){i={type:ERDF.RESOURCE,value:ERDF.HASH+a}
}ERDF._parseTypeTriplesFrom(i.type,i.value,h);
var b=c.childNodes;
if(b){$A(b).each(function(m){if(m.nodeType==m.ELEMENT_NODE){ERDF._parseFromTag(m,i,d+1)
}})
}},_parseTriplesFrom:function(c,e,d,a,b,f){if(!d){return
}d.toLowerCase().split(" ").each(function(h){var g=ERDF.schemas.find(function(j){return false||ERDF.DELIMITERS.find(function(k){return h.startsWith(j.prefix+k)
})
});
if(g&&b){h=h.substring(g.prefix.length+1,h.length);
var i=ERDF.registerTriple(new ERDF.Resource(e),{prefix:g.prefix,name:h},(a==ERDF.RESOURCE)?new ERDF.Resource(b):new ERDF.Literal(b));
if(f){f(i)
}}})
},_parseTypeTriplesFrom:function(a,c,b,d){if(!b){return
}b.toLowerCase().split(" ").each(function(f){var e=ERDF.schemas.find(function(h){return false||ERDF.DELIMITERS.find(function(i){return f.startsWith(ERDF.HYPHEN+h.prefix+i)
})
});
if(e&&c){f=f.substring(e.prefix.length+2,f.length);
var g=ERDF.registerTriple((a==ERDF.RESOURCE)?new ERDF.Resource(c):new ERDF.Literal(c),{prefix:"rdf",name:"type"},new ERDF.Resource(e.namespace+f));
if(d){d(g)
}}})
},_checkProfile:function(){var b=document.getElementsByTagNameNS(XMLNS.XHTML,"head");
var a=b[0].getAttribute("profile");
var c=false;
if(a&&a.split(" ").member(XMLNS.ERDF)){return true
}else{return false
}},__stripHashes:function(a){return(a&&a.substring(0,1)=="#")?a.substring(1,a.length):a
},registerSchema:function(b,a){ERDF.schemas.push({prefix:b,namespace:a})
},registerTriple:function(c,a,b){if(a.prefix.toLowerCase()=="schema"){this.registerSchema(a.name,b.value)
}var d=new ERDF.Triple(c,a,b);
ERDF.callback(d);
return d
},__enhanceObject:function(){this.isResource=function(){return this.type==ERDF.RESOURCE
};
this.isLocal=function(){return this.isResource()&&this.value.startsWith("#")
};
this.isCurrentDocument=function(){return this.isResource()&&(this.value=="")
};
this.getId=function(){return this.isLocal()?ERDF.__stripHashes(this.value):false
};
this.isLiteral=function(){return this.type==ERDF.LIITERAL
}
},serialize:function(a){if(!a){return""
}else{if(a.constructor==String){return a
}else{if(a.constructor==Boolean){return a?"true":"false"
}else{return a.toString()
}}}}};
ERDF.Triple=function(c,a,b){this.subject=c;
this.predicate=a;
this.object=b;
this.toString=function(){return"[ERDF.Triple] "+this.subject.toString()+" "+this.predicate.prefix+":"+this.predicate.name+" "+this.object.toString()
}
};
ERDF.Resource=function(a){this.type=ERDF.RESOURCE;
this.value=a;
ERDF.__enhanceObject.apply(this);
this.toString=function(){return"&lt;"+this.value+"&gt;"
}
};
ERDF.Literal=function(a){this.type=ERDF.LITERAL;
this.value=ERDF.serialize(a);
ERDF.__enhanceObject.apply(this);
this.toString=function(){return'"'+this.value+'"'
}
};
var USE_ASYNCHRONOUS_REQUESTS=true;
var DISCARD_UNUSED_TRIPLES=true;
var PREFER_SPANS_OVER_DIVS=true;
var PREFER_TITLE_OVER_TEXTNODE=false;
var RESOURCE_ID_PREFIX="resource";
var SHOW_DEBUG_ALERTS_WHEN_SAVING=false;
var SHOW_EXTENDED_DEBUG_INFORMATION=false;
var USE_ARESS_WORKAROUNDS=true;
var RESOURCE_CREATED=1;
var RESOURCE_REMOVED=2;
var RESOURCE_SAVED=4;
var RESOURCE_RELOADED=8;
var RESOURCE_SYNCHRONIZED=16;
var TRIPLE_REMOVE=1;
var TRIPLE_ADD=2;
var TRIPLE_RELOAD=4;
var TRIPLE_SAVE=8;
var PROCESSDATA_REF="processdata";
var DataManager={init:function(){ERDF.init(DataManager._registerTriple);
DataManager.__synclocal()
},_triples:[],_registerTriple:function(a){DataManager._triples.push(a)
},__synclocal:function(){DataManager._triples=[];
ERDF.run()
},__synchronizeShape:function(a){var c=ResourceManager.getResource(a.resourceId);
var b=a.serialize();
b.each(function(d){var f=(d.type=="resource");
var e=new ERDF.Triple(new ERDF.Resource(a.resourceId),{prefix:d.prefix,name:d.name},f?new ERDF.Resource(d.value):new ERDF.Literal(d.value));
DataManager.setObject(e)
});
return c
},__storeShape:function(a){var b=DataManager.__synchronizeShape(a);
b.save()
},__forceExistance:function(a){if(!$(a.resourceId)){if(!$$("."+PROCESSDATA_REF)[0]){DataManager.graft(XMLNS.XHTML,document.getElementsByTagNameNS(XMLNS.XHTML,"body").item(0),["div",{"class":PROCESSDATA_REF,style:"display:none;"}])
}DataManager.graft(XMLNS.XHTML,$$("."+PROCESSDATA_REF)[0],["div",{id:a.resourceId,"class":(a instanceof ORYX.Core.Canvas)?"-oryx-canvas":undefined}])
}else{var c=$(a.resourceId);
var b=$A(c.childNodes);
b.each(function(d){c.removeChild(d)
})
}},__persistShape:function(b){var d=b.serialize();
var a=[];
var c=new ERDF.Resource(b.resourceId);
DataManager.removeTriples(DataManager.query(c,undefined,undefined));
d.each(function(f){var e=(f.type=="resource")?new ERDF.Resource(f.value):new ERDF.Literal(f.value);
DataManager.addTriple(new ERDF.Triple(c,{prefix:f.prefix,name:f.name},e))
})
},__persistDOM:function(d){var c=d.getCanvas();
var b=c.getChildShapes(true);
var a="";
b.each(function(e){DataManager.__forceExistance(e)
});
DataManager.__renderCanvas(d);
a+=DataManager.serialize($(ERDF.__stripHashes(d.getCanvas().resourceId)),true);
b.each(function(e){DataManager.__persistShape(e);
a+=DataManager.serialize($(ERDF.__stripHashes(e.resourceId)),true)
});
return a
},__renderCanvas:function(e){var b=e.getCanvas();
var d=e.getStencilSets();
var a=b.getChildShapes(true);
DataManager.__forceExistance(b);
DataManager.__persistShape(b);
var c=new ERDF.Resource(b.resourceId);
DataManager.removeTriples(DataManager.query(c,undefined,undefined));
DataManager.addTriple(new ERDF.Triple(c,{prefix:"oryx",name:"mode"},new ERDF.Literal("writable")));
DataManager.addTriple(new ERDF.Triple(c,{prefix:"oryx",name:"mode"},new ERDF.Literal("fullscreen")));
d.values().each(function(f){DataManager.addTriple(new ERDF.Triple(c,{prefix:"oryx",name:"stencilset"},new ERDF.Resource(f.source().replace(/&/g,"%26"))));
DataManager.addTriple(new ERDF.Triple(c,{prefix:"oryx",name:"ssnamespace"},new ERDF.Resource(f.namespace())));
f.extensions().keys().each(function(g){DataManager.addTriple(new ERDF.Triple(c,{prefix:"oryx",name:"ssextension"},new ERDF.Literal(g)))
})
});
a.each(function(f){DataManager.addTriple(new ERDF.Triple(c,{prefix:"oryx",name:"render"},new ERDF.Resource("#"+f.resourceId)))
})
},__counter:0,__provideId:function(){while($(RESOURCE_ID_PREFIX+DataManager.__counter)){DataManager.__counter++
}return RESOURCE_ID_PREFIX+DataManager.__counter
},serializeDOM:function(a){return DataManager.__persistDOM(a)
},syncGlobal:function(a){return DataManager.__syncglobal(a)
},__syncglobal:function(c){var b=c.getCanvas();
var a=b.getChildShapes(true);
a.select(function(d){return !($(d.resourceId))
}).each(function(d){if(USE_ARESS_WORKAROUNDS){var e=d.properties["raziel-type"];
var g='<div xmlns="http://www.w3.org/1999/xhtml"><span class="raziel-type">'+e+"</span></div>";
var f=ResourceManager.__createResource(g);
d.resourceId=f.id()
}else{var f=ResourceManager.__createResource();
d.resourceId=f.id()
}});
a.each(function(d){DataManager.__storeShape(d)
})
},serialize:function(f,b){if(f.nodeType==f.ELEMENT_NODE){var e=$A(f.childNodes);
var c=$A(f.attributes);
var d=new String(f.getAttribute("class"));
var g=d.split(" ").member("transient");
if(g){return""
}var a="<"+f.nodeName;
if(!b){a+=' xmlns="'+(f.namespaceURI?f.namespaceURI:XMLNS.XHTML)+'" xmlns:oryx="http://oryx-editor.org"'
}c.each(function(h){var i=h.nodeValue;
if(i.indexOf("&")!==-1||i.indexOf(">")!==-1||i.indexOf("<")!==-1||i.indexOf('"')!==-1){i=Ext.util.Format.htmlEncode(i)
}a+=" "+h.nodeName+'="'+i+'"'
});
if(e.length==0){a+="/>"
}else{a+=">";
e.each(function(h){a+=DataManager.serialize(h,true)
});
a+="</"+f.nodeName+">"
}return a
}else{if(f.nodeType==f.TEXT_NODE){return f.nodeValue
}}},addTriple:function(c){if(!c.subject.type==ERDF.LITERAL){throw"Cannot add the triple "+c.toString()+" because the subject is not a resource."
}var a=ERDF.__stripHashes(c.subject.value);
var b=$(a);
if(!b){throw"Cannot add the triple "+c.toString()+' because the subject "'+a+'" is not in the document.'
}if(c.object.type==ERDF.LITERAL){DataManager.graft(XMLNS.XHTML,b,["span",{"class":(c.predicate.prefix+"-"+c.predicate.name)},c.object.value.escapeHTML()])
}else{DataManager.graft(XMLNS.XHTML,b,["a",{rel:(c.predicate.prefix+"-"+c.predicate.name),href:c.object.value}])
}return true
},removeTriples:function(b){var a=b.select(function(c){return DataManager.__removeTriple(c)
});
return a
},removeTriple:function(b){var a=DataManager.__removeTriple(b);
return a
},__removeTriple:function(d){if(!d.subject.type==ERDF.LITERAL){throw"Cannot remove the triple "+d.toString()+" because the subject is not a resource."
}var b=ERDF.__stripHashes(d.subject.value);
var c=$(b);
if(!c){throw"Cannot remove the triple "+d.toString()+" because the subject is not in the document."
}if(d.object.type==ERDF.LITERAL){var a=DataManager.__removeTripleRecursively(d,c);
return a
}},__removeTripleRecursively:function(e,d){if(d.nodeType!=d.ELEMENT_NODE){return false
}var b=new String(d.getAttribute("class"));
var a=$A(d.childNodes);
if(b.include(e.predicate.prefix+"-"+e.predicate.name)){var c=d.textContent;
if((e.object.type==ERDF.LITERAL)&&(e.object.value==c)){d.parentNode.removeChild(d)
}return true
}else{a.each(function(f){DataManager.__removeTripleRecursively(e,f)
});
return false
}},graft:function(g,f,d,j){j=(j||(f&&f.ownerDocument)||document);
var h;
if(d===undefined){echo("Can't graft an undefined value")
}else{if(d.constructor==String){h=j.createTextNode(d)
}else{for(var c=0;
c<d.length;
c++){if(c===0&&d[c].constructor==String){var a=d[c].match(/^([a-z][a-z0-9]*)\.([^\s\.]+)$/i);
if(a){h=j.createElementNS(g,a[1]);
h.setAttributeNS(null,"class",a[2]);
continue
}a=d[c].match(/^([a-z][a-z0-9]*)$/i);
if(a){h=j.createElementNS(g,a[1]);
continue
}h=j.createElementNS(g,"span");
h.setAttribute(null,"class","namelessFromLOL")
}if(d[c]===undefined){echo("Can't graft an undefined value in a list!")
}else{if(d[c].constructor==String||d[c].constructor==Array){this.graft(g,h,d[c],j)
}else{if(d[c].constructor==Number){this.graft(g,h,d[c].toString(),j)
}else{if(d[c].constructor==Object){for(var b in d[c]){h.setAttributeNS(null,b,d[c][b])
}}else{if(d[c].constructor==Boolean){this.graft(g,h,d[c]?"true":"false",j)
}else{throw"Object "+d[c]+" is inscrutable as an graft arglet."
}}}}}}}}if(f){f.appendChild(h)
}return Element.extend(h)
},setObject:function(a){var b=DataManager.query(a.subject,a.predicate,undefined);
DataManager.removeTriples(b);
DataManager.addTriple(a);
return true
},query:function(c,a,b){return DataManager._triples.select(function(e){var d=((c)?(e.subject.type==c.type)&&(e.subject.value==c.value):true);
if(a){d=d&&((a.prefix)?(e.predicate.prefix==a.prefix):true);
d=d&&((a.name)?(e.predicate.name==a.name):true)
}d=d&&((b)?(e.object.type==b.type)&&(e.object.value==b.value):true);
return d
})
}};
Kickstart.register(DataManager.init);
function assert(b,a){if(!b){throw a
}}function DMCommand(a,b){this.action=a;
this.triple=b;
this.toString=function(){return"Command("+a+", "+b+")"
}
}function DMCommandHandler(a){this.__setNext=function(c){var b=this.__next;
this.__next=a;
return b?b:true
};
this.__setNext(a);
this.__invokeNext=function(b){return this.__next?this.__next.handle(b):false
};
this.handle=function(b){return this.process(b)?true:this.__invokeNext(b)
};
this.process=function(b){return false
}
}function MetaTagHandler(next){DMCommandHandler.apply(this,[next]);
this.process=function(command){with(command.triple){if(!((subject instanceof ERDF.Resource)&&(subject.isCurrentDocument())&&(object instanceof ERDF.Literal))){return false
}}}
}var chain=new MetaTagHandler();
var command=new DMCommand(TRIPLE_ADD,new ERDF.Triple(new ERDF.Resource(""),"rdf:tool",new ERDF.Literal("")));
ResourceManager={__corrupt:false,__latelyCreatedResource:undefined,__listeners:$H(),__token:1,addListener:function(d,b){if(!(d instanceof Function)){throw"Resource event listener is not a function!"
}if(!(b)){throw"Invalid mask for resource event listener registration."
}var a={listener:d,mask:b};
var c=ResourceManager.__token++;
ResourceManager.__listeners[c]=a;
return c
},removeListener:function(a){return ResourceManager.__listners.remove(a)
},__Event:function(a,b){this.action=a;
this.resourceId=b
},__dispatchEvent:function(a){ResourceManager.__listeners.values().each(function(b){if(a.action&b.mask){return b.listener(a)
}})
},getResource:function(c){c=ERDF.__stripHashes(c);
var b=DataManager.query(new ERDF.Resource("#"+c),{prefix:"raziel",name:"entry"},undefined);
if((b.length==1)&&(b[0].object.isResource())){var a=b[0].object.value;
return new ResourceManager.__Resource(c,a)
}throw ("Resource with id "+c+" not recognized as such. "+((b.length>1)?" There is more than one raziel:entry URL.":" There is no raziel:entry URL."));
return false
},__createResource:function(e){var d=DataManager.query(new ERDF.Resource(""),{prefix:"raziel",name:"collection"},undefined);
if((d.length==1)&&(d[0].object.isResource())){var b=d[0].object.value;
var c=undefined;
var a=e?e:'<div xmlns="http://www.w3.org/1999/xhtml"></div>';
ResourceManager.__request("POST",b,a,function(){var f=(this.responseXML);
var h=f.childNodes[0];
var g=h.getAttribute("id");
if(!$$("."+PROCESSDATA_REF)[0]){DataManager.graft(XMLNS.XHTML,document.getElementsByTagNameNS(XMLNS.XHTML,"body").item(0),["div",{"class":PROCESSDATA_REF,style:"display:none;"}])
}$$("."+PROCESSDATA_REF)[0].appendChild(h.cloneNode(true));
DataManager.__synclocal();
c=new ResourceManager.getResource(g);
ResourceManager.__resourceActionSucceeded(this,RESOURCE_CREATED,undefined)
},function(){ResourceManager.__resourceActionFailed(this,RESOURCE_CREATED,undefined)
},false);
return c
}throw"Could not create resource! raziel:collection URL is missing!";
return false
},__Resource:function(b,a){this.__id=b;
this.__url=a;
this.id=function(){return this.__id
};
this.url=function(){return this.__url
};
this.reload=function(){var d=this.__url;
var c=this.__id;
ResourceManager.__request("GET",d,null,function(){ResourceManager.__resourceActionSucceeded(this,RESOURCE_RELOADED,c)
},function(){ResourceManager.__resourceActionFailed(this,RESURCE_RELOADED,c)
},USE_ASYNCHRONOUS_REQUESTS)
};
this.save=function(e){var d=this.__url;
var c=this.__id;
data=DataManager.serialize($(c));
ResourceManager.__request("PUT",d,data,function(){ResourceManager.__resourceActionSucceeded(this,e?RESOURCE_SAVED|RESOURCE_SYNCHRONIZED:RESOURCE_SAVED,c)
},function(){ResourceManager.__resourceActionFailed(this,e?RESOURCE_SAVED|RESOURCE_SYNCHRONIZED:RESOURCE.SAVED,c)
},USE_ASYNCHRONOUS_REQUESTS)
};
this.remove=function(){var d=this.__url;
var c=this.__id;
ResourceManager.__request("DELETE",d,null,function(){ResourceManager.__resourceActionSucceeded(this,RESOURCE_REMOVED,c)
},function(){ResourceManager.__resourceActionFailed(this,RESOURCE_REMOVED,c)
},USE_ASYNCHRONOUS_REQUESTS)
}
},request:function(c,a){var b={method:"get",asynchronous:true,parameters:{}};
Object.extend(b,a||{});
var d=Hash.toQueryString(b.parameters);
if(d){c+=(c.include("?")?"&":"?")+d
}return ResourceManager.__request(b.method,c,b.data,(b.onSuccess instanceof Function?function(){b.onSuccess(this)
}:undefined),(b.onFailure instanceof Function?function(){b.onFailure(this)
}:undefined),b.asynchronous&&USE_ASYNCHRONOUS_REQUESTS,b.headers)
},__request:function(a,b,f,l,k,d,c){var g=Try.these(function(){return new XMLHttpRequest()
},function(){return new ActiveXObject("Msxml2.XMLHTTP")
},function(){return new ActiveXObject("Microsoft.XMLHTTP")
});
if(!g){if(!this.__corrupt){throw"This browser does not provide any AJAX functionality. You will not be able to use the software provided with the page you are viewing. Please consider installing appropriate extensions."
}this.__corrupt=true;
return false
}if(l instanceof Function){g.onload=l
}if(k instanceof Function){g.onerror=k
}var i=$H(c);
i.keys().each(function(e){g.setRequestHeader(e,i[e])
});
try{if(SHOW_DEBUG_ALERTS_WHEN_SAVING){alert(a+" "+b+"\n"+SHOW_EXTENDED_DEBUG_INFORMATION?f:"")
}g.open(a,b,!d?false:true);
g.send(f)
}catch(j){return false
}return true
},__resourceActionSucceeded:function(g,c,f){var a=g.status;
var b=g.responseText;
if(SHOW_DEBUG_ALERTS_WHEN_SAVING){alert(a+" "+url+"\n"+SHOW_EXTENDED_DEBUG_INFORMATION?data:"")
}if(a>=300){throw"The server responded with an error: "+a+"\n"+(SHOW_EXTENDED_DEBUG_INFORMATION?+data:"If you need additional information here, including the data sent by the server, consider setting SHOW_EXTENDED_DEBUG_INFORMATION to true.")
}switch(c){case RESOURCE_REMOVED:var b=(g.responseXML);
var e=b.childNodes[0];
var f=e.getAttribute("id");
var d=document.getElementById(f);
d.parentNode.removeChild(d);
break;
case RESOURCE_CREATED:break;
case RESOURCE_SAVED|RESOURCE_SYNCHRONIZED:DataManager.__synclocal();
case RESOURCE_SAVED:break;
case RESOURCE_RELOADED:var b=(g.responseXML);
var e=b.childNodes[0];
var f=e.getAttribute("id");
var d=document.getElementById(f);
d.parentNode.removeChild(d);
if(!$$(PROCESSDATA_REF)[0]){DataManager.graft(XMLNS.XHTML,document.getElementsByTagNameNS(XMLNS.XHTML,"body").item(0),["div",{"class":PROCESSDATA_REF,style:"display:none;"}])
}$$(PROCESSDATA_REF)[0].appendChild(e.cloneNode(true));
DataManager.__synclocal();
break;
default:DataManager.__synclocal()
}ResourceManager.__dispatchEvent(new ResourceManager.__Event(c,f))
},__resourceActionFailed:function(c,a,b){throw"Fatal: Resource action failed. There is something horribly wrong with either the server, the transport protocol or your online status. Sure you're online?"
}};
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.SVG){ORYX.Core.SVG={}
}ORYX.Core.SVG.EditPathHandler=Clazz.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.x=0;
this.y=0;
this.oldX=0;
this.oldY=0;
this.deltaWidth=1;
this.deltaHeight=1;
this.d=""
},init:function(a,f,d,b,c,e){this.x=a;
this.y=f;
this.oldX=d;
this.oldY=b;
this.deltaWidth=c;
this.deltaHeight=e;
this.d=""
},editPointsAbs:function(c){if(c instanceof Array){var d=[];
var a,e;
for(var b=0;
b<c.length;
b++){a=(parseFloat(c[b])-this.oldX)*this.deltaWidth+this.x;
b++;
e=(parseFloat(c[b])-this.oldY)*this.deltaHeight+this.y;
d.push(a);
d.push(e)
}return d
}else{}},editPointsRel:function(c){if(c instanceof Array){var d=[];
var a,e;
for(var b=0;
b<c.length;
b++){a=parseFloat(c[b])*this.deltaWidth;
b++;
e=parseFloat(c[b])*this.deltaHeight;
d.push(a);
d.push(e)
}return d
}else{}},arcAbs:function(e,c,i,b,f,h,g){var d=this.editPointsAbs([h,g]);
var a=this.editPointsRel([e,c]);
this.d=this.d.concat(" A"+a[0]+" "+a[1]+" "+i+" "+b+" "+f+" "+d[0]+" "+d[1]+" ")
},arcRel:function(f,d,b,e,c,a,h){var g=this.editPointsRel([f,d,a,h]);
this.d=this.d.concat(" a"+g[0]+" "+g[1]+" "+b+" "+e+" "+c+" "+g[2]+" "+g[3]+" ")
},curvetoCubicAbs:function(c,e,b,d,a,g){var f=this.editPointsAbs([c,e,b,d,a,g]);
this.d=this.d.concat(" C"+f[0]+" "+f[1]+" "+f[2]+" "+f[3]+" "+f[4]+" "+f[5]+" ")
},curvetoCubicRel:function(c,e,b,d,a,g){var f=this.editPointsRel([c,e,b,d,a,g]);
this.d=this.d.concat(" c"+f[0]+" "+f[1]+" "+f[2]+" "+f[3]+" "+f[4]+" "+f[5]+" ")
},linetoHorizontalAbs:function(a){var b=this.editPointsAbs([a,0]);
this.d=this.d.concat(" H"+b[0]+" ")
},linetoHorizontalRel:function(a){var b=this.editPointsRel([a,0]);
this.d=this.d.concat(" h"+b[0]+" ")
},linetoAbs:function(a,c){var b=this.editPointsAbs([a,c]);
this.d=this.d.concat(" L"+b[0]+" "+b[1]+" ")
},linetoRel:function(a,c){var b=this.editPointsRel([a,c]);
this.d=this.d.concat(" l"+b[0]+" "+b[1]+" ")
},movetoAbs:function(a,c){var b=this.editPointsAbs([a,c]);
this.d=this.d.concat(" M"+b[0]+" "+b[1]+" ")
},movetoRel:function(a,c){var b;
if(this.d===""){b=this.editPointsAbs([a,c])
}else{b=this.editPointsRel([a,c])
}this.d=this.d.concat(" m"+b[0]+" "+b[1]+" ")
},curvetoQuadraticAbs:function(b,c,a,e){var d=this.editPointsAbs([b,c,a,e]);
this.d=this.d.concat(" Q"+d[0]+" "+d[1]+" "+d[2]+" "+d[3]+" ")
},curvetoQuadraticRel:function(b,c,a,e){var d=this.editPointsRel([b,c,a,e]);
this.d=this.d.concat(" q"+d[0]+" "+d[1]+" "+d[2]+" "+d[3]+" ")
},curvetoCubicSmoothAbs:function(b,c,a,e){var d=this.editPointsAbs([b,c,a,e]);
this.d=this.d.concat(" S"+d[0]+" "+d[1]+" "+d[2]+" "+d[3]+" ")
},curvetoCubicSmoothRel:function(b,c,a,e){var d=this.editPointsRel([b,c,a,e]);
this.d=this.d.concat(" s"+d[0]+" "+d[1]+" "+d[2]+" "+d[3]+" ")
},curvetoQuadraticSmoothAbs:function(a,c){var b=this.editPointsAbs([a,c]);
this.d=this.d.concat(" T"+b[0]+" "+b[1]+" ")
},curvetoQuadraticSmoothRel:function(a,c){var b=this.editPointsRel([a,c]);
this.d=this.d.concat(" t"+b[0]+" "+b[1]+" ")
},linetoVerticalAbs:function(b){var a=this.editPointsAbs([0,b]);
this.d=this.d.concat(" V"+a[1]+" ")
},linetoVerticalRel:function(b){var a=this.editPointsRel([0,b]);
this.d=this.d.concat(" v"+a[1]+" ")
},closePath:function(){this.d=this.d.concat(" z")
}});
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.SVG){ORYX.Core.SVG={}
}ORYX.Core.SVG.MinMaxPathHandler=Clazz.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.minX=undefined;
this.minY=undefined;
this.maxX=undefined;
this.maxY=undefined;
this._lastAbsX=undefined;
this._lastAbsY=undefined
},calculateMinMax:function(c){if(c instanceof Array){var a,d;
for(var b=0;
b<c.length;
b++){a=parseFloat(c[b]);
b++;
d=parseFloat(c[b]);
this.minX=(this.minX!==undefined)?Math.min(this.minX,a):a;
this.maxX=(this.maxX!==undefined)?Math.max(this.maxX,a):a;
this.minY=(this.minY!==undefined)?Math.min(this.minY,d):d;
this.maxY=(this.maxY!==undefined)?Math.max(this.maxY,d):d;
this._lastAbsX=a;
this._lastAbsY=d
}}else{}},arcAbs:function(f,d,b,e,c,a,g){this.calculateMinMax([a,g])
},arcRel:function(f,d,b,e,c,a,g){this.calculateMinMax([this._lastAbsX+a,this._lastAbsY+g])
},curvetoCubicAbs:function(c,e,b,d,a,f){this.calculateMinMax([c,e,b,d,a,f])
},curvetoCubicRel:function(c,e,b,d,a,f){this.calculateMinMax([this._lastAbsX+c,this._lastAbsY+e,this._lastAbsX+b,this._lastAbsY+d,this._lastAbsX+a,this._lastAbsY+f])
},linetoHorizontalAbs:function(a){this.calculateMinMax([a,this._lastAbsY])
},linetoHorizontalRel:function(a){this.calculateMinMax([this._lastAbsX+a,this._lastAbsY])
},linetoAbs:function(a,b){this.calculateMinMax([a,b])
},linetoRel:function(a,b){this.calculateMinMax([this._lastAbsX+a,this._lastAbsY+b])
},movetoAbs:function(a,b){this.calculateMinMax([a,b])
},movetoRel:function(a,b){if(this._lastAbsX&&this._lastAbsY){this.calculateMinMax([this._lastAbsX+a,this._lastAbsY+b])
}else{this.calculateMinMax([a,b])
}},curvetoQuadraticAbs:function(b,c,a,d){this.calculateMinMax([b,c,a,d])
},curvetoQuadraticRel:function(b,c,a,d){this.calculateMinMax([this._lastAbsX+b,this._lastAbsY+c,this._lastAbsX+a,this._lastAbsY+d])
},curvetoCubicSmoothAbs:function(b,c,a,d){this.calculateMinMax([b,c,a,d])
},curvetoCubicSmoothRel:function(b,c,a,d){this.calculateMinMax([this._lastAbsX+b,this._lastAbsY+c,this._lastAbsX+a,this._lastAbsY+d])
},curvetoQuadraticSmoothAbs:function(a,b){this.calculateMinMax([a,b])
},curvetoQuadraticSmoothRel:function(a,b){this.calculateMinMax([this._lastAbsX+a,this._lastAbsY+b])
},linetoVerticalAbs:function(a){this.calculateMinMax([this._lastAbsX,a])
},linetoVerticalRel:function(a){this.calculateMinMax([this._lastAbsX,this._lastAbsY+a])
},closePath:function(){return
}});
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.SVG){ORYX.Core.SVG={}
}ORYX.Core.SVG.PointsPathHandler=Clazz.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.points=[];
this._lastAbsX=undefined;
this._lastAbsY=undefined
},addPoints:function(c){if(c instanceof Array){var a,d;
for(var b=0;
b<c.length;
b++){a=parseFloat(c[b]);
b++;
d=parseFloat(c[b]);
this.points.push(a);
this.points.push(d);
this._lastAbsX=a;
this._lastAbsY=d
}}else{}},arcAbs:function(f,d,b,e,c,a,g){this.addPoints([a,g])
},arcRel:function(f,d,b,e,c,a,g){this.addPoints([this._lastAbsX+a,this._lastAbsY+g])
},curvetoCubicAbs:function(c,e,b,d,a,f){this.addPoints([a,f])
},curvetoCubicRel:function(c,e,b,d,a,f){this.addPoints([this._lastAbsX+a,this._lastAbsY+f])
},linetoHorizontalAbs:function(a){this.addPoints([a,this._lastAbsY])
},linetoHorizontalRel:function(a){this.addPoints([this._lastAbsX+a,this._lastAbsY])
},linetoAbs:function(a,b){this.addPoints([a,b])
},linetoRel:function(a,b){this.addPoints([this._lastAbsX+a,this._lastAbsY+b])
},movetoAbs:function(a,b){this.addPoints([a,b])
},movetoRel:function(a,b){if(this._lastAbsX&&this._lastAbsY){this.addPoints([this._lastAbsX+a,this._lastAbsY+b])
}else{this.addPoints([a,b])
}},curvetoQuadraticAbs:function(b,c,a,d){this.addPoints([a,d])
},curvetoQuadraticRel:function(b,c,a,d){this.addPoints([this._lastAbsX+a,this._lastAbsY+d])
},curvetoCubicSmoothAbs:function(b,c,a,d){this.addPoints([a,d])
},curvetoCubicSmoothRel:function(b,c,a,d){this.addPoints([this._lastAbsX+a,this._lastAbsY+d])
},curvetoQuadraticSmoothAbs:function(a,b){this.addPoints([a,b])
},curvetoQuadraticSmoothRel:function(a,b){this.addPoints([this._lastAbsX+a,this._lastAbsY+b])
},linetoVerticalAbs:function(a){this.addPoints([this._lastAbsX,a])
},linetoVerticalRel:function(a){this.addPoints([this._lastAbsX,this._lastAbsY+a])
},closePath:function(){return
}});
NAMESPACE_ORYX="http://www.b3mn.org/oryx";
NAMESPACE_SVG="http://www.w3.org/2000/svg/";
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.SVG){ORYX.Core.SVG={}
}ORYX.Core.SVG.SVGMarker=Clazz.extend({construct:function(a){arguments.callee.$.construct.apply(this,arguments);
this.id=undefined;
this.element=a;
this.refX=undefined;
this.refY=undefined;
this.markerWidth=undefined;
this.markerHeight=undefined;
this.oldRefX=undefined;
this.oldRefY=undefined;
this.oldMarkerWidth=undefined;
this.oldMarkerHeight=undefined;
this.optional=false;
this.enabled=true;
this.minimumLength=undefined;
this.resize=false;
this.svgShapes=[];
this._init()
},_init:function(){if(!(this.element=="[object SVGMarkerElement]")){throw"SVGMarker: Argument is not an instance of SVGMarkerElement."
}this.id=this.element.getAttributeNS(null,"id");
var a=this.element.getAttributeNS(null,"refX");
if(a){this.refX=parseFloat(a)
}else{this.refX=0
}var h=this.element.getAttributeNS(null,"refY");
if(h){this.refY=parseFloat(h)
}else{this.refY=0
}var f=this.element.getAttributeNS(null,"markerWidth");
if(f){this.markerWidth=parseFloat(f)
}else{this.markerWidth=3
}var c=this.element.getAttributeNS(null,"markerHeight");
if(c){this.markerHeight=parseFloat(c)
}else{this.markerHeight=3
}this.oldRefX=this.refX;
this.oldRefY=this.refY;
this.oldMarkerWidth=this.markerWidth;
this.oldMarkerHeight=this.markerHeight;
var g=this.element.getAttributeNS(NAMESPACE_ORYX,"optional");
if(g){g=g.strip();
this.optional=(g.toLowerCase()==="yes")
}else{this.optional=false
}var e=this.element.getAttributeNS(NAMESPACE_ORYX,"enabled");
if(e){e=e.strip();
this.enabled=!(e.toLowerCase()==="no")
}else{this.enabled=true
}var d=this.element.getAttributeNS(NAMESPACE_ORYX,"minimumLength");
if(d){this.minimumLength=parseFloat(d)
}var b=this.element.getAttributeNS(NAMESPACE_ORYX,"resize");
if(b){b=b.strip();
this.resize=(b.toLowerCase()==="yes")
}else{this.resize=false
}},_getSVGShapes:function(c){if(c.hasChildNodes){var a=[];
var b=this;
$A(c.childNodes).each(function(d){try{var g=new ORYX.Core.SVG.SVGShape(d);
a.push(g)
}catch(f){a=a.concat(b._getSVGShapes(d))
}});
return a
}},update:function(){this.oldRefX=this.refX;
this.oldRefY=this.refY;
this.oldMarkerWidth=this.markerWidth;
this.oldMarkerHeight=this.markerHeight
},toString:function(){return(this.element)?"SVGMarker "+this.element.id:"SVGMarker "+this.element
}});
NAMESPACE_ORYX="http://www.b3mn.org/oryx";
NAMESPACE_SVG="http://www.w3.org/2000/svg/";
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.SVG){ORYX.Core.SVG={}
}ORYX.Core.SVG.SVGShape=Clazz.extend({construct:function(a){arguments.callee.$.construct.apply(this,arguments);
this.type;
this.element=a;
this.x=undefined;
this.y=undefined;
this.width=undefined;
this.height=undefined;
this.oldX=undefined;
this.oldY=undefined;
this.oldWidth=undefined;
this.oldHeight=undefined;
this.radiusX=undefined;
this.radiusY=undefined;
this.isHorizontallyResizable=false;
this.isVerticallyResizable=false;
this.anchorLeft=false;
this.anchorRight=false;
this.anchorTop=false;
this.anchorBottom=false;
this.allowDockers=true;
this.resizeMarkerMid=false;
this.editPathParser;
this.editPathHandler;
this.init()
},init:function(){if(ORYX.Editor.checkClassType(this.element,SVGRectElement)||ORYX.Editor.checkClassType(this.element,SVGImageElement)){this.type="Rect";
var G=this.element.getAttributeNS(null,"x");
if(G){this.oldX=parseFloat(G)
}else{throw"Missing attribute in element "+this.element
}var o=this.element.getAttributeNS(null,"y");
if(o){this.oldY=parseFloat(o)
}else{throw"Missing attribute in element "+this.element
}var q=this.element.getAttributeNS(null,"width");
if(q){this.oldWidth=parseFloat(q)
}else{throw"Missing attribute in element "+this.element
}var s=this.element.getAttributeNS(null,"height");
if(s){this.oldHeight=parseFloat(s)
}else{throw"Missing attribute in element "+this.element
}}else{if(ORYX.Editor.checkClassType(this.element,SVGCircleElement)){this.type="Circle";
var h=undefined;
var e=undefined;
var a=this.element.getAttributeNS(null,"cx");
if(a){h=parseFloat(a)
}else{throw"Missing attribute in element "+this.element
}var u=this.element.getAttributeNS(null,"cy");
if(u){e=parseFloat(u)
}else{throw"Missing attribute in element "+this.element
}var j=this.element.getAttributeNS(null,"r");
if(j){this.radiusX=parseFloat(j)
}else{throw"Missing attribute in element "+this.element
}this.oldX=h-this.radiusX;
this.oldY=e-this.radiusX;
this.oldWidth=2*this.radiusX;
this.oldHeight=2*this.radiusX
}else{if(ORYX.Editor.checkClassType(this.element,SVGEllipseElement)){this.type="Ellipse";
var h=undefined;
var e=undefined;
var a=this.element.getAttributeNS(null,"cx");
if(a){h=parseFloat(a)
}else{throw"Missing attribute in element "+this.element
}var u=this.element.getAttributeNS(null,"cy");
if(u){e=parseFloat(u)
}else{throw"Missing attribute in element "+this.element
}var H=this.element.getAttributeNS(null,"rx");
if(H){this.radiusX=parseFloat(H)
}else{throw"Missing attribute in element "+this.element
}var p=this.element.getAttributeNS(null,"ry");
if(p){this.radiusY=parseFloat(p)
}else{throw"Missing attribute in element "+this.element
}this.oldX=h-this.radiusX;
this.oldY=e-this.radiusY;
this.oldWidth=2*this.radiusX;
this.oldHeight=2*this.radiusY
}else{if(ORYX.Editor.checkClassType(this.element,SVGLineElement)){this.type="Line";
var A=undefined;
var g=undefined;
var y=undefined;
var d=undefined;
var F=this.element.getAttributeNS(null,"x1");
if(F){A=parseFloat(F)
}else{throw"Missing attribute in element "+this.element
}var b=this.element.getAttributeNS(null,"y1");
if(b){g=parseFloat(b)
}else{throw"Missing attribute in element "+this.element
}var l=this.element.getAttributeNS(null,"x2");
if(l){y=parseFloat(l)
}else{throw"Missing attribute in element "+this.element
}var t=this.element.getAttributeNS(null,"y2");
if(t){d=parseFloat(t)
}else{throw"Missing attribute in element "+this.element
}this.oldX=Math.min(A,y);
this.oldY=Math.min(g,d);
this.oldWidth=Math.abs(A-y);
this.oldHeight=Math.abs(g-d)
}else{if(ORYX.Editor.checkClassType(this.element,SVGPolylineElement)||ORYX.Editor.checkClassType(this.element,SVGPolygonElement)){this.type="Polyline";
var x=this.element.getAttributeNS(null,"points");
if(x){x=x.replace(/,/g," ");
var m=x.split(" ");
m=m.without("");
if(m&&m.length&&m.length>1){var E=parseFloat(m[0]);
var D=parseFloat(m[1]);
var C=parseFloat(m[0]);
var B=parseFloat(m[1]);
for(var w=0;
w<m.length;
w++){E=Math.min(E,parseFloat(m[w]));
C=Math.max(C,parseFloat(m[w]));
w++;
D=Math.min(D,parseFloat(m[w]));
B=Math.max(B,parseFloat(m[w]))
}this.oldX=E;
this.oldY=D;
this.oldWidth=C-E;
this.oldHeight=B-D
}else{throw"Missing attribute in element "+this.element
}}else{throw"Missing attribute in element "+this.element
}}else{if(ORYX.Editor.checkClassType(this.element,SVGPathElement)){this.type="Path";
this.editPathParser=new PathParser();
this.editPathHandler=new ORYX.Core.SVG.EditPathHandler();
this.editPathParser.setHandler(this.editPathHandler);
var f=new PathParser();
var c=new ORYX.Core.SVG.MinMaxPathHandler();
f.setHandler(c);
f.parsePath(this.element);
this.oldX=c.minX;
this.oldY=c.minY;
this.oldWidth=c.maxX-c.minX;
this.oldHeight=c.maxY-c.minY;
delete f;
delete c
}else{throw"Element is not a shape."
}}}}}}var r=this.element.getAttributeNS(NAMESPACE_ORYX,"resize");
if(r){r=r.toLowerCase();
if(r.match(/horizontal/)){this.isHorizontallyResizable=true
}else{this.isHorizontallyResizable=false
}if(r.match(/vertical/)){this.isVerticallyResizable=true
}else{this.isVerticallyResizable=false
}}else{this.isHorizontallyResizable=false;
this.isVerticallyResizable=false
}var v=this.element.getAttributeNS(NAMESPACE_ORYX,"anchors");
if(v){v=v.replace("/,/g"," ");
var n=v.split(" ").without("");
for(var w=0;
w<n.length;
w++){switch(n[w].toLowerCase()){case"left":this.anchorLeft=true;
break;
case"right":this.anchorRight=true;
break;
case"top":this.anchorTop=true;
break;
case"bottom":this.anchorBottom=true;
break
}}}if(ORYX.Editor.checkClassType(this.element,SVGPathElement)){var k=this.element.getAttributeNS(NAMESPACE_ORYX,"allowDockers");
if(k){if(k.toLowerCase()==="no"){this.allowDockers=false
}else{this.allowDockers=true
}}var z=this.element.getAttributeNS(NAMESPACE_ORYX,"resizeMarker-mid");
if(z){if(z.toLowerCase()==="yes"){this.resizeMarkerMid=true
}else{this.resizeMarkerMid=false
}}}this.x=this.oldX;
this.y=this.oldY;
this.width=this.oldWidth;
this.height=this.oldHeight
},update:function(){if(this.x!==this.oldX||this.y!==this.oldY||this.width!==this.oldWidth||this.height!==this.oldHeight){switch(this.type){case"Rect":if(this.x!==this.oldX){this.element.setAttributeNS(null,"x",this.x)
}if(this.y!==this.oldY){this.element.setAttributeNS(null,"y",this.y)
}if(this.width!==this.oldWidth){this.element.setAttributeNS(null,"width",this.width)
}if(this.height!==this.oldHeight){this.element.setAttributeNS(null,"height",this.height)
}break;
case"Circle":this.radiusX=((this.width<this.height)?this.width:this.height)/2;
this.element.setAttributeNS(null,"cx",this.x+this.width/2);
this.element.setAttributeNS(null,"cy",this.y+this.height/2);
this.element.setAttributeNS(null,"r",this.radiusX);
break;
case"Ellipse":this.radiusX=this.width/2;
this.radiusY=this.height/2;
this.element.setAttributeNS(null,"cx",this.x+this.radiusX);
this.element.setAttributeNS(null,"cy",this.y+this.radiusY);
this.element.setAttributeNS(null,"rx",this.radiusX);
this.element.setAttributeNS(null,"ry",this.radiusY);
break;
case"Line":if(this.x!==this.oldX){this.element.setAttributeNS(null,"x1",this.x)
}if(this.y!==this.oldY){this.element.setAttributeNS(null,"y1",this.y)
}if(this.x!==this.oldX||this.width!==this.oldWidth){this.element.setAttributeNS(null,"x2",this.x+this.width)
}if(this.y!==this.oldY||this.height!==this.oldHeight){this.element.setAttributeNS(null,"y2",this.y+this.height)
}break;
case"Polyline":var d=this.element.getAttributeNS(null,"points");
if(d){d=d.replace(/,/g," ").split(" ").without("");
if(d&&d.length&&d.length>1){var g=(this.oldWidth===0)?0:this.width/this.oldWidth;
var e=(this.oldHeight===0)?0:this.height/this.oldHeight;
var b="";
for(var c=0;
c<d.length;
c++){var a=(parseFloat(d[c])-this.oldX)*g+this.x;
c++;
var f=(parseFloat(d[c])-this.oldY)*e+this.y;
b+=a+" "+f+" "
}this.element.setAttributeNS(null,"points",b)
}else{}}else{}break;
case"Path":var g=(this.oldWidth===0)?0:this.width/this.oldWidth;
var e=(this.oldHeight===0)?0:this.height/this.oldHeight;
this.editPathHandler.init(this.x,this.y,this.oldX,this.oldY,g,e);
this.editPathParser.parsePath(this.element);
this.element.setAttributeNS(null,"d",this.editPathHandler.d);
break
}this.oldX=this.x;
this.oldY=this.y;
this.oldWidth=this.width;
this.oldHeight=this.height
}},isPointIncluded:function(e,c){if(!e||!c||!this.isVisible()){return false
}switch(this.type){case"Rect":return(e>=this.x&&e<=this.x+this.width&&c>=this.y&&c<=this.y+this.height);
break;
case"Circle":return ORYX.Core.Math.isPointInEllipse(e,c,this.x+this.width/2,this.y+this.height/2,this.radiusX,this.radiusX);
break;
case"Ellipse":return ORYX.Core.Math.isPointInEllipse(e,c,this.x+this.radiusX,this.y+this.radiusY,this.radiusX,this.radiusY);
break;
case"Line":return ORYX.Core.Math.isPointInLine(e,c,this.x,this.y,this.x+this.width,this.y+this.height);
break;
case"Polyline":var b=this.element.getAttributeNS(null,"points");
if(b){b=b.replace(/,/g," ").split(" ").without("");
b=b.collect(function(f){return parseFloat(f)
});
return ORYX.Core.Math.isPointInPolygone(e,c,b)
}else{return false
}break;
case"Path":var d=new PathParser();
var a=new ORYX.Core.SVG.PointsPathHandler();
d.setHandler(a);
d.parsePath(this.element);
return ORYX.Core.Math.isPointInPolygone(e,c,a.points);
break;
default:return false
}},isVisible:function(c){if(!c){c=this.element
}var b=false;
try{b=!!c.ownerSVGElement
}catch(g){}if(b){if(ORYX.Editor.checkClassType(c,SVGGElement)){if(c.className&&c.className.baseVal=="me"){return true
}}var f=c.getAttributeNS(null,"fill");
var d=c.getAttributeNS(null,"stroke");
if(f&&f=="none"&&d&&d=="none"){return false
}var a=c.getAttributeNS(null,"display");
if(!a){return this.isVisible(c.parentNode)
}else{if(a=="none"){return false
}else{return true
}}}return true
},toString:function(){return(this.element)?"SVGShape "+this.element.id:"SVGShape "+this.element
}});
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.SVG){ORYX.Core.SVG={}
}ORYX.Core.SVG.Label=Clazz.extend({_characterSets:["%W","@","m","wDGMOQÖ#+=<>~^","ABCHKNRSUVXZÜÄ&","bdghnopquxöüETY1234567890ß_§${}*´`µ€","aeksvyzäFLP?°²³","c-",'rtJ"/()[]:;!|\\',"fjI., ","'","il"],_characterSetValues:[15,14,13,11,10,9,8,7,6,5,4,3],construct:function(l){arguments.callee.$.construct.apply(this,arguments);
if(!l.textElement){throw"Label: No parameter textElement."
}else{if(!ORYX.Editor.checkClassType(l.textElement,SVGTextElement)){throw"Label: Parameter textElement is not an SVGTextElement."
}}this.invisibleRenderPoint=-5000;
this.node=l.textElement;
this.node.setAttributeNS(null,"stroke-width","0pt");
this.node.setAttributeNS(null,"letter-spacing","-0.01px");
this.shapeId=l.shapeId;
this.id;
this.fitToElemId;
this.edgePosition;
this.x;
this.y;
this.oldX;
this.oldY;
this.isVisible=true;
this._text;
this._verticalAlign;
this._horizontalAlign;
this._rotate;
this._rotationPoint;
this.anchorLeft;
this.anchorRight;
this.anchorTop;
this.anchorBottom;
this._isChanged=true;
var j=this.node.getAttributeNS(null,"id");
if(j){this.id=j
}this.fitToElemId=this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"fittoelem");
if(this.fitToElemId){this.fitToElemId=this.shapeId+this.fitToElemId
}var f=this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"align");
if(f){f=f.replace(/,/g," ");
f=f.split(" ");
f=f.without("");
f.each((function(e){switch(e){case"top":case"middle":case"bottom":if(!this._verticalAlign){this._verticalAlign=e
}break;
case"left":case"center":case"right":if(!this._horizontalAlign){this._horizontalAlign=e
}break
}}).bind(this))
}this.edgePosition=this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"edgePosition");
if(this.edgePosition){this.edgePosition=this.edgePosition.toLowerCase()
}this.offsetTop=this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"offsetTop")||ORYX.CONFIG.OFFSET_EDGE_LABEL_TOP;
if(this.offsetTop){this.offsetTop=parseInt(this.offsetTop)
}this.offsetBottom=this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"offsetBottom")||ORYX.CONFIG.OFFSET_EDGE_LABEL_BOTTOM;
if(this.offsetBottom){this.offsetBottom=parseInt(this.offsetBottom)
}var k=this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"rotate");
if(k){try{this._rotate=parseFloat(k)
}catch(g){this._rotate=0
}}else{this._rotate=0
}var b=this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"anchors");
if(b){b=b.replace("/,/g"," ");
var a=b.split(" ").without("");
for(var d=0;
d<a.length;
d++){switch(a[d].toLowerCase()){case"left":this.anchorLeft=true;
break;
case"right":this.anchorRight=true;
break;
case"top":this.anchorTop=true;
break;
case"bottom":this.anchorBottom=true;
break
}}}if(!this._verticalAlign){this._verticalAlign="bottom"
}if(!this._horizontalAlign){this._horizontalAlign="left"
}var c=this.node.getAttributeNS(null,"x");
if(c){this.x=parseFloat(c);
this.oldX=this.x
}else{}var h=this.node.getAttributeNS(null,"y");
if(h){this.y=parseFloat(h);
this.oldY=this.y
}else{}this.text(this.node.textContent)
},changed:function(){this._isChanged=true
},update:function(){if(this._isChanged||this.x!==this.oldX||this.y!==this.oldY){if(this.isVisible){this._isChanged=false;
this.node.setAttributeNS(null,"x",this.x);
this.node.setAttributeNS(null,"y",this.y);
if(this._fontSize){this.node.setAttributeNS(null,"font-size",this._fontSize)
}switch(this._horizontalAlign){case"left":this.node.setAttributeNS(null,"text-anchor","start");
break;
case"center":this.node.setAttributeNS(null,"text-anchor","middle");
break;
case"right":this.node.setAttributeNS(null,"text-anchor","end");
break
}this.oldX=this.x;
this.oldY=this.y;
if(this._rotate!==undefined){if(this._rotationPoint){this.node.setAttributeNS(null,"transform","rotate("+this._rotate+" "+this._rotationPoint.x+" "+this._rotationPoint.y+")")
}else{this.node.setAttributeNS(null,"transform","rotate("+this._rotate+" "+this.x+" "+this.y+")")
}}var a=this._text.split("\n");
while(a.last()==""){a.pop()
}this.node.textContent="";
if(this.node.ownerDocument){a.each((function(c,b){var d=this.node.ownerDocument.createElementNS(ORYX.CONFIG.NAMESPACE_SVG,"tspan");
d.textContent=c;
d.setAttributeNS(null,"x",this.invisibleRenderPoint);
d.setAttributeNS(null,"y",this.invisibleRenderPoint);
if(d.textContent===""){d.textContent=" "
}this.node.appendChild(d)
}).bind(this));
if(this.isVisible){this.node.setAttributeNS(null,"visibility","hidden")
}if(this.fitToElemId){window.setTimeout(this._checkFittingToReferencedElem.bind(this),0)
}else{window.setTimeout(this._positionText.bind(this),0)
}}}else{this.node.textContent=""
}}},_checkFittingToReferencedElem:function(){try{var b=$A(this.node.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"tspan"));
var d=[];
var l=this.node.ownerDocument.getElementById(this.fitToElemId);
if(l){var k=l.getBBox();
var s=this.getFontSize();
for(var f=0;
f<b.length;
f++){var p=b[f];
var t=this._getRenderedTextLength(p,undefined,undefined,s);
var h=(this._rotate!=0&&this._rotate%180!=0&&this._rotate%90==0?k.height:k.width);
if(t>h){var q=0;
var n=0;
var o=this.getTrimmedTextLength(p.textContent);
for(var g=0;
g<o;
g++){var r=this._getRenderedTextLength(p,q,g-q,s);
if(r>h-3){var c=this.node.ownerDocument.createElementNS(ORYX.CONFIG.NAMESPACE_SVG,"tspan");
if(n<=q){n=(g==0)?g:g-1;
c.textContent=p.textContent.slice(q,n)
}else{c.textContent=p.textContent.slice(q,++n)
}c.setAttributeNS(null,"x",this.invisibleRenderPoint);
c.setAttributeNS(null,"y",this.invisibleRenderPoint);
d.push(c);
q=n
}else{var a=p.textContent.charAt(g);
if(a==" "||a=="-"||a=="."||a==","||a==";"||a==":"){n=g
}}}p.textContent=p.textContent.slice(q)
}d.push(p)
}while(this.node.hasChildNodes()){this.node.removeChild(this.node.childNodes[0])
}while(d.length>0){this.node.appendChild(d.shift())
}}}catch(m){}window.setTimeout(this._positionText.bind(this),0)
},_positionText:function(){try{var a=this.node.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"tspan");
var c=this.getFontSize(this.node);
var b=[];
$A(a).each((function(g,f){if(g.textContent.trim()===""){b.push(g)
}else{var e=0;
switch(this._verticalAlign){case"bottom":e=-(a.length-f-1)*(c);
break;
case"middle":e=-(a.length/2-f-1)*(c);
e-=ORYX.CONFIG.LABEL_LINE_DISTANCE/2;
break;
case"top":e=f*(c);
e+=c;
break
}g.setAttributeNS(null,"dy",e);
g.setAttributeNS(null,"x",this.x);
g.setAttributeNS(null,"y",this.y)
}}).bind(this));
b.each(function(e){this.node.removeChild(e)
}.bind(this))
}catch(d){this._isChanged=true
}if(this.isVisible){this.node.setAttributeNS(null,"visibility","inherit")
}},_getRenderedTextLength:function(c,d,b,a){if(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)&&new Number(RegExp.$1)>=3){if(d===undefined){return c.getComputedTextLength()
}else{return c.getSubStringLength(d,b)
}}else{if(d===undefined){return this._estimateTextWidth(c.textContent,a)
}else{return this._estimateTextWidth(c.textContent.substr(d,b).trim(),a)
}}},_estimateTextWidth:function(d,c){var b=0;
for(var a=0;
a<d.length;
a++){b+=this._estimateCharacterWidth(d.charAt(a))
}return b*(c/14)
},_estimateCharacterWidth:function(b){for(var a=0;
a<this._characterSets.length;
a++){if(this._characterSets[a].indexOf(b)>=0){return this._characterSetValues[a]
}}return 9
},getReferencedElementWidth:function(){var a=this.node.ownerDocument.getElementById(this.fitToElemId);
if(a){var b=a.getBBox();
if(b){return b.width
}else{return undefined
}}else{return undefined
}},text:function(){switch(arguments.length){case 0:return this._text;
break;
case 1:var a=this._text;
if(arguments[0]){this._text=arguments[0].toString()
}else{this._text=""
}if(a!==this._text){this._isChanged=true
}break;
default:break
}},fontSize:function(){switch(arguments.length){case 0:return this._fontSize;
break;
case 1:var a=this._fontSize;
if(arguments[0]){this._fontSize=arguments[0].toString()
}else{this._fontSize=12
}if(a!==this._fontSize){this._isChanged=true
}break;
default:break
}},verticalAlign:function(){switch(arguments.length){case 0:return this._verticalAlign;
case 1:if(["top","middle","bottom"].member(arguments[0])){var a=this._verticalAlign;
this._verticalAlign=arguments[0];
if(this._verticalAlign!==a){this._isChanged=true
}}break;
default:break
}},horizontalAlign:function(){switch(arguments.length){case 0:return this._horizontalAlign;
case 1:if(["left","center","right"].member(arguments[0])){var a=this._horizontalAlign;
this._horizontalAlign=arguments[0];
if(this._horizontalAlign!==a){this._isChanged=true
}}break;
default:break
}},rotate:function(){switch(arguments.length){case 0:return this._rotate;
case 1:if(this._rotate!=arguments[0]){this._rotate=arguments[0];
this._rotationPoint=undefined;
this._isChanged=true
}case 2:if(this._rotate!=arguments[0]||!this._rotationPoint||this._rotationPoint.x!=arguments[1].x||this._rotationPoint.y!=arguments[1].y){this._rotate=arguments[0];
this._rotationPoint=arguments[1];
this._isChanged=true
}}},hide:function(){if(this.isVisible){this.isVisible=false;
this._isChanged=true
}},show:function(){if(!this.isVisible){this.isVisible=true;
this._isChanged=true
}},getInheritedFontSize:function(b){if(!b||!b.getAttributeNS){return
}var a=b.getAttributeNS(null,"font-size");
if(a){return parseFloat(a)
}else{if(!ORYX.Editor.checkClassType(b,SVGSVGElement)){return this.getInheritedFontSize(b.parentNode)
}}},getFontSize:function(b){var a=this.node.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"tspan");
var c=this.getInheritedFontSize(this.node);
if(!c){if(a[0]&&/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)&&new Number(RegExp.$1)>=3){c=a[0].getExtentOfChar(0).height
}else{c=ORYX.CONFIG.LABEL_DEFAULT_LINE_HEIGHT
}if(c<=0){c=ORYX.CONFIG.LABEL_DEFAULT_LINE_HEIGHT
}}if(c){this.node.setAttribute("oryx:fontSize",c)
}return c
},getTrimmedTextLength:function(b){b=b.strip().gsub("  "," ");
var a;
do{a=b.length;
b=b.gsub("  "," ")
}while(a>b.length);
return b.length
},getOffsetBottom:function(){return this.offsetBottom
},getOffsetTop:function(){return this.offsetTop
},toString:function(){return"Label "+this.id
}});
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.Math){ORYX.Core.Math={}
}ORYX.Core.Math.midPoint=function(b,a){return{x:(b.x+a.x)/2,y:(b.y+a.y)/2}
};
ORYX.Core.Math.isPointInLine=function(h,f,g,e,b,a,d){d=d?Math.abs(d):1;
if(Math.abs(g-b)<=d&&Math.abs(h-g)<=d&&f-Math.max(e,a)<=d&&Math.min(e,a)-f<=d){return true
}if(Math.abs(e-a)<=d&&Math.abs(f-e)<=d&&h-Math.max(g,b)<=d&&Math.min(g,b)-h<=d){return true
}if(h>Math.max(g,b)||h<Math.min(g,b)){return false
}if(f>Math.max(e,a)||f<Math.min(e,a)){return false
}var c=(e-a)/(g-b);
return Math.abs(f-((c*h)+e-c*g))<d
};
ORYX.Core.Math.isPointInEllipse=function(h,f,b,g,e,d){if(b===undefined||g===undefined||e===undefined||d===undefined){throw"ORYX.Core.Math.isPointInEllipse needs a ellipse with these properties: x, y, radiusX, radiusY"
}var c=(h-b)/e;
var a=(f-g)/d;
return c*c+a*a<1
};
ORYX.Core.Math.isPointInPolygone=function(a,m,e){if(arguments.length<3){throw"ORYX.Core.Math.isPointInPolygone needs two arguments"
}var g=e.length-1;
if(e[0]!==e[g-1]||e[1]!==e[g]){e.push(e[0]);
e.push(e[1])
}var h=0;
var c,l,b,k,j;
for(var f=0;
f<e.length-3;
){c=e[f];
l=e[++f];
b=e[++f];
k=e[f+1];
j=(m-l)*(b-c)-(a-c)*(k-l);
if((l>=m)!=(k>=m)){h+=k-l>=0?j>=0:j<=0
}if(!j&&Math.min(c,b)<=a&&a<=Math.max(c,b)&&Math.min(l,k)<=m&&m<=Math.max(l,k)){return true
}}return(h%2)?true:false
};
ORYX.Core.Math.distancePointLinie=function(e,d,a,b){var c=ORYX.Core.Math.getPointOfIntersectionPointLine(e,d,a,b);
if(!c){return null
}return ORYX.Core.Math.getDistancePointToPoint(a,c)
};
ORYX.Core.Math.getDistancePointToPoint=function(b,a){return Math.sqrt(Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2))
};
ORYX.Core.Math.getPointOfIntersectionPointLine=function(f,c,a,e){var d=Math.pow(c.x-f.x,2)+Math.pow(c.y-f.y,2);
if(d==0){return undefined
}var b=((a.x-f.x)*(c.x-f.x)+(a.y-f.y)*(c.y-f.y))/d;
if(e){if(!(0<=b&&b<=1)){return undefined
}}pointOfIntersection=new Object();
pointOfIntersection.x=f.x+b*(c.x-f.x);
pointOfIntersection.y=f.y+b*(c.y-f.y);
return pointOfIntersection
};
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.StencilSet){ORYX.Core.StencilSet={}
}ORYX.Core.StencilSet.Stencil={construct:function(d,e,a,j,i,h){arguments.callee.$.construct.apply(this,arguments);
if(!d){throw"Stencilset seems corrupt."
}if(!e){throw"Stencil does not provide namespace."
}if(!a){throw"Stencil does not provide SVG source."
}if(!j){throw"Fatal internal error loading stencilset."
}this._source=a;
this._jsonStencil=d;
this._stencilSet=j;
this._namespace=e;
this._propertyPackages=i;
if(h&&!this._jsonStencil.position){this._jsonStencil.position=h
}this._view;
this._properties=new Hash();
if(!this._jsonStencil.type||!(this._jsonStencil.type==="edge"||this._jsonStencil.type==="node")){throw"ORYX.Core.StencilSet.Stencil(construct): Type is not defined."
}if(!this._jsonStencil.id||this._jsonStencil.id===""){throw"ORYX.Core.StencilSet.Stencil(construct): Id is not defined."
}if(!this._jsonStencil.title||this._jsonStencil.title===""){throw"ORYX.Core.StencilSet.Stencil(construct): Title is not defined."
}if(!this._jsonStencil.description){this._jsonStencil.description=""
}if(!this._jsonStencil.groups){this._jsonStencil.groups=[]
}if(!this._jsonStencil.roles){this._jsonStencil.roles=[]
}this._jsonStencil.roles.push(this._jsonStencil.id);
this._jsonStencil.roles.each((function(l,k){this._jsonStencil.roles[k]=e+l
}).bind(this));
this._jsonStencil.roles=this._jsonStencil.roles.uniq();
this._jsonStencil.id=e+this._jsonStencil.id;
this.postProcessProperties();
if(!this._jsonStencil.serialize){this._jsonStencil.serialize={}
}if(!this._jsonStencil.deserialize){this._jsonStencil.deserialize={}
}if(!this._jsonStencil.layout){this._jsonStencil.layout=[]
}if(d.view===undefined){}else{if(d.view.charAt(0)=="/"){var c=d.view
}else{var c=a+"view/"+d.view
}}if(this._jsonStencil.view){if(this._jsonStencil.view.trim().match(/</)){var b=new DOMParser();
var f=b.parseFromString(this._jsonStencil.view,"text/xml");
if(ORYX.Editor.checkClassType(f.documentElement,SVGSVGElement)){this._view=f.documentElement;
var g=this._view.getElementsByTagNameNS("http://www.w3.org/2000/svg","image");
$A(g).each((function(l){var k=l.getAttributeNodeNS("http://www.w3.org/1999/xlink","href");
if(k&&(k.value.indexOf("://")==-1&&k.value.indexOf("base64")==-1)){k.textContent=this._source+"view/"+k.value
}}).bind(this))
}else{throw"ORYX.Core.StencilSet.Stencil(_loadSVGOnSuccess): The response is not a SVG document."
}}else{new Ajax.Request(c,{asynchronous:false,method:"get",onSuccess:this._loadSVGOnSuccess.bind(this),onFailure:this._loadSVGOnFailure.bind(this)})
}}},postProcessProperties:function(){if(this._jsonStencil.icon){if(this._jsonStencil.icon.charAt(0)==="/"){}else{if((this._jsonStencil.icon.indexOf("://")===-1)&&(this._jsonStencil.icon.indexOf("base64")===-1)){this._jsonStencil.icon=this._source+"icons/"+this._jsonStencil.icon
}else{}}}else{this._jsonStencil.icon=""
}if(this._jsonStencil.propertyPackages&&this._jsonStencil.propertyPackages instanceof Array){this._jsonStencil.propertyPackages.each((function(b){var a=this._propertyPackages[b];
if(a){a.each((function(d){var c=new ORYX.Core.StencilSet.Property(d,this._namespace,this);
this._properties[c.prefix()+"-"+c.id()]=c
}).bind(this))
}}).bind(this))
}if(this._jsonStencil.properties&&this._jsonStencil.properties instanceof Array){this._jsonStencil.properties.each((function(b){var a=new ORYX.Core.StencilSet.Property(b,this._namespace,this);
this._properties[a.prefix()+"-"+a.id()]=a
}).bind(this))
}},equals:function(a){return(this.id()===a.id())
},stencilSet:function(){return this._stencilSet
},type:function(){return this._jsonStencil.type
},namespace:function(){return this._namespace
},id:function(){return this._jsonStencil.id
},idWithoutNs:function(){return this.id().replace(this.namespace(),"")
},title:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonStencil,"title")
},description:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonStencil,"description")
},groups:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonStencil,"groups")
},position:function(){return(isNaN(this._jsonStencil.position)?0:this._jsonStencil.position)
},view:function(){return this._view.cloneNode(true)||this._view
},hidden:function(){return this._jsonStencil.hide
},icon:function(){return this._jsonStencil.icon
},fixedAspectRatio:function(){return this._jsonStencil.fixedAspectRatio===true
},hasMultipleRepositoryEntries:function(){return(this.getRepositoryEntries().length>0)
},getRepositoryEntries:function(){return(this._jsonStencil.repositoryEntries)?$A(this._jsonStencil.repositoryEntries):$A([])
},properties:function(){return this._properties.values()
},property:function(a){return this._properties[a]
},roles:function(){return this._jsonStencil.roles
},defaultAlign:function(){if(!this._jsonStencil.defaultAlign){return"east"
}return this._jsonStencil.defaultAlign
},serialize:function(a,b){return this._jsonStencil.serialize
},deserialize:function(a,b){return this._jsonStencil.deserialize
},layout:function(a){return this._jsonStencil.layout
},addProperty:function(c,b){if(c&&b){var a=new ORYX.Core.StencilSet.Property(c,b,this);
this._properties[a.prefix()+"-"+a.id()]=a
}},removeProperty:function(b){if(b){var a=this._properties.values().find(function(c){return(b==c.id())
});
if(a){delete this._properties[a.prefix()+"-"+a.id()]
}}},_loadSVGOnSuccess:function(a){var b=null;
b=a.responseXML;
if(ORYX.Editor.checkClassType(b.documentElement,SVGSVGElement)){this._view=b.documentElement;
var c=this._view.getElementsByTagNameNS("http://www.w3.org/2000/svg","image");
$A(c).each((function(e){var d=e.getAttributeNodeNS("http://www.w3.org/1999/xlink","href");
if(d&&(d.value.indexOf("://")==-1&&d.value.indexOf("base64")==-1)){d.textContent=this._source+"view/"+d.value
}}).bind(this))
}else{throw"ORYX.Core.StencilSet.Stencil(_loadSVGOnSuccess): The response is not a SVG document."
}},_loadSVGOnFailure:function(a){throw"ORYX.Core.StencilSet.Stencil(_loadSVGOnFailure): Loading SVG document failed."
},toString:function(){return"Stencil "+this.title()+" ("+this.id()+")"
}};
ORYX.Core.StencilSet.Stencil=Clazz.extend(ORYX.Core.StencilSet.Stencil);
function _evenMoreEvilHack(c,e){if(window.ActiveXObject){var b=new ActiveXObject("MSXML.DomDocument");
b.loadXML(c);
return b
}else{if(window.XMLHttpRequest){var a=new XMLHttpRequest;
a.open("GET","data:"+(e||"application/xml")+";charset=utf-8,"+encodeURIComponent(c),false);
if(a.overrideMimeType){a.overrideMimeType(e)
}a.send(null);
return a.responseXML
}}}function _evilSafariHack(d){var b=d;
var a="data:text/xml;charset=utf-8,"+encodeURIComponent(b);
var e=null;
var c=new XMLHttpRequest();
c.open("GET",a);
c.onload=function(){e=c.responseXML
};
c.send(null);
return e
};
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.StencilSet){ORYX.Core.StencilSet={}
}ORYX.Core.StencilSet.Property=Clazz.extend({construct:function(c,a,b){arguments.callee.$.construct.apply(this,arguments);
this._jsonProp=c||ORYX.Log.error("Parameter jsonProp is not defined.");
this._namespace=a||ORYX.Log.error("Parameter namespace is not defined.");
this._stencil=b||ORYX.Log.error("Parameter stencil is not defined.");
this._items=new Hash();
this._complexItems=new Hash();
c.id=c.id||ORYX.Log.error("ORYX.Core.StencilSet.Property(construct): Id is not defined.");
c.id=c.id.toLowerCase();
if(!c.type){ORYX.Log.info("Type is not defined for stencil '%0', id '%1'. Falling back to 'String'.",b,c.id);
c.type="string"
}else{c.type=c.type.toLowerCase()
}c.prefix=c.prefix||"oryx";
c.title=c.title||"";
c.value=c.value||"";
c.description=c.description||"";
c.readonly=c.readonly||false;
if(c.optional!=false){c.optional=true
}if(this._jsonProp.refToView){if(!(this._jsonProp.refToView instanceof Array)){this._jsonProp.refToView=[this._jsonProp.refToView]
}}else{this._jsonProp.refToView=[]
}if(c.min===undefined||c.min===null){c.min=Number.MIN_VALUE
}if(c.max===undefined||c.max===null){c.max=Number.MAX_VALUE
}if(!c.fillOpacity){c.fillOpacity=false
}if(!c.strokeOpacity){c.strokeOpacity=false
}if(c.length===undefined||c.length===null){c.length=Number.MAX_VALUE
}if(!c.wrapLines){c.wrapLines=false
}if(!c.dateFormat){c.dataFormat="m/d/y"
}if(!c.fill){c.fill=false
}if(!c.stroke){c.stroke=false
}if(!c.inverseBoolean){c.inverseBoolean=false
}if(!c.directlyEditable&&c.directlyEditable!=false){c.directlyEditable=true
}if(!c.visible){c.visible=true
}if(!c.hidden){c.hidden=false
}if(!c.fortasktypes){c.fortasktypes=""
}if(!c.ifproptrue){c.ifproptrue=""
}if(!c.fordistribution){c.fordistribution=""
}if(!c.popular){c.popular=false
}if(!c.simulation){c.simulation=false
}if(!c.customassignment){c.customassignment=false
}if(!c.display){c.display=false
}if(!c.extra){c.extra=false
}if(c.complexItems&&c.complexItems instanceof Array){c.complexItems.each((function(f){try{this._complexItems[f.id]=new ORYX.Core.StencilSet.ComplexPropertyItem(f,a,this)
}catch(d){ORYX.Log.error("error while initializing complex items for "+c.title);
ORYX.Log.error(d)
}}).bind(this))
}if((c.type===ORYX.CONFIG.TYPE_CHOICE)||(c.type===ORYX.CONFIG.TYPE_DYNAMICCHOICE)){if(c.items&&c.items instanceof Array){c.items.each((function(d){this._items[d.value]=new ORYX.Core.StencilSet.PropertyItem(d,a,this)
}).bind(this))
}else{throw"ORYX.Core.StencilSet.Property(construct): No property items defined."
}}if(c.type===ORYX.CONFIG.TYPE_COMPLEX&&c.complexItems===undefined){throw"ORYX.Core.StencilSet.Property(construct): No complex property items defined."
}if(c.labelProvider){this._labelProvider=c.labelProvider.transform
}},equals:function(a){return(this._namespace===a.namespace()&&this.id()===a.id())?true:false
},namespace:function(){return this._namespace
},stencil:function(){return this._stencil
},id:function(){return this._jsonProp.id
},prefix:function(){return this._jsonProp.prefix
},type:function(){return this._jsonProp.type
},inverseBoolean:function(){return this._jsonProp.inverseBoolean
},popular:function(){return this._jsonProp.popular
},simulation:function(){return this._jsonProp.simulation
},customassignment:function(){return this._jsonProp.customassignment
},display:function(){return this._jsonProp.display
},extra:function(){return this._jsonProp.extra
},setPopular:function(){this._jsonProp.popular=true
},setSimulation:function(){this._jsonProp.simulation=true
},setCustomassignment:function(){this._jsonProp.customassignment=true
},setDisplay:function(){this._jsonProp.display=true
},setExtra:function(){this._jsonProp.extra=true
},directlyEditable:function(){return this._jsonProp.directlyEditable
},visible:function(){return this._jsonProp.visible
},hidden:function(){return this._jsonProp.hidden
},fortasktypes:function(){return this._jsonProp.fortasktypes
},ifproptrue:function(){return this._jsonProp.ifproptrue
},fordistribution:function(){return this._jsonProp.fordistribution
},title:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonProp,"title")
},value:function(){return this._jsonProp.value
},readonly:function(){return this._jsonProp.readonly
},optional:function(){return this._jsonProp.optional
},description:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonProp,"description")
},refToView:function(){return this._jsonProp.refToView
},min:function(){return this._jsonProp.min
},max:function(){return this._jsonProp.max
},fillOpacity:function(){return this._jsonProp.fillOpacity
},strokeOpacity:function(){return this._jsonProp.strokeOpacity
},length:function(){return this._jsonProp.length?this._jsonProp.length:Number.MAX_VALUE
},wrapLines:function(){return this._jsonProp.wrapLines
},dateFormat:function(){return this._jsonProp.dateFormat
},fill:function(){return this._jsonProp.fill
},stroke:function(){return this._jsonProp.stroke
},items:function(){return this._items.values()
},item:function(a){return this._items[a]
},toString:function(){return"Property "+this.title()+" ("+this.id()+")"
},complexItems:function(){return this._complexItems.values()
},complexItem:function(a){return this._complexItems[a]
},complexAttributeToView:function(){return this._jsonProp.complexAttributeToView||""
},labelProvider:function(){return this._labelProvider
}});
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.StencilSet){ORYX.Core.StencilSet={}
}ORYX.Core.StencilSet.PropertyItem=Clazz.extend({construct:function(a,b,c){arguments.callee.$.construct.apply(this,arguments);
if(!a){throw"ORYX.Core.StencilSet.PropertyItem(construct): Parameter jsonItem is not defined."
}if(!b){throw"ORYX.Core.StencilSet.PropertyItem(construct): Parameter namespace is not defined."
}if(!c){throw"ORYX.Core.StencilSet.PropertyItem(construct): Parameter property is not defined."
}this._jsonItem=a;
this._namespace=b;
this._property=c;
if(!a.value){throw"ORYX.Core.StencilSet.PropertyItem(construct): Value is not defined."
}if(this._jsonItem.refToView){if(!(this._jsonItem.refToView instanceof Array)){this._jsonItem.refToView=[this._jsonItem.refToView]
}}else{this._jsonItem.refToView=[]
}},equals:function(a){return(this.property().equals(a.property())&&this.value()===a.value())
},namespace:function(){return this._namespace
},property:function(){return this._property
},value:function(){return this._jsonItem.value
},needsprop:function(){return this._jsonItem.needsprop
},title:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonItem,"title")
},refToView:function(){return this._jsonItem.refToView
},icon:function(){return(this._jsonItem.icon)?this.property().stencil()._source+"icons/"+this._jsonItem.icon:""
},toString:function(){return"PropertyItem "+this.property()+" ("+this.value()+")"
}});
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.StencilSet){ORYX.Core.StencilSet={}
}ORYX.Core.StencilSet.ComplexPropertyItem=Clazz.extend({construct:function(a,b,c){arguments.callee.$.construct.apply(this,arguments);
if(!a){throw"ORYX.Core.StencilSet.ComplexPropertyItem(construct): Parameter jsonItem is not defined."
}if(!b){throw"ORYX.Core.StencilSet.ComplexPropertyItem(construct): Parameter namespace is not defined."
}if(!c){throw"ORYX.Core.StencilSet.ComplexPropertyItem(construct): Parameter property is not defined."
}this._jsonItem=a;
this._namespace=b;
this._property=c;
this._items=new Hash();
if(!a.name){throw"ORYX.Core.StencilSet.ComplexPropertyItem(construct): Name is not defined."
}if(!a.type){throw"ORYX.Core.StencilSet.ComplexPropertyItem(construct): Type is not defined."
}else{a.type=a.type.toLowerCase()
}if((a.type===ORYX.CONFIG.TYPE_CHOICE)||(a.type===ORYX.CONFIG.TYPE_DYNAMICCHOICE)){if(a.items&&a.items instanceof Array){a.items.each((function(d){this._items[d.value]=new ORYX.Core.StencilSet.PropertyItem(d,b,this)
}).bind(this))
}else{throw"ORYX.Core.StencilSet.Property(construct): No property items defined."
}}},equals:function(a){return(this.property().equals(a.property())&&this.name()===a.name())
},namespace:function(){return this._namespace
},property:function(){return this._property
},name:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonItem,"name")
},id:function(){return this._jsonItem.id
},type:function(){return this._jsonItem.type
},optional:function(){return this._jsonItem.optional
},width:function(){return this._jsonItem.width
},value:function(){return this._jsonItem.value
},items:function(){return this._items.values()
},disable:function(){return this._jsonItem.disable
}});
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.StencilSet){ORYX.Core.StencilSet={}
}ORYX.Core.StencilSet.Rules={construct:function(){arguments.callee.$.construct.apply(this,arguments);
this._stencilSets=[];
this._stencils=[];
this._cachedConnectSET=new Hash();
this._cachedConnectSE=new Hash();
this._cachedConnectTE=new Hash();
this._cachedCardSE=new Hash();
this._cachedCardTE=new Hash();
this._cachedContainPC=new Hash();
this._cachedMorphRS=new Hash();
this._connectionRules=new Hash();
this._cardinalityRules=new Hash();
this._containmentRules=new Hash();
this._morphingRules=new Hash();
this._layoutRules=new Hash()
},initializeRules:function(k){var j=this._stencilSets.find(function(n){return(n.namespace()==k.namespace())
});
if(j){var f=this._stencilSets.clone();
f=f.without(j);
f.push(k);
this._stencilSets=[];
this._stencils=[];
this._cachedConnectSET=new Hash();
this._cachedConnectSE=new Hash();
this._cachedConnectTE=new Hash();
this._cachedCardSE=new Hash();
this._cachedCardTE=new Hash();
this._cachedContainPC=new Hash();
this._cachedMorphRS=new Hash();
this._connectionRules=new Hash();
this._cardinalityRules=new Hash();
this._containmentRules=new Hash();
this._morphingRules=new Hash();
this._layoutRules=new Hash();
f.each(function(n){this.initializeRules(n)
}.bind(this));
return
}else{this._stencilSets.push(k);
var l=new Hash(k.jsonRules());
var e=k.namespace();
var b=k.stencils();
k.extensions().values().each(function(n){if(n.rules){if(n.rules.connectionRules){l.connectionRules=l.connectionRules.concat(n.rules.connectionRules)
}if(n.rules.cardinalityRules){l.cardinalityRules=l.cardinalityRules.concat(n.rules.cardinalityRules)
}if(n.rules.containmentRules){l.containmentRules=l.containmentRules.concat(n.rules.containmentRules)
}if(n.rules.morphingRules){l.morphingRules=l.morphingRules.concat(n.rules.morphingRules)
}}if(n.stencils){b=b.concat(n.stencils)
}});
this._stencils=this._stencils.concat(k.stencils());
var g=this._connectionRules;
if(l.connectionRules){l.connectionRules.each((function(n){if(this._isRoleOfOtherNamespace(n.role)){if(!g[n.role]){g[n.role]=new Hash()
}}else{if(!g[e+n.role]){g[e+n.role]=new Hash()
}}n.connects.each((function(o){var r=[];
if(o.to){if(!(o.to instanceof Array)){o.to=[o.to]
}o.to.each((function(s){if(this._isRoleOfOtherNamespace(s)){r.push(s)
}else{r.push(e+s)
}}).bind(this))
}var q,p;
if(this._isRoleOfOtherNamespace(n.role)){q=n.role
}else{q=e+n.role
}if(this._isRoleOfOtherNamespace(o.from)){p=o.from
}else{p=e+o.from
}if(!g[q][p]){g[q][p]=r
}else{g[q][p]=g[q][p].concat(r)
}}).bind(this))
}).bind(this))
}var c=this._cardinalityRules;
if(l.cardinalityRules){l.cardinalityRules.each((function(p){var n;
if(this._isRoleOfOtherNamespace(p.role)){n=p.role
}else{n=e+p.role
}if(!c[n]){c[n]={};
for(i in p){c[n][i]=p[i]
}}var q=new Hash();
if(p.outgoingEdges){p.outgoingEdges.each((function(r){if(this._isRoleOfOtherNamespace(r.role)){q[r.role]=r
}else{q[e+r.role]=r
}}).bind(this))
}c[n].outgoingEdges=q;
var o=new Hash();
if(p.incomingEdges){p.incomingEdges.each((function(r){if(this._isRoleOfOtherNamespace(r.role)){o[r.role]=r
}else{o[e+r.role]=r
}}).bind(this))
}c[n].incomingEdges=o
}).bind(this))
}var a=this._containmentRules;
if(l.containmentRules){l.containmentRules.each((function(o){var n;
if(this._isRoleOfOtherNamespace(o.role)){n=o.role
}else{n=e+o.role
}if(!a[n]){a[n]=[]
}o.contains.each((function(p){if(this._isRoleOfOtherNamespace(p)){a[n].push(p)
}else{a[n].push(e+p)
}}).bind(this))
}).bind(this))
}var d=this._morphingRules;
if(l.morphingRules){l.morphingRules.each((function(o){var n;
if(this._isRoleOfOtherNamespace(o.role)){n=o.role
}else{n=e+o.role
}if(!d[n]){d[n]=[]
}if(!o.preserveBounds){o.preserveBounds=false
}o.baseMorphs.each((function(p){d[n].push(this._getStencilById(e+p))
}).bind(this))
}).bind(this))
}var h=this._layoutRules;
if(l.layoutRules){var m=function(n){return{edgeRole:n.edgeRole||undefined,t:n.t||1,r:n.r||1,b:n.b||1,l:n.l||1}
};
l.layoutRules.each(function(o){var n;
if(this._isRoleOfOtherNamespace(o.role)){n=o.role
}else{n=e+o.role
}if(!h[n]){h[n]={}
}if(o["in"]){h[n]["in"]=m(o["in"])
}if(o.ins){h[n]["ins"]=(o.ins||[]).map(function(p){return m(p)
})
}if(o.out){h[n]["out"]=m(o.out)
}if(o.outs){h[n]["outs"]=(o.outs||[]).map(function(p){return m(p)
})
}}.bind(this))
}}},_getStencilById:function(a){return this._stencils.find(function(b){if(!b){return false
}return b.id()==a
})
},_cacheConnect:function(a){result=this._canConnect(a);
if(a.sourceStencil&&a.targetStencil){var c=this._cachedConnectSET[a.sourceStencil.id()];
if(!c){c=new Hash();
this._cachedConnectSET[a.sourceStencil.id()]=c
}var b=c[a.edgeStencil.id()];
if(!b){b=new Hash();
c[a.edgeStencil.id()]=b
}b[a.targetStencil.id()]=result
}else{if(a.sourceStencil){var c=this._cachedConnectSE[a.sourceStencil.id()];
if(!c){c=new Hash();
this._cachedConnectSE[a.sourceStencil.id()]=c
}c[a.edgeStencil.id()]=result
}else{var d=this._cachedConnectTE[a.targetStencil.id()];
if(!d){d=new Hash();
this._cachedConnectTE[a.targetStencil.id()]=d
}d[a.edgeStencil.id()]=result
}}return result
},_cacheCard:function(b){if(b.sourceStencil){var c=this._cachedCardSE[b.sourceStencil.id()];
if(!c){c=new Hash();
this._cachedCardSE[b.sourceStencil.id()]=c
}var a=this._getMaximumNumberOfOutgoingEdge(b);
if(a==undefined){a=-1
}c[b.edgeStencil.id()]=a
}if(b.targetStencil){var d=this._cachedCardTE[b.targetStencil.id()];
if(!d){d=new Hash();
this._cachedCardTE[b.targetStencil.id()]=d
}var a=this._getMaximumNumberOfIncomingEdge(b);
if(a==undefined){a=-1
}d[b.edgeStencil.id()]=a
}},_cacheContain:function(b){var a=[this._canContain(b),this._getMaximumOccurrence(b.containingStencil,b.containedStencil)];
if(a[1]==undefined){a[1]=-1
}var c=this._cachedContainPC[b.containingStencil.id()];
if(!c){c=new Hash();
this._cachedContainPC[b.containingStencil.id()]=c
}c[b.containedStencil.id()]=a;
return a
},_cacheMorph:function(b){var a=this._cachedMorphRS[b];
if(!a){a=[];
if(this._morphingRules.keys().include(b)){a=this._stencils.select(function(c){if(!c){return false
}return c.roles().include(b)
})
}this._cachedMorphRS[b]=a
}return a
},outgoingEdgeStencils:function(a){if(!a.sourceShape&&!a.sourceStencil){return[]
}if(a.sourceShape){a.sourceStencil=a.sourceShape.getStencil()
}var b=[];
this._stencils.each((function(d){if(d&&d.type()==="edge"){var c=Object.clone(a);
c.edgeStencil=d;
if(this.canConnect(c)){b.push(d)
}}}).bind(this));
return b
},incomingEdgeStencils:function(a){if(!a.targetShape&&!a.targetStencil){return[]
}if(a.targetShape){a.targetStencil=a.targetShape.getStencil()
}var b=[];
this._stencils.each((function(d){if(d&&d.type()==="edge"){var c=Object.clone(a);
c.edgeStencil=d;
if(this.canConnect(c)){b.push(d)
}}}).bind(this));
return b
},sourceStencils:function(b){if(!b||!b.edgeShape&&!b.edgeStencil){return[]
}if(b.targetShape){b.targetStencil=b.targetShape.getStencil()
}if(b.edgeShape){b.edgeStencil=b.edgeShape.getStencil()
}var a=[];
this._stencils.each((function(d){if(d){var c=Object.clone(b);
c.sourceStencil=d;
if(this.canConnect(c)){a.push(d)
}}}).bind(this));
return a
},targetStencils:function(a){if(!a||!a.edgeShape&&!a.edgeStencil){return[]
}if(a.sourceShape){a.sourceStencil=a.sourceShape.getStencil()
}if(a.edgeShape){a.edgeStencil=a.edgeShape.getStencil()
}var b=[];
this._stencils.each((function(d){if(d){var c=Object.clone(a);
c.targetStencil=d;
if(this.canConnect(c)){b.push(d)
}}}).bind(this));
return b
},canConnect:function(c){if(!c||(!c.sourceShape&&!c.sourceStencil&&!c.targetShape&&!c.targetStencil)||!c.edgeShape&&!c.edgeStencil){return false
}if(c.sourceShape){c.sourceStencil=c.sourceShape.getStencil()
}if(c.targetShape){c.targetStencil=c.targetShape.getStencil()
}if(c.edgeShape){c.edgeStencil=c.edgeShape.getStencil()
}var b;
if(c.sourceStencil&&c.targetStencil){var e=this._cachedConnectSET[c.sourceStencil.id()];
if(!e){b=this._cacheConnect(c)
}else{var d=e[c.edgeStencil.id()];
if(!d){b=this._cacheConnect(c)
}else{var f=d[c.targetStencil.id()];
if(f==undefined){b=this._cacheConnect(c)
}else{b=f
}}}}else{if(c.sourceStencil){var e=this._cachedConnectSE[c.sourceStencil.id()];
if(!e){b=this._cacheConnect(c)
}else{var d=e[c.edgeStencil.id()];
if(d==undefined){b=this._cacheConnect(c)
}else{b=d
}}}else{var f=this._cachedConnectTE[c.targetStencil.id()];
if(!f){b=this._cacheConnect(c)
}else{var d=f[c.edgeStencil.id()];
if(d==undefined){b=this._cacheConnect(c)
}else{b=d
}}}}if(b){if(c.sourceShape){var e=this._cachedCardSE[c.sourceStencil.id()];
if(!e){this._cacheCard(c);
e=this._cachedCardSE[c.sourceStencil.id()]
}var a=e[c.edgeStencil.id()];
if(a==undefined){this._cacheCard(c)
}a=e[c.edgeStencil.id()];
if(a!=-1){b=c.sourceShape.getOutgoingShapes().all(function(g){if((g.getStencil().id()===c.edgeStencil.id())&&((c.edgeShape)?g!==c.edgeShape:true)){a--;
return(a>0)?true:false
}else{return true
}})
}}if(c.targetShape){var f=this._cachedCardTE[c.targetStencil.id()];
if(!f){this._cacheCard(c);
f=this._cachedCardTE[c.targetStencil.id()]
}var a=f[c.edgeStencil.id()];
if(a==undefined){this._cacheCard(c)
}a=f[c.edgeStencil.id()];
if(a!=-1){b=c.targetShape.getIncomingShapes().all(function(g){if((g.getStencil().id()===c.edgeStencil.id())&&((c.edgeShape)?g!==c.edgeShape:true)){a--;
return(a>0)?true:false
}else{return true
}})
}}}return b
},_canConnect:function(b){if(!b||(!b.sourceShape&&!b.sourceStencil&&!b.targetShape&&!b.targetStencil)||!b.edgeShape&&!b.edgeStencil){return false
}if(b.sourceShape){b.sourceStencil=b.sourceShape.getStencil()
}if(b.targetShape){b.targetStencil=b.targetShape.getStencil()
}if(b.edgeShape){b.edgeStencil=b.edgeShape.getStencil()
}var c;
var a=this._getConnectionRulesOfEdgeStencil(b.edgeStencil);
if(a.keys().length===0){c=false
}else{if(b.sourceStencil){c=b.sourceStencil.roles().any(function(e){var d=a[e];
if(!d){return false
}if(b.targetStencil){return(d.any(function(f){return b.targetStencil.roles().member(f)
}))
}else{return true
}})
}else{c=a.values().any(function(d){return b.targetStencil.roles().any(function(e){return d.member(e)
})
})
}}return c
},canContain:function(c){if(!c||!c.containingStencil&&!c.containingShape||!c.containedStencil&&!c.containedShape){return false
}if(c.containedShape){c.containedStencil=c.containedShape.getStencil()
}if(c.containingShape){c.containingStencil=c.containingShape.getStencil()
}if(c.containedStencil.type()=="edge"){return false
}var b;
var d=this._cachedContainPC[c.containingStencil.id()];
if(!d){b=this._cacheContain(c)
}else{b=d[c.containedStencil.id()];
if(!b){b=this._cacheContain(c)
}}if(!b[0]){return false
}else{if(b[1]==-1){return true
}else{if(c.containingShape){var a=b[1];
return c.containingShape.getChildShapes(false).all(function(e){if(e.getStencil().id()===c.containedStencil.id()){a--;
return(a>0)?true:false
}else{return true
}})
}else{return true
}}}},_canContain:function(b){if(!b||!b.containingStencil&&!b.containingShape||!b.containedStencil&&!b.containedShape){return false
}if(b.containedShape){b.containedStencil=b.containedShape.getStencil()
}if(b.containingShape){b.containingStencil=b.containingShape.getStencil()
}var a;
a=b.containingStencil.roles().any((function(d){var c=this._containmentRules[d];
if(c){return c.any(function(e){return b.containedStencil.roles().member(e)
})
}else{return false
}}).bind(this));
return a
},morphStencils:function(b){if(!b.stencil&&!b.shape){return[]
}if(b.shape){b.stencil=b.shape.getStencil()
}var a=[];
b.stencil.roles().each(function(c){this._cacheMorph(c).each(function(d){if(d){a.push(d)
}})
}.bind(this));
return a.uniq()
},baseMorphs:function(){var a=[];
this._morphingRules.each(function(b){b.value.each(function(c){a.push(c)
})
});
return a
},containsMorphingRules:function(){return this._stencilSets.any(function(a){return !!a.jsonRules().morphingRules
})
},connectMorph:function(e){if(!e||(!e.sourceShape&&!e.sourceStencil&&!e.targetShape&&!e.targetStencil)){return false
}if(e.sourceShape){e.sourceStencil=e.sourceShape.getStencil()
}if(e.targetShape){e.targetStencil=e.targetShape.getStencil()
}var a=this.incomingEdgeStencils(e);
var d=this.outgoingEdgeStencils(e);
var c=a.select(function(f){return d.member(f)
});
var b=this.baseMorphs().select(function(f){return c.member(f)
});
if(b.size()>0){return b[0]
}else{if(c.size()>0){return c[0]
}}return null
},showInShapeMenu:function(a){return this._stencilSets.any(function(b){return b.jsonRules().morphingRules.any(function(c){return a.roles().include(b.namespace()+c.role)&&c.showInShapeMenu!==false
})
})
},preserveBounds:function(a){return this._stencilSets.any(function(b){return b.jsonRules().morphingRules.any(function(c){return a.roles().include(b.namespace()+c.role)&&c.preserveBounds
})
})
},getLayoutingRules:function(b,d){if(!b||!(b instanceof ORYX.Core.Shape)){return
}var c={"in":{},out:{}};
var a=function(f,e){if(f&&f[e]){["t","r","b","l"].each(function(g){c[e][g]=Math.max(f[e][g],c[e][g]||0)
})
}if(f&&f[e+"s"] instanceof Array){["t","r","b","l"].each(function(j){var g=f[e+"s"].find(function(k){return !k.edgeRole
});
var h;
if(d instanceof ORYX.Core.Edge){h=f[e+"s"].find(function(k){return this._hasRole(d,k.edgeRole)
}.bind(this))
}c[e][j]=Math.max(h?h[j]:g[j],c[e][j]||0)
}.bind(this))
}}.bind(this);
b.getStencil().roles().each(function(e){if(this._layoutRules[e]){a(this._layoutRules[e],"in");
a(this._layoutRules[e],"out")
}}.bind(this));
["in","out"].each(function(e){["t","r","b","l"].each(function(f){c[e][f]=c[e][f]!==undefined?c[e][f]:1
})
});
return c
},_hasRole:function(b,c){if(!(b instanceof ORYX.Core.Shape)||!c){return
}var a=b.getStencil().roles().any(function(d){return d==c
});
return a||b.getStencil().id()==(b.getStencil().namespace()+c)
},_stencilsWithRole:function(a){return this._stencils.findAll(function(b){if(!b){return false
}return(b.roles().member(a))?true:false
})
},_edgesWithRole:function(a){return this._stencils.findAll(function(b){if(!b){return false
}return(b.roles().member(a)&&b.type()==="edge")?true:false
})
},_nodesWithRole:function(a){return this._stencils.findAll(function(b){if(!b){return false
}return(b.roles().member(a)&&b.type()==="node")?true:false
})
},_getMaximumOccurrence:function(b,c){var a;
c.roles().each((function(e){var d=this._cardinalityRules[e];
if(d&&d.maximumOccurrence){if(a){a=Math.min(a,d.maximumOccurrence)
}else{a=d.maximumOccurrence
}}}).bind(this));
return a
},_getMaximumNumberOfOutgoingEdge:function(b){if(!b||!b.sourceStencil||!b.edgeStencil){return false
}var a;
b.sourceStencil.roles().each((function(d){var c=this._cardinalityRules[d];
if(c&&c.outgoingEdges){b.edgeStencil.roles().each(function(e){var f=c.outgoingEdges[e];
if(f&&f.maximum){if(a){a=Math.min(a,f.maximum)
}else{a=f.maximum
}}})
}}).bind(this));
return a
},_getMaximumNumberOfIncomingEdge:function(b){if(!b||!b.targetStencil||!b.edgeStencil){return false
}var a;
b.targetStencil.roles().each((function(d){var c=this._cardinalityRules[d];
if(c&&c.incomingEdges){b.edgeStencil.roles().each(function(e){var f=c.incomingEdges[e];
if(f&&f.maximum){if(a){a=Math.min(a,f.maximum)
}else{a=f.maximum
}}})
}}).bind(this));
return a
},_getConnectionRulesOfEdgeStencil:function(b){var a=new Hash();
b.roles().each((function(c){if(this._connectionRules[c]){this._connectionRules[c].each(function(d){if(a[d.key]){a[d.key]=a[d.key].concat(d.value)
}else{a[d.key]=d.value
}})
}}).bind(this));
return a
},_isRoleOfOtherNamespace:function(a){return(a.indexOf("#")>0)
},toString:function(){return"Rules"
}};
ORYX.Core.StencilSet.Rules=Clazz.extend(ORYX.Core.StencilSet.Rules);
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.StencilSet){ORYX.Core.StencilSet={}
}ORYX.Core.StencilSet.StencilSet=Clazz.extend({construct:function(a){arguments.callee.$.construct.apply(this,arguments);
if(!a){throw"ORYX.Core.StencilSet.StencilSet(construct): Parameter 'source' is not defined."
}if(a.endsWith("/")){a=a.substr(0,a.length-1)
}this._extensions=new Hash();
this._source=a;
this._baseUrl=ORYX.PATH+"stencilset/"+a+"/";
this._jsonObject={};
this._stencils=new Hash();
this._availableStencils=new Hash();
this._removedStencils=[];
new Ajax.Request(ORYX.PATH+"stencilset/"+a,{asynchronous:false,method:"get",onSuccess:this._init.bind(this),onFailure:function(){throw"Loading stencil set "+a+" failed."
}.bind(a)})
},findRootStencilName:function(){var a=this._stencils.values().find(function(b){return b._jsonStencil.mayBeRoot
});
if(!a){ORYX.Log.warn("Did not find any stencil that may be root. Taking a guess.");
a=this._stencils.values()[0]
}return a.id()
},equals:function(a){return(this.namespace()===a.namespace())
},stencils:function(j,k,h){if(j&&k){var a=this._availableStencils.values();
var e=[j];
var d=[];
var l=[];
while(e.size()>0){var b=e.pop();
d.push(b);
var c=a.findAll(function(m){var i={containingStencil:b,containedStencil:m};
return k.canContain(i)
});
for(var g=0;
g<c.size();
g++){if(!d.member(c[g])){e.push(c[g])
}}l=l.concat(c).uniq()
}l=l.sortBy(function(i){return a.indexOf(i)
});
if(h){l=l.sortBy(function(i){return i.groups().first()
})
}var f=a.findAll(function(i){if(!i){return false
}return i.type()=="edge"
});
l=l.concat(f);
return l
}else{if(h){return this._availableStencils.values().sortBy(function(i){return i.groups().first()
})
}else{return this._availableStencils.values()
}}},nodes:function(){return this._availableStencils.values().findAll(function(a){if(!a){return false
}return(a.type()==="node")
})
},edges:function(){return this._availableStencils.values().findAll(function(a){if(!a){return false
}return(a.type()==="edge")
})
},stencil:function(a){return this._stencils[a]
},title:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonObject,"title")
},description:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonObject,"description")
},namespace:function(){return this._jsonObject?this._jsonObject.namespace:null
},jsonRules:function(){return this._jsonObject?this._jsonObject.rules:null
},source:function(){return this._source
},extensions:function(){return this._extensions
},addExtension:function(a){this.addExtensionDirectly(a)
},addExtensionFromDefinition:function(a){new Ajax.Request(a,{method:"GET",asynchronous:false,onSuccess:(function(f){try{var b=f.responseText;
var c=b.evalJSON();
this.addExtensionDirectly(c)
}catch(d){ORYX.Log.debug("Unable to load extension definition: "+d);
ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Unable to load extension definition: "+d,title:""})
}}).bind(this),onFailure:(function(b){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Unable to create extension definition.",title:""})
}).bind(this)})
},addExtensionDirectly:function(b){try{if(!(b["extends"].endsWith("#"))){b["extends"]+="#"
}if(b["extends"]==this.namespace()){this._extensions[b.namespace]=b;
var a=this._stencils.keys().size();
if(b.stencils){$A(b.stencils).each(function(f){a++;
var e=new ORYX.Core.StencilSet.Stencil(f,this.namespace(),this._baseUrl,this,undefined,a);
this._stencils[e.id()]=e;
this._availableStencils[e.id()]=e
}.bind(this))
}if(b.properties){var d=this._stencils.values();
d.each(function(f){var e=f.roles();
b.properties.each(function(g){g.roles.any(function(h){h=b["extends"]+h;
if(e.member(h)){g.properties.each(function(i){f.addProperty(i,b.namespace)
});
return true
}else{return false
}})
})
}.bind(this))
}if(b.removeproperties){b.removeproperties.each(function(f){var e=this.stencil(b["extends"]+f.stencil);
if(e){f.properties.each(function(g){e.removeProperty(g)
})
}}.bind(this))
}if(b.removestencilgroups){var d=this._stencils.values();
d.each(function(e){if(e.groups){$A(e.groups()).each(function(f){if(b.removestencilgroups.indexOf(f)!=-1){delete this._availableStencils[e.id()];
this._removedStencils.push(e.id())
}}.bind(this))
}}.bind(this))
}if(b.removestencils){$A(b.removestencils).each(function(f){var e=b["extends"]+f;
delete this._availableStencils[e];
this._removedStencils.push(e)
}.bind(this))
}}}catch(c){ORYX.Log.debug("StencilSet.addExtension: Something went wrong when initialising the stencil set extension. "+c)
}},changeTitle:function(a){this._jsonObject.title=a
},removeExtension:function(a){var b=this._extensions[a];
if(b){if(b.stencils){$A(b.stencils).each(function(e){var d=new ORYX.Core.StencilSet.Stencil(e,this.namespace(),this._baseUrl,this);
delete this._stencils[d.id()];
delete this._availableStencils[d.id()]
}.bind(this))
}if(b.properties){var c=this._stencils.values();
c.each(function(e){var d=e.roles();
b.properties.each(function(f){f.roles.any(function(g){g=b["extends"]+g;
if(d.member(g)){f.properties.each(function(h){e.removeProperty(h.id)
});
return true
}else{return false
}})
})
}.bind(this))
}if(b.removeproperties){b.removeproperties.each(function(f){var e=this.stencil(b["extends"]+f.stencil);
if(e){var d=$A(this._jsonObject.stencils).find(function(g){return g.id==e.id()
});
f.properties.each(function(h){var g=$A(d.properties).find(function(i){return i.id==h
});
e.addProperty(g,this.namespace())
}.bind(this))
}}.bind(this))
}if(this._removedStencils.length>0){$A(this._removedStencils).each(function(d){this._availableStencils[d]=this._stencils[d]
}.bind(this));
this._removedStencils.length=0
}}delete this._extensions[a]
},__handleStencilset:function(response){try{eval("this._jsonObject ="+response.responseText)
}catch(e){throw"Stenciset corrupt: "+e
}if(!this._jsonObject){throw"Error evaluating stencilset. It may be corrupt."
}with(this._jsonObject){if(!namespace||namespace===""){throw"Namespace definition missing in stencilset."
}if(!(stencils instanceof Array)){throw"Stencilset corrupt."
}if(!namespace.endsWith("#")){namespace=namespace+"#"
}if(!title){title=""
}if(!description){description=""
}}},_getJSONURL:function(a){this._baseUrl=a.responseText.substring(0,a.responseText.lastIndexOf("/")+1);
this._source=a.responseText;
new Ajax.Request(a.responseText,{asynchronous:false,method:"get",onSuccess:this._init.bind(this),onFailure:this._cancelInit.bind(this)})
},_init:function(c){this.__handleStencilset(c);
var b=new Hash();
if(this._jsonObject.propertyPackages){$A(this._jsonObject.propertyPackages).each((function(d){b[d.name]=d.properties
}).bind(this))
}var a=0;
$A(this._jsonObject.stencils).each((function(f){a++;
try{var d=new ORYX.Core.StencilSet.Stencil(f,this.namespace(),this._baseUrl,this,b,a);
this._stencils[d.id()]=d;
this._availableStencils[d.id()]=d
}catch(g){ORYX.Log.error("Problems instantiating a stencil:");
if(console!==undefined){console.log(g);
if(g.stack!==undefined){console.log(g.stack)
}}}}).bind(this))
},toString:function(){return"StencilSet "+this.title()+" ("+this.namespace()+")"
}});
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.StencilSet){ORYX.Core.StencilSet={}
}ORYX.Core.StencilSet._stencilSetsByNamespace=new Hash();
ORYX.Core.StencilSet._stencilSetsByUrl=new Hash();
ORYX.Core.StencilSet._StencilSetNSByEditorInstance=new Hash();
ORYX.Core.StencilSet._rulesByEditorInstance=new Hash();
ORYX.Core.StencilSet.stencilSets=function(b){var c=ORYX.Core.StencilSet._StencilSetNSByEditorInstance[b];
var a=new Hash();
if(c){c.each(function(e){var d=ORYX.Core.StencilSet.stencilSet(e);
a[d.namespace()]=d
})
}return a
};
ORYX.Core.StencilSet.stencilSet=function(a){ORYX.Log.trace("Getting stencil set %0",a);
var b=a.split("#",1);
if(b.length===1){ORYX.Log.trace("Getting stencil set %0",b[0]);
return ORYX.Core.StencilSet._stencilSetsByNamespace[b[0]+"#"]
}else{return undefined
}};
ORYX.Core.StencilSet.stencil=function(b){ORYX.Log.trace("Getting stencil for %0",b);
var a=ORYX.Core.StencilSet.stencilSet(b);
if(a){return a.stencil(b)
}else{ORYX.Log.trace("Cannot fild stencil for %0",b);
return undefined
}};
ORYX.Core.StencilSet.rules=function(a){if(!ORYX.Core.StencilSet._rulesByEditorInstance[a]){ORYX.Core.StencilSet._rulesByEditorInstance[a]=new ORYX.Core.StencilSet.Rules()
}return ORYX.Core.StencilSet._rulesByEditorInstance[a]
};
ORYX.Core.StencilSet.loadStencilSet=function(a,c){var d=ORYX.Core.StencilSet._stencilSetsByUrl[a];
if(!d){d=new ORYX.Core.StencilSet.StencilSet(a);
ORYX.Core.StencilSet._stencilSetsByNamespace[d.namespace()]=d;
ORYX.Core.StencilSet._stencilSetsByUrl[a]=d
}var b=d.namespace();
if(ORYX.Core.StencilSet._StencilSetNSByEditorInstance[c]){ORYX.Core.StencilSet._StencilSetNSByEditorInstance[c].push(b)
}else{ORYX.Core.StencilSet._StencilSetNSByEditorInstance[c]=[b]
}if(ORYX.Core.StencilSet._rulesByEditorInstance[c]){ORYX.Core.StencilSet._rulesByEditorInstance[c].initializeRules(d)
}else{var e=new ORYX.Core.StencilSet.Rules();
e.initializeRules(d);
ORYX.Core.StencilSet._rulesByEditorInstance[c]=e
}};
ORYX.Core.StencilSet.getTranslation=function(c,b){var d=ORYX.I18N.Language.toLowerCase();
var a=c[b+"_"+d];
if(a){return a
}a=c[b+"_"+d.substr(0,2)];
if(a){return a
}return c[b]
};
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.Command=Clazz.extend({construct:function(){},execute:function(){throw"Command.execute() has to be implemented!"
},rollback:function(){throw"Command.rollback() has to be implemented!"
}});
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.Bounds={construct:function(){this._changedCallbacks=[];
this.a={};
this.b={};
this.set.apply(this,arguments);
this.suspendChange=false;
this.changedWhileSuspend=false
},_changed:function(a){if(!this.suspendChange){this._changedCallbacks.each(function(b){b(this,a)
}.bind(this));
this.changedWhileSuspend=false
}else{this.changedWhileSuspend=true
}},registerCallback:function(a){if(!this._changedCallbacks.member(a)){this._changedCallbacks.push(a)
}},unregisterCallback:function(a){this._changedCallbacks=this._changedCallbacks.without(a)
},set:function(){var e=false;
switch(arguments.length){case 1:if(this.a.x!==arguments[0].a.x){e=true;
this.a.x=arguments[0].a.x
}if(this.a.y!==arguments[0].a.y){e=true;
this.a.y=arguments[0].a.y
}if(this.b.x!==arguments[0].b.x){e=true;
this.b.x=arguments[0].b.x
}if(this.b.y!==arguments[0].b.y){e=true;
this.b.y=arguments[0].b.y
}break;
case 2:var b=Math.min(arguments[0].x,arguments[1].x);
var a=Math.min(arguments[0].y,arguments[1].y);
var d=Math.max(arguments[0].x,arguments[1].x);
var c=Math.max(arguments[0].y,arguments[1].y);
if(this.a.x!==b){e=true;
this.a.x=b
}if(this.a.y!==a){e=true;
this.a.y=a
}if(this.b.x!==d){e=true;
this.b.x=d
}if(this.b.y!==c){e=true;
this.b.y=c
}break;
case 4:var b=Math.min(arguments[0],arguments[2]);
var a=Math.min(arguments[1],arguments[3]);
var d=Math.max(arguments[0],arguments[2]);
var c=Math.max(arguments[1],arguments[3]);
if(this.a.x!==b){e=true;
this.a.x=b
}if(this.a.y!==a){e=true;
this.a.y=a
}if(this.b.x!==d){e=true;
this.b.x=d
}if(this.b.y!==c){e=true;
this.b.y=c
}break
}if(e){this._changed(true)
}},moveTo:function(){var a=this.upperLeft();
switch(arguments.length){case 1:this.moveBy({x:arguments[0].x-a.x,y:arguments[0].y-a.y});
break;
case 2:this.moveBy({x:arguments[0]-a.x,y:arguments[1]-a.y});
break;
default:}},moveBy:function(){var c=false;
switch(arguments.length){case 1:var b=arguments[0];
if(b.x!==0||b.y!==0){c=true;
this.a.x+=b.x;
this.b.x+=b.x;
this.a.y+=b.y;
this.b.y+=b.y
}break;
case 2:var a=arguments[0];
var d=arguments[1];
if(a!==0||d!==0){c=true;
this.a.x+=a;
this.b.x+=a;
this.a.y+=d;
this.b.y+=d
}break;
default:}if(c){this._changed()
}},include:function(c){if((this.a.x===undefined)&&(this.a.y===undefined)&&(this.b.x===undefined)&&(this.b.y===undefined)){return c
}var a=Math.min(this.a.x,c.a.x);
var f=Math.min(this.a.y,c.a.y);
var e=Math.max(this.b.x,c.b.x);
var d=Math.max(this.b.y,c.b.y);
this.set(a,f,e,d)
},extend:function(a){if(a.x!==0||a.y!==0){this.b.x+=a.x;
this.b.y+=a.y;
this._changed(true)
}},widen:function(a){if(a!==0){this.suspendChange=true;
this.moveBy({x:-a,y:-a});
this.extend({x:2*a,y:2*a});
this.suspendChange=false;
if(this.changedWhileSuspend){this._changed(true)
}}},upperLeft:function(){return{x:this.a.x,y:this.a.y}
},lowerRight:function(){return{x:this.b.x,y:this.b.y}
},width:function(){return this.b.x-this.a.x
},height:function(){return this.b.y-this.a.y
},center:function(){return{x:(this.a.x+this.b.x)/2,y:(this.a.y+this.b.y)/2}
},midPoint:function(){return{x:(this.b.x-this.a.x)/2,y:(this.b.y-this.a.y)/2}
},centerMoveTo:function(){var a=this.center();
switch(arguments.length){case 1:this.moveBy(arguments[0].x-a.x,arguments[0].y-a.y);
break;
case 2:this.moveBy(arguments[0]-a.x,arguments[1]-a.y);
break
}},isIncluded:function(a,e){var f,d,e;
switch(arguments.length){case 1:f=arguments[0].x;
d=arguments[0].y;
e=0;
break;
case 2:if(arguments[0].x&&arguments[0].y){f=arguments[0].x;
d=arguments[0].y;
e=Math.abs(arguments[1])
}else{f=arguments[0];
d=arguments[1];
e=0
}break;
case 3:f=arguments[0];
d=arguments[1];
e=Math.abs(arguments[2]);
break;
default:throw"isIncluded needs one, two or three arguments"
}var c=this.upperLeft();
var b=this.lowerRight();
if(f>=c.x-e&&f<=b.x+e&&d>=c.y-e&&d<=b.y+e){return true
}else{return false
}},clone:function(){return new ORYX.Core.Bounds(this)
},toString:function(){return"( "+this.a.x+" | "+this.a.y+" )/( "+this.b.x+" | "+this.b.y+" )"
},serializeForERDF:function(){return this.a.x+","+this.a.y+","+this.b.x+","+this.b.y
}};
ORYX.Core.Bounds=Clazz.extend(ORYX.Core.Bounds);
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.UIObject={construct:function(a){this.isChanged=true;
this.isResized=true;
this.isVisible=true;
this.isSelectable=false;
this.isResizable=false;
this.isMovable=false;
this.id=ORYX.Editor.provideId();
this.parent=undefined;
this.node=undefined;
this.children=[];
this.bounds=new ORYX.Core.Bounds();
this._changedCallback=this._changed.bind(this);
this.bounds.registerCallback(this._changedCallback);
if(a&&a.eventHandlerCallback){this.eventHandlerCallback=a.eventHandlerCallback
}},_changed:function(b,a){this.isChanged=true;
if(this.bounds==b){this.isResized=a||this.isResized
}},update:function(){if(this.isChanged){this.refresh();
this.isChanged=false;
this.children.each(function(a){a.update()
})
}},refresh:function(){},getChildren:function(){return this.children.clone()
},getParents:function(){var a=[];
var b=this.parent;
while(b){a.push(b);
b=b.parent
}return a
},isParent:function(a){var b=this;
while(b){if(b===a){return true
}b=b.parent
}return false
},getId:function(){return this.id
},getChildById:function(b,a){return this.children.find(function(c){if(c.getId()===b){return c
}else{if(a){var d=c.getChildById(b,a);
if(d){return d
}}}})
},add:function(a){if(!(this.children.member(a))){if(a.parent){a.remove(a)
}this.children.push(a);
a.parent=this;
a.node=this.node.appendChild(a.node);
a.bounds.registerCallback(this._changedCallback);
if(this.eventHandlerCallback){this.eventHandlerCallback({type:ORYX.CONFIG.EVENT_SHAPEADDED,shape:a})
}}else{ORYX.Log.info("add: ORYX.Core.UIObject is already a child of this object.")
}},remove:function(a){if(this.children.member(a)){this.children=this._uiObjects.without(a);
a.parent=undefined;
a.node=this.node.removeChild(a.node);
a.bounds.unregisterCallback(this._changedCallback)
}else{ORYX.Log.info("remove: ORYX.Core.UIObject is not a child of this object.")
}},absoluteBounds:function(){if(this.parent){var a=this.absoluteXY();
return new ORYX.Core.Bounds(a.x,a.y,a.x+this.bounds.width(),a.y+this.bounds.height())
}else{return this.bounds.clone()
}},absoluteXY:function(){if(this.parent){var a=this.parent.absoluteXY();
return{x:a.x+this.bounds.upperLeft().x,y:a.y+this.bounds.upperLeft().y}
}else{return{x:this.bounds.upperLeft().x,y:this.bounds.upperLeft().y}
}},absoluteCenterXY:function(){if(this.parent){var a=this.parent.absoluteXY();
return{x:a.x+this.bounds.center().x,y:a.y+this.bounds.center().y}
}else{return{x:this.bounds.center().x,y:this.bounds.center().y}
}},hide:function(){this.node.setAttributeNS(null,"display","none");
this.isVisible=false;
this.children.each(function(a){a.hide()
})
},show:function(){this.node.setAttributeNS(null,"display","inherit");
this.isVisible=true;
this.children.each(function(a){a.show()
})
},addEventHandlers:function(a){a.addEventListener(ORYX.CONFIG.EVENT_MOUSEDOWN,this._delegateEvent.bind(this),false);
a.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE,this._delegateEvent.bind(this),false);
a.addEventListener(ORYX.CONFIG.EVENT_MOUSEUP,this._delegateEvent.bind(this),false);
a.addEventListener(ORYX.CONFIG.EVENT_MOUSEOVER,this._delegateEvent.bind(this),false);
a.addEventListener(ORYX.CONFIG.EVENT_MOUSEOUT,this._delegateEvent.bind(this),false);
a.addEventListener("click",this._delegateEvent.bind(this),false);
a.addEventListener(ORYX.CONFIG.EVENT_DBLCLICK,this._delegateEvent.bind(this),false)
},_delegateEvent:function(a){if(this.eventHandlerCallback){this.eventHandlerCallback(a,this)
}},toString:function(){return"UIObject "+this.id
}};
ORYX.Core.UIObject=Clazz.extend(ORYX.Core.UIObject);
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.AbstractShape=ORYX.Core.UIObject.extend({construct:function(a,b){arguments.callee.$.construct.apply(this,arguments);
this.resourceId=ORYX.Editor.provideId();
this._stencil=b;
if(this._stencil._jsonStencil.superId){stencilId=this._stencil.id();
superStencilId=stencilId.substring(0,stencilId.indexOf("#")+1)+b._jsonStencil.superId;
stencilSet=this._stencil.stencilSet();
this._stencil=stencilSet.stencil(superStencilId)
}this.properties=new Hash();
this.propertiesChanged=new Hash();
this.hiddenProperties=new Hash();
this._stencil.properties().each((function(d){var c=d.prefix()+"-"+d.id();
this.properties[c]=d.value();
this.propertiesChanged[c]=true
}).bind(this));
if(b._jsonStencil.superId){b.properties().each((function(f){var d=f.prefix()+"-"+f.id();
var e=f.value();
var c=this.properties[d];
this.properties[d]=e;
this.propertiesChanged[d]=true;
this._delegateEvent({type:ORYX.CONFIG.EVENT_PROPERTY_CHANGED,name:d,value:e,oldValue:c})
}).bind(this))
}},layout:function(){},getStencil:function(){return this._stencil
},getChildShapeByResourceId:function(a){a=ERDF.__stripHashes(a);
return this.getChildShapes(true).find(function(b){return b.resourceId==a
})
},getChildShapes:function(b,c){var a=[];
this.children.each(function(d){if(d instanceof ORYX.Core.Shape&&d.isVisible){if(c){c(d)
}a.push(d);
if(b){a=a.concat(d.getChildShapes(b,c))
}}});
return a
},hasChildShape:function(a){return this.getChildShapes().any(function(b){return(b===a)||b.hasChildShape(a)
})
},getChildNodes:function(b,c){var a=[];
this.children.each(function(d){if(d instanceof ORYX.Core.Node&&d.isVisible){if(c){c(d)
}a.push(d)
}if(d instanceof ORYX.Core.Shape){if(b){a=a.concat(d.getChildNodes(b,c))
}}});
return a
},getChildEdges:function(b,c){var a=[];
this.children.each(function(d){if(d instanceof ORYX.Core.Edge&&d.isVisible){if(c){c(d)
}a.push(d)
}if(d instanceof ORYX.Core.Shape){if(b){a=a.concat(d.getChildEdges(b,c))
}}});
return a
},getAbstractShapesAtPosition:function(){var b,e;
switch(arguments.length){case 1:b=arguments[0].x;
e=arguments[0].y;
break;
case 2:b=arguments[0];
e=arguments[1];
break;
default:throw"getAbstractShapesAtPosition needs 1 or 2 arguments!"
}if(this.isPointIncluded(b,e)){var a=[];
a.push(this);
var d=this.getChildNodes();
var c=this.getChildEdges();
[d,c].each(function(f){var g=new Hash();
f.each(function(h){if(!h.isVisible){return
}var j=h.getAbstractShapesAtPosition(b,e);
if(j.length>0){var i=$A(h.node.parentNode.childNodes);
var k=i.indexOf(h.node);
g[k]=j
}});
g.keys().sort().each(function(h){a=a.concat(g[h])
})
});
return a
}else{return[]
}},setProperty:function(b,d,c){var a=this.properties[b];
if(a!==d||c===true){this.properties[b]=d;
this.propertiesChanged[b]=true;
this._changed();
if(!this._isInSetProperty){this._isInSetProperty=true;
this._delegateEvent({type:ORYX.CONFIG.EVENT_PROPERTY_CHANGED,elements:[this],name:b,value:d,oldValue:a});
delete this._isInSetProperty
}}},setHiddenProperty:function(b,c){if(c===undefined){delete this.hiddenProperties[b];
return
}var a=this.hiddenProperties[b];
if(a!==c){this.hiddenProperties[b]=c
}},isPointIncluded:function(d,c,b){var a=b?b:this.absoluteBounds();
return a.isIncluded(d,c)
},serialize:function(){var a=[];
a.push({name:"type",prefix:"oryx",value:this.getStencil().id(),type:"literal"});
this.hiddenProperties.each(function(b){a.push({name:b.key.replace("oryx-",""),prefix:"oryx",value:b.value,type:"literal"})
}.bind(this));
this.getStencil().properties().each((function(d){var c=d.prefix();
var b=d.id();
a.push({name:b,prefix:c,value:this.properties[c+"-"+b],type:"literal"})
}).bind(this));
return a
},deserialize:function(b){var a=0;
b=b.sort(function(d,c){return Number(this.properties.keys().member(d.prefix+"-"+d.name))>Number(this.properties.keys().member(c.prefix+"-"+c.name))?-1:0
}.bind(this));
b.each((function(g){var c=g.name;
var f=g.prefix;
var e=g.value;
if(Ext.type(e)==="object"){e=Ext.encode(e)
}switch(f+"-"+c){case"raziel-parent":if(!this.parent){break
}var d=this.getCanvas().getChildShapeByResourceId(e);
if(d){d.add(this)
}break;
default:if(this.properties.keys().member(f+"-"+c)){this.setProperty(f+"-"+c,e)
}else{if(!(c==="bounds"||c==="parent"||c==="target"||c==="dockers"||c==="docker"||c==="outgoing"||c==="incoming")){this.setHiddenProperty(f+"-"+c,e)
}}}}).bind(this))
},toString:function(){return"ORYX.Core.AbstractShape "+this.id
},toJSON:function(){var a={resourceId:this.resourceId,properties:Ext.apply({},this.properties,this.hiddenProperties).inject({},function(d,f){var c=f[0];
var e=f[1];
if(this.getStencil().property(c)&&this.getStencil().property(c).type()===ORYX.CONFIG.TYPE_COMPLEX&&Ext.type(e)==="string"){try{e=Ext.decode(e)
}catch(b){}}c=c.replace(/^[\w_]+-/,"");
d[c]=e;
return d
}.bind(this)),stencil:{id:this.getStencil().idWithoutNs()},childShapes:this.getChildShapes().map(function(b){return b.toJSON()
})};
if(this.getOutgoingShapes){a.outgoing=this.getOutgoingShapes().map(function(b){return{resourceId:b.resourceId}
})
}if(this.bounds){a.bounds={lowerRight:this.bounds.lowerRight(),upperLeft:this.bounds.upperLeft()}
}if(this.dockers){a.dockers=this.dockers.map(function(b){var c=b.getDockedShape()&&b.referencePoint?b.referencePoint:b.bounds.center();
c.getDocker=function(){return b
};
return c
})
}Ext.apply(a,ORYX.Core.AbstractShape.JSONHelper);
a.getShape=function(){return this
}.bind(this);
return a
}});
ORYX.Core.AbstractShape.JSONHelper={eachChild:function(c,b,d){if(!this.childShapes){return
}var a=[];
this.childShapes.each(function(e){var f=c(e,this);
if(f){a.push(f)
}if(b){e.eachChild(c,b,d)
}}.bind(this));
if(d){this.childShapes=a
}},getChildShapes:function(a){var b=this.childShapes;
if(a){this.eachChild(function(c){b=b.concat(c.getChildShapes(a))
},true)
}return b
},serialize:function(){return Ext.encode(this)
}};
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.Canvas=ORYX.Core.AbstractShape.extend({zoomLevel:1,construct:function(a){arguments.callee.$.construct.apply(this,arguments);
if(!(a&&a.width&&a.height)){ORYX.Log.fatal("Canvas is missing mandatory parameters options.width and options.height.");
return
}this.resourceId=a.id;
this.nodes=[];
this.edges=[];
this.rootNode=ORYX.Editor.graft("http://www.w3.org/2000/svg",a.parentNode,["svg",{id:this.id,width:a.width,height:a.height},["defs",{}]]);
this.rootNode.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");
this.rootNode.setAttribute("xmlns:svg","http://www.w3.org/2000/svg");
this._htmlContainer=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",a.parentNode,["div",{id:"oryx_canvas_htmlContainer",style:"position:absolute; top:5px"}]);
this.node=ORYX.Editor.graft("http://www.w3.org/2000/svg",this.rootNode,["g",{},["g",{"class":"stencils"},["g",{"class":"me"}],["g",{"class":"children"}],["g",{"class":"edge"}]],["g",{"class":"svgcontainer"}]]);
this.node.setAttributeNS(null,"stroke","none");
this.node.setAttributeNS(null,"font-family","Verdana, sans-serif");
this.node.setAttributeNS(null,"font-size-adjust","none");
this.node.setAttributeNS(null,"font-style","normal");
this.node.setAttributeNS(null,"font-variant","normal");
this.node.setAttributeNS(null,"font-weight","normal");
this.node.setAttributeNS(null,"line-heigth","normal");
this.node.setAttributeNS(null,"font-size",ORYX.CONFIG.LABEL_DEFAULT_LINE_HEIGHT);
this.bounds.set(0,0,a.width,a.height);
this.addEventHandlers(this.rootNode.parentNode);
this.rootNode.oncontextmenu=function(){return false
}
},focus:function(){},update:function(){this.nodes.each(function(b){this._traverseForUpdate(b)
}.bind(this));
var a=this.getStencil().layout();
if(a){a.each(function(b){b.shape=this;
b.forceExecution=true;
b.target=this.rootNode;
this._delegateEvent(b)
}.bind(this))
}this.nodes.invoke("_update");
this.edges.invoke("_update",true)
},_traverseForUpdate:function(a){var b=a.isChanged;
a.getChildNodes(false,function(c){if(this._traverseForUpdate(c)){b=true
}}.bind(this));
if(b){a.layout();
return true
}else{return false
}},layout:function(){},getChildNodes:function(b,c){if(!b&&!c){return this.nodes.clone()
}else{var a=[];
this.nodes.each(function(d){if(c){c(d)
}a.push(d);
if(b&&d instanceof ORYX.Core.Shape){a=a.concat(d.getChildNodes(b,c))
}});
return a
}},add:function(a){if(a instanceof ORYX.Core.UIObject){if(!(this.children.member(a))){if(a.parent){a.parent.remove(a)
}this.children.push(a);
a.parent=this;
if(a instanceof ORYX.Core.Shape){if(a instanceof ORYX.Core.Edge){a.addMarkers(this.rootNode.getElementsByTagNameNS(NAMESPACE_SVG,"defs")[0]);
a.node=this.node.childNodes[0].childNodes[2].appendChild(a.node);
this.edges.push(a)
}else{a.node=this.node.childNodes[0].childNodes[1].appendChild(a.node);
this.nodes.push(a)
}}else{a.node=this.node.appendChild(a.node)
}a.bounds.registerCallback(this._changedCallback);
if(this.eventHandlerCallback){this.eventHandlerCallback({type:ORYX.CONFIG.EVENT_SHAPEADDED,shape:a})
}}else{ORYX.Log.warn("add: ORYX.Core.UIObject is already a child of this object.")
}}else{ORYX.Log.fatal("add: Parameter is not of type ORYX.Core.UIObject.")
}},remove:function(a){if(this.children.member(a)){this.children=this.children.without(a);
a.parent=undefined;
if(a instanceof ORYX.Core.Shape){if(a instanceof ORYX.Core.Edge){a.removeMarkers();
a.node=this.node.childNodes[0].childNodes[2].removeChild(a.node);
this.edges=this.edges.without(a)
}else{a.node=this.node.childNodes[0].childNodes[1].removeChild(a.node);
this.nodes=this.nodes.without(a)
}}else{a.node=this.node.removeChild(a.node)
}a.bounds.unregisterCallback(this._changedCallback)
}else{ORYX.Log.warn("remove: ORYX.Core.UIObject is not a child of this object.")
}},addShapeObjects:function(d,c){if(!d){return
}var b=function(f,i){try{var j=ORYX.Core.StencilSet.stencil(this.getStencil().namespace()+f.stencil.id);
var h=(j.type()=="node")?ORYX.Core.Node:ORYX.Core.Edge;
var g=new h({eventHandlerCallback:c},j);
g.resourceId=f.resourceId;
f.parent="#"+((f.parent&&f.parent.resourceId)||i.resourceId);
this.add(g);
return{json:f,object:g}
}catch(k){ORYX.Log.warn("LoadingContent: Stencil could not create.")
}}.bind(this);
var e=function(f){var g=[];
if(f.childShapes){f.childShapes.each(function(i){var h=b(i,f);
if(!(typeof h==="undefined")){g.push(h)
}g=g.concat(e(i))
})
}return g
}.bind(this);
var a=e({childShapes:d,resourceId:this.resourceId});
a.each(function(f){var g=[];
for(field in f.json.properties){g.push({prefix:"oryx",name:field,value:f.json.properties[field]})
}f.json.outgoing.each(function(i){g.push({prefix:"raziel",name:"outgoing",value:"#"+i.resourceId})
});
if(f.object instanceof ORYX.Core.Edge){var h=f.json.target||f.json.outgoing[0];
if(h){g.push({prefix:"raziel",name:"target",value:"#"+h.resourceId})
}}if(f.json.bounds){g.push({prefix:"oryx",name:"bounds",value:f.json.bounds.upperLeft.x+","+f.json.bounds.upperLeft.y+","+f.json.bounds.lowerRight.x+","+f.json.bounds.lowerRight.y})
}if(f.json.dockers){g.push({prefix:"oryx",name:"dockers",value:f.json.dockers.inject("",function(j,i){return j+i.x+" "+i.y+" "
})+" #"})
}g.push({prefix:"raziel",name:"parent",value:f.json.parent});
f.__properties=g
}.bind(this));
a.each(function(f){if(f.object instanceof ORYX.Core.Node){f.object.deserialize(f.__properties)
}});
a.each(function(f){if(f.object instanceof ORYX.Core.Edge){f.object.deserialize(f.__properties)
}});
return a.pluck("object")
},absoluteBounds:function(){return new ORYX.Core.Bounds(0,0,this.getHTMLContainer().parentNode.offsetWidth,this.getHTMLContainer().parentNode.offsetHeight)
},updateSize:function(){var b=0;
var a=0;
var c=100;
this.getChildShapes(true,function(e){var d=e.bounds;
b=Math.max(b,d.lowerRight().x+c);
a=Math.max(a,d.lowerRight().y+c)
});
if(this.bounds.width()<b||this.bounds.height()<a){this.setSize({width:Math.max(this.bounds.width(),b),height:Math.max(this.bounds.height(),a)})
}},getRootNode:function(){return this.rootNode
},getSvgContainer:function(){return this.node.childNodes[1]
},getHTMLContainer:function(){return this._htmlContainer
},getShapesWithSharedParent:function(a){if(!a||a.length<1){return[]
}if(a.length==1){return a
}return a.findAll(function(c){var b=c.parent;
while(b){if(a.member(b)){return false
}b=b.parent
}return true
})
},setSize:function(b,a){if(!b||!b.width||!b.height){return
}if(this.rootNode.parentNode){this.rootNode.parentNode.style.width=b.width+"px";
this.rootNode.parentNode.style.height=b.height+"px"
}this.rootNode.setAttributeNS(null,"width",b.width);
this.rootNode.setAttributeNS(null,"height",b.height);
if(!a){this.bounds.set({a:{x:0,y:0},b:{x:b.width/this.zoomLevel,y:b.height/this.zoomLevel}})
}},getSVGRepresentation:function(n,p){var i=this.getRootNode().cloneNode(true);
this._removeInvisibleElements(i);
var d,m,b,l;
try{var k=this.getRootNode().childNodes[1].getBBox();
d=k.x;
m=k.y;
b=k.x+k.width;
l=k.y+k.height
}catch(j){this.getChildShapes(true).each(function(q){var s=q.absoluteBounds();
var r=s.upperLeft();
var e=s.lowerRight();
if(d==undefined){d=r.x;
m=r.y;
b=e.x;
l=e.y
}else{d=Math.min(d,r.x);
m=Math.min(m,r.y);
b=Math.max(b,e.x);
l=Math.max(l,e.y)
}})
}var f=50;
var c,o,h,g;
if(d==undefined){c=0;
o=0;
h=0;
g=0
}else{c=b-d;
o=l-m;
h=-d+f/2;
g=-m+f/2
}i.setAttributeNS(null,"width",c+f);
i.setAttributeNS(null,"height",o+f);
i.childNodes[1].firstChild.setAttributeNS(null,"transform","translate("+h+", "+g+")");
i.childNodes[1].removeAttributeNS(null,"transform");
try{var a=i.childNodes[1].childNodes[1];
a.parentNode.removeChild(a)
}catch(j){}if(n){$A(i.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"tspan")).each(function(e){e.textContent=e.textContent.escapeHTML()
});
$A(i.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"text")).each(function(e){if(e.childNodes.length==0){e.textContent=e.textContent.escapeHTML()
}})
}if(p){$A(i.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"text")).each(function(e){e.setAttributeNS(null,"font-size","8")
})
}$A(i.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"image")).each(function(q){var e=q.getAttributeNS("http://www.w3.org/1999/xlink","href");
if(!e.match("^(http|https)://")&&e.indexOf("base64")==-1){e=window.location.protocol+"//"+window.location.host+e;
q.setAttributeNS("http://www.w3.org/1999/xlink","href",e)
}});
$A(i.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"a")).each(function(e){e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",(e.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").escapeHTML())
});
return i
},_removeInvisibleElements:function(b){var a=0;
while(a<b.childNodes.length){var c=b.childNodes[a];
if(c.getAttributeNS&&c.getAttributeNS(null,"visibility")==="hidden"){b.removeChild(c)
}else{this._removeInvisibleElements(c);
a++
}}},_delegateEvent:function(a){if(this.eventHandlerCallback&&(a.target==this.rootNode||a.target==this.rootNode.parentNode)){this.eventHandlerCallback(a,this)
}},toString:function(){return"Canvas "+this.id
},toJSON:function(){var a=arguments.callee.$.toJSON.apply(this,arguments);
a.stencilset={url:this.getStencil().stencilSet().source(),namespace:this.getStencil().stencilSet().namespace()};
return a
}});
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.UIEnableDrag=function(e,d,c){this.uiObj=d;
var f=d.bounds.upperLeft();
var b=d.node.getScreenCTM();
this.faktorXY={x:b.a,y:b.d};
this.scrollNode=d.node.ownerSVGElement.parentNode.parentNode;
this.offSetPosition={x:Event.pointerX(e)-(f.x*this.faktorXY.x),y:Event.pointerY(e)-(f.y*this.faktorXY.y)};
this.offsetScroll={x:this.scrollNode.scrollLeft,y:this.scrollNode.scrollTop};
this.dragCallback=ORYX.Core.UIDragCallback.bind(this);
this.disableCallback=ORYX.Core.UIDisableDrag.bind(this);
this.movedCallback=c?c.movedCallback:undefined;
this.upCallback=c?c.upCallback:undefined;
document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEUP,this.disableCallback,true);
document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE,this.dragCallback,false)
};
ORYX.Core.UIDragCallback=function(b){var a={x:Event.pointerX(b)-this.offSetPosition.x,y:Event.pointerY(b)-this.offSetPosition.y};
a.x-=this.offsetScroll.x-this.scrollNode.scrollLeft;
a.y-=this.offsetScroll.y-this.scrollNode.scrollTop;
a.x/=this.faktorXY.x;
a.y/=this.faktorXY.y;
this.uiObj.bounds.moveTo(a);
if(this.movedCallback){this.movedCallback(b)
}Event.stop(b)
};
ORYX.Core.UIDisableDrag=function(a){document.documentElement.removeEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE,this.dragCallback,false);
document.documentElement.removeEventListener(ORYX.CONFIG.EVENT_MOUSEUP,this.disableCallback,true);
if(this.upCallback){this.upCallback(a)
}this.upCallback=undefined;
this.movedCallback=undefined;
Event.stop(a)
};
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.Shape={construct:function(a,b){arguments.callee.$.construct.apply(this,arguments);
this.dockers=[];
this.magnets=[];
this._defaultMagnet;
this.incoming=[];
this.outgoing=[];
this.nodes=[];
this._dockerChangedCallback=this._dockerChanged.bind(this);
this._labels=new Hash();
this.node=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["g",{id:this.id},["g",{"class":"stencils"},["g",{"class":"me"}],["g",{"class":"children",style:"overflow:hidden"}],["g",{"class":"edge"}]],["g",{"class":"controls"},["g",{"class":"dockers"}],["g",{"class":"magnets"}]]])
},update:function(){},_update:function(){},refresh:function(){arguments.callee.$.refresh.apply(this,arguments);
if(this.node.ownerDocument){var a=this;
this.node.setAttributeNS(null,"bpmn2nodeid",this.resourceId);
this.propertiesChanged.each((function(b){if(b.value){var e=this.properties[b.key];
var d=this.getStencil().property(b.key);
this.propertiesChanged[b.key]=false;
if((d.type()==ORYX.CONFIG.TYPE_CHOICE)||(d.type()==ORYX.CONFIG.TYPE_DYNAMICCHOICE)){d.refToView().each((function(g){if(g!==""){var f=this._labels[this.id+g];
if(f){if(d.id()=="fontsize"){if(e&&d.item(e)){f.fontSize(d.item(e).value())
}}else{f.text(d.item(e).value())
}}}}).bind(this));
var c=new Hash();
d.items().each((function(f){f.refToView().each((function(g){if(g==""){this.propertiesChanged[b.key]=true;
return
}var h=this.node.ownerDocument.getElementById(this.id+g);
if(!h){this.propertiesChanged[b.key]=true;
return
}if(!c[h.id]||e==f.value()){h.setAttributeNS(null,"display",((e==f.value())?"inherit":"none"));
c[h.id]=h
}if(ORYX.Editor.checkClassType(h,SVGImageElement)){h.setAttributeNS("http://www.w3.org/1999/xlink","href",h.getAttributeNS("http://www.w3.org/1999/xlink","href"))
}}).bind(this))
}).bind(this))
}else{d.refToView().each((function(h){if(h===""){this.propertiesChanged[b.key]=true;
return
}var g=this.id+h;
var i=this.node.ownerDocument.getElementById(g);
if(!i||!(i.ownerSVGElement)){if(d.type()===ORYX.CONFIG.TYPE_URL||d.type()===ORYX.CONFIG.TYPE_DIAGRAM_LINK){var o=this.node.ownerDocument.getElementsByTagNameNS("http://www.w3.org/2000/svg","a");
i=$A(o).find(function(q){return q.getAttributeNS(null,"id")===g
});
if(!i){this.propertiesChanged[b.key]=true;
return
}}else{this.propertiesChanged[b.key]=true;
return
}}if(d.complexAttributeToView()){var m=this._labels[g];
if(m){try{propJson=e.evalJSON();
var p=propJson[d.complexAttributeToView()];
m.text(p?p:e)
}catch(j){m.text(e)
}}}else{switch(d.type()){case ORYX.CONFIG.TYPE_BOOLEAN:if(typeof e=="string"){e=e==="true"
}i.setAttributeNS(null,"display",(!(e===d.inverseBoolean()))?"inherit":"none");
break;
case ORYX.CONFIG.TYPE_COLOR:if(d.fill()){if(i.tagName.toLowerCase()==="stop"){i.setAttributeNS(null,"stop-color",e);
if(i.parentNode.tagName.toLowerCase()==="radialgradient"){ORYX.Utils.adjustGradient(i.parentNode,i)
}}else{i.setAttributeNS(null,"fill",e)
}}if(d.stroke()){i.setAttributeNS(null,"stroke",e);
if(i.tagName.toLowerCase()==="stop"){i.setAttributeNS(null,"stop-color",e);
if(i.parentNode.tagName.toLowerCase()==="radialgradient"){ORYX.Utils.adjustGradient(i.parentNode,i)
}}}break;
case ORYX.CONFIG.TYPE_STRING:var m=this._labels[g];
if(m){m.text(e)
}break;
case ORYX.CONFIG.TYPE_STRING:var m=this._labels[g];
if(m){m.text(e)
}break;
case ORYX.CONFIG.TYPE_TEXT:var m=this._labels[g];
if(m){m.text(e)
}break;
case ORYX.CONFIG.TYPE_FLOAT:if(d.fillOpacity()){i.setAttributeNS(null,"fill-opacity",e)
}if(d.strokeOpacity()){i.setAttributeNS(null,"stroke-opacity",e)
}if(!d.fillOpacity()&&!d.strokeOpacity()){var m=this._labels[g];
if(m){m.text(e)
}}break;
case ORYX.CONFIG.TYPE_URL:case ORYX.CONFIG.TYPE_CALLEDELEMENT:if(ORYX.READONLY==true){}else{var l=i.getAttributeNodeNS("","onclick");
if(l){if(e&&e.length>0){var n=ORYX.EDITOR.getSerializedJSON();
var k=jsonPath(n.evalJSON(),"$.properties.package");
Ext.Ajax.request({url:ORYX.PATH+"calledelement",method:"POST",success:function(q){try{if(q.responseText.length>0&&q.responseText!="false"){var s=q.responseText.split("|");
l.textContent='parent.designeropenintab("'+s[0]+'","'+s[1]+'");'
}else{l.textContent="ORYX.EDITOR._pluginFacade.raiseEvent({                                                                          type 		: ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,                                                                                    ntype		: 'error',                                                                                                                msg         : 'Unable to open called process.',                                                                                        title       : ''                                                                                                                   });"
}}catch(r){l.textContent="ORYX.EDITOR._pluginFacade.raiseEvent({                                                                          type 		: ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,                                                                                    ntype		: 'error',                                                                                                                msg         : 'Unable to open called process.',                                                                                        title       : ''                                                                                                                   });"
}}.bind(this),failure:function(){l.textContent="ORYX.EDITOR._pluginFacade.raiseEvent({                                                                          type 		: ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,                                                                                    ntype		: 'error',                                                                                                                msg         : 'Unable to find called process.',                                                                                        title       : ''                                                                                                                   });"
},params:{profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),ppackage:k,pid:e,action:"openprocessintab"}})
}else{l.textContent="ORYX.EDITOR._pluginFacade.raiseEvent({                                                                          type 		: ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,                                                                                    ntype		: 'error',                                                                                                                msg         : 'No Callable Element specified.',                                                                                        title       : ''                                                                                                                   });"
}}else{if(e&&e.length>0){var n=ORYX.EDITOR.getSerializedJSON();
var k=jsonPath(n.evalJSON(),"$.properties.package");
Ext.Ajax.request({url:ORYX.PATH+"calledelement",method:"POST",success:function(q){try{if(q.responseText.length>0&&q.responseText!="false"){var t=q.responseText.split("|");
var r='parent.designeropenintab("'+t[0]+'","'+t[1]+'");';
i.setAttributeNS("","onclick",r)
}else{var u="ORYX.EDITOR._pluginFacade.raiseEvent({                                                                          type 		: ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,                                                                                    ntype		: 'error',                                                                                                                msg         : 'Unable to open called process.',                                                                                        title       : ''                                                                                                                   });";
i.setAttributeNS("","onclick",u)
}}catch(s){var u="ORYX.EDITOR._pluginFacade.raiseEvent({                                                                          type 		: ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,                                                                                    ntype		: 'error',                                                                                                                msg         : 'Unable to open called process.',                                                                                        title       : ''                                                                                                                   });";
i.setAttributeNS("","onclick",u)
}}.bind(this),failure:function(){var q="ORYX.EDITOR._pluginFacade.raiseEvent({                                                                          type 		: ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,                                                                                    ntype		: 'error',                                                                                                                msg         : 'Unable to find called process.',                                                                                        title       : ''                                                                                                                   });";
i.setAttributeNS("","onclick",q)
},params:{profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),ppackage:k,pid:e,action:"openprocessintab"}})
}else{i.setAttributeNS("","onclick","Ext.Msg.alert('No Callable Element specified.');")
}}}break;
case ORYX.CONFIG.TYPE_DIAGRAM_LINK:var f=i.getAttributeNodeNS("http://www.w3.org/1999/xlink","xlink:onclick");
if(f){f.textContent=e
}else{i.setAttributeNS("http://www.w3.org/1999/xlink","xlink:onclick",e)
}break
}}}).bind(this))
}}}).bind(this));
this._labels.values().each(function(b){b.update()
})
}},layout:function(){var a=this.getStencil().layout();
if(this instanceof ORYX.Core.Node&&a){a.each(function(b){b.shape=this;
b.forceExecution=true;
this._delegateEvent(b)
}.bind(this))
}},getLabels:function(){return this._labels.values()
},getDockers:function(){return this.dockers
},getMagnets:function(){return this.magnets
},getDefaultMagnet:function(){if(this._defaultMagnet){return this._defaultMagnet
}else{if(this.magnets.length>0){return this.magnets[0]
}else{return undefined
}}},getParentShape:function(){return this.parent
},getIncomingShapes:function(a){if(a){this.incoming.each(a)
}return this.incoming
},getIncomingNodes:function(a){return this.incoming.select(function(b){var c=(b instanceof ORYX.Core.Node);
if(c&&a){a(b)
}return c
})
},getOutgoingShapes:function(a){if(a){this.outgoing.each(a)
}return this.outgoing
},getOutgoingNodes:function(a){return this.outgoing.select(function(b){var c=(b instanceof ORYX.Core.Node);
if(c&&a){a(b)
}return c
})
},getAllDockedShapes:function(b){var a=this.incoming.concat(this.outgoing);
if(b){a.each(b)
}return a
},getCanvas:function(){if(this.parent instanceof ORYX.Core.Canvas){return this.parent
}else{if(this.parent instanceof ORYX.Core.Shape){return this.parent.getCanvas()
}else{return undefined
}}},getChildNodes:function(b,c){if(!b&&!c){return this.nodes.clone()
}else{var a=[];
this.nodes.each(function(d){if(!d.isVisible){return
}if(c){c(d)
}a.push(d);
if(b&&d instanceof ORYX.Core.Shape){a=a.concat(d.getChildNodes(b,c))
}});
return a
}},add:function(b,c){if(b instanceof ORYX.Core.UIObject&&!(b instanceof ORYX.Core.Edge)){if(!(this.children.member(b))){if(b.parent){b.parent.remove(b)
}if(c!=undefined){this.children.splice(c,0,b)
}else{this.children.push(b)
}b.parent=this;
var d;
if(b instanceof ORYX.Core.Node){d=this.node.childNodes[0].childNodes[1];
this.nodes.push(b)
}else{if(b instanceof ORYX.Core.Controls.Control){var a=this.node.childNodes[1];
if(b instanceof ORYX.Core.Controls.Docker){d=a.childNodes[0];
if(this.dockers.length>=2){this.dockers.splice(c!==undefined?Math.min(c,this.dockers.length-1):this.dockers.length-1,0,b)
}else{this.dockers.push(b)
}}else{if(b instanceof ORYX.Core.Controls.Magnet){d=a.childNodes[1];
this.magnets.push(b)
}else{d=a
}}}else{d=this.node
}}if(c!=undefined&&c<d.childNodes.length){b.node=d.insertBefore(b.node,d.childNodes[c])
}else{b.node=d.appendChild(b.node)
}this._changed();
if(this.eventHandlerCallback){this.eventHandlerCallback({type:ORYX.CONFIG.EVENT_SHAPEADDED,shape:b})
}}else{ORYX.Log.warn("add: ORYX.Core.UIObject is already a child of this object.")
}}else{ORYX.Log.warn("add: Parameter is not of type ORYX.Core.UIObject.")
}},remove:function(a){if(this.children.member(a)){this.children=this.children.without(a);
a.parent=undefined;
if(a instanceof ORYX.Core.Shape){if(a instanceof ORYX.Core.Edge){a.removeMarkers();
a.node=this.node.childNodes[0].childNodes[2].removeChild(a.node)
}else{a.node=this.node.childNodes[0].childNodes[1].removeChild(a.node);
this.nodes=this.nodes.without(a)
}}else{if(a instanceof ORYX.Core.Controls.Control){if(a instanceof ORYX.Core.Controls.Docker){a.node=this.node.childNodes[1].childNodes[0].removeChild(a.node);
this.dockers=this.dockers.without(a)
}else{if(a instanceof ORYX.Core.Controls.Magnet){a.node=this.node.childNodes[1].childNodes[1].removeChild(a.node);
this.magnets=this.magnets.without(a)
}else{a.node=this.node.childNodes[1].removeChild(a.node)
}}}}this._changed()
}else{ORYX.Log.warn("remove: ORYX.Core.UIObject is not a child of this object.")
}},getIntersectionPoint:function(){var o,n,h,g;
switch(arguments.length){case 2:o=arguments[0].x;
n=arguments[0].y;
h=arguments[1].x;
g=arguments[1].y;
break;
case 4:o=arguments[0];
n=arguments[1];
h=arguments[2];
g=arguments[3];
break;
default:throw"getIntersectionPoints needs two or four arguments"
}var d,b,e,c;
var a=this.absoluteBounds();
if(this.isPointIncluded(o,n,a)){d=o;
b=n
}else{e=o;
c=n
}if(this.isPointIncluded(h,g,a)){d=h;
b=g
}else{e=h;
c=g
}if(!d||!b||!e||!c){return undefined
}var m=0;
var l=0;
var q,p;
var k=1;
var j=0;
while(true){var m=Math.min(d,e)+((Math.max(d,e)-Math.min(d,e))/2);
var l=Math.min(b,c)+((Math.max(b,c)-Math.min(b,c))/2);
if(this.isPointIncluded(m,l,a)){d=m;
b=l
}else{e=m;
c=l
}var f=Math.sqrt(Math.pow(d-e,2)+Math.pow(b-c,2));
q=d+((e-d)/f),p=b+((c-b)/f);
if(!this.isPointIncluded(q,p,a)){break
}}return{x:q,y:p}
},isPointIncluded:function(){return false
},isPointOverOffset:function(){return this.isPointIncluded.apply(this,arguments)
},_dockerChanged:function(){},createDocker:function(b,a){var c=new ORYX.Core.Controls.Docker({eventHandlerCallback:this.eventHandlerCallback});
c.bounds.registerCallback(this._dockerChangedCallback);
if(a){c.bounds.centerMoveTo(a)
}this.add(c,b);
return c
},serialize:function(){var a=arguments.callee.$.serialize.apply(this);
a.push({name:"bounds",prefix:"oryx",value:this.bounds.serializeForERDF(),type:"literal"});
this.getOutgoingShapes().each((function(b){a.push({name:"outgoing",prefix:"raziel",value:"#"+ERDF.__stripHashes(b.resourceId),type:"resource"})
}).bind(this));
a.push({name:"parent",prefix:"raziel",value:"#"+ERDF.__stripHashes(this.parent.resourceId),type:"resource"});
return a
},deserialize:function(c){arguments.callee.$.deserialize.apply(this,arguments);
var d=c.find(function(b){return(b.prefix+"-"+b.name)=="oryx-bounds"
});
if(d){var a=d.value.replace(/,/g," ").split(" ").without("");
if(this instanceof ORYX.Core.Edge){this.dockers.first().bounds.centerMoveTo(parseFloat(a[0]),parseFloat(a[1]));
this.dockers.last().bounds.centerMoveTo(parseFloat(a[2]),parseFloat(a[3]))
}else{this.bounds.set(parseFloat(a[0]),parseFloat(a[1]),parseFloat(a[2]),parseFloat(a[3]))
}}},_init:function(a){this._adjustIds(a,0)
},_adjustIds:function(c,e){if(c instanceof Element){var a=c.getAttributeNS(null,"id");
if(a&&a!==""){c.setAttributeNS(null,"id",this.id+a)
}else{c.setAttributeNS(null,"id",this.id+"_"+this.id+"_"+e);
e++
}var d=c.getAttributeNS(null,"fill");
if(d&&d.include("url(#")){d=d.replace(/url\(#/g,"url(#"+this.id);
c.setAttributeNS(null,"fill",d)
}if(c.hasChildNodes()){for(var b=0;
b<c.childNodes.length;
b++){e=this._adjustIds(c.childNodes[b],e)
}}}return e
},toString:function(){return"ORYX.Core.Shape "+this.getId()
}};
ORYX.Core.Shape=ORYX.Core.AbstractShape.extend(ORYX.Core.Shape);
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.Controls){ORYX.Core.Controls={}
}ORYX.Core.Controls.Control=ORYX.Core.UIObject.extend({toString:function(){return"Control "+this.id
}});
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.Controls){ORYX.Core.Controls={}
}ORYX.Core.Controls.Magnet=ORYX.Core.Controls.Control.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.anchorLeft;
this.anchorRight;
this.anchorTop;
this.anchorBottom;
this.bounds.set(0,0,16,16);
this.node=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["g",{"pointer-events":"all"},["circle",{cx:"8",cy:"8",r:"4",stroke:"none",fill:"red","fill-opacity":"0.3"}]]);
this.hide()
},update:function(){arguments.callee.$.update.apply(this,arguments)
},_update:function(){arguments.callee.$.update.apply(this,arguments)
},refresh:function(){arguments.callee.$.refresh.apply(this,arguments);
var a=this.bounds.upperLeft();
this.node.setAttributeNS(null,"transform","translate("+a.x+", "+a.y+")")
},show:function(){arguments.callee.$.show.apply(this,arguments)
},toString:function(){return"Magnet "+this.id
}});
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.Controls){ORYX.Core.Controls={}
}ORYX.Core.Controls.Docker=ORYX.Core.Controls.Control.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.isMovable=true;
this.bounds.set(0,0,16,16);
this.referencePoint=undefined;
this._dockedShapeBounds=undefined;
this._dockedShape=undefined;
this._oldRefPoint1=undefined;
this._oldRefPoint2=undefined;
this.anchorLeft;
this.anchorRight;
this.anchorTop;
this.anchorBottom;
this.node=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["g"]);
this._dockerNode=ORYX.Editor.graft("http://www.w3.org/2000/svg",this.node,["g",{"pointer-events":"all"},["circle",{cx:"8",cy:"8",r:"8",stroke:"none",fill:"none"}],["circle",{cx:"8",cy:"8",r:"3",stroke:"black",fill:"red","stroke-width":"1"}]]);
this._referencePointNode=ORYX.Editor.graft("http://www.w3.org/2000/svg",this.node,["g",{"pointer-events":"none"},["circle",{cx:this.bounds.upperLeft().x,cy:this.bounds.upperLeft().y,r:3,fill:"red","fill-opacity":0.4}]]);
this.hide();
this.addEventHandlers(this.node);
this._updateCallback=this._changed.bind(this)
},setMovable:function(a){this.isMovable=a
},update:function(){if(this._dockedShape){if(this._dockedShapeBounds&&this._dockedShape instanceof ORYX.Core.Node){var g=this._dockedShapeBounds.width();
var d=this._dockedShapeBounds.height();
if(!g){g=1
}if(!d){d=1
}var m=this._dockedShape.bounds.width()/g;
var k=this._dockedShape.bounds.height()/d;
if(m!==1||k!==1){this.referencePoint.x*=m;
this.referencePoint.y*=k
}this._dockedShapeBounds=this._dockedShape.bounds.clone()
}var b=this.parent.dockers.indexOf(this);
var f=this;
var e=this.parent.dockers.length>1?(b===0?this.parent.dockers[b+1]:this.parent.dockers[b-1]):undefined;
var l=f.getDockedShape()?f.getAbsoluteReferencePoint():f.bounds.center();
var i=e&&e.getDockedShape()?e.getAbsoluteReferencePoint():e?e.bounds.center():undefined;
if(!i){var a=this._dockedShape.absoluteCenterXY();
var j=this._dockedShape.bounds.width()*this._dockedShape.bounds.height();
i={x:l.x+(a.x-l.x)*-j,y:l.y+(a.y-l.y)*-j}
}var c=undefined;
c=this._dockedShape.getIntersectionPoint(l,i);
if(!c){c=this.getAbsoluteReferencePoint()
}if(this.parent&&this.parent.parent){var h=this.parent.parent.absoluteXY();
c.x-=h.x;
c.y-=h.y
}this.bounds.centerMoveTo(c);
this._oldRefPoint1=l;
this._oldRefPoint2=i
}arguments.callee.$.update.apply(this,arguments)
},refresh:function(){arguments.callee.$.refresh.apply(this,arguments);
var a=this.bounds.upperLeft();
this._dockerNode.setAttributeNS(null,"transform","translate("+a.x+", "+a.y+")");
a=Object.clone(this.referencePoint);
if(a&&this._dockedShape){var b;
if(this.parent instanceof ORYX.Core.Edge){b=this._dockedShape.absoluteXY()
}else{b=this._dockedShape.bounds.upperLeft()
}a.x+=b.x;
a.y+=b.y
}else{a=this.bounds.center()
}this._referencePointNode.setAttributeNS(null,"transform","translate("+a.x+", "+a.y+")")
},setReferencePoint:function(a){if(this.referencePoint!==a&&(!this.referencePoint||!a||this.referencePoint.x!==a.x||this.referencePoint.y!==a.y)){this.referencePoint=a;
this._changed()
}},getAbsoluteReferencePoint:function(){if(!this.referencePoint||!this._dockedShape){return undefined
}else{var a=this._dockedShape.absoluteXY();
return{x:this.referencePoint.x+a.x,y:this.referencePoint.y+a.y}
}},setDockedShape:function(b){if(this._dockedShape){this._dockedShape.bounds.unregisterCallback(this._updateCallback);
if(this===this.parent.dockers.first()){this.parent.incoming=this.parent.incoming.without(this._dockedShape);
this._dockedShape.outgoing=this._dockedShape.outgoing.without(this.parent)
}else{if(this===this.parent.dockers.last()){this.parent.outgoing=this.parent.outgoing.without(this._dockedShape);
this._dockedShape.incoming=this._dockedShape.incoming.without(this.parent)
}}}this._dockedShape=b;
this._dockedShapeBounds=undefined;
var a=undefined;
if(this._dockedShape){if(this===this.parent.dockers.first()){this.parent.incoming.push(b);
b.outgoing.push(this.parent)
}else{if(this===this.parent.dockers.last()){this.parent.outgoing.push(b);
b.incoming.push(this.parent)
}}var c=this.bounds;
var d=b.absoluteXY();
a={x:c.center().x-d.x,y:c.center().y-d.y};
this._dockedShapeBounds=this._dockedShape.bounds.clone();
this._dockedShape.bounds.registerCallback(this._updateCallback);
this.setDockerColor(ORYX.CONFIG.DOCKER_DOCKED_COLOR)
}else{this.setDockerColor(ORYX.CONFIG.DOCKER_UNDOCKED_COLOR)
}this.setReferencePoint(a);
this._changed()
},getDockedShape:function(){return this._dockedShape
},isDocked:function(){return !!this._dockedShape
},setDockerColor:function(a){this._dockerNode.lastChild.setAttributeNS(null,"fill",a)
},hide:function(){this.node.setAttributeNS(null,"visibility","hidden");
this.children.each(function(a){a.hide()
})
},show:function(){this.node.setAttributeNS(null,"visibility","visible");
this.children.each(function(a){a.show()
})
},toString:function(){return"Docker "+this.id
}});
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.Node={construct:function(a,b){arguments.callee.$.construct.apply(this,arguments);
this.isSelectable=true;
this.isMovable=true;
this._dockerUpdated=false;
this._oldBounds=new ORYX.Core.Bounds();
this._svgShapes=[];
this.minimumSize=undefined;
this.maximumSize=undefined;
this.isHorizontallyResizable=false;
this.isVerticallyResizable=false;
this.dataId=undefined;
this._init(this._stencil.view())
},setSelectable:function(a){this.isSelectable=a
},setMovable:function(a){this.isMovable=a
},_update:function(){this.dockers.invoke("update");
if(this.isChanged){var c=this.bounds;
var d=this._oldBounds;
if(this.isResized){var m=c.width()/d.width();
var l=c.height()/d.height();
this._svgShapes.each(function(u){if(u.isHorizontallyResizable){u.width=u.oldWidth*m
}if(u.isVerticallyResizable){u.height=u.oldHeight*l
}var t;
var q=u.anchorLeft;
var s=u.anchorRight;
if(s){t=d.width()-(u.oldX+u.oldWidth);
if(q){u.width=c.width()-u.x-t
}else{u.x=c.width()-(t+u.width)
}}else{if(!q){u.x=m*u.oldX;
if(!u.isHorizontallyResizable){u.x=u.x+u.width*m/2-u.width/2
}}}var p=u.anchorTop;
var r=u.anchorBottom;
if(r){t=d.height()-(u.oldY+u.oldHeight);
if(p){u.height=c.height()-u.y-t
}else{if(!u._isYLocked){u.y=c.height()-(t+u.height)
}}}else{if(!p){u.y=l*u.oldY;
if(!u.isVerticallyResizable){u.y=u.y+u.height*l/2-u.height/2
}}}});
var g={x:0,y:0};
if(!this.isHorizontallyResizable&&c.width()!==d.width()){g.x=d.width()-c.width()
}if(!this.isVerticallyResizable&&c.height()!==d.height()){g.y=d.height()-c.height()
}if(g.x!==0||g.y!==0){c.extend(g)
}g={x:0,y:0};
var e,i;
if(this.minimumSize){ORYX.Log.debug("Shape (%0)'s min size: (%1x%2)",this,this.minimumSize.width,this.minimumSize.height);
e=this.minimumSize.width-c.width();
if(e>0){g.x+=e
}i=this.minimumSize.height-c.height();
if(i>0){g.y+=i
}}if(this.maximumSize){ORYX.Log.debug("Shape (%0)'s max size: (%1x%2)",this,this.maximumSize.width,this.maximumSize.height);
e=c.width()-this.maximumSize.width;
if(e>0){g.x-=e
}i=c.height()-this.maximumSize.height;
if(i>0){g.y-=i
}}if(g.x!==0||g.y!==0){c.extend(g)
}var m=c.width()/d.width();
var l=c.height()/d.height();
var k,j,n,f,b,a,o;
this.magnets.each(function(p){k=p.anchorLeft;
j=p.anchorRight;
n=p.anchorTop;
f=p.anchorBottom;
b=p.bounds.center();
if(k){a=b.x
}else{if(j){a=c.width()-(d.width()-b.x)
}else{a=b.x*m
}}if(n){o=b.y
}else{if(f){o=c.height()-(d.height()-b.y)
}else{o=b.y*l
}}if(b.x!==a||b.y!==o){p.bounds.centerMoveTo(a,o)
}});
this.getLabels().each(function(p){k=p.anchorLeft;
j=p.anchorRight;
n=p.anchorTop;
f=p.anchorBottom;
if(k){}else{if(j){p.x=c.width()-(d.width()-p.oldX)
}else{p.x*=m
}}if(n){}else{if(f){p.y=c.height()-(d.height()-p.oldY)
}else{p.y*=l
}}});
var h=this.dockers[0];
if(h){h.bounds.unregisterCallback(this._dockerChangedCallback);
if(!this._dockerUpdated){h.bounds.centerMoveTo(this.bounds.center());
this._dockerUpdated=false
}h.update();
h.bounds.registerCallback(this._dockerChangedCallback)
}this.isResized=false
}this.refresh();
this.isChanged=false;
this._oldBounds=this.bounds.clone()
}this.children.each(function(p){if(!(p instanceof ORYX.Core.Controls.Docker)){p._update()
}});
if(this.dockers.length>0&&!this.dockers.first().getDockedShape()){this.dockers.each(function(p){p.bounds.centerMoveTo(this.bounds.center())
}.bind(this))
}},refresh:function(){arguments.callee.$.refresh.apply(this,arguments);
var a=this.bounds.upperLeft().x;
var b=this.bounds.upperLeft().y;
this.node.firstChild.setAttributeNS(null,"transform","translate("+a+", "+b+")");
this.node.childNodes[1].childNodes[1].setAttributeNS(null,"transform","translate("+a+", "+b+")");
this._svgShapes.each(function(c){c.update()
})
},_dockerChanged:function(){var a=this.dockers[0];
this.bounds.centerMoveTo(a.bounds.center());
this._dockerUpdated=true
},_initSVGShapes:function(c){var a=[];
try{var f=new ORYX.Core.SVG.SVGShape(c);
a.push(f)
}catch(d){}if(c.hasChildNodes()){for(var b=0;
b<c.childNodes.length;
b++){a=a.concat(this._initSVGShapes(c.childNodes[b]))
}}return a
},isPointIncluded:function(a,j,c){var h=c&&c instanceof ORYX.Core.Bounds?c:this.absoluteBounds();
if(!h.isIncluded(a,j)){return false
}else{}var e=h.upperLeft();
var g=a-e.x;
var f=j-e.y;
var d=0;
do{var b=this._svgShapes[d++].isPointIncluded(g,f)
}while(!b&&d<this._svgShapes.length);
return b
},isPointOverOffset:function(d,c){var b=arguments.callee.$.isPointOverOffset.apply(this,arguments);
if(b){var a=this.absoluteBounds();
a.widen(-ORYX.CONFIG.BORDER_OFFSET);
if(!a.isIncluded(d,c)){return true
}}return false
},serialize:function(){var a=arguments.callee.$.serialize.apply(this);
this.dockers.each((function(e){if(e.getDockedShape()){var d=e.referencePoint;
d=d?d:e.bounds.center();
a.push({name:"docker",prefix:"oryx",value:$H(d).values().join(","),type:"literal"})
}}).bind(this));
try{var b=this.getStencil().serialize();
if(b.type){b.shape=this;
b.data=a;
b.result=undefined;
b.forceExecution=true;
this._delegateEvent(b);
if(b.result){a=b.result
}}}catch(c){}return a
},deserialize:function(f){arguments.callee.$.deserialize.apply(this,[f]);
try{var a=this.getStencil().deserialize();
if(a.type){a.shape=this;
a.data=f;
a.result=undefined;
a.forceExecution=true;
this._delegateEvent(a);
if(a.result){f=a.result
}}}catch(g){}var b=f.findAll(function(e){return(e.prefix+"-"+e.name)=="raziel-outgoing"
});
b.each((function(h){if(!this.parent){return
}var e=this.getCanvas().getChildShapeByResourceId(h.value);
if(e){if(e instanceof ORYX.Core.Edge){e.dockers.first().setDockedShape(this);
e.dockers.first().setReferencePoint(e.dockers.first().bounds.center())
}else{if(e.dockers.length>0){e.dockers.first().setDockedShape(this)
}}}}).bind(this));
if(this.dockers.length===1){var d;
d=f.find(function(e){return(e.prefix+"-"+e.name==="oryx-dockers")
});
if(d){var c=d.value.replace(/,/g," ").split(" ").without("").without("#");
if(c.length===2&&this.dockers[0].getDockedShape()){this.dockers[0].setReferencePoint({x:parseFloat(c[0]),y:parseFloat(c[1])})
}else{this.dockers[0].bounds.centerMoveTo(parseFloat(c[0]),parseFloat(c[1]))
}}}},_init:function(m){arguments.callee.$._init.apply(this,arguments);
var n=m.getElementsByTagName("g")[0];
var s=m.ownerDocument.createAttributeNS(null,"id");
s.nodeValue=this.id;
n.setAttributeNode(s);
var b=this.node.childNodes[0].childNodes[0];
n=b.appendChild(n);
this.addEventHandlers(n);
var r=n.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"minimumSize");
if(r){r=r.replace("/,/g"," ");
var j=r.split(" ");
j=j.without("");
if(j.length>1){this.minimumSize={width:parseFloat(j[0]),height:parseFloat(j[1])}
}else{this.minimumSize={width:1,height:1}
}}var g=n.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"maximumSize");
if(g){g=g.replace("/,/g"," ");
var k=g.split(" ");
k=k.without("");
if(k.length>1){this.maximumSize={width:parseFloat(k[0]),height:parseFloat(k[1])}
}}if(this.minimumSize&&this.maximumSize&&(this.minimumSize.width>this.maximumSize.width||this.minimumSize.height>this.maximumSize.height)){throw this+": Minimum Size must be greater than maxiumSize."
}this._svgShapes=this._initSVGShapes(n);
var a={x:undefined,y:undefined};
var d={x:undefined,y:undefined};
var w=this;
this._svgShapes.each(function(i){a.x=(a.x!==undefined)?Math.min(a.x,i.x):i.x;
a.y=(a.y!==undefined)?Math.min(a.y,i.y):i.y;
d.x=(d.x!==undefined)?Math.max(d.x,i.x+i.width):i.x+i.width;
d.y=(d.y!==undefined)?Math.max(d.y,i.y+i.height):i.y+i.height;
if(i.isHorizontallyResizable){w.isHorizontallyResizable=true;
w.isResizable=true
}if(i.isVerticallyResizable){w.isVerticallyResizable=true;
w.isResizable=true
}if(i.anchorTop&&i.anchorBottom){w.isVerticallyResizable=true;
w.isResizable=true
}if(i.anchorLeft&&i.anchorRight){w.isHorizontallyResizable=true;
w.isResizable=true
}});
this._svgShapes.each(function(i){i.x-=a.x;
i.y-=a.y;
i.update()
});
var v=a.x;
var u=a.y;
d.x-=v;
d.y-=u;
a.x=0;
a.y=0;
if(d.x===0){d.x=1
}if(d.y===0){d.y=1
}this._oldBounds.set(a,d);
this.bounds.set(a,d);
var f=m.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_ORYX,"magnets");
if(f&&f.length>0){f=$A(f[0].getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_ORYX,"magnet"));
var w=this;
f.each(function(y){var C=new ORYX.Core.Controls.Magnet({eventHandlerCallback:w.eventHandlerCallback});
var x=parseFloat(y.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"cx"));
var D=parseFloat(y.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"cy"));
C.bounds.centerMoveTo({x:x-v,y:D-u});
var B=y.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"anchors");
if(B){B=B.replace("/,/g"," ");
B=B.split(" ").without("");
for(var z=0;
z<B.length;
z++){switch(B[z].toLowerCase()){case"left":C.anchorLeft=true;
break;
case"right":C.anchorRight=true;
break;
case"top":C.anchorTop=true;
break;
case"bottom":C.anchorBottom=true;
break
}}}w.add(C);
if(!this._defaultMagnet){var A=y.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"default");
if(A&&A.toLowerCase()==="yes"){w._defaultMagnet=C
}}})
}else{var h=new ORYX.Core.Controls.Magnet();
h.bounds.centerMoveTo(this.bounds.width()/2,this.bounds.height()/2);
this.add(h)
}var q=m.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_ORYX,"docker");
if(q&&q.length>0){q=q[0];
var p=this.createDocker();
var e=parseFloat(q.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"cx"));
var c=parseFloat(q.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"cy"));
p.bounds.centerMoveTo({x:e-v,y:c-u});
var o=q.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"anchors");
if(o){o=o.replace("/,/g"," ");
o=o.split(" ").without("");
for(var t=0;
t<o.length;
t++){switch(o[t].toLowerCase()){case"left":p.anchorLeft=true;
break;
case"right":p.anchorRight=true;
break;
case"top":p.anchorTop=true;
break;
case"bottom":p.anchorBottom=true;
break
}}}}var l=n.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"text");
$A(l).each((function(x){var i=new ORYX.Core.SVG.Label({textElement:x,shapeId:this.id});
i.x-=v;
i.y-=u;
this._labels[i.id]=i
}).bind(this))
},createDocker:function(){var a=new ORYX.Core.Controls.Docker({eventHandlerCallback:this.eventHandlerCallback});
a.bounds.registerCallback(this._dockerChangedCallback);
this.dockers.push(a);
a.parent=this;
a.bounds.registerCallback(this._changedCallback);
return a
},toString:function(){return this._stencil.title()+" "+this.id
}};
ORYX.Core.Node=ORYX.Core.Shape.extend(ORYX.Core.Node);
NAMESPACE_SVG="http://www.w3.org/2000/svg";
NAMESPACE_ORYX="http://www.b3mn.org/oryx";
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.Edge={construct:function(a,c){arguments.callee.$.construct.apply(this,arguments);
this.isMovable=true;
this.isSelectable=true;
this._dockerUpdated=false;
this._markers=new Hash();
this._paths=[];
this._interactionPaths=[];
this._dockersByPath=new Hash();
this._markersByPath=new Hash();
this.attachedNodePositionData=new Hash();
var b=this.node.childNodes[0].childNodes[0];
b=ORYX.Editor.graft("http://www.w3.org/2000/svg",b,["g",{"pointer-events":"painted",bpmn2nodeid:this.resourceId}]);
this.addEventHandlers(b);
this._oldBounds=this.bounds.clone();
this._init(this._stencil.view());
if(c instanceof Array){this.deserialize(c)
}},setSelectable:function(a){this.isSelectable=a
},setMovable:function(a){this.isMovable=a
},getIsSelectable:function(){return this.isSelectable
},_update:function(c){if(this._dockerUpdated||this.isChanged||c){this.dockers.invoke("update");
if(this.bounds.width()===0||this.bounds.height()===0){this.bounds.moveBy({x:this.bounds.width()===0?-1:0,y:this.bounds.height()===0?-1:0});
this.bounds.extend({x:this.bounds.width()===0?2:0,y:this.bounds.height()===0?2:0})
}var d=this.bounds.upperLeft();
var l=this._oldBounds.upperLeft();
var e=this._oldBounds.width()===0?this.bounds.width():this._oldBounds.width();
var m=this._oldBounds.height()===0?this.bounds.height():this._oldBounds.height();
var k=d.x-l.x;
var h=d.y-l.y;
var n=this.bounds.width()/e;
var f=this.bounds.height()/m;
this.dockers.each((function(b){b.bounds.unregisterCallback(this._dockerChangedCallback);
if(!this._dockerUpdated){b.bounds.moveBy(k,h);
if(n!==1||f!==1){var o=b.bounds.upperLeft().x-d.x;
var a=b.bounds.upperLeft().y-d.y;
b.bounds.moveTo(d.x+o*n,d.y+a*f)
}}b.update();
b.bounds.registerCallback(this._dockerChangedCallback)
}).bind(this));
if(this._dockerUpdated){var j=this.dockers.first().bounds.center();
var g=this.dockers.first().bounds.center();
this.dockers.each((function(b){var a=b.bounds.center();
j.x=Math.min(j.x,a.x);
j.y=Math.min(j.y,a.y);
g.x=Math.max(g.x,a.x);
g.y=Math.max(g.y,a.y)
}).bind(this));
this.bounds.set(Object.clone(j),Object.clone(g))
}this.getLabels().each(function(o){switch(o.edgePosition){case"freeMoved":o.x=o.x;
o.y=o.y;
break;
case"starttop":var s=this._getAngle(this.dockers[0],this.dockers[1]);
var t=this.dockers.first().bounds.center();
if(s<=90||s>270){o.horizontalAlign("left");
o.verticalAlign("bottom");
o.x=t.x+o.getOffsetTop();
o.y=t.y-o.getOffsetTop();
o.rotate(360-s,t)
}else{o.horizontalAlign("right");
o.verticalAlign("bottom");
o.x=t.x-o.getOffsetTop();
o.y=t.y-o.getOffsetTop();
o.rotate(180-s,t)
}break;
case"startbottom":var s=this._getAngle(this.dockers[0],this.dockers[1]);
var t=this.dockers.first().bounds.center();
if(s<=90||s>270){o.horizontalAlign("left");
o.verticalAlign("top");
o.x=t.x+o.getOffsetBottom();
o.y=t.y+o.getOffsetBottom();
o.rotate(360-s,t)
}else{o.horizontalAlign("right");
o.verticalAlign("top");
o.x=t.x-o.getOffsetBottom();
o.y=t.y+o.getOffsetBottom();
o.rotate(180-s,t)
}break;
case"midtop":var a=this.dockers.length;
if(a%2==0){var s=this._getAngle(this.dockers[a/2-1],this.dockers[a/2]);
var q=this.dockers[a/2-1].bounds.center();
var p=this.dockers[a/2].bounds.center();
var t={x:(q.x+p.x)/2,y:(q.y+p.y)/2};
o.horizontalAlign("center");
o.verticalAlign("bottom");
o.x=t.x;
o.y=t.y-o.getOffsetTop();
if(s<=90||s>270){o.rotate(360-s,t)
}else{o.rotate(180-s,t)
}}else{var b=parseInt(a/2);
var s=this._getAngle(this.dockers[b],this.dockers[b+1]);
var t=this.dockers[b].bounds.center();
if(s<=90||s>270){o.horizontalAlign("left");
o.verticalAlign("bottom");
o.x=t.x+o.getOffsetTop();
o.y=t.y-o.getOffsetTop();
o.rotate(360-s,t)
}else{o.horizontalAlign("right");
o.verticalAlign("bottom");
o.x=t.x-o.getOffsetTop();
o.y=t.y-o.getOffsetTop();
o.rotate(180-s,t)
}}break;
case"midbottom":var a=this.dockers.length;
if(a%2==0){var s=this._getAngle(this.dockers[a/2-1],this.dockers[a/2]);
var q=this.dockers[a/2-1].bounds.center();
var p=this.dockers[a/2].bounds.center();
var t={x:(q.x+p.x)/2,y:(q.y+p.y)/2};
o.horizontalAlign("center");
o.verticalAlign("top");
o.x=t.x;
o.y=t.y+o.getOffsetTop();
if(s<=90||s>270){o.rotate(360-s,t)
}else{o.rotate(180-s,t)
}}else{var b=parseInt(a/2);
var s=this._getAngle(this.dockers[b],this.dockers[b+1]);
var t=this.dockers[b].bounds.center();
if(s<=90||s>270){o.horizontalAlign("left");
o.verticalAlign("top");
o.x=t.x+o.getOffsetBottom();
o.y=t.y+o.getOffsetBottom();
o.rotate(360-s,t)
}else{o.horizontalAlign("right");
o.verticalAlign("top");
o.x=t.x-o.getOffsetBottom();
o.y=t.y+o.getOffsetBottom();
o.rotate(180-s,t)
}}break;
case"endtop":var r=this.dockers.length;
var s=this._getAngle(this.dockers[r-2],this.dockers[r-1]);
var t=this.dockers.last().bounds.center();
if(s<=90||s>270){o.horizontalAlign("right");
o.verticalAlign("bottom");
o.x=t.x-o.getOffsetTop();
o.y=t.y-o.getOffsetTop();
o.rotate(360-s,t)
}else{o.horizontalAlign("left");
o.verticalAlign("bottom");
o.x=t.x+o.getOffsetTop();
o.y=t.y-o.getOffsetTop();
o.rotate(180-s,t)
}break;
case"endbottom":var r=this.dockers.length;
var s=this._getAngle(this.dockers[r-2],this.dockers[r-1]);
var t=this.dockers.last().bounds.center();
if(s<=90||s>270){o.horizontalAlign("right");
o.verticalAlign("top");
o.x=t.x-o.getOffsetBottom();
o.y=t.y+o.getOffsetBottom();
o.rotate(360-s,t)
}else{o.horizontalAlign("left");
o.verticalAlign("top");
o.x=t.x+o.getOffsetBottom();
o.y=t.y+o.getOffsetBottom();
o.rotate(180-s,t)
}break
}}.bind(this));
this.children.each(function(a){if(a instanceof ORYX.Core.Node){this.calculatePositionOfAttachedChildNode.call(this,a)
}}.bind(this));
this.refreshAttachedNodes();
this.refresh();
this.isChanged=false;
this._dockerUpdated=false;
this._oldBounds=this.bounds.clone()
}},movePointToUpperLeftOfNode:function(a,b){a.x-=b.width()/2;
a.y-=b.height()/2
},refreshAttachedNodes:function(){this.attachedNodePositionData.values().each(function(a){var d=a.segment.docker1.bounds.center();
var b=a.segment.docker2.bounds.center();
this.relativizePoint(d);
this.relativizePoint(b);
var c=new Object();
c.x=d.x+a.relativDistanceFromDocker1*(b.x-d.x);
c.y=d.y+a.relativDistanceFromDocker1*(b.y-d.y);
this.movePointToUpperLeftOfNode(c,a.node.bounds);
a.node.bounds.moveTo(c);
a.node._update()
}.bind(this))
},calculatePositionOfAttachedChildNode:function(b){var a=new Object();
a.x=0;
a.y=0;
if(!this.attachedNodePositionData[b.getId()]){this.attachedNodePositionData[b.getId()]=new Object();
this.attachedNodePositionData[b.getId()].relativDistanceFromDocker1=0;
this.attachedNodePositionData[b.getId()].node=b;
this.attachedNodePositionData[b.getId()].segment=new Object();
this.findEdgeSegmentForNode(b)
}else{if(b.isChanged){this.findEdgeSegmentForNode(b)
}}},findEdgeSegmentForNode:function(c){var b=this.dockers.length;
var a=undefined;
for(i=1;
i<b;
i++){var g=this.dockers[i-1].bounds.center();
var e=this.dockers[i].bounds.center();
this.relativizePoint(g);
this.relativizePoint(e);
var d=c.bounds.center();
var f=ORYX.Core.Math.distancePointLinie(g,e,d,true);
if((f||f==0)&&((!a&&a!=0)||f<a)){a=f;
this.attachedNodePositionData[c.getId()].segment.docker1=this.dockers[i-1];
this.attachedNodePositionData[c.getId()].segment.docker2=this.dockers[i]
}if(!f&&!a&&a!=0){(ORYX.Core.Math.getDistancePointToPoint(d,g)<ORYX.Core.Math.getDistancePointToPoint(d,e))?this.attachedNodePositionData[c.getId()].relativDistanceFromDocker1=0:this.attachedNodePositionData[c.getId()].relativDistanceFromDocker1=1;
this.attachedNodePositionData[c.getId()].segment.docker1=this.dockers[i-1];
this.attachedNodePositionData[c.getId()].segment.docker2=this.dockers[i]
}}if(a||a==0){this.attachedNodePositionData[c.getId()].relativDistanceFromDocker1=this.getLineParameterForPosition(this.attachedNodePositionData[c.getId()].segment.docker1,this.attachedNodePositionData[c.getId()].segment.docker2,c)
}},getLineParameterForPosition:function(b,g,d){var f=b.bounds.center();
var e=g.bounds.center();
this.relativizePoint(f);
this.relativizePoint(e);
var c=ORYX.Core.Math.getPointOfIntersectionPointLine(f,e,d.bounds.center(),true);
if(!c){return 0
}var a=ORYX.Core.Math.getDistancePointToPoint(c,f)/ORYX.Core.Math.getDistancePointToPoint(f,e);
return a
},relativizePoint:function(a){a.x-=this.bounds.upperLeft().x;
a.y-=this.bounds.upperLeft().y
},refresh:function(){arguments.callee.$.refresh.apply(this,arguments);
var b;
this._paths.each((function(h,f){var e=this._dockersByPath[h.id];
var k=undefined;
var j=undefined;
if(b){j="M"+b.x+" "+b.y
}else{k=e[0].bounds.center();
b=k;
j="M"+k.x+" "+k.y
}for(var g=1;
g<e.length;
g++){k=e[g].bounds.center();
j=j+"L"+k.x+" "+k.y+" ";
b=k
}h.setAttributeNS(null,"d",j);
this._interactionPaths[f].setAttributeNS(null,"d",j)
}).bind(this));
if(this.getChildNodes().length>0){var a=this.bounds.upperLeft().x;
var c=this.bounds.upperLeft().y;
this.node.firstChild.childNodes[1].setAttributeNS(null,"transform","translate("+a+", "+c+")")
}},getIntersectionPoint:function(){var a=Math.floor(this.dockers.length/2);
return ORYX.Core.Math.midPoint(this.dockers[a-1].bounds.center(),this.dockers[a].bounds.center())
},isPointIncluded:function(g,f){var a=this.absoluteBounds().isIncluded(g,f,ORYX.CONFIG.OFFSET_EDGE_BOUNDS);
var e=undefined;
if(a&&this.dockers.length>0){var c=0;
var d,b;
do{d=this.dockers[c].bounds.center();
b=this.dockers[++c].bounds.center();
e=ORYX.Core.Math.isPointInLine(g,f,d.x,d.y,b.x,b.y,ORYX.CONFIG.OFFSET_EDGE_BOUNDS)
}while(!e&&c<this.dockers.length-1)
}return e
},isPointOverOffset:function(){return false
},_getAngle:function(a,e){var d=a.absoluteCenterXY();
var b=e.absoluteCenterXY();
if(d.x==b.x&&d.y==b.y){return 0
}var c=Math.asin(Math.sqrt(Math.pow(d.y-b.y,2))/(Math.sqrt(Math.pow(b.x-d.x,2)+Math.pow(d.y-b.y,2))))*180/Math.PI;
if(b.x>=d.x&&b.y<=d.y){return c
}else{if(b.x<d.x&&b.y<=d.y){return 180-c
}else{if(b.x<d.x&&b.y>d.y){return 180+c
}else{return 360-c
}}}},alignDockers:function(){this._update(true);
var e=this.dockers.first().bounds.center();
var d=this.dockers.last().bounds.center();
var c=d.x-e.x;
var a=d.y-e.y;
var b=this.dockers.length-1;
this.dockers.each((function(h,g){var f=g/b;
h.bounds.unregisterCallback(this._dockerChangedCallback);
h.bounds.moveTo(e.x+f*c,e.y+f*a);
h.bounds.registerCallback(this._dockerChangedCallback)
}).bind(this));
this._dockerChanged()
},add:function(a){arguments.callee.$.add.apply(this,arguments);
if(a instanceof ORYX.Core.Controls.Docker&&this.dockers.include(a)){var b=this._dockersByPath.values()[0];
if(b){b.splice(this.dockers.indexOf(a),0,a)
}this.handleChildShapesAfterAddDocker(a)
}},handleChildShapesAfterAddDocker:function(f){if(!f instanceof ORYX.Core.Controls.Docker){return undefined
}var d=this.dockers.indexOf(f);
if(!(0<d&&d<this.dockers.length-1)){return undefined
}var e=this.dockers[d-1];
var b=this.dockers[d+1];
var c=this.getAttachedNodePositionDataForSegment(e,b);
var a=ORYX.Core.Math.getDistancePointToPoint(e.bounds.center(),f.bounds.center());
var h=ORYX.Core.Math.getDistancePointToPoint(b.bounds.center(),f.bounds.center());
if(!(a+h)){return
}var g=a/(a+h);
c.each(function(l){if(l.value.relativDistanceFromDocker1<g){l.value.segment.docker2=f;
l.value.relativDistanceFromDocker1=l.value.relativDistanceFromDocker1/g
}else{l.value.segment.docker1=f;
var k=1-g;
var j=l.value.relativDistanceFromDocker1-g;
l.value.relativDistanceFromDocker1=j/k
}});
this.refreshAttachedNodes()
},getAttachedNodePositionDataForSegment:function(c,a){if(!((c instanceof ORYX.Core.Controls.Docker)&&(a instanceof ORYX.Core.Controls.Docker))){return[]
}var b=this.attachedNodePositionData.findAll(function(d){return d.value.segment.docker1===c&&d.value.segment.docker2===a
});
if(!b){return[]
}return b
},remove:function(a){arguments.callee.$.remove.apply(this,arguments);
if(this.attachedNodePositionData[a.getId()]){delete this.attachedNodePositionData[a.getId()]
}if(a instanceof ORYX.Core.Controls.Docker){this.handleChildShapesAfterRemoveDocker(a)
}},handleChildShapesAfterRemoveDocker:function(a){if(!(a instanceof ORYX.Core.Controls.Docker)){return
}this.attachedNodePositionData.each(function(c){if(c.value.segment.docker1===a){var b=this.dockers.indexOf(c.value.segment.docker2);
if(b==-1){return
}c.value.segment.docker1=this.dockers[b-1]
}else{if(c.value.segment.docker2===a){var b=this.dockers.indexOf(c.value.segment.docker1);
if(b==-1){return
}c.value.segment.docker2=this.dockers[b+1]
}}}.bind(this));
this.refreshAttachedNodes()
},addDocker:function(b,d){var c;
var a;
this._dockersByPath.any((function(e){return e.value.any((function(j,f){if(!c){c=j;
return false
}else{var h=c.bounds.center();
var g=j.bounds.center();
if(ORYX.Core.Math.isPointInLine(b.x,b.y,h.x,h.y,g.x,g.y,10)){var l=this._paths.find(function(n){return n.id===e.key
});
if(l){var m=l.getAttributeNS(NAMESPACE_ORYX,"allowDockers");
if(m&&m.toLowerCase()==="no"){return true
}}var k=(d)?d:this.createDocker(this.dockers.indexOf(c)+1,b);
k.bounds.centerMoveTo(b);
if(d){this.add(k,this.dockers.indexOf(c)+1)
}a=k;
return true
}else{c=j;
return false
}}}).bind(this))
}).bind(this));
return a
},removeDocker:function(a){if(this.dockers.length>2&&!(this.dockers.first()===a)){this._dockersByPath.any((function(b){if(b.value.member(a)){if(a===b.value.last()){return true
}else{this.remove(a);
this._dockersByPath[b.key]=b.value.without(a);
this.isChanged=true;
this._dockerChanged();
return true
}}return false
}).bind(this))
}},removeUnusedDockers:function(){var a=$H({});
this.dockers.each(function(e,b){if(b==0||b==this.dockers.length-1){return
}var d=this.dockers[b-1];
if(a.values().indexOf(d)!=-1&&this.dockers[b-2]){d=this.dockers[b-2]
}var c=this.dockers[b+1];
var f=d.getDockedShape()&&d.referencePoint?d.getAbsoluteReferencePoint():d.bounds.center();
var h=c.getDockedShape()&&c.referencePoint?c.getAbsoluteReferencePoint():c.bounds.center();
var g=e.bounds.center();
if(ORYX.Core.Math.isPointInLine(g.x,g.y,f.x,f.y,h.x,h.y,1)){a[b]=e
}}.bind(this));
a.each(function(b){this.removeDocker(b.value)
}.bind(this));
if(a.values().length>0){this._update(true)
}return a
},_init:function(e){arguments.callee.$._init.apply(this,arguments);
var d,b,p,n;
var h=e.getElementsByTagNameNS(NAMESPACE_SVG,"defs");
if(h.length>0){h=h[0];
var c=$A(h.getElementsByTagNameNS(NAMESPACE_SVG,"marker"));
var j;
var m=this;
c.each(function(q){try{j=new ORYX.Core.SVG.SVGMarker(q.cloneNode(true));
m._markers[j.id]=j;
var r=$A(j.element.getElementsByTagNameNS(NAMESPACE_SVG,"text"));
var g;
r.each(function(t){g=new ORYX.Core.SVG.Label({textElement:t,shapeId:this.id});
m._labels[g.id]=g
})
}catch(s){}})
}var a=e.getElementsByTagNameNS(NAMESPACE_SVG,"g");
if(a.length<=0){throw"Edge: No g element found."
}var k=a[0];
k.setAttributeNS(null,"id",null);
var f=true;
$A(k.childNodes).each((function(D,v){if(ORYX.Editor.checkClassType(D,SVGPathElement)){D=D.cloneNode(false);
var u=this.id+"_"+v;
D.setAttributeNS(null,"id",u);
this._paths.push(D);
var z=[];
var E=D.getAttributeNS(null,"marker-start");
if(E&&E!==""){if(E=='url("#start")'){E="url(#start)"
}E=E.strip();
E=E.replace(/^url\(#/,"");
var t=this.id.concat(E.replace(/\)$/,""));
D.setAttributeNS(null,"marker-start","url(#"+t+")");
z.push(this._markers[t])
}E=D.getAttributeNS(null,"marker-mid");
if(E&&E!==""){if(E=='url("#mid")'){E="url(#mid)"
}E=E.strip();
E=E.replace(/^url\(#/,"");
var q=this.id.concat(E.replace(/\)$/,""));
D.setAttributeNS(null,"marker-mid","url(#"+q+")");
z.push(this._markers[q])
}E=D.getAttributeNS(null,"marker-end");
if(E&&E!==""){if(E=='url("#end")'){E="url(#end)"
}E=E.strip();
E=E.replace(/^url\(#/,"");
var w=this.id.concat(E.replace(/\)$/,""));
D.setAttributeNS(null,"marker-end","url(#"+w+")");
z.push(this._markers[w])
}this._markersByPath[u]=z;
var g=new PathParser();
var C=new ORYX.Core.SVG.PointsPathHandler();
g.setHandler(C);
g.parsePath(D);
if(C.points.length<4){throw"Edge: Path has to have two or more points specified."
}this._dockersByPath[u]=[];
for(var s=0;
s<C.points.length;
s+=2){var B=C.points[s];
var A=C.points[s+1];
if(f||s>0){var r=new ORYX.Core.Controls.Docker({eventHandlerCallback:this.eventHandlerCallback});
r.bounds.centerMoveTo(B,A);
r.bounds.registerCallback(this._dockerChangedCallback);
this.add(r,this.dockers.length);
if(d){d=Math.min(B,d);
b=Math.min(A,b)
}else{d=B;
b=A
}if(p){p=Math.max(B,p);
n=Math.max(A,n)
}else{p=B;
n=A
}}}f=false
}}).bind(this));
this.bounds.set(d,b,p,n);
if(this.bounds.width()===0||this.bounds.height()===0){this.bounds.extend({x:this.bounds.width()===0?2:0,y:this.bounds.height()===0?2:0});
this.bounds.moveBy({x:this.bounds.width()===0?-1:0,y:this.bounds.height()===0?-1:0})
}this._oldBounds=this.bounds.clone();
this._paths.reverse();
var o=[];
this._paths.each((function(g){o.push(this.node.childNodes[0].childNodes[0].childNodes[0].appendChild(g))
}).bind(this));
this._paths=o;
this._paths.each((function(q){var g=q.cloneNode(false);
g.setAttributeNS(null,"id",undefined);
g.setAttributeNS(null,"stroke-width",10);
g.setAttributeNS(null,"visibility","hidden");
g.setAttributeNS(null,"stroke-dasharray","none");
g.setAttributeNS(null,"stroke","black");
g.setAttributeNS(null,"fill","none");
this._interactionPaths.push(this.node.childNodes[0].childNodes[0].childNodes[0].appendChild(g))
}).bind(this));
this._paths.reverse();
this._interactionPaths.reverse();
var l=e.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"text");
$A(l).each((function(q){var g=new ORYX.Core.SVG.Label({textElement:q,shapeId:this.id});
this.node.childNodes[0].childNodes[0].appendChild(g.node);
this._labels[g.id]=g
}).bind(this));
this.propertiesChanged.each(function(g){g.value=true
})
},addMarkers:function(a){this._markers.each(function(b){if(!a.ownerDocument.getElementById(b.value.id)){b.value.element=a.appendChild(b.value.element)
}})
},removeMarkers:function(){var b=this.node.ownerSVGElement;
if(b){var a=b.getElementsByTagNameNS(NAMESPACE_SVG,"defs");
if(a.length>0){a=a[0];
this._markers.each(function(c){var d=a.ownerDocument.getElementById(c.value.id);
if(d){c.value.element=a.removeChild(c.value.element)
}})
}}},_dockerChanged:function(){this._dockerUpdated=true
},serialize:function(){var a=arguments.callee.$.serialize.apply(this);
var d="";
this._dockersByPath.each((function(e){e.value.each(function(j){var h=j.getDockedShape()&&j.referencePoint?j.referencePoint:j.bounds.center();
d=d.concat(h.x+" "+h.y+" ")
});
d+=" # "
}).bind(this));
a.push({name:"dockers",prefix:"oryx",value:d,type:"literal"});
var b=this.dockers.last();
var g=b.getDockedShape();
if(g){a.push({name:"target",prefix:"raziel",value:"#"+ERDF.__stripHashes(g.resourceId),type:"resource"})
}try{var c=this.getStencil().serialize();
if(c.type){c.shape=this;
c.data=a;
c.result=undefined;
c.forceExecution=true;
this._delegateEvent(c);
if(c.result){a=c.result
}}}catch(f){}return a
},deserialize:function(f){try{var c=this.getStencil().deserialize();
if(c.type){c.shape=this;
c.data=f;
c.result=undefined;
c.forceExecution=true;
this._delegateEvent(c);
if(c.result){f=c.result
}}}catch(h){}var g=f.find(function(e){return(e.prefix+"-"+e.name)=="raziel-target"
});
var a;
if(g){a=this.getCanvas().getChildShapeByResourceId(g.value)
}var d=f.findAll(function(e){return(e.prefix+"-"+e.name)=="raziel-outgoing"
});
d.each((function(k){if(!this.parent){return
}var e=this.getCanvas().getChildShapeByResourceId(k.value);
if(e){if(e==a){this.dockers.last().setDockedShape(e);
this.dockers.last().setReferencePoint({x:e.bounds.width()/2,y:e.bounds.height()/2})
}else{if(e instanceof ORYX.Core.Edge){e.dockers.first().setDockedShape(this)
}}}}).bind(this));
arguments.callee.$.deserialize.apply(this,[f]);
var b=f.find(function(e){return(e.prefix==="oryx"&&e.name==="dockers")
});
if(b){var j=b.value.split("#").without("").without(" ");
j.each((function(k,n){var q=k.replace(/,/g," ").split(" ").without("");
if(q.length%2===0){var r=this._paths[n];
if(r){if(n===0){while(this._dockersByPath[r.id].length>2){this.removeDocker(this._dockersByPath[r.id][1])
}}else{while(this._dockersByPath[r.id].length>1){this.removeDocker(this._dockersByPath[r.id][0])
}}var e=this._dockersByPath[r.id];
if(n===0){var p=parseFloat(q.shift());
var o=parseFloat(q.shift());
if(e.first().getDockedShape()){e.first().setReferencePoint({x:p,y:o})
}else{e.first().bounds.centerMoveTo(p,o)
}}o=parseFloat(q.pop());
p=parseFloat(q.pop());
if(e.last().getDockedShape()){e.last().setReferencePoint({x:p,y:o})
}else{e.last().bounds.centerMoveTo(p,o)
}for(var l=0;
l<q.length;
l++){p=parseFloat(q[l]);
o=parseFloat(q[++l]);
var m=this.createDocker();
m.bounds.centerMoveTo(p,o)
}}}}).bind(this))
}else{this.alignDockers()
}this._changed()
},toString:function(){return this.getStencil().title()+" "+this.id
},getTarget:function(){return this.dockers.last()?this.dockers.last().getDockedShape():null
},getSource:function(){return this.dockers.first()?this.dockers.first().getDockedShape():null
},isDocked:function(){var a=false;
this.dockers.each(function(b){if(b.isDocked()){a=true;
throw $break
}});
return a
},toJSON:function(){var a=arguments.callee.$.toJSON.apply(this,arguments);
if(this.getTarget()){a.target={resourceId:this.getTarget().resourceId}
}return a
}};
ORYX.Core.Edge=ORYX.Core.Shape.extend(ORYX.Core.Edge);
if(!ORYX){var ORYX={}
}if(!ORYX.Plugins){ORYX.Plugins={}
}ORYX.Plugins.AbstractPlugin=Clazz.extend({facade:null,construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED,this.onLoaded.bind(this))
},onLoaded:function(){},onSelectionChanged:function(){},showOverlay:function(a,b,d,c){if(!(a instanceof Array)){a=[a]
}a=a.map(function(e){var f=e;
if(typeof e=="string"){f=this.facade.getCanvas().getChildShapeByResourceId(e);
f=f||this.facade.getCanvas().getChildById(e,true)
}return f
}.bind(this)).compact();
if(!this.overlayID){this.overlayID=this.type+ORYX.Editor.provideId()
}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:this.overlayID,shapes:a,attributes:b,node:d,nodePosition:c||"NW"})
},hideOverlay:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:this.overlayID})
},doTransform:function(d,a){if(!a||!d){return""
}var c=new DOMParser();
var i=c.parseFromString(d,"text/xml");
source=a;
new Ajax.Request(source,{asynchronous:false,method:"get",onSuccess:function(k){xsl=k.responseText
}.bind(this),onFailure:(function(k){ORYX.Log.error("XSL load failed"+k)
}).bind(this)});
var f=new XSLTProcessor();
var h=new DOMParser();
var e=h.parseFromString(xsl,"text/xml");
f.importStylesheet(e);
try{var j=f.transformToFragment(i,document);
var b=(new XMLSerializer()).serializeToString(j);
b=!b.startsWith("<?xml")?'<?xml version="1.0" encoding="UTF-8"?>'+b:b;
return b
}catch(g){return -1
}},openXMLWindow:function(a){var b=window.open("data:application/xml,"+encodeURIComponent(a),"_blank","resizable=yes,width=600,height=600,toolbar=0,scrollbars=yes")
},openDownloadWindow:function(b,c){var d=window.open("");
if(d!=null){d.document.open();
d.document.write("<html><body>");
var a=d.document.createElement("form");
d.document.body.appendChild(a);
var e=function(f,g){var h=document.createElement("input");
h.name=f;
h.type="hidden";
h.value=g;
return h
};
a.appendChild(e("download",c));
a.appendChild(e("file",b));
a.method="POST";
d.document.write("</body></html>");
d.document.close();
a.action=ORYX.PATH+"/download";
a.submit()
}},getSerializedDOM:function(){var a=DataManager.serializeDOM(this.facade);
a='<?xml version="1.0" encoding="utf-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:b3mn="http://b3mn.org/2007/b3mn" xmlns:ext="http://b3mn.org/2007/ext" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:atom="http://b3mn.org/2007/atom+xhtml"><head profile="http://purl.org/NET/erdf/profile"><link rel="schema.dc" href="http://purl.org/dc/elements/1.1/" /><link rel="schema.dcTerms" href="http://purl.org/dc/terms/ " /><link rel="schema.b3mn" href="http://b3mn.org" /><link rel="schema.oryx" href="http://oryx-editor.org/" /><link rel="schema.raziel" href="http://raziel.org/" /><base href="'+location.href.split("?")[0]+'" /></head><body>'+a+"</body></html>";
return a
},enableReadOnlyMode:function(){this.facade.disableEvent(ORYX.CONFIG.EVENT_MOUSEDOWN);
this._stopSelectionChange=function(){if(this.facade.getSelection().length>0){this.facade.setSelection([])
}};
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED,this._stopSelectionChange.bind(this))
},disableReadOnlyMode:function(){this.facade.enableEvent(ORYX.CONFIG.EVENT_MOUSEDOWN);
if(this._stopSelectionChange){this.facade.unregisterOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED,this._stopSelectionChange.bind(this));
this._stopSelectionChange=undefined
}},getRDFFromDOM:function(){try{var c="";
source=ORYX.PATH+"lib/extract-rdf.xsl";
new Ajax.Request(source,{asynchronous:false,method:"get",onSuccess:function(e){c=e.responseText
}.bind(this),onFailure:(function(e){ORYX.Log.error("XSL load failed"+e)
}).bind(this)});
var i=new DOMParser();
var h=i.parseFromString(this.getSerializedDOM(),"text/xml");
var f=i.parseFromString(c,"text/xml");
var b=new XSLTProcessor();
b.importStylesheet(f);
var a=b.transformToFragment(h,document);
var d=new XMLSerializer();
return d.serializeToString(a)
}catch(g){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error: "+error,title:""});
return""
}},isStencilSetExtensionLoaded:function(a){return this.facade.getStencilSets().values().any(function(b){return b.extensions().keys().any(function(c){return c==a
}.bind(this))
}.bind(this))
},doLayout:function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LAYOUT,shapes:a})
},layoutEdges:function(c,f,e){var g=f.findAll(function(k){return k.dockers.length>2
}.bind(this));
if(g.length>0){var b=c.absoluteXY();
var a={x:b.x-e.x,y:b.y-e.y};
b.x+=c.bounds.width()/2;
b.y+=c.bounds.height()/2;
oldCenter=Object.clone(b);
oldCenter.x-=e?e.x:0;
oldCenter.y-=e?e.y:0;
var j={x:b.x-(c.bounds.width()/2),y:b.y-(c.bounds.height()/2)};
var h={x:b.x+(c.bounds.width()/2),y:b.y+(c.bounds.height()/2)};
var i=function(m,k){var n=m.center().x-k.center().x;
var l=m.center().y-k.center().y;
if(Math.abs(n)<3){m.moveBy({x:(e.xs?(((e.xs*(m.center().x-a.x))+e.x+a.x)-m.center().x):e.x)-n,y:0})
}else{if(Math.abs(l)<3){m.moveBy({x:0,y:(e.ys?(((e.ys*(m.center().y-a.y))+e.y+a.y)-m.center().y):e.y)-l})
}}};
var d=function(k){var l=k.dockers.first().getDockedShape();
var m=k.dockers.last().getDockedShape();
if(l){l=l.absoluteBounds();
l.widen(5)
}if(m){m=m.absoluteBounds();
m.widen(20)
}return k.dockers.any(function(o,n){var p=o.bounds.center();
return n!=0&&n!=k.dockers.length-1&&((l&&l.isIncluded(p))||(m&&m.isIncluded(p)))
})
};
g.each(function(m){if(m.dockers.first().getDockedShape()===c){var l=m.dockers[1];
if(i(l.bounds,m.dockers.first().bounds)){l.update()
}}else{if(m.dockers.last().getDockedShape()===c){var k=m.dockers[m.dockers.length-2];
if(i(k.bounds,m.dockers.last().bounds)){k.update()
}}}m._update(true);
m.removeUnusedDockers();
if(d(m)){this.doLayout(m);
return
}}.bind(this))
}f.each(function(k){if(k.dockers.length==2){var m=k.dockers.first().bounds.center();
var l=k.dockers.last().bounds.center();
if(Math.abs(m.x-l.x)<2||Math.abs(m.y-l.y)<2){k.dockers.first().update();
k.dockers.last().update();
this.doLayout(k)
}}}.bind(this))
}});
if(!ORYX){var ORYX={}
}if(!ORYX.Plugins){ORYX.Plugins={}
}ORYX.Plugins.AbstractLayouter=ORYX.Plugins.AbstractPlugin.extend({layouted:[],construct:function(a){arguments.callee.$.construct.apply(this,arguments);
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LAYOUT,this._initLayout.bind(this))
},isIncludedInLayout:function(a){if(!(this.layouted instanceof Array)){this.layouted=[this.layouted].compact()
}if(this.layouted.length<=0){return true
}return this.layouted.any(function(b){if(typeof b=="string"){return a.getStencil().id().include(b)
}else{return a instanceof b
}})
},_initLayout:function(c){var b=[c.shapes].flatten().compact();
var a=b.findAll(function(d){return this.isIncludedInLayout(d)
}.bind(this));
if(a.length>0){this.layout(a)
}},layout:function(a){throw new Error("Layouter has to implement the layout function.")
},getChildShapesWithout:function(a,b){if(typeof a.getChildShapes=="function"){var c=a.getChildShapes(false);
return c.findAll(function(d){return !b.member(d.getStencil().id())
})
}else{return[]
}}});
if(!ORYX){var ORYX={}
}if(!ORYX.Plugins){ORYX.Plugins={}
}ORYX.Plugins.AbstractDragTracker=ORYX.Plugins.AbstractPlugin.extend({shapes:[null],construct:function(a){arguments.callee.$.construct.apply(this,arguments);
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAG_TRACKER_DRAG,function(b){if(this.isIncludedInShapes(b.shapes)){this.drag(b.shapes,b.bounds)
}}.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAG_TRACKER_RESIZE,function(b){if(this.isIncludedInShapes(b.shapes)){this.resize(b.shapes,b.bounds)
}}.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_END,function(b){if(this.isIncludedInShapes(b.shapes)){this.resizeEnd(b.shapes)
}}.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DROP_SHAPE,function(b){if(this.isIncludedInShapes(b.shape)){this.newShape(b.shape)
}}.bind(this))
},drag:function(a,b){},resize:function(a,b){},resizeEnd:function(a){},newShape:function(a){},isIncludedInShapes:function(a){if(a instanceof Array){included=false;
a.each(function(b){if(this.isIncludedInShapes(b)){included=true;
return
}}.bind(this));
return included
}if(!(this.shapes instanceof Array)){this.shapes=[this.shapes].compact()
}if(this.shapes.length<=0){return true
}return this.shapes.any(function(b){if(typeof b=="string"){return a.getStencil().id().include(b)
}else{return a instanceof b
}})
}});
(function(){function a(){this.Diff_Timeout=1;
this.Diff_EditCost=4;
this.Match_Threshold=0.5;
this.Match_Distance=1000;
this.Patch_DeleteThreshold=0.5;
this.Patch_Margin=4;
this.Match_MaxBits=32
}a.prototype.diff_main=function(i,h,n,m){"undefined"==typeof m&&(m=0>=this.Diff_Timeout?Number.MAX_VALUE:(new Date).getTime()+1000*this.Diff_Timeout);
if(null==i||null==h){throw Error("Null input. (diff_main)")
}if(i==h){return i?[[0,i]]:[]
}"undefined"==typeof n&&(n=!0);
var l=n,k=this.diff_commonPrefix(i,h),n=i.substring(0,k),i=i.substring(k),h=h.substring(k),k=this.diff_commonSuffix(i,h),j=i.substring(i.length-k),i=i.substring(0,i.length-k),h=h.substring(0,h.length-k),i=this.diff_compute_(i,h,l,m);
n&&i.unshift([0,n]);
j&&i.push([0,j]);
this.diff_cleanupMerge(i);
return i
};
a.prototype.diff_compute_=function(i,h,n,m){if(!i){return[[1,h]]
}if(!h){return[[-1,i]]
}var l=i.length>h.length?i:h,k=i.length>h.length?h:i,j=l.indexOf(k);
if(-1!=j){return n=[[1,l.substring(0,j)],[0,k],[1,l.substring(j+k.length)]],i.length>h.length&&(n[0][0]=n[2][0]=-1),n
}if(1==k.length){return[[-1,i],[1,h]]
}return(l=this.diff_halfMatch_(i,h))?(k=l[0],i=l[1],j=l[2],h=l[3],l=l[4],k=this.diff_main(k,j,n,m),n=this.diff_main(i,h,n,m),k.concat([[0,l]],n)):n&&100<i.length&&100<h.length?this.diff_lineMode_(i,h,m):this.diff_bisect_(i,h,m)
};
a.prototype.diff_lineMode_=function(i,h,n){var m=this.diff_linesToChars_(i,h),i=m.chars1,h=m.chars2,m=m.lineArray,i=this.diff_main(i,h,!1,n);
this.diff_charsToLines_(i,m);
this.diff_cleanupSemantic(i);
i.push([0,""]);
for(var l=m=h=0,k="",j="";
h<i.length;
){switch(i[h][0]){case 1:l++;
j+=i[h][1];
break;
case -1:m++;
k+=i[h][1];
break;
case 0:if(1<=m&&1<=l){i.splice(h-m-l,m+l);
h=h-m-l;
m=this.diff_main(k,j,!1,n);
for(l=m.length-1;
0<=l;
l--){i.splice(h,0,m[l])
}h+=m.length
}m=l=0;
j=k=""
}h++
}i.pop();
return i
};
a.prototype.diff_bisect_=function(R,Q,P){for(var O=R.length,N=Q.length,M=Math.ceil((O+N)/2),L=M,K=2*M,I=Array(K),J=Array(K),H=0;
H<K;
H++){I[H]=-1,J[H]=-1
}I[L+1]=0;
J[L+1]=0;
for(var H=O-N,C=0!=H%2,B=0,z=0,D=0,w=0,x=0;
x<M&&!((new Date).getTime()>P);
x++){for(var E=-x+B;
E<=x-z;
E+=2){var G=L+E,F;
F=E==-x||E!=x&&I[G-1]<I[G+1]?I[G+1]:I[G-1]+1;
for(var A=F-E;
F<O&&A<N&&R.charAt(F)==Q.charAt(A);
){F++,A++
}I[G]=F;
if(F>O){z+=2
}else{if(A>N){B+=2
}else{if(C&&(G=L+H-E,0<=G&&G<K&&-1!=J[G])){var y=O-J[G];
if(F>=y){return this.diff_bisectSplit_(R,Q,F,A,P)
}}}}}for(E=-x+D;
E<=x-w;
E+=2){G=L+E;
y=E==-x||E!=x&&J[G-1]<J[G+1]?J[G+1]:J[G-1]+1;
for(F=y-E;
y<O&&F<N&&R.charAt(O-y-1)==Q.charAt(N-F-1);
){y++,F++
}J[G]=y;
if(y>O){w+=2
}else{if(F>N){D+=2
}else{if(!C&&(G=L+H-E,0<=G&&G<K&&-1!=I[G]&&(F=I[G],A=L+F-G,y=O-y,F>=y))){return this.diff_bisectSplit_(R,Q,F,A,P)
}}}}}return[[-1,R],[1,Q]]
};
a.prototype.diff_bisectSplit_=function(i,h,n,m,l){var k=i.substring(0,n),j=h.substring(0,m),i=i.substring(n),h=h.substring(m),k=this.diff_main(k,j,!1,l),l=this.diff_main(i,h,!1,l);
return k.concat(l)
};
a.prototype.diff_linesToChars_=function(i,h){function n(e){for(var d="",s=0,r=-1,o=m.length;
r<e.length-1;
){r=e.indexOf("\n",s);
-1==r&&(r=e.length-1);
var p=e.substring(s,r+1),s=r+1;
(l.hasOwnProperty?l.hasOwnProperty(p):void 0!==l[p])?d+=String.fromCharCode(l[p]):(d+=String.fromCharCode(o),l[p]=o,m[o++]=p)
}return d
}var m=[],l={};
m[0]="";
var k=n(i),j=n(h);
return{chars1:k,chars2:j,lineArray:m}
};
a.prototype.diff_charsToLines_=function(h,g){for(var l=0;
l<h.length;
l++){for(var k=h[l][1],j=[],i=0;
i<k.length;
i++){j[i]=g[k.charCodeAt(i)]
}h[l][1]=j.join("")
}};
a.prototype.diff_commonPrefix=function(h,g){if(!h||!g||h.charAt(0)!=g.charAt(0)){return 0
}for(var l=0,k=Math.min(h.length,g.length),j=k,i=0;
l<j;
){h.substring(i,j)==g.substring(i,j)?i=l=j:k=j,j=Math.floor((k-l)/2+l)
}return j
};
a.prototype.diff_commonSuffix=function(h,g){if(!h||!g||h.charAt(h.length-1)!=g.charAt(g.length-1)){return 0
}for(var l=0,k=Math.min(h.length,g.length),j=k,i=0;
l<j;
){h.substring(h.length-j,h.length-i)==g.substring(g.length-j,g.length-i)?i=l=j:k=j,j=Math.floor((k-l)/2+l)
}return j
};
a.prototype.diff_commonOverlap_=function(h,g){var l=h.length,k=g.length;
if(0==l||0==k){return 0
}l>k?h=h.substring(l-k):l<k&&(g=g.substring(0,l));
l=Math.min(l,k);
if(h==g){return l
}for(var k=0,j=1;
;
){var i=h.substring(l-j),i=g.indexOf(i);
if(-1==i){return k
}j+=i;
if(0==i||h.substring(l-j)==g.substring(0,j)){k=j,j++
}}};
a.prototype.diff_halfMatch_=function(r,q){function p(C,B,A){for(var z=C.substring(A,A+Math.floor(C.length/4)),y=-1,x="",w,v,s,u;
-1!=(y=B.indexOf(z,y+1));
){var t=m.diff_commonPrefix(C.substring(A),B.substring(y)),f=m.diff_commonSuffix(C.substring(0,A),B.substring(0,y));
x.length<f+t&&(x=B.substring(y-f,y)+B.substring(y,y+t),w=C.substring(0,A-f),v=C.substring(A+t),s=B.substring(0,y-f),u=B.substring(y+t))
}return 2*x.length>=C.length?[w,v,s,u,x]:null
}if(0>=this.Diff_Timeout){return null
}var o=r.length>q.length?r:q,n=r.length>q.length?q:r;
if(4>o.length||2*n.length<o.length){return null
}var m=this,l=p(o,n,Math.ceil(o.length/4)),o=p(o,n,Math.ceil(o.length/2)),k;
if(!l&&!o){return null
}k=o?l?l[4].length>o[4].length?l:o:o:l;
var i;
r.length>q.length?(l=k[0],o=k[1],n=k[2],i=k[3]):(n=k[0],i=k[1],l=k[2],o=k[3]);
k=k[4];
return[l,o,n,i,k]
};
a.prototype.diff_cleanupSemantic=function(t){for(var s=!1,r=[],q=0,p=null,o=0,n=0,m=0,k=0,l=0;
o<t.length;
){0==t[o][0]?(r[q++]=o,n=k,m=l,l=k=0,p=t[o][1]):(1==t[o][0]?k+=t[o][1].length:l+=t[o][1].length,p&&p.length<=Math.max(n,m)&&p.length<=Math.max(k,l)&&(t.splice(r[q-1],0,[-1,p]),t[r[q-1]+1][0]=1,q--,q--,o=0<q?r[q-1]:-1,l=k=m=n=0,p=null,s=!0)),o++
}s&&this.diff_cleanupMerge(t);
this.diff_cleanupSemanticLossless(t);
for(o=1;
o<t.length;
){if(-1==t[o-1][0]&&1==t[o][0]){s=t[o-1][1];
r=t[o][1];
q=this.diff_commonOverlap_(s,r);
p=this.diff_commonOverlap_(r,s);
if(q>=p){if(q>=s.length/2||q>=r.length/2){t.splice(o,0,[0,r.substring(0,q)]),t[o-1][1]=s.substring(0,s.length-q),t[o+1][1]=r.substring(q),o++
}}else{if(p>=s.length/2||p>=r.length/2){t.splice(o,0,[0,s.substring(0,p)]),t[o-1][0]=1,t[o-1][1]=r.substring(0,r.length-p),t[o+1][0]=-1,t[o+1][1]=s.substring(p),o++
}}o++
}o++
}};
a.prototype.diff_cleanupSemanticLossless=function(v){function u(E,D){if(!E||!D){return 6
}var C=E.charAt(E.length-1),B=D.charAt(0),A=C.match(a.nonAlphaNumericRegex_),z=B.match(a.nonAlphaNumericRegex_),y=A&&C.match(a.whitespaceRegex_),x=z&&B.match(a.whitespaceRegex_),C=y&&C.match(a.linebreakRegex_),B=x&&B.match(a.linebreakRegex_),w=C&&E.match(a.blanklineEndRegex_),k=B&&D.match(a.blanklineStartRegex_);
return w||k?5:C||B?4:A&&!y&&x?3:y||x?2:A||z?1:0
}for(var t=1;
t<v.length-1;
){if(0==v[t-1][0]&&0==v[t+1][0]){var s=v[t-1][1],r=v[t][1],q=v[t+1][1],p=this.diff_commonSuffix(s,r);
if(p){var o=r.substring(r.length-p),s=s.substring(0,s.length-p),r=o+r.substring(0,r.length-p),q=o+q
}for(var p=s,o=r,m=q,n=u(s,r)+u(r,q);
r.charAt(0)===q.charAt(0);
){var s=s+r.charAt(0),r=r.substring(1)+q.charAt(0),q=q.substring(1),l=u(s,r)+u(r,q);
l>=n&&(n=l,p=s,o=r,m=q)
}v[t-1][1]!=p&&(p?v[t-1][1]=p:(v.splice(t-1,1),t--),v[t][1]=o,m?v[t+1][1]=m:(v.splice(t+1,1),t--))
}t++
}};
a.nonAlphaNumericRegex_=/[^a-zA-Z0-9]/;
a.whitespaceRegex_=/\s/;
a.linebreakRegex_=/[\r\n]/;
a.blanklineEndRegex_=/\n\r?\n$/;
a.blanklineStartRegex_=/^\r?\n\r?\n/;
a.prototype.diff_cleanupEfficiency=function(t){for(var s=!1,r=[],q=0,p=null,o=0,n=!1,m=!1,k=!1,l=!1;
o<t.length;
){if(0==t[o][0]){t[o][1].length<this.Diff_EditCost&&(k||l)?(r[q++]=o,n=k,m=l,p=t[o][1]):(q=0,p=null),k=l=!1
}else{if(-1==t[o][0]?l=!0:k=!0,p&&(n&&m&&k&&l||p.length<this.Diff_EditCost/2&&3==n+m+k+l)){t.splice(r[q-1],0,[-1,p]),t[r[q-1]+1][0]=1,q--,p=null,n&&m?(k=l=!0,q=0):(q--,o=0<q?r[q-1]:-1,k=l=!1),s=!0
}}o++
}s&&this.diff_cleanupMerge(t)
};
a.prototype.diff_cleanupMerge=function(i){i.push([0,""]);
for(var h=0,n=0,m=0,l="",k="",j;
h<i.length;
){switch(i[h][0]){case 1:m++;
k+=i[h][1];
h++;
break;
case -1:n++;
l+=i[h][1];
h++;
break;
case 0:1<n+m?(0!==n&&0!==m&&(j=this.diff_commonPrefix(k,l),0!==j&&(0<h-n-m&&0==i[h-n-m-1][0]?i[h-n-m-1][1]+=k.substring(0,j):(i.splice(0,0,[0,k.substring(0,j)]),h++),k=k.substring(j),l=l.substring(j)),j=this.diff_commonSuffix(k,l),0!==j&&(i[h][1]=k.substring(k.length-j)+i[h][1],k=k.substring(0,k.length-j),l=l.substring(0,l.length-j))),0===n?i.splice(h-m,n+m,[1,k]):0===m?i.splice(h-n,n+m,[-1,l]):i.splice(h-n-m,n+m,[-1,l],[1,k]),h=h-n-m+(n?1:0)+(m?1:0)+1):0!==h&&0==i[h-1][0]?(i[h-1][1]+=i[h][1],i.splice(h,1)):h++,n=m=0,k=l=""
}}""===i[i.length-1][1]&&i.pop();
n=!1;
for(h=1;
h<i.length-1;
){0==i[h-1][0]&&0==i[h+1][0]&&(i[h][1].substring(i[h][1].length-i[h-1][1].length)==i[h-1][1]?(i[h][1]=i[h-1][1]+i[h][1].substring(0,i[h][1].length-i[h-1][1].length),i[h+1][1]=i[h-1][1]+i[h+1][1],i.splice(h-1,1),n=!0):i[h][1].substring(0,i[h+1][1].length)==i[h+1][1]&&(i[h-1][1]+=i[h+1][1],i[h][1]=i[h][1].substring(i[h+1][1].length)+i[h+1][1],i.splice(h+1,1),n=!0)),h++
}n&&this.diff_cleanupMerge(i)
};
a.prototype.diff_xIndex=function(i,h){var n=0,m=0,l=0,k=0,j;
for(j=0;
j<i.length;
j++){1!==i[j][0]&&(n+=i[j][1].length);
-1!==i[j][0]&&(m+=i[j][1].length);
if(n>h){break
}l=n;
k=m
}return i.length!=j&&-1===i[j][0]?k:k+(h-l)
};
a.prototype.diff_prettyHtml=function(r){for(var q=[],p=/&/g,o=/</g,n=/>/g,m=/\n/g,l=0;
l<r.length;
l++){var k=r[l][0],i=r[l][1],i=i.replace(p,"&amp;").replace(o,"&lt;").replace(n,"&gt;").replace(m,"&para;<br>");
switch(k){case 1:q[l]='<ins style="background:#e6ffe6;">'+i+"</ins>";
break;
case -1:q[l]='<del style="background:#ffe6e6;">'+i+"</del>";
break;
case 0:q[l]="<span>"+i+"</span>"
}}return q.join("")
};
a.prototype.diff_text1=function(e){for(var d=[],f=0;
f<e.length;
f++){1!==e[f][0]&&(d[f]=e[f][1])
}return d.join("")
};
a.prototype.diff_text2=function(e){for(var d=[],f=0;
f<e.length;
f++){-1!==e[f][0]&&(d[f]=e[f][1])
}return d.join("")
};
a.prototype.diff_levenshtein=function(i){for(var h=0,n=0,m=0,l=0;
l<i.length;
l++){var k=i[l][0],j=i[l][1];
switch(k){case 1:n+=j.length;
break;
case -1:m+=j.length;
break;
case 0:h+=Math.max(n,m),m=n=0
}}return h+=Math.max(n,m)
};
a.prototype.diff_toDelta=function(e){for(var d=[],f=0;
f<e.length;
f++){switch(e[f][0]){case 1:d[f]="+"+encodeURI(e[f][1]);
break;
case -1:d[f]="-"+e[f][1].length;
break;
case 0:d[f]="="+e[f][1].length
}}return d.join("\t").replace(/%20/g," ")
};
a.prototype.diff_fromDelta=function(t,s){for(var r=[],q=0,p=0,o=s.split(/\t/g),n=0;
n<o.length;
n++){var m=o[n].substring(1);
switch(o[n].charAt(0)){case"+":try{r[q++]=[1,decodeURI(m)]
}catch(k){throw Error("Illegal escape in diff_fromDelta: "+m)
}break;
case"-":case"=":var l=parseInt(m,10);
if(isNaN(l)||0>l){throw Error("Invalid number in diff_fromDelta: "+m)
}m=t.substring(p,p+=l);
"="==o[n].charAt(0)?r[q++]=[0,m]:r[q++]=[-1,m];
break;
default:if(o[n]){throw Error("Invalid diff operation in diff_fromDelta: "+o[n])
}}}if(p!=t.length){throw Error("Delta length ("+p+") does not equal source text length ("+t.length+").")
}return r
};
a.prototype.match_main=function(e,d,f){if(null==e||null==d||null==f){throw Error("Null input. (match_main)")
}f=Math.max(0,Math.min(f,e.length));
return e==d?0:e.length?e.substring(f,f+d.length)==d?f:this.match_bitap_(e,d,f):-1
};
a.prototype.match_bitap_=function(D,C,B){function A(b,h){var f=b/C.length,c=Math.abs(B-h);
return !y.Match_Distance?c?1:f:f+c/y.Match_Distance
}if(C.length>this.Match_MaxBits){throw Error("Pattern too long for this browser.")
}var z=this.match_alphabet_(C),y=this,x=this.Match_Threshold,w=D.indexOf(C,B);
-1!=w&&(x=Math.min(A(0,w),x),w=D.lastIndexOf(C,B+C.length),-1!=w&&(x=Math.min(A(0,w),x)));
for(var t=1<<C.length-1,w=-1,u,r,m=C.length+D.length,l,F=0;
F<C.length;
F++){u=0;
for(r=m;
u<r;
){A(F,B+r)<=x?u=r:m=r,r=Math.floor((m-u)/2+u)
}m=r;
u=Math.max(1,B-r+1);
var n=Math.min(B+r,D.length)+C.length;
r=Array(n+2);
for(r[n+1]=(1<<F)-1;
n>=u;
n--){var E=z[D.charAt(n-1)];
r[n]=0===F?(r[n+1]<<1|1)&E:(r[n+1]<<1|1)&E|(l[n+1]|l[n])<<1|1|l[n+1];
if(r[n]&t&&(E=A(F,n-1),E<=x)){if(x=E,w=n-1,w>B){u=Math.max(1,2*B-w)
}else{break
}}}if(A(F+1,B)>x){break
}l=r
}return w
};
a.prototype.match_alphabet_=function(e){for(var d={},f=0;
f<e.length;
f++){d[e.charAt(f)]=0
}for(f=0;
f<e.length;
f++){d[e.charAt(f)]|=1<<e.length-f-1
}return d
};
a.prototype.patch_addContext_=function(f,e){if(0!=e.length){for(var h=e.substring(f.start2,f.start2+f.length1),g=0;
e.indexOf(h)!=e.lastIndexOf(h)&&h.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;
){g+=this.Patch_Margin,h=e.substring(f.start2-g,f.start2+f.length1+g)
}g+=this.Patch_Margin;
(h=e.substring(f.start2-g,f.start2))&&f.diffs.unshift([0,h]);
(g=e.substring(f.start2+f.length1,f.start2+f.length1+g))&&f.diffs.push([0,g]);
f.start1-=h.length;
f.start2-=h.length;
f.length1+=h.length+g.length;
f.length2+=h.length+g.length
}};
a.prototype.patch_make=function(v,u,t){var s;
if("string"==typeof v&&"string"==typeof u&&"undefined"==typeof t){s=v,u=this.diff_main(s,u,!0),2<u.length&&(this.diff_cleanupSemantic(u),this.diff_cleanupEfficiency(u))
}else{if(v&&"object"==typeof v&&"undefined"==typeof u&&"undefined"==typeof t){u=v,s=this.diff_text1(u)
}else{if("string"==typeof v&&u&&"object"==typeof u&&"undefined"==typeof t){s=v
}else{if("string"==typeof v&&"string"==typeof u&&t&&"object"==typeof t){s=v,u=t
}else{throw Error("Unknown call format to patch_make.")
}}}}if(0===u.length){return[]
}for(var t=[],v=new a.patch_obj,r=0,q=0,p=0,o=s,m=0;
m<u.length;
m++){var n=u[m][0],l=u[m][1];
if(!r&&0!==n){v.start1=q,v.start2=p
}switch(n){case 1:v.diffs[r++]=u[m];
v.length2+=l.length;
s=s.substring(0,p)+l+s.substring(p);
break;
case -1:v.length1+=l.length;
v.diffs[r++]=u[m];
s=s.substring(0,p)+s.substring(p+l.length);
break;
case 0:l.length<=2*this.Patch_Margin&&r&&u.length!=m+1?(v.diffs[r++]=u[m],v.length1+=l.length,v.length2+=l.length):l.length>=2*this.Patch_Margin&&r&&(this.patch_addContext_(v,o),t.push(v),v=new a.patch_obj,r=0,o=s,q=p)
}1!==n&&(q+=l.length);
-1!==n&&(p+=l.length)
}r&&(this.patch_addContext_(v,o),t.push(v));
return t
};
a.prototype.patch_deepCopy=function(h){for(var g=[],l=0;
l<h.length;
l++){var k=h[l],j=new a.patch_obj;
j.diffs=[];
for(var i=0;
i<k.diffs.length;
i++){j.diffs[i]=k.diffs[i].slice()
}j.start1=k.start1;
j.start2=k.start2;
j.length1=k.length1;
j.length2=k.length2;
g[l]=j
}return g
};
a.prototype.patch_apply=function(x,w){if(0==x.length){return[w,[]]
}var x=this.patch_deepCopy(x),v=this.patch_addPadding(x),w=v+w+v;
this.patch_splitMax(x);
for(var u=0,t=[],s=0;
s<x.length;
s++){var r=x[s].start2+u,q=this.diff_text1(x[s].diffs),n,o=-1;
if(q.length>this.Match_MaxBits){if(n=this.match_main(w,q.substring(0,this.Match_MaxBits),r),-1!=n&&(o=this.match_main(w,q.substring(q.length-this.Match_MaxBits),r+q.length-this.Match_MaxBits),-1==o||n>=o)){n=-1
}}else{n=this.match_main(w,q,r)
}if(-1==n){t[s]=!1,u-=x[s].length2-x[s].length1
}else{if(t[s]=!0,u=n-r,r=-1==o?w.substring(n,n+q.length):w.substring(n,o+this.Match_MaxBits),q==r){w=w.substring(0,n)+this.diff_text2(x[s].diffs)+w.substring(n+q.length)
}else{if(r=this.diff_main(q,r,!1),q.length>this.Match_MaxBits&&this.diff_levenshtein(r)/q.length>this.Patch_DeleteThreshold){t[s]=!1
}else{this.diff_cleanupSemanticLossless(r);
for(var q=0,m,o=0;
o<x[s].diffs.length;
o++){var l=x[s].diffs[o];
0!==l[0]&&(m=this.diff_xIndex(r,q));
1===l[0]?w=w.substring(0,n+m)+l[1]+w.substring(n+m):-1===l[0]&&(w=w.substring(0,n+m)+w.substring(n+this.diff_xIndex(r,q+l[1].length)));
-1!==l[0]&&(q+=l[1].length)
}}}}}w=w.substring(v.length,w.length-v.length);
return[w,t]
};
a.prototype.patch_addPadding=function(h){for(var g=this.Patch_Margin,l="",k=1;
k<=g;
k++){l+=String.fromCharCode(k)
}for(k=0;
k<h.length;
k++){h[k].start1+=g,h[k].start2+=g
}var k=h[0],j=k.diffs;
if(0==j.length||0!=j[0][0]){j.unshift([0,l]),k.start1-=g,k.start2-=g,k.length1+=g,k.length2+=g
}else{if(g>j[0][1].length){var i=g-j[0][1].length;
j[0][1]=l.substring(j[0][1].length)+j[0][1];
k.start1-=i;
k.start2-=i;
k.length1+=i;
k.length2+=i
}}k=h[h.length-1];
j=k.diffs;
0==j.length||0!=j[j.length-1][0]?(j.push([0,l]),k.length1+=g,k.length2+=g):g>j[j.length-1][1].length&&(i=g-j[j.length-1][1].length,j[j.length-1][1]+=l.substring(0,i),k.length1+=i,k.length2+=i);
return l
};
a.prototype.patch_splitMax=function(t){for(var s=this.Match_MaxBits,r=0;
r<t.length;
r++){if(!(t[r].length1<=s)){var q=t[r];
t.splice(r--,1);
for(var p=q.start1,o=q.start2,n="";
0!==q.diffs.length;
){var m=new a.patch_obj,k=!0;
m.start1=p-n.length;
m.start2=o-n.length;
if(""!==n){m.length1=m.length2=n.length,m.diffs.push([0,n])
}for(;
0!==q.diffs.length&&m.length1<s-this.Patch_Margin;
){var n=q.diffs[0][0],l=q.diffs[0][1];
1===n?(m.length2+=l.length,o+=l.length,m.diffs.push(q.diffs.shift()),k=!1):-1===n&&1==m.diffs.length&&0==m.diffs[0][0]&&l.length>2*s?(m.length1+=l.length,p+=l.length,k=!1,m.diffs.push([n,l]),q.diffs.shift()):(l=l.substring(0,s-m.length1-this.Patch_Margin),m.length1+=l.length,p+=l.length,0===n?(m.length2+=l.length,o+=l.length):k=!1,m.diffs.push([n,l]),l==q.diffs[0][1]?q.diffs.shift():q.diffs[0][1]=q.diffs[0][1].substring(l.length))
}n=this.diff_text2(m.diffs);
n=n.substring(n.length-this.Patch_Margin);
l=this.diff_text1(q.diffs).substring(0,this.Patch_Margin);
""!==l&&(m.length1+=l.length,m.length2+=l.length,0!==m.diffs.length&&0===m.diffs[m.diffs.length-1][0]?m.diffs[m.diffs.length-1][1]+=l:m.diffs.push([0,l]));
k||t.splice(++r,0,m)
}}}};
a.prototype.patch_toText=function(e){for(var d=[],f=0;
f<e.length;
f++){d[f]=e[f]
}return d.join("")
};
a.prototype.patch_fromText=function(j){var i=[];
if(!j){return i
}for(var j=j.split("\n"),p=0,o=/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
p<j.length;
){var n=j[p].match(o);
if(!n){throw Error("Invalid patch string: "+j[p])
}var m=new a.patch_obj;
i.push(m);
m.start1=parseInt(n[1],10);
""===n[2]?(m.start1--,m.length1=1):"0"==n[2]?m.length1=0:(m.start1--,m.length1=parseInt(n[2],10));
m.start2=parseInt(n[3],10);
""===n[4]?(m.start2--,m.length2=1):"0"==n[4]?m.length2=0:(m.start2--,m.length2=parseInt(n[4],10));
for(p++;
p<j.length;
){n=j[p].charAt(0);
try{var l=decodeURI(j[p].substring(1))
}catch(k){throw Error("Illegal escape in patch_fromText: "+l)
}if("-"==n){m.diffs.push([-1,l])
}else{if("+"==n){m.diffs.push([1,l])
}else{if(" "==n){m.diffs.push([0,l])
}else{if("@"==n){break
}else{if(""!==n){throw Error('Invalid patch mode "'+n+'" in: '+l)
}}}}}p++
}}return i
};
a.patch_obj=function(){this.diffs=[];
this.start2=this.start1=null;
this.length2=this.length1=0
};
a.patch_obj.prototype.toString=function(){var e,d;
e=0===this.length1?this.start1+",0":1==this.length1?this.start1+1:this.start1+1+","+this.length1;
d=0===this.length2?this.start2+",0":1==this.length2?this.start2+1:this.start2+1+","+this.length2;
e=["@@ -"+e+" +"+d+" @@\n"];
var f;
for(d=0;
d<this.diffs.length;
d++){switch(this.diffs[d][0]){case 1:f="+";
break;
case -1:f="-";
break;
case 0:f=" "
}e[d+1]=f+encodeURI(this.diffs[d][1])+"\n"
}return e.join("").replace(/%20/g," ")
};
this.diff_match_patch=a;
this.DIFF_DELETE=-1;
this.DIFF_INSERT=1;
this.DIFF_EQUAL=0
})();
Ext.ns("Extensive.grid");
Extensive.grid.ItemDeleter=Ext.extend(Ext.grid.RowSelectionModel,{width:30,sortable:false,dataIndex:0,menuDisabled:true,fixed:true,id:"deleter",dtype:"",setDType:function(a){if(a&&a.length>0){this.dtype=a
}},initEvents:function(){Extensive.grid.ItemDeleter.superclass.initEvents.call(this);
this.grid.on("cellclick",function(b,f,c,d){if(c==b.getColumnModel().getIndexById("deleter")){var a=b.getStore().getAt(f);
ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_DEF_DELETED,dtype:this.dtype,rcd:a});
b.getStore().remove(a);
b.getView().refresh()
}}.bind(this))
},renderer:function(b,c,a,d){return'<div class="extensive-remove" style="width: 15px; height: 16px;"></div>'
}});
function jsonPath(obj,expr,arg){var P={resultType:arg&&arg.resultType||"VALUE",result:[],normalize:function(expr){var subx=[];
return expr.replace(/[\['](\??\(.*?\))[\]']/g,function($0,$1){return"[#"+(subx.push($1)-1)+"]"
}).replace(/'?\.'?|\['?/g,";").replace(/;;;|;;/g,";..;").replace(/;$|'?\]|'$/g,"").replace(/#([0-9]+)/g,function($0,$1){return subx[$1]
})
},asPath:function(path){var x=path.split(";"),p="$";
for(var i=1,n=x.length;
i<n;
i++){p+=/^[0-9*]+$/.test(x[i])?("["+x[i]+"]"):("['"+x[i]+"']")
}return p
},store:function(p,v){if(p){P.result[P.result.length]=P.resultType=="PATH"?P.asPath(p):v
}return !!p
},trace:function(expr,val,path){if(expr){var x=expr.split(";"),loc=x.shift();
x=x.join(";");
if(val&&val.hasOwnProperty(loc)){P.trace(x,val[loc],path+";"+loc)
}else{if(loc==="*"){P.walk(loc,x,val,path,function(m,l,x,v,p){P.trace(m+";"+x,v,p)
})
}else{if(loc===".."){P.trace(x,val,path);
P.walk(loc,x,val,path,function(m,l,x,v,p){typeof v[m]==="object"&&P.trace("..;"+x,v[m],p+";"+m)
})
}else{if(/,/.test(loc)){for(var s=loc.split(/'?,'?/),i=0,n=s.length;
i<n;
i++){P.trace(s[i]+";"+x,val,path)
}}else{if(/^\(.*?\)$/.test(loc)){P.trace(P.eval(loc,val,path.substr(path.lastIndexOf(";")+1))+";"+x,val,path)
}else{if(/^\?\(.*?\)$/.test(loc)){P.walk(loc,x,val,path,function(m,l,x,v,p){if(P.eval(l.replace(/^\?\((.*?)\)$/,"$1"),v[m],m)){P.trace(m+";"+x,v,p)
}})
}else{if(/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)){P.slice(loc,x,val,path)
}}}}}}}}else{P.store(path,val)
}},walk:function(loc,expr,val,path,f){if(val instanceof Array){for(var i=0,n=val.length;
i<n;
i++){if(i in val){f(i,loc,expr,val,path)
}}}else{if(typeof val==="object"){for(var m in val){if(val.hasOwnProperty(m)){f(m,loc,expr,val,path)
}}}}},slice:function(loc,expr,val,path){if(val instanceof Array){var len=val.length,start=0,end=len,step=1;
loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g,function($0,$1,$2,$3){start=parseInt($1||start);
end=parseInt($2||end);
step=parseInt($3||step)
});
start=(start<0)?Math.max(0,start+len):Math.min(len,start);
end=(end<0)?Math.max(0,end+len):Math.min(len,end);
for(var i=start;
i<end;
i+=step){P.trace(i+";"+expr,val,path)
}}},eval:function(x,_v,_vname){try{return $&&_v&&eval(x.replace(/@/g,"_v"))
}catch(e){throw new SyntaxError("jsonPath: "+e.message+": "+x.replace(/@/g,"_v").replace(/\^/g,"_a"))
}}};
var $=obj;
if(expr&&obj&&(P.resultType=="VALUE"||P.resultType=="PATH")){P.trace(P.normalize(expr).replace(/^\$;/,""),obj,"$");
return P.result.length?P.result:false
}};
ImageViewer=Ext.extend(Ext.Window,{initComponent:function(){var a=Ext.id();
ORYX.EDITOR.imagePreviewSVG=this.src;
this.bodyCfg={id:"imageviewerid",layout:"anchor",autoCreate:true,closeAction:"close",title:ORYX.I18N.imageViewer,plain:true,modal:true,collapsible:false,resizeable:true,shadow:true,html:'<iframe id="imageViewFrame" name="imageViewFrame" frameborder="0" scrolling="auto" width="100%" height="400" src="'+ORYX.PATH+"imageview/imageview.html?"+a+'"></iframe>',width:400,height:400,autoScroll:true,fixedcenter:true};
ImageViewer.superclass.initComponent.apply(this,arguments)
},onRender:function(){ImageViewer.superclass.onRender.apply(this,arguments);
this.body.on("load",this.onImageLoad,this,{single:true})
},onImageLoad:function(){},setSrc:function(a){this.body.on("load",this.onImageLoad,this,{single:true});
this.body.dom.src=a
},initEvents:function(){ImageViewer.superclass.initEvents.apply(this,arguments);
if(this.resizer){this.resizer.preserveRatio=true
}}});
SVGViewer=Ext.extend(Ext.Window,{initComponent:function(){var a=Ext.id();
this.bodyCfg={id:"svgviewerid",layout:"anchor",autoCreate:true,closeAction:"close",title:ORYX.I18N.svgViewer,plain:true,modal:true,collapsible:false,resizeable:true,shadow:true,html:'<iframe id="svgViewFrame" name="svgViewFrame" frameborder="0" scrolling="auto" width="100%" height="400" src="'+ORYX.BASE_FILE_PATH+"localhistory/svgview.html?"+a+'"></iframe>',width:400,height:400,autoScroll:true,fixedcenter:true};
SVGViewer.superclass.initComponent.apply(this,arguments)
},onRender:function(){SVGViewer.superclass.onRender.apply(this,arguments);
this.body.on("load",this.onSVGLoad,this,{single:true})
},onSVGLoad:function(){},setSrc:function(a){this.body.on("load",this.onSVGLoad,this,{single:true});
this.body.dom.src=a
},initEvents:function(){SVGViewer.superclass.initEvents.apply(this,arguments);
if(this.resizer){this.resizer.preserveRatio=true
}}});
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
