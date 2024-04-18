document.addEventListener('DOMContentLoaded', function () {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.getElementById('close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const photoTriggers = document.querySelectorAll('.photo img');
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
