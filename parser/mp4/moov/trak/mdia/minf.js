/**
 * @Type	: Minf Box Parser
 * @Module	: Parser Module
 * @Author	: Linxiaozhou
 * @Date	: 2017.07.05
 */


var BufferPool = require("./../../../../bufferpool");
var MP4 = require("./../../../../mp4");
var STBL = require("./minf/stbl");

class MINF extends MP4 {
	constructor(buf, start) {
		super(buf, start);
		
		this.stbl_box = null;
		
		this.parseMinf(buf);
	}
	
	/* 解析 minf 数据 */
	parseMinf(buf) {
		console.log("**** 开始解析 moov - trak - mdia - minf ****");
		console.log("*** minf-size : "+this.size);
		console.log("------------------------------------------------");
		var len = this.size - this.headSize;
		buf = buf.slice(this.headSize, this.headSize+len);
		
		var Position = 0;
		while((Position < this.size-50) && (Position<=buf.length-50)) {
			var _buf = buf.slice(Position, Position+50);
			var _mp4 = new MP4(_buf, Position);
			if("stbl" == _mp4.type) {
				var box_buf = buf.slice(Position, _mp4.size);
				this.stbl_box = box_buf;
				new STBL(box_buf, 0);
			}
			else {
			}
			_mp4.index += _mp4.size;
			
			Position = _mp4.index;
		}
		
		this.index += this.size;
	}
	
}

module.exports = MINF;