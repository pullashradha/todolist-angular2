///////////////////////////////Dependencies & Variables///////////////////////////////
var gulp = require ("gulp");
//Concat & Minify bower & js/css files
var concat = require ("gulp-concat");
var uglify = require ("gulp-uglify");
//Pulls in bower files
var lib = require ("bower-files") ({
  "overrides": {
    "bootstrap": {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});
//Build & Clean Tasks
var utilities = require ("gulp-util");
var buildProduction = utilities.env.production;
var del = require ("del");
//Set up server with watchers and run typescript compiler in the shell
var browserSync = require ("browser-sync").create();
var shell = require ("gulp-shell");
//SASS Dependecies
var sass = require ("gulp-sass");
var sourcemaps = require ("gulp-sourcemaps");

///////////////////////////////TypeScript///////////////////////////////
//Clean
gulp.task ("tsClean", function() {
  return del (["app/*.js", "app/*.js.map"]);
});
//Clean and then compile once. To be called from server and global build
gulp.task ("ts", ["tsClean"], shell.task(["tsc"]));

///////////////////////////////Bower///////////////////////////////
// When adding a new bower dependency: stop the server, always use the "bower install --save" flag
// Run "gulp bower" to build vendor files
// Restart server

gulp.task ("jsBowerClean", function() {
  return del (["./build/js/vendor.min.js"]);
});
gulp.task ("jsBower", ["jsBowerClean"], function() {
  return gulp.src (lib.ext("js").files)
    .pipe (concat("vendor.min.js"))
    .pipe (uglify())
    .pipe (gulp.dest("./build/js"));
});
gulp.task ("cssBowerClean", function() {
  return del (["./build/css/vendor.css"]);
});
gulp.task("cssBower", ["cssBowerClean"], function() {
  return gulp.src(lib.ext("css").files)
    .pipe (concat("vendor.css"))
    .pipe (gulp.dest("./build/css"));
});
gulp.task ("bower", ["jsBower", "cssBower"]);

///////////////////////////////SASS///////////////////////////////
gulp.task ("sassBuild", function() {
  return gulp.src (["resources/styles/*"])
    .pipe (sourcemaps.init())
    .pipe (sass())
    .pipe (sourcemaps.write())
    .pipe (gulp.dest("./build/css"));
});

///////////////////////////////Server///////////////////////////////
gulp.task ("server", function() {
  browserSync.init ({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.watch (["resources/js/*.js"], ["jsBuild"]);
  gulp.watch (["*.html"], ["htmlBuild"]);
  gulp.watch (["resources/styles/*.css", "resources/styles/*.scss"], ["cssBuild"]);
  gulp.watch (["app/*.ts"], ["tsBuild"]);
});
gulp.task ("jsBuild", function() {
  browserSync.reload();
});
gulp.task ("cssBuild", ["sassBuild"], function() {
  browserSync.reload();
});
gulp.task ("tsBuild", ["ts"], function() {
  browserSync.reload();
});
gulp.task ("htmlBuild", function() {
  browserSync.reload();
});

///////////////////////////////Global Build///////////////////////////////
gulp.task ("build", ["ts"], function() {
  gulp.start("bower");
  gulp.start("sassBuild");
});
