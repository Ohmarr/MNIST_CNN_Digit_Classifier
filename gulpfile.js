'use strict';

// Load plugins;
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

// BrowserSync Initiation
function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: './'
		},
		port: 8080
	});
	done();
}
// BrowserSync Refresh (on update)
function browserSyncReload(done) {
	browsersync.reload();
	done();
}
// Clean Old Assets - Remove previously compiled files before re-compiling
function clean() {
	return del([ './static/', './templates/' ]);
}
// SASS to CSS task
function css() {
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

// Lint JS scripts
function scriptsLint() {
	return gulp
		.src([ './assets/js/**/*.js', './gulpfile.js' ])
		.pipe(plumber())
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
}
// Transpile, concatenate and minify JS scripts
function scripts() {
	return	gulp
		.src([ './assets/js/**/*.js' ])
		.pipe(plumber())
		.pipe(webpackstream(webpackconfig, webpack))
		.pipe(gulp.dest('./static/js/'))
		.pipe(browsersync.stream())
}
// Download Latest Copy of jquery & fontawesome,; 
function copyLibraries() {
	return (
		gulp
			.src('./node_modules/@fortawesome/fontawesome-free/css/**/*')
			.pipe(gulp.dest('./static/css/vendor/fontawesome-free/css')),
		gulp
			.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
			.pipe(gulp.dest('./static/css/vendor/fontawesome-free/webfonts')),
		gulp
			.src('./node_modules/jquery/dist/jquery.min.js')
			.pipe(gulp.dest('./static/js')) // will install the latest version of jquery)
	);
}
// Download Latest Copy of jquery
function copyHtml() {
	return gulp
		.src('./index.html')
		.pipe(gulp.dest('./templates'));
}

// Watch (& Reload) if changes made to files
function watchFiles() {
	gulp.watch('./assets/scss/**/*.scss', css);
	gulp.watch('./assets/js/**/*.js', gulp.series(scriptsLint, scripts));
	gulp.watch('./index.html', browserSyncReload, copyHtml);
}
// define complex tasks
const js = gulp.series(scriptsLint, scripts, copyLibraries);
const build = gulp.series(clean, copyLibraries, copyHtml, gulp.parallel(css, js));
const watch = gulp.series(clean, copyLibraries, copyHtml, css, js, gulp.parallel(watchFiles, browserSync));

// export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;
