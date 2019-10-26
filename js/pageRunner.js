export const pageRunner = function() {

    let windowHeight = window.innerHeight;
    let arrowButton = document.getElementById("arrowBtn");

    let initRunner = function(){
        window.onload = function(){
            resizeBackground()
            document.getElementsByTagName("body")[0].style["visibility"] = "visible";
        };
        window.onresize = function(){resizeBackground()};

        window.onscroll = function() {showArrowButton()};
    };

    function resizeBackground(){
        windowHeight = window.innerHeight;
        document.getElementById("searchMain").style["height"] = windowHeight+'px';
    }

    // When the user scrolls down 20px from the top of the document, show the button
    function showArrowButton() {
        if (document.body.scrollTop > windowHeight || document.documentElement.scrollTop > windowHeight) {
            arrowButton.style.display = "block";
        } else {
            arrowButton.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return {initRunner,topFunction}
}();
