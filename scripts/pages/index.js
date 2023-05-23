async function displayData(photographers) {
	const photographersSection = document.querySelector('.photographer_section');

	// Iterate over the photographers data and create user cards for each photographer
	photographers.forEach((photographer) => {
		// Create the photographer model using the photographerFactory
		const photographerModel = photographerFactory(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();

		// Append the child index to the user card DOM
		const appendedCard = appendChildIndex(userCardDOM);

		// Append the user card DOM to the photographers section
		photographersSection.appendChild(appendedCard);
	});
}

async function init() {
	// Retrieve the photographers data
	const { photographers } = await getPhotographersData();

	// Display the photographers data
	displayData(photographers);
}

// Initialize the application
init();
