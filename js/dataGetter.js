import {htmlBuilder} from './htmlBuilder.js';

export const dataGetter = function() {
    const APIkey = "AIzaSyBknkksnmSstFltBx_QBlYuDNKp6aS95Ck";
    const  BASE_URI = "https://www.googleapis.com/youtube/v3/search?";

    function getData(data){
        document.getElementById("loader").style["visibility"] = "visible";
        clearList();

        URL = makeURL(data);
        requestData(URL);
    }

    function makeURL(data) {
        return URL = BASE_URI + 'key=' +APIkey + '&' + 'part=snippet&' + 'q=' +  data.query  + '&maxResults=9';
    }

    function clearList(){
        const myNode = document.getElementById("items");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }

    function requestData(URI = ''){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', URI);

        // request state change event
        xhr.onreadystatechange = function() {

            // request completed?
            if (xhr.readyState !== 4) return;

            if (xhr.status === 200) {
                // request successful - show response
                let data = JSON.parse(xhr.responseText);
                data.items.forEach(function(item){
                    //todo:Prerobit ten builder
                    htmlBuilder.createCard(item);
                });
                setTimeout(function(){
                    document.getElementById("results").style["display"] = "block";
                    var elmnt = document.getElementById("items");
                    elmnt.scrollIntoView({
                        behavior: 'smooth'
                    });
                    let xhr = new XMLHttpRequest();
                    document.getElementById("loader").style["visibility"] = "hidden";
                }, 1000);
            }
            else {
                // request error
                alert('HTTP error' + xhr.status + xhr.statusText);
            }
        };
        // start request
        xhr.send();
    }

    return {getData}
}();
