var logger = function(request, response, next) {
	var datetime = new Date();
	console.log();
	console.log(datetime + ':  ' + request.method + ' ' + request.url);
	console.log(request.ip + ': ' + request.headers['user-agent']);

	next();
}

function clone(obj) {
	var copy = {};

	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			copy[prop] = obj[prop];
	}

	return copy;
}

function sendContent(request, response) {
	var page = pages[request.url];
	var pageVars = clone(page.content);

	fs.readFile(__dirname + '/pages/' + page.file, function(err, data) {
		if (err) {
			console.log(err);
			response.status(500).send('Wonderful. Now you\'ve gone and mucked up. Alex will need to fix it now...');
		}

		pageVars.content = data;

		if (!pageVars.styles)
			pageVars.styles = [];

		// response.send(genTemplate(pageVars));
		response.render('template.jade', pageVars);
	})
}

var fs = require('fs');
var jade = require('jade');
var express = require('express');
var express = require('express');

var app = express();
app.use(logger);

var genTemplate = jade.compileFile(__dirname + '/views/template.jade');
var pages = JSON.parse(fs.readFileSync(__dirname + '/pages.json', 'utf-8'));

app.get('/', function(request, response) {
	response.sendFile(__dirname + '/pages/landing.html');
})

app.get('/images/*', function(request, response) {
	response.sendFile(__dirname + request.url);
})

app.get('/styles/*', function(request, response) {
	response.sendFile(__dirname + request.url);
})

app.get('/scripts/*', function(request, response) {
	response.sendFile(__dirname + request.url);
})

app.get('/*', function(request, response) {
	if (!(request.url in pages)) {
		response.status(404).send('Can\'t find that file');

		return;
	}

	sendContent(request, response);
});

app.listen(80, function () {
	console.log('Flight has departed from port 80');
});
