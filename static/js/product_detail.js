const carousel = document.getElementById('productCarousel');
const carouselItems = carousel.getElementsByClassName('carousel-item');
let currentSlideIndex = 0;

function changeCarouselSlide(index) {
    carouselItems[currentSlideIndex].classList.remove('active');

    currentSlideIndex = index;

    carouselItems[currentSlideIndex].classList.add('active');
}

function nextSlide() {
    let nextIndex = currentSlideIndex + 1;
    if (nextIndex >= carouselItems.length) {
        nextIndex = 0;
    }
    changeCarouselSlide(nextIndex);
}

function prevSlide() {
    let prevIndex = currentSlideIndex - 1;
    if (prevIndex < 0) {
        prevIndex = carouselItems.length - 1;
    }
    changeCarouselSlide(prevIndex);
}

document.querySelectorAll('.thumbnail').forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        changeCarouselSlide(index);
    });
});

function selectSize(option) {
    // Сбросить выбор у всех размеров
    let options = document.querySelectorAll('.size-option');
    options.forEach(function(item) {
        item.classList.remove('selected');
    });

    // Установить выбор для текущего размера
    option.classList.add('selected');

    // Установить выбранный размер в скрытое поле формы
    document.getElementById('selected-size').value = option.textContent;

    // Активировать кнопку "В корзину" после выбора размера
    const addToCartButton = document.getElementById('add-to-cart-button');
    addToCartButton.disabled = false;
}


document.addEventListener('DOMContentLoaded', function () {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.getElementById('close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const photoTriggers = document.querySelectorAll('.carousel-item img');
    let currentPhotoIndex = 0;

    photoTriggers.forEach((trigger, index) => {
        trigger.addEventListener('click', function () {
            const imgSrc = this.getAttribute('src');
            modalImage.src = imgSrc;
            modalContainer.style.display = 'flex';
            currentPhotoIndex = index;
        });
    });

    closeBtn.addEventListener('click', function () {
        modalContainer.style.display = 'none';
    });

    prevBtn.addEventListener('click', function () {
        currentPhotoIndex = (currentPhotoIndex - 1 + photoTriggers.length) % photoTriggers.length;
        modalImage.src = photoTriggers[currentPhotoIndex].getAttribute('src');
    });

    nextBtn.addEventListener('click', function () {
        currentPhotoIndex = (currentPhotoIndex + 1) % photoTriggers.length;
        modalImage.src = photoTriggers[currentPhotoIndex].getAttribute('src');
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            currentPhotoIndex = (currentPhotoIndex - 1 + photoTriggers.length) % photoTriggers.length;
            modalImage.src = photoTriggers[currentPhotoIndex].getAttribute('src');
        } else if (e.key === 'ArrowRight') {
            currentPhotoIndex = (currentPhotoIndex + 1) % photoTriggers.length;
            modalImage.src = photoTriggers[currentPhotoIndex].getAttribute('src');
        } else if (e.key === 'Escape') {
            modalContainer.style.display = 'none';
        }
    });
});


