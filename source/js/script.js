// document.addEventListener('DOMcontentLoaded', );
(function () {

   let menuButton = document.querySelector('.header-menu__toggle');
   let mainMenu = document.querySelector('.header-menu__wrapper');
   // если подключается js - удаляется класс у меню
   mainMenu.classList.remove('header-menu__wrapper--no-js')
   // дальше классы по клику переключаем
   menuButton.addEventListener('click', function (event) {
      event.preventDefault();
      menuButton.classList.toggle('header-menu__toggle--cross');
      mainMenu.classList.toggle('header-menu__wrapper--shown');
   })
})();
