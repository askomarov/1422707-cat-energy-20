(function () {

  let menuButton = document.querySelector('.header-menu__toggle');
  let mainMenu = document.querySelector('.header-menu__wrapper');
  menuButton.classList.remove('header-menu__toggle--no-js')
  mainMenu.classList.remove('header-menu__wrapper--no-js')
  menuButton.addEventListener('click', function (event) {
    event.preventDefault();
    menuButton.classList.toggle('header-menu__toggle--cross');
    mainMenu.classList.toggle('header-menu__wrapper--shown');
  })
})();
