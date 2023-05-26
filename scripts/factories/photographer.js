export function photographerFactory(data) {
	// Destructure the properties from the data object
	const { name, portrait, city, country, tagline, price, id } = data;

	const picture = `./assets/photographers/${portrait}`;

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
		p2.setAttribute('id', 'photographer_price');

		const card = { article, link, img, h2, h3, p1, p2 };

		return card;
	}

	// Return an object with the photographer's name, picture, and getUserCardDOM method
	return { getUserCardDOM };
}

export function appendChildIndex(card) {
	// Destructure the properties from the card object
	const { article, link, img, h2, h3, p1, p2 } = card;

	// Append the image and heading elements to the link
	link.appendChild(img);
	link.appendChild(h2);

	// Append all the elements to the article
	article.appendChild(link);
	article.appendChild(h3);
	article.appendChild(p1);
	article.appendChild(p2);

	return article;
}

export function appendChildPhotographer(card) {
	// Destructure the properties from the card object
	const { article, img, h2, h3, p1 } = card;

	// Create buttons for the contact form
	const btn = document.createElement('button');
	btn.classList.add('contact_button');
	btn.setAttribute('onclick', 'displayModal()');
	btn.textContent = 'Contactez-moi';

	// Create a container element to hold the photographer's header
	const container = document.createElement('div');
	container.classList.add('photograph-header');

	// Append the heading elements and paragraph to the article
	article.appendChild(h2);
	article.appendChild(h3);
	article.appendChild(p1);

	// Append the article, button, and image to the container
	container.appendChild(article);
	container.appendChild(btn);
	container.appendChild(img);

	return container;
}
