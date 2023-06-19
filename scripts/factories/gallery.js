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
					menuOption.classList.add('option');
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
				sortButton.appendChild(arrowUp);
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
			const abstract = document.querySelector('#abstract');

			// Check if the abstract element already exists
			if (!abstract) {
				// Create the div element for total likes and price
				const abstractElement = document.createElement('div');
				abstractElement.setAttribute('id', 'abstract');

				// Create the paragraph element for the total likes
				const totalLikesElement = document.createElement('p');
				totalLikesElement.setAttribute('id', 'total-likes');
				const allLikes = data.reduce((total, obj) => total + obj.likes, 0);
				totalLikesElement.textContent = allLikes;

				// Create the paragraph element for the price
				const photographerPrice = document.querySelector('#photographer_price');
				const price = parseInt(photographerPrice.textContent);
				const priceTextElement = document.createElement('p');
				priceTextElement.textContent = price + '€ / jour';
				priceTextElement.classList.add('price_text');

				abstractElement.appendChild(totalLikesElement);
				abstractElement.appendChild(priceTextElement);
				main.appendChild(abstractElement);
			}

			const totalLikesElement = document.querySelector('#total-likes');
			let tabindex = 6;

			function createLightboxHandler(item) {
				if (!document.querySelector('.lightbox_container')) {
					createLightbox(item, data);
				}
			}

			function createLightboxKeydownHandler(item, event) {
				if (event.key === 'Enter' && !document.querySelector('.lightbox_container')) {
					createLightbox(item, data);
				}
			}

			data.forEach((item) => {
				const article = document.createElement('article');
				const mediaElement = item.image ? document.createElement('img') : document.createElement('video');

				mediaElement.src = `./assets/media/${item.image || item.video}`;
				mediaElement.alt = item.title + ', closeup view';
				mediaElement.classList.add('gallery-media');
				mediaElement.addEventListener('click', createLightboxHandler.bind(null, item));
				mediaElement.addEventListener('keydown', createLightboxKeydownHandler.bind(null, item));

				mediaElement.tabIndex = tabindex.toString();
				article.appendChild(mediaElement);

				const legendContainer = document.createElement('div');
				legendContainer.classList.add('legend-container');

				const heart = document.createElement('button');
				heart.classList.add('heart');
				heart.setAttribute('aria-label', 'likes');
				heart.dataset.itemId = item.id;
				heart.addEventListener('click', function () {
					like(this, totalLikesElement);
				});

				heart.tabIndex = (tabindex + 1).toString();
				legendContainer.appendChild(heart);

				tabindex += 2;

				const h2 = document.createElement('h2');
				h2.textContent = item.title;

				const p1 = document.createElement('p');
				p1.classList.add('like');
				p1.textContent = item.likes;

				legendContainer.appendChild(h2);
				legendContainer.appendChild(p1);

				article.appendChild(legendContainer);
				galleryGrid.appendChild(article);
				galleryContainer.appendChild(galleryGrid);
			});

			return { galleryContainer };
		}
		return { galleryContainer };
	}
	// Return an object with the getMediaCardDOM and createGalleryDOM method
	return { getMediaCardDOM, createGalleryDOM };
}
