var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require("multer")
const upload = multer({dest:'public/'})

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
  if(!req.file){
    return res.status(400).send("Error")
  }

  return res
  .status(200)
  .json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })

})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
