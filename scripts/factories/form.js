import { closeModal } from '../utils/contactForm.js';

export function createModalDOM() {
	const name = document.querySelector('.photographer_name');

	const modal = document.createElement('div');
	modal.classList.add('modal');

	const header = document.createElement('header');
	const title = document.createElement('h2');
	const titleId = 'modal-title';
	title.innerHTML = 'Contactez-moi<br>' + name.textContent;
	title.setAttribute('id', titleId);
	const closeIcon = document.createElement('img');
	closeIcon.src = 'assets/icons/close.svg';
	closeIcon.alt = 'Fermer le formulaire de contact';
	closeIcon.addEventListener('click', closeModal);

	header.appendChild(title);
	header.appendChild(closeIcon);

	const form = document.createElement('form');

	// Créer le champ Prénom
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

	// Créer le champ Nom
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

	// Créer le champ Email
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

	// Créer le champ Votre message
	const messageLabel = document.createElement('label');
	messageLabel.textContent = 'Votre message';
	const messageInput = document.createElement('textarea');
	const messageInputId = 'message-input';
	messageLabel.setAttribute('id', messageInputId);
	messageInput.required = true;
	messageInput.setAttribute('aria-labelledby', messageInputId);
	form.appendChild(messageLabel);
	form.appendChild(messageInput);

	// Créer le bouton Envoyer
	const submitButton = document.createElement('button');
	submitButton.textContent = 'Envoyer';
	submitButton.type = 'submit';
	form.appendChild(submitButton);

	// Gestionnaire d'événement lors du clic sur le bouton Envoyer
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		// Vérification des champs avec les expressions régulières
		const regexFirstName = /^[a-zA-Zéèàùç'-]+$/;
		const regexLastName = /^[a-zA-Zéèàùç'-]+$/;
		const regexEmail = /^\S+@\S+\.\S+$/;

		// Récupération des valeurs des champs
		const firstNameValue = firstNameInput.value.trim();
		const lastNameValue = lastNameInput.value.trim();
		const emailValue = emailInput.value.trim();
		const messageValue = messageInput.value.trim();

		let isValid = true;

		// Vérification du champ Prénom
		if (!regexFirstName.test(firstNameValue)) {
			isValid = false;
		}

		// Vérification du champ Nom
		if (!regexLastName.test(lastNameValue)) {
			isValid = false;
		}

		// Vérification du champ Email
		if (!regexEmail.test(emailValue)) {
			isValid = false;
		}

		// Vérification du champ Votre message
		if (messageValue === '') {
			isValid = false;
		}

		if (isValid) {
			// Les champs sont tous valides, affichage des valeurs dans la console
			console.log('Prénom:', firstNameValue);
			console.log('Nom:', lastNameValue);
			console.log('Email:', emailValue);
			console.log('Votre message:', messageValue);

			// Réinitialisation des champs
			firstNameInput.value = '';
			lastNameInput.value = '';
			emailInput.value = '';
			messageInput.value = '';
		}
	});

	modal.appendChild(header);
	modal.appendChild(form);

	modal.setAttribute('id', 'modal');
	modal.setAttribute('aria-labelledby', titleId);

	return modal;
}
