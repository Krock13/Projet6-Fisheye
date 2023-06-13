const likedItems = [];

export function like(heartButton, totalLikesElement) {
	const itemId = heartButton.dataset.itemId;
	const likeNumber = heartButton.parentNode.querySelector('.like');

	// Check if the item is already liked by searching its ID in the array
	const isLiked = likedItems.includes(itemId);

	if (isLiked) {
		// Remove the item from the liked items array
		const itemIndex = likedItems.indexOf(itemId);
		likedItems.splice(itemIndex, 1);

		// Decrement the number of likes
		const currentLikes = parseInt(likeNumber.textContent);
		likeNumber.textContent = (currentLikes - 1).toString();

		// Decrement the number of total likes
		const currentTotalLikes = parseInt(totalLikesElement.textContent);
		totalLikesElement.textContent = (currentTotalLikes - 1).toString();

		heartButton.setAttribute('aria-label', 'likes');
	} else {
		// Add the item to the liked items array
		likedItems.push(itemId);

		// Increment the number of likes
		const currentLikes = parseInt(likeNumber.textContent);
		likeNumber.textContent = (currentLikes + 1).toString();

		// Increment the number of total likes
		const currentTotalLikes = parseInt(totalLikesElement.textContent);
		totalLikesElement.textContent = (currentTotalLikes + 1).toString();

		heartButton.setAttribute('aria-label', 'unlike');
	}
}
