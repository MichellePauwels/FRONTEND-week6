var gulp = require('gulp'),
scsslint = require("gulp-scss-lint"),
cssMinifier = require("gulp-minify-css"),
sass = require('gulp-sass'),
sourcemaps = require("gulp-sourcemaps"),
jshint = require("gulp-jshint"),
jsStyLish = require("jshint-stylish"),
uglify = require("gulp-uglify"),
concat = require("gulp-concat"),
notify = require("gulp-notify");

gulp.task("default", function()
{
  var csswatcher = gulp.watch("./src/styles/*.scss", ["css-build"]);
  csswatcher.on("change", function(event)
  {
    console.log("File: " + event.path + " was " + event.typed);
  });

  var jsWatcher = gulp.watch(["./src/config/config.js", "./src/exceptions/**/*.js", "./src/models/**/*.js", "./src/services/**/*.js", "./src/viewmodels/**/*.js", "./src/app.js"], ["js-build"]);
  jsWatcher.on("change", function(event)
  {
    console.log("File: " + event.path + " was " + event.typed);
  });
});

gulp.task("css-build", function()
{
  gulp.src("./src/styles/*.scss")
  //.pipe(scsslint({ "IdSelector" : enable })) zelf schrijven ojee
  .pipe(scsslint()) //eerst scss
  .pipe(sass())
  .pipe(scsslint.failReporter("E"))
  .pipe(sourcemaps.init())
  .pipe(sass({ style: 'expanded' }))
  .pipe(cssMinifier())
  .pipe(concat("main.css"))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest("./src/dist/css"))
  .pipe(notify({ message: "css-build" }))
});

gulp.task("js-build", function()
{
  gulp.src(["./src/config/config.js", "./src/exceptions/**/*.js", "./src/models/**/*.js", "./src/services/**/*.js", "./src/viewmodels/**/*.js", "./src/app.js"])
  .pipe(jshint())
  .pipe(jshint.reporter(jsStyLish))
  .pipe(sourcemaps.init())
  .pipe(concat("app.min.js"))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./src/dist/js'))
  .pipe(notify({message: 'js-build'}))
});
