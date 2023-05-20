function photographerFactory(data) {
	const { name, portrait, city, country, tagline, price } = data;

	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		// Create the article element for the user card
		const article = document.createElement('article');
		article.setAttribute('aria-label', 'Photographer Card');
		article.classList.add('photographer_card');

		// Create the anchor element for the photographer's page link
		const link = document.createElement('a');
		link.setAttribute('href', 'photographer.html');
		link.classList.add('photographer_link');

		// Create the image element and set its source
		const img = document.createElement('img');
		img.setAttribute('src', picture);
		img.setAttribute('alt', name); // Set alternative text to the photographer's name
		img.classList.add('photographer_image');

		// Create the heading element for the photographer's name
		const h2 = document.createElement('h2');
		h2.setAttribute('aria-label', 'Photographer Name');
		h2.textContent = name;
		h2.classList.add('photographer_name');

		// Append the image and heading elements to the link
		link.appendChild(img);
		link.appendChild(h2);

		// Create the heading element for the photographer's country and city
		const h3 = document.createElement('h3');
		h3.setAttribute('aria-label', 'Location');
		h3.textContent = city + ', ' + country;
		h3.classList.add('photographer_location');

		// Create the paragraph element for the photographer's tagline
		const p1 = document.createElement('p');
		p1.setAttribute('aria-label', 'Tagline');
		p1.textContent = tagline;
		p1.classList.add('photographer_tagline');

		// Create the span element for the photographer's price
		const p2 = document.createElement('p');
		p2.setAttribute('aria-label', 'Price per Day');
		p2.textContent = price + '€/jour';
		p2.classList.add('photographer_price');

		// Append all the elements to the article
		article.appendChild(link);
		article.appendChild(h3);
		article.appendChild(p1);
		article.appendChild(p2);

		return article;
	}

	// Return an object with the photographer's name, picture, and getUserCardDOM method
	return { name, picture, getUserCardDOM };
}
