/* jshint esversion: 6 */

const express     = require('express'),
      app         = express(),
      config      = require('config');
      sync        = require('child_process').spawnSync;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.send('openvas-wrapper is listening :) !');
});

app.post('/:cmd', function(req, res) {
    var data    = '',
        name    = '',
        comment = '',
        target  = '',
        format  = '',
        options = ['--pretty-print', '-h', config.get('omp.host'), '--' + req.params.cmd];

    if(req.body.username) {
        options.push('-u');
        options.push(req.body.username);
    }
    if(req.body.password) {
        options.push('-w');
        options.push(req.body.password);
    }
    if(req.body.data) {
        options.push(req.body.data);
    }
    if(req.body.name) {
        options.push('-n');
        options.push(req.body.name);
    }
    if(req.body.comment) {
        options.push('-c');
        options.push(req.body.comment);
    }
    if(req.body.target) {
        options.push('-t');
        options.push(req.body.target);
    }
    if(req.body.format) {
        options.push('-f');
        options.push(req.body.format);
    }

    var omp = sync(config.get('omp.path'), options);

    if(/[a-zA-z0-9]+/.test(omp.stderr)) res.send(omp.stderr);
    res.send(omp.stdout);
});


app.listen(config.get('port'), () =>
    console.log('openvas-wrapper listening on port ' + config.get('port') + ' !')
);
