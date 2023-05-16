function photographerFactory(data) {
	const { name, portrait, city, country, tagline, price } = data;

	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		// Create the article element for the user card
		const article = document.createElement('article');

		// Create the image element and set its source
		const img = document.createElement('img');
		img.setAttribute('src', picture);

		// Create the heading element for the photographer's name
		const h2 = document.createElement('h2');
		h2.textContent = name;

		// Create the heading element for the photographer's country and city
		const h3 = document.createElement('h3');
		h3.textContent = city + ', ' + country;

		// Create the paragraph element for the photographer's tagline
		const p = document.createElement('p');
		p.textContent = tagline;

		// Create the span element for the photographer's price
		const span = document.createElement('span');
		span.textContent = price + '€/jour';

		// Append all the elements to the article
		article.appendChild(img);
		article.appendChild(h2);
		article.appendChild(h3);
		article.appendChild(p);
		article.appendChild(span);

		return article;
	}

	// Return an object with the photographer's name, picture, and getUserCardDOM method
	return { name, picture, getUserCardDOM };
}
