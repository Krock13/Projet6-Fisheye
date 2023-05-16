async function getPhotographers() {
	try {
		// Fetch the photographers data from the specified JSON file
		const response = await fetch('./data/photographers.json');
		if (!response.ok) {
			throw new Error('Failed to fetch photographers data');
		}
		// Parse the response data as JSON
		const data = await response.json();
		// Return the photographers data
		return { photographers: data.photographers };
	} catch (error) {
		// Handle any errors that occur during the fetch
		console.error(error);
		// Return an empty array if there's an error
		return { photographers: [] };
	}
}

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
	const { photographers } = await getPhotographers();
	// Display the photographers data
	displayData(photographers);
}

// Initialize the application
init();
