import { createModalDOM } from '../factories/form.js';

export function displayModal() {
	const main = document.querySelector('#main');
	const modal = document.getElementById('contact_modal');

	// Create modal DOM if it doesn't exist
	if (!modal.hasChildNodes()) {
		const modalDOM = createModalDOM();
		modal.appendChild(modalDOM);
	}
	modal.style.display = 'block';
	main.style.opacity = 0.6;

	// Set focus on the first input element in the modal
	const firstInputElement = modal.querySelector('input');
	if (firstInputElement) {
		firstInputElement.focus();
	}
}

export function closeModal() {
	const main = document.querySelector('#main');
	const modal = document.getElementById('contact_modal');
	modal.style.display = 'none';
	main.style.opacity = 1;

	// Set focus back to the element that opened the modal
	const openerElement = document.querySelector('.contact_button');
	openerElement.focus();
}

function closeModalOnEscape(event) {
	const modal = document.getElementById('contact_modal');

	// Close modal on Escape key press only if the modal is currently open
	if (event.key === 'Escape' && modal.style.display === 'block') {
		closeModal();
	}
}

document.addEventListener('keydown', closeModalOnEscape);
