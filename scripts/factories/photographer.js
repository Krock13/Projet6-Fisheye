function photographerFactory(data) {
	const { name, portrait, city, country, tagline, price, id } = data;

	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		// Create the article element for the user card
		const article = document.createElement('article');
		article.setAttribute('aria-label', 'Carte du photographe');
		article.classList.add('photographer_card');

		// Create the anchor element for the photographer's page link
		const link = document.createElement('a');
		link.href = 'photographer.html' + '?_id=' + id;
		link.classList.add('photographer_link');
		link.setAttribute('aria-label', 'Voir les détails du photographe');

		// Create the image element and set its source
		const img = document.createElement('img');
		img.setAttribute('src', picture);
		img.setAttribute('alt', name);
		img.classList.add('photographer_image');

		// Create the heading element for the photographer's name
		const h2 = document.createElement('h2');
		h2.textContent = name;
		h2.classList.add('photographer_name');

		// Append the image and heading elements to the link
		link.appendChild(img);
		link.appendChild(h2);

		// Create the heading element for the photographer's country and city
		const h3 = document.createElement('h3');
		h3.textContent = city + ', ' + country;
		h3.classList.add('photographer_location');

		// Create the paragraph element for the photographer's tagline
		const p1 = document.createElement('p');
		p1.textContent = tagline;
		p1.classList.add('photographer_tagline');

		// Create the span element for the photographer's price
		const p2 = document.createElement('p');
		p2.textContent = price + '€/jour';
		p2.classList.add('photographer_price');

		// Append all the elements to the article
		article.appendChild(link);
		article.appendChild(h3);
		article.appendChild(p1);
		article.appendChild(p2);

		return article;
	}

	function getPhotographerCardDOM() {
		// Get the parent div element
		const parentDiv = document.querySelector('.photograph-header');

		// Create the article element for the Photographer card
		const article = document.createElement('article');
		article.setAttribute('aria-label', 'Carte du photographe');
		article.classList.add('profile_photographer');

		// Create the heading element for the photographer's name
		const h2 = document.createElement('h2');
		h2.textContent = name;
		h2.classList.add('profile_name');

		// Create the heading element for the photographer's country and city
		const h3 = document.createElement('h3');
		h3.textContent = city + ', ' + country;
		h3.classList.add('profile_location');

		// Create the paragraph element for the photographer's tagline
		const p1 = document.createElement('p');
		p1.textContent = tagline;
		p1.classList.add('profile_tagline');

		// Append all the elements to the article
		article.appendChild(h2);
		article.appendChild(h3);
		article.appendChild(p1);

		// Create the image element and set its source
		const img = document.createElement('img');
		img.setAttribute('src', picture);
		img.setAttribute('alt', name);
		img.classList.add('profile_image');

		// Append the article and image to the parent div
		parentDiv.appendChild(article);
		parentDiv.appendChild(img);
	}

	// Return an object with the photographer's name, picture, and getUserCardDOM method
	return { getUserCardDOM, getPhotographerCardDOM };
}
