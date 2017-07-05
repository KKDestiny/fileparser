/**
 * @Type	: Hdlr Box Parser
 * @Module	: Parser Module
 * @Author	: Linxiaozhou
 * @Date	: 2017.07.05
 */


var BufferPool = require("./../../../../bufferpool");
var MP4 = require("./../../../../mp4");

class HDLR extends MP4 {
	constructor(buf, start) {
		super(buf, start);
		
		this.version 			= null;
		this.flags 				= null;
		this.pre_defined 		= null;
		this.handler_type 		= null;
		this.reserved	 		= null;
		this.name	 			= null;
			
		this.parseHdlr(buf);
	}
	
	/* 解析Hdlr数据 */
	parseHdlr(buf) {
		console.log("**** 开始解析 moov - trak - mdia - hdlr ****");
		console.log("*** hdlr-size : "+this.size);
		console.log("------------------------------------------------");
		var len = this.size - this.headSize;
		buf = buf.slice(this.headSize, this.headSize+len);
		
		var start = 0;
		var key_len = 0;
		
		start += key_len;
		key_len = 1;
		var data = buf.slice(start, start+key_len);
		var version = data.readUInt8();
		this.version = version;
		
		start += key_len;
		key_len = 3;
		var flags = buf.slice(start, start+key_len).readInt16BE();
		this.flags = flags;
		
		start += key_len;
		key_len = 4;
		var pre_defined  = buf.slice(start, start+key_len);
		this.pre_defined = pre_defined;
		
		start += key_len;
		key_len = 4;
		var handler_type  = buf.slice(start, start+key_len).toString();
		this.handler_type = handler_type;
		var handler_type_desc = "Unknown track";
		if("vide" == handler_type) {
			handler_type_desc = "video track";
		}
		else if("soun" == handler_type) {
			handler_type_desc = "audio track";
		}
		else if("hint" == handler_type) {
			handler_type_desc = "hint track";
		}
		
		start += key_len;
		key_len = 12;
		var reserved  = buf.slice(start, start+key_len);
		this.reserved = reserved;
		
		start += key_len;
		var name  = buf.slice(start, len);
		this.name = name;
		
			console.log("*** hdlr-size              : "+this.size);
			console.log("*** hdlr-version           : "+version);
			console.log("*** hdlr-flags             : "+flags);
			console.log("*** hdlr-handler_type      : "+handler_type+" ("+handler_type_desc+")");
			console.log("*** hdlr-reserved          : "+reserved);
			console.log("*** hdlr-name              : "+name);
			console.log("------------------------------------------------");
		
	}
	
}

module.exports = HDLR;