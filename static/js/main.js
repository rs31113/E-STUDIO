window.addEventListener("wheel", handleScroll, { passive: true });
window.addEventListener("touchstart", handleTouchStart, { passive: true });
window.addEventListener("touchmove", handleTouchMove, { passive: true });

function handleScroll(event) {
    if (event.deltaY > 0 || event.touches) {
        document.getElementById("e-studio").style.fontSize = "30px";
        document.getElementById("e-studio").style.marginTop = "20px";
        document.querySelector(".container").style.opacity = "1";
        document.querySelector(".footer").style.opacity = "1";
        document.getElementById("arrow-down").style.opacity = "0";
        document.querySelector(".worldwide").style.opacity = "0";

        document.querySelector(".worldwide").style.transition = "opacity 0.5s";
        setTimeout(function() {
            document.querySelector(".worldwide").style.display = "none";
        }, 500);
    } else if (window.scrollY === 0 && (event.deltaY < 0 || event.touches)) {
        document.getElementById("e-studio").style.fontSize = "10vw";
        document.getElementById("e-studio").style.marginTop = "100px";
        document.querySelector(".container").style.opacity = "0";
        document.querySelector(".footer").style.opacity = "0";
        document.getElementById("arrow-down").style.opacity = "1";

        document.querySelector(".worldwide").style.display = "block";
        setTimeout(function() {
            document.querySelector(".worldwide").style.opacity = "1";
        }, 10);
    }
}

let touchStartY;

function handleTouchStart(event) {
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    if (event.touches[0].clientY > touchStartY || window.scrollY === 0) {
        handleScroll(event);
    }
}
