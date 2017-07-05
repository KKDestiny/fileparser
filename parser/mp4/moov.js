/**
 * @Type	: Moov Box Parser
 * @Module	: Parser Module
 * @Author	: Linxiaozhou
 * @Date	: 2017.07.05
 */


var BufferPool = require("./../bufferpool");
var MP4 = require("./../mp4");
var MVHD = require("./moov/mvhd");
var TRAK = require("./moov/trak");

class MOOV extends MP4 {
	constructor(buf, start) {
		super(buf, start);
		
		this.mvhd_box = null;
		this.trak_box = null;
		
		this.parseMoov(buf);
	}
	
	/* 解析moov数据 */
	parseMoov(buf) {
		console.log("**** 开始解析 moov ****");
		console.log("*** moov-size : "+this.size);
		console.log("------------------------------------------------");
		var len = this.size - this.headSize;
		buf = buf.slice(this.headSize, this.headSize+len);
		
		var Position = 0;
		while(Position < this.size-50) {
			var _buf = buf.slice(Position, Position+50);
			var _mp4 = new MP4(_buf, Position);
			if("mvhd" == _mp4.type) {
				var box_buf = buf.slice(Position, _mp4.size);
				this.mvhd_box = box_buf;
				
				new MVHD(box_buf, 0);
			}
			else if("trak" == _mp4.type) {
				var box_buf = buf.slice(Position, _mp4.size);
				this.trak_box = box_buf;
				new TRAK(box_buf, 0);
			}
			else {
			}
			_mp4.index += _mp4.size;
			
			Position = _mp4.index;
		}
		
		this.index += this.size;
	}
	
}

module.exports = MOOV;