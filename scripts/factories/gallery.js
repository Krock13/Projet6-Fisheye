// import { sortByPopularity, sortByDate, sortByTitle } from '../utils/sortImages.js';

export function galleryFactory(data) {
	// Destructure the properties from the data object
	// const { id, photographerId, title, image, video, likes, date, price } = data;

	function getMediaCardDOM() {
		// Create the container for the sort selector container
		const sortContainer = document.createElement('div');
		sortContainer.classList.add('sort-container');

		const sortLabel = document.createElement('p');
		sortLabel.textContent = 'Trier par';

		const arrowDown = document.createElement('img');
		arrowDown.setAttribute('src', './assets/icons/vector.png');
		arrowDown.classList.add('arrow-down');
		arrowDown.setAttribute('alt', 'arrow');

		const arrowUp = document.createElement('img');
		arrowUp.setAttribute('src', './assets/icons/vector.png');
		arrowUp.classList.add('arrow-up');
		arrowUp.setAttribute('alt', 'arrow');

		function initialButton() {
			const selectedOption = 'popularity';
			const mainButton = document.createElement('button');
			mainButton.setAttribute('id', 'main-button');
			mainButton.textContent = 'Popularité';
			mainButton.addEventListener('click', function () {
				dropdownMenu(selectedOption);
			});

			mainButton.appendChild(arrowDown);
			sortContainer.appendChild(sortLabel);
			sortContainer.appendChild(mainButton);
		}

		initialButton();

		function sortByPopularity() {
			const sortButton = document.getElementById('sort-button');
			sortContainer.removeChild(sortButton);
			const selectedOption = 'popularity';
			const mainButton = document.createElement('button');
			mainButton.setAttribute('id', 'main-button');
			mainButton.textContent = 'Popularité';
			mainButton.addEventListener('click', function () {
				dropdownMenu(selectedOption);
			});

			mainButton.appendChild(arrowDown);
			sortContainer.appendChild(mainButton);
		}
		function sortByDate() {
			const sortButton = document.getElementById('sort-button');
			sortContainer.removeChild(sortButton);
			const selectedOption = 'date';
			const mainButton = document.createElement('button');
			mainButton.setAttribute('id', 'main-button');
			mainButton.textContent = 'Date';
			mainButton.addEventListener('click', function () {
				dropdownMenu(selectedOption);
			});

			mainButton.appendChild(arrowDown);
			sortContainer.appendChild(mainButton);
		}

		function sortByTitle() {
			const sortButton = document.getElementById('sort-button');
			sortContainer.removeChild(sortButton);
			const selectedOption = 'title';
			const mainButton = document.createElement('button');
			mainButton.setAttribute('id', 'main-button');
			mainButton.textContent = 'Titre';
			mainButton.addEventListener('click', function () {
				dropdownMenu(selectedOption);
			});

			mainButton.appendChild(arrowDown);
			sortContainer.appendChild(mainButton);
		}

		// Quand on deroule le menu
		function dropdownMenu(selectedOption) {
			const sortButton = document.createElement('div');
			sortButton.setAttribute('id', 'sort-button');
			const mainButton = document.getElementById('main-button');
			sortContainer.removeChild(mainButton);
			if (selectedOption === 'popularity') {
				const firstOption = document.createElement('p');
				firstOption.textContent = 'Popularité';
				firstOption.addEventListener('click', sortByPopularity);

				const secondOption = document.createElement('p');
				secondOption.textContent = 'Date';
				secondOption.addEventListener('click', sortByDate);

				const thirdOption = document.createElement('p');
				thirdOption.textContent = 'Titre';
				thirdOption.addEventListener('click', sortByTitle);

				sortButton.appendChild(arrowUp);
				sortButton.appendChild(firstOption);
				sortButton.appendChild(secondOption);
				sortButton.appendChild(thirdOption);
				sortContainer.appendChild(sortButton);
			} else if (selectedOption === 'date') {
				const firstOption = document.createElement('p');
				firstOption.textContent = 'Date';
				firstOption.addEventListener('click', sortByDate);

				const secondOption = document.createElement('p');
				secondOption.textContent = 'Popularité';
				secondOption.addEventListener('click', sortByPopularity);

				const thirdOption = document.createElement('p');
				thirdOption.textContent = 'Titre';
				thirdOption.addEventListener('click', sortByTitle);

				sortButton.appendChild(arrowUp);
				sortButton.appendChild(firstOption);
				sortButton.appendChild(secondOption);
				sortButton.appendChild(thirdOption);
				sortContainer.appendChild(sortButton);
			} else if (selectedOption === 'title') {
				const firstOption = document.createElement('p');
				firstOption.textContent = 'Titre';
				firstOption.addEventListener('click', sortByTitle);

				const secondOption = document.createElement('p');
				secondOption.textContent = 'Date';
				secondOption.addEventListener('click', sortByDate);

				const thirdOption = document.createElement('p');
				thirdOption.textContent = 'Popularité';
				thirdOption.addEventListener('click', sortByPopularity);

				sortButton.appendChild(arrowUp);
				sortButton.appendChild(firstOption);
				sortButton.appendChild(secondOption);
				sortButton.appendChild(thirdOption);
				sortContainer.appendChild(sortButton);
			}
		}

		// const options = ['Popularité', 'Date', 'Titre'];

		// // Create the container for the sort selector container
		// const sortContainer = document.createElement('div');
		// sortContainer.classList.add('sort-container');

		// // Create the sort selector label
		// const sortLabel = document.createElement('p');
		// sortLabel.textContent = 'Trier par';
		// sortLabel.setAttribute('id', 'filter__title');
		// sortLabel.setAttribute('tabindex', '0');

		// // Create the dropdown container
		// const dropdownContainer = document.createElement('div');
		// dropdownContainer.classList.add('dropdown');

		// // Create the select element
		// const selectElement = document.createElement('div');
		// selectElement.classList.add('select');
		// selectElement.setAttribute('data-filter-value', 'popularity');
		// selectElement.setAttribute('tabindex', '0');

		// // Create the selected option element
		// const selectedOption = document.createElement('span');
		// selectedOption.classList.add('selected');
		// selectedOption.setAttribute('aria-labelledby', 'filter__title');
		// selectedOption.setAttribute('aria-expanded', 'false');
		// selectedOption.setAttribute('aria-haspopup', 'listbox');
		// selectedOption.textContent = 'Popularité';

		// // Append selected option and material icon to select element
		// selectElement.appendChild(selectedOption);

		// // Create the dropdown menu
		// const dropdownMenu = document.createElement('ul');
		// dropdownMenu.classList.add('menu');
		// dropdownMenu.setAttribute('role', 'listbox');
		// dropdownMenu.setAttribute('aria-activedescendant', 'filter__option1');
		// dropdownMenu.setAttribute('aria-labelledby', 'filter__title');

		// // Create the options for the dropdown menu
		// options.forEach((option, index) => {
		// 	const li = document.createElement('li');
		// 	li.classList.add(`selector__element${index + 1}`);
		// 	li.classList.add('active');
		// 	li.setAttribute('role', 'option');
		// 	li.setAttribute('tabindex', '0');
		// 	li.setAttribute('data-filter-option', option);
		// 	li.setAttribute('aria-labelledby', 'filter__title');
		// 	li.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
		// 	li.textContent = option;
		// 	li.addEventListener('click', handleOptionClick);
		// 	dropdownMenu.appendChild(li);
		// });

		// // Append sort label, select element, and dropdown menu to the container
		// sortContainer.appendChild(sortLabel);
		// dropdownContainer.appendChild(selectElement);
		// // dropdownContainer.appendChild(dropdownMenu);
		// sortContainer.appendChild(dropdownContainer);

		// // Create the arrow-down image element
		// const arrowDown = document.createElement('img');
		// arrowDown.setAttribute('src', './assets/icons/vector.png');
		// arrowDown.classList.add('arrow-down');
		// arrowDown.setAttribute('alt', 'arrow');

		// // Create the arrow-up image element
		// const arrowUp = document.createElement('img');
		// arrowUp.setAttribute('src', './assets/icons/vector.png');
		// arrowUp.classList.add('arrow-up');
		// arrowUp.setAttribute('alt', 'arrow');

		// // Add event listener to the select element to toggle dropdown
		// selectElement.addEventListener('click', toggleDropdown);

		// function handleOptionClick(event) {
		// 	const clickedOption = event.target;
		// 	const selectedValue = clickedOption.getAttribute('data-filter-option');
		// 	selectedOption.textContent = clickedOption.textContent;

		// 	// Perform the sorting based on the selected value
		// 	if (selectedValue === 'popularity') {
		// 		sortByPopularity();
		// 	} else if (selectedValue === 'date') {
		// 		sortByDate();
		// 	} else if (selectedValue === 'title') {
		// 		sortByTitle();
		// 	}

		// 	// Close the dropdown menu
		// 	dropdownContainer.removeChild(dropdownMenu);
		// }

		// // Function to open/close the dropdown menu
		// function toggleDropdown() {
		// 	const isDropdownOpen = dropdownContainer.contains(dropdownMenu);
		// 	if (isDropdownOpen) {
		// 		dropdownContainer.removeChild(dropdownMenu);

		// 		// Remove arrow-up class and add arrow-down class to select element
		// 		selectElement.removeChild(arrowUp);
		// 		selectElement.appendChild(arrowDown);
		// 	} else {
		// 		dropdownContainer.appendChild(dropdownMenu);

		// 		// Remove arrow-down class and add arrow-up class to select element
		// 		selectElement.removeChild(arrowDown);
		// 		selectElement.appendChild(arrowUp);
		// 	}
		// }

		// // Add event listener to the select element to toggle dropdown
		// selectElement.addEventListener('click', toggleDropdown);

		// const options = ['Popularité', 'Date', 'Titre'];

		// // Create the container for the sort selector container
		// const sortContainer = document.createElement('div');
		// sortContainer.classList.add('sort-container');

		// // Create the sort selector label
		// const sortLabel = document.createElement('p');
		// sortLabel.textContent = 'Trier par';

		// // bouton principal
		// const mainButton = document.createElement('button');
		// mainButton.textContent = 'Popularité';
		// mainButton.classList.add('sort-button');
		// mainButton.addEventListener('click', toggleDropdown);

		// const arrow = document.createElement('img');
		// arrow.setAttribute('src', './assets/icons/vector.png');
		// arrow.classList.add('arrow-down');
		// arrow.setAttribute('alt', 'arrow');
		// mainButton.appendChild(arrow);

		// sortContainer.appendChild(sortLabel);
		// sortContainer.appendChild(mainButton);

		// function toggleDropdown() {
		// 	// Supprimer le bouton principal
		// 	sortContainer.removeChild(mainButton);

		// 	// Créer le nouveau DOM avec le menu déroulant
		// 	const dropdownMenu = document.createElement('ul');
		// 	dropdownMenu.classList.add('dropdown-menu');

		// 	// Créer les options du menu déroulant
		// 	options.forEach((option) => {
		// 		const li = document.createElement('li');
		// 		li.textContent = option;
		// 		li.addEventListener('click', () => {
		// 			// Supprimer le menu déroulant
		// 			sortContainer.removeChild(dropdownMenu);

		// 			// Créer le nouveau DOM avec le bouton sélectionné
		// 			const mainButton = document.createElement('button');
		// 			mainButton.textContent = option;
		// 			mainButton.classList.add('sort-button');
		// 			mainButton.addEventListener('click', toggleDropdown);

		// 			const arrow = document.createElement('img');
		// 			arrow.setAttribute('src', './assets/icons/vector.png');
		// 			arrow.classList.add('arrow-down');
		// 			arrow.setAttribute('alt', 'arrow');
		// 			mainButton.appendChild(arrow);

		// 			sortContainer.appendChild(mainButton);
		// 		});
		// 		dropdownMenu.appendChild(li);
		// 	});

		// const arrow = document.createElement('img');
		// arrow.setAttribute('src', './assets/icons/vector.png');
		// arrow.classList.add('arrow-up');
		// arrow.setAttribute('alt', 'arrow');
		// dropdownMenu.appendChild(arrow);

		// 	sortContainer.appendChild(dropdownMenu);
		// }

		// Gallery

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
