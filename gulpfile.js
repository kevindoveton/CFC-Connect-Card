/*global require*/
"use strict";

var gulp = require('gulp'),
	path = require('path'),
	pug = require('gulp-pug'),
	prefix = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	pump = require('pump'),
	concat = require('gulp-concat'),
	mainBowerFiles = require('main-bower-files'),
	sourcemaps = require('gulp-sourcemaps');

/*
 * Directories here
 */
var paths = new function() {
	this.base_dist = './build/';
	this.css = this.base_dist + 'css/';
	this.js_dist = this.base_dist + 'js/';
	this.html_dist = this.base_dist;

	this.base_build = './src/views/';
	this.sass = this.base_build + 'sass/';
	this.js_build = this.base_build + 'js/';
	this.pug = this.base_build + 'pug/';
};

gulp.task('js', ['userjs', 'vendorjs']);

gulp.task('userjs', function(cb) {
	// User
	pump([
		gulp.src(paths.js_build + '**/*.js'),
		sourcemaps.init(),
		uglify({
			preserveComments: 'license',
			mangle: false,
			compress: false,
		}),
		concat('dist.js'),
		sourcemaps.write('maps'),
		gulp.dest(paths.js_dist)
	], function(e) {
		if (e !== undefined) {
			console.log(e);
		}
		cb(null);
	});
});

gulp.task('vendorjs', function(cb) {
	console.log(mainBowerFiles({
		paths: {
			bowerDirectory: './bower_components',
			// bowerrc: 'path/for/.bowerrc',
			bowerJson: './bower.json'
		}
	}));
	pump([
		gulp.src(mainBowerFiles()),
		sourcemaps.init(),
		concat('vendor.js'),
		uglify({
			output: {
				beautify: true,
				comments: true
			},
			mangle: false,
			compress: false,
		}),
		sourcemaps.write('maps'),
		gulp.dest(paths.js_dist)
	], function(e) {
		if (e !== undefined) {
			console.log(e);
		}
		cb(null);
	});
	return;

});

/**
 * Compile .scss files into public css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
gulp.task('sass', function (cb) {
	pump([
		gulp.src(paths.sass + '*.sass'),
		sass({
			includePaths: [paths.sass],
			outputStyle: 'compressed'
		}),
		prefix(
			[
				'last 15 versions',
				'> 1%',
				'ie 8',
				'ie 7'
			],
			{
				cascade: true
			}
		),
		gulp.dest(paths.css),
	], function(e) {
		if (e !== undefined) {
			console.log(e);
		}
		cb(null);
	});
	return;
});

gulp.task('pug', function (cb) {
	pump([
		gulp.src([paths.pug + '**/*.pug', '!' + paths.pug + 'includes/*.pug']),
		pug(),
		gulp.dest(paths.html_dist)
	],function(e) {
		if (e !== undefined) {
			console.log(e);
		}
		cb(null);
	});
	return;
});

/**
 * Watch scss files for changes & recompile
 * Watch .pug files run pug-rebuild then reload BrowserSync
 */
gulp.task('watch', function () {
	gulp.watch(paths.sass + '**/*.sass', ['sass']);
	gulp.watch(paths.js_build + '**/*.js', ['userjs']);
	gulp.watch(paths.pug + '**/*.pug', ['pug']);
	gulp.watch('./assets/**/*', ['assets']);
});

// Build task compile sass
gulp.task('build', ['sass', 'js', 'pug', 'assets']);

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['build', 'watch']);

gulp.task('assets', function(cb) {
	pump([
		gulp.src([
			'./assets/**/*.ttf','./assets/**/*.woff?(2)', // fonts
			'./assets/**/*.jpg', './assets/**/*.svg', './assets/**/*.png', './assets/**/*.bmp', './assets/**/*.ico']), // images
		gulp.dest('./static/')
	], function(e) {
		if (e !== undefined) {
			console.log(e);
		}
		cb(null);
	});
})
