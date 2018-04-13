/*Libraries*/
var util = require('util');
var multer = require('multer');
var fs = require('fs');

var _writeFile = function(dirU, pathU, file, req, res){
  var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        const dir = dirU;
        cb(null, dir);
      },
      filename: function (req, file, cb) {
        const path = pathU;
        cb(null, path);
      }
  });

  var upload = multer({
                  storage: storage
            }).single(file);

  var rezulto = function(err){
     if(err){
       res.status(500).send({message: "Eraro en la servilo", priskribo: err});
       return;
      } else {
        res.status(201).send({message: "Aivorĥ sukcese alŝutita"});
        return;
      }
   }

  fs.exists(dirU, function(exists) {
     if(exists) {
       fs.exists(dirU + '/' + pathU, function(exists) {
        if(exists){
          fs.unlink(dirU + '/' + pathU, function(error) {
              if (error) {
                res.status(500).send({message: "Eraro en la servilo", priskribo: error});
                return;
              }
           upload(req, res, rezulto);
         });
       } else {
            upload(req, res, rezulto);
        }
    });
    } else {
      fs.mkdir(dirU, function(error) {
        if(error) {
          res.status(500).send({message: "Eraro en la servilo", priskribo: error});
          return;
        }
        upload(req, res, rezulto);
      });
    }
  });
}

var _readFile = function(adreso, tipo, res){
    try{
        var bitmap = fs.readFileSync(adreso);
        res.send("data:" + tipo + ";base64," + Buffer(bitmap).toString('base64'));
    }catch (err){
        res.send('No file found');
    }

}

module.exports = {
  writeFile: _writeFile,
  readFile: _readFile
}
