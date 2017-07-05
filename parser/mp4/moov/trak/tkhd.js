/**
 * @Type	: Tkhd Box Parser
 * @Module	: Parser Module
 * @Author	: Linxiaozhou
 * @Date	: 2017.07.05
 */


var BufferPool = require("./../../../bufferpool");
var MP4 = require("./../../../mp4");

class TKHD extends MP4 {
	constructor(buf, start) {
		super(buf, start);
		
		this.version 			= null;
		this.flags 				= null;
		this.creation_time 		= null;
		this.modification_time 	= null;
		this.track_id 			= null;
		this.reserved 			= null;
		this.duration 			= null;
		this.reserved1 			= null;
		this.layer 				= null;
		this.alternate_group 	= null;
		this.volume 			= null;
		this.reserved2 			= null;
		this.matrix 			= null;
		this.width 				= null;
		this.height 			= null;
			
		this.parseTkhd(buf);
	}
	
	/* 解析Tkhd数据 */
	parseTkhd(buf) {
		console.log("**** 开始解析 moov - trak - tkhd ****");
		console.log("*** tkhd-size : "+this.size);
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
		var track_id  = BufferPool.GetBufValue(buf.slice(start, start+key_len));
		this.track_id = track_id;
		
		start += key_len;
		key_len = 4;
		var reserved  = buf.slice(start, start+key_len);
		this.reserved = reserved;
		
		start += key_len;
		key_len = 4;
		var duration  = BufferPool.GetBufValue(buf.slice(start, start+key_len));
		this.duration = duration;
		
		start += key_len;
		key_len = 8;
		var reserved1  = buf.slice(start, start+key_len);
		this.reserved1 = reserved1;
		
		start += key_len;
		key_len = 2;
		var layer = buf.slice(start, start+key_len).readInt16BE();
		this.layer = layer;
		
		start += key_len;
		key_len = 2;
		var alternate_group = buf.slice(start, start+key_len).readInt16BE();
		this.alternate_group = alternate_group;
		
		start += key_len;
		key_len = 2;
		var volume = buf.slice(start, start+key_len).readInt16BE();
		this.volume = volume;
		
		start += key_len;
		key_len = 2;
		var reserved2  = buf.slice(start, start+key_len);
		this.reserved2 = reserved2;
		
		start += key_len;
		key_len = 36;
		var matrix = buf.slice(start, start+key_len);
		this.matrix = matrix;
		
		start += key_len;
		key_len = 4;
		var width  = BufferPool.GetBufValue(buf.slice(start, start+key_len));
		this.width = width;
		
		start += key_len;
		key_len = 4;
		var height  = BufferPool.GetBufValue(buf.slice(start, start+key_len));
		this.height = height;
		
			console.log("*** tkhd-size              : "+this.size);
			console.log("*** tkhd-version           : "+version);
			console.log("*** tkhd-flags             : "+flags);
			console.log("*** tkhd-creation_time     : "+creation_time);
			console.log("*** tkhd-modification_time : "+modification_time);
			console.log("*** tkhd-track id          : "+track_id);
			console.log("*** tkhd-reserved          : "+reserved);
			console.log("*** tkhd-duration          : "+duration);
			console.log("*** tkhd-reserved1         : "+reserved1);
			console.log("*** tkhd-layer             : "+layer);
			console.log("*** tkhd-alternate_group   : "+alternate_group);
			console.log("*** tkhd-volume            : "+volume);
			console.log("*** tkhd-reserved2         : "+reserved2);
			console.log("*** tkhd-matrix            : "+matrix);
			console.log("*** tkhd-width             : "+width);
			console.log("*** tkhd-height            : "+height);
			console.log("------------------------------------------------");
		
	}
	
}

module.exports = TKHD;