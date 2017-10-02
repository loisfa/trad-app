var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

/*
var MyClass = require("./my_class.js");
let myClass = new MyClass("a", 2);
console.log(myClass.a);
*/


/*
var excel2Json = require('node-excel-to-json');
excel2Json('excel/essai.xls', function(err, output) {

  if (err) {
    console.log(err);
  } else {
    console.log("output");
    console.log(output);
  }
});*/

var xlsx = require('node-xlsx');
// Or var xlsx = require('node-xlsx').default;

/*
// Parse a buffer
const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/myFile.xlsx`));
*/
// Parse a file
const workSheetsFromFile = xlsx.parse(`excel/clean_list.xlsx`);
/*
for(item in workSheetsFromFile[0].data) {
  console.log(workSheetsFromFile[0].data[item]);
}
*/

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = /*process.env.PORT ||*/ 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


// more routes for our API will happen here

router.route('/try')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .get(function(req, res) {
      res.json({message: 'got API try GET'});
    });

router.route('/upload')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .get(function(req, res) {
      res.json({message: 'got API UPLOAD'});
      console.log('upload');
    })
    .post(upload.any(), function(req, res) {
      console.log('upload post');
      console.log(req.files);
      let filename = req.files[0].filename;
      const workSheetsFromFile2 = xlsx.parse('uploads/'+filename);
      /*
      for(item in workSheetsFromFile2[0].data) {
        console.log(workSheetsFromFile2[0].data[item]);
      }
      */
      console.log('workSheetsFromFile2 ---');
      console.log(workSheetsFromFile2);
      var WordTranslator = require("./server/wordTranslator.js");
      console.log(workSheetsFromFile2[0].data);
      listWords = workSheetsFromFile2[0].data;
      let wt = new WordTranslator(listWords);
      res.json({header: 'got POST API UPLOAD',
        data: wt.wordNTranslations
      });

    });

/*
let testList = [
  ["motA", "wordA1/wordA2"],
  ["motA", "wordAC"],
  ["motB", "wordB1, wordB2/wordB3/wordB4"],
  ["motC", "wordAC"]
];
for(let index in wt.wordNTranslations) {
  let wordNTrans = wt.wordNTranslations[index];
  console.log(wordNTrans.word);
  console.log(wordNTrans.list_trans);
}
console.log("json ---");
console.log(wt.wordNTranslations);
*/


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server listening on port ' + port);
