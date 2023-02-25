import throttle from 'lodash.throttle';
// створюю ссилки на всю форму
const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');
//  імя ключа та обєкт для зберігання
const KEY = 'feedback-form-state';
let formData = {};

// вішаємо слухачів подій інпут та субміт на форму
form.addEventListener('input', throttle(onInputForm, 500));
form.addEventListener('submit', onFormSubmit);

onFormUpdate();
// функція збирає значення з обх полів та відправляє в локалсторедж
function onInputForm(evt) {
  formData[evt.target.name] = evt.target.value;
  const formDataJson = JSON.stringify(formData);
  localStorage.setItem(KEY, formDataJson);
}
// функція видаляє ключ з локалсторедж та очищує поля після відправлення
function onFormSubmit(evt) {
  evt.preventDefault();
  console.log('formData:', formData);
  form.reset();
  localStorage.removeItem(KEY);
}
// функція розпасує ключ з локалсторедж. Яякщо є збережені дані заповнює ними поля, в іншому випадку поля повинні бути порожніми
function onFormUpdate() {
  formItem = JSON.parse(localStorage.getItem(KEY));

  if (formItem) {
    input.value = formItem.email || '';
    textarea.value = formItem.message || '';
  }
  // if (!formItem) {
  //   formData = {};
  // }
}
// if (getItem && getItem.email) {
//   input.value = getItem.email;
// }
// if (getItem && getItem.message) {
//   textarea.value = getItem.message;
// }
// if (!getItem) {
//   formData = {};
// }
