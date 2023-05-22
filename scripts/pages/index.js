async function displayData(photographers) {
	const photographersSection = document.querySelector('.photographer_section');

	// Iterate over the photographers data and create user cards for each photographer
	photographers.forEach((photographer) => {
		const photographerModel = photographerFactory(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		// Append the user card DOM to the photographers section
		photographersSection.appendChild(userCardDOM);
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
