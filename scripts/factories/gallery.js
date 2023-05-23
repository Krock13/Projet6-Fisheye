function galleryFactory(data) {
	// Destructure the properties from the data object
	const { id, photographerId, title, image, video, likes, date, price } = data;

	function getMediaCardDOM() {
		// Create the paragraph for "Sort by" text
		const sortParagraph = document.createElement('p');
		sortParagraph.textContent = 'Trier par';

		// Create the sort selector
		const sortSelect = document.createElement('select');
		sortSelect.id = 'sort-select';

		// Create the options for the sort selector
		const popularityOption = document.createElement('option');
		popularityOption.value = 'popularity';
		popularityOption.textContent = 'Popularité';

		const dateOption = document.createElement('option');
		dateOption.value = 'date';
		dateOption.textContent = 'Date';

		const titleOption = document.createElement('option');
		titleOption.value = 'title';
		titleOption.textContent = 'Titre';

		// Append the options to the sort selector
		sortSelect.appendChild(popularityOption);
		sortSelect.appendChild(dateOption);
		sortSelect.appendChild(titleOption);

		// Create the container for the sort paragraph and sort selector
		const sortContainer = document.createElement('div');
		sortContainer.classList.add('sort-container');
		sortContainer.appendChild(sortParagraph);
		sortContainer.appendChild(sortSelect);

		// Create the container for the gallery items
		const galleryContainer = document.createElement('div');
		galleryContainer.classList.add('gallery-container');

		// Create the container for the gallery items
		const galleryGrid = document.createElement('div');
		galleryGrid.classList.add('gallery-grid');

		// Iterate over the data and create gallery items
		data.forEach((item) => {
			const article = document.createElement('article');

			if (item.image) {
				// Create the <img> element for images
				const img = document.createElement('img');
				img.setAttribute('src', `assets/media/${item.image}`);
				img.setAttribute('alt', item.title + ', closeup view');
				img.classList.add('gallery-media');
				article.appendChild(img);
			} else if (item.video) {
				// Create the <video> element for videos
				const videoElement = document.createElement('video');
				videoElement.setAttribute('src', `assets/media/${item.video}`);
				videoElement.setAttribute('alt', item.title + ', closeup view');
				videoElement.classList.add('gallery-media');
				videoElement.setAttribute('controls', true);
				article.appendChild(videoElement);
			}

			// Create element for the media title
			const h2 = document.createElement('h2');
			h2.textContent = item.title;

			// Create the paragraph element for the media likes
			const p1 = document.createElement('p');
			p1.textContent = item.likes;

			// Create the image element for the heart icon
			const heart = document.createElement('img');
			heart.setAttribute('src', './assets/icons/heart.png');
			heart.setAttribute('alt', 'likes');

			// Create container
			const legendContainer = document.createElement('div');
			legendContainer.classList.add('legend-container');

			// Append the title, paragraph, and heart elements to the container
			legendContainer.appendChild(h2);
			legendContainer.appendChild(p1);
			legendContainer.appendChild(heart);

			// Append the div to the article
			article.appendChild(legendContainer);

			// Append the article to the gallery container
			galleryGrid.appendChild(article);
			galleryContainer.appendChild(galleryGrid);
		});

		return { sortContainer, galleryContainer };
	}
	// Return an object with the getMediaCardDOM method
	return { getMediaCardDOM };
}
