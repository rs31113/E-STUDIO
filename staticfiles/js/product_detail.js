const carousel = document.getElementById('productCarousel');
let maxQuantity = 1;
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
    let options = document.querySelectorAll('.size-option');
    options.forEach(function(item) {
        item.classList.remove('selected');
    });

    option.classList.add('selected');

    document.getElementById('selected-size').value = option.textContent;

    document.querySelector('.quantity-input').value = 1;
    document.querySelector('.quantity-display').textContent = 1;
    maxQuantity = parseInt(option.getAttribute('data-quantity'));

    const decreaseButton = document.querySelector('.decrease-quantity');
    const increaseButton = document.querySelector('.increase-quantity');

    decreaseButton.disabled = (1 <= 1);
    increaseButton.disabled = (1 >= maxQuantity);
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


const decreaseButton = document.querySelector('.decrease-quantity');
const increaseButton = document.querySelector('.increase-quantity');
const quantityDisplay = document.querySelector('.quantity-display');
const quantityInput = document.querySelector('.quantity-input');


function updateQuantity(newQuantity) {
    if (newQuantity < 1) {
        newQuantity = 1;
    } else if (newQuantity > maxQuantity) {
        newQuantity = maxQuantity;
    }

    quantityDisplay.textContent = newQuantity;
    quantityInput.value = newQuantity;

    increaseButton.disabled = (newQuantity >= maxQuantity);

    decreaseButton.disabled = (newQuantity <= 1);
}

decreaseButton.addEventListener('click', () => {
    let currentQuantity = parseInt(quantityDisplay.textContent, 10);
    if (currentQuantity > 1) {
        updateQuantity(currentQuantity - 1);
    }
});

increaseButton.addEventListener('click', () => {
    let currentQuantity = parseInt(quantityDisplay.textContent, 10);
    if (currentQuantity < maxQuantity) {
        updateQuantity(currentQuantity + 1);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const sizeOptions = document.querySelectorAll('.size-option');

    for (let i = 0; i < sizeOptions.length; i++) {
        const option = sizeOptions[i];
        if (!option.classList.contains('disabled')) {
            selectSize(option);
            option.classList.add('selected');
            document.getElementById('selected-size').value = option.textContent;
            break;
        }
    }
});

const notification = document.getElementById("notification");
        if (notification) {
            setTimeout(() => {
                notification.classList.add('show-notification');
            }, 100);

            setTimeout(() => {
                notification.classList.remove('show-notification');
            }, 5000);
        }