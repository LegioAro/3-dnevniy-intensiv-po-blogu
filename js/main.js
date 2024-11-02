function acordeon(group, all = false, classActive = 'active', itemActive = false) {
  const acordeons = document.querySelectorAll(`[data-acordeon-group=${group}]`);

  if (acordeons.length > 0) {
    acordeons.forEach((item) => {
      const btn = item.querySelector('[data-acordeon-btn]');
      btn.addEventListener('click', () => handleItemAcordion(item, all));
    });

    if (itemActive) {
      acordeons[itemActive - 1].querySelector('[data-acordeon-btn]').click();
    }
  }

  function handleItemAcordion(item, all) {
    if (all === true) {
      if (item.classList.contains(classActive)) {
        item.classList.remove(classActive);
      } else {
        acordeons.forEach((acordeon) => acordeon.classList.remove(classActive));
        item.classList.add(classActive);
      }
    } else {
      item.classList.toggle(classActive);
    }
  }
}

acordeon('one', false, 'active', 1);

//
const divs = document.querySelectorAll('.steps__item');

function checkDivVisibility() {
  divs.forEach((div, index) => {
    const rect = div.getBoundingClientRect();
    const halfHeight = window.innerHeight / 2;
    if (rect.top <= halfHeight && rect.bottom >= 0) {
      divs.forEach((div) => div.classList.remove('active'));
      divs[index].classList.add('active');
    }
  });
}

document.addEventListener('scroll', checkDivVisibility);

//Modal
function isModal() {
  let modalBtns = document.querySelectorAll('.modal__btn-active');

  if (modalBtns.length > 0) {
    for (let modalBtn of modalBtns) {
      modalBtn.addEventListener('click', function () {
        let modalBtnData = modalBtn.getAttribute('data-modal-src');
        let modalWindow = document.querySelector(`*[data-modal-window="${modalBtnData}"]`);
        let body = document.querySelector('body');

        if (modalWindow) {
          modalWindow.classList.add('active');
          body.classList.add('lock');
        }
      });
    }
  }
}
isModal();

function isModalClose() {
  let modalCloseBtns = document.querySelectorAll('.modal__btn-close');
  if (modalCloseBtns.length > 0) {
    for (let modalCloseBtn of modalCloseBtns) {
      modalCloseBtn.addEventListener('click', function () {
        let modalWindow = modalCloseBtn.closest('*[data-modal-window]');
        let body = document.querySelector('body');

        modalWindow.classList.remove('active');
        body.classList.remove('lock');
      });
    }
  }
}
isModalClose();

//resize

isResize('.who__desc-img', '.who__desc', '.who__desc-mob', 768, 'first');

window.addEventListener('resize', () => {
  isResize('.who__desc-img', '.who__desc', '.who__desc-mob', 768, 'first');
});

//timer
function isTimer() {
  let dateEnd = localStorage.getItem('dateEnd');
  let dateNow = new Date();
  let dateMinutes = dateNow.setMinutes(dateNow.getMinutes() + 24 * 60 * 60);

  if (!dateEnd) {
    localStorage.setItem('dateEnd', dateMinutes);
    dateEnd = localStorage.getItem('dateEnd');
  }

  function countdownTimer() {
    const diff = dateEnd - new Date();
    if (diff <= 0) {
      let dateNow = new Date();

      localStorage.setItem('dateEnd', dateNow.setMinutes(dateNow.getMinutes() + 24 * 60 * 60));
      dateEnd = localStorage.getItem('dateEnd');
    }

    let timers = document.querySelectorAll('.timer');

    timers.forEach((timer) => {
      let timerHours = timer.querySelector('[data-timer-hours]');
      let timerMinuts = timer.querySelector('[data-timer-minuts]');
      let timerSeconds = timer.querySelector('[data-timer-seconds]');
      // let timerMilSec = timer.querySelector('[data-timer-milsec]');

      let timerHoursItems = timerHours.querySelectorAll('.timer__item-num');
      let timerMinutesItems = timerMinuts.querySelectorAll('.timer__item-num');
      let timerSecondsItems = timerSeconds.querySelectorAll('.timer__item-num');
      // let timerMilSecItems = timerMilSec.querySelectorAll('.timer__item-num');

      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      // const milSeconds = diff > 0 ? Math.floor(diff) % 100 : 0;

      let hoursString = hours < 10 ? '0' + hours : String(hours);
      let minutesString = minutes < 10 ? '0' + minutes : String(minutes);
      let secondsString = seconds < 10 ? '0' + seconds : String(seconds);
      // let milsecString = milSeconds < 10 ? '0' + milSeconds : String(milSeconds);

      let hoursArr = hoursString.split('');
      let minutesArr = minutesString.split('');
      let secondsArr = secondsString.split('');
      // let milsecArr = milsecString.split('');

      // for (let i = 0; i < timerMilSecItems.length; i++) {
      //   timerMilSecItems[i].innerHTML = milsecArr[i];
      // }
      for (let i = 0; i < timerMinutesItems.length; i++) {
        timerMinutesItems[i].innerHTML = minutesArr[i];
      }
      for (let i = 0; i < timerSecondsItems.length; i++) {
        timerSecondsItems[i].innerHTML = secondsArr[i];
      }
      for (let i = 0; i < timerHoursItems.length; i++) {
        timerHoursItems[i].innerHTML = hoursArr[i];
      }

      // вызываем функцию countdownTimer
    });
  }
  countdownTimer();
  // вызываем функцию countdownTimer каждую секунду
  let timerId = setInterval(countdownTimer, 1000);
}

isTimer();
