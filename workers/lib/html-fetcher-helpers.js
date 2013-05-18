var httpGet = require('http-get'),
    fs = require('fs');

exports.readUrls = function(filePath, callback){
  var urls = [];
  fs.readFile(filePath, 'utf8', function(err, data) {
    var arr = data.split('\n');
    for (var i = 0, l = arr.length; i < l; i++) {
      if (callback) callback(arr[i]);
      urls.push(arr[i]);
    }
  });
  return urls;
};


exports.downloadUrls = function(urls){
  var yolo = true;
  urls.forEach(function(url) {
    httpGet.get(url, __dirname+'/../../data/sites/'+url, function(err, result) {
      if (err) { console.log(err); yolo = false;}
      else {
        console.log('url downloaded to :', result.file);
      }
    });
  });
  return yolo;
};