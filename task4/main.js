import './index.css';
import 'normalize.css'




const standartCardsArray = [
    {
        "name": "Один",
        "image": "https://sun6-22.userapi.com/s/v1/ig2/rdXdOMgjScCFamvLBrRs7KGvVV5aCEkVWQkq2ptiRGT3QBrGb3iZoo-UMdZOkeBax7DsB_PRRhjGcePdpq4hISq-.jpg?size=2560x2560&quality=95&crop=0,0,2560,2560&ava=1",
        "description": "Единичка",
        "id": 1
      },
      {
        "name": "Два",
        "image": "https://i.sadvitrina.com/diygoods/80361/tsифра_2_larvij_bolshaya_tsvet_chyorniy_1_pic.jpg",
        "description": "Двоечка",
        "id": 2
      },
      {
        "name": "Три",
        "image": "https://res.cloudinary.com/lmru/image/upload/LMCode/15632861.jpg",
        "description": "Ну хотя бы троечка",
        "id": 3
      }
]



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
    divCardRed.addEventListener('click', ()=>{fillForm(card)});
    divCardRed.pos = index;
    divCardRed.textContent = 'Редактировать';
    divCardBottom.appendChild(divCardRed);

    const divCardDel = createElementWithClass("a", "list-block__card-red");
    divCardDel.id = `cardDel${index}`;
    divCardDel.textContent = `Удалить`;
    divCardDel.addEventListener('click', ()=>{deleteCard(card.id)});
    divCardDel.pos = index;
    divCardBottom.appendChild(divCardDel);

    return divCard;
}

async function renderCards() {

    const cardsContainer = document.querySelector(".list-block__list");
    const cardsData = await fetchData();

    cardsContainer.innerHTML = '';
    cardsData.forEach((card, index) => cardsContainer.appendChild(createCardElement(card, index)));
}

async function standardСards(){

    showLoader();

    const cards = await fetch('http://localhost:3333/items').then(response => response.json());

    if (cards.length === 0) {
        try {
            const addCardPromises = standartCardsArray.map(async (newCard) => {
                const response = await fetch('http://localhost:3333/items', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newCard),
                });

                if (!response.ok) {
                    throw new Error('Failed to add card to the server.');
                }
            });

            await Promise.all(addCardPromises);
            
        } catch (error) {
            console.error('Error adding card:', error);
            alert('Failed to add card to the server.');
            return;
        }
    } else {
        alert('Cards already exist');
    }

    hideLoader();
    await renderCards();
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

async function fetchData() {
    showLoader();
    try {
        const response = await fetch('http://localhost:3333/items');
        if (!response.ok) {
            throw new Error('Failed to fetch data from the server.');
        }

        const data = await response.json();

        hideLoader();

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data from the server.');
    }
}

async function saveCard(event) {
    showLoader();

    const card = serializeForm(applicantForm, {});

    if (!card.name || !card.image || !card.description || !card.id) {
        alert("The fields are not filled in");
        return;
    }
    try {
        const response = await fetch('http://localhost:3333/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(card),
        });

        if (!response.ok) {
            throw new Error('Failed to add card to the server.');
        }

        hideLoader();

        renderCards();
    } catch (error) {
        console.error('Error adding card:', error);
        console.error('Response from server:', await response.text());
        alert('Failed to add card to the server.');
    }
}

async function deleteCard(event) {
    showLoader();
    let response;
    try {
        response = await fetch(`http://localhost:3333/items/${event}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete card from the server.');
        }

        renderCards();
    } catch (error) {
        console.error('Error deleting card:', error);
        console.error('Response from server:', await response.text());
        alert('Failed to delete card from the server.');
    } finally {
        hideLoader();
    }
}

async function fillForm(card) {

    document.getElementsByName('name')[0].value = card.name || '';
    document.getElementsByName('image')[0].value = card.image || '';
    document.getElementsByName('description')[0].value = card.description || '';
    document.getElementsByName('id')[0].value = card.id || '';

    document.getElementById('submit-button').classList.add('invisible');
    const editButton = document.getElementById('edit-button');
    editButton.classList.remove('invisible');
}

async function editCard(event) {
    showLoader();
    try {

        const editedCard = serializeForm(applicantForm, {});
        const cardId = editedCard.id

        const response = await fetch(`http://localhost:3333/items/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedCard),
        });

        if (!response.ok) {
            throw new Error('Failed to update card on the server.');
        }


        hideLoader();

        document.getElementById('submit-button').classList.remove('invisible');
        document.getElementById('edit-button').classList.add('invisible');

        renderCards();

    } catch (error) {
        console.error('Error adding card:', error);
        console.error('Response from server:', await response.text());
        alert('Failed to add card to the server.');
    }

}

async function getProfile(){
    try {
        const  response = await fetch('http://localhost:3333/creatorInfo')

        if (!response.ok) {
            throw new Error('Failed to fetch data from the server.');
        }

        const data = await response.json();

        document.getElementById('header__text').textContent = data.name + " " + data.group;
    } catch (error) {
        alert("Error getting the name: " + error);
    }
    
}

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

const applicantForm = document.getElementById('card-form');
const setupButton = document.getElementById('setup-button');
const editButton = document.getElementById('edit-button');
const submitButton = document.getElementById('submit-button');

const loader = document.getElementById('loader');

setupButton.addEventListener('click', standardСards);
submitButton.addEventListener('click', saveCard);
editButton.addEventListener('click', editCard);

window.addEventListener('load', async () => {
    await renderCards();
    await getProfile();
});