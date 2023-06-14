export function closeLightbox() {
	const main = document.querySelector('#main');
	const lightbox = document.querySelector('.lightbox');
	main.removeChild(lightbox);
}

export function goToSlide(direction, data) {
	const lightboxContainer = document.querySelector('.lightbox_container');
	const currentMedia = document.querySelector('.mediaLightbox');
	const title = document.querySelector('.lightbox_title');

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
		image.setAttribute('alt', media.title);
		lightboxContainer.appendChild(image);
	} else if (media.video) {
		const video = document.createElement('video');
		video.src = `./assets/media/${media.video}`;
		video.classList.add('mediaLightbox');
		video.setAttribute('alt', media.title);
		video.setAttribute('controls', '');
		lightboxContainer.appendChild(video);
	}
	title.innerText = media.title;
}

export function handleKeyboardNavigation(event, data) {
	const key = event.key;
	if (key === 'ArrowRight') {
		goToSlide('next', data);
	} else if (key === 'ArrowLeft') {
		goToSlide('previous', data);
	} else if (key === 'Escape') {
		closeLightbox();
	}
}
