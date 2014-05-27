function Interface(name, methods) 
{
    if(arguments.length != 2) {
        throw new Error("接口构造函数含" + arguments.length + "个参数, 但需要2个参数.");
    }
    this.name = name;
    this.methods = [];
    if(methods.length < 1) {
        throw new Error("第二个参数为空数组.");
    }
    for(var i = 0, len = methods.length; i < len; i++) {
        if(typeof methods[i][0] !== 'string') {
            throw new Error("接口构造函数第一个参数必须为字符串类型.");
        }
        if(methods[i][1] && typeof methods[i][1] !== 'number') {
            throw new Error("接口构造函数第二个参数必须为整数类型.");
        }
        if(methods[i].length == 1) {
            methods[i][1] = 0;
        } 

        this.methods.push(methods[i]);
    }    
};
Interface.registerImplements = function(object) { 

    if(arguments.length < 2) {
        throw new Error("接口的实现必须包含至少2个参数.");
    } 

    for(var i = 1, len = arguments.length; i < len; i++) {
        var interface = arguments[i];
        if(interface.constructor !== Interface) {
            throw new Error("从第2个以上的参数必须为接口实例.");
        }
        for(var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
            var method = interface.methods[j][0];
            if(!object[method] || typeof object[method] !== 'function' || object[method].getParameters().length != interface.methods[j][1]) {
                throw new Error("接口的实现对象不能执行" + interface.name + "的接口方法" + method + "，因为它找不到或者不匹配.");
            }
        }
    }
}; 

Function.prototype.getParameters = function() { 

    var str = this.toString();
    var paramString = str.slice(str.indexOf('(') + 1, str.indexOf(')')).replace(/\s*/g,'');     //取得参数字符串
    try
    {
        return (paramString.length == 0 ? [] : paramString.split(','));
    }
    catch(err)
    {
        throw new Error("函数不合法!");
    }
} 

function inheritClass (subClass , superClass) {
	var Func = function(){};
	for (p in superClass.prototype){
		Func.prototype[p] = superClass.prototype[p];
	}
	subClass.prototype = new Func();
	subClass.prototype .constructor = subClass;
}
//接口
var  IMember = new Interface("IMember" , [["getMemberInfo"]]);

//Guest class
function Guest(){
	Interface.registerImplements(this , IMember);
}
Guest.prototype = {
    getMemberInfo : function() {
        return "游客";
    },
    getData : function() {
        return "";
    }
}

//博客会员类
function BlogMember() {
    Interface.registerImplements(this, IMember);
}
BlogMember.prototype = {
    getMemberInfo : function() {
        return "博客会员";
    },
    getData : function() {
        return "";
    }
}

var MemberFactory = {
    createMemberType : function(memberType) {
        var  _memberType;
        switch(memberType)
        {
            case "guest": _memberType = new Guest(); break;
            case "blogmember": _memberType = new BlogMember(); break;
            case "superadmin": _memberType = new SuperAdmin(); break;
            default: _memberType = new BlogMember(); break;
        }
        return _memberType;
    }
}

//超级管理员类
function SuperAdmin() {
    Interface.registerImplements(this, IMember);
}
SuperAdmin.prototype = {
    getMemberInfo : function() {
        return "超级管理员";
    }, 
    getData : function() {
        return "";
    }
}