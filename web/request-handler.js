var fs = require('fs'),
    url = require('url'),
    querystring = require('querystring');
exports.datadir = __dirname + "/data/sites.txt"; // tests will need to override this.

exports.handleRequest = function (req, res) {
  var rootUrl = 'http://127.0.0.1:8080',
      reqUrlPath = url.parse(req.url).pathname,
      resCode = 404;

  if (req.method === 'GET') {



    if (req.url === rootUrl+'/' ) {
      fs.readFile( __dirname + '/public/index.html', 'utf8', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    } else if (req.url === rootUrl+reqUrlPath ) {
      fs.readFile( __dirname + '/../data/sites' + reqUrlPath, 'utf8', function (err, data) {
        if (!err) { resCode = 200; }
        res.writeHead(resCode, {'Content-Type': 'text/html'});
        res.end(data);
      });
    }



  } else if (req.method === 'POST') {



    if (req.url === rootUrl + '/' ) {
      var bigChunk = '';
      req.on('data', function(chunk) {
        bigChunk += chunk;
      });
      req.on('end', function(){
        var urlObj = (querystring.parse(bigChunk).url).toString('utf8');
        fs.appendFileSync(exports.datadir , urlObj+'\n', 'utf8');
        console.log('url data was appeneded');
        res.writeHead(302, {'Content-Type': 'text/plain'});
        res.end();
      });
    }


  }
};
