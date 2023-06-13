import { createLightbox } from '../utils/lightbox.js';
import { like } from '../utils/likes.js';

export function galleryFactory(data) {
	function getMediaCardDOM() {
		// Create the container for the sort selector container
		const sortContainer = document.createElement('div');
		sortContainer.classList.add('sort-container');

		const sortLabel = document.createElement('p');
		sortLabel.textContent = 'Trier par'; // Sort by

		const arrowDown = document.createElement('img');
		arrowDown.setAttribute('src', './assets/icons/whiteArrow.png');
		arrowDown.classList.add('arrow-down');
		arrowDown.setAttribute('alt', 'arrow');

		const arrowUp = document.createElement('img');
		arrowUp.setAttribute('src', './assets/icons/whiteArrow.png');
		arrowUp.classList.add('arrow-up');
		arrowUp.setAttribute('alt', 'arrow');

		function initialButton() {
			// Set the initial selected option to 'popularity'
			const selectedOption = 'popularity';

			// Create the main button element
			const mainButton = document.createElement('button');
			mainButton.setAttribute('id', 'main-button');
			mainButton.textContent = 'Popularité'; // Popularity

			// Add a click event listener to the main button
			mainButton.addEventListener('click', function () {
				dropdownMenu(selectedOption);
			});

			const sorting = 'popularity';
			createGalleryDOM(sorting);

			// Append the arrow down icon and the main button to the sort container
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

			// Set the text content of the main button
			mainButton.textContent = buttonText;
			mainButton.addEventListener('click', function () {
				// Add a click event listener to the main button
				dropdownMenu(selectedOption);
			});
			const gallerySort = document.querySelector('.gallery-grid');
			// Remove the gallery sort
			galleryContainer.removeChild(gallerySort);
			// Create the gallery DOM with the specified sorting option
			createGalleryDOM(sorting);

			// Append the arrow down icon to the main button
			mainButton.appendChild(arrowDown);
			// Append the main button to the sort container
			sortContainer.appendChild(mainButton);
		}

		function buttonPopularity() {
			// Call createButton with the 'popularity' option
			createButton('popularity', 'Popularité', 'popularity');
		}

		function buttonDate() {
			// Call createButton with the 'date' option
			createButton('date', 'Date', 'date');
		}

		function buttonTitle() {
			// Call createButton with the 'title' option
			createButton('title', 'Titre', 'title');
		}

		// Function for handling the dropdown menu options
		function dropdownMenu(selectedOption) {
			const sortButton = document.createElement('div');
			sortButton.setAttribute('id', 'sort-button');
			const mainButton = document.getElementById('main-button');
			sortContainer.removeChild(mainButton);

			// Define an array of options for the dropdown menu
			const options = [
				{ value: 'popularity', label: 'Popularité', clickHandler: buttonPopularity },
				{ value: 'date', label: 'Date', clickHandler: buttonDate },
				{ value: 'title', label: 'Titre', clickHandler: buttonTitle },
			];

			const selectedOptionIndex = options.findIndex((option) => option.value === selectedOption);

			if (selectedOptionIndex !== -1) {
				// Create an array of sorted options with the selected option in the first position
				const sortedOptions = [
					options[selectedOptionIndex],
					...options.slice(0, selectedOptionIndex),
					...options.slice(selectedOptionIndex + 1),
				];

				// Create menu options for each sorted option
				sortedOptions.forEach((option) => {
					const menuOption = document.createElement('p');
					menuOption.textContent = option.label;
					menuOption.addEventListener('click', option.clickHandler);
					sortButton.appendChild(menuOption);
				});

				sortButton.appendChild(arrowUp);
				sortContainer.appendChild(sortButton);
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

			const totalLikesElement = document.querySelector('#total-likes');

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
					article.appendChild(videoElement);
				}

				// Create element for the media title
				const h2 = document.createElement('h2');
				h2.textContent = item.title;

				// Create the paragraph element for the media likes
				const p1 = document.createElement('p');
				p1.classList.add('like');
				p1.textContent = item.likes;

				// Create the image element for the heart icon
				const heart = document.createElement('button');
				heart.classList.add('heart');
				heart.setAttribute('aria-label', 'likes');
				heart.dataset.itemId = item.id;
				heart.addEventListener('click', function () {
					like(this, totalLikesElement);
				});

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
		}
		return { galleryContainer };
	}
	// Return an object with the getMediaCardDOM method
	return { getMediaCardDOM, createGalleryDOM };
}
