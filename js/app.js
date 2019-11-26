/**
 * AIzaSyARDt9-lsLX5tbwdXN21zDxHj5ILcfCWB0
 */


var apiKey = "AIzaSyARDt9-lsLX5tbwdXN21zDxHj5ILcfCWB0";

var link = "https://www.googleapis.com/youtube/v3/search";

function loadDoc() {

    var finalLink = link + '?key=' + apiKey + '&q=slovakia' + '&part=snippet';
    console.log(finalLink);

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var results = JSON.parse(this.response);
            console.log("https://www.youtube.com/watch?v=" +results.items[0].id.videoId);
            console.log(results.items[0]);
        }
    };


    xhttp.open("GET", finalLink, true);
    xhttp.send();


}

function createCards(){
    var card = document.createElement("div");
    card.className = 'card';

    var odkaz = document.createElement("a");
    odkaz.text = 'Toto je novy odkaz';
    odkaz.href = 'https:facebook.com';

    card.append(odkaz);

    document.getElementsByTagName("body")[0].append(card);
    console.log(card);
}

