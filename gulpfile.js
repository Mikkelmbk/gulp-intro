var connect = require("gulp-connect");
var { watchHTML, htmlTask, watchLayoutHTML } = require("./tasks/html");
var { jsTask, watchJS } = require("./tasks/js");
var { scssTask, watchSCSS, } = require("./tasks/scss");

function watch(){
	watchHTML();
	watchSCSS();
	watchJS();
	watchLayoutHTML();

	connect.server({
		livereload: true,
		root: "dist",
		port:3000,
	});
}

function build(done){
	htmlTask();
	scssTask();
	jsTask();
	done();
}

exports.default = watch;

exports.build = build;