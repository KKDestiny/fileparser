/**
 * @Type	: Mdhd Box Parser
 * @Module	: Parser Module
 * @Author	: Linxiaozhou
 * @Date	: 2017.07.05
 */


var BufferPool = require("./../../../../bufferpool");
var MP4 = require("./../../../../mp4");

class MDHD extends MP4 {
	constructor(buf, start) {
		super(buf, start);
		
		this.version 			= null;
		this.flags 				= null;
		this.creation_time 		= null;
		this.modification_time 	= null;
		this.time_scale 		= null;
		this.duration 			= null;
		this.language 			= null;
		this.pre_defined 		= null;
			
		this.parseMdhd(buf);
	}
	
	/* 解析Mdhd数据 */
	parseMdhd(buf) {
		console.log("**** 开始解析 moov - trak - mdia - mdhd ****");
		console.log("*** mdhd-size : "+this.size);
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
		var creation_time = BufferPool.GetBufValue(buf.slice(start, start+key_len));
		creation_time = new Date().CalDate(creation_time);
		this.creation_time = creation_time;
		
		start += key_len;
		key_len = 4;
		var modification_time  = BufferPool.GetBufValue(buf.slice(start, start+key_len));
		modification_time = new Date().CalDate(modification_time);
		this.modification_time = modification_time;
		
		start += key_len;
		key_len = 4;
		var time_scale  = BufferPool.GetBufValue(buf.slice(start, start+key_len));
		this.time_scale = time_scale;
		
		start += key_len;
		key_len = 4;
		var duration  = BufferPool.GetBufValue(buf.slice(start, start+key_len));
		this.duration = duration;
		
		start += key_len;
		key_len = 2;
		var language  = buf.slice(start, start+key_len);
		this.language = language;
		
		start += key_len;
		key_len = 2;
		var pre_defined  = buf.slice(start, start+key_len);
		this.pre_defined = pre_defined;
		
			console.log("*** mdhd-size              : "+this.size);
			console.log("*** mdhd-version           : "+version);
			console.log("*** mdhd-flags             : "+flags);
			console.log("*** mdhd-creation_time     : "+creation_time);
			console.log("*** mdhd-modification_time : "+modification_time);
			console.log("*** mdhd-time_scale        : "+time_scale);
			console.log("*** mdhd-duration          : "+duration+" ("+parseInt(duration / time_scale)+"s)");
			console.log("*** mdhd-language          : "+language);
			console.log("*** mdhd-pre_defined       : "+pre_defined);
			console.log("------------------------------------------------");
		
	}
	
}

module.exports = MDHD;