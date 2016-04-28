/**
 * Created by ramon on 4/26/16.
 */

import {exec} from 'child_process';
import {ChildProcess} from "child_process";

import * as gulp from 'gulp';

var serverProcess: ChildProcess = null;

gulp.task('watch', () => {
  gulp.watch(['src/**/*.ts', 'gulpfile.ts'], ['serve.dev'])
});

gulp.task('serve.dev', function(done: any) {
  if (serverProcess) {
    serverProcess.kill();
  }
  
  serverProcess = exec(`ts-node src/app.ts`, function(err: Error, stdout: string, stderr: string) {
    console.log('End server: ', stdout, stderr);
  });
  
  serverProcess.stdout.pipe(process.stdout);
  serverProcess.stderr.pipe(process.stderr);
  
  return done();
});

gulp.task('default', ['serve.dev', 'watch']);