// eventually, you'll have some code here that uses the tested helpers
// to actually download the urls you want to download.
var cronJob = require('cron').CronJob;
var htmlFetcher = require('./lib/html-fetcher-helpers.js');



var job = new cronJob('*/1 * * * *', function(){
    var urls = [];
    console.log(__dirname+'/../data/sites.txt');
    htmlFetcher.readUrls(__dirname+'/../data/sites.txt', function(url) {
      urls.push(url);
    });
    console.log(urls);
    htmlFetcher.downloadUrls(urls);
    console.log(new Date());
    return;
  }, function () {
    console.log('job has ended');
  },
  true /* Start the job right now */ /* Time zone of this job. */
);
job.start();