/**
 * Created by wenZerrrrrr on 2017/9/21.
 */
/* eslint-disable no-unused-vars */
export default {
  formatDate: (str) => {
    var a = new Date(str);
    var year = a.getFullYear(); // 年
    var month = a.getMonth() + 1; // 月
    month = month < 10 ? '0' + month : month;
    var day = a.getDate(); // 日
    day = day < 10 ? '0' + day : day;
    var hour = a.getHours(); // 小时
    hour = hour < 10 ? '0' + hour : hour;
    var min = a.getMinutes(); // 分钟
    min = min < 10 ? '0' + min : min;
    var sec = a.getSeconds(); // 秒
    sec = sec < 10 ? '0' + sec : sec;
    let formatData = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
    formatData = formatData.toString();
    return formatData;
  },
  formatJSON: (json, options) => {
    // debugger
    var reg = null,
      formatted = '',
      pad = 0,
      PADDING = '    ';
    options = options || {};
    options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
    options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
    if (typeof json !== 'string') {
      json = JSON.stringify(json);
    } else {
      json = JSON.parse(json);
      json = JSON.stringify(json);
    }
    reg = /([\{\}])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /([\[\]])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /(\,)/g;
    json = json.replace(reg, '$1\r\n');
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');
    reg = /\r\n\,/g;
    json = json.replace(reg, ',');
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
      reg = /\:\r\n\{/g;
      json = json.replace(reg, ':{');
      reg = /\:\r\n\[/g;
      json = json.replace(reg, ':[');
    }
    if (options.spaceAfterColon) {
      reg = /\:/g;
      json = json.replace(reg, ':');
    }
    (json.split('\r\n')).forEach(function (node, index) {
      var i = 0,
        indent = 0,
        padding = '';

      if (node.match(/\{$/) || node.match(/\[$/)) {
        indent = 1;
      } else if (node.match(/\}/) || node.match(/\]/)) {
        if (pad !== 0) {
          pad -= 1;
        }
      } else {
        indent = 0;
      }

      for (i = 0; i < pad; i++) {
        padding += PADDING;
      }
      formatted += padding + node + '\r\n';
      pad += indent;
    }
    );
    return formatted;
  }
};
