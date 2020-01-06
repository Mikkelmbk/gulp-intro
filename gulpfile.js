var connect = require("gulp-connect");
var { watchHTML, htmlTask } = require("./tasks/html");

function watch(){
	watchHTML();

	connect.server({
		livereload: true,
		root: "dist",
		port:3000,
	});
}

function build(done){
	htmlTask();
	done();
}

exports.default = watch;

exports.build = build;