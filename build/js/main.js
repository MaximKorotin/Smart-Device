(function () {
  const body = document.querySelector('.page-body');
  const feedbackPopup = body.querySelector('.feedback-popup');
  const requestButton = body.querySelector('.page-header__request-call');
  const feedbackForm = body.querySelector('.feedback-form');
  const popupForm = feedbackPopup.querySelector('.popup-form');
  const nameInput = feedbackForm.querySelector('#name');
  const phoneInput = feedbackForm.querySelector('#phone');
  const questionInput = feedbackForm.querySelector('#question');
  const agreementInput = feedbackForm.querySelector('#agreement');
  const popupName = popupForm.querySelector('#popup-name');
  const popupPhone = popupForm.querySelector('#popup-phone');
  const popupQuestion = popupForm.querySelector('#popup-question');
  const popupAgreement = popupForm.querySelector('#popup-agreement');
  const success = body.querySelector('.success');
  const overlay = body.querySelector('.overlay');
  const anchor = body.querySelector('.main-block__button');
  const sectionsSiteTitle = body.querySelector('.sections-site__title');
  const sectionsSiteSpan = body.querySelector('.sections-site__span');
  const sectionsSiteList = body.querySelector('.sections-site__list');
  const officeTitle = body.querySelector('.office__title');
  const officeSpan = body.querySelector('.office__span');
  const officeList = body.querySelector('.office__list');

  let storageName = '';
  let storagePhone = '';
  let storageQuestion = '';

  sectionsSiteTitle.classList.remove('sections-site__title--nojs');
  sectionsSiteSpan.classList.remove('sections-site__span--nojs');
  sectionsSiteList.classList.remove('sections-site__list--nojs');
  officeTitle.classList.remove('office__title--nojs');
  officeSpan.classList.remove('office__span--nojs');
  officeList.classList.remove('office__list--nojs');

  storageName = localStorage.getItem('name');
  storagePhone = localStorage.getItem('phone');
  storageQuestion = localStorage.getItem('question');

  if (storageName) {
    nameInput.value = storageName;
    popupName.value = storageName;
  }

  if (storagePhone) {
    phoneInput.value = storagePhone;
    popupPhone.value = storagePhone;
  }

  if (storageQuestion) {
    questionInput.value = storageQuestion;
    popupQuestion.value = storageQuestion;
  }

  anchor.addEventListener('click', (evt) => {
    evt.preventDefault();

    const blockID = anchor.getAttribute('href').substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });

  requestButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    feedbackPopup.classList.add('feedback-popup--opened');
    popupName.focus();
    overlay.classList.add('overlay--open');
    body.classList.add('page-body--popup');
  });

  if (feedbackPopup) {
    const popupClose = feedbackPopup.querySelector('.feedback-popup__close');

    popupClose.addEventListener('click', (evt) => {
      evt.preventDefault();
      feedbackPopup.classList.remove('feedback-popup--opened');
      overlay.classList.remove('overlay--open');
      body.classList.remove('page-body--popup');
    });

    window.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        if (feedbackPopup.classList.contains('feedback-popup--opened')) {
          evt.preventDefault();
          feedbackPopup.classList.remove('feedback-popup--opened');
          overlay.classList.remove('overlay--open');
          body.classList.remove('page-body--popup');
        }
      }
    });

    overlay.addEventListener('click', () => {
      feedbackPopup.classList.remove('feedback-popup--opened');
      overlay.classList.remove('overlay--open');
      body.classList.remove('page-body--popup');
    });
  }

  const successCloses = () => {
    if (success) {
      const successButton = success.querySelector('.success__button');

      successButton.addEventListener('click', (event) => {
        event.preventDefault();
        success.classList.remove('success--open');
        overlay.classList.remove('overlay--open');
        body.classList.remove('page-body--popup');
      });

      window.addEventListener('keydown', (evt) => {
        if (event.keyCode === 27) {
          if (success.classList.contains('success--open')) {
            evt.preventDefault();
            success.classList.remove('success--open');
            overlay.classList.remove('overlay--open');
            body.classList.remove('page-body--popup');
          }
        }
      });

      overlay.addEventListener('click', () => {
        success.classList.remove('success--open');
        overlay.classList.remove('overlay--open');
        body.classList.remove('page-body--popup');
      });
    }
  };

  popupForm.addEventListener('submit', (evt) => {
    if (popupName.value && popupPhone.value && popupAgreement.checked) {
      evt.preventDefault();
      localStorage.setItem('name', popupName.value);
      localStorage.setItem('phone', popupPhone.value);
      localStorage.setItem('question', popupQuestion.value);
      feedbackPopup.classList.remove('feedback-popup--opened');
      success.classList.add('success--open');
    } else {
      evt.preventDefault();
    }

    successCloses();
  });

  feedbackForm.addEventListener('submit', (evt) => {
    if (nameInput.value && phoneInput.value && agreementInput.checked) {
      evt.preventDefault();
      localStorage.setItem('name', nameInput.value);
      localStorage.setItem('phone', phoneInput.value);
      localStorage.setItem('question', questionInput.value);
      success.classList.add('success--open');
      overlay.classList.add('overlay--open');
      body.classList.add('page-body--popup');
    } else {
      evt.preventDefault();
    }

    successCloses();
  });

  const checksName = (elem) => {
    elem.addEventListener('input', () => {
      const valueLength = elem.value.length;
      const minNameLength = elem.minLength;

      if (elem.validity.valueMissing) {
        elem.classList.add('invalid');
        elem.setCustomValidity('Это поле обязательно для заполнения.');
      } else if (valueLength < minNameLength) {
        elem.classList.add('invalid');
        elem.setCustomValidity(`Имя должно содержать минимум
          ${minNameLength} символа. Добавьте ещё ${minNameLength - valueLength} симв.`);
      } else {
        elem.classList.remove('invalid');
        elem.setCustomValidity('');
      }
      elem.reportValidity();
    });
  };

  function setCursorPosition(pos, elem) {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      const range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  function mask(event) {
    if (this.selectionStart < 3) {
      event.preventDefault();
    }

    const matrix = '+7(___) ___-__-__';
    let i = 0;
    const def = matrix.replace(/\D/g, '');
    let val = this.value.replace(/\D/g, '');

    if (def.length >= val.length) {
      val = def;
    }

    this.value = matrix.replace(/[_\d]/g, (a) => i < val.length ? val.charAt(i++) :  a);
    i = this.value.indexOf('_');

    if (event.keyCode === 8) {
      i = this.value.lastIndexOf(val.substr(-1))+1;
    }

    if (i !== -1) {
      i < 3 && (i = 3);
      this.value = this.value.slice(0,i);
    }

    if (event.type === 'blur') {
      if (this.value.length < 5) {
        this.value = '';
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  }

  const checksPhone = (elem) => {
    elem.addEventListener('input', mask, false);
    elem.addEventListener('focus', mask, false);
    elem.addEventListener('blur', mask, false);
    elem.addEventListener('keydown', mask, false);
  };

  sectionsSiteTitle.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (sectionsSiteList.classList.contains('sections-site__list--closed')) {
      sectionsSiteList.classList.remove('sections-site__list--closed');
      sectionsSiteList.classList.add('sections-site__list--opened');
      sectionsSiteSpan.classList.remove('sections-site__span--closed');
      sectionsSiteSpan.classList.add('sections-site__span--opened');
      officeList.classList.add('office__list--closed');
      officeList.classList.remove('office__list--opened');
      officeSpan.classList.add('office____span--closed');
      officeSpan.classList.remove('office____span--opened');
    } else {
      sectionsSiteList.classList.add('sections-site__list--closed');
      sectionsSiteList.classList.remove('sections-site__list--opened');
      sectionsSiteSpan.classList.add('sections-site__span--closed');
      sectionsSiteSpan.classList.remove('sections-site__span--opened');
      officeList.classList.add('office__list--closed');
      officeList.classList.remove('office__list--opened');
      officeSpan.classList.add('office__span--closed');
      officeSpan.classList.remove('office__span--opened');
    }
  });

  officeTitle.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (officeList.classList.contains('office__list--closed')) {
      sectionsSiteList.classList.add('sections-site__list--closed');
      sectionsSiteList.classList.remove('sections-site__list--opened');
      sectionsSiteSpan.classList.add('sections-site__span--closed');
      sectionsSiteSpan.classList.remove('sections-site__span--opened');
      officeList.classList.remove('office__list--closed');
      officeList.classList.add('office__list--opened');
      officeSpan.classList.remove('office__span--closed');
      officeSpan.classList.add('office__span--opened');
    } else {
      sectionsSiteList.classList.add('sections-site__list--closed');
      sectionsSiteList.classList.remove('sections-site__list--opened');
      sectionsSiteSpan.classList.add('sections-site__span--closed');
      sectionsSiteSpan.classList.remove('sections-site__span--opened');
      officeList.classList.add('office__list--closed');
      officeList.classList.remove('office__list--opened');
      officeSpan.classList.add('office__span--closed');
      officeSpan.classList.remove('office__span--opened');
    }
  });

  checksName(nameInput);
  checksName(popupName);
  checksPhone(phoneInput);
  checksPhone(popupPhone);
})();
