/**
 * @Type	: Mvhd Box Parser
 * @Module	: Parser Module
 * @Author	: Linxiaozhou
 * @Date	: 2017.07.05
 */


var BufferPool = require("./../../bufferpool");
var MP4 = require("./../../mp4");

class MVHD extends MP4 {
	constructor(buf, start) {
		super(buf, start);
		
		this.version 			= null;
		this.flags 				= null;
		this.creation_time 		= null;
		this.modification_time 	= null;
		this.time_scale 		= null;
		this.duration 			= null;
		this.rate 				= null;
		this.volume 			= null;
		this.reserved 			= null;
		this.matrix 			= null;
		this.pre_defined 		= null;
		this.next_track_id 		= null;
			
		this.parseMvhd(buf);
	}
	
	/* 解析moov数据 */
	parseMvhd(buf) {
		console.log("**** 开始解析 moov - mvhd ****");
		console.log("*** mvhd-size : "+this.size);
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
		key_len = 4;
		var rate  = BufferPool.GetBufValue(buf.slice(start, start+key_len));
		this.rate = rate;
		
		start += key_len;
		key_len = 2;
		var volume = buf.slice(start, start+key_len).readInt16BE();
		this.volume = volume;
		
		start += key_len;
		key_len = 10;
		var reserved = buf.slice(start, start+key_len);
		this.reserved = reserved;
		
		start += key_len;
		key_len = 36;
		var matrix = buf.slice(start, start+key_len);
		this.matrix = matrix;
		
		start += key_len;
		key_len = 24;
		var pre_defined = buf.slice(start, start+key_len);
		this.pre_defined = pre_defined;
		
		start += key_len;
		key_len = 4;
		var next_track_id  = BufferPool.GetBufValue(buf.slice(start, start+key_len));
		this.next_track_id = next_track_id;
		
			console.log("*** mvhd-size              : "+this.size);
			console.log("*** mvhd-version           : "+version);
			console.log("*** mvhd-flags             : "+flags);
			console.log("*** mvhd-creation_time     : "+creation_time);
			console.log("*** mvhd-modification_time : "+modification_time);
			console.log("*** mvhd-time_scale        : "+time_scale);
			console.log("*** mvhd-duration          : "+duration+" ("+parseInt(duration / time_scale)+"s)");
			console.log("*** mvhd-rate              : "+rate);
			console.log("*** mvhd-volume            : "+volume);
			console.log("*** mvhd-reserved          : "+reserved);
			console.log("*** mvhd-matrix            : "+matrix);
			console.log("*** mvhd-pre_defined       : "+pre_defined);
			console.log("*** mvhd-next_track_id     : "+next_track_id);
			console.log("------------------------------------------------");
		
	}
	
}

module.exports = MVHD;