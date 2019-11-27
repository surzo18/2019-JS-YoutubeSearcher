import {pageRunner} from './pageRunner.js';
import {youtubeApi} from './youtubeApi.js';
import {chartRunner} from "./chartRunner.js";

/*WINDOW VARS */
window.chartRunner = chartRunner;
window.pageRunner = pageRunner;
window.youtubeApi = youtubeApi;

/*Run Modules */
pageRunner.initRunner();