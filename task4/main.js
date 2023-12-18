import './index.css';
import 'normalize.css'
import jsonFileSetUp from './cardsData.json';

function createElementWithClass(elementType, className) {
    const element = document.createElement(elementType);
    element.classList.add(className);
    return element;
}

function createCardElement(card, index) {
    const divCard = createElementWithClass("div", "list-block__card");
    divCard.id = `card${index}`;

    const divCardTop = createElementWithClass("div", "list-block__card-top");
    divCardTop.id = `cardTop${index}`;
    divCard.appendChild(divCardTop);

    const divCardId = createElementWithClass("div", "list-block__card-id");
    divCardId.id = `cardId${index}`;
    divCardId.textContent = `Id: ${card.id}`;
    divCardTop.appendChild(divCardId);

    const divCardMain = createElementWithClass("div", "list-block__card-main");
    divCardMain.id = `cardMain${index}`;
    divCard.appendChild(divCardMain);

    const divCardImg = createElementWithClass("img", "list-block__card-image");
    divCardImg.id = `cardImg${index}`;
    divCardImg.src = card.image;
    divCardMain.appendChild(divCardImg);

    const divCardText = createElementWithClass("div", "list-block__card-text");
    divCardText.id = `cardText${index}`;
    divCardMain.appendChild(divCardText);

    const divCardName = createElementWithClass("div", "list-block__card-name");
    divCardName.id = `cardName${index}`;
    divCardName.textContent = card.name;
    divCardText.appendChild(divCardName);

    const divCardDescription = createElementWithClass("div", "list-block__card-description");
    divCardDescription.id = `cardDescription${index}`;
    divCardDescription.textContent = card.description;
    divCard.appendChild(divCardDescription);

    const divCardBottom = createElementWithClass("div", "list-block__card-bottom");
    divCardBottom.id = `cardBottom${index}`;
    divCard.appendChild(divCardBottom);

    const divCardRed = createElementWithClass("a", "list-block__card-red");
    divCardRed.id = `cardRed${index}`;
    divCardRed.addEventListener('click', fillForm);
    divCardRed.pos = index;
    divCardRed.textContent = 'Редактировать';
    divCardBottom.appendChild(divCardRed);

    const divCardDel = createElementWithClass("a", "list-block__card-red");
    divCardDel.id = `cardDel${index}`;
    divCardDel.textContent = `Удалить`;
    divCardDel.addEventListener('click', deleteCard);
    divCardDel.pos = index;
    divCardBottom.appendChild(divCardDel);

    return divCard;
}

function renderCards() {
    const cardsContainer = document.querySelector(".list-block__list");
    const cardsData = JSON.parse(localStorage.getItem('cards')) || [];

    cardsContainer.innerHTML = '';
    cardsData.forEach((card, index) => cardsContainer.appendChild(createCardElement(card, index)));
}

function standardСards() {
    localStorage.setItem('cards', JSON.stringify(jsonFileSetUp));
    renderCards();
}

function serializeForm(formNode, obj) {
    const fieldMappings = {
        'name': 'name',
        'image': 'image',
        'description': 'description',
        'id': 'id'
    };

    const formData = new FormData(formNode);

    Object.entries(fieldMappings).forEach(([formKey, cardKey]) => {
        if (formData.has(formKey)) {
            obj[cardKey] = formData.get(formKey);
        }
    });

    return obj;
}

function saveCard(event) {
    const card = serializeForm(applicantForm, {});

    if (!card.name || !card.image || !card.description || !card.id) {
        alert("Поля не заполнены");
        return;
    }

    let cards = JSON.parse(localStorage.getItem("cards")) || [];
    cards.push(card);
    
    localStorage.setItem('cards', JSON.stringify(cards));
    renderCards();
}

function deleteCard(event) {
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    const updatedCards = cards.filter((_, index) => index !== event.target.pos);

    localStorage.setItem('cards', JSON.stringify(updatedCards));
    renderCards();
}

function fillForm(event) {
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    const card = cards[event.target.pos];

    document.getElementsByName('name')[0].value = card.name || '';
    document.getElementsByName('image')[0].value = card.image || '';
    document.getElementsByName('description')[0].value = card.description || '';
    document.getElementsByName('id')[0].value = card.id || '';

    document.getElementById('submit-button').classList.add('invisible');
    const editButton = document.getElementById('edit-button');
    editButton.classList.remove('invisible');
    editButton.pos = event.target.pos;
}

function editCard(event) {
    let cards = JSON.parse(localStorage.getItem("cards")) || [];
    let editedCard = serializeForm(applicantForm, {});
    
    cards[event.target.pos] = editedCard;

    localStorage.setItem('cards', JSON.stringify(cards));

    document.getElementById('submit-button').classList.remove('invisible');
    document.getElementById('edit-button').classList.add('invisible');
    renderCards();
}

const applicantForm = document.getElementById('card-form');
const setupButton = document.getElementById('setup-button');
const editButton = document.getElementById('edit-button');
const submitButton = document.getElementById('submit-button');

setupButton.addEventListener('click', standardСards);
submitButton.addEventListener('click', saveCard);
editButton.addEventListener('click', editCard);

renderCards();