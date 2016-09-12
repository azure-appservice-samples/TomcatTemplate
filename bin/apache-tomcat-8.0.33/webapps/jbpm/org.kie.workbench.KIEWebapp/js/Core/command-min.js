if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.Command=Clazz.extend({construct:function(){},execute:function(){throw"Command.execute() has to be implemented!"
},rollback:function(){throw"Command.rollback() has to be implemented!"
}});