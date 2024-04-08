function selectSize(option) {
    let options = document.querySelectorAll('.size-option');
    options.forEach(function(item) {
        item.classList.remove('selected');
    });

    option.classList.add('selected');

    document.getElementById('selected-size').value = option.textContent;
}

function changeSlide(index) {
    var carousel = document.getElementById('carouselExampleIndicators');
    var thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(function(thumbnail) {
        thumbnail.classList.remove('active');
    });

    thumbnails[index].classList.add('active');

    var carouselItems = carousel.querySelectorAll('.carousel-item');
    carouselItems.forEach(function(item) {
        item.classList.remove('active');
    });
    carouselItems[index].classList.add('active');
}

