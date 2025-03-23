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

let nameFlowers = [['Весенний', 'Нежный розовый', 'Голубая луна', 'Фиолетовый', 'Голубой', 'Красный', 'Милый мой', 'Светлый персик', 'Белые листья', 'Винный рог', 'Лиловый кокос', 'Бордовая сила', 'Чистый', 'Персик'], ['Синий', 'Розовый яд','Осенний', 'Шоколад', 'Шоколад', 'Вишня', 'Молодой лес', 'Черный хлеб', 'Шелк', 'Мис Мэри', 'Класс А', 'Школьный', 'Горный', 'Большой Лог'], ['Не шоколад', 'Фиолетовый сад', 'Розовая пастэль', 'Фисташка', 'Бирюза желтая', 'Класс Б', 'Космос', 'Ягуана', 'Лондон', 'Москва', 'Синица'], ['Дикая вишня', 'AMG', 'Дикая голубая луна', 'Девственица', 'Дикая красная луна', 'Листья осени', 'Азиатский пион', 'Радужный поцелуй', 'Каменоломня']]

class Flower {
  name;
  price;
  collection;
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

const dropEleganceList = ( event ) => {
  switch(true) {
    case event.target.classList[1] === 'collect__elegance--name' || event.target.className === 'elegance__name--title' || event.target.className === 'elegance__name--name':
      flowersArray = [];
      nameFlowers[0].forEach( element => {
        let flower = new Flower();
        flower.name = element;
        if(element === 'Весенний' || element === 'Красный') {flower.price = 1290} else flower.price = 1690;
        flower.collection = 'elegance';
        flowersArray.push(flower);
      });
      console.log(flowersArray)
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
        if(element === 'Розовый яд' || 'Молодой лес' || 'Мис Мэри') {flower.price = 1290} else flower.price = 1690;
        flower.collection = 'colorist';
        flowersArray.push(flower);
      })
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
        if(element === 'Фисташка' || 'Космос' || 'Лондон') {flower.price = 1290} else flower.price = 1690;
        flower.collection = 'natural';
        flowersArray.push(flower);
      })
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
        if(element === 'Розовый яд' || 'Молодой лес' || 'Мис Мэри') {flower.price = 1300Ё} else flower.price = 2990;
        flower.collection = 'luxary';
        flowersArray.push(flower);
      })
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

}

const listenWindow = windowBlock.addEventListener( 'click', clickOnWindow );
const listenOrderBtn = orderBtn.addEventListener( 'click', dropWindowOrder );
const listenElegance = eleganceList.addEventListener( 'click', dropEleganceList );
const listenColorist = coloristList.addEventListener( 'click', dropColoristList );
const listenNatural = naturalList.addEventListener( 'click', dropNaturalList );
const listenLuxary = luxaryList.addEventListener( 'click', dropLuxaryList );