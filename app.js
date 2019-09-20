const openProjectModal = document.querySelectorAll('.open-project-modal');
const modalClass = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');

openProjectModal.forEach(function (element) {
  element.addEventListener('click', function () {
    if (modalClass.classList.contains('is-active')) {
      modalClass.className = 'modal';
    } else {
      modalClass.className = 'modal is-active';
    }
  })
});

modalClose.addEventListener('click', function () {
  if (modalClass.classList.contains('is-active')) {
    modalClass.className = 'modal';
  } else {
    modalClass.className = 'modal is-active';
  }
})