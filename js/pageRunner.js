export const pageRunner = function () {

    /** document height */
    let windowHeight = window.innerHeight;
    /** window arrow BUTTTON ELEMENT */
    let arrowButton = document.getElementById("arrowBtn");

    /**
     * Set up window events
     */
    let initRunner = function () {
        window.onload = function () {
            resizeBackground()
            document.getElementsByTagName("body")[0].style["visibility"] = "visible";
        };
        window.onresize = function () {
            resizeBackground()
        };

        window.onscroll = function () {
            showArrowButton()
        };
    };

    /**
     * resize background to document size
     */
    function resizeBackground() {
        windowHeight = window.innerHeight;
        document.getElementById("searchMain").style["height"] = windowHeight + 'px';
    }

    // When the user scrolls down {windowHeight}px from the top of the document, show the button
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

    /**
     * retirn HTML loader element
     * @returns {HTMLElement}
     */
    function getLoader() {
        return document.getElementById('loader');
    }

    /**
     * Toggle visibility of element
     * @param elm
     */
    function toggleElementVisibylity(elm) {
        if (elm.style["visibility"] === "visible") {
            elm.style["visibility"] = "hidden";
        } else {
            elm.style["visibility"] = "visible";
        }
    }

    return {initRunner, topFunction, getLoader, toggleElementVisibylity}
}();
