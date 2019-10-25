
const APIkey = "AIzaSyBknkksnmSstFltBx_QBlYuDNKp6aS95Ck";
const  BASE_URI = "https://www.googleapis.com/youtube/v3/search?";
function submit_me(){
    const myNode = document.getElementById("items");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    let formData =  serializeArray(document.getElementsByTagName('form')[0]);
    let query =  formData[0].value;

    let URI = BASE_URI + 'key=' +APIkey + '&' + 'part=snippet&' + 'q=' +  query  + '&maxResults=50';
    document.getElementById("loader").style["display"] = "block";
    requestData(URI);
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
            data = JSON.parse(xhr.responseText);
            data.items.forEach(function(item){
                createCard(item);
            });
            setTimeout(function(){
                document.getElementById("loader").style["display"] = "none";
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

function createCard(item){
    let div = document.createElement("div");
    div.classList.add("col-4","mt-3","d-flex","align-items-stretch");

    let card = document.createElement("div");
    card.classList.add("card");

    let img = document.createElement("img");
    img.alt =item.snippet.title;
    img.src = item.snippet.thumbnails.high.url;
    img.classList.add("card-img-top");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body","d-flex","flex-column");

    let h5 = document.createElement("h5");
    h5.innerHTML  = item.snippet.title;
    h5.classList.add("card-title");

    let cardText = document.createElement("p");
    cardText.innerHTML = item.snippet.description;
    cardText.classList.add("card-text");

    let link = document.createElement("a");
    link.innerHTML = "Watch now";
    link.href = 'https://www.youtube.com/watch?v='+item.id.videoId;
    link.classList.add("btn","btn-danger","align-self-center");

    let imgLink = document.createElement("a");
    imgLink.href = 'https://www.youtube.com/watch?v='+item.id.videoId;

    imgLink.append(img);
    card.append(imgLink);
    cardBody.append(h5);
    cardBody.append(cardText);
    cardBody.append(link);
    card.append(cardBody);
    div.append(card);
    document.getElementById("items").append(div);

}


function serializeArray(form) {
    var objects = [];
    if (typeof form == 'object' && form.nodeName.toLowerCase() == "form") {
        var fields = form.getElementsByTagName("input");
        for(var i=0;i<fields.length;i++){
            objects[objects.length] = { name: fields[i].getAttribute("name"), value: fields[i].value };
        }
    }
    return objects;
}