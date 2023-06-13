function closeLightbox() {
	const main = document.querySelector('#main');
	const lightbox = document.querySelector('.lightbox');
	main.removeChild(lightbox);
}

function goToSlide(direction, data) {
	const lightboxContainer = document.querySelector('.lightbox_container');
	const currentMedia = document.querySelector('.mediaLightbox');

	const src = currentMedia.getAttribute('src');
	const filename = src.split('/').pop();
	const currentIndex = data.findIndex((obj) => obj.image === filename || obj.video === filename);

	let newIndex;
	if (direction === 'next') {
		const isLastSlide = currentIndex === data.length - 1;
		newIndex = isLastSlide ? 0 : currentIndex + 1;
	} else if (direction === 'previous') {
		const isFirstSlide = currentIndex === 0;
		newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1;
	}

	lightboxContainer.removeChild(currentMedia);
	const media = data[newIndex];

	if (media.image) {
		const image = document.createElement('img');
		image.src = `./assets/media/${media.image}`;
		image.classList.add('mediaLightbox');
		lightboxContainer.appendChild(image);
	} else if (media.video) {
		const video = document.createElement('video');
		video.src = `./assets/media/${media.video}`;
		video.classList.add('mediaLightbox');
		video.setAttribute('controls', '');
		lightboxContainer.appendChild(video);
	}
}

function handleKeyboardNavigation(event, data) {
	const key = event.key;
	if (key === 'ArrowRight') {
		goToSlide('next', data);
	} else if (key === 'ArrowLeft') {
		goToSlide('previous', data);
	} else if (key === 'Escape') {
		closeLightbox();
	}
}

export function createLightbox(media, data) {
	const lightbox = document.createElement('div');
	lightbox.classList.add('lightbox');

	const lightboxContainer = document.createElement('div');
	lightboxContainer.classList.add('lightbox_container');

	if (media.image) {
		const image = document.createElement('img');
		image.src = `./assets/media/${media.image}`;
		image.classList.add('mediaLightbox');
		lightboxContainer.appendChild(image);
	} else if (media.video) {
		const video = document.createElement('video');
		video.src = `./assets/media/${media.video}`;
		video.classList.add('mediaLightbox');
		video.setAttribute('controls', '');
		lightboxContainer.appendChild(video);
	}

	const lightboxClose = document.createElement('button');
	lightboxClose.innerText = 'Fermer';
	lightboxClose.classList.add('lightbox_close');
	lightboxClose.addEventListener('click', closeLightbox);

	const lightboxNext = document.createElement('button');
	lightboxNext.innerText = 'Suivant';
	lightboxNext.classList.add('lightbox_next');
	lightboxNext.addEventListener('click', () => goToSlide('next', data));

	const lightboxPrev = document.createElement('button');
	lightboxPrev.innerText = 'Précédent';
	lightboxPrev.classList.add('lightbox_prev');
	lightboxPrev.addEventListener('click', () => goToSlide('previous', data));

	lightboxContainer.appendChild(lightboxClose);
	lightboxContainer.appendChild(lightboxNext);
	lightboxContainer.appendChild(lightboxPrev);
	lightbox.appendChild(lightboxContainer);

	const main = document.getElementById('main');
	main.appendChild(lightbox);

	// Add keyboard event listener
	document.addEventListener('keydown', (event) => handleKeyboardNavigation(event, data));
}
