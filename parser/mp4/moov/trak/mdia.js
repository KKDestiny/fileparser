/**
 * @Type	: Mdia Box Parser
 * @Module	: Parser Module
 * @Author	: Linxiaozhou
 * @Date	: 2017.07.05
 */


var BufferPool = require("./../../../bufferpool");
var MP4 = require("./../../../mp4");
var MDHD = require("./mdia/mdhd");
var HDLR = require("./mdia/hdlr");
var MINF = require("./mdia/minf");

class MDIA extends MP4 {
	constructor(buf, start) {
		super(buf, start);
		
		this.mdhd_box = null;
		this.hdlr_box = null;
		
		this.parseMdia(buf);
	}
	
	/* 解析 mdia 数据 */
	parseMdia(buf) {
		console.log("**** 开始解析 moov - trak - mdia ****");
		console.log("*** mdia-size : "+this.size);
		console.log("------------------------------------------------");
		var len = this.size - this.headSize;
		buf = buf.slice(this.headSize, this.headSize+len);
		
		var Position = 0;
		while(Position < this.size-50) {
			var _buf = buf.slice(Position, Position+50);
			var _mp4 = new MP4(_buf, Position);
				
			if("mdhd" == _mp4.type) {
				var box_buf = buf.slice(Position, _mp4.size);
				this.mvhd_box = box_buf;
				
				new MDHD(box_buf, 0);
			}
			else if("hdlr" == _mp4.type) {
				var box_buf = buf.slice(Position, _mp4.size);
				this.hdlr_box = box_buf;
				
				new HDLR(box_buf, 0);
			}
			else if("minf" == _mp4.type) {
				var box_buf = buf.slice(Position, _mp4.size);
				this.hdlr_box = box_buf;
				
				new MINF(box_buf, 0);
			}
			else {
			}
			_mp4.index += _mp4.size;
			
			Position = _mp4.index;
		}
		
		this.index += this.size;
	}
	
}

module.exports = MDIA;