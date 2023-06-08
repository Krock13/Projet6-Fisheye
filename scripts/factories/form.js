import { closeModal } from '../utils/contactForm.js';

export function createModalDOM() {
	const name = document.querySelector('.photographer_name');

	// Create modal container
	const modal = document.createElement('div');
	modal.classList.add('modal');

	// Create header section
	const header = document.createElement('header');
	const title = document.createElement('h2');
	const titleId = 'modal-title';
	title.innerHTML = 'Contactez-moi<br>' + name.textContent;
	title.setAttribute('id', titleId);
	const closeIcon = document.createElement('img');
	closeIcon.src = 'assets/icons/whiteCross.png';
	closeIcon.alt = 'Fermer le formulaire de contact';
	closeIcon.addEventListener('click', closeModal);

	header.appendChild(title);
	header.appendChild(closeIcon);

	// Create form section
	const form = document.createElement('form');

	// Create First Name input field
	const firstNameLabel = document.createElement('label');
	firstNameLabel.textContent = 'Prénom';
	const firstNameInput = document.createElement('input');
	const firstNameInputId = 'first-name-input';
	firstNameLabel.setAttribute('id', firstNameInputId);
	firstNameInput.type = 'text';
	firstNameInput.required = true;
	firstNameInput.setAttribute('aria-labelledby', firstNameInputId);
	form.appendChild(firstNameLabel);
	form.appendChild(firstNameInput);

	// Create Last Name input field
	const lastNameLabel = document.createElement('label');
	lastNameLabel.textContent = 'Nom';
	const lastNameInput = document.createElement('input');
	const lastNameInputId = 'last-name-input';
	lastNameLabel.setAttribute('id', lastNameInputId);
	lastNameInput.type = 'text';
	lastNameInput.required = true;
	lastNameInput.setAttribute('aria-labelledby', lastNameInputId);
	form.appendChild(lastNameLabel);
	form.appendChild(lastNameInput);

	// Create Email input field
	const emailLabel = document.createElement('label');
	emailLabel.textContent = 'Email';
	const emailInput = document.createElement('input');
	const emailInputId = 'email-input';
	emailLabel.setAttribute('id', emailInputId);
	emailInput.type = 'email';
	emailInput.required = true;
	emailInput.setAttribute('aria-labelledby', emailInputId);
	form.appendChild(emailLabel);
	form.appendChild(emailInput);

	// Create Message input field
	const messageLabel = document.createElement('label');
	messageLabel.textContent = 'Votre message';
	const messageInput = document.createElement('textarea');
	const messageInputId = 'message-input';
	messageLabel.setAttribute('id', messageInputId);
	messageInput.required = true;
	messageInput.setAttribute('aria-labelledby', messageInputId);
	form.appendChild(messageLabel);
	form.appendChild(messageInput);

	// Create Submit button
	const submitButton = document.createElement('button');
	submitButton.textContent = 'Envoyer';
	submitButton.type = 'submit';
	form.appendChild(submitButton);

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		// Retrieve input values
		const firstNameValue = firstNameInput.value.trim();
		const lastNameValue = lastNameInput.value.trim();
		const emailValue = emailInput.value.trim();
		const messageValue = messageInput.value.trim();

		// Log input values
		console.log('Prénom:', firstNameValue);
		console.log('Nom:', lastNameValue);
		console.log('Email:', emailValue);
		console.log('Votre message:', messageValue);

		// Clear input fields
		firstNameInput.value = '';
		lastNameInput.value = '';
		emailInput.value = '';
		messageInput.value = '';
	});

	// Append header and form to the modal
	modal.appendChild(header);
	modal.appendChild(form);

	// Set attributes for accessibility
	modal.setAttribute('id', 'modal');
	modal.setAttribute('aria-labelledby', titleId);

	return modal;
}
