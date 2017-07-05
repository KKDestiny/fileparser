/**
 * @Type	: Buffer Pool
 * @Module	: Parser Module
 * @Author	: Linxiaozhou
 * @Date	: 2017.07.05
 */


var fs = require("fs");

var BufferPool = function(){};


BufferPool.readSync = function(fd, position, size) {
	var buf = new Buffer(size);
	var rest = fs.readSync(fd, buf, 0, buf.length, position);
	//console.log("从第["+position+"]个字节开始，读取了["+rest+"]个字节");
	return buf
}
BufferPool.GetBufValue = function(buf) {
	return buf.readUInt32BE();
}


module.exports = BufferPool;