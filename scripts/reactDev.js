/*
 * Start react app using a new thread
 */
var args = ['start'];
var opts = { stdio: 'inherit', cwd: 'frontend', shell: true };
require('child_process').spawn('npm', args, opts);
