//Modules
const app = require('./app').app
const PORT = process.env.PORT || 3000;
var db  = require('./modules/db');

// Start the server
app.listen(PORT, () => {
  console.log(`La API aŭskultas ĉe la pordo ${PORT}`);
  console.log('Presu Ctrl+C por ĉesi.');
  setInterval(function () {
      db.mysqlExec('SELECT 1');
  }, 5000);
});
