window.addEventListener("wheel", function(event) {
    if (event.deltaY > 0) {
        document.getElementById("e-studio").style.fontSize = "30px";
        document.querySelector(".container").style.opacity = "1";
        document.querySelector(".footer").style.opacity = "1";
        document.getElementById("arrow-down").style.opacity = "0";
        document.querySelector(".worldwide").style.opacity = "0";

        document.querySelector(".worldwide").style.transition = "opacity 0.5s";
        setTimeout(function() {
            document.querySelector(".worldwide").style.display = "none";
        }, 500);
    } else if (window.scrollY === 0 && event.deltaY < 0) {
        document.getElementById("e-studio").style.fontSize = "10vw";
        document.querySelector(".container").style.opacity = "0";
        document.querySelector(".footer").style.opacity = "0";
        document.getElementById("arrow-down").style.opacity = "1";

        document.querySelector(".worldwide").style.display = "block";
        setTimeout(function() {
            document.querySelector(".worldwide").style.opacity = "1";
        }, 10);
    }
}, { passive: true });