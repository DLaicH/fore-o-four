import { gEl, sContent } from './util.js';
import { Ball } from './ball.js';
import { Course } from './course.js';

const main = gEl('main');

const ball = new Ball();
const course = new Course();

sContent([course.el, ball.el])(main);