var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors       = require('cors')
var xlsx       = require('node-xlsx');
var WordTranslator = require("./server/wordTranslator.js");
var path       = require('path');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//app.use(cors());
app.use('/api/upload', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api', router);

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


router.route('/upload')
    .post(upload.any(), function(req, res) {
      console.log('upload post ---');
      console.log("req.files");
      console.log(req.files);

      let filename = req.files[0].filename;
      const workSheetsFromFile = xlsx.parse('uploads/'+filename);
      listWords = workSheetsFromFile[0].data;
      let wt = new WordTranslator(listWords);
      res.json({header: 'got POST API UPLOAD',
        data: wt.wordNTranslations
      });
    });




// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server listening on port ' + port);
