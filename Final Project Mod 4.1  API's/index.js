function openMenu() {
  document.body.classList.add('menu--open');
}

function closeMenu() {
  document.body.classList.remove('menu--open');
}

window.addEventListener('scroll', function() {
  const btnMenu = document.querySelector('.btn__menu');
  if (btnMenu) {
    if (window.scrollY === 0) {
      btnMenu.classList.remove('hide');
    } else {
      btnMenu.classList.add('hide');
    }
  }
});

const yearFilter = document.getElementById('year-filter');
if (yearFilter) {
  for (let year = 2025; year >= 1900; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
  }
}