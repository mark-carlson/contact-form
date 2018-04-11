/*
 * Add proxy to express server after create-react-app completes
 */
var fs = require('fs');
var chalk = require('chalk');

fs.readFile('./frontend/package.json', 'utf8', function(err, data) {
  if (err) throw err;
  var obj = JSON.parse(data);
  obj.proxy = 'http://localhost:4000';
  fs.writeFile(
    './frontend/package.json',
    JSON.stringify(obj, null, '\t'),
    'utf8',
    function(err, data) {
      if (err) throw err;
      console.log(
        chalk.yellow('Express proxy has been added to create-react-app.')
      );
    }
  );
});
