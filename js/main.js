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
