'use strict';
var chalk = require('chalk');
var db = require('./db/models').db;

// Create a node server instance! cOoL!
var server = require('http').createServer(); //Why is this necessary in this case...but not in say, when we use use express?

var createApplication = function () {
    var app = require('./app')(db);
    server.on('request', app); // Attach the Express application. //Need more clarification
    require('./io')(server);   // Attach socket.io.
};

var startServer = function () {

    var PORT = process.env.PORT || 1337;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};

db.sync().then(createApplication).then(startServer).catch(function (err) {
    console.error(chalk.red(err.stack));
    process.kill(1);
});
