const profilePopupOpenButton = document.querySelector('.profile__info-edit-button');
const placePopupOpenButton = document.querySelector('.add-button');
const openPopupPlaceImage =  document.querySelector('.element__image');
const page = document.querySelector('.page');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createPlace({ title, image }) {
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.cloneNode(true);
  element.querySelector('.element__description').textContent = title;
  element.querySelector('.element__image').src = image;

  element.querySelector('.element__like-button').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__like-button_active');
  });

  element.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.parentElement.remove();
  });
  element.querySelector('.element__image').addEventListener('click', function () {
  
    const popup = createPopup();
    const popupContent = popup.querySelector('.popup__content');

    popup.style.textAlign = 'center';
    popupContent.style.cssText = `
    max-width: 75vw;
    max-height: 75vh;
    display: inline-block;
    padding: 0;   
    color: white;
    background-color: transparent; 
    box-shadow: none;     
    `;


    popup.querySelector('.popup__title').remove();
    popup.querySelector('.popup__form-edit').remove();
    
    const placeImage =  document.createElement('img');
    const caption = document.createElement('p');
    caption.style.textAlign = 'left';
    placeImage.style.cssText = `
    max-width: 75vw;
    max-height: 75vh;                
    `;


    caption.textContent = title;
    placeImage.src = image;
  
    addCloseButtonListeners(popup);
  
    page.append(popup);

    popupContent.append(placeImage, caption)
  
    animationOpenPopup(popup);
    
  });
  
  return element
};

function appendPlaceToDom(place) {
  const elements = document.querySelector('.elements');

  elements.append(place);
}


initialCards.forEach(function (arrayElement) {
  const place = createPlace({
    title: arrayElement.name,
    image: arrayElement.link,
  });

  appendPlaceToDom(place);
});



function createPopup(withCloseButton) {
  const popupTemplate = document.querySelector('#popup-template').content;
  const popup = popupTemplate.cloneNode(true);
  return popup.firstElementChild
}

function closePopup(popup) { 
  popup.remove();  
}

function addCloseOverlayListeners(popup) {


}

function addCloseButtonListeners(popup) {
  popup.querySelector('.popup__close-button').addEventListener('click', function () {
    animationClosePopup(popup);
    popup.addEventListener('transitionend', function() {
      closePopup(popup);
    });        
  });
}

function getPageProfileInfo() {
  const profileName = document.querySelector('.profile__info-name');
  const profileDescription = document.querySelector('.profile__info-description');

  return {
    name: profileName.innerHTML,
    description: profileDescription.innerHTML,
  };
}

function fillPageProfileInfo(profileInfo) {
  const profileName = document.querySelector('.profile__info-name');
  const profileDescription = document.querySelector('.profile__info-description');

  profileName.innerHTML = profileInfo.name;
  profileDescription.innerHTML = profileInfo.description;
}

function fillPopupProfileInfo(popup, profileInfo) {
  const profileName = popup.querySelector('.popup__input-name');
  const profileDescription = popup.querySelector('.popup__input-description');

  profileName.value = profileInfo.name;
  profileDescription.value = profileInfo.description;
}

function animationOpenPopup(popup) {
  popup.offsetHeight;      
  popup.style.opacity = '1';     
}

function animationClosePopup(popup) {   
  popup.style.opacity = '0'; 
}


profilePopupOpenButton.addEventListener('click', function() {
  const popup = createPopup();
  const profileInfo = getPageProfileInfo();

  fillPopupProfileInfo(popup, profileInfo);

  popup.querySelector('.popup__title').textContent = 'Редактировать профиль';
  popup.querySelector('.popup__save-button').textContent = 'Сохранить';

  const inputProfileName = popup.querySelector('.popup__input-name');
  const inputProfileDescriprion = popup.querySelector('.popup__input-description');

  popup.querySelector('.popup__save-button').addEventListener('click', function () {

    fillPageProfileInfo({
      name: inputProfileName.value,
      description: inputProfileDescriprion.value,
    });    
    animationClosePopup(popup);
    popup.addEventListener('transitionend', function() {
      closePopup(popup);
    }); 
  });

  popup.querySelector('.popup__form-edit').addEventListener('submit', function (e) {
    e.preventDefault();
  });

  addCloseButtonListeners(popup); 

  page.append(popup);
  
  animationOpenPopup(popup);
  
});


placePopupOpenButton.addEventListener('click', function() {
  const popup = createPopup();
  

  popup.querySelector('.popup__input-name').placeholder = 'Название';
  popup.querySelector('.popup__input-description').placeholder = 'Ссылка на картинку';
  popup.querySelector('.popup__title').textContent = 'Новое место';
  popup.querySelector('.popup__save-button').textContent = 'Создать';

  const inputPlaceName = popup.querySelector('.popup__input-name');
  const inputImageLink = popup.querySelector('.popup__input-description');

  popup.querySelector('.popup__save-button').addEventListener('click', function () {

    const place = createPlace({
      title: inputPlaceName.value,
      image: inputImageLink.value,
    });

    appendPlaceToDom(place);    
    
    animationClosePopup(popup);
    popup.addEventListener('transitionend', function() {
      closePopup(popup);
    }); 
  });

  popup.querySelector('.popup__form-edit').addEventListener('submit', function (e) {
    e.preventDefault();
  });


  addCloseButtonListeners(popup);

  page.append(popup);

  animationOpenPopup(popup);
  
});


