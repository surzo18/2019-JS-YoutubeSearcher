import {pageRunner} from './pageRunner.js';
import {formValidator} from './formValidator.js';

/*WINDOW VARS */
window.pageRunner = pageRunner;
window.formValidator = formValidator;

/*Run Modules */
pageRunner.initRunner();