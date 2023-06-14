import { createLightbox } from '../factories/lightbox.js';
import { like } from '../utils/likes.js';

export function galleryFactory(data) {
	function getMediaCardDOM() {
		// Create the container for the sort selector container
		const sortContainer = document.createElement('div');
		sortContainer.classList.add('sort-container');

		const sortLabel = document.createElement('p');
		sortLabel.textContent = 'Trier par';
		sortLabel.setAttribute('aria-hidden', 'true');

		const arrowDown = document.createElement('img');
		arrowDown.setAttribute('src', './assets/icons/whiteArrow.png');
		arrowDown.classList.add('arrow-down');
		arrowDown.setAttribute('alt', 'Flèche vers le bas');

		const arrowUp = document.createElement('img');
		arrowUp.setAttribute('src', './assets/icons/whiteArrow.png');
		arrowUp.classList.add('arrow-up');
		arrowUp.setAttribute('alt', 'Flèche vers le haut');

		function initialButton() {
			const selectedOption = 'popularity';

			const mainButton = document.createElement('button');
			mainButton.setAttribute('id', 'main-button');
			mainButton.textContent = 'Popularité';
			mainButton.setAttribute('aria-label', 'Trier par popularité');
			mainButton.setAttribute('tabindex', '3');
			mainButton.setAttribute('role', 'listbox');
			mainButton.setAttribute('aria-haspopup', 'true');
			mainButton.setAttribute('aria-expanded', 'false');
			mainButton.addEventListener('click', function () {
				dropdownMenu(selectedOption);
			});

			const sorting = 'popularity';
			createGalleryDOM(sorting);

			mainButton.appendChild(arrowDown);
			sortContainer.appendChild(sortLabel);
			sortContainer.appendChild(mainButton);
		}

		initialButton();

		function createButton(selectedOption, buttonText, sorting) {
			const sortButton = document.getElementById('sort-button');
			sortContainer.removeChild(sortButton);
			const mainButton = document.createElement('button');
			mainButton.setAttribute('id', 'main-button');

			mainButton.textContent = buttonText;
			mainButton.setAttribute('aria-label', 'Trier par ' + buttonText);
			mainButton.setAttribute('tabindex', '3');
			mainButton.setAttribute('role', 'listbox');
			mainButton.setAttribute('aria-haspopup', 'true');
			mainButton.setAttribute('aria-expanded', 'false');
			mainButton.addEventListener('click', function () {
				dropdownMenu(selectedOption);
			});
			const gallerySort = document.querySelector('.gallery-grid');
			galleryContainer.removeChild(gallerySort);
			createGalleryDOM(sorting);

			mainButton.appendChild(arrowDown);
			sortContainer.appendChild(mainButton);
		}

		function buttonPopularity() {
			createButton('popularity', 'Popularité', 'popularity');
		}

		function buttonDate() {
			createButton('date', 'Date', 'date');
		}

		function buttonTitle() {
			createButton('title', 'Titre', 'title');
		}

		function dropdownMenu(selectedOption) {
			const sortButton = document.createElement('ul');
			sortButton.setAttribute('id', 'sort-button');
			sortButton.setAttribute('aria-expanded', 'true');
			sortButton.setAttribute('role', 'listbox');
			const mainButton = document.getElementById('main-button');
			sortContainer.removeChild(mainButton);

			const options = [
				{ value: 'popularity', label: 'Popularité', clickHandler: buttonPopularity },
				{ value: 'date', label: 'Date', clickHandler: buttonDate },
				{ value: 'title', label: 'Titre', clickHandler: buttonTitle },
			];

			const selectedOptionIndex = options.findIndex((option) => option.value === selectedOption);

			if (selectedOptionIndex !== -1) {
				const sortedOptions = [
					options[selectedOptionIndex],
					...options.slice(0, selectedOptionIndex),
					...options.slice(selectedOptionIndex + 1),
				];

				sortedOptions.forEach((option, index) => {
					const menuOption = document.createElement('li');
					const optionId = `option-${index + 1}`; // Generate unique ID for each option
					menuOption.setAttribute('id', optionId);
					menuOption.textContent = option.label;
					menuOption.setAttribute('role', 'option');
					menuOption.setAttribute('aria-selected', 'false');
					menuOption.addEventListener('click', option.clickHandler);

					// Attribution des tabindex aux options du menu déroulant
					menuOption.setAttribute('tabindex', `${index + 3}`);

					// Gestion de l'événement clavier pour valider l'option
					menuOption.addEventListener('keydown', function (event) {
						if (event.key === 'Enter') {
							event.preventDefault();
							option.clickHandler();
						}
					});

					// Gestion de l'événement focus pour mettre à jour aria-selected
					menuOption.addEventListener('focus', function () {
						// Mettre à jour aria-selected pour l'option actuellement focusée
						menuOption.setAttribute('aria-selected', 'true');
						// Mettre à jour aria-selected pour les autres options
						const otherOptions = Array.from(sortButton.children).filter((opt) => opt !== menuOption);
						otherOptions.forEach((opt) => opt.setAttribute('aria-selected', 'false'));
					});

					sortButton.appendChild(menuOption);
				});

				// Gestion de l'événement clavier sur le conteneur du menu déroulant
				sortButton.addEventListener('keydown', function (event) {
					const focusedOption = document.activeElement;
					const currentIndex = Array.from(sortButton.children).indexOf(focusedOption);
					const optionsCount = sortButton.children.length;

					if (event.key === 'ArrowUp') {
						event.preventDefault();
						const previousIndex = (currentIndex - 1 + optionsCount) % optionsCount;
						sortButton.children[previousIndex].focus();
						sortButton.children[previousIndex].setAttribute('aria-selected', 'true');
						sortButton.children[currentIndex].setAttribute('aria-selected', 'false');
					} else if (event.key === 'ArrowDown') {
						event.preventDefault();
						const nextIndex = (currentIndex + 1) % optionsCount;
						sortButton.children[nextIndex].focus();
						sortButton.children[nextIndex].setAttribute('aria-selected', 'true');
						sortButton.children[currentIndex].setAttribute('aria-selected', 'false');
					}
				});

				sortButton.setAttribute('aria-expanded', 'true');
				sortContainer.appendChild(sortButton);
				sortButton.focus();
			}
		}
		return { sortContainer };
	}

	// Gallery
	// Create the container for the gallery items
	const galleryContainer = document.createElement('div');
	galleryContainer.classList.add('gallery-container');

	function createGalleryDOM(sorting) {
		// Create the container for the gallery items
		const galleryGrid = document.createElement('div');
		galleryGrid.classList.add('gallery-grid');

		if (sorting === 'popularity') {
			data.sort((a, b) => b.likes - a.likes);
			displayGallery(data);
		} else if (sorting === 'date') {
			data.sort((a, b) => new Date(a.date) - new Date(b.date));
			displayGallery(data);
		} else if (sorting === 'title') {
			data.sort((a, b) => a.title.localeCompare(b.title));
			displayGallery(data);
		}

		function displayGallery(data) {
			// Abstract
			const main = document.querySelector('#main');

			// Check if the abstract element already exists
			const abstract = document.querySelector('#abstract');
			if (!abstract) {
				// Create the div element for total likes and price
				const abstract = document.createElement('div');
				abstract.setAttribute('id', 'abstract');

				// Create the paragraph element for the total likes
				const totalLikes = document.createElement('p');
				totalLikes.setAttribute('id', 'total-likes');
				const allLikes = data.reduce((total, obj) => total + obj.likes, 0);
				totalLikes.innerText = allLikes;

				// Create the paragraph element for the price
				const photographerPrice = document.querySelector('#photographer_price');
				const price = parseInt(photographerPrice.textContent);
				const priceText = document.createElement('p');
				priceText.innerText = price + '€ / jour';
				priceText.classList.add('price_text');

				abstract.appendChild(totalLikes);
				abstract.appendChild(priceText);
				main.appendChild(abstract);
			}

			const totalLikesElement = document.querySelector('#total-likes');
			let tabindex = 6;

			data.forEach((item) => {
				const article = document.createElement('article');

				if (item.image) {
					// Create the <img> element for images
					const img = document.createElement('img');
					const currentImage = `./assets/media/${item.image}`;
					img.setAttribute('src', currentImage);
					img.setAttribute('alt', item.title + ', closeup view');
					img.classList.add('gallery-media');
					img.addEventListener('click', function () {
						createLightbox(item, data);
					});
					img.setAttribute('tabindex', tabindex.toString());
					article.appendChild(img);
				} else if (item.video) {
					// Create the <video> element for videos
					const videoElement = document.createElement('video');
					const currentVideo = `./assets/media/${item.video}`;
					videoElement.setAttribute('src', currentVideo);
					videoElement.setAttribute('alt', item.title + ', closeup view');
					videoElement.classList.add('gallery-media');
					videoElement.addEventListener('click', function () {
						createLightbox(item, data);
					});
					videoElement.setAttribute('tabindex', tabindex.toString());
					article.appendChild(videoElement);
				}

				// Create container
				const legendContainer = document.createElement('div');
				legendContainer.classList.add('legend-container');

				// Create the button element for the heart icon
				const heart = document.createElement('button');
				heart.classList.add('heart');
				heart.setAttribute('aria-label', 'likes');
				heart.dataset.itemId = item.id;
				heart.addEventListener('click', function () {
					like(this, totalLikesElement);
				});
				heart.setAttribute('tabindex', (tabindex + 1).toString());
				legendContainer.appendChild(heart);

				tabindex += 2;

				// Create element for the media title
				const h2 = document.createElement('h2');
				h2.textContent = item.title;

				// Create the paragraph element for the media likes
				const p1 = document.createElement('p');
				p1.classList.add('like');
				p1.textContent = item.likes;

				// Append the title, paragraph, and heart elements to the container
				legendContainer.appendChild(h2);
				legendContainer.appendChild(p1);

				// Append the div to the article
				article.appendChild(legendContainer);

				// Append the article to the gallery container
				galleryGrid.appendChild(article);
				galleryContainer.appendChild(galleryGrid);
			});

			return { galleryContainer };
		}
		return { galleryContainer };
	}
	// Return an object with the getMediaCardDOM method
	return { getMediaCardDOM, createGalleryDOM };
}
