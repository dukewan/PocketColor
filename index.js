var convert = {
	checkRgb : function(str) {
        if (str.length != 0) {
            var rgb = Number(str);
            if (rgb != NaN && rgb >= 0 && rgb <= 255) {
                return rgb;
            } else {
                return false;
            }
        } else {
            return -1;
        }

	},
	
	checkHex : function(str) {
        if (str.length != 0) {
            var reg = new RegExp('^[0-9A-Fa-f]{1,2}$');
            if (reg.test(str)) {
                return str;
            } else {
                return false;
            }
        } else {
            return -1;
        }
	},
	
	dec2Hex : function(num) {
		var str = num.toString(16);
        if (str.length == 1) {
            var hex =  '0' + str;
        } else {
            hex = str;
        }

		return hex.toUpperCase();
	},
	
	hex2Dec : function(str) {
		if(str.length == 1){
			str += str;
		}
		var str = Number('0x00000' + str);
		var rgb = str.toString(10);
		return rgb;
	}
}

var dom = {
	hasClass : function(el, name) {
	   return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
	},
	
	getInput : function(id) {
		return document.getElementById(id).value;
	},
	
	setInput : function(id, str) {
		document.getElementById(id).value = str;
	},
	
	clearInput : function() {
		var inputs = document.getElementsByClassName('input');
        for (var i = 0; i < inputs.length; i++){
            dom.setInput(inputs[i].getAttribute("id"), "");
        }
	},
	
	alert : function(str, duration) {
		if (duration === undefined) {
			var alert = document.getElementById("alert");
			alert.innerHTML = str;
			alert.setAttribute("style", "display:block");
		} else {
			window.setTimeout(function() {
				var alert = document.getElementById("alert");
				alert.innerHTML = str;
				alert.setAttribute("style", "display:block");
			}, duration)	
		}
		
	},
	
	deAlert : function() {
        var alert = document.getElementById("alert");
		alert.innerHTML = "";
		alert.setAttribute("style", "display:none");
	}
};

var tool = {
	init : function(){
		tool.bindEvent();
	},
	
	bindEvent : function() {
		document.getElementById("input1").onkeyup = tool.cope;
        document.getElementById("input2").onkeyup = tool.cope;
        document.getElementById("input3").onkeyup = tool.cope;
        document.getElementById("input4").onkeyup = tool.cope;
        document.getElementById("input5").onkeyup = tool.cope;
        document.getElementById("input6").onkeyup = tool.cope;

        document.getElementById("rgb").onclick = dom.clearInput;
        document.getElementById("hex").onclick = dom.clearInput;
	},

    cope : function() {
        var id = this.getAttribute("id");
        var str = dom.getInput(id);
        if(dom.hasClass(this, "rgb-e")){
            var rgb = convert.checkRgb(str);
            var no = Number(id.slice(-1)) + 3;
            if (rgb !== false && rgb != -1) {
                dom.deAlert();
                var hex = convert.dec2Hex(rgb);
                dom.setInput("input" + no, hex);
            } else if (rgb == -1) {
                dom.setInput("input" + no, "");
            } else {
                dom.alert("the rgb value should be 0-255.");
                dom.setInput("input" + no, "");
            }
        } else {
            var hex = convert.checkHex(str);
            var no = Number(id.slice(-1)) - 3;
            if (hex !== false && hex != -1) {
                dom.deAlert();
                var rgb = convert.hex2Dec(hex);
                dom.setInput("input" + no, rgb);
            } else if (hex == -1) {
                dom.setInput("input" + no, "");
            } else {
                dom.alert("the hex value should be 00-FF.");
                dom.setInput("input" + no, "");
            }
        }
    }
}


tool.init();