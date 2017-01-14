/**
 * Created by laixiangran on 2016/1/13.
 */

var gulp = require("gulp");

gulp.task("generate", function() {
    return gulp.src("public/index.html")
        .pipe(gulp.dest("public/home"));
});

gulp.task("deploy", function() {
    gulp.start("moveIndex", "movePage");
});

gulp.task("moveIndex", function() {
    return gulp.src("public/CDN/index.html")
        .pipe(gulp.dest("public"));
});

gulp.task("movePage", function() {
    return gulp.src("public/page/**/*")
        .pipe(gulp.dest("public/home/page"));
});

gulp.task("watch", function() {
    gulp.watch("public/index.html", ["generate"]);
});

gulp.task("default", function() {
    gulp.start("watch");
});