/**
 * @Type	: TRAK Box Parser
 * @Module	: Parser Module
 * @Author	: Linxiaozhou
 * @Date	: 2017.07.05
 */


var BufferPool = require("./../../bufferpool");
var MP4 = require("./../../mp4");
var TKHD = require("./trak/tkhd");
var MDIA = require("./trak/mdia");

class TRAK extends MP4 {
	constructor(buf, start) {
		super(buf, start);
		
		this.tkhd_box = null;
		this.mdia_box = null;
		
		this.parseTrak(buf);
	}
	
	/* 解析 trak */
	parseTrak(buf) {
		console.log("**** 开始解析 moov - trak ****");
		console.log("*** trak-size : "+this.size);
		console.log("------------------------------------------------");
		var len = this.size - this.headSize;
		buf = buf.slice(this.headSize, this.headSize+len);
		
		var Position = 0;
		while(Position < this.size-50) {
			var _buf = buf.slice(Position, Position+50);
			var _mp4 = new MP4(_buf, Position);
			if("tkhd" == _mp4.type) {
				var box_buf = buf.slice(Position, _mp4.size);
				this.tkhd_box = box_buf;
				
				new TKHD(box_buf, 0);
			}
			else if("mdia" == _mp4.type) {
				var box_buf = buf.slice(Position, _mp4.size);
				this.mdia_box = box_buf;
				
				new MDIA(box_buf, 0);
			}
			else {
			}
			_mp4.index += _mp4.size;
			
			Position = _mp4.index;
		}
		
		this.index += this.size;
	}
	
}

module.exports = TRAK;