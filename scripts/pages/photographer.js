async function displayData(photographers) {
	// Récupération de l'URL pour isolé l'id du photographe
	const params = new URL(document.location).searchParams;
	const id = parseInt(params.get('_id'));

	const currentPhotographer = photographers.find((photographer) => photographer.id === id);

	const photographerModel = photographerFactory(currentPhotographer);
	photographerModel.getPhotographerCardDOM();
}

async function init() {
	// Retrieve the photographers data
	const { photographers } = await getPhotographers();
	// Display the photographers data
	displayData(photographers);
}

// Initialize the application
init();
