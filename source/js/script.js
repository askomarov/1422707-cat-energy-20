(function () {
  let menuButton = document.querySelector('.header-menu__toggle');
  let mainMenu = document.querySelector('.header-menu__wrapper');
  menuButton.classList.remove('header-menu__toggle--no-js')
  menuButton.addEventListener('click', function (event) {
    event.preventDefault();
    menuButton.classList.toggle('header-menu__toggle--closed');
    mainMenu.classList.toggle('header-menu__wrapper--shown');
  })
})();

ymaps.ready(init);
function init() {

  let mapPin = document.querySelector('.contacts__img');
  mapPin.classList.remove('contacts__img--no-js')
  // Создание карты.
  let myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    center: [59.938572, 30.320009],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 17,
    controls: ['zoomControl'],
    behaviors: ['drag']
  }),
    myPlacemark = new ymaps.Placemark([59.938635, 30.323118], {
      //всплывающая подсказка при наведении
      hintContent: 'Магазин CatEnergy'
    },
      {
        iconLayout: 'default#image',
        iconImageHref: '../img/map-pin.png',
        // Размеры метки.
        iconImageSize: [120, 106],
        iconImageOffset: [-110, -58]
      });
  // Добавим метку на карту.
  myMap.geoObjects.add(myPlacemark);

}

