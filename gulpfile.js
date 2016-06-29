var gulp = require('gulp'),
	browserSync	= require('browser-sync').create(),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin')
	runsequence = require('run-sequence'),
	del = require('del'),
	uglify = require('gulp-uglify'),
	inlinecss = require('gulp-inline-css');


// development tasks

gulp.task('default',['browserSync'],function(){
	gulp.watch('*.html',browserSync.reload);
	gulp.watch('views/js/*.js',browserSync.reload);
});  

gulp.task('browserSync',function(){
	browserSync.init({
		server :{
			baseDir : './'
		}
	})
});


// production tasks

gulp.task('copy',function(){
	gulp.src('*.html')
		.pipe(gulp.dest('dist/'));
	gulp.src('js/*.js')
		.pipe(gulp.dest('dist/js'));
	gulp.src('views/*.html')
		.pipe(gulp.dest('dist/views'))
});

//inline css

gulp.task('inlineCss',function(){
	gulp.src('*.html')
		.pipe(inlinecss())
		.pipe(gulp.dest('dist'))
});
//minimise javascript
gulp.task('uglify',function(){
	gulp.src('views/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/views/js'));

});

//minify css
gulp.task('minify',function(){
/*	gulp.src('css/*.css')
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css'));
*/	gulp.src('views/css/*.css')
		.pipe(cssnano())
		.pipe(gulp.dest('dist/views/css'));
});

// image optimisation
gulp.task('optimise',function(){
	 gulp.src('img/*.{png,jpg,jpeg,gif}')
  		.pipe(imagemin())
  		.pipe(gulp.dest('dist/img'));

  	gulp.src('views/img/*.{png,jpg,jpeg,gif}')
  		.pipe(imagemin())
  		.pipe(gulp.dest('dist/views/images'));
});

// clears the dist directory
gulp.task('clean-dist',function(){
	return del('dist');
});

//shedules the production tasks to run in a particular order
gulp.task('build',function(callback){
	runsequence('clean-dist','minify','optimise','copy','uglify','inlineCss',callback);
});

