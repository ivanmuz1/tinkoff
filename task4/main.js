import 'normalize.css';
import './index.less';

class Card {
    constructor(name, url, desc, id) {
        this.name = name;
        this.url = url;
        this.description = desc;
        this.id = id;
    }
}

function constructCards() {
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let i = 0;
    for (let card of (cards ? cards : []) ){
        const divCard = document.createElement("div");
        divCard.id = `card${i}`;
        divCard.setAttribute('class', "list-block__card");
        document.getElementsByClassName("list-block__list")[0].appendChild(divCard);

        const divCardTop = document.createElement("div");
        divCardTop.id = `cardTop${i}`;
        divCardTop.setAttribute('class', "list-block__card-top");
        document.getElementById(`card${i}`).appendChild(divCardTop);

        const divCardId = document.createElement("div");
        divCardId.id = `cardId${i}`;
        divCardId.setAttribute('class', "list-block__card-id");
        divCardId.textContent = `Id: ${card.id}`;
        document.getElementById(`cardTop${i}`).appendChild(divCardId);
        
        const divCardMain = document.createElement("div");
        divCardMain.id = `cardMain${i}`;
        divCardMain.setAttribute('class', "list-block__card-main");
        document.getElementById(`card${i}`).appendChild(divCardMain);

        const divCardImg = document.createElement("img");
        divCardImg.id = `cardImg${i}`;
        divCardImg.setAttribute('class', "list-block__card-img");
        divCardImg.src = `${card.url}`;
        document.getElementById(`cardMain${i}`).appendChild(divCardImg);

        const divCardText = document.createElement("div");
        divCardText.id = `cardText${i}`;
        divCardText.setAttribute('class', "list-block__card-text");
        document.getElementById(`cardMain${i}`).appendChild(divCardText);

        const divCardName = document.createElement("div");
        divCardName.id = `cardName${i}`;
        divCardName.setAttribute('class', "list-block__card-name");
        divCardName.textContent = `${card.name}`;
        document.getElementById(`cardText${i}`).appendChild(divCardName);

        const divCardDescription = document.createElement("div");
        divCardDescription.id = `cardDescription${i}`;
        divCardDescription.setAttribute('class', "list-block__card-description");
        divCardDescription.textContent = `${card.description}`;
        document.getElementById(`card${i}`).appendChild(divCardDescription);

        const divCardBottom = document.createElement("div");
        divCardBottom.id = `cardBottom${i}`;
        divCardBottom.setAttribute('class', "list-block__card-bottom");
        document.getElementById(`card${i}`).appendChild(divCardBottom);

        const divCardRed = document.createElement("a");
        divCardRed.id = `cardRed${i}`;
        divCardRed.setAttribute('class', "list-block__card-red");
        divCardRed.addEventListener('click', InForm);
        divCardRed.pos = i;
        divCardRed.textContent = 'Редактировать';
        document.getElementById(`cardBottom${i}`).appendChild(divCardRed);

        const divCardDel = document.createElement("a");
        divCardId.id = `cardDel${i}`;
        divCardDel.setAttribute('class', "list-block__card-red");
        divCardDel.textContent = `Удалить`;
        divCardDel.addEventListener('click', deleteCard);
        divCardDel.pos = i;
        document.getElementById(`cardBottom${i}`).appendChild(divCardDel);

        ++i;
    }
}

function setupCards () {
    let one = new Card("Один", "https://sun6-22.userapi.com/s/v1/ig2/rdXdOMgjScCFamvLBrRs7KGvVV5aCEkVWQkq2ptiRGT3QBrGb3iZoo-UMdZOkeBax7DsB_PRRhjGcePdpq4hISq-.jpg?size=2560x2560&quality=95&crop=0,0,2560,2560&ava=1", "Единичка", 1);
    let two = new Card("Два", "https://i.sadvitrina.com/diygoods/80361/tsifra_2_larvij_bolshaya_tsvet_chyorniy_1_pic.jpg", "Двоечка", 2);
    let three = new Card("Три", "https://res.cloudinary.com/lmru/image/upload/LMCode/15632861.jpg", "Ну хотя бы троечка", 3);
    let array = [one, two, three];
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(array));
    location.reload();
}

function serializeForm(formNode, obj) {
    const data = Array.from((new FormData(formNode)).entries());
    let card = obj;
    for (let i = 0; i < data.length; ++i) {
        let [key, value] = data[i];
        switch (true) {
            case key == 'name':
                card.name = value;
                break;
            case key == 'url':
                card.url = value;
                break;
            case key == 'description':
                card.description = value;
                break;
            case key == 'ID':
                card.id = value;
                break;
            default: break;
        }
    }
    return card;
}
  
function pushCard(event) {
    let card = serializeForm(applicantForm, new Card());
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    cards.push(card);
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
}
  
function deleteCard(event) { 
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    cards.splice(event.target.pos, 1);
    window.localStorage.setItem('cards', JSON.stringify(cards));
    location.reload();
}

function InForm(event) {
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let card = cards.at(event.target.pos);
    document.getElementsByName('name')[0].value = card.name;
    document.getElementsByName('url')[0].value = card.url;
    document.getElementsByName('description')[0].value = card.description;
    document.getElementsByName('ID')[0].value = card.id;
    document.getElementById('submit-button').classList.add('invisible');
    document.getElementById('edit-button').classList.remove('invisible');
    document.getElementById('edit-button').pos = event.target.pos;
}

function editCard(event) {
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let card = serializeForm(applicantForm, cards.at(event.target.pos));
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
    document.getElementById('submit-button').classList.remove('invisible');
    document.getElementById('edit-button').classList.add('invisible');

}

const applicantForm = document.getElementById('card-form')
const setupButton = document.getElementById('setup-button');
const editButton = document.getElementById('edit-button');
const submitButton = document.getElementById('submit-button');

setupButton.addEventListener('click', setupCards);
submitButton.addEventListener('click', pushCard);
editButton.addEventListener('click', editCard);
window.onload = constructCards;