let slider = document.querySelector('.testimonial__carousel'),
  sliderList = slider.querySelector('.carousel__list'),
  sliderTrack = slider.querySelector('.carousel__track'),
  slides = slider.querySelectorAll('.carousel__track--item'),
  arrows = slider.querySelector('.testimonial__content--arrows'),
  prev = arrows.children[0],
  next = arrows.children[1],
  slideWidth = slides[0].offsetWidth,
  slideIndex = 0,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  posY1 = 0,
  posY2 = 0,
  posFinal = 0,
  isSwipe = false,
  isScroll = false,
  allowSwipe = true,
  transition = true,
  nextTrf = 0,
  prevTrf = 0,
  lastTrf = --slides.length * slideWidth,
  posThreshold = slides[0].offsetWidth * 0.35,
  trfRegExp = /([-0-9.]+(?=px))/,
  swipeStartTime,
  swipeEndTime,
  getEvent = function() {
    console.log(slides)
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
  },
  slide = function() {
    if (transition) {
      sliderTrack.style.transition = 'transform .5s';
    }
    sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

    prev.classList.toggle('disabled', slideIndex === 0);
    next.classList.toggle('disabled', slideIndex === --slides.length);
  },
  swipeStart = function() {
    let evt = getEvent();

    if (allowSwipe) {

      swipeStartTime = Date.now();
      
      transition = true;

      nextTrf = (slideIndex + 1) * -slideWidth;
      prevTrf = (slideIndex - 1) * -slideWidth;

      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;

      sliderTrack.style.transition = '';

      document.addEventListener('touchmove', swipeAction);
      document.addEventListener('mousemove', swipeAction);
      document.addEventListener('touchend', swipeEnd);
      document.addEventListener('mouseup', swipeEnd);

      sliderList.classList.remove('grab');
      sliderList.classList.add('grabbing');
    }
  },
  swipeAction = function() {

    let evt = getEvent(),
      style = sliderTrack.style.transform,
      transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      if (slideIndex === 0) {
        if (posInit < posX1) {
          setTransform(transform, 0);
          return;
        } else {
          allowSwipe = true;
        }
      }

      // запрет ухода вправо на последнем слайде
      if (slideIndex === --slides.length) {
        if (posInit > posX1) {
          setTransform(transform, lastTrf);
          return;
        } else {
          allowSwipe = true;
        }
      }

      if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
        reachEdge();
        return;
      }

      sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }

  },
  swipeEnd = function() {
    posFinal = posInit - posX1;

    isScroll = false;
    isSwipe = false;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    sliderList.classList.add('grab');
    sliderList.classList.remove('grabbing');

    if (allowSwipe) {
      swipeEndTime = Date.now();
      if (Math.abs(posFinal) > posThreshold || swipeEndTime - swipeStartTime < 300) {
        if (posInit < posX1) {
          slideIndex--;
        } else if (posInit > posX1) {
          slideIndex++;
        }
      }

      if (posInit !== posX1) {
        allowSwipe = false;
        slide();
      } else {
        allowSwipe = true;
      }

    } else {
      allowSwipe = true;
    }

  },
  setTransform = function(transform, comapreTransform) {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    allowSwipe = false;
  },
  reachEdge = function() {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  };

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
sliderList.classList.add('grab');

sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);

arrows.addEventListener('click', function(event) {
  let target = event.target;

  if (target.classList.contains('next__slide') || target.className === 'slider__arrow--next') {
    slideIndex++;
  } else if (target.classList.contains('prev__slide') || target.className === 'slider__arrow--prev') {
    slideIndex--;
  } else {
    return;
  }

  slide();
});

$('.order__form--number').mask('+7 (999) 999-99-99')

// const main = document.querySelector('.main')
const windowBlock = document.querySelector('.window');
const navLinks = document.querySelectorAll('a[href*="#"]');
const orderBtn = document.querySelector('.header__button--order');
const eleganceList = document.querySelector('.collect__elegance--name')
const coloristList = document.querySelector('.collect__colorist--name')
const naturalList = document.querySelector('.collect__natural--name')
const luxaryList = document.querySelector('.collect__luxary--name')

const fullPrice = 1690;
const slePrice = 1290
const luxPrice = 2390;
const luxSalePrice = 2190;

let flowersArray = [];
let basket = [];
let newWindow = '';
let imageArray = [
  ['./images/elegance_1.png', './images/elegance_2.png', './images/elegance_3.png', './images/elegance_4.png', './images/elegance_5.png', './images/colorist_1.png', './images/colorist_2.png', './images/colorist_3.png', './images/colorist_4.png', './images/colorist_5.png', './images/natural_1.png', './images/natural_2.png', './images/natural_3.png', './images/natural_4.png'],
  ['./images/elegance_1.png', './images/elegance_2.png', './images/elegance_3.png', './images/elegance_4.png', './images/elegance_5.png', './images/colorist_1.png', './images/colorist_2.png', './images/colorist_3.png', './images/colorist_4.png', './images/colorist_5.png', './images/natural_1.png', './images/natural_2.png', './images/natural_3.png', './images/natural_4.png'],
  ['./images/elegance_1.png', './images/elegance_2.png', './images/elegance_3.png', './images/elegance_4.png', './images/elegance_5.png', './images/colorist_1.png', './images/colorist_2.png', './images/colorist_3.png', './images/colorist_4.png', './images/colorist_5.png', './images/natural_1.png', './images/natural_2.png', './images/natural_3.png', './images/natural_4.png'],
  ['./images/lux_1.png', './images/lux_2.png', './images/lux_3.png', './images/lux_4.png', './images/lux_5.png', './images/colorist_1.png', './images/colorist_2.png', './images/colorist_3.png', './images/colorist_4.png']
];

let nameFlowers = [
  ['Весенний', 'Нежный розовый', 'Голубая луна', 'Фиолетовый', 'Голубой', 'Красный', 'Милый мой', 'Светлый персик', 'Белые листья', 'Винный рог', 'Лиловый кокос', 'Бордовая сила', 'Чистый', 'Персик'],
  ['Синий', 'Розовый яд', 'Осенний', 'Шоколад', 'Шоколад Голд', 'Вишня', 'Молодой лес', 'Черный хлеб', 'Шелк', 'Мис Мэри', 'Класс А', 'Школьный', 'Горный', 'Большой Лог'],
  ['Не шоколад', 'Фиолетовый сад', 'Розовая пастэль', 'Фисташка', 'Бирюза желтая', 'Класс Б', 'Космос', 'Ягуана', 'Лондон', 'Москва', 'Синица'],
  ['Дикая вишня', 'AMG', 'Дикая голубая луна', 'Девственица', 'Дикая красная луна', 'Листья осени', 'Азиатский пион', 'Радужный поцелуй', 'Каменоломня']
]

const closeWindow = () => {
  const btnClose = document.querySelector( '.close__window' );
  const listenCloseBtn = btnClose.addEventListener( 'click', function(event){
    if(event.target.className === 'close__window') {
      windowBlock.style.cssText += `
        display: none
      `;
    }
  })
}

class Flower {
  name;
  price;
  collection;
  image;
  addInBasket = () => {
  };
}

for (let anchor of navLinks) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const blockID = anchor.getAttribute('href').substr(1)
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
};

const dropWindowOrder = ( event ) => {
  switch (true) {
    case event.target.className === 'header__button--order':
      newWindow = `
      <div class="order">
        <div class="order__close"></div>
        <div class="order__container">
            <div class="order__text">
                <h2 class="order__text--title">Идеальный подарок на каждый день</h2>
                <p class="order__text--second">Сделайте онлайн-заказ и получите 10% скидку</p>
            </div>
            <form method="post" class="order__form" action="">
                <input type="text" class="order__form--name" placeholder="Имя" name="Name">
                <input type="tel" class="order__form--number" placeholder="+7 (000) 000-00-00" name="Number">
                <input type="text" class="order__form--address" placeholder="Адрес доставки" name="Address">
                <div class="order__form--date">
                  <input type="date" name="Date">
                  <input type="time" name="Time">
                </div>
                <textarea type="text" class="order__form--textarea" placeholder="Название букета" name="Flowers"></textarea>
                <button type="submit" class="order__form--submit">Заказать</button>
            </form>
        </div>
        <div class="order__background">
            <div class="order__background--first">
                <div class="order__background--block">
                    <img src="./images/blue_laguna.png" alt="blue" class="order__background--image">
                </div>
                <div class="order__background--block">
                    <img src="./images/cherry.png" alt="" class="order__background--image">
                </div>
            </div>
            <div class="order__background--second">
                <div class="order__background--block">
                    <img src="./images/chocolate.png" alt="" class="order__background--image">
                </div>
                <div class="order__background--block">
                    <span class="order__background--comment">😍 Красотааа!</span>
                </div>
            <div class="order__background--block">
                <img src="./images/fiolet.png" alt="" class="order__background--image">
            </div>
        </div>
        <div class="order__background--three">
            <div class="order__background--block">
                <img src="./images/no_chocolate.png" alt="" class="order__background--image">
            </div>
            <div class="order__background--block">
                <img src="./images/pink.png" alt="" class="order__background--image">
            </div>
        </div>
      </div>
      </div>
      `;
      windowBlock.innerHTML = newWindow;
      windowBlock.style.cssText += `
      display: flex;
      `;
      $('.order__form--number').mask('+7 (999) 999-99-99');
      break;
  }
}

const addImageFlower = (flower) => {
  switch (true) {
      case flower.name === 'Весенний':
        flower.image = imageArray[0][0]
      break;
      case flower.name === 'Нежный розовый':
        flower.image = imageArray[0][1]
      break;
      case flower.name === 'Голубая луна':
      flower.image = imageArray[0][2]
      break;
      case flower.name === 'Фиолетовый':
      flower.image = imageArray[0][3]
      break;
      case flower.name === 'Голубой':
      flower.image = imageArray[0][4]
      break;
      case flower.name === 'Красный':
      flower.image = imageArray[0][5]
      break;
      case flower.name === 'Милый мой':
      flower.image = imageArray[0][6]
      break;
      case flower.name === 'Светлый персик':
      flower.image = imageArray[0][7]
      break;
      case flower.name === 'Белые листья':
      flower.image = imageArray[0][8]
      break;
      case flower.name === 'Винный рог':
      flower.image = imageArray[0][9]
      break;
      case flower.name === 'Лиловый кокос':
      flower.image = imageArray[0][10]
      break;
      case flower.name === 'Бордовая сила':
      flower.image = imageArray[0][11]
      break;
      case flower.name === 'Чистый':
      flower.image = imageArray[0][12]
      break;
      case flower.name === 'Персик':
      flower.image = imageArray[0][13]
      break;
      case flower.name === 'Синий':
        flower.image = imageArray[1][0]
      break;
      case flower.name === 'Розовый яд':
        flower.image = imageArray[1][1]
      break;
      case flower.name === 'Осенний':
      flower.image = imageArray[1][2]
      break;
      case flower.name === 'Шоколад':
      flower.image = imageArray[1][3]
      break;
      case flower.name === 'Шоколад Голд':
      flower.image = imageArray[1][4]
      break;
      case flower.name === 'Вишня':
      flower.image = imageArray[1][5]
      break;
      case flower.name === 'Молодой лес':
      flower.image = imageArray[1][6]
      break;
      case flower.name === 'Черный хлеб':
      flower.image = imageArray[1][7]
      break;
      case flower.name === 'Шелк':
      flower.image = imageArray[1][8]
      break;
      case flower.name === 'Мис Мэри':
      flower.image = imageArray[1][9]
      break;
      case flower.name === 'Класс А':
      flower.image = imageArray[1][10]
      break;
      case flower.name === 'Школьный':
      flower.image = imageArray[1][11]
      break;
      case flower.name === 'Горный':
      flower.image = imageArray[1][12]
      break;
      case flower.name === 'Большой Лог':
      flower.image = imageArray[1][13]
      break;
      case flower.name === 'Не шоколад':
        flower.image = imageArray[2][0]
      break;
      case flower.name === 'Фиолетовый сад':
        flower.image = imageArray[2][1]
      break;
      case flower.name === 'Розовая пастэль':
      flower.image = imageArray[2][2]
      break;
      case flower.name === 'Фисташка':
      flower.image = imageArray[2][3]
      break;
      case flower.name === 'Бирюза желтая':
      flower.image = imageArray[2][4]
      break;
      case flower.name === 'Класс Б':
      flower.image = imageArray[2][5]
      break;
      case flower.name === 'Космос':
      flower.image = imageArray[2][6]
      break;
      case flower.name === 'Ягуана':
      flower.image = imageArray[2][7]
      break;
      case flower.name === 'Лондон':
      flower.image = imageArray[2][8]
      break;
      case flower.name === 'Москва':
      flower.image = imageArray[2][9]
      break;
      case flower.name === 'Синица':
      flower.image = imageArray[2][10]
      break;
      case flower.name === 'Дикая вишня':
      flower.image = imageArray[3][0]
      break;
      case flower.name === 'AMG':
      flower.image = imageArray[3][1]
      break;
      case flower.name === 'Дикая голубая луна':
      flower.image = imageArray[3][2]
      break;
      case flower.name === 'Девственица':
        flower.image = imageArray[3][3]
      break;
      case flower.name === 'Дикая красная луна':
        flower.image = imageArray[3][4]
      break;
      case flower.name === 'Листья осени':
      flower.image = imageArray[3][5]
      break;
      case flower.name === 'Азиатский пион':
      flower.image = imageArray[3][6]
      break;
      case flower.name === 'Радужный поцелуй':
      flower.image = imageArray[3][7]
      break;
      case flower.name === 'Каменоломня':
      flower.image = imageArray[3][8]
      break;
      case flower.name === 'Милый мой':
      flower.image = imageArray[2][6]
      break;
      case flower.name === 'Светлый персик':
      flower.image = imageArray[2][7]
      break;
      case flower.name === 'Белые листья':
      flower.image = imageArray[2][8]
      break;
    default:
      break;
  }
}

const dropEleganceList = ( event ) => {
  switch(true) {
    case event.target.classList[1] === 'collect__elegance--name' || event.target.className === 'elegance__name--title' || event.target.className === 'elegance__name--name':
      flowersArray = [];
      nameFlowers[0].forEach( element => {
        let flower = new Flower();
        flower.name = element;
        addImageFlower(flower)
        if(element === 'Весенний' || element === 'Красный') {flower.price = 1290} else flower.price = 1690;
        console.log(flower)
        flower.collection = 'elegance';
        flowersArray.push(flower);
      });
      renderList();
      closeWindow();
      break;
    default:
      break;
  }
}

const dropColoristList = ( event ) => {
  switch(true) {
    case event.target.classList[1] === 'collect__colorist--name' || event.target.className === 'colorist__name--title' || event.target.className === 'colorist__name--name':
      flowersArray = [];
      nameFlowers[1].forEach( element => {
        let flower = new Flower();
        flower.name = element;
        addImageFlower(flower)
        if(element === 'Розовый яд' || element === 'Молодой лес' || element === 'Мис Мэри') {flower.price = 1290} else flower.price = 1690;
        flower.collection = 'colorist';
        flowersArray.push(flower);
      });
      renderList();
      closeWindow()
      break;
    default:
      break;
  }
}

const dropNaturalList = ( event ) => {
  switch(true) {
    case event.target.classList[2] === 'collect__natural--name' || event.target.className === 'natural__name--title' || event.target.className === 'natural__name--name':
      flowersArray = [];
      nameFlowers[2].forEach( element => {
        let flower = new Flower();
        flower.name = element;
        addImageFlower(flower)
        if(element === 'Фисташка' || element === 'Космос' || element === 'Лондон') {flower.price = 1290} else flower.price = 1690;
        flower.collection = 'natural';
        flowersArray.push(flower);
      });
      renderList();
      closeWindow()
      break;
    default:
      break;
  }
}

const dropLuxaryList = ( event ) => {
  switch(true) {
    case event.target.classList[3] === 'collect__luxary--name' || event.target.className === 'luxary__name--title' || event.target.className === 'luxary__name--name':
      flowersArray = [];
      nameFlowers[3].forEach( element => {
        let flower = new Flower();
        flower.name = element;
        addImageFlower(flower)
        if(element === 'Дикая вишня' || element === 'Радужный поцелуй' || element === 'Каменоломня') {flower.price = 1300};
        flower.price = 2990;
        flower.collection = 'luxary';
        flowersArray.push(flower);
      });
      renderList();
      closeWindow()
      break;
    default:
      break;
  }
}

const clickOnWindow = ( event ) => {
  switch(true) {
    case event.target.className === 'order__close' || event.target.className === 'window':
      windowBlock.innerHTML = '';
      windowBlock.style.cssText += `
      display: none;
      `;
      break;
  }
}

const renderList = () => {
  let listItem = '';
  let imageItem = '';
  flowersArray.forEach( element => {
    if(element.collection === 'luxary') {
      listItem += `
      <li class="flowers__item">
        <div class="flowers__item--image">
          <img src="${element.image}" alt="" class="flowers__item--image--picture">
        </div>
        <div class="flowers__item--data--luxary">
          <span class="flowers__item--data--price--luxary">${element.price}₽</span>
          <p class="flowers__item--data--description">${element.name}</p>
        </div>
      </li>
    `;  
    } else {
      listItem += `
        <li class="flowers__item">
          <div class="flowers__item--image">
            <img src="${element.image}" alt="" class="flowers__item--image--picture">
          </div>
          <div class="flowers__item--data">
            <span class="flowers__item--data--price">${element.price}₽</span>
            <p class="flowers__item--data--description">${element.name}</p>
          </div>
        </li>
      `;
    }
  });
  newWindow = `
    <div class="flowers">
      <div class="close__window"></div>
      <div class="flowers__container">
        <h2 class="flowers__title">${flowersArray[0].collection}</h2>
        <p class="flowers__description">Выберите букет и добавьте его в корзину</p>
        <div class="flowers__content">
          <ul class="flowers__content--list">
            ${listItem}
          </ul>
        </div>
      </div>
    </div>
  `;
  windowBlock.style.cssText += `display: flex;`
  windowBlock.innerHTML = newWindow
}

const listenWindow = windowBlock.addEventListener( 'click', clickOnWindow );
const listenOrderBtn = orderBtn.addEventListener( 'click', dropWindowOrder );
const listenElegance = eleganceList.addEventListener( 'click', dropEleganceList );
const listenColorist = coloristList.addEventListener( 'click', dropColoristList );
const listenNatural = naturalList.addEventListener( 'click', dropNaturalList );
const listenLuxary = luxaryList.addEventListener( 'click', dropLuxaryList );

