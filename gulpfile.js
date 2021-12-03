var gulp = require("gulp");
var webserver = require("gulp-webserver");
var gutil = require("gulp-util");
var ftp = require("vinyl-ftp");
var env = require("gulp-env");
var include = require("gulp-html-tag-include");
var clean = require("gulp-clean");

gulp.task("dev", function() {
  gulp.src("./dist").pipe(
    webserver({
      livereload: true,
      open: true
    })
  );
});

gulp.task("html-include", function() {
  return gulp.src("./src/**/*.html").pipe(include()).pipe(gulp.dest("./dist/"));
});

gulp.task("build", function() {
  return gulp.src("./src/**/!(*.html)").pipe(gulp.dest("./dist/"));
});

gulp.task("clean", function() {
  return gulp.src("./dist", { read: false }).pipe(clean());
});

gulp.task(
  "default",
  gulp.parallel("html-include", "build", "dev", function() {
    gulp.watch("./src/**/*.html", gulp.series("html-include"));
    gulp.watch("./src/**/!(*.html)", gulp.series("build"));
  })
);

gulp.task(
  "deploy",
  gulp.series("clean", "html-include", "build", function() {
    // env({ file: ".env.json" });

    gutil.log("FTP_HOST: " + process.env.FTP_HOST);
    gutil.log("FTP_USER: " + process.env.FTP_USER);
    gutil.log("FTP_PASSWORD: " + process.env.FTP_PASSWORD);

    var conn = ftp.create({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      parallel: 2,
      log: gutil.log
    });

    return gulp
      .src("./dist/**/*", { base: "./dist", buffer: false })
      .pipe(conn.newer("/dist")) // only upload newer files
      .pipe(conn.dest("/public_html"));
  })
);
