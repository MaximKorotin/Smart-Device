(function () {
  const body = document.querySelector('.page-body');
  // const requestButton = body.querySelector('.page-header__request-call');
  // const feedbackForm = body.querySelector('.feedback-form');
  // const nameInput = feedbackForm.querySelector('#name');
  // const phoneInput = feedbackForm.querySelector('#phone');
  // const questionInput = feedbackForm.querySelector('#question');
  // const success = body.querySelector('.success');
  // const overlay = body.querySelector('.overlay');
  // const anchors = body.querySelectorAll('.main-nav__link');
  const sectionsSiteButton = body.querySelector('.sections-site__button');
  const sectionsSiteList = body.querySelector('.sections-site__list');
  const officeButton = body.querySelector('.office__button');
  const officeList = body.querySelector('.office__list');

  // let storageName = '';
  // let storagePhone = '';
  // let storageQuestion = '';

  sectionsSiteButton.classList.remove('sections-site__button--nojs');
  sectionsSiteList.classList.remove('sections-site__list--nojs');
  officeButton.classList.remove('office__button--nojs');
  officeList.classList.remove('office__list--nojs');

  // storageName = localStorage.getItem('name');
  // storagePhone = localStorage.getItem('phone');
  // storageQuestion = localStorage.getItem('question');

  // if (storageName) {
  //   nameInput.value = storageName;
  // }

  // if (storagePhone) {
  //   phoneInput.value = storagePhone;
  // }

  // if (storageQuestion) {
  //   questionInput.value = storageQuestion;
  // }

  // for (const anchor of anchors) {
  //   anchor.addEventListener('click', (evt) => {
  //     evt.preventDefault();

  //     const blockID = anchor.getAttribute('href').substr(1);

  //     document.getElementById(blockID).scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'start',
  //     });
  //   });
  // }

  // requestButton.addEventListener('click', (evt) => {
  //   evt.preventDefault();

  //   if (navMain.classList.contains('main-nav--closed')) {
  //     body.classList.add('mobile-menu');
  //     navMain.classList.remove('main-nav--closed');
  //     navMain.classList.add('main-nav--opened');
  //     navToggle.classList.remove('nav-toggle--closed');
  //     navToggle.classList.add('nav-toggle--opened');
  //   } else {
  //     body.classList.remove('mobile-menu');
  //     navMain.classList.add('main-nav--closed');
  //     navMain.classList.remove('main-nav--opened');
  //     navToggle.classList.add('nav-toggle--closed');
  //     navToggle.classList.remove('nav-toggle--opened');
  //   }
  // });

  sectionsSiteButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (sectionsSiteList.classList.contains('sections-site__list--closed')) {
      sectionsSiteList.classList.remove('sections-site__list--closed');
      sectionsSiteList.classList.add('sections-site__list--opened');
      sectionsSiteButton.classList.remove('sections-site__button--closed');
      sectionsSiteButton.classList.add('sections-site__button--opened');
      officeList.classList.add('office__list--closed');
      officeList.classList.remove('office__list--opened');
      officeButton.classList.add('office__button--closed');
      officeButton.classList.remove('office__button--opened');
    } else {
      sectionsSiteList.classList.add('sections-site__list--closed');
      sectionsSiteList.classList.remove('sections-site__list--opened');
      sectionsSiteButton.classList.add('sections-site__button--closed');
      sectionsSiteButton.classList.remove('sections-site__button--opened');
      officeList.classList.add('office__list--closed');
      officeList.classList.remove('office__list--opened');
      officeButton.classList.add('office__button--closed');
      officeButton.classList.remove('office__button--opened');
    }
  });

  officeButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (officeList.classList.contains('office__list--closed')) {
      sectionsSiteList.classList.add('sections-site__list--closed');
      sectionsSiteList.classList.remove('sections-site__list--opened');
      sectionsSiteButton.classList.add('sections-site__button--closed');
      sectionsSiteButton.classList.remove('sections-site__button--opened');
      officeList.classList.remove('office__list--closed');
      officeList.classList.add('office__list--opened');
      officeButton.classList.remove('office__button--closed');
      officeButton.classList.add('office__button--opened');
    } else {
      sectionsSiteList.classList.add('sections-site__list--closed');
      sectionsSiteList.classList.remove('sections-site__list--opened');
      sectionsSiteButton.classList.add('sections-site__button--closed');
      sectionsSiteButton.classList.remove('sections-site__button--opened');
      officeList.classList.add('office__list--closed');
      officeList.classList.remove('office__list--opened');
      officeButton.classList.add('office__button--closed');
      officeButton.classList.remove('office__button--opened');
    }
  });
})();
