export const htmlBuilder = function() {


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

    card.animate([
        // keyframes
        { opacity: '0' },
        { opacity: '1' }
    ], {
        // timing options
        duration: 2000,
        easing:'ease-out'
    });
}

return {createCard};
}();
