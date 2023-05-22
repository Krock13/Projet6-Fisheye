async function displayData(photographers, media) {
	// Get the parent div element
	const parentDiv = document.querySelector('#main');

	// Recovery of the URL to isolate the id of the photographer
	const params = new URL(document.location).searchParams;
	const id = parseInt(params.get('_id'));

	const currentPhotographer = photographers.find((photographer) => photographer.id === id);

	const photographerModel = photographerFactory(currentPhotographer);
	const profileCardDOM = photographerModel.getPhotographerCardDOM();

	parentDiv.appendChild(profileCardDOM);

	const filteredMedia = media.filter((item) => item.photographerId === id);

	const mediaModel = galleryFactory(filteredMedia);
	const mediaCardDOM = mediaModel.getMediaCardDOM();

	parentDiv.appendChild(mediaCardDOM.sortContainer);
	parentDiv.appendChild(mediaCardDOM.galleryContainer);
}

async function init() {
	// Retrieve the photographers data
	const { photographers, media } = await getPhotographersData();
	// Display the photographers data
	displayData(photographers, media);
}

// Initialize the application
init();
