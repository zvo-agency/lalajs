var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS    = require('gulp-clean-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    include = require('gulp-include'),
    pump = require('pump');

gulp.task('browser-sync', function() {
		browserSync.init({
      proxy: "http://localhost",		
				notify: false
		});
});

// CUSTOMER

gulp.task('scss-customer', function () {
	return gulp.src('customer/src/scss/*.scss')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(cleanCSS())
	.pipe(gulp.dest('customer/app/css/'))
	.pipe(browserSync.stream());
});

gulp.task('js-customer', function() {
	return gulp.src('customer/src/js/main.js')
    .pipe(sourcemaps.init())
    .pipe(include())
      .on('error', console.log)
    .pipe(sourcemaps.write())
		// .pipe(uglify()) 
		.pipe(gulp.dest('customer/app/js/'))
	  .pipe(browserSync.stream());
});

gulp.task('img-customer', function() {
  return gulp.src('customer/src/img/**/*')
     .pipe(gulp.dest('customer/app/img/'))
     .pipe(browserSync.stream());
});

// ADMIN 

gulp.task('scss-admin', function () {
	return gulp.src('admin/src/scss/*.scss')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(cleanCSS())
	.pipe(gulp.dest('admin/app/css/'))
	.pipe(browserSync.stream());
});

gulp.task('js-admin', function() {
	return gulp.src('admin/src/js/main.js')
    .pipe(sourcemaps.init())
    .pipe(include())
      .on('error', console.log)
    .pipe(sourcemaps.write())
	//	 .pipe(uglify()) 
		.pipe(gulp.dest('admin/app/js/'))
	  .pipe(browserSync.stream());
});

gulp.task('img-admin', function() {
  return gulp.src('admin/src/img/**/*')
     .pipe(gulp.dest('admin/app/img/'))
     .pipe(browserSync.stream());
});

// WATCH

gulp.task('watch', function () {
  // CUSTOMER
	gulp.watch('customer/src/scss/**/*.scss', ['scss-customer']);
	gulp.watch('customer/src/js/**/*.js', ['js-customer']);
	gulp.watch('customer/src/img/**/*', ['img-customer']);
  // ADMIN 
	gulp.watch('admin/src/scss/**/*.scss', ['scss-admin']);
	gulp.watch('admin/src/js/**/*.js', ['js-admin']);
	gulp.watch('admin/src/img/**/*', ['img-admin']);
  // ON CHANGE
	gulp.watch('**/*.php').on('change', browserSync.reload);
});

gulp.task('default', ['scss-admin', 'js-admin', 'img-admin', 'scss-customer', 'js-customer', 'img-customer', 'browser-sync', 'watch']);
