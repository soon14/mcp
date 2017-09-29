import Vue from 'vue';


Vue.filter('json', function (val) {
  return val
})

Vue.filter('capacity',function (sizeOfByte) {
        if (sizeOfByte < 1024) {
            return sizeOfByte + 'B';
        }else if (sizeOfByte >= 1024 && sizeOfByte < 1024 * 1024) {
            return (sizeOfByte / 1024).toFixed(2) + 'KB';
        }else if (sizeOfByte >= 1024 * 1024 && sizeOfByte < 1024 * 1024 * 1024) {
            return (sizeOfByte / (1024 * 1024)).toFixed(2) + 'MB';
        }else if (sizeOfByte >= 1024 * 1024 * 1024) {
            return (sizeOfByte / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
        }
    });
Vue.filter('fileType', function(filename) {
	let fileTypeNum = filename.lastIndexOf(".");
	let fileType = filename.substring(fileTypeNum + 1);
	return fileType
});

Vue.filter('videoType', function(str1,str2,str3) {
	let str = str1;
	if (str2) {
		str = str + "-" + str2;
		if (str3) {
			str = str + "-" + str3;
		}
	}
	return str
});
//秒数转化成时间格式
Vue.filter('videoTime', function(str) {
   let h=0;
   let i=0;
   let s=parseInt(str-1);
    if(s>60){
        i=parseInt(s/60);
        s=parseInt(s%60);
        if(i > 60) {
            h=parseInt(i/60);
            i = parseInt(i%60);
        }
    }
    // 补零
    let zero=function(v){
        return (v>>0)<10?"0"+v:v;
    };
    let result = [zero(h),zero(i),zero(s)].join(":")
    return result;
});

export default Vue;