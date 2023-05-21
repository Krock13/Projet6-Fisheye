async function displayData(photographers) {
	// Get the parent div element
	const parentDiv = document.querySelector('#main');

	// Recovery of the URL to isolate the id of the photographer
	const params = new URL(document.location).searchParams;
	const id = parseInt(params.get('_id'));

	const currentPhotographer = photographers.find((photographer) => photographer.id === id);

	const photographerModel = photographerFactory(currentPhotographer);
	const profileCardDOM = photographerModel.getPhotographerCardDOM();

	parentDiv.appendChild(profileCardDOM);
}

async function init() {
	// Retrieve the photographers data
	const { photographers } = await getPhotographers();
	// Display the photographers data
	displayData(photographers);
}

// Initialize the application
init();
