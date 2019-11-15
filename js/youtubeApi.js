import {formValidator} from './formValidator.js';
import {pageRunner} from './pageRunner.js';
import {htmlBuilder} from "./htmlBuilder.js";

export const youtubeApi = function() {

    /** Api Key for youtube **/
    const APIkey = "AIzaSyBknkksnmSstFltBx_QBlYuDNKp6aS95Ck";
    /** baseURI for youtube search **/
    const  BASE_URI = "https://www.googleapis.com/youtube/v3/search?";

    let oldData = {};
    let nextPageToken = '';
    let prevPageToken = '';
    let currentPageToken = '';
    /**
     * Submit youtube form on page
     */
    function submitYoutubeForm(){
        document.getElementById('query-input').style['border-color'] = '#ced4da';
        document.getElementById('error-text').style['display'] = 'none';

        let loader = pageRunner.getLoader();
        pageRunner.toggleElementVisibylity(loader);

        let form = document.getElementById('youtubeForm');
        let data = formValidator.validateInputs(form);
        clearResultList();

        if(data === false){
            showErrorSearch();
            return;
        }

        let URL = makeURL(data);
        requestData(URL);

    };

    /**
     * Get Next page
     */
    function getNextPage(){
        document.getElementById('query-input').style['border-color'] = '#ced4da';
        document.getElementById('error-text').style['display'] = 'none';

        let loader = pageRunner.getLoader();
        pageRunner.toggleElementVisibylity(loader);

        pageRunner.topFunction();
        setTimeout(function () {
            clearResultList();
            let URL = makeURL(oldData,nextPageToken);
            currentPageToken = nextPageToken;
            requestData(URL);
        },1000);
    }

    /**
     * GetPrev Page
     */
    function getPrevPage(){
        document.getElementById('query-input').style['border-color'] = '#ced4da';
        document.getElementById('error-text').style['display'] = 'none';

        let loader = pageRunner.getLoader();
        pageRunner.toggleElementVisibylity(loader);

        pageRunner.topFunction();
        setTimeout(function () {
            clearResultList();
            let URL = makeURL(oldData,prevPageToken);
            currentPageToken = prevPageToken;
            requestData(URL);
        },1000);
    }

    /**
     * Show error under button
     */
    function showErrorSearch(){
        let loader = pageRunner.getLoader();
        pageRunner.toggleElementVisibylity(loader);
        document.getElementById('query-input').style['border-color'] = '#dc3545';
        document.getElementById('error-text').style['display'] = 'block';
    }

    /**
     * Request data throught ajax and set response function
     */
    function requestData(URI){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', URI);

        // request state change event
        xhr.onreadystatechange = function responseRequest() {
            // request completed?
            if (xhr.readyState !== 4){
                return;
            }
            if (xhr.status === 200) {

                // request successful - show response
                let data = JSON.parse(xhr.responseText);

                if(typeof(data.nextPageToken) !== 'undefined'){
                    nextPageToken = data.nextPageToken;
                }

                if(typeof(data.prevPageToken) !== 'undefined'){
                    prevPageToken = data.prevPageToken;
                }

                if(data.items.length > 0){
                    data.items.forEach(function(item){
                        htmlBuilder.createCard(item);
                    });
                    htmlBuilder.createButtons(nextPageToken,prevPageToken);
                    document.getElementById('results').style['display'] = 'block';
                }
                else{
                    alert("0 vysledkov");
                }

                setTimeout(function(){
                    let loader = pageRunner.getLoader();
                    pageRunner.toggleElementVisibylity(loader);

                    let elm = document.getElementById("items");
                    elm.scrollIntoView({
                        behavior: 'smooth'
                    });

                    let xhr = new XMLHttpRequest();
                }, 1000);

            }
            else {
                // request error
                console.log(xhr);
                alert('HTTP error' + xhr.status + xhr.statusText);
            }
        };
        // start request
        xhr.send();

    }

    /**
     * clear Results list
     */
    function clearResultList(){
        const myNode = document.getElementById("items");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }

    /**
     * Make URL from params
     * @param data
     * @returns {string}
     */
    function makeURL(data,pageToken = '') {
        URL = BASE_URI + 'key=' +APIkey + '&' + 'part=snippet&' + 'q=' +  data.query  + '&maxResults=9'
            +'&type=video';

        oldData = data;
        if(pageToken !== ''){
            URL += '&pageToken=' + pageToken;
        }

        return URL;
    }

    /**
     * Get currentPageToken
     * @returns {string}
     */
    function getCurrentPage() {
        return currentPageToken;
    }

    return {submitYoutubeForm,getNextPage,getPrevPage,getCurrentPage};
}();
