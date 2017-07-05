/**
 * @Type	: Router
 * @Module	: Index Module
 * @Author	: Linxiaozhou
 * @Date	: 2017.07.04
 */


var express = require('express');
var router = express.Router();

// File System Module
var fs = require("fs");

// load BufferPool
var BufferPool = require("../parser/bufferpool");
// load MP4 Parser
var MP4 = require("../parser/mp4");
var FTYP = require("../parser/mp4/ftyp");
var MOOV = require("../parser/mp4/moov");


Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

Date.prototype.CalDate = function (seconds) { 
    function isLeapYear(year) {
		var cond1 = year % 4 == 0;  //条件1：年份必须要能被4整除
		var cond2 = year % 100 != 0;  //条件2：年份不能是整百数
		var cond3 = year % 400 ==0;  //条件3：年份是400的倍数
		var cond = cond1 && cond2 || cond3;
		if(cond) {
			return true;
		} else {
			return false;
		}
	}
    function days_year(year) {
		var isleap = isLeapYear(year);
		if(isleap) {
			return 366
		}
		else {
			return 365
		}
	}
    function days_month(isleap, month) {
		if(month >= 12) {return 0;}
		var d = [31,28,31,30,31,30,31,31,30,31,30,31];
		var leapd = [31,29,31,30,31,30,31,31,30,31,30,31];
		var arr = d;
		if(isleap) {
			arr = leapd;
		}
		return arr[month]
	}
	var year = 1904;
	var month = 0;
	var _seconds = 0;
	var yflag = true;
	while(yflag) {
		var days = days_year(year);
		var sec = days * 24 * 60 * 60;
		if((_seconds+sec) >= seconds) {
			yflag = false;
		}
		else {
			year += 1;
			_seconds += sec;
		}
	}
	//console.log(year)
	
	var left_sec = seconds - _seconds;
	var isleap = isLeapYear(year);
	var _seconds2 = 0;
	for(var i=0; i<12; i++) {
		var days = days_month(isleap, i);
		var sec = days * 24 * 60 * 60;
		if((_seconds2+sec) >= left_sec) {
			month = i;
			break;
		}
		else {
			_seconds2 += sec;
		}
	}
	//console.log(month)
	
	var left_sec = left_sec - _seconds2;
	var least_days = Math.floor(left_sec / 60 / 60 / 24)
	//console.log(least_days)
	
	var left = left_sec - least_days * 60 * 60 * 24;
	var hour = Math.floor(left / 60 / 60)
	//console.log(hour)
	
	var left = left - hour * 60 * 60;
	var min = Math.floor(left / 60)
	//console.log(min)
	
	var sec = left - min * 60;
	//console.log(sec)
	
	return new Date(year+"/"+(month+1)+"/"+least_days+" "+hour+":"+min+":"+sec).Format("yyyy-MM-dd hh:mm")
}



/* GET home page. */
router.get('/', function(req, res, next) {
	
	var fielname = "./amelia.mp4";
	fs.open(fielname, 'r+', function(err, fd) {
		if (err) {
			return console.error(err);
		}
		var stats = fs.statSync(fielname);
		var filesize = stats.size
		console.log("------------------------------------------------");
		console.log("开始解析文件["+fielname+"]，文件大小: "+filesize);
		console.log("------------------------------------------------");
		
		var Position = 0;
		while(Position < filesize-50) {
			var buf = BufferPool.readSync(fd, Position, 50);
			var mp4 = new MP4(buf, Position);
			var box_buf = BufferPool.readSync(fd, Position, mp4.size);
			if("ftyp" == mp4.type) {
				var ftyp = new FTYP(box_buf, 0);
			}
			else if("moov" == mp4.type) {
				var moov = new MOOV(box_buf, 0);
			}
			else if("mdat" == mp4.type) {
				console.log("**** 开始解析 "+mp4.type+" ****");
				console.log("------------------------------------------------");
				mdat = new MP4(buf, Position);
			}
			else {
				console.log("**** 开始解析 "+mp4.type+" ****");
				console.log("------------------------------------------------");
			}
			mp4.index += mp4.size;
			
			Position = mp4.index;
		}
		console.log("**** 文件解析完成！！！ ****");
		console.log("------------------------------------------------");
		
		// 汇总
		console.log("------------------------------------------------");
		console.log("**** ftyp ****");
		console.log("**** start:0, end:"+(0+ftyp.size)+" ****");
		console.log("------------------------------------------------");
		console.log("**** moov ****");
		console.log("**** start:"+ftyp.size+", end:"+(ftyp.size+moov.size)+" ****");
		console.log("------------------------------------------------");
		console.log("**** mdat ****");
		console.log("**** start:"+(ftyp.size+moov.size)+", end:"+(ftyp.size+moov.size+mdat.size)+" ****");
		console.log("------------------------------------------------");
		
		

		// 调试
		/*
		var buf = BufferPool.readSync(fd, 0, 5000);
		if(buf.length > 0){
			console.log(buf.slice(0, buf.length).toJSON());
			
			// Write
			fs.writeFile('./mp4.bin', buf, function(err){
				console.log(err);
				
				Stop = true;
			})
		}
		*/
	});
	
	res.render('index', { title: 'Express' });
});

module.exports = router;
