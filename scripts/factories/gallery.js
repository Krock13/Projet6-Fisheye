export function galleryFactory(data) {
	function getMediaCardDOM() {
		// Create the container for the sort selector container
		const sortContainer = document.createElement('div');
		sortContainer.classList.add('sort-container');

		const sortLabel = document.createElement('p');
		sortLabel.textContent = 'Trier par';

		const arrowDown = document.createElement('img');
		arrowDown.setAttribute('src', './assets/icons/whiteArrow.png');
		arrowDown.classList.add('arrow-down');
		arrowDown.setAttribute('alt', 'arrow');

		const arrowUp = document.createElement('img');
		arrowUp.setAttribute('src', './assets/icons/whiteArrow.png');
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

		function buttonPopularity() {
			const sortButton = document.getElementById('sort-button');
			sortContainer.removeChild(sortButton);
			const selectedOption = 'popularity';
			const mainButton = document.createElement('button');
			mainButton.setAttribute('id', 'main-button');
			mainButton.textContent = 'Popularité';
			mainButton.addEventListener('click', function () {
				dropdownMenu(selectedOption);
			});
			const gallerySort = document.querySelector('.gallery-grid');
			galleryContainer.removeChild(gallerySort);
			const sorting = 'popularity';
			createGalleryDOM(sorting);

			mainButton.appendChild(arrowDown);
			sortContainer.appendChild(mainButton);
		}
		function buttonDate() {
			const sortButton = document.getElementById('sort-button');
			sortContainer.removeChild(sortButton);
			const selectedOption = 'date';
			const mainButton = document.createElement('button');
			mainButton.setAttribute('id', 'main-button');
			mainButton.textContent = 'Date';
			mainButton.addEventListener('click', function () {
				dropdownMenu(selectedOption);
			});
			const gallerySort = document.querySelector('.gallery-grid');
			galleryContainer.removeChild(gallerySort);
			const sorting = 'date';
			createGalleryDOM(sorting);

			mainButton.appendChild(arrowDown);
			sortContainer.appendChild(mainButton);
		}

		function buttonTitle() {
			const sortButton = document.getElementById('sort-button');
			sortContainer.removeChild(sortButton);
			const selectedOption = 'title';
			const mainButton = document.createElement('button');
			mainButton.setAttribute('id', 'main-button');
			mainButton.textContent = 'Titre';
			mainButton.addEventListener('click', function () {
				dropdownMenu(selectedOption);
			});
			const gallerySort = document.querySelector('.gallery-grid');
			galleryContainer.removeChild(gallerySort);
			const sorting = 'title';
			createGalleryDOM(sorting);

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
				firstOption.addEventListener('click', buttonPopularity);

				const secondOption = document.createElement('p');
				secondOption.textContent = 'Date';
				secondOption.addEventListener('click', buttonDate);

				const thirdOption = document.createElement('p');
				thirdOption.textContent = 'Titre';
				thirdOption.addEventListener('click', buttonTitle);

				sortButton.appendChild(arrowUp);
				sortButton.appendChild(firstOption);
				sortButton.appendChild(secondOption);
				sortButton.appendChild(thirdOption);
				sortContainer.appendChild(sortButton);
			} else if (selectedOption === 'date') {
				const firstOption = document.createElement('p');
				firstOption.textContent = 'Date';
				firstOption.addEventListener('click', buttonDate);

				const secondOption = document.createElement('p');
				secondOption.textContent = 'Popularité';
				secondOption.addEventListener('click', buttonPopularity);

				const thirdOption = document.createElement('p');
				thirdOption.textContent = 'Titre';
				thirdOption.addEventListener('click', buttonTitle);

				sortButton.appendChild(arrowUp);
				sortButton.appendChild(firstOption);
				sortButton.appendChild(secondOption);
				sortButton.appendChild(thirdOption);
				sortContainer.appendChild(sortButton);
			} else if (selectedOption === 'title') {
				const firstOption = document.createElement('p');
				firstOption.textContent = 'Titre';
				firstOption.addEventListener('click', buttonTitle);

				const secondOption = document.createElement('p');
				secondOption.textContent = 'Date';
				secondOption.addEventListener('click', buttonDate);

				const thirdOption = document.createElement('p');
				thirdOption.textContent = 'Popularité';
				thirdOption.addEventListener('click', buttonPopularity);

				sortButton.appendChild(arrowUp);
				sortButton.appendChild(firstOption);
				sortButton.appendChild(secondOption);
				sortButton.appendChild(thirdOption);
				sortContainer.appendChild(sortButton);
			}
		}
		// Gallery

		// Create the container for the gallery items
		const galleryContainer = document.createElement('div');
		galleryContainer.classList.add('gallery-container');

		const sorting = 'popularity';
		createGalleryDOM(sorting);

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
				// Iterate over the data and create gallery items
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
							createLightbox(item);
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
							createLightbox(item);
						});
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

				function createLightbox(media) {
					function closeLightbox() {
						const main = document.querySelector('#main');
						const lightbox = document.querySelector('.lightbox');
						main.removeChild(lightbox);
					}

					function goToSlide(direction) {
						const lightboxContainer = document.querySelector('.lightbox_container');
						const currentMedia = document.querySelector('.mediaLightbox');

						const src = currentMedia.getAttribute('src');
						const filename = src.split('/').pop();
						const currentIndex = data.findIndex((obj) => obj.image === filename || obj.video === filename);

						let newIndex;
						if (direction === 'next') {
							const isLastSlide = currentIndex === data.length - 1;
							newIndex = isLastSlide ? 0 : currentIndex + 1;
						} else if (direction === 'previous') {
							const isFirstSlide = currentIndex === 0;
							newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1;
						}

						lightboxContainer.removeChild(currentMedia);
						const media = data[newIndex];

						if (media.image) {
							const image = document.createElement('img');
							image.src = `./assets/media/${media.image}`;
							image.classList.add('mediaLightbox');
							lightboxContainer.appendChild(image);
						} else if (media.video) {
							const video = document.createElement('video');
							video.src = `./assets/media/${media.video}`;
							video.classList.add('mediaLightbox');
							video.setAttribute('controls', '');
							lightboxContainer.appendChild(video);
						}
					}

					const lightbox = document.createElement('div');
					lightbox.classList.add('lightbox');

					const lightboxContainer = document.createElement('div');
					lightboxContainer.classList.add('lightbox_container');

					if (media.image) {
						const image = document.createElement('img');
						image.src = `./assets/media/${media.image}`;
						image.classList.add('mediaLightbox');
						lightboxContainer.appendChild(image);
					} else if (media.video) {
						const video = document.createElement('video');
						video.src = `./assets/media/${media.video}`;
						video.classList.add('mediaLightbox');
						video.setAttribute('controls', '');
						lightboxContainer.appendChild(video);
					}

					const lightboxClose = document.createElement('button');
					lightboxClose.innerText = 'Fermer';
					lightboxClose.classList.add('lightbox_close');
					lightboxClose.addEventListener('click', closeLightbox);

					const lightboxNext = document.createElement('button');
					lightboxNext.innerText = 'Suivant';
					lightboxNext.classList.add('lightbox_next');
					lightboxNext.addEventListener('click', () => goToSlide('next'));

					const lightboxPrev = document.createElement('button');
					lightboxPrev.innerText = 'Précédent';
					lightboxPrev.classList.add('lightbox_prev');
					lightboxPrev.addEventListener('click', () => goToSlide('previous'));

					lightboxContainer.appendChild(lightboxClose);
					lightboxContainer.appendChild(lightboxNext);
					lightboxContainer.appendChild(lightboxPrev);
					lightbox.appendChild(lightboxContainer);

					const main = document.getElementById('main');
					main.appendChild(lightbox);
				}
			}
		}
		return { sortContainer, galleryContainer };
	}
	// Return an object with the getMediaCardDOM method
	return { getMediaCardDOM };
}
