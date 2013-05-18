var httpGet = require('http-get'),
    fs = require('fs');

exports.readUrls = function(filePath, callback){
  var urls = fs.readFileSync(filePath, 'utf8');
  urls = urls.split('\n');
  urls.forEach(function(url) {
    callback(url);
  });
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