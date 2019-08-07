import {src, dest, series, watch} from 'gulp';
import eslint from 'gulp-eslint';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import rename from 'gulp-rename';

const path = {
	watch: './src/**/*.js',
	src: './src/*.js',
	dest: './'
};

function lintTask(done) {
	src(path.watch)
		.pipe(eslint())
		.pipe(eslint.format());

	done();
};

function buildTask(done) {
	src(path.src)
		.pipe(babel())
		.pipe(dest(path.dest))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(dest(path.dest));

	done();
};

function watchTask(done) {
	watch(path.watch, series(lintTask, buildTask));
	done();
}

export const build = buildTask;
export default series(buildTask, watchTask);
