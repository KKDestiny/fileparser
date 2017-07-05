/**
 * @Type	: FTYP Box Parser
 * @Module	: Parser Module
 * @Author	: Linxiaozhou
 * @Date	: 2017.07.05
 */


var BufferPool = require("./../bufferpool");
var MP4 = require("./../mp4");

class FTYP extends MP4 {
	constructor(buf, start) {
		super(buf, start);
		
		this.majorBrand = "";
		this.minor_version = 0;
		this.compatible_brands = "";
		
		this.parseFtyp(buf);
	}
	
	/* 解析文件类型box数据 */
	parseFtyp(buf) {
		console.log("**** 开始解析 ftyp ****");
		console.log("------------------------------------------------");
		var len = this.size - this.headSize;
		buf = buf.slice(this.headSize, this.headSize+len);
		this.majorBrand = buf.slice(0, 4).toString();
		this.minor_version = BufferPool.GetBufValue(buf.slice(4, 8));
		var compatible_brands_len = len / 8;
		var compatible_brands = new Array();
		for(var i=0; i<compatible_brands_len; i++) {
			compatible_brands.push(buf.slice(8+i*4, 8+(i+1)*4).toString());
		}
		this.compatible_brands = compatible_brands;
			console.log("*** size             : "+this.size);
			console.log("*** majorBrand       : "+this.majorBrand);
			console.log("*** minor_version    : "+this.minor_version);
			console.log("*** compatible_brands: "+this.compatible_brands);
			console.log("------------------------------------------------");
		
		this.index += this.size;
	}
	
}

module.exports = FTYP;