import { closeLightbox, goToSlide, handleKeyboardNavigation } from '../utils/lightbox.js';

// Variable to store the reference of the keyboard event listener
let keyboardEventListener = null;

export function createLightbox(media, data) {
	const mainContent = document.getElementById('main');
	mainContent.setAttribute('aria-hidden', 'true');

	const lightbox = document.getElementById('lightbox');
	lightbox.classList.add('lightbox');

	const lightboxContainer = document.createElement('div');
	lightboxContainer.classList.add('lightbox_container');

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

	const title = document.createElement('h2');
	title.innerText = media.title;
	title.classList.add('lightbox_title');

	const lightboxClose = document.createElement('button');
	lightboxClose.innerText = 'Fermer';
	lightboxClose.classList.add('lightbox_close');
	lightboxClose.addEventListener('click', closeLightbox);

	const lightboxNext = document.createElement('button');
	lightboxNext.innerText = 'Suivant';
	lightboxNext.classList.add('lightbox_next');
	lightboxNext.setAttribute('aria-label', 'Image suivante');
	lightboxNext.addEventListener('click', () => goToSlide('next', data));

	const lightboxPrev = document.createElement('button');
	lightboxPrev.innerText = 'Précédent';
	lightboxPrev.classList.add('lightbox_prev');
	lightboxPrev.setAttribute('aria-label', 'Image précédente');
	lightboxPrev.addEventListener('click', () => goToSlide('previous', data));

	lightboxContainer.appendChild(lightboxClose);
	lightboxContainer.appendChild(lightboxNext);
	lightboxContainer.appendChild(lightboxPrev);
	lightboxContainer.appendChild(title);
	lightbox.appendChild(lightboxContainer);

	// Add keyboard event listener
	if (!keyboardEventListener) {
		keyboardEventListener = (event) => handleKeyboardNavigation(event, data);
		document.addEventListener('keydown', keyboardEventListener);
	}
}
