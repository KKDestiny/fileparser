/**
 * @Type	: MP4 Parser
 * @Module	: Parser Module
 * @Author	: Linxiaozhou
 * @Date	: 2017.07.05
 */


var BufferPool = require("./bufferpool");

class MP4 {
	constructor(buf, start) {
		this.headSize = 8;
		this.size = 0;
		this.type = "";
		this.largeSize = 0;
		this.hasSubBox = true;
		this.index = 0;
		this.end = 0;
		
		this.parseBox(buf, start)
	}
	
	parseBox(buf, start) {
		this.index = start;
		this.headSize = 8;
		if(1 == buf[3]) {
			// largesize
			this.size = BufferPool.GetBufValue(buf.slice(start+8, start+16));
			this.headSize = 16;
		}
		else if(0 == buf[3]) {
			// last box of this file
		}
		else {
			this.size = BufferPool.GetBufValue(buf.slice(0, 4));
		}
		this.type = buf.slice(4, 8).toString();
        this.end = start + this.size;
		/*
			console.log("------------------------------------------------");
			console.log("*** index    : "+this.index);
			console.log("*** size     : "+this.size);
			console.log("*** end      : "+this.end);
			console.log("*** type     : "+this.type);
			console.log("*** headSize : "+this.headSize);
			console.log("------------------------------------------------");
		*/
	}
	
}

module.exports = MP4;