var fs = require('fs'),
    url = require('url'),
    querystring = require('querystring');
exports.datadir = __dirname + "/data/sites.txt"; // tests will need to override this.
var _storage = JSON.parse(fs.readFileSync( __dirname + '/../data/storage.json', 'utf8'));

exports.handleRequest = function (req, res) {
  var reqUrlPath = url.parse(req.url).pathname,
      resCode = 404,
      bigChunk = '';

  switch (req.method) {
    case 'GET':
      if (req.url === '/' ) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(fs.readFileSync( __dirname + '/public/index.html', 'utf8'));
      } else if (req.url === '/styles.css') {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(fs.readFileSync(__dirname + '/public' + reqUrlPath, 'utf8'));
      } else if (req.url === reqUrlPath) {
        fs.readFile( __dirname + '/../data/sites' + reqUrlPath, 'utf8', function (err, data) {
          if (!err) { resCode = 200; }
          res.writeHead(resCode, {'Content-Type': 'text/html'});
          res.end(data);
        });
      }
      break;
    case 'POST':
      if (req.url === '/' ) {
        req.on('data', function(chunk) { bigChunk += chunk; });
        req.on('end', function(){
          var urlObj = (querystring.parse(bigChunk).url).toString('utf8')+'\n';
          fs.appendFileSync(__dirname+'/../data/sites.txt' , urlObj, 'utf8');
          res.writeHead(302, {'Content-Type': 'text/html'});
          res.end(fs.readFileSync( __dirname + '/public/index.html', 'utf8'));
        });
      }
      break;
  }

};