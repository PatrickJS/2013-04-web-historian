// eventually, you'll have some code here that uses the tested helpers
// to actually download the urls you want to download.
var htmlFetcher = require('./lib/html-fetcher-helper');

var urls = htmlFetcher.readUrls(__dirname+'/../data/sites/sites.txt');
htmlFetcher.download(urls);