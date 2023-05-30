import { createModalDOM } from '../factories/form.js';

export function displayModal() {
	const main = document.querySelector('#main');
	const modal = document.getElementById('contact_modal');
	if (!modal.hasChildNodes()) {
		const modalDOM = createModalDOM();
		modal.appendChild(modalDOM);
	}
	modal.style.display = 'block';
	main.style.opacity = 0.6;
}

export function closeModal() {
	const main = document.querySelector('#main');
	const modal = document.getElementById('contact_modal');
	modal.style.display = 'none';
	main.style.opacity = 1;
}

function closeModalOnEscape(event) {
	if (event.key === 'Escape') {
		closeModal();
	}
}

document.addEventListener('keydown', closeModalOnEscape);
