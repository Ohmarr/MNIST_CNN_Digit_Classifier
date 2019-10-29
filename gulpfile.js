'use strict';

/* –––––––––––––––––––– * Load plugins * –––––––––––––––––––– */  
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync').create();
const cssnano = require('cssnano');
const del = require('del');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const webpack = require('webpack');
const webpackconfig = require('./webpack.config.js');
const webpackstream = require('webpack-stream');

/* –––––––––––––––––––– * Task Definitions * –––––––––––––––––––– */  
function browserSync(done) {
	/** 
	 * Initiate BrowserSync
	 **/
	browsersync.init({
		server: {
			baseDir: './'
		},
		port: 8080
	});
	done();
}

function browserSyncReload(done) {
	/** 
	 * Browser Refresh When Updates Deteceted
	 **/
	browsersync.reload();
	done();
}

function cleanDirectories() {
	/** 
	 * Clean Old Assets - Remove previously compiled files before re-compiling
	 **/
	return del([ './static/', './templates/' ]);
}


function cssTasks() {
	/** 
	 * Process scss & convert to css; 
	 **/
	return gulp
		.src('./assets/scss/**/*.scss')
		.pipe(plumber())
		.pipe(sass({ outputStyle: 'expanded' })) // converts into static css;
		.pipe(gulp.dest('./static/css/'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(postcss([ autoprefixer(), cssnano() ]))
		.pipe(gulp.dest('./static/css/'))
		.pipe(browsersync.stream());
}

function scriptsLint() {
	/** 
	 * Linting JS scripts;
	 **/
	return gulp
		.src([ './assets/js/**/*.js', './gulpfile.js' ])
		.pipe(plumber())
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
}

function scriptsPrep() {
	/** 
	 * Transpile, Concatenate & Minify javaScript scripts; 
	 **/
	return gulp
		.src([ './assets/js/**/*.js' ])
		.pipe(plumber())
		.pipe(webpackstream(webpackconfig, webpack))
		.pipe(gulp.dest('./static/js/'))
		.pipe(browsersync.stream());
}

function copyLibraries() {
	/** 
	 * Task Copies Latest jquery & fontawesome packages; 
	 **/
	return (
		gulp
			.src('./node_modules/@fortawesome/fontawesome-free/css/**/*')
			.pipe(gulp
				.dest('./static/css/vendor/fontawesome-free/css')),
		gulp
			.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
			.pipe(gulp
				.dest('./static/css/vendor/fontawesome-free/webfonts')),
		gulp
			.src('./node_modules/jquery/dist/jquery.min.js')
			.pipe(gulp
				.dest('./static/js'))
	);
}

function copyHtml() {
	/** task makes a copy of 'index.html' to 'templates directory'
	 * this is needed for Flask to run
	 **/
	return gulp
		.src('./index.html')
		.pipe(gulp
			.dest('./templates'));
}

function watchFiles() {
	/** 
	 * Watch (& Reload) if changes made to files
	 **/
	gulp.watch('./assets/scss/**/*.scss', cssTasks);
	gulp.watch('./assets/js/**/*.js', gulp.series(scriptsLint, scriptsPrep));
	gulp.watch('./index.html', browserSyncReload, copyHtml);
}

/* –––––––––––––––––––– * COMPLEX TASKS & EXPORTS * –––––––––––––––––––– */  

// define complex tasks
const javaScriptTasks = gulp.series(scriptsLint, scriptsPrep, copyLibraries);
const build = gulp.series(cleanDirectories, copyLibraries, copyHtml, gulp.parallel(cssTasks, javaScriptTasks));
const watch = gulp.series(cleanDirectories, copyLibraries, copyHtml, cssTasks, javaScriptTasks, gulp.parallel(watchFiles, browserSync));

// export tasks
exports.css = cssTasks;
exports.js = javaScriptTasks;
exports.clean = cleanDirectories;
exports.build = build;
exports.watch = watch;

exports.default = build;
