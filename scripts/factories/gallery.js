function galleryFactory(data) {
	const { id, photographerId, title, image, video, likes, date, price } = data;

	function getMediaCardDOM() {
		// Création du paragraphe "Trier par"
		const sortParagraph = document.createElement('p');
		sortParagraph.textContent = 'Trier par:';

		// Création du sélecteur de tri
		const sortSelect = document.createElement('select');
		sortSelect.id = 'sort-select';

		// Création des options du sélecteur de tri
		const popularityOption = document.createElement('option');
		popularityOption.value = 'popularity';
		popularityOption.textContent = 'Popularité';

		const dateOption = document.createElement('option');
		dateOption.value = 'date';
		dateOption.textContent = 'Date';

		const titleOption = document.createElement('option');
		titleOption.value = 'title';
		titleOption.textContent = 'Titre';

		// Ajout des options au sélecteur de tri
		sortSelect.appendChild(popularityOption);
		sortSelect.appendChild(dateOption);
		sortSelect.appendChild(titleOption);

		// Ajout du paragraphe et du sélecteur au document
		const sortContainer = document.createElement('div');
		sortContainer.appendChild(sortParagraph);
		sortContainer.appendChild(sortSelect);

		const galleryContainer = document.createElement('div');

		data.forEach((item) => {
			const article = document.createElement('article');

			if (item.image) {
				// Création de l'élément <img> pour les images
				const img = document.createElement('img');
				img.setAttribute('src', `assets/media/${item.image}`);
				img.setAttribute('alt', item.title + ', closeup view');
				article.appendChild(img);
			} else if (item.video) {
				// Création de l'élément <video> pour les vidéos
				const videoElement = document.createElement('video');
				videoElement.setAttribute('src', `assets/media/${item.video}`);
				videoElement.setAttribute('alt', item.title + ', closeup view');
				videoElement.setAttribute('controls', true);
				article.appendChild(videoElement);
			}

			const h2 = document.createElement('h2');
			h2.textContent = item.title;

			const p1 = document.createElement('p');
			p1.textContent = item.likes;

			const heart = document.createElement('img');
			heart.setAttribute('src', './assets/icons/heart.png');
			heart.setAttribute('alt', 'likes');

			article.appendChild(h2);
			article.appendChild(p1);
			article.appendChild(heart);

			galleryContainer.appendChild(article);
		});

		return { sortContainer, galleryContainer };
	}
	return { getMediaCardDOM };
}
