var gulp = require("gulp");
var webserver = require("gulp-webserver");
var gutil = require("gulp-util");
var ftp = require("vinyl-ftp");
var env = require("gulp-env");

gulp.task("dev", function() {
    gulp.src("./src")
        .pipe(
            webserver({
                livereload: true,
                open: true
            })
        );
});

gulp.task("deploy", function() {

    env({ file: ".env.json" });

    var conn = ftp.create({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        parallel: 10,
        log: gutil.log
    });

    // using base = "." will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src("README.md", { base: ".", buffer: false })
        .pipe(conn.newer("/src")) // only upload newer files
        .pipe(conn.dest("/public_html/PNF"));

});