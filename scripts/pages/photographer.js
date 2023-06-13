import { photographerFactory } from '../factories/photographer.js';
import { appendChildPhotographer } from '../factories/photographer.js';
import { galleryFactory } from '../factories/gallery.js';
import { getPhotographersData } from '../utils/fetchPhotographers.js';

function displayData(photographers, media) {
	// Get the parent div element
	const parentDiv = document.querySelector('#main');

	// Retrieve the ID of the photographer from the URL
	const params = new URL(document.location).searchParams;
	const id = parseInt(params.get('_id'));

	// Find the current photographer based on the ID
	const currentPhotographer = photographers.find((photographer) => photographer.id === id);

	// Create the photographer card using the photographerFactory
	const photographerModel = photographerFactory(currentPhotographer);
	const photographerCard = photographerModel.getUserCardDOM();

	// Append the photographer card to the parent div
	const appendedCard = appendChildPhotographer(photographerCard);
	parentDiv.appendChild(appendedCard);

	// Filter the media based on the photographer ID
	const filteredMedia = media.filter((item) => item.photographerId === id);

	// Create the media cards using the galleryFactory
	const mediaModel = galleryFactory(filteredMedia);
	const mediaCardDOM = mediaModel.getMediaCardDOM();
	const galleryDOM = mediaModel.createGalleryDOM();

	// Append the media cards to the parent div
	parentDiv.appendChild(mediaCardDOM.sortContainer);
	parentDiv.appendChild(galleryDOM.galleryContainer);
}

async function init() {
	// Retrieve the photographers and media data
	const { photographers, media } = await getPhotographersData();

	// Display the photographers and media data
	displayData(photographers, media);
}

// Initialize the application
init();
