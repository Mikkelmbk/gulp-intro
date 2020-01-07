var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var connect = require("gulp-connect");
var pug = require("gulp-pug");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var cleanCSS = require("gulp-clean-css");

function scssTask(){
	return gulp.src("src/scss/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass().on("error", sass.logError))
	.pipe(concat('styles.css'))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"));
}

function htmlTask(){
	return gulp.src("src/html/*.pug")
	.pipe(sourcemaps.init())
	.pipe(pug({
		pretty:false,
		doctype:"html",
		locals: { //Variabler
			pageTitle: "Whatever"
		}
		
	}))
	.pipe(rename(function(path){
		if(path.basename != "index"){
			path.dirname = path.basename;
			path.basename = "index";
			path.extname = ".html";
		}
		else{
			path.extname = ".html";
		}
		
	}))
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());

	
}

function watchHTML(){
	return gulp.watch("src/html/*.pug", { ignoreInitial:false }, htmlTask)
}

module.exports = {
	htmlTask,
	watchHTML,
	scssTask
}