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
		return { photographers: data.photographers, media: data.media };
	} catch (error) {
		// Handle any errors that occur during the fetch
		console.error(error);
		// Return an empty array if there's an error
		return { photographers: [], media: [] };
	}
}
