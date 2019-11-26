import {pageRunner} from './pageRunner.js';
import {youtubeApi} from './youtubeApi.js';

/*WINDOW VARS */
window.pageRunner = pageRunner;
window.youtubeApi = youtubeApi;

/*Run Modules */
pageRunner.initRunner();