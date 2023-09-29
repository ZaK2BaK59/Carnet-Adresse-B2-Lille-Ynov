let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function afficherContacts() {
    const contactList = document.getElementById('contactList');


    contactList.innerHTML = '';

    contacts.forEach((contact, index) => {
        const li = document.createElement('li');
        li.textContent = `Genre: ${contact.civilite} Nom: ${contact.nom} Prénom:${contact.prenom}  Tél:${contact.telephone}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.dataset.index = index; // Pour connaître l'index du contact à supprimer
        deleteButton.addEventListener('click', supprimerContact);

        const editButton = document.createElement('button');
        editButton.textContent = 'Modifier';
        editButton.dataset.index = index; // Pour connaître l'index du contact à modifier
        editButton.addEventListener('click', () => modifierContact(index));

        li.appendChild(deleteButton);
        li.appendChild(editButton);

        contactList.appendChild(li);
    });
}

function supprimerContact() {
    const index = this.dataset.index;

    contacts.splice(index, 1);

    localStorage.setItem('contacts', JSON.stringify(contacts));

    afficherContacts();
}

function modifierContact(index) {
    const contact = contacts[index];
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const telephone = document.getElementById('telephone').value;
    const civilite = document.getElementById('civilite').value;

    if (nom && prenom && telephone && civilite) {
        contact.nom = nom;
        contact.prenom = prenom;
        contact.telephone = telephone;
        contact.civilite = civilite;

        localStorage.setItem('contacts', JSON.stringify(contacts));

        document.getElementById('addContactForm').reset();
    }
    location.reload();

    afficherContacts();
}

function ajouterGestionnaireModifier() {
    const buttons = document.querySelectorAll('#contactList button');
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            modifierContact(index);
        });
    });
}

function ajouterGestionnaireInformations() {
    const informations = document.querySelectorAll('#contactList li');

    informations.forEach((info, index) => {
        info.addEventListener('click', () => preRemplirChamps(index));
    });
}

function preRemplirChamps(index) {
    const contact = contacts[index];
    document.getElementById('nom').value = contact.nom;
    document.getElementById('prenom').value = contact.prenom;
    document.getElementById('telephone').value = contact.telephone;
    document.getElementById('civilite').value = contact.civilite;
}

document.getElementById('addContactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const telephone = document.getElementById('telephone').value;
    const civilite = document.getElementById('civilite').value;

    const contact = {
        nom,
        prenom,
        telephone,
        civilite
    };

    contacts.push(contact);

    localStorage.setItem('contacts', JSON.stringify(contacts));

    this.reset();

    afficherContacts();
});

document.getElementById('deleteAllContacts').addEventListener('click', function() {

    contacts = [];

    localStorage.removeItem('contacts');

    afficherContacts();
});

window.addEventListener('load', () => {
    afficherContacts();
    ajouterGestionnaireModifier();
    ajouterGestionnaireInformations();
});
