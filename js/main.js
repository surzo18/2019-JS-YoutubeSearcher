window.onload = function(){
    var h = window.innerHeight;
    console.log(h);
    document.getElementById("searchMain").style["height"] = h+'px';
};



const APIkey = "AIzaSyBknkksnmSstFltBx_QBlYuDNKp6aS95Ck";
const  BASE_URI = "https://www.googleapis.com/youtube/v3/search?";
function submit_me(){
    const myNode = document.getElementById("items");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    let formData =  serializeArray(document.getElementsByTagName('form')[0]);
    let query =  formData[0].value;

    let URI = BASE_URI + 'key=' +APIkey + '&' + 'part=snippet&' + 'q=' +  query  + '&maxResults=9';
    document.getElementById("loader").style["visibility"] = "visible";
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
                document.getElementById("results").style["display"] = "block";
                var elmnt = document.getElementById("items");
                elmnt.scrollIntoView();
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

function createCard(item){
    let div = document.createElement("div");
    div.classList.add("col-lg-4","col-sm-12","col-md-6","mt-3","d-flex","align-items-stretch");

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

mybutton = document.getElementById("topBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    console.log("Scr");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}