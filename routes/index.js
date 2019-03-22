var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/submit', function(req, res, next) {
  var id = req.body.ticker;
  res.redirect('/'+id);
});




router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  console.log(id);
  request("https://api.unibit.ai/news/AAPL?interval=1w&AccessKey=demo", function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    var x = JSON.parse(body);
    for(var i = 0; i < x.length; i++) {
      if(parseFloat(x[i].sentiment) >=0.5){
        image="green.png";
      }
      else if(parseFloat(x[i].sentiment)>0 && parseFloat(x[i].sentiment)<0.5){
        image="yellow.png";
      }
      else{
        //x.append(image:image);
        image="red.png";
      }
      x[i]['image'] = image;
    }


    res.render('news',{news:x});
  });


});


module.exports = router;
