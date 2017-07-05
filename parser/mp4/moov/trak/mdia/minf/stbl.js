/**
 * @Type	: Stbl Box Parser
 * @Module	: Parser Module
 * @Author	: Linxiaozhou
 * @Date	: 2017.07.05
 */


var BufferPool = require("./../../../../../bufferpool");
var MP4 = require("./../../../../../mp4");

class STBL extends MP4 {
	constructor(buf, start) {
		super(buf, start);
		
		this.stsd_box = null;
		this.stts_box = null;
		this.stsz_box = null;
		this.stsc_box = null;
		this.stco_box = null;
		this.co64_box = null;
		this.ctts_box = null;
			
		this.parseStbl(buf);
	}
	
	/* 解析 Stbl 数据 */
	parseStbl(buf) {
		console.log("**** 开始解析 moov - trak - mdia - minf - stbl ****");
		console.log("*** stbl-size : "+this.size);
		console.log("------------------------------------------------");
		var len = this.size - this.headSize;
		buf = buf.slice(this.headSize, this.headSize+len);
		var Position = 0;
			console.log("Position:"+Position+", size:"+this.size+", len:"+len+", buf:"+buf.length)
		while((Position <= this.size-50) && (Position<=buf.length-50) ) {
			var _buf = buf.slice(Position, Position+50);
			var _mp4 = new MP4(_buf, Position);
			
			var box_buf = buf.slice(Position, _mp4.size);
			switch(_mp4.type) {
				case "stsd":
					this.stsd_box = box_buf;
					// new HDLR(box_buf, 0);
					break;
				case "stts":
					this.stts_box = box_buf;
					// new HDLR(box_buf, 0);
					break;
				case "stsz":
					this.stsz_box = box_buf;
					// new HDLR(box_buf, 0);
					break;
				case "stsc":
					this.stsc_box = box_buf;
					// new HDLR(box_buf, 0);
					break;
				case "stco":
					this.stco_box = box_buf;
					// new HDLR(box_buf, 0);
					break;
				case "co64":
					this.co64_box = box_buf;
					// new HDLR(box_buf, 0);
					break;
				case "ctts":
					this.ctts_box = box_buf;
					// new HDLR(box_buf, 0);
					break;
					
				default:
					break;
			}
			_mp4.index += _mp4.size;
			
			Position = _mp4.index;
		}
		
		this.index += this.size;
	}
	
}

module.exports = STBL;